---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantRadio.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantRadio.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections reviewed against source (2026-04-27):**
- Section 3 (Anatomy): Updated — component now uses `<label>` wrapper + visually-hidden `<input type="radio">`.
- Section 6 (Properties): Updated — `name` and `value` props added.
- Section 8 (Accessibility): Updated — all previously flagged gaps are resolved. Native input + RadioGroup `groupName` provides keyboard, role, and aria-checked.

**Remaining recommended follow-ups:**
- Add a `disabled` prop and disabled visual style.
- Add stories for the selected state and no-description variant.

---

# Radio

## 1. Overview
A single circular selection indicator representing one option in a mutually exclusive set, intended to be used exclusively within RadioGroup rather than as a standalone interactive element.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| As the building block inside RadioGroup for single-choice selection | As a standalone interactive control — use RadioGroup which provides semantic grouping |
| Displaying the current selection state of a single item (read-only/display mode) | Multi-selection — use CheckboxGroup |
| Custom RadioGroup implementations that need fine-grained item rendering | Immediate-effect binary settings — use Toggle |
| Representing one option in a mutually exclusive set of 2+ choices | Agreement confirmation — use Checkbox |

## 3. Anatomy
1. **Wrapper** — `<label>` element. Click area when `onClick` is provided; clicking the label activates the native input.
2. **Input container** — `position: relative` `<span>` stacking the hidden input and visible circle.
3. **Hidden native input** — `<input type="radio">` positioned absolutely, full size, `opacity: 0`. Provides keyboard focus, `role="radio"`, `aria-checked`, and participates in the native radio group via `name`.
4. **Circle** — 16×16px element with `border-radius: 50%`. `aria-hidden="true"`. Fill and border driven by `radioState`.
5. **Inner dot** (selected state) — 6×6px filled circle in `--color-interactive-primary-fg` when `radioState === 'selected'`.
6. **Label text** — Required text at `--primitive-font-size-sm`, medium weight, title color.
7. **Description** (optional) — Supporting text at `--primitive-font-size-xs`, regular weight, muted color. Has a stable `id` (from `useId`) wired to the input's `aria-describedby`.

`[STORYBOOK BLOCK: Simple/Forms/ElegantRadio/Default]`

## 4. Variants
Radio has a single visual form. State differences (selected/unselected) are the primary visual distinction.

**With description**
- Label + supporting description below it.
- Use when the option needs clarification.

`[STORYBOOK BLOCK: Simple/Forms/ElegantRadio/Default]`

**Without description**
- Label only; `description` set to `false`.
- Use for self-explanatory options.

`[STORYBOOK BLOCK: Simple/Forms/ElegantRadio/WithoutDescription]`

## 5. States

| State | Circle fill | Border | Inner dot |
|---|---|---|---|
| **Unselected** | `--primitive-white` | `--primitive-gray-300` | None |
| **Selected** | `--color-interactive-primary-bg` | `--color-interactive-primary-bg` | White 6×6px dot centered |
| **Disabled** | `--color-interactive-disabled-bg` | `--color-interactive-disabled-border` | Preserved (greyed); opacity 0.5; cursor not-allowed |

**Unselected (default)**
- Circle: `--primitive-white` fill, `--primitive-gray-300` border.
- No inner dot.
- `radioState="unselected"`.

`[STORYBOOK BLOCK: Simple/Forms/ElegantRadio/Default]`

**Selected**
- Circle: `--color-interactive-primary-bg` fill and border.
- 6×6px white inner dot centered within the circle.
- `radioState="selected"`.

**Disabled**
- Triggered: when `disabled={true}`.
- Visually: circle background becomes `--color-interactive-disabled-bg`; border becomes `--color-interactive-disabled-border`. Wrapper opacity drops to `var(--opacity-disabled)` (0.5); cursor becomes `not-allowed`.
- Behavior: the native `<input>` receives the `disabled` attribute and `aria-disabled="true"`. `onClick` is blocked when disabled.
- The inner dot is still rendered (within the greyed-out circle) to preserve state information.

