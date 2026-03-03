# Data Folder

This folder contains all JSON data files used by the HES application. All data is centralized here for easy management and configuration.

## 📁 File Structure

### `topBar.json`
**Purpose**: Top bar configuration including app name, logo, user info, notifications, and actions

**Structure**:
```json
{
  "appName": "Head End System",
  "logo": {
    "text": "HES",
    "backgroundColor": "#3b82f6"
  },
  "user": {
    "name": "John Smith",
    "role": "Administrator",
    "avatar": null
  },
  "notifications": {
    "enabled": true,
    "count": 3,
    "showBadge": true
  },
  "actions": [
    {
      "id": "language",
      "type": "language-toggle",
      "enabled": true,
      "icon": "Globe",
      "title": "Change Language"
    }
  ]
}
```

**How to modify**:
1. Open `src/data/topBar.json`
2. Change `appName` to update the application name displayed in the top bar
3. Change `logo.text` to update the logo text
4. Change `user.name` and `user.role` to update user info
5. Change `notifications.count` to update notification badge
6. Enable/disable actions by setting `enabled` to true/false
7. Save and refresh the browser

---

### `sidebar.json`
**Purpose**: Sidebar navigation menu configuration

**Structure**:
```json
[
  {
    "id": "unique-id",
    "label": "Display Label",
    "icon": "LucideIconName",
    "path": "/route-path",
    "children": [...]  // Optional nested items
  }
]
```

**How to modify the menu**:
1. Open `src/data/sidebar.json`
2. Add/remove/modify menu items
3. Save and refresh the browser

**Available Icons**: Any icon from [Lucide React](https://lucide.dev/icons/)

---

### `meters.json`
**Purpose**: Meter data for the Meters page

**Structure**:
```json
[
  {
    "meterId": "MTR-000001",
    "location": "Location 1, Building 1",
    "status": "Communicating" | "Non Communicating",
    "lastRead": "2/28/2026",
    "consumption": 456
  }
]
```

---

### `scheduleData.json`
**Purpose**: Schedule data for the Schedule Data page

**Structure**:
```json
[
  {
    "msn": "M22410039131",
    "hesTimestamp": "2026-03-01 00:05:36",
    "realTimeClock": "2026-03-01 00:00:00",
    "cumActiveImportEnergy": 501.87
  }
]
```

---

### `communicationHistory.json`
**Purpose**: Communication history logs

**Structure**:
```json
[
  {
    "timestamp": "2026-03-01 10:15:23",
    "meterNo": "M22410039131",
    "event": "Data Read" | "Connection" | "Disconnect",
    "status": "Success" | "Failed",
    "duration": 2.3
  }
]
```

---

### `dashboard.json`
**Purpose**: Dashboard statistics and chart data

**Structure**:
```json
{
  "communicationData": [
    {
      "month": "Jan",
      "communicating": 2800000,
      "nonCommunicating": 300000
    }
  ],
  "meterStatusData": [
    {
      "name": "Communicating",
      "value": 3033013,
      "color": "#10b981"
    }
  ],
  "stats": {
    "totalMeters": 3391005,
    "communicating": 3033013,
    "nonCommunicating": 357992,
    "communicationRate": 89.44
  }
}
```

---

### `featureFlags.json`
**Purpose**: Application feature flags to enable/disable features

**Structure**:
```json
{
  "darkMode": true,
  "exportPDF": false,
  "realTimeUpdates": false,
  "advancedFilters": true,
  "bulkOperations": false,
  "notifications": true,
  "websocket": false
}
```

**How to modify**:
1. Open `src/data/featureFlags.json`
2. Set feature flags to `true` to enable or `false` to disable
3. Save and refresh the browser

**Usage in code**:
```typescript
import featureFlags from '@/data/featureFlags.json';

if (featureFlags.darkMode) {
  // Enable dark mode feature
}
```

---

### `communicationStats.json`
**Purpose**: Communication overview statistics for the Communication Overview page

**Structure**:
```json
{
  "totalMeters": 1234,
  "communicating": 1156,
  "nonCommunicating": 78,
  "activeSessions": 42,
  "successRate": 93.7,
  "failureRate": 6.3
}
```

**How to modify**:
1. Open `src/data/communicationStats.json`
2. Update any stat value (totalMeters, communicating, etc.)
3. Ensure `successRate` + `failureRate` = 100
4. Save and refresh the browser

**Usage in code**:
```typescript
import communicationStatsData from '@/data/communicationStats.json';

const stats = communicationStatsData;
```

---

## 🔧 How to Update Data

1. **Edit JSON files directly** in this folder
2. **Save the file**
3. **Refresh the browser** to see changes

No code changes required!

---

## 🚀 Future Enhancements

These JSON files can be easily replaced with API calls:

```typescript
// Instead of:
import metersData from '@/data/meters.json';

// Use:
const metersData = await fetch('/api/meters').then(r => r.json());
```

---

## 📝 Notes

- All JSON files are imported with TypeScript type checking
- The `tsconfig.json` has `"resolveJsonModule": true` enabled
- Data is validated against TypeScript interfaces at compile time

