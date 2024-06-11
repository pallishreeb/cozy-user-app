import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
export const store = configureStore({
  reducer: {
    userAuth: authSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
