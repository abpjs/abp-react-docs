---
sidebar_position: 99
---

# Release Notes

## v4.0.0

**February 2026**

- Version alignment with @abpjs/core

---

## v3.2.0

**February 2026**

- Version alignment with @abpjs/core

---

## v3.1.0

**February 2026**

- Version alignment with @abpjs/core

---

## v3.0.0

**February 2026**

### New Features

#### Route Providers

New route provider system for initializing chat routes:

```tsx
import { initializeChatRoutes } from '@abpjs/chat';

// Call once during app initialization
const addRoutes = initializeChatRoutes();
addRoutes();

// This registers:
// - /chat (invisible route for direct navigation)
```

For advanced configuration with a custom RoutesService:

```tsx
import { configureRoutes, CHAT_ROUTE_PROVIDERS } from '@abpjs/chat';
import { getRoutesService } from '@abpjs/core';

const routesService = getRoutesService();
const addRoutes = configureRoutes(routesService);
addRoutes();
```

#### Nav Item Providers

New provider for registering the chat nav item (ChatIcon):

```tsx
import { initializeChatNavItems } from '@abpjs/chat';

// Call once during app initialization
const addNavItems = initializeChatNavItems();
addNavItems();

// This registers the ChatIcon component as a nav item with:
// - id: 'Chat.ChatIconComponent'
// - requiredPolicy: 'Chat.Messaging'
// - order: 99.99
```

For advanced configuration:

```tsx
import { configureNavItems, CHAT_NAV_ITEM_PROVIDERS } from '@abpjs/chat';
import { getNavItemsService } from '@abpjs/theme-shared';

const navItemsService = getNavItemsService();
const addNavItems = configureNavItems(navItemsService);
addNavItems();
```

#### Policy Names

New constants for chat permission policies:

```tsx
import { eChatPolicyNames } from '@abpjs/chat';

// Available policies:
eChatPolicyNames.Messaging  // 'Chat.Messaging'

// Use with permission checking
import { usePermission } from '@abpjs/core';

function ChatNavItem() {
  const canChat = usePermission(eChatPolicyNames.Messaging);

  if (!canChat) return null;
  return <ChatIcon />;
}
```

#### Config Subpackage

The `@volo/abp.ng.chat/config` functionality is now merged into the main package:

```tsx
// All config exports are available from the main package
import {
  configureRoutes,
  configureNavItems,
  CHAT_ROUTE_PROVIDERS,
  CHAT_NAV_ITEM_PROVIDERS,
  initializeChatRoutes,
  initializeChatNavItems,
  eChatRouteNames,
  eChatPolicyNames,
} from '@abpjs/chat';
```

### New Exports

- `initializeChatRoutes()` - Initialize chat routes
- `configureRoutes(routes)` - Configure routes with custom RoutesService
- `CHAT_ROUTE_PROVIDERS` - Route provider configuration object
- `initializeChatNavItems()` - Initialize chat nav items
- `configureNavItems(navItems)` - Configure nav items with custom NavItemsService
- `CHAT_NAV_ITEM_PROVIDERS` - Nav item provider configuration object
- `CHAT_NAV_ITEM_CONFIG` - Chat nav item configuration metadata
- `ChatNavItemConfig` - Interface for nav item config
- `eChatPolicyNames` - Constants for chat permission policies
- `ChatPolicyNameKey` - Type for policy name values

---

## v2.9.0 (Initial Release)

**February 2026**

Initial release of the `@abpjs/chat` package, providing real-time messaging functionality for ABP React applications. This is the React equivalent of Angular's `@volo/abp.ng.chat` module.

### Features

#### Components

- **`Chat`** - Main chat interface with contacts sidebar and conversation view
  - Message input with Enter-to-send support
  - Automatic scrolling to new messages
  - Message read receipts (✓✓)
  - Date/time formatting for messages
  - Empty state when no contact selected

- **`ChatContacts`** - Contacts list component
  - Search and filter contacts
  - Unread message badges
  - Last message preview
  - Selection highlighting

- **`ChatIcon`** - Chat icon with unread badge
  - Configurable sizes (sm, md, lg)
  - Click handler for navigation

- **`ConversationAvatar`** - User avatar component
  - Initials fallback when no image
  - Small variant for message headers

#### Hooks

- **`useChat`** - Complete chat state management hook
  - Contact list management
  - Message history with pagination
  - Real-time message receiving via SignalR
  - Unread message count tracking
  - Conversation read status management

#### Services

- **`ContactService`** - REST API service for contacts
  - `getContactsByInput()` - Fetch contacts with filtering

- **`ConversationService`** - REST API service for conversations
  - `getConversationByInput()` - Fetch conversation messages
  - `sendMessageByInput()` - Send a message
  - `markConversationAsReadByInput()` - Mark conversation as read

- **`ChatConfigService`** - SignalR connection management
  - `initSignalR()` - Initialize SignalR connection
  - `stopSignalR()` - Stop SignalR connection
  - `onMessage()` - Subscribe to incoming messages
  - `onUnreadCountChange()` - Subscribe to unread count changes
  - `setTotalUnreadMessageCount()` - Fetch total unread count
  - Automatic reconnection handling

#### Models

- `ChatContactDto` - Contact data structure
- `ChatMessageDto` - Message data structure
- `ChatMessage` - SignalR message structure
- `ChatConversationDto` - Conversation response
- `ChatTargetUserInfo` - Target user information
- `GetContactsInput` - Contacts query parameters
- `GetConversationInput` - Conversation query parameters
- `SendMessageInput` - Send message request
- `MarkConversationAsReadInput` - Mark as read request

#### Enums

- `ChatMessageSide` - Message direction (Sender=1, Receiver=2)
- `eChatComponents` - Component replacement keys
- `eChatRouteNames` - Route name constants

#### Constants

- `CHAT_ROUTE_PATH` - Default route path (`/chat`)
- `CHAT_API_BASE` - API base path (`/api/chat`)
- `CHAT_HUB_PATH` - SignalR hub path (`/signalr-hubs/chat`)

### Example Usage

```tsx
import { Chat, useChat } from '@abpjs/chat';
import { useRest, useAuth } from '@abpjs/core';

function ChatPage() {
  const { rest } = useRest();
  const { getAccessToken } = useAuth();

  const {
    contacts,
    selectedContact,
    userMessages,
    selectContact,
    sendMessage,
    loadMoreMessages,
    markAsRead,
  } = useChat({
    rest,
    getAccessToken,
  });

  return (
    <Chat
      contacts={contacts}
      userMessages={userMessages}
      selectedContact={selectedContact}
      onSelectContact={selectContact}
      onSendMessage={sendMessage}
      onLoadMore={loadMoreMessages}
      onMarkAsRead={markAsRead}
    />
  );
}
```
