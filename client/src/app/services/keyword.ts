import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from 'utils/getSetToken';

export interface Keyword {
  id: number;
  keyword: string | null;
  totalResultsOfKeyword: string | null;
  numberOfLinks: string | null;
  totalAdWordsAdvertisers: string | null;
  rawHTML: string | null;
}

export interface CrawlRequest {
  keywords: Array<string>;
}

export interface CrawlResponse {
  statusCode: Number;
  data: Array<Keyword>;
  errors: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getToken();
      if (token) {
        headers.set('authorization', `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    crawl: builder.mutation<CrawlResponse, CrawlRequest>({
      query: (keywords) => ({
        url: 'keywords/crawl',
        method: 'POST',
        body: keywords,
      }),
    }),
    getAllKeywords: builder.mutation<CrawlResponse, void>({
      query: () => ({
        url: 'keywords',
        method: 'GET',
      }),
    }),
    search: builder.mutation<CrawlResponse, { keyword: string }>({
      query: (keyword) => ({
        url: 'keywords/search',
        method: 'GET',
        params: keyword,
      }),
    }),
  }),
});

export const {
  useCrawlMutation,
  useGetAllKeywordsMutation,
  useSearchMutation,
} = api;
