import { i as importShared } from './_virtual___federation_fn_import-CZsd2GKP.js';
import { r as reactExports } from './index-Dm_EQZZA.js';
import { r as reactDomExports } from './index-COvqqES_.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m$1=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m$1.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const {createSlice: createSlice$2,createAsyncThunk} = await importShared('@reduxjs/toolkit');

const initialState$2 = {
  id: "",
  name: "Guest User",
  email: "",
  role: "guest",
  isAuthenticated: false,
  avatar: void 0
};
const loginUser = createAsyncThunk("user/login", async (credentials, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = {
      id: "user-" + Date.now(),
      name: credentials.email.split("@")[0],
      email: credentials.email,
      role: "user",
      isAuthenticated: true,
      avatar: `https://ui-avatars.com/api/?name=${credentials.email.split("@")[0]}&background=0ea5e9&color=fff`
    };
    console.log("[shared-store] 🔐 User logged in:", user.name);
    return user;
  } catch (error) {
    return rejectWithValue("Login failed");
  }
});
const updateUserAsync = createAsyncThunk("user/updateAsync", async ({ payload, source }, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(`[shared-store] 📝 User updated from ${source}:`, payload);
    return payload;
  } catch (error) {
    return rejectWithValue("Update failed");
  }
});
const userSlice = createSlice$2({
  name: "user",
  initialState: initialState$2,
  reducers: {
    /**
     * Synchronously update user information
     * Use this for immediate UI updates
     */
    updateUser: (state, action) => {
      console.log("[shared-store] 👤 updateUser action dispatched:", action.payload);
      if (action.payload.name !== void 0) {
        state.name = action.payload.name;
      }
      if (action.payload.email !== void 0) {
        state.email = action.payload.email;
      }
      if (action.payload.role !== void 0) {
        state.role = action.payload.role;
      }
      if (action.payload.avatar !== void 0) {
        state.avatar = action.payload.avatar;
      }
    },
    /**
     * Set the entire user object (used for login/session restore)
     */
    setUser: (state, action) => {
      console.log("[shared-store] 👤 setUser action dispatched:", action.payload.name);
      return action.payload;
    },
    /**
     * Update user role
     */
    setUserRole: (state, action) => {
      console.log("[shared-store] 🎭 User role changed to:", action.payload);
      state.role = action.payload;
    },
    /**
     * Log out the user
     */
    logout: (state) => {
      console.log("[shared-store] 🚪 User logged out");
      return initialState$2;
    },
    /**
     * Set authentication status
     */
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return action.payload;
    }).addCase(loginUser.rejected, (state, action) => {
      console.error("[shared-store] ❌ Login failed:", action.payload);
    }).addCase(updateUserAsync.fulfilled, (state, action) => {
      if (action.payload.name !== void 0) {
        state.name = action.payload.name;
      }
      if (action.payload.email !== void 0) {
        state.email = action.payload.email;
      }
      if (action.payload.role !== void 0) {
        state.role = action.payload.role;
      }
      if (action.payload.avatar !== void 0) {
        state.avatar = action.payload.avatar;
      }
    });
  }
});
const { updateUser, setUser, setUserRole, logout, setAuthenticated } = userSlice.actions;
const userReducer = userSlice.reducer;

