---
sidebar_position: 99
---

# Release Notes

## v2.9.0

**February 2026**

### New Features

#### RTL/LTR Style Switching

New handler and utilities for automatic RTL/LTR stylesheet switching based on locale direction:

```tsx
import { useLazyStyleHandler, BOOTSTRAP } from '@abpjs/theme-shared';

function App() {
  const { direction, setDirection } = useLazyStyleHandler({
    styles: [BOOTSTRAP], // Optional, defaults to [BOOTSTRAP]
    initialDirection: 'ltr',
  });

  // Switch to RTL when language changes
  const handleLanguageChange = (lang: string) => {
    if (lang === 'ar' || lang === 'he') {
      setDirection('rtl');
    } else {
      setDirection('ltr');
    }
  };

  return <div dir={direction}>...</div>;
}
```

The handler automatically:
- Sets the `dir` attribute on `document.body`
- Swaps Bootstrap CSS files (`bootstrap-ltr.min.css` ↔ `bootstrap-rtl.min.css`)
- Removes old direction stylesheets to prevent conflicts

**Helper Functions:**

```tsx
import {
  createLazyStyleHref,
  getLoadedBootstrapDirection,
  initLazyStyleHandler,
} from '@abpjs/theme-shared';

// Convert style pattern to actual href
const href = createLazyStyleHref('bootstrap-{{dir}}.min.css', 'rtl');
// Returns: 'bootstrap-rtl.min.css'

// Check which Bootstrap direction is currently loaded
const currentDir = getLoadedBootstrapDirection();
// Returns: 'ltr' | 'rtl' | undefined

// Initialize handler for providers
const init = initLazyStyleHandler({ initialDirection: 'ltr' });
```

#### Navigation Items API

New utility functions for managing navigation items dynamically:

```tsx
import {
  addNavItem,
  removeNavItem,
  clearNavItems,
  getNavItems,
  getNavItemsSync,
  subscribeToNavItems,
  NavItem,
} from '@abpjs/theme-shared';

// Add a navigation item
const myNavItem: NavItem = {
  component: MyUserMenuComponent,
  order: 10,
  permission: 'AbpIdentity.Users',
};
addNavItem(myNavItem);

// Get items synchronously
const items = getNavItemsSync();

// Subscribe to changes (observable-like pattern)
const subscription = getNavItems().subscribe((items) => {
  console.log('Nav items updated:', items);
});

// Cleanup
subscription.unsubscribe();

// Alternative subscription method
const unsubscribe = subscribeToNavItems((items) => {
  console.log('Nav items:', items);
});
unsubscribe();

// Remove a specific item
removeNavItem(myNavItem);

// Clear all items
clearNavItems();
```

**NavItem Interface:**

```tsx
interface NavItem {
  component?: ComponentType<any>;  // React component to render
  html?: string;                   // Raw HTML (use with caution)
  action?: () => void;             // Click action
  order?: number;                  // Sort order (lower = first)
  permission?: string;             // Required permission
}
```

#### Lazy Styles Context

New context for configuring lazy-loaded stylesheets:

```tsx
import {
  LazyStylesContext,
  useLazyStyles,
  DEFAULT_LAZY_STYLES,
  LAZY_STYLES,
} from '@abpjs/theme-shared';

// Provide custom lazy styles
function App() {
  const customStyles = [
    'bootstrap-{{dir}}.min.css',
    'custom-theme-{{dir}}.css',
  ];

  return (
    <LazyStylesContext.Provider value={customStyles}>
      <YourApp />
    </LazyStylesContext.Provider>
  );
}

// Access lazy styles in components
function MyComponent() {
  const lazyStyles = useLazyStyles();
  // Default: ['bootstrap-{{dir}}.min.css']
}
```

### New Types

- **`LocaleDirection`** - Type for RTL/LTR direction: `'ltr' | 'rtl'`

### API Changes

