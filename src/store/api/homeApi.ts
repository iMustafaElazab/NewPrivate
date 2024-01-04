import {api} from './baseApi';

export const homeApi = api.injectEndpoints({
  endpoints: build => ({
    getHomeApi: build.query<any, void>({
      query: () => ({url: '/home', method: 'GET'}),
    }),
  }),
  overrideExisting: false,
});

export const {useGetHomeApiQuery: getHomeApi} = homeApi;
