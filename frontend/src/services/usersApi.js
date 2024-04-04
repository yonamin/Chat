import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credits) => ({
        url: routes.loginPath(),
        body: credits,
        method: 'POST',
      }),
    }),
    signup: builder.mutation({
      query: (credits) => ({
        url: routes.signupPath(),
        body: credits,
        method: 'POST',
      }),
    }),
  }),
});

const { useSignupMutation, useLoginMutation } = usersApi;

export {
  useSignupMutation as signup,
  useLoginMutation as login,
};
