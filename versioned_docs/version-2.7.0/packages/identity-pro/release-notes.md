# Release Notes

## v2.7.0

**February 2026**

### New Features

#### Admin Change Password

New method to change a user's password as an admin:

```tsx
import { useIdentityService } from '@abpjs/identity-pro';

function AdminPasswordReset() {
  const identityService = useIdentityService();

  const resetPassword = async (userId: string, newPassword: string) => {
    await identityService.changePassword(userId, { newPassword });
  };
}
```

#### Route Names

New constants for identity pro route names (localization keys):

```tsx
import { eIdentityRouteNames } from '@abpjs/identity-pro';

// Available route names:
// eIdentityRouteNames.Administration = 'AbpUiNavigation::Menu:Administration'
// eIdentityRouteNames.IdentityManagement = 'AbpIdentity::Menu:IdentityManagement'
// eIdentityRouteNames.Roles = 'AbpIdentity::Roles'
// eIdentityRouteNames.Users = 'AbpIdentity::Users'
// eIdentityRouteNames.ClaimTypes = 'AbpIdentity::ClaimTypes'
```

### API Changes

- **`eIdentityComponents`** - Changed from TypeScript `enum` to `const` object for better tree-shaking and type inference:

  ```tsx
  // Before (v2.4.0)
  enum eIdentityComponents {
    Claims = 'Identity.ClaimsComponent',
    // ...
  }

  // After (v2.7.0)
  const eIdentityComponents = {
    Claims: 'Identity.ClaimsComponent',
    // ...
  } as const;
  ```

### New Exports

- `IdentityService.changePassword(id, body)` - Admin method to change user password
- `Identity.ChangePasswordRequest` - Interface for password change request
- `eIdentityRouteNames` - Constants for route names (localization keys)
- `IdentityRouteNameKey` - Type for identity route name values
- `IdentityComponentKey` - Type for identity component key values

---

## v2.4.0

**February 2026**

### New Features

- **`IdentityService.apiName` property** - New property for REST API configuration. Defaults to `'default'`.

- **`getAllRoles()` method** - New method to fetch all roles without pagination:

  ```tsx
  import { useIdentityService } from '@abpjs/identity-pro';

  function RoleSelector() {
    const identityService = useIdentityService();
    const [roles, setRoles] = useState<Identity.RoleItem[]>([]);

    useEffect(() => {
      // Fetch all roles without pagination (calls /api/identity/roles/all)
      identityService.getAllRoles().then((response) => {
        setRoles(response.items);
      });
    }, []);

    return (
      <select>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
    );
  }
  ```

- **`eIdentityComponents` enum** - New enum for component identifiers, useful for component registration and customization:

  ```tsx
  import { eIdentityComponents } from '@abpjs/identity-pro';

  // Available components:
  // eIdentityComponents.Claims = 'Identity.ClaimsComponent'
  // eIdentityComponents.Roles = 'Identity.RolesComponent'
  // eIdentityComponents.Users = 'Identity.UsersComponent'
  ```

---

## v2.2.0

**February 2026**

### New Features

- **User Unlock** - Added `unlockUser(id)` method to `IdentityService` and `useUsers` hook for unlocking locked out users
- **Permissions Modal State** - Added built-in permissions modal state management to `useRoles` and `useUsers` hooks:
  - `visiblePermissions` - Boolean state for modal visibility
  - `permissionsProviderKey` - Provider key for the permissions modal
  - `onVisiblePermissionsChange(value)` - Callback to handle modal visibility changes
  - `openPermissionsModal(providerKey)` - Method to open permissions modal for a specific entity

---

## v2.1.1

**February 2026**

- Version alignment with @abpjs/core

---

## v2.0.0

**January 2026**

### New Features

