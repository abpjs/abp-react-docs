# Release Notes

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
