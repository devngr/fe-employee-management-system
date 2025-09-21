import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosInstance';

export const login = createAsyncThunk(
  'auth/login', 
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post('/auth/login', credentials);
      return res.data; // { token }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get token from localStorage on app start
const tokenFromStorage = localStorage.getItem('token');

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    token: tokenFromStorage || null, 
    loading: false, 
    error: null,
    user: null 
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem('token');
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user || null;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload || action.error.message; 
        state.token = null;
        state.user = null;
        localStorage.removeItem('token');
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;