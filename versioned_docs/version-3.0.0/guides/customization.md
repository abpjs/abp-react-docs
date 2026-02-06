---
sidebar_position: 2
---

# Customization

This guide covers customizing ABP React components and themes.

## Theme Customization

ABP React uses Chakra UI for styling. Customize the theme by extending the default theme:

```tsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    brand: {
      50: '#e6f2ff',
      100: '#b3d9ff',
      500: '#0066cc',
      600: '#0052a3',
      700: '#003d7a',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      {/* Your app */}
    </ChakraProvider>
  );
}
```

## Custom Login Form

Create a custom login form while using the authentication hook:

```tsx
import { usePasswordFlow } from '@abpjs/account';
import { useToaster } from '@abpjs/theme-shared';
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
} from '@chakra-ui/react';

function CustomLoginForm({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = usePasswordFlow();
  const toaster = useToaster();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      toaster.success('Welcome back!');
      onSuccess?.();
    } catch (error) {
      toaster.error('Invalid username or password');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxW="md" mx="auto">
      <VStack spacing={4}>
        <Heading size="lg">Welcome Back</Heading>

        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          isLoading={loading}
        >
          Sign In
        </Button>
      </VStack>
    </Box>
  );
}
```

## Custom User Table

Create a custom user management interface:

```tsx
import { useUsers } from '@abpjs/identity';
import { usePermission } from '@abpjs/core';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  Input,
  HStack,
} from '@chakra-ui/react';
import { FiEdit, FiTrash } from 'react-icons/fi';

function CustomUserTable() {
  const { users, search, setSearch, loading } = useUsers();
  const { hasPermission } = usePermission();

  return (
    <div>
      <HStack mb={4}>
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          maxW="300px"
        />
      </HStack>

      <Table>
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td fontWeight="medium">{user.userName}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Badge colorScheme={user.isActive ? 'green' : 'red'}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </Td>
              <Td>
                <HStack spacing={2}>
                  {hasPermission('AbpIdentity.Users.Update') && (
                    <IconButton
                      aria-label="Edit"
                      icon={<FiEdit />}
                      size="sm"
                    />
                  )}
                  {hasPermission('AbpIdentity.Users.Delete') && (
                    <IconButton
                      aria-label="Delete"
                      icon={<FiTrash />}
                      size="sm"
                      colorScheme="red"
                    />
                  )}
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
```

## Custom Navigation

Build your own navigation structure:

```tsx
import { useNavigationElements } from '@abpjs/theme-basic';
import { usePermission } from '@abpjs/core';
import { Link } from 'react-router-dom';
import { Box, VStack, HStack, Icon, Text } from '@chakra-ui/react';

function CustomSidebar() {
  const { elements } = useNavigationElements();
  const { hasPermission } = usePermission();

  const renderItem = (item) => {
    // Check permission
    if (item.requiredPermission && !hasPermission(item.requiredPermission)) {
      return null;
    }

    // Check visibility
    if (item.visible === false) {
      return null;
    }

    return (
      <Box key={item.id}>
        <Link to={item.path}>
          <HStack p={3} _hover={{ bg: 'gray.100' }} borderRadius="md">
            {item.icon && <Icon as={item.icon} />}
            <Text>{item.name}</Text>
          </HStack>
        </Link>

        {/* Render children */}
        {item.children?.length > 0 && (
          <VStack align="stretch" pl={4}>
            {item.children.map(renderItem)}
          </VStack>
        )}
      </Box>
    );
  };

  return (
    <Box w="250px" bg="white" p={4} borderRight="1px" borderColor="gray.200">
      <VStack align="stretch" spacing={1}>
        {elements
          .sort((a, b) => a.order - b.order)
          .map(renderItem)}
      </VStack>
    </Box>
  );
}
```

## Custom Toast Messages

Customize toast appearance:

```tsx
import { useToaster } from '@abpjs/theme-shared';

function CustomToasts() {
  const toaster = useToaster();

  const showCustomSuccess = () => {
    toaster.show({
      title: 'Great job!',
      message: 'Your changes have been saved',
      type: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // ...
}
```

## Extending Services

Create custom services that extend ABP React functionality:

```tsx
import { RestService } from '@abpjs/core';

// Custom API service
const ProductService = {
  getProducts: async (params) => {
    return RestService.get('/api/app/products', { params });
  },

  getProduct: async (id: string) => {
    return RestService.get(`/api/app/products/${id}`);
  },

  createProduct: async (data) => {
    return RestService.post('/api/app/products', data);
  },

  updateProduct: async (id: string, data) => {
    return RestService.put(`/api/app/products/${id}`, data);
  },

  deleteProduct: async (id: string) => {
    return RestService.delete(`/api/app/products/${id}`);
  },
};

// Custom hook
function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const result = await ProductService.getProducts({});
      setProducts(result.items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, refresh: fetchProducts };
}
```

## Related

- [Theme Basic](/docs/packages/theme-basic/overview) - Layout components
- [Theme Shared](/docs/packages/theme-shared/overview) - Shared UI components
