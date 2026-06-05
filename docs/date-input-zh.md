---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantDateInput.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantDateInput.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 4 (Variants): Only two variants are derivable from source (`showYear={true}` and `showYear={false}`). The stories file sets `showYear` as a default arg but it is not in the story's `args` object — the default is controlled by the component prop default (`showYear = true`). Verify default story reflects both variants.
- Section 5 (States): Out-of-range month/day values are auto-clamped on blur — document this behavior carefully so product stakeholders are aware.

**Recommended follow-ups:**
- Only one story exported. Add named stories for: `showYear={false}` (month/day only), error state, disabled, pre-populated value.
- The `label` element uses `onClick` to focus the month input because the `htmlFor` points to a `<div>` (the wrapper `id={labelId}`), not an input. The label's `for` attribute should point to the first focusable input to be semantically correct.
- No min/max date constraints — consider adding `minDate`/`maxDate` props if form context requires date range validation.
- Leap year awareness exists for February — document prominently.

---

# DateInput

## 1. Overview
A segmented date input composed of discrete MM, DD, and optional YYYY fields, providing a lightweight keyboard-driven date entry experience without a calendar picker.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Forms requiring manual date entry (DOB, start date) | When browsing or picking from a calendar is preferred — use DateTimePicker |
| When the user knows the exact date and typing is faster | When only month and year are needed — a custom segmented input may serve better |
| Month/day-only dates (anniversaries, recurring events) via `showYear={false}` | When time selection is also needed — use DateTimePicker |
| Accessible, keyboard-centric form flows | When a date range (start + end) is required — two instances may work |

## 3. Anatomy
1. **Label** — Clicking it focuses the Month segment. Linked via `htmlFor` to the segment wrapper div.
2. **Description** — Supporting text below the label.
3. **Month segment** — `<input type="text" inputMode="numeric">` with `maxLength={2}` and `aria-label="Month"`. Placeholder "MM".
4. **Day segment** — `<input type="text" inputMode="numeric">` with `maxLength={2}` and `aria-label="Day"`. Placeholder "DD".
5. **Year segment** — `<input type="text" inputMode="numeric">` with `maxLength={4}` and `aria-label="Year"`. Placeholder "YYYY". Shown only when `showYear={true}`.
6. **Error message(s)** — One `ElegantErrorMessage` per distinct error (month error, day error, or external error). Multiple errors can display simultaneously.

`[STORYBOOK BLOCK: Simple/Forms/DateInput/DateInput]`

## 4. Variants

**Full date (MM / DD / YYYY) — default**
- Three segments rendered side by side.
- Use for birth dates, event dates, or any context requiring a complete calendar date.
- Default: `showYear={true}`.

**Month and day only (MM / DD)**
- Year segment is not rendered. The emitted value format is `"MM/DD"`.
- Use for recurring annual events (birthdays without year, anniversaries).
- Set `showYear={false}`.

## 5. States

| State | Border | Focus ring | Background |
|---|---|---|---|
| **Default (empty)** | `--primitive-gray-300` | None | White |
| **Segment focused** | `--primitive-gray-600` | `0 0 0 2px var(--primitive-gray-200)` | White |
| **Validation error** | Error-red | — | White |
| **Disabled** | `--color-interactive-disabled-border` | Suppressed | `--color-interactive-disabled-bg`; opacity 0.5; cursor not-allowed |

**Default (empty)**
- All segments show their placeholder ("MM", "DD", "YYYY") with default borders.
- Behavior: Tab moves focus to the Month segment.

**Segment focused**
- Triggered: any segment receives focus.
- Visually: that segment's border becomes `var(--primitive-gray-600)`; focus ring `0 0 0 2px var(--primitive-gray-200)` appears; placeholder is hidden.
- Behavior: placeholder clears on focus; returns on blur if value is empty.

**Auto-advance**
- Triggered: user finishes typing 2 digits in Month — focus automatically moves to Day; 2 digits in Day moves focus to Year (when `showYear={true}`).
- Visually: seamless — no visible animation.
- Behavior: implemented by calling `dayRef.current?.focus()` inside `handleMonthChange`.

**Keyboard navigation between segments**
- ArrowRight at the end of Month → moves to Day.
- ArrowLeft at the start of Day → moves to Month.
- Backspace on an empty Day field → moves to Month.
- ArrowRight at end of Day → moves to Year (when shown).
- ArrowLeft at start of Year → moves to Day.
- Backspace on an empty Year → moves to Day.

