/**
 * @shared/types - TypeScript type definitions shared across all micro-frontend apps
 * 
 * This library contains all the shared types used by:
 * - Shell (host app)
 * - App1 (Dashboard remote)
 * - App2 (Settings remote)
 * - Shared UI components
 * - Shared Redux store
 */

// ============================================================================
// User Types
// ============================================================================

/**
 * User roles for role-based access control
 */
export type UserRole = 'admin' | 'user' | 'guest';

/**
 * User state stored in Redux
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAuthenticated: boolean;
  avatar?: string;
}

/**
 * Payload for updating user information
 */
export interface UpdateUserPayload {
  name?: string;
  email?: string;
  role?: UserRole;
  avatar?: string;
}

// ============================================================================
// Theme Types
// ============================================================================

/**
 * Theme mode - light or dark
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Theme state stored in Redux
 */
export interface ThemeState {
  mode: ThemeMode;
}

// ============================================================================
// Navigation Types
// ============================================================================

/**
 * Breadcrumb item for navigation trail
 */
export interface Breadcrumb {
  label: string;
  path: string;
}

/**
 * App identifiers for navigation
 */
export type AppName = 'shell' | 'app1' | 'app2';

/**
 * Navigation state stored in Redux
 */
export interface NavigationState {
  currentApp: AppName;
  breadcrumbs: Breadcrumb[];
  isSidebarCollapsed: boolean;
}

// ============================================================================
// Root State Type
// ============================================================================

/**
 * Complete Redux root state type
 * This is the shape of the entire Redux store
 */
export interface RootState {
  user: User;
  theme: ThemeState;
  navigation: NavigationState;
}

// ============================================================================
// Navigation Menu Types
// ============================================================================

/**
 * Navigation menu item
 */
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  requiredRole?: UserRole[];
  children?: NavItem[];
}

// ============================================================================
// Remote App Types
// ============================================================================

/**
 * Remote app configuration
 */
export interface RemoteAppConfig {
  name: AppName;
  url: string;
  port: number;
}

/**
 * Error state for remote app loading
 */
export interface RemoteAppError {
  app: AppName;
  message: string;
  timestamp: number;
}

// ============================================================================
// Action Meta Types (for logging/debugging)
// ============================================================================

/**
 * Meta information for Redux actions
 * Helps track which app dispatched an action
 */
export interface ActionMeta {
  source: AppName;
  timestamp: number;
}

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * Props for the Header component
 */
export interface HeaderProps {
  className?: string;
}

/**
 * Props for the LeftNavigation component
 */
export interface LeftNavigationProps {
  className?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

/**
 * Props for the UserStatsCard component
 */
export interface UserStatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

/**
 * Props for the ThemeSelector component
 */
export interface ThemeSelectorProps {
  className?: string;
}

/**
 * Props for the SettingsForm component
 */
export interface SettingsFormProps {
  onSave?: () => void;
}

