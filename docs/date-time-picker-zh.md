---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantDateTimePicker.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantDateTimePicker.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Despite the component being named "DateTimePicker", there is no time-selection UI — only a date calendar. The name may be aspirational or legacy. Flag for product review.
- Section 5 (States): Keyboard navigation within the open calendar popover is not implemented — arrow keys, Home/End on days, Page Up/Down for month navigation are absent.
- The `minDate`/`maxDate` props are hidden from Storybook controls (non-serializable Date objects) — they need dedicated stories or a date-string adapter.

**Recommended follow-ups:**
- Rename component to `DatePicker` if time selection will never be added, or add time selection to justify the current name.
- Only one story exported. Add named stories for: error state, disabled, with minDate/maxDate, pre-selected value.
- Keyboard navigation within the calendar grid is not implemented — significant accessibility gap.
- The "Today" shortcut is a good affordance; consider documenting it more prominently.
- `minDate`/`maxDate` props use Date objects — verify they work correctly across timezone boundaries.

---

# DateTimePicker

## 1. Overview
A calendar-based date picker that presents a trigger button displaying the selected date and a floating calendar popover for month navigation and day selection.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| When users benefit from seeing a calendar to orient themselves in time | When the user knows the exact date and prefers typing — use DateInput |
| Booking, scheduling, or event creation flows | When time selection is also required — this component is date-only; pair with a separate time input |
| When a min/max date constraint must be visually enforced | When only month and year are needed — a custom solution may serve better |
| Forms where selecting "Today" is a common action | When multiple dates must be selected — no range or multi-select support |

## 3. Anatomy
1. **Label** — `<label>` linked to the trigger button via `htmlFor`.
2. **Description** — Supporting text below the label.
3. **Trigger button** — Full-width `<button aria-haspopup="dialog" aria-expanded>`. Shows placeholder or formatted selected date (e.g., "April 27, 2026").
4. **Calendar icon** — Lucide `Calendar` icon (14 px) anchored to the right edge of the trigger; `pointerEvents: none`.
5. **Calendar popover** — `<div role="dialog" aria-label="Date picker">`. 272 px wide. Contains: month header, day-of-week row, day grid, Today shortcut.
6. **Month header** — Previous/Next month nav buttons with ChevronLeft/ChevronRight icons; current month + year label.
7. **Day-of-week row** — Two-letter abbreviations (Su–Sa) in muted text.
8. **Day grid** — 7-column grid of day cells. Each is a `<button>` showing the day number.
9. **Today button** — Text link at the bottom of the popover; selects today's date.
10. **Error message** — `ElegantErrorMessage` below the trigger when `showError` is active.

`[STORYBOOK BLOCK: Simple/Forms/DateTimePicker/DateTimePicker]`

## 4. Variants

**Default (no value)**
- Trigger shows `placeholder` text in muted color.
- Calendar opens to the current month on first open.

**With selected value**
- Trigger shows the formatted date (e.g., "April 27, 2026") in body text color.
- Calendar opens to the month of the selected date.

## 5. States

| State | Trigger | Day cell | Today button |
|---|---|---|---|
| **Default (closed)** | `1px solid --primitive-gray-300` border; placeholder or formatted date | Transparent bg; body text color | `--color-text-muted` text |
| **Focused / Open** | `--primitive-gray-600` border; `0 0 0 2px --primitive-gray-200` ring | — | — |
| **Day hovered** | — | `--primitive-gray-100` bg; 100 ms | → `--color-text-title` text |
| **Day selected** | — | `--color-interactive-primary-bg` bg; `--color-interactive-primary-fg` text; medium weight | — |
| **Day disabled** | — | `--primitive-gray-300` text; cursor not-allowed | `--primitive-gray-300` text; cursor not-allowed |
| **Error** | `--color-error-border` border; ring suppressed | — | — |
| **Disabled** | `--primitive-gray-100` bg; opacity 0.6; cursor not-allowed | — | — |

**Default (closed)**
- Trigger: `1px solid var(--primitive-gray-300)` border, muted placeholder or formatted date.

**Focused (trigger)**
- Trigger receives keyboard focus: border `var(--primitive-gray-600)`, focus ring `0 0 0 2px var(--primitive-gray-200)`.
- Space/Enter opens the calendar (native button behavior).

**Open (calendar visible)**
- Trigger border: `var(--primitive-gray-600)` with focus ring.
- Calendar popover appears below the trigger with `box-shadow: 0 4px 12px rgba(0,0,0,0.08)`.
- Click outside the container closes the popover via `mousedown` listener.

**Day cell — default**
- Transparent background; body text color; regular weight.

**Day cell — today**
- `1px solid var(--primitive-gray-300)` border; no background fill; differentiates the current date without selecting it.

**Day cell — hovered**
- Background: `var(--primitive-gray-100)`. Transition: `100ms`.

