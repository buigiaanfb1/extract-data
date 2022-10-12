import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authSlice from '../features/auth/authSlice';
import keywordSlice from '../features/keyword/keywordSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    keywords: keywordSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
