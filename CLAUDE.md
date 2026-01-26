# Claude Instructions

## Docusaurus Links

**Always use relative paths for internal links:**

```md
# Same folder
[Other Page](./other-page)

# Parent folder
[Theme Shared](../theme-shared/overview)

# Never use absolute paths like:
[Wrong](/docs/packages/theme-shared/overview)  # BREAKS versioned docs
```

## Documentation Pattern

When documenting a new package version:

1. **Package release notes** (`docs/packages/<pkg>/release-notes.md`) - Bullet summary only
2. **Feature docs** - Add to existing pages or create new pages in `docs/packages/<pkg>/`
3. **Main release notes** (`docs/release-notes/v0.x.0.md`) - Update packages table and upgrade command

## Repo Locations

- **Docs site**: `d:\Tekthar\abp react\abp-react-docs`
- **Source packages**: `D:\Tekthar\abp react\abp-react\packages\<package-name>\`
