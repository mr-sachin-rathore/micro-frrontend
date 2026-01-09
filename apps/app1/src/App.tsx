/**
 * App1 - Dashboard Application
 * 
 * This is a REMOTE micro-frontend that is loaded by the shell host.
 * 
 * Features:
 * - Dashboard with user stats cards
 * - Button to update user profile (dispatches to shared Redux)
 * - Display current theme from Redux
 * - Update navigation breadcrumbs on mount
 * 
 * REDUX STATE FLOW:
 * ================
 * 1. This component reads user/theme state from the shared Redux store
 * 2. When "Update Profile" is clicked, it dispatches updateUser action
 * 3. The shared store updates, and ALL apps (including Shell's Header) re-render
 * 4. This demonstrates cross-app state synchronization!
 */

import React, { useEffect } from 'react';
import {
  useAppSelector,
  useAppDispatch,
  navigateTo,
  updateUser,
} from '@shared/store';
import Dashboard from './components/Dashboard';
import UserStatsCard from './components/UserStatsCard';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const theme = useAppSelector((state) => state.theme);

  /**
   * Update navigation state when this app mounts
   * This updates the breadcrumbs shown in the Header
   */
  useEffect(() => {
    console.log('[app1/App] 🚀 Dashboard app mounted');
    
    // Update navigation to show we're in App1
    dispatch(
      navigateTo({
        app: 'app1',
        breadcrumbs: [
          { label: 'Home', path: '/' },
          { label: 'Dashboard', path: '/app1' },
        ],
      })
    );
    
    return () => {
      console.log('[app1/App] 👋 Dashboard app unmounting');
    };
  }, [dispatch]);

  /**
   * Handle profile update
   * This dispatches an action to the SHARED Redux store
   * The Header (in shell) will immediately reflect this change!
   */
  const handleUpdateProfile = () => {
    const randomNames = ['Alex Johnson', 'Sam Williams', 'Jordan Lee', 'Taylor Brown', 'Morgan Davis'];
    const randomEmails = ['alex@example.com', 'sam@example.com', 'jordan@example.com', 'taylor@example.com', 'morgan@example.com'];
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    
    console.log('[app1/App] 📝 Updating user profile from Dashboard...');
    
    dispatch(
      updateUser({
        name: randomNames[randomIndex],
        email: randomEmails[randomIndex],
        avatar: `https://ui-avatars.com/api/?name=${randomNames[randomIndex].replace(' ', '+')}&background=0ea5e9&color=fff`,
      })
    );
  };

  /**
   * Handle role change
   * Demonstrates updating user role from App1
   */
  const handleChangeRole = (newRole: 'admin' | 'user') => {
    console.log(`[app1/App] 🎭 Changing role to ${newRole} from Dashboard...`);
    dispatch(updateUser({ role: newRole }));
  };

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome back, <span className="font-medium text-primary-600 dark:text-primary-400">{user.name}</span>!
          This is App1 (Remote Micro-Frontend on port 3001).
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <UserStatsCard
          title="Total Users"
          value="2,543"
          trend="up"
          trendValue="+12.5%"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <UserStatsCard
          title="Active Sessions"
          value="1,234"
          trend="up"
          trendValue="+8.2%"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          }
        />
        <UserStatsCard
          title="Revenue"
          value="$45,231"
          trend="up"
          trendValue="+23.1%"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <UserStatsCard
          title="Current Theme"
          value={theme.mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
          trend="neutral"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          }
        />
      </div>

      {/* Main Dashboard Content */}
      <Dashboard />

      {/* Action Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Update Profile Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Update Profile (Redux Demo)
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Click the button below to update your profile. This dispatches an action to the
            <span className="font-medium text-primary-600 dark:text-primary-400"> shared Redux store</span>.
            Watch the Header update instantly!
          </p>
          <button
            onClick={handleUpdateProfile}
            className="
              w-full px-6 py-3 rounded-xl
              bg-gradient-to-r from-primary-500 to-primary-600
              text-white font-medium
              shadow-lg shadow-primary-500/30
              hover:shadow-xl hover:shadow-primary-500/40
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            "
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Randomize Profile
            </span>
          </button>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center">
            Current: {user.name} ({user.email})
          </p>
        </div>

        {/* Role Switcher Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Change Role
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Switch between Admin and User roles. The navigation menu will update based on your role.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => handleChangeRole('admin')}
              className={`
                flex-1 px-4 py-3 rounded-xl font-medium
                transition-all duration-200
                ${user.role === 'admin'
                  ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
              `}
            >
              👑 Admin
            </button>
            <button
              onClick={() => handleChangeRole('user')}
              className={`
                flex-1 px-4 py-3 rounded-xl font-medium
                transition-all duration-200
                ${user.role === 'user'
                  ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
              `}
            >
              👤 User
            </button>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center">
            Current role: <span className="font-medium capitalize">{user.role}</span>
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mt-8 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-6 border border-primary-100 dark:border-primary-800">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-800 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-primary-600 dark:text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              How State Sharing Works
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              This app (App1) is a separate React application loaded via Module Federation.
              It shares the Redux store with the Shell and App2 through singleton shared dependencies.
              When you update your profile here, the action is dispatched to the shared store,
              and all apps receive the update through React-Redux's subscription mechanism.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

