---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantCheckbox.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantCheckbox.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections reviewed against source (2026-04-27):**
- Section 3 (Anatomy): Updated — component now uses `<label>` wrapper + visually-hidden `<input type="checkbox">`.
- Section 8 (Accessibility): Updated — all previously flagged gaps are resolved. Native input provides keyboard, role, and aria-checked automatically.

**Remaining recommended follow-ups:**
- Add a `disabled` prop and visually distinct disabled state.
- Add stories for `selected` and `indeterminate` states separately.
- Add a no-description story variant.

---

# Checkbox

## 1. Overview
A binary selection control that allows a user to independently check or uncheck a single item, with an additional indeterminate state for representing partial selection in parent–child hierarchies.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Selecting one or more independent options from a list (use inside CheckboxGroup) | Mutually exclusive single-choice selection — use RadioGroup instead |
| Confirming acceptance of terms, policies, or agreements (standalone) | Binary on/off settings that take immediate effect — use Toggle instead |
| Representing a "select all" parent with partial child selection via indeterminate state | Selecting from a long list of options — consider a multi-select dropdown |
| Form fields where multiple values may be submitted simultaneously | Actions that should trigger immediately without a form submit |

## 3. Anatomy
1. **Wrapper** — `<label>` element. Click area for the full checkbox row; clicking anywhere toggles the checkbox via native label behaviour.
2. **Input container** — `position: relative` `<span>` that stacks the hidden native input and the visible box on top of each other.
3. **Hidden native input** — `<input type="checkbox">` positioned absolutely, full size, `opacity: 0`. Provides keyboard focus, Space-to-toggle, `role="checkbox"`, `aria-checked`, and `aria-describedby`.
4. **Box** — 16×16px visual square with `--primitive-radius-sm` (2px) border-radius. `aria-hidden="true"`. Fill and border driven by `checkboxState`.
5. **Checkmark icon** (selected state) — Inline SVG (10×8px) in `--color-interactive-primary-fg` when `checkboxState === 'selected'`.
6. **Indeterminate bar** (indeterminate state) — 8×1.5px horizontal bar in `--color-interactive-primary-fg` when `checkboxState === 'indeterminate'`. Set imperatively via `useRef` + `useEffect`.
7. **Label text** — Required text at `--primitive-font-size-sm`, medium weight, title color.
8. **Description** (optional) — Supporting text at `--primitive-font-size-xs`, regular weight, muted color. Has a stable `id` (from `useId`) wired to the input's `aria-describedby`.

`[STORYBOOK BLOCK: Simple/Forms/ElegantCheckbox/Default]`

## 4. Variants
The Checkbox has a single visual form. State variants (unselected, selected, indeterminate) represent state rather than visual variants.

**With description**
- Label and supporting description rendered below it.
- Use when the option requires clarification.

**Without description**
- Label only; `description` set to `false`.
- Use for self-explanatory options.

## 5. States

| State | Box fill | Border | Icon |
|---|---|---|---|
| **Unselected** | `--primitive-white` | `--primitive-gray-300` | None |
| **Selected** | `--color-interactive-primary-bg` | `--color-interactive-primary-bg` | White checkmark SVG |
| **Indeterminate** | `--color-interactive-primary-bg` | `--color-interactive-primary-bg` | White horizontal dash |
| **Disabled** | `--color-interactive-disabled-bg` | `--color-interactive-disabled-border` | Preserved (greyed); opacity 0.5; cursor not-allowed |

**Unselected (default)**
- Box: `--primitive-white` fill, `--primitive-gray-300` border.
- No inner icon.
- `checkboxState="unselected"`.

`[STORYBOOK BLOCK: Simple/Forms/ElegantCheckbox/Default]`

**Selected**
- Box: `--color-interactive-primary-bg` fill and border.
- Checkmark SVG rendered in white.
- `checkboxState="selected"`.
- Clicking a selected checkbox returns it to `unselected` (via `nextState` function).

**Indeterminate**
- Box: `--color-interactive-primary-bg` fill and border (same visual fill as selected).
- Horizontal dash rendered in white instead of checkmark.
- `checkboxState="indeterminate"`.
- Clicking an indeterminate checkbox advances to `selected` (per `nextState`: indeterminate → selected). Indeterminate is an externally-set state; users cannot enter it by clicking.
- Intended for "select all" parent checkboxes where some but not all children are selected.

