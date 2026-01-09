/**
 * App2 BFF Server - Main Entry Point
 * 
 * Backend-for-Frontend server for the Settings application (App2).
 * Provides user settings, theme preferences, and notification management APIs.
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { config, validateConfig } from './config/env';
import settingsRoutes from './routes/settings.routes';

validateConfig();

const app = express();

// ============================================================================
// Middleware
// ============================================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: config.nodeEnv === 'production'
    ? ['https://app.example.com']
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true,
}));

// Request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[App2 BFF] ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// Health Check
// ============================================================================

app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'app2-bff',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// ============================================================================
// API Routes
// ============================================================================

app.use('/api/settings', settingsRoutes);

// ============================================================================
// Static File Serving (Production Only)
// ============================================================================

if (config.serveStatic) {
  // In Docker: /app/public, in dev: ../public relative to dist
  const publicPath = process.env.NODE_ENV === 'production' 
    ? path.resolve('/app/public')
    : path.join(__dirname, '../public');
  
  console.log('[App2 BFF] Serving static files from:', publicPath);
  console.log('[App2 BFF] Public path exists:', require('fs').existsSync(publicPath));
  
  app.use(express.static(publicPath));
  
  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/health')) {
      return next();
    }
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

// ============================================================================
// Error Handling
// ============================================================================

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[App2 BFF] Error:', err);
  res.status(500).json({
    error: true,
    message: err.message || 'Internal Server Error',
  });
});

// ============================================================================
// Start Server
// ============================================================================

const server = app.listen(config.port, () => {
  console.log(`
╔══════════════════════════════════════════════════════╗
║           App2 BFF Server (Settings)                 ║
╠══════════════════════════════════════════════════════╣
║  Port:          ${config.port}                                ║
║  Environment:   ${config.nodeEnv.padEnd(20)}         ║
║  Serve Static:  ${String(config.serveStatic).padEnd(20)}         ║
╠══════════════════════════════════════════════════════╣
║  API Endpoints:                                      ║
║    GET  /health               - Health check         ║
║    GET  /api/settings/user    - Get settings         ║
║    PUT  /api/settings/user    - Update settings      ║
║    PUT  /api/settings/theme   - Update theme         ║
╚══════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});

export default app;

