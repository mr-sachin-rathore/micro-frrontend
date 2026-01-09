/**
 * API Configuration
 *
 * Provides base URLs for API calls based on environment.
 *
 * DEVELOPMENT / LOCAL PREVIEW:
 * - Frontend runs on Vite dev/preview server (5173, 5174, 5175)
 * - BFF servers run separately (8084, 8085, 8086)
 * - API calls go to different ports
 *
 * PRODUCTION (Docker):
 * - Frontend is served by BFF server
 * - API calls go to same origin (relative URLs)
 */

// API base URLs for each environment
export const API_CONFIG = {
  local: {
    shell: "http://localhost:8084",
    app1: "http://localhost:8085",
    app2: "http://localhost:8086",
  },
  production: {
    shell: "", // Same origin - relative URLs
    app1: "", // Same origin
    app2: "", // Same origin
  },
};

/**
 * Detect if we're running locally (dev mode or preview mode on localhost)
 */
function isLocalEnvironment(): boolean {
  // Check if we're in the browser
  if (typeof window === "undefined") {
    return true; // SSR or Node - assume local
  }

  const hostname = window.location.hostname;
  const port = window.location.port;

  // Running on localhost with Vite dev/preview ports
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    const vitePorts = ["5173", "5174", "5175"];
    if (vitePorts.includes(port)) {
      return true;
    }
  }

  return false;
}

/**
 * Get the API base URL for a specific app
 *
 * @param app - The app to get the base URL for
 * @returns The base URL string
 */
export function getApiBaseUrl(app: "shell" | "app1" | "app2"): string {
  const config = isLocalEnvironment() ? API_CONFIG.local : API_CONFIG.production;

  return config[app];
}

/**
 * Get all API base URLs
 */
export function getAllApiUrls() {
  return isLocalEnvironment() ? API_CONFIG.local : API_CONFIG.production;
}

/**
 * Check if running in local/development mode
 */
export function isDevMode(): boolean {
  return isLocalEnvironment();
}
