import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Dashboard } from '@/pages/Dashboard';
import { Meters } from '@/pages/Meters';
import { Settings } from '@/pages/Settings';
import { ScheduleData } from '@/pages/ScheduleData';
import { CommunicationOverview } from '@/pages/CommunicationOverview';
import { CommunicationHistory } from '@/pages/CommunicationHistory';
import { LocateMeters } from '@/pages/LocateMeters';
import { Reports } from '@/pages/Reports';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="communication/overview" element={<CommunicationOverview />} />
            <Route path="communication/history" element={<CommunicationHistory />} />
            <Route path="meters/all" element={<Meters />} />
            <Route path="meters/locate" element={<LocateMeters />} />
            <Route path="schedule-data" element={<ScheduleData />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

