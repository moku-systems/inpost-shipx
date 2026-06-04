export type PaginationParams = {
  page?: number;
  perPage?: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  count: number;
  page: number;
  perPage: number;
  totalPages: number | null;
};
