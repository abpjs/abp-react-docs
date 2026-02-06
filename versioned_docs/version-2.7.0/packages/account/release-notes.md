---
sidebar_position: 99
---

# Release Notes

## v2.7.0

**February 2026**

### New Features

#### Component Replacement Keys

New constants for replacing account components:

```tsx
import { eAccountComponents } from '@abpjs/account';

// Available component keys:
// eAccountComponents.Login = 'Account.LoginComponent'
// eAccountComponents.Register = 'Account.RegisterComponent'
// eAccountComponents.ManageProfile = 'Account.ManageProfileComponent'
// eAccountComponents.TenantBox = 'Account.TenantBoxComponent'
// eAccountComponents.AuthWrapper = 'Account.AuthWrapperComponent'
// eAccountComponents.ChangePassword = 'Account.ChangePasswordComponent'
// eAccountComponents.PersonalSettings = 'Account.PersonalSettingsComponent'
```

#### Route Names

New constants for account route names (localization keys):

```tsx
import { eAccountRouteNames } from '@abpjs/account';

// Available route names:
// eAccountRouteNames.Account = 'AbpAccount::Menu:Account'
// eAccountRouteNames.Login = 'AbpAccount::Login'
// eAccountRouteNames.Register = 'AbpAccount::Register'
// eAccountRouteNames.ManageProfile = 'AbpAccount::ManageYourProfile'
```

#### TenantIdResponse Enhancement

The `TenantIdResponse` interface now includes the tenant name:

```tsx
interface TenantIdResponse {
  success: boolean;
  tenantId: string;
  name?: string; // New in v2.7.0
}
```

### New Exports

- `eAccountComponents` - Constants for component replacement keys
- `eAccountRouteNames` - Constants for route names (localization keys)

---

## v2.4.0

**February 2026**

### New Features

- **`AuthWrapper.isMultiTenancyEnabled` prop** - Control whether the tenant box is displayed in authentication forms:

  ```tsx
  import { AuthWrapper, LoginForm } from '@abpjs/account';

  function LoginPage() {
    return (
      <AuthWrapper
        mainContent={<LoginForm onSuccess={() => {}} />}
        isMultiTenancyEnabled={true} // Show tenant switching (default)
      />
    );
  }
  ```

  This corresponds to Angular's `isMultiTenancyEnabled$` observable. Defaults to `true`.

- **`AccountService.apiName` property** - New property for REST API configuration. Defaults to `'default'`:

  ```tsx
  import { useAccountService } from '@abpjs/account';

  function MyComponent() {
    const accountService = useAccountService();
    console.log(accountService.apiName); // 'default'
  }
  ```

---

## v2.2.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.1.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.0.0

**January 2026**

### Breaking Changes

- **`ACCOUNT_ROUTES` removed** - This deprecated export has been removed. Use `AccountProvider` to configure routes.

### New Features

- **`useSelfRegistrationEnabled` hook** - Check if self-registration is enabled from ABP settings:
  ```tsx
  import { useSelfRegistrationEnabled } from '@abpjs/account';

  function RegisterLink() {
    const isEnabled = useSelfRegistrationEnabled();
    if (!isEnabled) return null;
    return <Link to="/register">Register</Link>;
  }
  ```

- **`AuthWrapper.enableLocalLogin` prop** - Control visibility of local login forms:
  ```tsx
  <AuthWrapper enableLocalLogin={false}>
    {/* Shows disabled message instead of form */}
  </AuthWrapper>
  ```
  Reads from `Abp.Account.EnableLocalLogin` setting by default.

- **`LoginForm` respects self-registration setting** - Register link is automatically hidden when `Abp.Account.IsSelfRegistrationEnabled` is `false`

- **`RegisterForm` respects self-registration setting** - Automatically redirects to login if self-registration is disabled

- **`Account` namespace** - New TypeScript namespace with component interface types for type-safe customization

### ABP Settings Support

The following ABP settings are now respected:

| Setting | Effect |
|---------|--------|
| `Abp.Account.EnableLocalLogin` | Hides username/password login when `false` |
| `Abp.Account.IsSelfRegistrationEnabled` | Hides register link/page when `false` |

---

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
