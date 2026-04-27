---
name: TextInput
description: Labeled text field with optional description, error message, and right-side icon (search or arrow).
type: component
path: src/components/simple/TextInput.tsx
---

## Properties

| Prop              | Type                   | Default                        | Description                              |
|-------------------|------------------------|--------------------------------|------------------------------------------|
| `value`           | `string`               | —                              | Controlled input value                   |
| `onChange`        | `(v: string) => void`  | —                              | Change handler                           |
| `placeholder`     | `string`               | —                              | Placeholder text                         |
| `label`           | `string`               | `'Label'`                      | Label text                               |
| `showLabel`       | `boolean`              | `true`                         | Toggle label visibility                  |
| `description`     | `string`               | `'Supporting description...'`  | Helper text below label                  |
| `showDescription` | `boolean`              | `true`                         | Toggle description visibility            |
| `error`           | `string`               | `'Error message.'`             | Error text below input                   |
| `showError`       | `boolean`              | `false`                        | Toggle error state                       |
| `icon`            | `'search' \| 'arrow'`  | `'search'`                     | Icon instance (right side)               |
| `showIcon`        | `boolean`              | `true`                         | Toggle icon visibility                   |
| `disabled`        | `boolean`              | `false`                        | Disabled state                           |
| `id`              | `string`               | auto-generated                 | Input id (linked to label htmlFor)       |

## Style Rules

- Border: `1px solid --primitive-gray-300`; error state → `--color-error-border`
- Focus: border → `--primitive-gray-600` + `box-shadow: 0 0 0 2px --primitive-gray-200`
- Error text: `--color-error-text` (`--primitive-red-500: #dc2626`)
- Icon color: muted in default, error color in error state
- Icon padding: `padding-right: --primitive-scale-8` when icon is visible

## Token Sources
- Colors: `context/tokens/color-tokens.json`
- Typography: `context/tokens/typography-tokens.json`
- Sizing: `context/tokens/sizing-tokens.json`

## Red Token Additions

### Primitive (`globals.css`)
```css
--primitive-red-500: #dc2626;
```

### Semantic (`globals.css`)
```css
--color-error-text: var(--primitive-red-500);
--color-error-border: var(--primitive-red-500);
```
