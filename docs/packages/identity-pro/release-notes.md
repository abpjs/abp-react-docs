# Release Notes

## v3.0.0

**February 2026**

### Breaking Changes

#### `eIdentityRouteNames.Administration` removed

The `Administration` key has been removed from `eIdentityRouteNames`. Use `eThemeSharedRouteNames.Administration` from `@abpjs/theme-shared` instead:

```tsx
// Before (v2.7.0)
import { eIdentityRouteNames } from '@abpjs/identity-pro';
const adminRoute = eIdentityRouteNames.Administration;

// After (v3.0.0)
import { eThemeSharedRouteNames } from '@abpjs/theme-shared';
const adminRoute = eThemeSharedRouteNames.Administration;
```

#### `getClaimTypeNames()` replaced with `getRolesClaimTypes()` and `getUsersClaimTypes()`

The `getClaimTypeNames()` method has been removed and replaced with separate methods for roles and users:

```tsx
// Before (v2.9.0)
const claimTypes = await identityService.getClaimTypeNames();

// After (v3.0.0)
const rolesClaimTypes = await identityService.getRolesClaimTypes();
const usersClaimTypes = await identityService.getUsersClaimTypes();
```

#### `dispatchGetClaimTypeNames()` removed from IdentityStateService

The `dispatchGetClaimTypeNames()` method has been removed from `IdentityStateService`. Fetch claim types directly using the new service methods.

### New Features

#### Route Providers

New route provider system for initializing identity routes:

```tsx
import { initializeIdentityRoutes } from '@abpjs/identity-pro';

// Call once during app initialization
initializeIdentityRoutes();

// This registers:
// - Identity Management (under Administration)
// - /identity/roles
// - /identity/users
// - /identity/claim-types
// - /identity/organization-units
```

For advanced configuration with a custom RoutesService:

```tsx
import { configureRoutes, IDENTITY_ROUTE_PROVIDERS } from '@abpjs/identity-pro';
import { getRoutesService } from '@abpjs/core';

const routesService = getRoutesService();
const addRoutes = configureRoutes(routesService);
addRoutes();
```

#### Setting Tab Providers

New provider for registering identity settings tabs:

```tsx
import {
  configureSettingTabs,
  IDENTITY_SETTING_TAB_PROVIDERS,
} from '@abpjs/identity-pro';
import { getSettingTabsService } from '@abpjs/core';
import { IdentitySettingsComponent } from './components/IdentitySettings';

const settingTabsService = getSettingTabsService();
const addTabs = configureSettingTabs(settingTabsService, {
  component: IdentitySettingsComponent,
});
addTabs();
```

#### Policy Names

New constants for identity permission policies:

```tsx
import { eIdentityPolicyNames } from '@abpjs/identity-pro';

// Available policies:
eIdentityPolicyNames.IdentityManagement  // 'AbpIdentity.Roles || AbpIdentity.Users || AbpIdentity.ClaimTypes || AbpIdentity.OrganizationUnits'
eIdentityPolicyNames.Roles               // 'AbpIdentity.Roles'
eIdentityPolicyNames.Users               // 'AbpIdentity.Users'
eIdentityPolicyNames.ClaimTypes          // 'AbpIdentity.ClaimTypes'
eIdentityPolicyNames.OrganizationUnits   // 'AbpIdentity.OrganizationUnits'

// Use with permission checking
import { usePermission } from '@abpjs/core';

function IdentityMenu() {
  const canManageIdentity = usePermission(eIdentityPolicyNames.IdentityManagement);

  if (!canManageIdentity) return null;
  return <IdentityManagementLink />;
}
```

#### Setting Tab Names

New constants for identity setting tab names:

```tsx
import { eIdentitySettingTabNames } from '@abpjs/identity-pro';

// Available setting tab names:
eIdentitySettingTabNames.IdentityManagement  // 'AbpIdentity::Menu:IdentityManagement'
```

#### Identity Settings Models

New TypeScript interfaces for identity settings configuration:

