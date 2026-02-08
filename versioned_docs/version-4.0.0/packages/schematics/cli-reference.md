---
sidebar_position: 2
---

# CLI Reference

Complete reference for the `abpjs` CLI commands. For a quick introduction, see the [Overview](./overview).

## proxy-add

Generate proxy services for a backend module. Fetches the API definition from your running ABP backend, then generates service classes, React Query hooks, TypeScript interfaces, and enums.

```bash
abpjs proxy-add [module] [options]
```

### Arguments

| Argument | Required | Default | Description |
|----------|----------|---------|-------------|
| `module` | No | `app` | Backend module name to generate proxies for |

### Options

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| `--source <url>` | Yes | — | Backend API URL (e.g. `https://localhost:44300`) |
| `--target <path>` | Yes | — | Output directory for generated files |
| `--root-namespace <ns>` | Yes | — | Solution root namespace (e.g. `MyCompany.MyProject`) |
| `--api-name <name>` | No | `default` | Backend API name / remote service name |

### Examples

```bash
# Generate proxy for the default 'app' module
abpjs proxy-add \
  --source https://localhost:44300 \
  --target src/app \
  --root-namespace MyCompany.MyProject

# Generate proxy for a specific module
abpjs proxy-add identity \
  --source https://localhost:44300 \
  --target src/app \
  --root-namespace MyCompany.MyProject

# Specify a non-default API name
abpjs proxy-add app \
  --source https://localhost:44300 \
  --target src/app \
  --root-namespace MyCompany.MyProject \
  --api-name reporting
```

Running `proxy-add` multiple times with different module names adds each module to the generated list. Previously generated modules are preserved and regenerated alongside the new one.

---

## proxy-refresh

Regenerate proxy files for all modules that were previously generated. Reads the module list from `generate-proxy.json`, fetches a fresh API definition, and regenerates everything.

Use this after your backend API changes (new endpoints, updated DTOs, etc.).

```bash
abpjs proxy-refresh [options]
```

### Options

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| `--source <url>` | Yes | — | Backend API URL |
| `--target <path>` | Yes | — | Output directory containing generated files |
| `--root-namespace <ns>` | Yes | — | Solution root namespace |
| `--api-name <name>` | No | `default` | Backend API name / remote service name |

### Example

```bash
abpjs proxy-refresh \
  --source https://localhost:44300 \
  --target src/app \
  --root-namespace MyCompany.MyProject
```

:::note
Requires a prior `proxy-add` run. If no `generate-proxy.json` exists, the command will fail with an error.
:::

---

## proxy-remove

Remove a generated proxy module. Clears the module from the generated files and updates `generate-proxy.json`.

```bash
abpjs proxy-remove <module> [options]
```

### Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `module` | Yes | Module name to remove |

### Options

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| `--target <path>` | Yes | — | Output directory containing generated files |
| `--source <url>` | No | — | Backend API URL (needed to regenerate remaining modules) |
| `--root-namespace <ns>` | No | — | Solution root namespace (needed to regenerate remaining modules) |

### Examples

```bash
# Remove the identity module and regenerate remaining modules
abpjs proxy-remove identity \
  --target src/app \
  --source https://localhost:44300 \
  --root-namespace MyCompany.MyProject

# Remove without regenerating (just updates the config)
abpjs proxy-remove identity --target src/app
```

:::tip
If you provide `--source` and `--root-namespace`, the remaining modules are regenerated automatically. Without them, only the config is updated — run `proxy-refresh` afterwards to regenerate.
:::

---

## Generated Output

### Directory Structure

```
<target>/proxy/
├── README.md                          # Auto-generated warning
├── generate-proxy.json                # Lock file (do not edit)
├── index.ts                           # Root barrel export
└── <namespace>/                       # e.g. volo/abp/identity/
    ├── index.ts                       # Namespace barrel export
    ├── <name>.service.ts              # Service class
    ├── use-<name>-service.ts          # React Query hooks
    ├── models.ts                      # TypeScript interfaces
    └── <name>.enum.ts                 # Enums + options array
```

### Service Files

Each ABP controller becomes a service class. Methods map directly to API endpoints:

```tsx
import type { RestService } from '@abpjs/core';
import type { BookDto, CreateBookInput, PagedResultDto } from './models';

export class BookService {
  private restService: RestService;
  apiName = 'default';

  constructor(restService: RestService) {
    this.restService = restService;
  }

  getList = (params?: { skipCount?: number; maxResultCount?: number }): Promise<PagedResultDto<BookDto>> =>
    this.restService.request<undefined, PagedResultDto<BookDto>>({
      method: 'GET',
      url: `/api/app/books`,
      params: { skipCount, maxResultCount },
    });

  create = (input: CreateBookInput): Promise<BookDto> =>
    this.restService.request<CreateBookInput, BookDto>({
      method: 'POST',
      url: `/api/app/books`,
      body: input,
    });
}
```

