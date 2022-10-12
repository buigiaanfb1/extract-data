import {
  buildKeywordReducerState,
  setKeywords,
  setLoading,
} from './keywordSlice';
import keywordReducer from './keywordSlice';

describe('test keywordSlice', () => {
  const initialKeywordState = buildKeywordReducerState();
  it('setLoading', () => {
    expect(keywordReducer(undefined, setLoading())).toEqual({
      ...initialKeywordState,
      isLoading: true,
    });
  });
  it('setKeywords', () => {
    const data = [
      {
        id: 1,
        keyword: 'test',
        totalResultsOfKeyword: 'About 1',
        numberOfLinks: '1',
        totalAdWordsAdvertisers: '1',
        rawHTML: 'rawHTML',
      },
    ];
    expect(keywordReducer(undefined, setKeywords({ data }))).toEqual({
      ...initialKeywordState,
      data,
      isLoading: false,
    });
  });
});
