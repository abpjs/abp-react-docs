---
sidebar_position: 1
---

# Overview

The `@abpjs/identity` package provides complete user and role management components for ABP Framework applications.

[![npm version](https://img.shields.io/npm/v/@abpjs/identity.svg)](https://www.npmjs.com/package/@abpjs/identity)

## Installation

```bash
npm install @abpjs/identity
```

**Required peer dependencies:**
```bash
npm install @abpjs/core @abpjs/theme-shared @abpjs/permission-management
```

## Features

- **User Management** - Complete CRUD for users with search and pagination
- **Role Management** - Complete CRUD for roles
- **Permission Integration** - Assign permissions to users and roles
- **Role Assignment** - Assign roles to users
- **i18n Support** - Full localization support

## Main Exports

### Components

| Component | Description |
|-----------|-------------|
| `UsersComponent` | Complete user management table with modals |
| `RolesComponent` | Complete role management table with modals |

### Hooks

| Hook | Description |
|------|-------------|
| `useUsers` | User management with CRUD and pagination |
| `useRoles` | Role management with CRUD |
| `useIdentity` | Combined hook for users and roles |

### Services

| Service | Description |
|---------|-------------|
| `IdentityService` | Direct API interaction for identity operations |

## Quick Example

```tsx
import { UsersComponent, RolesComponent } from '@abpjs/identity';

function IdentityManagement() {
  return (
    <div>
      <h1>User Management</h1>
      <UsersComponent />

      <h1>Role Management</h1>
      <RolesComponent />
    </div>
  );
}
```

## Required Permissions

| Permission | Description |
|------------|-------------|
| `AbpIdentity.Users` | View users |
| `AbpIdentity.Users.Create` | Create users |
| `AbpIdentity.Users.Update` | Update users |
| `AbpIdentity.Users.Delete` | Delete users |
| `AbpIdentity.Users.ManagePermissions` | Manage user permissions |
| `AbpIdentity.Roles` | View roles |
| `AbpIdentity.Roles.Create` | Create roles |
| `AbpIdentity.Roles.Update` | Update roles |
| `AbpIdentity.Roles.Delete` | Delete roles |
| `AbpIdentity.Roles.ManagePermissions` | Manage role permissions |

## NPM Package

View on npm: [@abpjs/identity](https://www.npmjs.com/package/@abpjs/identity)

## Documentation

- [Users](/docs/packages/identity/users) - User management
- [Roles](/docs/packages/identity/roles) - Role management
