/**
 * Application Constants
 * Centralized constants used throughout the application
 */

/**
 * Pagination Settings
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

/**
 * Date & Time Formats
 */
export const DATE_FORMATS = {
  DISPLAY: 'MM/DD/YYYY',
  DISPLAY_WITH_TIME: 'MM/DD/YYYY HH:mm:ss',
  ISO: 'YYYY-MM-DD',
  TIME_ONLY: 'HH:mm:ss',
  MONTH_YEAR: 'MM/YYYY',
} as const;

/**
 * Meter Status Constants
 */
export const METER_STATUS = {
  COMMUNICATING: 'Communicating',
  NON_COMMUNICATING: 'Non Communicating',
  OFFLINE: 'Offline',
  MAINTENANCE: 'Maintenance',
} as const;

/**
 * Communication Status
 */
export const COMMUNICATION_STATUS = {
  SUCCESS: 'Success',
  FAILED: 'Failed',
  PENDING: 'Pending',
  TIMEOUT: 'Timeout',
} as const;

/**
 * Refresh Intervals (in milliseconds)
 */
export const REFRESH_INTERVALS = {
  DASHBOARD: 30000,      // 30 seconds
  METERS: 60000,         // 1 minute
  COMMUNICATION: 15000,  // 15 seconds
  REPORTS: 120000,       // 2 minutes
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  THEME: 'theme',
  LANGUAGE: 'language',
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  SIDEBAR_STATE: 'sidebar_state',
  GRID_SETTINGS: 'grid_settings',
} as const;

/**
 * Communication Intervals (in minutes)
 */
export const COMMUNICATION_INTERVALS = {
  HOURLY: 60,
  EVERY_4_HOURS: 240,
  DAILY: 1440,
  WEEKLY: 10080,
} as const;

/**
 * Export Formats
 */
export const EXPORT_FORMATS = {
  CSV: 'csv',
  EXCEL: 'excel',
  PDF: 'pdf',
} as const;

/**
 * Validation Limits
 */
export const VALIDATION_LIMITS = {
  METER_ID_LENGTH: 10,
  LOCATION_MAX_LENGTH: 200,
  NOTES_MAX_LENGTH: 1000,
  EMAIL_MAX_LENGTH: 255,
  PASSWORD_MIN_LENGTH: 8,
} as const;

/**
 * Chart Colors - Modern palette inspired by TailAdmin
 */
export const CHART_COLORS = {
  PRIMARY: '#3C50E0',      // Modern blue
  SUCCESS: '#10B981',      // Green
  WARNING: '#F59E0B',      // Amber
  DANGER: '#F87171',       // Soft red
  INFO: '#3B82F6',         // Sky blue
  SECONDARY: '#64748B',    // Slate
  PURPLE: '#8B5CF6',       // Purple
  PINK: '#EC4899',         // Pink
} as const;

/**
 * API Request Retry Settings
 */
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // milliseconds
  BACKOFF_MULTIPLIER: 2,
} as const;

/**
 * File Upload Settings
 */
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'application/pdf', 'text/csv'],
} as const;

/**
 * Notification Settings
 */
export const NOTIFICATION_CONFIG = {
  DURATION: 5000, // milliseconds
  MAX_NOTIFICATIONS: 5,
} as const;

/**
 * Application Constants
 */
export const APP_CONSTANTS = {
  APP_NAME: 'Head End System',
  APP_VERSION: '1.0.0',
  DEFAULT_TIMEZONE: 'UTC',
  SUPPORTED_LANGUAGES: ['en', 'es'],
} as const;

