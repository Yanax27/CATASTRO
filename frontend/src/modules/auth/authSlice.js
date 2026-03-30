import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  checkingAuth: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },

    checkAuthStart: (state) => {
      state.checkingAuth = true;
    },

    checkAuthSuccess: (state, action) => {
      state.checkingAuth = false;
      state.error = null;
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    checkAuthFailure: (state) => {
      state.checkingAuth = false;
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
    },

    logoutStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
    },

    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  checkAuthStart,
  checkAuthSuccess,
  checkAuthFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;