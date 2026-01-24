---
sidebar_position: 99
---

# Release Notes

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
