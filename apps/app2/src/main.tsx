/**
 * App2 Entry Point (Standalone Development)
 * 
 * This file is only used when running App2 in standalone mode.
 * When loaded via Module Federation in the Shell, this file is NOT used.
 * Instead, the Shell imports './App' directly.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@shared/store';
import App from './App';
import './styles.css';

console.log('[app2/main] 🚀 App2 starting in standalone mode...');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
          <App />
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

