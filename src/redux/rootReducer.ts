import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth/authSlice';
import { RESET_STORE_ACTION_TYPE } from './resetStore';
import persistReducer from 'redux-persist/es/persistReducer';
import { ROOT_RTK_API_KEY, rootRtkApi } from './RTKApis/rootApi-RTK';

const authPersistConfig = {
  key: authSlice.name,
  storage: AsyncStorage,
  whitelist: [''],
};

const appReducer = combineReducers({
  [authSlice.name]: persistReducer(authPersistConfig, authSlice.reducer),
  [ROOT_RTK_API_KEY]: rootRtkApi.reducer,
});

export type RootState = ReturnType<typeof appReducer>;

export const rootReducer = (
  state: RootState | undefined,
  action: AnyAction,
) => {
  if (action.type === RESET_STORE_ACTION_TYPE) {
    state = {} as RootState;
  }

  return appReducer(state, action);
};
