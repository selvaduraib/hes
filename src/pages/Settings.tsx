import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Globe, Bell, Database, MessageSquare } from 'lucide-react';

export const Settings: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    companyName: 'ACME Corporation',
    email: 'admin@example.com',
    timezone: 'UTC',
    language: 'en',
    refreshInterval: 30,
    enableNotifications: true,
    enableAutoBackup: false,
    notificationType: 'email',
    description: '',
  });

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(t('settings.saveSuccess'));
  };

  const handleCancel = () => {
    console.log('Form cancelled');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('settings.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('settings.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Company Information
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Update your company details and contact information
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('settings.fields.companyName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('settings.fields.email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder={t('settings.fields.emailPlaceholder')}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Regional Settings Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Regional Settings
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configure timezone and language preferences
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Timezone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('settings.fields.timezone')} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => handleChange('timezone', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                  <option value="IST">IST</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('settings.fields.language')} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="en">{t('settings.options.english')}</option>
                  <option value="es">{t('settings.options.spanish')}</option>
                </select>
              </div>

              {/* Refresh Interval */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('settings.fields.refreshInterval')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.refreshInterval}
                  onChange={(e) => handleChange('refreshInterval', parseInt(e.target.value))}
                  min={10}
                  max={300}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Data refresh interval (seconds)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* System Preferences Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Database className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  System Preferences
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage system behavior and automation settings
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Enable Notifications */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  {t('settings.fields.enableNotifications')}
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Receive notifications about system events
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.enableNotifications}
                  onChange={(e) => handleChange('enableNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Enable Auto Backup */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  {t('settings.fields.enableAutoBackup')}
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Automatically backup data at regular intervals
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.enableAutoBackup}
                  onChange={(e) => handleChange('enableAutoBackup', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Bell className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Notification Settings
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose how you want to receive notifications
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {t('settings.fields.notificationType')}
            </label>
            <div className="space-y-3">
              <label className="flex items-center p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="radio"
                  name="notificationType"
                  value="email"
                  checked={formData.notificationType === 'email'}
                  onChange={(e) => handleChange('notificationType', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('settings.options.email')}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Receive notifications via email
                  </div>
                </div>
              </label>

              <label className="flex items-center p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="radio"
                  name="notificationType"
                  value="sms"
                  checked={formData.notificationType === 'sms'}
                  onChange={(e) => handleChange('notificationType', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('settings.options.sms')}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Receive notifications via SMS
                  </div>
                </div>
              </label>

              <label className="flex items-center p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="radio"
                  name="notificationType"
                  value="both"
                  checked={formData.notificationType === 'both'}
                  onChange={(e) => handleChange('notificationType', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('settings.options.both')}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Receive notifications via both email and SMS
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Additional Information
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Add any additional notes or description
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('settings.fields.description')}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder={t('settings.fields.descriptionPlaceholder')}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-sm"
          >
            {t('common.saveSettings')}
          </button>
        </div>
      </form>
    </div>
  );
};
