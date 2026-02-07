# Release Notes

## v3.2.0

**February 2026**

### New Features

#### LanguageService (Proxy Service)

A new typed proxy service for language management operations:

```tsx
import { LanguageService } from '@abpjs/language-management';
import { useRestService } from '@abpjs/core';

function useLanguages() {
  const restService = useRestService();
  const languageService = new LanguageService(restService);

  // Get all languages
  const allLanguages = await languageService.getAllList();

  // Get languages with filtering
  const languages = await languageService.getList({ filter: 'english' });

  // Get a single language
  const language = await languageService.get(languageId);

  // Create a new language
  const newLang = await languageService.create({
    displayName: 'French',
    cultureName: 'fr-FR',
    uiCultureName: 'fr-FR',
    flagIcon: 'fr',
    isEnabled: true,
  });

  // Update a language
  const updated = await languageService.update(languageId, {
    displayName: 'Français',
    flagIcon: 'fr',
    isEnabled: true,
  });

  // Set as default language
  await languageService.setAsDefault(languageId);

  // Delete a language
  await languageService.delete(languageId);

  // Get available cultures
  const cultures = await languageService.getCulturelist();

  // Get localization resources
  const resources = await languageService.getResources();
}
```

#### LanguageTextService (Proxy Service)

A new typed proxy service for language text (localization) operations:

```tsx
import { LanguageTextService } from '@abpjs/language-management';

const languageTextService = new LanguageTextService(restService);

// Get language texts with filtering
const texts = await languageTextService.getList({
  resourceName: 'AbpAccount',
  baseCultureName: 'en',
  targetCultureName: 'fr',
  getOnlyEmptyValues: true,
  maxResultCount: 50,
});

// Update a language text
await languageTextService.update({
  resourceName: 'AbpAccount',
  cultureName: 'fr',
  name: 'Login',
  value: 'Connexion',
});

// Restore a language text to default value
await languageTextService.restoreToDefault({
  resourceName: 'AbpAccount',
  cultureName: 'fr',
  name: 'Login',
});
```

#### New Proxy Models

Typed DTOs for all language management operations:

```tsx
import type {
  // Language DTOs
  LanguageDto,
  CreateLanguageDto,
  UpdateLanguageDto,
  // Language Text DTOs
  LanguageTextDto,
  GetLanguagesTextsInput,
  // Other DTOs
  CultureInfoDto,
  LanguageResourceDto,
} from '@abpjs/language-management';

// LanguageDto
interface LanguageDto {
  id: string;
  cultureName: string;
  uiCultureName: string;
  displayName: string;
  flagIcon: string;
  isEnabled: boolean;
  isDefaultLanguage: boolean;
  creationTime?: string | Date;
  creatorId?: string;
  extraProperties?: Record<string, unknown>;
}

// LanguageTextDto
interface LanguageTextDto {
  resourceName: string;
  cultureName: string;
  baseCultureName: string;
  baseValue: string;
  name: string;
  value: string;
}

// CultureInfoDto
interface CultureInfoDto {
  displayName: string;
  name: string;
}

// LanguageResourceDto
interface LanguageResourceDto {
  name: string;
}
```

#### Updated State Interface

The `LanguageManagement.State` interface now uses the new proxy DTOs:

```tsx
import type { LanguageManagement, LanguageDto, LanguageTextDto } from '@abpjs/language-management';
import type { ListResultDto, PagedResultDto } from '@abpjs/core';

interface State {
  languages: ListResultDto<LanguageDto>;
  languageTexts: PagedResultDto<LanguageTextDto>;
  cultures: CultureInfoDto[];
  resources: LanguageResourceDto[];
}
```

### Deprecations

The following legacy types are deprecated and will be removed in v4.0:

| Deprecated | Replacement |
|------------|-------------|
| `LanguageManagement.Language` | `LanguageDto` |
| `LanguageManagement.LanguageResponse` | `ListResultDto<LanguageDto>` |
| `LanguageManagement.CreateLanguageInput` | `CreateLanguageDto` |
| `LanguageManagement.UpdateLanguageInput` | `UpdateLanguageDto` |
| `LanguageManagement.LanguageText` | `LanguageTextDto` |
| `LanguageManagement.LanguageTextResponse` | `PagedResultDto<LanguageTextDto>` |
| `LanguageManagement.Culture` | `CultureInfoDto` |
| `LanguageManagement.Resource` | `LanguageResourceDto` |

### New Exports