- **`Confirmation.Options.dismissible`** - New property to control whether the confirmation can be dismissed by clicking outside or pressing escape

### Deprecations

- **`Confirmation.Options.closable`** - Deprecated in favor of `dismissible`. Will be removed in v3.0.

```tsx
// Before (deprecated)
confirmation.info('Message', 'Title', { closable: true });

// After (v2.9.0)
confirmation.info('Message', 'Title', { dismissible: true });
```

### Style Updates

- Added RTL support for `.data-tables-filter` class (text alignment switches in RTL mode)

### New Exports

- `useLazyStyleHandler(options?)` - Hook for RTL/LTR style switching
- `createLazyStyleHref(style, dir)` - Create lazy style href from pattern
- `getLoadedBootstrapDirection(styles?)` - Get current Bootstrap direction
- `initLazyStyleHandler(options?)` - Initialize lazy style handler
- `LazyStyleHandlerOptions` - Options interface for lazy style handler
- `addNavItem(item)` - Add a navigation item
- `removeNavItem(item)` - Remove a navigation item
- `clearNavItems()` - Clear all navigation items
- `getNavItems()` - Get navigation items (observable-like)
- `getNavItemsSync()` - Get navigation items synchronously
- `subscribeToNavItems(callback)` - Subscribe to navigation item changes
- `NavItem` - Navigation item interface
- `LazyStylesContext` - Context for lazy styles configuration
- `useLazyStyles()` - Hook to access lazy styles
- `DEFAULT_LAZY_STYLES` - Default lazy styles array
- `LAZY_STYLES` - Alias for DEFAULT_LAZY_STYLES
- `BOOTSTRAP` - Bootstrap CSS pattern constant (`'bootstrap-{{dir}}.min.css'`)
- `LocaleDirection` - Type for locale direction

---

## v2.7.0

**February 2026**

### New Features

#### Password Validation Utilities

New utilities for validating passwords against ABP Identity settings:

```tsx
import { useAbpConfig } from '@abpjs/core';
import { getPasswordValidators, getPasswordValidationRules } from '@abpjs/theme-shared';
import { useForm } from 'react-hook-form';

function PasswordForm() {
  const { getSetting } = useAbpConfig();
  const { register, formState: { errors } } = useForm();

  // Option 1: Get validators array
  const validators = getPasswordValidators({ getSetting });

  // Option 2: Get react-hook-form compatible rules
  const passwordRules = getPasswordValidationRules({ getSetting });

  return (
    <form>
      <input
        type="password"
        {...register('password', passwordRules)}
      />
      {errors.password && <span>{errors.password.message}</span>}
    </form>
  );
}
```

The validators read settings from ABP's `Abp.Identity.Password.*` configuration:
- `RequiredLength` - Minimum password length
- `MaxLength` - Maximum password length
- `RequireDigit` - Requires at least one digit
- `RequireLowercase` - Requires at least one lowercase letter
- `RequireUppercase` - Requires at least one uppercase letter
- `RequireNonAlphanumeric` - Requires at least one special character
- `RequiredUniqueChars` - Minimum unique characters

#### ModalService

New service for programmatic modal rendering:

```tsx
import { ModalProvider, ModalContainer, useModal } from '@abpjs/theme-shared';

// Wrap your app with ModalProvider
function App() {
  return (
    <ModalProvider>
      <MainContent />
      <ModalContainer />
    </ModalProvider>
  );
}

// Use the modal service in components
function MyComponent() {
  const modal = useModal();

  const openModal = () => {
    modal.renderTemplate(
      (context) => (
        <Dialog open onClose={() => modal.clearModal()}>
          <DialogContent>Hello {context?.name}</DialogContent>
        </Dialog>
      ),
      { name: 'World' }
    );
  };

  return <button onClick={openModal}>Open Modal</button>;
}
```

