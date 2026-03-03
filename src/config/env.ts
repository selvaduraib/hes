/**
 * Environment Configuration
 * Type-safe access to environment variables
 */

/**
 * Environment Variables
 */
export const ENV = {
  // Environment mode
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,

  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:3000',

  // Feature Flags from environment
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API === 'true',

  // Application Settings
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Head End System',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
} as const;

/**
 * Check if running in development mode
 */
export const isDevelopment = (): boolean => {
  return ENV.DEV;
};

/**
 * Check if running in production mode
 */
export const isProduction = (): boolean => {
  return ENV.PROD;
};

/**
 * Get API base URL
 */
export const getApiUrl = (): string => {
  return ENV.API_URL;
};

/**
 * Get WebSocket URL
 */
export const getWebSocketUrl = (): string => {
  return ENV.WS_URL;
};

