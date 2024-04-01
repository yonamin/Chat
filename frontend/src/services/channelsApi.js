// eslint-disable-next-line no-unused-vars
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';

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
    editChannel: builder.mutation({
      query: (channel) => {
        const { newName, channelId } = channel;
        return {
          url: routes.channelPath(channelId),
          body: newName,
          method: 'PATCH',
        };
      },
    }),
    removeChannel: builder.mutation({
      query: (channelId) => ({
        url: routes.channelPath(channelId),
        method: 'DELETE',
      }),
    }),
  }),
});

const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;

export {
  useGetChannelsQuery as getChannels,
  useAddChannelMutation as addChannel,
  useEditChannelMutation as editChannel,
  useRemoveChannelMutation as removeChannel,
};

export const defaultChannelId = 1;
