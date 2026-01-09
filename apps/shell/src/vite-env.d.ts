/// <reference types="vite/client" />

/**
 * TypeScript declarations for remote micro-frontend apps
 * 
 * These declarations tell TypeScript about the shape of modules
 * loaded via Module Federation. Without these, TypeScript would
 * error when importing from 'app1/App' or 'app2/App'.
 */

// Declare the App1 remote module (Dashboard)
declare module 'app1/App' {
  import { ComponentType } from 'react';
  const App: ComponentType;
  export default App;
}

// Declare the App2 remote module (Settings)
declare module 'app2/App' {
  import { ComponentType } from 'react';
  const App: ComponentType;
  export default App;
}

/**
 * Environment variables available in Vite
 */
interface ImportMetaEnv {
  readonly VITE_APP1_URL: string;
  readonly VITE_APP2_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

