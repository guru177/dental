import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutGrid, 
  TrendingUp, 
  Calendar, 
  User, 
  FileText, 
  ArrowLeftRight, 
  Users, 
  Pill, 
  Stethoscope, 
  ShoppingBag, 
  Warehouse, 
  FileCheck, 
  Megaphone,
  PieChart,
  Settings,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';
import './Sidebar.css';

const Sidebar = () => {
  const { isExpanded } = useSidebar();

  const menuItems = [
    { icon: <LayoutGrid size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Calendar size={20} />, label: 'Appointments', path: '/appointments' },
    { icon: <User size={20} />, label: 'Dr Dashboard', path: '/dr-dashboard' },
    { icon: <FileText size={20} />, label: 'Invoices', path: '/billing' },
    { icon: <ArrowLeftRight size={20} />, label: 'Transactions', path: '/transactions' },
    { icon: <Users size={20} />, label: 'Patients', path: '/patients' },
    { icon: <Pill size={20} />, label: 'Pharmacy', path: '/pharmacy' },
    { icon: <Warehouse size={20} />, label: 'Inventory', path: '/inventory' },
    { icon: <FileCheck size={20} />, label: 'Consent Forms', path: '/consent' },
  ];

  const bottomItems = [
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    { icon: <HelpCircle size={20} />, label: 'Help Center', path: '/help' },
  ];

  return (
    <aside className={`sidebar-exact ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-logo-exact">
        <div className="logo-icon-box">
          <Stethoscope size={24} color="#6366f1" />
        </div>
        {isExpanded && <span className="brand-name-exact">dentobees</span>}
      </div>
      
      <nav className="sidebar-nav-exact">
        {menuItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path} 
            className={({ isActive }) => isActive ? 'nav-item-exact active' : 'nav-item-exact'}
          >
            <div className="item-icon-exact">{item.icon}</div>
            {isExpanded && (
              <>
                <span className="item-label-exact">{item.label}</span>
                {item.hasSub && <ChevronDown size={14} className="sub-arrow" />}
              </>
            )}
          </NavLink>
        ))}
        
        <div className="nav-divider"></div>
        
        {bottomItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path} 
            className={({ isActive }) => isActive ? 'nav-item-exact active' : 'nav-item-exact'}
          >
            <div className="item-icon-exact">{item.icon}</div>
            {isExpanded && <span className="item-label-exact">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
