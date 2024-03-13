import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: localStorage.getItem('username') ?? null,
    token: localStorage.getItem('token') ?? null,
  },
  reducers: {
    setCredentials: (state, { payload: { username, token } }) => {
      state.username = username;
      state.token = token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth;
