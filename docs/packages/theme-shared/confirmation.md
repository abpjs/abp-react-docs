---
sidebar_position: 3
---

# Confirmation

The `useConfirmation` hook provides promise-based confirmation dialogs.

## Basic Usage

```tsx
import { useConfirmation, Confirmation } from '@abpjs/theme-shared';

function DeleteButton() {
  const confirmation = useConfirmation();

  const handleDelete = async () => {
    const status = await confirmation.warn(
      'Are you sure you want to delete this item?',
      'Delete Item'
    );

    if (status === Confirmation.Status.confirm) {
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
| `info` | `(message, title?, options?)` | Show info confirmation |
| `success` | `(message, title?, options?)` | Show success confirmation |
| `warn` | `(message, title?, options?)` | Show warning confirmation |
| `error` | `(message, title?, options?)` | Show error/danger confirmation |
| `show` | `(message, title?, severity?, options?)` | Show with specified severity (v2.0.0) |
| `clear` | `(status?)` | Clear the current confirmation |
| `listenToEscape` | `()` | Enable escape key dismissal (v2.0.0) |
| `subscribe` | `(callback)` | Subscribe to confirmation updates (v2.0.0) |

### ConfirmationOptions

```tsx
interface ConfirmationOptions {
  yesText?: Config.LocalizationParam;    // Default: 'Yes' (localized)
  cancelText?: Config.LocalizationParam; // Default: 'Cancel' (localized)
  hideYesBtn?: boolean;    // Hide confirm button
  hideCancelBtn?: boolean; // Hide cancel button
  closable?: boolean;      // Allow dismiss via escape/click outside (v2.0.0)
}
```

:::warning Breaking Change (v2.0.0)
The deprecated `yesCopy` and `cancelCopy` properties have been removed. Use `yesText` and `cancelText` instead.
:::

### Severity Types (v2.0.0)

```tsx
type Severity = 'neutral' | 'success' | 'info' | 'warning' | 'error';
```

The `show()` method accepts a severity parameter. If not specified, it defaults to `'neutral'`.

### Return Value (v2.1.0)

All methods return a `Promise<Confirmation.Status>`:

```tsx
enum Confirmation.Status {
  confirm = 'confirm',  // User clicked Yes
  reject = 'reject',    // User clicked Cancel
  dismiss = 'dismiss',  // Dialog was dismissed
}
```

:::info Changed in v2.1.0
Prior to v2.1.0, confirmation methods returned `Promise<Toaster.Status>`. The new `Confirmation.Status` enum has the same values but is now specific to confirmations. `Toaster.Status` is deprecated and will be removed in v2.2.0.
:::

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
    yesText: 'Discard',
    cancelText: 'Keep Editing',
  }
);
```

## Show with Custom Severity (v2.0.0)

Use the `show()` method to display a confirmation with any severity:

```tsx
const status = await confirmation.show(
  'This is a neutral message',
  'Neutral Title',
  'neutral', // 'neutral' | 'success' | 'info' | 'warning' | 'error'
  { yesText: 'OK' }
);
```

## Escape Key Dismissal (v2.0.0)

Enable escape key to dismiss confirmations:

```tsx
function App() {
  const confirmation = useConfirmation();

  useEffect(() => {
    // Enable escape key listener
    confirmation.listenToEscape();
  }, [confirmation]);

  // Now pressing Escape will dismiss open confirmations
  // (unless closable: false is set)
}
```

## Subscribe to Updates (v2.0.0)

Subscribe to confirmation state changes:

```tsx
useEffect(() => {
  const unsubscribe = confirmation.subscribe((data) => {
    if (data) {
      console.log('Confirmation shown:', data.message);
    } else {
      console.log('Confirmation closed');
    }
  });

  return () => unsubscribe();
}, [confirmation]);
```

## Non-Closable Confirmation (v2.0.0)

Prevent users from dismissing without a choice:

```tsx
const status = await confirmation.error(
  'Critical action required. You must choose.',
  'Required Action',
  {
    closable: false, // Cannot escape or click outside
    hideCancelBtn: true, // Only Yes button
  }
);
```

## Delete Pattern

```tsx
import { useConfirmation, useToaster, Confirmation } from '@abpjs/theme-shared';

function ItemActions({ item }) {
  const confirmation = useConfirmation();
  const toaster = useToaster();

  const handleDelete = async () => {
    const status = await confirmation.warn(
      `Are you sure you want to delete "${item.name}"?`,
      'Delete Item',
      {
        yesText: 'Delete',
        cancelText: 'Cancel',
      }
    );

    if (status === Confirmation.Status.confirm) {
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
import { useConfirmation, Confirmation } from '@abpjs/theme-shared';
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
          yesText: 'Leave',
          cancelText: 'Stay',
        }
      );

      if (status !== Confirmation.Status.confirm) return;
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
import { useConfirmation, useToaster, Confirmation } from '@abpjs/theme-shared';

function BulkActions({ selectedItems }) {
  const confirmation = useConfirmation();
  const toaster = useToaster();

  const handleBulkDelete = async () => {
    const status = await confirmation.error(
      `Are you sure you want to delete ${selectedItems.length} items? This action cannot be undone.`,
      'Delete Multiple Items',
      {
        yesText: `Delete ${selectedItems.length} Items`,
        cancelText: 'Cancel',
      }
    );

    if (status === Confirmation.Status.confirm) {
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

## Localization Support (v1.1.0)

Button text now accepts `Config.LocalizationParam` for automatic localization:

```tsx
const status = await confirmation.warn(
  'Are you sure?',
  'Confirm',
  {
    // Using localization keys
    yesText: 'AbpIdentity::Delete',
    cancelText: 'AbpIdentity::Cancel',

    // Or with default values
    yesText: { key: 'DeleteKey', defaultValue: 'Delete' },
    cancelText: { key: 'CancelKey', defaultValue: 'Cancel' },
  }
);
```

## Related

- [Toaster](./toaster) - Toast notifications
- [Error Handling](./error-handling) - Global error handling
