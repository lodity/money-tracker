export type ApiResponse<T> = {
  data: {
    success: boolean;
    statusCode: number;
    data: T;
  };
};

export type PaginatedApiResponse = {
  totalItems: number;
  totalPages: number;
  page: number;
  perPage: number;
};
