# ElegantRadio

`src/components/simple/ElegantRadio.tsx`

## Summary
Single radio button (circular). Two states: `unselected` / `selected`. No `indeterminate` state. Mirrors `ElegantCheckbox` in layout and token usage but uses a circle indicator instead of a checkmark.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Radio label. Required. |
| `description` | `string \| false` | — | Optional helper text below the label. |
| `radioState` | `'unselected' \| 'selected'` | `'unselected'` | Current state. |
| `onClick` | `() => void` | — | Click handler. When absent, radio is read-only. |

## Visual states

| State | Circle border | Circle background | Inner dot |
|---|---|---|---|
| `unselected` | `--primitive-gray-300` | `--primitive-white` | none |
| `selected` | `--color-interactive-primary-bg` | `--color-interactive-primary-bg` | 6 px white circle (`--color-interactive-primary-fg`) |

## Tokens used
Same as `ElegantCheckbox`:
- `--primitive-gray-300`, `--primitive-white`
- `--color-interactive-primary-bg`, `--color-interactive-primary-fg`
- `--primitive-scale-3` — gap between circle and text
- `--primitive-scale-1` — label-to-description gap
- `--primitive-font-sans`, `--primitive-font-size-sm`, `--primitive-font-size-xs`
- `--primitive-font-weight-medium`, `--primitive-font-weight-regular`
- `--color-text-title`, `--color-text-muted`

## Usage example
```tsx
<ElegantRadio
  label="Monthly billing"
  description="Billed once a month."
  radioState={billing === 'monthly' ? 'selected' : 'unselected'}
  onClick={() => setBilling('monthly')}
/>
```

## Notes
- Always use inside `ElegantRadioGroup` for correct `fieldset`/`radiogroup` semantics.
- Circle is `aria-hidden="true"` — group-level ARIA handles accessibility.
