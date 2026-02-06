---
sidebar_position: 99
---

# Release Notes

## v3.0.0

**February 2026**

### Breaking Changes

#### `eAuditLoggingRouteNames.Administration` removed

The `Administration` key has been removed from `eAuditLoggingRouteNames`. Use `eThemeSharedRouteNames.Administration` from `@abpjs/theme-shared` instead:

```tsx
// Before (v2.7.0)
import { eAuditLoggingRouteNames } from '@abpjs/audit-logging';
const adminRoute = eAuditLoggingRouteNames.Administration;

// After (v3.0.0)
import { eThemeSharedRouteNames } from '@abpjs/theme-shared';
const adminRoute = eThemeSharedRouteNames.Administration;
```

### New Features

#### Route Providers

New route provider system for initializing audit logging routes:

```tsx
import { initializeAuditLoggingRoutes } from '@abpjs/audit-logging';

// Call once during app initialization
initializeAuditLoggingRoutes();

// This registers:
// - Audit Logging (under Administration)
// - /audit-logging
```

For advanced configuration with a custom RoutesService:

```tsx
import { configureRoutes, AUDIT_LOGGING_ROUTE_PROVIDERS } from '@abpjs/audit-logging';
import { getRoutesService } from '@abpjs/core';

const routesService = getRoutesService();
const addRoutes = configureRoutes(routesService);
addRoutes();
```

#### Policy Names

New constants for audit logging permission policies:

```tsx
import { eAuditLoggingPolicyNames } from '@abpjs/audit-logging';

// Available policies:
eAuditLoggingPolicyNames.AuditLogging  // 'AuditLogging.AuditLogs'

// Use with permission checking
import { usePermission } from '@abpjs/core';

function AuditLoggingMenu() {
  const canViewAuditLogs = usePermission(eAuditLoggingPolicyNames.AuditLogging);

  if (!canViewAuditLogs) return null;
  return <AuditLoggingLink />;
}
```

#### EntityChangeModalService

New service for displaying entity change details and history in modals:

```tsx
import { EntityChangeModalService, EntityChangeService } from '@abpjs/audit-logging';
import { RestService } from '@abpjs/core';

const restService = new RestService();
const entityChangeService = new EntityChangeService(restService);
const modalService = new EntityChangeModalService(entityChangeService);

// Register callbacks for modal display
modalService.onShowDetails((data) => {
  // Handle showing entity change details
  console.log('Show details:', data);
});

modalService.onShowHistory((data) => {
  // Handle showing entity change history
  console.log('Show history:', data);
});

// Trigger modal display
await modalService.showDetails('entity-change-id');
await modalService.showHistory('entity-id', 'MyApp.Domain.Entities.Product');
```

#### Entity Details and History Providers

New providers for registering entity details and history display:

```tsx
import {
  ENTITY_DETAILS_PROVIDERS,
  ENTITY_HISTORY_PROVIDERS,
  SHOW_ENTITY_DETAILS,
  SHOW_ENTITY_HISTORY,
} from '@abpjs/audit-logging';

// These tokens can be used to provide custom implementations
// for showing entity details and history
```

#### Extensions System

New extensibility system for customizing audit logging components:

```tsx
import {
  EntityAction,
  EntityProp,
  ToolbarAction,
  DEFAULT_AUDIT_LOGGING_ENTITY_ACTIONS,
  DEFAULT_AUDIT_LOGGING_TOOLBAR_ACTIONS,
  DEFAULT_AUDIT_LOGGING_ENTITY_PROPS,
} from '@abpjs/audit-logging';

// Define custom entity action
const customAction: EntityAction<AuditLogging.Log> = {
  text: 'Export',
  action: ({ record }) => exportLog(record),
  permission: 'AuditLogging.Export',
  icon: 'bi bi-download',
};

// Define custom entity property
const customProp: EntityProp<AuditLogging.Log> = {
  type: 'string',
  name: 'customField',
  displayName: 'Custom Field',
  sortable: true,
  valueResolver: ({ record }) => record.extraProperties?.customField,
};

// Define custom toolbar action
const customToolbarAction: ToolbarAction<AuditLogging.Log[]> = {
  text: 'Export All',
  action: ({ records }) => exportAll(records),
  permission: 'AuditLogging.Export',
  icon: 'bi bi-download',
};
```

