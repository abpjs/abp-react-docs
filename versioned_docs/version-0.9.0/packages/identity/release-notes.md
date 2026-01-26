---
sidebar_position: 99
---

# Release Notes

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
