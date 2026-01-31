---
sidebar_position: 99
---

# Release Notes

## v2.0.0

**January 2026**

### Breaking Changes

- **`TENANT_MANAGEMENT_ROUTES` removed** - This constant has been removed. Use `TENANT_MANAGEMENT_ROUTE_PATHS` and `TENANT_MANAGEMENT_POLICIES` instead for route configuration.

### New Features

- **`TenantManagementStateService` dispatch methods** - Added programmatic dispatch methods:
  - `dispatchGetTenants(params?)` - Fetch tenants from API and update state
  - `dispatchGetTenantById(id)` - Fetch a single tenant by ID
  - `dispatchCreateTenant(body)` - Create a new tenant
  - `dispatchUpdateTenant(body)` - Update an existing tenant
  - `dispatchDeleteTenant(id)` - Delete a tenant

- **`onVisibleFeaturesChange` prop** - New callback prop on `TenantManagementModal` to handle features modal visibility changes

- **Component Interface Types** - Added TypeScript interfaces for component inputs/outputs:
  - `TenantManagement.TenantsComponentInputs`
  - `TenantManagement.TenantsComponentOutputs`

### Type Improvements

- **`onSearch` callback** - Updated signature from `(value: any) => void` to `(value: string) => void`
- **`onPageChange` callback** - Updated signature from `(data: any) => void` to `(page: number) => void`

---

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
