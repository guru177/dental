import { Menu, ChevronDown } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';
import './Header.css';

const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="main-header">
      <div className="header-left">
        <span className="brand-text">Dentobees</span>
        <button className="menu-toggle" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
      </div>
      
      <div className="header-right">
        <div className="user-profile-widget">
          <div className="user-avatar-sm">
            <img src="https://ui-avatars.com/api/?name=Asha&background=00ca99&color=fff" alt="User" />
          </div>
          <div className="user-info-text">
            <span className="user-name-text">asha</span>
            <span className="user-clinic-text">kollam</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
};

export default Header;
