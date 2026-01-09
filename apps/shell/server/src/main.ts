/**
 * Shell BFF Server - Main Entry Point
 * 
 * This is the Backend-for-Frontend server for the Shell application.
 * 
 * DEVELOPMENT MODE:
 * - Runs on port 4000
 * - Serves only API routes
 * - Frontend runs separately on Vite dev server (port 3000)
 * - CORS enabled for localhost:3000-3002
 * 
 * PRODUCTION MODE:
 * - Runs on port 4000
 * - Serves API routes
 * - Serves static frontend files from /public
 * - SPA fallback for client-side routing
 */

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { config, validateConfig } from './config/env';
import { corsMiddleware } from './middleware/cors';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes';
import configRoutes from './routes/config.routes';

// Validate configuration on startup
validateConfig();

const app = express();

// ============================================================================
// Core Middleware
// ============================================================================

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(corsMiddleware);

// Request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [Shell BFF] ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// Health Check
// ============================================================================

app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'shell-bff',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ============================================================================
// API Routes
// ============================================================================

// Authentication routes
app.use('/api/auth', authRoutes);

// Configuration routes
app.use('/api/config', configRoutes);

// ============================================================================
// Static File Serving (Production Only)
// ============================================================================

if (config.serveStatic) {
  console.log('[Shell BFF] Static file serving ENABLED');
  
  // In Docker: /app/public, in dev: ../public relative to dist
  const publicPath = process.env.NODE_ENV === 'production' 
    ? path.resolve('/app/public')
    : path.join(__dirname, '../public');
  
  console.log('[Shell BFF] Serving static files from:', publicPath);
  console.log('[Shell BFF] Public path exists:', require('fs').existsSync(publicPath));
  
  // Serve static assets with cache headers
  app.use(express.static(publicPath, {
    maxAge: config.nodeEnv === 'production' ? '1y' : 0,
    etag: true,
  }));
  
  // SPA fallback - serve index.html for all non-API routes
  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    // Skip API routes
    if (req.path.startsWith('/api/') || req.path.startsWith('/health')) {
      return next();
    }
    
    res.sendFile(path.join(publicPath, 'index.html'));
  });
} else {
  console.log('[Shell BFF] Static file serving DISABLED (development mode)');
}

// ============================================================================
// Error Handling
// ============================================================================

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// ============================================================================
// Start Server
// ============================================================================

const server = app.listen(config.port, () => {
  console.log(`
╔══════════════════════════════════════════════════════╗
║           Shell BFF Server Running                   ║
╠══════════════════════════════════════════════════════╣
║  Port:          ${config.port}                                ║
║  Environment:   ${config.nodeEnv.padEnd(20)}         ║
║  Serve Static:  ${String(config.serveStatic).padEnd(20)}         ║
║  Frontend URL:  ${config.frontendUrl.substring(0, 20).padEnd(20)} ║
╠══════════════════════════════════════════════════════╣
║  API Endpoints:                                      ║
║    GET  /health           - Health check             ║
║    GET  /api/auth/me      - Get current user         ║
║    POST /api/auth/login   - Login                    ║
║    POST /api/auth/logout  - Logout                   ║
║    GET  /api/config       - Get app config           ║
╚══════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Shell BFF] SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('[Shell BFF] Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('[Shell BFF] SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('[Shell BFF] Server closed');
    process.exit(0);
  });
});

export default app;

