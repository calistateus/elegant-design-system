---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantWheelPicker.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantWheelPicker.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): The scroll-settle behavior fires `onChange` after a 120 ms debounce. This means `onChange` may fire during rapid keyboard navigation even before the user has finished. Confirm this is acceptable.
- Section 6 (Properties): `columns` is a required prop in practice (the component renders nothing useful without it) but TypeScript marks it as required — the stories file wraps it with a `Demo` component. The prop type and required status are inferred from source.
- Section 8 (Accessibility): The WheelDrum uses `role="listbox"` and each item is `role="option"`, which is correct. However, `aria-label` on the listbox is missing — screen readers cannot announce the column's purpose without it.

**Recommended follow-ups:**
- Only one story exported (switches between `preset: 'time'` and `preset: 'date'` via a control). Add named stories for: time (HH:MM AM/PM), date (Month/Day/Year), minimal (single column), error state, disabled.
- The `columns` prop ties scroll position to an index value — document that the caller must translate index → actual value (e.g., `HOURS[hourIndex]`).
- Consider adding `aria-label` to each WheelDrum div and setting `aria-valuetext` on the selected option.
- The scroll-snap implementation hides the scrollbar (`.elegant-wheel-scroll::-webkit-scrollbar { display: none }`), which may reduce discoverability on desktop. Consider a visual affordance (e.g., subtle fade or scroll indicator).
- `itemHeight` and `columnWidth` are designer-facing — document recommended values prominently.

---

# WheelPicker

## 1. Overview
A scroll-drum picker composed of one or more independently scrollable columns, used for selecting values from ordered lists such as time (HH:MM AM/PM) or date (Month/Day/Year) on pointer and keyboard interfaces.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Time selection (hours, minutes, AM/PM) | Single-option fields — use Dropdown for fewer than ~8 options |
| Date selection in mobile-native-style UIs | Unordered or non-numeric lists where scroll order conveys no meaning |
| Picking from a long ordered list where scroll is natural (1–60) | When users need to type a value — use DateInput or TextInput |
| Compact multi-column pickers where vertical space is limited | When min/max date constraints must be enforced visually — use DateTimePicker |

## 3. Anatomy
1. **Label** — `<label>` above the picker shell.
2. **Description** — Supporting text below the label.
3. **Picker shell** — A bordered, rounded container that clips the drums. `border: 1px solid var(--primitive-gray-300)` (or error red).
4. **Column header row** — Optional row of column labels (e.g., "Hour", "Minute") rendered above the drums. Only shown when at least one `WheelColumn` has a `label`.
5. **Selection highlight** — A full-width horizontal band in `var(--primitive-gray-100)` centered on the middle row; visually indicates the selected position.
6. **Top fade / Bottom fade** — Gradient overlays fading non-selected rows to white, reinforcing the "drum" illusion.
7. **WheelDrum** — Each independently scrollable column (`role="listbox"`, `tabIndex={0}`). Scroll-snap enforces item alignment.
8. **Option item** — Each row within a drum (`role="option"`, `aria-selected`). Opacity varies by distance from center: 1 (selected), 0.5 (adjacent), 0.25 (outer).
9. **Error message** — `ElegantErrorMessage` below the picker shell when `showError` is active.

`[STORYBOOK BLOCK: Simple/Forms/WheelPicker/WheelPicker]`

## 4. Variants

**Time picker (HH:MM AM/PM)**
- Two or three columns: Hour (01–12), Minute (00–59), and optionally AM/PM.
- Use for time-of-day selection in scheduling, booking, or alarm interfaces.
- Set `columns` to the appropriate data arrays; `label="Time"`.

`[STORYBOOK BLOCK: Simple/Forms/WheelPicker/WheelPicker]`

**Date picker (Month / Day / Year)**
- Two or three columns: Month name, Day (1–31), and optionally Year.
- Use for compact date selection without a calendar grid.
- Set `columns` to the date data arrays; `label="Date"`.

`[STORYBOOK BLOCK: Simple/Forms/WheelPicker/WheelPicker]`

**Single column**
- One drum; useful for picking a single ordered value (e.g., quantity 1–99).
- Pass a single-element `columns` array; no column header is rendered unless `label` is set on the column.

`[STORYBOOK BLOCK: Simple/Forms/WheelPicker/WheelPicker]`

## 5. States

**Default**
- Triggered: on initial render.
- Visually: each drum scrolled to the index matching `value` in each column; selection highlight centered on the middle row; top/bottom fades applied.
- Behavior: drums are individually scrollable.

**Scrolling**
- Triggered: user scrolls or drags a drum.
- Visually: drum scrolls; opacity values transition as items move relative to center.
- Behavior: a 120 ms debounced timeout fires after scroll settles, snaps to the nearest item, and calls `onChange` with the new index.