**Services:**
- `LanguageService` - Typed proxy service for language operations
- `LanguageTextService` - Typed proxy service for language text operations

**Types:**
- `LanguageDto` - Language data transfer object
- `CreateLanguageDto` - DTO for creating languages
- `UpdateLanguageDto` - DTO for updating languages
- `LanguageTextDto` - Language text data transfer object
- `GetLanguagesTextsInput` - Input for querying language texts
- `CultureInfoDto` - Culture information DTO
- `LanguageResourceDto` - Language resource DTO

---

## v3.1.0

**February 2026**

- Version alignment with @abpjs/core

---

## v3.0.0

**February 2026**

### Breaking Changes

#### Route Names Changes

- **`eLanguageManagementRouteNames.Administration` removed** - Use `eThemeSharedRouteNames.Administration` from `@abpjs/theme-shared` instead.
- **`eLanguageManagementRouteNames.Languages` value changed** - From `'LanguageManagement::Menu:Languages'` to `'LanguageManagement::Languages'`
- **`eLanguageManagementRouteNames.LanguageManagement` added** - New key for parent route (`'LanguageManagement::LanguageManagement'`)

```tsx
// Before (v2.9.0)
import { eLanguageManagementRouteNames } from '@abpjs/language-management';
const admin = eLanguageManagementRouteNames.Administration; // ❌ Removed

// After (v3.0.0)
import { eThemeSharedRouteNames } from '@abpjs/theme-shared';
const admin = eThemeSharedRouteNames.Administration; // ✅ Use this instead
```

#### Removed Methods

- **`getLanguagesTotalCount()` removed from `LanguageManagementStateService`** - Use the `totalCount` property from the language response directly:

```tsx
// Before (v2.9.0)
const total = stateService.getLanguagesTotalCount();

// After (v3.0.0)
const languages = stateService.getLanguages();
// Access totalCount from the response if needed
```

### New Features

#### Route Providers

New route configuration system using `RoutesService` from `@abpjs/core`:

```tsx
import { initializeLanguageManagementRoutes, configureRoutes } from '@abpjs/language-management';

// Option 1: Use the global RoutesService
const addRoutes = initializeLanguageManagementRoutes();
addRoutes();

// Option 2: Use a custom RoutesService instance
import { getRoutesService } from '@abpjs/core';
const routes = getRoutesService();
const addRoutes = configureRoutes(routes);
addRoutes();
```

Also available as a provider object:

```tsx
import { LANGUAGE_MANAGEMENT_ROUTE_PROVIDERS } from '@abpjs/language-management';

LANGUAGE_MANAGEMENT_ROUTE_PROVIDERS.configureRoutes(routes);
```

#### Policy Names

New constants for permission checking:

```tsx
import { eLanguageManagementPolicyNames } from '@abpjs/language-management';

// Available policies:
// eLanguageManagementPolicyNames.LanguageManagement = 'LanguageManagement.Languages || LanguageManagement.LanguageTexts'
// eLanguageManagementPolicyNames.Languages = 'LanguageManagement.Languages'
// eLanguageManagementPolicyNames.LanguageTexts = 'LanguageManagement.LanguageTexts'
```

#### Extensions System

New extension tokens and defaults for customizing language management components:

**Entity Actions** - Row-level actions in grids:

```tsx
import {
  EntityAction,
  DEFAULT_LANGUAGES_ENTITY_ACTIONS,
  DEFAULT_LANGUAGE_TEXTS_ENTITY_ACTIONS,
  LANGUAGE_MANAGEMENT_ENTITY_ACTION_CONTRIBUTORS,
} from '@abpjs/language-management';
```

**Toolbar Actions** - Grid toolbar buttons:

```tsx
import {
  ToolbarAction,
  DEFAULT_LANGUAGES_TOOLBAR_ACTIONS,
  LANGUAGE_MANAGEMENT_TOOLBAR_ACTION_CONTRIBUTORS,
} from '@abpjs/language-management';
```

**Entity Props** - Grid column definitions:

```tsx
import {
  EntityProp,
  DEFAULT_LANGUAGES_ENTITY_PROPS,
  LANGUAGE_MANAGEMENT_ENTITY_PROP_CONTRIBUTORS,
} from '@abpjs/language-management';
```

**Form Props** - Create/Edit form fields:

```tsx
import {
  FormProp,
  DEFAULT_LANGUAGES_CREATE_FORM_PROPS,
  DEFAULT_LANGUAGES_EDIT_FORM_PROPS,
  LANGUAGE_MANAGEMENT_CREATE_FORM_PROP_CONTRIBUTORS,
  LANGUAGE_MANAGEMENT_EDIT_FORM_PROP_CONTRIBUTORS,
} from '@abpjs/language-management';
```

