import React from 'react';
import { Download, Plus, FileText } from 'lucide-react';
import './Billing.css';

const Billing = () => {
  const invoices = [
    { id: 'INV-001', patient: 'Alice Johnson', date: '2024-04-20', amount: '$450.00', status: 'Paid' },
    { id: 'INV-002', patient: 'Bob Smith', date: '2024-04-18', amount: '$1,200.00', status: 'Partially Paid' },
    { id: 'INV-003', patient: 'Charlie Davis', date: '2024-04-15', amount: '$150.00', status: 'Unpaid' },
    { id: 'INV-004', patient: 'Diana Prince', date: '2024-04-12', amount: '$300.00', status: 'Paid' },
  ];

  return (
    <div className="billing-page">
      <div className="page-header">
        <div className="header-text">
          <h1>Billing & Invoices</h1>
          <p>Track payments and generate invoices for treatments.</p>
        </div>
        <button className="add-btn">
          <Plus size={20} />
          <span>Create New Invoice</span>
        </button>
      </div>

      <div className="billing-summary">
        <div className="summary-card">
          <span className="summary-label">Total Revenue</span>
          <span className="summary-value">$45,280.00</span>
          <span className="summary-change positive">+12% from last month</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Pending Payments</span>
          <span className="summary-value">$3,150.00</span>
          <span className="summary-change negative">8 invoices overdue</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Invoices Sent</span>
          <span className="summary-value">124</span>
          <span className="summary-change positive">+24 this week</span>
        </div>
      </div>

      <div className="invoices-section">
        <h3>Recent Invoices</h3>
        <div className="invoices-grid">
          {invoices.map((inv) => (
            <div key={inv.id} className="invoice-card">
              <div className="inv-header">
                <div className="inv-icon">
                  <FileText size={24} />
                </div>
                <div className="inv-status-tag">
                  <span className={`status-pill ${inv.status.replace(' ', '-').toLowerCase()}`}>
                    {inv.status}
                  </span>
                </div>
              </div>
              <div className="inv-body">
                <span className="inv-id">{inv.id}</span>
                <h4 className="inv-patient">{inv.patient}</h4>
                <p className="inv-date">{inv.date}</p>
              </div>
              <div className="inv-footer">
                <span className="inv-amount">{inv.amount}</span>
                <button className="download-btn">
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Billing;
