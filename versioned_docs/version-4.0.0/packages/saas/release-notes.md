# Release Notes

## v4.0.0

**February 2026**

### Breaking Changes

#### Extension contributor types now use proxy DTOs

All extension contributor types now reference `EditionDto` and `SaasTenantDto` instead of `Saas.Edition` and `Saas.Tenant`. This affects custom extension callbacks:

```tsx
// Before (v3.x)
import type { Saas } from '@abpjs/saas';

const myAction: EntityActionContributorCallback<Saas.Tenant> = (actions) => [...actions];

// After (v4.0.0)
import type { SaasTenantDto } from '@abpjs/saas';

const myAction: EntityActionContributorCallback<SaasTenantDto> = (actions) => [...actions];
```

**Affected types:**
- `SaasEntityActionContributors` — `Saas.Edition` → `EditionDto`, `Saas.Tenant` → `SaasTenantDto`
- `SaasToolbarActionContributors` — `Saas.Edition[]` → `EditionDto[]`, `Saas.Tenant[]` → `SaasTenantDto[]`
- `SaasEntityPropContributors` — same pattern
- `SaasCreateFormPropContributors` — same pattern
- `SaasEditFormPropContributors` — same pattern

### Deprecations

The following are now formally deprecated and will be removed in v5.0:

- **`SaasService`** — Use proxy services instead: `TenantService`, `EditionService`
- **All `Saas` namespace types** — Deprecation timeline extended from v4.0 to v5.0

---

## v3.2.0

**February 2026**

### New Features

#### TenantService (Proxy Service)

A new typed proxy service for tenant management operations:

```tsx
import { TenantService } from '@abpjs/saas';
import { useRestService } from '@abpjs/core';

function useTenants() {
  const restService = useRestService();
  const tenantService = new TenantService(restService);

  // Get paginated list of tenants
  const tenants = await tenantService.getList({
    filter: 'acme',
    getEditionNames: true,
    skipCount: 0,
    maxResultCount: 10,
  });

  // Get a single tenant
  const tenant = await tenantService.get(tenantId);

  // Create a new tenant
  const newTenant = await tenantService.create({
    name: 'Acme Corp',
    editionId: 'edition-id',
    adminEmailAddress: 'admin@acme.com',
    adminPassword: 'SecurePassword123!',
  });

  // Update a tenant
  const updated = await tenantService.update(tenantId, {
    name: 'Acme Corporation',
    editionId: 'new-edition-id',
  });

  // Delete a tenant
  await tenantService.delete(tenantId);

  // Connection string management
  const connStr = await tenantService.getDefaultConnectionString(tenantId);
  await tenantService.updateDefaultConnectionString(tenantId, 'Server=...;Database=TenantDb');
  await tenantService.deleteDefaultConnectionString(tenantId);
}
```

#### EditionService (Proxy Service)

A new typed proxy service for edition management operations:

```tsx
import { EditionService } from '@abpjs/saas';

const editionService = new EditionService(restService);

// Get paginated list of editions
const editions = await editionService.getList({
  filter: 'standard',
  skipCount: 0,
  maxResultCount: 10,
});

// Get a single edition
const edition = await editionService.get(editionId);

// Create a new edition
const newEdition = await editionService.create({
  displayName: 'Standard Plan',
});

// Update an edition
const updated = await editionService.update(editionId, {
  displayName: 'Premium Plan',
});

// Delete an edition
await editionService.delete(editionId);

// Get usage statistics
const stats = await editionService.getUsageStatistics();
// Returns: { data: { 'Edition1': 10, 'Edition2': 25, ... } }
```

#### New Proxy Models

Typed DTOs for all SaaS operations:

```tsx
import type {
  // Edition DTOs
  EditionDto,
  EditionCreateDto,
  EditionUpdateDto,
  EditionCreateOrUpdateDtoBase,
  GetEditionsInput,
  // Tenant DTOs
  SaasTenantDto,
  SaasTenantCreateDto,
  SaasTenantUpdateDto,
  SaasTenantCreateOrUpdateDtoBase,
  GetTenantsInput,
  // Statistics
  GetEditionUsageStatisticsResult,
} from '@abpjs/saas';

// EditionDto
interface EditionDto {
  id: string;
  displayName: string;
  concurrencyStamp?: string;
  creationTime?: string | Date;
  creatorId?: string;
  extraProperties?: Record<string, unknown>;
}

// SaasTenantDto
interface SaasTenantDto {
  id: string;
  name: string;
  editionId?: string;
  editionName?: string;
  concurrencyStamp?: string;
  creationTime?: string | Date;
  creatorId?: string;
  extraProperties?: Record<string, unknown>;
}

// SaasTenantCreateDto
interface SaasTenantCreateDto {
  name: string;
  editionId?: string;
  adminEmailAddress: string;
  adminPassword: string;
  extraProperties?: Record<string, unknown>;
}
```

