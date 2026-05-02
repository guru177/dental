import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Plus, X, Edit, Trash2, FileText, ChevronLeft, ChevronRight, CheckCircle, Clock, FileWarning, Paperclip, Upload } from 'lucide-react';
import './ConsentForms.css';

const DEFAULT_TEMPLATES = [
  { id: 'T1', title: 'General Dental Consent', content: 'I hereby consent to the dental procedures discussed...', type: 'General' },
  { id: 'T2', title: 'Tooth Extraction Consent', content: 'I understand the risks of tooth extraction including...', type: 'Surgical' },
  { id: 'T3', title: 'Root Canal Therapy', content: 'I consent to root canal treatment and understand...', type: 'Endodontic' },
];

const DEFAULT_ISSUED = [
  { id: 'CF001', patient: 'Arjun Sharma', type: 'General', date: '2026-05-01', status: 'Signed', doctor: 'Dr. Smith', attachments: [] },
  { id: 'CF002', patient: 'Priya Nair', type: 'Extraction', date: '2026-05-02', status: 'Pending', doctor: 'Dr. Smith', attachments: ['X-Ray.png'] },
  { id: 'CF003', patient: 'Rahul Mehta', type: 'Root Canal', date: '2026-05-02', status: 'Signed', doctor: 'Dr. Jones', attachments: [] },
  { id: 'CF004', patient: 'Sneha Pillai', type: 'General', date: '2026-05-03', status: 'Pending', doctor: 'Dr. Smith', attachments: ['Report.pdf'] },
];

