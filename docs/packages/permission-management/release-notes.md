---
sidebar_position: 99
---

# Release Notes

## v2.9.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.7.0

**February 2026**

### New Features

#### Component Replacement Keys

New constants for replacing permission management components:

```tsx
import { ePermissionManagementComponents } from '@abpjs/permission-management';

// Available component keys:
// ePermissionManagementComponents.PermissionManagement = 'PermissionManagement.PermissionManagementComponent'
```

### New Exports

- `ePermissionManagementComponents` - Constants for component replacement keys
- `PermissionManagementComponentKey` - Type for permission management component key values

---

## v2.4.0

**February 2026**

- **`PermissionManagementService.apiName` property** - New property for REST API configuration. Defaults to `'default'`.

---

## v2.2.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.1.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.0.0

**January 2026**

### New Features

- **`PermissionManagementStateService` dispatch methods** - Added programmatic dispatch methods:
  - `dispatchGetPermissions(params)` - Fetch permissions from API and update internal state
  - `dispatchUpdatePermissions(request)` - Update permissions via API

- **Component Interface Types** - Added TypeScript interfaces for component inputs/outputs:
  - `PermissionManagement.PermissionManagementComponentInputs`
  - `PermissionManagement.PermissionManagementComponentOutputs`

### Example

```tsx
import {
  PermissionManagementStateService,
  PermissionManagementService,
} from '@abpjs/permission-management';
import { RestService } from '@abpjs/core';

const rest = new RestService();
const service = new PermissionManagementService(rest);
const stateService = new PermissionManagementStateService(service);

// Fetch permissions
await stateService.dispatchGetPermissions({
  providerKey: 'role-id',
  providerName: 'R',
});
const groups = stateService.getPermissionGroups();

// Update permissions
await stateService.dispatchUpdatePermissions({
  providerKey: 'role-id',
  providerName: 'R',
  permissions: [{ name: 'MyPermission', isGranted: true }],
});
```

---

## v1.1.0

**January 2026**

### New Features

- **`hideBadges` prop** - `PermissionManagementModal` now supports hiding provider badges:
  ```tsx
  <PermissionManagementModal hideBadges />
  ```
- **Provider badges** - Permissions now display badges showing which other provider granted them (e.g., "R" for role)
- **`PermissionManagementStateService`** - New service for accessing permission management state (for Angular API compatibility)

### API Changes

- **`isGrantedByOtherProviderName`** - New method in `usePermissionManagement` hook replacing `isGrantedByRole`

### Deprecations

- **`isGrantedByRole`** - Deprecated, use `isGrantedByOtherProviderName` instead

---

## v1.0.0

**January 2026**

- Version alignment with @abpjs/core

---

## v0.9.0

**January 2026**

### New Features

- **`isGrantedByRole` method** - New helper in `usePermissionManagement` hook to check if a permission is granted by a role provider

---

## v0.8.0

**January 2026**

- Version alignment with @abpjs/core

---

## v0.7.6

**January 2026** - Initial Release

- PermissionManagementModal component
- Support for role (R), user (U), and client (C) providers
- Bulk grant/revoke operations
