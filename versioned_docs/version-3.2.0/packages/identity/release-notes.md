---
sidebar_position: 99
---

# Release Notes

## v3.2.0

**February 2026**

### New Features

#### Proxy Services

New typed proxy services for identity API operations:

**IdentityRoleService** - Role management:

```tsx
import { IdentityRoleService } from '@abpjs/identity';
import { useRestService } from '@abpjs/core';

function useRoles() {
  const restService = useRestService();
  const roleService = new IdentityRoleService(restService);

  // Get all roles (unpaginated)
  const allRoles = await roleService.getAllList();

  // Get paginated roles
  const pagedRoles = await roleService.getList({ skipCount: 0, maxResultCount: 10 });

  // CRUD operations
  const newRole = await roleService.create({ name: 'Editor', isDefault: false, isPublic: true });
  const role = await roleService.get(roleId);
  const updated = await roleService.update(roleId, { ...role, name: 'Senior Editor' });
  await roleService.delete(roleId);
}
```

**IdentityUserService** - User management:

```tsx
import { IdentityUserService } from '@abpjs/identity';

const userService = new IdentityUserService(restService);

// Get users with filter
const users = await userService.getList({ filter: 'john', skipCount: 0, maxResultCount: 10 });

// Get user roles
const userRoles = await userService.getRoles(userId);

// Update user roles
await userService.updateRoles(userId, { roleNames: ['Admin', 'Editor'] });

// Find by username/email
const user = await userService.findByUsername('john.doe');
const user2 = await userService.findByEmail('john@example.com');

// Get assignable roles
const assignableRoles = await userService.getAssignableRoles();
```

**IdentityUserLookupService** - User lookup operations:

```tsx
import { IdentityUserLookupService } from '@abpjs/identity';

const lookupService = new IdentityUserLookupService(restService);

// Find user by ID
const user = await lookupService.findById(userId);

// Find by username
const user2 = await lookupService.findByUserName('john.doe');

// Search users
const users = await lookupService.search({
  filter: 'john',
  skipCount: 0,
  maxResultCount: 10,
});

// Get count
const count = await lookupService.getCount({ filter: 'john' });
```

**ProfileService** - Current user profile:

```tsx
import { ProfileService } from '@abpjs/identity';

const profileService = new ProfileService(restService);

// Get current user profile
const profile = await profileService.get();

// Update profile
await profileService.update({
  userName: profile.userName,
  email: 'newemail@example.com',
  name: 'John',
  surname: 'Doe',
  phoneNumber: '+1234567890',
});

// Change password
await profileService.changePassword({
  currentPassword: 'oldPassword',
  newPassword: 'newPassword',
});
```

#### New Proxy Models

Typed DTOs for all identity operations:

```tsx
import type {
  // Role DTOs
  IdentityRoleDto,
  IdentityRoleCreateDto,
  IdentityRoleUpdateDto,
  // User DTOs
  IdentityUserDto,
  IdentityUserCreateDto,
  IdentityUserUpdateDto,
  IdentityUserUpdateRolesDto,
  GetIdentityUsersInput,
  // Profile DTOs
  ProfileDto,
  UpdateProfileDto,
  ChangePasswordInput,
  // Lookup DTOs
  UserLookupCountInputDto,
  UserLookupSearchInputDto,
  // User data
  UserData,
} from '@abpjs/identity';
```

#### Updated State Interface

The `Identity.State` interface now uses the new proxy DTOs:

```tsx
import { Identity, PagedResultDto, IdentityRoleDto, IdentityUserDto } from '@abpjs/identity';

interface State {
  roles: PagedResultDto<IdentityRoleDto>;
  users: PagedResultDto<IdentityUserDto>;
  selectedRole: IdentityRoleDto;
  selectedUser: IdentityUserDto;
  selectedUserRoles: IdentityRoleDto[];
}
```

### Deprecations

The following legacy types are deprecated and will be removed in v4.0:

| Deprecated | Replacement |
|------------|-------------|
| `Identity.RoleResponse` | `PagedResultDto<IdentityRoleDto>` |
| `Identity.RoleItem` | `IdentityRoleDto` |
| `Identity.RoleSaveRequest` | `IdentityRoleCreateDto` / `IdentityRoleUpdateDto` |
| `Identity.UserResponse` | `PagedResultDto<IdentityUserDto>` |
| `Identity.UserItem` | `IdentityUserDto` |
| `Identity.User` | `IdentityUserCreateOrUpdateDtoBase` |
| `Identity.UserSaveRequest` | `IdentityUserCreateDto` / `IdentityUserUpdateDto` |

