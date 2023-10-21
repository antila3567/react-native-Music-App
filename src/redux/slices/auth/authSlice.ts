import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
