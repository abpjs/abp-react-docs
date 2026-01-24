---
sidebar_position: 5
---

# Permissions

ABP React provides fine-grained permission checking for access control.

## usePermission Hook

The `usePermission` hook provides permission checking utilities:

```tsx
import { usePermission } from '@abpjs/core';

function PermissionExample() {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission();

  return (
    <div>
      {hasPermission('AbpIdentity.Users') && (
        <a href="/users">Manage Users</a>
      )}

      {hasPermission('AbpIdentity.Roles') && (
        <a href="/roles">Manage Roles</a>
      )}

      {hasPermission('AbpIdentity.Users.Create') && (
        <button>Create User</button>
      )}
    </div>
  );
}
```

## API Reference

### usePermission Returns

| Method | Type | Description |
|--------|------|-------------|
| `hasPermission` | `(permission: string) => boolean` | Check if user has a specific permission |
| `hasAnyPermission` | `(permissions: string[]) => boolean` | Check if user has any of the permissions |
| `hasAllPermissions` | `(permissions: string[]) => boolean` | Check if user has all permissions |

## Common ABP Permissions

### Identity Permissions

| Permission | Description |
|------------|-------------|
| `AbpIdentity.Users` | View users |
| `AbpIdentity.Users.Create` | Create users |
| `AbpIdentity.Users.Update` | Update users |
| `AbpIdentity.Users.Delete` | Delete users |
| `AbpIdentity.Users.ManagePermissions` | Manage user permissions |
| `AbpIdentity.Roles` | View roles |
| `AbpIdentity.Roles.Create` | Create roles |
| `AbpIdentity.Roles.Update` | Update roles |
| `AbpIdentity.Roles.Delete` | Delete roles |
| `AbpIdentity.Roles.ManagePermissions` | Manage role permissions |

### Tenant Management Permissions

| Permission | Description |
|------------|-------------|
| `AbpTenantManagement.Tenants` | View tenants |
| `AbpTenantManagement.Tenants.Create` | Create tenants |
| `AbpTenantManagement.Tenants.Update` | Update tenants |
| `AbpTenantManagement.Tenants.Delete` | Delete tenants |
| `AbpTenantManagement.Tenants.ManageFeatures` | Manage tenant features |

## Checking Multiple Permissions

```tsx
import { usePermission } from '@abpjs/core';

function AdminPanel() {
  const { hasAnyPermission, hasAllPermissions } = usePermission();

  // Show if user can manage either users OR roles
  const canManageIdentity = hasAnyPermission([
    'AbpIdentity.Users',
    'AbpIdentity.Roles',
  ]);

  // Show only if user can manage BOTH users AND roles
  const isFullAdmin = hasAllPermissions([
    'AbpIdentity.Users',
    'AbpIdentity.Roles',
    'AbpIdentity.Users.ManagePermissions',
  ]);

  return (
    <div>
      {canManageIdentity && <a href="/identity">Identity Management</a>}
      {isFullAdmin && <a href="/admin">Full Admin Panel</a>}
    </div>
  );
}
```

## Permission-Based Rendering

Create a reusable component for permission-based rendering:

```tsx
import { usePermission } from '@abpjs/core';

interface PermissionGuardProps {
  permission: string | string[];
  requireAll?: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function PermissionGuard({
  permission,
  requireAll = false,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission();

  let hasAccess = false;

  if (typeof permission === 'string') {
    hasAccess = hasPermission(permission);
  } else if (requireAll) {
    hasAccess = hasAllPermissions(permission);
  } else {
    hasAccess = hasAnyPermission(permission);
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

// Usage
<PermissionGuard permission="AbpIdentity.Users.Create">
  <button>Create User</button>
</PermissionGuard>
```

## Related

- [Permission Management](/docs/packages/permission-management/overview) - Manage permissions UI
- [Identity](/docs/packages/identity/overview) - User and role management