#### Updated State Interface

The `Saas.State` interface now uses the new proxy DTOs:

```tsx
import type { Saas, EditionDto, SaasTenantDto } from '@abpjs/saas';
import type { PagedResultDto } from '@abpjs/core';

interface State {
  tenants: PagedResultDto<SaasTenantDto>;
  editions: PagedResultDto<EditionDto>;
  latestTenants: SaasTenantDto[];
  usageStatistics: GetEditionUsageStatisticsResult;
}
```

### Deprecations

The following legacy types are deprecated and will be removed in v5.0:

| Deprecated | Replacement |
|------------|-------------|
| `Saas.Tenant` | `SaasTenantDto` |
| `Saas.TenantsResponse` | `PagedResultDto<SaasTenantDto>` |
| `Saas.CreateTenantRequest` | `SaasTenantCreateDto` |
| `Saas.UpdateTenantRequest` | `SaasTenantUpdateDto` |
| `Saas.Edition` | `EditionDto` |
| `Saas.EditionsResponse` | `PagedResultDto<EditionDto>` |
| `Saas.CreateEditionRequest` | `EditionCreateDto` |
| `Saas.UpdateEditionRequest` | `EditionUpdateDto` |

### New Exports

**Services:**
- `TenantService` - Typed proxy service for tenant operations
- `EditionService` - Typed proxy service for edition operations

**Edition Types:**
- `EditionDto` - Edition data transfer object
- `EditionCreateDto` - DTO for creating editions
- `EditionUpdateDto` - DTO for updating editions
- `EditionCreateOrUpdateDtoBase` - Base DTO for edition operations
- `GetEditionsInput` - Input for querying editions

**Tenant Types:**
- `SaasTenantDto` - Tenant data transfer object
- `SaasTenantCreateDto` - DTO for creating tenants
- `SaasTenantUpdateDto` - DTO for updating tenants
- `SaasTenantCreateOrUpdateDtoBase` - Base DTO for tenant operations
- `GetTenantsInput` - Input for querying tenants

**Statistics Types:**
- `GetEditionUsageStatisticsResult` - Result type for usage statistics

---

## v3.1.0

**February 2026**

- Version alignment with @abpjs/core

---

## v3.0.0

**February 2026**

### Breaking Changes

#### Route Names Changes

- **`eSaasRouteNames.Administration` removed** - Use `eThemeSharedRouteNames.Administration` from `@abpjs/theme-shared` instead.

```tsx
// Before (v2.9.0)
import { eSaasRouteNames } from '@abpjs/saas';
const admin = eSaasRouteNames.Administration; // ❌ Removed

// After (v3.0.0)
import { eThemeSharedRouteNames } from '@abpjs/theme-shared';
const admin = eThemeSharedRouteNames.Administration; // ✅ Use this instead
```

### New Features

#### Route Providers

New route configuration system using `RoutesService` from `@abpjs/core`:

```tsx
import { configureRoutes, initializeSaasRoutes, SAAS_ROUTE_CONFIG } from '@abpjs/saas';
import { getRoutesService } from '@abpjs/core';

// Option 1: Use configureRoutes with RoutesService
const routes = getRoutesService();
const addRoutes = configureRoutes(routes);
addRoutes();

// Option 2: Use initializeSaasRoutes helper
initializeSaasRoutes(routes);

// Option 3: Access the route configuration directly
console.log(SAAS_ROUTE_CONFIG);
// { path: '/saas', name: 'Saas::Menu:Saas', iconClass: 'fas fa-building', ... }
```

Also available as a provider object:

```tsx
import { SAAS_ROUTE_PROVIDERS } from '@abpjs/saas';

const configure = SAAS_ROUTE_PROVIDERS.useFactory(routes);
configure();
```

#### Policy Names

New constants for permission checking:

```tsx
import { eSaasPolicyNames } from '@abpjs/saas';

// Available policies:
// eSaasPolicyNames.Saas = 'Saas.Tenants || Saas.Editions'
// eSaasPolicyNames.Tenants = 'Saas.Tenants'
// eSaasPolicyNames.Editions = 'Saas.Editions'
```

