import React, { useState, useMemo, useEffect } from 'react';
import {
  Package, Search, Filter, FileSpreadsheet, Plus, Download,
  X, ChevronDown, MoreVertical, Edit, Trash2, AlertCircle,
  ChevronLeft, ChevronRight, Upload, Info
} from 'lucide-react';
import './Inventory.css';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState('Inventory Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Initial Mock Data (Expanded to 20 items)
  const initialData = [
    { id: 'ITM-001', name: 'Dental Gloves (M)', category: 'Disposable', brand: '3M', stock: 50, minStock: 20, purchasePrice: 120, mrp: 150, uom: 'Box' },
    { id: 'ITM-002', name: 'Dental Composite', category: 'Materials', brand: 'Dentsply', stock: 15, minStock: 10, purchasePrice: 850, mrp: 1200, uom: 'Tube' },
    { id: 'ITM-003', name: 'Face Masks', category: 'Disposable', brand: 'SafeGuard', stock: 200, minStock: 50, purchasePrice: 45, mrp: 60, uom: 'Box' },
    { id: 'ITM-004', name: 'Anesthesia Vials', category: 'Medicine', brand: 'Septodont', stock: 5, minStock: 20, purchasePrice: 210, mrp: 300, uom: 'Pack' },
    { id: 'ITM-005', name: 'Dental Mirror #4', category: 'Instruments', brand: 'Hu-Friedy', stock: 12, minStock: 5, purchasePrice: 450, mrp: 600, uom: 'Unit' },
    { id: 'ITM-006', name: 'Alginate Impression', category: 'Materials', brand: 'Zhermack', stock: 8, minStock: 10, purchasePrice: 320, mrp: 450, uom: 'Bag' },
    { id: 'ITM-007', name: 'Saliva Ejectors', category: 'Disposable', brand: 'Premium Plus', stock: 500, minStock: 100, purchasePrice: 250, mrp: 350, uom: 'Pack' },
    { id: 'ITM-008', name: 'Prophy Paste', category: 'Preventive', brand: 'Young Dental', stock: 25, minStock: 10, purchasePrice: 150, mrp: 220, uom: 'Jar' },
    { id: 'ITM-009', name: 'Cotton Rolls', category: 'Disposable', brand: 'Richmond', stock: 300, minStock: 50, purchasePrice: 180, mrp: 250, uom: 'Pack' },
    { id: 'ITM-010', name: 'Micro Applicators', category: 'Disposable', brand: 'Microbrush', stock: 400, minStock: 100, purchasePrice: 450, mrp: 600, uom: 'Box' },
    { id: 'ITM-011', name: 'Bonding Agent', category: 'Materials', brand: 'Kerr', stock: 10, minStock: 5, purchasePrice: 2500, mrp: 3200, uom: 'Bottle' },
    { id: 'ITM-012', name: 'Temporary Cement', category: 'Materials', brand: 'GC America', stock: 6, minStock: 4, purchasePrice: 1800, mrp: 2400, uom: 'Kit' },
    { id: 'ITM-013', name: 'Diamond Burs', category: 'Instruments', brand: 'SS White', stock: 45, minStock: 20, purchasePrice: 85, mrp: 120, uom: 'Unit' },
    { id: 'ITM-014', name: 'Fluoride Varnish', category: 'Preventive', brand: 'Colgate', stock: 30, minStock: 15, purchasePrice: 3500, mrp: 4500, uom: 'Box' },
    { id: 'ITM-015', name: 'Curing Light Tip', category: 'Equipment Parts', brand: 'Ivoclar', stock: 3, minStock: 2, purchasePrice: 4500, mrp: 5500, uom: 'Unit' },
    { id: 'ITM-016', name: 'Barrier Film', category: 'Infection Control', brand: 'Crosstex', stock: 12, minStock: 6, purchasePrice: 650, mrp: 850, uom: 'Roll' },
    { id: 'ITM-017', name: 'Autoclave Tape', category: 'Infection Control', brand: '3M', stock: 20, minStock: 10, purchasePrice: 220, mrp: 300, uom: 'Roll' },
    { id: 'ITM-018', name: 'X-Ray Sensor Sleeves', category: 'Infection Control', brand: 'Dexis', stock: 500, minStock: 200, purchasePrice: 850, mrp: 1100, uom: 'Box' },
    { id: 'ITM-019', name: 'Etchant Gel', category: 'Materials', brand: 'Ultradent', stock: 15, minStock: 10, purchasePrice: 450, mrp: 650, uom: 'Syringe' },
    { id: 'ITM-020', name: 'Endo Files', category: 'Instruments', brand: 'Maillefer', stock: 60, minStock: 30, purchasePrice: 950, mrp: 1400, uom: 'Pack' },
  ];

  const initialCategories = [
    { id: 1, name: 'Disposable', description: 'Single-use items like gloves, masks, and ejectors.' },
    { id: 2, name: 'Materials', description: 'Restorative materials, composites, and impressions.' },
    { id: 3, name: 'Medicine', description: 'Anaesthesia, antibiotics, and clinical drugs.' },
    { id: 4, name: 'Instruments', description: 'Handheld dental tools and burs.' },
    { id: 5, name: 'Preventive', description: 'Fluoride, sealants, and cleaning pastes.' },
    { id: 6, name: 'Equipment Parts', description: 'Replacement components for dental chairs and lights.' },
    { id: 7, name: 'Infection Control', description: 'Sterilization pouches, tapes, and barriers.' },
  ];

  const initialBatches = [
    { id: 1, batchId: 'BAT-2023-001', batchDate: '2023-10-15', itemId: 'ITM-001', itemName: 'Dental Gloves (M)', vendor: '3M Healthcare', expiry: '2025-10-15', qty: 50, price: 120, notes: 'Direct shipment from warehouse' },
    { id: 2, batchId: 'BAT-2023-002', batchDate: '2023-11-02', itemId: 'ITM-002', itemName: 'Dental Composite', vendor: 'Dentsply Sirona', expiry: '2024-11-02', qty: 15, price: 850, notes: 'Shade A2' },
    { id: 3, batchId: 'BAT-2023-003', batchDate: '2023-11-20', itemId: 'ITM-004', itemName: 'Anesthesia Vials', vendor: 'Septodont India', expiry: '2025-05-20', qty: 5, price: 210, notes: 'Keep refrigerated' },
  ];

  const initialPOs = [
    { id: 1, orderNo: 'PO-2024-001', vendor: '3M Healthcare', poDate: '2024-01-10', expectedDate: '2024-01-15', items: 3, status: 'Pending' },
    { id: 2, orderNo: 'PO-2024-002', vendor: 'Dentsply Sirona', poDate: '2024-01-12', expectedDate: '2024-01-18', items: 1, status: 'Received' },
    { id: 3, orderNo: 'PO-2024-003', vendor: 'Septodont India', poDate: '2024-01-15', expectedDate: '2024-01-20', items: 2, status: 'Cancelled' },
  ];

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('inventory_items');
    const parsed = saved ? JSON.parse(saved) : initialData;
    // Migration: If user only has the old 6 items, upgrade them to the new 20-item set
    if (parsed.length === 6 && initialData.length === 20) {
      localStorage.setItem('inventory_items', JSON.stringify(initialData));
      return initialData;
    }
    return parsed;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('inventory_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem('inventory_batches');
    return saved ? JSON.parse(saved) : initialBatches;
  });

  const [purchaseOrders, setPurchaseOrders] = useState(() => {
    const saved = localStorage.getItem('inventory_purchase_orders');
    return saved ? JSON.parse(saved) : initialPOs;
  });

  useEffect(() => {
    localStorage.setItem('inventory_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('inventory_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('inventory_batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('inventory_purchase_orders', JSON.stringify(purchaseOrders));
  }, [purchaseOrders]);

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddBatchModal, setShowAddBatchModal] = useState(false);
  const [showPOModal, setShowPOModal] = useState(false);
  const [showPOFilterModal, setShowPOFilterModal] = useState(false);
  const [showBatchFilterModal, setShowBatchFilterModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingBatch, setEditingBatch] = useState(null);
  const [editingPO, setEditingPO] = useState(null);

  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, type: '', id: null });

  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [newBatch, setNewBatch] = useState({
    batchId: '',
    batchDate: new Date().toISOString().split('T')[0],
    itemId: '',
    itemName: '',
    vendor: '',
    expiry: '',
    qty: 0,
    price: 0,
    notes: ''
  });

  const [newPO, setNewPO] = useState({
    orderNo: `PO-2024-00${purchaseOrders.length + 1}`,
    vendor: '',
    poDate: new Date().toISOString().split('T')[0],
    expectedDate: '',
    status: 'Pending',
    notes: '',
    items: [{ itemId: '', name: '', qty: 1, uom: 'Unit', brand: '' }]
  });

  // Delete Handlers
  const handleDeleteItem = (id) => {
    setDeleteConfirm({ show: true, type: 'item', id });
  };

  const handleDeleteCategory = (id) => {
    setDeleteConfirm({ show: true, type: 'category', id });
  };

  const handleDeleteBatch = (id) => {
    setDeleteConfirm({ show: true, type: 'batch', id });
  };

  const handleDeletePO = (id) => {
    setDeleteConfirm({ show: true, type: 'purchase order', id });
  };

  const confirmDelete = () => {
    const { type, id } = deleteConfirm;
    if (type === 'item') {
      setItems(items.filter(i => i.id !== id));
    } else if (type === 'category') {
      setCategories(categories.filter(c => c.id !== id));
    } else if (type === 'batch') {
      setBatches(batches.filter(b => b.id !== id));
    } else if (type === 'purchase order') {
      setPurchaseOrders(purchaseOrders.filter(p => p.id !== id));
    }
    setDeleteConfirm({ show: false, type: '', id: null });
  };

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [filteredItems, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

  const filteredCategories = useMemo(() => {
    return categories.filter(cat =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  const filteredBatches = useMemo(() => {
    return batches.filter(batch =>
      batch.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.vendor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [batches, searchQuery]);

  const filteredPOs = useMemo(() => {
    return purchaseOrders.filter(po =>
      po.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.vendor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [purchaseOrders, searchQuery]);

  const getStockStatus = (stock, min) => {
    if (stock <= 0) return { label: 'Out of Stock', class: 'critical' };
    if (stock <= min) return { label: 'Low Stock', class: 'low' };
    return { label: 'In Stock', class: 'high' };
  };

  const [newItem, setNewItem] = useState({
    id: `ITM-00${items.length + 1}`,
    name: '',
    category: '',
    brand: '',
    stock: 0,
    minStock: 0,
    purchasePrice: 0,
    mrp: 0,
    uom: 'Unit',
    description: ''
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    if (editingItem) {
      setItems(items.map(i => i.id === editingItem ? newItem : i));
      setEditingItem(null);
    } else {
      setItems([...items, newItem]);
    }
    setShowAddModal(false);
    resetNewItem();
  };

  const resetNewItem = () => {
    setNewItem({
      id: `ITM-00${items.length + 2}`,
      name: '',
      category: '',
      brand: '',
      stock: 0,
      minStock: 0,
      purchasePrice: 0,
      mrp: 0,
      uom: 'Unit',
      description: ''
    });
  };

  const handleExport = () => {
    // CSV Header
    const headers = ['Item ID', 'Item Name', 'Category', 'Brand', 'Stock', 'Min Stock', 'Price', 'MRP', 'UOM', 'Description'];

    // CSV Rows
    const rows = items.map(item => [
      item.id,
      item.name,
      item.category,
      item.brand,
      item.stock,
      item.minStock,
      item.purchasePrice,
      item.mrp,
      item.uom,
      item.description || ''
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    // Create Blob and Trigger Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Dental_Inventory_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tabs = ['Inventory Items', 'Categories', 'Batches', 'Purchase Orders'];

  return (
    <div className="inventory-module">
      {/* Top Tabs */}
      <div className="inventory-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top Bar */}
      <div className="inventory-top-bar">
        <h2 className="module-title">{activeTab}</h2>
        <div className="bar-actions">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search items, brands, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {activeTab === 'Inventory Items' && (
            <>
              <button className="action-button" onClick={() => setShowFilterModal(true)}>
                <Filter size={16} /> Filter
              </button>
              <button className="action-button" onClick={handleExport}>
                <FileSpreadsheet size={16} /> Export <ChevronDown size={14} />
              </button>
            </>
          )}
          {activeTab === 'Batches' && (
            <button className="action-button" onClick={() => setShowBatchFilterModal(true)}>
              <Filter size={16} /> Filter
            </button>
          )}
          {activeTab === 'Purchase Orders' && (
            <button className="action-button" onClick={() => setShowPOFilterModal(true)}>
              <Filter size={16} /> Filter
            </button>
          )}
          <button className="action-button violet-btn" onClick={() => {
            if (activeTab === 'Categories') setShowAddCategoryModal(true);
            else if (activeTab === 'Batches') setShowAddBatchModal(true);
            else if (activeTab === 'Purchase Orders') setShowPOModal(true);
            else setShowAddModal(true);
          }}>
            <Plus size={16} /> {
              activeTab === 'Categories' ? 'Add Category' :
                activeTab === 'Batches' ? 'Add Batch' :
                  activeTab === 'Purchase Orders' ? 'Add Purchase Order' :
                    'Add Item'
            }
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="inventory-content-card">
        {activeTab === 'Inventory Items' ? (
          <>
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Available Stock</th>
                  <th>Min Stock</th>
                  <th>Price</th>
                  <th>MRP</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.length > 0 ? (
                  paginatedItems.map((item, idx) => {
                    const status = getStockStatus(item.stock, item.minStock);
                    return (
                      <tr key={item.id} className="inventory-row">
                        <td>{(currentPage - 1) * rowsPerPage + idx + 1}</td>
                        <td>
                          <div style={{ fontWeight: 700 }}>{item.name}</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.id}</div>
                        </td>
                        <td>{item.category}</td>
                        <td>{item.brand}</td>
                        <td>
                          <div className={`stock-badge ${status.class}`}>
                            {item.stock} {item.uom}s
                          </div>
                        </td>
                        <td>{item.minStock}</td>
                        <td>₹{item.purchasePrice}</td>
                        <td>₹{item.mrp}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              className="action-button"
                              style={{ padding: '6px' }}
                              onClick={() => {
                                setNewItem(item);
                                setEditingItem(item.id);
                                setShowAddModal(true);
                              }}
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              className="action-button"
                              style={{ padding: '6px', color: '#ef4444' }}
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9">
                      <div className="empty-state">
                        <Package size={48} />
                        <p>No inventory items found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : activeTab === 'Categories' ? (
          <>
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((cat, idx) => (
                    <tr key={cat.id} className="inventory-row">
                      <td>{idx + 1}</td>
                      <td style={{ fontWeight: 700 }}>{cat.name}</td>
                      <td style={{ color: '#64748b', fontSize: '12px' }}>{cat.description}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="action-button"
                            style={{ padding: '6px' }}
                            onClick={() => {
                              setNewCategory(cat);
                              setEditingCategory(cat.id);
                              setShowAddCategoryModal(true);
                            }}
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            className="action-button"
                            style={{ padding: '6px', color: '#ef4444' }}
                            onClick={() => handleDeleteCategory(cat.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">
                      <div className="empty-state">
                        <Package size={48} />
                        <p>No categories found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : activeTab === 'Batches' ? (
          <>
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Batch ID</th>
                  <th>Batch Date</th>
                  <th>Item</th>
                  <th>Vendor</th>
                  <th>Expiry</th>
                  <th>Qty Available</th>
                  <th>Purchase Price</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBatches.length > 0 ? (
                  filteredBatches.map((batch, idx) => (
                    <tr key={batch.id} className="inventory-row">
                      <td>{idx + 1}</td>
                      <td style={{ fontWeight: 700 }}>{batch.batchId}</td>
                      <td>{batch.batchDate}</td>
                      <td>{batch.itemName}</td>
                      <td>{batch.vendor}</td>
                      <td>
                        <span style={{
                          color: new Date(batch.expiry) < new Date() ? '#ef4444' : 'inherit',
                          fontWeight: new Date(batch.expiry) < new Date() ? 700 : 'inherit'
                        }}>
                          {batch.expiry}
                        </span>
                      </td>
                      <td>{batch.qty}</td>
                      <td>₹{batch.price}</td>
                      <td style={{ fontSize: '11px', color: '#64748b', maxWidth: '150px' }}>{batch.notes}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="action-button"
                            style={{ padding: '6px' }}
                            onClick={() => {
                              setNewBatch(batch);
                              setEditingBatch(batch.id);
                              setShowAddBatchModal(true);
                            }}
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            className="action-button"
                            style={{ padding: '6px', color: '#ef4444' }}
                            onClick={() => handleDeleteBatch(batch.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">
                      <div className="empty-state">
                        <Package size={48} />
                        <p>No batches found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : activeTab === 'Purchase Orders' ? (
          <>
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Order No</th>
                  <th>Vendor</th>
                  <th>PO Date</th>
                  <th>Expected Delivery</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPOs.length > 0 ? (
                  filteredPOs.map((po, idx) => (
                    <tr key={po.id} className="inventory-row">
                      <td>{idx + 1}</td>
                      <td style={{ fontWeight: 700 }}>{po.orderNo}</td>
                      <td>{po.vendor}</td>
                      <td>{po.poDate}</td>
                      <td>{po.expectedDate}</td>
                      <td>{po.items} Items</td>
                      <td>
                        <span className={`status-badge ${po.status.toLowerCase()}`}>
                          {po.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="action-button"
                            style={{ padding: '6px' }}
                            onClick={() => {
                              setNewPO(po);
                              setEditingPO(po.id);
                              setShowPOModal(true);
                            }}
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            className="action-button"
                            style={{ padding: '6px', color: '#ef4444' }}
                            onClick={() => handleDeletePO(po.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">
                      <div className="empty-state">
                        <Package size={48} />
                        <p>No purchase orders found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <div className="empty-state">
            <Info size={48} />
            <p>{activeTab} module is coming soon</p>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="inventory-footer">
        <div className="pagination-left">
          <span className="footer-text">Rows per page:</span>
          <div className="rows-selector">
            {[10, 20, 50, 100].map(size => (
              <button
                key={size}
                className={`row-size-btn ${rowsPerPage === size ? 'active' : ''}`}
                onClick={() => { setRowsPerPage(size); setCurrentPage(1); }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="pagination-right">
          <span className="footer-text">
            Showing {filteredItems.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredItems.length)} of {filteredItems.length} records
          </span>
          <div className="nav-btns">
            <button
              className="nav-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              <ChevronLeft size={18} />
            </button>
            <div className="page-indicator">{currentPage}</div>
            <button
              className="nav-btn"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Inventory Item</h2>
              <button className="modal-close" onClick={() => {
                setShowAddModal(false);
                setEditingItem(null);
                resetNewItem();
              }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddItem}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Item Id <span>*</span> <Info size={12} /></label>
                    <input type="text" className="form-input" value={newItem.id} readOnly disabled />
                  </div>
                  <div className="form-group">
                    <label>SKU (optional)</label>
                    <input type="text" className="form-input" placeholder="SKU code" />
                  </div>
                  <div className="form-group full-width">
                    <label>Inventory Item name <span>*</span></label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter Inventory Item name"
                      required
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category <span>*</span></label>
                    <select
                      className="form-input"
                      required
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Brand</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Search or create brand"
                      value={newItem.brand}
                      onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Min Stock (Reorder Level)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={newItem.minStock}
                      onChange={(e) => setNewItem({ ...newItem, minStock: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Purchase Price (₹) <span>*</span></label>
                    <input
                      type="number"
                      className="form-input"
                      required
                      value={newItem.purchasePrice}
                      onChange={(e) => setNewItem({ ...newItem, purchasePrice: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Sale Price (MRP - ₹)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={newItem.mrp}
                      onChange={(e) => setNewItem({ ...newItem, mrp: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Unit of Measure (UOM)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Select or type UOM"
                      value={newItem.uom}
                      onChange={(e) => setNewItem({ ...newItem, uom: e.target.value })}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Description (optional)</label>
                    <textarea
                      className="form-input"
                      placeholder="Item description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="action-button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="action-button violet-btn">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="modal-container" style={{ maxWidth: '450px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Item Filters</h2>
              <button className="modal-close" onClick={() => setShowFilterModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Category</label>
                <input type="text" className="form-input" placeholder="Select categories" />
              </div>
              <div className="form-group">
                <label>Brands</label>
                <input type="text" className="form-input" placeholder="Select brands" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Min Price</label>
                  <input type="number" className="form-input" placeholder="0" />
                </div>
                <div className="form-group">
                  <label>Max Price</label>
                  <input type="number" className="form-input" placeholder="1000" />
                </div>
              </div>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <button className="action-button" style={{ border: 'none', color: '#8b5cf6' }}>Clear all</button>
              <button className="action-button violet-btn" onClick={() => setShowFilterModal(false)}>Apply Filter</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="modal-overlay" onClick={() => setShowAddCategoryModal(false)}>
          <div className="modal-container" style={{ maxWidth: '450px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
              <button className="modal-close" onClick={() => {
                setShowAddCategoryModal(false);
                setEditingCategory(null);
                setNewCategory({ name: '', description: '' });
              }}><X size={18} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (editingCategory) {
                setCategories(categories.map(c => c.id === editingCategory ? { ...newCategory, id: c.id } : c));
                setEditingCategory(null);
              } else {
                setCategories([...categories, { ...newCategory, id: categories.length + 1 }]);
              }
              setShowAddCategoryModal(false);
              setNewCategory({ name: '', description: '' });
            }}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Category Name <span>*</span></label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Consumables"
                    required
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-input"
                    placeholder="Write a brief description..."
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="action-button" onClick={() => setShowAddCategoryModal(false)}>Cancel</button>
                <button type="submit" className="action-button violet-btn">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Add Batch Modal */}
      {showAddBatchModal && (
        <div className="modal-overlay" onClick={() => setShowAddBatchModal(false)}>
          <div className="modal-container" style={{ maxWidth: '550px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingBatch ? 'Edit Batch' : 'Add New Batch'}</h2>
              <button className="modal-close" onClick={() => {
                setShowAddBatchModal(false);
                setEditingBatch(null);
                setNewBatch({
                  batchId: '',
                  batchDate: new Date().toISOString().split('T')[0],
                  itemId: '',
                  itemName: '',
                  vendor: '',
                  expiry: '',
                  qty: 0,
                  price: 0,
                  notes: ''
                });
              }}><X size={18} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (editingBatch) {
                setBatches(batches.map(b => b.id === editingBatch ? { ...newBatch, id: b.id } : b));
                setEditingBatch(null);
              } else {
                setBatches([...batches, { ...newBatch, id: batches.length + 1 }]);
              }
              setShowAddBatchModal(false);
              setNewBatch({
                batchId: '',
                batchDate: new Date().toISOString().split('T')[0],
                itemId: '',
                itemName: '',
                vendor: '',
                expiry: '',
                qty: 0,
                price: 0,
                notes: ''
              });
            }}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Item <span>*</span></label>
                  <select
                    className="form-input"
                    required
                    value={newBatch.itemId}
                    onChange={(e) => {
                      const selected = items.find(i => i.id === e.target.value);
                      setNewBatch({ ...newBatch, itemId: e.target.value, itemName: selected ? selected.name : '' });
                    }}
                  >
                    <option value="">Search and select an item</option>
                    {items.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Batch ID <span>*</span></label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. ABC-123"
                    required
                    value={newBatch.batchId}
                    onChange={(e) => setNewBatch({ ...newBatch, batchId: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Vendor</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Search or create vendor"
                    value={newBatch.vendor}
                    onChange={(e) => setNewBatch({ ...newBatch, vendor: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newBatch.expiry}
                    onChange={(e) => setNewBatch({ ...newBatch, expiry: e.target.value })}
                  />
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Item QTY <span>*</span></label>
                    <input
                      type="number"
                      className="form-input"
                      required
                      value={newBatch.qty}
                      onChange={(e) => setNewBatch({ ...newBatch, qty: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Purchase Price (₹)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={newBatch.price}
                      onChange={(e) => setNewBatch({ ...newBatch, price: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    className="form-input"
                    placeholder="Add any additional notes here..."
                    value={newBatch.notes}
                    onChange={(e) => setNewBatch({ ...newBatch, notes: e.target.value })}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="action-button" onClick={() => setShowAddBatchModal(false)}>Cancel</button>
                <button type="submit" className="action-button violet-btn">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Batch Filter Modal */}
      {showBatchFilterModal && (
        <div className="modal-overlay" onClick={() => setShowBatchFilterModal(false)}>
          <div className="modal-container" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Batch Filters</h2>
              <button className="modal-close" onClick={() => setShowBatchFilterModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Items</label>
                <select className="form-input">
                  <option value="">Select items</option>
                  {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Vendors</label>
                <select className="form-input">
                  <option value="">Select vendors</option>
                  {[...new Set(batches.map(b => b.vendor))].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>From Date</label>
                  <input type="date" className="form-input" />
                </div>
                <div className="form-group">
                  <label>To Date</label>
                  <input type="date" className="form-input" />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Min Price (₹)</label>
                  <input type="number" className="form-input" placeholder="0" />
                </div>
                <div className="form-group">
                  <label>Max Price (₹)</label>
                  <input type="number" className="form-input" placeholder="10000" />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Min Qty</label>
                  <input type="number" className="form-input" placeholder="0" />
                </div>
                <div className="form-group">
                  <label>Max Qty</label>
                  <input type="number" className="form-input" placeholder="100" />
                </div>
              </div>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <button className="action-button" style={{ border: 'none', color: '#8b5cf6' }}>Clear all</button>
              <button className="action-button violet-btn" onClick={() => setShowBatchFilterModal(false)}>Apply Filter</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm({ show: false, type: '', id: null })}>
          <div className="modal-container" style={{ maxWidth: '400px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div className="modal-body" style={{ padding: '40px 24px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#fee2e2',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <Trash2 size={30} color="#ef4444" />
              </div>
              <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Confirm Deletion</h2>
              <p style={{ color: '#64748b', lineHeight: '1.5' }}>
                Are you sure you want to delete this {deleteConfirm.type}? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer" style={{ border: 'none', paddingTop: 0 }}>
              <button
                className="action-button"
                style={{ flex: 1 }}
                onClick={() => setDeleteConfirm({ show: false, type: '', id: null })}
              >
                Cancel
              </button>
              <button
                className="action-button"
                style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none' }}
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Purchase Order Modal */}
      {showPOModal && (
        <div className="modal-overlay" onClick={() => {
          setShowPOModal(false);
          setEditingPO(null);
          setNewPO({
            orderNo: `PO-2024-00${purchaseOrders.length + 1}`,
            vendor: '',
            poDate: new Date().toISOString().split('T')[0],
            expectedDate: '',
            status: 'Pending',
            notes: '',
            items: [{ itemId: '', name: '', qty: 1, uom: 'Unit', brand: '' }]
          });
        }}>
          <div className="modal-container" style={{ maxWidth: '800px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingPO ? 'Edit Purchase Order' : 'New Purchase Order'}</h2>
              <button className="modal-close" onClick={() => setShowPOModal(false)}><X size={18} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (editingPO) {
                setPurchaseOrders(purchaseOrders.map(p => p.id === editingPO ? newPO : p));
                setEditingPO(null);
              } else {
                setPurchaseOrders([...purchaseOrders, { ...newPO, id: purchaseOrders.length + 1 }]);
              }
              setShowPOModal(false);
            }}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Order No</label>
                    <input type="text" className="form-input" value={newPO.orderNo} readOnly disabled />
                  </div>
                  <div className="form-group">
                    <label>Vendor</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Select or create vendor"
                      required
                      value={newPO.vendor}
                      onChange={(e) => setNewPO({ ...newPO, vendor: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Order Date <span>*</span></label>
                    <input
                      type="date"
                      className="form-input"
                      required
                      value={newPO.poDate}
                      onChange={(e) => setNewPO({ ...newPO, poDate: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Expected Delivery Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={newPO.expectedDate}
                      onChange={(e) => setNewPO({ ...newPO, expectedDate: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Items <span>*</span></h3>
                  </div>
                  <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', overflowX: 'auto' }}>
                    <div style={{ minWidth: '650px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 40px', gap: '12px', marginBottom: '8px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>
                        <div>Item</div>
                        <div>Qty</div>
                        <div>UOM</div>
                        <div>Brand</div>
                        <div></div>
                      </div>
                      {newPO.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 40px', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
                          <select
                            className="form-input"
                            value={item.itemId}
                            onChange={(e) => {
                              const selected = items.find(i => i.id === e.target.value);
                              const updated = [...newPO.items];
                              updated[idx] = { ...updated[idx], itemId: e.target.value, name: selected ? selected.name : '' };
                              setNewPO({ ...newPO, items: updated });
                            }}
                          >
                            <option value="">Item name</option>
                            {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                          </select>
                          <input
                            type="number"
                            className="form-input"
                            value={item.qty}
                            onChange={(e) => {
                              const updated = [...newPO.items];
                              updated[idx].qty = parseInt(e.target.value);
                              setNewPO({ ...newPO, items: updated });
                            }}
                          />
                          <select className="form-input">
                            <option>Unit</option>
                            <option>Box</option>
                            <option>Pack</option>
                          </select>
                          <input type="text" className="form-input" placeholder="Brand" />
                          <button
                            type="button"
                            style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }}
                            onClick={() => {
                              if (newPO.items.length > 1) {
                                setNewPO({ ...newPO, items: newPO.items.filter((_, i) => i !== idx) });
                              }
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="action-button"
                      style={{ border: 'none', color: '#10b981', padding: '8px 0', fontSize: '14px', fontWeight: 600 }}
                      onClick={() => setNewPO({ ...newPO, items: [...newPO.items, { itemId: '', name: '', qty: 1, uom: 'Unit', brand: '' }] })}
                    >
                      <Plus size={16} /> Add Item
                    </button>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '24px' }}>
                  <label>Notes</label>
                  <textarea
                    className="form-input"
                    placeholder="Add any notes for this purchase order..."
                    value={newPO.notes}
                    onChange={(e) => setNewPO({ ...newPO, notes: e.target.value })}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="action-button" onClick={() => setShowPOModal(false)}>Cancel</button>
                <button type="submit" className="action-button violet-btn">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Purchase Order Filter Modal */}
      {showPOFilterModal && (
        <div className="modal-overlay" onClick={() => setShowPOFilterModal(false)}>
          <div className="modal-container" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Purchase Order Filters</h2>
              <button className="modal-close" onClick={() => setShowPOFilterModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Vendor</label>
                <select className="form-input">
                  <option value="">Select vendor</option>
                  {[...new Set(purchaseOrders.map(p => p.vendor))].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select className="form-input">
                  <option value="">Select status</option>
                  <option>Pending</option>
                  <option>Received</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>From Date</label>
                  <input type="date" className="form-input" />
                </div>
                <div className="form-group">
                  <label>To Date</label>
                  <input type="date" className="form-input" />
                </div>
              </div>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <button className="action-button" style={{ border: 'none', color: '#8b5cf6' }}>Clear all</button>
              <button className="action-button violet-btn" onClick={() => setShowPOFilterModal(false)}>Apply Filter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
