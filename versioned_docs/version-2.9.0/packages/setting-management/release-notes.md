---
sidebar_position: 99
---

# Release Notes

## v2.9.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.7.0

**February 2026**

### New Features

#### Component Replacement Keys

New constants for replacing setting management components:

```tsx
import { eSettingManagementComponents } from '@abpjs/setting-management';

// Available component keys:
// eSettingManagementComponents.SettingManagement = 'SettingManagement.SettingManagementComponent'
```

#### Route Names

New constants for setting management route names (localization keys):

```tsx
import { eSettingManagementRouteNames } from '@abpjs/setting-management';

// Available route names:
// eSettingManagementRouteNames.Settings = 'AbpSettingManagement::Settings'
```

### New Exports

- `eSettingManagementComponents` - Constants for component replacement keys
- `SettingManagementComponentKey` - Type for setting management component key values
- `eSettingManagementRouteNames` - Constants for route names (localization keys)
- `SettingManagementRouteNameKey` - Type for setting management route name values

---

## v2.4.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.2.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.1.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.0.0

**January 2026**

- Version alignment with @abpjs/core

---

## v1.1.0

**January 2026**

### New Features

- **`SettingManagementStateService`** - New state service for managing setting tab selection:
  - `getSelectedTab()` - Get the currently selected tab
  - `setSelectedTab(tab)` - Set the selected tab
  - `getState()` - Get the current state
  - `reset()` - Reset state to initial values
  - `subscribe(callback)` - Subscribe to state changes
- **`getSettingManagementStateService()`** - Function to get the singleton state service instance

### New Types

- **`SettingManagement.State`** - State interface with `selectedTab` property

---

## v1.0.0

**January 2026**

- Version alignment with @abpjs/core

---

## v0.9.0

**January 2026** - Initial Release

### Features

- **SettingLayout component** - Two-column layout with sidebar tabs
- **useSettingManagement hook** - Manage setting tabs programmatically
- **SettingManagementService** - Singleton service for tab state
- **SETTING_MANAGEMENT_ROUTES** - Route constant (format: `{ routes: ABP.FullRoute[] }`)
- **URL synchronization** - Auto-select tabs based on current URL
- **Policy support** - Tabs can require policies via `requiredPolicy`
