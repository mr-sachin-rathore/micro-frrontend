/**
 * Loading Spinner Component
 * 
 * A reusable loading spinner with different sizes.
 * Used as Suspense fallback when loading remote apps.
 */

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizeClasses = {
  small: 'w-6 h-6',
  medium: 'w-10 h-10',
  large: 'w-16 h-16',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  className = '',
}) => {
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Outer ring */}
      <div
        className={`
          absolute inset-0
          rounded-full
          border-4 border-gray-200 dark:border-gray-700
        `}
      />
      {/* Spinning arc */}
      <div
        className={`
          absolute inset-0
          rounded-full
          border-4 border-transparent
          border-t-primary-500 border-r-primary-500
          animate-spin
        `}
      />
      {/* Inner glow */}
      <div
        className={`
          absolute inset-2
          rounded-full
          bg-gradient-to-br from-primary-400/20 to-accent-400/20
          animate-pulse
        `}
      />
    </div>
  );
};

export default LoadingSpinner;

