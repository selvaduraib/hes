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
      {isOpen && <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={onClose} />}

      <aside className={`app-nav ${isOpen ? '' : 'nav-collapsed'}`}>
        

        <nav>
          {sidebarData.map((section: any) => {
            if (!section.children) {
              return (
                <NavLink
                  key={section.id}
                  to={section.path || '#'}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  style={{
                    padding: '10px 12px 10px 10px',
                    marginBottom: '6px',
                    borderRadius: '10px',
                    minHeight: '40px',
                  }}
                >
                  <div className="nav-item-main" style={{ gap: 12 }}>
                    <div className="nav-ic-box" style={{ width: 26, height: 26, borderRadius: 8 }}>
                      {getIcon(section.icon)}
                    </div>
                    {isOpen && <span className="nav-item-label" style={{ fontSize: 15, fontWeight: 500 }}>{section.label}</span>}
                  </div>
                </NavLink>
              );
            }

            return (
              <div key={section.id} className="nav-group">
                {section.label && section.id !== 'home-section' && (
                  <div className="nav-group-label" style={{ marginBottom: 8 }}>
                    {section.label}
                  </div>
                )}

                {section.children?.map((item: any) => (
                  <NavLink
                    key={item.id}
                    to={item.path || '#'}
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    style={{
                      padding: '10px 12px 10px 10px',
                      marginBottom: '6px',
                      borderRadius: '10px',
                      minHeight: '40px',
                    }}
                  >
                    <div className="nav-item-main" style={{ gap: 12 }}>
                      <div className="nav-ic-box" style={{ width: 26, height: 26, borderRadius: 8 }}>
                        {getIcon(item.icon)}
                      </div>
                      {isOpen && <span className="nav-item-label" style={{ fontSize: 15, fontWeight: 500 }}>{item.label}</span>}
                    </div>
                  </NavLink>
                ))}
              </div>
            );
          })}
        </nav>

        <NavLink
          to="/settings"
          className={({ isActive }) => `nav-footer-item ${isActive ? 'active' : ''}`}
          style={{ marginTop: 'auto' }}
        >
          <div className="nav-item-main" style={{ gap: 12 }}>
            <div className="nav-ic-box" style={{ width: 26, height: 26, borderRadius: 8 }}>
              <Icons.Settings size={18} />
            </div>
            {isOpen && <span className="nav-item-label" style={{ fontSize: 15, fontWeight: 500 }}>Settings</span>}
          </div>
        </NavLink>

        <button
          className="nav-collapse-btn"
          onClick={onToggle}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? <Icons.PanelLeftClose size={14} /> : <Icons.PanelLeftOpen size={14} />}
          {isOpen && <span>Collapse</span>}
        </button>
      </aside>
    </>
  );
};