#### Config Options

New `SaasConfigOptions` interface for module extensibility configuration:

```tsx
import { SaasConfigOptions, eSaasComponents } from '@abpjs/saas';

const options: SaasConfigOptions = {
  entityActionContributors: {
    [eSaasComponents.Tenants]: [
      (actions) => [...actions, { text: 'Custom Action', icon: 'fa fa-star' }]
    ]
  },
  entityPropContributors: {
    [eSaasComponents.Tenants]: [
      (props) => [...props, { name: 'customField', displayName: 'Custom' }]
    ]
  }
};
```

#### Extensions System

New extension tokens and defaults for customizing SaaS components:

**Entity Actions** - Row-level actions in grids:

```tsx
import {
  EntityAction,
  DEFAULT_EDITIONS_ENTITY_ACTIONS,
  DEFAULT_TENANTS_ENTITY_ACTIONS,
  DEFAULT_SAAS_ENTITY_ACTIONS,
  SAAS_ENTITY_ACTION_CONTRIBUTORS,
} from '@abpjs/saas';
```

**Toolbar Actions** - Grid toolbar buttons:

```tsx
import {
  ToolbarAction,
  DEFAULT_EDITIONS_TOOLBAR_ACTIONS,
  DEFAULT_TENANTS_TOOLBAR_ACTIONS,
  DEFAULT_SAAS_TOOLBAR_ACTIONS,
  SAAS_TOOLBAR_ACTION_CONTRIBUTORS,
} from '@abpjs/saas';
```

**Entity Props** - Grid column definitions:

```tsx
import {
  EntityProp,
  DEFAULT_EDITIONS_ENTITY_PROPS,
  DEFAULT_TENANTS_ENTITY_PROPS,
  DEFAULT_SAAS_ENTITY_PROPS,
  SAAS_ENTITY_PROP_CONTRIBUTORS,
} from '@abpjs/saas';
```

**Form Props** - Create/Edit form fields:

```tsx
import {
  FormProp,
  DEFAULT_EDITIONS_CREATE_FORM_PROPS,
  DEFAULT_TENANTS_CREATE_FORM_PROPS,
  DEFAULT_SAAS_CREATE_FORM_PROPS,
  DEFAULT_EDITIONS_EDIT_FORM_PROPS,
  DEFAULT_TENANTS_EDIT_FORM_PROPS,
  DEFAULT_SAAS_EDIT_FORM_PROPS,
  SAAS_CREATE_FORM_PROP_CONTRIBUTORS,
  SAAS_EDIT_FORM_PROP_CONTRIBUTORS,
} from '@abpjs/saas';
```

#### Extensions Guard

New guard for loading extensions before route activation:

```tsx
import {
  saasExtensionsGuard,
  useSaasExtensionsGuard,
  SaasExtensionsGuard,
} from '@abpjs/saas';

// Function-based guard
const canActivate = await saasExtensionsGuard();

// React hook
function ProtectedRoute({ children }) {
  const { isLoaded, loading } = useSaasExtensionsGuard();

  if (loading) return <Loading />;
  if (!isLoaded) return <Navigate to="/unauthorized" />;

  return children;
}
```

### New Exports

**Config Subpackage:**
- `eSaasPolicyNames` - Policy name constants
- `SaasPolicyNameKey` - Type for policy name values
- `SAAS_ROUTE_CONFIG` - Default route configuration object
- `configureRoutes()` - Configure routes with custom RoutesService
- `initializeSaasRoutes()` - Initialize routes immediately
- `SAAS_ROUTE_PROVIDERS` - Route providers object

**Models:**
- `SaasConfigOptions` - Configuration options interface
- `SaasEntityActionContributors`, `SaasToolbarActionContributors` - Contributor types
- `SaasEntityPropContributors`, `SaasCreateFormPropContributors`, `SaasEditFormPropContributors`

