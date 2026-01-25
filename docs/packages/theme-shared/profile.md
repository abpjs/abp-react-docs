---
sidebar_position: 5
---

# Profile & ChangePassword

:::info New in v0.9.0
These components moved from `@abpjs/theme-basic` to `@abpjs/theme-shared` in v0.9.0.
:::

## Profile Component

Modal for editing user profile information.

```tsx
import { Profile } from '@abpjs/theme-shared';
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

Modal for changing the user's password.

```tsx
import { ChangePassword } from '@abpjs/theme-shared';
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

For custom implementations, use the hook from `@abpjs/core`:

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
    </div>
  );
}
```

## User Menu Example

```tsx
import { Profile, ChangePassword } from '@abpjs/theme-shared';
import { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';

function UserMenu() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  return (
    <>
      <Menu>
        <MenuButton as={Button}>Account</MenuButton>
        <MenuList>
          <MenuItem onClick={() => setProfileOpen(true)}>My Profile</MenuItem>
          <MenuItem onClick={() => setPasswordOpen(true)}>Change Password</MenuItem>
        </MenuList>
      </Menu>

      <Profile visible={profileOpen} onVisibleChange={setProfileOpen} />
      <ChangePassword visible={passwordOpen} onVisibleChange={setPasswordOpen} />
    </>
  );
}
```