**Read-only (no onClick)**
- When `onClick` is not provided, cursor is `default` and clicking has no effect.
- No distinct visual style for read-only vs. interactive state.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | Yes | Text label for this radio option. |
| `description` | `string \| false` | — | No | Optional supporting text rendered below the label. Pass `false` to hide. |
| `radioState` | `'unselected' \| 'selected'` | `'unselected'` | No | Current visual and semantic state of the radio control. |
| `onClick` | `() => void` | — | No | Click handler fired when the user selects this option. When omitted, the control is non-interactive. |
| `name` | `string` | — | No | HTML `name` attribute passed to the native `<input type="radio">`. Used by RadioGroup to group radios so arrow-key navigation works natively. |
| `value` | `string` | `label` | No | HTML `value` attribute passed to the native input. Defaults to the `label` string if not provided. Used by RadioGroup. |
| `disabled` | `boolean` | `false` | No | Disables the radio. Applies greyed-out styling, `cursor: not-allowed`, and blocks `onClick`. Native input receives `disabled` + `aria-disabled`. |

**Note:** Unlike Checkbox, Radio has no `onChange` with a next-state argument. The parent is responsible for determining the next `selectedId` and passing updated `radioState` values down. The `onClick` fires without arguments.

## 7. Content guidelines
- **Label text:** Use concise noun phrases ("Email updates", "Receive email notifications"). Labels represent discrete options in a mutually exclusive set — each must be clearly distinct from siblings.
- **Description text:** One sentence maximum. Clarify scope, cost, or implications ("We'll send you updates about your account and activity.", "Standard rates may apply.").
- **Uniqueness:** Within a group, all labels must be unique — they are the primary distinguishing text for screen readers.
- **Truncation:** No truncation behavior. Keep labels short.

