---
sidebar_position: 1
---

# Overview

The `@abpjs/core` package provides the foundational infrastructure for ABP React applications. It includes authentication, configuration management, localization, permissions, REST services, and session management.

[![npm version](https://img.shields.io/npm/v/@abpjs/core.svg)](https://www.npmjs.com/package/@abpjs/core)

## Installation

```bash
npm install @abpjs/core
```

## Features

- **Authentication** - OAuth2/OIDC support with `oidc-client-ts`
- **Configuration** - ABP application configuration management
- **Localization** - Multi-language support with dynamic resource loading
- **Permissions** - Fine-grained permission checking
- **REST Service** - Axios-based HTTP client with interceptors
- **Session Management** - User session state handling

## Main Exports

### Hooks

| Hook | Description |
|------|-------------|
| `useAuth()` | Authentication state and methods (login, logout, isAuthenticated) |
| `useConfig()` | Access ABP application configuration |
| `useLocalization()` | Translation functions (`t()` and `instant()`) |
| `usePermission()` | Permission checking utilities |
| `useProfile()` | User profile management |
| `useSession()` | Session state management |

### Services

| Service | Description |
|---------|-------------|
| `ApplicationConfigurationService` | Fetch ABP configuration from backend |
| `ConfigService` | Runtime configuration state |
| `ProfileService` | User profile API operations |
| `LocalizationService` | Translation services |
| `RestService` | HTTP client with ABP interceptors |
| `LazyLoadService` | Dynamic module/script loading |

### Redux Slices

| Slice | Description |
|-------|-------------|
| `configSlice` | Application configuration state |
| `profileSlice` | User profile state |
| `sessionSlice` | Session and authentication state |

## Quick Example

```tsx
import { useAuth, useLocalization, usePermission } from '@abpjs/core';

function MyComponent() {
  const { isAuthenticated, login, logout } = useAuth();
  const { t } = useLocalization();
  const { hasPermission } = usePermission();

  if (!isAuthenticated) {
    return <button onClick={login}>{t('Login')}</button>;
  }

  return (
    <div>
      <h1>{t('Welcome')}</h1>
      {hasPermission('AbpIdentity.Users') && (
        <a href="/users">{t('ManageUsers')}</a>
      )}
      <button onClick={logout}>{t('Logout')}</button>
    </div>
  );
}
```

## NPM Package

View on npm: [@abpjs/core](https://www.npmjs.com/package/@abpjs/core)

## Documentation

- [Authentication](/docs/packages/core/authentication) - OAuth2/OIDC setup and hooks
- [Configuration](/docs/packages/core/configuration) - Application configuration
- [Localization](/docs/packages/core/localization) - Multi-language support
- [Permissions](/docs/packages/core/permissions) - Permission system
- [REST Service](/docs/packages/core/rest-service) - HTTP client
- [Session](/docs/packages/core/session) - Session management
