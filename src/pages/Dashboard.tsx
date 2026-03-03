import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { DynamicChart } from '@/components/Charts/DynamicChart';
import { formatNumber, formatPercentage } from '@/utils/formatters';
import { CHART_COLORS } from '@/config/constants';
import dashboardData from '@/data/dashboard.json';
import communicationHistoryData from '@/data/communicationHistory.json';

// Data is now imported from JSON file
const { communicationData, meterStatusData, stats } = dashboardData;

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const statsCards = [
    {
      title: t('dashboard.totalMeters'),
      value: formatNumber(stats.totalMeters),
      icon: Activity,
      color: 'blue',
      info: t('dashboard.totalMetersInfo'),
    },
    {
      title: t('dashboard.communicating'),
      value: formatNumber(stats.communicating),
      percentage: formatPercentage(stats.communicationRate),
      trend: 'up',
      icon: TrendingUp,
      color: 'green',
    },
    {
      title: t('dashboard.nonCommunicating'),
      value: formatNumber(stats.nonCommunicating),
      percentage: formatPercentage(100 - stats.communicationRate),
      trend: 'down',
      icon: TrendingDown,
      color: 'red',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('dashboard.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('dashboard.subtitle')}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </h3>
                    {stat.percentage && (
                      <span className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.percentage}
                      </span>
                    )}
                  </div>
                  {stat.info && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {stat.info}
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DynamicChart
          metadata={{
            id: 'communication-trend',
            type: 'bar',
            title: t('dashboard.communicationHistory'),
            dataKey: 'communicating',
            categoryKey: 'month',
            valueKey: 'communicating',
            legend: true,
            tooltip: true,
            height: 300,
          }}
          data={communicationData}
        />

        <DynamicChart
          metadata={{
            id: 'meter-status',
            type: 'pie',
            title: t('dashboard.meterStatusDistribution'),
            dataKey: 'meterStatus',
            categoryKey: 'name',
            valueKey: 'value',
            legend: true,
            tooltip: true,
            height: 300,
            colors: [CHART_COLORS.SUCCESS, CHART_COLORS.DANGER],
          }}
          data={meterStatusData}
        />
      </div>

      {/* Communication History Table */}
      <div className="card">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('dashboard.recentEvents')}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('dashboard.timestamp')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('dashboard.meterNo')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('dashboard.event')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('dashboard.status')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('dashboard.duration')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {communicationHistoryData.slice(0, 5).map((event) => (
                <tr key={event.timestamp} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 text-sm">{event.timestamp}</td>
                  <td className="px-4 py-3 text-sm">{event.meterNo}</td>
                  <td className="px-4 py-3 text-sm">{event.event}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.status === 'Success'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{event.duration}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