```tsx
import { Settings, Password, Lockout, SignIn, User } from '@abpjs/identity-pro';

// Full settings structure
const settings: Settings = {
  password: {
    requiredLength: 6,
    requiredUniqueChars: 1,
    requireNonAlphanumeric: true,
    requireLowercase: true,
    requireUppercase: true,
    requireDigit: true,
  },
  lockout: {
    allowedForNewUsers: true,
    lockoutDuration: 300,
    maxFailedAccessAttempts: 5,
  },
  signIn: {
    requireConfirmedEmail: false,
    enablePhoneNumberConfirmation: false,
    requireConfirmedPhoneNumber: false,
  },
  user: {
    isUserNameUpdateEnabled: true,
    isEmailUpdateEnabled: true,
  },
};
```

#### `getUserAssingableRoles()` Method

New method on `IdentityService` to get roles that can be assigned to users:

```tsx
import { useIdentityService } from '@abpjs/identity-pro';

function UserRoleAssignment() {
  const identityService = useIdentityService();

  const loadAssignableRoles = async () => {
    const response = await identityService.getUserAssingableRoles();
    // response.items contains roles available for assignment
  };
}
```

This calls `GET /api/identity/users/assignable-roles` endpoint.

#### `getRolesClaimTypes()` and `getUsersClaimTypes()` Methods

New separate methods for fetching claim types available for roles and users:

```tsx
import { useIdentityService } from '@abpjs/identity-pro';

function ClaimTypeSelector() {
  const identityService = useIdentityService();

  // For role claims
  const loadRoleClaimTypes = async () => {
    const claimTypes = await identityService.getRolesClaimTypes();
    // GET /api/identity/roles/available-claim-types
  };

  // For user claims
  const loadUserClaimTypes = async () => {
    const claimTypes = await identityService.getUsersClaimTypes();
    // GET /api/identity/users/available-claim-types
  };
}
```

#### Extensions System

New extensibility system for customizing identity components:

```tsx
import {
  EntityAction,
  EntityProp,
  ToolbarAction,
  FormProp,
  DEFAULT_CLAIMS_ENTITY_ACTIONS,
  DEFAULT_ROLES_ENTITY_ACTIONS,
  DEFAULT_USERS_ENTITY_ACTIONS,
  DEFAULT_ORGANIZATION_UNITS_ENTITY_ACTIONS,
  DEFAULT_CLAIMS_ENTITY_PROPS,
  DEFAULT_ROLES_ENTITY_PROPS,
  DEFAULT_USERS_ENTITY_PROPS,
  DEFAULT_ORGANIZATION_UNITS_ENTITY_PROPS,
} from '@abpjs/identity-pro';

// Define custom entity action
const customAction: EntityAction<Identity.User> = {
  text: 'Send Email',
  action: ({ record }) => sendEmail(record),
  permission: 'AbpIdentity.Users.Email',
  icon: 'fa fa-envelope',
};

// Define custom entity property
const customProp: EntityProp<Identity.User> = {
  type: 'string',
  name: 'department',
  displayName: 'Department',
  sortable: true,
  valueResolver: ({ record }) => record.extraProperties?.department,
};

// Define custom form field
const customFormProp: FormProp<Identity.UserSaveRequest> = {
  type: 'text',
  name: 'employeeId',
  displayName: 'Employee ID',
  validators: [{ type: 'required' }],
};
```

#### Extensions Guard

New guard for protecting routes with extensions:

```tsx
import { IdentityExtensionsGuard } from '@abpjs/identity-pro';

// Use in route configuration to ensure extensions are loaded
```

#### Config Subpackage

The `@volo/abp.ng.identity/config` functionality is now merged into the main package:

```tsx
// All config exports are available from the main package
import {
  configureRoutes,
  configureSettingTabs,
  IDENTITY_ROUTE_PROVIDERS,
  IDENTITY_SETTING_TAB_PROVIDERS,
  initializeIdentityRoutes,
  eIdentityRouteNames,
  eIdentityPolicyNames,
  eIdentitySettingTabNames,
  Settings,
  Password,
  Lockout,
  SignIn,
  User,
} from '@abpjs/identity-pro';
```

