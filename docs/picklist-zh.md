---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantPicklist.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantPicklist.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections reviewed against source (2026-04-27):**
- Section 5 (States): Updated — keyboard option navigation states added.
- Section 8 (Accessibility): Updated — arrow key navigation, aria-activedescendant, and option IDs are now implemented.

**Remaining recommended follow-ups:**
- Add a story showing the error state.
- Add a story showing pre-selected values.
- Consider adding a search/filter input for long option lists.
- Chip truncation at 140px maxWidth may clip long option labels — consider a tooltip.

---

# Picklist

## 1. Overview
A multi-select dropdown that allows users to choose multiple options from a list, displaying selected values as dismissible chip pills inside the trigger.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Selecting multiple items from a bounded set of options | Selecting a single option — use Dropdown instead |
| Filtering data by multiple categories | Free-form tag entry where new values can be created |
| Compact multi-select within a form | Selecting from a very large list (50+ items) where search is needed |
| Scenarios where seeing all selected items simultaneously is important | Mutually exclusive choices — use RadioGroup |

## 3. Anatomy
1. **Label** — optional `<label>` element linked to the trigger button via `htmlFor`.
2. **Description** — optional supporting text below the label.
3. **Trigger** — a full-width button displaying selected chips or a placeholder; opens the listbox on click.
4. **Selected chips** — inline pill tags inside the trigger, one per selected option; each has an X dismiss button.
5. **Chevron** — a `ChevronDown` icon at the right edge of the trigger; rotates 180° when open.
6. **Listbox** — an absolutely positioned `<ul role="listbox">` with all available options.
7. **List item** — each option row shows the option label; a check icon appears on the right when selected.
8. **Error message** — rendered below the trigger when `showError={true}`.

`[STORYBOOK BLOCK: Simple/Forms/ElegantPicklist/ElegantPicklist]`

## 4. Variants
The Picklist has a single visual variant. Behavior is controlled by the `options` and `value` props. The only story demonstrates the standard multi-select pattern.

**Standard multi-select**
- Opens a listbox below the trigger.
- Selected items render as chips inside the trigger.
- Deselecting is possible by clicking an option again or by dismissing the chip.
- Listbox closes when the user clicks outside the component.

## 5. States

| State | Trigger | Option |
|---|---|---|
| **Default** | Placeholder text; `--primitive-gray-300` border; chevron ↓ | — |
| **Open** | `--primitive-gray-600` border; `0 0 0 2px --primitive-gray-200` ring; chevron 180° | Listbox visible |
| **Focused** | `--primitive-gray-600` border; `0 0 0 2px --primitive-gray-200` ring | — |
| **Option hover** | — | `--primitive-gray-50` bg; 100 ms ease |
| **Option selected** | Selected chips appear in trigger | `--primitive-gray-100` bg; medium weight; green check icon (`--color-text-accent`) |
| **Error** | `--color-error-border` border; focus ring removed | — |
| **Disabled** | `--color-interactive-disabled-bg` bg; `--color-interactive-disabled-border`; opacity 0.5; cursor not-allowed | — |

**Default / Empty**
- Trigger shows the placeholder text in muted color.
- Chevron is in default (down) orientation.
- Border is `--primitive-gray-300`.

**Open**
- The listbox appears below the trigger.
- Trigger border changes to `--primitive-gray-600` and receives a `box-shadow: 0 0 0 2px var(--primitive-gray-200)` focus ring.
- Chevron rotates 180°.
- Clicking outside the component closes the listbox.

**Option highlighted (keyboard)**
- Triggered: user presses ArrowDown/ArrowUp while listbox is open.
- Visually: highlighted option background shifts to `--primitive-gray-50`. `aria-activedescendant` on trigger points to the highlighted option's `id`.
- Behavior: Enter/Space toggles the highlighted option's selection and calls `onChange`.

**Option hovered (mouse)**
- The hovered list item background shifts to `--primitive-gray-50`.
- Transition is instant (100ms ease).

**Option selected**
- Selected items appear as chips inside the trigger immediately.
- The corresponding list item shows: `--primitive-gray-100` background, medium font weight, and a green check icon (`--color-text-accent`).

**Chips visible**
- Each chip shows the option label with an X button.
- Chip max-width is 140px; overflow is hidden with text-overflow: ellipsis.
- Clicking X removes the option; `onChange` is called with the updated array.

**Focused (trigger)**
- Border color shifts to `--primitive-gray-600`.
- Box shadow `0 0 0 2px var(--primitive-gray-200)` applied.

**Error**
- Trigger border changes to `--color-error-border`.
- The focus ring is removed in error state.
- An `ElegantErrorMessage` is rendered below the trigger.

**Disabled**
- Triggered: `disabled={true}`.
- Visually: trigger background `var(--color-interactive-disabled-bg)`; border `var(--color-interactive-disabled-border)`; opacity `var(--opacity-disabled)` (0.5); cursor `not-allowed`.
- Behavior: clicks do not open the listbox; trigger is native-disabled.

