/**
 * App2 - Settings Application
 * 
 * This is a REMOTE micro-frontend that is loaded by the shell host.
 * 
 * Features:
 * - User settings form (update name, email)
 * - Theme selector (light/dark - updates shared Redux)
 * - Save button dispatches to shared Redux store
 * - Display updated values from Redux state
 * 
 * REDUX STATE FLOW:
 * ================
 * 1. When theme is changed, dispatch setTheme action
 * 2. Shared Redux store updates theme.mode
 * 3. Shell app's useEffect detects change and updates document.documentElement
 * 4. All apps using Tailwind dark: variants update instantly!
 * 
 * This demonstrates real-time cross-app state synchronization.
 */

import React, { useEffect } from 'react';
import {
  useAppSelector,
  useAppDispatch,
  navigateTo,
} from '@shared/store';
import SettingsForm from './components/SettingsForm';
import ThemeSelector from './components/ThemeSelector';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const theme = useAppSelector((state) => state.theme);

  /**
   * Update navigation state when this app mounts
   */
  useEffect(() => {
    console.log('[app2/App] 🚀 Settings app mounted');
    
    dispatch(
      navigateTo({
        app: 'app2',
        breadcrumbs: [
          { label: 'Home', path: '/' },
          { label: 'Settings', path: '/app2' },
        ],
      })
    );
    
    return () => {
      console.log('[app2/App] 👋 Settings app unmounting');
    };
  }, [dispatch]);

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your account settings and preferences.
          This is App2 (Remote Micro-Frontend on port 3002).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Settings Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Settings */}
          <SettingsForm />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Theme Settings */}
          <ThemeSelector />

          {/* Current State Display */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Current Redux State
            </h2>
            
            <div className="space-y-4">
              {/* User Info */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">User State</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">ID:</span>
                    <span className="text-gray-900 dark:text-white font-mono text-xs">{user.id || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Name:</span>
                    <span className="text-gray-900 dark:text-white">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Email:</span>
                    <span className="text-gray-900 dark:text-white">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Role:</span>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 capitalize">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Theme Info */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Theme State</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Mode:</span>
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
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-2xl p-6 border border-accent-100 dark:border-accent-800">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-800 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-accent-600 dark:text-accent-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1 text-sm">
                  Try This!
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Update your name here, then navigate to App1 (Dashboard). 
                  Your changes will be reflected everywhere because all apps share the same Redux store!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Redux Flow Explanation */}
      <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          How Cross-App State Works
        </h2>
        
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: 1, title: 'Action Dispatched', desc: 'You change theme in App2', icon: '🎯' },
            { step: 2, title: 'Store Updates', desc: 'Shared Redux store receives action', icon: '📦' },
            { step: 3, title: 'State Changes', desc: 'theme.mode updates to new value', icon: '🔄' },
            { step: 4, title: 'All Apps Update', desc: 'Shell, App1, Header all re-render', icon: '✨' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center mx-auto mb-3 text-2xl">
                {item.icon}
              </div>
              <div className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-1">
                Step {item.step}
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