## 8. Accessibility
- **Keyboard navigation:** The wrapper is a `<label>` containing a native `<input type="radio">`. The input is Tab-focusable. Within a RadioGroup, all radios share the same `name` attribute (generated by `useId` in RadioGroup), enabling native browser arrow-key navigation (ArrowUp/ArrowDown moves focus and selection between radios in the group). No custom keyboard handler is required.
- **Screen reader behavior:** Native `<input type="radio">` provides `role="radio"` and `aria-checked` automatically. The `<label>` associates the visible label text. When a description is present, `aria-describedby` links the description span (stable `id` via `useId`) to the input.
- **ARIA roles:** No explicit ARIA needed — native input supplies `role="radio"` and `aria-checked`.
- **Group semantics:** RadioGroup wraps items in a `<fieldset>` with a `<legend>`. All Radio inputs in the group share a `name` prop, forming a native radio group for arrow-key navigation and single-selection enforcement.
- **Color and contrast:** Selected: white inner dot on #1e1e1e fill — high contrast. Unselected: #d4d4d4 border on white.
- **Motion:** No transitions. State changes are instant.
- **Focus ring:** Browser default focus ring on the visually-hidden `<input type="radio">`, which covers the 16×16px input container via `inset: 0`. No custom `:focus-visible` ring applied. Known gap: recommend aligning with `--shadow-focus-ring` for consistency.
- **Touch/pointer:** The `<label>` element wraps both the input container and text group, making the full row the tap target. The visual circle is 16×16px but the actual tap area is the entire label row. With a single-line label (14px font × 1.4 line-height ≈ 20px), the tap height is approximately 20–24px — below the 44px WCAG 2.5.5 minimum. The label row grows naturally with description content, improving target size. The `name` prop enables arrow-key navigation between radios in the same group.
- **Known gaps:** No custom `:focus-visible` ring beyond the browser default — recommend aligning with `--shadow-focus-ring`. Touch target height below 44px on single-line labels.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-interactive-primary-bg` | `var(--primitive-black)` → #1e1e1e | Circle fill and border when selected |
| `--color-interactive-primary-fg` | `var(--primitive-white)` → #ffffff | Inner dot color when selected |
| `--color-bg-main` | `var(--primitive-white)` = #ffffff | Circle fill when unselected |
| `--color-border-default` | `var(--primitive-gray-200)` = #e5e5e5 | Circle border when unselected |
| `--color-text-title` | `var(--primitive-black)` → #1e1e1e | Label text color |
| `--color-text-muted` | `var(--primitive-gray-600)` → #666666 | Description text color |
| `--primitive-scale-3` | 0.75rem | Gap between circle and label column |
| `--primitive-scale-1` | 0.25rem | Gap between label text and description |
| `--primitive-font-size-sm` | 0.875rem | Label font size |
| `--primitive-font-size-xs` | 0.75rem | Description font size |
| `--primitive-font-weight-medium` | 500 | Label font weight |
| `--primitive-font-weight-regular` | 400 | Description font weight |
| `--color-interactive-disabled-bg` | `var(--primitive-gray-100)` → #f5f5f5 | Circle fill when disabled |
| `--color-interactive-disabled-border` | `var(--primitive-gray-200)` → #e5e5e5 | Circle border when disabled |
| `--opacity-disabled` | `0.5` | Wrapper opacity when disabled |

## 10. Responsive behavior
The Radio component has no breakpoint-specific overrides. The wrapper spans its parent's width. Text wraps naturally in the label column. The circle is fixed at 16×16px.

## 11. Composition and usage patterns

**Inside RadioGroup (primary pattern)**
Radio is designed to be rendered by RadioGroup. RadioGroup manages `selectedId`, derives each item's `radioState` from the match, and passes `onClick` to call `onChange(item.id)`. Consumers should not render Radio directly in most cases.

**Display/read-only mode**
Pass `radioState` with no `onClick` to render a non-interactive radio indicator — useful in summary views or review screens where the selection is displayed but not editable.

`[STORYBOOK BLOCK: Simple/Forms/ElegantRadio/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [RadioGroup](/design-system/docs/radio-group-zh) | The primary way to use Radio — provides semantic grouping, shared state, and error handling |
| [Checkbox](/design-system/docs/checkbox-zh) | When multiple options can be selected simultaneously |
| [Toggle](/design-system/docs/toggle-zh) | When the control is a binary on/off that takes immediate effect |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Always use Radio inside RadioGroup for interactive single-choice selection. | Use standalone Radio for interactive forms — it lacks the semantic grouping and keyboard support required. |
| Use Radio without `onClick` as a read-only state indicator in display contexts. | Expect the standalone Radio to behave as a form control for screen reader users — it is not announced correctly. |
| Write labels that clearly identify each option as distinct from siblings ("Email updates", "SMS alerts", "Push notifications"). | Use labels that only make sense in visual context ("This one", "Option A") — screen readers need self-contained labels. |
| Use the description to add one clarifying sentence where the label alone is insufficient. | Add descriptions to every item by default — only use them when they add value. |
| Ensure `radioState` is always controlled by the RadioGroup's `selectedId` comparison. | Try to manage `radioState` independently per item outside the RadioGroup — it will break the mutually exclusive selection contract. |
| Test selected state contrast — the inner dot on the filled circle should remain visible at all sizes. | Reduce the inner dot size below 6×6px — it will be difficult to perceive at small viewports or for users with low vision. |

## 14. Changelog

### 2026-04-27
- **Accessibility refactor:** Replaced `<div onClick>` wrapper with `<label>` + visually-hidden `<input type="radio">`. Added `name` and `value` props. RadioGroup now passes a shared `groupName` (from `useId`) and `value={item.id}` to each Radio, enabling native arrow-key navigation within the group. Component now has correct `role="radio"`, `aria-checked`, and `aria-describedby` semantics.
- **Disabled state:** Added `disabled` prop. Disabled circle uses `--color-interactive-disabled-bg` fill and `--color-interactive-disabled-border` border; wrapper receives `opacity: var(--opacity-disabled)` (0.5) and `cursor: not-allowed`; native input gets `disabled` + `aria-disabled`; `onClick` is blocked when disabled.
- **Tokens:** Replaced primitive token references with semantic equivalents (`--color-bg-main` for unselected circle fill, `--color-border-default` for unselected circle border). Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.
