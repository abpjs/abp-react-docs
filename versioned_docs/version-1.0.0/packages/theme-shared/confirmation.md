---
sidebar_position: 3
---

# Confirmation

The `useConfirmation` hook provides promise-based confirmation dialogs.

## Basic Usage

```tsx
import { useConfirmation, Toaster } from '@abpjs/theme-shared';

function DeleteButton() {
  const confirmation = useConfirmation();

  const handleDelete = async () => {
    const status = await confirmation.warn(
      'Are you sure you want to delete this item?',
      'Delete Item'
    );

    if (status === Toaster.Status.confirm) {
      // User clicked "Yes"
      await deleteItem();
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

## API Reference

### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `info` | `(message, title, options?)` | Show info confirmation |
| `success` | `(message, title, options?)` | Show success confirmation |
| `warn` | `(message, title, options?)` | Show warning confirmation |
| `error` | `(message, title, options?)` | Show error/danger confirmation |

### ConfirmationOptions

```tsx
interface ConfirmationOptions {
  yesCopy?: string;       // Default: 'Yes' (localized)
  cancelCopy?: string;    // Default: 'Cancel' (localized)
  hideYesBtn?: boolean;   // Hide confirm button
  hideCancelBtn?: boolean; // Hide cancel button
}
```

### Return Value

All methods return a `Promise<Toaster.Status>`:

```tsx
enum Toaster.Status {
  confirm = 'confirm',  // User clicked Yes
  reject = 'reject',    // User clicked Cancel
  dismiss = 'dismiss',  // Dialog was dismissed
}
```

## Confirmation Types

### Info Confirmation

```tsx
const status = await confirmation.info(
  'This is an informational message.',
  'Info'
);
```

### Success Confirmation

```tsx
const status = await confirmation.success(
  'Operation completed! Would you like to continue?',
  'Success'
);
```

### Warning Confirmation

```tsx
const status = await confirmation.warn(
  'This action cannot be undone. Continue?',
  'Warning'
);
```

### Error/Danger Confirmation

```tsx
const status = await confirmation.error(
  'This will permanently delete all data. Are you absolutely sure?',
  'Danger'
);
```

## Custom Button Text

```tsx
const status = await confirmation.warn(
  'You have unsaved changes. Discard them?',
  'Unsaved Changes',
  {
    yesCopy: 'Discard',
    cancelCopy: 'Keep Editing',
  }
);
```

## Delete Pattern

```tsx
import { useConfirmation, useToaster, Toaster } from '@abpjs/theme-shared';

function ItemActions({ item }) {
  const confirmation = useConfirmation();
  const toaster = useToaster();

  const handleDelete = async () => {
    const status = await confirmation.warn(
      `Are you sure you want to delete "${item.name}"?`,
      'Delete Item',
      {
        yesCopy: 'Delete',
        cancelCopy: 'Cancel',
      }
    );

    if (status === Toaster.Status.confirm) {
      try {
        await deleteItem(item.id);
        toaster.success('Item deleted successfully', 'Success');
      } catch (error) {
        toaster.error('Failed to delete item', 'Error');
      }
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

## Unsaved Changes Pattern

```tsx
import { useConfirmation, Toaster } from '@abpjs/theme-shared';
import { useNavigate } from 'react-router-dom';

function EditForm({ hasChanges }) {
  const confirmation = useConfirmation();
  const navigate = useNavigate();

  const handleCancel = async () => {
    if (hasChanges) {
      const status = await confirmation.warn(
        'You have unsaved changes. Are you sure you want to leave?',
        'Unsaved Changes',
        {
          yesCopy: 'Leave',
          cancelCopy: 'Stay',
        }
      );

      if (status !== Toaster.Status.confirm) return;
    }

    navigate(-1);
  };

  return (
    <form>
      {/* form fields */}
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
}
```

## Bulk Delete Pattern

```tsx
import { useConfirmation, useToaster, Toaster } from '@abpjs/theme-shared';

function BulkActions({ selectedItems }) {
  const confirmation = useConfirmation();
  const toaster = useToaster();

  const handleBulkDelete = async () => {
    const status = await confirmation.error(
      `Are you sure you want to delete ${selectedItems.length} items? This action cannot be undone.`,
      'Delete Multiple Items',
      {
        yesCopy: `Delete ${selectedItems.length} Items`,
        cancelCopy: 'Cancel',
      }
    );

    if (status === Toaster.Status.confirm) {
      try {
        await Promise.all(selectedItems.map((item) => deleteItem(item.id)));
        toaster.success(`${selectedItems.length} items deleted`, 'Success');
      } catch (error) {
        toaster.error('Failed to delete some items', 'Error');
      }
    }
  };

  return (
    <button onClick={handleBulkDelete} disabled={selectedItems.length === 0}>
      Delete Selected ({selectedItems.length})
    </button>
  );
}
```

## Related

- [Toaster](/docs/packages/theme-shared/toaster) - Toast notifications
- [Error Handling](/docs/packages/theme-shared/error-handling) - Global error handling
