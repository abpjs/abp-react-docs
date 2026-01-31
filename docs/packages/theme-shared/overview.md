---
sidebar_position: 1
---

# Overview

The `@abpjs/theme-shared` package provides shared UI components and services for notifications, modals, and error handling.

## Installation

```bash
npm install @abpjs/theme-shared
```

**Required peer dependencies:**
```bash
npm install @abpjs/core @chakra-ui/react @emotion/react lucide-react
```

:::note
Chakra UI v3 no longer requires `@emotion/styled` or `framer-motion` as peer dependencies.
:::

## Features

- **Toast Notifications** - Success, error, warning, and info toasts
- **Confirmation Dialogs** - Promise-based confirmation modals
- **Modal Component** - Generic modal with Chakra UI v3 Dialog
- **Global Error Handling** - Automatic error handling for ABP errors
- **Theme Configuration** - Customize with `defineConfig()`
- **Color Mode** - Built-in light/dark theme support (opt-in)

## Main Exports

### Hooks

| Hook | Description |
|------|-------------|
| `useToaster` | Show toast notifications |
| `useConfirmation` | Show confirmation dialogs |
| `useColorMode` | Access and toggle color mode |

### Components

| Component | Description |
|-----------|-------------|
| `ToastContainer` | Toast notification container |
| `ConfirmationDialog` | Confirmation dialog component |
| `Modal` | Generic modal component |
| `ColorModeButton` | Pre-built color mode toggle button |

### Providers

| Provider | Description |
|----------|-------------|
| `ThemeSharedProvider` | Top-level provider (includes Chakra provider) |

### Utilities

| Export | Description |
|--------|-------------|
| `defineConfig` | Create custom theme configuration |
| `Toaster` | Namespace with types and `Status` enum |

## Setup

Wrap your app with `ThemeSharedProvider`:

```tsx
import { ThemeSharedProvider } from '@abpjs/theme-shared';

function App() {
  return (
    <ThemeSharedProvider>
      {/* Your app content */}
    </ThemeSharedProvider>
  );
}
```

:::tip
`ThemeSharedProvider` includes Chakra's provider internally, so you don't need to wrap with `ChakraProvider` separately.
:::

## Quick Example

```tsx
import { useToaster, useConfirmation, Toaster } from '@abpjs/theme-shared';

function MyComponent() {
  const toaster = useToaster();
  const confirmation = useConfirmation();

  const handleSave = async () => {
    try {
      await saveData();
      toaster.success('Saved successfully!', 'Success');
    } catch (error) {
      toaster.error('Failed to save', 'Error');
    }
  };

  const handleDelete = async () => {
    const status = await confirmation.warn(
      'Are you sure you want to delete this item?',
      'Delete Item',
      { yesCopy: 'Delete', cancelCopy: 'Cancel' }
    );

    if (status === Toaster.Status.confirm) {
      await deleteItem();
      toaster.success('Item deleted', 'Success');
    }
  };

  return (
    <div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
```

## Provider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components |
| `renderToasts` | `boolean` | `true` | Render ToastContainer |
| `renderConfirmation` | `boolean` | `true` | Render ConfirmationDialog |
| `themeOverrides` | `ThemeOverride` | - | Custom theme configuration |
| `toastPosition` | `string` | `'bottom-right'` | Toast position |
| `enableColorMode` | `boolean` | `false` | Enable dark/light mode |
| `defaultColorMode` | `'light' \| 'dark' \| 'system'` | `'light'` | Default color mode |

## LoaderBar Component

The `LoaderBar` shows a progress bar during HTTP requests:

```tsx
import { LoaderBar } from '@abpjs/theme-shared';

function App() {
  return (
    <>
      <LoaderBar />
      <MyApp />
    </>
  );
}
```

### LoaderBar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `containerClass` | `string` | `'abp-loader-bar'` | CSS class for container |
| `progressClass` | `string` | `'abp-progress'` | CSS class for progress bar |
| `filter` | `function` | - | Filter which requests trigger loading |
| `intervalPeriod` | `number` | `300` | Progress animation interval (ms) |
| `stopDelay` | `number` | `400` | Delay before hiding after load (ms) |

### Custom Animation Timing (v1.1.0)

```tsx
<LoaderBar
  intervalPeriod={200}  // Faster progress animation
  stopDelay={600}       // Longer delay before hiding
/>
```

### Filter Requests

```tsx
<LoaderBar
  filter={(request) => {
    // Only show for API requests, not static assets
    return request.url?.startsWith('/api') ?? true;
  }}
/>
```

## Documentation

- [Toaster](./toaster) - Toast notifications
- [Confirmation](./confirmation) - Confirmation dialogs
- [Error Handling](./error-handling) - Global error handling
