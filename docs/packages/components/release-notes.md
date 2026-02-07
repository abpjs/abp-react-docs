---
sidebar_position: 99
---

# Release Notes

## v3.2.0

**February 2026**

### New Features

#### Custom Node Templates

The Tree component now supports custom templates for node rendering and expand/collapse icons:

```tsx
import { Tree, TreeNodeTemplateContext, ExpandedIconTemplateContext } from '@abpjs/components';

function CustomTree({ nodes }) {
  // Custom node rendering
  const customNodeTemplate = (context: TreeNodeTemplateContext) => {
    const { node, title, isLeaf, isExpanded } = context;
    return (
      <div className="custom-node">
        <span className="node-icon">{isLeaf ? '📄' : '📁'}</span>
        <span className="node-title">{title}</span>
        {node.data.badge && <span className="badge">{node.data.badge}</span>}
      </div>
    );
  };

  // Custom expand/collapse icon
  const expandedIconTemplate = (context: ExpandedIconTemplateContext) => {
    const { isExpanded } = context;
    return isExpanded ? <ChevronDown /> : <ChevronRight />;
  };

  return (
    <Tree
      nodes={nodes}
      customNodeTemplate={customNodeTemplate}
      expandedIconTemplate={expandedIconTemplate}
    />
  );
}
```

**TreeNodeTemplateContext Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `node` | `TreeNode` | The tree node instance |
| `title` | `string` | Resolved node title |
| `isLeaf` | `boolean` | Whether node has no children |
| `isExpanded` | `boolean` | Whether node is expanded |

**ExpandedIconTemplateContext Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `isExpanded` | `boolean` | Whether node is expanded |

#### TreeAdapter Update Methods

New methods for updating tree nodes and refreshing from data:

```tsx
import { TreeAdapter } from '@abpjs/components';

const adapter = new TreeAdapter(initialList);

// Update a specific node's children
adapter.handleUpdate({
  key: 'parent-node-id',
  children: updatedChildNodes,
});

// Refresh entire tree from updated list
adapter.updateTreeFromList(newFlatList);
```

### Changes

#### TreeAdapter Method Signatures

The `handleDrop` and `handleRemove` methods now use destructured parameters for consistency:

```tsx
// Updated signature
adapter.handleDrop({ node, dragNode, dropPosition });
adapter.handleRemove({ node });
```

### New Exports

**Types:**
- `TreeNodeTemplateContext` - Context for custom node template rendering
- `ExpandedIconTemplateContext` - Context for custom expand icon template

**Tree Props:**
- `customNodeTemplate` - Render prop for custom node content
- `expandedIconTemplate` - Render prop for custom expand/collapse icons

**TreeAdapter Methods:**
- `handleUpdate({ key, children })` - Update a node's children
- `updateTreeFromList(list)` - Refresh tree from updated flat list

---

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
