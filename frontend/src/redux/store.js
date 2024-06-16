// store.js
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});

export default store;
