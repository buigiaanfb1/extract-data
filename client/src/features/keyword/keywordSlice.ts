import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Keyword } from '../../app/services/keyword';
import type { Builder, RootState } from '../../app/store';

type KeywordState = {
  data: Array<Keyword>;
  isLoading: boolean;
};

export const buildKeywordReducerState: Builder<KeywordState> = (
  overrides = {}
) => ({
  data: [],
  isLoading: false,
});

const slice = createSlice({
  name: 'keyword',
  initialState: {
    data: [],
    isLoading: false,
  } as KeywordState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setKeywords: (
      state,
      { payload: { data } }: PayloadAction<{ data: Array<Keyword> }>
    ) => {
      state.data = data;
      state.isLoading = false;
    },
    clearKeywords: (state) => {
      state.data = [];
      state.isLoading = false;
    },
  },
});

export const { setKeywords, setLoading, clearKeywords } = slice.actions;

export default slice.reducer;

export const selectKeywords = (state: RootState) => state.keywords;
