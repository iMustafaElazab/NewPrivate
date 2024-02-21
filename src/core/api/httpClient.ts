import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Config from 'react-native-config';

const getLogMessage = (message: string) => `## HttpClient:: ${message}`;

const addHeaders = (config: InternalAxiosRequestConfig<any>) => {
  config.headers.Accept = 'application/json';
  config.headers['Content-Type'] = 'application/json';
  //  config.headers['Accept-Language'] = getCurrentLocale();
  config.headers['cache-control'] = 'no-cache';
  //   const token = store.getState().user?.user?.apiToken;

  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
};

const requestFulfilledInterceptor = (
  config: InternalAxiosRequestConfig<any>,
) => {
  addHeaders(config);
  console.info(getLogMessage(`🚀 Request to %c${config.url}`), config);

  return config;
};

const requestRejectedInterceptor = (error: any) => {
  console.error(
    getLogMessage(
      `🚫 Error Sending Request to %c${error.response?.config?.url}`,
    ),
    error,
  );
  return Promise.reject(error);
};

const responseFulfilledInterceptor = (response: AxiosResponse<any, any>) => {
  console.info(
    getLogMessage(`✅ Got Response from %c${response.config.url}`),
    response,
  );

  return response;
};

const responseRejectedInterceptor = (error: any) => {
  console.error(
    getLogMessage(`❌ Got Error from %c${error.response?.config?.url}`),
    error,
  );

  if (axios.isAxiosError<ServerErrorResponse>(error)) {
    return handleAxiosError(error);
  }

  const severError: ServerError = {
    ...error,
    errorMessage: 'unknown_error',
  };

  return Promise.reject(severError);
};

const handleAxiosError = (error: AxiosError<ServerErrorResponse>) => {
  console.info(getLogMessage('handleAxiosError'), error);
  // handle401Error(error);

  const severError: ServerError = {
    ...error,
    date: new Date(),
    status: error.response?.status,
    data: error.response?.data,
    errorMessage: getErrorMessage(error),
  };

  return Promise.reject(severError);
};

// const shouldSkip401 = (error: AxiosError<ServerErrorResponse>) => {
//   console.info(getLogMessage('shouldSkip401'), error);
//   const responseUrl = error.request?.responseURL;
//   console.info(getLogMessage('responseUrl'), responseUrl);

//   const isSkip401Url: boolean =
//     responseUrl &&
//     typeof responseUrl === 'string' &&
//     skip401Urls.some(url => responseUrl.indexOf(url) > -1);

//   console.info(getLogMessage('isSkip401Url'), isSkip401Url);
//   return isSkip401Url;
// };

const getErrorMessage = (error: AxiosError<ServerErrorResponse>) => {
  let errorMessage: string = 'unknown_error';

  if (error.response?.data?.error) {
    errorMessage = error.response?.data?.error;
  } else if (
    error.response?.data?.errors &&
    typeof error.response.data.errors === 'string'
  ) {
    errorMessage = error.response?.data?.errors;
  } else if (
    error.response?.data?.errors &&
    typeof error.response.data.errors === 'object' &&
    error.response.data.errors.message &&
    error.response.data.errors.message.length
  ) {
    errorMessage = error.response?.data?.errors?.message?.join('\n');
  } else if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message;
  } else if (error.message) {
    errorMessage = error.message;
  }

  return errorMessage;
};

const httpClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 60 * 1 * 1000,
  timeoutErrorMessage: 'network_error',
});

httpClient.interceptors.request.use(
  requestFulfilledInterceptor,
  requestRejectedInterceptor,
);

httpClient.interceptors.response.use(
  responseFulfilledInterceptor,
  responseRejectedInterceptor,
);

export default httpClient;

interface ServerError extends AxiosError<ServerErrorResponse> {
  date?: Date;
  status?: number;
  data?: ServerErrorResponse;
  errorMessage?: string;
}

interface ServerErrorResponseErrors {
  message?: string[];
}

interface ServerErrorResponse {
  error?: string;
  errors?: string | ServerErrorResponseErrors;
  message?: string;
}

export interface ApiRequest<T = any, R = any> {
  params?: Record<string, any>;
  body?: T;
  pathVar?: R;
}