const {createSlice: createSlice$1} = await importShared('@reduxjs/toolkit');

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }
  return "light";
};
const initialState$1 = {
  mode: getInitialTheme()
};
const themeSlice = createSlice$1({
  name: "theme",
  initialState: initialState$1,
  reducers: {
    /**
     * Set theme mode to a specific value
     */
    setTheme: (state, action) => {
      console.log("[shared-store] 🎨 Theme changed to:", action.payload);
      state.mode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
        if (action.payload === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },
    /**
     * Toggle between light and dark mode
     */
    toggleTheme: (state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      console.log("[shared-store] 🔄 Theme toggled to:", newMode);
      state.mode = newMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newMode);
        if (newMode === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },
    /**
     * Set theme with source tracking (for debugging)
     * Shows which app dispatched the theme change
     */
    setThemeWithSource: (state, action) => {
      const { mode, source } = action.payload;
      console.log(`[shared-store] 🎨 Theme changed to ${mode} by ${source}`);
      state.mode = mode;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", mode);
        if (mode === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    }
  }
});
const { setTheme, toggleTheme, setThemeWithSource } = themeSlice.actions;
const themeReducer = themeSlice.reducer;

const {createSlice} = await importShared('@reduxjs/toolkit');

const initialState = {
  currentApp: "shell",
  breadcrumbs: [{ label: "Home", path: "/" }],
  isSidebarCollapsed: false
};
const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    /**
     * Set the current active app
     * Called when navigating between micro-frontends
     */
    setCurrentApp: (state, action) => {
      console.log("[shared-store] 🧭 Current app changed to:", action.payload);
      state.currentApp = action.payload;
    },
    /**
     * Set the breadcrumb trail
     * Each app updates breadcrumbs based on current route
     */
    setBreadcrumbs: (state, action) => {
      console.log("[shared-store] 🍞 Breadcrumbs updated:", action.payload);
      state.breadcrumbs = action.payload;
    },
    /**
     * Add a breadcrumb to the end of the trail
     */
    addBreadcrumb: (state, action) => {
      console.log("[shared-store] ➕ Breadcrumb added:", action.payload);
      state.breadcrumbs.push(action.payload);
    },
    /**
     * Remove the last breadcrumb (for back navigation)
     */
    popBreadcrumb: (state) => {
      if (state.breadcrumbs.length > 1) {
        const removed = state.breadcrumbs.pop();
        console.log("[shared-store] ➖ Breadcrumb removed:", removed);
      }
    },
    /**
     * Reset breadcrumbs to home
     */
    resetBreadcrumbs: (state) => {
      console.log("[shared-store] 🔄 Breadcrumbs reset to home");
      state.breadcrumbs = [{ label: "Home", path: "/" }];
    },
    /**
     * Toggle sidebar collapsed state
     */
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
      console.log("[shared-store] 📐 Sidebar collapsed:", state.isSidebarCollapsed);
    },
    /**
     * Set sidebar collapsed state
     */
    setSidebarCollapsed: (state, action) => {
      state.isSidebarCollapsed = action.payload;
      console.log("[shared-store] 📐 Sidebar collapsed set to:", action.payload);
    },
    /**
     * Combined action to update all navigation state at once
     * Useful when entering a new app/route
     */
    navigateTo: (state, action) => {
      const { app, breadcrumbs } = action.payload;
      console.log(`[shared-store] 🚀 Navigating to ${app}:`, breadcrumbs);
      state.currentApp = app;
      state.breadcrumbs = breadcrumbs;
    }
  }
});
const {
  setCurrentApp,
  setBreadcrumbs,
  addBreadcrumb,
  popBreadcrumb,
  resetBreadcrumbs,
  toggleSidebar,
  setSidebarCollapsed,
  navigateTo
} = navigationSlice.actions;
const navigationReducer = navigationSlice.reducer;

