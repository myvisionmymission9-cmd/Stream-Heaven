# Design system

Shared Flutter design tokens and widgets for Stream Heaven apps.

## Usage

Add to your app `pubspec.yaml`:

```yaml
dependencies:
  design_system:
    path: ../../packages/design-system
```

## Exports

- `ShTheme.dark()` — Material 3 dark theme (primary `#6B4EFF`, surface `#121212`)
- `ShColors`, `ShSpacing`, `ShTypography`
- `ShButton`, `ShTextField`

## Phase 2a scope

Foundation only — no `ShAvatar`, golden tests, or script-specific font bundles yet.
