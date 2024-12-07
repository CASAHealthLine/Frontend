import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    clearAuthenticated: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('access_token');
    },
  },
});

export const { setAuthenticated, clearAuthenticated } = authSlice.actions;
export default authSlice.reducer;
