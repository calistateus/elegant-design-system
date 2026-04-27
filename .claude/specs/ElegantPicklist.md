# ElegantPicklist

`src/components/simple/ElegantPicklist.tsx`

## Summary
Multi-select dropdown. Selected values are displayed as removable pill tags inside the trigger. The listbox shows a checkmark beside each selected option.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `PicklistOption[]` | `[]` | Available options. |
| `value` | `string[]` | `[]` | Controlled array of selected values. |
| `onChange` | `(value: string[]) => void` | — | Selection change handler. |
| `placeholder` | `string` | `'Select…'` | Shown when no options are selected. |
| `showPlaceholder` | `boolean` | `true` | Whether to show the placeholder. |
| `label` | `string` | `'Label'` | Label text. |
| `showLabel` | `boolean` | `true` | Whether to render the label. |
| `description` | `string` | `'Supporting description text.'` | Helper text. |
| `showDescription` | `boolean` | `true` | Whether to render the description. |
| `error` | `string` | `'Error message.'` | Error message text. |
| `showError` | `boolean` | `false` | Whether to display the error. |
| `disabled` | `boolean` | `false` | Disables the trigger. |
| `id` | `string` | auto (`useId`) | Explicit trigger id. |

### `PicklistOption`
```ts
{ label: string; value: string }
```

## Trigger
- `min-height: 36px`, wraps selected pills
- Padding adjusts when pills are present vs empty
- `ChevronDown` rotates 180° when open

## Selected pills
- `--primitive-gray-100` background, `--primitive-radius-full`
- `xs` text, medium weight, max-width 140 px with ellipsis
- `X` (10 px) remove button on each pill — calls `onChange` without the removed value

## Listbox
- Same shadow/border/radius as `ElegantDropdown`
- Selected item: `--primitive-gray-100` bg, medium weight, `Check` icon (accent colour)
- Hovered unselected: `--primitive-gray-50`
- `aria-multiselectable="true"` on both trigger and listbox

## Tokens used
- `--primitive-gray-300`, `--primitive-gray-600`, `--primitive-gray-200`, `--primitive-gray-100`, `--primitive-gray-50`
- `--primitive-white`, `--color-error-border`
- `--primitive-radius-md`, `--primitive-radius-full`
- `--primitive-scale-1` through `--primitive-scale-8`
- `--primitive-font-sans`, `--primitive-font-size-sm`, `--primitive-font-size-xs`
- `--primitive-font-weight-medium`, `--primitive-font-weight-regular`
- `--color-text-title`, `--color-text-body`, `--color-text-muted`, `--color-text-accent`
- `--motion-dropdown-trigger`, `--motion-dropdown-chevron`, `--motion-dropdown-item`

## ARIA
- Trigger: `aria-haspopup="listbox"`, `aria-expanded`, `aria-multiselectable="true"`
- Pills: `role="button"`, `aria-label="Remove {label}"`
- Listbox: `role="listbox"`, `aria-multiselectable="true"`
- Options: `role="option"`, `aria-selected`

## Usage example
```tsx
<ElegantPicklist
  label="Skills"
  options={[{ label: 'TypeScript', value: 'ts' }, { label: 'React', value: 'react' }]}
  value={skills}
  onChange={setSkills}
/>
```
