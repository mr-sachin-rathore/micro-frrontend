/**
 * Settings API Client
 * 
 * Communicates with App2 BFF for settings and preferences.
 */

import { getApiBaseUrl } from './config';
import { get, put } from './httpClient';

// Types
export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  language: string;
  timezone: string;
  displayDensity: 'comfortable' | 'compact';
  updatedAt: string;
}

export interface UpdateSettingsResponse {
  success: boolean;
  settings: UserSettings;
}

export interface ThemeResponse {
  success: boolean;
  theme: 'light' | 'dark';
  message: string;
}

export interface NotificationsResponse {
  success: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

/**
 * Settings API methods
 */
export const settingsApi = {
  /**
   * Get all user settings
   */
  getUserSettings: async (): Promise<UserSettings> => {
    const baseUrl = getApiBaseUrl('app2');
    console.log('[API Client] GET /api/settings/user');
    return get<UserSettings>(`${baseUrl}/api/settings/user`);
  },

  /**
   * Update user settings
   */
  updateSettings: async (
    settings: Partial<UserSettings>
  ): Promise<UpdateSettingsResponse> => {
    const baseUrl = getApiBaseUrl('app2');
    console.log('[API Client] PUT /api/settings/user');
    return put<UpdateSettingsResponse>(`${baseUrl}/api/settings/user`, settings);
  },

  /**
   * Update theme preference
   */
  updateTheme: async (theme: 'light' | 'dark'): Promise<ThemeResponse> => {
    const baseUrl = getApiBaseUrl('app2');
    console.log('[API Client] PUT /api/settings/theme');
    return put<ThemeResponse>(`${baseUrl}/api/settings/theme`, { theme });
  },

  /**
   * Update notification preferences
   */
  updateNotifications: async (notifications: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
  }): Promise<NotificationsResponse> => {
    const baseUrl = getApiBaseUrl('app2');
    console.log('[API Client] PUT /api/settings/notifications');
    return put<NotificationsResponse>(
      `${baseUrl}/api/settings/notifications`,
      notifications
    );
  },

  /**
   * Update language preference
   */
  updateLanguage: async (
    language: string
  ): Promise<{ success: boolean; language: string }> => {
    const baseUrl = getApiBaseUrl('app2');
    console.log('[API Client] PUT /api/settings/language');
    return put<{ success: boolean; language: string }>(
      `${baseUrl}/api/settings/language`,
      { language }
    );
  },
};

