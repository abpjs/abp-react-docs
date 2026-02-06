# Text Template Management Module

The `@abpjs/text-template-management` package provides text template management components for ABP React applications. This is the React equivalent of Angular's `@volo/abp.ng.text-template-management` module.

:::info ABP Commercial License Required
This package is free to use but requires the corresponding backend module from [ABP Commercial](https://commercial.abp.io/). You can purchase an ABP Commercial license from [abp.io](https://abp.io/pricing).
:::

## Installation

```bash
npm install @abpjs/text-template-management
# or
yarn add @abpjs/text-template-management
```

## Features

- **Template Definitions** - View and browse text template definitions
- **Template Content Editing** - Edit template content with multi-culture support
- **Restore to Default** - Restore modified templates to their default values
- **Layout Templates** - Support for layout template hierarchy

## Components

### TextTemplatesComponent

Full-featured text template management UI with template listing and content editing.

```tsx
import { TextTemplatesComponent } from '@abpjs/text-template-management';

function TextTemplatesPage() {
  return <TextTemplatesComponent />;
}
```

**Features:**
- Paginated template definition list with search
- Template details display (layout, default culture, inline localized status)
- Navigation to template content editing

### TemplateContentsComponent

Template content editing interface for modifying template content per culture.

```tsx
import { TemplateContentsComponent } from '@abpjs/text-template-management';

function TemplateContentPage() {
  return <TemplateContentsComponent templateName="MyTemplate" />;
}
```

**Features:**
- Culture selection for multi-language templates
- Template content editor
- Save and restore to default functionality
- Layout template indicator

## Hooks

### useTextTemplates

Hook for managing text templates state and operations.

```tsx
import { useTextTemplates } from '@abpjs/text-template-management';

function MyTextTemplatesComponent() {
  const {
    templateDefinitions,
    totalCount,
    templateContent,
    isLoading,
    fetchTemplateDefinitions,
    getTemplateContent,
    updateTemplateContent,
    restoreToDefault,
  } = useTextTemplates();

  useEffect(() => {
    fetchTemplateDefinitions();
  }, [fetchTemplateDefinitions]);

  const handleEdit = async (templateName: string, cultureName: string) => {
    await getTemplateContent({ templateName, cultureName });
  };

  const handleSave = async (templateName: string, cultureName: string, content: string) => {
    const result = await updateTemplateContent({
      templateName,
      cultureName,
      content,
    });
    if (result.success) {
      // Handle success
    }
  };
}
```

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `templateDefinitions` | `TemplateDefinitionDto[]` | List of template definitions |
| `totalCount` | `number` | Total template count |
| `selectedTemplate` | `TemplateDefinitionDto \| null` | Selected template |
| `templateContent` | `TextTemplateContentDto \| null` | Current template content |
| `isLoading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message |
| `fetchTemplateDefinitions` | `(params?) => Promise<void>` | Fetch template definitions |
| `getTemplateContent` | `(params) => Promise<void>` | Get template content |
| `updateTemplateContent` | `(body) => Promise<Result>` | Update template content |
| `restoreToDefault` | `(params) => Promise<Result>` | Restore to default |
| `setSelectedTemplate` | `(template) => void` | Set selected template |
| `reset` | `() => void` | Reset all state |

## Services

### TemplateDefinitionService

Service class for template definition API operations.

```tsx
import { TemplateDefinitionService } from '@abpjs/text-template-management';
import { RestService } from '@abpjs/core';

const restService = new RestService();
const service = new TemplateDefinitionService(restService);

// Get template definitions
const result = await service.getList({
  maxResultCount: 10,
  skipCount: 0,
});
```

**Methods:**

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getList` | `params?: PagedResultRequestDto` | `Promise<ListResultDto<TemplateDefinitionDto>>` | Get template definitions |

### TemplateContentService

Service class for template content API operations.

```tsx
import { TemplateContentService } from '@abpjs/text-template-management';
import { RestService } from '@abpjs/core';

const restService = new RestService();
const service = new TemplateContentService(restService);

// Get template content
const content = await service.getByInput({
  templateName: 'MyTemplate',
  cultureName: 'en',
});

// Update template content
await service.updateByInput({
  templateName: 'MyTemplate',
  cultureName: 'en',
  content: 'Updated content...',
});

// Restore to default
await service.restoreToDefaultByInput({
  templateName: 'MyTemplate',
  cultureName: 'en',
});
```

**Methods:**

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getByInput` | `params: TemplateContentInput` | `Promise<TextTemplateContentDto>` | Get template content |
| `updateByInput` | `body: CreateOrUpdateTemplateContentDto` | `Promise<TextTemplateContentDto>` | Update content |
| `restoreToDefaultByInput` | `body: TemplateContentInput` | `Promise<void>` | Restore to default |

### TextTemplateManagementStateService

Stateful service for managing text template state programmatically.

```tsx
import { TextTemplateManagementStateService } from '@abpjs/text-template-management';
import { RestService } from '@abpjs/core';

const restService = new RestService();
const stateService = new TextTemplateManagementStateService(restService);

// Fetch template definitions
await stateService.dispatchGetTemplateDefinitions({ maxResultCount: 10 });
const templates = stateService.getTemplateDefinitions();
console.log(`Found ${stateService.getTotalCount()} templates`);

// Get template content
await stateService.dispatchGetTemplateContent({
  templateName: 'MyTemplate',
  cultureName: 'en',
});
const content = stateService.getTemplateContent();

// Update template content
await stateService.dispatchUpdateTemplateContent({
  templateName: 'MyTemplate',
  cultureName: 'en',
  content: 'New content...',
});

// Restore to default
await stateService.dispatchRestoreToDefault({
  templateName: 'MyTemplate',
  cultureName: 'en',
});
```

**Dispatch Methods:**

| Method | Parameters | Description |
|--------|------------|-------------|
| `dispatchGetTemplateDefinitions` | `params?` | Fetch template definitions |
| `dispatchGetTemplateContent` | `params` | Get template content |
| `dispatchUpdateTemplateContent` | `body` | Update template content |
| `dispatchRestoreToDefault` | `body` | Restore template to default |
| `setSelectedTemplate` | `template` | Set selected template |
| `reset` | - | Clear all state |

**Getter Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `getTemplateDefinitions` | `TemplateDefinitionDto[]` | Get cached template definitions |
| `getTotalCount` | `number` | Get total count |
| `getSelectedTemplate` | `TemplateDefinitionDto \| null` | Get selected template |
| `getTemplateContent` | `TextTemplateContentDto \| null` | Get template content |

## Routes

The package provides pre-configured routes:

```tsx
import { TEXT_TEMPLATE_MANAGEMENT_ROUTES } from '@abpjs/text-template-management';

// Route structure:
// /text-template-management
```

## Component Replacement

Use the component keys to replace default components:

```tsx
import { eTextTemplateManagementComponents } from '@abpjs/text-template-management';

// Available component keys:
// eTextTemplateManagementComponents.TextTemplates = 'TextTemplateManagement.TextTemplates'
// eTextTemplateManagementComponents.TemplateContents = 'TextTemplateManagement.TemplateContents'
// eTextTemplateManagementComponents.InlineTemplateContent = 'TextTemplateManagement.InlineTemplateContent'
```

## Route Names

Use the route name constants for navigation and localization:

```tsx
import { eTextTemplateManagementRouteNames } from '@abpjs/text-template-management';

// Available route names:
// eTextTemplateManagementRouteNames.Administration = 'AbpUiNavigation::Menu:Administration'
// eTextTemplateManagementRouteNames.TextTemplates = 'TextTemplateManagement::Menu:TextTemplates'
```

## TypeScript Support

The package exports all TypeScript interfaces under the `TextTemplateManagement` namespace:

```tsx
import { TextTemplateManagement } from '@abpjs/text-template-management';

// Template definition
const template: TextTemplateManagement.TemplateDefinitionDto = {
  name: 'PasswordReset',
  displayName: 'Password Reset Email',
  isLayout: false,
  layout: 'EmailLayout',
  defaultCultureName: 'en',
  isInlineLocalized: false,
};

// Template content
const content: TextTemplateManagement.TextTemplateContentDto = {
  name: 'PasswordReset',
  cultureName: 'en',
  content: 'Dear {{name}}, click here to reset your password...',
};

// Query parameters
const queryParams: TextTemplateManagement.GetTemplateDefinitionsInput = {
  filterText: 'email',
  maxResultCount: 10,
  skipCount: 0,
};

// Content input
const contentInput: TextTemplateManagement.TemplateContentInput = {
  templateName: 'PasswordReset',
  cultureName: 'en',
};
```

**Key Types:**

| Type | Description |
|------|-------------|
| `TemplateDefinitionDto` | Template definition with name, displayName, isLayout, layout, defaultCultureName, isInlineLocalized |
| `TextTemplateContentDto` | Template content with name, cultureName, content |
| `TemplateContentInput` | Input for getting content (templateName, cultureName?) |
| `CreateOrUpdateTemplateContentDto` | Input for updating content (templateName, cultureName, content) |
| `GetTemplateDefinitionsInput` | Query params (filterText, skipCount, maxResultCount, sorting) |
| `State` | State interface for state management |

## Dependencies

- `@abpjs/core` - Core ABP React functionality

## See Also

- [Core Module](../core/overview)
- [Language Management](../language-management/overview)
