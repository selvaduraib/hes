import React from 'react';
import { PanelLeftClose, PanelLeftOpen, Moon, Sun, Globe, Bell } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import topBarData from '@/data/topBar.json';

interface TopBarProps {
  onMenuClick: () => void;
  isSidebarOpen?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick, isSidebarOpen = true }) => {
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-mark">
          {topBarData.logo.text}
        </div>
        
        <div className="brand-text">
          <div className="brand-title">{topBarData.appName}</div>
        </div>

        <button
          onClick={onMenuClick}
          className="sidebar-toggle-btn"
          aria-label="Toggle sidebar"
          style={{ marginLeft: 'auto' }}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelLeftOpen className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="header-search">
        <input 
          type="text" 
          placeholder="Search meters, assets, or reports"
          aria-label="Search"
        />
        <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="m10.5 10.5 3.5 3.5" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>

      <div className="header-actions">
        <button
          className="icon-btn"
          onClick={toggleLanguage}
          aria-label="Toggle language"
          title={t('common.toggleLanguage') || 'Toggle language'}
        >
          <Globe className="w-5 h-5" />
        </button>

        <button
          className="icon-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={t('common.toggleTheme') || 'Toggle theme'}
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        <button
          className="icon-btn"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="badge-dot">4</span>
        </button>

        <div className="user-chip">
          <div className="avatar">{topBarData.user.name.substring(0, 2).toUpperCase()}</div>
          <div className="user-meta">
            <span className="user-name">{topBarData.user.name}</span>
            <span className="user-role">{topBarData.user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

