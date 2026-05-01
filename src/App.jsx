import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Treatments from './pages/Treatments';
import Billing from './pages/Billing';
import Inventory from './pages/Inventory';
import PagePlaceholder from './pages/PagePlaceholder';
import { SidebarProvider } from './context/SidebarContext';

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analytics" element={<PagePlaceholder title="Analytics" />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="dr-dashboard" element={<PagePlaceholder title="Dr Dashboard" />} />
            <Route path="billing" element={<Billing />} />
            <Route path="transactions" element={<PagePlaceholder title="Transactions" />} />
            <Route path="patients" element={<Patients />} />
            <Route path="pharmacy" element={<PagePlaceholder title="Pharmacy" />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="consent" element={<PagePlaceholder title="Consent Forms" />} />
            <Route path="reports" element={<PagePlaceholder title="Reports" />} />
            <Route path="settings" element={<PagePlaceholder title="Settings" />} />
            <Route path="help" element={<PagePlaceholder title="Help Center" />} />
            <Route path="treatments" element={<Treatments />} />
          </Route>
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
