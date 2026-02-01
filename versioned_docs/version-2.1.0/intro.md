---
sidebar_position: 1
slug: /
---

# Introduction

**ABP React** is a collection of React packages that provide UI components and services for building applications with the [ABP Framework](https://abp.io/). It offers a modern, TypeScript-first approach with pre-built modules for authentication, identity management, permissions, multi-tenancy, and more.

## Quick Start

Get started with ABP React in seconds using our project generator:

```bash
npx create-abp-react my-app
cd my-app
pnpm dev
```

That's it! You now have a fully configured ABP React project with all dependencies installed.

## Why ABP React?

- **Instant Setup** - Create a new project with a single command using `create-abp-react`
- **Ready-to-use Components** - Pre-built login forms, user management tables, permission modals, and more
- **ABP Integration** - Seamlessly connects to ABP backend APIs with built-in services
- **TypeScript First** - Full type safety across all packages
- **Modern Stack** - Built with React 19, Redux Toolkit, and Chakra UI v3
- **Modular Design** - Install only what you need

## Packages

ABP React consists of 14 packages split between free and pro modules.

### Free Packages

Works with the open-source [ABP Framework](https://abp.io/).

| Package | Description |
|---------|-------------|
| [@abpjs/core](./packages/core/overview) | Core infrastructure: authentication, configuration, localization, permissions, REST services |
| [@abpjs/account](./packages/account/overview) | Login, registration, and tenant switching components |
| [@abpjs/identity](./packages/identity/overview) | User and role management components |
| [@abpjs/feature-management](./packages/feature-management/overview) | Feature management modal and services |
| [@abpjs/permission-management](./packages/permission-management/overview) | Permission management modal and services |
| [@abpjs/setting-management](./packages/setting-management/overview) | Settings UI with email and identity settings |
| [@abpjs/tenant-management](./packages/tenant-management/overview) | Multi-tenant management components |
| [@abpjs/theme-basic](./packages/theme-basic/overview) | Layout components (Application, Account, Empty layouts) |
| [@abpjs/theme-shared](./packages/theme-shared/overview) | Shared UI: toasts, confirmations, theming |

### Pro Packages

These packages are free to use but require the corresponding backend modules from [ABP Commercial](https://commercial.abp.io/). You can purchase an ABP Commercial license from [abp.io](https://abp.io/pricing).

| Package | Description |
|---------|-------------|
| [@abpjs/account-pro](./packages/account-pro/overview) | Pro account module with password recovery, profile management, 2FA |
| [@abpjs/identity-pro](./packages/identity-pro/overview) | Pro identity module with claim types, user/role claims |
| [@abpjs/audit-logging](./packages/audit-logging/overview) | Audit logs viewing with filtering and statistics |
| [@abpjs/language-management](./packages/language-management/overview) | Language and localization string management |
| [@abpjs/saas](./packages/saas/overview) | SaaS module with tenants, editions, and connection strings |

## Quick Example

```tsx
import { useAuth, useLocalization } from '@abpjs/core';
import { LoginForm } from '@abpjs/account';

function App() {
  const { isAuthenticated, logout } = useAuth();
  const { t } = useLocalization();

  if (!isAuthenticated) {
    return <LoginForm onSuccess={() => console.log('Logged in!')} />;
  }

  return (
    <div>
      <h1>{t('Welcome')}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Requirements

- **Node.js** 18.0 or higher
- **pnpm** (recommended) or npm/yarn
- **ABP Framework** backend (v7.x or v8.x recommended)

## Current Version

This documentation covers **ABP React v1.1.0**.

## Next Steps

- [Installation](/docs/getting-started/installation) - Create a new project or install packages manually
- [Project Setup](/docs/getting-started/project-setup) - Configure your project
- [Quick Start](/docs/getting-started/quick-start) - Build your first page
