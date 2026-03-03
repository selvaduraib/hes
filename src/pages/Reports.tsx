import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Download } from 'lucide-react';

export const Reports: React.FC = () => {
  const { t } = useTranslation();

  const reportTypes = [
    {
      key: 'communication',
      icon: FileText,
      color: 'blue',
    },
    {
      key: 'meterStatus',
      icon: FileText,
      color: 'green',
    },
    {
      key: 'energyConsumption',
      icon: FileText,
      color: 'purple',
    },
    {
      key: 'billing',
      icon: FileText,
      color: 'orange',
    },
    {
      key: 'eventLog',
      icon: FileText,
      color: 'red',
    },
    {
      key: 'custom',
      icon: FileText,
      color: 'gray',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('reports.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('reports.subtitle')}
        </p>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report, index) => (
          <div key={index} className="card p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className={`w-12 h-12 bg-${report.color}-100 dark:bg-${report.color}-900 rounded-lg flex items-center justify-center mb-4`}>
              <report.icon className={`w-6 h-6 text-${report.color}-600 dark:text-${report.color}-400`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t(`reports.types.${report.key}.title`)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {t(`reports.types.${report.key}.description`)}
            </p>
            <button className="btn btn-primary w-full flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              {t('reports.generate')}
            </button>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('reports.recentReports')}
        </h2>
        <div className="space-y-3">
          {[
            { name: 'Communication Report - March 2026', date: '2026-03-01', size: '2.4 MB' },
            { name: 'Meter Status Report - February 2026', date: '2026-02-28', size: '1.8 MB' },
            { name: 'Energy Consumption Report - February 2026', date: '2026-02-28', size: '3.2 MB' },
            { name: 'Billing Report - January 2026', date: '2026-01-31', size: '4.1 MB' },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{report.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {report.date} • {report.size}
                  </p>
                </div>
              </div>
              <button className="btn btn-secondary flex items-center gap-2">
                <Download className="w-4 h-4" />
                {t('reports.download')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

