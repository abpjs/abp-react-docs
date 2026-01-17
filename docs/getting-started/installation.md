---
sidebar_position: 1
---

# Installation

ABP React packages are available on npm under the `@abpjs` scope.

## Install All Packages

To install all ABP React packages:

```bash
npm install @abpjs/core @abpjs/account @abpjs/identity @abpjs/permission-management @abpjs/tenant-management @abpjs/theme-basic @abpjs/theme-shared
```

Or with yarn:

```bash
yarn add @abpjs/core @abpjs/account @abpjs/identity @abpjs/permission-management @abpjs/tenant-management @abpjs/theme-basic @abpjs/theme-shared
```

## Install Individual Packages

You can also install only the packages you need:

### Core (Required)

The core package is required by all other packages:

```bash
npm install @abpjs/core
```

### Account

For login, registration, and tenant switching:

```bash
npm install @abpjs/account
```

### Identity

For user and role management:

```bash
npm install @abpjs/identity
```

### Permission Management

For permission management UI:

```bash
npm install @abpjs/permission-management
```

### Tenant Management

For multi-tenant management:

```bash
npm install @abpjs/tenant-management
```

### Theme Basic

For layout components:

```bash
npm install @abpjs/theme-basic
```

### Theme Shared

For shared UI components (toasts, confirmations):

```bash
npm install @abpjs/theme-shared
```

## Peer Dependencies

ABP React packages have the following peer dependencies that you need to install:

```bash
npm install react react-dom react-redux @reduxjs/toolkit @chakra-ui/react @emotion/react @emotion/styled framer-motion axios react-router-dom
```

## Version Compatibility

| ABP React | React | ABP Framework |
|-----------|-------|---------------|
| 0.7.x     | 18+   | 7.x, 8.x      |
