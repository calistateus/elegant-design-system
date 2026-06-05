---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantCheckboxGroup.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantCheckboxGroup.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantCheckbox.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): Error state display confirmed from source; error message styling is delegated to `ElegantErrorMessage` (not read in this pass — token values inferred).
- Section 8 (Accessibility): `<fieldset>` and `<legend>` are present; however, individual Checkbox items still lack `role="checkbox"` and keyboard support — the group structure is correct but item-level accessibility remains incomplete.
- Section 10 (Responsive): No breakpoint overrides; inferred from flex layout.

**Recommended follow-ups:**
- Read `ElegantErrorMessage` source to confirm error token values.
- Add keyboard support and `role="checkbox"` / `aria-checked` to the Checkbox component used inside the group.
- Add a story demonstrating the error state (`showError: true`).
- Add stories for groups with indeterminate items (partial "select all" pattern).
- The story hardcodes 3 items; add stories with 2 and 4+ items.
- Consider adding a `required` prop and aria-required on the fieldset.

---

# CheckboxGroup

## 1. Overview
A semantically grouped set of Checkbox controls wrapped in a `<fieldset>` with a heading, optional description, and optional inline error message — used for multi-selection form fields.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Presenting 2–5 independent options where multiple may be selected (e.g. notification preferences) | Mutually exclusive single-choice selection — use RadioGroup instead |
| Form fields requiring a labeled group of checkboxes with shared context | A single standalone checkbox confirmation — use Checkbox directly |
| Multi-select with validation and an error state (e.g. "Please select at least one option") | Long lists of 10+ options — consider a multi-select dropdown or filter UI |
| Settings panels where users configure multiple independent toggles tied to a form | Immediate-effect settings — use Toggle for controls that don't require form submission |

## 3. Anatomy
1. **Fieldset** — Semantic `<fieldset>` wrapper that groups all controls for assistive technology.
2. **Legend** — `<legend>` containing the header block; provides the accessible group label.
3. **Heading** — Bold text at `--primitive-font-size-sm` identifying the group (e.g. "Notification preferences").
4. **Group description** (optional) — Muted text at `--primitive-font-size-xs` below the heading.
5. **Items container** — Column-flex container holding all Checkbox items with `--size-form-group-gap` vertical spacing.
6. **Checkbox items** — One or more Checkbox components; each has its own label, optional description, and `checkboxState`.
7. **Error message** (optional) — `ElegantErrorMessage` rendered below the items when `showError` is true and `error` is provided.

`[STORYBOOK BLOCK: Simple/Forms/ElegantCheckboxGroup/Default]`

## 4. Variants
CheckboxGroup has a single structural form. Variants are defined by content configuration:

**With group description**
- Heading + description + items.
- Use when the group purpose needs elaboration beyond the heading.

**Without group description**
- Heading + items only.
- Use when the heading is self-sufficient.

**With error state**
- Error message rendered below items when `showError={true}` and `error` string is provided.
- Use to surface validation errors (e.g. required minimum selection).

## 5. States

**Default (no selection or partial selection)**
- Items render at their individual `checkboxState` values.
- No error message shown.

**Error**
- Triggered by passing `showError={true}` with a non-empty `error` string.
- `ElegantErrorMessage` appears below the items list with `--size-form-group-gap` top margin.
- Individual checkbox boxes do not change visually in the error state.

**Disabled**
- Group-level: passing `disabled={true}` to `ElegantCheckboxGroup` propagates `disabled` to every `ElegantCheckbox` in the group, making all items non-interactive.
- Item-level: setting `disabled: true` on individual `CheckboxGroupItem` entries disables specific items while leaving others interactive.
- Visual behavior is inherited from the Checkbox `disabled` state: greyed box, wrapper opacity `var(--opacity-disabled)`, `cursor: not-allowed`.

## 6. Properties

### ElegantCheckboxGroup
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `heading` | `string` | — | Yes | Bold heading text for the checkbox group, rendered inside `<legend>`. |
| `description` | `string \| false` | — | No | Optional supporting description below the heading. Pass `false` to hide. |
| `items` | `CheckboxGroupItem[]` | — | Yes | Array of checkbox item configurations. |
| `onChange` | `(id: string, next: CheckboxState) => void` | — | No | Callback fired when any item is clicked, with the item's `id` and the next `CheckboxState`. |
| `error` | `string` | — | No | Error message text displayed below the items when `showError` is true. |
| `showError` | `boolean` | `false` | No | Whether to display the error message. |
| `disabled` | `boolean` | `false` | No | Disables all checkbox items in the group. Per-item `disabled` in `CheckboxGroupItem` takes precedence for individual items. |

### CheckboxGroupItem
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `id` | `string` | — | Yes | Unique identifier for this item; passed to `onChange` callback. |
| `label` | `string` | — | Yes | Text label for this checkbox option. |
| `description` | `string \| false` | — | No | Optional supporting text below this item's label. |
| `state` | `CheckboxState` | `'unselected'` | No | Current checkbox state: `'unselected'`, `'selected'`, or `'indeterminate'`. |
| `disabled` | `boolean` | `false` | No | Disables this specific item regardless of the group-level `disabled` prop. Combined with group-level as `disabled || item.disabled`. |

