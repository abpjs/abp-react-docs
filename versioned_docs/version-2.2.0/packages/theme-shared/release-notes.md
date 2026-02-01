---
sidebar_position: 99
---

# Release Notes

## v2.2.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.1.0

**February 2026**

### New Types

- **`Confirmation.Status` enum** - New confirmation-specific status enum, replacing usage of `Toaster.Status` for confirmation dialogs:
  ```tsx
  import { Confirmation } from '@abpjs/theme-shared';

  const status = await confirmation.info('Are you sure?');

  if (status === Confirmation.Status.confirm) {
    // User confirmed
  } else if (status === Confirmation.Status.reject) {
    // User rejected
  } else if (status === Confirmation.Status.dismiss) {
    // User dismissed (escape key, click outside)
  }
  ```

### API Changes

- **Confirmation service return type** - All confirmation methods (`info`, `success`, `warn`, `error`, `show`) now return `Promise<Confirmation.Status>` instead of `Promise<Toaster.Status>`
- **`confirmation.clear(status?)` parameter** - Now accepts `Confirmation.Status` instead of `Toaster.Status`
- **`useConfirmationState().respond()`** - Now accepts `Confirmation.Status` instead of `Toaster.Status`

### Deprecations

- **`Toaster.Status` deprecated** - Use `Confirmation.Status` for confirmation dialogs. `Toaster.Status` will be removed in v2.2.0.

### Migration

```tsx
// Before (v2.0.0)
import { Toaster } from '@abpjs/theme-shared';

const status = await confirmation.info('Are you sure?');
if (status === Toaster.Status.confirm) { /* ... */ }

// After (v2.1.0)
import { Confirmation } from '@abpjs/theme-shared';

const status = await confirmation.info('Are you sure?');
if (status === Confirmation.Status.confirm) { /* ... */ }
```

---

## v2.0.0

**January 2026**

### Breaking Changes

- **ToasterService return type** - Methods (`info`, `success`, `warn`, `error`) now return `number` (toast ID) instead of `Promise<Toaster.Status>`
- **`toaster.remove(id)`** - Now takes `number` instead of `string`
- **`toaster.addAll()` removed** - Use `show()` method instead
- **`Toaster.Options` renamed** - Use `Toaster.ToastOptions` (old interface kept for compatibility, deprecated)
- **`Toaster.Severity` changed** - `'warn'` renamed to `'warning'`, added `'neutral'`
- **`Confirmation.Options`** - Removed `yesCopy` and `cancelCopy` (use `yesText` and `cancelText`)
- **`Confirmation.Options`** - No longer extends `Toaster.Options`

### New Features

- **`toaster.show(message, title?, severity?, options)`** - Create toast with specified severity
- **`toaster.subscribe(callback)`** - Subscribe to toast state changes (observable pattern)
- **`toaster.clear(containerKey?)`** - Clear toasts by container key
- **`ToastContainer` `containerKey` prop** - Filter toasts to specific containers
- **Toast positions** - New `'top'`, `'top-left'`, `'bottom'`, `'bottom-left'` positions
- **`confirmation.show(message, title?, severity?, options)`** - Create with specified severity
- **`confirmation.listenToEscape()`** - Enable escape key dismissal
- **`confirmation.subscribe(callback)`** - Subscribe to confirmation changes
- **`Confirmation.Options.closable`** - Control dismiss behavior
- **`Confirmation.Severity` type** - Separate from Toaster, includes `'neutral'`
- **Sorting icon CSS classes** - `.sorting`, `.sorting_asc`, `.sorting_desc`

### Style Updates

- Updated animation timing (0.4s → 0.2s for fade effects)
- Added table scrollbar styling
- Added collapse/expand height transition classes

---

## v1.1.0

**January 2026**

### New Features

- **ToasterService localization support** - `info()`, `success()`, `warn()`, `error()` now accept `Config.LocalizationParam` for message and title
- **LoaderBar customization** - New `intervalPeriod` and `stopDelay` props for animation control
- **HttpErrorConfig** - New types for custom error screen configuration (`RootParams`, `HttpErrorConfig`, `ErrorScreenErrorCodes`)

### Deprecations

- **Confirmation.Options** - `cancelCopy` and `yesCopy` deprecated in favor of `cancelText` and `yesText` (which accept `Config.LocalizationParam`)

---

## v1.0.0

**January 2026**

Version alignment with ABP Framework v1.0.0. No new features or breaking changes.

---

## v0.9.0

**January 2026**

### New Features

- **Modal enhancements** - New `busy`, `height`, `minHeight`, and `onInit` props
- **Profile component** - Moved from `@abpjs/theme-basic` (see [Profile docs](./profile))
- **ChangePassword component** - Moved from `@abpjs/theme-basic` (see [Profile docs](./profile))
- **SettingTab model** - Interface for settings management tabs
- **Statistics models** - `Statistics.Response`, `Statistics.Data`, `Statistics.Filter`

---

## v0.8.0

**January 2026**

### New Features

- **LoaderBar** - Progress bar that shows during HTTP requests
- **ErrorComponent** - Full-page error display (404, 500, etc.)
- **DEFAULT_STYLES** - Global CSS styles constant
- **useErrorHandler enhancements** - `createErrorComponent`, `clearErrorComponent` methods

---

## v0.7.6

**January 2026** - Initial Release

- Toaster service (success, error, warning, info)
- Confirmation service with promise-based dialogs
- Global error handler for ABP errors
- Light and dark mode support
