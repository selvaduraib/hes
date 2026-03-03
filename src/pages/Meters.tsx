import React from 'react';
import { useTranslation } from 'react-i18next';
import { DataGrid } from '@/components/DataGrid/DataGrid';
import { DataGridMetadata } from '@/types/metadata';
import { METER_STATUS, PAGINATION } from '@/config/constants';
import metersData from '@/data/meters.json';
// TODO: Replace with useMeters hook when API is ready
// import { useMeters } from '@/hooks/useMeters';

export const Meters: React.FC = () => {
  const { t } = useTranslation();

  const metersGridMetadata: DataGridMetadata = {
    id: 'meters-grid',
    columns: [
      { field: 'meterId', header: t('meters.columns.meterId'), sortable: true, filterable: true },
      { field: 'location', header: t('meters.columns.location'), sortable: true, filterable: true },
      { field: 'status', header: t('meters.columns.status'), sortable: true,
        render: (value) => (
          <span className={`px-2 py-1 text-xs rounded-full ${
            value === METER_STATUS.COMMUNICATING
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {value}
          </span>
        )
      },
      { field: 'lastRead', header: t('meters.columns.lastRead'), sortable: true, type: 'date' },
      { field: 'consumption', header: t('meters.columns.consumption'), sortable: true, type: 'number', align: 'right' },
      { field: 'signal', header: t('meters.columns.signal'), sortable: true, align: 'center' },
    ],
    pagination: {
      enabled: true,
      pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
      pageSizeOptions: [...PAGINATION.PAGE_SIZE_OPTIONS],
    },
    sorting: {
      enabled: true,
      defaultSort: { field: 'meterId', order: 'asc' },
    },
    filtering: {
      enabled: true,
    },
    selection: {
      enabled: true,
      mode: 'multiple',
    },
    export: {
      enabled: true,
      formats: ['csv', 'excel'],
    },
  };

  const handleRowClick = (row: any) => {
    console.log('Row clicked:', row);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('meters.all.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('meters.all.subtitle')}
        </p>
      </div>

      <DataGrid
        metadata={metersGridMetadata}
        data={metersData}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

