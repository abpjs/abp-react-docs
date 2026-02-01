---
sidebar_position: 99
---

# Release Notes

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
