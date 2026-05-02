import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Plus, X, Edit, Trash2, Package, ChevronDown, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import './Pharmacy.css';

const initialMedicines = [
  { id: 1, name: 'Amoxicillin', type: 'Medicine', composition: 'Amoxicillin 500mg', category: 'Antibiotic', company: 'Cipla', stockStatus: 'In Stock', totalStock: 200, totalSold: 45, stock: 155, reorderLevel: 20, brandName: 'Mox', supplier: 'MedLine', manageStock: true },
  { id: 2, name: 'Ibuprofen', type: 'Medicine', composition: 'Ibuprofen 400mg', category: 'Analgesic', company: 'Dr. Reddy', stockStatus: 'Low Stock', totalStock: 100, totalSold: 88, stock: 12, reorderLevel: 15, brandName: 'Brufen', supplier: 'PharmaCo', manageStock: true },
  { id: 3, name: 'Paracetamol', type: 'Syrup', composition: 'Paracetamol 250mg/5ml', category: 'Analgesic', company: 'Sun Pharma', stockStatus: 'In Stock', totalStock: 60, totalSold: 10, stock: 50, reorderLevel: 10, brandName: 'Calpol', supplier: 'SunMed', manageStock: true },
  { id: 4, name: 'Lidocaine Gel', type: 'Gel', composition: 'Lignocaine 2%', category: 'Anaesthetic', company: '3M', stockStatus: 'In Stock', totalStock: 30, totalSold: 5, stock: 25, reorderLevel: 5, brandName: 'Xylocaine', supplier: 'MedLine', manageStock: true },
  { id: 5, name: 'Chlorhexidine Mouthwash', type: 'Liquid', composition: 'Chlorhexidine 0.2%', category: 'Antiseptic', company: 'Himalaya', stockStatus: 'Out of Stock', totalStock: 40, totalSold: 40, stock: 0, reorderLevel: 8, brandName: 'Hexidine', supplier: 'HimMed', manageStock: true },
];

const initialOrders = [
  { id: 1, date: '2026-05-01', patientName: 'Arjun Sharma', itemCount: 3, totalAmount: 450 },
  { id: 2, date: '2026-05-01', patientName: 'Priya Nair', itemCount: 1, totalAmount: 120 },
  { id: 3, date: '2026-04-30', patientName: 'Rahul Mehta', itemCount: 2, totalAmount: 890 },
];

const initialGroups = [
  { id: 1, groupName: 'Analgesics', description: 'Pain relief medicines', medicines: ['Ibuprofen', 'Paracetamol'] },
  { id: 2, groupName: 'Antibiotics', description: 'Infection-fighting agents', medicines: ['Amoxicillin'] },
  { id: 3, groupName: 'Dental Anaesthetics', description: 'Local anaesthetics for dental procedures', medicines: ['Lidocaine Gel'] },
];

const TYPES = ['Medicine', 'Syrup', 'Gel', 'Liquid', 'Capsule', 'Tablet', 'Injection', 'Drops'];
const CATEGORIES = ['Analgesic', 'Antibiotic', 'Anaesthetic', 'Antiseptic', 'Anti-inflammatory', 'Antifungal', 'Vitamin', 'Other'];

const emptyMed = { name: '', type: 'Medicine', composition: '', category: '', company: '', brandName: '', supplier: '', reorderLevel: 0, manageStock: true };
const emptyGroup = { groupName: '', description: '', medicines: [] };

