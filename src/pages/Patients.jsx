import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Plus,
  Search,
  MoreHorizontal,
  Filter,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  HelpCircle,
  Edit2,
  Trash2,
  AlertTriangle,
  X,
  ChevronDown,
  Calendar,
  User,
  Phone,
  MapPin,
  Mail,
  Droplets,
  Eye
} from 'lucide-react';
import './Patients.css';
import DentalChartModal from './DentalChart';

const DEFAULT_PATIENTS = [
  { id: 1, reg: '2026/01/10', name: 'Arjun Sharma', phone: '9876543210', patientId: 'PT-001', gender: 'Male', age: '34', visit: 5, due: '0.00', location: 'Chennai', email: 'arjun@mail.com', bloodGroup: 'B+', history: 'Diabetes', notes: 'Regular checkup', refNo: 'R-001', emergencyName: 'Sita', emergencyPhone: '9876543211' },
  { id: 2, reg: '2026/01/15', name: 'Sita Ram', phone: '9876543211', patientId: 'PT-002', gender: 'Female', age: '28', visit: 2, due: '500.00', location: 'Bangalore', email: 'sita@mail.com', bloodGroup: 'O+', history: 'Hypertension', notes: '', refNo: 'R-002', emergencyName: 'Ram', emergencyPhone: '9876543210' },
  { id: 3, reg: '2026/02/01', name: 'Rahul Dravid', phone: '9876543212', patientId: 'PT-003', gender: 'Male', age: '45', visit: 10, due: '0.00', location: 'Mumbai', email: 'rahul@mail.com', bloodGroup: 'A+', history: 'None', notes: 'Sports injury', refNo: 'R-003', emergencyName: 'Vijeta', emergencyPhone: '9876543213' },
  { id: 4, reg: '2026/02/05', name: 'Priya Patel', phone: '9876543213', patientId: 'PT-004', gender: 'Female', age: '22', visit: 1, due: '1200.00', location: 'Ahmedabad', email: 'priya@mail.com', bloodGroup: 'B-', history: 'Allergy to Penicillin', notes: '', refNo: 'R-004', emergencyName: 'Kunal', emergencyPhone: '9876543214' },
  { id: 5, reg: '2026/02/10', name: 'Amit Shah', phone: '9876543214', patientId: 'PT-005', gender: 'Male', age: '50', visit: 4, due: '0.00', location: 'Delhi', email: 'amit@mail.com', bloodGroup: 'AB+', history: 'None', notes: '', refNo: 'R-005', emergencyName: 'Sonal', emergencyPhone: '9876543215' },
  { id: 6, reg: '2026/02/12', name: 'Sneha Gupta', phone: '9876543215', patientId: 'PT-006', gender: 'Female', age: '31', visit: 3, due: '250.00', location: 'Kolkata', email: 'sneha@mail.com', bloodGroup: 'O-', history: 'None', notes: '', refNo: 'R-006', emergencyName: 'Rajesh', emergencyPhone: '9876543216' },
  { id: 7, reg: '2026/02/15', name: 'Vikram Singh', phone: '9876543216', patientId: 'PT-007', gender: 'Male', age: '38', visit: 6, due: '0.00', location: 'Jaipur', email: 'vikram@mail.com', bloodGroup: 'A-', history: 'None', notes: '', refNo: 'R-007', emergencyName: 'Preeti', emergencyPhone: '9876543217' },
  { id: 8, reg: '2026/02/18', name: 'Anjali Nair', phone: '9876543217', patientId: 'PT-008', gender: 'Female', age: '27', visit: 2, due: '800.00', location: 'Kochi', email: 'anjali@mail.com', bloodGroup: 'B+', history: 'Asthma', notes: '', refNo: 'R-008', emergencyName: 'Vinod', emergencyPhone: '9876543218' },
  { id: 9, reg: '2026/02/20', name: 'Rohan Mehta', phone: '9876543218', patientId: 'PT-009', gender: 'Male', age: '42', visit: 5, due: '0.00', location: 'Pune', email: 'rohan@mail.com', bloodGroup: 'O+', history: 'None', notes: '', refNo: 'R-009', emergencyName: 'Nisha', emergencyPhone: '9876543219' },
  { id: 10, reg: '2026/02/22', name: 'Kavita Joshi', phone: '9876543219', patientId: 'PT-010', gender: 'Female', age: '35', visit: 3, due: '150.00', location: 'Lucknow', email: 'kavita@mail.com', bloodGroup: 'A+', history: 'Thyroid', notes: '', refNo: 'R-010', emergencyName: 'Deepak', emergencyPhone: '9876543220' },
  { id: 11, reg: '2026/02/25', name: 'Suresh Raina', phone: '9876543220', patientId: 'PT-011', gender: 'Male', age: '36', visit: 8, due: '0.00', location: 'Ghaziabad', email: 'suresh@mail.com', bloodGroup: 'B+', history: 'None', notes: '', refNo: 'R-011', emergencyName: 'Priyanka', emergencyPhone: '9876543221' },
  { id: 12, reg: '2026/02/28', name: 'Meera Bai', phone: '9876543221', patientId: 'PT-012', gender: 'Female', age: '29', visit: 1, due: '2000.00', location: 'Udaipur', email: 'meera@mail.com', bloodGroup: 'AB-', history: 'None', notes: '', refNo: 'R-012', emergencyName: 'Govind', emergencyPhone: '9876543222' },
  { id: 13, reg: '2026/03/01', name: 'Kunal Kapoor', phone: '9876543222', patientId: 'PT-013', gender: 'Male', age: '40', visit: 4, due: '0.00', location: 'Indore', email: 'kunal@mail.com', bloodGroup: 'O-', history: 'None', notes: '', refNo: 'R-013', emergencyName: 'Zoya', emergencyPhone: '9876543223' },
  { id: 14, reg: '2026/03/05', name: 'Deepika P', phone: '9876543223', patientId: 'PT-014', gender: 'Female', age: '33', visit: 5, due: '450.00', location: 'Mysore', email: 'deepika@mail.com', bloodGroup: 'A+', history: 'None', notes: '', refNo: 'R-014', emergencyName: 'Ranveer', emergencyPhone: '9876543224' },
  { id: 15, reg: '2026/03/10', name: 'Varun Dhawan', phone: '9876543224', patientId: 'PT-015', gender: 'Male', age: '37', visit: 2, due: '0.00', location: 'Nagpur', email: 'varun@mail.com', bloodGroup: 'B+', history: 'None', notes: '', refNo: 'R-015', emergencyName: 'Natasha', emergencyPhone: '9876543225' },
  { id: 16, reg: '2026/03/12', name: 'Shraddha K', phone: '9876543225', patientId: 'PT-016', gender: 'Female', age: '26', visit: 3, due: '300.00', location: 'Surat', email: 'shraddha@mail.com', bloodGroup: 'O+', history: 'None', notes: '', refNo: 'R-016', emergencyName: 'Shakti', emergencyPhone: '9876543226' },
  { id: 17, reg: '2026/03/15', name: 'Ishan Kishan', phone: '9876543226', patientId: 'PT-017', gender: 'Male', age: '25', visit: 1, due: '1500.00', location: 'Patna', email: 'ishan@mail.com', bloodGroup: 'B-', history: 'None', notes: '', refNo: 'R-017', emergencyName: 'Aditi', emergencyPhone: '9876543227' },
  { id: 18, reg: '2026/03/18', name: 'Pooja Hegde', phone: '9876543227', patientId: 'PT-018', gender: 'Female', age: '30', visit: 4, due: '0.00', location: 'Hyderabad', email: 'pooja@mail.com', bloodGroup: 'A-', history: 'None', notes: '', refNo: 'R-018', emergencyName: 'Manish', emergencyPhone: '9876543228' },
  { id: 19, reg: '2026/03/20', name: 'KL Rahul', phone: '9876543228', patientId: 'PT-019', gender: 'Male', age: '32', visit: 7, due: '0.00', location: 'Mangalore', email: 'klrahul@mail.com', bloodGroup: 'AB+', history: 'None', notes: '', refNo: 'R-019', emergencyName: 'Athiya', emergencyPhone: '9876543229' },
  { id: 20, reg: '2026/03/22', name: 'Rashmika M', phone: '9876543229', patientId: 'PT-020', gender: 'Female', age: '27', visit: 2, due: '600.00', location: 'Coorg', email: 'rashmika@mail.com', bloodGroup: 'B+', history: 'None', notes: '', refNo: 'R-020', emergencyName: 'Ranbir', emergencyPhone: '9876543230' }
];

