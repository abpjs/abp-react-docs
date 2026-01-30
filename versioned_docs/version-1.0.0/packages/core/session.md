---
sidebar_position: 7
---

# Session

ABP React provides session management for tracking user state.

## useSession Hook

The `useSession` hook provides access to session state:

```tsx
import { useSession } from '@abpjs/core';

function SessionExample() {
  const { session, setSession, clearSession } = useSession();

  return (
    <div>
      <p>Language: {session.language}</p>
      <p>Tenant: {session.tenantId || 'Host'}</p>
      <p>Token Expiry: {session.tokenExpiry}</p>
    </div>
  );
}
```

## API Reference

### useSession Returns

| Property | Type | Description |
|----------|------|-------------|
| `session` | `Session` | Current session state |
| `setSession` | `(session: Partial<Session>) => void` | Update session state |
| `clearSession` | `() => void` | Clear the session |

### Session Object

| Property | Type | Description |
|----------|------|-------------|
| `language` | `string` | Current language/culture |
| `tenantId` | `string \| null` | Current tenant ID (null for host) |
| `tokenExpiry` | `number \| null` | Access token expiry timestamp |

## Switching Tenants

Update the session to switch tenants:

```tsx
import { useSession } from '@abpjs/core';

function TenantSwitcher() {
  const { setSession } = useSession();

  const switchTenant = (tenantId: string | null) => {
    setSession({ tenantId });
    // Reload configuration after tenant switch
    window.location.reload();
  };

  return (
    <div>
      <button onClick={() => switchTenant(null)}>Host</button>
      <button onClick={() => switchTenant('tenant-id-1')}>Tenant 1</button>
      <button onClick={() => switchTenant('tenant-id-2')}>Tenant 2</button>
    </div>
  );
}
```

## Session Persistence

Session data is stored in localStorage. Configure persistence:

```tsx
// Session is automatically persisted
// Access stored session data
const storedSession = localStorage.getItem('abp-session');
```

## Redux Session Slice

The session state is managed via Redux. Access it directly if needed:

```tsx
import { useSelector, useDispatch } from 'react-redux';
import { sessionSlice } from '@abpjs/core';

function SessionManager() {
  const session = useSelector((state: any) => state.session);
  const dispatch = useDispatch();

  const updateLanguage = (language: string) => {
    dispatch(sessionSlice.actions.setLanguage(language));
  };

  return (
    <select
      value={session.language}
      onChange={(e) => updateLanguage(e.target.value)}
    >
      <option value="en">English</option>
      <option value="tr">Türkçe</option>
    </select>
  );
}
```

## Related

- [Authentication](/docs/packages/core/authentication) - Auth management
- [Configuration](/docs/packages/core/configuration) - App configuration
- [Multi-tenancy Guide](/docs/guides/multi-tenancy) - Tenant switching
