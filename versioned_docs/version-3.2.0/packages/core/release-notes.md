---
sidebar_position: 99
---

# Release Notes

## v3.2.0

**February 2026**

### New Features

#### ReplaceableComponentsService

New service for managing replaceable components, replacing the deprecated `AddReplaceableComponent` action:

```tsx
import {
  ReplaceableComponentsService,
  replaceableComponentsService,
  useReplaceableComponent,
} from '@abpjs/core';

// Add or replace a component
replaceableComponentsService.add({
  key: 'Identity.UsersComponent',
  component: MyCustomUsersComponent,
});

// Get a component by key
const component = replaceableComponentsService.getComponent('Identity.UsersComponent');

// Subscribe to changes
const unsubscribe = replaceableComponentsService.onUpdate((components) => {
  console.log('Components updated:', components);
});

// Remove a component
replaceableComponentsService.remove('Identity.UsersComponent');

// React hook for using replaceable components
function MyFeature() {
  const UsersComponent = useReplaceableComponent(
    'Identity.UsersComponent',
    DefaultUsersComponent
  );

  return <UsersComponent />;
}
```

#### ApplicationConfiguration.CurrentUser Fields

New fields added to `CurrentUser` for additional user information:

```tsx
import { ApplicationConfiguration } from '@abpjs/core';

const currentUser: ApplicationConfiguration.CurrentUser = {
  id: 'user-id',
  userName: 'john.doe',
  email: 'john@example.com',
  emailVerified: true,        // New in v3.2.0
  name: 'John',               // New in v3.2.0
  surName: 'Doe',             // New in v3.2.0
  phoneNumber: '+1234567890', // New in v3.2.0
  phoneNumberVerified: true,  // New in v3.2.0
  roles: ['admin'],
  tenantId: 'tenant-id',
  isAuthenticated: true,
};
```

#### InternalStore Class

New lightweight state management class for internal use:

```tsx
import { InternalStore } from '@abpjs/core';

interface MyState {
  count: number;
  user: { name: string };
}

const store = new InternalStore<MyState>({
  count: 0,
  user: { name: 'Guest' },
});

// Get current state
console.log(store.state.count);

// Subscribe to state changes
const unsubscribe = store.subscribe((state) => {
  console.log('State updated:', state);
});

// Patch state (deep merge)
store.patch({ count: 1 });
store.patch({ user: { name: 'John' } });

// Slice state with selector
const countSlice = store.sliceState((state) => state.count);
countSlice.subscribe((count) => console.log('Count:', count));

// Reset to initial state
store.reset();
```

#### File Utilities

New utility for downloading blobs as files:

```tsx
import { downloadBlob } from '@abpjs/core';

// Download a blob as a file
const response = await fetch('/api/reports/export');
const blob = await response.blob();
downloadBlob(blob, 'report.xlsx');
```

#### String Utilities: interpolate()

New function for parameter substitution in strings:

```tsx
import { interpolate } from '@abpjs/core';

const message = interpolate('Hello {0}, you have {1} messages', ['John', '5']);
// Returns: 'Hello John, you have 5 messages'

const greeting = interpolate('Welcome to {0}!', ['ABP React']);
// Returns: 'Welcome to ABP React!'
```

#### Route Utilities: reloadRoute()

New function to reload the current route:

```tsx
import { reloadRoute } from '@abpjs/core';

// Reload the current page/route
reloadRoute();
```

#### OAuth Storage Management

New utilities for managing OAuth storage:

```tsx
import { oAuthStorage, clearOAuthStorage } from '@abpjs/core';

// Access the OAuth storage (sessionStorage by default)
const token = oAuthStorage.getItem('access_token');

// Clear all OAuth-related items
clearOAuthStorage();

// Clear from custom storage
clearOAuthStorage(localStorage);
```

#### LocalizationService.getResource()

New method to get an entire localization resource:

```tsx
import { useLocalizationService } from '@abpjs/core';

function MyComponent() {
  const localizationService = useLocalizationService();

  // Get all localizations for a resource
  const identityTexts = localizationService.getResource('AbpIdentity');
  // Returns: { 'Users': 'Users', 'Roles': 'Roles', ... }
}
```

#### ConfigStateService.getLocalizationResource()

New method on ConfigStateService to get localization resources:

```tsx
import { useConfigStateService } from '@abpjs/core';

function MyComponent() {
  const configStateService = useConfigStateService();

  const accountTexts = configStateService.getLocalizationResource('AbpAccount');
  // Returns: { 'Login': 'Login', 'Register': 'Register', ... }
}
```

#### DeepPartial Type

New utility type for deep partial objects:

```tsx
import { DeepPartial } from '@abpjs/core';

interface Config {
  api: {
    url: string;
    timeout: number;
  };
  auth: {
    clientId: string;
  };
}

// All properties are optional recursively
const partialConfig: DeepPartial<Config> = {
  api: { timeout: 5000 },
  // url and auth are optional
};
```

### Deprecations

#### AddReplaceableComponent Action

The `AddReplaceableComponent` action is deprecated. Use `ReplaceableComponentsService` instead:

```tsx
// Deprecated
dispatch(AddReplaceableComponent({ key: 'MyComponent', component: MyComponent }));

// Recommended
replaceableComponentsService.add({ key: 'MyComponent', component: MyComponent });
```

#### ReplaceableComponentsState

The `ReplaceableComponentsState` slice is deprecated. Use `ReplaceableComponentsService` instead.

### New Exports