**Tokens Subpackage:**
- `EntityAction<T>`, `ToolbarAction<T>`, `EntityProp<T>`, `FormProp<T>` - Extension interfaces
- `DEFAULT_EDITIONS_ENTITY_ACTIONS`, `DEFAULT_TENANTS_ENTITY_ACTIONS`, `DEFAULT_SAAS_ENTITY_ACTIONS`
- `DEFAULT_EDITIONS_TOOLBAR_ACTIONS`, `DEFAULT_TENANTS_TOOLBAR_ACTIONS`, `DEFAULT_SAAS_TOOLBAR_ACTIONS`
- `DEFAULT_EDITIONS_ENTITY_PROPS`, `DEFAULT_TENANTS_ENTITY_PROPS`, `DEFAULT_SAAS_ENTITY_PROPS`
- `DEFAULT_EDITIONS_CREATE_FORM_PROPS`, `DEFAULT_TENANTS_CREATE_FORM_PROPS`, `DEFAULT_SAAS_CREATE_FORM_PROPS`
- `DEFAULT_EDITIONS_EDIT_FORM_PROPS`, `DEFAULT_TENANTS_EDIT_FORM_PROPS`, `DEFAULT_SAAS_EDIT_FORM_PROPS`
- Contributor callback types: `EntityActionContributorCallback<T>`, `ToolbarActionContributorCallback<T>`, etc.
- Token symbols: `SAAS_ENTITY_ACTION_CONTRIBUTORS`, `SAAS_TOOLBAR_ACTION_CONTRIBUTORS`, etc.

**Guards Subpackage:**
- `saasExtensionsGuard()` - Async guard function
- `useSaasExtensionsGuard()` - React hook
- `SaasExtensionsGuard` - Class-based guard

---

## v2.9.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.7.0

**February 2026**

### New Features

#### Route Names

New constants for SaaS route names (localization keys):

```tsx
import { eSaasRouteNames } from '@abpjs/saas';

// Available route names:
// eSaasRouteNames.Saas = 'Saas::Menu:Saas'
// eSaasRouteNames.Tenants = 'Saas::Tenants'
// eSaasRouteNames.Editions = 'Saas::Editions'
```

> **Note:** `Administration` was removed in v3.0.0. Use `eThemeSharedRouteNames.Administration` from `@abpjs/theme-shared` instead.

### API Changes

- **`eSaasComponents`** - Changed from TypeScript `enum` to `const` object for better tree-shaking and type inference:

  ```tsx
  // Before (v2.4.0)
  enum eSaasComponents {
    Editions = 'Saas.EditionsComponent',
    // ...
  }

  // After (v2.7.0)
  const eSaasComponents = {
    Editions: 'Saas.EditionsComponent',
    // ...
  } as const;
  ```

### New Exports

- `eSaasRouteNames` - Constants for route names (localization keys)
- `SaasRouteNameKey` - Type for SaaS route name values
- `SaasComponentKey` - Type for SaaS component key values

---

## v2.4.0

**February 2026**

### New Features

- **`SaasService.apiName` property** - New property for REST API configuration. Defaults to `'default'`.

- **`eSaasComponents` enum** - New enum for component identifiers, useful for component registration and customization:

  ```tsx
  import { eSaasComponents } from '@abpjs/saas';

  // Available components:
  // eSaasComponents.Editions = 'Saas.EditionsComponent'
  // eSaasComponents.Tenants = 'Saas.TenantsComponent'
  ```

### Breaking Changes

- **`CreateTenantRequest` interface** - `adminEmailAddress` and `adminPassword` are now required fields (previously optional):

  ```tsx
  // Before (v2.2.0)
  interface CreateTenantRequest {
    name: string;
    editionId?: string;
    adminEmailAddress?: string;  // optional
    adminPassword?: string;       // optional
  }

  // After (v2.4.0)
  interface CreateTenantRequest {
    adminEmailAddress: string;   // required
    adminPassword: string;        // required
    name: string;
    editionId?: string;
  }
  ```

- **`UpdateTenantRequest` type** - Now uses `Omit<Tenant, 'editionName'>` pattern, which includes all `Tenant` fields except `editionName`:

  ```tsx
  // Before (v2.2.0)
  interface UpdateTenantRequest {
    id?: string;
    name: string;
    editionId?: string;
    concurrencyStamp?: string;
  }

  // After (v2.4.0)
  type UpdateTenantRequest = Omit<Tenant, 'editionName'>;
  // Includes: id, name, editionId, concurrencyStamp, activationState, activationEndDate, etc.
  ```

---

## v2.2.0

**February 2026**

### New Features

- **Features Modal Management** - Added built-in state management for features modal in both hooks:
  - `useEditions` hook: `visibleFeatures`, `featuresProviderKey`, `onVisibleFeaturesChange()`, `openFeaturesModal()`
  - `useTenants` hook: `visibleFeatures`, `featuresProviderKey`, `onVisibleFeaturesChange()`, `openFeaturesModal()`

