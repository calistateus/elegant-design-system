---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantRadioGroup.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantRadioGroup.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantRadio.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 8 (Accessibility): `<fieldset>`, `<legend>`, and `role="radiogroup"` are present on the items container — structural semantics are partially in place. However, individual Radio items still lack `role="radio"`, `aria-checked`, `tabIndex`, and keyboard support. Arrow-key navigation between radio items (standard radio group behavior) is not implemented.
- Section 5 (States): Error state confirmed from source. Individual item disabled state not available.

**Recommended follow-ups:**
- Add `role="radio"`, `aria-checked`, `tabIndex`, and arrow-key navigation to individual Radio items.
- Move `role="radiogroup"` from the items `<div>` to the `<fieldset>` or replace with native `<input type="radio">` for robust accessibility.
- Add a story demonstrating `showError={true}`.
- Add stories for 2-item and 4+-item groups.
- Add `required` prop and `aria-required` support.
- Consider whether the default `selectedId` being `'item1'` in the story is the intended pattern — it means the group is never in an "unselected" state, which may mask validation issues.

---

# RadioGroup

## 1. Overview
A semantically grouped set of Radio controls inside a `<fieldset>` that enforces single-choice selection, with a heading, optional description, and optional inline error message.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Single-choice selection from 2–5 mutually exclusive options (e.g. "Email updates", "SMS alerts", "Push notifications") | Multi-selection — use CheckboxGroup instead |
| Form fields where exactly one option must be chosen before submission | Binary on/off settings — use Toggle |
| Settings panels with a labeled group of radio options and optional validation error | Free-text entry — use a text input |
| Preference screens where the current selection needs to be visually persistent | Large lists of 10+ options — use a select/dropdown instead |

## 3. Anatomy
1. **Fieldset** — Semantic `<fieldset>` wrapper that groups all controls.
2. **Legend** — `<legend>` containing the header block; provides the accessible group name.
3. **Heading** — Bold text at `--primitive-font-size-sm` (e.g. "Notification preferences").
4. **Group description** (optional) — Muted text at `--primitive-font-size-xs` below the heading.
5. **Items container** — `<div role="radiogroup">` holding all Radio items with `--size-form-group-gap` vertical spacing.
6. **Radio items** — One or more Radio components. Exactly one is `selected` at a time (determined by `selectedId`).
7. **Error message** (optional) — `ElegantErrorMessage` rendered below the items when `showError` is true and `error` is provided.

`[STORYBOOK BLOCK: Simple/Forms/ElegantRadioGroup/Default]`

## 4. Variants
RadioGroup has a single structural form. Content configuration determines variants:

**With group description**
- Heading + description + items.
- Use when the group needs more context than the heading provides.

**Without group description**
- Heading + items only.
- Use when the heading is self-sufficient.

**With error state**
- Error message rendered below items when `showError={true}` and `error` string is provided.
- Typically triggered on form submit when no option has been selected (or when `selectedId` is undefined).

## 5. States

**Default (one item selected)**
- The item whose `id` matches `selectedId` renders as `selected`; all others render as `unselected`.
- No error message shown.

`[STORYBOOK BLOCK: Simple/Forms/ElegantRadioGroup/Default]`

**No selection (selectedId undefined)**
- All items render as `unselected`.
- Use this to represent an uninitialized state before the user makes a choice.
- Trigger the error state on form submit if a selection is required.

**Error**
- `showError={true}` + non-empty `error` string renders the error message below items.
- Individual Radio items do not change visually in the error state.

**Disabled**
- Group-level: passing `disabled={true}` to `ElegantRadioGroup` propagates `disabled` to every `ElegantRadio` in the group, making all items non-interactive.
- Item-level: setting `disabled: true` on individual `RadioGroupItem` entries disables specific items while leaving others interactive.
- Visual behavior is inherited from the Radio `disabled` state: greyed circle, wrapper opacity `var(--opacity-disabled)`, `cursor: not-allowed`.

## 6. Properties