- `ReplaceableComponentsService` - Service for managing replaceable components
- `replaceableComponentsService` - Singleton instance of ReplaceableComponentsService
- `useReplaceableComponent(key, defaultComponent)` - React hook for replaceable components
- `InternalStore<State>` - Lightweight internal state management class
- `DeepPartial<T>` - Utility type for deep partial objects
- `downloadBlob(blob, filename)` - Download blob as file
- `interpolate(text, params)` - String parameter substitution
- `reloadRoute()` - Reload current route
- `oAuthStorage` - OAuth storage instance
- `clearOAuthStorage(storage?)` - Clear OAuth storage
- `LocalizationService.getResource(resourceName)` - Get localization resource
- `ConfigStateService.getLocalizationResource(resourceName)` - Get localization resource
- `ApplicationConfiguration.CurrentUser.emailVerified` - Email verification status
- `ApplicationConfiguration.CurrentUser.name` - User's first name
- `ApplicationConfiguration.CurrentUser.surName` - User's surname
- `ApplicationConfiguration.CurrentUser.phoneNumber` - User's phone number
- `ApplicationConfiguration.CurrentUser.phoneNumberVerified` - Phone verification status

---

## v3.1.0

**February 2026**

### New Features

#### MultiTenancyService

New service for multi-tenancy operations including tenant lookup:

```tsx
import { MultiTenancyService, RestService } from '@abpjs/core';

const restService = new RestService();
const multiTenancyService = new MultiTenancyService(restService);

// Find tenant by name
const result = await multiTenancyService.findTenantByName('myTenant');
if (result.success) {
  console.log(`Found tenant: ${result.name}, ID: ${result.tenantId}`);
}

// Find tenant by ID
const tenant = await multiTenancyService.findTenantById('tenant-guid');

// Control tenant box visibility
multiTenancyService.isTenantBoxVisible = false;

// Set domain tenant
multiTenancyService.domainTenant = { id: 'tenant-id', name: 'Tenant Name' };
```

#### SubscriptionService

Service for managing multiple subscriptions/cleanups, useful for class components or imperative code:

```tsx
import { SubscriptionService, useSubscription } from '@abpjs/core';

// Class-based usage
const subscriptionService = new SubscriptionService();

// Add subscriptions
const sub = subscriptionService.addOne(() => {
  const handler = () => console.log('resize');
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
});

// Close specific subscription
subscriptionService.closeOne(sub);

// Close all subscriptions
subscriptionService.closeAll();

// Check if all closed
if (subscriptionService.isClosed) {
  console.log('All subscriptions closed');
}
```

#### Auth Flow Strategies

New authentication flow strategies for OAuth:

```tsx
import {
  AuthFlowStrategy,
  AuthCodeFlowStrategy,
  AuthPasswordFlowStrategy,
  AUTH_FLOW_STRATEGY,
  getAuthFlowType,
} from '@abpjs/core';

// Determine flow type from OAuth config
const flowType = getAuthFlowType({ response_type: 'code' }); // 'Code'

// Create strategy using factory
const codeStrategy = AUTH_FLOW_STRATEGY.Code({ userManager });
const passwordStrategy = AUTH_FLOW_STRATEGY.Password({ userManager });

// Initialize and use
await codeStrategy.init();
await codeStrategy.login();
await codeStrategy.logout();

// Check auth type
if (codeStrategy.isInternalAuth) {
  // Password flow
} else {
  // Authorization code flow (SSO)
}
```

#### Remote Environment Configuration

Support for loading environment configuration from a remote source:

```tsx
import type { Config } from '@abpjs/core';

const environment: Config.Environment = {
  production: true,
  oAuthConfig: { /* ... */ },
  apis: { default: { url: '/api' } },
  remoteEnv: {
    url: 'https://config.example.com/environment.json',
    mergeStrategy: 'deepmerge', // or 'overwrite' or custom function
    method: 'GET',
    headers: { 'X-Api-Key': 'secret' },
  },
};

// Custom merge function
const customMerge: Config.customMergeFn = (localEnv, remoteEnv) => {
  return { ...localEnv, ...remoteEnv };
};
```

#### Date Utilities

New date format utilities based on application settings:

```tsx
import {
  getShortDateFormat,
  getShortTimeFormat,
  getShortDateShortTimeFormat,
} from '@abpjs/core';

// Get formats from ABP settings
const dateFormat = getShortDateFormat(configStateService); // 'MM/dd/yyyy'
const timeFormat = getShortTimeFormat(configStateService); // 'HH:mm'
const dateTimeFormat = getShortDateShortTimeFormat(configStateService); // 'MM/dd/yyyy HH:mm'
```

#### String Utilities

New token parser utility:

```tsx
import { createTokenParser } from '@abpjs/core';

// Create parser for a format
const parser = createTokenParser('{0}.{1}');
const result = parser('tenant.user');
// { '0': ['tenant'], '1': ['user'] }

// Parse route patterns
const routeParser = createTokenParser('/users/{id}/posts/{postId}');
const params = routeParser('/users/123/posts/456');
// { 'id': ['123'], 'postId': ['456'] }
```

#### Object Utilities

Deep merge utility for objects:

```tsx
import { deepMerge } from '@abpjs/core';

const target = {
  settings: { theme: 'dark', notifications: { email: true } },
  users: ['admin'],
};

const source = {
  settings: { notifications: { sms: true } },
  users: ['guest'],
};

const result = deepMerge(target, source);
// {
//   settings: { theme: 'dark', notifications: { email: true, sms: true } },
//   users: ['guest'] // Arrays are replaced, not merged
// }
```

#### Common Utilities

New type-checking utilities:

```tsx
import {
  isNullOrUndefined,
  exists,
  isObject,
  isArray,
  isObjectAndNotArray,
} from '@abpjs/core';

isNullOrUndefined(null);     // true
isNullOrUndefined(undefined); // true
isNullOrUndefined('');       // false

exists(null);    // false (with type narrowing)
exists('value'); // true

isObject({});      // true
isObject([]);      // true
isObject(null);    // false

isArray([]);      // true
isArray({});      // false

isObjectAndNotArray({});  // true
isObjectAndNotArray([]);  // false
```