export default function Pharmacy() {
  const [activeTab, setActiveTab] = useState('Pharmacy Order');
  const [medicines, setMedicines] = useState(initialMedicines);
  const [orders, setOrders] = useState(initialOrders);
  const [groups, setGroups] = useState(initialGroups);
  const [searchQuery, setSearchQuery] = useState('');

  // Medicine Modal
  const [showMedModal, setShowMedModal] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [medForm, setMedForm] = useState(emptyMed);

  // Group Modal
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [groupForm, setGroupForm] = useState(emptyGroup);

  // Filter Modal
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterType, setFilterType] = useState('');

  // Delete Modal
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, type: '', id: null });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Reset to page 1 when tab or search changes
  useEffect(() => { setCurrentPage(1); }, [activeTab, searchQuery, filterType]);

  const tabs = ['Pharmacy Order', 'Medicine & Stock', 'Medicines Group'];

  const filteredMeds = useMemo(() => medicines.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.type.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(m => filterType ? m.type === filterType : true), [medicines, searchQuery, filterType]);

  const filteredOrders = useMemo(() => orders.filter(o =>
    o.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  ), [orders, searchQuery]);

  const filteredGroups = useMemo(() => groups.filter(g =>
    g.groupName.toLowerCase().includes(searchQuery.toLowerCase())
  ), [groups, searchQuery]);

  // Active dataset for pagination
  const activeData = activeTab === 'Pharmacy Order' ? filteredOrders
    : activeTab === 'Medicine & Stock' ? filteredMeds
    : filteredGroups;

  const totalRecords = activeData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);

  const pagedOrders  = filteredOrders.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);
  const pagedMeds    = filteredMeds.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);
  const pagedGroups  = filteredGroups.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  const startRecord  = totalRecords === 0 ? 0 : (safePage - 1) * rowsPerPage + 1;
  const endRecord    = Math.min(safePage * rowsPerPage, totalRecords);

  const getStockBadge = (status) => {
    if (status === 'Out of Stock') return 'ph-badge critical';
    if (status === 'Low Stock') return 'ph-badge low';
    return 'ph-badge high';
  };

  const openMedModal = (med = null) => {
    setEditingMed(med ? med.id : null);
    setMedForm(med ? { ...med } : emptyMed);
    setShowMedModal(true);
  };

  const saveMed = (e) => {
    e.preventDefault();
    if (editingMed) {
      setMedicines(medicines.map(m => m.id === editingMed ? { ...medForm, id: editingMed, totalStock: m.totalStock, totalSold: m.totalSold, stock: m.stock, stockStatus: m.stockStatus, company: medForm.company } : m));
    } else {
      const id = medicines.length + 1;
      setMedicines([...medicines, { ...medForm, id, totalStock: 0, totalSold: 0, stock: 0, stockStatus: 'In Stock' }]);
    }
    setShowMedModal(false);
  };

  const openGroupModal = (grp = null) => {
    setEditingGroup(grp ? grp.id : null);
    setGroupForm(grp ? { ...grp } : emptyGroup);
    setShowGroupModal(true);
  };

  const saveGroup = (e) => {
    e.preventDefault();
    if (editingGroup) {
      setGroups(groups.map(g => g.id === editingGroup ? { ...groupForm, id: editingGroup } : g));
    } else {
      setGroups([...groups, { ...groupForm, id: groups.length + 1 }]);
    }
    setShowGroupModal(false);
  };

  const confirmDelete = () => {
    const { type, id } = deleteConfirm;
    if (type === 'medicine') setMedicines(medicines.filter(m => m.id !== id));
    if (type === 'group') setGroups(groups.filter(g => g.id !== id));
    if (type === 'order') setOrders(orders.filter(o => o.id !== id));
    setDeleteConfirm({ show: false, type: '', id: null });
  };

  return (
    <div className="ph-module">
      {/* Tabs */}
      <div className="ph-tabs">
        {tabs.map(t => (
          <button key={t} className={`ph-tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => { setActiveTab(t); setSearchQuery(''); }}>
            {t}
          </button>
        ))}
      </div>

      {/* Top Bar */}
      <div className="ph-top-bar">
        <h2 className="ph-title">
          {activeTab === 'Pharmacy Order' ? 'Patient Medicine Order' : activeTab === 'Medicine & Stock' ? 'Medicine Stock' : 'Medicine Groups'}
        </h2>
        <div className="ph-bar-actions">
          {activeTab !== 'Medicines Group' && (
            <button className="ph-action-btn" onClick={() => setShowFilterModal(true)}>
              <Filter size={15} /> Filter
            </button>
          )}
          <div className="ph-search-box">
            <Search size={15} />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          {activeTab === 'Pharmacy Order' && (
            <button className="ph-action-btn"><Download size={15} /> Export <ChevronDown size={13} /></button>
          )}
          {activeTab === 'Medicine & Stock' && (
            <button className="ph-action-btn primary" onClick={() => openMedModal()}>
              <Plus size={15} /> New Medicine
            </button>
          )}
          {activeTab === 'Medicines Group' && (
            <button className="ph-action-btn primary" onClick={() => openGroupModal()}>
              <Plus size={15} /> New Group
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="ph-content">
        {/* Pharmacy Order Tab */}
        {activeTab === 'Pharmacy Order' && (
          <table className="ph-table">
            <thead>
              <tr>
                <th>No.</th><th>Date</th><th>Patient Name</th><th>Item Count</th><th>Total Amount (₹)</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pagedOrders.length > 0 ? pagedOrders.map((o, i) => (
                <tr key={o.id} className="ph-row">
                  <td>{(safePage - 1) * rowsPerPage + i + 1}</td>
                  <td>{o.date}</td>
                  <td><span className="ph-patient-name">{o.patientName}</span></td>
                  <td><span className="ph-count-badge">{o.itemCount} items</span></td>
                  <td><strong>₹{o.totalAmount.toLocaleString()}</strong></td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="ph-icon-btn danger" onClick={() => setDeleteConfirm({ show: true, type: 'order', id: o.id })}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="6"><div className="ph-empty"><Package size={40} /><p>No orders found</p></div></td></tr>
              )}
            </tbody>
          </table>
        )}

        {/* Medicine & Stock Tab */}
        {activeTab === 'Medicine & Stock' && (
          <table className="ph-table">
            <thead>
              <tr>
                <th>No.</th><th>Name</th><th>Type</th><th>Composition</th><th>Category</th><th>Company</th><th>Stock Status</th><th>Total Stock</th><th>Total Sold</th><th>Stock</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedMeds.length > 0 ? pagedMeds.map((m, i) => (
                <tr key={m.id} className="ph-row">
                  <td>{(safePage - 1) * rowsPerPage + i + 1}</td>
                  <td><strong>{m.name}</strong></td>
                  <td><span className="ph-type-tag">{m.type}</span></td>
                  <td style={{ color: '#64748b', fontSize: 12 }}>{m.composition}</td>
                  <td>{m.category}</td>
                  <td>{m.company}</td>
                  <td><span className={getStockBadge(m.stockStatus)}>{m.stockStatus}</span></td>
                  <td>{m.totalStock}</td>
                  <td>{m.totalSold}</td>
                  <td><strong style={{ color: m.stock <= m.reorderLevel ? '#ef4444' : '#10b981' }}>{m.stock}</strong></td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="ph-icon-btn" onClick={() => openMedModal(m)}><Edit size={14} /></button>
                      <button className="ph-icon-btn danger" onClick={() => setDeleteConfirm({ show: true, type: 'medicine', id: m.id })}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="11"><div className="ph-empty"><Package size={40} /><p>No medicines found</p></div></td></tr>
              )}

            </tbody>
          </table>
        )}

        {/* Medicines Group Tab */}
        {activeTab === 'Medicines Group' && (
          <table className="ph-table">
            <thead>
              <tr>
                <th>No.</th><th>Group Name</th><th>Description</th><th>Medicines</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedGroups.length > 0 ? pagedGroups.map((g, i) => (
                <tr key={g.id} className="ph-row">
                  <td>{(safePage - 1) * rowsPerPage + i + 1}</td>
                  <td><strong>{g.groupName}</strong></td>
                  <td style={{ color: '#64748b', fontSize: 12 }}>{g.description}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {g.medicines.map(med => <span key={med} className="ph-med-pill">{med}</span>)}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="ph-icon-btn" onClick={() => openGroupModal(g)}><Edit size={14} /></button>
                      <button className="ph-icon-btn danger" onClick={() => setDeleteConfirm({ show: true, type: 'group', id: g.id })}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="5"><div className="ph-empty"><Package size={40} /><p>No groups found</p></div></td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Pagination Footer ── */}
      <div className="ph-footer">
        <div className="ph-footer-left">
          <span className="ph-footer-text">Rows per page:</span>
          <div className="ph-rows-selector">
            {[10, 20, 50, 100].map(size => (
              <button
                key={size}
                className={`ph-row-size-btn ${rowsPerPage === size ? 'active' : ''}`}
                onClick={() => { setRowsPerPage(size); setCurrentPage(1); }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="ph-footer-right">
          <span className="ph-footer-text">Total Records: {totalRecords}</span>
          <div className="ph-nav-btns">
            <button
              className="ph-nav-btn"
              disabled={safePage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              <ChevronLeft size={16} />
            </button>
            <div className="ph-page-indicator">{safePage}</div>
            <button
              className="ph-nav-btn"
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Add/Edit Medicine Modal ── */}
      {showMedModal && (
        <div className="ph-overlay" onClick={e => e.target === e.currentTarget && setShowMedModal(false)}>
          <div className="ph-modal" onClick={e => e.stopPropagation()}>
            <div className="ph-modal-header">
              <h2>{editingMed ? 'Edit Medicine' : 'Add New Medicine'}</h2>
              <button className="ph-close-btn" onClick={() => setShowMedModal(false)}><X size={18} /></button>
            </div>
            <form onSubmit={saveMed}>
              <div className="ph-modal-body">
                <div className="ph-form-grid">
                  <div className="ph-form-group">
                    <label>Type <span>*</span></label>
                    <select className="ph-input" required value={medForm.type} onChange={e => setMedForm({ ...medForm, type: e.target.value })}>
                      {TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="ph-form-group">
                    <label>Medicine Name <span>*</span></label>
                    <input type="text" className="ph-input" placeholder="Enter medicine name" required value={medForm.name} onChange={e => setMedForm({ ...medForm, name: e.target.value })} />
                  </div>
                  <div className="ph-form-group">
                    <label>Composition <span>*</span></label>
                    <input type="text" className="ph-input" placeholder="Enter composition" required value={medForm.composition} onChange={e => setMedForm({ ...medForm, composition: e.target.value })} />
                  </div>
                  <div className="ph-form-group">
                    <label>Category <span>*</span></label>
                    <select className="ph-input" required value={medForm.category} onChange={e => setMedForm({ ...medForm, category: e.target.value })}>
                      <option value="">Select category</option>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="ph-form-group">
                    <label>Brand Name</label>
                    <input type="text" className="ph-input" placeholder="Enter brand name" value={medForm.brandName} onChange={e => setMedForm({ ...medForm, brandName: e.target.value })} />
                  </div>
                  <div className="ph-form-group">
                    <label>Supplier</label>
                    <input type="text" className="ph-input" placeholder="Enter supplier name" value={medForm.supplier} onChange={e => setMedForm({ ...medForm, supplier: e.target.value })} />
                  </div>
                  <div className="ph-form-group">
                    <label>Company</label>
                    <input type="text" className="ph-input" placeholder="Enter company name" value={medForm.company} onChange={e => setMedForm({ ...medForm, company: e.target.value })} />
                  </div>
                  <div className="ph-form-group">
                    <label>Reorder Level</label>
                    <input type="number" className="ph-input" value={medForm.reorderLevel} onChange={e => setMedForm({ ...medForm, reorderLevel: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div className="ph-form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <input type="checkbox" id="manageStock" checked={medForm.manageStock} onChange={e => setMedForm({ ...medForm, manageStock: e.target.checked })} style={{ width: 18, height: 18, accentColor: '#8b5cf6' }} />
                    <label htmlFor="manageStock" style={{ marginBottom: 0, cursor: 'pointer' }}>Manage Stock</label>
                  </div>
                </div>
              </div>
              <div className="ph-modal-footer">
                <button type="button" className="ph-btn-cancel" onClick={() => setShowMedModal(false)}>Cancel</button>
                <button type="submit" className="ph-btn-primary">{editingMed ? 'Save Changes' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Add/Edit Group Modal ── */}
      {showGroupModal && (
        <div className="ph-overlay" onClick={e => e.target === e.currentTarget && setShowGroupModal(false)}>
          <div className="ph-modal" style={{ maxWidth: 500 }} onClick={e => e.stopPropagation()}>
            <div className="ph-modal-header">
              <h2>{editingGroup ? 'Edit Group' : 'New Medicine Group'}</h2>
              <button className="ph-close-btn" onClick={() => setShowGroupModal(false)}><X size={18} /></button>
            </div>
            <form onSubmit={saveGroup}>
              <div className="ph-modal-body">
                <div className="ph-form-group">
                  <label>Group Name <span>*</span></label>
                  <input type="text" className="ph-input" placeholder="e.g. Analgesics" required value={groupForm.groupName} onChange={e => setGroupForm({ ...groupForm, groupName: e.target.value })} />
                </div>
                <div className="ph-form-group">
                  <label>Description</label>
                  <textarea className="ph-input" placeholder="Write a brief description..." value={groupForm.description} onChange={e => setGroupForm({ ...groupForm, description: e.target.value })} />
                </div>
                <div className="ph-form-group">
                  <label>Add Medicines</label>
                  <select className="ph-input" onChange={e => {
                    const val = e.target.value;
                    if (val && !groupForm.medicines.includes(val)) setGroupForm({ ...groupForm, medicines: [...groupForm.medicines, val] });
                    e.target.value = '';
                  }}>
                    <option value="">Select a medicine to add</option>
                    {medicines.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                  </select>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                    {groupForm.medicines.map(med => (
                      <span key={med} className="ph-med-pill" style={{ cursor: 'pointer' }} onClick={() => setGroupForm({ ...groupForm, medicines: groupForm.medicines.filter(x => x !== med) })}>
                        {med} <X size={12} style={{ marginLeft: 4 }} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="ph-modal-footer">
                <button type="button" className="ph-btn-cancel" onClick={() => setShowGroupModal(false)}>Cancel</button>
                <button type="submit" className="ph-btn-primary">{editingGroup ? 'Save Changes' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Filter Modal ── */}
      {showFilterModal && (
        <div className="ph-overlay" onClick={e => e.target === e.currentTarget && setShowFilterModal(false)}>
          <div className="ph-modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div className="ph-modal-header">
              <h2>Filter</h2>
              <button className="ph-close-btn" onClick={() => setShowFilterModal(false)}><X size={18} /></button>
            </div>
            <div className="ph-modal-body">
              <div className="ph-form-group">
                <label>Type</label>
                <select className="ph-input" value={filterType} onChange={e => setFilterType(e.target.value)}>
                  <option value="">Select Type</option>
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="ph-modal-footer" style={{ justifyContent: 'space-between' }}>
              <button className="ph-btn-clear" onClick={() => { setFilterType(''); setShowFilterModal(false); }}>Clear all</button>
              <button className="ph-btn-primary" onClick={() => setShowFilterModal(false)}>Apply Filter</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {deleteConfirm.show && (
        <div className="ph-overlay" onClick={e => e.target === e.currentTarget && setDeleteConfirm({ show: false, type: '', id: null })}>
          <div className="ph-modal" style={{ maxWidth: 400, textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div className="ph-modal-body" style={{ padding: '48px 32px' }}>
              <div className="ph-delete-icon"><Trash2 size={28} color="#ef4444" /></div>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: '20px 0 10px', color: '#0f172a' }}>Confirm Deletion</h2>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>Are you sure you want to delete this {deleteConfirm.type}? This action cannot be undone.</p>
            </div>
            <div className="ph-modal-footer" style={{ border: 'none', paddingTop: 0, gap: 12 }}>
              <button className="ph-btn-cancel" style={{ flex: 1 }} onClick={() => setDeleteConfirm({ show: false, type: '', id: null })}>Cancel</button>
              <button className="ph-btn-danger" style={{ flex: 1 }} onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