**ModalService methods:**
- `renderTemplate(render, context?)` - Render a template in the modal container
- `clearModal()` - Clear the current modal
- `getContainer()` - Get the container ref for the modal
- `detectChanges()` - Force a re-render of the modal content

#### HTTP Error Configuration

New context and hook for HTTP error configuration:

```tsx
import { HttpErrorConfigContext, useHttpErrorConfig, httpErrorConfigFactory } from '@abpjs/theme-shared';

function App() {
  const httpErrorConfig = {
    skipHandledErrorCodes: [404], // Let 404s pass through
    errorScreen: {
      component: MyCustomErrorComponent,
      forWhichErrors: [401, 403, 500],
    },
  };

  return (
    <HttpErrorConfigContext.Provider value={httpErrorConfig}>
      <YourApp />
    </HttpErrorConfigContext.Provider>
  );
}

// Access config in components
function MyComponent() {
  const config = useHttpErrorConfig();

  if (config.skipHandledErrorCodes?.includes(404)) {
    // Skip handling 404 errors
  }
}
```

### API Changes

#### HttpErrorConfig

- **`skipHandledErrorCodes`** - New property to specify error codes that should pass through without being handled
- **`errorScreen.forWhichErrors`** - Simplified from a tuple type to `ErrorScreenErrorCodes[]` array

```tsx
// Before (v2.4.0)
interface HttpErrorConfig {
  errorScreen?: {
    forWhichErrors?: [401] | [401, 403] | [401, 403, 404] | [401, 403, 404, 500];
  };
}

// After (v2.7.0)
interface HttpErrorConfig {
  skipHandledErrorCodes?: ErrorScreenErrorCodes[] | number[];
  errorScreen?: {
    forWhichErrors?: ErrorScreenErrorCodes[]; // Simple array
  };
}
```

### New Exports

- `getPasswordValidators(store)` - Get password validators from ABP settings
- `getPasswordValidationRules(store)` - Get react-hook-form compatible validation rules
- `getPasswordSettings(store)` - Get password settings from store
- `PasswordSettings` - Interface for password settings
- `PasswordValidator` - Type for password validator functions
- `PASSWORD_SETTING_KEYS` - Constants for ABP Identity password setting keys
- `ModalProvider` - Provider component for modal service
- `ModalContainer` - Component to render modal content
- `useModal()` - Hook to access modal service
- `useModalState()` - Hook to access current modal state
- `useModalContext()` - Hook to access full modal context
- `ModalService` - Interface for modal service
- `ModalState` - Interface for modal state
- `ModalTemplateRender` - Type for modal render functions
- `HttpErrorConfigContext` - Context for HTTP error configuration
- `useHttpErrorConfig()` - Hook to access HTTP error configuration
- `httpErrorConfigFactory()` - Factory function for default HTTP error config
- `HTTP_ERROR_CONFIG` - Token name constant

---

## v2.4.0

**February 2026**

### New Features

- **`ThemeSharedAppendContentContext`** - New React context for appending scripts or stylesheets to the document. This is the React equivalent of Angular's `THEME_SHARED_APPEND_CONTENT` injection token:

  ```tsx
  import { ThemeSharedAppendContentContext } from '@abpjs/theme-shared';

  function App() {
    const appendContent = async () => {
      // Custom logic to append scripts/styles to the document
    };

    return (
      <ThemeSharedAppendContentContext.Provider value={appendContent}>
        <YourApp />
      </ThemeSharedAppendContentContext.Provider>
    );
  }
  ```

- **`THEME_SHARED_APPEND_CONTENT` constant** - Token name constant matching Angular's InjectionToken name

### Deprecation Updates

- **`Toaster.Status` removal postponed** - Now scheduled for removal in v3.0 (previously v2.2). Continue using `Confirmation.Status` for new code.
- **`appendScript` function deprecated** - Will be removed in v2.6. Use `ThemeSharedAppendContentContext` instead.

---

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
