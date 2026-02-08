---
sidebar_position: 99
---

# Release Notes

## v4.0.0

**February 2026**

### New Features

#### Admin Module

A new admin submodule providing account administration services, hooks, and models for managing account settings (general, LDAP, 2FA, captcha, external providers).

##### Admin Services

Five services for managing different account setting areas:

```tsx
import {
  AccountSettingsService,
  AccountLdapService,
  AccountTwoFactorSettingService,
  AccountCaptchaService,
  AccountExternalProviderService,
} from '@abpjs/account-pro';
import { useRestService } from '@abpjs/core';

const restService = useRestService();

// General account settings
const settingsService = new AccountSettingsService(restService);
const settings = await settingsService.getSettings();
await settingsService.updateSettings({ isSelfRegistrationEnabled: false });

// Captcha settings (v4.0.0)
const captchaService = new AccountCaptchaService(restService);
const captcha = await captchaService.getSettings();
await captchaService.updateSettings({ useCaptchaOnLogin: true });

// External provider settings (v4.0.0)
const externalService = new AccountExternalProviderService(restService);
const providers = await externalService.getSettings();
```

All admin services extend `AbstractAccountSettingsService<Type, SubmitType>` which provides `getSettings()` and `updateSettings(body)` methods.

##### Admin Hooks

Hooks for building account settings UIs:

```tsx
import {
  useAccountSettings,
  useAccountSettingsComponent,
  useAccountSettingsCaptcha,
  useAccountSettingsExternalProvider,
  useAccountSettingsTwoFactor,
} from '@abpjs/account-pro';

// Main settings component hook
const { isLdapSettingsEnabled, isCaptchaEnabled, isExternalProviderEnabled, isTenant } =
  useAccountSettingsComponent({
    isLdapSettingsEnabled: true,
    isCaptchaEnabled: true,
    isExternalProviderEnabled: true,
    isTenant: false,
  });

// Captcha settings hook (v4.0.0)
const { settings, loading, submit } = useAccountSettingsCaptcha({
  service: captchaService,
  isTenant: false,
});

// External provider settings hook (v4.0.0)
const { settings: providerSettings, submit: submitProviders } =
  useAccountSettingsExternalProvider({
    service: externalProviderService,
    isTenant: false,
  });
```

The hooks support tenant-aware settings mapping — when `isTenant` is `true`, settings are automatically filtered to tenant-specific fields before submission.

##### Admin Models

New TypeScript interfaces for captcha and external provider settings:

| Type | Description |
|------|-------------|
| `AccountCaptchaSettings` | Captcha configuration (login/registration flags, siteKey, siteSecret, version) |
| `AccountExternalProviderSetting` | Single external provider config (name, enabled, properties, secretProperties, useHostSettings) |
| `AccountExternalProviderSettings` | Collection of external provider settings |
| `AccountSettingsDto` | General account settings (isSelfRegistrationEnabled, enableLocalLogin) |
| `AccountLdapSettingsDto` | LDAP settings (enableLdapLogin) |

### Deprecations

The following exports are deprecated and will be removed in v5.0:

| Deprecated Export | Notes |
|-------------------|-------|
| `eAccountComponents` | Removed from Angular public-api in v4.0.0 |
| `eAccountRouteNames` (from `enums/`) | Removed from Angular public-api in v4.0.0 |
| `eAccountManageProfileTabNames` (from `config/enums`) | Removed from Angular config/enums in v4.0.0 |
| `ManageProfileTabsService` | Removed from Angular config/services in v4.0.0 |
| Route provider from `config/providers` | Route configuration moved; direct import still available |

---

## v3.2.0

**February 2026**

### New Features

#### ProfileService

A new service for managing profile pictures and two-factor authentication:

```tsx
import { ProfileService } from '@abpjs/account-pro';
import { useRestService } from '@abpjs/core';

function useProfilePicture() {
  const restService = useRestService();
  const profileService = new ProfileService(restService);

  // Get current user's profile picture
  const picture = await profileService.getProfilePicture();
  console.log(picture.type, picture.source);

  // Get another user's profile picture
  const userPicture = await profileService.getProfilePictureByUserId(userId);

  // Set profile picture (Gravatar)
  await profileService.setProfilePicture({
    type: ProfilePictureType.Gravatar,
  });

  // Set profile picture (custom image)
  await profileService.setProfilePicture({
    type: ProfilePictureType.Image,
    fileBytes: base64EncodedImage,
  });

  // Get 2FA status
  const is2FAEnabled = await profileService.getTwoFactorEnabled();

  // Enable/disable 2FA
  await profileService.setTwoFactorEnabled(true);
}
```

