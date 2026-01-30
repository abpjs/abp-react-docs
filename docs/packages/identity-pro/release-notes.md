# Release Notes

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
