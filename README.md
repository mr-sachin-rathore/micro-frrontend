# 🚀 MicroFrontend Monorepo

A complete NX monorepo with Vite Module Federation demonstrating micro-frontend architecture with shared Redux state.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Module Federation](#module-federation)
- [Redux State Sharing](#redux-state-sharing)
- [Available Scripts](#available-scripts)
- [Development Guide](#development-guide)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This project demonstrates a production-ready micro-frontend architecture using:

- **NX Monorepo** - Efficient workspace management
- **Vite** - Fast build tool with HMR
- **Module Federation** - Share code between independent apps
- **React 18** - UI library
- **Redux Toolkit** - State management (shared across apps!)
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling

### Key Features

✅ **Seamless Navigation** - Switch between apps without page reload  
✅ **Shared Redux Store** - All apps read/write to the same store  
✅ **Shared UI Components** - Header and Navigation used everywhere  
✅ **Independent Deployment** - Each app can be built and deployed separately  
✅ **TypeScript** - Full type safety  
✅ **Hot Module Replacement** - Fast development experience

## 📁 Project Structure

```
micro-fronend/
├── apps/
│   ├── shell/              # 🏠 Host application (port 3000)
│   │   ├── src/
│   │   │   ├── main.tsx
│   │   │   ├── App.tsx
│   │   │   └── components/
│   │   ├── vite.config.ts   # Module Federation host config
│   │   └── project.json
│   ├── app1/               # 📊 Dashboard remote (port 3001)
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   └── components/
│   │   │       ├── Dashboard.tsx
│   │   │       └── UserStatsCard.tsx
│   │   └── vite.config.ts   # Module Federation remote config
│   └── app2/               # ⚙️ Settings remote (port 3002)
│       ├── src/
│       │   ├── App.tsx
│       │   └── components/
│       │       ├── SettingsForm.tsx
│       │       └── ThemeSelector.tsx
│       └── vite.config.ts   # Module Federation remote config
├── libs/
│   ├── shared-ui/          # 🎨 Shared UI components
│   │   └── src/
│   │       ├── Header/
│   │       └── LeftNavigation/
│   ├── shared-store/       # 📦 Shared Redux store
│   │   └── src/
│   │       ├── store.ts
│   │       ├── hooks.ts
│   │       └── slices/
│   │           ├── userSlice.ts
│   │           ├── themeSlice.ts
│   │           └── navigationSlice.ts
│   └── shared-types/       # 📝 TypeScript types
├── package.json
├── nx.json
├── tsconfig.base.json
└── tailwind.config.js
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository (if needed)
cd micro-fronend

# Install dependencies
npm install

# Start all apps in parallel
npm run dev
```

### Access the Apps

| App              | URL                   | Description              |
| ---------------- | --------------------- | ------------------------ |
| Shell (Host)     | http://localhost:3000 | Main application         |
| App1 (Dashboard) | http://localhost:3001 | Dashboard micro-frontend |
| App2 (Settings)  | http://localhost:3002 | Settings micro-frontend  |

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      BROWSER (localhost:3000)                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    SHELL (Host App)                    │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              Shared Header Component             │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌──────────┬──────────────────────────────────────┐  │  │
│  │  │   Left   │                                      │  │  │
│  │  │   Nav    │   ┌────────────────────────────┐    │  │  │
│  │  │          │   │   Remote App1 (Dashboard)  │    │  │  │
│  │  │          │   │   loaded via Module Fed    │    │  │  │
│  │  │          │   └────────────────────────────┘    │  │  │
│  │  │          │   ┌────────────────────────────┐    │  │  │
│  │  │          │   │   Remote App2 (Settings)   │    │  │  │
│  │  │          │   │   loaded via Module Fed    │    │  │  │
│  │  │          │   └────────────────────────────┘    │  │  │
│  │  └──────────┴──────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  SHARED REDUX STORE                    │  │
│  │   ┌─────────┐  ┌─────────┐  ┌─────────────────────┐   │  │
│  │   │  user   │  │  theme  │  │    navigation       │   │  │
│  │   └─────────┘  └─────────┘  └─────────────────────┘   │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔗 Module Federation

### How It Works

1. **Shell (Host)** configures remotes in `vite.config.ts`:

```typescript
federation({
  name: 'shell',
  remotes: {
    app1: 'http://localhost:3001/assets/remoteEntry.js',
    app2: 'http://localhost:3002/assets/remoteEntry.js',
  },
  shared: { react: { singleton: true }, ... }
})
```

2. **Remote Apps** expose their components:

```typescript
federation({
  name: 'app1',
  exposes: {
    './App': './src/App.tsx',
  },
  shared: { react: { singleton: true }, ... }
})
```

3. **Shell** imports remote apps dynamically:

```typescript
const App1 = lazy(() => import("app1/App"));
const App2 = lazy(() => import("app2/App"));
```

### Singleton Sharing

The key to state sharing is `singleton: true` in the shared config:

```typescript
shared: {
  react: { singleton: true },
  'react-dom': { singleton: true },
  '@reduxjs/toolkit': { singleton: true },
  'react-redux': { singleton: true },
}
```

This ensures all apps use the SAME instance of these libraries!

## 📦 Redux State Sharing

### How Cross-App State Works

```
┌─────────────────────────────────────────────────────────────┐
│                     STATE SHARING FLOW                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. User clicks "Update Profile" in App1                    │
│     ↓                                                        │
│  2. App1 dispatches: dispatch(updateUser({ name: '...' }))  │
│     ↓                                                        │
│  3. Shared Redux Store receives action                       │
│     ↓                                                        │
│  4. userSlice reducer updates state.user                     │
│     ↓                                                        │
│  5. ALL subscribed components re-render:                     │
│     • Shell's Header shows new name                          │
│     • App2's SettingsForm shows updated values               │
│     • LeftNavigation shows updated user info                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Redux Store Structure

```typescript
interface RootState {
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user" | "guest";
    isAuthenticated: boolean;
  };
  theme: {
    mode: "light" | "dark";
  };
  navigation: {
    currentApp: "shell" | "app1" | "app2";
    breadcrumbs: Breadcrumb[];
    isSidebarCollapsed: boolean;
  };
}
```

### Using the Store in Any App

```typescript
import { useAppSelector, useAppDispatch, updateUser } from "@shared/store";

function MyComponent() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleUpdate = () => {
    dispatch(updateUser({ name: "New Name" }));
    // ALL apps will see this update!
  };
}
```

## 📜 Available Scripts

| Script                | Description                   |
| --------------------- | ----------------------------- |
| `npm run dev`         | Start all apps in parallel    |
| `npm run dev:shell`   | Start only the shell app      |
| `npm run dev:app1`    | Start only app1               |
| `npm run dev:app2`    | Start only app2               |
| `npm run build:all`   | Build all apps for production |
| `npm run build:shell` | Build shell for production    |
| `npm run build:app1`  | Build app1 for production     |
| `npm run build:app2`  | Build app2 for production     |
| `npm run lint`        | Lint all projects             |
| `npm run test`        | Run tests                     |

## 🛠 Development Guide

### Adding a New Remote App

1. Create the app structure:

```bash
mkdir -p apps/app3/src/components
```

2. Create `vite.config.ts` with federation config:

```typescript
federation({
  name: 'app3',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App.tsx',
  },
  shared: { ... }
})
```

3. Add to shell's remotes:

```typescript
remotes: {
  app1: 'http://localhost:3001/assets/remoteEntry.js',
  app2: 'http://localhost:3002/assets/remoteEntry.js',
  app3: 'http://localhost:3003/assets/remoteEntry.js',
}
```

4. Add route in shell's `App.tsx`:

```typescript
<Route path="/app3/*" element={<App3 />} />
```

### Adding a New Redux Slice

1. Create the slice in `libs/shared-store/src/slices/`:

```typescript
// newSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const newSlice = createSlice({
  name: "new",
  initialState: {},
  reducers: {},
});

