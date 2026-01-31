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

## SessionStateService (v1.1.0)

The `SessionStateService` provides a service-based API for accessing session state:

```tsx
import { useAbp } from '@abpjs/core';

function SessionExample() {
  const { sessionStateService } = useAbp();

  const language = sessionStateService.getLanguage();
  const tenant = sessionStateService.getTenant();

  return (
    <div>
      <p>Language: {language}</p>
      <p>Tenant: {tenant?.name || 'Host'}</p>
    </div>
  );
}
```

### SessionStateService Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getLanguage()` | `string` | Get current language/culture |
| `getTenant()` | `Tenant \| undefined` | Get current tenant info |
| `getSessionDetail()` | `SessionDetail` | Get session detail info (v2.0.0) |

## ProfileStateService (v1.1.0)

The `ProfileStateService` provides access to the current user's profile:

```tsx
import { useAbp } from '@abpjs/core';

function ProfileExample() {
  const { profileStateService } = useAbp();

  const profile = profileStateService.getProfile();

  return (
    <div>
      <p>Username: {profile?.userName}</p>
      <p>Email: {profile?.email}</p>
      <p>Name: {profile?.name} {profile?.surname}</p>
    </div>
  );
}
```

### ProfileStateService Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getProfile()` | `Profile \| undefined` | Get current user profile |

## Session Detail (v2.0.0)

The session now includes detailed tracking information for multi-tab support:

```tsx
import { useAbp } from '@abpjs/core';

function SessionDetailExample() {
  const { sessionStateService } = useAbp();
  const detail = sessionStateService.getSessionDetail();

  return (
    <div>
      <p>Open tabs: {detail.openedTabCount}</p>
      <p>Last exit: {new Date(detail.lastExitTime).toLocaleString()}</p>
      <p>Remember me: {detail.remember ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

### SessionDetail Object

| Property | Type | Description |
|----------|------|-------------|
| `openedTabCount` | `number` | Number of currently opened tabs/windows |
| `lastExitTime` | `number` | Timestamp of last exit time |
| `remember` | `boolean` | Whether to remember the session |

### Session Actions (v2.0.0)

New Redux actions for session management:

```tsx
import { useDispatch } from 'react-redux';
import { sessionActions } from '@abpjs/core';

function SessionManager() {
  const dispatch = useDispatch();

  // Track tab open/close
  useEffect(() => {
    dispatch(sessionActions.modifyOpenedTabCount('increase'));
    return () => {
      dispatch(sessionActions.modifyOpenedTabCount('decrease'));
    };
  }, [dispatch]);

  // Set remember me preference
  const handleRememberMe = (remember: boolean) => {
    dispatch(sessionActions.setRemember(remember));
  };

  // Update session detail directly
  const updateDetail = () => {
    dispatch(sessionActions.setSessionDetail({
      remember: true,
      openedTabCount: 1,
    }));
  };

  return <div>...</div>;
}
```

| Action | Payload | Description |
|--------|---------|-------------|
| `setRemember` | `boolean` | Set remember flag for session persistence |
| `modifyOpenedTabCount` | `'increase' \| 'decrease'` | Track opened tabs |
| `setSessionDetail` | `Partial<SessionDetail>` | Update session detail |

### selectSessionDetail Selector (v2.0.0)

```tsx
import { useSelector } from 'react-redux';
import { selectSessionDetail } from '@abpjs/core';

function SessionInfo() {
  const sessionDetail = useSelector(selectSessionDetail);
  return <p>Tabs open: {sessionDetail.openedTabCount}</p>;
}
```

## Related

- [Authentication](./authentication) - Auth management
- [Configuration](./configuration) - App configuration
