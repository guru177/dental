import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8fafc',
      color: '#0f172a'
    }}>
      <AlertTriangle size={64} color="#0ea5e9" style={{ marginBottom: '24px' }} />
      <h1 style={{ fontSize: '48px', fontWeight: 800, margin: '0 0 16px 0' }}>404</h1>
      <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '32px' }}>Oops! The page you're looking for doesn't exist.</p>
      <button 
        onClick={() => navigate('/dashboard')}
        style={{
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(14, 165, 233, 0.2)'
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
