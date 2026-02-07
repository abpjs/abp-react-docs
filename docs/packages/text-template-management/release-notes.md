---
sidebar_position: 99
---

# Release Notes

## v3.2.0

**February 2026**

### New Features

#### Typed Proxy Services

New strongly-typed REST API proxy services with direct methods instead of namespace-based types.

**TemplateDefinitionService (Proxy)**

```tsx
import { TemplateDefinitionService } from '@abpjs/text-template-management';
import { useRestService } from '@abpjs/core';

const restService = useRestService();
const templateDefService = new TemplateDefinitionService(restService);

// Get a template definition by name
const template = await templateDefService.get('PasswordResetEmail');

// List template definitions with filtering
const templates = await templateDefService.getList({
  filterText: 'email',
  sorting: 'name asc',
  skipCount: 0,
  maxResultCount: 10,
});
```

**TemplateContentService (Proxy)**

```tsx
import { TemplateContentService } from '@abpjs/text-template-management';

const contentService = new TemplateContentService(restService);

// Get template content for a specific culture
const content = await contentService.get({
  templateName: 'PasswordResetEmail',
  cultureName: 'en',
});

// Update template content
const updated = await contentService.update({
  templateName: 'PasswordResetEmail',
  cultureName: 'en',
  content: '<h1>Reset your password</h1><p>Click the link below...</p>',
});

// Restore template to default content
await contentService.restoreToDefault({
  templateName: 'PasswordResetEmail',
  cultureName: 'en',
});
```

#### Proxy Models

New standalone DTO types replacing namespace-based types:

```tsx
import type {
  // Template definition types
  TemplateDefinitionDto,
  GetTemplateDefinitionListInput,
  // Template content types
  TextTemplateContentDto,
  GetTemplateContentInput,
  UpdateTemplateContentInput,
  RestoreTemplateContentInput,
} from '@abpjs/text-template-management';
```

**TemplateDefinitionDto:**

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Unique template name |
| `displayName` | `string` | Display name |
| `isLayout` | `boolean` | Whether template is a layout |
| `layout` | `string \| null` | Parent layout name |
| `isInlineLocalized` | `boolean` | Whether content is inline localized |
| `defaultCultureName` | `string` | Default culture for template |

**TextTemplateContentDto:**

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Template name |
| `cultureName` | `string` | Culture name |
| `content` | `string` | Template content |

### New Exports

**Proxy Services:**
- `TemplateDefinitionService` - Typed proxy for template definitions (get, getList)
- `TemplateContentService` - Typed proxy for template content (get, update, restoreToDefault)

**Proxy Models:**
- `TemplateDefinitionDto` - Template definition DTO
- `GetTemplateDefinitionListInput` - List query input (also available in v3.1.0)
- `TextTemplateContentDto` - Template content DTO
- `GetTemplateContentInput` - Content query input
- `UpdateTemplateContentInput` - Content update input
- `RestoreTemplateContentInput` - Restore to default input

### Deprecations

The following namespace-based types are deprecated and will be removed in v4.0:

| Deprecated | Replacement |
|------------|-------------|
| `TextTemplateManagement.TemplateDefinitionDto` | `TemplateDefinitionDto` |
| `TextTemplateManagement.TextTemplateContentDto` | `TextTemplateContentDto` |
| `TextTemplateManagement.TemplateContentInput` | `GetTemplateContentInput` |
| `TextTemplateManagement.CreateOrUpdateTemplateContentDto` | `UpdateTemplateContentInput` |
| `TextTemplateManagement.GetTemplateDefinitionsInput` | `GetTemplateDefinitionListInput` |

---

## v3.1.0

**February 2026**

### New Features

#### `GetTemplateDefinitionListInput` Interface

New typed interface for template definition list queries:

