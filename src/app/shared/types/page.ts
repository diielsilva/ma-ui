export interface Page<T> {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  content: T[];
}
