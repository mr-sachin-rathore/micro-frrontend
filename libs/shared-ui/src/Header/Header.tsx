/**
 * Header Component
 * 
 * Shared header component displayed at the top of all micro-frontend apps.
 * Features:
 * - App logo/title
 * - User profile display (from Redux state)
 * - Theme toggle button
 * - Breadcrumb navigation
 * 
 * This component is rendered in the Shell app and shared across all routes.
 * It reads from the shared Redux store to display user info and theme state.
 */

import React from 'react';
import {
  useAppSelector,
  useAppDispatch,
  toggleTheme,
  logout,
} from '@shared/store';
import type { HeaderProps } from '@shared/types';

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const theme = useAppSelector((state) => state.theme);
  const navigation = useAppSelector((state) => state.navigation);

  const handleThemeToggle = () => {
    console.log('[shared-ui/Header] 🎨 Theme toggle clicked');
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    console.log('[shared-ui/Header] 🚪 Logout clicked');
    dispatch(logout());
  };

  return (
    <header
      className={`
        sticky top-0 z-50
        h-16 px-6
        bg-white dark:bg-gray-900
        border-b border-gray-200 dark:border-gray-700
        flex items-center justify-between
        shadow-sm
        transition-colors duration-200
        ${className}
      `}
    >
      {/* Left Section: Logo & Breadcrumbs */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            MicroFrontend
          </span>
        </div>

        {/* Breadcrumbs */}
        <nav className="hidden md:flex items-center gap-2 text-sm">
          {Array.isArray(navigation?.breadcrumbs) && navigation.breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb?.path ?? index}>
              {index > 0 && (
                <span className="text-gray-400 dark:text-gray-500">/</span>
              )}
              <span
                className={`
                  ${
                    index === navigation.breadcrumbs.length - 1
                      ? 'text-gray-900 dark:text-white font-medium'
                      : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer'
                  }
                `}
              >
                {crumb?.label ?? ''}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right Section: User & Theme */}
      <div className="flex items-center gap-4">
        {/* Current App Badge */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">Current:</span>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
            {navigation?.currentApp ?? 'shell'}
          </span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="
            p-2 rounded-lg
            bg-gray-100 dark:bg-gray-800
            hover:bg-gray-200 dark:hover:bg-gray-700
            text-gray-600 dark:text-gray-300
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500
          "
          title={`Switch to ${theme?.mode === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme?.mode === 'light' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          {user?.isAuthenticated ? (
            <>
              {/* Avatar */}
              <div className="relative">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user?.name ?? 'User'}
                    className="w-9 h-9 rounded-full border-2 border-primary-500"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-medium text-sm">
                    {(user?.name ?? 'G').charAt(0).toUpperCase()}
                  </div>
                )}
                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
              </div>

              {/* User Info */}
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.name ?? 'Guest'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user?.role ?? 'guest'}
                </p>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="
                  ml-2 p-2 rounded-lg
                  text-gray-500 dark:text-gray-400
                  hover:text-red-600 dark:hover:text-red-400
                  hover:bg-red-50 dark:hover:bg-red-900/20
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-red-500
                "
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </>
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Not logged in
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

