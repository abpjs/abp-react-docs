---
sidebar_position: 99
---

# Release Notes

## v4.0.0

**February 2026**

### Breaking Changes

#### Removed Deprecated Legacy Models

The following deprecated types from the `FeatureManagement` namespace have been removed (deprecated in v3.2.0):

| Removed | Replacement |
|---------|-------------|
| `FeatureManagement.State` | `GetFeatureListResultDto` |
| `FeatureManagement.ValueType` | `IStringValueType` |
| `FeatureManagement.Feature` | `FeatureDto` |
| `FeatureManagement.Features` | `UpdateFeaturesDto` |
| `FeatureManagement.Provider` | `FeatureProviderDto` |

```tsx
// Before (v3.2.0)
import { FeatureManagement } from '@abpjs/feature-management';
const feature: FeatureManagement.Feature = { name: '...', value: '...' };

// After (v4.0.0)
import type { FeatureDto } from '@abpjs/feature-management';
const feature: FeatureDto = { name: '...', value: '...' };
```

#### Removed `FeatureManagementService`

The deprecated `FeatureManagementService` has been removed. Use `FeaturesService` (added in v3.2.0) instead:

```tsx
// Before (v3.2.0)
import { FeatureManagementService } from '@abpjs/feature-management';
const service = new FeatureManagementService(restService);
const result = await service.getFeatures({ providerKey, providerName });

// After (v4.0.0)
import { FeaturesService } from '@abpjs/feature-management';
const service = new FeaturesService(restService);
const result = await service.get(providerName, providerKey);
```

#### `useFeatureManagement` Hook Changes

The hook now uses `FeaturesService` internally and returns grouped features:

```tsx
// Before (v3.2.0)
const { features, fetchFeatures, saveFeatures } = useFeatureManagement();
// features: FeatureManagement.Feature[]

// After (v4.0.0)
const { groups, features, fetchFeatures, saveFeatures } = useFeatureManagement();
// groups: FeatureGroupDto[]    ← NEW: features organized by group
// features: FeatureDto[]       ← still available as flat list
```

**New return property:**

| Property | Type | Description |
|----------|------|-------------|
| `groups` | `FeatureGroupDto[]` | Features organized by group |

**Changed return type:**

| Property | Before | After |
|----------|--------|-------|
| `features` | `FeatureManagement.Feature[]` | `FeatureDto[]` |

The `FeatureDto` type includes additional fields like `depth`, `parentName`, `description`, `displayName`, and `provider` compared to the old `Feature` type, but the core `name` and `value` fields are the same.

---

## v3.2.0

**February 2026**

### New Features

#### FeaturesService (Proxy Service)

A new proxy service for feature management API calls:

```tsx
import { FeaturesService } from '@abpjs/feature-management';
import { useRestService } from '@abpjs/core';

function useFeatures() {
  const restService = useRestService();
  const featuresService = new FeaturesService(restService);

  // Get features for a tenant
  const features = await featuresService.get('T', tenantId);

  // Update features
  await featuresService.update('T', tenantId, {
    features: [
      { name: 'MyFeature', value: 'true' },
      { name: 'MaxUsers', value: '100' },
    ],
  });
}
```

#### New Proxy Models

New DTOs that match the ABP backend API structure:

```tsx
import type {
  FeatureDto,
  FeatureGroupDto,
  FeatureProviderDto,
  GetFeatureListResultDto,
  UpdateFeatureDto,
  UpdateFeaturesDto,
} from '@abpjs/feature-management';

// Feature list result contains groups
const result: GetFeatureListResultDto = await featuresService.get('T', tenantId);

result.groups.forEach((group: FeatureGroupDto) => {
  console.log(group.displayName);
  group.features.forEach((feature: FeatureDto) => {
    console.log(feature.name, feature.value);
  });
});
```

#### ValueTypes Enum

New enum for feature value types:

```tsx
import { ValueTypes } from '@abpjs/feature-management';

function getFeatureEditor(feature: FeatureDto) {
  switch (feature.valueType.name) {
    case ValueTypes.ToggleStringValueType:
      return <ToggleSwitch />;
    case ValueTypes.FreeTextStringValueType:
      return <TextInput />;
    case ValueTypes.SelectionStringValueType:
      return <SelectDropdown />;
  }
}
```

#### Validation Models

New interfaces for feature value validation:

```tsx
import type { IStringValueType, IValueValidator } from '@abpjs/feature-management';

// Value validator interface
interface IValueValidator {
  name: string;
  item: object;
  properties: Record<string, object>;
}

// String value type with validator
interface IStringValueType {
  name: string;
  item: object;
  properties: Record<string, object>;
  validator: IValueValidator;
}
```

#### getInputType Utility

Utility function to determine input type for free text features:

