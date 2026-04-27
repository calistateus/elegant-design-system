# ElegantTextInput

`src/components/simple/ElegantTextInput.tsx`

## Summary
Controlled single-line text input with an optional label, description, trailing icon, and inline error state.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Controlled value. |
| `onChange` | `(value: string) => void` | — | Value change handler. |
| `placeholder` | `string` | `'Placeholder…'` | Placeholder text. |
| `showPlaceholder` | `boolean` | `true` | Whether to show the placeholder. |
| `label` | `string` | `'Label'` | Label text. |
| `showLabel` | `boolean` | `true` | Whether to render the label. |
| `description` | `string` | `'Supporting description text.'` | Helper text below the label. |
| `showDescription` | `boolean` | `true` | Whether to render the description. |
| `error` | `string` | `'Error message.'` | Error message text. |
| `showError` | `boolean` | `false` | When true and `error` is non-empty, renders `ElegantErrorMessage`. |
| `icon` | `'search' \| 'arrow'` | `'search'` | Trailing icon — `Search` or `ArrowRight`. |
| `showIcon` | `boolean` | `true` | Whether to render the trailing icon. |
| `disabled` | `boolean` | `false` | Disables the input. |
| `id` | `string` | auto | Explicit `id` for the input. |

## States

| State | Border | Background |
|---|---|---|
| Default | `--primitive-gray-300` | `--primitive-white` |
| Focus | `--primitive-gray-600` + 2 px ring `--primitive-gray-200` | — |
| Error | `--color-error-border` | — |
| Disabled | `--primitive-gray-300` | `--primitive-gray-100`, opacity 0.6 |

## Layout
- Wrapper: column flex, gap `--primitive-scale-1`
- Input padding when icon shown: `y: --primitive-scale-2`, `left: --primitive-scale-3`, `right: --primitive-scale-8`
- Icon: absolute right `--primitive-scale-3`, pointer-events none, `--color-text-muted`

## Tokens used
- `--primitive-gray-300`, `--primitive-gray-600`, `--primitive-gray-200`, `--primitive-gray-100` — borders/backgrounds
- `--primitive-white`
- `--color-error-border`
- `--primitive-radius-md`
- `--primitive-scale-1` through `--primitive-scale-8`
- `--primitive-font-sans`
- `--primitive-font-size-sm`, `--primitive-font-size-xs`
- `--primitive-font-weight-medium`, `--primitive-font-weight-regular`
- `--color-text-title`, `--color-text-body`, `--color-text-muted`

## Usage example
```tsx
<ElegantTextInput
  label="Email"
  placeholder="you@example.com"
  value={email}
  onChange={setEmail}
  showIcon={false}
  showError={!!errors.email}
  error={errors.email}
/>
```

## Notes
- `id` falls back to a randomly generated value — pass an explicit `id` for stable label association.
- Icon is decorative only (`pointer-events: none`).
- Focus ring is applied via inline style in `onFocus`/`onBlur` handlers (no CSS class needed).
