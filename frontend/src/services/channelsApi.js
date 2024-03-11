// eslint-disable-next-line no-unused-vars
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';

const baseQuery = fetchBaseQuery({
  baseUrl: '',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery,
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => routes.channelsPath(),
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: routes.channelsPath(),
        body: channel,
        method: 'POST',
      }),
    }),
  }),
});

const {
  useGetChannelsQuery,
  useAddChannelMutation,
} = channelsApi;

export {
  useGetChannelsQuery as getChannels,
  useAddChannelMutation as addChannel,
};
