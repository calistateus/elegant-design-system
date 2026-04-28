---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantDropdown.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantDropdown.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections reviewed against source (2026-04-27):**
- Section 5 (States): Updated keyboard states added.
- Section 8 (Accessibility): Updated — arrow key navigation, Escape, aria-activedescendant, and aria-labelledby are now implemented.

**Remaining recommended follow-ups:**
- Consider adding a "no results" empty state story.
- Add named stories for: error, disabled, pre-selected value, long option list.

---

# Dropdown

## 1. Overview
A custom select control that presents a scrollable list of options in a floating panel, used when the user must choose exactly one value from a predefined set.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Selecting one item from a fixed, enumerable list (5–20 items) | Free-form text entry — use TextInput instead |
| When the full list of options would clutter the form | Filtering a large dataset by typing — use Search with autocomplete |
| Replacing a native `<select>` with design-system styling | Selecting multiple items — no multi-select support; use a different pattern |
| Forms where the selected value should be shown in context | Fewer than 3 options — use radio buttons for better discoverability |

## 3. Anatomy
1. **Label** — `<label>` linked to the trigger button via `htmlFor`.
2. **Description** — Supporting text below the label.
3. **Trigger button** — A full-width `<button>` showing the selected option label or placeholder. Includes a ChevronDown icon that rotates 180° when open.
4. **ChevronDown icon** — Trailing decorative icon; rotates on open/close (150 ms ease).
5. **Listbox panel** — A `<ul role="listbox">` that appears below the trigger, constrained to `max-height: 240px` with `overflow-y: auto`.
6. **Option item** — Each `<li role="option">` with hover and selected states.
7. **Empty state** — "No options" text rendered when `options` is an empty array.
8. **Error message** — `ElegantErrorMessage` below the trigger when `showError` is active.

`[STORYBOOK BLOCK: Simple/Forms/Dropdown/Dropdown]`

## 4. Variants

**Default (unselected)**
- Trigger shows the `placeholder` in muted text color.
- Use as the initial state before the user has made a selection.

`[STORYBOOK BLOCK: Simple/Forms/Dropdown/Dropdown]`

**Pre-selected**
- Trigger shows the matching `option.label` in body text color.
- Use when a sensible default exists or when editing an existing value.
- Pass `value` matching an `option.value`.

`[STORYBOOK BLOCK: Simple/Forms/Dropdown/Dropdown]`

## 5. States

**Default (closed)**
- Triggered: on initial render or after closing.
- Visually: trigger with `1px solid var(--primitive-gray-300)` border, placeholder or selected label visible, chevron pointing down.
- Behavior: clickable; focusable.

**Open**
- Triggered: user clicks or presses the trigger button.
- Visually: border upgrades to `var(--primitive-gray-600)` with focus ring; chevron rotates 180°; listbox panel appears below.
- Behavior: clicking outside the container ref closes the panel via `mousedown` listener.

**Focus (trigger)**
- Triggered: keyboard Tab or programmatic focus on the trigger button.
- Visually: border `var(--primitive-gray-600)`, focus ring `0 0 0 2px var(--primitive-gray-200)`.
- Behavior: Space/Enter opens the listbox; ArrowDown opens the listbox and moves focus to the first option; ArrowUp opens to the last option; Escape closes; Tab closes without selecting.

**Keyboard option navigation**
- Triggered: listbox is open and user presses ArrowDown/ArrowUp.
- Visually: highlighted option receives `--primitive-gray-50` background. `aria-activedescendant` on the trigger points to the highlighted option's `id`.
- Behavior: ArrowDown/ArrowUp cycles through options (clamped at ends); Enter/Space selects the highlighted option, calls `onChange`, and closes the panel.

**Option hover**
- Triggered: mouse enters an option item.
- Visually: background becomes `var(--primitive-gray-50)`.
- Behavior: clicking selects the option, calls `onChange`, closes the panel.

**Option selected**
- Triggered: the option's `value` matches the controlled `value` prop.
- Visually: background `var(--primitive-gray-100)`, font weight `medium`.
- Behavior: clicking a selected option again re-selects it and closes the panel.

**Error**
- Triggered: `showError={true}` and `error` is non-empty.
- Visually: trigger border becomes `var(--color-error-border)`; focus ring is suppressed; `ElegantErrorMessage` appears below.

