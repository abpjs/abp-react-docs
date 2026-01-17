---
sidebar_position: 3
---

# Quick Start

Build a working login page with ABP React in minutes.

## Prerequisites

Make sure you have completed the [Project Setup](/docs/getting-started/project-setup) guide.

## Create a Login Page

Use the pre-built `LoginForm` component from `@abpjs/account`:

```tsx title="src/pages/LoginPage.tsx"
import { LoginForm } from '@abpjs/account';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Heading } from '@chakra-ui/react';

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <Container maxW="md" py={10}>
      <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
        <Heading size="lg" mb={6} textAlign="center">
          Sign In
        </Heading>
        <LoginForm
          onSuccess={() => navigate('/dashboard')}
          onError={(error) => console.error('Login failed:', error)}
          showRegisterLink
          showForgotPassword
        />
      </Box>
    </Container>
  );
}
```

## Create a Dashboard Page

Create a simple dashboard that shows user information:

```tsx title="src/pages/DashboardPage.tsx"
import { useAuth, useLocalization, useProfile } from '@abpjs/core';
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';

export function DashboardPage() {
  const { logout } = useAuth();
  const { t } = useLocalization();
  const { profile } = useProfile();

  return (
    <Container maxW="lg" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading>{t('Welcome')}, {profile?.userName}!</Heading>

        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Text><strong>Email:</strong> {profile?.email}</Text>
          <Text><strong>Name:</strong> {profile?.name} {profile?.surname}</Text>
        </Box>

        <Button colorScheme="red" onClick={logout}>
          {t('Logout')}
        </Button>
      </VStack>
    </Container>
  );
}
```

## Set Up Routes

Configure your routes with authentication:

```tsx title="src/App.tsx"
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth, ApplicationConfigurationService, configSlice } from '@abpjs/core';
import { environment } from './config/environment';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const config = await ApplicationConfigurationService.get(environment.apiUrl);
        dispatch(configSlice.actions.setConfig(config));
      } finally {
        setLoading(false);
      }
    };
    loadConfig();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
```

## Using Layouts

Wrap your pages with the Application layout for a complete UI:

```tsx title="src/App.tsx"
import { LayoutApplication } from '@abpjs/theme-basic';

// In your routes:
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <LayoutApplication>
        <DashboardPage />
      </LayoutApplication>
    </ProtectedRoute>
  }
/>
```

## Adding Notifications

Use the toaster for user feedback:

```tsx
import { useToaster } from '@abpjs/theme-shared';

function MyComponent() {
  const toaster = useToaster();

  const handleSave = async () => {
    try {
      await saveData();
      toaster.success('Data saved successfully!');
    } catch (error) {
      toaster.error('Failed to save data');
    }
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

## Next Steps

Now that you have a working application, explore more features:

- [Authentication](/docs/packages/core/authentication) - Advanced auth configuration
- [User Management](/docs/packages/identity/users) - Manage users
- [Role Management](/docs/packages/identity/roles) - Manage roles
- [Permissions](/docs/packages/core/permissions) - Control access
- [Multi-tenancy](/docs/guides/multi-tenancy) - Add tenant support