### New Exports

**Services:**
- `IdentityRoleService` - Role management proxy service
- `IdentityUserService` - User management proxy service
- `IdentityUserLookupService` - User lookup proxy service
- `ProfileService` - Profile management proxy service

**Role Types:**
- `IdentityRoleDto` - Role data transfer object
- `IdentityRoleCreateDto` - DTO for creating roles
- `IdentityRoleUpdateDto` - DTO for updating roles
- `IdentityRoleCreateOrUpdateDtoBase` - Base DTO for role operations

**User Types:**
- `IdentityUserDto` - User data transfer object
- `IdentityUserCreateDto` - DTO for creating users
- `IdentityUserUpdateDto` - DTO for updating users
- `IdentityUserUpdateRolesDto` - DTO for updating user roles
- `IdentityUserCreateOrUpdateDtoBase` - Base DTO for user operations
- `GetIdentityUsersInput` - Input for getting users with filtering

**Profile Types:**
- `ProfileDto` - Profile data transfer object
- `UpdateProfileDto` - DTO for updating profile
- `ChangePasswordInput` - Input for changing password

**Lookup Types:**
- `UserData` - User data from lookup service
- `UserLookupCountInputDto` - Input for counting users
- `UserLookupSearchInputDto` - Input for searching users

---

## v3.1.0

**February 2026**

- Version alignment with @abpjs/core

---

## v3.0.0

**February 2026**

### Breaking Changes

#### `eIdentityRouteNames.Administration` removed

The `Administration` key has been removed from `eIdentityRouteNames`. Use `eThemeSharedRouteNames.Administration` from `@abpjs/theme-shared` instead:

```tsx
// Before (v2.7.0)
import { eIdentityRouteNames } from '@abpjs/identity';
const adminRoute = eIdentityRouteNames.Administration;

// After (v3.0.0)
import { eThemeSharedRouteNames } from '@abpjs/theme-shared';
const adminRoute = eThemeSharedRouteNames.Administration;
```

### New Features

#### Route Providers

New route provider system for initializing identity routes:

```tsx
import { initializeIdentityRoutes } from '@abpjs/identity';

// Call once during app initialization
initializeIdentityRoutes();

// This registers:
// - Identity Management (under Administration)
// - /identity/roles
// - /identity/users
```

For advanced configuration with a custom RoutesService:

```tsx
import { configureRoutes, IDENTITY_ROUTE_PROVIDERS } from '@abpjs/identity';
import { getRoutesService } from '@abpjs/core';

const routesService = getRoutesService();
const addRoutes = configureRoutes(routesService);
addRoutes();
```

#### Policy Names

New constants for identity permission policies:

```tsx
import { eIdentityPolicyNames } from '@abpjs/identity';

// Available policies:
eIdentityPolicyNames.IdentityManagement  // 'AbpIdentity.Roles || AbpIdentity.Users'
eIdentityPolicyNames.Roles               // 'AbpIdentity.Roles'
eIdentityPolicyNames.Users               // 'AbpIdentity.Users'

// Use with permission checking
import { usePermission } from '@abpjs/core';

function IdentityMenu() {
  const canManageIdentity = usePermission(eIdentityPolicyNames.IdentityManagement);

  if (!canManageIdentity) return null;
  return <IdentityManagementLink />;
}
```

#### `getUserAssignableRoles()` Method

New method on `IdentityService` to get roles that can be assigned to users:

```tsx
import { useIdentityService } from '@abpjs/identity';

function UserRoleAssignment() {
  const identityService = useIdentityService();

  const loadAssignableRoles = async () => {
    const response = await identityService.getUserAssignableRoles();
    // response.items contains roles available for assignment
  };
}
```

This calls `GET /api/identity/users/assignable-roles` endpoint.

#### Config Subpackage

The `@abp/ng.identity/config` functionality is now merged into the main package:

```tsx
// All config exports are available from the main package
import {
  configureRoutes,
  IDENTITY_ROUTE_PROVIDERS,
  initializeIdentityRoutes,
  eIdentityRouteNames,
  eIdentityPolicyNames,
} from '@abpjs/identity';
```

### New Exports

- `initializeIdentityRoutes()` - Initialize identity routes
- `configureRoutes(routes)` - Configure routes with custom RoutesService
- `IDENTITY_ROUTE_PROVIDERS` - Route provider configuration object
- `eIdentityPolicyNames` - Constants for identity permission policies
- `IdentityPolicyNameKey` - Type for policy name values

---

## v2.9.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.7.0

**February 2026**

### New Features

#### Component Replacement Keys

