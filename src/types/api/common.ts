export type ApiListResponse<T> = {
  items: T[];
  count: number;
  page: number;
  per_page: number;
  total_pages: number;
};
