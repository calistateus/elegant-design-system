# ElegantCheckbox

`src/components/simple/ElegantCheckbox.tsx`

## Summary
Single checkbox with three states: `unselected`, `selected`, `indeterminate`. Optional description below the label. Clicking toggles between `unselected` ↔ `selected` (indeterminate is only settable externally).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Checkbox label. Required. |
| `description` | `string \| false` | — | Optional helper text below the label. |
| `checkboxState` | `CheckboxState` | `'unselected'` | Current state. |
| `onChange` | `(next: CheckboxState) => void` | — | State change handler. When absent, checkbox is read-only. |

### `CheckboxState`
`'unselected' \| 'selected' \| 'indeterminate'`

## Visual states

| State | Box border | Box background | Inner mark |
|---|---|---|---|
| `unselected` | `--primitive-gray-300` | `--primitive-white` | none |
| `selected` | `--color-interactive-primary-bg` | `--color-interactive-primary-bg` | SVG checkmark |
| `indeterminate` | `--color-interactive-primary-bg` | `--color-interactive-primary-bg` | 8 × 1.5 px dash |

Checkmark path: `M1 3.5L3.8 6.5L9 1`, stroke `--color-interactive-primary-fg`, width 1.5.

## Tokens used
- `--primitive-gray-300` — unselected border
- `--primitive-white` — unselected background
- `--color-interactive-primary-bg` — checked/indeterminate border and background
- `--color-interactive-primary-fg` — checkmark and dash colour
- `--primitive-radius-sm` — box border radius
- `--primitive-scale-3` — gap between box and label
- `--primitive-scale-1` — label-to-description gap
- `--primitive-font-sans`, `--primitive-font-size-sm`, `--primitive-font-size-xs`
- `--primitive-font-weight-medium`, `--primitive-font-weight-regular`
- `--color-text-title`, `--color-text-muted`

## State transition
Click → `nextState()`:
- `selected` → `unselected`
- `unselected` → `selected`
- `indeterminate` → `selected`

## Usage example
```tsx
<ElegantCheckbox
  label="Subscribe to newsletter"
  description="We'll email you product updates."
  checkboxState={subscribed ? 'selected' : 'unselected'}
  onChange={(next) => setSubscribed(next === 'selected')}
/>
```

## Notes
- Box is `aria-hidden="true"` — screenreaders rely on the parent click handler pattern; add a `<input type="checkbox">` visually hidden for full a11y if needed.
- When `onChange` is absent, `cursor: default` and no click handler is attached.
