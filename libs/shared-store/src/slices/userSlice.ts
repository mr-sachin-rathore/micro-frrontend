/**
 * User Slice - Manages user authentication and profile state
 * 
 * This slice is shared across all micro-frontend apps.
 * When any app dispatches an action to update user state,
 * all other apps will automatically reflect the change.
 * 
 * Redux Flow Example:
 * 1. User clicks "Update Profile" in App1
 * 2. App1 dispatches updateUser action
 * 3. Redux store updates user state
 * 4. Header component (in Shell) re-renders with new user name
 * 5. App2 Settings form shows updated values
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { User, UpdateUserPayload, UserRole, AppName } from '@shared/types';

// ============================================================================
// Initial State
// ============================================================================

const initialState: User = {
  id: '',
  name: 'Guest User',
  email: '',
  role: 'guest',
  isAuthenticated: false,
  avatar: undefined,
};

// ============================================================================
// Async Thunks
// ============================================================================

/**
 * Async thunk to simulate login
 * In a real app, this would call an authentication API
 */
export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>('user/login', async (credentials, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Simulated successful login response
    const user: User = {
      id: 'user-' + Date.now(),
      name: credentials.email.split('@')[0],
      email: credentials.email,
      role: 'user',
      isAuthenticated: true,
      avatar: `https://ui-avatars.com/api/?name=${credentials.email.split('@')[0]}&background=0ea5e9&color=fff`,
    };
    
    console.log('[shared-store] 🔐 User logged in:', user.name);
    return user;
  } catch (error) {
    return rejectWithValue('Login failed');
  }
});

/**
 * Async thunk to update user profile
 * Can be called from any micro-frontend app
 */
export const updateUserAsync = createAsyncThunk<
  UpdateUserPayload,
  { payload: UpdateUserPayload; source: AppName },
  { rejectValue: string }
>('user/updateAsync', async ({ payload, source }, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    console.log(`[shared-store] 📝 User updated from ${source}:`, payload);
    return payload;
  } catch (error) {
    return rejectWithValue('Update failed');
  }
});

// ============================================================================
// Slice Definition
// ============================================================================

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Synchronously update user information
     * Use this for immediate UI updates
     */
    updateUser: (state, action: PayloadAction<UpdateUserPayload>) => {
      console.log('[shared-store] 👤 updateUser action dispatched:', action.payload);
      
      if (action.payload.name !== undefined) {
        state.name = action.payload.name;
      }
      if (action.payload.email !== undefined) {
        state.email = action.payload.email;
      }
      if (action.payload.role !== undefined) {
        state.role = action.payload.role;
      }
      if (action.payload.avatar !== undefined) {
        state.avatar = action.payload.avatar;
      }
    },

    /**
     * Set the entire user object (used for login/session restore)
     */
    setUser: (state, action: PayloadAction<User>) => {
      console.log('[shared-store] 👤 setUser action dispatched:', action.payload.name);
      return action.payload;
    },

    /**
     * Update user role
     */
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      console.log('[shared-store] 🎭 User role changed to:', action.payload);
      state.role = action.payload;
    },

    /**
     * Log out the user
     */
    logout: (state) => {
      console.log('[shared-store] 🚪 User logged out');
      return initialState;
    },

    /**
     * Set authentication status
     */
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error('[shared-store] ❌ Login failed:', action.payload);
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        if (action.payload.name !== undefined) {
          state.name = action.payload.name;
        }
        if (action.payload.email !== undefined) {
          state.email = action.payload.email;
        }
        if (action.payload.role !== undefined) {
          state.role = action.payload.role;
        }
        if (action.payload.avatar !== undefined) {
          state.avatar = action.payload.avatar;
        }
      });
  },
});

// ============================================================================
// Exports
// ============================================================================

export const { updateUser, setUser, setUserRole, logout, setAuthenticated } = userSlice.actions;
export default userSlice.reducer;

