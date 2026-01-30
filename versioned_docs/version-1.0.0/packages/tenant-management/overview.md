---
sidebar_position: 1
---

# Overview

The `@abpjs/tenant-management` package provides components for managing tenants in a multi-tenant SaaS application.

[![npm version](https://img.shields.io/npm/v/@abpjs/tenant-management.svg)](https://www.npmjs.com/package/@abpjs/tenant-management)

## Installation

```bash
npm install @abpjs/tenant-management
```

**Required peer dependencies:**
```bash
npm install @abpjs/core @abpjs/theme-shared
```

## Features

- **Tenant CRUD** - Create, read, update, and delete tenants
- **Connection Strings** - Manage per-tenant database connections
- **Feature Management** - Enable/disable features per tenant

## Main Exports

### Components

| Component | Description |
|-----------|-------------|
| `TenantManagementModal` | Modal for creating and editing tenants |

### Hooks

| Hook | Description |
|------|-------------|
| `useTenantManagement` | Full tenant management operations |

### Services

| Service | Description |
|---------|-------------|
| `TenantManagementService` | Direct API interaction |

## Required Permissions

| Permission | Description |
|------------|-------------|
| `AbpTenantManagement.Tenants` | View tenants |
| `AbpTenantManagement.Tenants.Create` | Create tenants |
| `AbpTenantManagement.Tenants.Update` | Update tenants |
| `AbpTenantManagement.Tenants.Delete` | Delete tenants |
| `AbpTenantManagement.Tenants.ManageFeatures` | Manage tenant features |
| `AbpTenantManagement.Tenants.ManageConnectionStrings` | Manage connection strings |

## Quick Example

```tsx
import { useTenantManagement, TenantManagementModal } from '@abpjs/tenant-management';
import { useState } from 'react';

function TenantManagementPage() {
  const { tenants, loading, createTenant, deleteTenant } = useTenantManagement();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Create Tenant</button>

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
                <button onClick={() => deleteTenant(tenant.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TenantManagementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => setIsModalOpen(false)}
      />
    </div>
  );
}
```

## NPM Package

View on npm: [@abpjs/tenant-management](https://www.npmjs.com/package/@abpjs/tenant-management)

## Documentation

- [Tenants](/docs/packages/tenant-management/tenants) - Tenant management operations