#### ManageProfileTabsService

A new service for managing profile tabs in the Manage Profile page:

```tsx
import {
  ManageProfileTabsService,
  getManageProfileTabsService,
} from '@abpjs/account-pro';

// Get singleton instance
const tabsService = getManageProfileTabsService();

// Add a custom tab
tabsService.add({
  name: 'MyCustomTab',
  component: MyCustomTabComponent,
  order: 5,
});

// Get visible tabs
const visibleTabs = tabsService.visible;

// Patch an existing tab
tabsService.patch('AbpAccount::ProfilePicture', {
  order: 10,
});
```

#### ProfilePictureType Enum

New enum for profile picture source types:

```tsx
import { ProfilePictureType } from '@abpjs/account-pro';

// Available values:
ProfilePictureType.None     // 0 - No profile picture
ProfilePictureType.Gravatar // 1 - Gravatar service
ProfilePictureType.Image    // 2 - Custom uploaded image
```

#### eTwoFactorBehaviour Enum

New enum for two-factor authentication behaviour policies:

```tsx
import { eTwoFactorBehaviour } from '@abpjs/account-pro';

// Available values:
eTwoFactorBehaviour.Optional // 0 - Users can choose to enable/disable
eTwoFactorBehaviour.Disabled // 1 - 2FA is disabled for all users
eTwoFactorBehaviour.Forced   // 2 - 2FA is required for all users
```

#### Manage Profile Tab Names

New constants for manage profile tab names:

```tsx
import { eAccountManageProfileTabNames } from '@abpjs/account-pro';

// Available tab names:
eAccountManageProfileTabNames.ProfilePicture   // 'AbpAccount::ProfilePicture'
eAccountManageProfileTabNames.ChangePassword   // 'AbpUi::ChangePassword'
eAccountManageProfileTabNames.PersonalSettings // 'AbpAccount::PersonalSettings'
eAccountManageProfileTabNames.TwoFactor        // 'AbpAccount::AccountSettingsTwoFactor'
```

#### New Component Key

New component replacement key for profile picture:

```tsx
import { eAccountComponents } from '@abpjs/account-pro';

// New in v3.2.0:
eAccountComponents.ProfilePicture // 'Account.ProfilePictureComponent'
```

#### New Model Types

**ProfilePictureInput** - Input for setting a profile picture:

```tsx
interface ProfilePictureInput {
  type: ProfilePictureType;
  fileBytes?: string;  // Base64 encoded, required when type is Image
}
```

**ProfilePictureSourceDto** - Profile picture source information:

```tsx
interface ProfilePictureSourceDto {
  type: ProfilePictureType;
  source: string;       // URL (Gravatar, blob, or empty)
  fileContent?: string; // Base64 encoded file content
}
```

**AccountTwoFactorSettingsDto** - Two-factor authentication settings:

```tsx
interface AccountTwoFactorSettingsDto {
  isEnabled: boolean;
  behaviour: eTwoFactorBehaviour;
}
```

### New Exports

**Services:**
- `ProfileService` - Profile picture and 2FA management
- `ManageProfileTabsService` - Manage profile tabs service
- `getManageProfileTabsService()` - Get singleton instance

**Enums:**
- `ProfilePictureType` - Profile picture source types
- `eTwoFactorBehaviour` - Two-factor behaviour policies
- `eAccountManageProfileTabNames` - Manage profile tab name constants

**Types:**
- `ProfilePictureInput` - Input for setting profile picture
- `ProfilePictureSourceDto` - Profile picture source data
- `AccountTwoFactorSettingsDto` - 2FA settings data
- `AccountManageProfileTabName` - Type for tab name values

**Constants:**
- `ACCOUNT_MANAGE_PROFILE_TAB_PROVIDERS` - Tab provider configuration
- `ACCOUNT_MANAGE_PROFILE_TAB_ORDERS` - Default tab ordering
- `ACCOUNT_MANAGE_PROFILE_TAB_NAMES` - Tab name constants
- `eAccountComponents.ProfilePicture` - Component replacement key

---

## v3.1.0

**February 2026**

### New Features

#### Email Confirmation Methods

New methods on `AccountProService` for email confirmation flow:

```tsx
import { useAccountProService } from '@abpjs/account-pro';

function EmailConfirmation() {
  const accountProService = useAccountProService();

  // Send confirmation token to a new email address
  const sendToken = async (newEmail: string) => {
    await accountProService.sendEmailConfirmationToken(newEmail);
  };

  // Confirm email with the received token
  const confirmEmail = async (userId: string, token: string, tenantId?: string) => {
    await accountProService.confirmEmail({ userId, token, tenantId });
  };
}
```

