---
sidebar_position: 99
---

# Release Notes

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
