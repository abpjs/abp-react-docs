---
sidebar_position: 99
---

# Release Notes

## v1.0.0

**January 2026**

- Version alignment with @abpjs/core v1.0.0

---

## v0.7.2 (Initial Release)

### Features

- **LoginForm** - Complete login form with tenant switching, remember me, and links to register/forgot password
- **RegisterForm** - User registration form with validation
- **TenantBox** - Multi-tenant switching component
- **ForgotPassword** - Password recovery form with email verification
- **ResetPassword** - Password reset form using email token
- **ChangePassword** - Change password form for authenticated users
- **PersonalSettings** - Profile settings form for updating user information
- **ManageProfile** - Container component with navigation for profile management

### Hooks

- **usePasswordFlow** - OAuth Resource Owner Password Credentials flow for login
- **useAccountProService** - Access AccountProService for API operations
- **useAccountProOptions** - Access account configuration options

### Provider

- **AccountProProvider** - Context provider for account configuration with support for:
  - Custom redirect URLs
  - Custom login/register URLs
  - Social logins toggle
  - Two-factor authentication toggle

### Services

- **AccountProService** with methods:
  - `findTenant()` - Lookup tenant by name
  - `register()` - Register new user
  - `sendPasswordResetCode()` - Send password reset email
  - `resetPassword()` - Reset password with token
  - `changePassword()` - Change password for authenticated user
  - `getProfile()` - Get current user profile
  - `updateProfile()` - Update user profile

### Routes

- Pre-configured routes with `ACCOUNT_PRO_ROUTES`
- Route path constants with `ACCOUNT_PRO_PATHS`

### TypeScript

- Full TypeScript support with exported interfaces for all models and request/response types
