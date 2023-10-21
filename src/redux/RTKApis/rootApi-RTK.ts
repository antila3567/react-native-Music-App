import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetStateAction } from '../resetStore';
import { log } from '../../utils/log';
import { Mutex } from 'async-mutex';


const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem('access_token');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    } else {
      log('Token Problem', 'TOKEN IS MISSED');
    }

    return headers;
  },
});


const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = await AsyncStorage.getItem('refresh_token');

    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {

        const { data } = await baseQuery(
          {
            method: 'PUT',
            url: '/auth/refresh_token',
            body: {
              refreshToken,
            },
          },
          api,
          extraOptions,
        );

        if (data) {
          await AsyncStorage.setItem('access_token', data.access_token);
          await AsyncStorage.setItem('refresh_token', data.refresh_token);

          //retry request
          result = await baseQuery(args, api, extraOptions);
        } else {
          log('Impossible to refresh tokens', 'Backend problem... Doing logout');
          //Do logout
          api.dispatch(resetStateAction());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result;
};

export const ROOT_RTK_API_KEY = 'rootRtkApi';

const staggeredBaseQuery = retry(baseQueryWithReAuth, {
  maxRetries: 3,
})


export const rootRtkApi = createApi({
  reducerPath: ROOT_RTK_API_KEY,
  baseQuery: staggeredBaseQuery,
  tagTypes: ['Posts'],
  endpoints: () => ({}),
});
