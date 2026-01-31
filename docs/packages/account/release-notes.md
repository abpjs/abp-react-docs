---
sidebar_position: 99
---

# Release Notes

## v1.1.0

**January 2026**

### New Components

- **`AuthWrapper`** - Wrapper component for authentication forms providing consistent layout
- **`ManageProfile`** - Tabbed profile management interface with personal settings and password change
- **`ChangePasswordForm`** - Password change form with validation
- **`PersonalSettingsForm`** - User profile information editing form

See [Manage Profile](./manage-profile) for usage details.

---

## v1.0.0

**January 2026**

- Version alignment with @abpjs/core

### Deprecations

- **`ACCOUNT_ROUTES` deprecated** - Routes are now configured via `AccountProvider`. Direct use of `ACCOUNT_ROUTES` is deprecated and will be removed in a future version.

---

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
