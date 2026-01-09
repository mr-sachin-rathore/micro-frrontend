/**
 * API Configuration
 *
 * Provides base URLs for API calls based on environment.
 *
 * DEVELOPMENT:
 * - Frontend runs on Vite dev server (5173, 5174, 5175)
 * - BFF servers run separately (8084, 8085, 8086)
 * - API calls go to different ports
 *
 * PRODUCTION:
 * - Frontend is served by BFF server
 * - API calls go to same origin (relative URLs)
 */

// Detect environment
const isDevelopment =
  typeof import.meta !== "undefined" && import.meta.env?.MODE === "development";

// API base URLs for each environment
export const API_CONFIG = {
  development: {
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
 * Get the API base URL for a specific app
 *
 * @param app - The app to get the base URL for
 * @returns The base URL string
 */
export function getApiBaseUrl(app: "shell" | "app1" | "app2"): string {
  const config = isDevelopment ? API_CONFIG.development : API_CONFIG.production;

  return config[app];
}

/**
 * Get all API base URLs
 */
export function getAllApiUrls() {
  return isDevelopment ? API_CONFIG.development : API_CONFIG.production;
}

/**
 * Check if running in development mode
 */
export function isDevMode(): boolean {
  return isDevelopment;
}
