import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Bell, Menu, User, LogOut, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useCollege } from '../contexts/CollegeContext';

const Navbar = ({ onToggleSidebar, showSidebarToggle, title, className }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useCollege();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className={`navbar ${className}`}>
      <div className="flex items-center space-x-4">
        {showSidebarToggle && (
          <button
            onClick={onToggleSidebar}
            className="btn-ghost p-2"
          >
            <Menu size={20} />
          </button>
        )}
        <div className="flex items-center space-x-3">
          {currentUser?.college && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-primary/10 rounded-full">
              <GraduationCap size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">{currentUser.college.code}</span>
            </div>
          )}
          <h1 className="text-xl font-bold text-primary">{title}</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="btn-ghost p-2 relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>

        <ThemeToggle />

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="btn-ghost p-2 flex items-center space-x-2"
          >
            <User size={20} />
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium">{currentUser?.name || 'User'}</div>
              <div className="text-xs text-text-secondary">{currentUser?.college?.name}</div>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
              <div className="py-2">
                <button className="w-full text-left px-4 py-2 hover:bg-zinc-100 transition-colors">
                  Profile Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-zinc-100 transition-colors flex items-center space-x-2 text-error"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// PropTypes for type-checking in JavaScript
Navbar.propTypes = {
  onToggleSidebar: PropTypes.func,
  showSidebarToggle: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
};

// Default props for the component
Navbar.defaultProps = {
  onToggleSidebar: () => {}, // Default to a no-op function to prevent errors
  showSidebarToggle: false,
  title: "SkillSphere",
  className: '',
};

export default Navbar;