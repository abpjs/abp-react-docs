---
sidebar_position: 1
---

# Overview

The `@abpjs/file-management` package provides file and directory management services for ABP React applications. This is the React equivalent of Angular's `@volo/abp.ng.file-management` module.

[![npm version](https://img.shields.io/npm/v/@abpjs/file-management.svg)](https://www.npmjs.com/package/@abpjs/file-management)

:::info ABP Commercial License Required
This package is free to use but requires the corresponding backend module from [ABP Commercial](https://commercial.abp.io/). You can purchase an ABP Commercial license from [abp.io](https://abp.io/pricing).
:::

## Installation

```bash
npm install @abpjs/file-management
# or
yarn add @abpjs/file-management
```

**Required peer dependencies:**
```bash
npm install @abpjs/core @abpjs/theme-shared
```

## Features

- **File Operations** - Create, read, delete, rename, and move files
- **Directory Operations** - Create, delete, rename, and move directories
- **Directory Content** - List files and subdirectories with filtering and sorting
- **Upload Validation** - Pre-upload checks for file existence and name validation
- **Tree View Support** - Directory info optimized for tree structures
- **Typed Proxy Services** - Strongly-typed REST API services

## Main Exports

### Services

| Service | Description |
|---------|-------------|
| `FileDescriptorService` | File CRUD operations, content retrieval, and upload validation |
| `DirectoryDescriptorService` | Directory CRUD operations and content listing |

### File Types

| Type | Description |
|------|-------------|
| `FileDescriptorDto` | File metadata (name, MIME type, size, dates) |
| `CreateFileInput` | Input for creating a file |
| `MoveFileInput` | Input for moving a file |
| `RenameFileInput` | Input for renaming a file |
| `FileUploadPreInfoDto` | Pre-upload validation result |
| `FileUploadPreInfoRequest` | Pre-upload validation input |
| `FileIconInfo` | File icon information |

### Directory Types

| Type | Description |
|------|-------------|
| `DirectoryDescriptorDto` | Directory metadata |
| `DirectoryDescriptorInfoDto` | Directory info for tree views (includes `hasChildren`) |
| `DirectoryContentDto` | Content item (file or directory) |
| `DirectoryContentRequestInput` | Content request with filter and sorting |
| `CreateDirectoryInput` | Input for creating a directory |
| `MoveDirectoryInput` | Input for moving a directory |
| `RenameDirectoryInput` | Input for renaming a directory |

### Enums

| Enum | Description |
|------|-------------|
| `FileIconType` | Icon type (`FontAwesome` or `Url`) |
| `eFileManagementComponents` | Component replacement keys |
| `eFileManagementPolicyNames` | Permission policy names |
| `eFileManagementRouteNames` | Route name constants |

## Quick Example

```tsx
import {
  FileDescriptorService,
  DirectoryDescriptorService,
} from '@abpjs/file-management';
import { useRestService } from '@abpjs/core';

function FileManager() {
  const restService = useRestService();
  const fileService = new FileDescriptorService(restService);
  const directoryService = new DirectoryDescriptorService(restService);

  // Create a directory
  const createDirectory = async () => {
    const dir = await directoryService.create({
      name: 'Documents',
      parentId: null, // root level
    });
    console.log('Created directory:', dir.id);
  };

  // List directory content
  const listContent = async (directoryId?: string) => {
    const content = await directoryService.getContent({
      id: directoryId,
      filter: '',
      sorting: 'name asc',
    });
    return content.items;
  };

  // Upload a file
  const uploadFile = async (file: File, directoryId?: string) => {
    const bytes = await file.arrayBuffer();
    const content = Array.from(new Uint8Array(bytes));

    const created = await fileService.create({
      directoryId,
      name: file.name,
      mimeType: file.type,
      content,
    });
    return created;
  };

  // Check before upload
  const checkUpload = async (files: File[], directoryId?: string) => {
    const preInfo = await fileService.getPreInfo(
      files.map((f) => ({
        directoryId,
        fileName: f.name,
        size: f.size,
      }))
    );
    return preInfo.filter((p) => p.doesExist || !p.hasValidName);
  };
}
```

## FileDescriptorService

Service for managing files:

```tsx
import { FileDescriptorService } from '@abpjs/file-management';

const fileService = new FileDescriptorService(restService);

// Get a file
const file = await fileService.get('file-id');

// List files in a directory
const files = await fileService.getList('directory-id');

// Get file content
const bytes = await fileService.getContent('file-id');

// Create a file
const newFile = await fileService.create({
  directoryId: 'parent-dir-id',
  name: 'document.pdf',
  mimeType: 'application/pdf',
  content: byteArray,
});

// Rename a file
const renamed = await fileService.rename('file-id', { name: 'new-name.pdf' });

// Move a file
const moved = await fileService.move({
  id: 'file-id',
  newDirectoryId: 'target-dir-id',
});

// Delete a file
await fileService.delete('file-id');

// Pre-upload validation
const preInfo = await fileService.getPreInfo([
  { directoryId: 'dir-id', fileName: 'test.pdf', size: 1024 },
]);
```

## DirectoryDescriptorService

Service for managing directories:

```tsx
import { DirectoryDescriptorService } from '@abpjs/file-management';

const dirService = new DirectoryDescriptorService(restService);

// Get a directory
const dir = await dirService.get('directory-id');

// List subdirectories (for tree view)
const children = await dirService.getList('parent-id');
// Returns: { items: DirectoryDescriptorInfoDto[] }

// Get directory content (files and subdirectories)
const content = await dirService.getContent({
  id: 'directory-id',
  filter: 'search term',
  sorting: 'name asc',
});

// Create a directory
const newDir = await dirService.create({
  name: 'New Folder',
  parentId: 'parent-dir-id',
});

// Rename a directory
const renamed = await dirService.rename('dir-id', { name: 'New Name' });

// Move a directory
const moved = await dirService.move({
  id: 'dir-id',
  newParentId: 'target-parent-id',
});

// Delete a directory
await dirService.delete('directory-id');
```

## Route Configuration

Initialize file management routes in your application:

```tsx
import { initializeFileManagementRoutes } from '@abpjs/file-management';

// Call once during app initialization
initializeFileManagementRoutes();

// Or with custom configuration
import { configureRoutes, FILE_MANAGEMENT_ROUTE_PROVIDERS } from '@abpjs/file-management';
import { getRoutesService } from '@abpjs/core';

const routesService = getRoutesService();
const addRoutes = configureRoutes(routesService);
addRoutes();
```

## Policy Names

Use policy constants for permission checks:

```tsx
import { eFileManagementPolicyNames } from '@abpjs/file-management';
import { usePermission } from '@abpjs/core';

function FileActions() {
  const canCreateFile = usePermission(eFileManagementPolicyNames.FileDescriptorCreate);
  const canDeleteFile = usePermission(eFileManagementPolicyNames.FileDescriptorDelete);
  const canCreateDir = usePermission(eFileManagementPolicyNames.DirectoryDescriptorCreate);
  const canDeleteDir = usePermission(eFileManagementPolicyNames.DirectoryDescriptorDelete);

  return (
    <>
      {canCreateFile && <button>Upload File</button>}
      {canDeleteFile && <button>Delete File</button>}
      {canCreateDir && <button>New Folder</button>}
    </>
  );
}
```

**Available Policies:**

| Policy | Description |
|--------|-------------|
| `DirectoryDescriptor` | Base directory permission |
| `DirectoryDescriptorCreate` | Create directories |
| `DirectoryDescriptorUpdate` | Update directories |
| `DirectoryDescriptorDelete` | Delete directories |
| `FileDescriptor` | Base file permission |
| `FileDescriptorCreate` | Create/upload files |
| `FileDescriptorUpdate` | Update files |
| `FileDescriptorDelete` | Delete files |

## Component Keys

Use component keys for component replacement:

```tsx
import { eFileManagementComponents } from '@abpjs/file-management';

// Available keys:
eFileManagementComponents.FolderContent // 'FileManagement.FolderContentComponent'
```

## File Icon Types

```tsx
import { FileIconType, fileIconTypeOptions } from '@abpjs/file-management';

// Enum values
FileIconType.FontAwesome // 0 - FontAwesome icon class
FileIconType.Url         // 1 - URL to image

// For select components
<select>
  {fileIconTypeOptions.map(opt => (
    <option key={opt.value} value={opt.value}>{opt.label}</option>
  ))}
</select>
```

## TypeScript Support

```tsx
import type {
  // File types
  FileDescriptorDto,
  CreateFileInput,
  MoveFileInput,
  RenameFileInput,
  FileUploadPreInfoDto,
  FileUploadPreInfoRequest,
  FileIconInfo,
  // Directory types
  DirectoryDescriptorDto,
  DirectoryDescriptorInfoDto,
  DirectoryContentDto,
  DirectoryContentRequestInput,
  CreateDirectoryInput,
  MoveDirectoryInput,
  RenameDirectoryInput,
  // Enums
  FileIconType,
  eFileManagementComponents,
  eFileManagementPolicyNames,
  eFileManagementRouteNames,
} from '@abpjs/file-management';
```

## Dependencies

- `@abpjs/core` - Core ABP React functionality
- `@abpjs/theme-shared` - Shared UI components

## See Also

- [Core Module](../core/overview)
- [Theme Shared](../theme-shared/overview)
