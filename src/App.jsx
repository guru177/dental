import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import DrDashboard from './pages/DrDashboard';
import Transactions from './pages/Transactions';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Treatments from './pages/Treatments';
import Billing from './pages/Billing';
import Inventory from './pages/Inventory';
import Pharmacy from './pages/Pharmacy';
import ConsentForms from './pages/ConsentForms';
import HelpCenter from './pages/HelpCenter';
import Settings from './pages/Settings';
import ProfileSettings from './pages/ProfileSettings';
import Login from './pages/Login';
import PagePlaceholder from './pages/PagePlaceholder';
import { SidebarProvider } from './context/SidebarContext';

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="dr-dashboard" element={<DrDashboard />} />
            <Route path="billing" element={<Billing />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="patients" element={<Patients />} />
            <Route path="pharmacy" element={<Pharmacy />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="consent" element={<ConsentForms />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
            <Route path="help" element={<HelpCenter />} />
            <Route path="treatments" element={<Treatments />} />
          </Route>
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
