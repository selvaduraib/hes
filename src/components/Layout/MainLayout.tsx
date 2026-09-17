import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';

export const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`app-shell ${sidebarOpen ? '' : 'nav-collapsed'}`}>
      <TopBar isOpen={sidebarOpen} onMenuClick={() => setSidebarOpen((prev) => !prev)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      <main className="app-main">
        <div id="main-scroll">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

