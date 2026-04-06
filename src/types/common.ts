export type PaginationParams = {
  page?: number;
  perPage?: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  perPage: number;
  totalPages: number;
  totalCount: number;
};
