---
sidebar_position: 4
---

# Error Handling

The `@abpjs/theme-shared` package provides global error handling for ABP applications.

## useErrorHandler Hook

The `useErrorHandler` hook provides global error handling:

```tsx
import { useErrorHandler } from '@abpjs/theme-shared';

function ErrorHandlerSetup() {
  const { handleError } = useErrorHandler();

  // Use handleError to process errors
  const fetchData = async () => {
    try {
      await api.getData();
    } catch (error) {
      handleError(error);
    }
  };

  return null;
}
```

## Error Types

The error handler processes different types of errors:

### ABP Business Errors

```json
{
  "error": {
    "code": "App:UserNotFound",
    "message": "User with the given ID was not found.",
    "details": "...",
    "validationErrors": []
  }
}
```

### Validation Errors

```json
{
  "error": {
    "code": null,
    "message": "Validation failed",
    "validationErrors": [
      {
        "message": "Email is required",
        "members": ["email"]
      }
    ]
  }
}
```

### HTTP Errors

Standard HTTP errors (401, 403, 404, 500, etc.)

## Automatic Error Handling

The `ThemeSharedProvider` sets up automatic error handling:

```tsx
import { ThemeSharedProvider } from '@abpjs/theme-shared';

function App() {
  return (
    <ThemeSharedProvider>
      {/* Errors are automatically caught and displayed */}
      <MyApp />
    </ThemeSharedProvider>
  );
}
```

## Manual Error Handling

Handle errors manually in your code:

```tsx
import { useToaster } from '@abpjs/theme-shared';

function MyComponent() {
  const toaster = useToaster();

  const handleSubmit = async () => {
    try {
      await api.createUser(data);
      toaster.success('User created!');
    } catch (error: any) {
      // Handle ABP error format
      if (error.response?.data?.error) {
        const abpError = error.response.data.error;

        // Show validation errors
        if (abpError.validationErrors?.length > 0) {
          abpError.validationErrors.forEach((ve) => {
            toaster.error(ve.message);
          });
        } else {
          toaster.error(abpError.message);
        }
      } else {
        // Generic error
        toaster.error('An unexpected error occurred');
      }
    }
  };

  // ...
}
```

## Custom Error Handler

Create a custom error handler:

```tsx
import { useToaster } from '@abpjs/theme-shared';
import { useCallback } from 'react';

function useCustomErrorHandler() {
  const toaster = useToaster();

  const handleError = useCallback((error: any) => {
    // Network error
    if (!error.response) {
      toaster.error('Network error. Please check your connection.');
      return;
    }

    const status = error.response.status;
    const abpError = error.response.data?.error;

    switch (status) {
      case 400:
        if (abpError?.validationErrors?.length > 0) {
          abpError.validationErrors.forEach((ve: any) => {
            toaster.error(ve.message);
          });
        } else {
          toaster.error(abpError?.message || 'Invalid request');
        }
        break;

      case 401:
        toaster.error('Please login to continue');
        // Redirect to login
        break;

      case 403:
        toaster.error('You do not have permission for this action');
        break;

      case 404:
        toaster.error('Resource not found');
        break;

      case 500:
        toaster.error('Server error. Please try again later.');
        break;

      default:
        toaster.error(abpError?.message || 'An error occurred');
    }
  }, [toaster]);

  return { handleError };
}
```

## Error Boundary

Create an error boundary for React errors:

```tsx
import { Component, ReactNode } from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={8} textAlign="center">
          <Heading size="lg" mb={4}>Something went wrong</Heading>
          <Text mb={4}>{this.state.error?.message}</Text>
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <MyApp />
    </ErrorBoundary>
  );
}
```

## Related

- [Toaster](/docs/packages/theme-shared/toaster) - Toast notifications
- [Confirmation](/docs/packages/theme-shared/confirmation) - Confirmation dialogs
- [REST Service](/docs/packages/core/rest-service) - HTTP client