```tsx
import {
  GetTemplateDefinitionListInput,
  createGetTemplateDefinitionListInput,
} from '@abpjs/text-template-management';

// Using the interface directly
const params: GetTemplateDefinitionListInput = {
  filterText: 'email',
  skipCount: 0,
  maxResultCount: 10,
  sorting: 'name asc',
};

// Using the factory function with defaults
const params = createGetTemplateDefinitionListInput({
  filterText: 'email',
});
// Result: { filterText: 'email', skipCount: 0, maxResultCount: 10, sorting: undefined }
```

**Properties:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `filterText` | `string` | - | Filter text for searching templates |
| `skipCount` | `number` | `0` | Number of items to skip (pagination) |
| `maxResultCount` | `number` | `10` | Maximum items to return |
| `sorting` | `string` | - | Sort expression (e.g., `'name asc'`) |

### New Exports

- `GetTemplateDefinitionListInput` - Interface for template list queries
- `createGetTemplateDefinitionListInput(initialValues?)` - Factory function with defaults

---

## v3.0.0

**February 2026**

### Breaking Changes

#### Route Names Changes

- **`eTextTemplateManagementRouteNames.Administration` removed** - Use `eThemeSharedRouteNames.Administration` from `@abpjs/theme-shared` instead.

```tsx
// Before (v2.9.0)
import { eTextTemplateManagementRouteNames } from '@abpjs/text-template-management';
const admin = eTextTemplateManagementRouteNames.Administration; // ❌ Removed

// After (v3.0.0)
import { eThemeSharedRouteNames } from '@abpjs/theme-shared';
const admin = eThemeSharedRouteNames.Administration; // ✅ Use this instead
```

### New Features

#### Route Providers

New route configuration system using `RoutesService` from `@abpjs/core`:

```tsx
import {
  configureRoutes,
  initializeTextTemplateManagementRoutes,
  TEXT_TEMPLATE_MANAGEMENT_ROUTE_CONFIG,
} from '@abpjs/text-template-management';
import { getRoutesService } from '@abpjs/core';

// Option 1: Use configureRoutes with RoutesService
const routes = getRoutesService();
const addRoutes = configureRoutes(routes);
addRoutes();

// Option 2: Use initializeTextTemplateManagementRoutes helper
initializeTextTemplateManagementRoutes(routes);

// Option 3: Access the route configuration directly
console.log(TEXT_TEMPLATE_MANAGEMENT_ROUTE_CONFIG);
// { path: '/text-template-management', name: '...', iconClass: 'fas fa-file-alt', ... }
```

Also available as a provider object:

```tsx
import { TEXT_TEMPLATE_MANAGEMENT_ROUTE_PROVIDERS } from '@abpjs/text-template-management';

const configure = TEXT_TEMPLATE_MANAGEMENT_ROUTE_PROVIDERS.useFactory(routes);
configure();
```

#### Policy Names

New constants for permission checking:

```tsx
import { eTextTemplateManagementPolicyNames } from '@abpjs/text-template-management';

// Available policies:
// eTextTemplateManagementPolicyNames.TextTemplates = 'TextTemplateManagement.TextTemplates'
```

#### Config Options

New `TextTemplateManagementConfigOptions` interface for module extensibility:

```tsx
import {
  TextTemplateManagementConfigOptions,
  eTextTemplateManagementComponents,
} from '@abpjs/text-template-management';

const options: TextTemplateManagementConfigOptions = {
  entityActionContributors: {
    [eTextTemplateManagementComponents.TextTemplates]: [
      (actions) => [...actions, { text: 'Custom Action', icon: 'fa fa-star' }]
    ]
  },
  entityPropContributors: {
    [eTextTemplateManagementComponents.TextTemplates]: [
      (props) => [...props, { name: 'customField', displayName: 'Custom' }]
    ]
  }
};
```

#### Extensions System

New extension tokens and defaults for customizing text template management components:

**Entity Actions** - Row-level actions in grids:

