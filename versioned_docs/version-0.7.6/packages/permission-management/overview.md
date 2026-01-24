---
sidebar_position: 1
---

# Overview

The `@abpjs/permission-management` package provides a permission management interface for administrators to assign permissions to roles and users.

[![npm version](https://img.shields.io/npm/v/@abpjs/permission-management.svg)](https://www.npmjs.com/package/@abpjs/permission-management)

## Installation

```bash
npm install @abpjs/permission-management
```

**Required peer dependencies:**
```bash
npm install @abpjs/core @abpjs/theme-shared
```

## Features

- **Permission Modal** - Ready-to-use modal for managing permissions
- **Permission Grouping** - Permissions organized by groups
- **Multiple Providers** - Support for role, user, and client permissions
- **Bulk Operations** - Grant/revoke all permissions at once

## Main Exports

### Components

| Component | Description |
|-----------|-------------|
| `PermissionManagementModal` | Modal for managing permissions |

### Hooks

| Hook | Description |
|------|-------------|
| `usePermissionManagement` | Hook for programmatic permission management |

### Services

| Service | Description |
|---------|-------------|
| `PermissionManagementService` | Direct API interaction |

## Permission Providers

| Provider | Key | Description |
|----------|-----|-------------|
| `R` | Role name | Permissions for a role |
| `U` | User ID | Permissions for a user |
| `C` | Client ID | Permissions for a client |

## Quick Example

```tsx
import { PermissionManagementModal } from '@abpjs/permission-management';
import { useState } from 'react';

function RolePermissions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Manage Admin Permissions
      </button>

      <PermissionManagementModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        providerName="R"
        providerKey="admin"
      />
    </>
  );
}
```

## NPM Package

View on npm: [@abpjs/permission-management](https://www.npmjs.com/package/@abpjs/permission-management)

## Documentation

- [Permission Modal](/docs/packages/permission-management/modal) - Using the permission modal