**Empty options**
- When `options` is an empty array, the listbox shows "No options" in muted text.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `options` | `PicklistOption[]` | `[]` | No | Array of `{ label: string; value: string }` objects. |
| `value` | `string[]` | `[]` | No | Array of currently selected option values (controlled). |
| `onChange` | `(value: string[]) => void` | — | No | Called when the selection changes. |
| `placeholder` | `string` | `'Select…'` | No | Text shown in the trigger when no options are selected. |
| `showPlaceholder` | `boolean` | `true` | No | When `false`, the trigger shows a non-breaking space instead of placeholder text. |
| `label` | `string` | `'Label'` | No | Text for the `<label>` element above the trigger. |
| `showLabel` | `boolean` | `true` | No | When `false`, hides the label. |
| `description` | `string` | `'Supporting description text.'` | No | Supporting text below the label. |
| `showDescription` | `boolean` | `true` | No | When `false`, hides the description. |
| `error` | `string` | `'Error message.'` | No | Error text rendered below the trigger. |
| `showError` | `boolean` | `false` | No | When `true`, shows the error message and applies error styling to the trigger. |
| `disabled` | `boolean` | `false` | No | Disables the trigger and prevents interaction. |
| `id` | `string` | — | No | HTML `id` for the trigger button; auto-generated if not provided. |

## 7. Content guidelines
- **Label**: A noun phrase identifying the selection context ("Teams", "Categories", "Departments"). Sentence case.
- **Placeholder**: "Select…" is the default. If the selection is mandatory, consider "Select at least one…".
- **Description**: One sentence explaining constraints or context ("Choose all applicable categories."). Omit if the label is self-explanatory.
- **Error message**: Be specific about the requirement ("Please select at least one department."). Avoid generic "Error message."
- **Option labels**: Use consistent capitalization. For proper nouns, match the canonical name. Avoid truncating option labels in the source — chip overflow handles display-level truncation.
- **Chip truncation**: Option labels are clipped at 140px max-width. Prefer option labels under ~20 characters to avoid ellipsis.

