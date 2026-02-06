---
sidebar_position: 99
---

# Release Notes

## v2.7.0

**February 2026**

### New Features

#### Component Replacement Keys

New constants for replacing theme components:

```tsx
import { eThemeBasicComponents } from '@abpjs/theme-basic';

// Available component keys:
// eThemeBasicComponents.ApplicationLayout = 'Theme.ApplicationLayoutComponent'
// eThemeBasicComponents.AccountLayout = 'Theme.AccountLayoutComponent'
// eThemeBasicComponents.EmptyLayout = 'Theme.EmptyLayoutComponent'
// eThemeBasicComponents.Logo = 'Theme.LogoComponent'
// eThemeBasicComponents.Routes = 'Theme.RoutesComponent'
// eThemeBasicComponents.NavItems = 'Theme.NavItemsComponent'
```

#### Navigation Element Names

New constants for built-in navigation elements:

```tsx
import { eNavigationElementNames } from '@abpjs/theme-basic';

// Available navigation element names:
// eNavigationElementNames.Language = 'LanguageRef'
// eNavigationElementNames.User = 'CurrentUserRef'
```

#### LayoutStateService

New service for accessing and modifying layout state:

```tsx
import { useLayoutStateService } from '@abpjs/theme-basic';

function MyComponent() {
  const layoutStateService = useLayoutStateService();

  // Get current navigation elements
  const elements = layoutStateService.getNavigationElements();

  // Add a new navigation element
  layoutStateService.dispatchAddNavigationElement({
    name: 'MyElement',
    element: <MyNavItem />,
    order: 1,
  });

  // Remove an element by name
  layoutStateService.dispatchRemoveNavigationElementByName('MyElement');
}
```

#### Public API Components

New standalone components for building custom layouts:

**LogoComponent** - Displays the application logo with branding support:

```tsx
import { LogoComponent } from '@abpjs/theme-basic';

// Basic usage (uses branding configuration)
<LogoComponent />

// With custom link
<LogoComponent linkTo="/dashboard" />
```

**RoutesComponent** - Renders navigation routes from ABP configuration:

```tsx
import { RoutesComponent } from '@abpjs/theme-basic';

<RoutesComponent />
```

**NavItemsComponent** - Renders navigation items (language selector, user menu):

```tsx
import { NavItemsComponent } from '@abpjs/theme-basic';

<NavItemsComponent />
```

### New Exports

- `eThemeBasicComponents` - Constants for component replacement keys
- `eNavigationElementNames` - Constants for navigation element names
- `useLayoutStateService()` - Hook to access layout state service
- `LayoutStateService` - Interface for layout state service
- `LogoComponent` - Public API logo component
- `LogoComponentProps` - Props interface for LogoComponent
- `RoutesComponent` - Public API routes component
- `NavItemsComponent` - Public API nav items component

---

## v2.4.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.2.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.1.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.0.0

**January 2026**

- Version alignment with @abpjs/core

---

## v1.1.0

**January 2026**

- Version alignment with @abpjs/core

---

## v1.0.0

**January 2026**

- Version alignment with @abpjs/core

---

## v0.9.0

**January 2026**

### Deprecations

- **Profile component** - Moved to `@abpjs/theme-shared` (see [Profile docs](../theme-shared/profile))
- **ChangePassword component** - Moved to `@abpjs/theme-shared` (see [Profile docs](../theme-shared/profile))

:::warning
Imports from `@abpjs/theme-basic` will continue to work but are deprecated.
:::

---

## v0.8.0

**January 2026**

- Version alignment with @abpjs/core

---

## v0.7.6

**January 2026** - Initial Release

- LayoutApplication component
- LayoutAccount component
- LayoutEmpty component
- Navigation system with permission support
- Profile component
- ChangePassword component
