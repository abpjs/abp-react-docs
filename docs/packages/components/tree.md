---
sidebar_position: 2
---

# Tree Component

The Tree component provides a hierarchical tree view with support for expand/collapse, checkboxes, drag-and-drop, and context menus.

## Installation

```bash
npm install @abpjs/components
```

## Basic Usage

```tsx
import { Tree, TreeAdapter, BaseNode } from '@abpjs/components';

interface OrgUnit extends BaseNode {
  id: string;
  parentId: string | null;
  displayName: string;
}

const units: OrgUnit[] = [
  { id: '1', parentId: null, displayName: 'Company' },
  { id: '2', parentId: '1', displayName: 'Engineering' },
  { id: '3', parentId: '2', displayName: 'Frontend Team' },
  { id: '4', parentId: '2', displayName: 'Backend Team' },
  { id: '5', parentId: '1', displayName: 'Marketing' },
];

function OrgUnitTree() {
  const adapter = new TreeAdapter(units);

  return (
    <Tree
      nodes={adapter.getTree()}
      onSelectedNodeChange={(unit) => console.log('Selected:', unit.displayName)}
    />
  );
}
```

## BaseNode Interface

All tree node entities must implement the `BaseNode` interface:

```tsx
interface BaseNode {
  /** Unique identifier for the node */
  id: string;
  /** Parent node's id, null for root nodes */
  parentId: string | null;
  /** Optional name for the node */
  name?: string;
  /** Optional display name (takes precedence over name) */
  displayName?: string;
}
```

## TreeAdapter

The `TreeAdapter` class converts flat lists to tree structures and provides tree manipulation methods:

```tsx
import { TreeAdapter, BaseNode } from '@abpjs/components';

const adapter = new TreeAdapter(flatList);

// Get the tree structure
const tree = adapter.getTree();

// Get the flat list
const list = adapter.getList();

// Find a node by key
const node = adapter.findNode('node-id');

// Add a new node
adapter.addNode({ id: '6', parentId: '2', name: 'New Team' });

// Update a node
adapter.updateNode({ id: '6', parentId: '2', name: 'Updated Team' });

// Handle drop (updates parent relationships)
adapter.handleDrop(droppedNode);

// Handle remove (removes node and descendants)
adapter.handleRemove(nodeToRemove);

// Get/set expanded keys
const expanded = adapter.getExpandedKeys();
adapter.setExpandedKeys(['1', '2']);

// Get/set checked keys
const checked = adapter.getCheckedKeys();
adapter.setCheckedKeys(['3', '4']);
```

### Custom Name Resolver

By default, `TreeAdapter` uses `displayName` or `name` for the node title. You can provide a custom resolver:

```tsx
const adapter = new TreeAdapter(
  items,
  (entity) => `${entity.code} - ${entity.name}`
);
```

## Tree Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `nodes` | `TreeNodeData[]` | `[]` | Tree nodes data |
| `checkedKeys` | `string[]` | `[]` | Keys of checked nodes |
| `expandedKeys` | `string[]` | `[]` | Keys of expanded nodes |
| `selectedNode` | `T` | - | Currently selected node entity |
| `checkable` | `boolean` | `false` | Whether nodes have checkboxes |
| `draggable` | `boolean` | `false` | Whether nodes are draggable |
| `checkStrictly` | `boolean` | `false` | Check strictly (parent/children not associated) |
| `isNodeSelected` | `(node) => boolean` | - | Custom selection check |
| `beforeDrop` | `(event) => boolean` | - | Called before drop to allow/prevent |
| `menu` | `(node) => ReactNode` | - | Context menu render function |
| `onCheckedKeysChange` | `(keys) => void` | - | Called when checked keys change |
| `onExpandedKeysChange` | `(keys) => void` | - | Called when expanded keys change |
| `onSelectedNodeChange` | `(entity) => void` | - | Called when selection changes |
| `onDrop` | `(event) => void` | - | Called when a node is dropped |
| `className` | `string` | - | Custom class name |
| `style` | `CSSProperties` | - | Custom styles |

## Checkable Tree

Enable checkboxes with the `checkable` prop:

