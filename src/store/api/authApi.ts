import {RegisterResponse} from 'types/api/RegisterResponse';
import {api} from './baseApi';
import type {ApiRequest} from 'types';

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    // TODO: Change params, endpoint and method based on API requirements.
    login: builder.mutation<any, ApiRequest>({
      query: apiRequest => ({
        url: '/login',
        method: 'POST',
        body: apiRequest.body,
      }),
    }),
    // TODO: Change params, endpoint and method based on API requirements.
    logout: builder.mutation<any, void>({
      query: () => '/logout',
    }),
    register: builder.mutation<RegisterResponse, ApiRequest>({
      query: apiRequest => ({
        url: '/register',
        method: 'POST',
        body: apiRequest.body,
      }),
    }),
    profile: builder.query<any, void>({
      query: () => '/profile',
    }),
    // TODO: Add more auth related APIs here (register, ...etc).
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation: loginApi,
  useLogoutMutation: logoutApi,
  useProfileQuery: profileApi,
  useRegisterMutation: registerApi,
} = authApi;
