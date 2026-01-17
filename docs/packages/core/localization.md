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

## Related

- [Configuration](/docs/packages/core/configuration) - Application configuration