## 7. Content guidelines
- **Group heading:** Use a noun phrase describing what is being configured ("Notification preferences", "Export options"). Do not use a verb phrase — the checkboxes imply the action.
- **Group description:** One sentence. Provide context that applies to all items ("Choose how you'd like to hear from us."). Do not repeat information from individual item labels.
- **Item labels:** Short noun phrases or gerund phrases ("Email updates", "SMS alerts"). Parallel structure across items improves scannability.
- **Item descriptions:** One sentence per item, clarifying implications or constraints ("Standard rates may apply.", "Weekly digest of new content.").
- **Error messages:** State the validation rule clearly and positively ("Please select at least one option."). Do not blame the user.
- **Truncation:** No truncation behavior. Keep all text concise within the container width.

## 8. Accessibility
- **Keyboard navigation:** The CheckboxGroup uses `<fieldset>` and `<legend>` for semantic grouping, which screen readers announce before reading individual items. However, individual Checkbox items currently lack `role="checkbox"`, `aria-checked`, and keyboard handlers — keyboard users cannot interact with items via the keyboard alone. This is a critical gap inherited from the Checkbox component.
- **Screen reader behavior:** Screen readers will announce the `<legend>` text as the group label. Individual item accessibility depends on the underlying Checkbox — which currently has no ARIA role or `aria-checked` attribute.
- **ARIA roles:** `<fieldset>` implicitly has `role="group"`. `<legend>` provides the accessible name for the group. Individual items are missing `role="checkbox"`.
- **Color and contrast:** Same as Checkbox — see Checkbox documentation.
- **Motion:** No transitions on the group-level UI. Item transitions are inherited from Checkbox (none currently).
- **Touch/pointer targets:** Each Checkbox item's `<label>` element is the full tap target — the visual 16×16px box plus the label text and optional description all register clicks/taps. With a single-line label the row height is approximately 20–24px, which is below the 44px WCAG 2.5.5 minimum. Adding a `description` to an item increases the row height and improves tap target size.
- **Focus:** Each Checkbox uses the browser's default focus ring on its visually-hidden native `<input>` (positioned `absolute, inset: 0` to cover the 16×16px box). No custom focus ring is applied at the group or item level.
- **Known gaps:** No `required` or `aria-required` attribute.

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

Item-level tokens are identical to those in the Checkbox component — see Checkbox documentation.

Disabled state tokens (inherited from Checkbox):
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-interactive-disabled-bg` | `var(--primitive-gray-100)` → #f5f5f5 | Box fill when disabled |
| `--color-interactive-disabled-border` | `var(--primitive-gray-200)` → #e5e5e5 | Box border when disabled |
| `--opacity-disabled` | `0.5` | Item wrapper opacity when disabled |

## 10. Responsive behavior
The CheckboxGroup has no breakpoint-specific overrides. The `<fieldset>` spans its parent's width. Items stack vertically via `flexDirection: 'column'`. On narrow viewports, item labels and descriptions wrap within their text column.

## 11. Composition and usage patterns

**Multi-option preference form**
The default pattern: a heading ("Notification preferences") + optional description + 2–5 checkbox items. Each item may have its own description. State is managed in the parent; `onChange` updates each item's state by `id`.

**Required multi-select with validation**
Add validation logic in the parent: if no items are `selected` on form submit, pass `showError={true}` and the error message string. The error renders below the items.

**"Select all" with indeterminate parent**
Use a standalone Checkbox (outside the group) in `indeterminate` state when some but not all group items are selected. Clicking it advances to `selected` and a parent handler programmatically sets all group items to `selected`. This pattern must be composed by the consumer — it is not built into CheckboxGroup.

`[STORYBOOK BLOCK: Simple/Forms/ElegantCheckboxGroup/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [Checkbox](/design-system/docs/checkbox-zh) | When only a single standalone confirmation is needed (not a grouped list) |
| [RadioGroup](/design-system/docs/radio-group-zh) | When only one option from the set may be selected at a time |
| [Toggle](/design-system/docs/toggle-zh) | When each setting is an independent immediate-effect on/off control |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use CheckboxGroup for all multi-checkbox form fields — the `<fieldset>`/`<legend>` structure is required for accessible grouping. | Render multiple standalone Checkbox components without a group wrapper — screen readers will not announce the group context. |
| Surface the error message as soon as validation fails (e.g. on form submit attempt). | Show `showError={true}` before the user has interacted with the group — premature errors are disorienting. |
| Use parallel label structures for all items in the group (all noun phrases or all gerund phrases). | Mix label styles (one item "Email updates", another "Would you like SMS alerts?") — inconsistency reduces scannability. |
| Keep the item count to 2–5 for a checkbox group. Beyond 5, consider a different pattern. | Use a single-item CheckboxGroup — use a standalone Checkbox with an `<fieldset>` wrapper instead. |
| Lift state management to the parent and use `onChange(id, next)` to update specific items by ID. | Manage state inside the CheckboxGroup itself — the component is controlled and requires external state. |
| Provide a clear, actionable error message that explains how to resolve the validation issue. | Use generic error text like "Error" — specify what the user must do ("Please select at least one option."). |
| Provide item descriptions selectively — only when a label alone is ambiguous. | Add descriptions to every item by default — it adds visual weight without value for self-explanatory options. |
| Test the `<fieldset>` announcement with a screen reader before shipping. | Rely on visual proximity alone to imply grouping — the `<fieldset>` is essential for screen reader users. |

## 14. Changelog

### 2026-04-27
- **Disabled state:** Added group-level `disabled` prop to `ElegantCheckboxGroupProps`. Added per-item `disabled` to `CheckboxGroupItem`. Each `ElegantCheckbox` receives `disabled={disabled || item.disabled}`, enabling both full-group and individual item disabling.
