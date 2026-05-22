# ElegantCalendarPicker

`src/components/simple/ElegantCalendarPicker.tsx`

## Summary
Date picker with a popover calendar grid. The trigger shows the formatted selected date or a placeholder. The calendar supports month navigation, `minDate`/`maxDate` constraints, and a "Today" shortcut.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `Date \| null` | — | Controlled selected date. |
| `onChange` | `(date: Date) => void` | — | Called when a date is selected. |
| `label` | `string` | `'Date'` | Label text. |
| `showLabel` | `boolean` | `true` | Whether to render the label. |
| `description` | `string` | `'Select a date.'` | Helper text. |
| `showDescription` | `boolean` | `true` | Whether to render the description. |
| `error` | `string` | `'Error message.'` | Error text. |
| `showError` | `boolean` | `false` | Whether to display the error. |
| `placeholder` | `string` | `'Pick a date…'` | Trigger placeholder when no date selected. |
| `disabled` | `boolean` | `false` | Disables the trigger. |
| `minDate` | `Date` | — | Earliest selectable date. |
| `maxDate` | `Date` | — | Latest selectable date. |

## Trigger
- Shows `formatDate(value)` (e.g. `April 26, 2026`) or `placeholder`
- `Calendar` icon right-anchored (14 px, pointer-events none)
- Same border states as `ElegantDropdown`

## Calendar popover
- `position: absolute`, top `calc(100% + --primitive-scale-1)`, `width: 272px`
- `role="dialog"`, `aria-label="Date picker"`
- Closes on outside `mousedown`

### Month header
- Prev/next `<ChevronLeft>`/`<ChevronRight>` buttons (24 × 24 px)
- Month + year label centred (`sm`, medium weight, `--color-text-title`)

### Day grid
- 7-column grid (`gridTemplateColumns: repeat(7, 1fr)`)
- Day-of-week header: `['Su','Mo','Tu','We','Th','Fr','Sa']`, xs medium, muted
- Leading blank cells for the first day of the month
- Trailing blank cells to complete the last row

### Day cell states

| State | Background | Colour | Border |
|---|---|---|---|
| Default | transparent | `--color-text-body` | transparent |
| Hover | `--primitive-gray-100` | — | — |
| Today | transparent | `--color-text-body` | `1px solid --primitive-gray-300` |
| Selected | `--primitive-black` | `--primitive-white` | transparent |
| Disabled | transparent | `--primitive-gray-300` | transparent, `cursor: not-allowed` |

### Today button
- Centred below the grid, separated by a 1 px line
- Greyed out when today is outside `[minDate, maxDate]`

## View sync
When `value` changes externally, `viewYear` and `viewMonth` update to show the selected date's month.

## Tokens used
- `--primitive-gray-300`, `--primitive-gray-100`, `--primitive-black`, `--primitive-white`
- `--primitive-radius-md`, `--primitive-scale-1` through `--primitive-scale-4`
- `--primitive-font-sans`, `--primitive-font-size-sm`, `--primitive-font-size-xs`
- `--primitive-font-weight-medium`, `--primitive-font-weight-regular`
- `--color-text-title`, `--color-text-body`, `--color-text-muted`
- `--color-error-border`, `--color-border-subtle`
- `--primitive-gray-600`, `--primitive-gray-200` — trigger focus states
- `--primitive-duration-fast`, `--primitive-duration-instant`, `--primitive-easing-default`
- `--motion-dropdown-trigger`

## Usage example
```tsx
<ElegantCalendarPicker
  label="Start date"
  value={startDate}
  onChange={setStartDate}
  minDate={new Date()}
/>
```
