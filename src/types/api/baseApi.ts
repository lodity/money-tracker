export type ApiResponse<T> = {
  data: {
    success: boolean;
    statusCode: number;
    data: T;
  }
};