### New Exports

**Route and Policy:**
- `initializeIdentityRoutes()` - Initialize identity routes
- `configureRoutes(routes)` - Configure routes with custom RoutesService
- `IDENTITY_ROUTE_PROVIDERS` - Route provider configuration object
- `eIdentityPolicyNames` - Constants for identity permission policies
- `IdentityPolicyNameKey` - Type for policy name values

**Setting Tabs:**
- `configureSettingTabs(settingTabs, options)` - Configure identity setting tabs
- `IDENTITY_SETTING_TAB_PROVIDERS` - Setting tab provider configuration
- `eIdentitySettingTabNames` - Constants for setting tab names
- `IdentitySettingTabNameKey` - Type for setting tab name values

**Settings Models:**
- `Settings` - Full identity settings interface
- `Password` - Password settings interface
- `Lockout` - Lockout settings interface
- `SignIn` - Sign-in settings interface
- `User` - User settings interface

**Service Methods:**
- `IdentityService.getUserAssingableRoles()` - Get assignable roles
- `IdentityService.getRolesClaimTypes()` - Get claim types for roles
- `IdentityService.getUsersClaimTypes()` - Get claim types for users

**Extensions:**
- `EntityAction<T>` - Interface for entity actions
- `EntityProp<T>` - Interface for entity properties
- `ToolbarAction<T>` - Interface for toolbar actions
- `FormProp<T>` - Interface for form properties
- `EntityActionContributorCallback<T>` - Callback type for entity action contributors
- `EntityPropContributorCallback<T>` - Callback type for entity prop contributors
- `ToolbarActionContributorCallback<T>` - Callback type for toolbar action contributors
- `CreateFormPropContributorCallback<T>` - Callback type for create form contributors
- `EditFormPropContributorCallback<T>` - Callback type for edit form contributors
- `DEFAULT_CLAIMS_ENTITY_ACTIONS` - Default claims entity actions
- `DEFAULT_ROLES_ENTITY_ACTIONS` - Default roles entity actions
- `DEFAULT_USERS_ENTITY_ACTIONS` - Default users entity actions
- `DEFAULT_ORGANIZATION_UNITS_ENTITY_ACTIONS` - Default org units entity actions
- `DEFAULT_CLAIMS_ENTITY_PROPS` - Default claims entity props
- `DEFAULT_ROLES_ENTITY_PROPS` - Default roles entity props
- `DEFAULT_USERS_ENTITY_PROPS` - Default users entity props
- `DEFAULT_ORGANIZATION_UNITS_ENTITY_PROPS` - Default org units entity props

**Guards:**
- `IdentityExtensionsGuard` - Guard for extensions loading

---

## v2.9.0

**February 2026**

### New Features

#### Organization Unit Management

Full support for ABP's organization unit hierarchy:

```tsx
import { OrganizationUnitService } from '@abpjs/identity-pro';
import { RestService } from '@abpjs/core';

const restService = new RestService();
const orgUnitService = new OrganizationUnitService(restService);

// Get all organization units
const units = await orgUnitService.getListByInput({
  maxResultCount: 100,
  skipCount: 0,
});

// Create a new organization unit
const newUnit = await orgUnitService.createByInput({
  displayName: 'Engineering',
  parentId: null, // Root level
});

// Create a child unit
const childUnit = await orgUnitService.createByInput({
  displayName: 'Frontend Team',
  parentId: newUnit.id,
});

// Move an organization unit to a new parent
await orgUnitService.moveByIdAndInput(
  { newParentId: anotherUnitId },
  childUnit.id
);

// Add members to an organization unit
await orgUnitService.addMembersByIdAndInput(
  { userIds: ['user-id-1', 'user-id-2'] },
  newUnit.id
);

// Add roles to an organization unit
await orgUnitService.addRolesByIdAndInput(
  { roleIds: ['role-id-1'] },
  newUnit.id
);

// Get members of an organization unit
const members = await orgUnitService.getMembersById(
  { maxResultCount: 10, skipCount: 0 },
  newUnit.id
);

// Get roles of an organization unit
const roles = await orgUnitService.getRolesById(
  { maxResultCount: 10, skipCount: 0 },
  newUnit.id
);

// Remove a member from an organization unit
await orgUnitService.removeMemberByIdAndMemberId(newUnit.id, 'user-id-1');

// Remove a role from an organization unit
await orgUnitService.removeRoleByIdAndRoleId(newUnit.id, 'role-id-1');

// Delete an organization unit
await orgUnitService.deleteById(childUnit.id);
```

