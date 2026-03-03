/**
 * Formatters Utility
 * Helper functions for formatting dates, numbers, and other data
 */

/**
 * Format date to display format (MM/DD/YYYY)
 */
export const formatDate = (date: string | Date): string => {
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return 'Invalid Date';
    }
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

/**
 * Format date and time to display format (MM/DD/YYYY HH:mm:ss)
 */
export const formatDateTime = (date: string | Date): string => {
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return 'Invalid Date';
    }
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  } catch (error) {
    console.error('Error formatting datetime:', error);
    return 'Invalid Date';
  }
};

/**
 * Format time only (HH:mm:ss)
 */
export const formatTime = (date: string | Date): string => {
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return 'Invalid Time';
    }
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Invalid Time';
  }
};

/**
 * Format number with thousand separators
 */
export const formatNumber = (num: number, decimals: number = 0): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  } catch (error) {
    console.error('Error formatting number:', error);
    return String(num);
  }
};

/**
 * Format consumption value (kWh)
 */
export const formatConsumption = (kwh: number): string => {
  return `${formatNumber(kwh, 2)} kWh`;
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${formatNumber(value, decimals)}%`;
};

/**
 * Format currency
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `$${formatNumber(amount, 2)}`;
  }
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Format duration (milliseconds to human readable)
 */
export const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

