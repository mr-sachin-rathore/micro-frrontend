/**
 * API Configuration
 *
 * Provides base URLs for API calls based on environment.
 *
 * DEVELOPMENT / LOCAL PREVIEW (ports 5173-5175):
 * - Frontend runs on Vite dev/preview server
 * - BFF servers run separately (8084, 8085, 8086)
 * - API calls go to explicit BFF URLs
 *
 * DOCKER (ports 8084-8086):
 * - All apps loaded via Module Federation into shell at 8084
 * - But API calls still need to go to correct BFF servers
 * - App1 APIs → 8085, App2 APIs → 8086
 *
 * PRODUCTION (deployed):
 * - Reverse proxy routes to correct backends
 * - Use relative URLs
 */

// API base URLs - explicit URLs for localhost, relative for deployed production
export const API_CONFIG = {
  // Used when running on localhost (dev, preview, or Docker)
  localhost: {
    shell: "http://localhost:8084",
    app1: "http://localhost:8085",
    app2: "http://localhost:8086",
  },
  // Used when deployed to production domain
  production: {
    shell: "", // Same origin - relative URLs
    app1: "", // Assumes reverse proxy routes /api/dashboard/* to app1
    app2: "", // Assumes reverse proxy routes /api/settings/* to app2
  },
};

/**
 * Detect if we're running on localhost (dev, preview, or Docker)
 */
function isLocalhost(): boolean {
  if (typeof window === "undefined") {
    return true; // SSR or Node - assume local
  }

  const hostname = window.location.hostname;
  return hostname === "localhost" || hostname === "127.0.0.1";
}

/**
 * Get the API base URL for a specific app
 *
 * @param app - The app to get the base URL for
 * @returns The base URL string
 */
export function getApiBaseUrl(app: "shell" | "app1" | "app2"): string {
  // On localhost (dev, preview, or Docker), always use explicit URLs
  // because APIs are served from different ports
  const config = isLocalhost() ? API_CONFIG.localhost : API_CONFIG.production;

  return config[app];
}

/**
 * Get all API base URLs
 */
export function getAllApiUrls() {
  return isLocalhost() ? API_CONFIG.localhost : API_CONFIG.production;
}

/**
 * Check if running on localhost
 */
export function isDevMode(): boolean {
  return isLocalhost();
}