export default newSlice.reducer;
```

2. Add to store in `store.ts`:

```typescript
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  navigation: navigationReducer,
  new: newReducer, // Add here
});
```

3. Export from `index.ts`

### Adding Shared Components

1. Create component in `libs/shared-ui/src/`:

```typescript
// NewComponent/NewComponent.tsx
export const NewComponent = () => { ... };
```

2. Export from `libs/shared-ui/src/index.ts`:

```typescript
export { NewComponent } from "./NewComponent";
```

3. Use in any app:

```typescript
import { NewComponent } from "@shared/ui";
```

## 🐛 Troubleshooting

### Remote App Not Loading

1. Check if the remote app is running:

   - App1: http://localhost:3001
   - App2: http://localhost:3002

2. Check browser console for CORS errors

3. Verify `remoteEntry.js` is accessible:
   - http://localhost:3001/assets/remoteEntry.js

### State Not Syncing

1. Ensure `singleton: true` is set for all shared deps
2. Check Redux DevTools for action dispatches
3. Verify all apps use `@shared/store` imports

### Build Errors

1. Clean and reinstall:

```bash
npm run clean
npm install
```

2. Check for TypeScript errors:

```bash
npx tsc --noEmit
```

### HMR Not Working

1. Restart the dev server
2. Clear browser cache
3. Check for vite config issues

## 📝 Testing State Sharing

1. **Open http://localhost:3000**
2. **Navigate to Dashboard (App1)**
3. **Click "Randomize Profile"**
4. **Observe Header updates immediately**
5. **Navigate to Settings (App2)**
6. **See your profile changes reflected**
7. **Change theme in App2**
8. **All apps update to new theme!**
9. **Open Redux DevTools** (browser extension)
10. **See actions flowing from different apps**

## 🎉 Success Criteria

✅ Running `npm run dev` starts all 3 apps  
✅ Navigation between apps has NO page reload  
✅ Header and LeftNavigation are shared and consistent  
✅ Changing user in App1 updates Header immediately  
✅ Changing theme in App2 updates all apps instantly  
✅ Redux DevTools shows actions from all apps  
✅ All apps can be built and deployed separately  
✅ TypeScript has no errors  
✅ Each app can dispatch to and read from shared Redux store

## 📚 Resources

- [NX Documentation](https://nx.dev)
- [Vite Documentation](https://vitejs.dev)
- [Module Federation Docs](https://github.com/originjs/vite-plugin-federation)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)

## 📄 License

MIT License - feel free to use this as a starting point for your own micro-frontend projects!