**Disabled**
- Triggered: when `disabled={true}`.
- Visually: box background becomes `--color-interactive-disabled-bg`; border becomes `--color-interactive-disabled-border`. Wrapper opacity drops to `var(--opacity-disabled)` (0.5); cursor becomes `not-allowed`.
- Behavior: the native `<input>` receives the `disabled` attribute and `aria-disabled="true"`. `onChange` is blocked even when provided. The checkbox cannot be toggled.
- The check mark and indeterminate bar are still rendered (within the greyed-out box) to preserve information about the underlying state.

**Read-only (no onChange)**
- When `onChange` is not provided, the wrapper cursor is `default` and clicking has no effect. No distinct visual style distinguishes read-only from interactive.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | Yes | Text label for the checkbox option. |
| `description` | `string \| false` | — | No | Optional supporting text rendered below the label. Pass `false` to hide. |
| `checkboxState` | `'unselected' \| 'selected' \| 'indeterminate'` | `'unselected'` | No | Visual and semantic state of the checkbox. |
| `onChange` | `(next: CheckboxState) => void` | — | No | Callback fired with the next state when the user clicks. When omitted, the checkbox is non-interactive. |
| `disabled` | `boolean` | `false` | No | Disables the checkbox. Applies greyed-out styling, `cursor: not-allowed`, and blocks `onChange`. |

## 7. Content guidelines
- **Label text:** Use concise noun phrases or short action clauses ("Accept terms and conditions", "Email updates", "Push notifications"). Avoid starting with verbs that duplicate the checkbox's implied action ("Check to enable X").
- **Description text:** One sentence maximum. Clarify implications or caveats ("You agree to our terms of service and privacy policy.", "Standard rates may apply.").
- **Truncation:** No truncation is implemented. Keep text within container width; the text column will wrap naturally.

