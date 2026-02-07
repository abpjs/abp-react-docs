---
sidebar_position: 99
---

# Release Notes

## v3.1.0 (Initial Release)

**February 2026**

Initial release of the components package, providing reusable UI components for ABP React applications.

### Features

#### Tree Component

A hierarchical tree view component with:

- **Expandable/Collapsible Nodes** - Click to expand or collapse tree nodes
- **Checkable Nodes** - Optional checkboxes for node selection
- **Drag and Drop** - Rearrange nodes by dragging
- **Context Menus** - Right-click menus for node actions
- **Selection** - Single node selection with callbacks
- **Controlled Mode** - Control expanded/checked state externally

```tsx
import { Tree, TreeAdapter, BaseNode } from '@abpjs/components';

interface Category extends BaseNode {
  id: string;
  parentId: string | null;
  name: string;
}

const categories: Category[] = [
  { id: '1', parentId: null, name: 'Electronics' },
  { id: '2', parentId: '1', name: 'Phones' },
  { id: '3', parentId: '1', name: 'Laptops' },
];

function CategoryTree() {
  const adapter = new TreeAdapter(categories);
  const [checked, setChecked] = useState<string[]>([]);

  return (
    <Tree
      nodes={adapter.getTree()}
      checkable
      draggable
      checkedKeys={checked}
      onCheckedKeysChange={setChecked}
      onSelectedNodeChange={(cat) => console.log(cat.name)}
    />
  );
}
```

#### TreeAdapter Utility

A utility class for converting between flat lists and tree structures:

```tsx
import { TreeAdapter } from '@abpjs/components';

const adapter = new TreeAdapter(flatList);

// Get tree structure
const tree = adapter.getTree();

// Manipulate tree
adapter.addNode(newNode);
adapter.updateNode(updatedNode);
adapter.handleDrop(droppedNode);
adapter.handleRemove(nodeToRemove);

// Find nodes
const node = adapter.findNode('node-id');

// Manage state
adapter.setExpandedKeys(['1', '2']);
adapter.setCheckedKeys(['3']);
const expanded = adapter.getExpandedKeys();
const checked = adapter.getCheckedKeys();
```

#### Utility Functions

Standalone functions for tree operations:

```tsx
import {
  createTreeFromList,
  createListFromTree,
  createMapFromList,
  defaultNameResolver,
} from '@abpjs/components';

// Convert flat list to tree
const tree = createTreeFromList(flatList);

// Convert tree back to flat list
const list = createListFromTree(tree);

// Create lookup map
const map = createMapFromList(flatList);
```

### New Exports

**Components:**
- `Tree` - Hierarchical tree view component

**Classes:**
- `TreeAdapter` - Converts between flat lists and tree structures
- `TreeNode` - Tree node wrapper class

**Interfaces:**
- `BaseNode` - Base interface for tree node entities
- `TreeNodeData` - Tree node data structure
- `TreeProps` - Props for Tree component
- `DropEvent` - Drop event data
- `BeforeDropEvent` - Before drop validation event

**Types:**
- `NameResolver<T>` - Custom name resolver function type

**Functions:**
- `createTreeFromList()` - Creates tree from flat list
- `createListFromTree()` - Flattens tree to list
- `createMapFromList()` - Creates node lookup map
- `defaultNameResolver` - Default title resolver (uses displayName or name)
