import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credits) => ({
        url: routes.signupPath(),
        body: credits,
        method: 'POST',
      }),
    }),
  }),
});

const { useSignupMutation } = usersApi;

export { useSignupMutation as signup };
