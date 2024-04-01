import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import uiReducer from '../slices/ui';
import { channelsApi } from './channelsApi';
import { messagesApi } from './messagesApi';

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messagesApi.middleware),
});