### ElegantRadioGroup
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `heading` | `string` | — | Yes | Bold heading text for the radio group, rendered inside `<legend>`. |
| `description` | `string \| false` | — | No | Optional supporting description below the heading. Pass `false` to hide. |
| `items` | `RadioGroupItem[]` | — | Yes | Array of radio item configurations. |
| `selectedId` | `string` | — | No | The `id` of the currently selected item. When undefined, no item is selected. |
| `onChange` | `(id: string) => void` | — | No | Callback fired with the selected item's `id` when the user clicks a Radio. |
| `error` | `string` | — | No | Error message text displayed below items when `showError` is true. |
| `showError` | `boolean` | `false` | No | Whether to display the error message. |
| `disabled` | `boolean` | `false` | No | Disables all radio items in the group. Per-item `disabled` in `RadioGroupItem` takes precedence for individual items. |

### RadioGroupItem
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `id` | `string` | — | Yes | Unique identifier. Compared against `selectedId` to determine visual state; passed to `onChange`. |
| `label` | `string` | — | Yes | Text label for this radio option. |
| `description` | `string \| false` | — | No | Optional supporting text below the label. |
| `disabled` | `boolean` | `false` | No | Disables this specific item regardless of the group-level `disabled` prop. Combined with group-level as `disabled || item.disabled`. |

## 7. Content guidelines
- **Group heading:** Noun phrase describing the decision being made ("Notification preferences", "Delivery method"). Do not phrase as a question.
- **Group description:** One sentence providing context that applies to all options ("Choose how you'd like to hear from us.").
- **Item labels:** Short, parallel noun phrases ("Email updates", "SMS alerts", "Push notifications"). Each label must be clearly distinct — users choose between them.
- **Item descriptions:** One sentence per item, clarifying scope or constraints ("Weekly digest of new content.", "Standard rates may apply.").
- **Error messages:** Positive, actionable ("Please select an option."). Do not blame the user.
- **Truncation:** No truncation behavior. Keep all text within container width.

## 8. Accessibility
- **Keyboard navigation:** `<fieldset>` and `<legend>` provide semantic group structure. `role="radiogroup"` is applied to the items container. However, individual Radio items lack `role="radio"`, `aria-checked`, `tabIndex`, and keyboard handlers. Standard arrow-key navigation between radio buttons is not implemented — this is a critical gap.
- **Screen reader behavior:** The `<legend>` text will be announced as the group label. The `role="radiogroup"` on the items div may be partially redundant with the `<fieldset>` — behavior may vary across screen reader/browser combinations [NEEDS CONFIRMATION].
- **ARIA roles:** `<fieldset>` (implicit group), `<legend>` (group label), `role="radiogroup"` on items container. Individual Radio items are missing `role="radio"` and `aria-checked`.
- **Color and contrast:** Same as Radio — see Radio documentation.
- **Motion:** No transitions at the group level. State changes on Radio items are instant.
- **Touch/pointer targets:** Each Radio item's `<label>` element is the full tap target — the visual 16×16px circle plus the label text and optional description all register clicks/taps. With a single-line label the row height is approximately 20–24px, which is below the 44px WCAG 2.5.5 minimum. Adding a `description` to an item increases the row height and improves tap target size.
- **Focus:** Each Radio uses the browser's default focus ring on its visually-hidden native `<input type="radio">` (positioned `absolute, inset: 0` to cover the 16×16px circle). No custom focus ring is applied at the group or item level. Radios sharing the same `name` prop support arrow-key navigation between items via native browser radio group behavior.
- **Known gaps:** No `aria-required`.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--size-label-to-description` | `var(--primitive-scale-1)` → 0.25rem | Gap between heading and group description |
| `--size-form-group-gap` | `var(--primitive-scale-3)` → 0.75rem | Gap between header block and items; gap between items; top margin before error message |
| `--color-text-title` | `var(--primitive-black)` → #1e1e1e | Group heading text color |
| `--color-text-muted` | `var(--primitive-gray-600)` → #666666 | Group description text color |
| `--primitive-font-sans` | DM Sans, sans-serif | Font family |
| `--primitive-font-size-sm` | 0.875rem | Group heading font size |
| `--primitive-font-size-xs` | 0.75rem | Group description font size |
| `--primitive-font-weight-bold` | 700 | Group heading font weight |
| `--primitive-font-weight-regular` | 400 | Group description font weight |

Item-level tokens are identical to those in the Radio component — see Radio documentation.

Disabled state tokens (inherited from Radio):
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-interactive-disabled-bg` | `var(--primitive-gray-100)` → #f5f5f5 | Circle fill when disabled |
| `--color-interactive-disabled-border` | `var(--primitive-gray-200)` → #e5e5e5 | Circle border when disabled |
| `--opacity-disabled` | `0.5` | Item wrapper opacity when disabled |

