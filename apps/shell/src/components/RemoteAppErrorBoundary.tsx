/**
 * Remote App Error Boundary
 * 
 * This component catches errors that occur when loading or rendering
 * remote micro-frontend applications. This is crucial for resilience -
 * if one remote app fails, the rest of the shell app continues to work.
 * 
 * Common failure scenarios handled:
 * - Remote app server is down
 * - Network error loading remoteEntry.js
 * - Runtime error in remote app code
 * - Incompatible shared dependency versions
 */

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  appName: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class RemoteAppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error for debugging
    console.error(`[ErrorBoundary] ❌ Error in ${this.props.appName}:`, error);
    console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack);
  }

  handleRetry = (): void => {
    // Reset error state and attempt to re-render
    this.setState({ hasError: false, error: null });
    // Force reload the page to retry loading the remote app
    window.location.reload();
  };

  override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 animate-fade-in">
          {/* Error Icon */}
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-red-500 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Error Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to Load {this.props.appName}
          </h2>

          {/* Error Description */}
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-md mb-4">
            The micro-frontend application could not be loaded. This might be because
            the remote app is not running or there was a network error.
          </p>

          {/* Error Details */}
          <div className="w-full max-w-md p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
            <p className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
              {this.state.error?.message || 'Unknown error occurred'}
            </p>
          </div>

          {/* Troubleshooting Steps */}
          <div className="w-full max-w-md mb-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Troubleshooting:
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                Make sure the remote app server is running
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                Check the browser console for detailed errors
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                Verify the remote app URL is correct
              </li>
            </ul>
          </div>

          {/* Retry Button */}
          <button
            onClick={this.handleRetry}
            className="
              px-6 py-3 rounded-xl
              bg-gradient-to-r from-primary-500 to-primary-600
              text-white font-medium
              shadow-lg shadow-primary-500/30
              hover:shadow-xl hover:shadow-primary-500/40
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            "
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Retry Loading
            </span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default RemoteAppErrorBoundary;

