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

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', margin: '1rem 0 2rem'}}>
  <a href="./packages/core/overview" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'var(--ifm-card-background-color, #f8f9fa)', border: '1px solid var(--ifm-color-emphasis-200, #e0e0e0)', textDecoration: 'none', transition: 'all 0.2s ease'}}>
    <img src="/img/modules/identity.svg" alt="Core" style={{width: '40px', height: '40px', marginBottom: '0.5rem'}} />
    <span style={{fontWeight: 600, fontSize: '0.85rem', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>Core</span>
  </a>
  <a href="./packages/account/overview" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'var(--ifm-card-background-color, #f8f9fa)', border: '1px solid var(--ifm-color-emphasis-200, #e0e0e0)', textDecoration: 'none', transition: 'all 0.2s ease'}}>
    <img src="/img/modules/account.svg" alt="Account" style={{width: '40px', height: '40px', marginBottom: '0.5rem'}} />
    <span style={{fontWeight: 600, fontSize: '0.85rem', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>Account</span>
  </a>
  <a href="./packages/identity/overview" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'var(--ifm-card-background-color, #f8f9fa)', border: '1px solid var(--ifm-color-emphasis-200, #e0e0e0)', textDecoration: 'none', transition: 'all 0.2s ease'}}>
    <img src="/img/modules/identity.svg" alt="Identity" style={{width: '40px', height: '40px', marginBottom: '0.5rem'}} />
    <span style={{fontWeight: 600, fontSize: '0.85rem', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>Identity</span>
  </a>
  <a href="./packages/feature-management/overview" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'var(--ifm-card-background-color, #f8f9fa)', border: '1px solid var(--ifm-color-emphasis-200, #e0e0e0)', textDecoration: 'none', transition: 'all 0.2s ease'}}>
    <img src="/img/modules/feature-management.svg" alt="Feature Management" style={{width: '40px', height: '40px', marginBottom: '0.5rem'}} />
    <span style={{fontWeight: 600, fontSize: '0.85rem', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>Features</span>
  </a>
  <a href="./packages/permission-management/overview" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'var(--ifm-card-background-color, #f8f9fa)', border: '1px solid var(--ifm-color-emphasis-200, #e0e0e0)', textDecoration: 'none', transition: 'all 0.2s ease'}}>
    <img src="/img/modules/identity.svg" alt="Permission Management" style={{width: '40px', height: '40px', marginBottom: '0.5rem'}} />
    <span style={{fontWeight: 600, fontSize: '0.85rem', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>Permissions</span>
  </a>
  <a href="./packages/setting-management/overview" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'var(--ifm-card-background-color, #f8f9fa)', border: '1px solid var(--ifm-color-emphasis-200, #e0e0e0)', textDecoration: 'none', transition: 'all 0.2s ease'}}>
    <img src="/img/modules/setting-management.svg" alt="Setting Management" style={{width: '40px', height: '40px', marginBottom: '0.5rem'}} />
    <span style={{fontWeight: 600, fontSize: '0.85rem', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>Settings</span>
  </a>
  <a href="./packages/tenant-management/overview" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'var(--ifm-card-background-color, #f8f9fa)', border: '1px solid var(--ifm-color-emphasis-200, #e0e0e0)', textDecoration: 'none', transition: 'all 0.2s ease'}}>
    <img src="/img/modules/tenant-management.svg" alt="Tenant Management" style={{width: '40px', height: '40px', marginBottom: '0.5rem'}} />
    <span style={{fontWeight: 600, fontSize: '0.85rem', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>Tenants</span>
  </a>
  <a href="./packages/theme-shared/overview" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'var(--ifm-card-background-color, #f8f9fa)', border: '1px solid var(--ifm-color-emphasis-200, #e0e0e0)', textDecoration: 'none', transition: 'all 0.2s ease'}}>
    <img src="/img/modules/setting-management.svg" alt="Theme Shared" style={{width: '40px', height: '40px', marginBottom: '0.5rem'}} />
    <span style={{fontWeight: 600, fontSize: '0.85rem', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>Theme</span>
  </a>
</div>

### Pro Packages

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', margin: '1rem 0 2rem'}}>
  <a href="./packages/account-pro/overview" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'var(--ifm-card-background-color, #f8f9fa)', border: '1px solid var(--ifm-color-emphasis-200, #e0e0e0)', textDecoration: 'none', transition: 'all 0.2s ease'}}>
    <img src="/img/modules/account-pro.svg" alt="Account Pro" style={{width: '40px', height: '40px', marginBottom: '0.5rem'}} />
    <span style={{fontWeight: 600, fontSize: '0.85rem', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>Account Pro</span>
  </a>
  <a href="./packages/identity-pro/overview" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'var(--ifm-card-background-color, #f8f9fa)', border: '1px solid var(--ifm-color-emphasis-200, #e0e0e0)', textDecoration: 'none', transition: 'all 0.2s ease'}}>
    <img src="/img/modules/identity-pro.svg" alt="Identity Pro" style={{width: '40px', height: '40px', marginBottom: '0.5rem'}} />
    <span style={{fontWeight: 600, fontSize: '0.85rem', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>Identity Pro</span>
  </a>
  <a href="./packages/audit-logging/overview" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'var(--ifm-card-background-color, #f8f9fa)', border: '1px solid var(--ifm-color-emphasis-200, #e0e0e0)', textDecoration: 'none', transition: 'all 0.2s ease'}}>
    <img src="/img/modules/audit-logging.svg" alt="Audit Logging" style={{width: '40px', height: '40px', marginBottom: '0.5rem'}} />
    <span style={{fontWeight: 600, fontSize: '0.85rem', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>Audit Logs</span>
  </a>
  <a href="./packages/language-management/overview" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'var(--ifm-card-background-color, #f8f9fa)', border: '1px solid var(--ifm-color-emphasis-200, #e0e0e0)', textDecoration: 'none', transition: 'all 0.2s ease'}}>
    <img src="/img/modules/text-template-management.svg" alt="Language Management" style={{width: '40px', height: '40px', marginBottom: '0.5rem'}} />
    <span style={{fontWeight: 600, fontSize: '0.85rem', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>Languages</span>
  </a>
  <a href="./packages/saas/overview" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'var(--ifm-card-background-color, #f8f9fa)', border: '1px solid var(--ifm-color-emphasis-200, #e0e0e0)', textDecoration: 'none', transition: 'all 0.2s ease'}}>
    <img src="/img/modules/saas.svg" alt="SaaS" style={{width: '40px', height: '40px', marginBottom: '0.5rem'}} />
    <span style={{fontWeight: 600, fontSize: '0.85rem', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>SaaS</span>
  </a>
</div>

These packages are free to use but require the corresponding backend modules from [ABP Commercial](https://commercial.abp.io/).

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