**Disabled**
- Triggered: `disabled={true}`.
- Visually: background `var(--color-interactive-disabled-bg)` (#f5f5f5); border `var(--color-interactive-disabled-border)` (#e5e5e5); opacity `var(--opacity-disabled)` (0.5); cursor `not-allowed`.
- Behavior: clicks do not open the listbox; button is native-disabled.

`[STORYBOOK BLOCK: Simple/Forms/Dropdown/Dropdown]`

## 6. Properties

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `options` | `DropdownOption[]` | `[]` | No | Array of `{ label: string; value: string }` objects. |
| `value` | `string` | — | No | Controlled selected value. Must match an `option.value`. |
| `onChange` | `(value: string) => void` | — | No | Called with the selected option's `value` on selection. |
| `placeholder` | `string` | `'Select…'` | No | Text shown in the trigger when no option is selected. |
| `showPlaceholder` | `boolean` | `true` | No | When `false`, an NBSP is shown instead of placeholder text. |
| `label` | `string` | `'Label'` | No | Text content of the `<label>` element. |
| `showLabel` | `boolean` | `true` | No | When `false`, label is not rendered. |
| `description` | `string` | `'Supporting description text.'` | No | Supporting text below the label. |
| `showDescription` | `boolean` | `true` | No | When `false`, description is not rendered. |
| `error` | `string` | `'Error message.'` | No | Error message text. Shown only when `showError` is `true`. |
| `showError` | `boolean` | `false` | No | When `true` and `error` is non-empty, shows the error state. |
| `disabled` | `boolean` | `false` | No | Prevents interaction and shows a disabled appearance. |
| `id` | `string` | auto-generated | No | Overrides auto-generated id linking label and trigger. |

## 7. Content guidelines
- **Label text:** Short noun or noun phrase (e.g., "Department", "Country"). No trailing punctuation.
- **Description text:** Optional context that explains the field's purpose or scope.
- **Placeholder text:** Use a short verb phrase (e.g., "Select a department"). Avoid "Choose one" without context.
- **Option labels:** Use consistent casing (title case or sentence case — not mixed). Keep labels concise; long labels are truncated via `text-overflow: ellipsis` in the trigger.
- **Error messages:** Explain what must be selected (e.g., "Please select a department.").

## 8. Accessibility

**Keyboard navigation**
- Tab moves focus to the trigger; Tab again (or while open) closes the panel and moves focus forward.
- Space or Enter on the trigger opens the listbox.
- ArrowDown opens the listbox (if closed) and moves highlight to the next option; ArrowUp to the previous option.
- Enter or Space while the listbox is open selects the highlighted option, calls `onChange`, and closes the panel.
- Escape closes the listbox without selecting.
- Clicking outside closes via `mousedown` event listener.

**Screen reader behavior**
- Trigger: `aria-haspopup="listbox"`, `aria-expanded={open}`, `aria-describedby` (description and error), `aria-invalid` (error state), `aria-disabled` (disabled state).
- Listbox: `<ul role="listbox" aria-labelledby={triggerId}>` — the trigger's label (linked to the `<label>` via `htmlFor`) serves as the listbox's accessible name; no separate `aria-label` is needed.
- Options: `<li role="option" aria-selected={isSelected} id={listboxId-option-N}>` — each has a stable `id`.
- `aria-activedescendant` on the trigger points to the currently highlighted option during keyboard navigation, allowing screen readers to announce the focused option.

**Color and contrast**
- Selected option uses medium weight at same color as body text — contrast is maintained.
- Hover background (`#fafafa`) is very light — purely visual; not the primary selection signal.

**Motion**
- Chevron rotation at 150 ms `ease`. No `prefers-reduced-motion` override.

**Touch / pointer**
- Option items have `padding: var(--primitive-scale-2) var(--primitive-scale-3)` (8 px × 12 px). At 14 px font size this gives roughly 32 px item height — below the 44 px WCAG target [gap].

**Known gaps**
- Option tap targets may be under 44 px.
- No `prefers-reduced-motion` support.
- Home/End key shortcuts for first/last option are not implemented.

## 9. Design tokens

| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--primitive-font-size-sm` | `0.875rem` | Trigger and option text |
| `--primitive-font-size-xs` | `0.75rem` | Description text |
| `--primitive-font-weight-medium` | `500` | Label and selected option |
| `--primitive-font-weight-regular` | `400` | Unselected options and trigger |
| `--color-text-title` | `#1e1e1e` | Label color |
| `--color-text-body` | `#171717` | Selected option value in trigger; option text |
| `--color-text-muted` | `#666666` | Placeholder, description, chevron icon |
| `--color-bg-main` | `var(--primitive-white)` = `#ffffff` | Trigger and listbox background |
| `--primitive-gray-50` | `#fafafa` | Option hover background |
| `--primitive-gray-100` | `#f5f5f5` | Selected option background |
| `--color-interactive-disabled-bg` | `var(--primitive-gray-100)` → `#f5f5f5` | Trigger background (disabled) |
| `--color-interactive-disabled-border` | `var(--primitive-gray-200)` → `#e5e5e5` | Trigger border (disabled) |
| `--opacity-disabled` | `0.5` | Trigger opacity (disabled) |
| `--shadow-focus-ring` | `0 0 0 2px var(--primitive-gray-200)` = `0 0 0 2px #e5e5e5` | Focus ring |
| `--color-border-input` | `var(--primitive-gray-300)` = `#d4d4d4` | Default border; listbox border |
| `--color-border-input-focus` | `var(--primitive-gray-600)` = `#666666` | Focus/open border |
| `--color-error-border` | `#dc2626` | Error state border |
| `--size-input-radius` | `var(--primitive-radius-md)` = `4px` | Trigger and listbox border radius |
| `--size-menu-item-padding` | `var(--primitive-scale-2) var(--primitive-scale-3)` | Option padding (vertical / horizontal) |
| `--primitive-scale-1` | `0.25rem` | Wrapper gap; listbox vertical padding |
| `--primitive-scale-8` | `2rem` | Trigger right padding (for chevron clearance) |
| `--shadow-popover` | `0 4px 12px rgba(0,0,0,0.08)` | Listbox panel shadow |

## 10. Responsive behavior
The component is `width: 100%` and inherits its container width. The listbox matches the trigger width exactly (`left: 0; right: 0`). On small viewports, very wide option labels may truncate in the trigger. The listbox is scrollable beyond 5–6 options due to `max-height: 240px`. No breakpoint-specific adjustments exist.

## 11. Composition and usage patterns

**Form select**
The primary pattern: label + description + trigger, embedded in a `<form>`. Validate on submit and set `showError={true}` with a specific error message.

**Pre-selected dropdown (edit mode)**
Pass `value` equal to an existing record's field value to pre-populate the trigger. The matching option label appears in the trigger automatically.

**Empty options list**
When `options` is an empty array, the listbox shows "No options" in muted text. Use this state temporarily while options load asynchronously, but prefer adding a loading indicator in that scenario.

`[STORYBOOK BLOCK: Simple/Forms/Dropdown/Dropdown]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| Search | When the user needs to filter a large list by typing |
| TextInput | When the value is free-form rather than from a fixed set |
| WheelPicker | When selecting from ordered/numeric columns (time, date) on touch-first interfaces |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Provide a meaningful placeholder that tells users what they're selecting (e.g., "Select a department"). | Leave the placeholder as the generic default ("Select…") without context. |
| Keep `options` to a manageable list (5–20 items). The panel is scrollable at `max-height: 240px`. | Use Dropdown for lists with hundreds of items — the lack of filtering makes it unusable. |
| Pre-populate `value` when editing an existing record so users see the current selection. | Always start with an empty/unselected state in edit forms — it forces unnecessary re-selection. |
| Set `showError={true}` with a descriptive error after form validation failure. | Use the default `'Error message.'` string — always replace it with context-specific copy. |
| Pair a label (`showLabel={true}`) with every Dropdown so its purpose is clear. | Rely on the placeholder alone to communicate the field's purpose. |
| Use `disabled={true}` when the selection depends on a prior field that hasn't been filled yet, and explain why nearby. | Show a disabled Dropdown without explanation — users won't know when or if it will become active. |

## 14. Changelog

### 2026-04-27
- **Accessibility:** Added full keyboard navigation within the open listbox (ArrowDown/Up, Enter/Space to select, Escape to close, Tab to close). Each option now has a stable `id`; `aria-activedescendant` on the trigger announces the highlighted option to screen readers. Added `aria-labelledby`, `aria-describedby`, `aria-invalid`, and `aria-disabled` to the trigger.
- **Disabled state:** Migrated disabled styles to semantic tokens — background uses `--color-interactive-disabled-bg`, border uses `--color-interactive-disabled-border`, opacity uses `var(--opacity-disabled)` (0.5, was 0.6).
- **Tokens:** Replaced primitive token references with semantic equivalents (`--color-border-input`, `--color-border-input-focus`, `--shadow-focus-ring`, `--size-input-radius`, `--size-menu-item-padding`, `--color-bg-main`). Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.
