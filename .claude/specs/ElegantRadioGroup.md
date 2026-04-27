# ElegantRadioGroup

`src/components/simple/ElegantRadioGroup.tsx`

## Summary
Labelled group of `ElegantRadio` items inside a `<fieldset>`. Single-selection: selecting one item deselects all others via the `selectedId` prop.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `heading` | `string` | — | Group heading inside `<legend>`. Required. |
| `description` | `string \| false` | — | Optional group description. |
| `items` | `RadioGroupItem[]` | — | Array of radio option configs. Required. |
| `selectedId` | `string` | — | The `id` of the currently selected item. |
| `onChange` | `(id: string) => void` | — | Called with the `id` of the newly selected item. |
| `error` | `string` | — | Group-level error message text. |
| `showError` | `boolean` | `false` | Whether to display the error. |

### `RadioGroupItem`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier. |
| `label` | `string` | Item label. |
| `description` | `string \| false` | Optional per-item helper text. |

## Structure
```
<fieldset>
  <legend>
    <heading>
    [description]
  </legend>
  <div role="radiogroup">
    [ElegantRadio × n]
  </div>
  [ElegantErrorMessage?]
</fieldset>
```

## Tokens used
Same as `ElegantCheckboxGroup`:
- `--size-label-to-description`, `--size-form-group-gap`
- `--primitive-font-sans`, `--primitive-font-size-sm`, `--primitive-font-size-xs`
- `--primitive-font-weight-bold`, `--primitive-font-weight-regular`
- `--color-text-title`, `--color-text-muted`

## ARIA
- Items container: `role="radiogroup"`
- Individual radios: `role` and selection handled by `ElegantRadio`

## Usage example
```tsx
<ElegantRadioGroup
  heading="Billing cycle"
  items={[
    { id: 'monthly', label: 'Monthly', description: 'Billed every 30 days.' },
    { id: 'annual', label: 'Annual', description: 'Save 20% vs monthly.' },
  ]}
  selectedId={billing}
  onChange={setBilling}
/>
```
