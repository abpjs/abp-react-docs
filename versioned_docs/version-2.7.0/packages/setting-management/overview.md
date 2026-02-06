---
sidebar_position: 1
---

# Overview

The `@abpjs/setting-management` package provides a settings management interface for organizing application settings into tabs.

[![npm version](https://img.shields.io/npm/v/@abpjs/setting-management.svg)](https://www.npmjs.com/package/@abpjs/setting-management)

:::info New in v0.9.0
This package is new in v0.9.0.
:::

## Installation

```bash
npm install @abpjs/setting-management
```

**Required peer dependencies:**
```bash
npm install @abpjs/core @abpjs/theme-shared @abpjs/permission-management
```

## Features

- **Setting Layout** - Two-column layout with sidebar tabs and content area
- **Tab Management** - Register, remove, and select setting tabs dynamically
- **URL Sync** - Automatic synchronization between tabs and URL
- **Policy Support** - Setting tabs can require policies for visibility

## Main Exports

### Components

| Component | Description |
|-----------|-------------|
| `SettingLayout` | Layout component for settings page with sidebar tabs |

### Hooks

| Hook | Description |
|------|-------------|
| `useSettingManagement` | Hook for managing setting tabs |

### Services

| Service | Description |
|---------|-------------|
| `SettingManagementService` | Service for setting tab management |
| `getSettingManagementService` | Get the singleton service instance |

### Constants

| Constant | Description |
|----------|-------------|
| `SETTING_MANAGEMENT_ROUTES` | Default routes (format: `{ routes: ABP.FullRoute[] }`) |

## Quick Example

```tsx
import { SettingLayout, useSettingManagement } from '@abpjs/setting-management';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function SettingsPage() {
  const { addSettings } = useSettingManagement();

  useEffect(() => {
    addSettings([
      { name: 'Account', order: 1, url: '/settings/account' },
      { name: 'Appearance', order: 2, url: '/settings/appearance' },
      { name: 'Notifications', order: 3, url: '/settings/notifications' },
    ]);
  }, [addSettings]);

  return (
    <SettingLayout>
      <Outlet />
    </SettingLayout>
  );
}
```

## NPM Package

View on npm: [@abpjs/setting-management](https://www.npmjs.com/package/@abpjs/setting-management)

## Documentation

- [Setting Layout](./layout) - Using the layout component
- [useSettingManagement Hook](./hook) - Managing tabs programmatically
