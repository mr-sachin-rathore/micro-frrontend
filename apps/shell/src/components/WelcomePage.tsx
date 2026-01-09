/**
 * Welcome Page Component
 * 
 * Landing page shown at the root route (/).
 * Provides navigation to remote apps and shows the current state.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@shared/store';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const theme = useAppSelector((state) => state.theme);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Welcome Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            MicroFrontend
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          A modern micro-frontend architecture with Module Federation and shared Redux state
        </p>
      </div>

      {/* Current State Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Current Redux State
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {/* User State */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">User</h3>
            <div className="space-y-1">
              <p className="text-gray-900 dark:text-white">
                <span className="text-gray-500 dark:text-gray-400">Name:</span> {user.name}
              </p>
              <p className="text-gray-900 dark:text-white">
                <span className="text-gray-500 dark:text-gray-400">Email:</span> {user.email}
              </p>
              <p className="text-gray-900 dark:text-white">
                <span className="text-gray-500 dark:text-gray-400">Role:</span>{' '}
                <span className="px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 capitalize">
                  {user.role}
                </span>
              </p>
            </div>
          </div>
          {/* Theme State */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Theme</h3>
            <div className="flex items-center gap-3">
              <span className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                ${theme.mode === 'dark' ? 'bg-gray-700' : 'bg-yellow-100'}
              `}>
                {theme.mode === 'dark' ? (
                  <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </span>
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-white capitalize">
                  {theme.mode} Mode
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Toggle in header or App2
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Navigation Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* App1 Card */}
        <button
          onClick={() => navigate('/app1')}
          className="
            group p-6 rounded-2xl
            bg-gradient-to-br from-primary-500 to-primary-600
            text-white text-left
            shadow-xl shadow-primary-500/30
            hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          "
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <svg className="w-6 h-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Dashboard (App1)</h3>
          <p className="text-white/80 text-sm">
            View stats, update user profile, and see Redux state in action
          </p>
          <div className="mt-4 text-xs text-white/60">
            Port 3001 • Remote Micro-Frontend
          </div>
        </button>

        {/* App2 Card */}
        <button
          onClick={() => navigate('/app2')}
          className="
            group p-6 rounded-2xl
            bg-gradient-to-br from-accent-500 to-accent-600
            text-white text-left
            shadow-xl shadow-accent-500/30
            hover:shadow-2xl hover:shadow-accent-500/40 hover:-translate-y-1
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2
          "
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <svg className="w-6 h-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Settings (App2)</h3>
          <p className="text-white/80 text-sm">
            Update user settings, change theme, and see instant state sync
          </p>
          <div className="mt-4 text-xs text-white/60">
            Port 3002 • Remote Micro-Frontend
          </div>
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Try This!
        </h3>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-1">•</span>
            Navigate to App1 and click "Update Profile" - watch the Header update!
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-1">•</span>
            Go to App2 and change the theme - see all apps update instantly!
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-1">•</span>
            Open Redux DevTools to see actions flowing between apps
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-1">•</span>
            Notice navigation has NO page reload - it's a true SPA!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WelcomePage;

