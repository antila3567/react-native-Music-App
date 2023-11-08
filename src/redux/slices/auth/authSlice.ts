import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState } from './types';

const initialState: IAuthState = {
  onboarding: true,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setOnboardingStatus(state, action: PayloadAction<boolean>) {
      state.onboarding = action.payload;
    },
    setAuthStatus(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setOnboardingStatus, setAuthStatus } = authSlice.actions;

export default authSlice.reducer;
