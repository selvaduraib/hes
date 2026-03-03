# HES - Head End System

A modern, metadata-driven React application for managing and monitoring Head End Systems, built with React, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

**Live Application:** [https://hes-pi.vercel.app/](https://hes-pi.vercel.app/)

**GitHub Repository:** [https://github.com/selvaduraib/hes](https://github.com/selvaduraib/hes)

### Demo Features
- 📊 **Dashboard** - Real-time monitoring
- 📈 **Interactive Charts** - Bar charts, pie charts with modern styling
- 🔍 **Meter Management** - Search, filter, and export meter data
- 🌓 **Dark Mode** - Full theme support
- 🌍 **Multi-language** - English & Spanish
- 📱 **Responsive Design** - Works on all devices

## Features

### ✅ Metadata-Driven Architecture
- **Navigation**: Multi-level nested sidebar and top bar configured via metadata
- **DataGrid**: Fully configurable tables with sorting, filtering, pagination, and export
- **Forms**: Dynamic form generation with validation from metadata
- **Charts**: Pie and Bar charts with metadata configuration

### ✅ Internationalization (i18n)
- Multi-language support (English, Spanish)
- Easy to add more languages
- React-i18next integration

### ✅ Theme System
- Light and Dark mode
- Persistent theme selection
- Tailwind CSS with custom color schemes

### ✅ Modern Tech Stack
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 3** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Beautiful charts
- **Lucide React** - Modern icon library

## Project Structure

```
HES/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── TopBar.tsx          # Top navigation bar
│   │   │   ├── Sidebar.tsx         # Multi-level sidebar
│   │   │   └── MainLayout.tsx      # Main layout wrapper
│   │   ├── DataGrid/
│   │   │   └── DataGrid.tsx        # Metadata-driven data grid
│   │   ├── Form/
│   │   │   └── DynamicForm.tsx     # Metadata-driven forms
│   │   └── Charts/
│   │       └── DynamicChart.tsx    # Metadata-driven charts
│   ├── contexts/
│   │   └── ThemeContext.tsx        # Theme management
│   ├── config/
│   │   ├── api.ts                  # API configuration
│   │   ├── constants.ts            # Application constants
│   │   ├── env.ts                  # Environment variables
│   │   └── index.ts                # Config exports
│   ├── data/
│   │   ├── README.md               # Data folder documentation
│   │   ├── topBar.json             # Top bar configuration
│   │   ├── sidebar.json            # Sidebar menu configuration
│   │   ├── meters.json             # Meter data
│   │   ├── dashboard.json          # Dashboard statistics
│   │   ├── communicationHistory.json  # Communication logs
│   │   ├── communicationStats.json    # Communication statistics
│   │   ├── scheduleData.json       # Schedule data
│   │   └── featureFlags.json       # Feature flags
│   ├── hooks/
│   │   └── useLocalStorage.ts      # Local storage hook
│   ├── i18n/
│   │   ├── config.ts               # i18n configuration
│   │   └── locales/
│   │       ├── en.json             # English translations
│   │       └── es.json             # Spanish translations
│   ├── pages/
│   │   ├── Dashboard.tsx           # Dashboard page
│   │   ├── Meters.tsx              # Meters management
│   │   ├── LocateMeters.tsx        # Locate meters page
│   │   ├── ScheduleData.tsx        # Schedule data page
│   │   ├── CommunicationHistory.tsx   # Communication history
│   │   ├── CommunicationOverview.tsx  # Communication overview
│   │   ├── Reports.tsx             # Reports page
│   │   └── Settings.tsx            # Settings page
│   ├── services/
│   │   └── api.ts                  # API service layer
│   ├── types/
│   │   └── metadata.ts             # TypeScript type definitions
│   ├── utils/
│   │   ├── exporters.ts            # Export utilities (CSV, Excel)
│   │   └── formatters.ts           # Data formatters
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
├── DEPLOYMENT.md                   # Deployment guide
├── DEVELOPMENT_GUIDE.md            # Development guide
├── PROJECT_SUMMARY.md              # Project summary
├── VERCEL_DEPLOY_QUICK_START.md    # Quick deploy guide
├── index.html                      # HTML entry point
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── vite.config.ts                  # Vite config
├── tailwind.config.js              # Tailwind CSS config
├── postcss.config.js               # PostCSS config
├── vercel.json                     # Vercel deployment config
└── .vercelignore                   # Vercel ignore file
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Type Checking

```bash
npm run lint
```

## Metadata Configuration

### Navigation Menu

Configure the sidebar menu in `src/config/appMetadata.ts`:

```typescript
sidebar: [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',  // Lucide icon name
    path: '/',
  },
  {
    id: 'meters',
    label: 'Meters',
    icon: 'Gauge',
    children: [
      {
        id: 'all-meters',
        label: 'All Meters',
        path: '/meters/all',
      },
    ],
  },
]
```

### DataGrid

Define grid columns and behavior:

```typescript
const gridMetadata: DataGridMetadata = {
  id: 'meters-grid',
  columns: [
    { field: 'meterId', header: 'Meter ID', sortable: true },
    { field: 'status', header: 'Status', render: (value) => <Badge>{value}</Badge> },
  ],
  pagination: { enabled: true, pageSize: 10 },
  sorting: { enabled: true },
  filtering: { enabled: true },
  export: { enabled: true, formats: ['csv'] },
};
```

### Forms

Create dynamic forms from metadata:

```typescript
const formMetadata: FormMetadata = {
  id: 'settings-form',
  fields: [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'timezone', label: 'Timezone', type: 'select', options: [...] },
  ],
};
```

### Charts

Configure charts with metadata:

```typescript
<DynamicChart
  metadata={{
    type: 'pie',
    title: 'Meter Status',
    categoryKey: 'name',
    valueKey: 'value',
    legend: true,
  }}
  data={chartData}
/>
```

## Adding New Languages

1. Create a new JSON file in `src/i18n/locales/` (e.g., `fr.json`)
2. Import it in `src/i18n/config.ts`
3. Add to the resources object
4. Update `appMetadata.ts` to include the new language

## Customizing Theme

Edit `tailwind.config.js` to customize colors, fonts, and other design tokens.

## License

ISC

