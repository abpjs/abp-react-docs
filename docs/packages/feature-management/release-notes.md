---
sidebar_position: 99
---

# Release Notes

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
