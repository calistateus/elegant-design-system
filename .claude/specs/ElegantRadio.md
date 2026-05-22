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
| `name` | `string` | — | Shared name attribute that ties radios into a group, enabling native arrow-key navigation. |
| `value` | `string` | `label` | Value submitted when selected. Defaults to the label text if omitted. |
| `disabled` | `boolean` | `false` | Disables the radio. Applies `opacity: var(--opacity-disabled)`, `cursor: not-allowed`, and uses `--color-interactive-disabled-bg/border` for the circle. Sets both `disabled` and `aria-disabled` on the native input. |

## Visual states

| State | Circle border | Circle background | Inner dot |
|---|---|---|---|
| `unselected` | `--color-border-input` | `--color-bg-main` | none |
| `selected` | `--color-interactive-primary-bg` | `--color-interactive-primary-bg` | 6 px white circle (`--color-interactive-primary-fg`) |
| `disabled` | `--color-interactive-disabled-border` | `--color-interactive-disabled-bg` | none; wrapper `opacity: var(--opacity-disabled)` |

## Tokens used
- `--color-border-input` — unselected circle border
- `--color-bg-main` — unselected circle background
- `--color-interactive-primary-bg` — selected circle border and fill
- `--color-interactive-primary-fg` — inner dot colour
- `--color-interactive-disabled-bg` — disabled circle fill
- `--color-interactive-disabled-border` — disabled circle border
- `--opacity-disabled` — wrapper opacity when disabled
- `--primitive-scale-3` — gap between circle and text
- `--primitive-scale-1` — label-to-description gap
- `--primitive-font-size-sm`, `--primitive-font-size-xs`
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