#### ConfigStateService.getFeature()

New method to retrieve feature values:

```tsx
import { ConfigStateService } from '@abpjs/core';

const configStateService = new ConfigStateService();

// Get feature value
const featureValue = configStateService.getFeature('MyApp.MaxUsers');
if (featureValue) {
  console.log(`Max users: ${featureValue}`);
}
```

#### Config Model Enhancements

New properties on `Config.Application` and `Config.ApiConfig`:

```tsx
import type { Config } from '@abpjs/core';

const application: Config.Application = {
  name: 'My App',
  baseUrl: 'https://myapp.com', // New in v3.1.0
  logoUrl: '/logo.png',
};

const apiConfig: Config.ApiConfig = {
  url: 'https://api.example.com',
  rootNamespace: 'MyApp', // New in v3.1.0
};
```

#### FindTenantResultDto

New DTO class for tenant lookup results:

```tsx
import { FindTenantResultDto } from '@abpjs/core';

const result = new FindTenantResultDto({
  success: true,
  tenantId: 'guid-here',
  name: 'My Tenant',
});

if (result.success) {
  console.log(result.tenantId, result.name);
}
```

### New Exports

**Services:**
- `MultiTenancyService` - Multi-tenancy operations
- `SubscriptionService` - Subscription management
- `useSubscription` - Hook for subscription management

**Strategies:**
- `AuthFlowStrategy` - Abstract base class
- `AuthCodeFlowStrategy` - Authorization code flow
- `AuthPasswordFlowStrategy` - Password flow
- `AUTH_FLOW_STRATEGY` - Factory object
- `getAuthFlowType()` - Determine flow type from config

**Utilities:**
- `isNullOrUndefined()`, `exists()` - Null checking
- `isObject()`, `isArray()`, `isObjectAndNotArray()` - Type checking
- `deepMerge()` - Deep object merging
- `createTokenParser()` - Token parsing
- `getShortDateFormat()`, `getShortTimeFormat()`, `getShortDateShortTimeFormat()` - Date formats

**Models:**
- `FindTenantResultDto` - Tenant lookup result
- `Config.RemoteEnv` - Remote environment configuration
- `Config.customMergeFn` - Custom merge function type

---

## v3.0.0

**February 2026**

### Breaking Changes

#### Removed `ABP.Root.requirements`

The deprecated `ABP.Root.requirements` property has been removed. Remove any references to this property in your code.

#### Deprecated `ABP.FullRoute`

`ABP.FullRoute` is now deprecated. Use the new `RoutesService` for route management instead.

#### Deprecated `ConfigStateService.getRoute()`

The `getRoute()` method on `ConfigStateService` is deprecated. Use `RoutesService` instead:

```tsx
// Before (deprecated)
const route = configStateService.getRoute('/users');

// After (v3.0.0)
import { getRoutesService, findRoute } from '@abpjs/core';

const routesService = getRoutesService();
const route = findRoute(routesService, '/users');
```

### New Features

#### RoutesService

A new service for tree-based route management, replacing the legacy ConfigState route handling:

```tsx
import { getRoutesService, RoutesService } from '@abpjs/core';

const routesService = getRoutesService();

// Add routes
routesService.add([
  { name: 'Dashboard', path: '/dashboard', order: 1 },
  { name: 'Users', path: '/users', order: 2 },
  { name: 'UserDetails', path: '/users/:id', parentName: 'Users' },
]);

// Get flat list of routes
const allRoutes = routesService.flat;

// Get tree structure
const routeTree = routesService.tree;

// Get visible routes (filtered by permissions and invisible flag)
const visibleRoutes = routesService.visible;

// Find a route
const usersRoute = routesService.find((route) => route.name === 'Users');

// Search by partial properties
const route = routesService.search({ path: '/dashboard' });

// Patch a route
routesService.patch('Dashboard', { order: 10 });

// Remove routes
routesService.remove(['UserDetails']);

// Check for children
routesService.hasChildren('Users'); // true

// Subscribe to changes
const unsubscribe = routesService.subscribe(() => {
  console.log('Routes changed');
});
```

#### SettingTabsService

A new service for managing setting page tabs:

```tsx
import { getSettingTabsService } from '@abpjs/core';

const settingTabsService = getSettingTabsService();

// Add tabs
settingTabsService.add([
  { name: 'General', order: 1 },
  { name: 'Security', order: 2 },
  { name: 'Notifications', order: 3 },
]);

// Get visible tabs
const visibleTabs = settingTabsService.visible;
```

#### AbstractTreeService and AbstractNavTreeService

Base classes for building tree-based services:

```tsx
import { AbstractTreeService, AbstractNavTreeService, ABP } from '@abpjs/core';

// For generic tree structures
class MyTreeService extends AbstractTreeService<MyItem> {
  readonly id = 'id';
  readonly parentId = 'parentId';
  readonly hide = (item) => item.hidden;
  readonly sort = (a, b) => a.order - b.order;
}

// For navigation items (routes, tabs, menus)
class MyNavService extends AbstractNavTreeService<ABP.Nav> {
  // Inherits id='name', parentId='parentName'
  // Inherits permission-based filtering
}
```

#### Tree Utilities

New utilities for working with tree structures:

