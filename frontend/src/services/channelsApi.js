// eslint-disable-next-line no-unused-vars
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

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery,
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => apiPaths.channelsPath(),
      providesTags: ['Channels'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: apiPaths.channelsPath(),
        body: channel,
        method: 'POST',
      }),
      invalidatesTags: ['Channels'],
    }),
    editChannel: builder.mutation({
      query: (channel) => {
        const { newName, channelId } = channel;
        return {
          url: apiPaths.channelPath(channelId),
          body: newName,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: (channelId) => ({
        url: apiPaths.channelPath(channelId),
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
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
