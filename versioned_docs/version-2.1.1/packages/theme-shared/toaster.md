---
sidebar_position: 2
---

# Toaster

The `useToaster` hook provides toast notifications for user feedback.

## Basic Usage

```tsx
import { useToaster } from '@abpjs/theme-shared';

function NotificationExample() {
  const toaster = useToaster();

  return (
    <div>
      <button onClick={() => toaster.success('Operation successful!', 'Success')}>
        Success
      </button>
      <button onClick={() => toaster.error('Something went wrong!', 'Error')}>
        Error
      </button>
      <button onClick={() => toaster.warn('Please be careful!', 'Warning')}>
        Warning
      </button>
      <button onClick={() => toaster.info('Here is some information', 'Info')}>
        Info
      </button>
    </div>
  );
}
```

## API Reference

### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `success` | `(message, title?, options?)` | `number` | Show success toast |
| `error` | `(message, title?, options?)` | `number` | Show error toast |
| `warn` | `(message, title?, options?)` | `number` | Show warning toast |
| `info` | `(message, title?, options?)` | `number` | Show info toast |
| `show` | `(message, title?, severity?, options?)` | `number` | Show toast with specified severity (v2.0.0) |
| `clear` | `(containerKey?: string)` | `void` | Clear all toasts (or by container key) |
| `remove` | `(id: number)` | `void` | Remove specific toast |
| `subscribe` | `(callback)` | `() => void` | Subscribe to toast updates (v2.0.0) |

:::note
Since v1.1.0, `message` and `title` accept `Config.LocalizationParam` (string or `{ key, defaultValue }`).
:::

:::warning Breaking Change (v2.0.0)
Methods now return a `number` (toast ID) instead of `Promise<Toaster.Status>`. Use `toaster.remove(id)` to programmatically remove a toast.
:::

### Toast Options

```tsx
interface ToastOptions {
  life?: number;          // Duration in ms
  sticky?: boolean;       // If true, won't auto-dismiss
  closable?: boolean;     // Show close button
  tapToDismiss?: boolean; // Dismiss on tap (v2.0.0)
  containerKey?: string;  // Target specific container (v2.0.0)
}
```

### Severity Types (v2.0.0)

```tsx
type Severity = 'neutral' | 'success' | 'info' | 'warning' | 'error';
```

:::warning Breaking Change (v2.0.0)
The `'warn'` severity has been renamed to `'warning'`. The `warn()` method still works but internally uses `'warning'`.
:::

## With Title

```tsx
const toaster = useToaster();

toaster.success('Changes saved successfully!', 'Success');

toaster.error('Please try again later', 'Connection Error');
```

## Custom Duration

```tsx
const toaster = useToaster();

// Show for 10 seconds
toaster.info('This message will stay longer', 'Info', {
  life: 10000,
});

// Stay until manually closed
toaster.warn('Important warning', 'Warning', {
  sticky: true,
  closable: true,
});
```

## After API Calls

```tsx
import { useToaster } from '@abpjs/theme-shared';
import { RestService } from '@abpjs/core';

function CreateUserForm() {
  const toaster = useToaster();

  const handleSubmit = async (data: CreateUserInput) => {
    try {
      await RestService.post('/api/identity/users', data);
      toaster.success('User created successfully!', 'Success');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error?.message || 'Failed to create user';
      toaster.error(errorMessage, 'Error');
    }
  };

  // ...
}
```

## Clear All Toasts

```tsx
const toaster = useToaster();

// Clear all visible toasts
toaster.clear();

// Clear toasts in a specific container (v2.0.0)
toaster.clear('my-container');
```

## Managing Toast IDs (v2.0.0)

Toast methods now return a numeric ID that you can use to remove toasts programmatically:

```tsx
const toaster = useToaster();

// Store the toast ID
const toastId = toaster.info('Processing...', 'Please wait', { sticky: true });

// Later, remove the toast
toaster.remove(toastId);
```

## Multiple Containers (v2.0.0)

Use `containerKey` to show toasts in specific containers:

```tsx
import { ToastContainer, useToaster } from '@abpjs/theme-shared';

function App() {
  const toaster = useToaster();

  // Show toast in specific container
  toaster.info('Sidebar notification', undefined, { containerKey: 'sidebar' });

  return (
    <div>
      <aside>
        <ToastContainer containerKey="sidebar" position="top" />
      </aside>
      <main>
        <ToastContainer /> {/* Default container */}
      </main>
    </div>
  );
}
```

## Subscribe to Toast Updates (v2.0.0)

Subscribe to toast state changes using the observable pattern:

```tsx
import { useToaster, useEffect } from '@abpjs/theme-shared';

function ToastLogger() {
  const toaster = useToaster();

  useEffect(() => {
    const unsubscribe = toaster.subscribe((toasts) => {
      console.log('Current toasts:', toasts.length);
    });

    return () => unsubscribe();
  }, [toaster]);

  return null;
}
```

## Form Submission Pattern

```tsx
import { useToaster } from '@abpjs/theme-shared';
import { useState } from 'react';

function Form() {
  const toaster = useToaster();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitForm();
      toaster.success('Form submitted successfully!', 'Success');
    } catch (error) {
      toaster.error('Failed to submit form. Please try again.', 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

## Localization Support (v1.1.0)

Toast messages and titles now accept `Config.LocalizationParam` for automatic localization:

```tsx
import { useToaster } from '@abpjs/theme-shared';

function LocalizedToasts() {
  const toaster = useToaster();

  // String key (resolved via localization)
  toaster.success('AbpIdentity::UserCreated', 'AbpIdentity::Success');

  // With default value fallback
  toaster.success(
    { key: 'CustomKey', defaultValue: 'Operation completed!' },
    { key: 'SuccessTitle', defaultValue: 'Success' }
  );
}
```

## Related

- [Confirmation](./confirmation) - Confirmation dialogs
- [Error Handling](./error-handling) - Global error handling
