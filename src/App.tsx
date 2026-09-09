import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Dashboard } from '@/pages/Dashboard';
import { WireframePage } from '@/pages/WireframePage';
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
            <Route path="asset-master-data" element={<WireframePage title="Asset & Master Data" subtitle="Asset registry and master data management" />} />
            <Route path="command-center" element={<WireframePage title="Command Center" subtitle="Operational health and event overview" />} />
            <Route path="my-work" element={<WireframePage title="My Work" subtitle="Tasks, work items and follow-ups" />} />
            <Route path="meter-data-operations" element={<Meters />} />
            <Route path="vee-data-quality" element={<WireframePage title="VEE & Data Quality" subtitle="Validation, estimation and editing" />} />
            <Route path="billing-readiness" element={<WireframePage title="Billing Readiness" subtitle="Billing cycle readiness and readiness checks" />} />
            <Route path="events-alarms" element={<CommunicationHistory />} />
            <Route path="consumer-meter-360" element={<LocateMeters />} />
            <Route path="device-operations" element={<Meters />} />
            <Route path="communication-health" element={<CommunicationOverview />} />
            <Route path="network-operations" element={<WireframePage title="Network Operations" subtitle="Network monitoring and performance" />} />
            <Route path="utility-structure" element={<Settings />} />
            <Route path="meter-data-ops" element={<WireframePage title="Meter Data & Ops Analytics" subtitle="Operational analytics and meter intelligence" />} />
            <Route path="energy-audit-loss" element={<WireframePage title="Energy Audit & Loss" subtitle="Loss analysis and audit monitoring" />} />
            <Route path="asset-reliability" element={<WireframePage title="Asset & Reliability" subtitle="Asset condition and reliability analytics" />} />
            <Route path="load-management" element={<WireframePage title="Load Management" subtitle="Demand balancing and load oversight" />} />
            <Route path="power-quality" element={<WireframePage title="Power Quality" subtitle="Voltage quality and disturbance tracking" />} />
            <Route path="revenue-protection" element={<WireframePage title="Revenue Protection" subtitle="Loss and theft prevention monitoring" />} />
            <Route path="load-forecasting" element={<WireframePage title="Load Forecasting" subtitle="Consumption forecasting and planning" />} />
            <Route path="billing-intelligence" element={<Reports />} />
            <Route path="prepaid-operations" element={<ScheduleData />} />
            <Route path="net-metering-der" element={<WireframePage title="Net Metering / DER" subtitle="Distributed energy resource monitoring" />} />
            <Route path="survey-installation" element={<WireframePage title="Survey & Installation" subtitle="Field surveying and installation tracking" />} />
            <Route path="data-integration" element={<WireframePage title="Data Integration" subtitle="Integration and ETL pipeline management" />} />
            <Route path="data-dictionary" element={<WireframePage title="Data Dictionary" subtitle="Canonical metadata definitions and schema" />} />
            <Route path="api-platform" element={<WireframePage title="API & Platform" subtitle="Platform endpoints and service enablement" />} />
            <Route path="mdm-services" element={<WireframePage title="MDM Services" subtitle="Master data management services" />} />
            <Route path="user-access" element={<WireframePage title="User Roles & Access" subtitle="Access controls and role ownership" />} />
            <Route path="security-audit" element={<WireframePage title="Security & Audit" subtitle="Audit controls and platform security" />} />
            <Route path="tenant-config" element={<WireframePage title="Tenant & Configuration" subtitle="System configuration and tenant settings" />} />
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

