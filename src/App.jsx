import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SidebarProvider } from './context/SidebarContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layout/MainLayout';
import PagePlaceholder from './pages/PagePlaceholder';
import NotFound from './pages/NotFound';

// Lazy loading pages
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DrDashboard = lazy(() => import('./pages/DrDashboard'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Patients = lazy(() => import('./pages/Patients'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Treatments = lazy(() => import('./pages/Treatments'));
const Billing = lazy(() => import('./pages/Billing'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Pharmacy = lazy(() => import('./pages/Pharmacy'));
const ConsentForms = lazy(() => import('./pages/ConsentForms'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const Settings = lazy(() => import('./pages/Settings'));
const ProfileSettings = lazy(() => import('./pages/ProfileSettings'));

// Loading Fallback Component
const GlobalLoader = () => (
  <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc' }}>
    <div style={{ width: '40px', height: '40px', border: '4px solid #e0e7ff', borderTop: '4px solid #0ea5e9', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Suspense fallback={<GlobalLoader />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes inside MainLayout */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Navigate to="/dashboard" replace />} />
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
              </Route>

              {/* Catch all 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
