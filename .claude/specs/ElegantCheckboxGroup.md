# ElegantCheckboxGroup

`src/components/simple/ElegantCheckboxGroup.tsx`

## Summary
Labelled group of `ElegantCheckbox` instances rendered inside a `<fieldset>`. Supports group-level heading, description, error state, and per-item `onChange` callbacks.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `heading` | `string` | — | Group heading (rendered inside `<legend>`). Required. |
| `description` | `string \| false` | — | Optional group description below the heading. |
| `items` | `CheckboxGroupItem[]` | — | Array of checkbox configs. Required. |
| `onChange` | `(id: string, next: CheckboxState) => void` | — | Called with the item's `id` and new state when any checkbox changes. |
| `error` | `string` | — | Group-level error message text. |
| `showError` | `boolean` | `false` | Whether to display the error. |

### `CheckboxGroupItem`

| Field | Type | Default | Description |
|---|---|---|---|
| `id` | `string` | — | Unique identifier. Used as key and in `onChange`. |
| `label` | `string` | — | Item label. |
| `description` | `string \| false` | — | Optional per-item description. |
| `state` | `CheckboxState` | `'unselected'` | Current checkbox state for this item. |

## Structure
```
<fieldset>
  <legend>
    <heading>
    [description]
  </legend>
  [ElegantCheckbox × n]
  [ElegantErrorMessage?]
</fieldset>
```

## Tokens used
- `--size-label-to-description` — gap between heading and description
- `--size-form-group-gap` — gap between items, and between items and the error
- `--primitive-font-sans`, `--primitive-font-size-sm`, `--primitive-font-size-xs`
- `--primitive-font-weight-bold`, `--primitive-font-weight-regular`
- `--color-text-title`, `--color-text-muted`

## Usage example
```tsx
<ElegantCheckboxGroup
  heading="Preferred contact methods"
  description="Select all that apply."
  items={[
    { id: 'email', label: 'Email', state: selections.email ? 'selected' : 'unselected' },
    { id: 'phone', label: 'Phone', state: selections.phone ? 'selected' : 'unselected' },
  ]}
  onChange={(id, next) => setSelections(prev => ({ ...prev, [id]: next === 'selected' }))}
  showError={!!errors.contact}
  error={errors.contact}
/>
```
