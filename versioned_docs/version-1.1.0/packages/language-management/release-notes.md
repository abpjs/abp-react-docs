# Release Notes

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