**Day cell — selected**
- Background: `var(--color-interactive-primary-bg)`; text: `var(--color-interactive-primary-fg)`; font weight medium. Selecting closes the popover.

**Day cell — disabled**
- Applies when day falls outside `minDate`/`maxDate` range.
- Text color: `var(--primitive-gray-300)`; cursor `not-allowed`; hover background not applied.

**Nav button hover**
- Previous/Next month buttons: background transitions from transparent to `var(--primitive-gray-100)`.

**Today button hover**
- Text transitions from `var(--color-text-muted)` to `var(--color-text-title)`.
- When today falls outside `minDate`/`maxDate`, button is disabled: text `var(--primitive-gray-300)`, cursor `not-allowed`.

**Error**
- Trigger border: `var(--color-error-border)`; focus ring suppressed.
- `ElegantErrorMessage` renders below.

**Disabled**
- Trigger background: `var(--primitive-gray-100)`, opacity `0.6`, cursor `not-allowed`.
- Clicking does not open the calendar.

`[STORYBOOK BLOCK: Simple/Forms/DateTimePicker/DateTimePicker]`

## 6. Properties

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `Date \| null` | — | No | Controlled selected date. `null` shows the placeholder. |
| `onChange` | `(date: Date) => void` | — | No | Called with a new `Date` object when a day is selected. |
| `label` | `string` | `'Date'` | No | Label text. |
| `showLabel` | `boolean` | `true` | No | When `false`, label is not rendered. |
| `description` | `string` | `'Select a date.'` | No | Supporting description text. |
| `showDescription` | `boolean` | `true` | No | When `false`, description is not rendered. |
| `error` | `string` | `'Error message.'` | No | Error message text. Shown when `showError={true}`. |
| `showError` | `boolean` | `false` | No | When `true` and `error` is non-empty, shows the error state. |
| `placeholder` | `string` | `'Pick a date…'` | No | Text shown in the trigger when no date is selected. |
| `disabled` | `boolean` | `false` | No | Prevents opening the calendar. |
| `minDate` | `Date` | — | No | Earliest selectable date. Days before this date are disabled in the grid. |
| `maxDate` | `Date` | — | No | Latest selectable date. Days after this date are disabled in the grid. |

## 7. Content guidelines
- **Label text:** Use a specific phrase (e.g., "Appointment date", "Event date") rather than the default "Date".
- **Description text:** Optionally explain format or constraints (e.g., "Select a date within the next 30 days.").
- **Placeholder text:** Use an action phrase (e.g., "Pick a date…"). Keep it brief.
- **Error messages:** Describe the validation failure (e.g., "Please select an appointment date." or "Date must be in the future.").
- **Today button:** The label is always "Today" — do not rename via props.
- **Month/year header:** Displays full month name and four-digit year (e.g., "April 2026"). Format is locale-fixed and not configurable.

## 8. Accessibility

**Keyboard navigation**
- Tab focuses the trigger button; Space/Enter opens the calendar.
- Once the calendar is open, keyboard navigation within the day grid is not implemented [significant gap — arrow keys, Home/End, Page Up/Down are absent].
- Tab while the calendar is open will move focus through the nav buttons and Today button in DOM order, then exit the popover (closing it via blur is not implemented — the popover closes only on outside `mousedown`).
- Escape does not close the popover [gap].

**Screen reader behavior**
- Trigger: `aria-haspopup="dialog"`, `aria-expanded={open}`.
- Calendar popover: `role="dialog"`, `aria-label="Date picker"`.
- Day cells: plain `<button>` elements with numeric text — no `aria-label` with full date (e.g., "April 27, 2026") [gap].
- Nav buttons: `aria-label="Previous month"` / `"Next month"` — correct.
- Today button: no `aria-label` — reads "Today" which is sufficient.
- Error message: not linked to the trigger via `aria-describedby` [gap].
- `aria-invalid` is not set on the trigger in error state [gap].

**Color and contrast**
- Selected day: white on `#1e1e1e` — exceeds WCAG AA.
- Today indicator: `1px solid #d4d4d4` border — very subtle; not solely relying on color (shape is the differentiator) but low contrast [verify].
- Disabled day: `#d4d4d4` text on white — fails WCAG AA for text; intentional (non-interactive) — add an alternative indicator if needed.

**Motion**
- Nav button and Today hover: `100ms` / `150ms` ease. No `prefers-reduced-motion` override.

**Touch / pointer**
- Day cells are `aspect-ratio: 1` in a 7-column 272 px grid — approximately 38 px per cell — below 44 px target [gap].
- Nav buttons: `24px × 24px` (1.5rem) — below 44 px target [gap].

**Known gaps**
- No keyboard navigation within the calendar grid.
- No Escape to close the popover.
- Day cells lack accessible date labels.
- `aria-invalid` and `aria-describedby` absent on trigger.
- Day cell and nav button tap targets below 44 px.
- No `prefers-reduced-motion` support.