const {configureStore,combineReducers} = await importShared('@reduxjs/toolkit');
const STORAGE_KEYS = {
  USER: "mf_user_state",
  THEME: "mf_theme_state"
};
const loadPersistedState = () => {
  try {
    if (typeof window === "undefined") {
      return {};
    }
    const persistedState = {};
    const userState = localStorage.getItem(STORAGE_KEYS.USER);
    if (userState) {
      persistedState.user = JSON.parse(userState);
      console.log("[shared-store] 📂 Loaded user state from localStorage");
    }
    const themeState = localStorage.getItem(STORAGE_KEYS.THEME);
    if (themeState) {
      persistedState.theme = JSON.parse(themeState);
      console.log("[shared-store] 📂 Loaded theme state from localStorage");
    }
    return persistedState;
  } catch (error) {
    console.error("[shared-store] ❌ Error loading persisted state:", error);
    return {};
  }
};
const persistenceMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  try {
    const state = storeAPI.getState();
    if (action.type.startsWith("user/")) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.user));
    }
    if (action.type.startsWith("theme/")) {
      localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(state.theme));
    }
  } catch (error) {
    console.error("[shared-store] ❌ Error persisting state:", error);
  }
  return result;
};
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  navigation: navigationReducer
});
let store = null;
function createStore() {
  const persistedState = loadPersistedState();
  return configureStore({
    reducer: rootReducer,
    preloadedState: persistedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
      }
    }).concat(persistenceMiddleware),
    devTools: {
      name: "MicroFrontend Store",
      trace: true,
      traceLimit: 25
    }
  });
}
function getStore() {
  if (!store) {
    store = createStore();
    console.log("[shared-store] 🏪 Redux store created");
    const state = store.getState();
    if (typeof document !== "undefined") {
      if (state.theme.mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }
  return store;
}
const store$1 = getStore();

const {useDispatch,useSelector} = await importShared('react-redux');

const useAppDispatch = () => useDispatch();
const useAppSelector = useSelector;

const remotesMap = {
'app1':{url:'http://localhost:3001/assets/remoteEntry.js',format:'esm',from:'vite'},
  'app2':{url:'http://localhost:3002/assets/remoteEntry.js',format:'esm',from:'vite'}
};
                const currentImports = {};
                const loadJS = async (url, fn) => {
                    const resolvedUrl = typeof url === 'function' ? await url() : url;
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.onload = fn;
                    script.src = resolvedUrl;
                    document.getElementsByTagName('head')[0].appendChild(script);
                };

                function get(name, remoteFrom) {
                    return __federation_import(name).then(module => () => {
                        if (remoteFrom === 'webpack') {
                            return Object.prototype.toString.call(module).indexOf('Module') > -1 && module.default ? module.default : module
                        }
                        return module
                    })
                }
                
                function merge(obj1, obj2) {
                  const mergedObj = Object.assign(obj1, obj2);
                  for (const key of Object.keys(mergedObj)) {
                    if (typeof mergedObj[key] === 'object' && typeof obj2[key] === 'object') {
                      mergedObj[key] = merge(mergedObj[key], obj2[key]);
                    }
                  }
                  return mergedObj;
                }

                const wrapShareModule = remoteFrom => {
                  return merge({
                    'react':{'18.3.1':{get:()=>get(new URL('__federation_shared_react-BCcI129A.js', import.meta.url).href, remoteFrom), loaded:1}},'react-dom':{'18.3.1':{get:()=>get(new URL('__federation_shared_react-dom-BN8Au471.js', import.meta.url).href, remoteFrom), loaded:1}},'react-router-dom':{'6.30.3':{get:()=>get(new URL('__federation_shared_react-router-dom-D29S2ieJ.js', import.meta.url).href, remoteFrom), loaded:1}},'@reduxjs/toolkit':{'2.11.2':{get:()=>get(new URL('__federation_shared_@reduxjs/toolkit-BonTQMCh.js', import.meta.url).href, remoteFrom), loaded:1}},'react-redux':{'9.2.0':{get:()=>get(new URL('__federation_shared_react-redux-BpXEdWnK.js', import.meta.url).href, remoteFrom), loaded:1}}
                  }, (globalThis.__federation_shared__ || {})['default'] || {});
                };

                async function __federation_import(name) {
                    currentImports[name] ??= import(name);
                    return currentImports[name]
                }

                async function __federation_method_ensure(remoteId) {
                    const remote = remotesMap[remoteId];
                    if (!remote.inited) {
                        if ('var' === remote.format) {
                            // loading js with script tag
                            return new Promise(resolve => {
                                const callback = () => {
                                    if (!remote.inited) {
                                        remote.lib = window[remoteId];
                                        remote.lib.init(wrapShareModule(remote.from));
                                        remote.inited = true;
                                    }
                                    resolve(remote.lib);
                                };
                                return loadJS(remote.url, callback);
                            });
                        } else if (['esm', 'systemjs'].includes(remote.format)) {
                            // loading js with import(...)
                            return new Promise((resolve, reject) => {
                                const getUrl = typeof remote.url === 'function' ? remote.url : () => Promise.resolve(remote.url);
                                getUrl().then(url => {
                                    import(/* @vite-ignore */ url).then(lib => {
                                        if (!remote.inited) {
                                            const shareScope = wrapShareModule(remote.from);
                                            lib.init(shareScope);
                                            remote.lib = lib;
                                            remote.lib.init(shareScope);
                                            remote.inited = true;
                                        }
                                        resolve(remote.lib);
                                    }).catch(reject);
                                });
                            })
                        }
                    } else {
                        return remote.lib;
                    }
                }

                function __federation_method_wrapDefault(module, need) {
                    if (!module?.default && need) {
                        let obj = Object.create(null);
                        obj.default = module;
                        obj.__esModule = true;
                        return obj;
                    }
                    return module;
                }

                function __federation_method_getRemote(remoteName, componentName) {
                    return __federation_method_ensure(remoteName).then((remote) => remote.get(componentName).then(factory => factory()));
                }

const React$1 = await importShared('react');
const Header = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const theme = useAppSelector((state) => state.theme);
  const navigation = useAppSelector((state) => state.navigation);
  const handleThemeToggle = () => {
    console.log("[shared-ui/Header] 🎨 Theme toggle clicked");
    dispatch(toggleTheme());
  };
  const handleLogout = () => {
    console.log("[shared-ui/Header] 🚪 Logout clicked");
    dispatch(logout());
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `
        sticky top-0 z-50
        h-16 px-6
        bg-white dark:bg-gray-900
        border-b border-gray-200 dark:border-gray-700
        flex items-center justify-between
        shadow-sm
        transition-colors duration-200
        ${className}
      `,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                className: "w-5 h-5 text-white",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent", children: "MicroFrontend" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-2 text-sm", children: navigation.breadcrumbs.map((crumb, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React$1.Fragment, { children: [
            index > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 dark:text-gray-500", children: "/" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `
                  ${index === navigation.breadcrumbs.length - 1 ? "text-gray-900 dark:text-white font-medium" : "text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer"}
                `,
                children: crumb.label
              }
            )
          ] }, crumb.path)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Current:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300", children: navigation.currentApp })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleThemeToggle,
              className: "\n            p-2 rounded-lg\n            bg-gray-100 dark:bg-gray-800\n            hover:bg-gray-200 dark:hover:bg-gray-700\n            text-gray-600 dark:text-gray-300\n            transition-colors duration-200\n            focus:outline-none focus:ring-2 focus:ring-primary-500\n          ",
              title: `Switch to ${theme.mode === "light" ? "dark" : "light"} mode`,
              children: theme.mode === "light" ? /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                }
              ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                }
              ) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: user.isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              user.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: user.avatar,
                  alt: user.name,
                  className: "w-9 h-9 rounded-full border-2 border-primary-500"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-medium text-sm", children: user.name.charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white", children: user.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 capitalize", children: user.role })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleLogout,
                className: "\n                  ml-2 p-2 rounded-lg\n                  text-gray-500 dark:text-gray-400\n                  hover:text-red-600 dark:hover:text-red-400\n                  hover:bg-red-50 dark:hover:bg-red-900/20\n                  transition-colors duration-200\n                  focus:outline-none focus:ring-2 focus:ring-red-500\n                ",
                title: "Logout",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  }
                ) })
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Not logged in" }) })
        ] })
      ]
    }
  );
};

const {useLocation,useNavigate: useNavigate$1} = await importShared('react-router-dom');
const menuItems = [
  {
    id: "home",
    label: "Home",
    path: "/",
    icon: "home"
  },
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/app1",
    icon: "dashboard",
    requiredRole: ["user", "admin"]
  },
  {
    id: "settings",
    label: "Settings",
    path: "/app2",
    icon: "settings",
    requiredRole: ["user", "admin"]
  },
  {
    id: "admin",
    label: "Admin Panel",
    path: "/admin",
    icon: "admin",
    requiredRole: ["admin"]
  }
];
const icons = {
  home: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) }),
  dashboard: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }),
  settings: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
  ] }),
  admin: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) })
};
const hasRequiredRole = (item, userRole) => {
  if (!item.requiredRole) return true;
  return item.requiredRole.includes(userRole);
};
const LeftNavigation = ({
  className = "",
  collapsed: controlledCollapsed,
  onToggleCollapse
}) => {
  const location = useLocation();
  const navigate = useNavigate$1();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const navigation = useAppSelector((state) => state.navigation);
  const isCollapsed = controlledCollapsed ?? navigation.isSidebarCollapsed;
  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      dispatch(toggleSidebar());
    }
  };
  const handleNavigate = (path) => {
    console.log("[shared-ui/LeftNavigation] 🧭 Navigating to:", path);
    navigate(path);
  };
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };
  const visibleItems = menuItems.filter((item) => hasRequiredRole(item, user.role));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "aside",
    {
      className: `
        ${isCollapsed ? "w-20" : "w-64"}
        h-[calc(100vh-4rem)]
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-700
        flex flex-col
        transition-all duration-300 ease-in-out
        ${className}
      `,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleToggleCollapse,
            className: "\n            w-full p-2 rounded-lg\n            bg-gray-100 dark:bg-gray-800\n            hover:bg-gray-200 dark:hover:bg-gray-700\n            text-gray-600 dark:text-gray-300\n            transition-colors duration-200\n            flex items-center justify-center\n          ",
            title: isCollapsed ? "Expand sidebar" : "Collapse sidebar",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                className: `w-5 h-5 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`,
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 19l-7-7 7-7m8 14l-7-7 7-7" })
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 p-4 space-y-2 overflow-y-auto", children: visibleItems.map((item) => {
          const active = isActive(item.path);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => handleNavigate(item.path),
              className: `
                w-full p-3 rounded-xl
                flex items-center gap-3
                transition-all duration-200
                group
                ${active ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}
              `,
              title: isCollapsed ? item.label : void 0,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex-shrink-0 ${active ? "text-white" : "text-gray-500 dark:text-gray-400 group-hover:text-primary-500"}`, children: icons[item.icon || "home"] }),
                !isCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate animate-fade-in", children: item.label }),
                active && !isCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", clipRule: "evenodd" }) }) })
              ]
            },
            item.id
          );
        }) }),
        !isCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white font-bold", children: user.name.charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white truncate", children: user.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 truncate", children: user.email || "No email" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 text-xs font-medium rounded-full bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 capitalize", children: user.role }),
            user.isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300", children: "Online" })
          ] })
        ] }) })
      ]
    }
  );
};

