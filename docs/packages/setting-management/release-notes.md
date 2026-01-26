---
sidebar_position: 99
---

# Release Notes

## v0.9.0

**January 2026** - Initial Release

### Features

- **SettingLayout component** - Two-column layout with sidebar tabs
- **useSettingManagement hook** - Manage setting tabs programmatically
- **SettingManagementService** - Singleton service for tab state
- **SETTING_MANAGEMENT_ROUTES** - Route constant (format: `{ routes: ABP.FullRoute[] }`)
- **URL synchronization** - Auto-select tabs based on current URL
- **Policy support** - Tabs can require policies via `requiredPolicy`
