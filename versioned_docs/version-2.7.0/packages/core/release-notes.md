---
sidebar_position: 99
---

# Release Notes

## v2.7.0

**February 2026**

### New Features

#### Utility Functions

New utility functions for common operations:

**`mapEnumToOptions()`** - Convert enums to select options:

```tsx
import { mapEnumToOptions } from '@abpjs/core';

enum Status {
  Active = 0,
  Inactive = 1,
  Pending = 2,
}

const options = mapEnumToOptions(Status);
// Returns: [
//   { key: 'Active', value: 0 },
//   { key: 'Inactive', value: 1 },
//   { key: 'Pending', value: 2 }
// ]

// Use in a select component
<Select>
  {options.map((opt) => (
    <option key={opt.key} value={opt.value}>
      {opt.key}
    </option>
  ))}
</Select>
```

**`isNumber()`** - Validate numeric values:

```tsx
import { isNumber } from '@abpjs/core';

isNumber(42);      // true
isNumber('42');    // true
isNumber('3.14');  // true
isNumber('abc');   // false
isNumber('');      // false
isNumber(NaN);     // false
```

**`generatePassword()`** - Generate secure random passwords:

```tsx
import { generatePassword } from '@abpjs/core';

const password = generatePassword();     // 16 character password
const short = generatePassword(8);       // 8 character password
const long = generatePassword(32);       // 32 character password

// Passwords include: lowercase, uppercase, digits, and special characters
```

#### Application Configuration Types

New interfaces for culture and date/time formatting:

```tsx
import { ApplicationConfiguration } from '@abpjs/core';

// Access current culture information
const currentCulture: ApplicationConfiguration.CurrentCulture = {
  cultureName: 'en-US',
  displayName: 'English (United States)',
  englishName: 'English',
  nativeName: 'English',
  isRightToLeft: false,
  twoLetterIsoLanguageName: 'en',
  threeLetterIsoLanguageName: 'eng',
  dateTimeFormat: {
    calendarAlgorithmType: 'SolarCalendar',
    dateSeparator: '/',
    fullDateTimePattern: 'dddd, MMMM d, yyyy h:mm:ss tt',
    longTimePattern: 'h:mm:ss tt',
    shortDatePattern: 'M/d/yyyy',
    shortTimePattern: 'h:mm tt',
  },
};
```

#### New Types

**`ABP.Option<T>`** - Type for enum-to-options mapping:

```tsx
import { ABP } from '@abpjs/core';

// Used with mapEnumToOptions()
type StatusOption = ABP.Option<typeof Status>;
// { key: 'Active' | 'Inactive' | 'Pending', value: 0 | 1 | 2 }
```

**`ABP.Test`** - Configuration for test environments:

```tsx
import { ABP } from '@abpjs/core';

const testConfig: ABP.Test = {
  baseHref: '/test/',
};
```

**Utility Types:**

```tsx
import {
  InferredInstanceOf,
  InferredContextOf,
  ComponentFactory,
  RenderProp,
} from '@abpjs/core';

// Infer props type from a component
type ButtonProps = InferredInstanceOf<typeof Button>;

// Infer context type from a render prop
type ContextType = InferredContextOf<typeof renderFunction>;
```

#### DomInsertionService Updates

New method and return value:

```tsx
import { getDomInsertionService, CONTENT_STRATEGY } from '@abpjs/core';

const domInsertionService = getDomInsertionService();

// insertContent() now returns the inserted element
const styleElement = domInsertionService.insertContent(
  CONTENT_STRATEGY.AppendStyleToHead('.my-class { color: red; }')
);

// New: removeContent() to remove an element
domInsertionService.removeContent(styleElement);

// has() replaces hasInserted() (hasInserted still works but deprecated)
if (!domInsertionService.has(myContent)) {
  domInsertionService.insertContent(/* ... */);
}
```

#### Configuration Options

**`ABP.Root.skipGetAppConfiguration`** - Skip fetching app configuration on initialization:

```tsx
import { AbpProvider } from '@abpjs/core';

// Useful for testing or when configuration is loaded separately
<AbpProvider options={{ skipGetAppConfiguration: true }}>
  <App />
</AbpProvider>
```

### API Changes

- **`DomInsertionService.insertContent()`** - Now returns the inserted element (previously void)
- **`DomInsertionService.inserted`** - Made private (was readonly)
- **`ContentStrategy.insertElement()`** - Now returns the inserted element

### Deprecations

- **`DomInsertionService.hasInserted()`** - Use `has()` instead

---

## v2.4.0

**February 2026**

### New Features

#### Standard DTO Classes

New DTO classes for consistent data transfer patterns across ABP applications:

**List/Paged Results:**

```tsx
import { ListResultDto, PagedResultDto } from '@abpjs/core';

// ListResultDto - for list responses
interface UserListResult extends ListResultDto<UserDto> {}

// PagedResultDto - for paginated responses with totalCount
interface UserPagedResult extends PagedResultDto<UserDto> {}
```

**Request DTOs:**

```tsx
import {
  LimitedResultRequestDto,
  PagedResultRequestDto,
  PagedAndSortedResultRequestDto,
} from '@abpjs/core';

// LimitedResultRequestDto - maxResultCount only
const limitedRequest = new LimitedResultRequestDto({ maxResultCount: 10 });

// PagedResultRequestDto - maxResultCount + skipCount
const pagedRequest = new PagedResultRequestDto({
  maxResultCount: 10,
  skipCount: 20
});

// PagedAndSortedResultRequestDto - includes sorting
const sortedRequest = new PagedAndSortedResultRequestDto({
  maxResultCount: 10,
  skipCount: 0,
  sorting: 'name asc',
});
```

