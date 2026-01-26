---
sidebar_position: 99
---

# Release Notes

## v0.9.0

**January 2026**

### Breaking Changes

- **`ACCOUNT_ROUTES` format changed** - Now returns `{ routes: ABP.FullRoute[] }` instead of `ABP.FullRoute[]`

### New Features

- **AccountService** - New service with `findTenant()` and `register()` methods
- **useAccountService hook** - Access AccountService in components
- **RegisterForm now functional** - Makes actual API calls and auto-logs in users
- **TenantBox API integration** - Validates tenant names via API, updates Redux session

### New Types

- `RegisterRequest`, `RegisterResponse`, `TenantIdResponse`

---

## v0.8.0

**January 2026**

- Version alignment with @abpjs/core

---

## v0.7.6

**January 2026** - Initial Release

- LoginForm component
- RegisterForm component
- TenantBox component
- OAuth2 resource owner password flow
