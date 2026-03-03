import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { MenuItem } from '@/types/metadata';
import * as Icons from 'lucide-react';
import sidebarData from '@/data/sidebar.json';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarItem: React.FC<{ item: MenuItem; level?: number; isCollapsed?: boolean }> = ({
  item,
  level = 0,
  isCollapsed = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  // Get icon component dynamically
  const IconComponent = item.icon ? (Icons as any)[item.icon] : null;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const itemContent = (
    <div
      className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
        level > 0 ? 'pl-' + (4 + level * 4) : ''
      }`}
      onClick={handleClick}
      title={isCollapsed ? item.label : ''}
    >
      <div className="flex items-center gap-3">
        {IconComponent && <IconComponent className="w-5 h-5 flex-shrink-0" />}
        {!isCollapsed && (
          <>
            <span className="text-sm font-medium">{item.label}</span>
            {item.badge && (
              <span className="px-2 py-0.5 text-xs bg-blue-600 text-white rounded-full">
                {item.badge}
              </span>
            )}
          </>
        )}
      </div>
      {hasChildren && !isCollapsed && (
        <span className="text-gray-400">
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </span>
      )}
    </div>
  );

  return (
    <div>
      {item.path && !hasChildren ? (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `block ${
              isActive
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600'
                : 'text-gray-700 dark:text-gray-300'
            }`
          }
        >
          {itemContent}
        </NavLink>
      ) : (
        <div className="text-gray-700 dark:text-gray-300">{itemContent}</div>
      )}

      {/* Render children */}
      {hasChildren && isExpanded && !isCollapsed && (
        <div className="bg-gray-50 dark:bg-gray-800/50">
          {item.children!.map((child) => (
            <SidebarItem key={child.id} item={child} level={level + 1} isCollapsed={isCollapsed} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = sidebarData as MenuItem[];

  return (
    <>
      {/* Mobile Overlay - only show on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transition-all duration-300 ${
          isOpen
            ? 'w-64 translate-x-0'
            : 'w-20 -translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className="h-full overflow-y-auto py-4">
          {menuItems.map((item) => (
            <SidebarItem key={item.id} item={item} isCollapsed={!isOpen} />
          ))}
        </nav>
      </aside>
    </>
  );
};

