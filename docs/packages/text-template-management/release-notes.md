---
sidebar_position: 99
---

# Release Notes

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
  - `Administration` = `'AbpUiNavigation::Menu:Administration'`
  - `TextTemplates` = `'TextTemplateManagement::Menu:TextTemplates'`

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
