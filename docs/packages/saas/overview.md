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

### TenantService (Proxy)

Typed proxy service for tenant operations (v3.2.0+):

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getList` | `input?: GetTenantsInput` | `Promise<PagedResultDto<SaasTenantDto>>` | Get paginated tenants |
| `get` | `id: string` | `Promise<SaasTenantDto>` | Get tenant by ID |
| `create` | `input: SaasTenantCreateDto` | `Promise<SaasTenantDto>` | Create tenant |
| `update` | `id: string, input: SaasTenantUpdateDto` | `Promise<SaasTenantDto>` | Update tenant |
| `delete` | `id: string` | `Promise<void>` | Delete tenant |
| `getDefaultConnectionString` | `id: string` | `Promise<string>` | Get connection string |
| `updateDefaultConnectionString` | `id: string, connectionString: string` | `Promise<void>` | Update connection string |
| `deleteDefaultConnectionString` | `id: string` | `Promise<void>` | Delete (use shared DB) |

### EditionService (Proxy)

Typed proxy service for edition operations (v3.2.0+):

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getList` | `input?: GetEditionsInput` | `Promise<PagedResultDto<EditionDto>>` | Get paginated editions |
| `get` | `id: string` | `Promise<EditionDto>` | Get edition by ID |
| `create` | `input: EditionCreateDto` | `Promise<EditionDto>` | Create edition |
| `update` | `id: string, input: EditionUpdateDto` | `Promise<EditionDto>` | Update edition |
| `delete` | `id: string` | `Promise<void>` | Delete edition |
| `getUsageStatistics` | - | `Promise<GetEditionUsageStatisticsResult>` | Get usage stats |

### SaasService (Deprecated)

:::caution Deprecated
`SaasService` is deprecated and will be removed in v5.0. Use `TenantService` and `EditionService` instead.
:::

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

Since v3.2.0, prefer using proxy DTOs instead of the legacy `Saas` namespace types:

```tsx
import type {
  SaasTenantDto,
  SaasTenantCreateDto,
  SaasTenantUpdateDto,
  GetTenantsInput,
  EditionDto,
  EditionCreateDto,
  EditionUpdateDto,
  GetEditionsInput,
  GetEditionUsageStatisticsResult,
} from '@abpjs/saas';
```

**Proxy DTOs (recommended):**

| Type | Description |
|------|-------------|
| `SaasTenantDto` | Tenant entity (replaces `Saas.Tenant`) |
| `SaasTenantCreateDto` | Create tenant input (replaces `Saas.CreateTenantRequest`) |
| `SaasTenantUpdateDto` | Update tenant input (replaces `Saas.UpdateTenantRequest`) |
| `GetTenantsInput` | Tenant query params (replaces `Saas.TenantsQueryParams`) |
| `EditionDto` | Edition entity (replaces `Saas.Edition`) |
| `EditionCreateDto` | Create edition input (replaces `Saas.CreateEditionRequest`) |
| `EditionUpdateDto` | Update edition input (replaces `Saas.UpdateEditionRequest`) |
| `GetEditionsInput` | Edition query params (replaces `Saas.EditionsQueryParams`) |
| `GetEditionUsageStatisticsResult` | Usage statistics (replaces `Saas.UsageStatisticsResponse`) |

The legacy `Saas` namespace types are still exported for backward compatibility but are deprecated and will be removed in v5.0.

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
- [Release Notes](./release-notes) - Version history