#### Extensions Guard

New guard for loading extensions before route activation:

```tsx
import {
  languageManagementExtensionsGuard,
  useLanguageManagementExtensionsGuard,
  LanguageManagementExtensionsGuard,
} from '@abpjs/language-management';

// Function-based guard
await languageManagementExtensionsGuard();

// React hook
function LanguageManagementLayout() {
  const { isLoaded, loading } = useLanguageManagementExtensionsGuard();

  if (loading) return <Loading />;
  return <Outlet />;
}
```

### New Exports

**Config Subpackage:**
- `eLanguageManagementPolicyNames` - Policy name constants
- `LanguageManagementPolicyNameKey` - Type for policy name values
- `configureRoutes()` - Configure routes with custom RoutesService
- `initializeLanguageManagementRoutes()` - Initialize routes with global RoutesService
- `LANGUAGE_MANAGEMENT_ROUTE_PROVIDERS` - Route providers object

**Tokens Subpackage:**
- `EntityAction<T>`, `ToolbarAction<T>`, `EntityProp<T>`, `FormProp<T>` - Extension interfaces
- `DEFAULT_LANGUAGES_ENTITY_ACTIONS`, `DEFAULT_LANGUAGE_TEXTS_ENTITY_ACTIONS`
- `DEFAULT_LANGUAGES_TOOLBAR_ACTIONS`, `DEFAULT_LANGUAGE_TEXTS_TOOLBAR_ACTIONS`
- `DEFAULT_LANGUAGES_ENTITY_PROPS`
- `DEFAULT_LANGUAGES_CREATE_FORM_PROPS`, `DEFAULT_LANGUAGES_EDIT_FORM_PROPS`
- `DEFAULT_LANGUAGE_MANAGEMENT_ENTITY_ACTIONS`, `DEFAULT_LANGUAGE_MANAGEMENT_TOOLBAR_ACTIONS`
- `DEFAULT_LANGUAGE_MANAGEMENT_ENTITY_PROPS`, `DEFAULT_LANGUAGE_MANAGEMENT_CREATE_FORM_PROPS`, `DEFAULT_LANGUAGE_MANAGEMENT_EDIT_FORM_PROPS`
- Contributor callback types: `EntityActionContributorCallback<T>`, `ToolbarActionContributorCallback<T>`, etc.
- Contributor type definitions: `LanguageManagementEntityActionContributors`, `LanguageManagementToolbarActionContributors`, etc.
- Token symbols: `LANGUAGE_MANAGEMENT_ENTITY_ACTION_CONTRIBUTORS`, `LANGUAGE_MANAGEMENT_TOOLBAR_ACTION_CONTRIBUTORS`, etc.

**Guards Subpackage:**
- `languageManagementExtensionsGuard()` - Async guard function
- `useLanguageManagementExtensionsGuard()` - React hook
- `LanguageManagementExtensionsGuard` - Class-based guard (deprecated)

---

## v2.9.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.7.0

**February 2026**

### New Features

#### Route Names

New constants for language management route names (localization keys):

```tsx
import { eLanguageManagementRouteNames } from '@abpjs/language-management';

// Available route names:
// eLanguageManagementRouteNames.Languages = 'LanguageManagement::Menu:Languages'
// eLanguageManagementRouteNames.LanguageTexts = 'LanguageManagement::LanguageTexts'
```

> **Note:** `Administration` was removed in v3.0.0. Use `eThemeSharedRouteNames.Administration` from `@abpjs/theme-shared` instead.

### API Changes

- **`eLanguageManagementComponents`** - Changed from TypeScript `enum` to `const` object for better tree-shaking and type inference:

  ```tsx
  // Before (v2.4.0)
  enum eLanguageManagementComponents {
    Languages = 'LanguageManagement.LanguagesComponent',
    // ...
  }

  // After (v2.7.0)
  const eLanguageManagementComponents = {
    Languages: 'LanguageManagement.LanguagesComponent',
    // ...
  } as const;
  ```

### New Exports

- `eLanguageManagementRouteNames` - Constants for route names (localization keys)
- `LanguageManagementRouteNameKey` - Type for language management route name values
- `LanguageManagementComponentKey` - Type for language management component key values

---

## v2.4.0

**February 2026**

### New Features

- **`LanguageManagementService.apiName` property** - New property for REST API configuration. Defaults to `'default'`.

