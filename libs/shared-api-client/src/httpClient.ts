/**
 * HTTP Client
 * 
 * A lightweight fetch wrapper with common functionality:
 * - Automatic JSON parsing
 * - Error handling
 * - Request/response logging
 * - Auth token handling
 */

interface RequestOptions extends RequestInit {
  timeout?: number;
}

interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  ok: boolean;
}

// Token storage (in production, use secure storage)
let authToken: string | null = null;

/**
 * Set the authentication token
 */
export function setAuthToken(token: string | null): void {
  authToken = token;
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
}

/**
 * Get the current authentication token
 */
export function getAuthToken(): string | null {
  if (!authToken) {
    authToken = localStorage.getItem('auth_token');
  }
  return authToken;
}

/**
 * Create default headers
 */
function createHeaders(customHeaders?: HeadersInit): Headers {
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...customHeaders,
  });
  
  const token = getAuthToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  return headers;
}

/**
 * HTTP request helper
 */
async function request<T>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { timeout = 30000, headers: customHeaders, ...fetchOptions } = options;
  
  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    console.log(`[API Client] ${fetchOptions.method || 'GET'} ${url}`);
    
    const response = await fetch(url, {
      ...fetchOptions,
      headers: createHeaders(customHeaders),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    // Parse response
    let data: T;
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text() as unknown as T;
    }
    
    // Log response
    if (!response.ok) {
      console.error(`[API Client] Error ${response.status}:`, data);
    }
    
    return {
      data,
      status: response.status,
      ok: response.ok,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      console.error(`[API Client] Request timeout: ${url}`);
      throw new Error('Request timeout');
    }
    
    console.error(`[API Client] Request failed:`, error);
    throw error;
  }
}

/**
 * HTTP GET request
 */
export async function get<T>(url: string, options?: RequestOptions): Promise<T> {
  const response = await request<T>(url, { ...options, method: 'GET' });
  if (!response.ok) {
    throw new Error((response.data as { message?: string })?.message || 'Request failed');
  }
  return response.data;
}

/**
 * HTTP POST request
 */
export async function post<T>(
  url: string,
  body?: unknown,
  options?: RequestOptions
): Promise<T> {
  const response = await request<T>(url, {
    ...options,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    throw new Error((response.data as { message?: string })?.message || 'Request failed');
  }
  return response.data;
}

/**
 * HTTP PUT request
 */
export async function put<T>(
  url: string,
  body?: unknown,
  options?: RequestOptions
): Promise<T> {
  const response = await request<T>(url, {
    ...options,
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    throw new Error((response.data as { message?: string })?.message || 'Request failed');
  }
  return response.data;
}

/**
 * HTTP DELETE request
 */
export async function del<T>(url: string, options?: RequestOptions): Promise<T> {
  const response = await request<T>(url, { ...options, method: 'DELETE' });
  if (!response.ok) {
    throw new Error((response.data as { message?: string })?.message || 'Request failed');
  }
  return response.data;
}

