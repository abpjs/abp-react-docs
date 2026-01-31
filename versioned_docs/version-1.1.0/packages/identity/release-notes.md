---
sidebar_position: 99
---

# Release Notes

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
