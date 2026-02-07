---
sidebar_position: 1
---

# Overview

The `@abpjs/schematics` package provides types, interfaces, and utilities for code generation in ABP React applications. This is the React equivalent of Angular's `@abp/ng.schematics` module.

[![npm version](https://img.shields.io/npm/v/@abpjs/schematics.svg)](https://www.npmjs.com/package/@abpjs/schematics)

## Installation

```bash
npm install @abpjs/schematics
# or
yarn add @abpjs/schematics
```

## Purpose

This package provides the foundational types and utilities needed for:

- **API Proxy Generation** - Types for ABP API definition parsing
- **Code Generation** - Models for generating services, methods, and interfaces
- **Type Mapping** - .NET to TypeScript type conversion

## Main Exports

### API Definition Types

| Type | Description |
|------|-------------|
| `ApiDefinition` | Root API definition with modules and types |
| `Module` | Module definition with controllers |
| `Controller` | Controller with actions |
| `Action` | API endpoint definition |
| `Type` | Type definition (classes, enums) |
| `PropertyDef` | Property within a type |
| `ParameterInSignature` | Method signature parameter |
| `ParameterInBody` | HTTP request body parameter |

### Code Generation Models

| Class | Description |
|-------|-------------|
| `Service` | Generated service representation |
| `Method` | Method with signature and body |
| `Signature` | Method signature definition |
| `Body` | Method body with HTTP details |
| `Model` | Model file containing interfaces |
| `Interface` | TypeScript interface definition |
| `Property` | Property within an interface |
| `Import` | Import statement |

### Enums

| Enum | Description |
|------|-------------|
| `eBindingSourceId` | Parameter binding source (Body, Path, Query, Model) |
| `eMethodModifier` | Method visibility (Public, Private, etc.) |
| `eImportKeyword` | Import keywords (type, interface) |

### Constants

| Constant | Description |
|----------|-------------|
| `PROXY_PATH` | Default path for generated proxy files |
| `PROXY_CONFIG_PATH` | Path to proxy configuration JSON |
| `PROXY_WARNING` | Warning message for generated directory |
| `SYSTEM_TYPES` | Map of .NET types to TypeScript types |
| `Exception` | Standard error message templates |

### Configuration

| Type | Description |
|------|-------------|
| `GenerateProxySchema` | Schema for proxy generation options |
| `ProxyConfig` | Proxy configuration interface |
| `Project` | Project definition for generation |

## Usage Examples

### Working with API Definitions

```tsx
import type { ApiDefinition, Module, Controller, Action } from '@abpjs/schematics';

function processApiDefinition(apiDef: ApiDefinition) {
  // Iterate over modules
  for (const [moduleName, module] of Object.entries(apiDef.modules)) {
    console.log(`Module: ${moduleName}`);

    // Iterate over controllers
    for (const [controllerName, controller] of Object.entries(module.controllers)) {
      console.log(`  Controller: ${controller.controllerName}`);

      // Iterate over actions
      for (const [actionName, action] of Object.entries(controller.actions)) {
        console.log(`    Action: ${action.name} (${action.httpMethod} ${action.url})`);
      }
    }
  }
}
```

### Creating Service Models

```tsx
import { Service, Method, Signature, Body } from '@abpjs/schematics';
import { eMethodModifier } from '@abpjs/schematics';

// Create a service
const service = new Service({
  name: 'UserService',
  namespace: 'MyApp.Users',
  apiName: 'default',
});

// Create a method signature
const signature = new Signature({
  name: 'getUsers',
  modifier: eMethodModifier.Public,
  returnType: 'Promise<UserDto[]>',
});

// Create a method body
const body = new Body({
  method: 'GET',
  url: '/api/users',
  responseType: 'UserDto[]',
});

// Create the complete method
const method = new Method({ signature, body });
service.methods.push(method);
```

### Type Mapping

```tsx
import { SYSTEM_TYPES } from '@abpjs/schematics';

// Convert .NET type to TypeScript
function convertType(dotnetType: string): string {
  return SYSTEM_TYPES.get(dotnetType) ?? 'unknown';
}

console.log(convertType('Int32'));  // 'number'
console.log(convertType('String')); // 'string'
console.log(convertType('Guid'));   // 'string'
console.log(convertType('Bool'));   // 'boolean'
```

### Parameter Binding

```tsx
import { eBindingSourceId } from '@abpjs/schematics';
import type { ParameterInBody } from '@abpjs/schematics';

function describeParameter(param: ParameterInBody): string {
  switch (param.bindingSourceId) {
    case eBindingSourceId.Body:
      return `${param.name} comes from request body`;
    case eBindingSourceId.Path:
      return `${param.name} comes from URL path`;
    case eBindingSourceId.Query:
      return `${param.name} comes from query string`;
    case eBindingSourceId.Model:
      return `${param.name} comes from model binding`;
    default:
      return `${param.name} has unknown source`;
  }
}
```

### Handling Errors

```tsx
import { Exception } from '@abpjs/schematics';

function handleProxyError(error: string, moduleName: string) {
  // Exception messages use {0}, {1} placeholders
  const message = Exception.InvalidModule.replace('{0}', moduleName);
  console.error(message);
  // Output: [Invalid Module] Backend module "MyModule" does not exist in API definition.
}
```

## See Also

- [Release Notes](./release-notes)
