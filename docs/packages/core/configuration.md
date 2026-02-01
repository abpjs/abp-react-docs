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

### selectSettings (v1.0.0)

Use the `selectSettings` selector for filtered settings access:

```tsx
import { selectSettings } from '@abpjs/core';
import { useSelector } from 'react-redux';

function SettingsPanel() {
  // Get all settings
  const allSettings = useSelector(selectSettings());

  // Get settings filtered by keyword
  const localizationSettings = useSelector(selectSettings('Abp.Localization'));

  return (
    <div>
      <h3>Localization Settings</h3>
      <ul>
        {Object.entries(localizationSettings).map(([key, value]) => (
          <li key={key}>{key}: {value}</li>
        ))}
      </ul>
    </div>
  );
}
```

## ConfigStateService (v1.1.0)

The `ConfigStateService` provides a service-based API for accessing configuration state, aligned with Angular ABP naming conventions:

```tsx
import { useAbp } from '@abpjs/core';

function ConfigExample() {
  const { configStateService } = useAbp();

  // Get application info
  const appInfo = configStateService.getApplicationInfo();

  // Find route by path
  const route = configStateService.getRoute('/users', undefined, undefined);

  // Find route by name
  const routeByName = configStateService.getRoute(undefined, 'Users');

  // Find route by URL
  const routeByUrl = configStateService.getRoute(undefined, undefined, '/admin/users');

  // Get settings with optional keyword filter
  const emailSettings = configStateService.getSettings('Email');

  // Get localized string with interpolation
  const greeting = configStateService.getLocalization(
    { key: 'HelloUser', defaultValue: 'Hello!' },
    'John'
  );

  return (
    <div>
      <h1>{appInfo?.name}</h1>
      <p>{greeting}</p>
    </div>
  );
}
```

### ConfigStateService Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getApplicationInfo()` | - | `Config.Application \| undefined` | Get application name and logo |
| `getRoute()` | `path?, name?, url?` | `ABP.FullRoute \| undefined` | Find route by path, name, or URL |
| `getSettings()` | `keyword?: string` | `Record<string, string>` | Get settings, optionally filtered |
| `getLocalization()` | `key, ...params` | `string` | Get localized string with interpolation |
| `dispatchSetEnvironment()` | `environment: Config.Environment` | `void` | Set the environment configuration (v2.1.0) |

### Setting Environment at Runtime (v2.1.0)

Use `dispatchSetEnvironment` to update the environment configuration dynamically:

```tsx
import { useAbp } from '@abpjs/core';

function EnvironmentSwitcher() {
  const { configStateService } = useAbp();

  const switchToProduction = () => {
    configStateService.dispatchSetEnvironment({
      production: true,
      application: { name: 'My App' },
      oAuthConfig: {
        issuer: 'https://auth.example.com',
        clientId: 'MyApp_App',
        scope: 'openid profile email MyApp',
      },
      apis: {
        default: { url: 'https://api.example.com' },
      },
    });
  };

  return <button onClick={switchToProduction}>Switch to Production</button>;
}
```

## Dynamic Routes (v2.0.0)

Add routes dynamically using the `addRoute` action:

```tsx
import { useDispatch } from 'react-redux';
import { configActions } from '@abpjs/core';

function RouteManager() {
  const dispatch = useDispatch();

  // Add route at root level
  const addRootRoute = () => {
    dispatch(configActions.addRoute({
      name: 'Dashboard',
      path: 'dashboard',
      iconClass: 'fa fa-dashboard',
    }));
  };

  // Add child route
  const addChildRoute = () => {
    dispatch(configActions.addRoute({
      name: 'UserDetails',
      path: 'details',
      parentName: 'Users', // Will be added as child of 'Users' route
    }));
  };

  return (
    <div>
      <button onClick={addRootRoute}>Add Dashboard</button>
      <button onClick={addChildRoute}>Add User Details</button>
    </div>
  );
}
```

The `addRoute` action automatically computes the full URL based on the parent route hierarchy.

## Related

- [Localization](./localization) - Multi-language support
- [Session](./session) - Session state
