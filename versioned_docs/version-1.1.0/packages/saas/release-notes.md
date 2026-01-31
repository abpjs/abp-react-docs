# Release Notes

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
