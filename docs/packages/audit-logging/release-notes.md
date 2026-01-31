---
sidebar_position: 99
---

# Release Notes

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
