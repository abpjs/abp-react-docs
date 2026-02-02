---
sidebar_position: 99
---

# Release Notes

## v2.7.0

**February 2026**

### New Features

#### Component Replacement Keys

New constants for replacing account pro components:

```tsx
import { eAccountComponents } from '@abpjs/account-pro';

// Available component keys:
// eAccountComponents.Account = 'Account.AccountComponent'
// eAccountComponents.Login = 'Account.LoginComponent'
// eAccountComponents.Register = 'Account.RegisterComponent'
// eAccountComponents.ForgotPassword = 'Account.ForgotPasswordComponent'
// eAccountComponents.ResetPassword = 'Account.ResetPasswordComponent'
// eAccountComponents.ManageProfile = 'Account.ManageProfileComponent'
// eAccountComponents.TenantBox = 'Account.TenantBoxComponent'
// eAccountComponents.ChangePassword = 'Account.ChangePasswordComponent'
// eAccountComponents.PersonalSettings = 'Account.PersonalSettingsComponent'
```

#### Route Names

New constants for account pro route names (localization keys):

```tsx
import { eAccountRouteNames } from '@abpjs/account-pro';

// Available route names:
// eAccountRouteNames.Account = 'AbpAccount::Menu:Account'
// eAccountRouteNames.Login = 'AbpAccount::Login'
// eAccountRouteNames.Register = 'AbpAccount::Register'
// eAccountRouteNames.ForgotPassword = 'AbpAccount::ForgotPassword'
// eAccountRouteNames.ResetPassword = 'AbpAccount::ResetPassword'
// eAccountRouteNames.ManageProfile = 'AbpAccount::ManageYourProfile'
```

### New Exports

- `eAccountComponents` - Constants for component replacement keys
- `AccountComponentKey` - Type for account component key values
- `eAccountRouteNames` - Constants for route names (localization keys)
- `AccountRouteNameKey` - Type for account route name values

---

## v2.4.0

**February 2026**

### New Features

- **`AccountProService.apiName` property** - New property for REST API configuration. Defaults to `'default'`.

- **Phone number confirmation methods** - New methods for SMS-based phone verification:

  ```tsx
  import { useAccountProService } from '@abpjs/account-pro';

  function PhoneVerification() {
    const accountProService = useAccountProService();

    const sendCode = async () => {
      // Send confirmation token to user's phone
      await accountProService.sendPhoneNumberConfirmationToken();
    };

    const confirmPhone = async (token: string) => {
      // Confirm phone number with the received token
      await accountProService.confirmPhoneNumber(token);
    };
  }
  ```

- **`ProfileResponse.phoneNumberConfirmed` field** - New field indicating whether the user's phone number is confirmed.

### Deprecations

- **`ProfileResponse.isPhoneNumberConfirmed`** - Deprecated in favor of `phoneNumberConfirmed`. Will be removed in a future version.

---

## v2.2.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.1.1

**February 2026**

- Version alignment with @abpjs/core v2.1.0

---

## v2.0.0

**January 2026**

### New Features

- **`enableLocalLogin` option** - New configuration option for `AccountProProvider` to control local login visibility:
  ```tsx
  <AccountProProvider options={{ enableLocalLogin: false }}>
    {/* Only social login providers will be available */}
  </AccountProProvider>
  ```

- **`isSelfRegistrationEnabled` prop** - New prop on `LoginForm` and `RegisterForm` components to control self-registration:
  - On `LoginForm`: When `false`, hides the register link regardless of `showRegisterLink` setting
  - On `RegisterForm`: When `false`, displays a message and redirects to login instead of showing the form

- **Component Interface Types** - Added TypeScript interfaces for component inputs/outputs:
  - `Account.TenantBoxComponentInputs` / `Account.TenantBoxComponentOutputs`
  - `Account.PersonalSettingsComponentInputs` / `Account.PersonalSettingsComponentOutputs`
  - `Account.ChangePasswordComponentInputs` / `Account.ChangePasswordComponentOutputs`

### Example

```tsx
import { LoginForm, RegisterForm } from '@abpjs/account-pro';

// Login form with self-registration disabled
<LoginForm
  showTenantBox={true}
  showRegisterLink={true}
  isSelfRegistrationEnabled={false}  // Register link won't show
/>

// Register form with self-registration disabled
<RegisterForm
  isSelfRegistrationEnabled={false}  // Shows disabled message
/>
```

---

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
