import React from 'react';
import { Menu, Moon, Sun, Globe, Bell, User } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import topBarData from '@/data/topBar.json';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 fixed top-0 left-0 right-0 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={t('common.toggleMenu')}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: topBarData.logo.backgroundColor }}
            >
              <span className="text-white font-bold text-sm">{topBarData.logo.text}</span>
            </div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white hidden sm:block">
              {topBarData.appName}
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          {topBarData.actions.find(a => a.type === 'language-toggle')?.enabled && (
            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title={topBarData.actions.find(a => a.type === 'language-toggle')?.title}
            >
              <Globe className="w-5 h-5" />
            </button>
          )}

          {/* Theme Toggle */}
          {topBarData.actions.find(a => a.type === 'theme-toggle')?.enabled && (
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title={topBarData.actions.find(a => a.type === 'theme-toggle')?.title}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          )}

          {/* Notifications */}
          {topBarData.notifications.enabled && (
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg relative">
              <Bell className="w-5 h-5" />
              {topBarData.notifications.showBadge && topBarData.notifications.count > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          )}

          {/* User Menu */}
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{topBarData.user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{topBarData.user.role}</p>
            </div>
            <button className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