**Inline validation (month)**
- Triggered: month value is 2 digits and outside 1–12.
- Visually: Month border turns error-red; error message appears below.
- On blur: out-of-range values are auto-clamped to the valid range (1 or 12).

**Inline validation (day)**
- Triggered: day value is 2 digits and outside 1–{maxDaysInMonth}.
- Visually: Day border turns error-red; error message appears below.
- On blur: out-of-range values are auto-clamped to 1 or the month maximum.
- Leap year: February max days are recalculated when the Year segment changes.

**External error**
- Triggered: `showError={true}` and `error` is non-empty.
- Visually: all three segment borders turn error-red (Month, Day, and Year all receive the `externalError` flag); the provided error message renders below.
- Behavior: external error is shown only when there are no inline validation errors.

**Disabled**
- Triggered: `disabled={true}`.
- Visually: all segments: background `var(--color-interactive-disabled-bg)`; border `var(--color-interactive-disabled-border)`; opacity `var(--opacity-disabled)` (0.5); cursor `not-allowed`. Focus ring suppressed when disabled.
- Behavior: native `disabled` prevents input.

## 6. Properties

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `string` | — | No | Controlled value. Format: `"MM/DD"` (when `showYear={false}`) or `"MM/DD/YYYY"`. |
| `onChange` | `(value: string) => void` | — | No | Called whenever any segment changes. Value format depends on `showYear`. |
| `showYear` | `boolean` | `true` | No | When `true`, a YYYY segment is rendered. |
| `label` | `string` | `'Date'` | No | Label text. |
| `showLabel` | `boolean` | `true` | No | When `false`, label is not rendered. |
| `description` | `string` | `'Enter a date.'` | No | Supporting description text. |
| `showDescription` | `boolean` | `true` | No | When `false`, description is not rendered. |
| `error` | `string` | `'Error message.'` | No | External error text. Shown when `showError={true}` and no inline validation errors exist. |
| `showError` | `boolean` | `false` | No | Triggers the external error state. |
| `disabled` | `boolean` | `false` | No | Disables all segments. |
| `id` | `string` | auto-generated (`useId`) | No | Overrides the generated wrapper `id`. |

## 7. Content guidelines
- **Label text:** Use a specific noun phrase (e.g., "Date of birth", "Start date") rather than the generic "Date".
- **Description text:** State the expected format if helpful (e.g., "Enter the date in MM/DD/YYYY format.").
- **Error messages (inline):** Auto-generated by the component: "Month must be between 1 and 12" and "Day must be between 1 and {max}". These are not customizable — [NEEDS CONFIRMATION — consider making them configurable].
- **Error messages (external):** Provide full-sentence errors for form-level failures (e.g., "Please enter a valid date of birth.").

## 8. Accessibility

**Keyboard navigation**
- Tab/Shift+Tab cycles through the three segment inputs in document order.
- Arrow keys and Backspace navigate between segments (see States above).
- Auto-advance (programmatic `focus()` call) moves focus forward after 2 digits — this may be unexpected for some users; ensure it is well-tested with screen readers.

**Screen reader behavior**
- Each segment has a distinct `aria-label` ("Month", "Day", "Year").
- Month and Day segments carry `aria-invalid={!!error}` for their respective validation states.
- Year segment does not carry `aria-invalid` even when external error applies [gap — recommend adding].
- Inline error messages are rendered via `ElegantErrorMessage` but are not linked to segments via `aria-describedby` [gap].
- The label's `htmlFor` points to the wrapper `<div>` id, not an `<input>` id — clicking the label focuses the Month segment via a workaround `onClick` handler, but the semantic link is incorrect [gap].

**Color and contrast**
- Error border red (`#dc2626`) on white meets WCAG AA for graphical elements.
- Segment text at `0.875rem` on white meets WCAG AA.

**Motion**
- Segment border and shadow at 150 ms. No `prefers-reduced-motion` support.

**Touch / pointer**
- Segment widths are fixed (Month/Day: `3.5rem`, Year: `5rem`); height is driven by padding (`var(--primitive-scale-2)` top/bottom, ~32 px total at default font size) — below 44 px [gap].

**Known gaps**
- Semantic `htmlFor` does not point to a real `<input>` id.
- Year `aria-invalid` not set during external error.
- No `aria-describedby` linking errors to segments.
- Auto-advance may disorient screen reader users.
- Segment tap targets may be under 44 px.
- No `prefers-reduced-motion` support.

## 9. Design tokens

| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--primitive-font-sans` | `DM Sans, sans-serif` | All text |
| `--primitive-font-size-sm` | `0.875rem` | Label and segment text |
| `--primitive-font-size-xs` | `0.75rem` | Description text |
| `--primitive-font-weight-medium` | `500` | Label |
| `--primitive-font-weight-regular` | `400` | Segment input text |
| `--color-text-title` | `#1e1e1e` | Label color |
| `--color-text-body` | `#171717` | Segment text color |
| `--color-text-muted` | `#666666` | Description; placeholder (via globals.css) |
| `--primitive-white` | `#ffffff` | Segment background (default) |
| `--primitive-gray-100` | `#f5f5f5` | — (see `--color-interactive-disabled-bg`) |
| `--color-interactive-disabled-bg` | `var(--primitive-gray-100)` → `#f5f5f5` | Segment background (disabled) |
| `--color-interactive-disabled-border` | `var(--primitive-gray-200)` → `#e5e5e5` | Segment border (disabled) |
| `--opacity-disabled` | `0.5` | Segment opacity (disabled) |
| `--primitive-gray-200` | `#e5e5e5` | Focus ring color |
| `--primitive-gray-300` | `#d4d4d4` | Default segment border |
| `--primitive-gray-600` | `#666666` | Focus segment border |
| `--color-error-border` | `#dc2626` | Error segment border |
| `--primitive-radius-md` | `4px` | Segment border radius |
| `--primitive-scale-1` | `0.25rem` | Wrapper gap |
| `--primitive-scale-2` | `0.5rem` | Segment vertical padding |
| `--primitive-scale-3` | `0.75rem` | Segment horizontal padding |

## 10. Responsive behavior
The segments have fixed widths (Month: `3.5rem`, Day: `3.5rem`, Year: `5rem`) and do not grow with the container. The wrapper uses `width: 100%` but the segment row (a flex container) will left-align and not stretch. On very narrow viewports (<200 px) the three segments may wrap — consider constraining to a minimum container width. No breakpoint overrides exist.

## 11. Composition and usage patterns

**Full date of birth**
Use the default `showYear={true}` with label "Date of birth" and description "Enter your date of birth (MM/DD/YYYY).". Validate on form submit — use `showError` and `error` for external errors after API-level validation.

**Recurring annual date (month and day only)**
Set `showYear={false}`, label "Anniversary date", description "MM/DD". The emitted value is `"MM/DD"` — store and display accordingly.

**Date in a multi-field form**
The DateInput manages its own segment focus internally; no special form-library integration is needed beyond reading the `value` string in the `onChange` callback.

`[STORYBOOK BLOCK: Simple/Forms/DateInput/DateInput]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [DateTimePicker](/design-system/docs/date-time-picker-zh) | When the user should pick a date from a calendar grid rather than type it |
| [WheelPicker](/design-system/docs/wheel-picker-zh) | When a scroll-drum metaphor suits the UI (mobile-native feel) |
| [TextInput](/design-system/docs/text-input-zh) | When the date format is nonstandard or free-form |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use a specific label like "Date of birth" or "Event date" rather than the default "Date". | Use "Date" as a label without context — users need to know what date is being requested. |
| Rely on the component's built-in auto-advance — it reduces typing friction significantly. | Fight the auto-advance by trying to intercept focus changes in the parent — the component handles cross-segment focus internally. |
| Set `showYear={false}` for month/day-only fields to prevent users from entering meaningless year values. | Show the year segment and then ignore the year in `onChange` — the output format depends on `showYear`. |
| Provide an external error via `showError` + `error` for form-level failures (e.g., date in the past, date required). | Rely solely on inline validation — it only catches out-of-range month and day values, not semantic validity (e.g., Feb 29 in a non-leap year is validated, but "date must be in the future" is not). |
| Tell users the expected format in the description (e.g., "MM/DD/YYYY"). | Leave the description as the default "Enter a date." — it adds no information. |
| Test auto-advance and segment navigation with a screen reader before shipping. | Assume the segmented pattern is universally familiar — consider DateTimePicker for users who prefer a calendar picker. |

## 14. Changelog

### 2026-04-27
- **Disabled state:** Migrated disabled segment styles to semantic tokens — background uses `--color-interactive-disabled-bg`, border uses `--color-interactive-disabled-border`, opacity uses `var(--opacity-disabled)` (0.5, was 0.6). Focus ring suppressed when disabled.

**2026-04-27** — Fix `htmlFor`: move `id` from wrapper div to month input so label click correctly focuses the first segment
