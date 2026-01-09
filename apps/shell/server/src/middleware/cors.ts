/**
 * CORS Middleware Configuration
 *
 * Configures Cross-Origin Resource Sharing for the BFF server.
 * In development, allows requests from all frontend dev servers.
 * In production, restricts to specific allowed domains.
 */

import cors from "cors";
import { config } from "../config/env";

// Allowed origins for development
const devOrigins = [
  "http://localhost:5173", // Shell frontend
  "http://localhost:5174", // App1 frontend
  "http://localhost:5175", // App2 frontend
];

// Allowed origins for production (update with your domains)
const prodOrigins = ["https://app.example.com", "https://www.example.com"];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) {
      return callback(null, true);
    }

    const allowedOrigins =
      config.nodeEnv === "production" ? prodOrigins : devOrigins;

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
