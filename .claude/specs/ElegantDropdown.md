# ElegantDropdown

`src/components/simple/ElegantDropdown.tsx`

## Summary
Single-select dropdown (custom `<button>` trigger + `<ul role="listbox">`). Supports label, description, placeholder, error state, and disabled state.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `DropdownOption[]` | `[]` | List of options. |
| `value` | `string` | — | Controlled selected value. |
| `onChange` | `(value: string) => void` | — | Selection handler. |
| `placeholder` | `string` | `'Select…'` | Placeholder text shown when nothing is selected. |
| `showPlaceholder` | `boolean` | `true` | Whether to show the placeholder. |
| `label` | `string` | `'Label'` | Label text. |
| `showLabel` | `boolean` | `true` | Whether to render the label. |
| `description` | `string` | `'Supporting description text.'` | Helper text. |
| `showDescription` | `boolean` | `true` | Whether to render the description. |
| `error` | `string` | `'Error message.'` | Error message text. |
| `showError` | `boolean` | `false` | Whether to display the error. |
| `disabled` | `boolean` | `false` | Disables the trigger. |
| `id` | `string` | auto | Explicit trigger id. |

### `DropdownOption`
```ts
{ label: string; value: string }
```

## Trigger border states

| State | Border | Shadow |
|---|---|---|
| Default | `--primitive-gray-300` | none |
| Focused/open (no error) | `--primitive-gray-600` | `0 0 0 2px --primitive-gray-200` |
| Error | `--color-error-border` | none |
| Disabled | `--primitive-gray-300` | opacity 0.6, `--primitive-gray-100` bg |

## Chevron
- Rotates 180° when open — `transform: rotate(180deg)`, transition 150 ms
- Positioned absolute right `--primitive-scale-3`

## Listbox
- `position: absolute`, top `calc(100% + --primitive-scale-1)`
- `max-height: 240px`, `overflow-y: auto`
- Box shadow: `0 4px 12px rgba(0,0,0,0.08)`
- Selected item: `--primitive-gray-100` background, medium weight
- Hovered item: `--primitive-gray-50` background
- Closes on outside `mousedown`

## Tokens used
- `--primitive-gray-300`, `--primitive-gray-600`, `--primitive-gray-200`, `--primitive-gray-100`, `--primitive-gray-50`
- `--primitive-white`
- `--color-error-border`
- `--primitive-radius-md`
- `--primitive-scale-1`, `--primitive-scale-2`, `--primitive-scale-3`, `--primitive-scale-8`
- `--primitive-font-sans`, `--primitive-font-size-sm`, `--primitive-font-weight-medium`, `--primitive-font-weight-regular`
- `--color-text-title`, `--color-text-body`, `--color-text-muted`

## ARIA
- Trigger: `aria-haspopup="listbox"`, `aria-expanded`
- Listbox: `role="listbox"`
- Options: `role="option"`, `aria-selected`

## Usage example
```tsx
<ElegantDropdown
  label="Country"
  options={[{ label: 'Australia', value: 'au' }, { label: 'Canada', value: 'ca' }]}
  value={country}
  onChange={setCountry}
  showError={!!errors.country}
  error={errors.country}
/>
```
