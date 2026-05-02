import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Plus, Trash2, Download, Printer, 
  FileText, User, Phone, Hash, PlusCircle, 
  ChevronLeft, ChevronRight, CheckCircle2, 
  Clock, AlertCircle, RefreshCcw
} from 'lucide-react';
import './Billing.css';

// Initial empty invoice state
// Added to force HMR
const INITIAL_INVOICE = {
  patientName: '',
  phone: '',
  patientId: '',
  items: [
    { id: Date.now(), name: '', toothNo: '', qty: 1, price: 0, total: 0 }
  ],
  subtotal: 0,
  discount: 0,
  taxPercent: 0,
  taxAmount: 0,
  finalAmount: 0,
  paidAmount: 0,
  dueAmount: 0,
  status: 'Unpaid',
  paymentMethod: 'Cash'
};

const Billing = () => {
  const [activeTab, setActiveTab] = useState('All Invoices');
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({ ...INITIAL_INVOICE });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('invoices');
    if (saved) setInvoices(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever invoices change
  const saveInvoicesToStorage = (updatedInvoices) => {
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
    setInvoices(updatedInvoices);
  };

  // ─── Calculations ───
  useEffect(() => {
    const subtotal = newInvoice.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
    const taxAmount = (subtotal * (newInvoice.taxPercent / 100));
    const finalAmount = subtotal - newInvoice.discount + taxAmount;
    const dueAmount = finalAmount - newInvoice.paidAmount;

    let status = 'Unpaid';
    if (dueAmount <= 0) status = 'Paid';
    else if (newInvoice.paidAmount > 0) status = 'Partial';

    setNewInvoice(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      finalAmount,
      dueAmount: Math.max(0, dueAmount),
      status
    }));
  }, [newInvoice.items, newInvoice.discount, newInvoice.taxPercent, newInvoice.paidAmount]);

  // ─── Invoice Item Actions ───
  const addItemRow = () => {
    setNewInvoice(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), name: '', toothNo: '', qty: 1, price: 0, total: 0 }]
    }));
  };

  const removeItemRow = (id) => {
    if (newInvoice.items.length === 1) return;
    setNewInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateItem = (id, field, value) => {
    setNewInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'qty' || field === 'price') {
            updatedItem.total = updatedItem.qty * updatedItem.price;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  // ─── Save Invoice ───
  const handleSaveInvoice = (e) => {
    e.preventDefault();
    const invoiceToSave = {
      ...newInvoice,
      id: `INV-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    const updated = [invoiceToSave, ...invoices];
    saveInvoicesToStorage(updated);
    setActiveTab('All Invoices');
    setNewInvoice({ ...INITIAL_INVOICE, items: [{ id: Date.now(), name: '', toothNo: '', qty: 1, price: 0, total: 0 }] });
  };

  const deleteInvoice = (id) => {
    const updated = invoices.filter(inv => inv.id !== id);
    saveInvoicesToStorage(updated);
  };

  // ─── Filtering & Pagination ───
  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const matchesSearch = inv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           inv.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredInvoices.length / rowsPerPage);
  const pagedInvoices = filteredInvoices.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid': return <span className="status-badge paid"><CheckCircle2 size={12} /> Paid</span>;
      case 'Partial': return <span className="status-badge partial"><Clock size={12} /> Partial</span>;
      case 'Unpaid': return <span className="status-badge unpaid"><AlertCircle size={12} /> Unpaid</span>;
      default: return null;
    }
  };

  return (
    <div className="billing-module">
      {/* Header */}
      <div className="billing-header">
        <div className="title-area">
          <h1>Invoice & Billing</h1>
          <p>Generate treatments invoices and track patient payments</p>
        </div>
        <div className="header-actions">
          {activeTab === 'All Invoices' && (
            <div className="search-group">
              <div className="search-box">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Search patient or ID..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Paid">Paid Only</option>
                <option value="Partial">Partial Only</option>
                <option value="Unpaid">Unpaid Only</option>
              </select>
            </div>
          )}
          <button 
            className={`action-btn ${activeTab === 'Create New' ? 'secondary' : 'primary'}`}
            onClick={() => {
              setActiveTab(activeTab === 'Create New' ? 'All Invoices' : 'Create New');
              setCurrentPage(1);
            }}
          >
            {activeTab === 'Create New' ? <ChevronLeft size={18} /> : <Plus size={18} />}
            {activeTab === 'Create New' ? 'Back to List' : 'Create New Invoice'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="billing-tabs">
        {['All Invoices', 'Create New'].map(tab => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
          >
            {tab === 'All Invoices' ? <FileText size={16} /> : <PlusCircle size={16} />}
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="billing-card">
        {activeTab === 'All Invoices' ? (
          /* List View */
          <div className="invoice-list-view">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Inv ID</th>
                  <th>Date</th>
                  <th>Patient Name</th>
                  <th>Final Amount</th>
                  <th>Paid</th>
                  <th>Due</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedInvoices.length > 0 ? pagedInvoices.map(inv => (
                  <tr key={inv.id}>
                    <td className="bold">{inv.id}</td>
                    <td className="date-cell">{inv.createdAt}</td>
                    <td className="bold">{inv.patientName}</td>
                    <td className="amount-cell">₹{inv.finalAmount.toLocaleString()}</td>
                    <td className="amount-cell paid-text">₹{inv.paidAmount.toLocaleString()}</td>
                    <td className="amount-cell due-text">₹{inv.dueAmount.toLocaleString()}</td>
                    <td>{getStatusBadge(inv.status)}</td>
                    <td>
                      <div className="action-row">
                        <button className="row-btn print" title="Print"><Printer size={14} /></button>
                        <button className="row-btn delete" title="Delete" onClick={() => deleteInvoice(inv.id)}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="8">
                      <div className="empty-state">
                        <FileText size={48} />
                        <p>No invoices found matching your criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* Creation View */
          <form className="invoice-create-form" onSubmit={handleSaveInvoice}>
            {/* Patient Info Section */}
            <div className="form-section">
              <h3 className="section-title"><User size={18} /> Patient Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <User size={16} />
                    <input 
                      type="text" required 
                      placeholder="Enter patient name"
                      value={newInvoice.patientName}
                      onChange={e => setNewInvoice({...newInvoice, patientName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="input-with-icon">
                    <Phone size={16} />
                    <input 
                      type="tel" required 
                      placeholder="9876543210"
                      value={newInvoice.phone}
                      onChange={e => setNewInvoice({...newInvoice, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Patient ID (Optional)</label>
                  <div className="input-with-icon">
                    <Hash size={16} />
                    <input 
                      type="text" 
                      placeholder="P-101"
                      value={newInvoice.patientId}
                      onChange={e => setNewInvoice({...newInvoice, patientId: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Treatment Items Section */}
            <div className="form-section">
              <div className="section-header">
                <h3 className="section-title"><FileText size={18} /> Invoice Items</h3>
                <button type="button" className="add-item-btn" onClick={addItemRow}>
                  <Plus size={14} /> Add Treatment
                </button>
              </div>
              <table className="items-table">
                <thead>
                  <tr>
                    <th style={{ width: '40%' }}>Treatment Name</th>
                    <th>Tooth #</th>
                    <th>Qty</th>
                    <th>Price (₹)</th>
                    <th>Total (₹)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {newInvoice.items.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        <input 
                          type="text" required 
                          placeholder="e.g. Scaling & Polishing"
                          value={item.name}
                          onChange={e => updateItem(item.id, 'name', e.target.value)}
                        />
                      </td>
                      <td>
                        <input 
                          type="text" 
                          placeholder="32"
                          value={item.toothNo}
                          onChange={e => updateItem(item.id, 'toothNo', e.target.value)}
                        />
                      </td>
                      <td>
                        <input 
                          type="number" required min="1"
                          value={item.qty}
                          onChange={e => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                        />
                      </td>
                      <td>
                        <input 
                          type="number" required min="0"
                          value={item.price}
                          onChange={e => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                        />
                      </td>
                      <td className="bold">₹{(item.qty * item.price).toLocaleString()}</td>
                      <td>
                        <button type="button" className="row-delete" onClick={() => removeItemRow(item.id)}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary & Payment Section */}
            <div className="form-bottom-grid">
              {/* Payment Settings */}
              <div className="form-section payment-settings">
                <h3 className="section-title">Payment Info</h3>
                <div className="form-grid-small">
                  <div className="form-group">
                    <label>Payment Method</label>
                    <select value={newInvoice.paymentMethod} onChange={e => setNewInvoice({...newInvoice, paymentMethod: e.target.value})}>
                      <option>Cash</option>
                      <option>UPI</option>
                      <option>Card</option>
                      <option>Bank Transfer</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Amount Paid Now (₹)</label>
                    <input 
                      type="number" min="0"
                      value={newInvoice.paidAmount}
                      onChange={e => setNewInvoice({...newInvoice, paidAmount: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </div>

              {/* Totals Section */}
              <div className="totals-card">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{newInvoice.subtotal.toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Discount (₹)</span>
                  <input 
                    type="number" min="0" 
                    value={newInvoice.discount}
                    onChange={e => setNewInvoice({...newInvoice, discount: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="total-row">
                  <span>Tax ({newInvoice.taxPercent}%)</span>
                  <div className="tax-input-group">
                    <input 
                      type="number" min="0" max="100"
                      value={newInvoice.taxPercent}
                      onChange={e => setNewInvoice({...newInvoice, taxPercent: parseInt(e.target.value) || 0})}
                    />
                    <span>%</span>
                  </div>
                </div>
                <div className="total-divider"></div>
                <div className="total-row grand">
                  <span>Grand Total</span>
                  <span>₹{newInvoice.finalAmount.toLocaleString()}</span>
                </div>
                <div className={`total-row ${newInvoice.dueAmount > 0 ? 'due' : 'paid'}`}>
                  <span>{newInvoice.dueAmount > 0 ? 'Balance Due' : 'Fully Paid'}</span>
                  <span>₹{newInvoice.dueAmount.toLocaleString()}</span>
                </div>
                <div className="form-actions">
                  <button type="button" className="reset-btn" onClick={() => setNewInvoice({...INITIAL_INVOICE, items: [{ id: Date.now(), name: '', toothNo: '', qty: 1, price: 0, total: 0 }]})}>
                    <RefreshCcw size={16} /> Reset
                  </button>
                  <button type="submit" className="save-btn">
                    <CheckCircle2 size={16} /> Save & Generate
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Pagination Footer (Only on List view) */}
      {activeTab === 'All Invoices' && (
        <div className="billing-footer">
          <div className="footer-left">
            <span className="footer-text">Rows per page:</span>
            <div className="rows-btns">
              {[10, 20, 50, 100].map(val => (
                <button 
                  key={val} 
                  className={`row-btn ${rowsPerPage === val ? 'active' : ''}`}
                  onClick={() => { setRowsPerPage(val); setCurrentPage(1); }}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
          <div className="footer-right">
            <span className="footer-text">Total Records: {filteredInvoices.length}</span>
            <div className="p-btns">
              <button className="p-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                <ChevronLeft size={16} />
              </button>
              <div className="p-btn active">{currentPage}</div>
              <button className="p-btn" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
