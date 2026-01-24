---
sidebar_position: 3
---

# Register

The `@abpjs/account` package provides user registration components.

## RegisterForm Component

The `RegisterForm` component provides a complete registration interface:

```tsx
import { RegisterForm } from '@abpjs/account';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <RegisterForm
      onSuccess={() => navigate('/login')}
      onError={(error) => console.error('Registration failed:', error)}
      showLoginLink
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSuccess` | `() => void` | - | Called after successful registration |
| `onError` | `(error: Error) => void` | - | Called on registration error |
| `showLoginLink` | `boolean` | `false` | Show "Already have an account?" link |
| `loginPath` | `string` | `/login` | Path for login link |

## Form Fields

The RegisterForm includes the following fields:

- **Username** - Required, validated for format
- **Email** - Required, validated for email format
- **Password** - Required, validated for strength
- **Confirm Password** - Must match password

## Pre-built Register Page

Use the pre-built `RegisterPage` component:

```tsx
import { RegisterPage } from '@abpjs/account';
import { Route } from 'react-router-dom';

// In your routes
<Route path="/register" element={<RegisterPage />} />
```

## Custom Registration Form

Build a custom registration form:

```tsx
import { useState } from 'react';
import { RestService } from '@abpjs/core';
import { useToaster } from '@abpjs/theme-shared';

interface RegisterInput {
  userName: string;
  emailAddress: string;
  password: string;
  appName: string;
}

function CustomRegisterForm() {
  const [formData, setFormData] = useState<RegisterInput>({
    userName: '',
    emailAddress: '',
    password: '',
    appName: 'MyApp',
  });
  const [loading, setLoading] = useState(false);
  const toaster = useToaster();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await RestService.post('/api/account/register', formData);
      toaster.success('Registration successful! Please login.');
    } catch (error: any) {
      toaster.error(error.response?.data?.error?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}
```

## Styling

Customize the RegisterForm with Chakra UI:

```tsx
import { Box, Container, Heading } from '@chakra-ui/react';
import { RegisterForm } from '@abpjs/account';

function StyledRegisterPage() {
  return (
    <Container maxW="md" py={20}>
      <Box bg="white" p={8} borderRadius="lg" boxShadow="xl">
        <Heading size="lg" mb={6} textAlign="center">
          Create Account
        </Heading>
        <RegisterForm
          onSuccess={() => {}}
          showLoginLink
        />
      </Box>
    </Container>
  );
}
```

## Related

- [Login](/docs/packages/account/login) - Login form
- [Tenant Box](/docs/packages/account/tenant-box) - Multi-tenant switching
