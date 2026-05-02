import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="main-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
      </div>

      <div className="header-right">
        <div className="header-divider"></div>
        <div className="user-profile-widget" ref={dropdownRef}>
          <div className="user-profile-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="user-avatar-sm">
              <img src={user?.avatar || "https://img.freepik.com/premium-vector/doctor-profile-icon-medical-physician-logo-concept_123447-1282.jpg"} alt="User" />
            </div>
            <div className="user-info-text">
              <span className="user-name-text">{user?.name || 'Guest'}</span>
              <span className="user-clinic-text">{user?.role || 'User'}</span>
            </div>
            <ChevronDown size={14} color="#94a3b8" className={`header-chevron ${dropdownOpen ? 'rotate' : ''}`} />
          </div>
          
          {dropdownOpen && (
            <div className="user-dropdown-menu">
              <div className="dropdown-header">{user?.name || 'Guest'}</div>
              <ul className="dropdown-list">
                <li className="dropdown-item" onClick={() => {
                  navigate('/profile-settings');
                  setDropdownOpen(false);
                }}>Profile Settings</li>
                <li className="dropdown-item" onClick={() => {
                  logout();
                  navigate('/login');
                  setDropdownOpen(false);
                }}>Log Out</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
