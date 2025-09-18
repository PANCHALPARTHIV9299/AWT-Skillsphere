import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ items, collapsed, basePath, className }) => {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${className}`}>
      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={`${basePath}${item.path}`}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'active' : ''}`
            }
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && (
              <span className="ml-3 transition-all duration-200">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

// PropTypes for type-checking in JavaScript
Sidebar.propTypes = {
  /**
   * An array of navigation items to display in the sidebar.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  /**
   * Whether the sidebar is in a collapsed state.
   */
  collapsed: PropTypes.bool.isRequired,
  /**
   * The base path to prepend to each item's path.
   */
  basePath: PropTypes.string.isRequired,
  /**
   * Additional CSS classes to apply to the sidebar container.
   */
  className: PropTypes.string,
};

// Default props for the component
Sidebar.defaultProps = {
  className: '',
};

export default Sidebar;