New constants for replacing identity components:

```tsx
import { eIdentityComponents } from '@abpjs/identity';

// Available component keys:
// eIdentityComponents.Roles = 'Identity.RolesComponent'
// eIdentityComponents.Users = 'Identity.UsersComponent'
```

#### Route Names

New constants for identity route names (localization keys):

```tsx
import { eIdentityRouteNames } from '@abpjs/identity';

// Available route names:
// eIdentityRouteNames.IdentityManagement = 'AbpIdentity::Menu:IdentityManagement'
// eIdentityRouteNames.Roles = 'AbpIdentity::Roles'
// eIdentityRouteNames.Users = 'AbpIdentity::Users'
```

### New Exports

- `eIdentityComponents` - Constants for component replacement keys
- `IdentityComponentKey` - Type for identity component key values
- `eIdentityRouteNames` - Constants for route names (localization keys)
- `IdentityRouteNameKey` - Type for identity route name values

---

## v2.4.0

**February 2026**

### New Features

- **`IdentityService.getAllRoles()` method** - Fetch all roles without pagination in a single request:

  ```tsx
  import { useIdentityService } from '@abpjs/identity';

  function RoleSelector() {
    const identityService = useIdentityService();

    const loadAllRoles = async () => {
      const response = await identityService.getAllRoles();
      // response.items contains all roles
    };
  }
  ```

  This calls `GET /api/identity/roles/all` endpoint.

- **`IdentityService.apiName` property** - New property for REST API configuration. Defaults to `'default'`.

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

### Breaking Changes

- **`IDENTITY_ROUTES` removed** - This deprecated constant has been removed. Use identity config services for route configuration.
- **`IdentityProviders` removed** - This deprecated provider has been removed.

### New Features

- **`IdentityStateService`** - New service class for programmatic identity state management:
  - `dispatchGetRoles()` - Dispatch action to fetch roles
  - `dispatchGetUsers()` - Dispatch action to fetch users
  - `dispatchCreateRole()` - Dispatch action to create a role
  - `dispatchUpdateRole()` - Dispatch action to update a role
  - `dispatchDeleteRole()` - Dispatch action to delete a role
  - `dispatchCreateUser()` - Dispatch action to create a user
  - `dispatchUpdateUser()` - Dispatch action to update a user
  - `dispatchDeleteUser()` - Dispatch action to delete a user

- **`onVisiblePermissionChange` prop** - New callback prop on both `RolesComponent` and `UsersComponent` to handle permission modal visibility changes

- **Component Interface Types** - Added TypeScript interfaces for component inputs/outputs:
  - `Identity.RolesComponentInputs`
  - `Identity.RolesComponentOutputs`
  - `Identity.UsersComponentInputs`
  - `Identity.UsersComponentOutputs`

---

## v1.1.0

**January 2026**

### New Features

- **Password rules display** - `UsersComponent` now supports displaying password requirements:
  - `passwordRulesArr` prop - Array of rules to display (`'number'`, `'small'`, `'capital'`, `'special'`)
  - `requiredPasswordLength` prop - Minimum password length to display
- **`PasswordRule` type** - New exported type for password validation rules

### Example

```tsx
<UsersComponent
  passwordRulesArr={['number', 'capital', 'small', 'special']}
  requiredPasswordLength={6}
/>
```

---

## v1.0.0

**January 2026**

### New Features

- **Sorting support in hooks** - `useRoles` and `useUsers` now include sorting state:
  - `sortKey` - Current sort field
  - `sortOrder` - Sort direction (`'asc'` | `'desc'` | `''`)
  - `setSortKey()` - Update sort field
  - `setSortOrder()` - Update sort direction
- **`SortOrder` type** - New exported type for sort order values

### Deprecations

- **`IDENTITY_ROUTES` deprecated** - Route configuration is now handled by identity config services. This constant is kept for backwards compatibility but may be removed in future versions.
- **`IdentityProviders` deprecated** - Use identity config services instead.

---

## v0.9.0

**January 2026**

### Breaking Changes

- **`IDENTITY_ROUTES` format changed** - Now returns `{ routes: ABP.FullRoute[] }` instead of `ABP.FullRoute[]`

### New Features

- **`fetchRoles` pagination** - Now accepts optional `ABP.PageQueryParams` for pagination/filtering

---

## v0.8.0

**January 2026**

- Version alignment with @abpjs/core

---

## v0.7.6

**January 2026** - Initial Release

- UsersComponent with CRUD operations
- RolesComponent with CRUD operations
- useUsers hook with pagination and search
- useRoles hook
- Permission integration for users and roles
