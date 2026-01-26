---
sidebar_position: 2
---

# Layouts

The `@abpjs/theme-basic` package provides three layout components for different use cases.

## LayoutApplication

The main layout for authenticated application pages with navigation, header, and footer:

```tsx
import { ThemeBasicProvider, LayoutApplication } from '@abpjs/theme-basic';
import { Routes, Route, Outlet } from 'react-router-dom';

function App() {
  return (
    <ThemeBasicProvider>
      <Routes>
        <Route element={<LayoutApplication><Outlet /></LayoutApplication>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </ThemeBasicProvider>
  );
}
```

### Features

- Sidebar navigation with search
- Header with user menu
- Footer
- Responsive design (collapsible on mobile)
- RTL support

## LayoutAccount

A centered layout for authentication pages (login, register):

```tsx
import { ThemeBasicProvider, LayoutAccount } from '@abpjs/theme-basic';
import { Routes, Route, Outlet } from 'react-router-dom';

function App() {
  return (
    <ThemeBasicProvider>
      <Routes>
        <Route element={<LayoutAccount><Outlet /></LayoutAccount>}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </ThemeBasicProvider>
  );
}
```

### Features

- Centered content
- Clean design
- Logo display
- Language selector

## LayoutEmpty

A minimal layout for printing or embedded views:

```tsx
import { ThemeBasicProvider, LayoutEmpty } from '@abpjs/theme-basic';
import { Routes, Route, Outlet } from 'react-router-dom';

function App() {
  return (
    <ThemeBasicProvider>
      <Routes>
        <Route element={<LayoutEmpty><Outlet /></LayoutEmpty>}>
          <Route path="/print/:id" element={<PrintPage />} />
        </Route>
      </Routes>
    </ThemeBasicProvider>
  );
}
```

### Features

- No header/footer
- No navigation
- Full-width content
- Ideal for printing or embedded views

## Complete Example with Multiple Layouts

Use different layouts for different sections of your application:

```tsx
import {
  ThemeBasicProvider,
  LayoutApplication,
  LayoutAccount,
  LayoutEmpty,
} from '@abpjs/theme-basic';
import { CoreProvider } from '@abpjs/core';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

function App() {
  return (
    <CoreProvider environment={environment}>
      <ThemeBasicProvider>
        <BrowserRouter>
          <Routes>
            {/* Application layout for main pages */}
            <Route element={<LayoutApplication><Outlet /></LayoutApplication>}>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Route>

            {/* Account layout for auth pages */}
            <Route element={<LayoutAccount><Outlet /></LayoutAccount>}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Empty layout for minimal pages */}
            <Route element={<LayoutEmpty><Outlet /></LayoutEmpty>}>
              <Route path="/print/:id" element={<PrintPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeBasicProvider>
    </CoreProvider>
  );
}
```

## Using LAYOUTS Constant

The package exports a `LAYOUTS` constant for dynamic layout selection:

```tsx
import { LAYOUTS } from '@abpjs/theme-basic';
import { useLocation } from 'react-router-dom';

// LAYOUTS structure:
// [
//   { key: 'application', component: LayoutApplication },
//   { key: 'account', component: LayoutAccount },
//   { key: 'empty', component: LayoutEmpty },
// ]

function DynamicLayoutWrapper({ children }) {
  const { pathname } = useLocation();

  const getLayoutKey = () => {
    if (pathname.startsWith('/account') || pathname.startsWith('/login')) {
      return 'account';
    }
    if (pathname.startsWith('/print')) {
      return 'empty';
    }
    return 'application';
  };

  const layout = LAYOUTS.find(l => l.key === getLayoutKey());
  const LayoutComponent = layout?.component;

  return LayoutComponent ? <LayoutComponent>{children}</LayoutComponent> : children;
}
```

## useLayoutContext Hook

Access and modify layout state:

```tsx
import { useLayoutContext } from '@abpjs/theme-basic';

function SidebarToggle() {
  const { isSidebarOpen, toggleSidebar } = useLayoutContext();

  return (
    <button onClick={toggleSidebar}>
      {isSidebarOpen ? 'Close' : 'Open'} Sidebar
    </button>
  );
}
```

## useLayoutService Hook

Access layout service for programmatic control:

```tsx
import { useLayoutService } from '@abpjs/theme-basic';

function LayoutController() {
  const layoutService = useLayoutService();

  const handleCollapse = () => {
    layoutService.collapseSidebar();
  };

  return <button onClick={handleCollapse}>Collapse</button>;
}
```

## Custom Layout Components

Create your own layouts extending the base:

```tsx
import { Box, Flex } from '@chakra-ui/react';

function CustomLayout({ children }) {
  return (
    <Flex direction="column" minH="100vh">
      <CustomHeader />
      <Box flex="1" p={4}>
        {children}
      </Box>
      <CustomFooter />
    </Flex>
  );
}
```

## Related

- [Navigation](/docs/packages/theme-basic/navigation) - Navigation configuration
- [Profile](/docs/packages/theme-basic/profile) - User profile components
