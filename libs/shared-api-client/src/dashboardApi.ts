/**
 * Dashboard API Client
 * 
 * Communicates with App1 BFF for dashboard and user operations.
 */

import { getApiBaseUrl } from './config';
import { get, put } from './httpClient';

// Types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
  newSignups: number;
  conversionRate: number;
  timestamp: string;
}

export interface ChartData {
  revenue: {
    labels: string[];
    data: number[];
  };
  users: {
    labels: string[];
    data: number[];
  };
  traffic: {
    labels: string[];
    data: number[];
  };
}

export interface ActivityItem {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  updatedAt: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  user: UserProfile;
}

/**
 * Dashboard API methods
 */
export const dashboardApi = {
  /**
   * Get dashboard statistics
   */
  getStats: async (): Promise<DashboardStats> => {
    const baseUrl = getApiBaseUrl('app1');
    console.log('[API Client] GET /api/dashboard/stats');
    return get<DashboardStats>(`${baseUrl}/api/dashboard/stats`);
  },

  /**
   * Get chart data for visualizations
   */
  getCharts: async (): Promise<ChartData> => {
    const baseUrl = getApiBaseUrl('app1');
    console.log('[API Client] GET /api/dashboard/charts');
    return get<ChartData>(`${baseUrl}/api/dashboard/charts`);
  },

  /**
   * Get recent activity feed
   */
  getActivity: async (): Promise<ActivityItem[]> => {
    const baseUrl = getApiBaseUrl('app1');
    console.log('[API Client] GET /api/dashboard/activity');
    return get<ActivityItem[]>(`${baseUrl}/api/dashboard/activity`);
  },

  /**
   * Get user profile
   */
  getProfile: async (): Promise<UserProfile> => {
    const baseUrl = getApiBaseUrl('app1');
    console.log('[API Client] GET /api/user/profile');
    return get<UserProfile>(`${baseUrl}/api/user/profile`);
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: {
    name?: string;
    email?: string;
    avatar?: string;
  }): Promise<UpdateProfileResponse> => {
    const baseUrl = getApiBaseUrl('app1');
    console.log('[API Client] PUT /api/user/profile');
    return put<UpdateProfileResponse>(`${baseUrl}/api/user/profile`, data);
  },

  /**
   * Update user role
   */
  updateRole: async (role: 'admin' | 'user' | 'guest'): Promise<UpdateProfileResponse> => {
    const baseUrl = getApiBaseUrl('app1');
    console.log('[API Client] PUT /api/user/role');
    return put<UpdateProfileResponse>(`${baseUrl}/api/user/role`, { role });
  },
};

