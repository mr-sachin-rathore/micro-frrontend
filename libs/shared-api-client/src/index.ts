/**
 * @shared/api-client - Shared API Client Library
 * 
 * This library provides typed API clients for communicating with BFF servers.
 * 
 * Usage:
 * ```typescript
 * import { authApi, dashboardApi, settingsApi } from '@shared/api-client';
 * 
 * // Login
 * const { user, token } = await authApi.login('email@example.com', 'password');
 * 
 * // Get dashboard stats
 * const stats = await dashboardApi.getStats();
 * 
 * // Update theme
 * await settingsApi.updateTheme('dark');
 * ```
 */

// Configuration
export { getApiBaseUrl, getAllApiUrls, isDevMode } from './config';

// HTTP Client utilities
export { setAuthToken, getAuthToken } from './httpClient';

// Auth API (Shell BFF)
export { authApi } from './authApi';
export type { User, LoginResponse, AppConfig } from './authApi';

// Dashboard API (App1 BFF)
export { dashboardApi } from './dashboardApi';
export type {
  DashboardStats,
  ChartData,
  ActivityItem,
  UserProfile,
  UpdateProfileResponse,
} from './dashboardApi';

// Settings API (App2 BFF)
export { settingsApi } from './settingsApi';
export type {
  UserSettings,
  UpdateSettingsResponse,
  ThemeResponse,
  NotificationsResponse,
} from './settingsApi';

