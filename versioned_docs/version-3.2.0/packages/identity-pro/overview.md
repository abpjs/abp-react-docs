# Identity Pro Module

The `@abpjs/identity-pro` package provides advanced identity management components and services for ABP React applications. This is the React equivalent of Angular's `@volo/abp.ng.identity` module.

:::info ABP Commercial License Required
This package is free to use but requires the corresponding backend module from [ABP Commercial](https://commercial.abp.io/). You can purchase an ABP Commercial license from [abp.io](https://abp.io/pricing).
:::

## Installation

```bash
npm install @abpjs/identity-pro
# or
yarn add @abpjs/identity-pro
```

## Features

- **Role Management** - Complete CRUD operations for roles with permissions
- **User Management** - User creation, editing, role assignment, and claims management
- **Claim Type Management** - Define and manage custom claim types (Pro feature)
- **User/Role Claims** - Assign claims to users and roles (Pro feature)
- **Pagination & Sorting** - Built-in support for paginated lists with sorting

## Components

### RolesComponent

Full-featured role management UI with create, edit, delete, and permissions.

```tsx
import { RolesComponent } from '@abpjs/identity-pro';

function RolesPage() {
  return <RolesComponent />;
}
```

**Features:**
- Paginated role list with sorting
- Create/edit role modal
- Delete role with confirmation
- Permission management integration
- Claims management (Pro)

### UsersComponent

Complete user management interface with role assignment.

```tsx
import { UsersComponent } from '@abpjs/identity-pro';

function UsersPage() {
  return <UsersComponent />;
}
```

**Features:**
- Paginated user list with search and sorting
- Create/edit user modal with role selection
- Delete user with confirmation
- Two-factor authentication toggle
- Lockout settings
- Claims management (Pro)

### ClaimsComponent

Claim type management UI for defining custom claims.

```tsx
import { ClaimsComponent } from '@abpjs/identity-pro';

function ClaimsPage() {
  return <ClaimsComponent />;
}
```

**Features:**
- Paginated claim type list
- Create/edit claim type modal
- Validation pattern (regex) support
- Value type selection (String, Int, Boolean, DateTime)
- Required flag

### ClaimModal

Reusable modal for managing claims on users or roles.

```tsx
import { ClaimModal } from '@abpjs/identity-pro';

function UserClaimsButton({ userId }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Manage Claims</button>
      <ClaimModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        entityId={userId}
        entityType="users"
      />
    </>
  );
}
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `boolean` | Modal visibility state |
| `onClose` | `() => void` | Close callback |
| `entityId` | `string` | User or role ID |
| `entityType` | `'users' \| 'roles'` | Type of entity |

## Hooks

### useRoles

Hook for managing roles state and operations.

```tsx
import { useRoles } from '@abpjs/identity-pro';

function MyRolesComponent() {
  const {
    roles,
    totalCount,
    isLoading,
    error,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    selectedRole,
    setSelectedRole,
  } = useRoles();

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleCreate = async (data) => {
    const result = await createRole(data);
    if (result.success) {
      // Handle success
    }
  };
}
```

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `roles` | `Identity.RoleItem[]` | List of roles |
| `totalCount` | `number` | Total role count |
| `isLoading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message |
| `selectedRole` | `Identity.RoleItem \| null` | Selected role for editing |
| `visiblePermissions` | `boolean` | Permissions modal visibility (v2.2.0) |
| `permissionsProviderKey` | `string` | Provider key for permissions modal (v2.2.0) |
| `fetchRoles` | `(params?) => Promise<Result>` | Fetch roles with pagination |
| `createRole` | `(data) => Promise<Result>` | Create a new role |
| `updateRole` | `(id, data) => Promise<Result>` | Update existing role |
| `deleteRole` | `(id) => Promise<Result>` | Delete a role |
| `setSelectedRole` | `(role) => void` | Set selected role |
| `openPermissionsModal` | `(providerKey) => void` | Open permissions modal (v2.2.0) |
| `onVisiblePermissionsChange` | `(value) => void` | Handle permissions modal visibility (v2.2.0) |

### useUsers

Hook for managing users state and operations.

```tsx
import { useUsers } from '@abpjs/identity-pro';

function MyUsersComponent() {
  const {
    users,
    totalCount,
    isLoading,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserRoles,
  } = useUsers();

  useEffect(() => {
    fetchUsers({ maxResultCount: 10 });
  }, [fetchUsers]);
}
```

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `users` | `Identity.UserItem[]` | List of users |
| `totalCount` | `number` | Total user count |
| `isLoading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message |
| `selectedUser` | `Identity.UserItem \| null` | Selected user |
| `selectedUserRoles` | `Identity.RoleItem[]` | Roles of selected user |
| `visiblePermissions` | `boolean` | Permissions modal visibility (v2.2.0) |
| `permissionsProviderKey` | `string` | Provider key for permissions modal (v2.2.0) |
| `fetchUsers` | `(params?) => Promise<Result>` | Fetch users with pagination |
| `createUser` | `(data) => Promise<Result>` | Create a new user |
| `updateUser` | `(id, data) => Promise<Result>` | Update existing user |
| `deleteUser` | `(id) => Promise<Result>` | Delete a user |
| `unlockUser` | `(id) => Promise<Result>` | Unlock a locked out user (v2.2.0) |
| `getUserRoles` | `(id) => Promise<Result>` | Get user's roles |
| `openPermissionsModal` | `(providerKey) => void` | Open permissions modal (v2.2.0) |
| `onVisiblePermissionsChange` | `(value) => void` | Handle permissions modal visibility (v2.2.0) |

### useClaims

Hook for managing claim types and user/role claims (Pro feature).

```tsx
import { useClaims } from '@abpjs/identity-pro';

function MyClaimsComponent() {
  const {
    claimTypes,
    totalCount,
    claimTypeNames,
    isLoading,
    fetchClaimTypes,
    fetchClaimTypeNames,
    createClaimType,
    updateClaimType,
    deleteClaimType,
    getClaims,
    updateClaims,
  } = useClaims();

  useEffect(() => {
    fetchClaimTypes();
  }, [fetchClaimTypes]);

  // Get claims for a user
  const userClaims = await getClaims(userId, 'users');

  // Update claims for a role
  await updateClaims(roleId, 'roles', newClaims);
}
```

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `claimTypes` | `Identity.ClaimType[]` | List of claim types |
| `totalCount` | `number` | Total claim type count |
| `claimTypeNames` | `Identity.ClaimTypeName[]` | Claim type names for dropdowns |
| `isLoading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message |
| `fetchClaimTypes` | `(params?) => Promise<Result>` | Fetch claim types |
| `fetchClaimTypeNames` | `() => Promise<Result>` | Fetch claim type names |
| `createClaimType` | `(data) => Promise<Result>` | Create claim type |
| `updateClaimType` | `(data) => Promise<Result>` | Update claim type |
| `deleteClaimType` | `(id) => Promise<Result>` | Delete claim type |
| `getClaims` | `(id, type) => Promise<ClaimRequest[]>` | Get entity claims |
| `updateClaims` | `(id, type, claims) => Promise<Result>` | Update entity claims |

### useIdentity

High-level hook that combines roles and users management.

```tsx
import { useIdentity } from '@abpjs/identity-pro';

function IdentityDashboard() {
  const { roles, users, fetchRoles, fetchUsers } = useIdentity();

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, [fetchRoles, fetchUsers]);
}
```

## Services

### IdentityService

Service class for identity-related API operations.

**Role Methods:**

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getRoles` | `params?: PageQueryParams` | `Promise<RoleResponse>` | Get paginated roles |
| `getRoleById` | `id: string` | `Promise<RoleItem>` | Get role by ID |
| `createRole` | `body: RoleSaveRequest` | `Promise<RoleItem>` | Create a role |
| `updateRole` | `id: string, body: RoleSaveRequest` | `Promise<RoleItem>` | Update a role |
| `deleteRole` | `id: string` | `Promise<RoleItem>` | Delete a role |

**User Methods:**

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getUsers` | `params?: PageQueryParams` | `Promise<UserResponse>` | Get paginated users |
| `getUserById` | `id: string` | `Promise<UserItem>` | Get user by ID |
| `getUserRoles` | `id: string` | `Promise<RoleResponse>` | Get user's roles |
| `createUser` | `body: UserSaveRequest` | `Promise<UserItem>` | Create a user |
| `updateUser` | `id: string, body: UserSaveRequest` | `Promise<UserItem>` | Update a user |
| `deleteUser` | `id: string` | `Promise<void>` | Delete a user |
| `unlockUser` | `id: string` | `Promise<void>` | Unlock a locked out user (v2.2.0) |

**Claim Methods (Pro):**

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getClaimTypeNames` | - | `Promise<ClaimTypeName[]>` | Get claim type names |
| `getClaimTypes` | `params?: PageQueryParams` | `Promise<ClaimResponse>` | Get paginated claim types |
| `getClaimTypeById` | `id: string` | `Promise<ClaimType>` | Get claim type by ID |
| `createClaimType` | `body: ClaimType` | `Promise<ClaimType>` | Create claim type |
| `updateClaimType` | `body: ClaimType` | `Promise<ClaimType>` | Update claim type |
| `deleteClaimType` | `id: string` | `Promise<void>` | Delete claim type |
| `getClaims` | `{ id, type }` | `Promise<ClaimRequest[]>` | Get entity claims |
| `updateClaims` | `{ id, type, claims }` | `Promise<void>` | Update entity claims |

## Routes

The package provides pre-configured routes and constants:

```tsx
import {
  IDENTITY_ROUTES,
  IDENTITY_ROUTE_PATHS,
  IDENTITY_POLICIES
} from '@abpjs/identity-pro';

// Route paths
IDENTITY_ROUTE_PATHS.BASE   // '/identity'
IDENTITY_ROUTE_PATHS.ROLES  // '/identity/roles'
IDENTITY_ROUTE_PATHS.USERS  // '/identity/users'

// Required policies for routes
IDENTITY_POLICIES.ROLES         // 'AbpIdentity.Roles'
IDENTITY_POLICIES.USERS         // 'AbpIdentity.Users'
IDENTITY_POLICIES.USERS_CREATE  // 'AbpIdentity.Users.Create'
IDENTITY_POLICIES.USERS_UPDATE  // 'AbpIdentity.Users.Update'
IDENTITY_POLICIES.USERS_DELETE  // 'AbpIdentity.Users.Delete'
IDENTITY_POLICIES.ROLES_CREATE  // 'AbpIdentity.Roles.Create'
IDENTITY_POLICIES.ROLES_UPDATE  // 'AbpIdentity.Roles.Update'
IDENTITY_POLICIES.ROLES_DELETE  // 'AbpIdentity.Roles.Delete'
```

## TypeScript Support

The package exports all TypeScript interfaces under the `Identity` namespace:

```tsx
import { Identity } from '@abpjs/identity-pro';

// Types
const role: Identity.RoleItem = { ... };
const user: Identity.UserItem = { ... };
const claim: Identity.ClaimType = { ... };

// Request types
const roleRequest: Identity.RoleSaveRequest = { ... };
const userRequest: Identity.UserSaveRequest = { ... };
const claimRequest: Identity.ClaimRequest = { ... };

// Response types
const roleResponse: Identity.RoleResponse = { ... };
const userResponse: Identity.UserResponse = { ... };
const claimResponse: Identity.ClaimResponse = { ... };

// Enums
const valueType = Identity.ClaimValueType.String; // 0
```

**Key Types:**

| Type | Description |
|------|-------------|
| `Identity.RoleItem` | Role entity with id, name, isDefault, isPublic, isStatic |
| `Identity.RoleSaveRequest` | Request for creating/updating roles |
| `Identity.UserItem` | User entity with all properties |
| `Identity.UserSaveRequest` | Request for creating/updating users |
| `Identity.ClaimType` | Claim type definition (Pro) |
| `Identity.ClaimTypeName` | Simple claim name for dropdowns (Pro) |
| `Identity.ClaimRequest` | Claim assignment request (Pro) |
| `Identity.ClaimValueType` | Enum: String, Int, Boolean, DateTime (Pro) |

## Dependencies

- `@abpjs/core` - Core ABP React functionality

## Comparison with @abpjs/identity

| Feature | @abpjs/identity | @abpjs/identity-pro |
|---------|-----------------|---------------------|
| Roles CRUD | ✓ | ✓ |
| Users CRUD | ✓ | ✓ |
| Role Assignment | ✓ | ✓ |
| Permissions | ✓ | ✓ |
| Claim Types | ✗ | ✓ |
| User Claims | ✗ | ✓ |
| Role Claims | ✗ | ✓ |
| ClaimsComponent | ✗ | ✓ |
| ClaimModal | ✗ | ✓ |

## See Also

- [Core Module](../core/overview)
- [Permission Management](../permission-management/overview)
- [Account Pro](../account-pro/overview)