- **`IdentityStateService`** - New state service for programmatic identity operations with 17 dispatch methods:

  **Role Operations:**
  - `dispatchGetRoles(params?)` - Fetch roles and update internal state
  - `dispatchGetRoleById(id)` - Fetch a single role by ID
  - `dispatchCreateRole(body)` - Create a new role
  - `dispatchUpdateRole(id, body)` - Update an existing role
  - `dispatchDeleteRole(id)` - Delete a role

  **User Operations:**
  - `dispatchGetUsers(params?)` - Fetch users and update internal state
  - `dispatchGetUserById(id)` - Fetch a single user by ID
  - `dispatchCreateUser(body)` - Create a new user
  - `dispatchUpdateUser(id, body)` - Update an existing user
  - `dispatchDeleteUser(id)` - Delete a user
  - `dispatchGetUserRoles(id)` - Get roles assigned to a user

  **Claim Type Operations (Pro):**
  - `dispatchGetClaimTypes(params?)` - Fetch claim types and update internal state
  - `dispatchGetClaimTypeById(id)` - Fetch a single claim type by ID
  - `dispatchCreateClaimType(body)` - Create a new claim type
  - `dispatchUpdateClaimType(body)` - Update an existing claim type
  - `dispatchDeleteClaimType(id)` - Delete a claim type
  - `dispatchGetClaimTypeNames()` - Get all claim type names

  **State Getter Methods:**
  - `getRoles()` / `getRolesTotalCount()` - Access cached roles
  - `getUsers()` / `getUsersTotalCount()` - Access cached users
  - `getClaimTypes()` / `getClaimTypesTotalCount()` - Access cached claim types
  - `getClaimTypeNames()` - Access cached claim type names

### Example

```tsx
import { IdentityStateService } from '@abpjs/identity-pro';
import { RestService } from '@abpjs/core';

const restService = new RestService();
const stateService = new IdentityStateService(restService);

// Fetch and manage roles
await stateService.dispatchGetRoles({ maxResultCount: 10 });
const roles = stateService.getRoles();
console.log(`Found ${stateService.getRolesTotalCount()} roles`);

// Create a new role
await stateService.dispatchCreateRole({
  name: 'Manager',
  isDefault: false,
  isPublic: true,
});

// Fetch and manage users
await stateService.dispatchGetUsers({ filter: 'admin' });
const users = stateService.getUsers();

// Fetch claim types (Pro feature)
await stateService.dispatchGetClaimTypes();
const claimTypes = stateService.getClaimTypes();
```

---

## v1.0.0

**January 2026**

- Version alignment with @abpjs/core v1.0.0

---

## v0.7.2 (Initial Release)

### Components

- **RolesComponent** - Full role management UI with CRUD operations and permissions
- **UsersComponent** - Complete user management with role assignment and settings
- **ClaimsComponent** - Claim type management UI (Pro feature)
- **ClaimModal** - Reusable modal for managing user/role claims (Pro feature)

### Hooks

- **useRoles** - State management for roles with pagination, sorting, and CRUD operations
- **useUsers** - State management for users with pagination, sorting, and CRUD operations
- **useIdentity** - Combined hook for roles and users management
- **useClaims** - State management for claim types and user/role claims (Pro feature)

### Services

- **IdentityService** with comprehensive methods:
  - Role operations: `getRoles`, `getRoleById`, `createRole`, `updateRole`, `deleteRole`
  - User operations: `getUsers`, `getUserById`, `getUserRoles`, `createUser`, `updateUser`, `deleteUser`
  - Claim type operations: `getClaimTypeNames`, `getClaimTypes`, `getClaimTypeById`, `createClaimType`, `updateClaimType`, `deleteClaimType` (Pro)
  - User/Role claims: `getClaims`, `updateClaims` (Pro)

### Constants

- **IDENTITY_ROUTES** - Pre-configured route definitions
- **IDENTITY_ROUTE_PATHS** - Route path constants for navigation
- **IDENTITY_POLICIES** - Required policy constants for authorization

### TypeScript

- **Identity namespace** with all types:
  - `RoleItem`, `RoleSaveRequest`, `RoleResponse`
  - `User`, `UserItem`, `UserSaveRequest`, `UserResponse`
  - `ClaimType`, `ClaimTypeName`, `ClaimRequest`, `ClaimResponse` (Pro)
  - `ClaimValueType` enum (Pro)
  - `State` interface for state management
