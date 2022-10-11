import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from 'utils/getSetToken';

export interface User {
  id: string | null;
  username: string | null;
  email: string | null;
  accessToken: string | null;
}

export interface UserResponse {
  data: User;
  statusCode: Number;
  errors: null;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email?: string;
  password: string;
}

export interface AuthResponse {
  data: any;
  statusCode: Number;
  errors: null;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
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
    auth: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: 'auth',
        method: 'GET',
      }),
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<UserResponse, SignupRequest>({
      query: (userInfo) => ({
        url: 'auth/signup',
        method: 'POST',
        body: userInfo,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),
});

export const {
  useSignupMutation,
  useAuthMutation,
  useLoginMutation,
  useProtectedMutation,
} = api;
