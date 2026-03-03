# HES - Head End System

A modern, metadata-driven React application for managing and monitoring Head End Systems, built with React, TypeScript, and Tailwind CSS.

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
│   ├── i18n/
│   │   ├── config.ts               # i18n configuration
│   │   └── locales/
│   │       ├── en.json             # English translations
│   │       └── es.json             # Spanish translations
│   ├── pages/
│   │   ├── Dashboard.tsx           # Dashboard page
│   │   ├── Meters.tsx              # Meters management
│   │   └── Settings.tsx            # Settings page
│   ├── types/
│   │   └── metadata.ts             # TypeScript type definitions
│   ├── config/
│   │   └── appMetadata.ts          # Application metadata config
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
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

