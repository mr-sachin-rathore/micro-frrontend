/**
 * Authentication API Client
 * 
 * Communicates with Shell BFF for authentication operations.
 */

import { getApiBaseUrl } from './config';
import { get, post, setAuthToken } from './httpClient';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  avatar?: string;
  isAuthenticated: boolean;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  token: string;
}

export interface AppConfig {
  remotes: {
    app1: string;
    app2: string;
  };
  environment: string;
  features: Record<string, boolean>;
  api: Record<string, string>;
  version: string;
}

/**
 * Authentication API methods
 */
export const authApi = {
  /**
   * Get the current authenticated user
   */
  getCurrentUser: async (): Promise<User> => {
    const baseUrl = getApiBaseUrl('shell');
    console.log('[API Client] GET /api/auth/me');
    return get<User>(`${baseUrl}/api/auth/me`);
  },

  /**
   * Login with email and password
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const baseUrl = getApiBaseUrl('shell');
    console.log('[API Client] POST /api/auth/login');
    const response = await post<LoginResponse>(`${baseUrl}/api/auth/login`, {
      email,
      password,
    });
    
    // Store the token
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<{ success: boolean }> => {
    const baseUrl = getApiBaseUrl('shell');
    console.log('[API Client] POST /api/auth/logout');
    const response = await post<{ success: boolean }>(`${baseUrl}/api/auth/logout`);
    
    // Clear the token
    setAuthToken(null);
    
    return response;
  },

  /**
   * Register a new user
   */
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    const baseUrl = getApiBaseUrl('shell');
    console.log('[API Client] POST /api/auth/register');
    const response = await post<LoginResponse>(`${baseUrl}/api/auth/register`, {
      name,
      email,
      password,
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  /**
   * Get app configuration (including Module Federation remote URLs)
   */
  getConfig: async (): Promise<AppConfig> => {
    const baseUrl = getApiBaseUrl('shell');
    console.log('[API Client] GET /api/config');
    return get<AppConfig>(`${baseUrl}/api/config`);
  },
};

