export type PaginationParams = {
  page?: number;
  perPage?: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  totalCount: number;
  count: number;
  page: number;
  perPage: number;
};
