/**
 * @shared/ui - Shared UI Components Library
 * 
 * This library contains reusable UI components that are shared across
 * all micro-frontend applications.
 * 
 * Components:
 * - Header: Top navigation bar with user profile, theme toggle, and breadcrumbs
 * - LeftNavigation: Sidebar navigation with role-based menu items
 * 
 * All components integrate with the shared Redux store (@shared/store)
 * to read and update application state.
 */

// Header Component
export { Header } from './Header';

// Left Navigation Component
export { LeftNavigation } from './LeftNavigation';

