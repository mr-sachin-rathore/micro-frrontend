/**
 * Typed Redux Hooks
 * 
 * These hooks provide type-safe access to the Redux store.
 * Use these instead of plain useDispatch and useSelector to get
 * proper TypeScript types for state and actions.
 * 
 * Usage:
 * ```typescript
 * import { useAppSelector, useAppDispatch } from '@shared/store';
 * 
 * function MyComponent() {
 *   const user = useAppSelector((state) => state.user);
 *   const dispatch = useAppDispatch();
 *   
 *   const handleClick = () => {
 *     dispatch(updateUser({ name: 'New Name' }));
 *   };
 * }
 * ```
 */

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Typed useDispatch hook
 * 
 * Returns a dispatch function that is properly typed for our store.
 * This ensures you can only dispatch valid actions.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed useSelector hook
 * 
 * Provides type inference for the state parameter in selector functions.
 * No need to type state manually when using this hook.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Hook to get the current user from Redux state
 * Convenience wrapper around useAppSelector
 */
export const useUser = () => {
  return useAppSelector((state) => state.user);
};

/**
 * Hook to get the current theme from Redux state
 * Convenience wrapper around useAppSelector
 */
export const useTheme = () => {
  return useAppSelector((state) => state.theme);
};

/**
 * Hook to get the current navigation state from Redux state
 * Convenience wrapper around useAppSelector
 */
export const useNavigation = () => {
  return useAppSelector((state) => state.navigation);
};

/**
 * Hook to check if user is authenticated
 */
export const useIsAuthenticated = () => {
  return useAppSelector((state) => state.user.isAuthenticated);
};

/**
 * Hook to get user role
 */
export const useUserRole = () => {
  return useAppSelector((state) => state.user.role);
};

/**
 * Hook to get theme mode
 */
export const useThemeMode = () => {
  return useAppSelector((state) => state.theme.mode);
};

/**
 * Hook to get current breadcrumbs
 */
export const useBreadcrumbs = () => {
  return useAppSelector((state) => state.navigation.breadcrumbs);
};

/**
 * Hook to get current app
 */
export const useCurrentApp = () => {
  return useAppSelector((state) => state.navigation.currentApp);
};

