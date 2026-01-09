/**
 * Theme Selector Component
 * 
 * Allows users to switch between light and dark themes.
 * Theme changes are dispatched to the shared Redux store,
 * causing ALL apps to update their theme immediately.
 * 
 * This is a perfect example of cross-app state synchronization!
 */

import React from 'react';
import {
  useAppSelector,
  useAppDispatch,
  setTheme,
  setThemeWithSource,
} from '@shared/store';
import type { ThemeMode } from '@shared/types';

const ThemeSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);

  /**
   * Handle theme change
   * Dispatches setTheme action to shared Redux store
   * All apps will receive this update and re-render!
   */
  const handleThemeChange = (mode: ThemeMode) => {
    console.log(`[app2/ThemeSelector] 🎨 Changing theme to ${mode}...`);
    
    // Use setThemeWithSource to track which app made the change
    dispatch(
      setThemeWithSource({
        mode,
        source: 'app2',
      })
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
        Theme Settings
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Select your preferred theme. Changes apply instantly to all apps!
      </p>

      {/* Theme Options */}
      <div className="grid grid-cols-2 gap-4">
        {/* Light Theme */}
        <button
          onClick={() => handleThemeChange('light')}
          className={`
            relative p-4 rounded-xl border-2 transition-all duration-200
            ${theme.mode === 'light'
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }
          `}
        >
          {/* Selection Indicator */}
          {theme.mode === 'light' && (
            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}

          {/* Theme Preview */}
          <div className="w-full h-16 rounded-lg bg-gradient-to-br from-gray-100 to-white border border-gray-200 mb-3 flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>

          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Light Mode
          </span>
        </button>

        {/* Dark Theme */}
        <button
          onClick={() => handleThemeChange('dark')}
          className={`
            relative p-4 rounded-xl border-2 transition-all duration-200
            ${theme.mode === 'dark'
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }
          `}
        >
          {/* Selection Indicator */}
          {theme.mode === 'dark' && (
            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}

          {/* Theme Preview */}
          <div className="w-full h-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 mb-3 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>

          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Dark Mode
          </span>
        </button>
      </div>

      {/* Current Theme Info */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Current Theme:</span>
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${theme.mode === 'dark'
              ? 'bg-gray-700 text-gray-200'
              : 'bg-yellow-100 text-yellow-800'
            }
          `}>
            {theme.mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </span>
        </div>
      </div>

      {/* Explanation */}
      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Theme is stored in Redux and persisted to localStorage.
        When you change the theme, the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">setTheme</code> action
        is dispatched, and the Shell app applies the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">dark</code> class
        to the document element, enabling Tailwind's dark mode.
      </p>
    </div>
  );
};

export default ThemeSelector;