```tsx
import {
  TreeNode,
  BaseTreeNode,
  createTreeFromList,
  createMapFromList,
  findInTree,
  flattenTree,
  sortTree,
} from '@abpjs/core';

// TreeNode type
type TreeNode<T> = T & {
  children: TreeNode<T>[];
  isLeaf: boolean;
  parent?: TreeNode<T>;
};

// Create tree from flat list
const items = [
  { id: '1', parentId: null, name: 'Root' },
  { id: '2', parentId: '1', name: 'Child' },
];

const tree = createTreeFromList(
  items,
  (item) => item.id,        // keySelector
  (item) => item.parentId,  // parentKeySelector
  (item) => item            // valueMapper
);

// Create map from list
const map = createMapFromList(
  items,
  (item) => item.id,
  (item) => item.name
);

// Find in tree
const found = findInTree(tree, (node) => node.name === 'Child');

// Flatten tree to list
const flatList = flattenTree(tree);

// Sort tree recursively
const sorted = sortTree(tree, (a, b) => a.name.localeCompare(b.name));
```

#### Array Utilities

New utilities for array manipulation:

```tsx
import { pushValueTo, uniqueBy, groupBy } from '@abpjs/core';

// pushValueTo - functional composition helper
const items: string[] = [];
const addItem = pushValueTo(items);
addItem('first');  // returns ['first']
addItem('second'); // returns ['first', 'second']

// uniqueBy - remove duplicates
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John Doe' },
];
const unique = uniqueBy(users, (user) => user.id);
// [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]

// Simple deduplication
const numbers = [1, 2, 2, 3, 3, 3];
const uniqueNumbers = uniqueBy(numbers);
// [1, 2, 3]

// groupBy - group items by key
const grouped = groupBy(users, (user) => user.id);
// Map { 1 => [{...}, {...}], 2 => [{...}] }
```

#### Route Utilities

New utilities for route management:

```tsx
import { findRoute, getRoutePath, getRoutesService } from '@abpjs/core';

const routesService = getRoutesService();

// Find route by path
const route = findRoute(routesService, '/users');

// Get clean route path from URL
getRoutePath('/users?page=1#section');  // '/users'
getRoutePath('/users/');                 // '/users'
```

#### Generic ListService

`ListService` now supports generic query parameter types:

```tsx
import { ListService } from '@abpjs/core';

// Default ABP.PageQueryParams
const listService = new ListService();

// Custom query params type
interface MyQueryParams {
  filter?: string;
  maxResultCount: number;
  skipCount: number;
  sorting?: string;
  category?: string;
  status?: number;
}

const customListService = new ListService<MyQueryParams>();

// Type-safe query access
const query: MyQueryParams = customListService.query;
```

#### New Model Types

**`ABP.Nav`** - Base interface for navigation items:

```tsx
interface Nav {
  name: string;
  parentName?: string;
  order?: number;
  invisible?: boolean;
  requiredPolicy?: string;
}
```

**`ABP.Tab`** - Interface for tab components:

```tsx
interface Tab extends Nav {
  component?: React.ComponentType;
}
```

**`ABP.Route`** - Now extends `ABP.Nav`:

```tsx
interface Route extends Nav {
  path?: string;
  // ... other route properties
}
```

**`ApplicationConfiguration.CurrentUser.roles`** - New field for user's roles:

```tsx
const { currentUser } = configStateService.getAll();
console.log(currentUser.roles); // ['admin', 'manager']
```

### Deprecations

- **`ABP.FullRoute`** - Use `RoutesService` instead. Will be removed in v4.0.0.
- **`ConfigStateService.getRoute()`** - Use `RoutesService` instead. Will be removed in v4.0.0.
- **`organizeRoutes()`** - Use `RoutesService` instead. Will be removed in v4.0.0.

---

## v2.9.0

**February 2026**

### New Features

#### Validators Module

New `AbpValidators` collection for form validation, compatible with React Hook Form and similar libraries:

```tsx
import { AbpValidators } from '@abpjs/core';
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          validate: AbpValidators.emailAddress(),
        })}
      />

      <input
        {...register('age', {
          validate: AbpValidators.range({ minimum: 18, maximum: 120 }),
        })}
      />

      <input
        {...register('password', {
          validate: AbpValidators.stringLength({ minimumLength: 8, maximumLength: 128 }),
        })}
      />

      <input
        {...register('creditCard', {
          validate: AbpValidators.creditCard(),
        })}
      />

      <input
        {...register('website', {
          validate: AbpValidators.url(),
        })}
      />

      <input
        {...register('birthDate', {
          validate: AbpValidators.minAge({ minAge: 18 }),
        })}
      />
    </form>
  );
}
```

Available validators:
- `AbpValidators.creditCard()` - Luhn algorithm validation
- `AbpValidators.emailAddress()` - Email format validation
- `AbpValidators.minAge({ minAge })` - Minimum age from date of birth
- `AbpValidators.range({ minimum?, maximum? })` - Numeric range validation
- `AbpValidators.required({ allowEmptyStrings? })` - Required field validation
- `AbpValidators.stringLength({ minimumLength?, maximumLength? })` - String length validation
- `AbpValidators.url()` - URL format validation

#### ListService

New service for managing list queries with automatic debouncing:

```tsx
import { ListService, LIST_QUERY_DEBOUNCE_TIME } from '@abpjs/core';
import { useEffect, useState, useRef } from 'react';

function UserList() {
  const listServiceRef = useRef(new ListService());
  const listService = listServiceRef.current;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Hook to query - automatically debounces filter/page/sort changes
    listService.hookToQuery(async (query) => {
      const result = await fetchUsers(query);
      setUsers(result.items);
      return result;
    });

    return () => listService.destroy();
  }, []);

  return (
    <div>
      <input
        placeholder="Search..."
        onChange={(e) => {
          listService.filter = e.target.value; // Auto-debounced
        }}
      />

      <select onChange={(e) => {
        listService.maxResultCount = Number(e.target.value);
      }}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>

      {listService.isLoading ? <Spinner /> : (
        <Table data={users} />
      )}

      <Pagination
        page={listService.page}
        onPageChange={(page) => { listService.page = page; }}
      />
    </div>
  );
}
```

