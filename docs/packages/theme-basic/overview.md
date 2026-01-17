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
- **Navigation System** - Built-in navigation with permission support
- **User Profile** - Profile and password change components (modal-based)
- **Responsive Design** - Mobile-friendly layouts
- **Chakra UI v3** - Beautiful, accessible components
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

## NPM Package

View on npm: [@abpjs/theme-basic](https://www.npmjs.com/package/@abpjs/theme-basic)

## Documentation

- [Layouts](/docs/packages/theme-basic/layouts) - Available layouts
- [Navigation](/docs/packages/theme-basic/navigation) - Navigation system
- [Profile](/docs/packages/theme-basic/profile) - Profile components
