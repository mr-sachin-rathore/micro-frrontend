/**
 * Shell App - Main Application Component
 * 
 * This is the host application that orchestrates the micro-frontend architecture.
 * 
 * Layout:
 * ┌────────────────────────────────────────────────┐
 * │                    Header                       │
 * ├──────────┬─────────────────────────────────────┤
 * │          │                                      │
 * │   Left   │          Main Content                │
 * │   Nav    │    (Remote Apps loaded here)         │
 * │          │                                      │
 * └──────────┴─────────────────────────────────────┘
 * 
 * Features:
 * - Lazy loads remote apps (App1, App2) via Module Federation
 * - Suspense fallback with loading spinner
 * - Error boundaries for each remote app
 * - Shared Header and LeftNavigation from @shared/ui
 */

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header, LeftNavigation } from '@shared/ui';
import { useAppDispatch, useAppSelector, setUser } from '@shared/store';
import { authApi } from '@shared/api-client';
import RemoteAppErrorBoundary from './components/RemoteAppErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import WelcomePage from './components/WelcomePage';

/**
 * Lazy load remote applications
 * 
 * These imports use Module Federation to dynamically load the remote apps.
 * The './App' in the import path corresponds to the 'exposes' config
 * in each remote app's vite.config.ts
 */

// App1 - Dashboard Application (port 3001)
const App1 = lazy(() => import('app1/App'));

// App2 - Settings Application (port 3002)
const App2 = lazy(() => import('app2/App'));

/**
 * Loading Fallback Component
 * Displayed while remote apps are being loaded
 */
const RemoteAppLoading: React.FC<{ appName: string }> = ({ appName }) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[400px] animate-fade-in">
    <LoadingSpinner size="large" />
    <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
      Loading {appName}...
    </p>
    <p className="mt-2 text-gray-400 dark:text-gray-500 text-sm">
      Fetching micro-frontend assets
    </p>
  </div>
);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const theme = useAppSelector((state) => state.theme);
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<string>('');

  /**
   * Fetch user data from BFF on mount
   * This demonstrates real API integration with the BFF server
   */
  useEffect(() => {
    const fetchUserFromBFF = async () => {
      console.log('[shell/App] 🎬 Shell app mounted');
      console.log('[shell/App] 🌐 Fetching user from BFF...');
      setApiStatus('Connecting to Shell BFF...');
      
      try {
        // Fetch current user from BFF
        const userData = await authApi.getCurrentUser();
        console.log('[shell/App] ✅ User data received from BFF:', userData);
        setApiStatus('✅ User loaded from BFF');
        
        dispatch(
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            isAuthenticated: userData.isAuthenticated,
            avatar: userData.avatar,
          })
        );
      } catch (error) {
        console.error('[shell/App] ❌ Failed to fetch user from BFF:', error);
        setApiStatus('❌ BFF connection failed, using fallback');
        
        // Fallback to demo user if BFF is not available
        dispatch(
          setUser({
            id: 'demo-user-1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'admin',
            isAuthenticated: true,
            avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0ea5e9&color=fff',
          })
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (!user?.isAuthenticated) {
      fetchUserFromBFF();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, user.isAuthenticated]);

  /**
   * Apply theme class to document
   * This enables Tailwind's dark mode to work correctly
   */
  useEffect(() => {
    if (theme?.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    console.log('[shell/App] 🎨 Theme applied:', theme?.mode ?? 'light');
  }, [theme?.mode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      {/* API Status Indicator */}
      {apiStatus && (
        <div className={`fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-all ${
          apiStatus.includes('✅') 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : apiStatus.includes('❌')
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {apiStatus}
        </div>
      )}
      
      {/* Shared Header */}
      <Header />
      
      <div className="flex">
        {/* Shared Left Navigation */}
        <LeftNavigation />
        
        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto h-[calc(100vh-4rem)]">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<WelcomePage />} />
            
            {/* App1 - Dashboard (Remote) */}
            <Route
              path="/app1/*"
              element={
                <RemoteAppErrorBoundary appName="Dashboard (App1)">
                  <Suspense fallback={<RemoteAppLoading appName="Dashboard" />}>
                    <App1 />
                  </Suspense>
                </RemoteAppErrorBoundary>
              }
            />
            
            {/* App2 - Settings (Remote) */}
            <Route
              path="/app2/*"
              element={
                <RemoteAppErrorBoundary appName="Settings (App2)">
                  <Suspense fallback={<RemoteAppLoading appName="Settings" />}>
                    <App2 />
                  </Suspense>
                </RemoteAppErrorBoundary>
              }
            />
            
            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;

