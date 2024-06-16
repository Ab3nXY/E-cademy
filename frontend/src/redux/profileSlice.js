import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../components/axiosSetup';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async ({ pk, csrfToken }) => {
    const response = await axios.get(`/profile/${pk}/`, {
      headers: {
        'X-CSRFToken': csrfToken
      }
    });
    return response.data;
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ pk, formData, csrfToken }) => {
    const response = await axios.patch(`/profile/${pk}/`, formData, {
      headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'multipart/form-data'
      },
    });
    return response.data;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    data: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default profileSlice.reducer;
