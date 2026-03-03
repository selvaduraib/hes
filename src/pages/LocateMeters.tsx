import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Navigation } from 'lucide-react';

export const LocateMeters: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('meters.locate.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('meters.locate.subtitle')}
        </p>
      </div>

      {/* Search Bar */}
      <div className="card p-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={t('meters.locate.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <button className="btn btn-primary">
            {t('common.search')}
          </button>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="card p-6">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
              {t('meters.locate.mapView')}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              {t('meters.locate.mapPlaceholder')}
            </p>
          </div>
        </div>
      </div>

      {/* Meter List */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('meters.locate.nearbyMeters')}
        </h2>
        <div className="space-y-3">
          {[
            { id: 'M22410039131', location: '123 Main St, Building A', distance: '0.2 km', status: 'Active' },
            { id: 'M12511333446', location: '456 Oak Ave, Unit 5', distance: '0.5 km', status: 'Active' },
            { id: 'M22410038294', location: '789 Pine Rd, Floor 2', distance: '0.8 km', status: 'Inactive' },
            { id: 'M22410016727', location: '321 Elm St, Suite 10', distance: '1.2 km', status: 'Active' },
          ].map((meter, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{meter.id}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{meter.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">{meter.distance}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  meter.status === 'Active' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}>
                  {meter.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

