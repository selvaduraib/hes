# HES Development Guide

## Overview

This guide will help you understand and extend the HES (Head End System) application. The application is built with a **metadata-driven architecture**, meaning most UI components are configured through JSON/TypeScript metadata rather than hardcoded.

## Core Concepts

### 1. Metadata-Driven Architecture

Instead of creating components manually for each page, you define metadata that describes:
- What fields a form should have
- What columns a table should display
- What type of chart to render
- How navigation should be structured

**Benefits:**
- Rapid development
- Consistency across the application
- Easy to modify without changing code
- Configuration can be stored in a database

### 2. Component Structure

#### Layout Components

**TopBar** (`src/components/Layout/TopBar.tsx`)
- Fixed header with app title
- Theme toggle (light/dark)
- Language switcher
- User profile menu
- Notifications

**Sidebar** (`src/components/Layout/Sidebar.tsx`)
- Multi-level nested navigation
- Expandable/collapsible menu items
- Active route highlighting
- Mobile-responsive with overlay

**MainLayout** (`src/components/Layout/MainLayout.tsx`)
- Combines TopBar and Sidebar
- Manages sidebar open/close state
- Provides outlet for page content

#### DataGrid Component

**Features:**
- Sorting (click column headers)
- Filtering (search box)
- Pagination
- Row selection
- Export to CSV
- Custom cell rendering

**Usage Example:**
```typescript
import { DataGrid } from '@/components/DataGrid/DataGrid';

const metadata: DataGridMetadata = {
  id: 'my-grid',
  columns: [
    { 
      field: 'id', 
      header: 'ID', 
      sortable: true,
      width: 100 
    },
    { 
      field: 'status', 
      header: 'Status',
      render: (value) => (
        <span className={value === 'active' ? 'text-green-600' : 'text-red-600'}>
          {value}
        </span>
      )
    },
  ],
  pagination: { enabled: true, pageSize: 20 },
  sorting: { enabled: true },
  filtering: { enabled: true },
  export: { enabled: true, formats: ['csv'] },
};

<DataGrid metadata={metadata} data={myData} />
```

#### Dynamic Form Component

**Features:**
- All HTML5 input types
- Select dropdowns
- Radio buttons
- Checkboxes
- Switches
- Validation (required, min/max, pattern, custom)
- Grid or vertical layout

**Usage Example:**
```typescript
import { DynamicForm } from '@/components/Form/DynamicForm';

const formMetadata: FormMetadata = {
  id: 'user-form',
  title: 'User Information',
  layout: 'grid',
  fields: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
      validation: { minLength: 2, maxLength: 50 }
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
    {
      name: 'active',
      label: 'Active',
      type: 'switch',
      defaultValue: true,
    },
  ],
};

<DynamicForm 
  metadata={formMetadata}
  onSubmit={(values) => console.log(values)}
  onCancel={() => console.log('cancelled')}
/>
```

#### Chart Component

**Supported Types:**
- Bar charts
- Pie charts
- Line charts
- Area charts
- Donut charts

**Usage Example:**
```typescript
import { DynamicChart } from '@/components/Charts/DynamicChart';

const chartData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 150 },
  { month: 'Mar', value: 120 },
];

<DynamicChart
  metadata={{
    id: 'sales-chart',
    type: 'bar',
    title: 'Monthly Sales',
    categoryKey: 'month',
    valueKey: 'value',
    legend: true,
    tooltip: true,
    height: 300,
    colors: ['#3b82f6'],
  }}
  data={chartData}
/>
```

## Adding New Pages

### Step 1: Create the Page Component

Create a new file in `src/pages/`:

```typescript
// src/pages/MyNewPage.tsx
import React from 'react';

export const MyNewPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My New Page
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Page description
        </p>
      </div>

      {/* Your content here */}
    </div>
  );
};
```

### Step 2: Add Route

Update `src/App.tsx`:

```typescript
import { MyNewPage } from '@/pages/MyNewPage';

// In the Routes section:
<Route path="my-new-page" element={<MyNewPage />} />
```

### Step 3: Add to Navigation

Update `src/config/appMetadata.ts`:

```typescript
sidebar: [
  // ... existing items
  {
    id: 'my-new-page',
    label: 'My New Page',
    icon: 'FileText',  // Any Lucide icon name
    path: '/my-new-page',
  },
]
```

## Internationalization

### Adding Translations

1. Add keys to `src/i18n/locales/en.json`:
```json
{
  "myPage": {
    "title": "My Page Title",
    "description": "Page description"
  }
}
```

2. Add Spanish translations to `src/i18n/locales/es.json`:
```json
{
  "myPage": {
    "title": "Título de Mi Página",
    "description": "Descripción de la página"
  }
}
```

3. Use in components:
```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

<h1>{t('myPage.title')}</h1>
```

## Styling with Tailwind CSS

### Common Patterns

**Card:**
```tsx
<div className="card p-6">
  {/* content */}
</div>
```

**Button:**
```tsx
<button className="btn btn-primary">Click Me</button>
<button className="btn btn-secondary">Cancel</button>
```

**Responsive Grid:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* items */}
</div>
```

**Dark Mode:**
```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  {/* content */}
</div>
```

## Next Steps

1. **Run the application**: `npm run dev`
2. **Explore the Dashboard**: See the communication overview
3. **Check the Meters page**: See the DataGrid in action
4. **Visit Settings**: See the Dynamic Form
5. **Toggle theme**: Click the moon/sun icon
6. **Change language**: Click the globe icon

## Tips

- Use TypeScript types from `src/types/metadata.ts` for type safety
- Follow the existing component patterns
- Keep metadata separate from components
- Use Tailwind utility classes instead of custom CSS
- Test in both light and dark modes
- Check responsiveness on mobile devices

## Troubleshooting

**Dev server won't start:**
- Check if port 5173 is available
- Try `npm install` again
- Delete `node_modules` and reinstall

**TypeScript errors:**
- Run `npm run lint` to see all errors
- Check import paths use `@/` alias

**Styles not applying:**
- Ensure Tailwind classes are in the content paths
- Check `tailwind.config.js` content array
- Restart dev server after config changes

