import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, Download, ChevronDown, Plus, 
  CreditCard, Calendar, Banknote, Landmark, X, FileText,
  MoreVertical, RefreshCw, PackageOpen
} from 'lucide-react';
import './Transactions.css';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('Income');
  const [isLoading, setIsLoading] = useState(true);
  const [incomes, setIncomes] = useState([
    { partyName: 'John Doe', category: 'Consultation', amount: 1500, paymentType: 'UPI', transactionDate: '02-05-2026 10:30 AM', notes: 'Initial checkup' },
    { partyName: 'Sarah Smith', category: 'Treatment', amount: 4500, paymentType: 'Card', transactionDate: '01-05-2026 02:15 PM', notes: 'Root canal partial payment' },
    { partyName: 'Walk-in Patient', category: 'Pharmacy', amount: 850, paymentType: 'Cash', transactionDate: '01-05-2026 11:45 AM', notes: 'Medicines' },
    { partyName: 'Michael Brown', category: 'Treatment', amount: 12000, paymentType: 'Card', transactionDate: '28-04-2026 04:00 PM', notes: 'Dental Implants' },
    { partyName: 'Emma Wilson', category: 'Consultation', amount: 1500, paymentType: 'Cash', transactionDate: '27-04-2026 09:15 AM', notes: 'Follow-up' },
    { partyName: 'David Lee', category: 'Treatment', amount: 2000, paymentType: 'UPI', transactionDate: '26-04-2026 03:20 PM', notes: 'Teeth Whitening' },
    { partyName: 'Olivia Jones', category: 'Consultation', amount: 1200, paymentType: 'Card', transactionDate: '25-04-2026 10:00 AM', notes: 'Routine checkup' },
    { partyName: 'Walk-in Patient', category: 'Pharmacy', amount: 450, paymentType: 'Cash', transactionDate: '25-04-2026 11:30 AM', notes: 'Painkillers' },
    { partyName: 'James Taylor', category: 'Treatment', amount: 8000, paymentType: 'UPI', transactionDate: '24-04-2026 01:45 PM', notes: 'Crown installation' },
    { partyName: 'Sophia Martinez', category: 'Consultation', amount: 1500, paymentType: 'Card', transactionDate: '24-04-2026 04:30 PM', notes: 'Braces consultation' },
    { partyName: 'William White', category: 'Treatment', amount: 3500, paymentType: 'Cash', transactionDate: '23-04-2026 09:45 AM', notes: 'Cavity filling' },
    { partyName: 'Isabella Harris', category: 'Treatment', amount: 5000, paymentType: 'Card', transactionDate: '22-04-2026 02:10 PM', notes: 'Wisdom tooth extraction' },
    { partyName: 'Walk-in Patient', category: 'Pharmacy', amount: 120, paymentType: 'Cash', transactionDate: '21-04-2026 10:20 AM', notes: 'Mouthwash' },
    { partyName: 'Lucas Clark', category: 'Consultation', amount: 1000, paymentType: 'UPI', transactionDate: '20-04-2026 11:00 AM', notes: 'Pediatric checkup' },
    { partyName: 'Mia Rodriguez', category: 'Treatment', amount: 2500, paymentType: 'Card', transactionDate: '19-04-2026 03:15 PM', notes: 'Scaling and polishing' },
    { partyName: 'Ethan Lewis', category: 'Consultation', amount: 1500, paymentType: 'UPI', transactionDate: '18-04-2026 09:30 AM', notes: 'General consultation' },
    { partyName: 'Walk-in Patient', category: 'Pharmacy', amount: 300, paymentType: 'Cash', transactionDate: '18-04-2026 01:20 PM', notes: 'Dental floss & paste' },
    { partyName: 'Charlotte Walker', category: 'Treatment', amount: 6500, paymentType: 'Card', transactionDate: '17-04-2026 10:45 AM', notes: 'Veneers' },
    { partyName: 'Benjamin Hall', category: 'Consultation', amount: 1500, paymentType: 'Cash', transactionDate: '16-04-2026 04:00 PM', notes: 'Follow-up' },
    { partyName: 'Amelia Young', category: 'Treatment', amount: 4000, paymentType: 'UPI', transactionDate: '15-04-2026 02:30 PM', notes: 'Bridge repair' }
  ]);

  const [expenses, setExpenses] = useState([
    { partyName: 'Dental Supply Co.', category: 'Supplies', amount: 5000, paymentType: 'UPI', transactionDate: '02-05-2026 09:15 AM', notes: 'Monthly materials' },
    { partyName: 'Dr. Smith (Salary)', category: 'Salary', amount: 45000, paymentType: 'Bank Transfer', transactionDate: '01-05-2026 10:00 AM', notes: 'May Salary' },
    { partyName: 'City Power', category: 'Utilities', amount: 3500, paymentType: 'Card', transactionDate: '28-04-2026 02:20 PM', notes: 'Electricity bill' },
    { partyName: 'TechFix IT', category: 'Maintenance', amount: 1200, paymentType: 'Cash', transactionDate: '25-04-2026 11:30 AM', notes: 'Printer repair' },
    { partyName: 'Global Equipment', category: 'Equipment', amount: 25000, paymentType: 'UPI', transactionDate: '20-04-2026 04:00 PM', notes: 'New dental chair part' },
    { partyName: 'CleanCo', category: 'Services', amount: 2000, paymentType: 'Cash', transactionDate: '15-04-2026 08:30 AM', notes: 'Deep cleaning' },
    { partyName: 'City Water', category: 'Utilities', amount: 800, paymentType: 'Card', transactionDate: '10-04-2026 01:15 PM', notes: 'Water bill' },
    { partyName: 'Dental Supply Co.', category: 'Supplies', amount: 3200, paymentType: 'UPI', transactionDate: '05-04-2026 10:45 AM', notes: 'Restock gloves & masks' },
    { partyName: 'Starbucks', category: 'Staff Welfare', amount: 1500, paymentType: 'Card', transactionDate: '01-04-2026 08:00 AM', notes: 'Monthly coffee' }
  ]);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [openingBalance, setOpeningBalance] = useState(0);
  const [filterMode, setFilterMode] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [tempMode, setTempMode] = useState('');
  const [tempCategory, setTempCategory] = useState('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modals
  const [showReportModal, setShowReportModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showDrawingModal, setShowDrawingModal] = useState(false);
  const [tempBalance, setTempBalance] = useState('');
  
  const [filterBankName, setFilterBankName] = useState('');
  const [tempBankName, setTempBankName] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [tempMinAmount, setTempMinAmount] = useState('');
  const [tempMaxAmount, setTempMaxAmount] = useState('');
  
  // Form States
  const [dateFilter, setDateFilter] = useState('All Time');
  
  const [newTransaction, setNewTransaction] = useState({
    category: '',
    partyName: '',
    amount: '',
    paymentType: 'Cash',
    notes: '',
    transactionDate: ''
  });

  const [newBankTransaction, setNewBankTransaction] = useState({
    amount: '',
    paymentMethod: 'Bank',
    date: '',
    notes: '',
    bankName: '',
    isExpense: true
  });

  const handleAddTransaction = () => {
    if (!newTransaction.category || !newTransaction.partyName || !newTransaction.amount) {
      alert("Please fill required fields (Category, Party, Amount).");
      return;
    }

    const formattedDate = newTransaction.transactionDate || new Date().toLocaleString('en-GB', { 
        day: '2-digit', month: '2-digit', year: 'numeric', 
        hour: '2-digit', minute: '2-digit', hour12: true 
    }).replace(',', '').toUpperCase();
    
    const newRecord = {
      partyName: newTransaction.partyName,
      category: newTransaction.category,
      amount: Number(newTransaction.amount),
      paymentType: newTransaction.paymentType,
      transactionDate: formattedDate,
      notes: newTransaction.notes
    };

    if (activeTab === 'Expense') {
      setExpenses([newRecord, ...expenses]);
    } else {
      setIncomes([newRecord, ...incomes]);
    }
    
    setShowAddModal(false);
    setNewTransaction({ category: '', partyName: '', amount: '', paymentType: 'Cash', notes: '', transactionDate: '' });
  };

  const handleAddBankTransaction = (type) => {
    if (!newBankTransaction.amount) {
      alert("Please enter amount.");
      return;
    }
    const formattedDate = newBankTransaction.date || new Date().toLocaleString('en-GB', { 
        day: '2-digit', month: '2-digit', year: 'numeric', 
        hour: '2-digit', minute: '2-digit', hour12: true 
    }).replace(',', '').toUpperCase();

    const newRecord = {
      partyName: type === 'deposit' ? 'Bank Deposit' : 'Bank Withdrawal',
      category: 'Bank Transfer',
      amount: Number(newBankTransaction.amount),
      paymentType: type === 'deposit' ? 'Bank Transfer' : newBankTransaction.paymentMethod,
      transactionDate: formattedDate,
      notes: newBankTransaction.notes,
      bankName: type === 'deposit' ? (newBankTransaction.bankName || 'Default Bank') : 'Default Bank'
    };

    if (type === 'deposit') {
      setIncomes([newRecord, ...incomes]);
    } else {
      // For withdrawals, only log to expenses if explicitly checked or default true
      if (newBankTransaction.isExpense) {
        setExpenses([newRecord, ...expenses]);
      } else {
        setExpenses([newRecord, ...expenses]); // Usually just liquidity transfer
      }
    }

    setShowDepositModal(false);
    setShowDrawingModal(false);
    setNewBankTransaction({ amount: '', paymentMethod: 'Bank', date: '', notes: '', bankName: '', isExpense: true });
  };

  const handleExport = () => {
    const headers = ['Date', 'Type', 'Party', 'Category', 'Payment Mode', 'Amount', 'Notes'];
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + filteredData.map(e => `"${e.transactionDate}","${e.type || activeTab}","${e.partyName}","${e.category}","${e.paymentType}","${e.amount}","${e.notes}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeTab.toLowerCase().replace(/ /g, '_')}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parseDate = (dateStr) => {
    const [datePart, timePart, ampm] = dateStr.split(' ');
    const [day, month, year] = datePart.split('-');
    let [hours, minutes] = timePart.split(':');
    if (ampm === 'PM' && hours !== '12') hours = Number(hours) + 12;
    if (ampm === 'AM' && hours === '12') hours = '00';
    return new Date(year, month - 1, day, hours, minutes);
  };

  const isDateInRange = (dateStr, range) => {
    if (range === 'All Time') return true;
    
    const targetDate = parseDate(dateStr);
    const now = new Date('2026-05-02T11:28:00'); 
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (range === 'Today') {
      return targetDate >= today;
    }
    if (range === 'Yesterday') {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return targetDate >= yesterday && targetDate < today;
    }
    if (range === 'Last 7 Days') {
      const last7 = new Date(today);
      last7.setDate(last7.getDate() - 7);
      return targetDate >= last7;
    }
    if (range === 'This Month') {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      return targetDate >= firstDay;
    }
    return true;
  };

  const filteredData = useMemo(() => {
    let activeData = [];
    if (activeTab === 'Account Statements' || activeTab === 'Cash Day Book') {
      activeData = [
        ...incomes.map(i => ({ ...i, type: 'Income' })),
        ...expenses.map(e => ({ ...e, type: 'Expense' }))
      ].sort((a, b) => parseDate(b.transactionDate) - parseDate(a.transactionDate));

      if (activeTab === 'Cash Day Book') {
        const now = new Date('2026-05-02T11:28:00');
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        activeData = activeData.filter(d => parseDate(d.transactionDate) >= today);
      }
    } else if (activeTab === 'Bank Deposits') {
      activeData = [
        ...incomes.map(i => ({ ...i, type: 'Income' })),
        ...expenses.map(e => ({ ...e, type: 'Expense' }))
      ].filter(d => d.paymentType.toLowerCase() !== 'cash')
       .sort((a, b) => parseDate(b.transactionDate) - parseDate(a.transactionDate));
    } else if (activeTab === 'Expense') {
      activeData = expenses.map(e => ({ ...e, type: 'Expense' }));
    } else {
      activeData = incomes.map(i => ({ ...i, type: 'Income' }));
    }

    return activeData.filter(inc => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        inc.partyName.toLowerCase().includes(searchLower) ||
        inc.category.toLowerCase().includes(searchLower) ||
        inc.paymentType.toLowerCase().includes(searchLower) ||
        inc.notes.toLowerCase().includes(searchLower);
        
      const matchesMode = filterMode === '' || inc.paymentType.toLowerCase() === filterMode.toLowerCase();
      const matchesCategory = filterCategory === '' || inc.category.toLowerCase() === filterCategory.toLowerCase();
      const matchesDate = isDateInRange(inc.transactionDate, dateFilter);
      const matchesBank = filterBankName === '' || (inc.bankName && inc.bankName.toLowerCase() === filterBankName.toLowerCase());
      const matchesMin = minAmount === '' || inc.amount >= Number(minAmount);
      const matchesMax = maxAmount === '' || inc.amount <= Number(maxAmount);
      
      return matchesSearch && matchesMode && matchesCategory && matchesDate && matchesBank && matchesMin && matchesMax;
    });
  }, [activeTab, incomes, expenses, searchTerm, filterMode, filterCategory, dateFilter, filterBankName, minAmount, maxAmount]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterMode, filterCategory, dateFilter]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  // Derived values for summary cards and modal
  const totalTransactions = filteredData.length;
  const totalRevenue = filteredData.reduce((sum, inc) => sum + inc.amount, 0);
  const totalCash = filteredData.filter(inc => inc.paymentType.toLowerCase() === 'cash').reduce((sum, inc) => sum + inc.amount, 0);
  const totalBank = filteredData.filter(inc => inc.paymentType.toLowerCase() !== 'cash').reduce((sum, inc) => sum + inc.amount, 0);

  // Account Statements & Cash Day Book Derived Values
  const stmtIncomeAmount = (activeTab === 'Account Statements' || activeTab === 'Cash Day Book') ? filteredData.filter(d => d.type === 'Income').reduce((s, i) => s + i.amount, 0) : 0;
  const stmtExpenseAmount = (activeTab === 'Account Statements' || activeTab === 'Cash Day Book') ? filteredData.filter(d => d.type === 'Expense').reduce((s, e) => s + e.amount, 0) : 0;
  const stmtIncomeCash = (activeTab === 'Account Statements' || activeTab === 'Cash Day Book') ? filteredData.filter(d => d.type === 'Income' && d.paymentType.toLowerCase() === 'cash').reduce((s, i) => s + i.amount, 0) : 0;
  const stmtIncomeBank = (activeTab === 'Account Statements' || activeTab === 'Cash Day Book') ? filteredData.filter(d => d.type === 'Income' && d.paymentType.toLowerCase() !== 'cash').reduce((s, i) => s + i.amount, 0) : 0;
  const stmtExpenseCash = (activeTab === 'Account Statements' || activeTab === 'Cash Day Book') ? filteredData.filter(d => d.type === 'Expense' && d.paymentType.toLowerCase() === 'cash').reduce((s, e) => s + e.amount, 0) : 0;
  const stmtExpenseBank = (activeTab === 'Account Statements' || activeTab === 'Cash Day Book') ? filteredData.filter(d => d.type === 'Expense' && d.paymentType.toLowerCase() !== 'cash').reduce((s, e) => s + e.amount, 0) : 0;
  const stmtIncomeCount = (activeTab === 'Account Statements' || activeTab === 'Cash Day Book') ? filteredData.filter(d => d.type === 'Income').length : 0;
  const stmtExpenseCount = (activeTab === 'Account Statements' || activeTab === 'Cash Day Book') ? filteredData.filter(d => d.type === 'Expense').length : 0;

  // Mock data for summary modal
  const summaryPatients = {
    appointments: 12,
    checkIn: 8,
    newPatients: 3
  };
  
  const summaryExpenses = {
    transactions: 2,
    cashInBank: 1200,
    cashInHand: 450
  };
  
  const TABS = ['Income', 'Expense', 'Account Statements', 'Cash Day Book', 'Bank Deposits'];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="transactions-module">
      {/* Top Header & Tabs */}
      <div className="transactions-header">
        <div className="tabs-container">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`t-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === 'Cash Day Book' ? (
          <button className="report-btn daily-summary-btn" onClick={() => setShowReportModal(true)}>
            <Download size={16} />
            Daily Summary
          </button>
        ) : (
          <button className="report-btn" onClick={() => setShowReportModal(true)}>
            <Download size={16} />
            Report
          </button>
        )}
      </div>

      {/* Summary Cards */}
      {activeTab === 'Cash Day Book' ? (
        <div className="summary-cards-container cash-day-book-cards">
          <div className="summary-card">
            <div className="card-icon-wrapper pink">
              <Banknote size={20} className="icon-pink" />
            </div>
            <div className="card-info">
              <span className="card-label">Opening Cash</span>
              <div className="card-value">
                <span className="unit">₹</span> <span className="number">{openingBalance.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon-wrapper green">
              <Banknote size={20} className="icon-green" />
            </div>
            <div className="card-info">
              <span className="card-label">Total Revenue</span>
              <div className="card-value">
                <span className="unit">₹</span> <span className="number">{stmtIncomeAmount.toLocaleString()}</span>
              </div>
              <span className="card-subtext">(Cash: ₹{stmtIncomeCash.toLocaleString()} / Bank: ₹{stmtIncomeBank.toLocaleString()})</span>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon-wrapper pink">
              <CreditCard size={20} className="icon-pink" />
            </div>
            <div className="card-info">
              <span className="card-label">Total Expenses</span>
              <div className="card-value">
                <span className="unit">₹</span> <span className="number">{stmtExpenseAmount.toLocaleString()}</span>
              </div>
              <span className="card-subtext">(Cash: ₹{stmtExpenseCash.toLocaleString()} / Bank: ₹{stmtExpenseBank.toLocaleString()})</span>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon-wrapper purple">
              <Landmark size={20} className="icon-purple" />
            </div>
            <div className="card-info">
              <span className="card-label">Net Revenue</span>
              <div className="card-value">
                <span className="unit">₹</span> <span className="number">{(stmtIncomeAmount - stmtExpenseAmount).toLocaleString()}</span>
              </div>
              <span className="card-subtext">(Cash: ₹{(stmtIncomeCash - stmtExpenseCash).toLocaleString()} / Bank: ₹{(stmtIncomeBank - stmtExpenseBank).toLocaleString()})</span>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon-wrapper green">
              <Banknote size={20} className="icon-green" />
            </div>
            <div className="card-info">
              <span className="card-label">Closing Cash</span>
              <div className="card-value">
                <span className="unit">₹</span> <span className="number">{(openingBalance + stmtIncomeCash - stmtExpenseCash).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon-wrapper purple">
              <Calendar size={20} className="icon-purple" />
            </div>
            <div className="card-info">
              <span className="card-label">Appointments</span>
              <div className="card-value">
                <span className="number">0</span>
              </div>
              <span className="card-subtext">(Check-In: 0 | New Patients: 0)</span>
            </div>
          </div>
        </div>
      ) : activeTab === 'Bank Deposits' ? (
        <div className="summary-cards-container bank-deposits-cards">
          <div className="summary-card">
            <div className="card-icon-wrapper green">
              <Landmark size={20} className="icon-green" />
            </div>
            <div className="card-info">
              <span className="card-label">Total Deposits</span>
              <div className="card-value">
                <span className="unit">₹</span> <span className="number">{filteredData.filter(d => d.type === 'Income').reduce((s, i) => s + i.amount, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon-wrapper pink">
              <CreditCard size={20} className="icon-pink" />
            </div>
            <div className="card-info">
              <span className="card-label">Total Drawings</span>
              <div className="card-value">
                <span className="unit">₹</span> <span className="number">{filteredData.filter(d => d.type === 'Expense').reduce((s, i) => s + i.amount, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'Account Statements' ? (
        <div className="summary-cards-container account-stmt-cards">
          <div className="summary-card">
            <div className="card-icon-wrapper pink">
              <CreditCard size={20} className="icon-pink" />
            </div>
            <div className="card-info">
              <span className="card-label">Transactions</span>
              <div className="card-value">
                <span className="number">{filteredData.length}</span> <span className="unit">Nos</span>
              </div>
              <span className="card-subtext">(Income: {stmtIncomeCount} / Expense: {stmtExpenseCount})</span>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon-wrapper green">
              <Banknote size={20} className="icon-green" />
            </div>
            <div className="card-info">
              <span className="card-label">Revenue</span>
              <div className="card-value">
                <span className="unit">₹</span> <span className="number">{stmtIncomeAmount.toLocaleString()}</span>
              </div>
              <span className="card-subtext">(Cash: ₹{stmtIncomeCash.toLocaleString()} / Bank: ₹{stmtIncomeBank.toLocaleString()})</span>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon-wrapper pink">
              <CreditCard size={20} className="icon-pink" />
            </div>
            <div className="card-info">
              <span className="card-label">Expense</span>
              <div className="card-value">
                <span className="unit">₹</span> <span className="number">{stmtExpenseAmount.toLocaleString()}</span>
              </div>
              <span className="card-subtext">(Cash: ₹{stmtExpenseCash.toLocaleString()} / Bank: ₹{stmtExpenseBank.toLocaleString()})</span>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon-wrapper purple">
              <Landmark size={20} className="icon-purple" />
            </div>
            <div className="card-info">
              <span className="card-label">Net Total</span>
              <div className="card-value">
                <span className="unit">₹</span> <span className="number">{(stmtIncomeAmount - stmtExpenseAmount).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="summary-cards-container">
          <div className="summary-card">
            <div className="card-icon-wrapper pink">
              <CreditCard size={20} className="icon-pink" />
            </div>
            <div className="card-info">
              <span className="card-label">Transactions</span>
              <div className="card-value">
                <span className="number">{totalTransactions}</span> <span className="unit">Nos</span>
              </div>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon-wrapper green">
              <Calendar size={20} className="icon-green" />
            </div>
            <div className="card-info">
              <span className="card-label">{activeTab === 'Expense' ? 'Total Expenses' : 'Total Revenue'}</span>
              <div className="card-value">
                <span className="unit">₹</span> <span className="number">{totalRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon-wrapper purple">
              <Banknote size={20} className="icon-purple" />
            </div>
            <div className="card-info">
              <span className="card-label">Cash</span>
              <div className="card-value">
                <span className="unit">₹</span> <span className="number">{totalCash.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon-wrapper orange">
              <Landmark size={20} className="icon-orange" />
            </div>
            <div className="card-info">
              <span className="card-label">Bank</span>
              <div className="card-value">
                <span className="unit">₹</span> <span className="number">{totalBank.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="payment-details-section">
        <div className="section-header">
          <h2>{activeTab === 'Cash Day Book' ? 'Cash Day Book' : activeTab === 'Bank Deposits' ? 'Deposits & Drawings' : 'Payment Details'}</h2>
          <div className="section-actions">
            <div className="search-box">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="action-btn" onClick={() => {
              setTempMode(filterMode);
              setTempCategory(filterCategory);
              setShowFilterModal(true);
            }}>
              <SlidersHorizontal size={14} />
              Filter
            </button>
            <div className="dropdown-wrapper">
              <button className="action-btn" onClick={handleExport}>
                <Download size={14} />
                Export
              </button>
            </div>
            {activeTab === 'Cash Day Book' && (
              <button className="btn-reset-balance" onClick={() => {
                setTempBalance(openingBalance);
                setShowBalanceModal(true);
              }}>
                Reset Opening Balance
              </button>
            )}
            {activeTab !== 'Cash Day Book' && (
              <div className="dropdown-wrapper">
                <button 
                  className="action-btn" 
                  onClick={() => setShowDateFilter(!showDateFilter)}
                >
                  {dateFilter}
                  <ChevronDown size={14} />
                </button>
                {showDateFilter && (
                  <div className="date-filter-popup">
                    <div className="date-options">
                      {['All Time', 'Today', 'Yesterday', 'Last 7 Days', 'This Month'].map(opt => (
                        <div 
                          key={opt} 
                          className="date-opt"
                          onClick={() => { setDateFilter(opt); setShowDateFilter(false); }}
                        >
                          {opt}
                          {dateFilter === opt && <span className="check-mark">✓</span>}
                        </div>
                      ))}
                      <div className="divider"></div>
                      <div className="custom-date">
                        <span className="custom-label">Custom Date</span>
                        <div className="date-range-inputs">
                          <input type="text" placeholder="mm/dd/yyyy - mm/dd/yyyy" />
                          <Calendar size={14} className="cal-icon" />
                        </div>
                      </div>
                    </div>
                    <div className="popup-actions">
                      <button className="btn-clear" onClick={() => setShowDateFilter(false)}>Clear</button>
                      <button className="btn-apply" onClick={() => setShowDateFilter(false)}>Apply</button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'Bank Deposits' && (
              <>
                <button className="add-income-btn" onClick={() => setShowDrawingModal(true)} style={{ background: '#10b981' }}>
                  <Plus size={16} />
                  Drawings
                </button>
                <button className="add-income-btn" onClick={() => setShowDepositModal(true)} style={{ background: '#10b981' }}>
                  <Plus size={16} />
                  Bank Deposit
                </button>
              </>
            )}
            {activeTab !== 'Account Statements' && activeTab !== 'Cash Day Book' && activeTab !== 'Bank Deposits' && (
              <button className="add-income-btn" onClick={() => setShowAddModal(true)}>
                <Plus size={16} />
                {activeTab === 'Expense' ? 'Add Expense' : 'Add Income'}
              </button>
            )}
          </div>
        </div>

        <div className="table-container">
          <table className="transactions-table">
            <thead>
              {(activeTab === 'Account Statements' || activeTab === 'Cash Day Book' || activeTab === 'Bank Deposits') ? (
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  {activeTab === 'Bank Deposits' && <th>Bank</th>}
                  {activeTab === 'Bank Deposits' && <th>Amount(₹) <span>↓↑</span></th>}
                  {activeTab !== 'Bank Deposits' && <th>Type</th>}
                  {activeTab !== 'Bank Deposits' && <th>Name</th>}
                  {activeTab === 'Bank Deposits' && <th>Type</th>}
                  <th>Payment Type</th>
                  {activeTab !== 'Bank Deposits' && <th>Category</th>}
                  <th>Notes</th>
                  {activeTab !== 'Bank Deposits' && <th>Debit(₹)</th>}
                  {activeTab !== 'Bank Deposits' && <th>Credit(₹)</th>}
                  {activeTab === 'Bank Deposits' && <th>Actions</th>}
                </tr>
              ) : (
                <tr>
                  <th>No.</th>
                  <th>Date <span>↓↑</span></th>
                  <th>{activeTab === 'Expense' ? 'Vendor/Party' : 'Patient/Party'}</th>
                  <th>Category</th>
                  <th>Amount(₹) <span>↓↑</span></th>
                  <th>Payment Mode</th>
                  <th>Notes</th>
                  <th>Action</th>
                </tr>
              )}
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="loader-cell">
                    <RefreshCw className="spinner" size={24} color="#8b5cf6" />
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((inc, i) => {
                  if (activeTab === 'Account Statements' || activeTab === 'Cash Day Book' || activeTab === 'Bank Deposits') {
                    return (
                      <tr key={i}>
                        <td>{(currentPage - 1) * rowsPerPage + i + 1}</td>
                        <td>{inc.transactionDate}</td>
                        <td>
                          <span className={`type-badge ${inc.type.toLowerCase()}`}>
                            {inc.type}
                          </span>
                        </td>
                        <td>{inc.partyName}</td>
                        <td>{inc.paymentType}</td>
                        <td>{inc.category}</td>
                        <td>{inc.notes}</td>
                        <td className="debit-col">{inc.type === 'Expense' ? `₹${inc.amount.toLocaleString()}` : '-'}</td>
                        <td className="credit-col">{inc.type === 'Income' ? `₹${inc.amount.toLocaleString()}` : '-'}</td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={i}>
                      <td>{(currentPage - 1) * rowsPerPage + i + 1}</td>
                      <td>{inc.transactionDate}</td>
                      <td>{inc.partyName}</td>
                      <td>{inc.category}</td>
                      <td>₹{inc.amount.toLocaleString()}</td>
                      <td>{inc.paymentType}</td>
                      <td>{inc.notes}</td>
                      <td><MoreVertical size={16} /></td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={(activeTab === 'Account Statements' || activeTab === 'Cash Day Book' || activeTab === 'Bank Deposits') ? "9" : "8"} className="empty-cell">
                    {(activeTab === 'Account Statements' || activeTab === 'Cash Day Book' || activeTab === 'Bank Deposits') ? (
                      <div className="empty-state-box">
                        <PackageOpen size={48} className="empty-icon" />
                        <p>{activeTab === 'Cash Day Book' ? 'No Transactions Found' : activeTab === 'Bank Deposits' ? 'No Bank Records Found' : 'No Statements Found'}</p>
                      </div>
                    ) : (
                      "No records found"
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-footer">
          <div className="rows-per-page">
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
          <div className="pagination-controls">
            <span className="total-records">Total Records : {filteredData.length}</span>
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

      {/* ─── MODALS ─── */}
      
      {/* Report Modal */}
      {showReportModal && (
        <div className="modal-overlay">
          <div className="modal-content report-modal">
            <button className="modal-close" onClick={() => setShowReportModal(false)}><X size={20} /></button>
            
            <div className="modal-header">
              <h2>Summary Report</h2>
            </div>
            
            <div className="report-body">
              <div className="report-title-section">
                <h3>Business Summary Report</h3>
                <p>From: 02/05/26 To: 02/05/26</p>
              </div>
              
              <div className="report-columns">
                <div className="report-col">
                  <h4>Patients</h4>
                  <div className="col-card patients-card">
                    <div className="r-item-main">
                      <div className="r-icon"><Calendar size={20} /></div>
                      <div>
                        <div className="r-val-title">Appointments</div>
                        <div className="r-val-subtitle">{summaryPatients.appointments} Nos</div>
                      </div>
                    </div>
                    <div className="r-divider"></div>
                    <div className="r-sub-item">
                      <span>Check-in</span>
                      <span>{summaryPatients.checkIn} Nos</span>
                    </div>
                    <div className="r-sub-item">
                      <span>New Patients</span>
                      <span>{summaryPatients.newPatients} Nos</span>
                    </div>
                  </div>
                </div>
                
                <div className="report-col">
                  <h4>Income</h4>
                  <div className="col-card income-card">
                    <div className="r-item-main">
                      <div className="r-icon"><Banknote size={20} /></div>
                      <div>
                        <div className="r-val-title">Transactions</div>
                        <div className="r-val-num">{totalTransactions}</div>
                      </div>
                    </div>
                    <div className="r-divider"></div>
                    <div className="r-sub-item">
                      <span>Received Payments</span>
                      <span className="r-money">₹ {totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="r-sub-item">
                      <span>Billed Invoice</span>
                      <span className="r-money">₹ {totalRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="report-col">
                  <h4>Expenses</h4>
                  <div className="col-card expenses-card">
                    <div className="r-item-main">
                      <div className="r-icon"><CreditCard size={20} /></div>
                      <div>
                        <div className="r-val-title">Transactions</div>
                        <div className="r-val-num">{summaryExpenses.transactions}</div>
                      </div>
                    </div>
                    <div className="r-divider"></div>
                    <div className="r-sub-item">
                      <span>Cash in Bank</span>
                      <span className="r-money">₹ {summaryExpenses.cashInBank.toLocaleString()}</span>
                    </div>
                    <div className="r-sub-item">
                      <span>Cash in Hand</span>
                      <span className="r-money">₹ {summaryExpenses.cashInHand.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="total-income-box">
                <div className="ti-left">
                  <span>Total Income:</span>
                  <span className="ti-amount">₹ {totalRevenue.toLocaleString()}</span>
                </div>
                <div className="ti-right">
                  <div className="ti-breakdown">
                    <span>Bank</span> <strong>₹ {totalBank.toLocaleString()}</strong>
                  </div>
                  <div className="ti-breakdown">
                    <span>Cash</span> <strong>₹ {totalCash.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowReportModal(false)}>Cancel</button>
              <button className="btn-download">Download</button>
              <button className="btn-print">Print</button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="filter-drawer-overlay">
          <div className="filter-drawer">
            <div className="drawer-header">
              <h2>{activeTab === 'Bank Deposits' ? 'Transaction Filters' : 'Payment Filters'}</h2>
              <button className="drawer-close" onClick={() => setShowFilterModal(false)}><X size={20} /></button>
            </div>
            <div className="drawer-body">
              {activeTab === 'Bank Deposits' ? (
                <>
                  <div className="form-group">
                    <label>Transaction Type</label>
                    <div className="select-wrapper">
                      <select value={tempCategory} onChange={e => setTempCategory(e.target.value)}>
                        <option value="">All Transactions</option>
                        <option value="Deposit">Deposits</option>
                        <option value="Withdrawal">Withdrawals</option>
                      </select>
                      <ChevronDown className="sel-icon" size={16} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Bank Name</label>
                    <div className="select-wrapper">
                      <select value={tempBankName} onChange={e => setTempBankName(e.target.value)}>
                        <option value="">Select bank</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="SBI">SBI Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="Axis">Axis Bank</option>
                      </select>
                      <ChevronDown className="sel-icon" size={16} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Payment Type</label>
                    <div className="select-wrapper">
                      <select value={tempMode} onChange={e => setTempMode(e.target.value)}>
                        <option value="">All Types</option>
                        <option value="UPI">UPI</option>
                        <option value="Card">Card</option>
                        <option value="Net Banking">Net Banking</option>
                        <option value="Cheque">Cheque</option>
                      </select>
                      <ChevronDown className="sel-icon" size={16} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Amount Range (₹)</label>
                    <div className="form-row amount-range-row" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input 
                        type="number" 
                        placeholder="Min" 
                        value={tempMinAmount} 
                        onChange={e => setTempMinAmount(e.target.value)} 
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                      />
                      <span style={{ color: '#9ca3af', fontSize: '14px' }}>to</span>
                      <input 
                        type="number" 
                        placeholder="Max" 
                        value={tempMaxAmount} 
                        onChange={e => setTempMaxAmount(e.target.value)} 
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>Payment Mode</label>
                    <div className="select-wrapper">
                      <select value={tempMode} onChange={e => setTempMode(e.target.value)}>
                        <option value="">All Payment Modes</option>
                        <option value="cash">Cash</option>
                        <option value="card">Card</option>
                        <option value="upi">UPI</option>
                      </select>
                      <ChevronDown className="sel-icon" size={16} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <div className="select-wrapper">
                      <select value={tempCategory} onChange={e => setTempCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        {activeTab === 'Expense' ? (
                          <>
                            <option value="supplies">Supplies</option>
                            <option value="salary">Salary</option>
                            <option value="utilities">Utilities</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="equipment">Equipment</option>
                            <option value="services">Services</option>
                          </>
                        ) : (
                          <>
                            <option value="consultation">Consultation</option>
                            <option value="treatment">Treatment</option>
                            <option value="pharmacy">Pharmacy</option>
                          </>
                        )}
                      </select>
                      <ChevronDown className="sel-icon" size={16} />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="drawer-footer">
              <button 
                className="btn-clear-all" 
                onClick={() => {
                  setTempMode('');
                  setTempCategory('');
                  setFilterMode('');
                  setFilterCategory('');
                  setTempBankName('');
                  setFilterBankName('');
                  setTempMinAmount('');
                  setTempMaxAmount('');
                  setMinAmount('');
                  setMaxAmount('');
                  setShowFilterModal(false);
                }}
              >
                Clear all
              </button>
              <button 
                className="btn-apply-filter" 
                onClick={() => {
                  setFilterMode(tempMode);
                  setFilterCategory(tempCategory);
                  setFilterBankName(tempBankName);
                  setMinAmount(tempMinAmount);
                  setMaxAmount(tempMaxAmount);
                  setShowFilterModal(false);
                }}
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="filter-drawer-overlay">
          <div className="filter-drawer add-drawer">
            <div className="drawer-header">
              <h2>{activeTab === 'Expense' ? 'Add New Expense' : 'Add New Income'}</h2>
              <button className="drawer-close" onClick={() => setShowAddModal(false)}><X size={20} /></button>
            </div>
            <div className="drawer-body">
              <div className="form-group">
                <label>Category<span className="req">*</span></label>
                <div className="select-wrapper">
                  <select value={newTransaction.category} onChange={e => setNewTransaction({...newTransaction, category: e.target.value})}>
                    <option value="" disabled>Select or add new category</option>
                    {activeTab === 'Expense' ? (
                      <>
                        <option value="Supplies">Supplies</option>
                        <option value="Salary">Salary</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Services">Services</option>
                      </>
                    ) : (
                      <>
                        <option value="Consultation">Consultation</option>
                        <option value="Treatment">Treatment</option>
                        <option value="Pharmacy">Pharmacy</option>
                      </>
                    )}
                  </select>
                  <ChevronDown className="sel-icon" size={16} />
                </div>
              </div>
              
              <div className="form-group">
                <label>Party Name<span className="req">*</span></label>
                <input 
                  type="text" 
                  value={newTransaction.partyName} 
                  onChange={e => setNewTransaction({...newTransaction, partyName: e.target.value})} 
                  placeholder="Enter party name" 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px' }}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group half">
                  <label>Amount<span className="req">*</span></label>
                  <input type="number" value={newTransaction.amount} onChange={e => setNewTransaction({...newTransaction, amount: e.target.value})} placeholder="Enter amount" />
                </div>
                <div className="form-group half">
                  <label>Payment Type<span className="req">*</span></label>
                  <div className="select-wrapper">
                    <select value={newTransaction.paymentType} onChange={e => setNewTransaction({...newTransaction, paymentType: e.target.value})}>
                      <option value="" disabled>Select payment type</option>
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                      <option value="Card">Card</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                    <ChevronDown className="sel-icon" size={16} />
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Transaction Date</label>
                <div className="input-with-icon-right">
                  <input type="text" value={newTransaction.transactionDate} onChange={e => setNewTransaction({...newTransaction, transactionDate: e.target.value})} placeholder="DD-MM-YYYY HH:MM AM/PM" />
                  <Calendar size={16} className="i-icon" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Notes/ Transaction Details</label>
                <textarea value={newTransaction.notes} onChange={e => setNewTransaction({...newTransaction, notes: e.target.value})} placeholder="Enter notes" rows="5"></textarea>
              </div>
            </div>
            <div className="drawer-footer add-footer">
              <button className="btn-cancel-drawer" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn-create" onClick={handleAddTransaction}>Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Opening Balance Modal */}
      {showBalanceModal && (
        <div className="modal-overlay">
          <div className="modal-content balance-modal" style={{ width: '400px', maxWidth: '90%', background: '#fff', borderRadius: '16px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.2)' }}>
            <div className="modal-header" style={{ padding: '24px 24px 16px', borderBottom: '1px solid #f1f5f9' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>Set Opening Balance</h2>
              <button className="modal-close" onClick={() => setShowBalanceModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body" style={{ padding: '24px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Amount (₹)</label>
                <input 
                  type="number" 
                  value={tempBalance} 
                  onChange={(e) => setTempBalance(e.target.value)} 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px', outline: 'none', fontWeight: '600', color: '#0f172a', transition: 'border-color 0.2s' }}
                  autoFocus
                />
              </div>
            </div>
            <div className="modal-footer" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'center', gap: '12px', borderTop: 'none', background: '#f8fafc' }}>
              <button className="btn-cancel" onClick={() => setShowBalanceModal(false)} style={{ padding: '10px 24px', borderRadius: '10px', background: '#fff', border: '1px solid #e2e8f0', color: '#0f172a', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button className="btn-download" onClick={() => {
                setOpeningBalance(Number(tempBalance));
                setShowBalanceModal(false);
              }} style={{ padding: '10px 24px', borderRadius: '10px', background: '#8b5cf6', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Save Balance</button>
            </div>
          </div>
        </div>
      )}
      {/* New Bank Deposit Drawer */}
      {showDepositModal && (
        <div className="filter-drawer-overlay">
          <div className="filter-drawer add-transaction-drawer">
            <div className="drawer-header">
              <h2>New Bank Deposit</h2>
              <button className="drawer-close" onClick={() => setShowDepositModal(false)}><X size={20} /></button>
            </div>
            <div className="drawer-body">
              <div className="form-group">
                <label>Amount (₹)<span className="req">*</span></label>
                <input 
                  type="number" 
                  value={newBankTransaction.amount} 
                  onChange={e => setNewBankTransaction({...newBankTransaction, amount: e.target.value})} 
                  placeholder="Enter amount" 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px' }}
                />
              </div>

              <div className="form-group">
                <label>Deposit Bank<span className="req">*</span></label>
                <div className="select-wrapper">
                  <select value={newBankTransaction.bankName} onChange={e => setNewBankTransaction({...newBankTransaction, bankName: e.target.value})}>
                    <option value="" disabled>Select or create a bank</option>
                    <option value="HDFC">HDFC Bank</option>
                    <option value="SBI">SBI Bank</option>
                    <option value="ICICI">ICICI Bank</option>
                    <option value="Axis">Axis Bank</option>
                  </select>
                  <ChevronDown className="sel-icon" size={16} />
                </div>
              </div>

              <div className="form-group">
                <label>Date<span className="req">*</span></label>
                <div className="input-with-icon-right">
                  <input type="text" value={newBankTransaction.date} onChange={e => setNewBankTransaction({...newBankTransaction, date: e.target.value})} placeholder="DD-MM-YYYY" />
                  <Calendar size={16} className="i-icon" />
                </div>
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea value={newBankTransaction.notes} onChange={e => setNewBankTransaction({...newBankTransaction, notes: e.target.value})} placeholder="Optional notes" rows="4"></textarea>
              </div>
            </div>
            <div className="drawer-footer add-footer">
              <button className="btn-cancel-drawer" onClick={() => setShowDepositModal(false)}>Cancel</button>
              <button className="btn-create" onClick={() => handleAddBankTransaction('deposit')} style={{ background: '#10b981' }}>Create</button>
            </div>
          </div>
        </div>
      )}

      {/* New Withdrawals Drawer */}
      {showDrawingModal && (
        <div className="filter-drawer-overlay">
          <div className="filter-drawer add-transaction-drawer">
            <div className="drawer-header">
              <h2>New Withdrawals</h2>
              <button className="drawer-close" onClick={() => setShowDrawingModal(false)}><X size={20} /></button>
            </div>
            <div className="drawer-body">
              <div className="form-group">
                <label>Amount (₹)<span className="req">*</span></label>
                <input 
                  type="number" 
                  value={newBankTransaction.amount} 
                  onChange={e => setNewBankTransaction({...newBankTransaction, amount: e.target.value})} 
                  placeholder="Enter amount" 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px' }}
                />
              </div>

              <div className="form-group">
                <label>Payment method</label>
                <div className="payment-method-toggle" style={{ display: 'flex', gap: '10px' }}>
                  <div 
                    className={`pm-option ${newBankTransaction.paymentMethod === 'Cash' ? 'active' : ''}`}
                    onClick={() => setNewBankTransaction({...newBankTransaction, paymentMethod: 'Cash'})}
                    style={{ flex: 1, padding: '16px', border: `1px solid ${newBankTransaction.paymentMethod === 'Cash' ? '#10b981' : '#e5e7eb'}`, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: newBankTransaction.paymentMethod === 'Cash' ? '#f0fdf4' : '#fff' }}
                  >
                    <Banknote size={18} color={newBankTransaction.paymentMethod === 'Cash' ? '#10b981' : '#475569'} />
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>Cash</span>
                  </div>
                  <div 
                    className={`pm-option ${newBankTransaction.paymentMethod === 'Bank' ? 'active' : ''}`}
                    onClick={() => setNewBankTransaction({...newBankTransaction, paymentMethod: 'Bank'})}
                    style={{ flex: 1, padding: '16px', border: `1px solid ${newBankTransaction.paymentMethod === 'Bank' ? '#10b981' : '#e5e7eb'}`, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: newBankTransaction.paymentMethod === 'Bank' ? '#f0fdf4' : '#fff' }}
                  >
                    <Landmark size={18} color={newBankTransaction.paymentMethod === 'Bank' ? '#10b981' : '#475569'} />
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>Bank</span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Date<span className="req">*</span></label>
                <div className="input-with-icon-right">
                  <input type="text" value={newBankTransaction.date} onChange={e => setNewBankTransaction({...newBankTransaction, date: e.target.value})} placeholder="DD-MM-YYYY" />
                  <Calendar size={16} className="i-icon" />
                </div>
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea value={newBankTransaction.notes} onChange={e => setNewBankTransaction({...newBankTransaction, notes: e.target.value})} placeholder="Optional notes" rows="4"></textarea>
              </div>

              <div className="form-group expense-toggle" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="checkbox" 
                  id="isExpenseToggle"
                  checked={newBankTransaction.isExpense} 
                  onChange={e => setNewBankTransaction({...newBankTransaction, isExpense: e.target.checked})} 
                  style={{ width: '16px', height: '16px', accentColor: '#10b981' }}
                />
                <label htmlFor="isExpenseToggle" style={{ fontSize: '14px', color: '#475569', cursor: 'pointer', userSelect: 'none' }}>Consider this withdrawal as an expense</label>
              </div>
            </div>
            <div className="drawer-footer add-footer">
              <button className="btn-cancel-drawer" onClick={() => setShowDrawingModal(false)}>Cancel</button>
              <button className="btn-create" onClick={() => handleAddBankTransaction('drawing')} style={{ background: '#10b981' }}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
