---
sidebar_position: 99
---

# Release Notes

## v2.9.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.7.0

**February 2026**

### New Features

#### EntityChangeService

New service for managing entity changes:

```tsx
import { EntityChangeService } from '@abpjs/audit-logging';
import { RestService } from '@abpjs/core';

const restService = new RestService();
const entityChangeService = new EntityChangeService(restService);

// Get paginated entity changes
const response = await entityChangeService.getEntityChanges({
  startDate: '2026-01-01',
  endDate: '2026-01-31',
  maxResultCount: 10,
});

// Get entity change by ID
const change = await entityChangeService.getEntityChangeById('change-id');

// Get entity changes with username for a specific entity
const changesWithUser = await entityChangeService.getEntityChangesWithUserName(
  'entity-id',
  'MyApp.Domain.Entities.Product'
);

// Get single entity change with username
const changeWithUser = await entityChangeService.getEntityChangeWithUserNameById('change-id');
```

#### Entity Change Models

New namespace for entity change types:

```tsx
import { EntityChange, eEntityChangeType } from '@abpjs/audit-logging';

// Query parameters
const params: EntityChange.EntityChangesQueryParams = {
  entityChangeType: eEntityChangeType.Updated,
  entityId: 'some-id',
  startDate: '2026-01-01',
  endDate: '2026-01-31',
};

// Entity change item
const change: EntityChange.Item = {
  id: 'change-id',
  auditLogId: 'audit-log-id',
  changeType: eEntityChangeType.Created,
  entityId: 'entity-id',
  entityTypeFullName: 'MyApp.Domain.Entities.Product',
  changeTime: '2026-01-15T10:30:00Z',
  propertyChanges: [
    {
      propertyName: 'Name',
      originalValue: 'Old Name',
      newValue: 'New Name',
      // ...
    },
  ],
  // ...
};
```

#### Entity Change Type Enum

New enum for entity change types:

```tsx
import { eEntityChangeType } from '@abpjs/audit-logging';

// Available values:
// eEntityChangeType.Created = 0
// eEntityChangeType.Updated = 1
// eEntityChangeType.Deleted = 2
```

#### Route Names

New constants for audit logging route names (localization keys):

```tsx
import { eAuditLoggingRouteNames } from '@abpjs/audit-logging';

// Available route names:
// eAuditLoggingRouteNames.Administration = 'AbpUiNavigation::Menu:Administration'
// eAuditLoggingRouteNames.AuditLogging = 'AbpAuditLogging::Menu:AuditLogging'
```

### New Exports

- `EntityChangeService` - Service for entity change operations
- `EntityChange` - Namespace with entity change types
- `EntityChange.Item` - Entity change item interface
- `EntityChange.ItemWithUserName` - Entity change with username
- `EntityChange.PropertyChange` - Property change interface
- `EntityChange.EntityChangesQueryParams` - Query parameters type
- `EntityChange.Response` - Paginated response type
- `eEntityChangeType` - Enum for entity change types (Created, Updated, Deleted)
- `eAuditLoggingRouteNames` - Constants for route names
- `AuditLoggingRouteNameKey` - Type for route name values

---

## v2.4.0

**February 2026**

### New Features

- **`AuditLoggingService.apiName` property** - New property for REST API configuration. Defaults to `'default'`.

- **`eAuditLoggingComponents` enum** - New enum for component identifiers, useful for component registration and customization:

  ```tsx
  import { eAuditLoggingComponents } from '@abpjs/audit-logging';

  // Available components:
  // eAuditLoggingComponents.AuditLogs = 'AuditLogging.AuditLogsComponent'
  ```

---

## v2.2.0

**February 2026**

- Version alignment with @abpjs/core

---

## v2.1.1

**February 2026**

- Version alignment with @abpjs/core

---

## v2.0.0

**January 2026**

### New Features

- **`AuditLoggingStateService`** - New state service for programmatic audit logging operations:
  - `dispatchGetAuditLogs(params?)` - Fetch audit logs and update internal state
  - `dispatchGetAverageExecutionDurationPerDay(params?)` - Fetch average execution duration statistics
  - `dispatchGetErrorRate(params?)` - Fetch error rate statistics
  - `getResult()` - Get current audit logs result
  - `getTotalCount()` - Get total count of audit logs
  - `getAverageExecutionStatistics()` - Get cached average execution statistics
  - `getErrorRateStatistics()` - Get cached error rate statistics

### Example

```tsx
import { AuditLoggingStateService } from '@abpjs/audit-logging';
import { RestService } from '@abpjs/core';

const restService = new RestService();
const stateService = new AuditLoggingStateService(restService);

// Fetch audit logs
await stateService.dispatchGetAuditLogs({
  startTime: '2026-01-01',
  endTime: '2026-01-31',
  maxResultCount: 10,
});
const logs = stateService.getResult();
console.log(`Found ${stateService.getTotalCount()} logs`);

// Fetch statistics
await stateService.dispatchGetAverageExecutionDurationPerDay({
  startDate: '2026-01-01',
  endDate: '2026-01-31',
});
const avgStats = stateService.getAverageExecutionStatistics();

await stateService.dispatchGetErrorRate({
  startDate: '2026-01-01',
  endDate: '2026-01-31',
});
const errorStats = stateService.getErrorRateStatistics();
```

---

## v1.0.0

**January 2026**

- Version alignment with @abpjs/core v1.0.0

---

## v0.7.2 (Initial Release)

**January 2026**

### Features

- **AuditLogsComponent** - Complete audit logs management UI with:
  - Paginated table with sorting
  - Advanced filtering (user, URL, HTTP method, status code, execution duration, exceptions)
  - Detail modal with tabbed view (Overall, Actions, Changes)
  - Entity change tracking with property-level diffs
  - Action tracking with service/method names and parameters

### Hooks

- **useAuditLogs** - Hook for managing audit log state:
  - `auditLogs` - List of audit logs
  - `totalCount` - Total count for pagination
  - `selectedLog` - Currently selected log
  - `isLoading` / `error` - Loading and error states
  - `averageExecutionStats` / `errorRateStats` - Statistics data
  - `sortKey` / `sortOrder` - Sorting state
  - `fetchAuditLogs()` - Fetch with query parameters
  - `getAuditLogById()` - Get single log
  - `fetchAverageExecutionStats()` / `fetchErrorRateStats()` - Statistics

### Services

- **AuditLoggingService** with methods:
  - `getAuditLogs()` - Get paginated audit logs
  - `getAuditLogById()` - Get single audit log by ID
  - `getAverageExecutionDurationPerDayStatistics()` - Execution duration stats
  - `getErrorRateStatistics()` - Error rate statistics

### Constants

- **AUDIT_LOGGING_ROUTES** - Pre-configured routes
- **HTTP_METHODS** - List of HTTP methods for filtering
- **HTTP_STATUS_CODES** - HTTP status codes with descriptions

### Models

- `AuditLogging.Log` - Audit log entry
- `AuditLogging.EntityChange` - Entity change record
- `AuditLogging.PropertyChange` - Property change record
- `AuditLogging.AuditLogAction` - Action record
- `AuditLogging.AuditLogsQueryParams` - Query parameters
- `Statistics.Filter` / `Statistics.Data` / `Statistics.Response` - Statistics types

### TypeScript

- Full TypeScript support with exported interfaces and namespaces
