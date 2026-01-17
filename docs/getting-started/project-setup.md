---
sidebar_position: 2
---

# Project Setup

This guide walks you through setting up ABP React in a new or existing React project.

## 1. Create a React Project

If you don't have a React project yet, create one using Vite:

```bash
npm create vite@latest my-abp-app -- --template react-ts
cd my-abp-app
npm install
```

## 2. Install Dependencies

Install ABP React packages and their peer dependencies:

```bash
npm install @abpjs/core @abpjs/account @abpjs/theme-basic @abpjs/theme-shared
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
npm install react-redux @reduxjs/toolkit axios react-router-dom oidc-client-ts
```

## 3. Configure the Redux Store

Create a Redux store with ABP React reducers:

```tsx title="src/store.ts"
import { configureStore } from '@reduxjs/toolkit';
import { configSlice, profileSlice, sessionSlice } from '@abpjs/core';

export const store = configureStore({
  reducer: {
    config: configSlice.reducer,
    profile: profileSlice.reducer,
    session: sessionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## 4. Set Up Providers

Wrap your app with the required providers:

```tsx title="src/main.tsx"
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeSharedProvider } from '@abpjs/theme-shared';
import { store } from './store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
          <ThemeSharedProvider>
            <App />
          </ThemeSharedProvider>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
```

## 5. Configure Environment

Create environment configuration for your ABP backend:

```tsx title="src/config/environment.ts"
export const environment = {
  production: false,
  apiUrl: 'https://localhost:44300', // Your ABP backend URL
  oAuthConfig: {
    issuer: 'https://localhost:44300',
    clientId: 'MyApp_React',
    scope: 'openid profile email MyApp',
    responseType: 'code',
    redirectUri: window.location.origin,
  },
};
```

## 6. Initialize ABP Configuration

Load the ABP application configuration on app startup:

```tsx title="src/App.tsx"
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApplicationConfigurationService, configSlice } from '@abpjs/core';
import { environment } from './config/environment';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const config = await ApplicationConfigurationService.get(environment.apiUrl);
        dispatch(configSlice.actions.setConfig(config));
      } catch (error) {
        console.error('Failed to load configuration:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Your app content */}
    </div>
  );
}

export default App;
```

## Project Structure

A typical ABP React project structure:

```
my-abp-app/
├── src/
│   ├── components/          # Your custom components
│   ├── config/
│   │   └── environment.ts   # Environment configuration
│   ├── pages/               # Page components
│   ├── store.ts             # Redux store setup
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point with providers
├── package.json
└── vite.config.ts
```

## Next Steps

- [Quick Start](/docs/getting-started/quick-start) - Build a login page
- [Authentication](/docs/packages/core/authentication) - Set up authentication
- [Layouts](/docs/packages/theme-basic/layouts) - Use pre-built layouts
