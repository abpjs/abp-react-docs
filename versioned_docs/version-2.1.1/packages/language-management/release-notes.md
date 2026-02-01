# Release Notes

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
  - `getLanguages()` / `getLanguagesTotalCount()` - Access cached languages
  - `getLanguageTexts()` / `getLanguageTextsTotalCount()` - Access cached language texts
  - `getCultures()` - Access cached cultures
  - `getResources()` - Access cached resources

### Example

```tsx
import { LanguageManagementStateService } from '@abpjs/language-management';
import { RestService } from '@abpjs/core';

const restService = new RestService();
const stateService = new LanguageManagementStateService(restService);

// Fetch languages
await stateService.dispatchGetLanguages({ maxResultCount: 10 });
const languages = stateService.getLanguages();
console.log(`Found ${stateService.getLanguagesTotalCount()} languages`);

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
