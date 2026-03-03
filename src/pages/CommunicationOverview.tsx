import React from 'react';
import { useTranslation } from 'react-i18next';
import { Radio, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { formatNumber, formatPercentage } from '@/utils/formatters';
import communicationStatsData from '@/data/communicationStats.json';
import communicationHistoryData from '@/data/communicationHistory.json';

export const CommunicationOverview: React.FC = () => {
  const { t } = useTranslation();
  // TODO: Replace with API call when backend is ready
  // const { stats, loading, error } = useCommunicationStats();

  // Data is now imported from JSON files
  const stats = communicationStatsData;

  // Get the latest 4 communication events for recent activity
  const recentActivity = communicationHistoryData.slice(0, 4).map(event => ({
    time: new Date(event.timestamp).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }),
    message: `Meter ${event.meterNo} - ${event.event}`,
    status: event.status.toLowerCase() === 'success' ? 'success' : 'error'
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('communication.overview.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('communication.overview.subtitle')}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('communication.overview.totalMeters')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatNumber(stats.totalMeters)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Radio className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('communication.overview.communicating')}</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{formatNumber(stats.communicating)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{formatPercentage(stats.successRate)} {t('communication.overview.successRate')}</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('communication.overview.nonCommunicating')}</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{formatNumber(stats.nonCommunicating)}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{formatPercentage(stats.failureRate)} {t('communication.overview.failureRate')}</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('communication.overview.activeSessions')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatNumber(stats.activeSessions)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Communication Status */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('communication.overview.communicationStatus')}
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">{t('communication.overview.successfulCommunications')}</span>
              <span className="text-gray-900 dark:text-white font-medium">{formatPercentage(stats.successRate)}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${stats.successRate}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">{t('communication.overview.failedCommunications')}</span>
              <span className="text-gray-900 dark:text-white font-medium">{formatPercentage(stats.failureRate)}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: `${stats.failureRate}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('communication.overview.recentActivity')}
        </h2>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
              <div className={`w-2 h-2 rounded-full mt-2 ${activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

