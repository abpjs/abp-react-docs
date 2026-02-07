---
sidebar_position: 1
---

# Overview

The `@abpjs/chat` package provides real-time messaging components and services for ABP React applications. This is the React equivalent of Angular's `@volo/abp.ng.chat` module.

[![npm version](https://img.shields.io/npm/v/@abpjs/chat.svg)](https://www.npmjs.com/package/@abpjs/chat)

:::info ABP Commercial License Required
This package is free to use but requires the corresponding backend module from [ABP Commercial](https://commercial.abp.io/). You can purchase an ABP Commercial license from [abp.io](https://abp.io/pricing).
:::

## Installation

```bash
npm install @abpjs/chat
# or
yarn add @abpjs/chat
```

**Required peer dependencies:**
```bash
npm install @abpjs/core @abpjs/theme-shared @chakra-ui/react @microsoft/signalr
```

## Features

- **Real-time Messaging** - SignalR-powered instant messaging
- **Contact Management** - Search and filter contacts
- **Conversation History** - Paginated message history
- **Unread Message Tracking** - Badge with unread count
- **Message Read Receipts** - Double-check mark for read messages
- **Component Replacement** - Customizable components via keys

## Main Exports

### Components

| Component | Description |
|-----------|-------------|
| `Chat` | Main chat interface with contacts sidebar and conversation view |
| `ChatContacts` | Contacts list with search and filtering |
| `ChatIcon` | Chat icon button with unread message badge |
| `ConversationAvatar` | User avatar with initials fallback |

### Hooks

| Hook | Description |
|------|-------------|
| `useChat` | Complete chat state management hook |

### Services

| Service | Description |
|---------|-------------|
| `ContactService` | REST API service for contact operations |
| `ConversationService` | REST API service for conversation operations |
| `ChatConfigService` | SignalR connection and real-time messaging |

### Constants

| Constant | Description |
|----------|-------------|
| `CHAT_ROUTE_PATH` | Default chat route path (`/chat`) |
| `CHAT_API_BASE` | Chat API base path (`/api/chat`) |
| `CHAT_HUB_PATH` | SignalR hub path (`/signalr-hubs/chat`) |

## Quick Example

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
    unreadMessageCount,
    contactsLoading,
    messagesLoading,
    selectContact,
    sendMessage,
    loadMoreMessages,
    markAsRead,
  } = useChat({
    rest,
    getAccessToken,
    hubUrl: '/signalr-hubs/chat',
  });

  return (
    <Chat
      contacts={contacts}
      userMessages={userMessages}
      selectedContact={selectedContact}
      unreadMessageCount={unreadMessageCount}
      contactsLoading={contactsLoading}
      messagesLoading={messagesLoading}
      onSelectContact={selectContact}
      onSendMessage={sendMessage}
      onLoadMore={loadMoreMessages}
      onMarkAsRead={markAsRead}
    />
  );
}
```

## useChat Hook

The `useChat` hook manages all chat state and operations:

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `rest` | `RestService` | required | RestService instance for API calls |
| `getAccessToken` | `() => string \| Promise<string>` | required | Function to get access token for SignalR |
| `hubUrl` | `string` | `'/signalr-hubs/chat'` | SignalR hub URL |
| `includeOtherContacts` | `boolean` | `true` | Include contacts without previous messages |
| `maxResultCount` | `number` | `20` | Messages per page |

### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `contacts` | `ChatContactDto[]` | List of all contacts |
| `selectedContact` | `ChatContactDto \| null` | Currently selected contact |
| `userMessages` | `Map<string, ChatMessageDto[]>` | Messages map keyed by user ID |
| `unreadMessageCount` | `number` | Total unread message count |
| `contactsLoading` | `boolean` | Whether contacts are loading |
| `messagesLoading` | `boolean` | Whether messages are loading |
| `allMessagesLoaded` | `boolean` | Whether all messages are loaded (pagination complete) |
| `selectContact` | `(contact) => void` | Select a contact to chat with |
| `sendMessage` | `(userId, message) => Promise` | Send a message |
| `loadMoreMessages` | `(userId) => Promise` | Load more messages (pagination) |
| `markAsRead` | `(userId) => Promise` | Mark conversation as read |
| `refreshContacts` | `() => Promise` | Refresh contacts list |
| `chatConfigService` | `ChatConfigService` | Service instance for advanced usage |

## Chat Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `contacts` | `ChatContactDto[]` | required | All contacts to display |
| `userMessages` | `Map<string, ChatMessageDto[]>` | required | Messages map keyed by user ID |
| `selectedContact` | `ChatContactDto \| null` | - | Currently selected contact |
| `onSelectContact` | `(contact) => void` | - | Callback when a contact is selected |
| `onSendMessage` | `(userId, message) => void` | - | Callback when sending a message |
| `onLoadMore` | `(userId) => void` | - | Callback when loading more messages |
| `onMarkAsRead` | `(userId) => void` | - | Callback when marking as read |
| `unreadMessageCount` | `number` | `0` | Total unread message count |
| `contactsLoading` | `boolean` | `false` | Whether contacts are loading |
| `messagesLoading` | `boolean` | `false` | Whether messages are loading |
| `allMessagesLoaded` | `boolean` | `false` | Whether all messages loaded |
| `sendOnEnter` | `boolean` | `true` | Send message on Enter key |
| `className` | `string` | - | Optional CSS class name |

## ChatIcon Component

Display a chat icon with unread message badge:

```tsx
import { ChatIcon } from '@abpjs/chat';

function Header() {
  return (
    <ChatIcon
      unreadCount={5}
      onClick={() => navigate('/chat')}
    />
  );
}
```

### ChatIcon Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `unreadCount` | `number` | `0` | Unread message count for badge |
| `onClick` | `() => void` | - | Click handler |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Icon size |
| `className` | `string` | - | Optional CSS class name |

## ChatConfigService

The `ChatConfigService` manages SignalR connections:

```tsx
import { getChatConfigService } from '@abpjs/chat';

const chatConfig = getChatConfigService(rest, getAccessToken);

// Initialize SignalR
await chatConfig.initSignalR('/signalr-hubs/chat');

// Listen for incoming messages
const unsubscribe = chatConfig.onMessage((message) => {
  console.log('New message:', message.text);
});

// Listen for unread count changes
chatConfig.onUnreadCountChange((count) => {
  console.log('Unread count:', count);
});

// Check connection state
if (chatConfig.isConnected()) {
  console.log('Connected to chat hub');
}

// Stop connection
await chatConfig.stopSignalR();
```

### ChatConfigService Methods

| Method | Description |
|--------|-------------|
| `initSignalR(hubUrl)` | Initialize SignalR connection |
| `stopSignalR()` | Stop SignalR connection |
| `onMessage(callback)` | Subscribe to incoming messages |
| `onUnreadCountChange(callback)` | Subscribe to unread count changes |
| `setTotalUnreadMessageCount()` | Fetch and set total unread count |
| `updateUnreadCount(count)` | Update unread count |
| `incrementUnreadCount(amount)` | Increment unread count |
| `decrementUnreadCount(amount)` | Decrement unread count |
| `isConnected()` | Check if connected |
| `getConnectionState()` | Get SignalR connection state |

## Models

### ChatContactDto

```tsx
interface ChatContactDto {
  userId: string;
  name: string;
  surname: string;
  username: string;
  lastMessageSide: number; // 1=Sender, 2=Receiver
  lastMessage: string;
  lastMessageDate: Date | string;
  unreadMessageCount: number;
}
```

### ChatMessageDto

```tsx
interface ChatMessageDto {
  message: string;
  messageDate: Date | string;
  isRead: boolean;
  readDate: Date | string;
  side: ChatMessageSide; // 1=Sender, 2=Receiver
}
```

### ChatMessage (SignalR)

```tsx
interface ChatMessage {
  senderUserId: string;
  senderUserName: string;
  senderName: string;
  senderSurname: string;
  text: string;
}
```

## Enums

### ChatMessageSide

```tsx
import { ChatMessageSide } from '@abpjs/chat';

ChatMessageSide.Sender   // 1
ChatMessageSide.Receiver // 2
```

### Component Keys

```tsx
import { eChatComponents } from '@abpjs/chat';

eChatComponents.Chat              // 'Chat.ChatComponent'
eChatComponents.ChatContacts      // 'Chat.ChatContactsComponent'
eChatComponents.ConversationAvatar // 'Chat.ConversationAvatarComponent'
eChatComponents.ChatIcon          // 'Chat.ChatIconComponent'
```

### Route Names

```tsx
import { eChatRouteNames } from '@abpjs/chat';

eChatRouteNames.Chat // 'Chat::Menu:Chat'
```

## TypeScript Support

```tsx
import type {
  ChatContactDto,
  ChatMessageDto,
  ChatMessage,
  ChatMessageSide,
  ChatProps,
  ChatContactsProps,
  ChatIconProps,
  ConversationAvatarProps,
  UseChatOptions,
  UseChatReturn,
  ChatComponentKey,
  ChatRouteNameKey,
} from '@abpjs/chat';
```

## Required Policies

The chat module requires the following ABP policies:

| Policy | Description |
|--------|-------------|
| `Chat.Messaging` | Send and receive messages |

## Dependencies

- `@abpjs/core` - Core ABP React functionality
- `@abpjs/theme-shared` - Shared UI components
- `@chakra-ui/react` - UI component library
- `@microsoft/signalr` - SignalR client for real-time messaging

## See Also

- [Core Module](../core/overview)
- [Theme Shared](../theme-shared/overview)
