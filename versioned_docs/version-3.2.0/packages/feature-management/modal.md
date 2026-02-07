---
sidebar_position: 2
---

# Feature Modal

The `FeatureManagementModal` component provides a ready-to-use modal for managing features of tenants and other entities.

:::info New in v0.8.0
This component was introduced in ABP React v0.8.0.
:::

## Basic Usage

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
      />
    </>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `providerName` | `string` | Yes | Provider name (e.g., `"T"` for Tenant) |
| `providerKey` | `string` | Yes | Provider key (e.g., tenant ID) |
| `visible` | `boolean` | Yes | Whether the modal is visible |
| `onVisibleChange` | `(visible: boolean) => void` | No | Callback when visibility changes |
| `onSave` | `() => void` | No | Callback fired when features are saved |

## Provider Names

| Provider | Name | Key | Description |
|----------|------|-----|-------------|
| Tenant | `T` | Tenant ID | Manage features for a specific tenant |

## With Save Callback

```tsx
import { FeatureManagementModal } from '@abpjs/feature-management';
import { useToast } from '@chakra-ui/react';

function TenantFeatures({ tenantId }) {
  const [visible, setVisible] = useState(false);
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: 'Features saved',
      description: 'Tenant features have been updated successfully.',
      status: 'success',
    });
  };

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
        onSave={handleSave}
      />
    </>
  );
}
```

## Using the Hook Directly

For more control, use the `useFeatureManagement` hook directly:

```tsx
import { useFeatureManagement } from '@abpjs/feature-management';
import { useEffect } from 'react';

function CustomFeatureManager({ tenantId }) {
  const {
    features,
    isLoading,
    error,
    fetchFeatures,
    saveFeatures,
    updateFeatureValue,
    getFeatureValue,
    isFeatureEnabled,
    reset,
  } = useFeatureManagement();

  useEffect(() => {
    fetchFeatures(tenantId, 'T');
  }, [tenantId]);

  const handleToggle = (featureName: string) => {
    const current = isFeatureEnabled(featureName);
    updateFeatureValue(featureName, current ? 'false' : 'true');
  };

  const handleSave = async () => {
    const result = await saveFeatures(tenantId, 'T');
    if (result.success) {
      console.log('Saved!');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {features.map((feature) => (
        <div key={feature.name}>
          <label>
            <input
              type="checkbox"
              checked={isFeatureEnabled(feature.name)}
              onChange={() => handleToggle(feature.name)}
            />
            {feature.name}
          </label>
        </div>
      ))}
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
```

## Hook API Reference

### useFeatureManagement Returns

| Property | Type | Description |
|----------|------|-------------|
| `features` | `Feature[]` | Array of features |
| `featureValues` | `Record<string, string>` | Current feature values |
| `isLoading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message if any |
| `fetchFeatures` | `(key, name) => Promise` | Fetch features from server |
| `saveFeatures` | `(key, name) => Promise` | Save features to server |
| `updateFeatureValue` | `(name, value) => void` | Update feature value locally |
| `getFeatureValue` | `(name) => string` | Get current feature value |
| `isFeatureEnabled` | `(name) => boolean` | Check if toggle feature is enabled |
| `reset` | `() => void` | Reset all state |

## Feature Value Types

The modal automatically renders the appropriate input based on the feature's value type:

| Value Type | Input | Description |
|------------|-------|-------------|
| `ToggleStringValueType` | Checkbox | Boolean on/off features |
| `FreeTextStringValueType` | Text input | Free text input features |
| Default | Text input | Any other type |

## Integration Example

Here's a complete example integrating feature management into a tenant management page:

```tsx
import { useState } from 'react';
import { usePermission } from '@abpjs/core';
import { FeatureManagementModal } from '@abpjs/feature-management';

interface Tenant {
  id: string;
  name: string;
}

function TenantTable({ tenants }: { tenants: Tenant[] }) {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showFeatures, setShowFeatures] = useState(false);
  const { hasPermission } = usePermission();

  const canManageFeatures = hasPermission(
    'AbpTenantManagement.Tenants.ManageFeatures'
  );

  const openFeatures = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setShowFeatures(true);
  };

  return (
    <>
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
                {canManageFeatures && (
                  <button onClick={() => openFeatures(tenant)}>
                    Features
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTenant && (
        <FeatureManagementModal
          providerName="T"
          providerKey={selectedTenant.id}
          visible={showFeatures}
          onVisibleChange={setShowFeatures}
          onSave={() => {
            console.log(`Features saved for ${selectedTenant.name}`);
          }}
        />
      )}
    </>
  );
}
```

## Related

- [Overview](./overview) - Package overview
- [Tenant Management](../tenant-management/overview) - Managing tenants
- [Permissions](../core/permissions) - Permission checking
