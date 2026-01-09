/**
 * Redux Store Configuration
 * 
 * This creates a SINGLETON store that is shared across all micro-frontend apps.
 * 
 * KEY CONCEPT: Module Federation Singleton Pattern
 * ================================================
 * When using Module Federation with shared: { singleton: true }, all apps
 * share the same instance of @reduxjs/toolkit and react-redux. This means:
 * 
 * 1. The store is created ONCE in the shell app
 * 2. Remote apps (app1, app2) receive the SAME store instance
 * 3. Dispatching an action from ANY app updates the SINGLE store
 * 4. All apps re-render when relevant state changes
 * 
 * This is the foundation of cross-app state synchronization!
 * 
 * LocalStorage Persistence
 * ========================
 * - User state is persisted to survive page refreshes
 * - Theme preference is persisted for consistent UX
 * - Navigation state is NOT persisted (ephemeral)
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';
import navigationReducer from './slices/navigationSlice';
import type { User, ThemeState, NavigationState } from '@shared/types';

// ============================================================================
// Local Storage Persistence Keys
// ============================================================================

const STORAGE_KEYS = {
  USER: 'mf_user_state',
  THEME: 'mf_theme_state',
} as const;

// ============================================================================
// Hydrate State from LocalStorage
// ============================================================================

/**
 * Load persisted state from localStorage
 * Called once when the store is created
 */
const loadPersistedState = (): {
  user?: User;
  theme?: ThemeState;
} => {
  try {
    if (typeof window === 'undefined') {
      return {};
    }

    const persistedState: { user?: User; theme?: ThemeState } = {};

    // Load user state
    const userState = localStorage.getItem(STORAGE_KEYS.USER);
    if (userState) {
      persistedState.user = JSON.parse(userState);
      console.log('[shared-store] 📂 Loaded user state from localStorage');
    }

    // Load theme state
    const themeState = localStorage.getItem(STORAGE_KEYS.THEME);
    if (themeState) {
      persistedState.theme = JSON.parse(themeState);
      console.log('[shared-store] 📂 Loaded theme state from localStorage');
    }

    return persistedState;
  } catch (error) {
    console.error('[shared-store] ❌ Error loading persisted state:', error);
    return {};
  }
};

// ============================================================================
// Persistence Middleware
// ============================================================================

/**
 * Custom middleware to persist state changes to localStorage
 * Runs after every action to save relevant state
 */
const persistenceMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  const result = next(action);
  
  try {
    const state = storeAPI.getState();
    
    // Persist user state on user-related actions
    if (action.type.startsWith('user/')) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.user));
    }
    
    // Theme is persisted in the themeSlice reducer itself
    // but we can also handle it here for consistency
    if (action.type.startsWith('theme/')) {
      localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(state.theme));
    }
  } catch (error) {
    console.error('[shared-store] ❌ Error persisting state:', error);
  }
  
  return result;
};

// ============================================================================
// Combine Reducers
// ============================================================================

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  navigation: navigationReducer,
});

// ============================================================================
// Store Singleton
// ============================================================================

/**
 * SINGLETON PATTERN
 * 
 * We store the store instance in a module-level variable.
 * With Module Federation's singleton sharing, all apps will
 * get the same instance of this module, and thus the same store.
 */
let store: ReturnType<typeof createStore> | null = null;

/**
 * Create the Redux store with all configurations
 */
function createStore() {
  const persistedState = loadPersistedState();
  
  return configureStore({
    reducer: rootReducer,
    preloadedState: persistedState as any,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types for serializable check
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(persistenceMiddleware),
    devTools: {
      name: 'MicroFrontend Store',
      trace: true,
      traceLimit: 25,
    },
  });
}

/**
 * Get the singleton store instance
 * Creates the store on first call, returns cached instance on subsequent calls
 */
export function getStore() {
  if (!store) {
    store = createStore();
    console.log('[shared-store] 🏪 Redux store created');
    
    // Apply initial theme to document
    const state = store.getState();
    if (typeof document !== 'undefined') {
      if (state.theme.mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
  return store;
}

// ============================================================================
// Type Exports
// ============================================================================

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof getStore>['dispatch'];

// ============================================================================
// Default Export
// ============================================================================

/**
 * Default export: the singleton store
 * Note: We export getStore() result to ensure singleton pattern
 */
export default getStore();

