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
| `AuditLoggingService` | API service for audit log operations |

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
| `auditLogs` | `AuditLogging.Log[]` | List of audit logs |
| `totalCount` | `number` | Total count for pagination |
| `selectedLog` | `AuditLogging.Log \| null` | Currently selected log |
| `isLoading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message |
| `averageExecutionStats` | `Statistics.Data` | Execution duration statistics |
| `errorRateStats` | `Statistics.Data` | Error rate statistics |
| `sortKey` | `string` | Current sort field |
| `sortOrder` | `'asc' \| 'desc' \| ''` | Sort direction |
| `fetchAuditLogs` | `function` | Fetch audit logs with params |
| `getAuditLogById` | `function` | Get single log by ID |
| `fetchAverageExecutionStats` | `function` | Fetch execution stats |
| `fetchErrorRateStats` | `function` | Fetch error rate stats |
| `setSelectedLog` | `function` | Set selected log |
| `setSortKey` | `function` | Update sort field |
| `setSortOrder` | `function` | Update sort direction |
| `reset` | `function` | Reset all state |

## Service Methods

The `AuditLoggingService` provides the following methods:

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getAuditLogs` | `params?: AuditLogsQueryParams` | `Promise<Response>` | Get paginated audit logs |
| `getAuditLogById` | `id: string` | `Promise<Log>` | Get single audit log |
| `getAverageExecutionDurationPerDayStatistics` | `params?: Filter` | `Promise<Statistics.Response>` | Get execution duration stats |
| `getErrorRateStatistics` | `params?: Filter` | `Promise<Statistics.Response>` | Get error rate stats |

## Query Parameters

Filter audit logs with these parameters:

```tsx
interface AuditLogsQueryParams {
  // Pagination
  skipCount?: number;
  maxResultCount?: number;
  sorting?: string;

  // Filters
  url?: string;
  userName?: string;
  applicationName?: string;
  correlationId?: string;
  httpMethod?: string;
  httpStatusCode?: number;
  minExecutionDuration?: number;
  maxExecutionDuration?: number;
  hasException?: boolean;
  startTime?: string;
  endTime?: string;
}
```

## Audit Log Structure

Each audit log contains:

```tsx
interface Log {
  id: string;
  userId: string;
  userName: string;
  tenantId: string;
  impersonatorUserId: string;
  impersonatorTenantId: string;
  executionTime: string;
  executionDuration: number;
  clientIpAddress: string;
  clientName: string;
  browserInfo: string;
  httpMethod: string;
  url: string;
  exceptions: string;
  comments: string;
  httpStatusCode: number;
  applicationName: string;
  correlationId: string;
  extraProperties: Record<string, unknown>;
  entityChanges: EntityChange[];
  actions: AuditLogAction[];
}
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
  AuditLogging,
  Statistics,
  HttpStatusCode,
} from '@abpjs/audit-logging';

// AuditLogging namespace contains:
// - AuditLogging.State
// - AuditLogging.Response
// - AuditLogging.Log
// - AuditLogging.EntityChange
// - AuditLogging.PropertyChange
// - AuditLogging.AuditLogAction
// - AuditLogging.AuditLogsQueryParams

// Statistics namespace contains:
// - Statistics.Filter
// - Statistics.Data
// - Statistics.Response
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
