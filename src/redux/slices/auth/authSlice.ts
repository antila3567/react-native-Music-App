import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import {AuthState} from './types';

const initialState: {
  accessToken: undefined | string;
} = {
  accessToken: undefined,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    updateAccessToken(state, action: PayloadAction<string | undefined>) {
      state.accessToken = action.payload;
    },
  },
});

export default authSlice.reducer;
