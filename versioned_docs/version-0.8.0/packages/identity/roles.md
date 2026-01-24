---
sidebar_position: 3
---

# Roles

The `@abpjs/identity` package provides components and hooks for role management.

## RolesComponent

The `RolesComponent` provides a complete role management interface:

```tsx
import { RolesComponent } from '@abpjs/identity';

function RoleManagementPage() {
  return <RolesComponent />;
}
```

This component includes:
- Role list
- Create role modal
- Edit role modal
- Delete confirmation
- Permission management button

## useRoles Hook

For custom implementations, use the `useRoles` hook:

```tsx
import { useRoles } from '@abpjs/identity';

function CustomRoleList() {
  const {
    roles,
    loading,
    createRole,
    updateRole,
    deleteRole,
    refresh,
  } = useRoles();

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {roles.map((role) => (
            <li key={role.id}>
              {role.name}
              {role.isDefault && ' (Default)'}
              {role.isStatic && ' (Static)'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## API Reference

### useRoles Returns

| Property | Type | Description |
|----------|------|-------------|
| `roles` | `RoleItem[]` | List of roles |
| `loading` | `boolean` | Loading state |
| `createRole` | `(input: RoleSaveRequest) => Promise<void>` | Create a role |
| `updateRole` | `(id: string, input: RoleSaveRequest) => Promise<void>` | Update a role |
| `deleteRole` | `(id: string) => Promise<void>` | Delete a role |
| `refresh` | `() => void` | Refresh the role list |

### RoleItem Type

```tsx
interface RoleItem {
  id: string;
  name: string;
  isDefault: boolean;
  isStatic: boolean;
  isPublic: boolean;
}
```

### RoleSaveRequest Type

```tsx
interface RoleSaveRequest {
  name: string;
  isDefault: boolean;
  isPublic: boolean;
}
```

## Creating a Role

```tsx
import { useRoles } from '@abpjs/identity';
import { useToaster } from '@abpjs/theme-shared';

function CreateRoleForm() {
  const { createRole } = useRoles();
  const toaster = useToaster();

  const handleCreate = async () => {
    try {
      await createRole({
        name: 'NewRole',
        isDefault: false,
        isPublic: true,
      });
      toaster.success('Role created successfully!');
    } catch (error) {
      toaster.error('Failed to create role');
    }
  };

  // ...
}
```

## Managing Role Permissions

Use the PermissionManagementModal to manage role permissions:

```tsx
import { useState } from 'react';
import { useRoles } from '@abpjs/identity';
import { PermissionManagementModal } from '@abpjs/permission-management';

function RoleWithPermissions() {
  const { roles } = useRoles();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div>
      {roles.map((role) => (
        <div key={role.id}>
          <span>{role.name}</span>
          <button onClick={() => setSelectedRole(role.name)}>
            Manage Permissions
          </button>
        </div>
      ))}

      {selectedRole && (
        <PermissionManagementModal
          isOpen={!!selectedRole}
          onClose={() => setSelectedRole(null)}
          providerName="R"
          providerKey={selectedRole}
        />
      )}
    </div>
  );
}
```

## Using IdentityService Directly

For low-level API access:

```tsx
import { IdentityService } from '@abpjs/identity';

// Get all roles
const roles = await IdentityService.getRoles();

// Get a single role
const role = await IdentityService.getRole('role-id');

// Create a role
await IdentityService.createRole({
  name: 'Manager',
  isDefault: false,
  isPublic: true,
});

// Delete a role
await IdentityService.deleteRole('role-id');
```

## Static Roles

Static roles (like `admin`) cannot be deleted through the UI. They are managed by the ABP Framework and have special protections.

## Related

- [Users](/docs/packages/identity/users) - User management
- [Permission Management](/docs/packages/permission-management/overview) - Permission UI
- [Permissions](/docs/packages/core/permissions) - Permission checking
