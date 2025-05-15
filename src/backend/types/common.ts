
/**
 * Common type definitions used across the backend
 */

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}
