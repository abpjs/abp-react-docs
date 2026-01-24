---
sidebar_position: 99
---

# Release Notes

## v0.8.0

**January 2026**

### New Features

#### Ellipsis Component

Truncate long text with ellipsis and automatic tooltip.

```tsx
import { Ellipsis } from '@abpjs/core';

<Ellipsis width="200px">
  This is a very long text that will be truncated
</Ellipsis>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to truncate |
| `width` | `string` | `'180px'` | Maximum width |
| `title` | `string` | auto | Tooltip text |
| `enabled` | `boolean` | `true` | Enable/disable |
| `className` | `string` | - | CSS class |
| `style` | `CSSProperties` | - | Inline styles |

**Hook version:**

```tsx
import { useEllipsis } from '@abpjs/core';

const { ref, style, title, className } = useEllipsis({ width: '200px' });
```

#### useLoader Hook

Automatically tracks HTTP request loading state.

```tsx
import { useLoader } from '@abpjs/core';

function MyComponent() {
  const { loading, loadingCount } = useLoader();

  if (loading) return <Spinner />;
  return <Content />;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `loading` | `boolean` | `true` if any request is active |
| `loadingCount` | `number` | Number of active requests |
| `requests` | `string[]` | Active request identifiers |

### Bug Fixes

- Fixed localization handling when translation key is empty or null

---

## v0.7.6

**January 2026** - Initial Release

- Authentication with OAuth2/OIDC (`oidc-client-ts`)
- Configuration management
- Localization with dynamic resource loading
- Permission checking with `usePermission` hook
- REST service with Axios interceptors
- Session management
- Redux Toolkit integration
