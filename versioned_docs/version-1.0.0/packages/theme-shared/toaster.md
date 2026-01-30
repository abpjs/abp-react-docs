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

| Method | Parameters | Description |
|--------|------------|-------------|
| `success` | `(message: string, title?: string, options?)` | Show success toast |
| `error` | `(message: string, title?: string, options?)` | Show error toast |
| `warn` | `(message: string, title?: string, options?)` | Show warning toast |
| `info` | `(message: string, title?: string, options?)` | Show info toast |
| `clear` | `()` | Clear all toasts |
| `remove` | `(id: string)` | Remove specific toast |

### Toast Options

```tsx
interface ToastOptions {
  life?: number;       // Duration in ms
  sticky?: boolean;    // If true, won't auto-dismiss
  closable?: boolean;  // Show close button
}
```

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

## Related

- [Confirmation](/docs/packages/theme-shared/confirmation) - Confirmation dialogs
- [Error Handling](/docs/packages/theme-shared/error-handling) - Global error handling
