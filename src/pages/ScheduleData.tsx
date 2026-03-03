import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataGrid } from '@/components/DataGrid/DataGrid';
import { DataGridMetadata } from '@/types/metadata';
import { Search, X, RefreshCw } from 'lucide-react';
import { PAGINATION } from '@/config/constants';
import scheduleDataJson from '@/data/scheduleData.json';
import DatePicker from '@/components/Form/DatePicker';

// TODO: Replace with API call when backend is ready
// import { useScheduleData } from '@/hooks/useScheduleData';

export const ScheduleData: React.FC = () => {
  const { t } = useTranslation();

  const scheduleDataGridMetadata: DataGridMetadata = {
    id: 'schedule-data-grid',
    columns: [
      {
        field: 'msn',
        header: t('scheduleData.columns.msn'),
        sortable: true,
        filterable: true,
        width: 150,
      },
      {
        field: 'hesTimestamp',
        header: t('scheduleData.columns.hesTimestamp'),
        sortable: true,
        type: 'date',
        width: 180,
      },
      {
        field: 'realTimeClock',
        header: t('scheduleData.columns.realTimeClock'),
        sortable: true,
        type: 'date',
        width: 200,
      },
      {
        field: 'cumActiveImportEnergy',
        header: t('scheduleData.columns.cumActiveImportEnergy'),
        sortable: true,
        type: 'number',
        align: 'right',
        width: 180,
      },
    ],
    pagination: {
      enabled: true,
      pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
      pageSizeOptions: [...PAGINATION.PAGE_SIZE_OPTIONS],
    },
    sorting: {
      enabled: true,
      defaultSort: { field: 'hesTimestamp', order: 'desc' },
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

  const [meterNo, setMeterNo] = useState('');
  const [selectedProfile, setSelectedProfile] = useState('1PH');
  const [selectedDlp, setSelectedDlp] = useState('DLP (Daily Profile)');
  const [dateRange, setDateRange] = useState({
    from: '2026-03-01',
    to: '2026-03-01',
  });

  const handleSearch = () => {
    console.log('Searching with:', { meterNo, selectedProfile, selectedDlp, dateRange });
  };

  const handleClear = () => {
    setMeterNo('');
  };

  const handleRefresh = () => {
    console.log('Refreshing data...');
  };

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('scheduleData.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('scheduleData.subtitle')}
        </p>
      </div>

      {/* Search Filters */}
      <div className="card p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Meter No Input */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('scheduleData.meterNo')}: <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder={t('scheduleData.msnPlaceholder')}
                value={meterNo}
                onChange={(e) => setMeterNo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Profile Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Type
            </label>
            <select
              value={selectedProfile}
              onChange={(e) => setSelectedProfile(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="1PH">1PH</option>
              <option value="3PH">3PH</option>
            </select>
          </div>

          {/* DLP Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Data Profile
            </label>
            <select
              value={selectedDlp}
              onChange={(e) => setSelectedDlp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="DLP (Daily Profile)">DLP (Daily Profile)</option>
              <option value="BLP (Billing Profile)">BLP (Billing Profile)</option>
              <option value="ELP (Event Profile)">ELP (Event Profile)</option>
            </select>
          </div>
        </div>

        {/* Date Range and Action Buttons Row */}
        <div className="flex flex-col lg:flex-row gap-4 mt-4 items-end">
          {/* Date Range Picker - Left Side */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            <DatePicker
              label={t('scheduleData.fromDate')}
              value={dateRange.from}
              onChange={(date) => setDateRange({ ...dateRange, from: date })}
              placeholder="Select start date"
            />
            <DatePicker
              label={t('scheduleData.toDate')}
              value={dateRange.to}
              onChange={(date) => setDateRange({ ...dateRange, to: date })}
              placeholder="Select end date"
            />
          </div>

          {/* Action Buttons - Right Side */}
          <div className="flex gap-2 flex-shrink-0 ml-auto">
            <button
              onClick={handleClear}
              className="btn btn-secondary flex items-center gap-2"
              title={t('common.clear')}
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
            </button>
            <button
              onClick={handleRefresh}
              className="btn btn-secondary flex items-center gap-2"
              title={t('common.refresh')}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleSearch}
              className="btn btn-primary flex items-center gap-2"
              title={t('common.search')}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <DataGrid
        metadata={scheduleDataGridMetadata}
        data={scheduleDataJson}
      />
    </div>
  );
};

