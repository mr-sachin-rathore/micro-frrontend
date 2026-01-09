/**
 * App1 BFF Server - Main Entry Point
 *
 * Backend-for-Frontend server for the Dashboard application (App1).
 * Provides dashboard data, user management, and analytics APIs.
 */

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import { config, validateConfig } from "./config/env";
import dashboardRoutes from "./routes/dashboard.routes";
import userRoutes from "./routes/user.routes";

validateConfig();

const app = express();

// ============================================================================
// Middleware
// ============================================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
  cors({
    origin:
      config.nodeEnv === "production"
        ? ["https://app.example.com"]
        : [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
          ],
    credentials: true,
  })
);

// Request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[App1 BFF] ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// Health Check
// ============================================================================

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "app1-bff",
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// ============================================================================
// API Routes
// ============================================================================

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/user", userRoutes);

// ============================================================================
// Static File Serving (Production Only)
// ============================================================================

if (config.serveStatic) {
  // In Docker: /app/public, in dev: ../public relative to dist
  const publicPath =
    process.env.NODE_ENV === "production"
      ? path.resolve("/app/public")
      : path.join(__dirname, "../public");

  console.log("[App1 BFF] Serving static files from:", publicPath);
  console.log(
    "[App1 BFF] Public path exists:",
    require("fs").existsSync(publicPath)
  );

  app.use(express.static(publicPath));

  app.get("*", (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
      return next();
    }
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

// ============================================================================
// Error Handling
// ============================================================================

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[App1 BFF] Error:", err);
  res.status(500).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
});

// ============================================================================
// Start Server
// ============================================================================

const server = app.listen(config.port, () => {
  console.log(`
╔══════════════════════════════════════════════════════╗
║           App1 BFF Server (Dashboard)                ║
╠══════════════════════════════════════════════════════╣
║  Port:          ${config.port}                                ║
║  Environment:   ${config.nodeEnv.padEnd(20)}         ║
║  Serve Static:  ${String(config.serveStatic).padEnd(20)}         ║
╠══════════════════════════════════════════════════════╣
║  API Endpoints:                                      ║
║    GET  /health              - Health check          ║
║    GET  /api/dashboard/stats - Dashboard stats       ║
║    GET  /api/dashboard/charts - Chart data           ║
║    PUT  /api/user/profile    - Update profile        ║
║    PUT  /api/user/role       - Update role           ║
╚══════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});

export default app;
