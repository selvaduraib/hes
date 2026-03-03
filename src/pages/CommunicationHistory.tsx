import React from 'react';
import { useTranslation } from 'react-i18next';
import { DataGrid } from '@/components/DataGrid/DataGrid';
import { DataGridMetadata } from '@/types/metadata';
import { PAGINATION } from '@/config/constants';
import communicationHistoryData from '@/data/communicationHistory.json';

// TODO: Replace with API call when backend is ready
// import { useCommunicationHistory } from '@/hooks/useCommunicationHistory';

export const CommunicationHistory: React.FC = () => {
  const { t } = useTranslation();

  const historyGridMetadata: DataGridMetadata = {
    id: 'communication-history-grid',
    columns: [
      { field: 'timestamp', header: t('dashboard.timestamp'), sortable: true, type: 'date', width: 180 },
      { field: 'meterNo', header: t('dashboard.meterNo'), sortable: true, filterable: true, width: 150 },
      { field: 'event', header: t('dashboard.event'), sortable: true, filterable: true, width: 200 },
      { field: 'status', header: t('dashboard.status'), sortable: true, filterable: true, width: 120 },
      { field: 'duration', header: t('dashboard.duration'), sortable: true, type: 'number', align: 'right', width: 120 },
    ],
    pagination: {
      enabled: true,
      pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
      pageSizeOptions: [...PAGINATION.PAGE_SIZE_OPTIONS],
    },
    sorting: {
      enabled: true,
      defaultSort: { field: 'timestamp', order: 'desc' },
    },
    filtering: {
      enabled: true,
    },
    selection: {
      enabled: false,
      mode: 'single',
    },
    export: {
      enabled: true,
      formats: ['csv'],
    },
  };

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('communication.history.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('communication.history.subtitle')}
        </p>
      </div>

      {/* Data Grid */}
      <DataGrid
        metadata={historyGridMetadata}
        data={communicationHistoryData}
      />
    </div>
  );
};

