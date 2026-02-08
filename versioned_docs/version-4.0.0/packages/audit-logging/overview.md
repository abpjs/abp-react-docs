---
sidebar_position: 1
---

# Overview

The `@abpjs/audit-logging` package provides components and services for viewing and managing audit logs in ABP React applications. This is the React equivalent of Angular's `@volo/abp.ng.audit-logging` module.

[![npm version](https://img.shields.io/npm/v/@abpjs/audit-logging.svg)](https://www.npmjs.com/package/@abpjs/audit-logging)

:::info ABP Commercial License Required
This package is free to use but requires the corresponding backend module from [ABP Commercial](https://commercial.abp.io/). You can purchase an ABP Commercial license from [abp.io](https://abp.io/pricing).
:::

## Installation

```bash
npm install @abpjs/audit-logging
# or
yarn add @abpjs/audit-logging
```

**Required peer dependencies:**
```bash
npm install @abpjs/core @abpjs/theme-shared @chakra-ui/react
```

## Features

- **Audit Logs Table** - Paginated table with filtering and sorting
- **Log Details Modal** - View detailed audit log information
- **Entity Changes** - Track entity property changes
- **Action Tracking** - View service method calls and parameters
- **Statistics** - Average execution duration and error rate charts
- **Advanced Filtering** - Filter by user, URL, HTTP method, status code, and more

## Main Exports

### Components

| Component | Description |
|-----------|-------------|
| `AuditLogsComponent` | Complete audit logs management UI |

### Hooks

| Hook | Description |
|------|-------------|
| `useAuditLogs` | Hook for managing audit log state and operations |

### Services

| Service | Description |
|---------|-------------|
| `AuditLogsService` | Proxy service for audit logging API (v3.2.0+) |
| `AuditLoggingStateService` | State management with dispatch methods (v2.0.0) |
| `EntityChangeModalService` | Entity change detail/history modals (v3.0.0) |

### Constants

| Constant | Description |
|----------|-------------|
| `AUDIT_LOGGING_ROUTES` | Pre-configured routes |
| `HTTP_METHODS` | List of HTTP methods for filtering |
| `HTTP_STATUS_CODES` | List of HTTP status codes with descriptions |

## Quick Example

```tsx
import { AuditLogsComponent } from '@abpjs/audit-logging';

function AuditLogsPage() {
  return (
    <AuditLogsComponent
      onAuditLogSelected={(log) => console.log('Selected:', log)}
    />
  );
}
```

## Using the Hook

```tsx
import { useAuditLogs } from '@abpjs/audit-logging';
import { useEffect } from 'react';

function CustomAuditLogs() {
  const {
    auditLogs,
    totalCount,
    isLoading,
    error,
    fetchAuditLogs,
    getAuditLogById,
    fetchAverageExecutionStats,
    fetchErrorRateStats,
  } = useAuditLogs();

  useEffect(() => {
    fetchAuditLogs({
      maxResultCount: 10,
      skipCount: 0,
    });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Audit Logs ({totalCount})</h2>
      <ul>
        {auditLogs.map((log) => (
          <li key={log.id}>
            {log.userName} - {log.httpMethod} {log.url} ({log.httpStatusCode})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Hook Return Values

| Property | Type | Description |
|----------|------|-------------|
| `auditLogs` | `AuditLogDto[]` | List of audit logs |
| `totalCount` | `number` | Total count for pagination |
| `selectedLog` | `AuditLogDto \| null` | Currently selected log |
| `isLoading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message |
| `averageExecutionStats` | `Record<string, number>` | Execution duration statistics |
| `errorRateStats` | `Record<string, number>` | Error rate statistics |
| `sortKey` | `string` | Current sort field |
| `sortOrder` | `'asc' \| 'desc' \| ''` | Sort direction |
| `fetchAuditLogs` | `(params?: GetAuditLogListDto) => Promise` | Fetch audit logs with params |
| `getAuditLogById` | `(id: string) => Promise` | Get single log by ID |
| `fetchAverageExecutionStats` | `(params: GetAverageExecutionDurationPerDayInput) => Promise` | Fetch execution stats |
| `fetchErrorRateStats` | `(params: GetErrorRateFilter) => Promise` | Fetch error rate stats |
| `setSelectedLog` | `function` | Set selected log |
| `setSortKey` | `function` | Update sort field |
| `setSortOrder` | `function` | Update sort direction |
| `reset` | `function` | Reset all state |

## Service Methods

The `AuditLogsService` provides the following methods:

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getList` | `params?: GetAuditLogListDto` | `Promise<PagedResultDto<AuditLogDto>>` | Get paginated audit logs |
| `get` | `id: string` | `Promise<AuditLogDto>` | Get single audit log |
| `getAverageExecutionDurationPerDay` | `params: GetAverageExecutionDurationPerDayInput` | `Promise<GetAverageExecutionDurationPerDayOutput>` | Get execution duration stats |
| `getErrorRate` | `params: GetErrorRateFilter` | `Promise<GetErrorRateOutput>` | Get error rate stats |
| `getEntityChange` | `id: string` | `Promise<EntityChangeDto>` | Get single entity change |
| `getEntityChangeWithUsername` | `id: string` | `Promise<EntityChangeWithUsernameDto>` | Get entity change with username |
| `getEntityChanges` | `params: GetEntityChangesDto` | `Promise<PagedResultDto<EntityChangeDto>>` | Get paginated entity changes |
| `getEntityChangesWithUsername` | `params: EntityChangeFilter` | `Promise<EntityChangeWithUsernameDto[]>` | Get entity changes with username |

## Query Parameters

Filter audit logs with `GetAuditLogListDto`:

```tsx
import type { GetAuditLogListDto } from '@abpjs/audit-logging';

const params: GetAuditLogListDto = {
  // Pagination
  skipCount: 0,
  maxResultCount: 10,
  sorting: 'executionTime desc',

  // Filters
  url: '/api/users',
  userName: 'admin',
  applicationName: 'MyApp',
  correlationId: 'abc-123',
  httpMethod: 'POST',
  httpStatusCode: 200,
  minExecutionDuration: 100,
  maxExecutionDuration: 5000,
  hasException: false,
  startTime: '2026-01-01T00:00:00Z',
  endTime: '2026-01-31T23:59:59Z',
};
```

## Routes

```tsx
import { AUDIT_LOGGING_ROUTES } from '@abpjs/audit-logging';

// Route configuration:
// /audit-logs (requires 'AuditLogging.AuditLogs' policy)
```

## HTTP Constants

```tsx
import { HTTP_METHODS, HTTP_STATUS_CODES } from '@abpjs/audit-logging';

// HTTP_METHODS: ['GET', 'POST', 'DELETE', 'PUT', 'HEAD', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH']

// HTTP_STATUS_CODES: [{ code: 200, message: 'OK' }, { code: 404, message: 'Not Found' }, ...]
```

## TypeScript Support

```tsx
import type {
  // Audit Log DTOs
  AuditLogDto,
  AuditLogActionDto,
  GetAuditLogListDto,
  // Entity Change DTOs
  EntityChangeDto,
  EntityChangeWithUsernameDto,
  EntityPropertyChangeDto,
  GetEntityChangesDto,
  EntityChangeFilter,
  // Statistics DTOs
  GetAverageExecutionDurationPerDayInput,
  GetAverageExecutionDurationPerDayOutput,
  GetErrorRateFilter,
  GetErrorRateOutput,
  // State
  AuditLogging,  // AuditLogging.State
  HttpStatusCode,
} from '@abpjs/audit-logging';
```

## Required Policies

The audit logging module requires the following ABP policies:

| Policy | Description |
|--------|-------------|
| `AuditLogging.AuditLogs` | View audit logs |

## Dependencies

- `@abpjs/core` - Core ABP React functionality
- `@abpjs/theme-shared` - Shared UI components
- `@chakra-ui/react` - UI component library

## See Also

- [Core Module](../core/overview)
- [Theme Shared](../theme-shared/overview)
- [Release Notes](./release-notes) - Version history
