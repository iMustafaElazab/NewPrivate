import {
  UseMutationOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import queryAuth, {LoginBody, LoginResponse} from 'core/api';
import {ApiRequest, ServerError} from 'core/api/httpClient';
import BaseResponse from 'types/api/BaseResponse';

export const useLoginMutation = (
  options?: Omit<
    UseMutationOptions<
      BaseResponse<LoginResponse>,
      ServerError,
      ApiRequest<LoginBody>
    >,
    'mutationFn'
  >,
) =>
  useMutation<BaseResponse<LoginResponse>, ServerError, ApiRequest<LoginBody>>({
    mutationFn: request => queryAuth.login(request),
    ...(options ?? {}),
  });

export const useProfileQuery = () => {
  return useQuery({queryFn: () => queryAuth.profile(), queryKey: ['profile']});
};

export const useNotificationQuery = () => {
  return useInfiniteQuery({
    queryKey: ['notification'],
    queryFn: ({pageParam = 1}) => queryAuth.notification({params: pageParam}),
    initialPageParam: {
      // TODO: Change `params` object to match API.
      params: {page: 1, size: 10},
    },
    getNextPageParam: response => {
      if (response.data?.meta.current_page === response.data?.meta.last_page) {
        return undefined;
      }
      return response.data.meta.current_page + 1;
    },
  });
};

const useGetNotificationsApi = (
  options?: Omit<
    UseInfiniteQueryOptions<
      PagingResponse<Notification>,
      ServerError,
      InfiniteData<PagingResponse<Notification>, ApiRequest>,
      any,
      QueryKey,
      ApiRequest
    >,
    'queryFn' | 'queryKey' | 'initialPageParam' | 'getNextPageParam'
  >,
) =>
  useInfiniteQuery<
    PagingResponse<Notification>,
    ServerError,
    InfiniteData<PagingResponse<Notification>, ApiRequest>,
    QueryKey,
    ApiRequest
  >({
    queryFn: ({pageParam}) => queryNotifications.getNotifications(pageParam),
    queryKey: ['notifications'],
    initialPageParam: {
      // TODO: Change `params` object to match API.
      params: {page: 1, size: 10},
    },
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.currentPage === lastPage.lastPage
        ? undefined
        : {
            // TODO: Change `params` object to match API.
            params: {
              page: (lastPage.currentPage ?? 1) + 1,
              size: lastPageParam.params?.size,
            },
          },
    ...(options ?? {}),
  });