## 8. Accessibility
- **Keyboard navigation**: The trigger button is Tab-focusable. Space/Enter opens the listbox. ArrowDown/ArrowUp navigate between options. Enter/Space toggles the highlighted option's selection. Escape closes the listbox. Tab closes the listbox and moves focus forward.
- **Screen reader behavior**: The trigger has `aria-haspopup="listbox"`, `aria-expanded`, `aria-describedby` (description and error), `aria-invalid` (error state), `aria-disabled` (disabled state), and `aria-activedescendant` pointing to the currently highlighted option's `id`. The listbox has `role="listbox"` and `aria-multiselectable="true"`. Each option `<li>` has `role="option"`, `aria-selected`, and a stable `id`. Chip X buttons have `aria-label="Remove [option label]"`.
- **Color and contrast**: Error border uses `--color-error-border` (#dc2626) on white — high contrast. Selected item check icon uses `--color-text-accent` (#2e6f40). Gray borders (#d4d4d4) on white may not meet WCAG AA for non-text contrast in some environments.
- **Motion**: Trigger border and box-shadow transitions via `--motion-dropdown-trigger` (150ms ease). Chevron rotation via `--motion-dropdown-chevron` (150ms ease). List item background via `--motion-dropdown-item` (100ms ease). No `prefers-reduced-motion` check.
- **Touch/pointer**: Trigger min-height is 36px — below the 44px recommendation. List item padding is `0.5rem 0.75rem`, making rows approximately 32px tall.
- **Known gaps**: Touch targets may be too small (trigger ~36 px height, items ~32 px). No `prefers-reduced-motion` support. Home/End key shortcuts not implemented.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--primitive-font-size-sm` | `0.875rem` | Label and option text |
| `--primitive-font-size-xs` | `0.75rem` | Description and chip label |
| `--primitive-font-weight-medium` | `500` | Label weight; selected option weight |
| `--primitive-font-weight-regular` | `400` | Unselected option weight |
| `--color-text-title` | `var(--primitive-black)` → `#1e1e1e` | Label text color |
| `--color-text-body` | `var(--primitive-gray-900)` → `#171717` | Option text; chip text |
| `--color-text-muted` | `var(--primitive-gray-600)` → `#666666` | Placeholder, description, chevron, chip X icon |
| `--color-text-accent` | `var(--primitive-green-500)` → `#2e6f40` | Selected option check icon |
| `--color-bg-main` | `var(--primitive-white)` = `#ffffff` | Trigger and listbox background |
| `--primitive-gray-50` | `#fafafa` | Hovered option background |
| `--primitive-gray-100` | `#f5f5f5` | Selected option background; chip background |
| `--color-interactive-disabled-bg` | `var(--primitive-gray-100)` → `#f5f5f5` | Trigger background (disabled) |
| `--color-interactive-disabled-border` | `var(--primitive-gray-200)` → `#e5e5e5` | Trigger border (disabled) |
| `--opacity-disabled` | `0.5` | Trigger opacity (disabled) |
| `--color-border-input` | `var(--primitive-gray-300)` = `#d4d4d4` | Default trigger border; listbox border |
| `--color-border-input-focus` | `var(--primitive-gray-600)` = `#666666` | Focused/open trigger border |
| `--shadow-focus-ring` | `0 0 0 2px var(--primitive-gray-200)` = `0 0 0 2px #e5e5e5` | Trigger focus ring |
| `--size-input-radius` | `var(--primitive-radius-md)` = `4px` | Trigger border radius; listbox border radius |
| `--primitive-radius-full` | `999px` | Chip border radius |
| `--color-error-border` | `var(--primitive-red-500)` → `#dc2626` | Error trigger border |
| `--motion-dropdown-trigger` | `border-color 150ms ease, box-shadow 150ms ease` | Trigger transition |
| `--motion-dropdown-chevron` | `transform 150ms ease` | Chevron rotation |
| `--motion-dropdown-item` | `background-color 100ms ease` | List item hover |
| `--size-menu-item-padding` | `var(--primitive-scale-2) var(--primitive-scale-3)` | List item padding |
| `--primitive-scale-1` | `0.25rem` | Gap between label and description; between trigger elements |
| `--primitive-scale-2` | `0.5rem` | Chip horizontal padding |

## 10. Responsive behavior
The trigger uses `width: 100%` and fills its container. The listbox matches the trigger width via `left: 0; right: 0`. No breakpoint overrides. Chips inside the trigger wrap to new lines when the trigger is narrow. The Storybook demo constrains the component to 320px. Container width is consumer-controlled.

## 11. Composition and usage patterns

**Multi-category filter**
Use in a filter bar to let users narrow results by multiple categories simultaneously. Drive `value` from URL query parameters for shareable filter states.
`[STORYBOOK BLOCK: Simple/Forms/ElegantPicklist/ElegantPicklist]`

**Team assignment in a form**
Embed inside `ElegantForm` / `ElegantField` alongside text inputs. Show `error` and `showError` when the field is required and no selection has been made before submission.

**Pre-selected values**
Initialize `value` with an array of pre-selected option values to reflect an existing configuration. All corresponding chips will appear in the trigger on mount.

## 12. Related components
| Component | When to use it instead |
|---|---|
| [ElegantDropdown](/design-system/docs/dropdown-zh) | When only a single option can be selected. |
| [ElegantRadioGroup](/design-system/docs/radio-group-zh) | When the user must choose one option from a mutually exclusive set and all options should be visible. |
| [ElegantCheckboxGroup](/design-system/docs/checkbox-group-zh) | When multiple options are needed in an always-visible layout (no dropdown). |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Provide a descriptive `label` that names the set of options being selected ("Teams", not "Select"). | Use a placeholder alone without a label — `aria-label` on the trigger is not set from the placeholder. |
| Show the error state when the field is required and the user attempts to submit without a selection. | Show the error message before the user has interacted with the field. |
| Keep option labels short (under 20 characters) to avoid chip truncation. | Use very long option labels — they will be truncated at 140px with no tooltip fallback in the current implementation. |
| Use the description to explain any constraints ("Select at least two, up to five."). | Use the description as a repetition of the label ("Select departments" as both label and description). |
| Use the controlled pattern (`value` + `onChange`) when selection needs to sync with external state. | Attempt to mix controlled and uncontrolled — always provide both `value` and `onChange` together. |
| Handle the empty selection case (`value = []`) gracefully in your form validation. | Leave the component without an `onChange` handler if `value` is provided — the UI will appear to work but selection state won't update. |

## 14. Changelog

### 2026-04-27
- **Accessibility:** Added full keyboard navigation within the open listbox (ArrowDown/Up, Enter/Space to toggle selection, Escape to close, Tab to close). Each option now has a stable `id`; `aria-activedescendant` on the trigger announces the highlighted option to screen readers. Added `aria-describedby`, `aria-invalid`, `aria-disabled`. PicklistItem refactored: removed local hover state, uses `isHighlighted` prop driven by parent `activeIndex`; uses `onMouseDown` + `preventDefault()` to avoid blurring the trigger on mouse selection.
- **Disabled state:** Migrated disabled styles to semantic tokens — background uses `--color-interactive-disabled-bg`, border uses `--color-interactive-disabled-border`, opacity uses `var(--opacity-disabled)` (0.5, was 0.6).
- **Tokens:** Replaced primitive token references with semantic equivalents (`--color-border-input`, `--color-border-input-focus`, `--shadow-focus-ring`, `--size-input-radius`, `--size-menu-item-padding`, `--color-bg-main`). Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.

**2026-04-27** — Replace `--primitive-gray-100` with `--color-interactive-hover-bg` and `--primitive-gray-50` with `--color-bg-surface` for option and chip hover states
