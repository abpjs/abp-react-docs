---
sidebar_position: 2
---

# Tenants

The `@abpjs/tenant-management` package provides components and hooks for tenant management.

:::info New in v0.9.0
- `fetchTenants` now accepts optional `ABP.PageQueryParams` for pagination/filtering
- New constants: `TENANT_MANAGEMENT_ROUTE_PATHS`, `TENANT_MANAGEMENT_POLICIES`
:::

## useTenantManagement Hook

The `useTenantManagement` hook provides full tenant management capabilities:

```tsx
import { useTenantManagement } from '@abpjs/tenant-management';

function TenantList() {
  const {
    tenants,
    totalCount,
    loading,
    page,
    pageSize,
    setPage,
    createTenant,
    updateTenant,
    deleteTenant,
    refresh,
  } = useTenantManagement();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>{tenant.name}</td>
              <td>
                <button onClick={() => deleteTenant(tenant.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: {totalCount}</p>
    </div>
  );
}
```

## API Reference

### useTenantManagement Returns

| Property | Type | Description |
|----------|------|-------------|
| `tenants` | `Tenant[]` | List of tenants |
| `totalCount` | `number` | Total number of tenants |
| `loading` | `boolean` | Loading state |
| `page` | `number` | Current page |
| `pageSize` | `number` | Items per page |
| `setPage` | `(page: number) => void` | Set current page |
| `createTenant` | `(input: CreateTenantInput) => Promise<void>` | Create a tenant |
| `updateTenant` | `(id: string, input: UpdateTenantInput) => Promise<void>` | Update a tenant |
| `deleteTenant` | `(id: string) => Promise<void>` | Delete a tenant |
| `refresh` | `() => void` | Refresh the tenant list |
| `visibleFeatures` | `boolean` | Whether the features modal is visible (v2.2.0) |
| `featuresProviderKey` | `string` | Provider key (tenant ID) for features modal (v2.2.0) |
| `openFeaturesModal` | `(providerKey: string) => void` | Open features modal for a tenant (v2.2.0) |
| `onVisibleFeaturesChange` | `(visible: boolean) => void` | Handle features modal visibility (v2.2.0) |

### Tenant Type

```tsx
interface Tenant {
  id: string;
  name: string;
  concurrencyStamp?: string;
}
```

### CreateTenantInput Type

```tsx
interface CreateTenantInput {
  name: string;
  adminEmailAddress: string;
  adminPassword: string;
}
```

## TenantManagementModal

The modal component for creating and editing tenants:

```tsx
import { TenantManagementModal } from '@abpjs/tenant-management';
import { useState } from 'react';

function TenantManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Create Tenant</button>

      <TenantManagementModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingTenant(null);
        }}
        tenant={editingTenant}
        onSave={() => {
          setIsOpen(false);
          setEditingTenant(null);
        }}
      />
    </>
  );
}
```

### Modal Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Whether the modal is open |
| `onClose` | `() => void` | Yes | Called when modal closes |
| `tenant` | `Tenant \| null` | No | Tenant to edit (null for create) |
| `onSave` | `() => void` | No | Called after save |
| `onVisibleFeaturesChange` | `(visible: boolean) => void` | No | Called when features modal visibility changes (v2.0.0) |

## Creating a Tenant

```tsx
import { useTenantManagement } from '@abpjs/tenant-management';
import { useToaster } from '@abpjs/theme-shared';

function CreateTenantForm() {
  const { createTenant } = useTenantManagement();
  const toaster = useToaster();

  const handleCreate = async () => {
    try {
      await createTenant({
        name: 'NewTenant',
        adminEmailAddress: 'admin@newtenant.com',
        adminPassword: 'Password123!',
      });
      toaster.success('Tenant created successfully!');
    } catch (error) {
      toaster.error('Failed to create tenant');
    }
  };

  // ...
}
```

## Using TenantService

For direct API access (v3.2.0+):

```tsx
import { TenantService } from '@abpjs/tenant-management';
import { useRestService } from '@abpjs/core';

const restService = useRestService();
const tenantService = new TenantService(restService);

// Get all tenants
const result = await tenantService.getList({
  filter: '',
  skipCount: 0,
  maxResultCount: 10,
});

// Get a single tenant
const tenant = await tenantService.get('tenant-id');

// Create a tenant
await tenantService.create({
  name: 'NewTenant',
  adminEmailAddress: 'admin@newtenant.com',
  adminPassword: 'Password123!',
});

// Update a tenant
await tenantService.update('tenant-id', { name: 'Updated Name' });

// Delete a tenant
await tenantService.delete('tenant-id');
```

## Related

- [Session](../core/session) - Session management
- [Release Notes](./release-notes) - Version history
