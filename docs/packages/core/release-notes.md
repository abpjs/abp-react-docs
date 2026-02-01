---
sidebar_position: 99
---

# Release Notes

## v2.1.0

**February 2026**

### New Features

- **`ConfigStateService.dispatchSetEnvironment()`** - New dispatch method to set the environment configuration at runtime:
  ```tsx
  import { useAbp } from '@abpjs/core';

  function MyComponent() {
    const { configStateService } = useAbp();

    // Update environment configuration
    configStateService.dispatchSetEnvironment({
      production: true,
      application: { name: 'My App' },
      oAuthConfig: { /* ... */ },
      apis: { default: { url: 'https://api.example.com' } },
    });
  }
  ```

### API Changes

- **`toLocalISOString` made optional** - The `Date.prototype.toLocalISOString` method is now optional to match the Angular API. Use optional chaining when calling:
  ```tsx
  // Before (v2.0.0)
  const isoString = date.toLocalISOString();

  // After (v2.1.0) - use optional chaining for safety
  const isoString = date.toLocalISOString?.();
  ```

---

## v2.0.0

**January 2026**

### Breaking Changes

- **`eLayoutType.setting` removed** - This deprecated layout type has been removed. Use a custom layout instead.
- **`ConfigService` alias removed** - Use `ConfigStateService` directly. The deprecated alias has been removed.

### New Features

- **`configActions.addRoute`** - Dynamically add routes at runtime:
  ```tsx
  import { configActions } from '@abpjs/core';

  // Add at root level
  dispatch(configActions.addRoute({
    name: 'Dashboard',
    path: 'dashboard',
  }));

  // Add as child route
  dispatch(configActions.addRoute({
    name: 'Details',
    path: 'details',
    parentName: 'Users',
  }));
  ```

- **Session Detail Tracking** - New `SessionDetail` interface for multi-tab support:
  ```tsx
  const { sessionStateService } = useAbp();
  const detail = sessionStateService.getSessionDetail();
  // { openedTabCount, lastExitTime, remember }
  ```

- **New Session Actions**:
  - `sessionActions.setRemember(boolean)` - Set remember flag
  - `sessionActions.modifyOpenedTabCount('increase' | 'decrease')` - Track tabs
  - `sessionActions.setSessionDetail(Partial<SessionDetail>)` - Update session detail

- **`selectSessionDetail` selector** - Access session detail from Redux state

- **ReplaceableComponents model** - New type definitions for component replacement system

### Deprecation Updates

- **`selectCopy`** - Now scheduled for removal in v3.0.0 (was v2.0.0)

---

## v1.1.0

**January 2026**

### New Services

- **`ConfigStateService`** - Renamed from `ConfigService` to align with Angular ABP naming conventions:
  ```tsx
  import { ConfigStateService } from '@abpjs/core';

  // Access via useAbp hook
  const { configStateService } = useAbp();

  // Get application info
  const appInfo = configStateService.getApplicationInfo();

  // Find route by path, name, or url
  const route = configStateService.getRoute('/users', undefined, undefined);
  const routeByName = configStateService.getRoute(undefined, 'Users');
  const routeByUrl = configStateService.getRoute(undefined, undefined, '/admin/users');

  // Get settings with optional keyword filter
  const emailSettings = configStateService.getSettings('Email');

  // Get localized string with interpolation
  const greeting = configStateService.getLocalization(
    { key: 'HelloUser', defaultValue: 'Hello!' },
    'John'
  );
  ```

- **`SessionStateService`** - Access session state (language, tenant):
  ```tsx
  import { SessionStateService } from '@abpjs/core';

  const { sessionStateService } = useAbp();

  const language = sessionStateService.getLanguage();
  const tenant = sessionStateService.getTenant();
  ```

- **`ProfileStateService`** - Access profile state:
  ```tsx
  import { ProfileStateService } from '@abpjs/core';

  const { profileStateService } = useAbp();

  const profile = profileStateService.getProfile();
  ```

### LocalizationService Enhancements

The `LocalizationService` methods now accept `Config.LocalizationWithDefault` in addition to string keys:

```tsx
// String key (existing)
const text = localizationService.get('MyKey');

// Object with default value (new)
const textWithDefault = localizationService.get({
  key: 'MyKey',
  defaultValue: 'Fallback text'
});

// With interpolation
const greeting = localizationService.get('Hello {0}!', 'World');
```

Affected methods: `get()`, `instant()`, `t()`

### New Date Extension

`Date.prototype.toLocalISOString()` - Returns ISO string in local timezone (unlike `toISOString()` which returns UTC):

```tsx
const date = new Date();

// Standard - returns UTC
date.toISOString();      // "2026-01-31T13:15:00.000Z"

// New - returns local timezone
date.toLocalISOString(); // "2026-01-31T16:15:00.000+03:00"
```

### New Types

- **`Config.LocalizationParam`** - Union type for localization keys:
  ```tsx
  type LocalizationParam = string | LocalizationWithDefault;
  ```

### Deprecations

- **`ConfigService`** - Renamed to `ConfigStateService`. The old name is still exported as an alias but will be removed in v2.0.0.

---

## v1.0.0

**January 2026**

### Breaking Changes

- **`eLayoutType.setting` deprecated** - Use custom layout instead

### New Features

- **`LazyLoadService.load` accepts arrays** - Load multiple scripts/styles at once
- **`selectSettings` selector** - Get all settings with optional keyword filter
- **`selectLocalizationString` selector** - Localization with interpolation support
- **`addAbpRoutes` / `getAbpRoutes`** - Dynamic route registration API
- **`ABP.Dictionary<T>` type** - Generic key-value dictionary
- **`SortOrder` type** - `'asc' | 'desc'` for sorting
- **`Config.LocalizationWithDefault`** - Localization key with fallback value

### Deprecations

- **`eLayoutType.setting`** - Deprecated, use custom layout
- **`ApplicationConfiguration.Setting`** - Use `ApplicationConfiguration.Value`
- **`ApplicationConfiguration.Features`** - Use `ApplicationConfiguration.Value`
- **`selectCopy`** - Use `selectLocalizationString` instead (to be removed in v2)

---

## v0.9.0

**January 2026**

### Breaking Changes

- **`throwErr` renamed to `skipHandleError`** - Update `Rest.Config` usage

### New Features

- **`eLayoutType.setting`** - New layout type for settings pages
- **Application configuration** - `Config.Application` interface, `selectApplicationInfo` selector
- **Tenant session management** - `setTenant` action, `selectTenant` selector
- **`selectRoute` selector** - Find routes by path or name recursively
- **`LocalizationService.currentLang`** - Property to get current language
- **`ProfileService.changePassword`** - New `skipHandleError` parameter

---

## v0.8.0

**January 2026**

### New Features

- **Ellipsis component** - Truncate text with ellipsis and tooltip
- **useEllipsis hook** - Hook version for custom implementations
- **useLoader hook** - Track HTTP request loading state

### Bug Fixes

- Fixed localization handling when translation key is empty or null

---

## v0.7.6

**January 2026** - Initial Release

- Authentication with OAuth2/OIDC (`oidc-client-ts`)
- Configuration management
- Localization with dynamic resource loading
- Permission checking with `usePermission` hook
- REST service with Axios interceptors
- Session management
- Redux Toolkit integration
