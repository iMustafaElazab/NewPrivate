import {ApiRequest} from 'types/api';
import {api} from './baseApi';
import ChatCompletionResponseDTO from 'types/api/ChatCompletionResponseDTO';
import ImageGenerationResponseDTO from 'types/api/ImageGenerationResponseDTO';

export const chatApi = api.injectEndpoints({
  endpoints: builder => ({
    chatCompletions: builder.mutation<ChatCompletionResponseDTO, ApiRequest>({
      query: apiRequest => ({
        url: 'chat/completions',
        method: 'POST',
        body: apiRequest.body,
      }),
    }),
    imageCompletions: builder.mutation<ImageGenerationResponseDTO, ApiRequest>({
      query: apiRequest => ({
        url: 'images/generations',
        method: 'POST',
        body: apiRequest.body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useChatCompletionsMutation: chatCompletionsApi,
  useImageCompletionsMutation: imageCompletionsApi,
} = chatApi;
