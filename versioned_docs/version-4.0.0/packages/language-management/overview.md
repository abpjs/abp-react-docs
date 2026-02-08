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

### LanguageService (Proxy)

Typed proxy service for language operations (v3.2.0+):

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getList` | `input?: GetLanguagesTextsInput` | `Promise<PagedResultDto<LanguageDto>>` | Get languages (paginated since v4.0.0) |
| `getAllList` | - | `Promise<ListResultDto<LanguageDto>>` | Get all languages |
| `get` | `id: string` | `Promise<LanguageDto>` | Get language by ID |
| `create` | `input: CreateLanguageDto` | `Promise<LanguageDto>` | Create language |
| `update` | `id: string, input: UpdateLanguageDto` | `Promise<LanguageDto>` | Update language |
| `delete` | `id: string` | `Promise<void>` | Delete language |
| `setAsDefault` | `id: string` | `Promise<void>` | Set as default |
| `getCulturelist` | - | `Promise<CultureInfoDto[]>` | Get available cultures |
| `getResources` | - | `Promise<LanguageResourceDto[]>` | Get localization resources |

### LanguageTextService (Proxy)

Typed proxy service for language text operations (v3.2.0+):

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getList` | `input: GetLanguagesTextsInput` | `Promise<PagedResultDto<LanguageTextDto>>` | Get texts with filters |
| `update` | `params` | `Promise<void>` | Update translation |
| `restoreToDefault` | `params` | `Promise<void>` | Restore to default |

### LanguageManagementService (Deprecated)

:::caution Deprecated
`LanguageManagementService` is deprecated and will be removed in v5.0. Use `LanguageService` and `LanguageTextService` instead.
:::

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

Since v3.2.0, prefer using proxy DTOs instead of the legacy `LanguageManagement` namespace types:

```tsx
import type {
  LanguageDto,
  CreateLanguageDto,
  UpdateLanguageDto,
  LanguageTextDto,
  GetLanguagesTextsInput,
  CultureInfoDto,
  LanguageResourceDto,
} from '@abpjs/language-management';
```

**Proxy DTOs (recommended):**

| Type | Description |
|------|-------------|
| `LanguageDto` | Language entity (replaces `LanguageManagement.Language`) |
| `CreateLanguageDto` | Create language input (replaces `LanguageManagement.CreateLanguageInput`) |
| `UpdateLanguageDto` | Update language input (replaces `LanguageManagement.UpdateLanguageInput`) |
| `LanguageTextDto` | Localization string (replaces `LanguageManagement.LanguageText`) |
| `GetLanguagesTextsInput` | Query params for texts (replaces `LanguageManagement.LanguageTextQueryParams`) |
| `CultureInfoDto` | Culture info (replaces `LanguageManagement.Culture`) |
| `LanguageResourceDto` | Localization resource (replaces `LanguageManagement.Resource`) |

The legacy `LanguageManagement` namespace types are still exported for backward compatibility but are deprecated and will be removed in v5.0.

## Dependencies

- `@abpjs/core` - Core ABP React functionality

## See Also

- [Core Module](../core/overview)
- [Setting Management](../setting-management/overview)
- [Release Notes](./release-notes) - Version history