const Patients = () => {
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('dentobees_patients_v4');
    return saved ? JSON.parse(saved) : DEFAULT_PATIENTS;
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter States
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    minDue: '',
    maxDue: '',
    minAge: '',
    maxAge: '',
    gender: 'All'
  });

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  useEffect(() => {
    localStorage.setItem('dentobees_patients_v4', JSON.stringify(patients));
  }, [patients]);

  const handleSavePatient = (patientData) => {
    if (editingPatient) {
      setPatients(prev => prev.map(p => p.id === editingPatient.id ? { ...p, ...patientData } : p));
    } else {
      const nextIdNum = patients.length + 1;
      const newPatient = {
        ...patientData,
        id: Date.now(),
        patientId: `PT-${nextIdNum.toString().padStart(3, '0')}`,
        reg: new Date().toLocaleDateString('en-GB'),
        visit: 0,
        due: patientData.due || '0.00'
      };
      setPatients(prev => [newPatient, ...prev]);
    }
    setShowAddModal(false);
    setEditingPatient(null);
  };

  const handleDeletePatient = (id) => {
    if (window.confirm('Are you sure you want to delete this patient record?')) {
      setPatients(prev => prev.filter(p => p.id !== id));
    }
  };

  const filteredPatients = useMemo(() => {
    return patients.filter(p => {
      const matchesSearch =
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.phone || p.mobile || '').includes(searchQuery) ||
        (p.patientId || '').toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (filters.gender !== 'All' && p.gender !== filters.gender) return false;
      if (filters.dateFrom && new Date(p.reg) < new Date(filters.dateFrom)) return false;
      if (filters.dateTo && new Date(p.reg) > new Date(filters.dateTo)) return false;

      const due = parseFloat(p.due || 0);
      if (filters.minDue && due < parseFloat(filters.minDue)) return false;
      if (filters.maxDue && due > parseFloat(filters.maxDue)) return false;

      const age = parseInt(p.age || 0);
      if (filters.minAge && age < parseInt(filters.minAge)) return false;
      if (filters.maxAge && age > parseInt(filters.maxAge)) return false;

      return true;
    });
  }, [patients, searchQuery, filters]);

  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredPatients.slice(start, start + rowsPerPage);
  }, [filteredPatients, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);

  const openChart = (patient) => {
    setSelectedPatient(patient);
    setShowChartModal(true);
  };

  return (
    <div className="patients-module">
      <div className="patients-top-bar">
        <h1 className="module-title">All Patients</h1>
        <div className="bar-actions">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by Name, Phone, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="action-button filter-btn" onClick={() => setShowFilterModal(true)}>
            <Filter size={16} />
            <span>Filters</span>
          </button>
          <button className="action-button teal-btn" onClick={() => { setEditingPatient(null); setShowAddModal(true); }}>
            <PlusCircle size={16} />
            <span>New Patient</span>
          </button>
        </div>
      </div>

      <div className="patients-content-card">
        <div className="table-container">
          <table className="exact-patients-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Reg Date</th>
                <th>Patient Name</th>
                <th>Phone</th>
                <th>Patient Id</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Location</th>
                <th>Due</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPatients.map((patient, index) => (
                <tr key={patient.id}>
                  <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  <td>{patient.reg || patient.regDate || '-'}</td>
                  <td className="name-cell">
                    <span>{patient.name}</span>
                  </td>
                  <td>{patient.phone || patient.mobile || '-'}</td>
                  <td className="id-cell">{patient.patientId || patient.id}</td>
                  <td>
                    <span className={`gender-tag ${(patient.gender || 'Other').toLowerCase()}`}>
                      {patient.gender || 'Other'}
                    </span>
                  </td>
                  <td>{patient.age || '-'}</td>
                  <td>{patient.location || '-'}</td>
                  <td className="due-cell">
                    <span className={parseFloat(patient.due || 0) > 0 ? 'has-due' : 'no-due'}>
                      ₹{parseFloat(patient.due || 0).toLocaleString()}
                    </span>
                  </td>
                  <td className="action-cell">
                    <div className="action-cell-btns">
                      <button className="row-btn chart" title="Dental Chart" onClick={() => openChart(patient)}>
                        <Eye size={14} />
                      </button>
                      <button className="row-btn edit" title="Edit" onClick={() => { setEditingPatient(patient); setShowAddModal(true); }}>
                        <Edit2 size={14} />
                      </button>
                      <button className="row-btn delete" title="Delete" onClick={() => handleDeletePatient(patient.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPatients.length === 0 && (
            <div className="empty-state">
              <AlertTriangle size={48} />
              <p>No patients found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      <div className="patients-footer">
        <div className="footer-left">
          <span>Rows per page:</span>
          <div className="rows-options">
            {[10, 20, 50, 100].map(v => (
              <button
                key={v}
                className={rowsPerPage === v ? 'row-opt active' : 'row-opt'}
                onClick={() => { setRowsPerPage(v); setCurrentPage(1); }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="footer-right">
          <span className="records-count">
            Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredPatients.length)} of {filteredPatients.length} records
          </span>
          <div className="pagination-btns">
            <button
              className="p-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="p-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {showFilterModal && (
        <FilterPopup
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      {showAddModal && (
        <RegistrationModal
          patient={editingPatient}
          onSave={handleSavePatient}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showChartModal && (
        <DentalChartModal
          patient={selectedPatient}
          onClose={() => setShowChartModal(false)}
        />
      )}
    </div>
  );
};

/* ─── Sub-Components ────────────────────────── */

const FilterPopup = ({ filters, setFilters, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const reset = {
      dateFrom: '',
      dateTo: '',
      minDue: '',
      maxDue: '',
      minAge: '',
      maxAge: '',
      gender: 'All'
    };
    setLocalFilters(reset);
    setFilters(reset);
    onClose();
  };

  return (
    <div className="exact-modal-overlay">
      <div className="filter-popup-modal">
        <div className="filter-modal-header">
          <h2>Filter Patients</h2>
          <button className="exact-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="filter-modal-body">
          <div className="filter-section">
            <label>Registration Date Range</label>
            <div className="filter-row">
              <div className="filter-field">
                <input
                  type="date"
                  value={localFilters.dateFrom}
                  onChange={(e) => setLocalFilters({ ...localFilters, dateFrom: e.target.value })}
                />
              </div>
              <div className="filter-field">
                <input
                  type="date"
                  value={localFilters.dateTo}
                  onChange={(e) => setLocalFilters({ ...localFilters, dateTo: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="filter-section">
            <label>Outstanding Due (Min - Max)</label>
            <div className="filter-row">
              <div className="filter-field">
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={localFilters.minDue}
                  onChange={(e) => setLocalFilters({ ...localFilters, minDue: e.target.value })}
                />
              </div>
              <div className="filter-field">
                <input
                  type="number"
                  placeholder="Max ₹"
                  value={localFilters.maxDue}
                  onChange={(e) => setLocalFilters({ ...localFilters, maxDue: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="filter-section">
            <label>Age Range</label>
            <div className="filter-row">
              <div className="filter-field">
                <input
                  type="number"
                  placeholder="Min Yrs"
                  value={localFilters.minAge}
                  onChange={(e) => setLocalFilters({ ...localFilters, minAge: e.target.value })}
                />
              </div>
              <div className="filter-field">
                <input
                  type="number"
                  placeholder="Max Yrs"
                  value={localFilters.maxAge}
                  onChange={(e) => setLocalFilters({ ...localFilters, maxAge: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="filter-section">
            <label>Gender Selection</label>
            <div className="filter-select-wrapper">
              <select
                value={localFilters.gender}
                onChange={(e) => setLocalFilters({ ...localFilters, gender: e.target.value })}
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown size={16} className="select-arrow" />
            </div>
          </div>
        </div>
        <div className="filter-modal-footer">
          <button className="clear-link" onClick={handleReset}>Clear All Filters</button>
          <button className="btn-apply-filter" onClick={handleApply}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

const RegistrationModal = ({ patient, onSave, onClose }) => {
  const [formData, setFormData] = useState(patient || {
    name: '',
    phone: '',
    gender: 'Male',
    age: '',
    location: '',
    refNo: '',
    email: '',
    bloodGroup: '',
    history: '',
    notes: '',
    emergencyName: '',
    emergencyPhone: '',
    due: '0.00'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="exact-modal-overlay">
      <div className="exact-modal">
        <div className="exact-modal-header">
          <h2>{patient ? 'Edit Patient Details' : 'Add New Patient'}</h2>
          <button className="exact-close" onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="exact-form">
          <div className="exact-form-grid">
            <div className="exact-form-group">
              <label>Mobile Number <span className="req">*</span></label>
              <div className="exact-phone-input">
                <div className="exact-cc">+91</div>
                <input
                  required
                  type="tel"
                  placeholder="Enter mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="exact-form-group">
              <label>Patient Name <span className="req">*</span></label>
              <input
                required
                type="text"
                placeholder="Enter patient name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="exact-form-group">
              <label>Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="exact-form-group">
              <label>Age</label>
              <input
                type="number"
                placeholder="0"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
            <div className="exact-form-group">
              <label>Patient Location</label>
              <input
                type="text"
                placeholder="Enter location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="exact-form-group">
              <label>Reference Number</label>
              <input
                type="text"
                placeholder="Enter reference number (Optional)"
                value={formData.refNo}
                onChange={(e) => setFormData({ ...formData, refNo: e.target.value })}
              />
            </div>
            <div className="exact-form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email (Optional)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="exact-form-group">
              <label>Blood Group</label>
              <BloodGroupDropdown
                value={formData.bloodGroup}
                onChange={(val) => setFormData({ ...formData, bloodGroup: val })}
              />
            </div>
            <div className="exact-form-group full">
              <label>Patient History</label>
              <div className="exact-select-search">
                <input
                  type="text"
                  placeholder="Search & Select"
                  value={formData.history}
                  onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                />
                <ChevronDown size={16} className="arrow-icon" />
              </div>
            </div>
            <div className="exact-form-group full">
              <label>Notes/Remarks</label>
              <textarea
                placeholder="Enter notes (Optional)"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="exact-emergency-section">
            <h3 className="section-title">Emergency Contact Information (Optional)</h3>
            <div className="exact-form-grid">
              <div className="exact-form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter Emergency Contact Name"
                  value={formData.emergencyName}
                  onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                />
              </div>
              <div className="exact-form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  placeholder="Enter Emergency Contact Phone"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="exact-modal-footer">
            <button type="button" className="exact-btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="exact-btn-create">
              {patient ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ─── Custom Blood Group Dropdown ───────── */
const BG_GROUPS = [
  {
    label: 'Common ABO / Rh',
    options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  {
    label: 'Rare / Other Systems',
    options: ['Bombay', 'Rh-Null', 'Kell', 'Duffy', 'Kidd', 'Lewis', 'MNS', 'P', 'Lutheran', 'Diego', 'Augustine', 'Vel', 'JR', 'LAN', 'Hh'],
  }
];

const BloodGroupDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bgd-wrapper" ref={dropdownRef}>
      <div className={`bgd-trigger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {value ? (
          <span className="bgd-value">{value}</span>
        ) : (
          <span className="bgd-placeholder">Enter Blood Group (Optional)</span>
        )}
        <ChevronDown size={16} className={`bgd-arrow ${isOpen ? 'rotate' : ''}`} />
      </div>

      {isOpen && (
        <div className="bgd-panel">
          <div className="bgd-panel-inner">
            {BG_GROUPS.map((group, idx) => (
              <div key={idx} className="bgd-group">
                <div className="bgd-group-label">{group.label}</div>
                <div className="bgd-options">
                  {group.options.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      className={`bgd-option ${value === opt ? 'selected' : ''}`}
                      onClick={() => { onChange(opt); setIsOpen(false); }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
