---
sidebar_position: 99
---

# Release Notes

## v1.1.0

**January 2026**

### New Features

- **`hideBadges` prop** - `PermissionManagementModal` now supports hiding provider badges:
  ```tsx
  <PermissionManagementModal hideBadges />
  ```
- **Provider badges** - Permissions now display badges showing which other provider granted them (e.g., "R" for role)
- **`PermissionManagementStateService`** - New service for accessing permission management state (for Angular API compatibility)

### API Changes

- **`isGrantedByOtherProviderName`** - New method in `usePermissionManagement` hook replacing `isGrantedByRole`

### Deprecations

- **`isGrantedByRole`** - Deprecated, use `isGrantedByOtherProviderName` instead

---

## v1.0.0

**January 2026**

- Version alignment with @abpjs/core

---

## v0.9.0

**January 2026**

### New Features

- **`isGrantedByRole` method** - New helper in `usePermissionManagement` hook to check if a permission is granted by a role provider

---

## v0.8.0

**January 2026**

- Version alignment with @abpjs/core

---

## v0.7.6

**January 2026** - Initial Release

- PermissionManagementModal component
- Support for role (R), user (U), and client (C) providers
- Bulk grant/revoke operations
