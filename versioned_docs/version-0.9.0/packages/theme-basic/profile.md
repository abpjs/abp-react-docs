---
sidebar_position: 4
---

# Profile

:::warning Deprecated in v0.9.0
The `Profile` and `ChangePassword` components have moved to `@abpjs/theme-shared`. Import from there instead:

```tsx
import { Profile, ChangePassword } from '@abpjs/theme-shared';
```

See [@abpjs/theme-shared Profile documentation](../theme-shared/profile) for the latest docs.
:::

The `@abpjs/theme-basic` package provides modal-based components for user profile management.

## Profile Component

The `Profile` component is a modal that displays and allows editing of user profile information:

```tsx
import { Profile } from '@abpjs/theme-basic';
import { useState } from 'react';

function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>My Profile</button>
      <Profile visible={isOpen} onVisibleChange={setIsOpen} />
    </>
  );
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `visible` | `boolean` | Controls modal visibility |
| `onVisibleChange` | `(visible: boolean) => void` | Callback when visibility changes |

### Features

- Display user information (name, email, phone)
- Edit profile fields
- Form validation
- Save functionality

## ChangePassword Component

The `ChangePassword` component is a modal for changing passwords:

```tsx
import { ChangePassword } from '@abpjs/theme-basic';
import { useState } from 'react';

function SecurityButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Change Password</button>
      <ChangePassword visible={isOpen} onVisibleChange={setIsOpen} />
    </>
  );
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `visible` | `boolean` | Controls modal visibility |
| `onVisibleChange` | `(visible: boolean) => void` | Callback when visibility changes |

### Features

- Current password field
- New password field with validation
- Confirm password field
- Password strength requirements

## useProfile Hook

For custom profile implementations, use the hook from `@abpjs/core`:

```tsx
import { useProfile } from '@abpjs/core';

function CustomProfile() {
  const {
    profile,
    loading,
    updateProfile,
    changePassword,
    refresh,
  } = useProfile();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <p>Username: {profile?.userName}</p>
      <p>Email: {profile?.email}</p>
      <p>Name: {profile?.name} {profile?.surname}</p>
      <p>Phone: {profile?.phoneNumber}</p>
    </div>
  );
}
```

## API Reference

### Profile Data

```tsx
interface ProfileDto {
  userName: string;
  email: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
}
```

### Update Profile

```tsx
import { useProfile } from '@abpjs/core';
import { useToaster } from '@abpjs/theme-shared';

function ProfileForm() {
  const { profile, updateProfile } = useProfile();
  const toaster = useToaster();

  const handleSubmit = async (formData: ProfileDto) => {
    try {
      await updateProfile(formData);
      toaster.success('Profile updated successfully!', 'Success');
    } catch (error) {
      toaster.error('Failed to update profile', 'Error');
    }
  };

  // ... form implementation
}
```

### Change Password

```tsx
import { useProfile } from '@abpjs/core';
import { useToaster } from '@abpjs/theme-shared';

interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

function PasswordForm() {
  const { changePassword } = useProfile();
  const toaster = useToaster();

  const handleChangePassword = async (data: ChangePasswordInput) => {
    try {
      await changePassword(data.currentPassword, data.newPassword);
      toaster.success('Password changed successfully!', 'Success');
    } catch (error) {
      toaster.error('Failed to change password', 'Error');
    }
  };

  // ... form implementation
}
```

## User Menu Example

Add profile and password modals to a user dropdown menu:

```tsx
import { Profile, ChangePassword } from '@abpjs/theme-basic';
import { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { User, Lock, LogOut } from 'lucide-react';

function UserMenu() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  return (
    <>
      <Menu>
        <MenuButton as={Button}>Account</MenuButton>
        <MenuList>
          <MenuItem icon={<User size={16} />} onClick={() => setProfileOpen(true)}>
            My Profile
          </MenuItem>
          <MenuItem icon={<Lock size={16} />} onClick={() => setPasswordOpen(true)}>
            Change Password
          </MenuItem>
          <MenuItem icon={<LogOut size={16} />}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>

      <Profile visible={profileOpen} onVisibleChange={setProfileOpen} />
      <ChangePassword visible={passwordOpen} onVisibleChange={setPasswordOpen} />
    </>
  );
}
```

## Related

- [Authentication](/docs/packages/core/authentication) - Auth management
- [Layouts](/docs/packages/theme-basic/layouts) - Layout components
