---
sidebar_position: 4
---

# Tenant Box

The `TenantBox` component allows users to switch between tenants in a multi-tenant application.

## TenantBox Component

```tsx
import { TenantBox } from '@abpjs/account';

function LoginPage() {
  return (
    <div>
      <TenantBox onTenantChange={(tenant) => console.log('Switched to:', tenant)} />
      <LoginForm onSuccess={() => {}} />
    </div>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `onTenantChange` | `(tenant: Tenant \| null) => void` | Called when tenant changes |

## How It Works

1. User clicks on the tenant box
2. A modal opens to enter tenant name
3. The tenant is validated against the backend
4. If valid, the session is updated and the app reloads

## Display Current Tenant

```tsx
import { useConfig } from '@abpjs/core';

function TenantDisplay() {
  const { currentTenant } = useConfig();

  return (
    <div>
      {currentTenant ? (
        <p>Current Tenant: {currentTenant.name}</p>
      ) : (
        <p>Host (No Tenant)</p>
      )}
    </div>
  );
}
```

## Custom Tenant Switcher

Build a custom tenant switcher:

```tsx
import { useState } from 'react';
import { useSession } from '@abpjs/core';
import { RestService } from '@abpjs/core';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from '@chakra-ui/react';

function CustomTenantSwitcher() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tenantName, setTenantName] = useState('');
  const { setSession } = useSession();

  const handleSwitch = async () => {
    try {
      if (tenantName) {
        // Find tenant by name
        const response = await RestService.get(
          `/api/abp/multi-tenancy/tenants/by-name/${tenantName}`
        );
        setSession({ tenantId: response.tenantId });
      } else {
        // Switch to host
        setSession({ tenantId: null });
      }
      window.location.reload();
    } catch (error) {
      console.error('Invalid tenant name');
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Switch Tenant</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Switch Tenant</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Enter tenant name (empty for host)"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSwitch}>
              Switch
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
```

## Tenant in Login Flow

Include the TenantBox in your login page:

```tsx
import { TenantBox, LoginForm } from '@abpjs/account';
import { Box, Container, Divider, VStack } from '@chakra-ui/react';

function MultiTenantLoginPage() {
  return (
    <Container maxW="md" py={10}>
      <VStack spacing={6}>
        <Box w="full">
          <TenantBox />
        </Box>

        <Divider />

        <Box w="full" bg="white" p={8} borderRadius="lg" boxShadow="md">
          <LoginForm onSuccess={() => {}} />
        </Box>
      </VStack>
    </Container>
  );
}
```

## Related

- [Multi-tenancy Guide](/docs/guides/multi-tenancy) - Complete multi-tenancy setup
- [Tenant Management](/docs/packages/tenant-management/overview) - Manage tenants
- [Session](/docs/packages/core/session) - Session management
