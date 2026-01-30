---
sidebar_position: 99
---

# Release Notes

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
