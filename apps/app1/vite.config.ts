/**
 * App1 (Dashboard) - Vite Configuration with Module Federation
 * 
 * This is a REMOTE application that exposes components to the shell host.
 * 
 * Module Federation Setup:
 * - This app runs on port 3001
 * - It exposes the './App' component for the shell to import
 * - Shared dependencies are configured as singletons to match the host
 * 
 * IMPORTANT: The 'exposes' configuration tells Module Federation which
 * modules this app makes available to other apps. The shell imports
 * 'app1/App' which maps to './App' exposed here.
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
      name: 'app1',
      filename: 'remoteEntry.js',
      // Modules this app exposes to other apps (use absolute path)
      exposes: {
        './App': path.resolve(__dirname, './src/App.tsx'),
      },
      // Shared dependencies - MUST match shell configuration!
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
    },
  },
  // Development server configuration
  server: {
    port: 3001,
    strictPort: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  // Preview server configuration
  preview: {
    port: 3001,
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
});
