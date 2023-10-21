import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { log } from '../../utils/log';

export const catchApiErrorsMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const createErrorData = {
      statusCode: action?.payload?.data?.statusCode,
      statusText: action?.payload?.data?.message,
      error: action?.payload?.error,
      url: action?.meta?.baseQueryMeta?.response?.url,
      methodName: action?.meta?.arg?.endpointName,
      originalArgs: action?.meta?.arg?.originalArgs,
      originalStatusCode: action?.payload.originalStatus,
      originalStatus: action?.payload?.status,
    };

    log('=======(API ACTION ERROR)========', createErrorData);
  }

  return next(action);
};
