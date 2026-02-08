---
sidebar_position: 1
---

# Installation

The fastest way to get started with ABP React is using our project generator.

## Create a New Project (Recommended)

Use `create-abp-react` to scaffold a new project with all dependencies pre-configured:

```bash
npx create-abp-react my-app
```

This will:
1. Check for pnpm (recommended package manager)
2. Fetch the official ABP React template from GitHub
3. Install all dependencies automatically
4. Initialize a git repository

Once complete, start your development server:

```bash
cd my-app
pnpm dev
```

### What's Included

The generated project comes with:

**Dependencies:**
- `@abpjs/core` - Core infrastructure
- `@abpjs/account` - Account management
- `@abpjs/theme-basic` - Layout components
- `@abpjs/theme-shared` - Shared UI components
- `@chakra-ui/react` - UI framework
- `@emotion/react` - CSS-in-JS
- `@reduxjs/toolkit` - State management
- `lucide-react` - Icons
- `react-router-dom` - Routing

**Dev Dependencies:**
- TypeScript 5.x
- Vite 6.x
- ESLint 9.x
- Prettier

### Project Structure

```
my-app/
├── src/
│   ├── components/     # Your components
│   ├── pages/          # Page components
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── environment.ts  # ABP configuration
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── ...
```

## Manual Installation

If you prefer to add ABP React to an existing project, you can install packages manually.

### Install Core Packages

```bash
# Using pnpm (recommended)
pnpm add @abpjs/core @abpjs/account @abpjs/theme-basic @abpjs/theme-shared

# Using npm
npm install @abpjs/core @abpjs/account @abpjs/theme-basic @abpjs/theme-shared

# Using yarn
yarn add @abpjs/core @abpjs/account @abpjs/theme-basic @abpjs/theme-shared
```

### Install Peer Dependencies

ABP React requires the following peer dependencies:

```bash
pnpm add @chakra-ui/react @emotion/react lucide-react react-router-dom react-redux @reduxjs/toolkit
```

:::note
Chakra UI v3 no longer requires `@chakra-ui/icons`, `@emotion/styled`, or `framer-motion` as peer dependencies.
:::

### Optional Packages

Install additional packages as needed:

```bash
# Identity management (users & roles)
pnpm add @abpjs/identity

# Permission management
pnpm add @abpjs/permission-management

# Tenant management (multi-tenancy)
pnpm add @abpjs/tenant-management
```

## All Packages

| Package | Description | Required |
|---------|-------------|----------|
| `@abpjs/core` | Authentication, configuration, localization, permissions | Yes |
| `@abpjs/account` | Login, registration, tenant switching | Yes |
| `@abpjs/theme-basic` | Layout components | Yes |
| `@abpjs/theme-shared` | Toasts, confirmations, theming | Yes |
| `@abpjs/identity` | User and role management | No |
| `@abpjs/permission-management` | Permission management UI | No |
| `@abpjs/tenant-management` | Multi-tenant management | No |

## Version Compatibility

| ABP React | React | Node.js | ABP Framework |
|-----------|-------|---------|---------------|
| 0.7.x     | 19.x  | 18+     | 7.x, 8.x      |

## Next Steps

- [Project Setup](/docs/getting-started/project-setup) - Configure your ABP backend connection
- [Quick Start](/docs/getting-started/quick-start) - Build your first page
