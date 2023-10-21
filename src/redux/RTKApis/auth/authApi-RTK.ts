import { rootRtkApi } from '../rootApi-RTK';

type User = {
  login: string;
  password: string;
};

type Tokens = {
  access: string;
  refresh: string;
};

export const authApi = rootRtkApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<Tokens, User>({
      query(body) {
        return {
          url: 'auth/login',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
