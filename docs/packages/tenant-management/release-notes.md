---
sidebar_position: 99
---

# Release Notes

## v3.0.0

**February 2026**

### Breaking Changes

#### `eTenantManagementRouteNames.Administration` removed

The `Administration` key has been removed from `eTenantManagementRouteNames`. Use `eThemeSharedRouteNames.Administration` from `@abpjs/theme-shared` instead:

```tsx
// Before (v2.7.0)
import { eTenantManagementRouteNames } from '@abpjs/tenant-management';
const adminRoute = eTenantManagementRouteNames.Administration;

// After (v3.0.0)
import { eThemeSharedRouteNames } from '@abpjs/theme-shared';
const adminRoute = eThemeSharedRouteNames.Administration;
```

### New Features

#### Route Providers

New route provider system for initializing tenant management routes:

```tsx
import { initializeTenantManagementRoutes } from '@abpjs/tenant-management';

// Call once during app initialization
initializeTenantManagementRoutes();

// This registers:
// - Tenant Management (under Administration)
// - /tenant-management/tenants
```

For advanced configuration with a custom RoutesService:

```tsx
import { configureRoutes, TENANT_MANAGEMENT_ROUTE_PROVIDERS } from '@abpjs/tenant-management';
import { getRoutesService } from '@abpjs/core';

const routesService = getRoutesService();
const addRoutes = configureRoutes(routesService);
addRoutes();
```

#### Policy Names

New constants for tenant management permission policies:

```tsx
import { eTenantManagementPolicyNames } from '@abpjs/tenant-management';

// Available policies:
eTenantManagementPolicyNames.TenantManagement  // 'AbpTenantManagement.Tenants'
eTenantManagementPolicyNames.Tenants           // 'AbpTenantManagement.Tenants'

// Use with permission checking
import { usePermission } from '@abpjs/core';

function TenantMenu() {
  const canManageTenants = usePermission(eTenantManagementPolicyNames.TenantManagement);

  if (!canManageTenants) return null;
  return <TenantManagementLink />;
}
```

#### Config Subpackage

The `@abp/ng.tenant-management/config` functionality is now merged into the main package:

```tsx
// All config exports are available from the main package
import {
  configureRoutes,
  TENANT_MANAGEMENT_ROUTE_PROVIDERS,
  initializeTenantManagementRoutes,
  eTenantManagementRouteNames,
  eTenantManagementPolicyNames,
} from '@abpjs/tenant-management';
```

### New Exports

- `initializeTenantManagementRoutes()` - Initialize tenant management routes
- `configureRoutes(routes)` - Configure routes with custom RoutesService
- `TENANT_MANAGEMENT_ROUTE_PROVIDERS` - Route provider configuration object
- `eTenantManagementPolicyNames` - Constants for tenant management permission policies
- `TenantManagementPolicyNameKey` - Type for policy name values

---

## v2.9.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.7.0

**February 2026**

### New Features

#### Component Replacement Keys

New constants for replacing tenant management components:

```tsx
import { eTenantManagementComponents } from '@abpjs/tenant-management';

// Available component keys:
// eTenantManagementComponents.Tenants = 'TenantManagement.TenantsComponent'
```

#### Route Names

New constants for tenant management route names (localization keys):

```tsx
import { eTenantManagementRouteNames } from '@abpjs/tenant-management';

// Available route names:
// eTenantManagementRouteNames.TenantManagement = 'AbpTenantManagement::Menu:TenantManagement'
// eTenantManagementRouteNames.Tenants = 'AbpTenantManagement::Tenants'
```

### New Exports

- `eTenantManagementComponents` - Constants for component replacement keys
- `TenantManagementComponentKey` - Type for tenant management component key values
- `eTenantManagementRouteNames` - Constants for route names (localization keys)
- `TenantManagementRouteNameKey` - Type for tenant management route name values

---

## v2.4.0

**February 2026**

### New Features

- **`TenantManagementService.apiName` property** - New property for REST API configuration. Defaults to `'default'`.

- **Admin credentials for new tenants** - When creating a new tenant, you must now provide admin credentials:

  ```tsx
  import { useTenantManagement } from '@abpjs/tenant-management';

  function CreateTenantExample() {
    const { createTenant } = useTenantManagement();

    const handleCreate = async () => {
      await createTenant({
        name: 'New Tenant',
        adminEmailAddress: 'admin@newtenant.com',
        adminPassword: 'SecurePassword123!',
      });
    };
  }
  ```

  The `TenantManagementModal` component automatically displays admin email and password fields when creating new tenants.

### Breaking Changes

- **`AddRequest` interface** - Now requires `adminEmailAddress` and `adminPassword` fields:

  ```tsx
  // Before (v2.2.0)
  interface AddRequest {
    name: string;
  }

  // After (v2.4.0)
  interface AddRequest {
    name: string;
    adminEmailAddress: string;
    adminPassword: string;
  }
  ```

- **`UpdateRequest` interface** - No longer extends `AddRequest`. Now only requires `id` and `name`:

  ```tsx
  // Before (v2.2.0)
  interface UpdateRequest extends AddRequest {
    id: string;
  }

  // After (v2.4.0)
  interface UpdateRequest {
    id: string;
    name: string;
  }
  ```

---

## v2.2.0

**February 2026**

### New Features

- **Features Modal Support in `useTenantManagement`** - New state and methods for managing the features modal:
  - `visibleFeatures` - Whether the features modal is visible
  - `featuresProviderKey` - Provider key (tenant ID) for the features modal
  - `openFeaturesModal(providerKey)` - Open the features modal for a specific tenant
  - `onVisibleFeaturesChange(visible)` - Handle features modal visibility changes

### Example

```tsx
import { useTenantManagement } from '@abpjs/tenant-management';
import { FeatureManagementModal } from '@abpjs/feature-management';

function TenantsWithFeatures() {
  const {
    tenants,
    visibleFeatures,
    featuresProviderKey,
    openFeaturesModal,
    onVisibleFeaturesChange,
  } = useTenantManagement();

  return (
    <>
      {tenants.map((tenant) => (
        <div key={tenant.id}>
          <span>{tenant.name}</span>
          <button onClick={() => openFeaturesModal(tenant.id)}>
            Manage Features
          </button>
        </div>
      ))}

      <FeatureManagementModal
        isOpen={visibleFeatures}
        onClose={() => onVisibleFeaturesChange(false)}
        providerName="T"
        providerKey={featuresProviderKey}
      />
    </>
  );
}
```

---

## v2.1.0

**February 2026**

- Version alignment with @abpjs/core

---

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
