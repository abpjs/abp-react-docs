---
sidebar_position: 1
---

# Overview

The `@abpjs/components` package provides reusable UI components for ABP React applications. This is the React equivalent of Angular's `@abp/ng.components` module.

[![npm version](https://img.shields.io/npm/v/@abpjs/components.svg)](https://www.npmjs.com/package/@abpjs/components)

## Installation

```bash
npm install @abpjs/components
# or
yarn add @abpjs/components
```

**Required peer dependencies:**
```bash
npm install react react-dom
```

## Features

- **Tree Component** - Hierarchical tree view with expand/collapse, checkboxes, drag-and-drop, and context menus
- **TreeAdapter** - Utility class for converting flat lists to tree structures
- **BaseNode** - Interface for tree node data

## Main Exports

### Components

| Component | Description |
|-----------|-------------|
| `Tree` | Hierarchical tree view component |

### Classes

| Class | Description |
|-------|-------------|
| `TreeAdapter` | Converts flat lists to tree structures |
| `TreeNode` | Tree node wrapper class |

### Interfaces

| Interface | Description |
|-----------|-------------|
| `BaseNode` | Base interface for tree node entities |
| `TreeNodeData` | Tree node data structure |
| `TreeProps` | Props for Tree component |
| `DropEvent` | Drop event data |
| `BeforeDropEvent` | Before drop event data |

### Utility Functions

| Function | Description |
|----------|-------------|
| `createTreeFromList()` | Creates tree from flat list |
| `createListFromTree()` | Flattens tree to list |
| `createMapFromList()` | Creates lookup map from list |
| `defaultNameResolver` | Default title resolver |

## Quick Start

### Basic Tree

```tsx
import { Tree, TreeAdapter, BaseNode } from '@abpjs/components';

interface Department extends BaseNode {
  id: string;
  parentId: string | null;
  name: string;
}

const departments: Department[] = [
  { id: '1', parentId: null, name: 'Engineering' },
  { id: '2', parentId: '1', name: 'Frontend' },
  { id: '3', parentId: '1', name: 'Backend' },
  { id: '4', parentId: null, name: 'Marketing' },
];

function DepartmentTree() {
  const adapter = new TreeAdapter(departments);

  return (
    <Tree
      nodes={adapter.getTree()}
      onSelectedNodeChange={(dept) => console.log('Selected:', dept.name)}
    />
  );
}
```

### Checkable Tree

```tsx
import { useState } from 'react';
import { Tree, TreeAdapter } from '@abpjs/components';

function CheckableTree() {
  const adapter = new TreeAdapter(items);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  return (
    <Tree
      nodes={adapter.getTree()}
      checkable
      checkedKeys={checkedKeys}
      onCheckedKeysChange={setCheckedKeys}
    />
  );
}
```

### Drag and Drop Tree

```tsx
import { Tree, TreeAdapter, DropEvent } from '@abpjs/components';

function DraggableTree() {
  const adapter = new TreeAdapter(items);

  const handleDrop = (event: DropEvent) => {
    adapter.handleDrop(event.node);
    // Update your state with new tree structure
  };

  return (
    <Tree
      nodes={adapter.getTree()}
      draggable
      onDrop={handleDrop}
      beforeDrop={({ dragNode, node }) => {
        // Prevent dropping on certain nodes
        return node.id !== 'root';
      }}
    />
  );
}
```

## See Also

- [Tree Component](./tree)
- [Release Notes](./release-notes)
