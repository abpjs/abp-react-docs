---
sidebar_position: 3
---

# Quick Start

This guide shows you how to extend the ABP React template with new pages and features.

## Prerequisites

Make sure you have:
1. Created a project with `npx create-abp-react my-app`
2. Configured your [backend connection](/docs/getting-started/project-setup)

## What You Start With

The template includes a working home page with login functionality. Run your app:

```bash
cd my-app
pnpm dev
```

Visit `http://localhost:5173` to see the home page.

## Adding a New Page

Let's add a dashboard page that displays user information after login.

### 1. Create the Dashboard Component

```tsx title="src/pages/Dashboard.tsx"
import { Box, Card, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useAuth, useLocalization, useSession } from '@abpjs/core';

export function DashboardPage() {
  const { logout } = useAuth();
  const { t } = useLocalization();
  const { currentUser } = useSession();

  return (
    <Box p={6}>
      <VStack gap={6} align="stretch">
        <Heading size="lg">
          {t('Welcome')}, {currentUser?.userName}!
        </Heading>

        <Card.Root>
          <Card.Body>
            <VStack align="start" gap={2}>
              <Text><strong>Email:</strong> {currentUser?.email}</Text>
              <Text><strong>Name:</strong> {currentUser?.name} {currentUser?.surName}</Text>
              <Text><strong>Tenant:</strong> {currentUser?.tenantId || 'Host'}</Text>
            </VStack>
          </Card.Body>
        </Card.Root>

        <Button colorPalette="red" onClick={logout}>
          {t('Logout')}
        </Button>
      </VStack>
    </Box>
  );
}
```

### 2. Export the Page

```tsx title="src/pages/index.ts"
export { HomePage } from './Home';
export { DashboardPage } from './Dashboard';
```

### 3. Add the Route

Update `App.tsx` to include the dashboard route:

```tsx title="src/App.tsx"
import { Routes, Route } from 'react-router-dom';
import { LayoutApplication, LayoutAccount } from '@abpjs/theme-basic';
import { LoginPage } from '@abpjs/account';
import { HomePage, DashboardPage } from './pages';

function App() {
  return (
    <Routes>
      {/* Main app pages with LayoutApplication */}
      <Route element={<LayoutApplication />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      {/* Auth pages with LayoutAccount */}
      <Route element={<LayoutAccount />}>
        <Route path="/account/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
```

### 4. Register the Route

Add the dashboard route to `main.tsx`:

```tsx title="src/main.tsx"
// Update appRoutes to include dashboard
const appRoutes: ABP.FullRoute[] = [
  { name: 'Home', path: '', order: 1, layout: eLayoutType.application },
  { name: 'Dashboard', path: 'dashboard', order: 2, layout: eLayoutType.application },
];
```

## Adding Navigation Items

Add the dashboard to the sidebar navigation by defining route metadata:

```tsx title="src/main.tsx"
import { LuHome, LuLayoutDashboard } from 'lucide-react';

const appRoutes: ABP.FullRoute[] = [
  {
    name: 'Home',
    path: '',
    order: 1,
    layout: eLayoutType.application,
    iconClass: LuHome,
  },
  {
    name: 'Dashboard',
    path: 'dashboard',
    order: 2,
    layout: eLayoutType.application,
    iconClass: LuLayoutDashboard,
  },
];
```

## Protected Routes

To require authentication for a route, use the `AuthGuard` from `@abpjs/core`:

```tsx
import { AuthGuard } from '@abpjs/core';

// In your routes
<Route element={<LayoutApplication />}>
  <Route path="/" element={<HomePage />} />
  <Route
    path="/dashboard"
    element={
      <AuthGuard>
        <DashboardPage />
      </AuthGuard>
    }
  />
</Route>
```

Or define it in the route configuration:

```tsx
const appRoutes: ABP.FullRoute[] = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    order: 2,
    layout: eLayoutType.application,
    requiredPolicy: 'AbpAccount.SettingManagement', // Requires this permission
  },
];
```

## Using Toasts

Show feedback messages using the `Toaster` service:

```tsx
import { Toaster } from '@abpjs/theme-shared';

function SaveButton() {
  const handleSave = async () => {
    try {
      await saveData();
      Toaster.success('Data saved successfully!');
    } catch (error) {
      Toaster.error('Failed to save data', 'Error');
    }
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

## Using Confirmation Dialogs

Ask for user confirmation before destructive actions:

```tsx
import { Confirmation, Toaster } from '@abpjs/theme-shared';

async function handleDelete() {
  const status = await Confirmation.warn(
    'Are you sure you want to delete this item?',
    'Delete Confirmation'
  );

  if (status === Toaster.Status.confirm) {
    await deleteItem();
    Toaster.success('Item deleted');
  }
}
```

## Using Localization

Translate text using the `useLocalization` hook:

```tsx
import { useLocalization } from '@abpjs/core';

function MyComponent() {
  const { t } = useLocalization();

  return (
    <div>
      <h1>{t('Welcome')}</h1>
      <p>{t('HelloUser', { name: 'John' })}</p>
      <button>{t('AbpAccount::Login')}</button>
    </div>
  );
}
```

## Checking Permissions

Control feature visibility based on user permissions:

```tsx
import { usePermission } from '@abpjs/core';

function AdminPanel() {
  const { hasPermission } = usePermission();

  if (!hasPermission('AbpIdentity.Users')) {
    return null;
  }

  return <UserManagement />;
}
```

## Next Steps

Now that you have a working application, explore more features:

- [Authentication](/docs/packages/core/authentication) - Advanced auth configuration
- [User Management](/docs/packages/identity/users) - Manage users
- [Role Management](/docs/packages/identity/roles) - Manage roles
- [Permissions](/docs/packages/core/permissions) - Control access
- [Multi-tenancy](/docs/guides/multi-tenancy) - Add tenant support
- [Layouts](/docs/packages/theme-basic/layouts) - Customize layouts
