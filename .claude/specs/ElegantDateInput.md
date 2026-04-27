# ElegantDateInput

`src/components/simple/ElegantDateInput.tsx`

## Summary
Segmented date input with separate MM, DD, and optional YYYY fields. Auto-advances focus between segments. Performs inline validation (month 1–12, day 1–max for the given month). Invalid values are clamped on blur.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Controlled value — `"MM/DD"` or `"MM/DD/YYYY"` based on `showYear`. |
| `onChange` | `(value: string) => void` | — | Called on every segment change. |
| `showYear` | `boolean` | `true` | Whether to render the year segment. |
| `label` | `string` | `'Date'` | Label text. |
| `showLabel` | `boolean` | `true` | Whether to render the label. |
| `description` | `string` | `'Enter a date.'` | Helper text. |
| `showDescription` | `boolean` | `true` | Whether to render the description. |
| `error` | `string` | `'Error message.'` | External error text. |
| `showError` | `boolean` | `false` | Whether to display the external error. |
| `disabled` | `boolean` | `false` | Disables all segments. |
| `id` | `string` | auto (`useId`) | Explicit label id. |

## Segments

| Segment | Input width | Max chars | Placeholder |
|---|---|---|---|
| Month | 3.5 rem | 2 | `MM` |
| Day | 3.5 rem | 2 | `DD` |
| Year (optional) | 5 rem | 4 | `YYYY` |

## Validation
- **Month**: error when value < 1 or > 12. Clamped on blur.
- **Day**: error when value < 1 or > `maxDaysInMonth(month, year)`. Clamped on blur. Re-validated when month or year changes.
- Leap year aware: February allows 29 days when `year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)`.

## Focus navigation
- Auto-advance: month → day on 2-digit month, day → year on 2-digit day (when `showYear`)
- Keyboard: `→` advances to next segment, `←` and `Backspace` (empty) retreat to previous
- Clicking the label focuses the month field

## Error precedence
Internal errors (month/day) take priority over the external `error` prop.

## Segment border states (same as `ElegantTextInput`)

| State | Border | Shadow |
|---|---|---|
| Default | `--primitive-gray-300` | none |
| Focused | `--primitive-gray-600` | `0 0 0 2px --primitive-gray-200` |
| Error | `--color-error-border` | none |
| Disabled | `--primitive-gray-300`, `--primitive-gray-100` bg, opacity 0.6 | — |

## Tokens used
- `--primitive-gray-300`, `--primitive-gray-600`, `--primitive-gray-200`, `--primitive-gray-100`
- `--primitive-white`, `--primitive-radius-md`
- `--primitive-scale-1`, `--primitive-scale-2`, `--primitive-scale-3`
- `--primitive-font-sans`, `--primitive-font-size-sm`, `--primitive-font-weight-regular`
- `--color-text-title`, `--color-text-body`, `--color-text-muted`
- `--color-error-border`

## ARIA
- Each segment: `aria-label` ("Month", "Day", "Year"), `aria-invalid`
- Label clicks focus the month input via `onClick`

## Usage example
```tsx
<ElegantDateInput
  label="Date of birth"
  value={dob}
  onChange={setDob}
  showYear
  showError={!!errors.dob}
  error={errors.dob}
/>

// Month + day only
<ElegantDateInput label="Anniversary" value={anniversary} onChange={setAnniversary} showYear={false} />
```
