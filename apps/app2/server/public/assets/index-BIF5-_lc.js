import { importShared } from './__federation_fn_import-ErdLqFhe.js';
import App, { j as jsxRuntimeExports, s as store } from './__federation_expose_App-Dbagh4mu.js';
import { r as reactDomExports } from './index-COvqqES_.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const React = await importShared('react');
const {Provider} = await importShared('react-redux');

const {BrowserRouter} = await importShared('react-router-dom');
console.log("[app2/main] 🚀 App2 starting in standalone mode...");
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Provider, { store, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) }) }) })
);