```tsx
import { useState } from 'react';
import { Tree, TreeAdapter } from '@abpjs/components';

function PermissionTree() {
  const adapter = new TreeAdapter(permissions);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  const handleSave = () => {
    console.log('Selected permissions:', checkedKeys);
  };

  return (
    <>
      <Tree
        nodes={adapter.getTree()}
        checkable
        checkedKeys={checkedKeys}
        onCheckedKeysChange={setCheckedKeys}
      />
      <button onClick={handleSave}>Save Permissions</button>
    </>
  );
}
```

### Check Strictly Mode

By default, checking a parent affects children. Use `checkStrictly` to disable this:

```tsx
<Tree
  nodes={nodes}
  checkable
  checkStrictly
  checkedKeys={checkedKeys}
  onCheckedKeysChange={setCheckedKeys}
/>
```

## Drag and Drop

Enable drag and drop with the `draggable` prop:

```tsx
import { Tree, TreeAdapter, DropEvent } from '@abpjs/components';

function DraggableOrgTree() {
  const [items, setItems] = useState(initialItems);
  const adapter = new TreeAdapter(items);

  const handleDrop = (event: DropEvent) => {
    // Update the node's parent
    adapter.handleDrop(event.node);

    // Get the updated list
    setItems([...adapter.getList()]);
  };

  return (
    <Tree
      nodes={adapter.getTree()}
      draggable
      onDrop={handleDrop}
    />
  );
}
```

### Prevent Drop

Use `beforeDrop` to conditionally allow/prevent drops:

```tsx
<Tree
  nodes={nodes}
  draggable
  beforeDrop={({ dragNode, node, pos }) => {
    // Prevent dropping on root
    if (node.parentId === null && pos === 0) {
      return false;
    }
    // Prevent dropping on disabled nodes
    if (node.disabled) {
      return false;
    }
    return true;
  }}
  onDrop={handleDrop}
/>
```

## Context Menu

Add context menus with the `menu` prop:

```tsx
<Tree
  nodes={nodes}
  menu={(node) => (
    <div className="context-menu">
      <button onClick={() => handleEdit(node.entity)}>Edit</button>
      <button onClick={() => handleDelete(node.entity)}>Delete</button>
      <button onClick={() => handleAddChild(node.entity)}>Add Child</button>
    </div>
  )}
/>
```

## Controlled Expansion

Control which nodes are expanded:

```tsx
function ControlledTree() {
  const adapter = new TreeAdapter(items);
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['1']);

  const expandAll = () => {
    const allKeys = items.map(item => item.id);
    setExpandedKeys(allKeys);
  };

  const collapseAll = () => {
    setExpandedKeys([]);
  };

  return (
    <>
      <button onClick={expandAll}>Expand All</button>
      <button onClick={collapseAll}>Collapse All</button>
      <Tree
        nodes={adapter.getTree()}
        expandedKeys={expandedKeys}
        onExpandedKeysChange={setExpandedKeys}
      />
    </>
  );
}
```

## Utility Functions

### createTreeFromList

Convert a flat list to a tree structure:

```tsx
import { createTreeFromList, BaseNode } from '@abpjs/components';

const flatList: BaseNode[] = [
  { id: '1', parentId: null, name: 'Root' },
  { id: '2', parentId: '1', name: 'Child' },
];

const tree = createTreeFromList(flatList);
```

### createListFromTree

Flatten a tree back to a list:

```tsx
import { createListFromTree } from '@abpjs/components';

const flatList = createListFromTree(tree);
```

### createMapFromList

Create a lookup map for efficient node access:

```tsx
import { createMapFromList } from '@abpjs/components';

const map = createMapFromList(flatList);
const node = map.get('node-id');
```

## TreeNodeData Interface

The tree node wrapper structure:

```tsx
interface TreeNodeData<T extends BaseNode> {
  entity: T;           // Original entity
  key: string;         // Unique key (same as id)
  title: string;       // Display title
  icon: string | null; // Optional icon
  children: TreeNodeData<T>[];
  isLeaf: boolean;
  checked: boolean;
  selected: boolean;
  expanded: boolean;
  selectable: boolean;
  disabled: boolean;
  disableCheckbox: boolean;
  parentNode?: TreeNodeData<T>;
  id: string;
  parentId: string | null;
}
```
