import React from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { label: 'Total Patients', value: '1,284', icon: <Users />, color: '#0d9488' },
    { label: 'Today\'s Appointments', value: '12', icon: <Calendar />, color: '#0ea5e9' },
    { label: 'Monthly Revenue', value: '$12,450', icon: <DollarSign />, color: '#f59e0b' },
    { label: 'Treatment Success', value: '98%', icon: <TrendingUp />, color: '#10b981' },
  ];

  const recentAppointments = [
    { id: 1, patient: 'John Doe', time: '10:00 AM', treatment: 'Root Canal', status: 'Confirmed' },
    { id: 2, patient: 'Jane Smith', time: '11:30 AM', treatment: 'Teeth Whitening', status: 'Pending' },
    { id: 3, patient: 'Robert Brown', time: '02:00 PM', treatment: 'Checkup', status: 'Confirmed' },
    { id: 4, patient: 'Emily White', time: '03:30 PM', treatment: 'Scaling', status: 'Cancelled' },
  ];

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>Dashboard Overview</h1>
        <p>Welcome back, Dr. Smith. Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Appointments</h3>
            <button className="text-btn">View All</button>
          </div>
          <div className="appointments-list">
            {recentAppointments.map((app) => (
              <div key={app.id} className="appointment-item">
                <div className="app-time">{app.time}</div>
                <div className="app-info">
                  <span className="app-patient">{app.patient}</span>
                  <span className="app-treatment">{app.treatment}</span>
                </div>
                <div className={`app-status ${app.status.toLowerCase()}`}>
                  {app.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Treatment Distribution</h3>
          </div>
          <div className="chart-placeholder">
            {/* We'll add a real chart later */}
            <div className="placeholder-content">
              <TrendingUp size={48} color="var(--border)" />
              <span>Revenue Chart Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
