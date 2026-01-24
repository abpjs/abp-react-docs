---
sidebar_position: 99
---

# Release Notes

## v0.8.0

**January 2026**

### New Features

#### LoaderBar Component

A progress bar that automatically shows at the top of the page during HTTP requests.

```tsx
import { LoaderBar } from '@abpjs/theme-shared';

function Layout({ children }) {
  return (
    <>
      <LoaderBar />
      <Navbar />
      {children}
    </>
  );
}
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `containerClass` | `string` | `'abp-loader-bar'` | CSS class for container |
| `progressClass` | `string` | `'abp-progress'` | CSS class for progress bar |
| `filter` | `function` | - | Filter which requests trigger the loader |

#### ErrorComponent

A component for displaying full-page error states (404, 500, etc.).

```tsx
import { ErrorComponent } from '@abpjs/theme-shared';

<ErrorComponent
  title="404"
  details="The page you are looking for was not found."
  showCloseButton
  onDestroy={() => navigate('/')}
  closeButtonText="Go Home"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Error'` | Error title (e.g., "404") |
| `details` | `string` | `'An error has occurred.'` | Error message |
| `showCloseButton` | `boolean` | `true` | Show dismiss button |
| `onDestroy` | `function` | - | Called when button is clicked |
| `closeButtonText` | `string` | `'Go Back'` | Button text |

#### DEFAULT_STYLES Constant

Global CSS styles for ABP components that you can inject into your app.

```tsx
import { DEFAULT_STYLES } from '@abpjs/theme-shared';

// Add to your app
<style>{DEFAULT_STYLES}</style>
```

Includes styles for:
- Form validation (`.is-invalid`)
- Ellipsis text truncation (`.abp-ellipsis`)
- Loader bar animations
- Modal backdrop
- Fade animations

#### Enhanced useErrorHandler

New methods added to the error handler hook:

```tsx
const {
  handleError,
  showError,
  navigateToLogin,
  // New in v0.8.0:
  createErrorComponent,
  errorComponentProps,
  clearErrorComponent,
} = useErrorHandler({ navigate });

// Create and display an error component
createErrorComponent({ title: '500', details: 'Server error' });

// Clear the error display
clearErrorComponent();
```

---

## v0.7.6

**January 2026** - Initial Release

- Toaster service (success, error, warning, info)
- Confirmation service with promise-based dialogs
- Global error handler for ABP errors
- Light and dark mode support
