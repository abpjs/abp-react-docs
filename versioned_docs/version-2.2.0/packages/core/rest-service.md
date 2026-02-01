---
sidebar_position: 6
---

# REST Service

ABP React provides an Axios-based HTTP client with built-in interceptors for ABP APIs.

## RestService

The `RestService` provides methods for making HTTP requests:

```tsx
import { RestService } from '@abpjs/core';

// GET request
const users = await RestService.get('/api/identity/users');

// POST request
const newUser = await RestService.post('/api/identity/users', {
  userName: 'john',
  email: 'john@example.com',
});

// PUT request
await RestService.put('/api/identity/users/123', {
  userName: 'john_updated',
});

// DELETE request
await RestService.delete('/api/identity/users/123');
```

## API Reference

| Method | Parameters | Description |
|--------|------------|-------------|
| `get<T>` | `(url: string, config?: AxiosRequestConfig)` | Make a GET request |
| `post<T>` | `(url: string, data?: any, config?: AxiosRequestConfig)` | Make a POST request |
| `put<T>` | `(url: string, data?: any, config?: AxiosRequestConfig)` | Make a PUT request |
| `delete<T>` | `(url: string, config?: AxiosRequestConfig)` | Make a DELETE request |
| `request<T>` | `(config: AxiosRequestConfig)` | Make a custom request |

## Working with Paged Results

ABP APIs return paged results. Use the built-in types:

```tsx
import { RestService, PagedResultDto } from '@abpjs/core';

interface User {
  id: string;
  userName: string;
  email: string;
}

async function getUsers(page: number, pageSize: number) {
  const response = await RestService.get<PagedResultDto<User>>(
    '/api/identity/users',
    {
      params: {
        skipCount: (page - 1) * pageSize,
        maxResultCount: pageSize,
      },
    }
  );

  return {
    items: response.items,
    totalCount: response.totalCount,
  };
}
```

## Custom Hook for API Calls

Create a custom hook for data fetching:

```tsx
import { useState, useEffect } from 'react';
import { RestService } from '@abpjs/core';

function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await RestService.get<T>(url);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserList() {
  const { data, loading, error } = useApi<PagedResultDto<User>>('/api/identity/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data?.items.map((user) => (
        <li key={user.id}>{user.userName}</li>
      ))}
    </ul>
  );
}
```

## Interceptors

The REST service automatically handles:

- **Authentication** - Adds the Bearer token to requests
- **Tenant Header** - Adds the `__tenant` header for multi-tenant requests
- **Error Handling** - Formats ABP error responses

## Error Handling

ABP errors are automatically formatted. Handle them in your code:

```tsx
import { RestService } from '@abpjs/core';
import { useToaster } from '@abpjs/theme-shared';

function CreateUser() {
  const toaster = useToaster();

  const handleCreate = async (userData: CreateUserInput) => {
    try {
      await RestService.post('/api/identity/users', userData);
      toaster.success('User created successfully!');
    } catch (error: any) {
      // ABP error format
      if (error.response?.data?.error) {
        toaster.error(error.response.data.error.message);
      } else {
        toaster.error('An error occurred');
      }
    }
  };

  // ...
}
```

## Related

- [Error Handling](/docs/packages/theme-shared/error-handling) - Global error handling
- [Authentication](/docs/packages/core/authentication) - Auth configuration