---

## v2.1.1

**February 2026**

- Version alignment with @abpjs/core

---

## v2.0.0

**January 2026**

### New Features

- **`SaasStateService`** - New state service for programmatic SaaS operations:

  **Tenant Operations:**
  - `dispatchGetTenants(params?)` - Fetch tenants and update internal state
  - `dispatchGetTenantById(id)` - Fetch a single tenant by ID
  - `dispatchCreateTenant(body)` - Create a new tenant
  - `dispatchUpdateTenant(body)` - Update an existing tenant
  - `dispatchDeleteTenant(id)` - Delete a tenant
  - `dispatchGetLatestTenants()` - Fetch latest tenants (for dashboard widget)

  **Edition Operations:**
  - `dispatchGetEditions(params?)` - Fetch editions and update internal state
  - `dispatchGetEditionById(id)` - Fetch a single edition by ID
  - `dispatchCreateEdition(body)` - Create a new edition
  - `dispatchUpdateEdition(body)` - Update an existing edition
  - `dispatchDeleteEdition(id)` - Delete an edition

  **Statistics Operations:**
  - `dispatchGetUsageStatistics()` - Fetch usage statistics

  **State Getter Methods:**
  - `getTenants()` / `getTenantsTotalCount()` - Access cached tenants
  - `getLatestTenants()` - Access cached latest tenants
  - `getEditions()` / `getEditionsTotalCount()` - Access cached editions
  - `getUsageStatistics()` - Access cached usage statistics

### Example

```tsx
import { SaasStateService } from '@abpjs/saas';
import { RestService } from '@abpjs/core';

const restService = new RestService();
const stateService = new SaasStateService(restService);

// Fetch tenants
await stateService.dispatchGetTenants({ maxResultCount: 10 });
const tenants = stateService.getTenants();
console.log(`Found ${stateService.getTenantsTotalCount()} tenants`);

// Create a new tenant
await stateService.dispatchCreateTenant({
  name: 'NewTenant',
  adminEmailAddress: 'admin@newtenant.com',
  adminPassword: 'Password123!',
  editionId: 'edition-id',
});

// Fetch editions
await stateService.dispatchGetEditions();
const editions = stateService.getEditions();

// Get usage statistics
await stateService.dispatchGetUsageStatistics();
const stats = stateService.getUsageStatistics();
```

---

## v1.0.0

**January 2026**

- Version alignment with @abpjs/core v1.0.0

---

## v0.7.2 (Initial Release)

### Components

- **TenantsComponent** - Full tenant management UI with:
  - Paginated list with search and sorting
  - Create tenant with admin credentials
  - Edit tenant with edition assignment
  - Delete tenant with confirmation
  - Connection string management (shared or separate database)

- **EditionsComponent** - Edition management UI with:
  - Paginated list with sorting
  - Create/edit edition modal
  - Delete edition with confirmation
  - Usage statistics display

### Hooks

- **useTenants** - State management for tenants with:
  - `fetchTenants()` - Get paginated tenants with edition names
  - `createTenant()` - Create tenant with admin credentials
  - `updateTenant()` - Update tenant
  - `deleteTenant()` - Delete tenant
  - `getDefaultConnectionString()` - Get tenant's connection string
  - `updateDefaultConnectionString()` - Set separate database
  - `deleteDefaultConnectionString()` - Revert to shared database

- **useEditions** - State management for editions with:
  - `fetchEditions()` - Get paginated editions
  - `createEdition()` - Create edition
  - `updateEdition()` - Update edition
  - `deleteEdition()` - Delete edition
  - `fetchUsageStatistics()` - Get edition usage counts

### Services

- **SaasService** with methods for:
  - Tenant CRUD operations
  - Edition CRUD operations
  - Connection string management
  - Usage statistics

### Constants

- **SAAS_ROUTES** - Pre-configured route definitions with policies

### TypeScript

- **Saas namespace** with all types:
  - `Tenant`, `TenantsResponse`, `TenantsQueryParams`
  - `CreateTenantRequest`, `UpdateTenantRequest`
  - `Edition`, `EditionsResponse`, `EditionsQueryParams`
  - `CreateEditionRequest`, `UpdateEditionRequest`
  - `DefaultConnectionStringRequest`
  - `UsageStatisticsResponse`
  - `State` interface for state management
