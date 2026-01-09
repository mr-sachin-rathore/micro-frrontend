/**
 * Shell App (Host) - Vite Configuration with Module Federation
 * 
 * This is the HOST application that loads remote micro-frontends.
 * 
 * Module Federation Setup:
 * - This app runs on port 5173
 * - It imports App1 from port 5174 and App2 from port 5175
 * - Shared dependencies (React, Redux) are configured as singletons
 *   to ensure all apps share the same instance
 * 
 * Key Configuration Notes:
 * - `modulePreload: false` is required for Module Federation to work properly
 * - CORS headers are added for development to allow cross-origin loading
 * - Shared dependencies with singleton:true ensure single Redux store instance
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // Set the root to this app's directory
  root: __dirname,
  plugins: [
    react(),
    federation({
      name: 'shell',
      // Remote applications that this host will load
      remotes: {
        // App1 - Dashboard application
        app1: 'http://localhost:5174/assets/remoteEntry.js',
        // App2 - Settings application
        app2: 'http://localhost:5175/assets/remoteEntry.js',
      },
      // Shared dependencies - CRITICAL for state sharing!
      // All dependencies listed here will be shared across host and remotes
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
    // Required for Module Federation
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
