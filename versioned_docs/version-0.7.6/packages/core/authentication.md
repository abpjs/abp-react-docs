---
sidebar_position: 2
---

# Authentication

ABP React provides built-in OAuth2/OIDC authentication support using `oidc-client-ts`.

## useAuth Hook

The `useAuth` hook provides authentication state and methods.

```tsx
import { useAuth } from '@abpjs/core';

function AuthExample() {
  const {
    isAuthenticated,
    user,
    login,
    logout,
    getAccessToken,
  } = useAuth();

  if (!isAuthenticated) {
    return <button onClick={login}>Login</button>;
  }

  return (
    <div>
      <p>Welcome, {user?.profile.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## API Reference

### useAuth Returns

| Property | Type | Description |
|----------|------|-------------|
| `isAuthenticated` | `boolean` | Whether the user is logged in |
| `user` | `User \| null` | Current user object from OIDC |
| `login` | `() => Promise<void>` | Redirect to login page |
| `logout` | `() => Promise<void>` | Log out and clear session |
| `getAccessToken` | `() => Promise<string>` | Get the current access token |

## OAuth Configuration

Configure OAuth in your environment:

```tsx title="src/config/environment.ts"
export const environment = {
  apiUrl: 'https://localhost:44300',
  oAuthConfig: {
    issuer: 'https://localhost:44300',
    clientId: 'MyApp_React',
    scope: 'openid profile email MyApp',
    responseType: 'code',
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
};
```

## Protected Routes

Create a guard component for protected routes:

```tsx
import { useAuth } from '@abpjs/core';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Usage
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## Access Token Usage

Get the access token for API calls:

```tsx
import { useAuth } from '@abpjs/core';

function ApiExample() {
  const { getAccessToken } = useAuth();

  const fetchData = async () => {
    const token = await getAccessToken();
    const response = await fetch('/api/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  };

  // ...
}
```

## Related

- [Session Management](/docs/packages/core/session) - Session state
- [Account Package](/docs/packages/account/overview) - Login/Register components
