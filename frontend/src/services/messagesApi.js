import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';

const { apiPaths } = routes;

const baseQuery = fetchBaseQuery({
  baseUrl: '',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery,
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => apiPaths.messagesPath(),
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: apiPaths.messagesPath(),
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi;

export {
  useGetMessagesQuery as getMessages,
  useAddMessageMutation as addMessage,
};
