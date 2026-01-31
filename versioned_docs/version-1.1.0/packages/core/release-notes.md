---
sidebar_position: 99
---

# Release Notes

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
