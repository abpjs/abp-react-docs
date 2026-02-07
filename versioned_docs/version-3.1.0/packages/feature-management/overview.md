---
sidebar_position: 1
---

# Overview

The `@abpjs/feature-management` package provides a feature management interface for administrators to manage features for tenants and other entities. This is the React equivalent of Angular's `@abp/ng.feature-management` module.

[![npm version](https://img.shields.io/npm/v/@abpjs/feature-management.svg)](https://www.npmjs.com/package/@abpjs/feature-management)

:::info New in v0.8.0
This package was introduced in ABP React v0.8.0.
:::

## Installation

```bash
npm install @abpjs/feature-management
```

**Required peer dependencies:**
```bash
npm install @abpjs/core @abpjs/theme-shared
```

## What are Features?

In ABP Framework, **Features** are a way to enable/disable or configure functionality for tenants in a multi-tenant application. Common use cases include:

- Enabling/disabling modules per tenant
- Setting limits (e.g., max users, storage quota)
- Configuring tenant-specific settings

## Features

- **Feature Modal** - Ready-to-use modal for managing features
- **Toggle Features** - Boolean on/off features
- **Text Features** - Free text input features
- **Provider Support** - Manage features for tenants and other entities

## Main Exports

### Components

| Component | Description |
|-----------|-------------|
| `FeatureManagementModal` | Modal for managing features |

### Hooks

| Hook | Description |
|------|-------------|
| `useFeatureManagement` | Hook for programmatic feature management |

### Services

| Service | Description |
|---------|-------------|
| `FeatureManagementService` | Direct API interaction |

### Models

| Model | Description |
|-------|-------------|
| `FeatureManagement.Feature` | Feature definition |
| `FeatureManagement.Provider` | Provider info (name and key) |
| `FeatureManagement.ValueType` | Feature value type definition |

## Feature Providers

| Provider | Key | Description |
|----------|-----|-------------|
| `T` | Tenant ID | Features for a tenant |

## Quick Example

```tsx
import { FeatureManagementModal } from '@abpjs/feature-management';
import { useState } from 'react';

function TenantFeatures({ tenantId }: { tenantId: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button onClick={() => setVisible(true)}>
        Manage Features
      </button>

      <FeatureManagementModal
        providerName="T"
        providerKey={tenantId}
        visible={visible}
        onVisibleChange={setVisible}
        onSave={() => console.log('Features saved!')}
      />
    </>
  );
}
```

## Integration with Tenant Management

The feature management modal is commonly used alongside tenant management to configure tenant-specific features:

```tsx
import { FeatureManagementModal } from '@abpjs/feature-management';
import { usePermission } from '@abpjs/core';

function TenantActions({ tenant }) {
  const [showFeatures, setShowFeatures] = useState(false);
  const { hasPermission } = usePermission();

  // Check if user can manage features
  const canManageFeatures = hasPermission(
    'AbpTenantManagement.Tenants.ManageFeatures'
  );

  return (
    <>
      {canManageFeatures && (
        <button onClick={() => setShowFeatures(true)}>
          Features
        </button>
      )}

      <FeatureManagementModal
        providerName="T"
        providerKey={tenant.id}
        visible={showFeatures}
        onVisibleChange={setShowFeatures}
      />
    </>
  );
}
```

## NPM Package

View on npm: [@abpjs/feature-management](https://www.npmjs.com/package/@abpjs/feature-management)

## Documentation

- [Feature Modal](./modal) - Using the feature modal
- [Release Notes](./release-notes) - Version history
