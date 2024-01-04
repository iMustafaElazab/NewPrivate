interface BaseResponse<T> {
  status?: boolean;
  message?: string;
  data?: T;
}

export default BaseResponse;
