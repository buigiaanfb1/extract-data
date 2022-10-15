import {
  buildKeywordReducerState,
  clearKeywords,
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
        isCompleted: true,
      },
    ];
    expect(keywordReducer(undefined, setKeywords({ data }))).toEqual({
      ...initialKeywordState,
      data,
      isLoading: false,
    });
  });

  it('clearKeywords', () => {
    const data = [
      {
        id: 1,
        keyword: 'test',
        totalResultsOfKeyword: 'About 1',
        numberOfLinks: '1',
        totalAdWordsAdvertisers: '1',
        rawHTML: 'rawHTML',
        isCompleted: true,
      },
    ];
    expect(keywordReducer({ data, isLoading: false }, clearKeywords())).toEqual(
      {
        ...initialKeywordState,
        data: [],
        isLoading: false,
      }
    );
  });
});
