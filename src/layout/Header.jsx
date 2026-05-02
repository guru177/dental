import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';
import './Header.css';

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
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
              <img src="https://img.freepik.com/premium-vector/doctor-profile-icon-medical-physician-logo-concept_123447-1282.jpg" alt="User" />
            </div>
            <div className="user-info-text">
              <span className="user-name-text">Guru</span>
              <span className="user-clinic-text">Admin</span>
            </div>
            <ChevronDown size={14} color="#94a3b8" className={`header-chevron ${dropdownOpen ? 'rotate' : ''}`} />
          </div>
          
          {dropdownOpen && (
            <div className="user-dropdown-menu">
              <div className="dropdown-header">Guru</div>
              <ul className="dropdown-list">
                <li className="dropdown-item" onClick={() => {
                  navigate('/profile-settings');
                  setDropdownOpen(false);
                }}>Profile Settings</li>
                <li className="dropdown-item" onClick={() => {
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
