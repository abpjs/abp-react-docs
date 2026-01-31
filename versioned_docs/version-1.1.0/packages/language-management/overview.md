# Language Management Module

The `@abpjs/language-management` package provides language and localization management components for ABP React applications. This is the React equivalent of Angular's `@volo/abp.ng.language-management` module.

:::info ABP Commercial License Required
This package is free to use but requires the corresponding backend module from [ABP Commercial](https://commercial.abp.io/). You can purchase an ABP Commercial license from [abp.io](https://abp.io/pricing).
:::

## Installation

```bash
npm install @abpjs/language-management
# or
yarn add @abpjs/language-management
```

## Features

- **Language Management** - Create, edit, delete, and set default languages
- **Language Texts** - Manage localization strings for different cultures
- **Culture Support** - Browse and select from available cultures
- **Resource Management** - View and filter by localization resources
- **Restore Defaults** - Restore modified translations to their default values

## Components

### LanguagesComponent

Full-featured language management UI with CRUD operations.

```tsx
import { LanguagesComponent } from '@abpjs/language-management';

function LanguagesPage() {
  return <LanguagesComponent />;
}
```

**Features:**
- Paginated language list with sorting
- Create/edit language modal with culture selection
- Delete language with confirmation
- Set default language
- Enable/disable languages
- Flag icon selection

### LanguageTextsComponent

Localization string management interface for translating application texts.

```tsx
import { LanguageTextsComponent } from '@abpjs/language-management';

function LanguageTextsPage() {
  return <LanguageTextsComponent />;
}
```

**Features:**
- Paginated language text list with search
- Filter by resource, base culture, and target culture
- Filter to show only empty (untranslated) values
- Inline editing of translations
- Restore to default value

## Hooks

### useLanguages

Hook for managing languages state and operations.

```tsx
import { useLanguages } from '@abpjs/language-management';

function MyLanguagesComponent() {
  const {
    languages,
    totalCount,
    cultures,
    isLoading,
    fetchLanguages,
    fetchCultures,
    createLanguage,
    updateLanguage,
    deleteLanguage,
    setAsDefaultLanguage,
  } = useLanguages();

  useEffect(() => {
    fetchLanguages();
    fetchCultures();
  }, [fetchLanguages, fetchCultures]);

  const handleCreate = async (data) => {
    const result = await createLanguage(data);
    if (result.success) {
      // Handle success
    }
  };
}
```

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `languages` | `Language[]` | List of languages |
| `totalCount` | `number` | Total language count |
| `cultures` | `Culture[]` | Available cultures |
| `selectedLanguage` | `Language \| null` | Selected language |
| `isLoading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message |
| `fetchLanguages` | `(params?) => Promise<Result>` | Fetch languages |
| `fetchCultures` | `() => Promise<Result>` | Fetch available cultures |
| `getLanguageById` | `(id) => Promise<Result>` | Get language by ID |
| `createLanguage` | `(data) => Promise<Result>` | Create language |
| `updateLanguage` | `(id, data) => Promise<Result>` | Update language |
| `deleteLanguage` | `(id) => Promise<Result>` | Delete language |
| `setAsDefaultLanguage` | `(id) => Promise<Result>` | Set as default |

### useLanguageTexts

Hook for managing language texts (localization strings).

```tsx
import { useLanguageTexts } from '@abpjs/language-management';

function MyLanguageTextsComponent() {
  const {
    languageTexts,
    totalCount,
    resources,
    isLoading,
    fetchLanguageTexts,
    fetchResources,
    updateLanguageTextByName,
    restoreLanguageTextByName,
  } = useLanguageTexts();

  useEffect(() => {
    fetchResources();
    fetchLanguageTexts({
      baseCultureName: 'en',
      targetCultureName: 'fr',
      getOnlyEmptyValues: false,
    });
  }, [fetchLanguageTexts, fetchResources]);

  const handleUpdate = async (name, value) => {
    const result = await updateLanguageTextByName({
      resourceName: 'MyResource',
      cultureName: 'fr',
      name,
      value,
    });
  };
}
```

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `languageTexts` | `LanguageText[]` | List of language texts |
| `totalCount` | `number` | Total text count |
| `resources` | `Resource[]` | Available resources |
| `selectedLanguageText` | `LanguageText \| null` | Selected text |
| `isLoading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message |
| `fetchLanguageTexts` | `(params) => Promise<Result>` | Fetch texts with filters |
| `fetchResources` | `() => Promise<Result>` | Fetch available resources |
| `getLanguageTextByName` | `(params) => Promise<Result>` | Get text by name |
| `updateLanguageTextByName` | `(params) => Promise<Result>` | Update translation |
| `restoreLanguageTextByName` | `(params) => Promise<Result>` | Restore to default |

## Services

### LanguageManagementService

Service class for language management API operations.

**Language Methods:**

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getLanguages` | `params?: PageQueryParams` | `Promise<LanguageResponse>` | Get paginated languages |
| `getLanguageById` | `id: string` | `Promise<Language>` | Get language by ID |
| `createLanguage` | `body: CreateLanguageInput` | `Promise<Language>` | Create language |
| `updateLanguage` | `id: string, body: UpdateLanguageInput` | `Promise<Language>` | Update language |
| `deleteLanguage` | `id: string` | `Promise<void>` | Delete language |
| `setAsDefaultLanguage` | `id: string` | `Promise<void>` | Set as default |
| `getCultures` | - | `Promise<Culture[]>` | Get available cultures |

**Language Text Methods:**

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getResources` | - | `Promise<Resource[]>` | Get localization resources |
| `getLanguageTexts` | `params: LanguageTextQueryParams` | `Promise<LanguageTextResponse>` | Get texts with filters |
| `getLanguageTextByName` | `params: LanguageTextRequestByNameParams` | `Promise<LanguageText>` | Get text by name |
| `updateLanguageTextByName` | `params: LanguageTextUpdateByNameParams` | `Promise<LanguageText>` | Update translation |
| `restoreLanguageTextByName` | `params: LanguageTextRequestByNameParams` | `Promise<void>` | Restore to default |

## Routes

The package provides pre-configured routes:

```tsx
import { LANGUAGE_MANAGEMENT_ROUTES } from '@abpjs/language-management';

// Route structure:
// /language-management
//   /language-management/languages
//   /language-management/texts
```

## TypeScript Support

The package exports all TypeScript interfaces under the `LanguageManagement` namespace:

```tsx
import { LanguageManagement } from '@abpjs/language-management';

// Types
const language: LanguageManagement.Language = { ... };
const text: LanguageManagement.LanguageText = { ... };
const culture: LanguageManagement.Culture = { ... };
const resource: LanguageManagement.Resource = { ... };

// Input types
const createInput: LanguageManagement.CreateLanguageInput = { ... };
const updateInput: LanguageManagement.UpdateLanguageInput = { ... };

// Query types
const textQuery: LanguageManagement.LanguageTextQueryParams = {
  baseCultureName: 'en',
  targetCultureName: 'fr',
  getOnlyEmptyValues: false,
  resourceName: 'MyResource',
};
```

**Key Types:**

| Type | Description |
|------|-------------|
| `Language` | Language entity with id, cultureName, displayName, flagIcon, isEnabled, isDefaultLanguage |
| `CreateLanguageInput` | Input for creating languages (cultureName, uiCultureName, displayName, flagIcon, isEnabled) |
| `UpdateLanguageInput` | Input for updating languages (displayName, flagIcon, isEnabled) |
| `LanguageText` | Localization string with resourceName, cultureName, name, value, baseValue |
| `LanguageTextQueryParams` | Query params for texts (baseCultureName, targetCultureName, getOnlyEmptyValues, resourceName) |
| `Culture` | Culture info (name, displayName) |
| `Resource` | Localization resource (name) |

## Dependencies

- `@abpjs/core` - Core ABP React functionality

## See Also

- [Core Module](../core/overview)
- [Setting Management](../setting-management/overview)
