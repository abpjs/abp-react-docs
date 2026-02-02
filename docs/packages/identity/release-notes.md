---
sidebar_position: 99
---

# Release Notes

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
// eIdentityRouteNames.Administration = 'AbpUiNavigation::Menu:Administration'
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