## 8. Accessibility
- **Keyboard navigation:** The wrapper is a `<label>` containing a native `<input type="checkbox">`. The input is reachable by Tab and toggles with `Space`. No custom keyboard handler is required.
- **Screen reader behavior:** Native `<input type="checkbox">` provides `role="checkbox"` and `aria-checked` (`true` / `false` / `mixed` for indeterminate) automatically. The `<label>` wrapper associates the visible label text with the input without any extra ARIA. When a description is present, the input's `aria-describedby` points to a stable `id` (generated via `useId`) on the description span.
- **ARIA roles:** No explicit `role` attributes are needed — the native input supplies them.
- **Indeterminate state:** The `indeterminate` DOM property is set imperatively via `useRef` + `useEffect` when `checkboxState === 'indeterminate'`, which causes screen readers to announce `aria-checked="mixed"`.
- **Color and contrast:** Selected/indeterminate: white icon on #1e1e1e background — high contrast. Unselected: #d4d4d4 border on white — border position provides the state cue; ensure sufficient contrast against the page background.
- **Motion:** No transitions are applied to checkbox visual state — changes are instant.
- **Focus ring:** The browser's default focus ring appears on the visually-hidden `<input>`, which spans the full 16×16px input container via `inset: 0`. No custom `:focus-visible` ring is applied. Known gap: recommend aligning with `--shadow-focus-ring` for consistency.
- **Touch/pointer:** The `<label>` element wraps both the input container and text group, making the full row the tap target. The visual box is 16×16px but the actual tap area is the entire label row. With a single-line label (14px font × 1.4 line-height ≈ 20px), the tap height is approximately 20–24px — below the 44px WCAG 2.5.5 minimum. The label row grows naturally with description content, improving target size.
- **Known gaps:** The hidden input has no custom `:focus-visible` ring beyond the browser default — recommend aligning with `--shadow-focus-ring`. Touch target height below 44px on single-line labels.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-interactive-primary-bg` | `var(--primitive-black)` → #1e1e1e | Box fill and border when selected or indeterminate |
| `--color-interactive-primary-fg` | `var(--primitive-white)` → #ffffff | Checkmark and indeterminate bar color |
| `--color-bg-main` | `var(--primitive-white)` = #ffffff | Box fill when unselected |
| `--color-border-default` | `var(--primitive-gray-200)` = #e5e5e5 | Box border when unselected |
| `--color-text-title` | `var(--primitive-black)` → #1e1e1e | Label text color |
| `--color-text-muted` | `var(--primitive-gray-600)` → #666666 | Description text color |
| `--primitive-radius-sm` | 2px | Box border-radius |
| `--primitive-scale-3` | 0.75rem | Gap between box and label column |
| `--primitive-scale-1` | 0.25rem | Gap between label text and description |
| `--primitive-font-size-sm` | 0.875rem | Label font size |
| `--primitive-font-size-xs` | 0.75rem | Description font size |
| `--primitive-font-weight-medium` | 500 | Label font weight |
| `--primitive-font-weight-regular` | 400 | Description font weight |
| `--color-interactive-disabled-bg` | `var(--primitive-gray-100)` → #f5f5f5 | Box fill when disabled |
| `--color-interactive-disabled-border` | `var(--primitive-gray-200)` → #e5e5e5 | Box border when disabled |
| `--opacity-disabled` | `0.5` | Wrapper opacity when disabled |

## 10. Responsive behavior
The Checkbox has no breakpoint-specific overrides. The wrapper is a flex row that spans its parent's width. The text column wraps naturally when label or description text is long. The box is fixed at 16×16px.

## 11. Composition and usage patterns

**Standalone confirmation checkbox**
Use a single Checkbox for agreement confirmation (terms of service, newsletter opt-in). Wire `onChange` and manage state in the parent. Pair with a submit button that is disabled until the checkbox is selected.

**Inside CheckboxGroup**
The primary intended usage. Multiple Checkboxes are rendered as a labeled group inside a `<fieldset>` with shared heading and optional error message. State management should be lifted to the CheckboxGroup parent.

**Indeterminate parent ("select all")**
Set `checkboxState="indeterminate"` programmatically when some but not all children are selected. The user clicking the indeterminate checkbox will advance it to `selected` — implement "select all" behavior in the `onChange` handler.

`[STORYBOOK BLOCK: Simple/Forms/ElegantCheckbox/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [CheckboxGroup](/design-system/docs/checkbox-group-zh) | When presenting multiple checkboxes under a shared heading with optional error validation |
| [RadioGroup](/design-system/docs/radio-group-zh) | When only one option from a set may be selected at a time |
| [Toggle](/design-system/docs/toggle-zh) | When the control represents an immediate on/off setting rather than a form field selection |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use CheckboxGroup for multi-item selection — it provides the semantic `<fieldset>` wrapper and error state. | Use multiple standalone Checkboxes without a group wrapper — there is no shared label or error state. |
| Use the `indeterminate` state only when it is set externally (e.g. a parent "select all" pattern). | Expect users to be able to click into the indeterminate state — clicking always moves to selected or unselected. |
| Provide an `onChange` handler for any interactive checkbox. | Omit `onChange` unless explicitly displaying a read-only state — the component has no visual indicator for non-interactivity. |
| Write descriptive labels that work out of context ("Accept terms and conditions" is clear; "Yes" is not). | Use the same label text for two different checkboxes in the same view. |
| Keep description text to one sentence and relevant to the specific option. | Use the description to repeat the label or add marketing copy. |
| Test for keyboard and screen reader access before shipping — the standalone Checkbox currently requires additional ARIA attributes. | Assume the visual design is sufficient — the box is `aria-hidden` and no role is set. |
| Pair with an error message (via CheckboxGroup) when at least one selection is required. | Silently prevent form submission without surfacing an error to the user. |
| Use the full row as the click target — the wrapper handles `onClick`, not just the box. | Add a separate `<label>` element — the current implementation does not wire a `for`/`id` relationship. |

## 14. Changelog

### 2026-04-27
- **Accessibility refactor:** Replaced `<div onClick>` wrapper with `<label>` + visually-hidden `<input type="checkbox">`. Component now has full native keyboard support (Tab focus, Space to toggle), correct `role="checkbox"` and `aria-checked` semantics, and `aria-describedby` linking the description text to the input via `useId`. Indeterminate DOM property is now set imperatively via `useRef` + `useEffect`.
- **Disabled state:** Added `disabled` prop. Disabled box uses `--color-interactive-disabled-bg` fill and `--color-interactive-disabled-border` border; wrapper receives `opacity: var(--opacity-disabled)` (0.5) and `cursor: not-allowed`; native input gets `disabled` + `aria-disabled`; `onChange` is blocked when disabled.
- **Tokens:** Replaced primitive token references with semantic equivalents (`--color-bg-main` for unselected box fill, `--color-border-default` for unselected box border). Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.
