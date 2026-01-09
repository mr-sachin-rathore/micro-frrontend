/**
 * Environment Configuration for Shell BFF Server
 *
 * Loads configuration from environment variables with sensible defaults.
 * Different values are used for development vs production.
 */

import dotenv from "dotenv";
import path from "path";

// Load appropriate .env file based on NODE_ENV
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: path.resolve(__dirname, "../../", envFile) });

export const config = {
  // Server configuration
  port: parseInt(process.env.PORT || "8084", 10),
  nodeEnv: process.env.NODE_ENV || "development",

  // Static file serving (only in production)
  serveStatic: process.env.SERVE_STATIC === "true",

  // Frontend URL (for CORS in development)
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",

  // Remote app URLs for Module Federation
  app1RemoteUrl:
    process.env.APP1_REMOTE_URL ||
    "http://localhost:5174/assets/remoteEntry.js",
  app2RemoteUrl:
    process.env.APP2_REMOTE_URL ||
    "http://localhost:5175/assets/remoteEntry.js",

  // Backend API URL (main backend service)
  backendApiUrl: process.env.BACKEND_API_URL || "http://localhost:5000",

  // JWT Secret for authentication
  jwtSecret:
    process.env.JWT_SECRET || "development-secret-change-in-production",
};

// Validate required configuration
export function validateConfig(): void {
  const required = ["port", "nodeEnv"];
  const missing = required.filter((key) => !config[key as keyof typeof config]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  console.log("[Shell BFF] Configuration loaded:", {
    port: config.port,
    nodeEnv: config.nodeEnv,
    serveStatic: config.serveStatic,
    frontendUrl: config.frontendUrl,
  });
}
