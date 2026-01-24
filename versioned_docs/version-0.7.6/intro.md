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

ABP React consists of 7 packages:

| Package | Description |
|---------|-------------|
| [@abpjs/core](/docs/packages/core/overview) | Core infrastructure: authentication, configuration, localization, permissions, REST services |
| [@abpjs/account](/docs/packages/account/overview) | Login, registration, and tenant switching components |
| [@abpjs/identity](/docs/packages/identity/overview) | User and role management components |
| [@abpjs/permission-management](/docs/packages/permission-management/overview) | Permission management modal and services |
| [@abpjs/tenant-management](/docs/packages/tenant-management/overview) | Multi-tenant management components |
| [@abpjs/theme-basic](/docs/packages/theme-basic/overview) | Layout components (Application, Account, Empty layouts) |
| [@abpjs/theme-shared](/docs/packages/theme-shared/overview) | Shared UI: toasts, confirmations, theming |

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

This documentation covers **ABP React v0.7.6**.

## Next Steps

- [Installation](/docs/getting-started/installation) - Create a new project or install packages manually
- [Project Setup](/docs/getting-started/project-setup) - Configure your project
- [Quick Start](/docs/getting-started/quick-start) - Build your first page