## 10. Responsive behavior
RadioGroup has no breakpoint-specific overrides. The `<fieldset>` spans its parent's width. Items stack vertically via `flexDirection: 'column'`. Text in label and description columns wraps naturally on narrow viewports. Radio circles are fixed at 16×16px.

## 11. Composition and usage patterns

**Standard single-choice preference**
The default story pattern: heading + description + 3 items. One item is pre-selected via `selectedId`. `onChange` updates `selectedId` in the parent. This is the correct usage for all interactive RadioGroup instances.

**Uninitialized state (no default selection)**
Omit `selectedId` or pass `undefined` to start with nothing selected. Display the error message on form submit if selection is required.

**Validation on submit**
Keep `showError={false}` until the user attempts to submit. On submit, if `selectedId` is undefined or invalid, set `showError={true}` and provide a clear error message string. Reset `showError` to false when the user makes a selection.

`[STORYBOOK BLOCK: Simple/Forms/ElegantRadioGroup/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [CheckboxGroup](/design-system/docs/checkbox-group-zh) | When multiple options can be selected simultaneously |
| [Radio](/design-system/docs/radio-zh) | The building block used inside this component — not for direct use in forms |
| [Toggle](/design-system/docs/toggle-zh) | When each setting is an independent immediate-effect on/off control |
| Select / [Dropdown](/design-system/docs/dropdown-zh) | When the option list is long (10+) and a compact form control is preferred |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Always use RadioGroup rather than composing standalone Radio components — it provides the required semantic structure. | Render multiple Radio components without the RadioGroup wrapper — they will not be semantically grouped or mutually exclusive. |
| Pre-select a default option when one makes sense for the use case — an empty radio group can confuse users. | Pre-select an option that the user may not notice and inadvertently submit — make the selection visible and deliberate. |
| Show the error message only after the user has attempted to submit, not on first render. | Show validation errors before the user has had a chance to interact with the group. |
| Use parallel label structures for all items ("Email updates", "SMS alerts", "Push notifications" — all noun phrases). | Mix grammatical structures ("Email updates", "Would you like SMS?", "Push") — inconsistency reduces scannability. |
| Provide item descriptions selectively — only for options that need clarification. | Add descriptions to every item by default — unnecessary descriptions add visual noise. |
| Provide a clear, actionable error message ("Please select an option."). | Use vague error text ("Required") without specifying what action the user must take. |
| Test with a screen reader to confirm the group label, item labels, and selected state are announced correctly. | Assume the `role="radiogroup"` and `<fieldset>` are sufficient — individual items still need `role="radio"` and `aria-checked` to be correctly announced. |
| Design for the case where `selectedId` is undefined (no selection) — this is a valid and important UI state. | Always force a default selection to avoid handling the empty state — it masks form validation requirements. |

## 14. Changelog

### 2026-04-27
- **Disabled state:** Added group-level `disabled` prop to `ElegantRadioGroupProps`. Added per-item `disabled` to `RadioGroupItem`. Each `ElegantRadio` receives `disabled={disabled || item.disabled}`, enabling both full-group and individual item disabling.
