import React from 'react';

const PagePlaceholder = ({ title }) => {
  return (
    <div className="page-placeholder" style={{ padding: '24px' }}>
      <h1>{title}</h1>
      <p>This is the {title} page. Content is coming soon.</p>
      <div style={{ 
        marginTop: '32px', 
        padding: '60px', 
        border: '2px dashed var(--border)', 
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
        color: 'var(--text-muted)'
      }}>
        🛠️ Module Under Construction
      </div>
    </div>
  );
};

export default PagePlaceholder;
