/**
 * CORS Middleware Configuration
 *
 * Configures Cross-Origin Resource Sharing for the BFF server.
 * In development, allows requests from all frontend dev servers.
 * In production, allows same-origin and configured domains.
 */

import cors from "cors";
import { config } from "../config/env";

// Allowed origins for local development (Vite dev servers)
const localDevOrigins = [
  "http://localhost:5173", // Shell frontend (dev/preview)
  "http://localhost:5174", // App1 frontend (dev/preview)
  "http://localhost:5175", // App2 frontend (dev/preview)
];

// Allowed origins for Docker/production on localhost
const dockerOrigins = [
  "http://localhost:8084", // Shell BFF (serves frontend)
  "http://localhost:8085", // App1 BFF (serves frontend)
  "http://localhost:8086", // App2 BFF (serves frontend)
];

// Allowed origins for production deployment (update with your domains)
const prodDomains = ["https://app.example.com", "https://www.example.com"];

// Combine all allowed origins
const allowedOrigins = [...localDevOrigins, ...dockerOrigins, ...prodDomains];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (same-origin, mobile apps, curl, etc.)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`[CORS] Blocked request from origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["X-Total-Count", "X-Page", "X-Per-Page"],
  maxAge: 86400, // 24 hours
});