#### My Security Logs

New method on `AccountProService` to retrieve security logs for the current user:

```tsx
import { useAccountProService } from '@abpjs/account-pro';

function SecurityLogsPage() {
  const accountProService = useAccountProService();

  const loadSecurityLogs = async () => {
    const response = await accountProService.getMySecurityLogs({
      startTime: '2026-01-01T00:00:00Z',
      endTime: '2026-02-07T23:59:59Z',
      action: 'LoginSucceeded',
      skipCount: 0,
      maxResultCount: 10,
    });

    // response.items contains security log entries
    // response.totalCount contains total number of logs
  };
}
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `startTime` | `string` | Filter logs from this date (ISO format) |
| `endTime` | `string` | Filter logs until this date (ISO format) |
| `applicationName` | `string` | Filter by application name |
| `identity` | `string` | Filter by identity |
| `action` | `string` | Filter by action (e.g., `'LoginSucceeded'`, `'LoginFailed'`) |
| `clientId` | `string` | Filter by client ID |
| `correlationId` | `string` | Filter by correlation ID |
| `sorting` | `string` | Sort expression |
| `skipCount` | `number` | Number of items to skip (pagination) |
| `maxResultCount` | `number` | Maximum number of items to return |

**Response Item Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Log entry ID |
| `applicationName` | `string` | Application name |
| `identity` | `string` | Identity used |
| `action` | `string` | Action performed |
| `userId` | `string` | User ID |
| `userName` | `string` | User name |
| `tenantId` | `string` | Tenant ID |
| `tenantName` | `string` | Tenant name |
| `clientId` | `string` | Client ID |
| `correlationId` | `string` | Correlation ID |
| `clientIpAddress` | `string` | Client IP address |
| `browserInfo` | `string` | Browser information |
| `creationTime` | `string` | When the log was created |

#### New Route Names

New route name constants for email confirmation and security logs:

```tsx
import { eAccountRouteNames } from '@abpjs/account-pro';

// New route names in v3.1.0:
eAccountRouteNames.EmailConfirmation  // 'AbpAccount::EmailConfirmation'
eAccountRouteNames.MySecurityLogs     // 'AbpAccount::MySecurityLogs'
```

#### New Component Keys

New component replacement keys for email confirmation and security logs components:

```tsx
import { eAccountComponents } from '@abpjs/account-pro';

// New component keys in v3.1.0:
eAccountComponents.EmailConfirmation  // 'Account.EmailConfirmationComponent'
eAccountComponents.MySecurityLogs     // 'Account.MySecurityLogs'
```

### New Types

#### `AccountSettings`

Interface for general account configuration:

```tsx
interface AccountSettings {
  isSelfRegistrationEnabled: boolean;
  enableLocalLogin: boolean;
  isRememberBrowserEnabled: boolean;
}
```

#### `AccountLdapSettings`

Interface for LDAP authentication configuration:

```tsx
interface AccountLdapSettings {
  enableLdapLogin: boolean;
  ldapServerHost: string;
  ldapServerPort: string;
  ldapBaseDc: string;
  ldapUserName: string;
  ldapPassword: string;
}
```

#### `EmailConfirmationInput`

Interface for email confirmation parameters:

```tsx
interface EmailConfirmationInput {
  confirmationToken: string;
  userId: string;
  tenantId?: string;
}
```

### New Exports

- `AccountProService.sendEmailConfirmationToken(newEmail)` - Send email confirmation token
- `AccountProService.confirmEmail(params)` - Confirm email with token
- `AccountProService.getMySecurityLogs(params)` - Get current user's security logs
- `AccountSettings` - Interface for account settings
- `AccountLdapSettings` - Interface for LDAP settings
- `EmailConfirmationInput` - Interface for email confirmation input
- `eAccountRouteNames.EmailConfirmation` - Route name constant
- `eAccountRouteNames.MySecurityLogs` - Route name constant
- `eAccountComponents.EmailConfirmation` - Component replacement key
- `eAccountComponents.MySecurityLogs` - Component replacement key

---

## v3.0.0

**February 2026**

### New Features

#### Route Providers

New route provider system for initializing account routes:

```tsx
import { initializeAccountRoutes } from '@abpjs/account-pro';

// Call once during app initialization
initializeAccountRoutes();

// This registers:
// - /account (parent route, invisible)
// - /account/login
// - /account/register
// - /account/forgot-password
// - /account/reset-password
// - /account/manage
```

For advanced configuration with a custom RoutesService:

```tsx
import { configureRoutes, ACCOUNT_ROUTE_PROVIDERS } from '@abpjs/account-pro';
import { getRoutesService } from '@abpjs/core';

