---
sidebar_position: 99
---

# Release Notes

## v3.0.0

**February 2026**

### New Features

#### CurrentUserComponent

New public API component for the current user nav item:

```tsx
import { CurrentUserComponent } from '@abpjs/theme-basic';

// Basic usage
<CurrentUserComponent />

// With custom URLs
<CurrentUserComponent
  loginUrl="/login"
  profileUrl="/profile"
  changePasswordUrl="/change-password"
/>

// With custom styling
<CurrentUserComponent
  containerStyle={{ padding: '4' }}
  menuZIndex={1500}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `smallScreen` | `boolean` | `false` | Mobile mode display |
| `loginUrl` | `string` | `/account/login` | Login redirect URL |
| `profileUrl` | `string` | `/account/manage` | Profile page URL |
| `changePasswordUrl` | `string` | `/account/manage` | Change password URL |
| `containerStyle` | `SystemStyleObject` | - | Custom container styles |
| `menuZIndex` | `number` | `1400` | Dropdown z-index |

#### LanguagesComponent

New public API component for the language selector nav item:

```tsx
import { LanguagesComponent } from '@abpjs/theme-basic';

// Basic usage
<LanguagesComponent />

// Compact mode (icon only)
<LanguagesComponent compact />

// With custom styling
<LanguagesComponent
  containerStyle={{ padding: '2' }}
  menuZIndex={1500}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `smallScreen` | `boolean` | `false` | Mobile mode display |
| `compact` | `boolean` | `false` | Icon-only mode |
| `containerStyle` | `SystemStyleObject` | - | Custom container styles |
| `menuZIndex` | `number` | `1400` | Dropdown z-index |

#### Nav Item Provider

New provider for initializing default nav items (Languages and CurrentUser):

```tsx
import { initializeThemeBasicNavItems } from '@abpjs/theme-basic';

// Call once during app initialization
initializeThemeBasicNavItems();

// This registers:
// - Languages component (order: 100)
// - CurrentUser component (order: 200)
```

For advanced configuration:

```tsx
import {
  BASIC_THEME_NAV_ITEM_PROVIDERS,
  configureNavItems,
} from '@abpjs/theme-basic';
import { getNavItemsService } from '@abpjs/theme-shared';

const navItemsService = getNavItemsService();
configureNavItems(navItemsService)();
```

#### Styles Provider

New provider for injecting theme-basic global CSS:

```tsx
import { initializeThemeBasicStyles } from '@abpjs/theme-basic';

// Call once during app initialization
initializeThemeBasicStyles();
```

Access raw styles for custom injection:

```tsx
import { THEME_BASIC_STYLES, injectThemeBasicStyles } from '@abpjs/theme-basic';

// Get raw CSS string
console.log(THEME_BASIC_STYLES);

// Manual injection
injectThemeBasicStyles();
```

#### New Component Keys

New component replacement keys for CurrentUser and Languages:

```tsx
import { eThemeBasicComponents } from '@abpjs/theme-basic';

// New in v3.0.0:
eThemeBasicComponents.CurrentUser  // 'Theme.CurrentUserComponent'
eThemeBasicComponents.Languages    // 'Theme.LanguagesComponent'
```

### Deprecations

#### eNavigationElementNames

The `eNavigationElementNames` enum is deprecated. Nav items are now managed via `NavItemsService` from `@abpjs/theme-shared`:

```tsx
// Before (deprecated)
import { eNavigationElementNames } from '@abpjs/theme-basic';

// After (v3.0.0)
import { getNavItemsService } from '@abpjs/theme-shared';

const navItemsService = getNavItemsService();
navItemsService.addItems([
  { id: 'my-nav-item', component: MyComponent, order: 1 },
]);
```

#### LayoutStateService

The `LayoutStateService` and `useLayoutStateService` are deprecated. Use `NavItemsService` from `@abpjs/theme-shared` instead:

```tsx
// Before (deprecated)
import { useLayoutStateService } from '@abpjs/theme-basic';

const layoutStateService = useLayoutStateService();
layoutStateService.dispatchAddNavigationElement({
  name: 'MyElement',
  element: <MyNavItem />,
  order: 1,
});

// After (v3.0.0)
import { getNavItemsService } from '@abpjs/theme-shared';

const navItemsService = getNavItemsService();
navItemsService.addItems([
  { id: 'MyElement', component: MyNavItem, order: 1 },
]);
```

### Style Updates

- Added bordered `.datatable-body-row` styles for bordered table rows

### New Exports

- `CurrentUserComponent` - Current user nav item component
- `CurrentUserComponentProps` - Props for CurrentUserComponent
- `LanguagesComponent` - Language selector nav item component
- `LanguagesComponentProps` - Props for LanguagesComponent
- `initializeThemeBasicNavItems()` - Initialize default nav items
- `configureNavItems(navItems)` - Configure nav items with custom service
- `BASIC_THEME_NAV_ITEM_PROVIDERS` - Nav item provider configuration
- `initializeThemeBasicStyles()` - Inject theme-basic CSS
- `injectThemeBasicStyles()` - Manual CSS injection
- `configureStyles()` - Style configuration function
- `BASIC_THEME_STYLES_PROVIDERS` - Style provider configuration
- `THEME_BASIC_STYLES` - Raw CSS string constant
- `eThemeBasicComponents.CurrentUser` - Component key for CurrentUser
- `eThemeBasicComponents.Languages` - Component key for Languages

---

## v2.9.0

**February 2026**

### Breaking Changes

- **`RoutesComponent.isDropdownChildDynamic` prop removed** - This prop was not functional and has been removed. If you were passing this prop, simply remove it:

  ```tsx
  // Before (v2.7.0)
  <RoutesComponent isDropdownChildDynamic={true} />

  // After (v2.9.0)
  <RoutesComponent />
  ```

### Internal Changes

- Dependency update to @abpjs/theme-shared v2.9.0

---

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
