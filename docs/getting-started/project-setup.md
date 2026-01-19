---
sidebar_position: 2
---

# Project Setup

This guide covers configuring your ABP React project to connect to your ABP backend.

:::tip
If you created your project using `npx create-abp-react my-app`, the project structure is already set up. You just need to configure the `appconfig.json` file to point to your ABP backend.
:::

## Configure Your Backend Connection

The template uses a `public/appconfig.json` file to configure the connection to your ABP backend. Update this file with your backend settings:

```json title="public/appconfig.json"
{
  "oAuthConfig": {
    "issuer": "https://localhost:44300/",
    "redirectUri": "http://localhost:5173",
    "clientId": "MyApp_React",
    "responseType": "code",
    "scope": "offline_access MyApp",
    "requireHttps": false
  },
  "application": {
    "baseUrl": "http://localhost:5173",
    "name": "My App"
  },
  "apis": {
    "default": {
      "url": "https://localhost:44300",
      "rootNamespace": "MyApp"
    }
  }
}
```

### Configuration Options

| Property | Description |
|----------|-------------|
| `oAuthConfig.issuer` | Your ABP backend OAuth URL |
| `oAuthConfig.redirectUri` | Your React app URL (where to redirect after login) |
| `oAuthConfig.clientId` | OAuth client ID registered in ABP |
| `oAuthConfig.scope` | OAuth scopes (include `offline_access` for token refresh) |
| `oAuthConfig.requireHttps` | Set to `true` in production |
| `application.baseUrl` | Your React app base URL |
| `application.name` | Your application name |
| `apis.default.url` | Your ABP backend API URL |
| `apis.default.rootNamespace` | Your ABP project namespace |

## ABP Backend Configuration

### Register OAuth Client

In your ABP backend, register the React application as an OAuth client. Add to your `OpenIddictDataSeedContributor` or configure in `appsettings.json`:

```json
{
  "OpenIddict": {
    "Applications": {
      "MyApp_React": {
        "ClientId": "MyApp_React",
        "RootUrl": "http://localhost:5173",
        "Scopes": ["openid", "profile", "email", "offline_access", "MyApp"],
        "GrantTypes": ["authorization_code", "refresh_token"],
        "RedirectUris": ["http://localhost:5173"],
        "PostLogoutRedirectUris": ["http://localhost:5173"]
      }
    }
  }
}
```

### Enable CORS

Ensure your ABP backend allows requests from your React app. In your module configuration:

```csharp
context.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});
```

## Project Structure

The `create-abp-react` template generates the following structure:

```
my-app/
├── public/
│   └── appconfig.json     # Backend configuration
├── src/
│   ├── pages/
│   │   ├── Home.tsx       # Home page component
│   │   └── index.ts       # Page exports
│   ├── App.tsx            # Main app with routes
│   ├── main.tsx           # Entry point with providers
│   └── vite-env.d.ts      # Vite type definitions
├── .eslintrc.js
├── .prettierrc
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Understanding the Template

### Entry Point (main.tsx)

The entry point sets up all the ABP React providers:

```tsx title="src/main.tsx"
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AbpProvider, type ABP, type Config, eLayoutType } from '@abpjs/core';
import { ThemeBasicProvider, LAYOUTS } from '@abpjs/theme-basic';
import { AccountProvider, ACCOUNT_ROUTES } from '@abpjs/account';
import App from './App';

// Define app-specific routes
const appRoutes: ABP.FullRoute[] = [
  { name: 'Home', path: '', order: 1, layout: eLayoutType.application },
];

// Combine app routes with account routes
const routes: ABP.FullRoute[] = [...appRoutes, ...ACCOUNT_ROUTES];

// Define requirements with layout components
const requirements: Config.Requirements = {
  layouts: LAYOUTS,
};

async function loadConfig() {
  const response = await fetch('/appconfig.json');
  return response.json();
}

async function bootstrap() {
  const config = await loadConfig();

  const environment = {
    production: false,
    application: config.application,
    apis: config.apis,
    oAuthConfig: {
      authority: config.oAuthConfig.issuer,
      client_id: config.oAuthConfig.clientId,
      redirect_uri: config.oAuthConfig.redirectUri,
      post_logout_redirect_uri: config.oAuthConfig.redirectUri,
      response_type: config.oAuthConfig.responseType,
      scope: config.oAuthConfig.scope,
      automaticSilentRenew: true,
      includeIdTokenInSilentRenew: true,
    },
  };

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <AbpProvider environment={environment} routes={routes} requirements={requirements}>
          <ThemeBasicProvider>
            <AccountProvider options={{ redirectUrl: '/' }}>
              <App />
            </AccountProvider>
          </ThemeBasicProvider>
        </AbpProvider>
      </BrowserRouter>
    </StrictMode>
  );
}

bootstrap();
```

### App Component (App.tsx)

The App component defines routes with different layouts:

```tsx title="src/App.tsx"
import { Routes, Route } from 'react-router-dom';
import { LayoutApplication, LayoutAccount } from '@abpjs/theme-basic';
import { LoginPage } from '@abpjs/account';
import { HomePage } from './pages/Home';

function App() {
  return (
    <Routes>
      {/* Main app pages with LayoutApplication */}
      <Route element={<LayoutApplication />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Auth pages with LayoutAccount */}
      <Route element={<LayoutAccount />}>
        <Route path="/account/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
```

## Key Providers

| Provider | Purpose |
|----------|---------|
| `AbpProvider` | Core ABP functionality (auth, config, localization) |
| `ThemeBasicProvider` | Layout components and Chakra UI theming |
| `AccountProvider` | Login/logout redirect handling |

## Next Steps

- [Quick Start](/docs/getting-started/quick-start) - Add pages and features
- [Authentication](/docs/packages/core/authentication) - Learn about authentication
- [Layouts](/docs/packages/theme-basic/layouts) - Customize layouts
