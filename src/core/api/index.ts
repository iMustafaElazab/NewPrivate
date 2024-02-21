import {Axios} from 'axios';
import {ApiRequest} from 'types/api';
import httpClient from './httpClient';

// name : (request) : response => httpClient.type<response>("endpoint",request).then(response=> response.data))

const queryAuth = {
  login: (request: ApiRequest<LoginBody>): Promise<User> =>
    httpClient
      .post<LoginResponse>('/auth/login', request.body)
      .then(response => ({
        ...response.data.user,
        apiToken: `Bearer ${response.data.token}`,
      })),

  logout: () =>
    httpClient
      .post<LogoutResponse>('/auth/logout')
      .then(response => response.data),
};

interface LoginBody {
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

export default queryAuth;