```tsx
import {
  EntityAction,
  DEFAULT_TEXT_TEMPLATES_ENTITY_ACTIONS,
  DEFAULT_TEXT_TEMPLATE_MANAGEMENT_ENTITY_ACTIONS,
  TEXT_TEMPLATE_MANAGEMENT_ENTITY_ACTION_CONTRIBUTORS,
} from '@abpjs/text-template-management';
```

**Toolbar Actions** - Grid toolbar buttons:

```tsx
import {
  ToolbarAction,
  DEFAULT_TEXT_TEMPLATES_TOOLBAR_ACTIONS,
  DEFAULT_TEXT_TEMPLATE_MANAGEMENT_TOOLBAR_ACTIONS,
  TEXT_TEMPLATE_MANAGEMENT_TOOLBAR_ACTION_CONTRIBUTORS,
} from '@abpjs/text-template-management';
```

**Entity Props** - Grid column definitions:

```tsx
import {
  EntityProp,
  DEFAULT_TEXT_TEMPLATES_ENTITY_PROPS,
  DEFAULT_TEXT_TEMPLATE_MANAGEMENT_ENTITY_PROPS,
  TEXT_TEMPLATE_MANAGEMENT_ENTITY_PROP_CONTRIBUTORS,
} from '@abpjs/text-template-management';
```

#### Extensions Guard

New guard for loading extensions before route activation:

```tsx
import {
  textTemplateManagementExtensionsGuard,
  useTextTemplateManagementExtensionsGuard,
  TextTemplateManagementExtensionsGuard,
} from '@abpjs/text-template-management';

// Function-based guard
const canActivate = await textTemplateManagementExtensionsGuard();

// React hook
function ProtectedRoute({ children }) {
  const { isLoaded, loading } = useTextTemplateManagementExtensionsGuard();

  if (loading) return <Loading />;
  if (!isLoaded) return <Navigate to="/unauthorized" />;

  return children;
}
```

### New Exports

**Config Subpackage:**
- `eTextTemplateManagementPolicyNames` - Policy name constants
- `TextTemplateManagementPolicyNameKey` - Type for policy name values
- `TEXT_TEMPLATE_MANAGEMENT_ROUTE_CONFIG` - Default route configuration object
- `configureRoutes()` - Configure routes with custom RoutesService
- `initializeTextTemplateManagementRoutes()` - Initialize routes immediately
- `TEXT_TEMPLATE_MANAGEMENT_ROUTE_PROVIDERS` - Route providers object

**Models:**
- `TextTemplateManagementConfigOptions` - Configuration options interface
- `TextTemplateManagementEntityActionContributors` - Entity action contributor type
- `TextTemplateManagementToolbarActionContributors` - Toolbar action contributor type (typo fixed from v2.x)
- `TextTemplateManagementEntityPropContributors` - Entity prop contributor type

**Tokens Subpackage:**
- `EntityAction<T>`, `ToolbarAction<T>`, `EntityProp<T>` - Extension interfaces
- `DEFAULT_TEXT_TEMPLATES_ENTITY_ACTIONS`, `DEFAULT_TEXT_TEMPLATE_MANAGEMENT_ENTITY_ACTIONS`
- `DEFAULT_TEXT_TEMPLATES_TOOLBAR_ACTIONS`, `DEFAULT_TEXT_TEMPLATE_MANAGEMENT_TOOLBAR_ACTIONS`
- `DEFAULT_TEXT_TEMPLATES_ENTITY_PROPS`, `DEFAULT_TEXT_TEMPLATE_MANAGEMENT_ENTITY_PROPS`
- Contributor callback types: `EntityActionContributorCallback<T>`, `ToolbarActionContributorCallback<T>`, `EntityPropContributorCallback<T>`
- Token symbols: `TEXT_TEMPLATE_MANAGEMENT_ENTITY_ACTION_CONTRIBUTORS`, `TEXT_TEMPLATE_MANAGEMENT_TOOLBAR_ACTION_CONTRIBUTORS`, `TEXT_TEMPLATE_MANAGEMENT_ENTITY_PROP_CONTRIBUTORS`

