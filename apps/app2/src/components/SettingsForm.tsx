/**
 * Settings Form Component
 * 
 * Allows users to update their profile information.
 * Changes are dispatched to the shared Redux store,
 * and all apps will reflect the updates immediately.
 */

import React, { useState, useEffect } from 'react';
import {
  useAppSelector,
  useAppDispatch,
  updateUser,
  updateUserAsync,
} from '@shared/store';

const SettingsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  
  // Local form state
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sync local state with Redux state when it changes
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user.name, user.email]);

  /**
   * Handle form submission
   * Dispatches updateUser action to shared Redux store
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    console.log('[app2/SettingsForm] 💾 Saving user settings...');
    
    // Use the async thunk for demonstration
    try {
      await dispatch(
        updateUserAsync({
          payload: {
            name,
            email,
            avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=0ea5e9&color=fff`,
          },
          source: 'app2',
        })
      ).unwrap();
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('[app2/SettingsForm] ❌ Error saving:', error);
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Handle quick update (synchronous)
   * Demonstrates immediate UI update
   */
  const handleQuickUpdate = () => {
    console.log('[app2/SettingsForm] ⚡ Quick updating user...');
    dispatch(
      updateUser({
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=0ea5e9&color=fff`,
      })
    );
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Profile Settings
      </h2>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3 animate-fade-in">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-green-800 dark:text-green-200">Settings saved!</p>
            <p className="text-sm text-green-600 dark:text-green-300">
              Your changes are now reflected across all apps.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full px-4 py-3 rounded-xl
              bg-gray-50 dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              text-gray-900 dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              transition-all duration-200
            "
            placeholder="Enter your name"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            This will update your display name in the Header
          </p>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-4 py-3 rounded-xl
              bg-gray-50 dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              text-gray-900 dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              transition-all duration-200
            "
            placeholder="Enter your email"
          />
        </div>

        {/* Role Display (read-only here, changeable in App1) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Role
          </label>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 capitalize">
              {user.role}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Role can be changed in Dashboard (App1)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="
              flex-1 px-6 py-3 rounded-xl
              bg-gradient-to-r from-primary-500 to-primary-600
              text-white font-medium
              shadow-lg shadow-primary-500/30
              hover:shadow-xl hover:shadow-primary-500/40
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            "
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes (Async)
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={handleQuickUpdate}
            className="
              px-6 py-3 rounded-xl
              bg-gray-100 dark:bg-gray-800
              text-gray-700 dark:text-gray-200 font-medium
              hover:bg-gray-200 dark:hover:bg-gray-700
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
            "
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Update
            </span>
          </button>
        </div>
      </form>

      {/* Info Text */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Note:</strong> "Save Changes (Async)" uses createAsyncThunk to simulate an API call.
          "Quick Update" dispatches synchronously for immediate feedback.
          Both update the shared Redux store!
        </p>
      </div>
    </div>
  );
};

export default SettingsForm;

