---
sidebar_position: 3
---

# Configuration

ABP React provides services and hooks for managing ABP application configuration.

## Loading Configuration

Use `ApplicationConfigurationService` to fetch the ABP configuration:

```tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ApplicationConfigurationService, configSlice } from '@abpjs/core';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadConfig = async () => {
      const config = await ApplicationConfigurationService.get('https://localhost:44300');
      dispatch(configSlice.actions.setConfig(config));
    };
    loadConfig();
  }, [dispatch]);

  // ...
}
```

## useConfig Hook

Access the configuration anywhere in your app:

```tsx
import { useConfig } from '@abpjs/core';

function ConfigExample() {
  const config = useConfig();

  return (
    <div>
      <p>Current User: {config.currentUser?.userName}</p>
      <p>Current Tenant: {config.currentTenant?.name}</p>
      <p>Language: {config.localization?.currentCulture?.name}</p>
    </div>
  );
}
```

## Configuration Structure

The ABP configuration includes:

| Property | Description |
|----------|-------------|
| `currentUser` | Information about the logged-in user |
| `currentTenant` | Current tenant information (for multi-tenant apps) |
| `localization` | Available languages and current culture |
| `auth` | Authentication configuration |
| `setting` | Application settings |
| `features` | Enabled features |
| `globalFeatures` | Global feature flags |
| `multiTenancy` | Multi-tenancy configuration |

## Accessing Current User

```tsx
import { useConfig } from '@abpjs/core';

function UserInfo() {
  const { currentUser } = useConfig();

  if (!currentUser?.isAuthenticated) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <p>Username: {currentUser.userName}</p>
      <p>Email: {currentUser.email}</p>
      <p>Roles: {currentUser.roles?.join(', ')}</p>
    </div>
  );
}
```

## Accessing Settings

```tsx
import { useConfig } from '@abpjs/core';

function SettingsExample() {
  const { setting } = useConfig();

  const getSetting = (name: string) => {
    return setting?.values?.[name];
  };

  return (
    <div>
      <p>App Name: {getSetting('App.Name')}</p>
    </div>
  );
}
```

## Related

- [Localization](/docs/packages/core/localization) - Multi-language support
- [Session](/docs/packages/core/session) - Session state
