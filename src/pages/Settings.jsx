import React, { useState } from 'react';
import { Building2, Pencil, ChevronDown, Plus, Trash2, X, Eye, MessageCircle, Mail, MessageSquare, Wallet, CheckCircle2, Circle, FileText, LayoutTemplate } from 'lucide-react';
import './Settings.css';

// Reusable Toggle Component
const CustomToggle = ({ checked, onChange }) => (
  <div className={`custom-toggle ${checked ? 'active' : ''}`} onClick={onChange}>
    <div className="toggle-knob"></div>
  </div>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [topUpAmount, setTopUpAmount] = useState('500');

  // System Settings State
  const [pidPrefix, setPidPrefix] = useState('CC');
  const [nextPid, setNextPid] = useState('1');

  // Prescription Settings State
  const [activeTemplate, setActiveTemplate] = useState('Template 1');
  const [prescSettings, setPrescSettings] = useState({
    docNameHeader: true,
    docPhoneHeader: true,
    docStampHeader: false,
    docNameFooter: true,
    patComplaint: true,
    patHistory: true,
    dentalHistory: true,
    onExamination: true,
    allergies: true,
    ongoingMeds: true,
    medZeroPrice: false,
    medComposition: false,
    clinicLogo: true,
    clinicName: true,
    clinicContact: true,
    showFooterNotes: true,
    footerNotesText: 'Report to us manually immediately if you experience pain, bleeding, swelling, vomiting, or any other critical / vital symptoms.'
  });

  const handlePrescToggle = (key) => {
    setPrescSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Modals State
  const [showNewMemberModal, setShowNewMemberModal] = useState(false);
  const [showNewRoleModal, setShowNewRoleModal] = useState(false);

  // General Form State
  const [formData, setFormData] = useState({
    clinicName: 'Ccv',
    supportWaNumber: '-',
    website: '-',
    taxGstIn: '-',
    supportMail: 'guruprasad6282@gmail.com',
    location: 'Pancode, Perumbavoor - Puthenkurish Road, India',
    pincode: '682310',
    bankName: '-',
    bankHolderName: '-',
    accountNumber: '-',
    ifscCode: '-',
    branch: '-',
    upiId: '-'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLogoPreview(imageUrl);
    }
  };

  const handleTeamClick = () => {
    setIsTeamMenuOpen(!isTeamMenuOpen);
    if (!isTeamMenuOpen && !activeTab.startsWith('Team-')) {
      setActiveTab('Team-Staff');
    }
  };

  const navItems = [
    { id: 'General', label: 'General' },
    { id: 'Team', label: 'Team', hasDropdown: true },
    { id: 'Notifications', label: 'Notifications' },
    { id: 'System Settings', label: 'System Settings' }
  ];

  // Colors for New Member Modal
  const colorSwatches = [
    '#ffe4e6', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843',
    '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81', '#1e1b4b',
    '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d', '#052e16',
    '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03',
    '#fef9c3', '#fef08a', '#fde047', '#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12', '#422006',
    '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12', '#431407',
    '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a'
  ];

  const permissionsMatrix = [
    { module: 'Appointments', desc: 'Manage patient appointments and scheduling', perms: ['View', 'Edit', 'Export', 'Delete', 'Create'] },
    { module: 'Dashboard', desc: 'Manage dashboard', perms: ['Dashboard', 'Analytics'] },
    { module: 'Patients', desc: 'Access and manage patient records', perms: ['View List', 'Create', 'View Profile', 'Edit', 'Import', 'Delete'] },
    { module: 'Invoices', desc: 'Handle billing and invoices', perms: ['View', 'Create', 'View Outstanding', 'Edit', 'Export', 'Delete'] },
    { module: 'Income', desc: 'Manage income transactions', perms: ['View', 'Edit', 'Export', 'Delete', 'Create'] },
    { module: 'Expenses', desc: 'Manage expense transactions', perms: ['View', 'Edit', 'Export', 'Delete', 'Create'] }
  ];

  const notificationsList = [
    { name: 'Appointment Confirmation', whatsapp: true, email: false, message: false },
    { name: 'Invoice Notification', whatsapp: true, email: false, message: false },
    { name: 'Prescription Notification', whatsapp: true, email: false, message: false },
    { name: 'Appointment Reminders', whatsapp: true, email: false, message: false },
    { name: 'Google Review Collection', whatsapp: true, email: false, message: false },
    { name: 'Consent Form Notification', whatsapp: true, email: false, message: false },
    { name: 'Daily Report Notification', whatsapp: true, email: false, message: false }
  ];

  return (
    <div className="settings-page">
      {/* ─── Breadcrumbs ─── */}
      <div className="settings-header">
        <h2>
          <span className="text-muted">Settings / </span> 
          {activeTab.startsWith('Team-') ? 'Team / ' + (activeTab === 'Team-Staff' ? 'Staff Members' : 'Access Roles') : activeTab}
        </h2>
      </div>

      <div className="settings-container">
        {/* ─── Left Sidebar Navigation ─── */}
        <aside className="settings-sidebar">
          <nav>
            {navItems.map(item => (
              <React.Fragment key={item.id}>
                <button
                  className={`set-nav-item ${(activeTab === item.id || (item.id === 'Team' && activeTab.startsWith('Team-'))) ? 'active' : ''}`}
                  onClick={() => item.id === 'Team' ? handleTeamClick() : setActiveTab(item.id)}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown size={16} className={`dropdown-icon ${isTeamMenuOpen && item.id === 'Team' ? 'rotate' : ''}`} />
                  )}
                </button>
                {/* Render Team Sub-Menu */}
                {item.id === 'Team' && isTeamMenuOpen && (
                  <div className="set-sub-menu">
                    <button 
                      className={`set-sub-item ${activeTab === 'Team-Staff' ? 'sub-active' : ''}`}
                      onClick={() => setActiveTab('Team-Staff')}
                    >
                      Staff Members
                    </button>
                    <button 
                      className={`set-sub-item ${activeTab === 'Team-Roles' ? 'sub-active' : ''}`}
                      onClick={() => setActiveTab('Team-Roles')}
                    >
                      Access Roles
                    </button>
                  </div>
                )}
              </React.Fragment>
            ))}
          </nav>
        </aside>

        {/* ─── Right Content Area ─── */}
        <div className="settings-content">
          
          {/* GENERAL TAB */}
          {activeTab === 'General' && (
            <div className="tab-pane-general">
              {/* Top Card: Identity */}
              <div className="set-card">
                <div className="set-card-header-flex">
                  <div className="clinic-identity">
                    <div className="clinic-icon-box">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Clinic Logo" className="uploaded-logo" />
                      ) : (
                        <Building2 size={24} color="#fff" />
                      )}
                    </div>
                    {isEditing ? (
                      <input 
                        type="text" 
                        name="clinicName" 
                        value={formData.clinicName} 
                        onChange={handleInputChange} 
                        className="inline-edit-input"
                        placeholder="Store Name"
                      />
                    ) : (
                      <h3>{formData.clinicName}</h3>
                    )}
                  </div>
                  
                  <div className="upload-btn-wrapper">
                    <button className="btn-outline-action" onClick={() => document.getElementById('logo-upload').click()}>
                      Upload Logo/Icon <Pencil size={14} />
                    </button>
                    <input 
                      type="file" 
                      id="logo-upload" 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={handleLogoUpload}
                    />
                  </div>
                </div>
                
                <div className="summary-boxes">
                  <div className="sum-box">
                    <h4>Admin Account Details</h4>
                    <p className="admin-name">Guru</p>
                    <p className="admin-contact">guruprasad6282@gmail.com</p>
                    <p className="admin-contact">+916282390631</p>
                  </div>
                  <div className="sum-box">
                    <h4>Primary Location</h4>
                    <p className="location-text">
                      Pancode, Perumbavoor - Puthenkurish Road<br />
                      Aikkaranad North, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Card: Business Details Form */}
              <div className="set-card">
                <div className="set-card-header-right">
                  <button 
                    className={`btn-outline-action ${isEditing ? 'editing' : ''}`}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Save Changes' : 'Edit'} <Pencil size={14} />
                  </button>
                </div>
                
                <div className="form-blocks-container">
                  {/* Left Block: General Details */}
                  <div className="form-block">
                    <h4>General Details</h4>
                    <div className="form-inner-grid">
                      <div className="form-group">
                        <label>Support WA Number</label>
                        <input type="text" name="supportWaNumber" value={formData.supportWaNumber} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>Website</label>
                        <input type="text" name="website" value={formData.website} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>Tax/GSTIN</label>
                        <input type="text" name="taxGstIn" value={formData.taxGstIn} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>Support Mail</label>
                        <input type="email" name="supportMail" value={formData.supportMail} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>Pincode</label>
                        <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                    </div>
                  </div>

                  {/* Right Block: Bank Account Details */}
                  <div className="form-block">
                    <h4>Bank Account Details</h4>
                    <div className="form-inner-grid">
                      <div className="form-group">
                        <label>Bank Name</label>
                        <input type="text" name="bankName" value={formData.bankName} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>Bank Holder Name</label>
                        <input type="text" name="bankHolderName" value={formData.bankHolderName} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>Account Number</label>
                        <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>IFSC Code</label>
                        <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>Branch</label>
                        <input type="text" name="branch" value={formData.branch} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>UPI Id</label>
                        <input type="text" name="upiId" value={formData.upiId} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TEAM: STAFF MEMBERS TAB */}
          {activeTab === 'Team-Staff' && (
            <div className="set-card tab-pane-team">
              <div className="set-card-header-flex">
                <h3 className="pane-title">Branch Team</h3>
                <button className="btn-primary-gradient" onClick={() => setShowNewMemberModal(true)}>
                  <Plus size={16} /> New Member
                </button>
              </div>
              <div className="set-table-container">
                <table className="set-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th>Phone</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="font-medium text-slate-800">Guru</td>
                      <td>guruprasad6282@gmail.com</td>
                      <td>Admin</td>
                      <td>-</td>
                      <td>+916282390631</td>
                      <td>-</td>
                      <td><span className="badge-verify">Verify</span></td>
                      <td><button className="btn-icon-dots">⋮</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TEAM: ACCESS ROLES TAB */}
          {activeTab === 'Team-Roles' && (
            <div className="set-card tab-pane-team">
              <div className="set-card-header-flex">
                <h3 className="pane-title">Branch Role</h3>
                <button className="btn-primary-gradient" onClick={() => setShowNewRoleModal(true)}>
                  <Plus size={16} /> New Role
                </button>
              </div>
              <div className="set-table-container">
                <table className="set-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Role Name</th>
                      <th>Description</th>
                      <th style={{textAlign: 'right'}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="font-medium text-slate-800"><ChevronDown size={14} className="inline-icon"/> Admin</td>
                      <td>Administrator with full access</td>
                      <td style={{textAlign: 'right'}}><button className="btn-icon-delete"><Trash2 size={14}/></button></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="font-medium text-slate-800"><ChevronDown size={14} className="inline-icon"/> Nurse</td>
                      <td>Nurse with limited access to appointments and view labs</td>
                      <td style={{textAlign: 'right'}}><button className="btn-icon-delete"><Trash2 size={14}/></button></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="font-medium text-slate-800"><ChevronDown size={14} className="inline-icon"/> Doctor</td>
                      <td>Doctor with access to clinical and billing features</td>
                      <td style={{textAlign: 'right'}}><button className="btn-icon-delete"><Trash2 size={14}/></button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'Notifications' && (
            <div className="tab-pane-notifications">
              
              {/* 3-Column Stats Row */}
              <div className="stats-row">
                {/* WhatsApp Card */}
                <div className="stat-card">
                  <div className="stat-card-header">
                    <MessageCircle size={20} className="stat-icon whatsapp" />
                    <span>WhatsApp</span>
                  </div>
                  <div className="stat-body">
                    <p className="stat-label">Notifications Sent</p>
                    <h3 className="stat-value">0</h3>
                  </div>
                  <div className="stat-footer">
                    <span>Cost/Message</span>
                    <span className="stat-cost">₹0.00</span>
                  </div>
                </div>

                {/* Email Card */}
                <div className="stat-card">
                  <div className="stat-card-header">
                    <Mail size={20} className="stat-icon email" />
                    <span>Email</span>
                  </div>
                  <div className="stat-body">
                    <p className="stat-label">Notifications Sent</p>
                    <h3 className="stat-value">0</h3>
                  </div>
                  <div className="stat-footer">
                    <span>Cost/Message</span>
                    <span className="stat-cost">₹0.00</span>
                  </div>
                </div>

                {/* Message Card */}
                <div className="stat-card">
                  <div className="stat-card-header">
                    <MessageSquare size={20} className="stat-icon message" />
                    <span>Message</span>
                  </div>
                  <div className="stat-body">
                    <p className="stat-label">Notifications Sent</p>
                    <h3 className="stat-value">0</h3>
                  </div>
                  <div className="stat-footer">
                    <span>Cost/Message</span>
                    <span className="stat-cost">₹0.00</span>
                  </div>
                </div>
              </div>

              {/* Wallet Section Row */}
              <div className="wallet-section-row">
                {/* Left: Recent Top Ups */}
                <div className="set-card flex-1 flex-col">
                  <div className="set-card-header-flex">
                    <h3 className="pane-title">Recent Top Ups</h3>
                    <div className="select-wrapper-small">
                      <select><option>Date</option></select>
                      <ChevronDown size={14} className="sel-icon"/>
                    </div>
                  </div>
                  <div className="recent-top-ups-content">
                    <button className="btn-outline-action full-width justify-center mt-20">View Full History</button>
                  </div>
                </div>

                {/* Right: Wallet Balance */}
                <div className="set-card flex-2">
                  <div className="wallet-header">
                    <div className="wallet-icon-box">
                      <Wallet size={20} />
                    </div>
                    <div className="wallet-info">
                      <p className="wallet-label">Wallet Balance</p>
                      <h2 className="wallet-balance">₹0.00</h2>
                    </div>
                  </div>
                  <p className="last-topup">Last Top up: N/A</p>
                  
                  <div className="low-balance-banner">
                    <span className="warn-icon">!</span> Low Balance - Top up soon!
                  </div>

                  <div className="add-funds-section">
                    <h4>Add Funds To Your Wallet</h4>
                    <div className="amount-pills">
                      {['500', '1000', '2000', '5000'].map(amt => (
                        <button 
                          key={amt}
                          className={`amount-pill ${topUpAmount === amt ? 'active' : ''}`}
                          onClick={() => setTopUpAmount(amt)}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                    <div className="custom-amount-box">
                      <label>Custom Amount</label>
                      <input 
                        type="text" 
                        placeholder="Enter Amount Min 500" 
                        value={topUpAmount}
                        onChange={(e) => setTopUpAmount(e.target.value)}
                      />
                    </div>
                    <button className="btn-primary-gradient full-width justify-center mt-16">
                      Top Up (₹{topUpAmount || '0'})
                    </button>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="set-card mt-24">
                <div className="prefs-header">
                  <h3 className="pane-title">Notification Preferences</h3>
                  <p className="perm-desc">Choose which automated messages your clinic sends to patients.</p>
                </div>
                
                <div className="prefs-list">
                  {notificationsList.map((item, idx) => (
                    <div key={idx} className="pref-row">
                      <div className="pref-name">{item.name}</div>
                      <button className="btn-outline-action small-btn">Preview</button>
                      <div className="pref-toggles">
                        <div className={`pref-toggle ${item.whatsapp ? 'active' : ''}`}>
                          {item.whatsapp ? <CheckCircle2 size={16} className="tgl-icon-active"/> : <Circle size={16} className="tgl-icon"/>}
                          <span>Whatsapp</span>
                        </div>
                        <div className={`pref-toggle ${item.email ? 'active' : ''}`}>
                          {item.email ? <CheckCircle2 size={16} className="tgl-icon-active"/> : <Circle size={16} className="tgl-icon"/>}
                          <span>Email</span>
                        </div>
                        <div className={`pref-toggle ${item.message ? 'active' : ''}`}>
                          {item.message ? <CheckCircle2 size={16} className="tgl-icon-active"/> : <Circle size={16} className="tgl-icon"/>}
                          <span>Message</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Log */}
              <div className="set-card mt-24">
                <div className="set-card-header-flex">
                  <h3 className="pane-title">Message Log</h3>
                  <div className="flex gap-12">
                    <div className="select-wrapper-small">
                      <select><option>All</option></select>
                      <ChevronDown size={14} className="sel-icon"/>
                    </div>
                    <div className="select-wrapper-small">
                      <select><option>All Time</option></select>
                      <ChevronDown size={14} className="sel-icon"/>
                    </div>
                  </div>
                </div>
                
                <div className="set-table-container mt-16">
                  <table className="set-table">
                    <thead>
                      <tr>
                        <th>TIME</th>
                        <th>CHANNEL</th>
                        <th>RECIPIENT</th>
                        <th>TEMPLATE</th>
                        <th>STATUS</th>
                        <th>COST</th>
                      </tr>
                    </thead>
                  </table>
                  <div className="empty-state-logs">
                    No messages found
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* SYSTEM SETTINGS TAB */}
          {activeTab === 'System Settings' && (
            <div className="tab-pane-system">
              
              {/* Patient ID Settings */}
              <div className="set-card mb-24">
                <h3 className="pane-title">Patient ID (PID) settings</h3>
                <p className="perm-desc mb-20">Set the prefix and next number for new patient IDs (e.g. SKM001, SKM002).</p>
                
                <div className="pid-inputs-grid">
                  <div className="form-group">
                    <label>Prefix</label>
                    <input 
                      type="text" 
                      value={pidPrefix} 
                      onChange={(e) => setPidPrefix(e.target.value)} 
                      placeholder="CC" 
                      maxLength="4"
                    />
                    <span className="helper-text">Max 4 characters (e.g. clinic short name).</span>
                  </div>
                  <div className="form-group">
                    <label>Next patient number</label>
                    <input 
                      type="number" 
                      value={nextPid} 
                      onChange={(e) => setNextPid(e.target.value)} 
                      placeholder="1" 
                    />
                    <span className="helper-text">Next ID will be {pidPrefix}{(nextPid || '0').toString().padStart(3, '0')}.</span>
                  </div>
                </div>
                
                <div className="pid-actions mt-20">
                  <button className="btn-outline-action">Migrate existing IDs</button>
                  <button className="btn-primary-gradient">Save</button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="danger-zone-card mt-24">
                <div className="danger-content">
                  <h3 className="danger-title">Reset My Account</h3>
                  <p className="danger-desc">This will permanently delete all your data including patients, appointments, treatments, and invoices. This action cannot be undone.</p>
                </div>
                <button className="btn-danger-solid">Reset</button>
              </div>

            </div>
          )}

          {/* PRESCRIPTION SETTINGS TAB */}
          {activeTab === 'Prescription Settings' && (
            <div className="tab-pane-prescription">
              
              {/* Top Section: Template Selector */}
              <div className="set-card">
                <div className="prefs-header">
                  <h3 className="pane-title">Prescription Template</h3>
                  <p className="perm-desc">Select the layout for your prescription.</p>
                </div>
                
                <div className="template-cards-wrapper">
                  <div 
                    className={`template-card ${activeTemplate === 'Template 1' ? 'active' : ''}`}
                    onClick={() => setActiveTemplate('Template 1')}
                  >
                    <div className="template-preview">
                      <LayoutTemplate size={32} color="#cbd5e1" />
                    </div>
                    <div className="template-info">
                      <div className="tmpl-name">Template 1</div>
                      <button className="btn-outline-action small-btn m-0" onClick={(e) => e.stopPropagation()}>Preview</button>
                    </div>
                    {activeTemplate === 'Template 1' && <CheckCircle2 size={20} className="template-check" />}
                  </div>

                  <div 
                    className={`template-card ${activeTemplate === 'Template 2' ? 'active' : ''}`}
                    onClick={() => setActiveTemplate('Template 2')}
                  >
                    <div className="template-preview">
                      <FileText size={32} color="#cbd5e1" />
                    </div>
                    <div className="template-info">
                      <div className="tmpl-name">Template 2</div>
                      <button className="btn-outline-action small-btn m-0" onClick={(e) => e.stopPropagation()}>Preview</button>
                    </div>
                    {activeTemplate === 'Template 2' && <CheckCircle2 size={20} className="template-check" />}
                  </div>
                </div>
              </div>

              {/* Middle Section: Toggles Block 1 */}
              <div className="form-blocks-container mt-24">
                {/* Doctor Info */}
                <div className="set-card flex-1">
                  <h4 className="section-subtitle">Doctor Information</h4>
                  <div className="toggle-list">
                    <div className="toggle-row">
                      <div className="toggle-text">
                        <span className="tgl-title">Show doctor's name in the header</span>
                        <span className="tgl-desc">Show doctor's name at the header of the prescription.</span>
                      </div>
                      <CustomToggle checked={prescSettings.docNameHeader} onChange={() => handlePrescToggle('docNameHeader')} />
                    </div>
                    <div className="toggle-row">
                      <div className="toggle-text">
                        <span className="tgl-title">Show doctor's phone number in the header</span>
                        <span className="tgl-desc">Show doctor's contact number in the header.</span>
                      </div>
                      <CustomToggle checked={prescSettings.docPhoneHeader} onChange={() => handlePrescToggle('docPhoneHeader')} />
                    </div>
                    <div className="toggle-row">
                      <div className="toggle-text">
                        <span className="tgl-title">Show doctor's stamp / signature in the header</span>
                        <span className="tgl-desc">Show doctor's stamp or signature in the header.</span>
                      </div>
                      <CustomToggle checked={prescSettings.docStampHeader} onChange={() => handlePrescToggle('docStampHeader')} />
                    </div>
                    <div className="toggle-row">
                      <div className="toggle-text">
                        <span className="tgl-title">Show doctor's name in the footer (signature area)</span>
                        <span className="tgl-desc">Show doctor's name near the signature area.</span>
                      </div>
                      <CustomToggle checked={prescSettings.docNameFooter} onChange={() => handlePrescToggle('docNameFooter')} />
                    </div>
                  </div>
                </div>

                {/* Medical Data */}
                <div className="set-card flex-1">
                  <h4 className="section-subtitle">Medical Data Sections</h4>
                  <div className="toggle-list">
                    <div className="toggle-row">
                      <div className="toggle-text">
                        <span className="tgl-title">Show Patient Complaint</span>
                        <span className="tgl-desc">Display the patient's chief complaint.</span>
                      </div>
                      <CustomToggle checked={prescSettings.patComplaint} onChange={() => handlePrescToggle('patComplaint')} />
                    </div>
                    <div className="toggle-row">
                      <div className="toggle-text">
                        <span className="tgl-title">Show Patient History</span>
                        <span className="tgl-desc">Display relevant medical history.</span>
                      </div>
                      <CustomToggle checked={prescSettings.patHistory} onChange={() => handlePrescToggle('patHistory')} />
                    </div>
                    <div className="toggle-row">
                      <div className="toggle-text">
                        <span className="tgl-title">Show Dental History</span>
                        <span className="tgl-desc">Display past dental procedure history.</span>
                      </div>
                      <CustomToggle checked={prescSettings.dentalHistory} onChange={() => handlePrescToggle('dentalHistory')} />
                    </div>
                    <div className="toggle-row">
                      <div className="toggle-text">
                        <span className="tgl-title">Show On Examination</span>
                        <span className="tgl-desc">Display examination findings.</span>
                      </div>
                      <CustomToggle checked={prescSettings.onExamination} onChange={() => handlePrescToggle('onExamination')} />
                    </div>
                    <div className="toggle-row">
                      <div className="toggle-text">
                        <span className="tgl-title">Show Allergies</span>
                        <span className="tgl-desc">Display the patient's allergies.</span>
                      </div>
                      <CustomToggle checked={prescSettings.allergies} onChange={() => handlePrescToggle('allergies')} />
                    </div>
                    <div className="toggle-row">
                      <div className="toggle-text">
                        <span className="tgl-title">Show Ongoing Medications</span>
                        <span className="tgl-desc">Display the patient's current medications.</span>
                      </div>
                      <CustomToggle checked={prescSettings.ongoingMeds} onChange={() => handlePrescToggle('ongoingMeds')} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Section: Toggles Block 2 */}
              <div className="form-blocks-container mt-24">
                {/* Medicine Information */}
                <div className="set-card flex-1">
                  <h4 className="section-subtitle">Medicine Information</h4>
                  <div className="toggle-list">
                    <div className="toggle-row">
                      <div className="toggle-text">
                        <span className="tgl-title">Show medicines with zero price/amount on the invoice</span>
                        <span className="tgl-desc">Show medicines with zero price or amount on the invoice.</span>
                      </div>
                      <CustomToggle checked={prescSettings.medZeroPrice} onChange={() => handlePrescToggle('medZeroPrice')} />
                    </div>
                    <div className="toggle-row">
                      <div className="toggle-text">
                        <span className="tgl-title">Show medicine composition / content</span>
                        <span className="tgl-desc">Show medicine content/composition on the prescription/invoice.</span>
                      </div>
                      <CustomToggle checked={prescSettings.medComposition} onChange={() => handlePrescToggle('medComposition')} />
                    </div>
                  </div>
                </div>

                {/* Clinic Header Details */}
                <div className="set-card flex-1">
                  <h4 className="section-subtitle">Clinic Header Details</h4>
                  <div className="toggle-list">
                    <div className="toggle-row">
                      <div className="toggle-text">
                        <span className="tgl-title">Show Clinic Logo</span>
                        <span className="tgl-desc">Display the clinic logo in the header.</span>
                      </div>
                      <CustomToggle checked={prescSettings.clinicLogo} onChange={() => handlePrescToggle('clinicLogo')} />
                    </div>
                    <div className="toggle-row">
                      <div className="toggle-text">
                        <span className="tgl-title">Show Clinic Name</span>
                        <span className="tgl-desc">Display the clinic name in the header.</span>
                      </div>
                      <CustomToggle checked={prescSettings.clinicName} onChange={() => handlePrescToggle('clinicName')} />
                    </div>
                    <div className="toggle-row">
                      <div className="toggle-text">
                        <span className="tgl-title">Show Clinic Contact</span>
                        <span className="tgl-desc">Display clinic phone/contact details in the header.</span>
                      </div>
                      <CustomToggle checked={prescSettings.clinicContact} onChange={() => handlePrescToggle('clinicContact')} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Footer Notes */}
              <div className="set-card mt-24">
                <div className="toggle-row pb-16">
                  <div className="toggle-text">
                    <span className="tgl-title">Show footer notes / terms & conditions</span>
                    <span className="tgl-desc">Enable or disable footer notes such as terms, instructions or disclaimers.</span>
                  </div>
                  <CustomToggle checked={prescSettings.showFooterNotes} onChange={() => handlePrescToggle('showFooterNotes')} />
                </div>
                
                <div className="footer-notes-area">
                  <textarea 
                    className="full-width-textarea"
                    rows="4"
                    disabled={!prescSettings.showFooterNotes}
                    value={prescSettings.footerNotesText}
                    onChange={(e) => setPrescSettings(prev => ({...prev, footerNotesText: e.target.value}))}
                  />
                  <p className="helper-text mt-8">Appears at the bottom of the prescription. You can use basic formatting (bold, italic, links).</p>
                </div>
              </div>

            </div>
          )}

          {/* OTHER TABS FALLBACK */}
          {!activeTab.startsWith('Team-') && activeTab !== 'General' && activeTab !== 'Notifications' && activeTab !== 'System Settings' && activeTab !== 'Prescription Settings' && (
            <div className="tab-pane-placeholder">
              <h3>{activeTab} Settings</h3>
              <p>Configuration options for {activeTab} will appear here.</p>
            </div>
          )}

        </div>
      </div>

      {/* ─── Modals ─── */}

      {/* NEW MEMBER MODAL */}
      {showNewMemberModal && (
        <div className="set-modal-overlay">
          <div className="set-modal large-modal">
            <div className="set-modal-header">
              <h2>Add New Member</h2>
              <button className="btn-close-modal" onClick={() => setShowNewMemberModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="set-modal-body">
              <div className="form-inner-grid">
                <div className="form-group">
                  <label>Email<span className="req">*</span></label>
                  <input type="email" placeholder="Enter mail" />
                </div>
                <div className="form-group">
                  <label>Full Name<span className="req">*</span></label>
                  <input type="text" placeholder="Enter name" />
                </div>
                <div className="form-group">
                  <label>Mobile Number<span className="req">*</span></label>
                  <input type="text" placeholder="Enter mobile number" />
                </div>
                <div className="form-group">
                  <label>Branch<span className="req">*</span></label>
                  <div className="select-wrapper">
                    <select><option>Select branch</option></select>
                    <ChevronDown size={14} className="sel-icon"/>
                  </div>
                </div>
                <div className="form-group">
                  <label>Password<span className="req">*</span></label>
                  <div className="pwd-wrapper">
                    <input type="password" placeholder="Enter password" />
                    <Eye size={16} className="pwd-icon" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Access Role<span className="req">*</span></label>
                  <div className="select-wrapper">
                    <select><option>Select role</option></select>
                    <ChevronDown size={14} className="sel-icon"/>
                  </div>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <div className="select-wrapper">
                    <select><option>Select category</option></select>
                    <ChevronDown size={14} className="sel-icon"/>
                  </div>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <div className="select-wrapper">
                    <select><option>Select or add new department</option></select>
                    <ChevronDown size={14} className="sel-icon"/>
                  </div>
                </div>
              </div>
              
              <div className="form-group mt-16">
                <label>Location</label>
                <textarea rows="2" placeholder="Enter Location"></textarea>
              </div>

              <div className="form-group mt-16">
                <label>Colour</label>
                <div className="color-picker-box">
                  <div className="color-preview">
                    <div className="cp-box" style={{background: '#000'}}></div>
                    <div className="cp-info">
                      <span className="cp-title">Selected Color</span>
                      <span className="cp-hex">#000000</span>
                    </div>
                  </div>
                  <div className="color-swatches">
                    {colorSwatches.map((hex, i) => (
                      <div key={i} className="color-swatch" style={{background: hex}}></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group mt-16">
                <label>Availability<span className="req">*</span></label>
                <div className="availability-box">
                  <div className="avail-header">Select All</div>
                  <div className="avail-grid">
                    <span>Monday</span><span>Tuesday</span><span>Wednesday</span><span>Thursday</span>
                    <span>Friday</span><span>Saturday</span><span>Sunday</span>
                  </div>
                </div>
              </div>

            </div>
            <div className="set-modal-footer">
              <button className="btn-cancel" onClick={() => setShowNewMemberModal(false)}>Cancel</button>
              <button className="btn-primary-gradient">Create</button>
            </div>
          </div>
        </div>
      )}

      {/* NEW ROLE MODAL */}
      {showNewRoleModal && (
        <div className="set-modal-overlay">
          <div className="set-modal medium-modal">
            <div className="set-modal-header">
              <h2>Add New Role</h2>
              <button className="btn-close-modal" onClick={() => setShowNewRoleModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="set-modal-body">
              <div className="form-group">
                <label>Role Name<span className="req">*</span></label>
                <input type="text" placeholder="Enter role name (e.g., Doctor, Receptionist)" />
              </div>
              <div className="form-group mt-16">
                <label>Description<span className="req">*</span></label>
                <input type="text" placeholder="Enter role description" />
              </div>

              <div className="permissions-section mt-24">
                <h4>Module Permissions</h4>
                <p className="perm-desc">Configure access permissions for each module. Backend will enforce these permissions.</p>

                <div className="perm-list">
                  {permissionsMatrix.map((mod, i) => (
                    <div key={i} className="perm-item">
                      <div className="perm-item-header">
                        <div>
                          <h5>{mod.module}</h5>
                          <span>{mod.desc}</span>
                        </div>
                        <button className="btn-text-muted">Select All</button>
                      </div>
                      <div className="perm-checkboxes">
                        {mod.perms.map((p, idx) => (
                          <div key={idx} className="perm-checkbox">
                            <span className="chk-label">{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="set-modal-footer">
              <button className="btn-cancel" onClick={() => setShowNewRoleModal(false)}>Cancel</button>
              <button className="btn-primary-gradient">Create</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Settings;