**Entity DTOs with Audit Info:**

```tsx
import {
  EntityDto,
  CreationAuditedEntityDto,
  AuditedEntityDto,
  FullAuditedEntityDto,
} from '@abpjs/core';

// EntityDto<TKey> - basic entity with ID
interface MyEntity extends EntityDto<string> {
  name: string;
}

// CreationAuditedEntityDto - includes creationTime, creatorId
// AuditedEntityDto - adds lastModificationTime, lastModifierId
// FullAuditedEntityDto - adds isDeleted, deleterId, deletionTime

// With user references:
import {
  CreationAuditedEntityWithUserDto,
  AuditedEntityWithUserDto,
  FullAuditedEntityWithUserDto,
} from '@abpjs/core';
```

#### Loading Strategies

New strategy-based approach for loading external scripts and styles:

```tsx
import {
  LazyLoadService,
  LOADING_STRATEGY,
  DOM_STRATEGY,
  CROSS_ORIGIN_STRATEGY,
} from '@abpjs/core';

const lazyLoadService = new LazyLoadService();

// Load script using pre-configured strategy
await lazyLoadService.load(
  LOADING_STRATEGY.AppendAnonymousScriptToHead(
    'https://cdn.example.com/library.js',
    'sha384-...' // optional integrity hash
  )
);

// Load stylesheet
await lazyLoadService.load(
  LOADING_STRATEGY.AppendAnonymousStyleToHead(
    'https://cdn.example.com/styles.css'
  )
);

// Check if already loaded
if (!lazyLoadService.isLoaded('https://cdn.example.com/library.js')) {
  await lazyLoadService.load(/* ... */);
}
```

Available `LOADING_STRATEGY` presets:
- `AppendAnonymousScriptToBody(src, integrity?)`
- `AppendAnonymousScriptToHead(src, integrity?)`
- `AppendAnonymousStyleToHead(src, integrity?)`
- `PrependAnonymousScriptToHead(src, integrity?)`
- `PrependAnonymousStyleToHead(src, integrity?)`

#### Content Strategies

For inserting inline scripts and styles:

```tsx
import {
  DomInsertionService,
  getDomInsertionService,
  CONTENT_STRATEGY,
} from '@abpjs/core';

const domInsertionService = getDomInsertionService();

// Insert inline style
domInsertionService.insertContent(
  CONTENT_STRATEGY.AppendStyleToHead(`
    .my-class { color: red; }
  `)
);

// Insert inline script
domInsertionService.insertContent(
  CONTENT_STRATEGY.AppendScriptToHead(`
    console.log('Script loaded');
  `)
);

// Check if content was already inserted
if (!domInsertionService.hasInserted(myContent)) {
  domInsertionService.insertContent(/* ... */);
}
```

Available `CONTENT_STRATEGY` presets:
- `AppendScriptToBody(content)`
- `AppendScriptToHead(content)`
- `AppendStyleToHead(content)`
- `PrependStyleToHead(content)`

#### DOM Strategies

Low-level control over element insertion:

```tsx
import { DOM_STRATEGY, DomStrategy } from '@abpjs/core';

// Pre-configured strategies
DOM_STRATEGY.AppendToHead()    // Insert at end of <head>
DOM_STRATEGY.PrependToHead()   // Insert at start of <head>
DOM_STRATEGY.AppendToBody()    // Insert at end of <body>
DOM_STRATEGY.BeforeElement(el) // Insert before element
DOM_STRATEGY.AfterElement(el)  // Insert after element

// Custom strategy
const strategy = new DomStrategy(
  document.getElementById('container')!,
  'beforeend'
);
```

#### Cross-Origin Strategies

Configure CORS and integrity for loaded resources:

```tsx
import { CROSS_ORIGIN_STRATEGY } from '@abpjs/core';

// Anonymous CORS with SRI integrity
CROSS_ORIGIN_STRATEGY.Anonymous('sha384-...');

// Credentials CORS
CROSS_ORIGIN_STRATEGY.UseCredentials();
```

#### Content Security Strategies

Apply CSP nonces to dynamically inserted content:

```tsx
import { CONTENT_SECURITY_STRATEGY } from '@abpjs/core';

// Apply nonce for CSP compliance
CONTENT_SECURITY_STRATEGY.Loose('nonce-abc123');

// No CSP (default)
CONTENT_SECURITY_STRATEGY.None();
```

### API Changes

- **`Config.Environment.hmr`** - New optional boolean flag for Hot Module Replacement
- **`Config.ApiConfig`** - New interface type for API configuration (previously inline)
- **`Rest.Config.apiName`** - Specify which API to use for requests (from `Config.Apis`)

### New Utilities

```tsx
import {
  isUndefinedOrEmptyString,
  generateHash,
  fromLazyLoad,
  noop,
} from '@abpjs/core';

// Check for undefined or empty string
isUndefinedOrEmptyString(undefined); // true
isUndefinedOrEmptyString('');        // true
isUndefinedOrEmptyString('hello');   // false

// Generate hash from string
const hash = generateHash('my-string'); // number

// Load element with promise
const script = document.createElement('script');
script.src = 'https://example.com/lib.js';
await fromLazyLoad(script, DOM_STRATEGY.AppendToHead());

// No-op function
const doNothing = noop();
```

### Deprecations

- **`ABP.Root.requirements`** - Deprecated and now optional. Will be removed in v3.0.

---

## v2.2.0

**February 2026**

- Version alignment with @abp/ng.core

---

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
