import React from 'react';
import { Package, AlertTriangle } from 'lucide-react';

const Inventory = () => {
  const items = [
    { id: 1, name: 'Dental Gloves (M)', quantity: 50, threshold: 100, status: 'Low Stock' },
    { id: 2, name: 'Face Masks', quantity: 200, threshold: 50, status: 'In Stock' },
    { id: 3, name: 'Dental Composite', quantity: 15, threshold: 10, status: 'In Stock' },
    { id: 4, name: 'Anesthesia Vials', quantity: 5, threshold: 20, status: 'Critical' },
  ];

  return (
    <div className="inventory-page">
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h1>Inventory Management</h1>
        <p>Monitor clinic supplies and equipment.</p>
      </div>

      <div className="inventory-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {items.map(item => (
          <div key={item.id} className="stat-card" style={{ 
            backgroundColor: 'var(--surface)', 
            padding: '20px', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Package size={24} color="var(--primary)" />
              {item.quantity < item.threshold && <AlertTriangle size={20} color="#ef4444" />}
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px 0' }}>{item.name}</h4>
              <span style={{ fontSize: '24px', fontWeight: '700' }}>{item.quantity}</span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '8px' }}>units</span>
            </div>
            <div style={{ 
              fontSize: '11px', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              color: item.status === 'In Stock' ? '#166534' : '#991b1b',
              backgroundColor: item.status === 'In Stock' ? '#dcfce7' : '#fee2e2',
              padding: '4px 8px',
              borderRadius: '4px',
              width: 'fit-content'
            }}>
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
