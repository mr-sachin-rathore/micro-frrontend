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

const Dashboard = () => {
  useAppSelector((state) => state.theme);
  const recentActivity = [
    { id: 1, action: "User signup", user: "john@example.com", time: "2 minutes ago", type: "success" },
    { id: 2, action: "Payment received", user: "jane@example.com", time: "15 minutes ago", type: "success" },
    { id: 3, action: "Failed login attempt", user: "unknown", time: "1 hour ago", type: "error" },
    { id: 4, action: "Profile updated", user: "bob@example.com", time: "2 hours ago", type: "info" },
    { id: 5, action: "New subscription", user: "alice@example.com", time: "3 hours ago", type: "success" }
  ];
  const getTypeStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
      case "error":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
      case "info":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-primary-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }),
        "Weekly Activity"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between h-48 gap-2", children: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
        const heights = [60, 80, 45, 90, 75, 40, 85];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-full rounded-t-lg bg-gradient-to-t from-primary-500 to-primary-400 transition-all duration-500 hover:from-primary-600 hover:to-primary-500",
              style: { height: `${heights[index]}%` }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: day })
        ] }, day);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex items-center justify-center gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-primary-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "User Activity" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-accent-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        "Recent Activity"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: recentActivity.map((activity, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 animate-fade-in",
          style: { animationDelay: `${index * 100}ms` },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `w-10 h-10 rounded-lg flex items-center justify-center ${getTypeStyles(activity.type)}`, children: [
              activity.type === "success" && /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
              activity.type === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }),
              activity.type === "info" && /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white truncate", children: activity.action }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 truncate", children: activity.user })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap", children: activity.time })
          ]
        },
        activity.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full mt-4 py-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium", children: "View all activity →" })
    ] })
  ] });
};

const UserStatsCard = ({
  title,
  value,
  icon,
  trend,
  trendValue
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-500 bg-green-100 dark:bg-green-900/30";
      case "down":
        return "text-red-500 bg-red-100 dark:bg-red-900/30";
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-800";
    }
  };
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 10l7-7m0 0l7 7m-7-7v18" }) });
      case "down":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 14l-7 7m0 0l-7-7m7 7V3" }) });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 12h14" }) });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-xl hover:-translate-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400", children: icon }),
      trend && trendValue && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getTrendColor()}`, children: [
        getTrendIcon(),
        trendValue
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: value }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: title })
  ] });
};

const {useEffect} = await importShared('react');
const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const theme = useAppSelector((state) => state.theme);
  useEffect(() => {
    console.log("[app1/App] 🚀 Dashboard app mounted");
    dispatch(
      navigateTo({
        app: "app1",
        breadcrumbs: [
          { label: "Home", path: "/" },
          { label: "Dashboard", path: "/app1" }
        ]
      })
    );
    return () => {
      console.log("[app1/App] 👋 Dashboard app unmounting");
    };
  }, [dispatch]);
  const handleUpdateProfile = () => {
    const randomNames = ["Alex Johnson", "Sam Williams", "Jordan Lee", "Taylor Brown", "Morgan Davis"];
    const randomEmails = ["alex@example.com", "sam@example.com", "jordan@example.com", "taylor@example.com", "morgan@example.com"];
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    console.log("[app1/App] 📝 Updating user profile from Dashboard...");
    dispatch(
      updateUser({
        name: randomNames[randomIndex],
        email: randomEmails[randomIndex],
        avatar: `https://ui-avatars.com/api/?name=${randomNames[randomIndex].replace(" ", "+")}&background=0ea5e9&color=fff`
      })
    );
  };
  const handleChangeRole = (newRole) => {
    console.log(`[app1/App] 🎭 Changing role to ${newRole} from Dashboard...`);
    dispatch(updateUser({ role: newRole }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600 dark:text-gray-300", children: [
        "Welcome back, ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-primary-600 dark:text-primary-400", children: user.name }),
        "! This is App1 (Remote Micro-Frontend on port 3001)."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UserStatsCard,
        {
          title: "Total Users",
          value: "2,543",
          trend: "up",
          trendValue: "+12.5%",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UserStatsCard,
        {
          title: "Active Sessions",
          value: "1,234",
          trend: "up",
          trendValue: "+8.2%",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UserStatsCard,
        {
          title: "Revenue",
          value: "$45,231",
          trend: "up",
          trendValue: "+23.1%",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UserStatsCard,
        {
          title: "Current Theme",
          value: theme.mode === "dark" ? "🌙 Dark" : "☀️ Light",
          trend: "neutral",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-primary-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }),
          "Update Profile (Redux Demo)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600 dark:text-gray-300 mb-4", children: [
          "Click the button below to update your profile. This dispatches an action to the",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-primary-600 dark:text-primary-400", children: " shared Redux store" }),
          ". Watch the Header update instantly!"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleUpdateProfile,
            className: "\n              w-full px-6 py-3 rounded-xl\n              bg-gradient-to-r from-primary-500 to-primary-600\n              text-white font-medium\n              shadow-lg shadow-primary-500/30\n              hover:shadow-xl hover:shadow-primary-500/40\n              transition-all duration-200\n              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2\n            ",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) }),
              "Randomize Profile"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-gray-500 dark:text-gray-400 text-center", children: [
          "Current: ",
          user.name,
          " (",
          user.email,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-accent-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) }),
          "Change Role"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 mb-4", children: "Switch between Admin and User roles. The navigation menu will update based on your role." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleChangeRole("admin"),
              className: `
                flex-1 px-4 py-3 rounded-xl font-medium
                transition-all duration-200
                ${user.role === "admin" ? "bg-accent-500 text-white shadow-lg shadow-accent-500/30" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}
              `,
              children: "👑 Admin"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleChangeRole("user"),
              className: `
                flex-1 px-4 py-3 rounded-xl font-medium
                transition-all duration-200
                ${user.role === "user" ? "bg-accent-500 text-white shadow-lg shadow-accent-500/30" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}
              `,
              children: "👤 User"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-gray-500 dark:text-gray-400 text-center", children: [
          "Current role: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium capitalize", children: user.role })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-6 border border-primary-100 dark:border-primary-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-800 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-primary-600 dark:text-primary-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 dark:text-white mb-1", children: "How State Sharing Works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm", children: "This app (App1) is a separate React application loaded via Module Federation. It shares the Redux store with the Shell and App2 through singleton shared dependencies. When you update your profile here, the action is dispatched to the shared store, and all apps receive the update through React-Redux's subscription mechanism." })
      ] })
    ] }) })
  ] });
};

export { App as default, jsxRuntimeExports as j, store$1 as s };
