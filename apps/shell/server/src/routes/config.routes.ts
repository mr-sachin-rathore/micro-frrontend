/**
 * Configuration Routes for Shell BFF
 * 
 * Provides runtime configuration to the frontend:
 * - GET /api/config - Get app configuration including Module Federation remote URLs
 * 
 * This allows the frontend to dynamically load remote apps based on environment.
 */

import { Router, Request, Response } from 'express';
import { config } from '../config/env';

const router = Router();

/**
 * GET /api/config
 * Get application configuration
 * 
 * Returns Module Federation remote URLs and other frontend configuration.
 * This enables dynamic remote loading based on environment.
 */
router.get('/', (req: Request, res: Response) => {
  console.log('[Shell BFF] GET /api/config');
  
  res.json({
    // Module Federation remote URLs
    remotes: {
      app1: config.app1RemoteUrl,
      app2: config.app2RemoteUrl,
    },
    
    // Environment info
    environment: config.nodeEnv,
    
    // Feature flags (can be loaded from DB or external service)
    features: {
      darkMode: true,
      notifications: true,
      analytics: config.nodeEnv === 'production',
    },
    
    // API endpoints for frontend to use
    api: {
      shell: config.nodeEnv === 'production' ? '' : 'http://localhost:4000',
      app1: config.nodeEnv === 'production' ? '' : 'http://localhost:4001',
      app2: config.nodeEnv === 'production' ? '' : 'http://localhost:4002',
    },
    
    // App version (can come from package.json or environment)
    version: process.env.APP_VERSION || '1.0.0',
    
    // Timestamp
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/config/remotes
 * Get only Module Federation remote URLs
 */
router.get('/remotes', (req: Request, res: Response) => {
  console.log('[Shell BFF] GET /api/config/remotes');
  
  res.json({
    app1: config.app1RemoteUrl,
    app2: config.app2RemoteUrl,
  });
});

/**
 * GET /api/config/features
 * Get feature flags
 */
router.get('/features', (req: Request, res: Response) => {
  console.log('[Shell BFF] GET /api/config/features');
  
  // In production, these would come from a feature flag service
  res.json({
    darkMode: true,
    notifications: true,
    analytics: config.nodeEnv === 'production',
    betaFeatures: false,
  });
});

export default router;