const routesService = getRoutesService();
const addRoutes = configureRoutes(routesService);
addRoutes();
```

#### Setting Tab Providers

New provider for registering account settings tabs:

```tsx
import {
  configureSettingTabs,
  ACCOUNT_SETTING_TAB_PROVIDERS,
} from '@abpjs/account-pro';
import { getSettingTabsService } from '@abpjs/core';
import { AccountSettingsComponent } from './components/AccountSettings';

const settingTabsService = getSettingTabsService();
const addTabs = configureSettingTabs(settingTabsService, {
  component: AccountSettingsComponent,
});
addTabs();
```

This registers an "Account" tab in the Settings page (requires `Volo.Account.SettingManagement` policy).

#### Setting Tab Names

New constants for account setting tab names:

```tsx
import { eAccountSettingTabNames } from '@abpjs/account-pro';

// Available setting tab names:
eAccountSettingTabNames.Account  // 'AbpAccount::Menu:Account'
```

#### Account Config Options

New interface for configuring the account module:

```tsx
import { AccountConfigOptions, ACCOUNT_OPTIONS, DEFAULT_ACCOUNT_OPTIONS } from '@abpjs/account-pro';

// Interface
interface AccountConfigOptions {
  redirectUrl?: string;  // Default: '/'
}

// Default options
const defaults = DEFAULT_ACCOUNT_OPTIONS;
// { redirectUrl: '/' }
```

#### Account Options Factory

New factory function for creating account options with defaults:

```tsx
import { accountOptionsFactory } from '@abpjs/account-pro';

// With custom redirect URL
const options = accountOptionsFactory({ redirectUrl: '/dashboard' });
// { redirectUrl: '/dashboard' }

// With defaults
const defaultOptions = accountOptionsFactory({});
// { redirectUrl: '/' }
```

#### Config Subpackage

The `@volo/abp.ng.account/config` functionality is now merged into the main package:

```tsx
// All config exports are available from the main package
import {
  configureRoutes,
  configureSettingTabs,
  ACCOUNT_ROUTE_PROVIDERS,
  ACCOUNT_SETTING_TAB_PROVIDERS,
  initializeAccountRoutes,
  eAccountRouteNames,
  eAccountSettingTabNames,
} from '@abpjs/account-pro';
```

### New Exports

- `initializeAccountRoutes()` - Initialize account routes
- `configureRoutes(routes)` - Configure routes with custom RoutesService
- `ACCOUNT_ROUTE_PROVIDERS` - Route provider configuration object
- `configureSettingTabs(settingTabs, options)` - Configure account setting tabs
- `ACCOUNT_SETTING_TAB_PROVIDERS` - Setting tab provider configuration
- `AccountSettingTabOptions` - Options interface for setting tab configuration
- `eAccountSettingTabNames` - Constants for setting tab names
- `AccountSettingTabNameKey` - Type for setting tab name values
- `AccountConfigOptions` - Interface for account configuration options
- `ACCOUNT_OPTIONS` - Symbol token for account options
- `DEFAULT_ACCOUNT_OPTIONS` - Default account options object
- `accountOptionsFactory(options)` - Create account options with defaults

---

## v2.9.0

**February 2026**

### New Features

#### Logo Component

New `Logo` component for displaying the application logo on account pages (login, register, etc.):

```tsx
import { Logo } from '@abpjs/account-pro';

// Default usage - displays app name as text
<Logo />

// With custom logo URL
<Logo logoUrl="/assets/logo.png" alt="My App Logo" />

// With custom dimensions
<Logo
  logoUrl="/assets/logo.png"
  maxWidth="200px"
  maxHeight="60px"
/>

// With custom children
<Logo>
  <img src="/custom-logo.svg" alt="Custom" />
</Logo>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logoUrl` | `string` | - | Custom logo URL. If not provided, uses the application name as text. |
| `alt` | `string` | `"Logo"` | Alt text for the logo image |
| `maxWidth` | `string` | `"150px"` | Maximum width of the logo |
| `maxHeight` | `string` | `"50px"` | Maximum height of the logo |
| `children` | `JSX.Element` | - | Custom children to render instead of the default logo |

#### Component Replacement Key

New component key for replacing the Logo component:

```tsx
import { eAccountComponents } from '@abpjs/account-pro';

// eAccountComponents.Logo = 'Account.LogoComponent'
```

### New Exports

- `Logo` - Logo component for account pages
- `LogoProps` - TypeScript interface for Logo component props
- `eAccountComponents.Logo` - Component replacement key for Logo

---

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
