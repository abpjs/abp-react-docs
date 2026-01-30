---
sidebar_position: 2
---

# Users

The `@abpjs/identity` package provides components and hooks for user management.

## UsersComponent

The `UsersComponent` provides a complete user management interface:

```tsx
import { UsersComponent } from '@abpjs/identity';

function UserManagementPage() {
  return <UsersComponent />;
}
```

This component includes:
- User list with pagination
- Search functionality
- Create user modal
- Edit user modal
- Delete confirmation
- Role assignment
- Permission management button

## useUsers Hook

For custom implementations, use the `useUsers` hook:

```tsx
import { useUsers } from '@abpjs/identity';

function CustomUserList() {
  const {
    users,
    totalCount,
    loading,
    page,
    pageSize,
    setPage,
    setPageSize,
    search,
    setSearch,
    createUser,
    updateUser,
    deleteUser,
    refresh,
  } = useUsers();

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p>Total: {totalCount}</p>
    </div>
  );
}
```

## API Reference

### useUsers Returns

| Property | Type | Description |
|----------|------|-------------|
| `users` | `UserItem[]` | List of users |
| `totalCount` | `number` | Total number of users |
| `loading` | `boolean` | Loading state |
| `page` | `number` | Current page |
| `pageSize` | `number` | Items per page |
| `setPage` | `(page: number) => void` | Set current page |
| `setPageSize` | `(size: number) => void` | Set page size |
| `search` | `string` | Current search filter |
| `setSearch` | `(search: string) => void` | Set search filter |
| `createUser` | `(input: UserSaveRequest) => Promise<void>` | Create a user |
| `updateUser` | `(id: string, input: UserSaveRequest) => Promise<void>` | Update a user |
| `deleteUser` | `(id: string) => Promise<void>` | Delete a user |
| `refresh` | `() => void` | Refresh the user list |

### UserItem Type

```tsx
interface UserItem {
  id: string;
  userName: string;
  email: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  isActive: boolean;
  lockoutEnabled: boolean;
  creationTime: string;
}
```

### UserSaveRequest Type

```tsx
interface UserSaveRequest {
  userName: string;
  email: string;
  password?: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  isActive: boolean;
  lockoutEnabled: boolean;
  roleNames: string[];
}
```

## Creating a User

```tsx
import { useUsers } from '@abpjs/identity';
import { useToaster } from '@abpjs/theme-shared';

function CreateUserForm() {
  const { createUser } = useUsers();
  const toaster = useToaster();

  const handleCreate = async (formData: UserSaveRequest) => {
    try {
      await createUser(formData);
      toaster.success('User created successfully!');
    } catch (error) {
      toaster.error('Failed to create user');
    }
  };

  // ... form implementation
}
```

## Using IdentityService Directly

For low-level API access:

```tsx
import { IdentityService } from '@abpjs/identity';

// Get users with pagination
const result = await IdentityService.getUsers({
  skipCount: 0,
  maxResultCount: 10,
  filter: 'john',
});

// Get a single user
const user = await IdentityService.getUser('user-id');

// Create a user
await IdentityService.createUser({
  userName: 'newuser',
  email: 'new@example.com',
  password: 'Password123!',
  roleNames: ['admin'],
});
```

## Related

- [Roles](/docs/packages/identity/roles) - Role management
- [Permissions](/docs/packages/core/permissions) - Permission checking
- [Permission Management](/docs/packages/permission-management/overview) - Permission UI
