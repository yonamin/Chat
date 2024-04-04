import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: localStorage.getItem('username') ?? null,
  token: localStorage.getItem('token') ?? null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
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
