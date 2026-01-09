/**
 * Theme Slice - Manages light/dark theme state
 * 
 * This slice enables theme synchronization across all micro-frontend apps.
 * When App2 (Settings) changes the theme, the change immediately
 * reflects in Shell, App1, and all shared UI components.
 * 
 * Redux Flow Example:
 * 1. User selects "Dark Mode" in App2's ThemeSelector
 * 2. App2 dispatches setTheme('dark') action
 * 3. Redux store updates theme.mode to 'dark'
 * 4. Shell app adds 'dark' class to document root
 * 5. All components using Tailwind dark: variants update automatically
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ThemeState, ThemeMode, AppName } from '@shared/types';

// ============================================================================
// Initial State
// ============================================================================

/**
 * Try to get initial theme from localStorage, default to 'light'
 */
const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

// ============================================================================
// Slice Definition
// ============================================================================

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    /**
     * Set theme mode to a specific value
     */
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      console.log('[shared-store] 🎨 Theme changed to:', action.payload);
      state.mode = action.payload;
      
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
        
        // Update document class for Tailwind dark mode
        if (action.payload === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },

    /**
     * Toggle between light and dark mode
     */
    toggleTheme: (state) => {
      const newMode: ThemeMode = state.mode === 'light' ? 'dark' : 'light';
      console.log('[shared-store] 🔄 Theme toggled to:', newMode);
      state.mode = newMode;
      
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newMode);
        
        // Update document class for Tailwind dark mode
        if (newMode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },

    /**
     * Set theme with source tracking (for debugging)
     * Shows which app dispatched the theme change
     */
    setThemeWithSource: (
      state,
      action: PayloadAction<{ mode: ThemeMode; source: AppName }>
    ) => {
      const { mode, source } = action.payload;
      console.log(`[shared-store] 🎨 Theme changed to ${mode} by ${source}`);
      state.mode = mode;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', mode);
        
        if (mode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
  },
});

// ============================================================================
// Exports
// ============================================================================

export const { setTheme, toggleTheme, setThemeWithSource } = themeSlice.actions;
export default themeSlice.reducer;