const {Component} = await importShared('react');

class RemoteAppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.handleRetry = () => {
      this.setState({ hasError: false, error: null });
      window.location.reload();
    };
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error(`[ErrorBoundary] ❌ Error in ${this.props.appName}:`, error);
    console.error("[ErrorBoundary] Component stack:", errorInfo.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] p-8 animate-fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            className: "w-10 h-10 text-red-500 dark:text-red-400",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-2", children: [
          "Failed to Load ",
          this.props.appName
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 text-center max-w-md mb-4", children: "The micro-frontend application could not be loaded. This might be because the remote app is not running or there was a network error." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-md p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-red-600 dark:text-red-400 break-all", children: this.state.error?.message || "Unknown error occurred" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2", children: "Troubleshooting:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-gray-600 dark:text-gray-400 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary-500" }),
              "Make sure the remote app server is running"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary-500" }),
              "Check the browser console for detailed errors"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary-500" }),
              "Verify the remote app URL is correct"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: this.handleRetry,
            className: "\n              px-6 py-3 rounded-xl\n              bg-gradient-to-r from-primary-500 to-primary-600\n              text-white font-medium\n              shadow-lg shadow-primary-500/30\n              hover:shadow-xl hover:shadow-primary-500/40\n              transition-all duration-200\n              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2\n            ",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                }
              ) }),
              "Retry Loading"
            ] })
          }
        )
      ] });
    }
    return this.props.children;
  }
}

