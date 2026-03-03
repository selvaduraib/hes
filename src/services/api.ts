/**
 * API Client
 * Base API client with interceptors for authentication and error handling
 *
 * NOTE: This file is currently disabled as we're using JSON data files.
 * Uncomment and install axios when ready to integrate with real API.
 */

// TODO: Install axios before using this file
// npm install axios

/* eslint-disable @typescript-eslint/no-unused-vars */
// import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
// import { API_CONFIG, HTTP_STATUS } from '@/config/api';
// import { STORAGE_KEYS } from '@/config/constants';

/*
 * Create Axios instance
 */
/*
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
*/

/*
 * Request Interceptor
 * Adds authentication token to requests
 */
/*
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get auth token from localStorage
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
*/

/*
 * Response Interceptor
 * Handles responses and errors globally
 */
/*
apiClient.interceptors.response.use(
  (response) => {
    // Return only the data from the response
    return response.data;
  },
  (error: AxiosError) => {
    // Handle different error status codes
    if (error.response) {
      switch (error.response.status) {
        case HTTP_STATUS.UNAUTHORIZED:
          // Clear auth token and redirect to login
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          window.location.href = '/login';
          break;

        case HTTP_STATUS.FORBIDDEN:
          console.error('Access forbidden:', error.response.data);
          break;

        case HTTP_STATUS.NOT_FOUND:
          console.error('Resource not found:', error.response.data);
          break;

        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          console.error('Server error:', error.response.data);
          break;

        default:
          console.error('API error:', error.response.data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);
*/

/*
 * API Error Handler
 */
/*
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data?.message || 'An error occurred';
    } else if (error.request) {
      return 'Network error. Please check your connection.';
    }
  }
  return 'An unexpected error occurred';
};
*/

/*
 * Set authentication token
 */
/*
export const setAuthToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};
*/

/*
 * Clear authentication token
 */
/*
export const clearAuthToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
};
*/

// Placeholder exports to prevent import errors
export const apiClient = null;
export const handleApiError = () => 'API not configured';
export const setAuthToken = () => {};
export const clearAuthToken = () => {};
export const getAuthToken = (): string | null => null;