#### TreeAdapter Utility

New utility for converting flat lists into tree structures, useful for rendering organization unit hierarchies:

```tsx
import { TreeAdapter, TreeNode, BaseNode } from '@abpjs/identity-pro';

// Works with any entity implementing BaseNode interface
interface MyNode extends BaseNode {
  id: string;
  parentId: string | null;
  displayName: string;
}

// Create adapter from flat list
const units = await orgUnitService.getListByInput();
const adapter = new TreeAdapter(units.items);

// Get tree structure for rendering
const tree = adapter.getTree(); // Returns TreeNode<OrganizationUnitWithDetailsDto>[]

// Find a specific node
const node = adapter.getNodeById('some-id');

// Expand/collapse operations
adapter.expandAll();
adapter.collapseAll();
adapter.expandPathToNode('target-node-id'); // Expands all ancestors

// Get expanded keys (useful for controlled tree components)
const expandedKeys = adapter.getExpandedKeys();
adapter.setExpandedKeys(['id-1', 'id-2']);

// Handle drag-and-drop
adapter.handleDrop(droppedNode);

// Handle removal
adapter.handleRemove(nodeToRemove);

// Custom name resolver
const adapterWithResolver = new TreeAdapter(units.items, (unit) => {
  return `${unit.displayName} (${unit.memberCount} members)`;
});
```

#### User Organization Units

Users can now be assigned to organization units:

```tsx
import { IdentityService } from '@abpjs/identity-pro';

const identityService = new IdentityService(restService);

// Get organization units for a user
const userOrgUnits = await identityService.getUserOrganizationUnits(userId);

// Create/update user with organization unit assignments
await identityService.createUser({
  userName: 'john',
  email: 'john@example.com',
  password: 'SecurePassword123!',
  roleNames: ['Manager'],
  organizationUnitIds: ['org-unit-id-1', 'org-unit-id-2'], // New in v2.9.0
});
```

### New Models

| Model | Description |
|-------|-------------|
| `OrganizationUnitWithDetailsDto` | Organization unit with member/role counts |
| `OrganizationUnitCreateDto` | DTO for creating organization units |
| `OrganizationUnitUpdateDto` | DTO for updating organization units |
| `OrganizationUnitMoveInput` | Input for moving units in hierarchy |
| `OrganizationUnitRoleInput` | Input for adding roles to units |
| `OrganizationUnitUserInput` | Input for adding members to units |
| `GetOrganizationUnitInput` | Query parameters for listing units |

### New Components

Added to `eIdentityComponents`:

```tsx
import { eIdentityComponents } from '@abpjs/identity-pro';

eIdentityComponents.OrganizationUnits    // 'Identity.OrganizationUnitsComponent'
eIdentityComponents.OrganizationMembers  // 'Identity.OrganizationMembersComponent'
eIdentityComponents.OrganizationRoles    // 'Identity.OrganizationRolesComponent'
```

### New Route Names

Added to `eIdentityRouteNames`:

```tsx
import { eIdentityRouteNames } from '@abpjs/identity-pro';

eIdentityRouteNames.OrganizationUnits  // 'AbpIdentity::OrganizationUnits'
```

### State Updates

- `Identity.State.organizationUnits` - New state property for cached organization units
- `Identity.UserSaveRequest.organizationUnitIds` - Array of organization unit IDs for user assignment

---

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