ListService properties:
- `filter` - Filter string (auto-triggers query with debounce)
- `page` - Current page number (0-indexed)
- `maxResultCount` - Items per page
- `sortKey` - Sort field name
- `sortOrder` - Sort direction ('asc' or 'desc')
- `query` - Current query parameters (readonly)
- `isLoading` - Loading state (readonly)

ListService methods:
- `hookToQuery(callback)` - Connect data fetching callback
- `get()` - Trigger immediate query (bypass debounce)
- `destroy()` - Clean up resources

#### Extensible Entity DTOs

New DTO classes with `extraProperties` support for ABP's object extension system:

```tsx
import {
  ExtensibleObject,
  ExtensibleEntityDto,
  ExtensibleCreationAuditedEntityDto,
  ExtensibleAuditedEntityDto,
  ExtensibleFullAuditedEntityDto,
} from '@abpjs/core';

// Base extensible object
interface MyExtensibleData extends ExtensibleObject {
  name: string;
  // extraProperties: Record<string, any> is inherited
}

// Extensible entity with ID
interface ProductDto extends ExtensibleEntityDto<string> {
  name: string;
  price: number;
}

// With creation audit
interface OrderDto extends ExtensibleCreationAuditedEntityDto<string> {
  orderNumber: string;
  // Includes: id, extraProperties, creationTime, creatorId
}

// With full audit
interface DocumentDto extends ExtensibleFullAuditedEntityDto<string> {
  title: string;
  // Includes: id, extraProperties, creationTime, creatorId,
  //           lastModificationTime, lastModifierId,
  //           isDeleted, deleterId, deletionTime
}

// With user references
import {
  ExtensibleCreationAuditedEntityWithUserDto,
  ExtensibleAuditedEntityWithUserDto,
  ExtensibleFullAuditedEntityWithUserDto,
} from '@abpjs/core';
```

#### Localization Utilities

New utility functions for working with localization:

```tsx
import {
  getLocaleDirection,
  createLocalizer,
  createLocalizerWithFallback,
} from '@abpjs/core';

// Get text direction for a locale
getLocaleDirection('en');    // 'ltr'
getLocaleDirection('ar');    // 'rtl'
getLocaleDirection('he-IL'); // 'rtl'

// Create a localizer function from config
const localize = createLocalizer(localizationConfig);
const text = localize('AbpIdentity', 'Users', 'Users');

// Create localizer with fallback across resources
const localizeWithFallback = createLocalizerWithFallback(localizationConfig);
const text = localizeWithFallback(
  ['MyModule', 'AbpIdentity'],  // Try these resources in order
  ['UserList', 'Users'],        // Try these keys in order
  'Users'                       // Default value
);
```

#### LocalizationService Enhancements

New methods for resource-based localization:

```tsx
import { useAbp } from '@abpjs/core';

function MyComponent() {
  const { localizationService } = useAbp();

  // Localize by resource name and key
  const text = localizationService.localizeSync('AbpIdentity', 'Users', 'Users');

  // Async version
  const asyncText = await localizationService.localize('AbpIdentity', 'Users', 'Users');

  // With fallback across multiple resources/keys
  const fallbackText = localizationService.localizeWithFallbackSync(
    ['MyModule', 'AbpIdentity'],
    ['UserManagement', 'Users'],
    'Users'
  );
}
```

#### LazyLoadService.remove()

New method to remove dynamically loaded resources:

```tsx
import { LazyLoadService, LOADING_STRATEGY } from '@abpjs/core';

const lazyLoadService = new LazyLoadService();

// Load a script
await lazyLoadService.load(
  LOADING_STRATEGY.AppendAnonymousScriptToHead('https://cdn.example.com/lib.js')
);

// Later, remove it from the DOM
const removed = lazyLoadService.remove('https://cdn.example.com/lib.js');
console.log(removed); // true if found and removed
```

### API Changes

- **`ApplicationConfiguration.CurrentUser.email`** - New field for user's email address
- **`ABP.Root.sendNullsAsQueryParam`** - Option to include null values in query strings
- **`LazyLoadService.loaded`** - Changed from `Set<unknown>` to `Map<string, HTMLElement>` for element tracking
- **`LoadingStrategy.element`** - New property containing the created element reference after loading

### Breaking Changes

- **`LazyLoadService.loaded` type changed** - If you were accessing this property directly, note it's now a `Map` instead of `Set`:
  ```tsx
  // Before (v2.4.0 - v2.7.0)
  lazyLoadService.loaded.has(path); // Set method

  // After (v2.9.0) - still works, Map also has .has()
  lazyLoadService.loaded.has(path); // Map method

  // New: get the element
  const element = lazyLoadService.loaded.get(path);
  ```

---

## v2.7.0

**February 2026**

### New Features

#### Utility Functions

New utility functions for common operations:

**`mapEnumToOptions()`** - Convert enums to select options:

```tsx
import { mapEnumToOptions } from '@abpjs/core';

enum Status {
  Active = 0,
  Inactive = 1,
  Pending = 2,
}

const options = mapEnumToOptions(Status);
// Returns: [
//   { key: 'Active', value: 0 },
//   { key: 'Inactive', value: 1 },
//   { key: 'Pending', value: 2 }
// ]

// Use in a select component
<Select>
  {options.map((opt) => (
    <option key={opt.key} value={opt.value}>
      {opt.key}
    </option>
  ))}
</Select>
```

**`isNumber()`** - Validate numeric values:

```tsx
import { isNumber } from '@abpjs/core';

isNumber(42);      // true
isNumber('42');    // true
isNumber('3.14');  // true
isNumber('abc');   // false
isNumber('');      // false
isNumber(NaN);     // false
```