### React Query Hooks

Each service gets a companion hook file. GET methods become `useQuery` hooks, and non-GET methods become `useMutation` hooks with automatic cache invalidation:

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useRestService } from '@abpjs/core';
import { BookService } from './book.service';

export const bookQueryKeys = {
  all: ['book'] as const,
  lists: () => [...bookQueryKeys.all, 'list'] as const,
  list: (params?: Record<string, unknown>) => [...bookQueryKeys.lists(), params] as const,
  details: () => [...bookQueryKeys.all, 'detail'] as const,
  detail: (...args: unknown[]) => [...bookQueryKeys.details(), ...args] as const,
};

export function useBookService() {
  const restService = useRestService();
  const service = useMemo(() => new BookService(restService), [restService]);
  const queryClient = useQueryClient();

  return {
    service,
    keys: bookQueryKeys,

    useGetList: (params?, options?) =>
      useQuery({
        queryKey: bookQueryKeys.list(params),
        queryFn: () => service.getList(params),
        ...options,
      }),

    useCreate: (options?) =>
      useMutation({
        mutationFn: (input: CreateBookInput) => service.create(input),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: bookQueryKeys.all });
        },
        ...options,
      }),
  };
}
```

**Key behaviors:**
- GET methods use query key types: `list` for methods with "List" or "All" in the name, `detail` for everything else
- All mutations invalidate the entire query key scope on success, so related queries automatically refetch
- You can override options by passing a second argument (e.g. `useGetList(params, { enabled: false })`)
- The `service` and `keys` are also exposed for advanced use cases

### Model Files

TypeScript interfaces matching your backend DTOs:

```tsx
import type { AuditedEntityDto } from '@abpjs/core';

export interface BookDto extends AuditedEntityDto {
  id: string;
  name: string;
  type: BookType;
  price: number;
  publishDate?: string;
}

export interface CreateBookInput {
  name: string;
  type: BookType;
  price: number;
  publishDate?: string;
}
```

### Enum Files

TypeScript enums with a pre-built options array for use in select dropdowns:

```tsx
import { mapEnumToOptions } from '@abpjs/core';

export enum BookType {
  Adventure = 0,
  Biography = 1,
  Dystopia = 2,
  Science = 3,
}

export const bookTypeOptions = mapEnumToOptions(BookType);
```

### Barrel Files

Auto-generated `index.ts` files at each directory level re-export everything for convenient imports:

```tsx
// proxy/index.ts
export * from './books';
export * from './authors';

// proxy/books/index.ts
export * from './book.service';
export * from './use-book-service';
export * from './models';
export * from './book-type.enum';
```

---

## Configuration: generate-proxy.json

This file is automatically created and maintained by the CLI. It tracks:

- The full API definition fetched from the backend
- Which modules have been generated (the `generated` array)

```json
{
  "modules": { ... },
  "types": { ... },
  "generated": ["app", "identity"]
}
```

:::warning
Do not manually edit `generate-proxy.json`. It is used by `proxy-refresh` and `proxy-remove` to track what was generated. Commit it to source control so team members can run `proxy-refresh`.
:::

---

## Workflow Tips

### Add to package.json scripts

```json
{
  "scripts": {
    "proxy:add": "abpjs proxy-add app --source https://localhost:44300 --target src/app --root-namespace MyCompany.MyProject",
    "proxy:refresh": "abpjs proxy-refresh --source https://localhost:44300 --target src/app --root-namespace MyCompany.MyProject"
  }
}
```

### Multi-module applications

Run `proxy-add` once per module. Each module is added to the generated list:

```bash
abpjs proxy-add app --source ... --target ... --root-namespace ...
abpjs proxy-add identity --source ... --target ... --root-namespace ...
abpjs proxy-add saas --source ... --target ... --root-namespace ...
```

After the initial setup, use `proxy-refresh` to update all modules at once.

### After backend API changes

Run `proxy-refresh` instead of `proxy-add` to regenerate all previously generated modules with the latest API definition:

```bash
abpjs proxy-refresh \
  --source https://localhost:44300 \
  --target src/app \
  --root-namespace MyCompany.MyProject
```

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `[API Not Available]` | Backend is not running or URL is incorrect | Verify the backend is running and the `--source` URL is correct |
| `[Invalid Module]` | Module name doesn't exist in the API definition | Check available modules in the API definition at `<source>/api/abp/api-definition` |
| `No existing proxy configuration found` | Running `proxy-refresh` or `proxy-remove` without a prior `proxy-add` | Run `proxy-add` first to generate the initial proxy files |

## See Also

- [Overview](./overview) - Getting started and usage examples
- [REST Service](../core/rest-service) - The underlying HTTP client used by generated services
- [Release Notes](./release-notes)
