---
sidebar_position: 99
---

# Release Notes

## v4.0.0

**February 2026**

### New

- **`xsrfHeaderName` config option** - New optional `xsrfHeaderName` property on `FileManagementConfigOptions` to customize the XSRF/CSRF header name used for file uploads (default behavior unchanged if not set)

```tsx
import type { FileManagementConfigOptions } from '@abpjs/file-management';

const options: FileManagementConfigOptions = {
  xsrfHeaderName: 'X-XSRF-TOKEN', // or 'RequestVerificationToken'
};
```

---

## v3.2.0 (Initial Release)

**February 2026**

Initial release of the `@abpjs/file-management` package, providing file and directory management services for ABP React applications. This is the React equivalent of Angular's `@volo/abp.ng.file-management` module.

### Features

#### FileDescriptorService

Service for managing files:

```tsx
import { FileDescriptorService } from '@abpjs/file-management';
import { useRestService } from '@abpjs/core';

const restService = useRestService();
const fileService = new FileDescriptorService(restService);

// Get a file by ID
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
await fileService.rename('file-id', { name: 'new-name.pdf' });

// Move a file
await fileService.move({ id: 'file-id', newDirectoryId: 'target-dir-id' });

// Delete a file
await fileService.delete('file-id');

// Pre-upload validation
const preInfo = await fileService.getPreInfo([
  { directoryId: 'dir-id', fileName: 'test.pdf', size: 1024 },
]);
```

#### DirectoryDescriptorService

Service for managing directories:

```tsx
import { DirectoryDescriptorService } from '@abpjs/file-management';

const dirService = new DirectoryDescriptorService(restService);

// Get a directory
const dir = await dirService.get('directory-id');

// List subdirectories (for tree views)
const children = await dirService.getList('parent-id');

// Get directory content (paginated)
const content = await dirService.getContent({
  id: 'directory-id',
  filter: 'search term',
  sorting: 'name asc',
});

// Create a directory
const newDir = await dirService.create({
  name: 'Documents',
  parentId: null,
});

// Rename a directory
await dirService.rename('dir-id', { name: 'New Name' });

// Move a directory
await dirService.move({ id: 'dir-id', newParentId: 'target-id' });

// Delete a directory
await dirService.delete('dir-id');
```

#### Route Providers

Initialize file management routes:

```tsx
import { initializeFileManagementRoutes } from '@abpjs/file-management';

// Call once during app initialization
initializeFileManagementRoutes();
```

For advanced configuration:

```tsx
import { configureRoutes, FILE_MANAGEMENT_ROUTE_PROVIDERS } from '@abpjs/file-management';
import { getRoutesService } from '@abpjs/core';

const routesService = getRoutesService();
const addRoutes = configureRoutes(routesService);
addRoutes();
```

#### Policy Names

Permission policy constants:

```tsx
import { eFileManagementPolicyNames } from '@abpjs/file-management';

// Directory permissions
eFileManagementPolicyNames.DirectoryDescriptor       // 'FileManagement.DirectoryDescriptor'
eFileManagementPolicyNames.DirectoryDescriptorCreate // 'FileManagement.DirectoryDescriptor.Create'
eFileManagementPolicyNames.DirectoryDescriptorUpdate // 'FileManagement.DirectoryDescriptor.Update'
eFileManagementPolicyNames.DirectoryDescriptorDelete // 'FileManagement.DirectoryDescriptor.Delete'

// File permissions
eFileManagementPolicyNames.FileDescriptor       // 'FileManagement.FileDescriptor'
eFileManagementPolicyNames.FileDescriptorCreate // 'FileManagement.FileDescriptor.Create'
eFileManagementPolicyNames.FileDescriptorUpdate // 'FileManagement.FileDescriptor.Update'
eFileManagementPolicyNames.FileDescriptorDelete // 'FileManagement.FileDescriptor.Delete'
```

#### Route Names

Route name constants:

```tsx
import { eFileManagementRouteNames } from '@abpjs/file-management';

eFileManagementRouteNames.FileManagement // 'FileManagement::Menu:FileManagement'
```

#### Component Keys

Component replacement keys:

```tsx
import { eFileManagementComponents } from '@abpjs/file-management';

eFileManagementComponents.FolderContent // 'FileManagement.FolderContentComponent'
```

#### FileIconType Enum

File icon type enum:

```tsx
import { FileIconType, fileIconTypeOptions } from '@abpjs/file-management';

FileIconType.FontAwesome // 0
FileIconType.Url         // 1

// For select components
fileIconTypeOptions // [{ label: 'FontAwesome', value: 0 }, { label: 'Url', value: 1 }]
```

### New Exports

**Services:**
- `FileDescriptorService` - File CRUD operations
- `DirectoryDescriptorService` - Directory CRUD operations

**File Types:**
- `FileDescriptorDto` - File metadata DTO
- `CreateFileInput` - Input for creating files
- `MoveFileInput` - Input for moving files
- `RenameFileInput` - Input for renaming files
- `FileUploadPreInfoDto` - Pre-upload validation result
- `FileUploadPreInfoRequest` - Pre-upload validation input
- `FileIconInfo` - File icon information

**Directory Types:**
- `DirectoryDescriptorDto` - Directory metadata DTO
- `DirectoryDescriptorInfoDto` - Directory info for tree views
- `DirectoryContentDto` - Directory content item DTO
- `DirectoryContentRequestInput` - Content request input
- `CreateDirectoryInput` - Input for creating directories
- `MoveDirectoryInput` - Input for moving directories
- `RenameDirectoryInput` - Input for renaming directories

**Enums:**
- `FileIconType` - File icon type (FontAwesome, Url)
- `fileIconTypeOptions` - Select options for FileIconType

**Config:**
- `eFileManagementPolicyNames` - Permission policy names
- `eFileManagementRouteNames` - Route name constants
- `eFileManagementComponents` - Component replacement keys
- `initializeFileManagementRoutes()` - Initialize routes
- `configureRoutes(routes)` - Configure routes with custom RoutesService
- `FILE_MANAGEMENT_ROUTE_PROVIDERS` - Route provider configuration

**Models:**
- `FileManagementConfigOptions` - Module configuration options
- `FolderInfo` - Folder information type
- `FileInfo` - File information type

### Installation

```bash
npm install @abpjs/file-management
```

### Dependencies

- `@abpjs/core` >= 3.2.0
- `@abpjs/theme-shared` >= 3.2.0
