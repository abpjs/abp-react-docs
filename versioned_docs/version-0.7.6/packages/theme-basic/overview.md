---
sidebar_position: 1
---

# Overview

The `@abpjs/theme-basic` package provides layout components for different application sections.

[![npm version](https://img.shields.io/npm/v/@abpjs/theme-basic.svg)](https://www.npmjs.com/package/@abpjs/theme-basic)

## Installation

```bash
npm install @abpjs/theme-basic
```

**Required peer dependencies:**
```bash
npm install @abpjs/core @abpjs/theme-shared @chakra-ui/react @emotion/react lucide-react react-router-dom react-hook-form
```

:::note
Chakra UI v3 no longer requires `@chakra-ui/icons`, `@emotion/styled`, or `framer-motion` as peer dependencies.
:::

## Features

- **Multiple Layouts** - Application, Account, and Empty layouts
- **Dynamic Layout Selection** - Switch layouts based on route
- **Navigation System** - Built-in navigation with permission support and search
- **User Profile** - Profile and password change components (modal-based)
- **Responsive Design** - Mobile-friendly layouts with sidebar and drawer navigation
- **RTL Support** - Full right-to-left support for Arabic, Hebrew, Persian, and other RTL languages
- **Route Icons & Badges** - Add icons and notification badges to navigation items
- **Logo Customization** - Customize logo via props without modifying source code
- **Chakra UI v3** - Beautiful, accessible components with modern patterns
- **Color Mode** - Built-in light/dark theme support (opt-in)

## Main Exports

### Components

| Component | Description |
|-----------|-------------|
| `LayoutApplication` | Main app layout with nav, header, footer |
| `LayoutAccount` | Centered layout for auth pages |
| `LayoutEmpty` | Minimal layout for printing/embedded views |
| `Profile` | User profile modal |
| `ChangePassword` | Password change modal |

### Hooks

| Hook | Description |
|------|-------------|
| `useLayoutContext` | Access and modify layout state |
| `useLayoutService` | Programmatic layout control |
| `useNavigationElements` | Access navigation items |

### Providers

| Provider | Description |
|----------|-------------|
| `ThemeBasicProvider` | Top-level provider (includes Chakra provider) |

### Utilities

| Export | Description |
|--------|-------------|
| `defineConfig` | Create custom theme configuration |
| `LAYOUTS` | Array of available layouts |

## Quick Example

```tsx
import { ThemeBasicProvider, LayoutApplication } from '@abpjs/theme-basic';
import { CoreProvider } from '@abpjs/core';

function App() {
  return (
    <CoreProvider environment={environment}>
      <ThemeBasicProvider>
        <BrowserRouter>
          <LayoutApplication>
            <Dashboard />
          </LayoutApplication>
        </BrowserRouter>
      </ThemeBasicProvider>
    </CoreProvider>
  );
}
```

:::tip
`ThemeBasicProvider` includes Chakra's provider internally (via `ThemeSharedProvider`), so you don't need to wrap with `ChakraProvider` separately.
:::

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
| `logo` | `ReactNode` | - | Custom logo component |
| `logoIcon` | `ReactNode` | - | Custom logo icon (for collapsed states) |
| `appName` | `string` | - | Application name for logo text |
| `logoLink` | `string` | `'/'` | Link destination when clicking logo |

## Logo Customization

Customize the application logo via ThemeBasicProvider props:

```tsx
import { ThemeBasicProvider } from '@abpjs/theme-basic';

function App() {
  return (
    <ThemeBasicProvider
      logo={<img src="/my-logo.svg" alt="My App" />}
      logoIcon={<img src="/my-icon.svg" alt="Icon" />}
      appName="My Application"
      logoLink="/"
    >
      {/* Your app */}
    </ThemeBasicProvider>
  );
}
```

## RTL Support

The layout automatically supports RTL languages. When a user switches to Arabic, Hebrew, Persian, or other RTL languages:

- Sidebar moves to the right side
- Text alignment flips
- Icons and navigation elements reposition correctly
- Menus open in the appropriate direction

No additional configuration needed - RTL is detected automatically from the selected language.

## NPM Package

View on npm: [@abpjs/theme-basic](https://www.npmjs.com/package/@abpjs/theme-basic)

## Documentation

- [Layouts](/docs/packages/theme-basic/layouts) - Available layouts
- [Navigation](/docs/packages/theme-basic/navigation) - Navigation system
- [Profile](/docs/packages/theme-basic/profile) - Profile components
