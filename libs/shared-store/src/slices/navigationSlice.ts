/**
 * Navigation Slice - Manages navigation state and breadcrumbs
 * 
 * This slice tracks the current active app and breadcrumb trail.
 * When a user navigates to App1 or App2, the navigation state
 * updates to show the correct breadcrumbs in the Header.
 * 
 * Redux Flow Example:
 * 1. User navigates to /app1/dashboard
 * 2. App1's Dashboard component mounts
 * 3. Dashboard dispatches setCurrentApp('app1') and setBreadcrumbs(...)
 * 4. Header component reads navigation state and displays breadcrumbs
 * 5. LeftNavigation highlights the active menu item
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { NavigationState, AppName, Breadcrumb } from '@shared/types';

// ============================================================================
// Initial State
// ============================================================================

const initialState: NavigationState = {
  currentApp: 'shell',
  breadcrumbs: [{ label: 'Home', path: '/' }],
  isSidebarCollapsed: false,
};

// ============================================================================
// Slice Definition
// ============================================================================

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    /**
     * Set the current active app
     * Called when navigating between micro-frontends
     */
    setCurrentApp: (state, action: PayloadAction<AppName>) => {
      console.log('[shared-store] 🧭 Current app changed to:', action.payload);
      state.currentApp = action.payload;
    },

    /**
     * Set the breadcrumb trail
     * Each app updates breadcrumbs based on current route
     */
    setBreadcrumbs: (state, action: PayloadAction<Breadcrumb[]>) => {
      console.log('[shared-store] 🍞 Breadcrumbs updated:', action.payload);
      state.breadcrumbs = action.payload;
    },

    /**
     * Add a breadcrumb to the end of the trail
     */
    addBreadcrumb: (state, action: PayloadAction<Breadcrumb>) => {
      console.log('[shared-store] ➕ Breadcrumb added:', action.payload);
      state.breadcrumbs.push(action.payload);
    },

    /**
     * Remove the last breadcrumb (for back navigation)
     */
    popBreadcrumb: (state) => {
      if (state.breadcrumbs.length > 1) {
        const removed = state.breadcrumbs.pop();
        console.log('[shared-store] ➖ Breadcrumb removed:', removed);
      }
    },

    /**
     * Reset breadcrumbs to home
     */
    resetBreadcrumbs: (state) => {
      console.log('[shared-store] 🔄 Breadcrumbs reset to home');
      state.breadcrumbs = [{ label: 'Home', path: '/' }];
    },

    /**
     * Toggle sidebar collapsed state
     */
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
      console.log('[shared-store] 📐 Sidebar collapsed:', state.isSidebarCollapsed);
    },

    /**
     * Set sidebar collapsed state
     */
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
      console.log('[shared-store] 📐 Sidebar collapsed set to:', action.payload);
    },

    /**
     * Combined action to update all navigation state at once
     * Useful when entering a new app/route
     */
    navigateTo: (
      state,
      action: PayloadAction<{
        app: AppName;
        breadcrumbs: Breadcrumb[];
      }>
    ) => {
      const { app, breadcrumbs } = action.payload;
      console.log(`[shared-store] 🚀 Navigating to ${app}:`, breadcrumbs);
      state.currentApp = app;
      state.breadcrumbs = breadcrumbs;
    },
  },
});

// ============================================================================
// Exports
// ============================================================================

export const {
  setCurrentApp,
  setBreadcrumbs,
  addBreadcrumb,
  popBreadcrumb,
  resetBreadcrumbs,
  toggleSidebar,
  setSidebarCollapsed,
  navigateTo,
} = navigationSlice.actions;

export default navigationSlice.reducer;