const ConsentForms = () => {
  const [activeTab, setActiveTab] = useState('Issued Forms');

  const [templates, setTemplates] = useState(DEFAULT_TEMPLATES);
  const [issuedForms, setIssuedForms] = useState(DEFAULT_ISSUED);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modals
  const [showFormModal, setShowFormModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null, type: '' });

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', type: 'General', content: '', // Template fields
    patient: '', doctor: '', date: new Date().toISOString().split('T')[0], status: 'Pending',
    attachments: [] // Files fields
  });

  const tabs = ['Issued Forms', 'Templates', 'Drafts'];

  // Data Filtering
  const filteredData = useMemo(() => {
    const data = activeTab === 'Templates' ? templates : issuedForms;
    const query = searchQuery.toLowerCase();

    return data.filter(item => {
      const mainText = activeTab === 'Templates' ? item.title : item.patient;
      return mainText.toLowerCase().includes(query) || item.type.toLowerCase().includes(query);
    });
  }, [activeTab, searchQuery, templates, issuedForms]);

  // Actions
  const handleSave = (e) => {
    e.preventDefault();
    if (activeTab === 'Templates') {
      if (editingId) {
        setTemplates(templates.map(t => t.id === editingId ? { ...t, ...formData } : t));
      } else {
        setTemplates([...templates, { id: Date.now().toString(), ...formData }]);
      }
    } else {
      if (editingId) {
        setIssuedForms(issuedForms.map(f => f.id === editingId ? { ...f, ...formData } : f));
      } else {
        setIssuedForms([...issuedForms, { id: Date.now().toString(), ...formData }]);
      }
    }
    closeModal();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ ...item });
    setShowFormModal(true);
  };

  const handleDelete = () => {
    if (deleteConfirm.type === 'Templates') {
      setTemplates(templates.filter(t => t.id !== deleteConfirm.id));
    } else {
      setIssuedForms(issuedForms.filter(f => f.id !== deleteConfirm.id));
    }
    setDeleteConfirm({ show: false, id: null });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, attachments: [...formData.attachments, ...files.map(f => f.name)] });
  };

  const removeFile = (fileName) => {
    setFormData({ ...formData, attachments: formData.attachments.filter(f => f !== fileName) });
  };

  const closeModal = () => {
    setShowFormModal(false);
    setEditingId(null);
    setFormData({
      title: '', type: 'General', content: '',
      patient: '', doctor: '', date: new Date().toISOString().split('T')[0], status: 'Pending',
      attachments: []
    });
  };

  // Pagination
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const pagedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Signed': return <span className="cf-badge signed"><CheckCircle size={12} /> Signed</span>;
      case 'Pending': return <span className="cf-badge pending"><Clock size={12} /> Pending</span>;
      default: return <span className="cf-badge draft">Draft</span>;
    }
  };

  return (
    <div className="cf-container">
      {/* ── Header Section ── */}
      <div className="cf-header">
        <div className="cf-title-area">
          <h1>Consent Forms</h1>
          <p>Manage and track patient legal documentation</p>
        </div>
        <div className="cf-header-actions">
          <div className="cf-search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder={`Search ${activeTab.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="cf-btn-primary" onClick={() => setShowFormModal(true)}>
            <Plus size={18} /> {activeTab === 'Templates' ? 'Create Template' : 'Issue New Form'}
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="cf-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`cf-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Content Table ── */}
      <div className="cf-content">
        <table className="cf-table">
          <thead>
            {activeTab === 'Templates' ? (
              <tr>
                <th>No.</th>
                <th>Template Title</th>
                <th>Category</th>
                <th>Preview Content</th>
                <th>Actions</th>
              </tr>
            ) : (
              <tr>
                <th>No.</th>
                <th>Date</th>
                <th>Patient Name</th>
                <th>Form Type</th>
                <th>Doctor</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            )}
          </thead>
          <tbody>
            {pagedData.length > 0 ? pagedData.map((item, index) => (
              <tr key={item.id} className="cf-row">
                <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                {activeTab === 'Templates' ? (
                  <>
                    <td><div className="cf-main-text">{item.title}</div></td>
                    <td><span className="cf-type-tag">{item.type}</span></td>
                    <td><div className="cf-preview-text">{item.content}</div></td>
                  </>
                ) : (
                  <>
                    <td>{item.date}</td>
                    <td><div className="cf-main-text">{item.patient}</div></td>
                    <td><span className="cf-type-tag">{item.type}</span></td>
                    <td>{item.doctor}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {getStatusBadge(item.status)}
                        {item.attachments?.length > 0 && (
                          <span className="cf-attachment-indicator">
                            <Paperclip size={10} /> {item.attachments.length} files
                          </span>
                        )}
                      </div>
                    </td>
                  </>
                )}
                <td>
                  <div className="cf-actions">
                    <button className="cf-icon-btn edit" onClick={() => handleEdit(item)}><Edit size={14} /></button>
                    <button className="cf-icon-btn delete" onClick={() => setDeleteConfirm({ show: true, id: item.id, type: activeTab })}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={activeTab === 'Templates' ? 5 : 7}>
                  <div className="cf-empty-state">
                    <FileText size={48} />
                    <p>No {activeTab.toLowerCase()} found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination Footer ── */}
      <div className="cf-footer">
        <div className="cf-footer-left">
          <span className="cf-footer-text">Rows per page:</span>
          <div className="cf-rows-selector">
            {[10, 20, 50, 100].map(size => (
              <button
                key={size}
                className={`cf-row-size-btn ${rowsPerPage === size ? 'active' : ''}`}
                onClick={() => { setRowsPerPage(size); setCurrentPage(1); }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="cf-footer-right">
          <span className="cf-footer-text">Total Records: {totalRecords}</span>
          <div className="cf-nav-btns">
            <button
              className="cf-nav-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              <ChevronLeft size={16} />
            </button>
            <div className="cf-page-indicator">{currentPage}</div>
            <button
              className="cf-nav-btn"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Add/Edit Modal ── */}
      {showFormModal && (
        <div className="cf-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="cf-modal wide" onClick={e => e.stopPropagation()}>
            <div className="cf-modal-header">
              <h2>{editingId ? 'Edit' : 'New'} {activeTab === 'Templates' ? 'Template' : 'Consent Form'}</h2>
              <button className="cf-close-btn" onClick={closeModal}><X size={20} /></button>
            </div>
            <form className="cf-modal-body" onSubmit={handleSave}>
              <div className="cf-form-grid">
                {activeTab === 'Templates' ? (
                  <>
                    <div className="cf-form-group full">
                      <label>Template Title</label>
                      <input
                        type="text" required
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. General Surgical Consent"
                      />
                    </div>
                    <div className="cf-form-group">
                      <label>Category</label>
                      <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                        <option>General</option>
                        <option>Surgical</option>
                        <option>Endodontic</option>
                        <option>Orthodontic</option>
                      </select>
                    </div>
                    <div className="cf-form-group full">
                      <label>Form Content</label>
                      <textarea
                        required rows="6"
                        value={formData.content}
                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Enter the legal agreement text..."
                      ></textarea>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="cf-form-group">
                      <label>Patient Name</label>
                      <input
                        type="text" required
                        value={formData.patient}
                        onChange={e => setFormData({ ...formData, patient: e.target.value })}
                        placeholder="Search patient..."
                      />
                    </div>
                    <div className="cf-form-group">
                      <label>Doctor</label>
                      <input
                        type="text" required
                        value={formData.doctor}
                        onChange={e => setFormData({ ...formData, doctor: e.target.value })}
                        placeholder="Dr. Name"
                      />
                    </div>
                    <div className="cf-form-group">
                      <label>Form Type</label>
                      <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                        <option>General</option>
                        <option>Extraction</option>
                        <option>Root Canal</option>
                        <option>Implant</option>
                      </select>
                    </div>
                    <div className="cf-form-group">
                      <label>Date</label>
                      <input
                        type="date" required
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                    <div className="cf-form-group">
                      <label>Status</label>
                      <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                        <option>Pending</option>
                        <option>Signed</option>
                      </select>
                    </div>
                    <div className="cf-form-group full">
                      <label>Attachments</label>
                      <div className="cf-file-upload">
                        <label className="cf-file-label">
                          <Upload size={16} /> Choose Files
                          <input type="file" multiple onChange={handleFileChange} style={{ display: 'none' }} />
                        </label>
                        <div className="cf-file-list">
                          {formData.attachments?.map((name, i) => (
                            <div key={i} className="cf-file-item">
                              <Paperclip size={12} />
                              <span>{name}</span>
                              <button type="button" onClick={() => removeFile(name)}><X size={12} /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="cf-modal-footer">
                <button type="button" className="cf-btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="cf-btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {deleteConfirm.show && (
        <div className="cf-overlay" onClick={() => setDeleteConfirm({ show: false, id: null })}>
          <div className="cf-modal delete-modal" onClick={e => e.stopPropagation()}>
            <div className="cf-modal-body warning">
              <FileWarning size={48} color="#ef4444" />
              <h2>Delete {deleteConfirm.type === 'Templates' ? 'Template' : 'Form'}?</h2>
              <p>This action cannot be undone. Are you sure you want to remove this record?</p>
              <div className="cf-modal-actions">
                <button className="cf-btn-secondary" onClick={() => setDeleteConfirm({ show: false, id: null })}>Cancel</button>
                <button className="cf-btn-danger" onClick={handleDelete}>Yes, Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsentForms;
