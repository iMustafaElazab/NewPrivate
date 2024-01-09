import {ApiRequest} from 'types/api';
import {api} from './baseApi';

export const chatApi = api.injectEndpoints({
  endpoints: builder => ({
    chatAll: builder.mutation<any, ApiRequest>({
      query: apiRequest => ({
        url: 'chat/completions',
        method: 'POST',
        body: apiRequest.body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {useChatAllMutation: chatAll} = chatApi;
