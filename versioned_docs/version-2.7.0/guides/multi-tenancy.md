---
sidebar_position: 1
---

# Multi-Tenancy

This guide covers implementing multi-tenancy in your ABP React application.

## What is Multi-Tenancy?

Multi-tenancy allows a single application to serve multiple customers (tenants), each with their own isolated data and configuration. ABP Framework provides built-in multi-tenancy support that ABP React integrates with.

## Setting Up Multi-Tenancy

### 1. Enable Multi-Tenancy in ABP Backend

Ensure your ABP backend has multi-tenancy enabled in `appsettings.json`:

```json
{
  "MultiTenancy": {
    "IsEnabled": true
  }
}
```

### 2. Add Tenant Switching to Login

Include the `TenantBox` component on your login page:

```tsx
import { TenantBox, LoginForm } from '@abpjs/account';
import { Box, Container, Divider, VStack } from '@chakra-ui/react';

function LoginPage() {
  return (
    <Container maxW="md" py={10}>
      <VStack spacing={6}>
        <Box w="full">
          <TenantBox />
        </Box>
        <Divider />
        <Box w="full" bg="white" p={8} borderRadius="lg" boxShadow="md">
          <LoginForm onSuccess={() => {}} />
        </Box>
      </VStack>
    </Container>
  );
}
```

### 3. Display Current Tenant

Show the current tenant in your application:

```tsx
import { useConfig } from '@abpjs/core';

function TenantInfo() {
  const { currentTenant } = useConfig();

  return (
    <div>
      {currentTenant ? (
        <span>Tenant: {currentTenant.name}</span>
      ) : (
        <span>Host</span>
      )}
    </div>
  );
}
```

## Managing Tenants

### Tenant Management Page

Use the `useTenantManagement` hook to create a tenant management page:

```tsx
import { useTenantManagement, TenantManagementModal } from '@abpjs/tenant-management';
import { usePermission } from '@abpjs/core';
import { useConfirmation, useToaster } from '@abpjs/theme-shared';
import { useState } from 'react';

function TenantManagementPage() {
  const { tenants, loading, deleteTenant, refresh } = useTenantManagement();
  const { hasPermission } = usePermission();
  const confirmation = useConfirmation();
  const toaster = useToaster();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);

  const handleDelete = async (tenant) => {
    const confirmed = await confirmation.warn({
      title: 'Delete Tenant',
      message: `Are you sure you want to delete "${tenant.name}"?`,
    });

    if (confirmed) {
      try {
        await deleteTenant(tenant.id);
        toaster.success('Tenant deleted');
      } catch (error) {
        toaster.error('Failed to delete tenant');
      }
    }
  };

  return (
    <div>
      <h1>Tenant Management</h1>

      {hasPermission('AbpTenantManagement.Tenants.Create') && (
        <button onClick={() => setIsModalOpen(true)}>Create Tenant</button>
      )}

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
                {hasPermission('AbpTenantManagement.Tenants.Update') && (
                  <button onClick={() => {
                    setEditingTenant(tenant);
                    setIsModalOpen(true);
                  }}>
                    Edit
                  </button>
                )}
                {hasPermission('AbpTenantManagement.Tenants.Delete') && (
                  <button onClick={() => handleDelete(tenant)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TenantManagementModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTenant(null);
        }}
        tenant={editingTenant}
        onSave={() => {
          setIsModalOpen(false);
          setEditingTenant(null);
          refresh();
        }}
      />
    </div>
  );
}
```

## Programmatic Tenant Switching

Switch tenants programmatically using the session:

```tsx
import { useSession } from '@abpjs/core';

function TenantSwitcher() {
  const { setSession } = useSession();

  const switchToTenant = (tenantId: string | null) => {
    setSession({ tenantId });
    window.location.reload(); // Reload to fetch new configuration
  };

  return (
    <div>
      <button onClick={() => switchToTenant(null)}>Switch to Host</button>
      <button onClick={() => switchToTenant('tenant-1-id')}>Switch to Tenant 1</button>
    </div>
  );
}
```

## Tenant Resolution

ABP Framework resolves the current tenant using these strategies (in order):

1. **Header** - `__tenant` header
2. **Query String** - `__tenant` parameter
3. **Cookie** - Tenant cookie
4. **Route** - Subdomain or route parameter

ABP React automatically includes the tenant header in API requests through the REST service.

## Tenant-Specific Data

All API requests made through `RestService` automatically include the current tenant:

```tsx
import { RestService } from '@abpjs/core';

// This request will be scoped to the current tenant
const data = await RestService.get('/api/my-endpoint');
```

## Host vs Tenant

- **Host**: The main application administrator who can manage all tenants
- **Tenant**: An isolated customer with their own data

Check if the current user is in host context:

```tsx
import { useConfig } from '@abpjs/core';

function HostOnlyFeature() {
  const { currentTenant } = useConfig();

  // currentTenant is null when in host context
  if (currentTenant) {
    return null; // Not visible to tenants
  }

  return <div>Host-only feature</div>;
}
```

## Related

- [Tenant Management](/docs/packages/tenant-management/overview) - Tenant management package
- [Tenant Box](/docs/packages/account/tenant-box) - Tenant switching component
- [Session](/docs/packages/core/session) - Session management
