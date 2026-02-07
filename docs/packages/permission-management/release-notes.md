---
sidebar_position: 99
---

# Release Notes

## v3.2.0

**February 2026**

### New Features

#### PermissionsService (Proxy Service)

A new typed proxy service for permission management API calls:

```tsx
import { PermissionsService } from '@abpjs/permission-management';
import { useRestService } from '@abpjs/core';

function usePermissions() {
  const restService = useRestService();
  const permissionsService = new PermissionsService(restService);

  // Get permissions for a role
  const rolePermissions = await permissionsService.get('R', roleId);

  // Get permissions for a user
  const userPermissions = await permissionsService.get('U', userId);

  // Update permissions
  await permissionsService.update('R', roleId, {
    permissions: [
      { name: 'MyApp.Users.Create', isGranted: true },
      { name: 'MyApp.Users.Delete', isGranted: false },
    ],
  });
}
```

#### New Proxy Models

Typed DTOs that match the ABP backend API structure:

```tsx
import type {
  GetPermissionListResultDto,
  PermissionGroupDto,
  PermissionGrantInfoDto,
  ProviderInfoDto,
  UpdatePermissionDto,
  UpdatePermissionsDto,
} from '@abpjs/permission-management';

// Get permission list result
const result: GetPermissionListResultDto = await permissionsService.get('R', roleId);

console.log(result.entityDisplayName); // e.g., "Admin Role"

result.groups.forEach((group: PermissionGroupDto) => {
  console.log(group.displayName);
  group.permissions.forEach((permission: PermissionGrantInfoDto) => {
    console.log(permission.name, permission.isGranted);
    // Check which providers granted this permission
    permission.grantedProviders.forEach((provider: ProviderInfoDto) => {
      console.log(`Granted by: ${provider.providerName}`);
    });
  });
});
```

#### PermissionWithStyle Type

New type for permissions with CSS style property (replaces `PermissionWithMargin`):

```tsx
import type { PermissionWithStyle } from '@abpjs/permission-management';

function PermissionItem({ permission }: { permission: PermissionWithStyle }) {
  return (
    <div style={{ marginLeft: permission.style }}>
      {permission.displayName}
    </div>
  );
}
```

### Deprecations

The following legacy types are deprecated and will be removed in v4.0:

| Deprecated | Replacement |
|------------|-------------|
| `PermissionManagement.Response` | `GetPermissionListResultDto` |
| `PermissionManagement.Group` | `PermissionGroupDto` |
| `PermissionManagement.Permission` | `PermissionGrantInfoDto` |
| `PermissionManagement.MinimumPermission` | `UpdatePermissionDto` |
| `PermissionManagement.UpdateRequest` | `UpdatePermissionsDto` |
| `PermissionWithMargin` | `PermissionWithStyle` |

### New Exports

**Services:**
- `PermissionsService` - Proxy service for permission management API

**Types:**
- `GetPermissionListResultDto` - Result of getting permissions
- `PermissionGroupDto` - Permission group data transfer object
- `PermissionGrantInfoDto` - Permission grant information
- `ProviderInfoDto` - Provider information
- `UpdatePermissionDto` - DTO for updating a single permission
- `UpdatePermissionsDto` - DTO for updating multiple permissions
- `PermissionWithStyle` - Permission with CSS style property

---

## v3.1.0

**February 2026**

### New Features

#### `shouldFetchAppConfig()` Method

New method on `usePermissionManagement` hook to determine whether the app configuration should be refreshed after saving permissions:

```tsx
import { usePermissionManagement } from '@abpjs/permission-management';

function PermissionEditor({ providerKey, providerName }) {
  const { shouldFetchAppConfig, save } = usePermissionManagement();

  const handleSave = async () => {
    await save();

    // Refresh app config if permissions affect the current user
    if (shouldFetchAppConfig(providerKey, providerName)) {
      // Trigger app config refresh to update current user's permissions
      await refreshAppConfig();
    }
  };

  return <button onClick={handleSave}>Save Permissions</button>;
}
```

Returns `true` if:
- The provider is a role (`'R'`) that the current user belongs to
- The provider is the current user (`'U'`)

This is useful for refreshing the application configuration when permission changes affect the currently logged-in user.

---

## v3.0.0

**February 2026**

### New Features

#### `getAssignedCount()` Method

New method on `usePermissionManagement` hook to get the count of granted permissions for a specific group:

```tsx
import { usePermissionManagement } from '@abpjs/permission-management';

function PermissionGroupList() {
  const { groups, getAssignedCount } = usePermissionManagement();

  return (
    <ul>
      {groups.map((group) => (
        <li key={group.name}>
          {group.displayName} ({getAssignedCount(group.name)}/{group.permissions.length})
        </li>
      ))}
    </ul>
  );
}
```

This is useful for displaying permission counts in the UI, such as "Identity (3/5)" to show 3 out of 5 permissions are granted.

---

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