```tsx
import { getInputType, INPUT_TYPES } from '@abpjs/feature-management';

function FeatureInput({ feature }) {
  const inputType = getInputType(feature);
  // Returns 'number' for numeric validators, 'text' otherwise

  return <input type={inputType} value={feature.value} />;
}
```

### Deprecations

The following legacy models are deprecated and will be removed in v4.0:

| Deprecated | Replacement |
|------------|-------------|
| `FeatureManagement.State` | `GetFeatureListResultDto` |
| `FeatureManagement.ValueType` | `IStringValueType` |
| `FeatureManagement.Feature` | `FeatureDto` |
| `FeatureManagement.Features` | `UpdateFeaturesDto` |
| `FeatureManagement.Provider` | `FeatureProviderDto` |

### New Exports

**Services:**
- `FeaturesService` - Proxy service for feature management API

**Types:**
- `FeatureDto` - Feature data transfer object
- `FeatureGroupDto` - Feature group data transfer object
- `FeatureProviderDto` - Feature provider data transfer object
- `GetFeatureListResultDto` - Result of getting features
- `UpdateFeatureDto` - DTO for updating a single feature
- `UpdateFeaturesDto` - DTO for updating multiple features
- `IStringValueType` - String value type interface
- `IValueValidator` - Value validator interface
- `FreeTextType` - Free text feature type

**Enums:**
- `ValueTypes` - Feature value types enum

**Constants:**
- `INPUT_TYPES` - Input type constants for free text features

**Functions:**
- `getInputType()` - Get input type for free text features

---

## v3.1.0

**February 2026**

### New Features

#### Feature.displayName Property

The `Feature` interface now includes a `displayName` property for user-friendly feature names:

```tsx
import type { FeatureManagement } from '@abpjs/feature-management';

function FeatureItem({ feature }: { feature: FeatureManagement.Feature }) {
  return (
    <div>
      <label>{feature.displayName}</label>
      <input value={feature.value} />
      {feature.description && <p>{feature.description}</p>}
    </div>
  );
}
```

The `Feature` interface now includes:
- `name` - Feature identifier
- `displayName` - User-friendly display name (new in v3.1.0)
- `value` - Feature value
- `description` - Optional description
- `valueType` - Value type definition
- `depth` - Hierarchy depth level
- `parentName` - Parent feature name for hierarchy

---

## v3.0.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.9.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.7.0

**February 2026**

### New Features

#### Component Replacement Keys

New constants for replacing feature management components:

```tsx
import { eFeatureManagementComponents } from '@abpjs/feature-management';

// Available component keys:
// eFeatureManagementComponents.FeatureManagement = 'FeatureManagement.FeatureManagementComponent'
```

### New Exports

- `eFeatureManagementComponents` - Constants for component replacement keys

---

## v2.4.0

**February 2026**

- **`FeatureManagementService.apiName` property** - New property for REST API configuration. Defaults to `'default'`.

---

## v2.2.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.1.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.0.0

**January 2026**

- Version alignment with @abpjs/core
- Added `FeatureManagement.FeatureManagementComponentInputs` interface
- Added `FeatureManagement.FeatureManagementComponentOutputs` interface

---

## v1.1.0

**January 2026**

- Version alignment with @abpjs/core

---

## v1.0.0

**January 2026**

- Version alignment with @abpjs/core

---

## v0.9.0

**January 2026**

- Version alignment with @abpjs/core

---

## v0.8.0

**Release Date:** January 2026

### Initial Release

The `@abpjs/feature-management` package is now available! This is the React equivalent of Angular's `@abp/ng.feature-management` module.

#### Components

- **FeatureManagementModal** - Ready-to-use modal for managing features
  - Support for toggle (boolean) features
  - Support for free text features
  - Automatic input rendering based on value type
  - Loading and error states
  - Localized UI

#### Hooks

- **useFeatureManagement** - Hook for programmatic feature management
  - `fetchFeatures()` - Fetch features from server
  - `saveFeatures()` - Save features to server
  - `updateFeatureValue()` - Update feature value locally
  - `getFeatureValue()` - Get current feature value
  - `isFeatureEnabled()` - Check if toggle feature is enabled
  - `reset()` - Reset all state

#### Services

- **FeatureManagementService** - Direct API interaction
  - `getFeatures()` - GET /api/abp/features
  - `updateFeatures()` - PUT /api/abp/features

#### Models

- `FeatureManagement.Feature` - Feature definition
- `FeatureManagement.Features` - Features container
- `FeatureManagement.Provider` - Provider info
- `FeatureManagement.ValueType` - Value type definition
- `FeatureManagement.State` - State interface

### Installation

```bash
npm install @abpjs/feature-management
```

### Dependencies

- `@abpjs/core` >= 0.8.0
- `@abpjs/theme-shared` >= 0.8.0
- `@chakra-ui/react` >= 3.0.0
- `react` >= 18.0.0