const sizeClasses = {
  small: "w-6 h-6",
  medium: "w-10 h-10",
  large: "w-16 h-16"
};
const LoadingSpinner = ({
  size = "medium",
  className = ""
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative ${sizeClasses[size]} ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `
          absolute inset-0
          rounded-full
          border-4 border-gray-200 dark:border-gray-700
        `
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `
          absolute inset-0
          rounded-full
          border-4 border-transparent
          border-t-primary-500 border-r-primary-500
          animate-spin
        `
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `
          absolute inset-2
          rounded-full
          bg-gradient-to-br from-primary-400/20 to-accent-400/20
          animate-pulse
        `
      }
    )
  ] });
};

const {useNavigate} = await importShared('react-router-dom');
const WelcomePage = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const theme = useAppSelector((state) => state.theme);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl font-bold text-gray-900 dark:text-white mb-4", children: [
        "Welcome to",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent", children: "MicroFrontend" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300", children: "A modern micro-frontend architecture with Module Federation and shared Redux state" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-primary-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        "Current Redux State"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-gray-50 dark:bg-gray-800 rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 mb-2", children: "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-900 dark:text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "Name:" }),
              " ",
              user.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-900 dark:text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "Email:" }),
              " ",
              user.email
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-900 dark:text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "Role:" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 capitalize", children: user.role })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-gray-50 dark:bg-gray-800 rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 mb-2", children: "Theme" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `
                w-12 h-12 rounded-xl flex items-center justify-center
                ${theme.mode === "dark" ? "bg-gray-700" : "bg-yellow-100"}
              `, children: theme.mode === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-blue-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-yellow-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-medium text-gray-900 dark:text-white capitalize", children: [
                theme.mode,
                " Mode"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Toggle in header or App2" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => navigate("/app1"),
          className: "\n            group p-6 rounded-2xl\n            bg-gradient-to-br from-primary-500 to-primary-600\n            text-white text-left\n            shadow-xl shadow-primary-500/30\n            hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1\n            transition-all duration-300\n            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2\n          ",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-7 h-7", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: "Dashboard (App1)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm", children: "View stats, update user profile, and see Redux state in action" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-xs text-white/60", children: "Port 3001 • Remote Micro-Frontend" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => navigate("/app2"),
          className: "\n            group p-6 rounded-2xl\n            bg-gradient-to-br from-accent-500 to-accent-600\n            text-white text-left\n            shadow-xl shadow-accent-500/30\n            hover:shadow-2xl hover:shadow-accent-500/40 hover:-translate-y-1\n            transition-all duration-300\n            focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2\n          ",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-7 h-7", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: "Settings (App2)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm", children: "Update user settings, change theme, and see instant state sync" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-xs text-white/60", children: "Port 3002 • Remote Micro-Frontend" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-accent-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }) }),
        "Try This!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-gray-600 dark:text-gray-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-500 mt-1", children: "•" }),
          'Navigate to App1 and click "Update Profile" - watch the Header update!'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-500 mt-1", children: "•" }),
          "Go to App2 and change the theme - see all apps update instantly!"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-500 mt-1", children: "•" }),
          "Open Redux DevTools to see actions flowing between apps"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-500 mt-1", children: "•" }),
          "Notice navigation has NO page reload - it's a true SPA!"
        ] })
      ] })
    ] })
  ] });
};

