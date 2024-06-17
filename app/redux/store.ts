import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import networkSlice from './slices/networkSlice';
export const store = configureStore({
  reducer: {
    userAuth: authSlice,
    network: networkSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
