---
sidebar_position: 2
---

# Setting Layout

The `SettingLayout` component provides a two-column layout for settings pages with a sidebar for tab navigation.

## Basic Usage

```tsx
import { SettingLayout, useSettingManagement } from '@abpjs/setting-management';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function SettingsPage() {
  const { addSettings } = useSettingManagement();

  useEffect(() => {
    addSettings([
      { name: 'Account', order: 1, url: '/settings/account' },
      { name: 'Security', order: 2, url: '/settings/security' },
    ]);
  }, [addSettings]);

  return (
    <SettingLayout>
      <Outlet />
    </SettingLayout>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to render in the main area |
| `onTabSelect` | `(tab: SettingTab) => void` | - | Called when a tab is selected |
| `className` | `string` | `''` | CSS class for the container |

## URL Synchronization

The layout automatically syncs the selected tab with the current URL:

```tsx
// When URL is /settings/account, the "Account" tab is auto-selected
<SettingLayout>
  <Routes>
    <Route path="account" element={<AccountSettings />} />
    <Route path="security" element={<SecuritySettings />} />
  </Routes>
</SettingLayout>
```

## Tab Selection Callback

Handle tab selection for custom logic:

```tsx
function SettingsPage() {
  const handleTabSelect = (tab: SettingTab) => {
    console.log('Selected:', tab.name);
    // Analytics, state updates, etc.
  };

  return (
    <SettingLayout onTabSelect={handleTabSelect}>
      <Outlet />
    </SettingLayout>
  );
}
```

## Styling

The layout uses inline styles by default. Override with CSS:

```css
.setting-layout {
  gap: 32px;
}

.setting-layout-sidebar {
  width: 280px;
}

.setting-tab.active {
  background-color: #e3f2fd;
  color: #1976d2;
}
```

## SettingTab Interface

```tsx
interface SettingTab {
  name: string;           // Display name
  order: number;          // Sort order (lower = first)
  url?: string;           // Navigation URL
  requiredPolicy?: string; // Policy required to see this tab
}
```

## With Policy-Protected Tabs

```tsx
import { useSettingManagement } from '@abpjs/setting-management';
import { useAbpPolicy } from '@abpjs/core';

function SettingsPage() {
  const { addSettings } = useSettingManagement();
  const { isGranted } = useAbpPolicy();

  useEffect(() => {
    const tabs = [
      { name: 'General', order: 1, url: '/settings/general' },
      { name: 'Email', order: 2, url: '/settings/email', requiredPolicy: 'Settings.Email' },
      { name: 'Admin', order: 3, url: '/settings/admin', requiredPolicy: 'Settings.Admin' },
    ].filter(tab => !tab.requiredPolicy || isGranted(tab.requiredPolicy));

    addSettings(tabs);
  }, [addSettings, isGranted]);

  return <SettingLayout><Outlet /></SettingLayout>;
}
```

## Related

- [useSettingManagement Hook](./hook) - Programmatic tab management
- [SettingTab Model](../theme-shared/release-notes) - Tab interface from theme-shared
