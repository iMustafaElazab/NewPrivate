import {ApiRequest} from 'types/api';
import {api} from './baseApi';

export const chatApi = api.injectEndpoints({
  endpoints: builder => ({
    chatCompletions: builder.mutation<any, ApiRequest>({
      query: apiRequest => ({
        url: 'chat/completions',
        method: 'POST',
        body: apiRequest.body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {useChatCompletionsMutation: chatCompletionsApi} = chatApi;
