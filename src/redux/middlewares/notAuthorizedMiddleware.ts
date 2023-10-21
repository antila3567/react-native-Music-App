import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { resetStateAction } from '../resetStore';

export const unAuthenticatedMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      // DO logout func
      dispatch(resetStateAction());
    }

    return next(action);
  };
