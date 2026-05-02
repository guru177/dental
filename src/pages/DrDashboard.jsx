import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, 
  UserCheck, 
  CreditCard, 
  Banknote, 
  Eye, 
  EyeOff, 
  Search, 
  SlidersHorizontal, 
  ChevronDown,
  PackageOpen
} from 'lucide-react';
import './DrDashboard.css';

const DrDashboard = () => {
  // State Management
  const [selectedDoctor, setSelectedDoctor] = useState('Guru');
  const [showBillings, setShowBillings] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [activeQueueTab, setActiveQueueTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('Today');
  const [showDatePopup, setShowDatePopup] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  // Mock Doctors List
  const doctorsList = ['Guru', 'Smith', 'Priya', 'Arjun'];

  // Mock Appointments Data
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setIsLoading(true);
    const timer = setTimeout(() => {
      setAppointments([
        { id: 1, date: '02-05-2026 10:00 AM', patient: 'Rahul Sharma', phone: '9876543210', gender: 'M', age: 34, chiefComplaint: 'Toothache in lower left jaw', token: 'T-01', doctor: 'Guru', status: 'Check-In', consultation: 'First Visit' },
        { id: 2, date: '02-05-2026 11:30 AM', patient: 'Priya Patel', phone: '9876543211', gender: 'F', age: 28, chiefComplaint: 'Routine Cleaning', token: 'T-02', doctor: 'Guru', status: 'Pending', consultation: 'Follow-up' },
        { id: 3, date: '02-05-2026 01:00 PM', patient: 'Amit Kumar', phone: '9876543212', gender: 'M', age: 45, chiefComplaint: 'Root Canal Pain', token: 'T-03', doctor: 'Smith', status: 'Completed', consultation: 'Treatment' },
        { id: 4, date: '02-05-2026 02:30 PM', patient: 'Sneha Gupta', phone: '9876543213', gender: 'F', age: 52, chiefComplaint: 'Crown consultation', token: 'T-04', doctor: 'Guru', status: 'Completed', consultation: 'First Visit' },
        { id: 5, date: '02-05-2026 04:00 PM', patient: 'Vikram Singh', phone: '9876543214', gender: 'M', age: 31, chiefComplaint: 'Bleeding gums', token: 'T-05', doctor: 'Guru', status: 'Check-In', consultation: 'Follow-up' }
      ]);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filteredData = useMemo(() => {
    return appointments.filter(app => {
      // 1. Doctor Filter
      if (app.doctor !== selectedDoctor) return false;

      // 2. Queue Tab Filter
      if (activeQueueTab === 'Check-In' && app.status !== 'Check-In') return false;
      if (activeQueueTab === 'Completed' && app.status !== 'Completed') return false;

      // 3. Search Filter
      const searchLower = searchTerm.toLowerCase();
      if (searchTerm !== '') {
        const matchesSearch = 
          app.patient.toLowerCase().includes(searchLower) ||
          app.phone.includes(searchTerm) ||
          app.chiefComplaint.toLowerCase().includes(searchLower) ||
          app.token.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Date filter would go here in a real app
      // Assuming all mock data is "Today" for demo purposes

      return true;
    });
  }, [appointments, selectedDoctor, activeQueueTab, searchTerm]);

  // Pagination Logic
  useEffect(() => { setCurrentPage(1); }, [activeQueueTab, searchTerm, selectedDoctor]);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  // Derived Summary Metrics
  const doctorAppointments = appointments.filter(a => a.doctor === selectedDoctor);
  const totalAppointmentsCount = doctorAppointments.length;
  const checkInCount = doctorAppointments.filter(a => a.status === 'Check-In').length;
  const completedCount = doctorAppointments.filter(a => a.status === 'Completed').length;
  
  // Mock financial metrics for the specific doctor
  const totalBillings = 15450;
  const totalPayments = 12000;

  return (
    <div className="dr-dashboard">
      {/* ─── Top Header ─── */}
      <div className="dr-header">
        <div className="dr-greeting">
          <span className="wave-icon">👋</span>
          <h1>Hi Dr. {selectedDoctor},</h1>
        </div>
        <div className="dr-context-switcher">
          <select 
            value={selectedDoctor} 
            onChange={e => setSelectedDoctor(e.target.value)}
          >
            {doctorsList.map(doc => (
              <option key={doc} value={doc}>{doc}</option>
            ))}
          </select>
          <ChevronDown size={16} className="context-icon" />
        </div>
      </div>

      {/* ─── Summary Cards ─── */}
      <div className="dr-summary-cards">
        <div className="dr-card">
          <div className="dr-icon-wrapper icon-green">
            <Calendar size={24} />
          </div>
          <div className="dr-card-info">
            <span className="dr-card-label">Appointments</span>
            <div className="dr-card-value">
              <span className="number">{totalAppointmentsCount}</span> <span className="unit">Nos</span>
            </div>
          </div>
        </div>
        
        <div className="dr-card">
          <div className="dr-icon-wrapper icon-orange">
            <UserCheck size={24} />
          </div>
          <div className="dr-card-info">
            <span className="dr-card-label">Check-Ins</span>
            <div className="dr-card-value">
              <span className="number">{checkInCount}</span> <span className="unit">Nos</span>
            </div>
          </div>
        </div>

        <div className="dr-card">
          <div className="dr-icon-wrapper icon-red">
            <CreditCard size={24} />
          </div>
          <div className="dr-card-info">
            <span className="dr-card-label">Billings</span>
            <div className="dr-card-value financial-val">
              <span className="unit">₹</span> 
              <span className="number">{showBillings ? totalBillings.toLocaleString() : '****'}</span>
            </div>
          </div>
          <button className="privacy-toggle" onClick={() => setShowBillings(!showBillings)}>
            {showBillings ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="dr-card">
          <div className="dr-icon-wrapper icon-purple">
            <Banknote size={24} />
          </div>
          <div className="dr-card-info">
            <span className="dr-card-label">Payments</span>
            <div className="dr-card-value financial-val">
              <span className="unit">₹</span> 
              <span className="number">{showPayments ? totalPayments.toLocaleString() : '****'}</span>
            </div>
          </div>
          <button className="privacy-toggle" onClick={() => setShowPayments(!showPayments)}>
            {showPayments ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* ─── Queue Toolbar ─── */}
      <div className="queue-toolbar">
        <div className="queue-pills">
          <button 
            className={`q-pill ${activeQueueTab === 'All' ? 'active' : ''}`}
            onClick={() => setActiveQueueTab('All')}
          >
            All ({totalAppointmentsCount})
          </button>
          <button 
            className={`q-pill ${activeQueueTab === 'Check-In' ? 'active' : ''}`}
            onClick={() => setActiveQueueTab('Check-In')}
          >
            Check-In
          </button>
          <button 
            className={`q-pill ${activeQueueTab === 'Completed' ? 'active' : ''}`}
            onClick={() => setActiveQueueTab('Completed')}
          >
            Completed
          </button>
        </div>

        <div className="queue-actions">
          <div className="q-search">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button className="btn-q-filter">
            <SlidersHorizontal size={14} />
            Filter
            <ChevronDown size={14} style={{marginLeft: '4px'}} />
          </button>
          
          <div className="q-date-dropdown">
            <button className="btn-q-date" onClick={() => setShowDatePopup(!showDatePopup)}>
              {dateFilter}
              <ChevronDown size={14} />
            </button>
            {showDatePopup && (
              <div className="date-popup-menu">
                {['Today', 'Yesterday', 'Last 7 Days', 'This Month'].map(opt => (
                  <div key={opt} className="date-opt" onClick={() => { setDateFilter(opt); setShowDatePopup(false); }}>
                    {opt}
                    {dateFilter === opt && <span className="check">✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Clinical Queue Table ─── */}
      <div className="dr-table-container">
        <table className="dr-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Date <span>↓↑</span></th>
              <th>Patient</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Chief Complaints</th>
              <th>Token <span>↓↑</span></th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Consultation</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="11" style={{ textAlign: 'center', padding: '40px' }}>Loading queue...</td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((app, index) => (
                <tr key={app.id}>
                  <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  <td>{app.date}</td>
                  <td className="font-medium text-slate-800">{app.patient}</td>
                  <td>{app.phone}</td>
                  <td>{app.gender}</td>
                  <td>{app.age}</td>
                  <td><span className="truncate-text">{app.chiefComplaint}</span></td>
                  <td className="font-semibold text-slate-700">{app.token}</td>
                  <td>{app.doctor}</td>
                  <td>
                    <span className={`status-badge status-${app.status.toLowerCase().replace('-', '')}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>{app.consultation}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="empty-state-cell">
                  <div className="empty-box">
                    <PackageOpen size={48} className="empty-icon" />
                    <p>No Appointments Found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ─── Pagination Footer ─── */}
      <div className="dr-pagination">
        <div className="r-per-page">
          <span>Rows per page:</span>
          <div className="r-btns">
            {[10, 20, 50, 100].map(n => (
              <button 
                key={n} 
                className={n === rowsPerPage ? 'active' : ''}
                onClick={() => { setRowsPerPage(n); setCurrentPage(1); }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div className="p-controls">
          <span className="total">Total Records : {filteredData.length}</span>
          <div className="p-btns">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(page => (
              <button 
                key={page} 
                className={page === currentPage ? 'active' : ''}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrDashboard;
