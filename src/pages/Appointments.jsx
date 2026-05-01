import React, { useState, useMemo, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Clock,
  MoreHorizontal,
  CheckCircle2,
  Phone,
  User,
  MapPin,
  Stethoscope,
  ChevronDown,
  Edit2,
  Trash2,
  AlertTriangle,
  FileText,
  FileSpreadsheet,
  Eye
} from 'lucide-react';
import './Appointments.css';

const DEFAULT_APPOINTMENTS = [
  { id: 1, date: '2026-05-01', time: '10:50 AM', token: 'T-001', patient: 'Arjun Sharma', phone: '9876543210', gender: 'Male', age: 34, doctor: 'Dr. Smith', duration: '30 min', status: 'Scheduled' },
  { id: 2, date: '2026-05-01', time: '11:30 AM', token: 'T-002', patient: 'Priya Nair', phone: '9123456780', gender: 'Female', age: 27, doctor: 'Dr. Smith', duration: '45 min', status: 'Confirmed' },
  { id: 3, date: '2026-05-01', time: '12:15 PM', token: 'T-003', patient: 'Rahul Mehta', phone: '9988776655', gender: 'Male', age: 45, doctor: 'Dr. Jones', duration: '20 min', status: 'Waiting' },
  { id: 4, date: '2026-05-01', time: '02:00 PM', token: 'T-004', patient: 'Sneha Pillai', phone: '9871234560', gender: 'Female', age: 31, doctor: 'Dr. Smith', duration: '60 min', status: 'Scheduled' },
  { id: 5, date: '2026-05-01', time: '03:30 PM', token: 'T-005', patient: 'Vikram Iyer', phone: '9765432109', gender: 'Male', age: 52, doctor: 'Dr. Jones', duration: '30 min', status: 'Confirmed' },
  { id: 6, date: '2026-05-01', time: '04:15 PM', token: 'T-006', patient: 'Kavitha Rajan', phone: '9654321098', gender: 'Female', age: 39, doctor: 'Dr. Smith', duration: '20 min', status: 'Waiting' },
  { id: 7, date: '2026-05-02', time: '09:00 AM', token: 'T-007', patient: 'Mohammed Farhan', phone: '9543210987', gender: 'Male', age: 29, doctor: 'Dr. Jones', duration: '45 min', status: 'Scheduled' },
  { id: 8, date: '2026-05-02', time: '10:30 AM', token: 'T-008', patient: 'Lakshmi Devi', phone: '9432109876', gender: 'Female', age: 62, doctor: 'Dr. Smith', duration: '30 min', status: 'Confirmed' },
  { id: 9, date: '2026-05-02', time: '11:45 AM', token: 'T-009', patient: 'Aditya Kumar', phone: '9321098765', gender: 'Male', age: 23, doctor: 'Dr. Jones', duration: '15 min', status: 'Scheduled' },
  { id: 10, date: '2026-05-02', time: '01:30 PM', token: 'T-010', patient: 'Deepa Thomas', phone: '9210987654', gender: 'Female', age: 44, doctor: 'Dr. Smith', duration: '45 min', status: 'Scheduled' },
  { id: 11, date: '2026-04-30', time: '10:00 AM', token: 'T-088', patient: 'Suresh Babu', phone: '9109876543', gender: 'Male', age: 58, doctor: 'Dr. Jones', duration: '30 min', status: 'Completed' },
  { id: 12, date: '2026-04-30', time: '11:15 AM', token: 'T-089', patient: 'Ananya Krishnan', phone: '9098765432', gender: 'Female', age: 19, doctor: 'Dr. Smith', duration: '45 min', status: 'Completed' },
  { id: 13, date: '2026-04-30', time: '02:00 PM', token: 'T-090', patient: 'George Mathew', phone: '8987654321', gender: 'Male', age: 36, doctor: 'Dr. Jones', duration: '20 min', status: 'Completed' },
  { id: 14, date: '2026-04-30', time: '03:45 PM', token: 'T-091', patient: 'Meera Gopalan', phone: '8876543210', gender: 'Female', age: 48, doctor: 'Dr. Smith', duration: '30 min', status: 'Cancelled' },
  { id: 15, date: '2026-04-30', time: '05:00 PM', token: 'T-092', patient: 'Rajesh Varma', phone: '8765432109', gender: 'Male', age: 41, doctor: 'Dr. Jones', duration: '15 min', status: 'Completed' },
  { id: 16, date: '2026-05-03', time: '10:00 AM', token: 'T-110', patient: 'Fathima Beevi', phone: '8654321098', gender: 'Female', age: 33, doctor: 'Dr. Smith', duration: '30 min', status: 'Scheduled' },
  { id: 17, date: '2026-05-03', time: '11:30 AM', token: 'T-111', patient: 'Santhosh Nair', phone: '8543210987', gender: 'Male', age: 55, doctor: 'Dr. Jones', duration: '45 min', status: 'Scheduled' },
  { id: 18, date: '2026-05-03', time: '01:00 PM', token: 'T-112', patient: 'Divya Menon', phone: '8432109876', gender: 'Female', age: 26, doctor: 'Dr. Smith', duration: '20 min', status: 'Scheduled' },
  { id: 19, date: '2026-05-03', time: '02:45 PM', token: 'T-113', patient: 'Arun Prakash', phone: '8321098765', gender: 'Male', age: 38, doctor: 'Dr. Jones', duration: '30 min', status: 'Scheduled' },
  { id: 20, date: '2026-05-03', time: '04:00 PM', token: 'T-114', patient: 'Reshma Chandran', phone: '8210987654', gender: 'Female', age: 30, doctor: 'Dr. Smith', duration: '45 min', status: 'Scheduled' },
];

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('Appointment');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const [activeStatusMenu, setActiveStatusMenu] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [viewingAppointment, setViewingAppointment] = useState(null);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('dentobees_appointments_v3');
    return saved ? JSON.parse(saved) : DEFAULT_APPOINTMENTS;
  });

  useEffect(() => {
    localStorage.setItem('dentobees_appointments_v3', JSON.stringify(appointments));
  }, [appointments]);

  // Form State
  const [formData, setFormData] = useState({
    mobile: '',
    name: '',
    gender: '',
    age: '',
    location: '',
    doctor: '',
    date: new Date().toISOString().split('T')[0],
    hour: '10',
    minute: '00',
    period: 'AM',
    duration: '30 min',
    complaint: '',
    history: '',
    notes: '',
    whatsappConsent: true,
    markCheckedIn: false
  });

  // Filter State
  const [filters, setFilters] = useState({
    doctor: '',
    type: 'All Appointments',
    status: 'All Status',
    dateRange: 'This Month' // Changed from 'Today' to show all 20 records
  });

  const [analyticsViewMode, setAnalyticsViewMode] = useState('Week'); // 'Day', 'Week', 'Month'
  const [referenceDate, setReferenceDate] = useState(new Date());

  const stats = useMemo(() => {
    // Filter stats by referenceDate period if needed, 
    // but usually summary stats are for the overall or current context.
    // Let's keep them overall for now as per image.
    return {
      scheduled: appointments.filter(a => a.status === 'Scheduled').length,
      waiting: appointments.filter(a => a.status === 'Waiting').length,
      confirmed: appointments.filter(a => a.status === 'Confirmed').length,
      completed: appointments.filter(a => a.status === 'Completed').length,
      cancelled: appointments.filter(a => a.status === 'Cancelled').length,
    };
  }, [appointments]);

  const trendData = useMemo(() => {
    const data = [];
    
    if (analyticsViewMode === 'Week') {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      // Get the start of the week for referenceDate
      const startOfWeek = new Date(referenceDate);
      startOfWeek.setDate(referenceDate.getDate() - referenceDate.getDay());
      
      for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        const count = appointments.filter(a => a.date === dateStr).length;
        data.push({
          label: days[d.getDay()],
          count: count,
          fullDate: dateStr
        });
      }
    } else if (analyticsViewMode === 'Month') {
      // Show every 3rd day or segments for the month to avoid too many bars
      const year = referenceDate.getFullYear();
      const month = referenceDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      for (let i = 1; i <= daysInMonth; i += 2) {
        const d = new Date(year, month, i);
        const dateStr = d.toISOString().split('T')[0];
        const count = appointments.filter(a => a.date === dateStr).length;
        data.push({
          label: i.toString(),
          count: count,
          fullDate: dateStr
        });
      }
    } else if (analyticsViewMode === 'Day') {
      // Show slots or just a few segments? 
      // Usually "Day" view might show 4-hour slots
      const slots = ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM'];
      const dateStr = referenceDate.toISOString().split('T')[0];
      const dayApps = appointments.filter(a => a.date === dateStr);
      
      slots.forEach(slot => {
        // Simple heuristic: match first part of time string
        const count = dayApps.filter(a => a.time.includes(slot)).length;
        data.push({
          label: slot,
          count: count,
          fullDate: dateStr
        });
      } );
    }
    
    return data;
  }, [appointments, analyticsViewMode, referenceDate]);

  const handleNavigate = (direction) => {
    const newDate = new Date(referenceDate);
    if (analyticsViewMode === 'Day') {
      newDate.setDate(referenceDate.getDate() + direction);
    } else if (analyticsViewMode === 'Week') {
      newDate.setDate(referenceDate.getDate() + (direction * 7));
    } else if (analyticsViewMode === 'Month') {
      newDate.setMonth(referenceDate.getMonth() + direction);
    }
    setReferenceDate(newDate);
  };

  const [showDatePopup, setShowDatePopup] = useState(false);

  const filteredAppointments = useMemo(() => {
    let result = appointments;

    // Tab filtering
    if (activeTab === 'Check In') {
      result = result.filter(a => a.status === 'Waiting' || a.status === 'Completed');
    }

    // Search filtering
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.patient.toLowerCase().includes(q) ||
        a.phone.includes(q) ||
        a.token.toLowerCase().includes(q)
      );
    }

    // Date filtering
    const today = new Date().toISOString().split('T')[0];
    if (filters.dateRange === 'Today') {
      result = result.filter(a => a.date === today);
    } else if (filters.dateRange === 'Tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomStr = tomorrow.toISOString().split('T')[0];
      result = result.filter(a => a.date === tomStr);
    } else if (filters.dateRange === 'Yesterday') {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesStr = yesterday.toISOString().split('T')[0];
      result = result.filter(a => a.date === yesStr);
    }

    // Modal Filters
    if (filters.doctor) {
      result = result.filter(a => a.doctor === filters.doctor);
    }
    if (filters.status !== 'All Status') {
      result = result.filter(a => a.status === filters.status);
    }

    return result;
  }, [appointments, activeTab, searchQuery, filters]);

  const totalPages = Math.ceil(filteredAppointments.length / rowsPerPage);
  const paginatedData = filteredAppointments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (editingAppointment) {
      setAppointments(appointments.map(a =>
        a.id === editingAppointment.id ? {
          ...a,
          date: formData.date,
          time: `${formData.hour}:${formData.minute} ${formData.period}`,
          patient: formData.name,
          phone: formData.mobile,
          gender: formData.gender,
          age: formData.age,
          doctor: formData.doctor,
          duration: formData.duration,
          complaint: formData.complaint,
          history: formData.history,
          notes: formData.notes
        } : a
      ));
      setEditingAppointment(null);
    } else {
      const newApp = {
        id: Date.now(),
        date: formData.date,
        time: `${formData.hour}:${formData.minute} ${formData.period}`,
        token: `T-${Math.floor(100 + Math.random() * 900)}`,
        patient: formData.name,
        phone: formData.mobile,
        gender: formData.gender,
        age: formData.age,
        doctor: formData.doctor || 'Dr. Unassigned',
        duration: formData.duration,
        status: formData.markCheckedIn ? 'Waiting' : 'Scheduled',
        complaint: formData.complaint,
        history: formData.history,
        notes: formData.notes
      };
      setAppointments([newApp, ...appointments]);
    }
    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      mobile: '', name: '', gender: '', age: '', location: '', doctor: '',
      date: new Date().toISOString().split('T')[0], hour: '10', minute: '00', period: 'AM',
      duration: '30 min', complaint: '', history: '', notes: '',
      whatsappConsent: true, markCheckedIn: false
    });
    setEditingAppointment(null);
  };

  const openEditModal = (app) => {
    const [timeStr, period] = app.time.split(' ');
    const [hour, minute] = timeStr.split(':');

    setFormData({
      ...formData,
      mobile: app.phone,
      name: app.patient,
      gender: app.gender,
      age: app.age,
      doctor: app.doctor,
      date: app.date,
      hour,
      minute,
      period,
      duration: app.duration,
      complaint: app.complaint || '',
      history: app.history || '',
      notes: app.notes || ''
    });
    setEditingAppointment(app);
    setShowAddModal(true);
    setActiveActionMenu(null);
  };

  const openDeleteModal = (app) => {
    setAppointmentToDelete(app);
    setShowDeleteModal(true);
    setActiveActionMenu(null);
  };

  const openViewModal = (app) => {
    setViewingAppointment(app);
    setShowViewModal(true);
    setActiveActionMenu(null);
  };

  const updateStatus = (id, newStatus) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
    setActiveStatusMenu(null);
  };

  const confirmDelete = () => {
    setAppointments(appointments.filter(a => a.id !== appointmentToDelete.id));
    setShowDeleteModal(false);
    setAppointmentToDelete(null);
  };

  const handleExport = () => {
    // CSV Export Logic (Excel)
    const headers = ['No.', 'Date', 'Time', 'Token', 'Patient', 'Phone', 'Gender', 'Age', 'Doctor', 'Duration', 'Status'];
    const rows = filteredAppointments.map((app, index) => [
      index + 1,
      app.date,
      app.time,
      app.token,
      app.patient,
      `="${app.phone}"`, // Excel formula trick to force text and show full number
      app.gender,
      app.age,
      app.doctor,
      app.duration,
      app.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `appointments_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="appointments-module">
      {/* Tabs */}
      <div className="appointments-tabs">
        {['Appointment', 'Check In', 'Calendar'].map(tab => (
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
      <div className="appointments-top-bar">
        <h2 className="module-title">{activeTab === 'Calendar' ? 'Calendar Analytics' : `${activeTab}s`}</h2>
        {activeTab !== 'Calendar' && (
          <div className="bar-actions">
            <div className="search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by Patient, Phone, Token..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="action-button" onClick={() => setShowFilterModal(true)}>
              <Filter size={16} /> Filter
            </button>

            <button className="action-button" onClick={handleExport}>
              <FileSpreadsheet size={16} /> Export Excel
            </button>

            <div style={{ position: 'relative' }}>
              <button className="action-button" onClick={() => setShowDatePopup(!showDatePopup)}>
                {filters.dateRange} <ChevronDown size={14} style={{ marginLeft: 4 }} />
              </button>
              {showDatePopup && (
                <div className="date-popup">
                  {['Today', 'Tomorrow', 'Yesterday', 'Last 7 Days', 'This Month'].map(range => (
                    <div
                      key={range}
                      className={`date-item ${filters.dateRange === range ? 'active' : ''}`}
                      onClick={() => { setFilters({ ...filters, dateRange: range }); setShowDatePopup(false); }}
                    >
                      {range} {filters.dateRange === range && <CheckCircle2 size={14} style={{ marginLeft: 'auto' }} />}
                    </div>
                  ))}
                  <div className="date-divider" />
                  <div className="custom-date-section">
                    <label>Custom Date</label>
                    <input type="date" className="date-input-small" />
                    <div className="date-popup-btns">
                      <button className="date-popup-btn clear" onClick={() => { setFilters({ ...filters, dateRange: 'Today' }); setShowDatePopup(false); }}>Clear</button>
                      <button className="date-popup-btn apply" onClick={() => setShowDatePopup(false)}>Apply</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="action-button teal-btn" onClick={() => setShowAddModal(true)}>
              <Plus size={18} /> New Appointment
            </button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="appointments-content-card">
        {activeTab === 'Calendar' ? (
          <div className="analytics-dashboard">
            <div className="analytics-main-grid">
              {/* Left Column: Chart Area */}
              <div className="analytics-left">
                <div className="analytics-header-row">
                  <div className="date-nav">
                    <button className="nav-arrow" onClick={() => handleNavigate(-1)}><ChevronLeft size={16} /></button>
                    <span className="current-date-display">
                      {analyticsViewMode === 'Day' && referenceDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                      {analyticsViewMode === 'Week' && `Week of ${new Date(referenceDate.getTime() - referenceDate.getDay() * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                      {analyticsViewMode === 'Month' && referenceDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    {referenceDate.toDateString() === new Date().toDateString() && <span className="today-badge">Today</span>}
                    <button className="nav-arrow" onClick={() => handleNavigate(1)}><ChevronRight size={16} /></button>
                  </div>
                  <div className="view-switcher">
                    {['Day', 'Week', 'Month'].map(mode => (
                      <button 
                        key={mode}
                        className={`switch-btn ${analyticsViewMode === mode ? 'active' : ''}`}
                        onClick={() => setAnalyticsViewMode(mode)}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="analytics-content-box">
                  <div className="chart-placeholder" style={{ width: '100%' }}>
                    <div className="stock-chart-container">
                      <svg className="chart-svg" viewBox="0 0 800 250">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Grid Lines */}
                        {[0, 50, 100, 150, 200].map(y => (
                          <line key={y} x1="40" y1={y} x2="760" y2={y} className="chart-grid-line" />
                        ))}

                        {/* Area Fill */}
                        <path
                          className="chart-area"
                          d={`
                            M ${trendData.map((d, i) => `${(i / (trendData.length - 1)) * 720 + 40},${200 - (Math.min(d.count, 10) / 10) * 160}`).join(' L ')}
                            L ${(trendData.length - 1) / (trendData.length - 1) * 720 + 40},200
                            L 40,200 Z
                          `}
                        />

                        {/* Trend Line */}
                        <path
                          className="chart-line"
                          d={`M ${trendData.map((d, i) => `${(i / (trendData.length - 1)) * 720 + 40},${200 - (Math.min(d.count, 10) / 10) * 160}`).join(' L ')}`}
                        />

                        {/* Data Dots & Labels */}
                        {trendData.map((d, i) => {
                          const x = (i / (trendData.length - 1)) * 720 + 40;
                          const y = 200 - (Math.min(d.count, 10) / 10) * 160;
                          return (
                            <g key={i}>
                              <circle cx={x} cy={y} r="4" className="chart-dot">
                                <title>{d.count} Appointments</title>
                              </circle>
                              <text x={x} y="230" className="chart-label-x">{d.label}</text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Stats Area */}
              <div className="analytics-right">
                <div className="stats-mini-grid">
                  <div className="stat-card-mini">
                    <span className="stat-value" style={{ color: '#3b82f6' }}>{stats.scheduled}</span>
                    <span className="stat-label">Scheduled</span>
                  </div>
                  <div className="stat-card-mini">
                    <span className="stat-value" style={{ color: '#f59e0b' }}>{stats.waiting}</span>
                    <span className="stat-label">Waiting</span>
                  </div>
                  <div className="stat-card-mini">
                    <span className="stat-value" style={{ color: '#10b981' }}>{stats.confirmed}</span>
                    <span className="stat-label">Confirmed</span>
                  </div>
                  <div className="stat-card-mini">
                    <span className="stat-value" style={{ color: '#64748b' }}>{stats.completed}</span>
                    <span className="stat-label">Completed</span>
                  </div>
                  <div className="stat-card-mini">
                    <span className="stat-value" style={{ color: '#ef4444' }}>{stats.cancelled}</span>
                    <span className="stat-label">Cancelled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <table className="exact-appointments-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Date/Time</th>
                  <th>Token</th>
                  <th>Patient</th>
                  <th>Phone</th>
                  <th>Gender/Age</th>
                  <th>Dr Name</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((app, index) => (
                  <tr key={app.id}>
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{app.date}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{app.time}</div>
                    </td>
                    <td><span style={{ color: '#8b5cf6', fontWeight: 800 }}>{app.token}</span></td>
                    <td style={{ fontWeight: 700 }}>{app.patient}</td>
                    <td>{app.phone}</td>
                    <td>{app.gender}, {app.age}</td>
                    <td>{app.doctor}</td>
                    <td>{app.duration}</td>
                    <td style={{ position: 'relative' }}>
                      <div
                        className={`status-badge status-${app.status.toLowerCase()}`}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}
                        onClick={() => setActiveStatusMenu(activeStatusMenu === app.id ? null : app.id)}
                      >
                        {app.status}
                        <ChevronDown size={12} style={{ opacity: 0.7 }} />
                      </div>
                      {activeStatusMenu === app.id && (
                        <div className="action-dropdown status-menu">
                          {['Scheduled', 'Confirmed', 'Waiting', 'Completed', 'Cancelled'].map(s => (
                            <button
                              key={s}
                              className={app.status === s ? 'active' : ''}
                              onClick={() => updateStatus(app.id, s)}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                    <td style={{ position: 'relative' }}>
                      <button className="p-btn" onClick={() => setActiveActionMenu(activeActionMenu === app.id ? null : app.id)}>
                        <MoreHorizontal size={16} />
                      </button>
                      {activeActionMenu === app.id && (
                        <div className="action-dropdown">
                          <button className="action-item" onClick={() => openViewModal(app)}>
                            <Eye size={14} /> View
                          </button>
                          <button className="action-item" onClick={() => openEditModal(app)}>
                            <Edit2 size={14} /> Edit
                          </button>
                          <button className="action-item delete" onClick={() => openDeleteModal(app)}>
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="appointments-footer">
              <div className="rows-per-page">
                Rows per page:
                <div className="rows-btns">
                  {[10, 20, 50, 100].map(val => (
                    <button
                      key={val}
                      className={`r-btn ${rowsPerPage === val ? 'active' : ''}`}
                      onClick={() => { setRowsPerPage(val); setCurrentPage(1); }}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pagination-controls">
                <span className="records-count">Total Records: {filteredAppointments.length}</span>
                <div className="p-btns">
                  <button className="p-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                    <ChevronLeft size={16} />
                  </button>
                  <button className="p-btn active">{currentPage}</button>
                  <button className="p-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add/Edit Appointment Modal */}
      {showAddModal && (
        <div className="exact-modal-overlay" onClick={(e) => e.target === e.currentTarget && resetForm() || setShowAddModal(false)}>
          <div className="exact-modal">
            <div className="exact-modal-header">
              <h2>{editingAppointment ? 'Edit Appointment' : 'Add New Appointment'}</h2>
              <button className="exact-close" onClick={() => { resetForm(); setShowAddModal(false); }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddAppointment} className="exact-modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Mobile Number <span>*</span></label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Enter mobile number"
                      required
                      value={formData.mobile}
                      onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Patient Name <span>*</span></label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Enter patient name"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Gender <span>*</span></label>
                  <div className="input-wrapper">
                    <select
                      required
                      value={formData.gender}
                      onChange={e => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Age <span>*</span></label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      placeholder="Enter patient age"
                      required
                      value={formData.age}
                      onChange={e => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Patient Location <span>*</span></label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Enter location"
                      required
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Doctor <span>*</span></label>
                  <div className="input-wrapper">
                    <select
                      required
                      value={formData.doctor}
                      onChange={e => setFormData({ ...formData, doctor: e.target.value })}
                    >
                      <option value="">Select doctor</option>
                      <option value="Dr. Smith">Dr. Smith</option>
                      <option value="Dr. Jones">Dr. Jones</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Appointment Date <span>*</span></label>
                  <div className="input-wrapper">
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Time <span>*</span></label>
                  <div className="time-grid">
                    <select value={formData.hour} onChange={e => setFormData({ ...formData, hour: e.target.value })}>
                      {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                    <select value={formData.minute} onChange={e => setFormData({ ...formData, minute: e.target.value })}>
                      {['00', '15', '30', '45'].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select value={formData.period} onChange={e => setFormData({ ...formData, period: e.target.value })}>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <div className="input-wrapper">
                    <select value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })}>
                      <option value="15 min">15 min</option>
                      <option value="30 min">30 min</option>
                      <option value="45 min">45 min</option>
                      <option value="60 min">60 min</option>
                    </select>
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Patient Complaint</label>
                  <div className="input-wrapper">
                    <textarea
                      placeholder="Enter patient complaint"
                      rows="2"
                      value={formData.complaint}
                      onChange={e => setFormData({ ...formData, complaint: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Patient History</label>
                  <div className="input-wrapper">
                    <textarea
                      placeholder="Enter patient medical history"
                      rows="2"
                      value={formData.history}
                      onChange={e => setFormData({ ...formData, history: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Notes</label>
                  <div className="input-wrapper">
                    <textarea
                      placeholder="Enter notes"
                      rows="2"
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="checkbox-group full-width">
                  <label className="check-label">
                    <input
                      type="checkbox"
                      checked={formData.whatsappConsent}
                      onChange={e => setFormData({ ...formData, whatsappConsent: e.target.checked })}
                    />
                    Send default consent form (WhatsApp)
                  </label>
                  <label className="check-label">
                    <input
                      type="checkbox"
                      checked={formData.markCheckedIn}
                      onChange={e => setFormData({ ...formData, markCheckedIn: e.target.checked })}
                    />
                    Mark the patient as Checked In
                  </label>
                </div>
              </div>
            </form>
            <div className="exact-modal-footer">
              <button type="button" className="cancel-btn" onClick={() => { resetForm(); setShowAddModal(false); }}>Cancel</button>
              <button type="submit" className="create-btn" onClick={handleAddAppointment}>
                {editingAppointment ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="exact-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="exact-modal delete-modal">
            <div className="exact-modal-body" style={{ textAlign: 'center', padding: '48px 32px' }}>
              <div className="delete-icon-circle">
                <AlertTriangle size={32} color="#ef4444" />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '24px 0 12px' }}>Delete Appointment?</h2>
              <p style={{ color: '#64748b', fontSize: '15px', fontWeight: 600, lineHeight: 1.6 }}>
                Are you sure you want to delete the appointment for <strong>{appointmentToDelete?.patient}</strong>?<br />
                This action cannot be undone.
              </p>
              <div className="delete-actions">
                <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>No, Keep it</button>
                <button className="confirm-delete-btn" onClick={confirmDelete}>Yes, Delete it</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewModal && viewingAppointment && (
        <div className="exact-modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="exact-modal view-modal" onClick={e => e.stopPropagation()}>
            <div className="exact-modal-header">
              <h2>Appointment Details</h2>
              <button className="exact-close" onClick={() => setShowViewModal(false)}><X size={20} /></button>
            </div>
            <div className="exact-modal-body">
              <div className="view-grid">
                <div className="view-item">
                  <label>Token ID</label>
                  <p className="token-tag">{viewingAppointment.token}</p>
                </div>
                <div className="view-item">
                  <label>Status</label>
                  <span className={`status-badge ${viewingAppointment.status.toLowerCase()}`}>
                    {viewingAppointment.status}
                  </span>
                </div>
                <div className="view-item">
                  <label>Patient Name</label>
                  <p>{viewingAppointment.patient}</p>
                </div>
                <div className="view-item">
                  <label>Mobile Number</label>
                  <p>{viewingAppointment.phone}</p>
                </div>
                <div className="view-item">
                  <label>Gender / Age</label>
                  <p>{viewingAppointment.gender}, {viewingAppointment.age} Yrs</p>
                </div>
                <div className="view-item">
                  <label>Doctor</label>
                  <p>{viewingAppointment.doctor}</p>
                </div>
                <div className="view-item">
                  <label>Date & Time</label>
                  <p>{viewingAppointment.date} | {viewingAppointment.time}</p>
                </div>
                <div className="view-item">
                  <label>Duration</label>
                  <p>{viewingAppointment.duration}</p>
                </div>
                <div className="view-item full-width">
                  <label>Patient Complaint</label>
                  <div className="detail-box">{viewingAppointment.complaint || 'No complaint recorded'}</div>
                </div>
                <div className="view-item full-width">
                  <label>Medical History</label>
                  <div className="detail-box">{viewingAppointment.history || 'No history recorded'}</div>
                </div>
                <div className="view-item full-width">
                  <label>Notes</label>
                  <div className="detail-box">{viewingAppointment.notes || 'No extra notes'}</div>
                </div>
              </div>
            </div>
            <div className="exact-modal-footer">
              <button className="cancel-btn" onClick={() => setShowViewModal(false)} style={{ width: '100%' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal (Right Sidebar) */}
      {showFilterModal && (
        <div className="exact-modal-overlay filter-overlay" onClick={(e) => e.target === e.currentTarget && setShowFilterModal(false)}>
          <div className="exact-modal filter-sidebar">
            <div className="exact-modal-header">
              <h2>Appointment Filters</h2>
              <button className="exact-close" onClick={() => setShowFilterModal(false)}><X size={20} /></button>
            </div>
            <div className="exact-modal-body">
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label>Doctor Name</label>
                <div className="input-wrapper">
                  <select value={filters.doctor} onChange={e => setFilters({ ...filters, doctor: e.target.value })}>
                    <option value="">Select doctor</option>
                    <option value="Dr. Smith">Dr. Smith</option>
                    <option value="Dr. Jones">Dr. Jones</option>
                  </select>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label>Appointment Type</label>
                <div className="input-wrapper">
                  <select value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })}>
                    <option value="All Appointments">All Appointments</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Procedure">Procedure</option>
                    <option value="Follow-up">Follow-up</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <div className="input-wrapper">
                  <select value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}>
                    <option value="All Status">All Status</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Waiting">Waiting</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="exact-modal-footer sidebar-footer">
              <button className="clear-link" onClick={() => setFilters({ doctor: '', type: 'All Appointments', status: 'All Status' })}>
                Clear all
              </button>
              <button className="create-btn" onClick={() => setShowFilterModal(false)}>Apply Filter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
