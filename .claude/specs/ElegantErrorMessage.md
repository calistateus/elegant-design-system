# ElegantErrorMessage

`src/components/simple/ElegantErrorMessage.tsx`

## Summary
Inline field-level error display. Shows an `AlertCircle` icon followed by the error text. Used internally by `ElegantTextInput`, `ElegantDropdown`, `ElegantPicklist`, `ElegantWheelPicker`, `ElegantDateInput`, `ElegantCalendarPicker`, `ElegantCheckboxGroup`, and `ElegantRadioGroup`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | `'Something went wrong. Please try again.'` | Error text to display. |

## Appearance
- Icon: `AlertCircle` 12 px, `strokeWidth={1.5}`, `margin-top: 3px` (optical alignment)
- Text: `xs` size, regular weight, 1.5 line-height
- Colour: `--color-error-text` on both icon and text

## Tokens used
- `--color-error-text`
- `--primitive-font-sans`
- `--primitive-font-size-xs`
- `--primitive-font-weight-regular`
- `--primitive-scale-1` — gap between icon and text

## ARIA
- `role="alert"` on the wrapper so screen readers announce it immediately

## Usage example
```tsx
{hasError && <ElegantErrorMessage message="This field is required." />}
```

## Notes
- Render conditionally — it announces itself via `role="alert"` on mount.
- Always pair with `aria-invalid` on the related `<input>` for full accessibility.