**Guards Subpackage:**
- `textTemplateManagementExtensionsGuard()` - Async guard function
- `useTextTemplateManagementExtensionsGuard()` - React hook
- `TextTemplateManagementExtensionsGuard` - Class-based guard

---

## v2.9.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.7.0 (Initial Release)

**February 2026**

### Features

- **TextTemplatesComponent** - Complete text template management UI with:
  - Paginated template definition list with search
  - Template details display (layout, default culture, inline localized status)
  - Navigation to template content editing

- **TemplateContentsComponent** - Template content editing interface with:
  - Culture selection for multi-language templates
  - Template content editor
  - Save and restore to default functionality
  - Layout template indicator

### Hooks

- **useTextTemplates** - State management for text templates with:
  - `templateDefinitions` - List of template definitions
  - `templateContent` - Current template content
  - `fetchTemplateDefinitions()` - Fetch template definitions with pagination
  - `getTemplateContent()` - Get template content by name and culture
  - `updateTemplateContent()` - Update template content
  - `restoreToDefault()` - Restore template to default value

### Services

- **TemplateDefinitionService** - REST API service for template definitions:
  - `getList(params?)` - Get paginated template definitions
  - `apiName` property for multi-API configurations (defaults to `'default'`)

- **TemplateContentService** - REST API service for template content:
  - `getByInput(params)` - Get template content
  - `updateByInput(body)` - Update template content
  - `restoreToDefaultByInput(body)` - Restore template to default
  - `apiName` property for multi-API configurations (defaults to `'default'`)

- **TextTemplateManagementStateService** - Stateful facade for text template operations:
  - `dispatchGetTemplateDefinitions(params?)` - Fetch and cache template definitions
  - `dispatchGetTemplateContent(params)` - Fetch and cache template content
  - `dispatchUpdateTemplateContent(body)` - Update template content
  - `dispatchRestoreToDefault(body)` - Restore template to default
  - `getTemplateDefinitions()` / `getTotalCount()` - Access cached data
  - `getSelectedTemplate()` / `getTemplateContent()` - Access cached state

### Constants

- **TEXT_TEMPLATE_MANAGEMENT_ROUTES** - Pre-configured route definitions with policies

### Enums

- **eTextTemplateManagementComponents** - Component keys for component replacement:
  - `TextTemplates` = `'TextTemplateManagement.TextTemplates'`
  - `TemplateContents` = `'TextTemplateManagement.TemplateContents'`
  - `InlineTemplateContent` = `'TextTemplateManagement.InlineTemplateContent'`

- **eTextTemplateManagementRouteNames** - Route name localization keys:
  - `TextTemplates` = `'TextTemplateManagement::Menu:TextTemplates'`

> **Note:** `Administration` was removed in v3.0.0. Use `eThemeSharedRouteNames.Administration` from `@abpjs/theme-shared` instead.

### TypeScript

- **TextTemplateManagement namespace** with all types:
  - `TemplateDefinitionDto` - Template definition entity
  - `TextTemplateContentDto` - Template content entity
  - `TemplateContentInput` - Input for getting content
  - `CreateOrUpdateTemplateContentDto` - Input for updating content
  - `GetTemplateDefinitionsInput` - Query parameters
  - `State` - State interface for state management

### New Exports

- `TextTemplatesComponent` - Main template list component
- `TemplateContentsComponent` - Template content editor component
- `useTextTemplates` - Hook for text template management
- `TemplateDefinitionService` - Template definition API service
- `TemplateContentService` - Template content API service
- `TextTemplateManagementStateService` - Stateful service for templates
- `TEXT_TEMPLATE_MANAGEMENT_ROUTES` - Route configuration
- `eTextTemplateManagementComponents` - Component replacement keys
- `eTextTemplateManagementRouteNames` - Route name constants
- `TextTemplateManagementComponentKey` - Type for component key values
- `TextTemplateManagementRouteNameKey` - Type for route name values
- `TextTemplateManagement` - Namespace with all TypeScript types
