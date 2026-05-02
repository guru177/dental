import React from 'react';
import './UI.css';

export const Button = ({ children, variant = 'primary', icon, onClick, className = '', disabled, type = 'button' }) => {
  const baseClass = 'ui-btn';
  const variantClass = `ui-btn-${variant}`;
  
  return (
    <button 
      type={type} 
      className={`${baseClass} ${variantClass} ${className}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="ui-btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export const Badge = ({ children, status = 'default', className = '' }) => {
  return (
    <span className={`ui-badge ui-badge-${status.toLowerCase().replace(' ', '-')} ${className}`}>
      {children}
    </span>
  );
};
