import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Icons from 'lucide-react';
import sidebarData from '@/data/sidebar.json';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const getIcon = (iconName?: string) => {
  if (!iconName) {
    return null;
  }

  const Icon = (Icons as Record<string, any>)[iconName];
  return Icon ? <Icon size={19} /> : null;
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onToggle }) => {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`app-nav ${!isOpen ? 'nav-collapsed' : ''}`}>
        <nav style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '6px', overflow: 'auto' }}>
          {sidebarData.map((section: any) => {
            if (!section.children) {
              return (
                <NavLink
                  key={section.id}
                  to={section.path || '#'}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                  <div className="nav-item-main">
                    <div className="nav-ic-box">
                      {getIcon(section.icon)}
                    </div>
                    {isOpen && <span className="nav-item-label">{section.label}</span>}
                  </div>
                </NavLink>
              );
            }

            return (
              <div key={section.id} className="nav-group">
                {section.label && section.id !== 'home-section' && (
                  <div className="nav-group-label">{section.label}</div>
                )}

                {section.children?.map((item: any) => (
                  <NavLink
                    key={item.id}
                    to={item.path || '#'}
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  >
                    <div className="nav-item-main">
                      <div className="nav-ic-box">
                        {getIcon(item.icon)}
                      </div>
                      {isOpen && <span className="nav-item-label">{item.label}</span>}
                    </div>
                  </NavLink>
                ))}
              </div>
            );
          })}

          <NavLink
            to="/settings"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            style={{ marginTop: 'auto' }}
          >
            <div className="nav-item-main">
              <div className="nav-ic-box">
                <Icons.Settings size={18} />
              </div>
              {isOpen && <span className="nav-item-label">Settings</span>}
            </div>
          </NavLink>
        </nav>

        <button
          className="nav-collapse-btn"
          onClick={onToggle}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? <Icons.ChevronsLeft size={16} /> : <Icons.ChevronsRight size={16} />}
          {isOpen && <span>Collapse</span>}
        </button>
      </aside>
    </>
  );
};


