---
sidebar_position: 3
---

# useSettingManagement Hook

The `useSettingManagement` hook provides programmatic access to the setting management service for managing tabs.

## Basic Usage

```tsx
import { useSettingManagement } from '@abpjs/setting-management';

function MyComponent() {
  const {
    settings,
    selected,
    addSetting,
    addSettings,
    removeSetting,
    setSelected,
    selectByName,
    selectByUrl,
    clearSettings,
  } = useSettingManagement();

  return (
    <div>
      <p>Total tabs: {settings.length}</p>
      <p>Selected: {selected?.name || 'None'}</p>
    </div>
  );
}
```

## Return Value

| Property | Type | Description |
|----------|------|-------------|
| `settings` | `SettingTab[]` | All registered tabs, sorted by order |
| `selected` | `SettingTab \| null` | Currently selected tab |
| `addSetting` | `(tab: SettingTab) => void` | Add a single tab |
| `addSettings` | `(tabs: SettingTab[]) => void` | Add multiple tabs |
| `removeSetting` | `(name: string) => void` | Remove a tab by name |
| `setSelected` | `(tab: SettingTab \| null) => void` | Set the selected tab |
| `selectByName` | `(name: string) => void` | Select a tab by name |
| `selectByUrl` | `(url: string) => void` | Select a tab by URL |
| `clearSettings` | `() => void` | Remove all tabs |

## Adding Tabs

Register tabs when your component mounts:

```tsx
import { useSettingManagement } from '@abpjs/setting-management';
import { useEffect } from 'react';

function SettingsModule() {
  const { addSettings } = useSettingManagement();

  useEffect(() => {
    addSettings([
      { name: 'Profile', order: 1, url: '/settings/profile' },
      { name: 'Preferences', order: 2, url: '/settings/preferences' },
      { name: 'Privacy', order: 3, url: '/settings/privacy' },
    ]);
  }, [addSettings]);

  return null;
}
```

## Dynamic Tab Registration

Register tabs from different modules:

```tsx
// In your identity module
function IdentitySettingsRegistrar() {
  const { addSetting } = useSettingManagement();

  useEffect(() => {
    addSetting({
      name: 'Users',
      order: 10,
      url: '/settings/identity/users',
      requiredPolicy: 'AbpIdentity.Users',
    });
  }, [addSetting]);

  return null;
}

// In your tenant module
function TenantSettingsRegistrar() {
  const { addSetting } = useSettingManagement();

  useEffect(() => {
    addSetting({
      name: 'Tenants',
      order: 20,
      url: '/settings/tenants',
      requiredPolicy: 'AbpTenantManagement.Tenants',
    });
  }, [addSetting]);

  return null;
}
```

## Selecting Tabs Programmatically

```tsx
function TabController() {
  const { selectByName, selectByUrl } = useSettingManagement();

  return (
    <div>
      <button onClick={() => selectByName('Profile')}>
        Go to Profile
      </button>
      <button onClick={() => selectByUrl('/settings/privacy')}>
        Go to Privacy
      </button>
    </div>
  );
}
```

## Cleanup on Unmount

Remove tabs when a module is unloaded:

```tsx
function ModuleSettings() {
  const { addSettings, removeSetting } = useSettingManagement();

  useEffect(() => {
    addSettings([
      { name: 'Module A', order: 1, url: '/settings/a' },
      { name: 'Module B', order: 2, url: '/settings/b' },
    ]);

    return () => {
      removeSetting('Module A');
      removeSetting('Module B');
    };
  }, [addSettings, removeSetting]);

  return null;
}
```

## Building a Custom Tab List

```tsx
import { useSettingManagement } from '@abpjs/setting-management';
import { useNavigate } from 'react-router-dom';

function CustomTabList() {
  const { settings, selected, setSelected } = useSettingManagement();
  const navigate = useNavigate();

  const handleClick = (tab: SettingTab) => {
    setSelected(tab);
    if (tab.url) {
      navigate(tab.url);
    }
  };

  return (
    <ul>
      {settings.map((tab) => (
        <li
          key={tab.name}
          onClick={() => handleClick(tab)}
          style={{ fontWeight: selected?.name === tab.name ? 'bold' : 'normal' }}
        >
          {tab.name}
        </li>
      ))}
    </ul>
  );
}
```

## Related

- [Setting Layout](./layout) - Layout component
- [SettingTab Model](../theme-shared/release-notes) - Tab interface