- **`eLanguageManagementComponents` enum** - New enum for component identifiers, useful for component registration and customization:

  ```tsx
  import { eLanguageManagementComponents } from '@abpjs/language-management';

  // Available components:
  // eLanguageManagementComponents.Languages = 'LanguageManagement.LanguagesComponent'
  // eLanguageManagementComponents.LanguageTexts = 'LanguageManagement.LanguageTextsComponent'
  ```

---

## v2.2.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.1.1

**February 2026**

- Version alignment with @abpjs/core

---

## v2.0.0

**January 2026**

### New Features

- **`LanguageManagementStateService`** - New state service for programmatic language management operations:

  **Language Operations:**
  - `dispatchGetLanguages(params?)` - Fetch languages and update internal state
  - `dispatchGetLanguageById(id)` - Fetch a single language by ID
  - `dispatchCreateUpdateLanguage(body, id?)` - Create or update a language
  - `dispatchDeleteLanguage(id)` - Delete a language
  - `dispatchSetAsDefaultLanguage(id)` - Set a language as the default

  **Language Text Operations:**
  - `dispatchGetLanguageTexts(params)` - Fetch language texts with filters
  - `dispatchUpdateLanguageTextByName(params)` - Update a language text translation
  - `dispatchRestoreLanguageTextByName(params)` - Restore a language text to its default value

  **Culture & Resource Operations:**
  - `dispatchGetLanguageCultures()` - Fetch available cultures
  - `dispatchGetLanguageResources()` - Fetch available localization resources

  **State Getter Methods:**
  - `getLanguages()` - Access cached languages
  - `getLanguageTexts()` / `getLanguageTextsTotalCount()` - Access cached language texts
  - `getCultures()` - Access cached cultures
  - `getResources()` - Access cached resources

> **Note:** `getLanguagesTotalCount()` was removed in v3.0.0.

### Example

```tsx
import { LanguageManagementStateService } from '@abpjs/language-management';
import { RestService } from '@abpjs/core';

const restService = new RestService();
const stateService = new LanguageManagementStateService(restService);

// Fetch languages
await stateService.dispatchGetLanguages({ maxResultCount: 10 });
const languages = stateService.getLanguages();
console.log(`Found ${languages.length} languages`);

// Create a new language
await stateService.dispatchCreateUpdateLanguage({
  cultureName: 'fr',
  uiCultureName: 'fr',
  displayName: 'French',
  isEnabled: true,
});

// Fetch language texts
await stateService.dispatchGetLanguageTexts({
  resourceName: 'AbpAccount',
  baseCultureName: 'en',
  targetCultureName: 'fr',
});
const texts = stateService.getLanguageTexts();

// Fetch cultures and resources
await stateService.dispatchGetLanguageCultures();
const cultures = stateService.getCultures();
```

---

## v1.0.0

**January 2026**

- Version alignment with @abpjs/core v1.0.0

---

## v0.7.2 (Initial Release)

### Components

- **LanguagesComponent** - Full language management UI with CRUD operations, culture selection, flag icons, and default language setting
- **LanguageTextsComponent** - Localization string management with filtering by resource, culture comparison, and inline editing

### Hooks

- **useLanguages** - State management for languages with:
  - `fetchLanguages()` - Get paginated languages
  - `fetchCultures()` - Get available cultures
  - `createLanguage()` - Create new language
  - `updateLanguage()` - Update existing language
  - `deleteLanguage()` - Delete language
  - `setAsDefaultLanguage()` - Set default language

- **useLanguageTexts** - State management for localization strings with:
  - `fetchLanguageTexts()` - Get texts with culture filtering
  - `fetchResources()` - Get localization resources
  - `updateLanguageTextByName()` - Update translation
  - `restoreLanguageTextByName()` - Restore to default value

### Services

- **LanguageManagementService** with methods for:
  - Language CRUD operations
  - Culture and resource listing
  - Language text queries and updates
  - Restore translations to defaults

### Constants

- **LANGUAGE_MANAGEMENT_ROUTES** - Pre-configured route definitions

### TypeScript

- **LanguageManagement namespace** with all types:
  - `Language`, `LanguageResponse`
  - `CreateLanguageInput`, `UpdateLanguageInput`
  - `LanguageText`, `LanguageTextResponse`
  - `LanguageTextQueryParams`, `LanguageTextRequestByNameParams`, `LanguageTextUpdateByNameParams`
  - `Culture`, `Resource`
  - `State` interface for state management