**Keyboard active (drum focused)**
- Triggered: user tabs to a drum or it receives programmatic focus.
- Visually: each drum/scroll column has `outline: none` applied — the browser default focus ring is explicitly suppressed and no custom ring is provided. The drum is keyboard-scrollable (focus moves to the drum div) but invisible when focused. This is a known gap.
- Behavior: ArrowUp decrements index (min 0); ArrowDown increments index (max `items.length - 1`); `onChange` fires immediately.

**External value change**
- Triggered: parent updates the `value` index on a column.
- Visually: drum smoothly scrolls to the new position (`behavior: 'smooth'`) when the new position differs from current scroll by more than 2 px.

**Error**
- Triggered: `showError={true}` and `error` is non-empty.
- Visually: picker shell border becomes `var(--color-error-border)`; `ElegantErrorMessage` renders below.

**Disabled**
- Triggered: `disabled={true}`.
- Visually: all drums: opacity `0.45`, `overflow-y: hidden`, cursor `not-allowed`.
- Behavior: `onChange` calls are silently dropped (replaced with a no-op). Keyboard events are blocked. `tabIndex={-1}` on drums.

`[STORYBOOK BLOCK: Simple/Forms/WheelPicker/WheelPicker]`

## 6. Properties

### ElegantWheelPickerProps

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `columns` | `WheelColumn[]` | — | Yes | Array of column definitions. Each column renders one scroll drum. |
| `label` | `string` | `'Select'` | No | Label text above the picker. |
| `showLabel` | `boolean` | `true` | No | When `false`, label is not rendered. |
| `description` | `string` | `'Scroll to select a value.'` | No | Supporting description text. |
| `showDescription` | `boolean` | `true` | No | When `false`, description is not rendered. |
| `error` | `string` | `'Error message.'` | No | Error message text. Shown when `showError={true}`. |
| `showError` | `boolean` | `false` | No | When `true` and `error` is non-empty, shows the error state. |
| `disabled` | `boolean` | `false` | No | Disables all drums. |
| `visibleCount` | `number` | `3` | No | Number of rows visible at once. Must be odd (3, 5, 7) so the center row is the selected one. |
| `itemHeight` | `number` (px) | `40` | No | Height of each item row in pixels. |
| `columnWidth` | `number` (px) | `72` | No | Width of each drum column in pixels. |

### WheelColumn (column definition object)

| Field | Type | Required | Description |
|---|---|---|---|
| `items` | `string[]` | Yes | Ordered list of string values to display in the column. |
| `value` | `number` | Yes | Currently selected index within `items`. |
| `onChange` | `(index: number) => void` | Yes | Called with the new selected index after scroll settles or keyboard navigation. |
| `label` | `string` | No | Optional column header label (e.g., "Hour", "Minute"). |

## 7. Content guidelines
- **Label text:** Name the type of selection (e.g., "Time", "Date", "Quantity"). Avoid generic labels.
- **Description text:** One sentence; guide the interaction (e.g., "Scroll each column to pick a value.").
- **Column header labels:** Use short nouns (e.g., "Hour", "Min", "AM/PM", "Month", "Day", "Year"). Keep consistent casing.
- **Item strings:** Use consistent formatting — zero-pad numbers (e.g., "01", "02") or full names (e.g., "January"). The component renders strings verbatim; formatting is the caller's responsibility.
- **Error messages:** Describe what needs to be corrected (e.g., "Please select a valid time.").

## 8. Accessibility

**Keyboard navigation**
- Tab moves focus to each drum in sequence.
- ArrowUp and ArrowDown move the selection by one step. `onChange` fires immediately on keypress.
- Home, End, Page Up/Down are not implemented [NEEDS CONFIRMATION — gap].
- When disabled, drums have `tabIndex={-1}` and key events are blocked.

**Screen reader behavior**
- Each drum has `role="listbox"` and `tabIndex={0}`.
- `aria-label` is not set on the listbox — screen readers cannot announce the column name without it [gap — recommend `aria-label={col.label ?? label}`].
- Each item: `role="option"`, `aria-selected={i === value}` — correct.
- Selection highlight and fade overlays have `aria-hidden` — correct.
- The label `<label>` points to the picker shell `<div id="wheel-{uid}">`, not to any interactive element — clicking the label does not focus a drum [gap].

**Color and contrast**
- Selected item: `opacity: 1`, regular text color — meets contrast.
- Adjacent items: `opacity: 0.5` — contrast ratio of `#171717` at 50% opacity on white is approximately 4.5:1 at large sizes, borderline at 14 px [verify].
- Outer items: `opacity: 0.25` — below WCAG AA threshold; these are intentionally non-interactive decorative items.

**Motion**
- Scroll and smooth-scroll on external value change. Opacity transitions at `200ms`.
- No `prefers-reduced-motion` override — recommend disabling smooth scroll and opacity transitions when motion is reduced.

**Touch / pointer**
- Native touch scroll is the primary interaction — `scroll-snap-type: y mandatory` ensures items snap cleanly on mobile. Touch scroll works on mobile.
- Individual items are not interactive (no click handler) — selection happens by scroll position only, which is appropriate for the drum metaphor.

