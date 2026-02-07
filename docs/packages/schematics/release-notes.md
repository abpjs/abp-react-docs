---
sidebar_position: 99
---

# Release Notes

## v4.0.0

**February 2026**

### New Features

#### `PropertyDef.isRequired` Field

The `PropertyDef` interface now includes an `isRequired` boolean field, allowing generated code to distinguish between required and optional properties:

```tsx
import type { PropertyDef } from '@abpjs/schematics';

const property: PropertyDef = {
  name: 'userName',
  type: 'System.String',
  typeSimple: 'string',
  isRequired: true, // New in v4.0.0
};
```

This field is populated from the ABP API definition and is used by the code generation engine to produce accurate TypeScript interfaces with correct optional markers.

---

## v3.2.0

**February 2026**

### New Features

#### CLI Proxy Generation

The package now includes a full CLI tool (`abpjs`) for generating typed proxy code from a running ABP backend. See [Overview](./overview) and [CLI Reference](./cli-reference) for full documentation.

- `proxy-add` — Generate proxy services, hooks, models, and enums for a backend module
- `proxy-refresh` — Regenerate all previously generated modules after backend changes
- `proxy-remove` — Remove a generated module

#### React Query Hook Generation

Each generated service now comes with a companion React Query hook file:

- GET endpoints become `useQuery` hooks with automatic query key management
- POST/PUT/DELETE endpoints become `useMutation` hooks with automatic cache invalidation
- Query key factory pattern for fine-grained cache control

#### EJS Template Engine

Code generation is powered by EJS templates for services, hooks, models, and enums. Generated code uses `RestService` and `useRestService` from `@abpjs/core`.

#### Utility Functions

New utility modules for text transforms (`camel`, `pascal`, `kebab`), barrel file generation, .NET-to-TypeScript type mapping, namespace resolution, and import tracking.

### Changes

#### Updated PROXY_WARNING Message

The `PROXY_WARNING` constant now includes an important notice about npm module publishing:

```tsx
import { PROXY_WARNING } from '@abpjs/schematics';

// The warning now includes guidance for publishing modules to npm:
// > **Important Notice:** If you are building a module and are planning to publish to npm,
// > some of the generated proxies are likely to be exported from public-api.ts file. In such a case,
// > please make sure you export files directly and not from barrel exports. In other words,
// > do not include index.ts exports in your public-api.ts exports.
```

This helps developers avoid common issues when publishing ABP modules with generated proxies to npm.

---

## v3.1.0 (Initial Release)

**February 2026**

Initial release of the schematics package, providing types and utilities for code generation in ABP React applications.

### Features

#### API Definition Types

Types for parsing ABP's API definition structure:

```tsx
import type {
  ApiDefinition,
  Module,
  Controller,
  Action,
  Type,
  PropertyDef,
  ParameterInSignature,
  ParameterInBody,
  TypeDef,
  TypeWithEnum,
  InterfaceDef,
} from '@abpjs/schematics';
```

- `ApiDefinition` - Root structure with modules and types
- `Module` - Module with root path, remote service name, and controllers
- `Controller` - Controller with actions and interfaces
- `Action` - API endpoint with HTTP method, URL, parameters, and return type
- `Type` - Type definition including enums, base types, and properties

#### Code Generation Models

Classes for representing generated code:

```tsx
import {
  Service,
  Method,
  Signature,
  Body,
  Model,
  Interface,
  Property,
  Import,
} from '@abpjs/schematics';

// Create a service with methods
const service = new Service({
  name: 'ProductService',
  namespace: 'MyApp.Products',
  apiName: 'default',
});

// Create an interface model
const model = new Model({
  namespace: 'MyApp.Products',
  path: '/proxy/products',
});

const productInterface = new Interface({
  identifier: 'ProductDto',
  namespace: 'MyApp.Products',
  ref: 'MyApp.Products.ProductDto',
  base: null,
});
```

#### Enums

Enums for code generation:

```tsx
import {
  eBindingSourceId,
  eMethodModifier,
  eImportKeyword,
} from '@abpjs/schematics';

// Parameter binding sources
eBindingSourceId.Body    // Request body
eBindingSourceId.Path    // URL path parameter
eBindingSourceId.Query   // Query string parameter
eBindingSourceId.Model   // Model binding

// Method modifiers
eMethodModifier.Public
eMethodModifier.Private
eMethodModifier.Protected

// Import keywords
eImportKeyword.Type
eImportKeyword.Interface
```

#### Constants

Pre-defined constants for proxy generation:

```tsx
import {
  PROXY_PATH,
  PROXY_CONFIG_PATH,
  PROXY_WARNING_PATH,
  PROXY_WARNING,
  SYSTEM_TYPES,
  Exception,
  API_DEFINITION_ENDPOINT,
  VOLO_REGEX,
  VOLO_PACKAGES,
} from '@abpjs/schematics';

// Paths
PROXY_PATH           // '/proxy'
PROXY_CONFIG_PATH    // '/proxy/generate-proxy.json'
PROXY_WARNING_PATH   // '/proxy/README.md'

// .NET to TypeScript type mapping
SYSTEM_TYPES.get('Int32');   // 'number'
SYSTEM_TYPES.get('String');  // 'string'
SYSTEM_TYPES.get('Guid');    // 'string'
SYSTEM_TYPES.get('Bool');    // 'boolean'
SYSTEM_TYPES.get('DateTime'); // 'string'
```

#### Configuration Schema

Schema for proxy generation configuration:

```tsx
import type { GenerateProxySchema, ProxyConfig, Project } from '@abpjs/schematics';

const schema: GenerateProxySchema = {
  module: 'MyModule',
  'api-name': 'default',
  source: 'my-app',
  target: 'my-app',
};
```

#### Exception Messages

Standardized error messages with placeholders:

```tsx
import { Exception } from '@abpjs/schematics';

Exception.InvalidModule      // '[Invalid Module] Backend module "{0}" does not exist...'
Exception.NoApi              // '[API Not Available] Please double-check the URL...'
Exception.NoProject          // '[Project Not Found] Either define a default project...'
Exception.FileNotFound       // '[File Not Found] There is no file at "{0}" path.'
Exception.InvalidWorkspace   // '[Invalid Workspace] The angular.json should be...'
```

### New Exports

**Types:**
- `ApiDefinition`, `Module`, `Controller`, `Action`
- `Type`, `PropertyDef`, `TypeDef`, `TypeWithEnum`, `InterfaceDef`
- `ParameterInSignature`, `ParameterInBody`
- `GenerateProxySchema`, `ProxyConfig`, `Project`
- `Tree` (virtual file system interface)

**Classes:**
- `Service`, `ServiceOptions`, `ServiceGeneratorParams`
- `Method`, `MethodOptions`
- `Signature`, `SignatureOptions`
- `Body`, `BodyOptions`
- `Model`, `ModelOptions`
- `Interface`, `InterfaceOptions`
- `Property`, `PropertyOptions`
- `Import`, `ImportOptions`

**Enums:**
- `eBindingSourceId` - Body, Model, Path, Query
- `eMethodModifier` - Public, Private, Protected
- `eImportKeyword` - Type, Interface

**Constants:**
- `PROXY_PATH`, `PROXY_CONFIG_PATH`, `PROXY_WARNING_PATH`, `PROXY_WARNING`
- `SYSTEM_TYPES` - Map of .NET to TypeScript types
- `Exception` - Error message templates
- `API_DEFINITION_ENDPOINT`
- `VOLO_REGEX`, `VOLO_PACKAGES`

**Utilities:**
- `Omissible<T, K>` - Type utility for optional properties
