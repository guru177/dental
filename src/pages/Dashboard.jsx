import React from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Clock,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { label: 'Total Patients', value: '3,284', icon: <Users size={24} />, change: '+12% this month', positive: true },
    { label: 'Today\'s Appointments', value: '24', icon: <Calendar size={24} />, change: '8 remaining today', positive: true },
    { label: 'Monthly Revenue', value: '₹142,450', icon: <DollarSign size={24} />, change: '+18% vs last month', positive: true },
    { label: 'Treatment Success', value: '98.5%', icon: <TrendingUp size={24} />, change: 'Consistently high', positive: true },
  ];

  const revenueData = [
    { name: 'Mon', revenue: 14000 },
    { name: 'Tue', revenue: 23000 },
    { name: 'Wed', revenue: 19000 },
    { name: 'Thu', revenue: 27800 },
    { name: 'Fri', revenue: 38900 },
    { name: 'Sat', revenue: 43900 },
    { name: 'Sun', revenue: 34900 },
  ];

  const treatmentData = [
    { name: 'Checkups', count: 85 },
    { name: 'Whitening', count: 45 },
    { name: 'Root Canal', count: 30 },
    { name: 'Extraction', count: 20 },
    { name: 'Implants', count: 15 },
  ];

  const recentAppointments = [
    { id: 1, patient: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=e2e8f0&color=334155', time: '09:00 AM', treatment: 'Root Canal', doctor: 'Dr. Smith', status: 'Confirmed' },
    { id: 2, patient: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=e2e8f0&color=334155', time: '10:30 AM', treatment: 'Teeth Whitening', doctor: 'Dr. Adams', status: 'In Progress' },
    { id: 3, patient: 'Robert Brown', avatar: 'https://ui-avatars.com/api/?name=Robert+Brown&background=e2e8f0&color=334155', time: '11:15 AM', treatment: 'General Checkup', doctor: 'Dr. Smith', status: 'Completed' },
    { id: 4, patient: 'Emily White', avatar: 'https://ui-avatars.com/api/?name=Emily+White&background=e2e8f0&color=334155', time: '02:00 PM', treatment: 'Scaling', doctor: 'Dr. Adams', status: 'Cancelled' },
    { id: 5, patient: 'Michael Clark', avatar: 'https://ui-avatars.com/api/?name=Michael+Clark&background=e2e8f0&color=334155', time: '03:30 PM', treatment: 'Extraction', doctor: 'Dr. Smith', status: 'Confirmed' },
    { id: 6, patient: 'Sarah Davis', avatar: 'https://ui-avatars.com/api/?name=Sarah+Davis&background=e2e8f0&color=334155', time: '04:15 PM', treatment: 'Crown Fitting', doctor: 'Dr. Adams', status: 'Pending' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Confirmed': return <span className="dash-badge badge-confirmed">Confirmed</span>;
      case 'In Progress': return <span className="dash-badge badge-progress">In Progress</span>;
      case 'Completed': return <span className="dash-badge badge-completed">Completed</span>;
      case 'Cancelled': return <span className="dash-badge badge-cancelled">Cancelled</span>;
      case 'Pending': return <span className="dash-badge badge-pending">Pending</span>;
      default: return <span className="dash-badge">{status}</span>;
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Dashboard Overview</h1>
          <p className="dash-subtitle">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="dash-header-actions">
          <button className="btn-outline-action"><Calendar size={16} /> Today: {new Date().toLocaleDateString()}</button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="dash-stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="dash-stat-card">
            <div className="stat-card-top">
              <div className="stat-info">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
              </div>
              <div className="stat-icon-wrapper">
                {stat.icon}
              </div>
            </div>
            <div className="stat-card-bottom">
              <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className="dash-charts-row">
        <div className="dash-chart-card flex-2">
          <div className="chart-header">
            <h3>Revenue Overview</h3>
            <button className="btn-icon-dots"><MoreVertical size={16} /></button>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-chart-card flex-1">
          <div className="chart-header">
            <h3>Treatment Distribution</h3>
            <button className="btn-icon-dots"><MoreVertical size={16} /></button>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={treatmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* APPOINTMENTS TABLE */}
      <div className="dash-table-card mt-24">
        <div className="chart-header">
          <h3>Today's Appointments</h3>
          <button className="btn-text-action">View All <ChevronRight size={16} /></button>
        </div>
        <div className="table-responsive">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Time</th>
                <th>Treatment</th>
                <th>Doctor</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map((app) => (
                <tr key={app.id}>
                  <td>
                    <div className="table-patient-cell">
                      <img src={app.avatar} alt={app.patient} className="table-avatar" />
                      <span className="font-semibold">{app.patient}</span>
                    </div>
                  </td>
                  <td>
                    <div className="table-time-cell">
                      <Clock size={14} color="#64748b" />
                      <span>{app.time}</span>
                    </div>
                  </td>
                  <td>{app.treatment}</td>
                  <td>{app.doctor}</td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>
                    <button className="btn-icon-dots"><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
