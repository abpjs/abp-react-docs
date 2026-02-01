# SaaS Module

The `@abpjs/saas` package provides tenant and edition management components for multi-tenant ABP React applications. This is the React equivalent of Angular's `@volo/abp.ng.saas` module.

:::info ABP Commercial License Required
This package is free to use but requires the corresponding backend module from [ABP Commercial](https://commercial.abp.io/). You can purchase an ABP Commercial license from [abp.io](https://abp.io/pricing).
:::

## Installation

```bash
npm install @abpjs/saas
# or
yarn add @abpjs/saas
```

## Features

- **Tenant Management** - Create, edit, delete tenants with edition assignment
- **Edition Management** - Define and manage subscription editions
- **Connection Strings** - Configure per-tenant database connections
- **Usage Statistics** - View edition usage across tenants
- **Shared/Separate Database** - Support for both database strategies

## Components

### TenantsComponent

Full-featured tenant management UI with CRUD operations and connection string management.

```tsx
import { TenantsComponent } from '@abpjs/saas';

function TenantsPage() {
  return <TenantsComponent />;
}
```

**Features:**
- Paginated tenant list with search and sorting
- Create tenant with admin credentials
- Edit tenant with edition assignment
- Delete tenant with confirmation
- Connection string management (shared or separate database)
- Feature management integration

### EditionsComponent

Edition management interface for defining subscription tiers.

```tsx
import { EditionsComponent } from '@abpjs/saas';

function EditionsPage() {
  return <EditionsComponent />;
}
```

**Features:**
- Paginated edition list with sorting
- Create/edit edition modal
- Delete edition with confirmation
- Usage statistics display
- Feature management integration

## Hooks

### useTenants

Hook for managing tenants state and operations.

```tsx
import { useTenants } from '@abpjs/saas';

function MyTenantsComponent() {
  const {
    tenants,
    totalCount,
    isLoading,
    fetchTenants,
    createTenant,
    updateTenant,
    deleteTenant,
    getDefaultConnectionString,
    updateDefaultConnectionString,
    deleteDefaultConnectionString,
  } = useTenants();

  useEffect(() => {
    fetchTenants({ getEditionNames: true });
  }, [fetchTenants]);

  const handleCreate = async (data) => {
    const result = await createTenant({
      name: data.name,
      editionId: data.editionId,
      adminEmailAddress: data.adminEmail,
      adminPassword: data.adminPassword,
    });
    if (result.success) {
      fetchTenants();
    }
  };
}
```

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `tenants` | `Tenant[]` | List of tenants |
| `totalCount` | `number` | Total tenant count |
| `selectedTenant` | `Tenant \| null` | Selected tenant |
| `isLoading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message |
| `defaultConnectionString` | `string` | Connection string for selected tenant |
| `useSharedDatabase` | `boolean` | Whether tenant uses shared database |
| `fetchTenants` | `(params?) => Promise<Result>` | Fetch tenants |
| `getTenantById` | `(id) => Promise<Result>` | Get tenant by ID |
| `createTenant` | `(data) => Promise<Result>` | Create tenant |
| `updateTenant` | `(data) => Promise<Result>` | Update tenant |
| `deleteTenant` | `(id) => Promise<Result>` | Delete tenant |
| `getDefaultConnectionString` | `(id) => Promise<Result>` | Get connection string |
| `updateDefaultConnectionString` | `(payload) => Promise<Result>` | Update connection string |
| `deleteDefaultConnectionString` | `(id) => Promise<Result>` | Delete connection string |
| `visibleFeatures` | `boolean` | Whether features modal is visible |
| `featuresProviderKey` | `string` | Provider key for features modal |
| `onVisibleFeaturesChange` | `(value: boolean) => void` | Handle features modal visibility |
| `openFeaturesModal` | `(providerKey: string) => void` | Open features modal for a tenant |

### useEditions

Hook for managing editions state and operations.

```tsx
import { useEditions } from '@abpjs/saas';

function MyEditionsComponent() {
  const {
    editions,
    totalCount,
    usageStatistics,
    isLoading,
    fetchEditions,
    fetchUsageStatistics,
    createEdition,
    updateEdition,
    deleteEdition,
  } = useEditions();

  useEffect(() => {
    fetchEditions();
    fetchUsageStatistics();
  }, [fetchEditions, fetchUsageStatistics]);
}
```

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `editions` | `Edition[]` | List of editions |
| `totalCount` | `number` | Total edition count |
| `selectedEdition` | `Edition \| null` | Selected edition |
| `isLoading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message |
| `usageStatistics` | `Record<string, number>` | Usage stats by edition |
| `fetchEditions` | `(params?) => Promise<Result>` | Fetch editions |
| `getEditionById` | `(id) => Promise<Result>` | Get edition by ID |
| `createEdition` | `(data) => Promise<Result>` | Create edition |
| `updateEdition` | `(data) => Promise<Result>` | Update edition |
| `deleteEdition` | `(id) => Promise<Result>` | Delete edition |
| `fetchUsageStatistics` | `() => Promise<Result>` | Fetch usage stats |
| `visibleFeatures` | `boolean` | Whether features modal is visible |
| `featuresProviderKey` | `string` | Provider key for features modal |
| `onVisibleFeaturesChange` | `(value: boolean) => void` | Handle features modal visibility |
| `openFeaturesModal` | `(providerKey: string) => void` | Open features modal for an edition |

## Services

### SaasService

Service class for SaaS-related API operations.

**Tenant Methods:**

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getTenants` | `params?: TenantsQueryParams` | `Promise<TenantsResponse>` | Get paginated tenants |
| `getTenantById` | `id: string` | `Promise<Tenant>` | Get tenant by ID |
| `createTenant` | `body: CreateTenantRequest` | `Promise<Tenant>` | Create tenant |
| `updateTenant` | `body: UpdateTenantRequest` | `Promise<Tenant>` | Update tenant |
| `deleteTenant` | `id: string` | `Promise<void>` | Delete tenant |

**Connection String Methods:**

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getDefaultConnectionString` | `id: string` | `Promise<string>` | Get connection string |
| `updateDefaultConnectionString` | `payload: DefaultConnectionStringRequest` | `Promise<void>` | Update connection string |
| `deleteDefaultConnectionString` | `id: string` | `Promise<void>` | Delete (use shared DB) |

**Edition Methods:**

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getEditions` | `params?: EditionsQueryParams` | `Promise<EditionsResponse>` | Get paginated editions |
| `getEditionById` | `id: string` | `Promise<Edition>` | Get edition by ID |
| `createEdition` | `body: CreateEditionRequest` | `Promise<Edition>` | Create edition |
| `updateEdition` | `body: UpdateEditionRequest` | `Promise<Edition>` | Update edition |
| `deleteEdition` | `id: string` | `Promise<void>` | Delete edition |
| `getUsageStatistics` | - | `Promise<UsageStatisticsResponse>` | Get usage stats |

## Routes

The package provides pre-configured routes:

```tsx
import { SAAS_ROUTES } from '@abpjs/saas';

// Route structure:
// /saas
//   /saas/tenants   (requires Saas.Tenants policy)
//   /saas/editions  (requires Saas.Editions policy)
```

## TypeScript Support

The package exports all TypeScript interfaces under the `Saas` namespace:

```tsx
import { Saas } from '@abpjs/saas';

// Types
const tenant: Saas.Tenant = {
  id: '...',
  name: 'MyTenant',
  editionId: '...',
  editionName: 'Standard',
};

const edition: Saas.Edition = {
  id: '...',
  displayName: 'Standard Edition',
};

// Request types
const createTenant: Saas.CreateTenantRequest = {
  name: 'NewTenant',
  editionId: '...',
  adminEmailAddress: 'admin@tenant.com',
  adminPassword: 'SecurePassword123!',
};

// Query types
const query: Saas.TenantsQueryParams = {
  filter: 'searchTerm',
  editionId: '...',
  getEditionNames: true,
  maxResultCount: 10,
  skipCount: 0,
};
```

**Key Types:**

| Type | Description |
|------|-------------|
| `Tenant` | Tenant entity with id, name, editionId, editionName |
| `Edition` | Edition entity with id, displayName |
| `CreateTenantRequest` | Input for creating tenant with admin credentials |
| `UpdateTenantRequest` | Input for updating tenant |
| `CreateEditionRequest` | Input for creating edition |
| `UpdateEditionRequest` | Input for updating edition |
| `TenantsQueryParams` | Query params with filter, editionId, getEditionNames |
| `EditionsQueryParams` | Query params with filter |
| `DefaultConnectionStringRequest` | Connection string update payload |

## Dependencies

- `@abpjs/core` - Core ABP React functionality

## Comparison with @abpjs/tenant-management

| Feature | @abpjs/tenant-management | @abpjs/saas |
|---------|-------------------------|-------------|
| Tenant CRUD | ✓ | ✓ |
| Features | ✓ | ✓ |
| Editions | ✗ | ✓ |
| Connection Strings | ✗ | ✓ |
| Usage Statistics | ✗ | ✓ |
| Admin Credentials | ✗ | ✓ |

Use `@abpjs/saas` for full SaaS functionality with editions and per-tenant databases. Use `@abpjs/tenant-management` for basic multi-tenancy without editions.

## See Also

- [Core Module](../core/overview)
- [Tenant Management](../tenant-management/overview)
- [Feature Management](../feature-management/overview)
