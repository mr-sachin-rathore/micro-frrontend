import { importShared } from './__federation_fn_import-ErdLqFhe.js';
import { r as reactExports } from './index-Dm_EQZZA.js';

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
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

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

const {useState,useEffect: useEffect$1} = await importShared('react');
const SettingsForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect$1(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user.name, user.email]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    console.log("[app2/SettingsForm] 💾 Saving user settings...");
    try {
      await dispatch(
        updateUserAsync({
          payload: {
            name,
            email,
            avatar: `https://ui-avatars.com/api/?name=${name.replace(" ", "+")}&background=0ea5e9&color=fff`
          },
          source: "app2"
        })
      ).unwrap();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3e3);
    } catch (error) {
      console.error("[app2/SettingsForm] ❌ Error saving:", error);
    } finally {
      setIsSaving(false);
    }
  };
  const handleQuickUpdate = () => {
    console.log("[app2/SettingsForm] ⚡ Quick updating user...");
    dispatch(
      updateUser({
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(" ", "+")}&background=0ea5e9&color=fff`
      })
    );
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-primary-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }),
      "Profile Settings"
    ] }),
    showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-green-600 dark:text-green-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-green-800 dark:text-green-200", children: "Settings saved!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-green-600 dark:text-green-300", children: "Your changes are now reflected across all apps." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Full Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            id: "name",
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "\n              w-full px-4 py-3 rounded-xl\n              bg-gray-50 dark:bg-gray-800\n              border border-gray-200 dark:border-gray-700\n              text-gray-900 dark:text-white\n              placeholder-gray-400 dark:placeholder-gray-500\n              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent\n              transition-all duration-200\n            ",
            placeholder: "Enter your name"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400", children: "This will update your display name in the Header" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Email Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            id: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "\n              w-full px-4 py-3 rounded-xl\n              bg-gray-50 dark:bg-gray-800\n              border border-gray-200 dark:border-gray-700\n              text-gray-900 dark:text-white\n              placeholder-gray-400 dark:placeholder-gray-500\n              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent\n              transition-all duration-200\n            ",
            placeholder: "Enter your email"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 text-sm font-medium rounded-full bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 capitalize", children: user.role }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Role can be changed in Dashboard (App1)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: isSaving,
            className: "\n              flex-1 px-6 py-3 rounded-xl\n              bg-gradient-to-r from-primary-500 to-primary-600\n              text-white font-medium\n              shadow-lg shadow-primary-500/30\n              hover:shadow-xl hover:shadow-primary-500/40\n              disabled:opacity-50 disabled:cursor-not-allowed\n              transition-all duration-200\n              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2\n            ",
            children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "animate-spin w-5 h-5", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }),
              "Saving..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
              "Save Changes (Async)"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleQuickUpdate,
            className: "\n              px-6 py-3 rounded-xl\n              bg-gray-100 dark:bg-gray-800\n              text-gray-700 dark:text-gray-200 font-medium\n              hover:bg-gray-200 dark:hover:bg-gray-700\n              transition-all duration-200\n              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2\n            ",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }),
              "Quick Update"
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-blue-700 dark:text-blue-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Note:" }),
      ' "Save Changes (Async)" uses createAsyncThunk to simulate an API call. "Quick Update" dispatches synchronously for immediate feedback. Both update the shared Redux store!'
    ] }) })
  ] });
};

const ThemeSelector = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);
  const handleThemeChange = (mode) => {
    console.log(`[app2/ThemeSelector] 🎨 Changing theme to ${mode}...`);
    dispatch(
      setThemeWithSource({
        mode,
        source: "app2"
      })
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-accent-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" }) }),
      "Theme Settings"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-4", children: "Select your preferred theme. Changes apply instantly to all apps!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleThemeChange("light"),
          className: `
            relative p-4 rounded-xl border-2 transition-all duration-200
            ${theme.mode === "light" ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"}
          `,
          children: [
            theme.mode === "light" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-16 rounded-lg bg-gradient-to-br from-gray-100 to-white border border-gray-200 mb-3 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-yellow-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Light Mode" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleThemeChange("dark"),
          className: `
            relative p-4 rounded-xl border-2 transition-all duration-200
            ${theme.mode === "dark" ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"}
          `,
          children: [
            theme.mode === "dark" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 mb-3 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-blue-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Dark Mode" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Current Theme:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `
            px-3 py-1 rounded-full text-sm font-medium
            ${theme.mode === "dark" ? "bg-gray-700 text-gray-200" : "bg-yellow-100 text-yellow-800"}
          `, children: theme.mode === "dark" ? "🌙 Dark" : "☀️ Light" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-xs text-gray-500 dark:text-gray-400", children: [
      "Theme is stored in Redux and persisted to localStorage. When you change the theme, the ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded", children: "setTheme" }),
      " action is dispatched, and the Shell app applies the ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded", children: "dark" }),
      " class to the document element, enabling Tailwind's dark mode."
    ] })
  ] });
};

const {useEffect} = await importShared('react');
const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const theme = useAppSelector((state) => state.theme);
  useEffect(() => {
    console.log("[app2/App] 🚀 Settings app mounted");
    dispatch(
      navigateTo({
        app: "app2",
        breadcrumbs: [
          { label: "Home", path: "/" },
          { label: "Settings", path: "/app2" }
        ]
      })
    );
    return () => {
      console.log("[app2/App] 👋 Settings app unmounting");
    };
  }, [dispatch]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300", children: "Manage your account settings and preferences. This is App2 (Remote Micro-Frontend on port 3002)." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsForm, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeSelector, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-primary-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
            "Current Redux State"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-gray-50 dark:bg-gray-800 rounded-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 mb-2", children: "User State" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "ID:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-900 dark:text-white font-mono text-xs", children: user.id || "N/A" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "Name:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-900 dark:text-white", children: user.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "Email:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-900 dark:text-white", children: user.email })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "Role:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 text-xs rounded-full bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 capitalize", children: user.role })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-gray-50 dark:bg-gray-800 rounded-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 mb-2", children: "Theme State" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "Mode:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `
                    px-3 py-1 rounded-full text-sm font-medium
                    ${theme.mode === "dark" ? "bg-gray-700 text-gray-200" : "bg-yellow-100 text-yellow-800"}
                  `, children: theme.mode === "dark" ? "🌙 Dark" : "☀️ Light" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-2xl p-6 border border-accent-100 dark:border-accent-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-800 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-accent-600 dark:text-accent-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-gray-900 dark:text-white mb-1 text-sm", children: "Try This!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-600 dark:text-gray-300", children: "Update your name here, then navigate to App1 (Dashboard). Your changes will be reflected everywhere because all apps share the same Redux store!" })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-primary-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
        "How Cross-App State Works"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-4 gap-4", children: [
        { step: 1, title: "Action Dispatched", desc: "You change theme in App2", icon: "🎯" },
        { step: 2, title: "Store Updates", desc: "Shared Redux store receives action", icon: "📦" },
        { step: 3, title: "State Changes", desc: "theme.mode updates to new value", icon: "🔄" },
        { step: 4, title: "All Apps Update", desc: "Shell, App1, Header all re-render", icon: "✨" }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center mx-auto mb-3 text-2xl", children: item.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-primary-600 dark:text-primary-400 font-medium mb-1", children: [
          "Step ",
          item.step
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-gray-900 dark:text-white text-sm mb-1", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: item.desc })
      ] }, item.step)) })
    ] })
  ] });
};

export { App as default, jsxRuntimeExports as j, store$1 as s };
