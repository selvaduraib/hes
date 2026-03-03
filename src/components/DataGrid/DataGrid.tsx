import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Download } from 'lucide-react';
import { DataGridMetadata, ColumnMetadata } from '@/types/metadata';

interface DataGridProps {
  metadata: DataGridMetadata;
  data: any[];
  onRowClick?: (row: any) => void;
}

export const DataGrid: React.FC<DataGridProps> = ({ metadata, data, onRowClick }) => {
  const { t } = useTranslation();
  const [sortConfig, setSortConfig] = useState<{ field: string; order: 'asc' | 'desc' } | null>(
    metadata.sorting?.defaultSort || null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(metadata.pagination?.pageSize || 10);
  const [searchTerm, setSearchTerm] = useState('');

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.field];
      const bVal = b[sortConfig.field];
      
      if (aVal < bVal) return sortConfig.order === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Filtering logic
  const filteredData = useMemo(() => {
    if (!searchTerm) return sortedData;
    
    return sortedData.filter(row =>
      metadata.columns.some(col =>
        String(row[col.field]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedData, searchTerm, metadata.columns]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!metadata.pagination?.enabled) return filteredData;
    
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize, metadata.pagination]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleSort = (field: string) => {
    if (!metadata.sorting?.enabled) return;
    
    setSortConfig(prev => {
      if (prev?.field === field) {
        return { field, order: prev.order === 'asc' ? 'desc' : 'asc' };
      }
      return { field, order: 'asc' };
    });
  };

  const handleExport = () => {
    // Simple CSV export
    const headers = metadata.columns.map(col => col.header).join(',');
    const rows = filteredData.map(row =>
      metadata.columns.map(col => row[col.field]).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${metadata.id}_export.csv`;
    a.click();
  };

  const renderSortIcon = (column: ColumnMetadata) => {
    if (!column.sortable) return null;
    
    if (sortConfig?.field === column.field) {
      return sortConfig.order === 'asc' ? 
        <ArrowUp className="w-4 h-4" /> : 
        <ArrowDown className="w-4 h-4" />;
    }
    return <ArrowUpDown className="w-4 h-4 opacity-30" />;
  };

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-4 justify-between">
        {metadata.filtering?.enabled && (
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('common.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            />
          </div>
        )}
        
        {metadata.export?.enabled && (
          <button onClick={handleExport} className="btn btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            {t('common.export')}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              {metadata.selection?.enabled && (
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded" />
                </th>
              )}
              {metadata.columns.map((column) => (
                <th
                  key={column.field}
                  className={`px-4 py-3 text-${column.align || 'left'} text-sm font-semibold text-gray-700 dark:text-gray-300`}
                  style={{ width: column.width }}
                >
                  <div
                    className={`flex items-center gap-2 ${column.sortable ? 'cursor-pointer select-none' : ''}`}
                    onClick={() => column.sortable && handleSort(column.field)}
                  >
                    {column.header}
                    {renderSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((row, idx) => (
              <tr
                key={idx}
                onClick={() => onRowClick?.(row)}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
              >
                {metadata.selection?.enabled && (
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded" />
                  </td>
                )}
                {metadata.columns.map((column) => (
                  <td
                    key={column.field}
                    className={`px-4 py-3 text-${column.align || 'left'} text-sm text-gray-900 dark:text-gray-100`}
                  >
                    {column.render ? column.render(row[column.field], row) : row[column.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {metadata.pagination?.enabled && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
            {/* Entries info */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t('common.showing')} {filteredData.length === 0 ? 0 : ((currentPage - 1) * pageSize) + 1} {t('common.to')} {Math.min(currentPage * pageSize, filteredData.length)} {t('common.of')} {filteredData.length} {t('common.entries')}
            </div>

            {/* Page Size Selector */}
            {metadata.pagination.pageSizeOptions && metadata.pagination.pageSizeOptions.length > 0 && (
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">{t('common.show')}:</label>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1); // Reset to first page when changing page size
                  }}
                  className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                >
                  {metadata.pagination.pageSizeOptions.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Page navigation (only show if more than 1 page) */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {t('common.previous')}
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {t('common.next')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

