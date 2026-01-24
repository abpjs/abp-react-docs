---
sidebar_position: 4
---

# Localization

ABP React provides multi-language support with dynamic resource loading.

## useLocalization Hook

The `useLocalization` hook provides translation functions:

```tsx
import { useLocalization } from '@abpjs/core';

function LocalizationExample() {
  const { t, instant } = useLocalization();

  return (
    <div>
      <h1>{t('Welcome')}</h1>
      <p>{t('HelloUser', { name: 'John' })}</p>
      <button>{t('Save')}</button>
    </div>
  );
}
```

## API Reference

### useLocalization Returns

| Property | Type | Description |
|----------|------|-------------|
| `t` | `(key: string, params?: object) => string` | Translate a key with optional interpolation |
| `instant` | `(key: string, params?: object) => string` | Synchronous translation |

## Translation with Parameters

Pass parameters for dynamic content:

```tsx
const { t } = useLocalization();

// Assuming localization resource has: "HelloUser": "Hello, {name}!"
<p>{t('HelloUser', { name: 'John' })}</p>
// Output: "Hello, John!"

// With multiple parameters
// "ItemsFound": "Found {count} items in {category}"
<p>{t('ItemsFound', { count: 5, category: 'Books' })}</p>
// Output: "Found 5 items in Books"
```

## Using Resource Keys

ABP organizes translations into resources. Access them with the resource prefix:

```tsx
const { t } = useLocalization();

// From AbpIdentity resource
<p>{t('AbpIdentity::UserName')}</p>

// From AbpAccount resource
<p>{t('AbpAccount::Login')}</p>

// From your custom resource
<p>{t('MyApp::WelcomeMessage')}</p>
```

## Available Languages

Access available languages from the configuration:

```tsx
import { useConfig } from '@abpjs/core';

function LanguageSelector() {
  const { localization } = useConfig();
  const languages = localization?.languages || [];
  const currentLanguage = localization?.currentCulture?.name;

  return (
    <select value={currentLanguage}>
      {languages.map((lang) => (
        <option key={lang.cultureName} value={lang.cultureName}>
          {lang.displayName}
        </option>
      ))}
    </select>
  );
}
```

## Changing Language

To change the language, update the URL or use a language switcher that reloads the configuration:

```tsx
function LanguageSwitcher() {
  const changeLanguage = (cultureName: string) => {
    // Set culture cookie and reload
    document.cookie = `.AspNetCore.Culture=c=${cultureName}|uic=${cultureName}; path=/`;
    window.location.reload();
  };

  return (
    <button onClick={() => changeLanguage('tr')}>
      Türkçe
    </button>
  );
}
```

## RTL (Right-to-Left) Support

The `useDirection` hook provides RTL support for Arabic, Hebrew, Persian, Urdu, and other RTL languages:

```tsx
import { useDirection } from '@abpjs/core';

function MyComponent() {
  const { direction, isRtl, startSide, endSide } = useDirection();

  return (
    <div dir={direction}>
      {/* direction: 'rtl' or 'ltr' */}
      {/* isRtl: boolean */}
      {/* startSide: 'left' (LTR) or 'right' (RTL) */}
      {/* endSide: 'right' (LTR) or 'left' (RTL) */}
      <p>Content flows in {direction} direction</p>
    </div>
  );
}
```

### useDirection Returns

| Property | Type | Description |
|----------|------|-------------|
| `direction` | `'ltr' \| 'rtl'` | Current text direction |
| `isRtl` | `boolean` | Whether current language is RTL |
| `startSide` | `'left' \| 'right'` | Start side based on direction |
| `endSide` | `'left' \| 'right'` | End side based on direction |

### Using with Chakra UI Components

```tsx
import { useDirection } from '@abpjs/core';
import { Menu } from '@chakra-ui/react';

function DirectionalMenu() {
  const { endSide } = useDirection();

  return (
    <Menu.Root positioning={{ placement: `${endSide}-start` }}>
      {/* Menu opens on the correct side based on language direction */}
      <Menu.Trigger>Open Menu</Menu.Trigger>
      <Menu.Content>
        <Menu.Item value="item1">Item 1</Menu.Item>
        <Menu.Item value="item2">Item 2</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}
```

## Related

- [Configuration](/docs/packages/core/configuration) - Application configuration