**`generatePassword()`** - Generate secure random passwords:

```tsx
import { generatePassword } from '@abpjs/core';

const password = generatePassword();     // 16 character password
const short = generatePassword(8);       // 8 character password
const long = generatePassword(32);       // 32 character password

// Passwords include: lowercase, uppercase, digits, and special characters
```

#### Application Configuration Types

New interfaces for culture and date/time formatting:

```tsx
import { ApplicationConfiguration } from '@abpjs/core';

// Access current culture information
const currentCulture: ApplicationConfiguration.CurrentCulture = {
  cultureName: 'en-US',
  displayName: 'English (United States)',
  englishName: 'English',
  nativeName: 'English',
  isRightToLeft: false,
  twoLetterIsoLanguageName: 'en',
  threeLetterIsoLanguageName: 'eng',
  dateTimeFormat: {
    calendarAlgorithmType: 'SolarCalendar',
    dateSeparator: '/',
    fullDateTimePattern: 'dddd, MMMM d, yyyy h:mm:ss tt',
    longTimePattern: 'h:mm:ss tt',
    shortDatePattern: 'M/d/yyyy',
    shortTimePattern: 'h:mm tt',
  },
};
```

#### New Types

**`ABP.Option<T>`** - Type for enum-to-options mapping:

```tsx
import { ABP } from '@abpjs/core';

// Used with mapEnumToOptions()
type StatusOption = ABP.Option<typeof Status>;
// { key: 'Active' | 'Inactive' | 'Pending', value: 0 | 1 | 2 }
```

**`ABP.Test`** - Configuration for test environments:

```tsx
import { ABP } from '@abpjs/core';

const testConfig: ABP.Test = {
  baseHref: '/test/',
};
```

**Utility Types:**

```tsx
import {
  InferredInstanceOf,
  InferredContextOf,
  ComponentFactory,
  RenderProp,
} from '@abpjs/core';

// Infer props type from a component
type ButtonProps = InferredInstanceOf<typeof Button>;

// Infer context type from a render prop
type ContextType = InferredContextOf<typeof renderFunction>;
```

#### DomInsertionService Updates

New method and return value:

```tsx
import { getDomInsertionService, CONTENT_STRATEGY } from '@abpjs/core';

const domInsertionService = getDomInsertionService();

// insertContent() now returns the inserted element
const styleElement = domInsertionService.insertContent(
  CONTENT_STRATEGY.AppendStyleToHead('.my-class { color: red; }')
);

// New: removeContent() to remove an element
domInsertionService.removeContent(styleElement);

// has() replaces hasInserted() (hasInserted still works but deprecated)
if (!domInsertionService.has(myContent)) {
  domInsertionService.insertContent(/* ... */);
}
```

#### Configuration Options

**`ABP.Root.skipGetAppConfiguration`** - Skip fetching app configuration on initialization:

```tsx
import { AbpProvider } from '@abpjs/core';

// Useful for testing or when configuration is loaded separately
<AbpProvider options={{ skipGetAppConfiguration: true }}>
  <App />
</AbpProvider>
```

### API Changes

- **`DomInsertionService.insertContent()`** - Now returns the inserted element (previously void)
- **`DomInsertionService.inserted`** - Made private (was readonly)
- **`ContentStrategy.insertElement()`** - Now returns the inserted element

### Deprecations

- **`DomInsertionService.hasInserted()`** - Use `has()` instead

---

## v2.4.0

**February 2026**

### New Features

#### Standard DTO Classes

New DTO classes for consistent data transfer patterns across ABP applications:

**List/Paged Results:**

```tsx
import { ListResultDto, PagedResultDto } from '@abpjs/core';

// ListResultDto - for list responses
interface UserListResult extends ListResultDto<UserDto> {}

// PagedResultDto - for paginated responses with totalCount
interface UserPagedResult extends PagedResultDto<UserDto> {}
```

**Request DTOs:**

```tsx
import {
  LimitedResultRequestDto,
  PagedResultRequestDto,
  PagedAndSortedResultRequestDto,
} from '@abpjs/core';

// LimitedResultRequestDto - maxResultCount only
const limitedRequest = new LimitedResultRequestDto({ maxResultCount: 10 });

// PagedResultRequestDto - maxResultCount + skipCount
const pagedRequest = new PagedResultRequestDto({
  maxResultCount: 10,
  skipCount: 20
});

// PagedAndSortedResultRequestDto - includes sorting
const sortedRequest = new PagedAndSortedResultRequestDto({
  maxResultCount: 10,
  skipCount: 0,
  sorting: 'name asc',
});
```

**Entity DTOs with Audit Info:**

```tsx
import {
  EntityDto,
  CreationAuditedEntityDto,
  AuditedEntityDto,
  FullAuditedEntityDto,
} from '@abpjs/core';

// EntityDto<TKey> - basic entity with ID
interface MyEntity extends EntityDto<string> {
  name: string;
}

// CreationAuditedEntityDto - includes creationTime, creatorId
// AuditedEntityDto - adds lastModificationTime, lastModifierId
// FullAuditedEntityDto - adds isDeleted, deleterId, deletionTime

// With user references:
import {
  CreationAuditedEntityWithUserDto,
  AuditedEntityWithUserDto,
  FullAuditedEntityWithUserDto,
} from '@abpjs/core';
```

#### Loading Strategies

New strategy-based approach for loading external scripts and styles:

