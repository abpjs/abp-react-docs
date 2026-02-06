---
sidebar_position: 99
---

# Release Notes

## v3.0.0

**February 2026**

### Breaking Changes

#### `SettingManagement.State.selectedTab` type changed

The `selectedTab` property type has changed from `SettingTab | null` to `SettingTab | undefined`:

```tsx
// Before (v2.9.0)
const state: SettingManagement.State = {
  selectedTab: null, // null when no tab selected
};

// After (v3.0.0)
const state: SettingManagement.State = {
  selectedTab: undefined, // undefined when no tab selected
};
```

#### `SettingTab` interface updated

The `SettingTab` interface now extends `ABP.Tab` from `@abpjs/core`, with `component` as optional:

```tsx
// v3.0.0
interface SettingTab extends Omit<ABP.Tab, 'component'> {
  component?: ComponentType<unknown>;  // Now optional
  url?: string;                         // For URL-based navigation
  order: number;                        // Required for sorting
}
```

### New Features

#### Route Providers

New route provider system for initializing setting management routes:

```tsx
import { initializeSettingManagementRoutes } from '@abpjs/setting-management';

// Call once during app initialization
initializeSettingManagementRoutes();

// This registers:
// - /setting-management (under Administration)
// - Automatically hides if no setting tabs are registered
```

For advanced configuration:

```tsx
import {
  configureRoutes,
  hideRoutes,
  SETTING_MANAGEMENT_ROUTE_PROVIDERS,
} from '@abpjs/setting-management';
import { getRoutesService, getSettingTabsService } from '@abpjs/core';

const routesService = getRoutesService();
const settingTabsService = getSettingTabsService();

// Add routes
const addRoutes = configureRoutes(routesService);
addRoutes();

// Optionally hide if no tabs registered
const hideIfEmpty = hideRoutes(routesService, settingTabsService);
hideIfEmpty();
```

#### `hideRoutes()` Function

New helper function to conditionally hide the settings route when no tabs are registered:

```tsx
import { hideRoutes } from '@abpjs/setting-management';
import { getRoutesService, getSettingTabsService } from '@abpjs/core';

const routes = getRoutesService();
const tabs = getSettingTabsService();

// Will set invisible=true if tabs.visible is empty
hideRoutes(routes, tabs)();
```

#### Config Subpackage

The `@abp/ng.setting-management/config` functionality is now merged into the main package:

```tsx
// All config exports are available from the main package
import {
  configureRoutes,
  hideRoutes,
  SETTING_MANAGEMENT_ROUTE_PROVIDERS,
  initializeSettingManagementRoutes,
  eSettingManagementRouteNames,
} from '@abpjs/setting-management';
```

### New Exports

- `initializeSettingManagementRoutes()` - Initialize setting management routes
- `configureRoutes(routes)` - Configure routes with custom RoutesService
- `hideRoutes(routes, tabs)` - Hide routes if no tabs registered
- `SETTING_MANAGEMENT_ROUTE_PROVIDERS` - Route provider configuration object

---

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
