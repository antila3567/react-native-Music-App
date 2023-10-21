import {configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import {catchApiErrorsMiddleware} from './middlewares/catchAPIErrorsMiddleware';
import {rootReducer} from './rootReducer';
import {rootRtkApi} from './RTKApis/rootApi-RTK';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([rootRtkApi.middleware, catchApiErrorsMiddleware]),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
