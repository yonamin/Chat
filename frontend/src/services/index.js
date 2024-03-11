import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { channelsApi } from './channelsApi';
import { messagesApi } from './messagesApi';

export default configureStore({
  reducer: {
    auth: authReducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messagesApi.middleware),
});
