---
sidebar_position: 2
---

# Layouts

The `@abpjs/theme-basic` package provides three layout components for different use cases.

## LayoutApplication

The main layout for authenticated application pages with navigation, header, and footer:

```tsx
import { LayoutApplication, LayoutProvider } from '@abpjs/theme-basic';

function DashboardPage() {
  return (
    <LayoutProvider>
      <LayoutApplication>
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard!</p>
      </LayoutApplication>
    </LayoutProvider>
  );
}
```

### Features

- Sidebar navigation
- Header with user menu
- Footer
- Responsive design
- Collapsible sidebar

## LayoutAccount

A centered layout for authentication pages (login, register):

```tsx
import { LayoutAccount, LayoutProvider } from '@abpjs/theme-basic';
import { LoginForm } from '@abpjs/account';

function LoginPage() {
  return (
    <LayoutProvider>
      <LayoutAccount>
        <LoginForm onSuccess={() => {}} />
      </LayoutAccount>
    </LayoutProvider>
  );
}
```

### Features

- Centered content
- Clean design
- Logo display
- No navigation (for unauthenticated users)

## LayoutEmpty

A minimal layout for printing or embedded views:

```tsx
import { LayoutEmpty, LayoutProvider } from '@abpjs/theme-basic';

function PrintablePage() {
  return (
    <LayoutProvider>
      <LayoutEmpty>
        <div className="print-content">
          {/* Content to print */}
        </div>
      </LayoutEmpty>
    </LayoutProvider>
  );
}
```

### Features

- No header/footer
- No navigation
- Full-width content

## Dynamic Layout Selection

Switch layouts based on the current route:

```tsx
import { LayoutApplication, LayoutAccount, LayoutEmpty, LAYOUTS } from '@abpjs/theme-basic';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* Account layout for auth pages */}
      <Route path="/login" element={
        <LayoutAccount>
          <LoginPage />
        </LayoutAccount>
      } />

      {/* Application layout for main app */}
      <Route path="/dashboard" element={
        <LayoutApplication>
          <DashboardPage />
        </LayoutApplication>
      } />

      {/* Empty layout for print pages */}
      <Route path="/print/:id" element={
        <LayoutEmpty>
          <PrintPage />
        </LayoutEmpty>
      } />
    </Routes>
  );
}
```

## Using LayoutProvider

Wrap your app with `LayoutProvider` to enable layout features:

```tsx
import { LayoutProvider } from '@abpjs/theme-basic';

function App() {
  return (
    <LayoutProvider>
      {/* Your routes and layouts */}
    </LayoutProvider>
  );
}
```

## useLayoutContext Hook

Access and modify layout state:

```tsx
import { useLayoutContext } from '@abpjs/theme-basic';

function SidebarToggle() {
  const { sidebarCollapsed, setSidebarCollapsed } = useLayoutContext();

  return (
    <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
      {sidebarCollapsed ? 'Expand' : 'Collapse'}
    </button>
  );
}
```

## Related

- [Navigation](/docs/packages/theme-basic/navigation) - Navigation configuration
- [Profile](/docs/packages/theme-basic/profile) - User profile components
