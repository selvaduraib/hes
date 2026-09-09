import React from 'react';
import { Bell, Globe, Moon, Search, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import topBarData from '@/data/topBar.json';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = () => {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-mark">H</div>

        <div className="brand-text">
          <div className="brand-title">{topBarData.appName}</div>
          <div className="brand-sub">Metadata driven operations</div>
        </div>

        {/* <span className="workspace-chip">Enterprise</span> */}
      </div>

      <div className="header-search">
        <Search size={15} className="search-icon" />
        <input type="text" placeholder="Search meters, assets, or reports" />
      </div>

      <div className="header-actions">
        <button className="icon-btn" onClick={toggleLanguage} aria-label="Toggle language">
          <Globe size={16} />
        </button>

        <button
          className={`icon-btn ${theme === 'dark' ? 'active' : ''}`}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <button className="icon-btn" aria-label="Notifications">
          <Bell size={16} />
          <span className="badge-dot">4</span>
        </button>

        <div className="user-chip" aria-label="User profile">
          <div className="avatar">AR</div>
          <div className="user-meta">
            <span className="user-name">{topBarData.user.name}</span>
            <span className="user-role">{topBarData.user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

