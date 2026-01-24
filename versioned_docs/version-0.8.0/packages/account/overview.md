---
sidebar_position: 1
---

# Overview

The `@abpjs/account` package provides pre-built authentication components including login forms, registration, and multi-tenant switching.

[![npm version](https://img.shields.io/npm/v/@abpjs/account.svg)](https://www.npmjs.com/package/@abpjs/account)

## Installation

```bash
npm install @abpjs/account
```

**Required peer dependencies:**
```bash
npm install @abpjs/core @abpjs/theme-shared
```

## Features

- **Login Form** - Complete login interface with validation
- **Registration Form** - User registration with validation
- **Tenant Box** - Multi-tenant switching component
- **OAuth2 Support** - Password flow authentication
- **Form Validation** - Built-in validation using Zod

## Main Exports

### Components

| Component | Description |
|-----------|-------------|
| `LoginForm` | Login form with username/password fields |
| `RegisterForm` | User registration form |
| `TenantBox` | Tenant selection component |
| `LoginPage` | Pre-built login page |
| `RegisterPage` | Pre-built registration page |

### Hooks

| Hook | Description |
|------|-------------|
| `usePasswordFlow` | OAuth2 resource owner password flow |

## Quick Example

```tsx
import { LoginForm } from '@abpjs/account';

function LoginPage() {
  return (
    <LoginForm
      onSuccess={() => console.log('Logged in!')}
      onError={(error) => console.error(error)}
      showRegisterLink
      showForgotPassword
    />
  );
}
```

## NPM Package

View on npm: [@abpjs/account](https://www.npmjs.com/package/@abpjs/account)

## Documentation

- [Login](/docs/packages/account/login) - Login form and password flow
- [Register](/docs/packages/account/register) - Registration form
- [Tenant Box](/docs/packages/account/tenant-box) - Multi-tenant switching
