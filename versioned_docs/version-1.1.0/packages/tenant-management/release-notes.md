---
sidebar_position: 99
---

# Release Notes

## v1.1.0

**January 2026**

### New Features

- **`TenantManagementStateService`** - New state service for managing tenant state:
  - `get()` - Get all tenants
  - `getTenantsTotalCount()` - Get total tenant count
  - `subscribe()` - Subscribe to state changes
  - `reset()` - Reset state to initial values
- **`getTenantManagementStateService()`** - Get singleton instance of the state service
- **`ModalContentType` type** - Exported type for modal content (`'saveConnStr'` | `'saveTenant'`)

### Hook Enhancements

- **`isDisabledSaveButton`** - Computed property that returns `true` when save should be disabled (connection string required but empty)
- **`onSharedDatabaseChange()`** - Handler for shared database checkbox that auto-clears connection string

---

## v1.0.0

**January 2026**

### New Features

- **Sorting support in `useTenantManagement`** - New sorting state and methods:
  - `sortKey` - Current sort field (default: `'name'`)
  - `sortOrder` - Sort direction (`'asc'` | `'desc'` | `''`)
  - `setSortKey()` - Update sort field
  - `setSortOrder()` - Update sort direction
- **`SortOrder` type** - Exported type for sort order values

---

## v0.9.0

**January 2026**

### New Features

- **`TENANT_MANAGEMENT_ROUTES`** - Route constant (format: `{ routes: ABP.FullRoute[] }`)
- **`TENANT_MANAGEMENT_ROUTE_PATHS`** - Path constants (BASE, TENANTS)
- **`TENANT_MANAGEMENT_POLICIES`** - Policy name constants
- **`fetchTenants` pagination** - Now accepts optional `ABP.PageQueryParams`
- **`totalCount` in hook** - Returns total count for pagination

---

## v0.8.0

**January 2026**

- Version alignment with @abpjs/core

---

## v0.7.6

**January 2026** - Initial Release

- TenantManagementModal component
- useTenantManagement hook with CRUD operations
- Connection string management