#### Config Options

New configuration options for the audit logging module:

```tsx
import {
  AuditLoggingConfigOptions,
  DEFAULT_AUDIT_LOGGING_CONFIG_OPTIONS,
} from '@abpjs/audit-logging';

const config: AuditLoggingConfigOptions = {
  entityActionContributors: {
    'AuditLogging.AuditLogsComponent': (actions) => [
      ...actions,
      { text: 'Custom', action: () => {} },
    ],
  },
  toolbarActionContributors: {
    'AuditLogging.AuditLogsComponent': (actions) => [
      ...actions,
      { text: 'Export', action: () => {} },
    ],
  },
  entityPropContributors: {
    'AuditLogging.AuditLogsComponent': (props) => [
      ...props,
      { type: 'string', name: 'custom', displayName: 'Custom' },
    ],
  },
};
```

#### Extensions Guard

New guard for protecting routes with extensions:

```tsx
import { AuditLoggingExtensionsGuard } from '@abpjs/audit-logging';

// Use in route configuration to ensure extensions are loaded
```

#### Config Subpackage

The `@volo/abp.ng.audit-logging/config` functionality is now merged into the main package:

```tsx
// All config exports are available from the main package
import {
  configureRoutes,
  AUDIT_LOGGING_ROUTE_PROVIDERS,
  initializeAuditLoggingRoutes,
  eAuditLoggingRouteNames,
  eAuditLoggingPolicyNames,
  EntityChangeModalService,
  ENTITY_DETAILS_PROVIDERS,
  ENTITY_HISTORY_PROVIDERS,
} from '@abpjs/audit-logging';
```

### New Exports

**Route and Policy:**
- `initializeAuditLoggingRoutes()` - Initialize audit logging routes
- `configureRoutes(routes)` - Configure routes with custom RoutesService
- `AUDIT_LOGGING_ROUTE_PROVIDERS` - Route provider configuration object
- `eAuditLoggingPolicyNames` - Constants for audit logging permission policies
- `AuditLoggingPolicyNameKey` - Type for policy name values

**Modal Service:**
- `EntityChangeModalService` - Service for entity change modals
- `EntityChangeDetailsCallback` - Callback type for details display
- `EntityChangeHistoryCallback` - Callback type for history display

**Entity Providers:**
- `ENTITY_DETAILS_PROVIDERS` - Provider for entity details display
- `ENTITY_HISTORY_PROVIDERS` - Provider for entity history display
- `SHOW_ENTITY_DETAILS` - Token for entity details display
- `SHOW_ENTITY_HISTORY` - Token for entity history display

**Extensions:**
- `EntityAction<T>` - Interface for entity actions
- `EntityProp<T>` - Interface for entity properties
- `ToolbarAction<T>` - Interface for toolbar actions
- `EntityActionContributorCallback<T>` - Callback type for entity action contributors
- `EntityPropContributorCallback<T>` - Callback type for entity prop contributors
- `ToolbarActionContributorCallback<T>` - Callback type for toolbar action contributors
- `DEFAULT_AUDIT_LOGGING_ENTITY_ACTIONS` - Default entity actions
- `DEFAULT_AUDIT_LOGGING_TOOLBAR_ACTIONS` - Default toolbar actions
- `DEFAULT_AUDIT_LOGGING_ENTITY_PROPS` - Default entity properties
- `AuditLoggingEntityActionContributors` - Type for entity action contributors
- `AuditLoggingToolbarActionContributors` - Type for toolbar action contributors
- `AuditLoggingEntityPropContributors` - Type for entity prop contributors

**Config:**
- `AuditLoggingConfigOptions` - Interface for module configuration
- `DEFAULT_AUDIT_LOGGING_CONFIG_OPTIONS` - Default configuration options

**Guards:**
- `AuditLoggingExtensionsGuard` - Guard for extensions loading

---

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
