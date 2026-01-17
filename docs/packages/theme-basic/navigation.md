---
sidebar_position: 3
---

# Navigation

The `@abpjs/theme-basic` package provides a built-in navigation system with permission-based visibility.

## useNavigationElements Hook

Access and manage navigation items:

```tsx
import { useNavigationElements } from '@abpjs/theme-basic';

function NavigationManager() {
  const { elements, addElement, removeElement, updateElement } = useNavigationElements();

  return (
    <nav>
      {elements.map((item) => (
        <a key={item.id} href={item.path}>
          {item.name}
        </a>
      ))}
    </nav>
  );
}
```

## Navigation Element Structure

```tsx
interface NavigationElement {
  id: string;
  name: string;
  path: string;
  icon?: React.ReactNode;
  order: number;
  requiredPermission?: string;
  visible?: boolean;
  children?: NavigationElement[];
}
```

## Adding Navigation Items

```tsx
import { useNavigationElements } from '@abpjs/theme-basic';
import { useEffect } from 'react';
import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';

function NavigationSetup() {
  const { addElement } = useNavigationElements();

  useEffect(() => {
    // Add navigation items on mount
    addElement({
      id: 'dashboard',
      name: 'Dashboard',
      path: '/dashboard',
      icon: <FiHome />,
      order: 1,
    });

    addElement({
      id: 'users',
      name: 'Users',
      path: '/users',
      icon: <FiUsers />,
      order: 2,
      requiredPermission: 'AbpIdentity.Users',
    });

    addElement({
      id: 'settings',
      name: 'Settings',
      path: '/settings',
      icon: <FiSettings />,
      order: 100,
    });
  }, [addElement]);

  return null;
}
```

## Nested Navigation

Create sub-menus with the `children` property:

```tsx
addElement({
  id: 'administration',
  name: 'Administration',
  path: '/admin',
  icon: <FiSettings />,
  order: 50,
  children: [
    {
      id: 'admin-users',
      name: 'Users',
      path: '/admin/users',
      order: 1,
      requiredPermission: 'AbpIdentity.Users',
    },
    {
      id: 'admin-roles',
      name: 'Roles',
      path: '/admin/roles',
      order: 2,
      requiredPermission: 'AbpIdentity.Roles',
    },
    {
      id: 'admin-tenants',
      name: 'Tenants',
      path: '/admin/tenants',
      order: 3,
      requiredPermission: 'AbpTenantManagement.Tenants',
    },
  ],
});
```

## Permission-Based Visibility

Navigation items with `requiredPermission` are automatically hidden if the user lacks the permission:

```tsx
addElement({
  id: 'admin-panel',
  name: 'Admin Panel',
  path: '/admin',
  requiredPermission: 'Administration.Panel', // Only visible to admins
  order: 99,
});
```

## Updating Navigation Items

```tsx
import { useNavigationElements } from '@abpjs/theme-basic';

function BadgeUpdater() {
  const { updateElement } = useNavigationElements();

  const updateNotificationBadge = (count: number) => {
    updateElement('notifications', {
      name: `Notifications (${count})`,
    });
  };

  // ...
}
```

## Removing Navigation Items

```tsx
import { useNavigationElements } from '@abpjs/theme-basic';

function RemoveMenuItem() {
  const { removeElement } = useNavigationElements();

  const handleRemove = () => {
    removeElement('temporary-item');
  };

  // ...
}
```

## Example: Complete Navigation Setup

```tsx
import { useNavigationElements } from '@abpjs/theme-basic';
import { useEffect } from 'react';
import { FiHome, FiUsers, FiShield, FiDatabase, FiSettings } from 'react-icons/fi';

export function NavigationConfig() {
  const { addElement } = useNavigationElements();

  useEffect(() => {
    // Main navigation
    addElement({
      id: 'home',
      name: 'Home',
      path: '/',
      icon: <FiHome />,
      order: 0,
    });

    // Administration section
    addElement({
      id: 'administration',
      name: 'Administration',
      path: '/administration',
      icon: <FiSettings />,
      order: 100,
      children: [
        {
          id: 'identity',
          name: 'Identity',
          path: '/administration/identity',
          icon: <FiUsers />,
          order: 1,
          children: [
            {
              id: 'users',
              name: 'Users',
              path: '/administration/identity/users',
              order: 1,
              requiredPermission: 'AbpIdentity.Users',
            },
            {
              id: 'roles',
              name: 'Roles',
              path: '/administration/identity/roles',
              order: 2,
              requiredPermission: 'AbpIdentity.Roles',
            },
          ],
        },
        {
          id: 'tenant-management',
          name: 'Tenant Management',
          path: '/administration/tenants',
          icon: <FiDatabase />,
          order: 2,
          requiredPermission: 'AbpTenantManagement.Tenants',
        },
      ],
    });
  }, [addElement]);

  return null;
}
```

## Related

- [Layouts](/docs/packages/theme-basic/layouts) - Layout components
- [Permissions](/docs/packages/core/permissions) - Permission checking
