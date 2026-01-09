/**
 * Dashboard Component
 * 
 * Main dashboard content showing activity chart and recent activity.
 */

import React from 'react';
import { useAppSelector } from '@shared/store';

const Dashboard: React.FC = () => {
  const theme = useAppSelector((state) => state.theme);

  // Simulated activity data
  const recentActivity = [
    { id: 1, action: 'User signup', user: 'john@example.com', time: '2 minutes ago', type: 'success' },
    { id: 2, action: 'Payment received', user: 'jane@example.com', time: '15 minutes ago', type: 'success' },
    { id: 3, action: 'Failed login attempt', user: 'unknown', time: '1 hour ago', type: 'error' },
    { id: 4, action: 'Profile updated', user: 'bob@example.com', time: '2 hours ago', type: 'info' },
    { id: 5, action: 'New subscription', user: 'alice@example.com', time: '3 hours ago', type: 'success' },
  ];

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'info':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Activity Chart (Simulated) */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Weekly Activity
        </h2>
        
        {/* Simulated Bar Chart */}
        <div className="flex items-end justify-between h-48 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const heights = [60, 80, 45, 90, 75, 40, 85];
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-primary-500 to-primary-400 transition-all duration-500 hover:from-primary-600 hover:to-primary-500"
                  style={{ height: `${heights[index]}%` }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">{day}</span>
              </div>
            );
          })}
        </div>

        {/* Chart Legend */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">User Activity</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Recent Activity
        </h2>

        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Activity Icon */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeStyles(activity.type)}`}>
                {activity.type === 'success' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {activity.type === 'error' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {activity.type === 'info' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>

              {/* Activity Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {activity.user}
                </p>
              </div>

              {/* Time */}
              <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <button className="w-full mt-4 py-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
          View all activity →
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

