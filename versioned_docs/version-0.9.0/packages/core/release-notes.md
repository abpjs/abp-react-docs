---
sidebar_position: 99
---

# Release Notes

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
