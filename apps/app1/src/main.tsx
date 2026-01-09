/**
 * App1 Entry Point (Standalone Development)
 * 
 * This file is only used when running App1 in standalone mode.
 * When loaded via Module Federation in the Shell, this file is NOT used.
 * Instead, the Shell imports './App' directly.
 * 
 * This allows developers to run and test App1 independently.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@shared/store';
import App from './App';
import './styles.css';

console.log('[app1/main] 🚀 App1 starting in standalone mode...');

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

