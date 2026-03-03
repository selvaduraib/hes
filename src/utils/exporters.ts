/**
 * Exporters Utility
 * Helper functions for exporting data to various formats
 */

/**
 * Export data to CSV format
 * @param data - Array of objects to export
 * @param filename - Name of the file (without extension)
 */
export const exportToCSV = (data: any[], filename: string): void => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  try {
    // Get headers from first object
    const headers = Object.keys(data[0]);
    
    // Create CSV content
    const csvContent = [
      // Header row
      headers.join(','),
      // Data rows
      ...data.map(row =>
        headers
          .map(header => {
            const value = row[header];
            // Handle values that contain commas, quotes, or newlines
            if (value === null || value === undefined) {
              return '';
            }
            const stringValue = String(value);
            if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
              return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
          })
          .join(',')
      ),
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, `${filename}.csv`);
  } catch (error) {
    console.error('Error exporting to CSV:', error);
  }
};

/**
 * Export data to JSON format
 * @param data - Data to export
 * @param filename - Name of the file (without extension)
 */
export const exportToJSON = (data: any, filename: string): void => {
  try {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    downloadBlob(blob, `${filename}.json`);
  } catch (error) {
    console.error('Error exporting to JSON:', error);
  }
};

/**
 * Download blob as file
 * @param blob - Blob to download
 * @param filename - Name of the file
 */
const downloadBlob = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Copy data to clipboard
 * @param data - Data to copy
 */
export const copyToClipboard = async (data: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(data);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

/**
 * Print data
 * @param content - HTML content to print
 */
export const printContent = (content: string): void => {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
};

