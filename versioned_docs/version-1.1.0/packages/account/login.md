---
sidebar_position: 2
---

# Login

The `@abpjs/account` package provides ready-to-use login components.

## LoginForm Component

The `LoginForm` component provides a complete login interface:

```tsx
import { LoginForm } from '@abpjs/account';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <LoginForm
      onSuccess={() => navigate('/dashboard')}
      onError={(error) => console.error('Login failed:', error)}
      showRegisterLink
      showForgotPassword
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSuccess` | `() => void` | - | Called after successful login |
| `onError` | `(error: Error) => void` | - | Called on login error |
| `showRegisterLink` | `boolean` | `false` | Show "Create account" link |
| `showForgotPassword` | `boolean` | `false` | Show "Forgot password" link |
| `registerPath` | `string` | `/register` | Path for registration link |

## Using usePasswordFlow Hook

For custom login implementations, use the `usePasswordFlow` hook:

```tsx
import { usePasswordFlow } from '@abpjs/account';
import { useState } from 'react';

function CustomLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = usePasswordFlow();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      // Redirect on success
    } catch (err) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
}
```

## Pre-built Login Page

Use the pre-built `LoginPage` component for a complete page:

```tsx
import { LoginPage } from '@abpjs/account';
import { Route } from 'react-router-dom';

// In your routes
<Route path="/login" element={<LoginPage />} />
```

## Styling the Login Form

The LoginForm uses Chakra UI. Customize with Chakra's theme:

```tsx
import { Box, Container } from '@chakra-ui/react';
import { LoginForm } from '@abpjs/account';

function StyledLoginPage() {
  return (
    <Container maxW="md" py={20}>
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="xl"
      >
        <LoginForm onSuccess={() => {}} />
      </Box>
    </Container>
  );
}
```

## Related

- [Register](/docs/packages/account/register) - Registration form
- [Tenant Box](/docs/packages/account/tenant-box) - Multi-tenant switching
- [Authentication](/docs/packages/core/authentication) - Auth configuration
