/**
 * Shell App Entry Point
 * 
 * This is the main entry point for the host application.
 * It sets up:
 * - Redux Provider with the shared store
 * - React Router for navigation
 * - CSS imports for Tailwind
 * 
 * IMPORTANT: The store imported here is a SINGLETON!
 * When Module Federation loads this module in remote apps,
 * they get the same store instance, enabling cross-app state sharing.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@shared/store';
import App from './App';
import './styles.css';

// Log store initialization for debugging
console.log('[shell/main] 🚀 Shell app starting...');
console.log('[shell/main] 🏪 Redux store initialized:', store.getState());

// Apply initial theme based on stored preference
const initialTheme = store.getState().theme.mode;
if (initialTheme === 'dark') {
  document.documentElement.classList.add('dark');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

