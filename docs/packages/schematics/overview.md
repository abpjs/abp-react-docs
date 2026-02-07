---
sidebar_position: 1
---

# Overview

The `@abpjs/schematics` package is a CLI tool that generates fully-typed proxy services, React Query hooks, TypeScript interfaces, and enums from your running ABP backend.

[![npm version](https://img.shields.io/npm/v/@abpjs/schematics.svg)](https://www.npmjs.com/package/@abpjs/schematics)

## Installation

```bash
# Install globally
npm install -g @abpjs/schematics

# Or run directly with npx (no install needed)
npx @abpjs/schematics <command>

# Or add as a dev dependency
npm install -D @abpjs/schematics
```

## Prerequisites

- A running ABP backend that exposes the `/api/abp/api-definition` endpoint
- `@abpjs/core` installed in your React project (generated services use `RestService`)
- `@tanstack/react-query` installed (generated hooks use `useQuery` / `useMutation`)

## Quick Start

**1. Start your ABP backend** (e.g. at `https://localhost:44300`)

**2. Run the CLI:**

```bash
abpjs proxy-add app \
  --source https://localhost:44300 \
  --target src/app \
  --root-namespace MyCompany.MyProject
```

**3. Use the generated hooks in your components:**

```tsx
import { useBookService } from './proxy';

function BookList() {
  const { useGetList } = useBookService();
  const { data, isLoading } = useGetList({ maxResultCount: 10 });

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.items?.map((book) => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  );
}
```

## What Gets Generated

Running `proxy-add` creates a `proxy/` directory inside your target path:

```
src/app/proxy/
├── README.md                       # Warning: auto-generated, do not edit
├── generate-proxy.json             # Lock file tracking generated modules
├── index.ts                        # Barrel export
└── <namespace>/
    ├── index.ts                    # Barrel export
    ├── <name>.service.ts           # Service class wrapping RestService
    ├── use-<name>-service.ts       # React Query hooks (useQuery / useMutation)
    ├── models.ts                   # TypeScript interfaces for DTOs
    └── <name>.enum.ts              # Enums with mapEnumToOptions helper
```

| File | Description |
|------|-------------|
| `*.service.ts` | Typed service class with methods for each API endpoint, using `RestService` from `@abpjs/core` |
| `use-*-service.ts` | React Query hooks — `useQuery` for GET endpoints, `useMutation` for POST/PUT/DELETE with automatic cache invalidation |
| `models.ts` | TypeScript interfaces matching your backend DTOs |
| `*.enum.ts` | TypeScript enums plus a ready-to-use options array for dropdowns |
| `index.ts` | Barrel files that re-export everything for convenient imports |
| `generate-proxy.json` | Lock file that tracks which modules have been generated — do not edit manually |

## Commands

| Command | Description |
|---------|-------------|
| `abpjs proxy-add [module]` | Generate proxy for a backend module |
| `abpjs proxy-refresh` | Regenerate all previously generated modules |
| `abpjs proxy-remove <module>` | Remove a generated module |

See [CLI Reference](./cli-reference) for full command documentation with all options.

## Using Generated Code

### Reading Data

GET endpoints are wrapped in `useQuery` hooks with automatic query key management:

```tsx
import { useBookService } from '../proxy';

function BookList() {
  const { useGetList } = useBookService();
  const { data, isLoading, error } = useGetList({
    skipCount: 0,
    maxResultCount: 10,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading books</div>;

  return (
    <table>
      <thead>
        <tr><th>Name</th><th>Type</th><th>Price</th></tr>
      </thead>
      <tbody>
        {data?.items?.map((book) => (
          <tr key={book.id}>
            <td>{book.name}</td>
            <td>{book.type}</td>
            <td>{book.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Mutating Data

POST, PUT, and DELETE endpoints are wrapped in `useMutation` hooks. Mutations automatically invalidate related queries so your lists refresh:

```tsx
import { useBookService } from '../proxy';
import type { CreateBookInput } from '../proxy';

function CreateBookForm() {
  const { useCreate } = useBookService();
  const createMutation = useCreate();

  const handleSubmit = (formData: CreateBookInput) => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        // The book list auto-refreshes thanks to query invalidation
        alert('Book created!');
      },
    });
  };

  return (
    <form onSubmit={() => handleSubmit({ name: 'New Book', price: 19.99 })}>
      <button type="submit" disabled={createMutation.isPending}>
        Create Book
      </button>
    </form>
  );
}
```

### Working with Enums

Generated enums include a ready-to-use options array for select dropdowns:

```tsx
import { BookType, bookTypeOptions } from '../proxy';

function BookTypeSelect() {
  return (
    <select>
      {bookTypeOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.key}
        </option>
      ))}
    </select>
  );
}
```

## See Also

- [CLI Reference](./cli-reference) - Full command documentation and options
- [REST Service](../core/rest-service) - The underlying HTTP client used by generated services
- [Release Notes](./release-notes)
