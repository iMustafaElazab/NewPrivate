export interface RegisterResponse {
  status?: boolean;
  message?: string;
  data?: User;
}

export interface User {
  name?: string;
  phone?: string;
  email?: string;
  id?: number;
  image?: string;
  token?: string;
}