**Known gaps**
- No `aria-label` on drum listboxes.
- Focus ring explicitly suppressed (`outline: none`) with no custom replacement — drums are focused but invisible when navigated by keyboard.
- `<label>` is not linked to an interactive element.
- No `prefers-reduced-motion` support.
- Home/End/PageUp/PageDown not implemented.

## 9. Design tokens

| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--primitive-font-sans` | `DM Sans, sans-serif` | All text |
| `--primitive-font-size-sm` | `0.875rem` | Label, item text |
| `--primitive-font-size-xs` | `0.75rem` | Description, column header labels |
| `--primitive-font-weight-medium` | `500` | Label, column headers, selected item |
| `--primitive-font-weight-regular` | `400` | Non-selected items |
| `--color-text-title` | `#1e1e1e` | Label color |
| `--color-text-body` | `#171717` | Item text color |
| `--color-text-muted` | `#666666` | Description, column header text |
| `--primitive-white` | `#ffffff` | Shell background; fade overlay color |
| `--primitive-gray-100` | `#f5f5f5` | Selection highlight band |
| `--primitive-gray-200` | `#e5e5e5` | Selection highlight top/bottom border; column dividers |
| `--primitive-gray-300` | `#d4d4d4` | Picker shell border (default) |
| `--color-error-border` | `#dc2626` | Picker shell border (error) |
| `--primitive-radius-md` | `4px` | Picker shell border radius |
| `--primitive-scale-1` | `0.25rem` | Wrapper gap |
| `--primitive-scale-2` | `0.5rem` | Column header padding |
| `--primitive-scale-2` (inline) | `0.5rem` | Item inline padding |
| `--primitive-duration-base` | `200ms` | Item opacity transition |
| `--primitive-easing-default` | `ease` | Item opacity easing |

## 10. Responsive behavior
The picker shell is `alignSelf: flex-start` and its width is determined by `columnWidth × numberOfColumns` plus borders. It does not stretch to fill its container — place it in a flex or grid parent and control alignment explicitly. On mobile, the native scroll behavior works well; ensure the parent does not clip overflow. `visibleCount` controls the height of the picker (via `drumHeight = visibleCount × itemHeight`); prefer `visibleCount={3}` (default, 120 px at 40 px rows) on compact layouts.

## 11. Composition and usage patterns

**Time of day (HH:MM AM/PM)**
Three columns: hours (01–12), minutes (00–59), period (AM/PM). All columns independently scrollable. Wire each column's `onChange` to its respective state variable. Derive a final time string from the three state values.

```
// Pattern only — do not copy verbatim
const timeString = `${HOURS[hour]}:${MINUTES[minute]} ${PERIODS[period]}`;
```

**Full date (Month / Day / Year)**
Three columns. Note that Day validity (e.g., max 28 for February) must be enforced in the parent — the component does not cross-validate columns.

**Single-column quantity picker**
Pass one column with `items={quantities}`, `value={quantityIndex}`, `onChange={setQuantityIndex}`. No column header required. Use `columnWidth={56}` for compact layouts.

**Disabled state in a form**
Set `disabled={true}` on the top-level component to prevent all column interaction. Pair with a visible explanation of why the field is disabled.

`[STORYBOOK BLOCK: Simple/Forms/WheelPicker/WheelPicker]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| DateTimePicker | When a calendar grid is preferred over scroll drums for date selection |
| DateInput | When the user prefers typing a date directly |
| Dropdown | When selecting from a short, unordered list (fewer than ~8 options) |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Always use odd numbers for `visibleCount` (3, 5, 7) so the center row is unambiguously the selected item. | Set `visibleCount` to an even number — the selection highlight will not align to a center row. |
| Zero-pad numeric items to a consistent width (e.g., "01", "02") so the drum does not jump in width as values scroll. | Mix padded and unpadded strings (e.g., "1", "02", "10") — visual inconsistency undermines the drum illusion. |
| Manage each column's `value` and `onChange` as independent state variables in the parent. | Try to put all column state into a single derived value without tracking indexes separately — the component API is index-based. |
| Validate cross-column combinations in the parent (e.g., February cannot have 31 days). | Assume the WheelPicker enforces any value relationships between columns — it does not. |
| Keep column labels concise: "Hour", "Min", "AM/PM". Use them consistently when multiple columns have related meaning. | Omit column labels for multi-column pickers where the columns' purposes are not self-evident. |
| Test scroll-settle behavior on both mouse and touch: scrolling fast may result in `onChange` firing mid-scroll. | Treat the first `onChange` call as the final committed value when the user may still be scrolling — debounce or defer downstream effects. |

## 14. Changelog

**2026-04-27** — Replace `--primitive-gray-100` with `--color-border-default` for column header dividers and `--color-interactive-hover-bg` for selection highlight; add `aria-label` to each drum listbox