```tsx
import {
  LazyLoadService,
  LOADING_STRATEGY,
  DOM_STRATEGY,
  CROSS_ORIGIN_STRATEGY,
} from '@abpjs/core';

const lazyLoadService = new LazyLoadService();

// Load script using pre-configured strategy
await lazyLoadService.load(
  LOADING_STRATEGY.AppendAnonymousScriptToHead(
    'https://cdn.example.com/library.js',
    'sha384-...' // optional integrity hash
  )
);

// Load stylesheet
await lazyLoadService.load(
  LOADING_STRATEGY.AppendAnonymousStyleToHead(
    'https://cdn.example.com/styles.css'
  )
);

// Check if already loaded
if (!lazyLoadService.isLoaded('https://cdn.example.com/library.js')) {
  await lazyLoadService.load(/* ... */);
}
```

Available `LOADING_STRATEGY` presets:
- `AppendAnonymousScriptToBody(src, integrity?)`
- `AppendAnonymousScriptToHead(src, integrity?)`
- `AppendAnonymousStyleToHead(src, integrity?)`
- `PrependAnonymousScriptToHead(src, integrity?)`
- `PrependAnonymousStyleToHead(src, integrity?)`

#### Content Strategies

For inserting inline scripts and styles:

```tsx
import {
  DomInsertionService,
  getDomInsertionService,
  CONTENT_STRATEGY,
} from '@abpjs/core';

const domInsertionService = getDomInsertionService();

// Insert inline style
domInsertionService.insertContent(
  CONTENT_STRATEGY.AppendStyleToHead(`
    .my-class { color: red; }
  `)
);

// Insert inline script
domInsertionService.insertContent(
  CONTENT_STRATEGY.AppendScriptToHead(`
    console.log('Script loaded');
  `)
);

// Check if content was already inserted
if (!domInsertionService.hasInserted(myContent)) {
  domInsertionService.insertContent(/* ... */);
}
```

Available `CONTENT_STRATEGY` presets:
- `AppendScriptToBody(content)`
- `AppendScriptToHead(content)`
- `AppendStyleToHead(content)`
- `PrependStyleToHead(content)`

#### DOM Strategies

Low-level control over element insertion:

```tsx
import { DOM_STRATEGY, DomStrategy } from '@abpjs/core';

// Pre-configured strategies
DOM_STRATEGY.AppendToHead()    // Insert at end of <head>
DOM_STRATEGY.PrependToHead()   // Insert at start of <head>
DOM_STRATEGY.AppendToBody()    // Insert at end of <body>
DOM_STRATEGY.BeforeElement(el) // Insert before element
DOM_STRATEGY.AfterElement(el)  // Insert after element

// Custom strategy
const strategy = new DomStrategy(
  document.getElementById('container')!,
  'beforeend'
);
```

#### Cross-Origin Strategies

Configure CORS and integrity for loaded resources:

```tsx
import { CROSS_ORIGIN_STRATEGY } from '@abpjs/core';

// Anonymous CORS with SRI integrity
CROSS_ORIGIN_STRATEGY.Anonymous('sha384-...');

// Credentials CORS
CROSS_ORIGIN_STRATEGY.UseCredentials();
```

#### Content Security Strategies

Apply CSP nonces to dynamically inserted content:

```tsx
import { CONTENT_SECURITY_STRATEGY } from '@abpjs/core';

// Apply nonce for CSP compliance
CONTENT_SECURITY_STRATEGY.Loose('nonce-abc123');

// No CSP (default)
CONTENT_SECURITY_STRATEGY.None();
```

### API Changes

- **`Config.Environment.hmr`** - New optional boolean flag for Hot Module Replacement
- **`Config.ApiConfig`** - New interface type for API configuration (previously inline)
- **`Rest.Config.apiName`** - Specify which API to use for requests (from `Config.Apis`)

### New Utilities

```tsx
import {
  isUndefinedOrEmptyString,
  generateHash,
  fromLazyLoad,
  noop,
} from '@abpjs/core';

// Check for undefined or empty string
isUndefinedOrEmptyString(undefined); // true
isUndefinedOrEmptyString('');        // true
isUndefinedOrEmptyString('hello');   // false

// Generate hash from string
const hash = generateHash('my-string'); // number

// Load element with promise
const script = document.createElement('script');
script.src = 'https://example.com/lib.js';
await fromLazyLoad(script, DOM_STRATEGY.AppendToHead());

// No-op function
const doNothing = noop();
```

### Deprecations

- **`ABP.Root.requirements`** - Deprecated and now optional. Removed in v3.0.0.

---

## v2.2.0

**February 2026**

- Version alignment with @abp/ng.core

---

## v2.1.0

**February 2026**

### New Features

- **`ConfigStateService.dispatchSetEnvironment()`** - New dispatch method to set the environment configuration at runtime:
  ```tsx
  import { useAbp } from '@abpjs/core';

  function MyComponent() {
    const { configStateService } = useAbp();

    // Update environment configuration
    configStateService.dispatchSetEnvironment({
      production: true,
      application: { name: 'My App' },
      oAuthConfig: { /* ... */ },
      apis: { default: { url: 'https://api.example.com' } },
    });
  }
  ```

### API Changes

- **`toLocalISOString` made optional** - The `Date.prototype.toLocalISOString` method is now optional to match the Angular API. Use optional chaining when calling:
  ```tsx
  // Before (v2.0.0)
  const isoString = date.toLocalISOString();

  // After (v2.1.0) - use optional chaining for safety
  const isoString = date.toLocalISOString?.();
  ```

---

## v2.0.0

**January 2026**

### Breaking Changes

- **`eLayoutType.setting` removed** - This deprecated layout type has been removed. Use a custom layout instead.
- **`ConfigService` alias removed** - Use `ConfigStateService` directly. The deprecated alias has been removed.

### New Features

- **`configActions.addRoute`** - Dynamically add routes at runtime:
  ```tsx
  import { configActions } from '@abpjs/core';

  // Add at root level
  dispatch(configActions.addRoute({
    name: 'Dashboard',
    path: 'dashboard',
  }));

  // Add as child route
  dispatch(configActions.addRoute({
    name: 'Details',
    path: 'details',
    parentName: 'Users',
  }));
  ```

