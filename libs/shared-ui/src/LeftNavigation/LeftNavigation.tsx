/**
 * Left Navigation Component
 * 
 * Shared sidebar navigation component for all micro-frontend apps.
 * Features:
 * - Navigation links to /app1 and /app2
 * - Active route highlighting
 * - User role-based menu items (from Redux state)
 * - Collapsible sidebar
 * 
 * This component reads from the shared Redux store to:
 * - Highlight the current app/route
 * - Show/hide menu items based on user role
 */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useAppSelector,
  useAppDispatch,
  toggleSidebar,
} from '@shared/store';
import type { LeftNavigationProps, NavItem, UserRole } from '@shared/types';

// Navigation menu items configuration
const menuItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'home',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/app1',
    icon: 'dashboard',
    requiredRole: ['user', 'admin'],
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/app2',
    icon: 'settings',
    requiredRole: ['user', 'admin'],
  },
  {
    id: 'admin',
    label: 'Admin Panel',
    path: '/admin',
    icon: 'admin',
    requiredRole: ['admin'],
  },
];

// Icon components for menu items
const icons: Record<string, React.ReactNode> = {
  home: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  dashboard: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  settings: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  admin: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
};

/**
 * Check if user has required role for menu item
 */
const hasRequiredRole = (item: NavItem, userRole: UserRole): boolean => {
  if (!item.requiredRole) return true;
  return item.requiredRole.includes(userRole);
};

export const LeftNavigation: React.FC<LeftNavigationProps> = ({
  className = '',
  collapsed: controlledCollapsed,
  onToggleCollapse,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const user = useAppSelector((state) => state.user);
  const navigation = useAppSelector((state) => state.navigation);
  
  // Use controlled collapsed state if provided, otherwise use Redux state
  const isCollapsed = controlledCollapsed ?? navigation.isSidebarCollapsed;

  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      dispatch(toggleSidebar());
    }
  };

  const handleNavigate = (path: string) => {
    console.log('[shared-ui/LeftNavigation] 🧭 Navigating to:', path);
    navigate(path);
  };

  const isActive = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Filter menu items based on user role
  const visibleItems = menuItems.filter((item) => hasRequiredRole(item, user.role));

  return (
    <aside
      className={`
        ${isCollapsed ? 'w-20' : 'w-64'}
        h-[calc(100vh-4rem)]
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-700
        flex flex-col
        transition-all duration-300 ease-in-out
        ${className}
      `}
    >
      {/* Toggle Button */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={handleToggleCollapse}
          className="
            w-full p-2 rounded-lg
            bg-gray-100 dark:bg-gray-800
            hover:bg-gray-200 dark:hover:bg-gray-700
            text-gray-600 dark:text-gray-300
            transition-colors duration-200
            flex items-center justify-center
          "
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {visibleItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.path)}
              className={`
                w-full p-3 rounded-xl
                flex items-center gap-3
                transition-all duration-200
                group
                ${
                  active
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
              title={isCollapsed ? item.label : undefined}
            >
              <span className={`flex-shrink-0 ${active ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary-500'}`}>
                {icons[item.icon || 'home']}
              </span>
              {!isCollapsed && (
                <span className="font-medium truncate animate-fade-in">
                  {item.label}
                </span>
              )}
              {active && !isCollapsed && (
                <span className="ml-auto">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Quick Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
          <div className="p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email || 'No email'}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 capitalize">
                {user.role}
              </span>
              {user.isAuthenticated && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                  Online
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default LeftNavigation;

