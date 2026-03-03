/**
 * API Configuration
 * Centralized API endpoints and configuration
 */

export const API_CONFIG = {
  // Base URL - reads from environment variable or defaults to localhost
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  
  // Request timeout in milliseconds
  timeout: 30000,
  
  // API Endpoints
  endpoints: {
    // Authentication
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      me: '/auth/me',
    },
    
    // Meters
    meters: {
      list: '/meters',
      byId: (id: string) => `/meters/${id}`,
      create: '/meters',
      update: (id: string) => `/meters/${id}`,
      delete: (id: string) => `/meters/${id}`,
      search: '/meters/search',
      export: '/meters/export',
    },
    
    // Communication
    communication: {
      overview: '/communication/overview',
      history: '/communication/history',
      byMeterId: (meterId: string) => `/communication/meter/${meterId}`,
      stats: '/communication/stats',
    },
    
    // Schedule Data
    scheduleData: {
      list: '/schedule-data',
      byId: (id: string) => `/schedule-data/${id}`,
      create: '/schedule-data',
      update: (id: string) => `/schedule-data/${id}`,
      delete: (id: string) => `/schedule-data/${id}`,
    },
    
    // Reports
    reports: {
      list: '/reports',
      generate: '/reports/generate',
      export: '/reports/export',
      byId: (id: string) => `/reports/${id}`,
    },
    
    // Settings
    settings: {
      get: '/settings',
      update: '/settings',
    },
  },
} as const;

/**
 * API Headers
 */
export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
} as const;

/**
 * API Response Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

