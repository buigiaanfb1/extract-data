import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { User } from '../../app/services/auth';
import type { Builder, RootState } from '../../app/store';

type AuthState = {
  data: User | null;
  token: string | null;
};

export const buildAuthReducerState: Builder<AuthState> = (overrides = {}) => ({
  data: null,
  token: null,
});

const slice = createSlice({
  name: 'auth',
  initialState: {
    data: {
      username: null,
      email: null,
      id: null,
      accessToken: null,
    },
    token: null,
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { data } }: PayloadAction<{ data: User }>
    ) => {
      state.data = data;
      state.token = data.accessToken;
    },
    clearCredentials: (state) => {
      state.data = {
        username: null,
        email: null,
        id: null,
        accessToken: null,
      };
      state.token = null;
    },
  },
});

export const { setCredentials, clearCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.data;
