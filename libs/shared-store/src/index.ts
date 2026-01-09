/**
 * @shared/store - Shared Redux Store for Micro-Frontend Architecture
 * 
 * This library provides a singleton Redux store that is shared across all
 * micro-frontend applications (shell, app1, app2).
 * 
 * HOW IT WORKS WITH MODULE FEDERATION
 * ====================================
 * 
 * 1. All apps configure `@reduxjs/toolkit` and `react-redux` as singleton shared dependencies
 * 2. The first app to load (usually shell) creates the Redux store
 * 3. Remote apps (app1, app2) receive the SAME store instance
 * 4. Any action dispatched from any app updates the single store
 * 5. All subscribed components across all apps re-render on state changes
 * 
 * USAGE
 * =====
 * 
 * In your app's entry point (main.tsx):
 * ```typescript
 * import { Provider } from 'react-redux';
 * import { store } from '@shared/store';
 * 
 * ReactDOM.render(
 *   <Provider store={store}>
 *     <App />
 *   </Provider>,
 *   document.getElementById('root')
 * );
 * ```
 * 
 * In your components:
 * ```typescript
 * import { useAppSelector, useAppDispatch, updateUser } from '@shared/store';
 * 
 * function MyComponent() {
 *   const user = useAppSelector((state) => state.user);
 *   const dispatch = useAppDispatch();
 *   
 *   return (
 *     <button onClick={() => dispatch(updateUser({ name: 'New Name' }))}>
 *       Update User
 *     </button>
 *   );
 * }
 * ```
 */

// ============================================================================
// Store
// ============================================================================

export { default as store, getStore } from './store';
export type { RootState, AppDispatch } from './store';

// ============================================================================
// Typed Hooks
// ============================================================================

export {
  useAppDispatch,
  useAppSelector,
  useUser,
  useTheme,
  useNavigation,
  useIsAuthenticated,
  useUserRole,
  useThemeMode,
  useBreadcrumbs,
  useCurrentApp,
} from './hooks';

// ============================================================================
// User Slice - Actions & Thunks
// ============================================================================

export {
  updateUser,
  setUser,
  setUserRole,
  logout,
  setAuthenticated,
  loginUser,
  updateUserAsync,
} from './slices/userSlice';

// ============================================================================
// Theme Slice - Actions
// ============================================================================

export {
  setTheme,
  toggleTheme,
  setThemeWithSource,
} from './slices/themeSlice';

// ============================================================================
// Navigation Slice - Actions
// ============================================================================

export {
  setCurrentApp,
  setBreadcrumbs,
  addBreadcrumb,
  popBreadcrumb,
  resetBreadcrumbs,
  toggleSidebar,
  setSidebarCollapsed,
  navigateTo,
} from './slices/navigationSlice';