const {Suspense,lazy,useEffect} = await importShared('react');

const {Routes,Route,Navigate} = await importShared('react-router-dom');
const App1 = lazy(() => __federation_method_getRemote("app1" , "./App").then(module=>__federation_method_wrapDefault(module, true)));
const App2 = lazy(() => __federation_method_getRemote("app2" , "./App").then(module=>__federation_method_wrapDefault(module, true)));
const RemoteAppLoading = ({ appName }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full min-h-[400px] animate-fade-in", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "large" }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-gray-600 dark:text-gray-300 text-lg", children: [
    "Loading ",
    appName,
    "..."
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-gray-400 dark:text-gray-500 text-sm", children: "Fetching micro-frontend assets" })
] });
const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const theme = useAppSelector((state) => state.theme);
  useEffect(() => {
    console.log("[shell/App] 🎬 Shell app mounted");
    if (!user.isAuthenticated) {
      console.log("[shell/App] 👤 Setting up demo user...");
      dispatch(
        setUser({
          id: "demo-user-1",
          name: "John Doe",
          email: "john.doe@example.com",
          role: "admin",
          isAuthenticated: true,
          avatar: "https://ui-avatars.com/api/?name=John+Doe&background=0ea5e9&color=fff"
        })
      );
    }
  }, [dispatch, user.isAuthenticated]);
  useEffect(() => {
    if (theme.mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    console.log("[shell/App] 🎨 Theme applied:", theme.mode);
  }, [theme.mode]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LeftNavigation, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-6 overflow-auto h-[calc(100vh-4rem)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(WelcomePage, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Route,
          {
            path: "/app1/*",
            element: /* @__PURE__ */ jsxRuntimeExports.jsx(RemoteAppErrorBoundary, { appName: "Dashboard (App1)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(RemoteAppLoading, { appName: "Dashboard" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(App1, {}) }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Route,
          {
            path: "/app2/*",
            element: /* @__PURE__ */ jsxRuntimeExports.jsx(RemoteAppErrorBoundary, { appName: "Settings (App2)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(RemoteAppLoading, { appName: "Settings" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(App2, {}) }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true }) })
      ] }) })
    ] })
  ] });
};

const React = await importShared('react');
const {Provider} = await importShared('react-redux');

const {BrowserRouter} = await importShared('react-router-dom');
console.log("[shell/main] 🚀 Shell app starting...");
console.log("[shell/main] 🏪 Redux store initialized:", store$1.getState());
const initialTheme = store$1.getState().theme.mode;
if (initialTheme === "dark") {
  document.documentElement.classList.add("dark");
}
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Provider, { store: store$1, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) }) })
);
