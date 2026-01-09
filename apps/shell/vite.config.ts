/**
 * Shell App (Host) - Vite Configuration with Module Federation
 * 
 * This is the HOST application that loads remote micro-frontends.
 * 
 * Module Federation Setup:
 * - This app runs on port 5173 (dev) or 8084 (Docker)
 * - It imports App1 and App2 from their respective ports
 * - Remote URLs can be configured via environment variables for Docker
 * 
 * Environment Variables:
 * - VITE_APP1_REMOTE_URL: URL for App1 remoteEntry.js
 * - VITE_APP2_REMOTE_URL: URL for App2 remoteEntry.js
 */

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  // Load env from .env files
  const envFile = loadEnv(mode, path.resolve(__dirname, '../..'), '');
  
  // Remote URLs - check process.env first (Docker), then .env files, then defaults
  // Priority: process.env > .env files > defaults
  const app1RemoteUrl = 
    process.env.VITE_APP1_REMOTE_URL || 
    envFile.VITE_APP1_REMOTE_URL || 
    'http://localhost:5174/assets/remoteEntry.js';
  const app2RemoteUrl = 
    process.env.VITE_APP2_REMOTE_URL || 
    envFile.VITE_APP2_REMOTE_URL || 
    'http://localhost:5175/assets/remoteEntry.js';
  
  console.log('[Shell Vite Config] Mode:', mode);
  console.log('[Shell Vite Config] App1 Remote:', app1RemoteUrl);
  console.log('[Shell Vite Config] App2 Remote:', app2RemoteUrl);
  console.log('[Shell Vite Config] Source: process.env =', !!process.env.VITE_APP1_REMOTE_URL);

  return {
    // Set the root to this app's directory
    root: __dirname,
    plugins: [
      react(),
      federation({
        name: 'shell',
        // Remote applications that this host will load
        remotes: {
          // App1 - Dashboard application
          app1: app1RemoteUrl,
          // App2 - Settings application
          app2: app2RemoteUrl,
        },
        // Shared dependencies - CRITICAL for state sharing!
        shared: {
          react: {
            singleton: true,
            requiredVersion: '^18.2.0',
          },
          'react-dom': {
            singleton: true,
            requiredVersion: '^18.2.0',
          },
          'react-router-dom': {
            singleton: true,
            requiredVersion: '^6.20.0',
          },
          '@reduxjs/toolkit': {
            singleton: true,
            requiredVersion: '^2.0.1',
          },
          'react-redux': {
            singleton: true,
            requiredVersion: '^9.0.4',
          },
        },
      }),
    ],
    // Path aliases - must match tsconfig.base.json
    resolve: {
      alias: {
        '@shared/types': path.resolve(__dirname, '../../libs/shared-types/src/index.ts'),
        '@shared/store': path.resolve(__dirname, '../../libs/shared-store/src/index.ts'),
        '@shared/ui': path.resolve(__dirname, '../../libs/shared-ui/src/index.ts'),
        '@shared/api-client': path.resolve(__dirname, '../../libs/shared-api-client/src/index.ts'),
      },
    },
    // Development server configuration
    server: {
      port: 5173,
      strictPort: true,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
    },
    // Preview server configuration (for production builds)
    preview: {
      port: 5173,
      strictPort: true,
      cors: true,
    },
    // Build configuration
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
  };
});
