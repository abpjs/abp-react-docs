---
sidebar_position: 99
---

# Release Notes

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