- **Session Detail Tracking** - New `SessionDetail` interface for multi-tab support:
  ```tsx
  const { sessionStateService } = useAbp();
  const detail = sessionStateService.getSessionDetail();
  // { openedTabCount, lastExitTime, remember }
  ```

- **New Session Actions**:
  - `sessionActions.setRemember(boolean)` - Set remember flag
  - `sessionActions.modifyOpenedTabCount('increase' | 'decrease')` - Track tabs
  - `sessionActions.setSessionDetail(Partial<SessionDetail>)` - Update session detail

- **`selectSessionDetail` selector** - Access session detail from Redux state

- **ReplaceableComponents model** - New type definitions for component replacement system

### Deprecation Updates

- **`selectCopy`** - Now scheduled for removal in v3.0.0 (was v2.0.0)

---

## v1.1.0

**January 2026**

### New Services

- **`ConfigStateService`** - Renamed from `ConfigService` to align with Angular ABP naming conventions:
  ```tsx
  import { ConfigStateService } from '@abpjs/core';

  // Access via useAbp hook
  const { configStateService } = useAbp();

  // Get application info
  const appInfo = configStateService.getApplicationInfo();

  // Find route by path, name, or url
  const route = configStateService.getRoute('/users', undefined, undefined);
  const routeByName = configStateService.getRoute(undefined, 'Users');
  const routeByUrl = configStateService.getRoute(undefined, undefined, '/admin/users');

  // Get settings with optional keyword filter
  const emailSettings = configStateService.getSettings('Email');

  // Get localized string with interpolation
  const greeting = configStateService.getLocalization(
    { key: 'HelloUser', defaultValue: 'Hello!' },
    'John'
  );
  ```

- **`SessionStateService`** - Access session state (language, tenant):
  ```tsx
  import { SessionStateService } from '@abpjs/core';

  const { sessionStateService } = useAbp();

  const language = sessionStateService.getLanguage();
  const tenant = sessionStateService.getTenant();
  ```

- **`ProfileStateService`** - Access profile state:
  ```tsx
  import { ProfileStateService } from '@abpjs/core';

  const { profileStateService } = useAbp();

  const profile = profileStateService.getProfile();
  ```

### LocalizationService Enhancements

The `LocalizationService` methods now accept `Config.LocalizationWithDefault` in addition to string keys:

```tsx
// String key (existing)
const text = localizationService.get('MyKey');

// Object with default value (new)
const textWithDefault = localizationService.get({
  key: 'MyKey',
  defaultValue: 'Fallback text'
});

// With interpolation
const greeting = localizationService.get('Hello {0}!', 'World');
```

Affected methods: `get()`, `instant()`, `t()`

### New Date Extension

`Date.prototype.toLocalISOString()` - Returns ISO string in local timezone (unlike `toISOString()` which returns UTC):

```tsx
const date = new Date();

// Standard - returns UTC
date.toISOString();      // "2026-01-31T13:15:00.000Z"

// New - returns local timezone
date.toLocalISOString(); // "2026-01-31T16:15:00.000+03:00"
```

### New Types

- **`Config.LocalizationParam`** - Union type for localization keys:
  ```tsx
  type LocalizationParam = string | LocalizationWithDefault;
  ```

### Deprecations

- **`ConfigService`** - Renamed to `ConfigStateService`. The old name is still exported as an alias but will be removed in v2.0.0.

---

## v1.0.0

**January 2026**

### Breaking Changes

- **`eLayoutType.setting` deprecated** - Use custom layout instead

### New Features

- **`LazyLoadService.load` accepts arrays** - Load multiple scripts/styles at once
- **`selectSettings` selector** - Get all settings with optional keyword filter
- **`selectLocalizationString` selector** - Localization with interpolation support
- **`addAbpRoutes` / `getAbpRoutes`** - Dynamic route registration API
- **`ABP.Dictionary<T>` type** - Generic key-value dictionary
- **`SortOrder` type** - `'asc' | 'desc'` for sorting
- **`Config.LocalizationWithDefault`** - Localization key with fallback value

### Deprecations

- **`eLayoutType.setting`** - Deprecated, use custom layout
- **`ApplicationConfiguration.Setting`** - Use `ApplicationConfiguration.Value`
- **`ApplicationConfiguration.Features`** - Use `ApplicationConfiguration.Value`
- **`selectCopy`** - Use `selectLocalizationString` instead (to be removed in v2)

---

## v0.9.0

**January 2026**

### Breaking Changes

- **`throwErr` renamed to `skipHandleError`** - Update `Rest.Config` usage

### New Features

- **`eLayoutType.setting`** - New layout type for settings pages
- **Application configuration** - `Config.Application` interface, `selectApplicationInfo` selector
- **Tenant session management** - `setTenant` action, `selectTenant` selector
- **`selectRoute` selector** - Find routes by path or name recursively
- **`LocalizationService.currentLang`** - Property to get current language
- **`ProfileService.changePassword`** - New `skipHandleError` parameter

---

## v0.8.0

**January 2026**

### New Features

- **Ellipsis component** - Truncate text with ellipsis and tooltip
- **useEllipsis hook** - Hook version for custom implementations
- **useLoader hook** - Track HTTP request loading state

### Bug Fixes

- Fixed localization handling when translation key is empty or null

---

## v0.7.6

**January 2026** - Initial Release

- Authentication with OAuth2/OIDC (`oidc-client-ts`)
- Configuration management
- Localization with dynamic resource loading
- Permission checking with `usePermission` hook
- REST service with Axios interceptors
- Session management
- Redux Toolkit integration