## 9. Design tokens

| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--primitive-font-sans` | `DM Sans, sans-serif` | All text |
| `--primitive-font-size-sm` | `0.875rem` | Trigger, month header, nav button text |
| `--primitive-font-size-xs` | `0.75rem` | Day-of-week headers, day numbers, Today button |
| `--primitive-font-weight-medium` | `500` | Label, month header, selected day |
| `--primitive-font-weight-regular` | `400` | Default day numbers, trigger text |
| `--color-text-title` | `#1e1e1e` | Label, month header |
| `--color-text-body` | `#171717` | Trigger selected value, nav button icon, day numbers |
| `--color-text-muted` | `#666666` | Description, placeholder, calendar icon, day-of-week headers, Today button (default) |
| `--primitive-black` | `#1e1e1e` | Selected day background |
| `--primitive-white` | `#ffffff` | Selected day text; popover background |
| `--primitive-gray-100` | `#f5f5f5` | Nav button hover; trigger background (disabled) |
| `--primitive-gray-200` | `#e5e5e5` | Focus ring |
| `--primitive-gray-300` | `#d4d4d4` | Default trigger border; today cell border; disabled day text |
| `--primitive-gray-600` | `#666666` | Focused/open trigger border |
| `--color-error-border` | `#dc2626` | Error trigger border |
| `--primitive-radius-md` | `4px` | Trigger, popover, nav button, day cell border radius |
| `--primitive-scale-1` | `0.25rem` | Wrapper gap; between trigger and popover |
| `--primitive-scale-2` | `0.5rem` | Trigger vertical padding; day grid gap; day-of-week header padding |
| `--primitive-scale-3` | `0.75rem` | Month header bottom margin; Today section top padding |
| `--primitive-scale-4` | `1rem` | Popover padding |
| `--primitive-scale-8` | `2rem` | Trigger right padding (calendar icon clearance) |
| `--motion-dropdown-trigger` | `border-color 150ms ease, box-shadow 150ms ease` | Trigger transition |
| `--shadow-popover` | `0 4px 12px rgba(0,0,0,0.08)` | Popover shadow |

## 10. Responsive behavior
The trigger is `width: 100%` and fills its container. The calendar popover is fixed at `272px` wide and left-aligned to the trigger. On narrow viewports (<272 px), the popover may overflow the viewport — no responsive repositioning logic exists [NEEDS CONFIRMATION — recommend adding viewport boundary detection or right-aligning on narrow viewports]. The Storybook story adds `paddingBottom: 360px` to the decorator to prevent the popover from being clipped.

## 11. Composition and usage patterns

**Appointment scheduling**
Use with `minDate={today}` to prevent selecting past dates, and `maxDate` to cap the booking window. Set a descriptive error like "Please select an appointment date." and trigger `showError` on form submission.

**Event date selection**
Use without min/max constraints. Wire `onChange` to update a parent form state object. Pair with a time field (currently a separate component or raw input) if time is needed.

**Filtering by date**
Mount the picker without a label in a filter bar context (`showLabel={false}`), use `placeholder="Filter by date…"`, and wire `onChange` to re-fetch or re-filter data. Clear by passing `value={null}`.

`[STORYBOOK BLOCK: Simple/Forms/DateTimePicker/DateTimePicker]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [DateInput](/design-system/docs/date-input-zh) | When the user prefers typing dates directly (keyboard-first, no calendar) |
| [WheelPicker](/design-system/docs/wheel-picker-zh) | When a scroll-drum metaphor is better suited (mobile-native, time/date columns) |
| [TextInput](/design-system/docs/text-input-zh) | When the date format is free-form or non-standard |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Set a specific label (e.g., "Appointment date") rather than the default "Date". | Use the generic "Date" label without context — users may not know what date is being requested. |
| Use `minDate` and `maxDate` to enforce business rules visually — disabled days are visually distinct. | Rely solely on external validation to catch out-of-range dates; the visual cue in the picker prevents the error before it happens. |
| Add `paddingBottom` to the popover's parent container in layouts where the picker sits near the bottom of the viewport. | Let the popover render off-screen — users will see a clipped calendar with no way to navigate. |
| Handle the `null` value state — `onChange` receives a `Date` only on selection; initialise parent state as `null`. | Pass `undefined` as `value` while also managing state externally — treat `null` as "no date selected". |
| Set a specific error message after form validation failure (e.g., "Please select a date."). | Leave `error` at the default "Error message." — always supply meaningful copy. |
| Test the picker with keyboard-only navigation before shipping — keyboard support within the calendar is currently limited. | Assume the picker is fully keyboard accessible in its current state — arrow key navigation within the grid is not yet implemented. |

## 14. Changelog

**2026-04-27** — Replace `--primitive-black` with `--color-interactive-primary-bg` in DayCell selected state; replace `--primitive-gray-100` with `--color-border-default` in Today separator
