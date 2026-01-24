---
sidebar_position: 2
---

# Permission Modal

The `PermissionManagementModal` provides a UI for managing permissions for roles, users, or clients.

## Basic Usage

```tsx
import { PermissionManagementModal } from '@abpjs/permission-management';
import { useState } from 'react';

function PermissionManager() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Manage Permissions
      </button>

      <PermissionManagementModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        providerName="R"
        providerKey="admin"
        onSave={() => console.log('Permissions saved')}
      />
    </>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Whether the modal is open |
| `onClose` | `() => void` | Yes | Called when modal closes |
| `providerName` | `'R' \| 'U' \| 'C'` | Yes | Permission provider type |
| `providerKey` | `string` | Yes | Provider identifier (role name, user ID, etc.) |
| `onSave` | `() => void` | No | Called after permissions are saved |

## Provider Types

### Role Permissions (R)

Manage permissions for a role:

```tsx
<PermissionManagementModal
  isOpen={isOpen}
  onClose={onClose}
  providerName="R"
  providerKey="admin"  // Role name
/>
```

### User Permissions (U)

Manage permissions for a specific user:

```tsx
<PermissionManagementModal
  isOpen={isOpen}
  onClose={onClose}
  providerName="U"
  providerKey="3fa85f64-5717-4562-b3fc-2c963f66afa6"  // User ID
/>
```

### Client Permissions (C)

Manage permissions for an OAuth client:

```tsx
<PermissionManagementModal
  isOpen={isOpen}
  onClose={onClose}
  providerName="C"
  providerKey="MyApp_Web"  // Client ID
/>
```

## Integration with Identity

Use with the identity package to manage user/role permissions:

```tsx
import { useRoles } from '@abpjs/identity';
import { PermissionManagementModal } from '@abpjs/permission-management';
import { useState } from 'react';

function RolesWithPermissions() {
  const { roles } = useRoles();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div>
      <h2>Roles</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>
                <button onClick={() => setSelectedRole(role.name)}>
                  Permissions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PermissionManagementModal
        isOpen={!!selectedRole}
        onClose={() => setSelectedRole(null)}
        providerName="R"
        providerKey={selectedRole || ''}
      />
    </div>
  );
}
```

## usePermissionManagement Hook

For custom permission management UI:

```tsx
import { usePermissionManagement } from '@abpjs/permission-management';

function CustomPermissionUI() {
  const {
    permissions,
    loading,
    togglePermission,
    grantAll,
    revokeAll,
    save,
  } = usePermissionManagement('R', 'admin');

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={grantAll}>Grant All</button>
      <button onClick={revokeAll}>Revoke All</button>

      {permissions.map((group) => (
        <div key={group.name}>
          <h3>{group.displayName}</h3>
          {group.permissions.map((permission) => (
            <label key={permission.name}>
              <input
                type="checkbox"
                checked={permission.isGranted}
                onChange={() => togglePermission(permission.name)}
              />
              {permission.displayName}
            </label>
          ))}
        </div>
      ))}

      <button onClick={save}>Save</button>
    </div>
  );
}
```

## Related

- [Permissions](/docs/packages/core/permissions) - Permission checking
- [Identity](/docs/packages/identity/overview) - User and role management
