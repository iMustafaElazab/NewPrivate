import {Axios} from 'axios';
import {ApiRequest} from 'types/api';
import httpClient from './httpClient';

// name : (request) : response => httpClient.type<response>("endpoint",request).then(response=> response.data))

const queryAuth = {
  login: (
    request: ApiRequest<LoginBody>,
  ): Promise<BaseResponse<LoginResponse>> =>
    httpClient
      .post<BaseResponse<LoginResponse>>('/auth/login', request.body)
      .then(response => response.data),

  logout: () =>
    httpClient
      .post<LogoutResponse>('/auth/logout')
      .then(response => response.data),

  profile: (): Promise<BaseResponse<User>> =>
    httpClient
      .get<BaseResponse<User>>('/auth/profile')
      .then(response => response.data),

  notification: (
    request: ApiRequest<any>,
  ): Promise<BaseResponse<NotificationResponse>> =>
    httpClient
      .get<BaseResponse<NotificationResponse>>('/notifications/list', {
        params: request.params,
      })
      .then(response => response.data),
};

export interface BaseResponse<T> {
  status: number;
  message: string;
  errors: Errors | undefined;
  data: T | undefined;
}

export interface Errors {
  message: string[];
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface LogoutResponse {
  status: number;
  message: string;
}

export interface User {
  customer_type: any[];
  roles: string;
  roles_ids: number[];
  role_id: number;
  permissions: any[];
  id: number;
  customer_type_id: number;
  name: string;
  unread_notifications_count: number;
  tenant_id: number;
  type: number;
  is_auctioneer: boolean;
  is_bidder: boolean;
  type_text: string;
  tenant: any;
  image: string;
  is_active: boolean;
  is_notifiable: number;
  bidder_active: boolean;
  deactivated_by: string;
  created_at: string;
  email: string;
  phone: string;
}

export interface NotificationResponse {
  data: Daum[];
  links: Links;
  meta: Meta;
  status: number;
}

export interface Daum {
  id: string;
  title: string;
  description: string;
  url: string;
  action?: string;
  action_id?: string;
  created_at: string;
  read_at?: string;
}

export interface Links {
  first: string;
  last: string;
  prev: any;
  next: string;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export default queryAuth;
