---
sidebar_position: 1
---

# Overview

The `@abpjs/account-pro` package provides advanced account management components and services for ABP React applications. This is the React equivalent of Angular's `@volo/abp.ng.account` module.

:::info ABP Commercial License Required
This package is free to use but requires the corresponding backend module from [ABP Commercial](https://commercial.abp.io/). You can purchase an ABP Commercial license from [abp.io](https://abp.io/pricing).
:::

## Installation

```bash
npm install @abpjs/account-pro
# or
yarn add @abpjs/account-pro
```

## Features

- **Login & Registration** - Complete authentication flows with customizable forms
- **Multi-tenancy Support** - Built-in tenant switching with TenantBox component
- **Password Management** - Forgot password, reset password, and change password flows
- **Profile Management** - Personal settings and profile update functionality
- **OAuth Integration** - Resource Owner Password Credentials (ROPC) flow support
- **Two-Factor Authentication** - Optional 2FA support (Pro feature)
- **Social Logins** - Optional social login providers (Pro feature)

## Setup

Wrap your application with the `AccountProProvider`:

```tsx
import { AccountProProvider } from '@abpjs/account-pro';

function App() {
  return (
    <AccountProProvider options={{
      redirectUrl: '/dashboard',
      enableTwoFactor: true
    }}>
      <YourApp />
    </AccountProProvider>
  );
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `redirectUrl` | `string` | `'/'` | URL to redirect after successful login |
| `redirectToLogin` | `boolean` | `true` | Redirect to login on 401 errors |
| `loginUrl` | `string` | `'/account/login'` | Custom login page URL |
| `registerUrl` | `string` | `'/account/register'` | Custom registration page URL |
| `enableSocialLogins` | `boolean` | `false` | Enable social login providers |
| `enableTwoFactor` | `boolean` | `false` | Enable two-factor authentication |

## Components

### LoginForm

The main login form component with support for tenant switching and remember me functionality.

```tsx
import { LoginForm } from '@abpjs/account-pro';

function LoginPage() {
  return (
    <LoginForm
      showTenantBox={true}
      showRegisterLink={true}
      showForgotPasswordLink={true}
    />
  );
}
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showTenantBox` | `boolean` | `true` | Show tenant switching UI |
| `showRegisterLink` | `boolean` | `true` | Show link to registration page |
| `showForgotPasswordLink` | `boolean` | `true` | Show forgot password link |

### RegisterForm

User registration form with validation.

```tsx
import { RegisterForm } from '@abpjs/account-pro';

function RegisterPage() {
  return <RegisterForm />;
}
```

### TenantBox

Component for switching between tenants in a multi-tenant application.

```tsx
import { TenantBox } from '@abpjs/account-pro';

function Header() {
  return <TenantBox />;
}
```

### ForgotPassword

Password recovery form that sends reset codes via email.

```tsx
import { ForgotPassword } from '@abpjs/account-pro';

function ForgotPasswordPage() {
  return <ForgotPassword />;
}
```

### ResetPassword

Form for resetting password using the token received via email.

```tsx
import { ResetPassword } from '@abpjs/account-pro';

function ResetPasswordPage() {
  return <ResetPassword />;
}
```

### ChangePassword

Form for authenticated users to change their password.

```tsx
import { ChangePassword } from '@abpjs/account-pro';

function ChangePasswordPage() {
  return <ChangePassword />;
}
```

### PersonalSettings

Form for updating user profile information.

```tsx
import { PersonalSettings } from '@abpjs/account-pro';

function PersonalSettingsPage() {
  return <PersonalSettings />;
}
```

### ManageProfile

Container component for profile management with navigation tabs.

```tsx
import { ManageProfile } from '@abpjs/account-pro';

function ManageProfilePage() {
  return <ManageProfile />;
}
```

## Hooks

### usePasswordFlow

Hook for handling OAuth Resource Owner Password Credentials flow.

```tsx
import { usePasswordFlow } from '@abpjs/account-pro';

function CustomLoginForm() {
  const { login, isLoading, error, clearError } = usePasswordFlow();

  const handleSubmit = async (data) => {
    const success = await login(data.username, data.password, data.rememberMe);
    if (success) {
      // Handle successful login
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* Form fields */}
    </form>
  );
}
```

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `login` | `(username, password, rememberMe?) => Promise<boolean>` | Perform login |
| `isLoading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message |
| `clearError` | `() => void` | Clear error state |

### useAccountProService

Hook to access the AccountProService for API operations.

```tsx
import { useAccountProService } from '@abpjs/account-pro';

function TenantLookup() {
  const accountService = useAccountProService();

  const lookupTenant = async (tenantName) => {
    const result = await accountService.findTenant(tenantName);
    if (result.success) {
      console.log('Tenant found:', result.tenantId);
    }
  };
}
```

### useAccountProOptions

Hook to access account configuration options.

```tsx
import { useAccountProOptions } from '@abpjs/account-pro';

function MyComponent() {
  const options = useAccountProOptions();

  return (
    <div>
      Redirect URL: {options.redirectUrl}
    </div>
  );
}
```

## Services

### AccountProService

Service class for account-related API operations.

**Methods:**

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `findTenant` | `tenantName: string` | `Promise<TenantIdResponse>` | Find tenant by name |
| `register` | `body: RegisterRequest` | `Promise<RegisterResponse>` | Register new user |
| `sendPasswordResetCode` | `body: SendPasswordResetCodeRequest` | `Promise<void>` | Send password reset email |
| `resetPassword` | `body: ResetPasswordRequest` | `Promise<void>` | Reset password with token |
| `changePassword` | `body: ChangePasswordRequest` | `Promise<void>` | Change password (authenticated) |
| `getProfile` | - | `Promise<ProfileResponse>` | Get current user profile |
| `updateProfile` | `body: UpdateProfileRequest` | `Promise<ProfileResponse>` | Update user profile |

## Routes

The package provides pre-configured routes:

```tsx
import { ACCOUNT_PRO_ROUTES, ACCOUNT_PRO_PATHS } from '@abpjs/account-pro';

// Route structure:
// /account (invisible, uses account layout)
//   /account/login
//   /account/register
//   /account/forgot-password
//   /account/reset-password
//   /account/manage-profile
//     /account/manage-profile/change-password
//     /account/manage-profile/personal-settings

// Use ACCOUNT_PRO_PATHS for navigation:
navigate(ACCOUNT_PRO_PATHS.login);           // '/account/login'
navigate(ACCOUNT_PRO_PATHS.register);        // '/account/register'
navigate(ACCOUNT_PRO_PATHS.forgotPassword);  // '/account/forgot-password'
navigate(ACCOUNT_PRO_PATHS.resetPassword);   // '/account/reset-password'
navigate(ACCOUNT_PRO_PATHS.manageProfile);   // '/account/manage-profile'
navigate(ACCOUNT_PRO_PATHS.changePassword);  // '/account/manage-profile/change-password'
navigate(ACCOUNT_PRO_PATHS.personalSettings);// '/account/manage-profile/personal-settings'
```

## TypeScript Support

The package exports all TypeScript interfaces:

```tsx
import type {
  AccountOptions,
  LoginFormData,
  RegisterFormData,
  TenantInfo,
  TenantIdResponse,
  RegisterRequest,
  RegisterResponse,
  SendPasswordResetCodeRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  ChangePasswordFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  PersonalSettingsFormData,
  UpdateProfileRequest,
  ProfileResponse,
  PasswordFlowResult,
} from '@abpjs/account-pro';
```

## Dependencies

- `@abpjs/core` - Core ABP React functionality
- `@abpjs/oauth` - OAuth authentication support

## Comparison with @abpjs/account

| Feature | @abpjs/account | @abpjs/account-pro |
|---------|----------------|-------------------|
| Login Form | ✓ | ✓ |
| Register Form | ✓ | ✓ |
| Tenant Box | ✓ | ✓ |
| Forgot Password | ✗ | ✓ |
| Reset Password | ✗ | ✓ |
| Change Password | ✗ | ✓ |
| Personal Settings | ✗ | ✓ |
| Profile Management | ✗ | ✓ |
| Two-Factor Auth | ✗ | ✓ |
| Social Logins | ✗ | ✓ |

## See Also

- [Core Module](../core/overview)
- [Theme Shared](../theme-shared/overview)
