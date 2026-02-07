---
sidebar_position: 5
---

# Manage Profile

The `@abpjs/account` package provides components for user profile management, including personal settings and password change.

## ManageProfile Component

The `ManageProfile` component provides a complete tabbed interface for profile management:

```tsx
import { ManageProfile } from '@abpjs/account';

function ProfilePage() {
  return (
    <ManageProfile
      defaultTabIndex={0}
      onTabChange={(index) => console.log('Tab changed to', index)}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultTabIndex` | `number` | `0` | Initial tab to display |
| `onTabChange` | `(index: number) => void` | - | Called when tab changes |
| `customTabs` | `ProfileTab[]` | - | Custom tabs to replace defaults |

## PersonalSettingsForm Component

For standalone use, the `PersonalSettingsForm` component allows users to update their profile information:

```tsx
import { PersonalSettingsForm } from '@abpjs/account';

function SettingsPage() {
  return (
    <PersonalSettingsForm
      onSuccess={() => console.log('Profile updated!')}
      onError={(error) => console.error(error)}
    />
  );
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `onSuccess` | `() => void` | Called after successful update |
| `onError` | `(error: string) => void` | Called on update error |

### Fields

The form includes the following fields with validation:

- **Username** - Required, max 255 characters
- **Email** - Required, valid email format
- **Name** - Optional, max 64 characters
- **Surname** - Optional, max 64 characters
- **Phone Number** - Optional, max 16 characters

## ChangePasswordForm Component

The `ChangePasswordForm` component allows users to change their password:

```tsx
import { ChangePasswordForm } from '@abpjs/account';

function PasswordPage() {
  return (
    <ChangePasswordForm
      onSuccess={() => console.log('Password changed!')}
      onError={(error) => console.error(error)}
    />
  );
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `onSuccess` | `() => void` | Called after successful password change |
| `onError` | `(error: string) => void` | Called on password change error |

### Password Requirements

The password must meet the following requirements:

- Minimum 6 characters
- Maximum 32 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number
- At least one special character

## AuthWrapper Component

The `AuthWrapper` component provides consistent layout for authentication forms:

```tsx
import { AuthWrapper, LoginForm } from '@abpjs/account';
import { Link } from 'react-router-dom';

function CustomLoginPage() {
  return (
    <AuthWrapper
      mainContent={<LoginForm onSuccess={() => {}} />}
      cancelContent={<Link to="/register">Create account</Link>}
    />
  );
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Main content (alternative to mainContent) |
| `mainContent` | `ReactNode` | Main content to render |
| `cancelContent` | `ReactNode` | Footer/cancel content area |
| `enableLocalLogin` | `boolean` | Control local login visibility (v2.0.0) |

### Local Login Setting (v2.0.0)

The `AuthWrapper` automatically reads the `Abp.Account.EnableLocalLogin` setting. When disabled, it shows a message instead of the login form:

```tsx
// Override the setting value
<AuthWrapper enableLocalLogin={true}>
  {/* Always show login form, regardless of setting */}
</AuthWrapper>

// Let the setting control visibility (default)
<AuthWrapper>
  {/* Shows form or disabled message based on ABP setting */}
</AuthWrapper>
```

## Custom Tabs

You can provide custom tabs to the `ManageProfile` component:

```tsx
import { ManageProfile } from '@abpjs/account';

function CustomProfilePage() {
  const customTabs = [
    {
      id: 'personal',
      label: 'Personal Info',
      content: <MyCustomPersonalForm />,
    },
    {
      id: 'security',
      label: 'Security',
      content: <MyCustomSecurityForm />,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      content: <MyNotificationSettings />,
    },
  ];

  return <ManageProfile customTabs={customTabs} />;
}
```

## Related

- [Login](./login) - Login form
- [Register](./register) - Registration form
- [Profile State](../core/session#profilestateservice-v110) - ProfileStateService from @abpjs/core
