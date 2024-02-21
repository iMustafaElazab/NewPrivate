// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import Config from 'react-native-config';

// import {type RootState} from 'store';
// import {getCurrentLocale} from 'core';

// // normalTimeout 1 min.
// // Used for all requests.
// export const normalTimeout = 1 * 60 * 1000;

// // uploadTimeout 5 min.
// // Used for requests with files to be uploaded.
// export const uploadTimeout = 5 * 60 * 1000;

// export const api = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: (getState: () => RootState) => {
//       (getState() as RootState).user.base_url || Config.API_KEY;
//     },
//     timeout: normalTimeout,
//     prepareHeaders: (headers, {getState}) => {
//       const apiToken = (getState() as RootState).user.api_key;
//       if (apiToken) {
//         headers.set('Authorization', `Bearer ${apiToken}`);
//       }
//       headers.set('Accept', 'application/json');
//       // headers.set('Accept-Language', getCurrentLocale());
//       return headers;
//     },
//   }),
//   endpoints: () => ({}),
//   reducerPath: 'api',
//   refetchOnMountOrArgChange: true,
//   tagTypes: ['Notifications'],
// });

import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
// import Config from 'react-native-config';

import {type RootState} from '../../store';
import {getCurrentLocale} from '../../core';

// normalTimeout 1 min.
// Used for all requests.
export const normalTimeout = 1 * 60 * 1000;

const getLogMessage = (message: string) => {
  return `## Api: ${message}`;
};

// uploadTimeout 5 min.
// Used for requests with files to be uploaded.
export const uploadTimeout = 5 * 60 * 1000;

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, WebApi, extraOptions) => {
  const baseUrl = (WebApi.getState() as RootState).user.base_url;
  console.info(getLogMessage('baseUrl'), JSON.stringify(baseUrl));
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    timeout: normalTimeout,
    prepareHeaders: (headers, {getState}) => {
      const apiToken = (getState() as RootState).user?.api_key;
      if (apiToken) {
        headers.set('Authorization', apiToken);
      }
      headers.set('Accept', 'application/json');
      //  headers.set('Accept-Language', getCurrentLocale());
      return headers;
    },
  });

  return rawBaseQuery(args, WebApi, extraOptions);
};

export const api = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
  reducerPath: 'api',
  refetchOnMountOrArgChange: true,
  tagTypes: ['Notifications'],
});
