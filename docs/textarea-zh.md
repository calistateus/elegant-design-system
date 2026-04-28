---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantTextarea.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantTextarea.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): Over-limit state triggers when character count exceeds `maxChars`. The border turns error-red and the counter text turns red, but no `aria-invalid` is set — flagged as a gap.
- Section 8 (Accessibility): `aria-describedby` is absent; `aria-invalid` is not set on the `<textarea>` even in error or over-limit states.

**Recommended follow-ups:**
- Only one story exported — consider adding named stories for: error, disabled, char counter, word counter, draggable, over-limit.
- The component manages its own internal state (`internalValue`) as a fallback, but mixes controlled and uncontrolled patterns — document the recommended usage pattern.
- No `maxLength` enforcement at the textarea attribute level — only soft-blocked via `handleChange` logic.

---

# Textarea

## 1. Overview
A multi-line text input with optional character/word counter, resize handle, label, description, and inline error messaging for longer-form text entry in forms.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Collecting multi-line free-form text (bio, message, feedback) | Short single-line values — use TextInput instead |
| Fields with a defined character or word budget (tweet, bio limit) | Selecting from a fixed list — use Dropdown instead |
| Fields where users benefit from a resizable input area | Date, time, or structured data — use DateInput or WheelPicker instead |
| Long form content such as notes or descriptions | Read-only display of content — use a plain paragraph element |

## 3. Anatomy
1. **Label** — `<label>` element linked to the textarea via `htmlFor`.
2. **Description** — Supporting text rendered below the label; provides context or formatting hints.
3. **Textarea field** — The native `<textarea>` element; height controlled by the `rows` prop.
4. **Counter** — Optional footer showing character count (`char`) or word count (`word`), aligned to the trailing edge. Turns red when over the character limit.
5. **Error message** — An `ElegantErrorMessage` component rendered below the counter (if visible) when `showError` is `true`.

`[STORYBOOK BLOCK: Simple/Forms/Textarea/Textarea]`

## 4. Variants

**No counter (default)**
- No footer row is rendered.
- Use for open-ended fields without a defined length budget.
- `counter` prop is `undefined`.

`[STORYBOOK BLOCK: Simple/Forms/Textarea/Textarea]`

**Character counter**
- Renders a `{charCount}` or `{charCount} / {maxChars}` label at the trailing edge below the textarea.
- Use when a hard character budget exists (e.g., social bio, SMS-style message).
- Set `counter="char"`. Pair with `maxChars` to show the limit and enforce a soft cap.

`[STORYBOOK BLOCK: Simple/Forms/Textarea/Textarea]`

**Word counter**
- Renders a `{wordCount} word(s)` label below the textarea.
- Use when the requirement is expressed in words rather than characters (e.g., "Max 100 words").
- Set `counter="word"`. Note: `maxChars` only affects the character counter; there is no `maxWords` prop — word counting is display-only.

`[STORYBOOK BLOCK: Simple/Forms/Textarea/Textarea]`

**Draggable (resizable)**
- The textarea resize handle is enabled, allowing the user to drag the bottom edge to increase height.
- Use when input length is unpredictable and allowing more vertical space improves usability.
- Set `draggable={true}`.

`[STORYBOOK BLOCK: Simple/Forms/Textarea/Textarea]`

## 5. States

**Default**
- Triggered: on initial render with no user interaction.
- Visually: `1px solid var(--primitive-gray-300)` border, white background, muted placeholder.
- Behavior: accepts pointer and keyboard focus.

**Focus**
- Triggered: when the textarea receives keyboard or pointer focus.
- Visually: border becomes `var(--primitive-gray-600)`; focus ring `0 0 0 2px var(--primitive-gray-200)` appears. Suppressed if in error or over-limit state.
- Behavior: cursor appears; screen reader announces the label.

**Error**
- Triggered: when `showError={true}` and `error` is non-empty.
- Visually: border becomes `var(--color-error-border)` (`#dc2626`); `ElegantErrorMessage` rendered below.
- Behavior: focus ring not shown on focus; error message visible even when field has content.

**Over-limit**
- Triggered: when `isOverLimit` is true (value set externally beyond `maxChars`; direct typing is blocked by `handleChange`).
- Visually: border becomes `var(--color-error-border)`; counter text turns red.
- Behavior: `aria-invalid="true"` is set on the textarea. No `ElegantErrorMessage` is rendered — only the counter indicates the over-limit state visually.

**Disabled**
- Triggered: when `disabled={true}`.
- Visually: background `var(--color-interactive-disabled-bg)` (#f5f5f5); border `var(--color-interactive-disabled-border)` (#e5e5e5); opacity `var(--opacity-disabled)` (0.5); cursor `not-allowed`.
- Behavior: native `<textarea disabled>` prevents all interaction and removes the element from tab order.

`[STORYBOOK BLOCK: Simple/Forms/Textarea/Textarea]`

## 6. Properties

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `string` | — | No | Controlled value. If omitted, component manages its own internal state. |
| `onChange` | `(value: string) => void` | — | No | Called with the new string value on every keystroke. |
| `placeholder` | `string` | `'Placeholder…'` | No | Placeholder text shown when the textarea is empty. |
| `showPlaceholder` | `boolean` | `true` | No | When `false`, no placeholder attribute is set. |
| `label` | `string` | `'Label'` | No | Text content of the `<label>` element. |
| `showLabel` | `boolean` | `true` | No | When `false`, the label element is not rendered. |
| `description` | `string` | `'Supporting description text.'` | No | Supporting text rendered below the label. |
| `showDescription` | `boolean` | `true` | No | When `false`, the description element is not rendered. |
| `error` | `string` | `'Error message.'` | No | Error message text; only shown when `showError` is also `true`. |
| `showError` | `boolean` | `false` | No | When `true` and `error` is non-empty, shows the error state. |
| `maxChars` | `number` | — | No | Maximum character limit. Soft-enforced (blocks input beyond limit). Displays `{n} / {maxChars}` when `counter="char"`. |
| `draggable` | `boolean` | `false` | No | When `true`, enables the browser's vertical resize handle. |
| `counter` | `'char' \| 'word'` | — | No | Shows a character or word count footer. Omit to hide the counter. |
| `rows` | `number` | `4` | No | Number of visible text rows; controls the textarea's default height. |
| `disabled` | `boolean` | `false` | No | Disables the textarea. |
| `id` | `string` | auto-generated | No | Overrides the auto-generated `id` linking label to textarea. |

## 7. Content guidelines
- **Label text:** Use a noun or noun phrase (e.g., "Message", "Project description"). Avoid punctuation at the end.
- **Description text:** Describe expected content, format, or limits (e.g., "Briefly describe your project in 200 characters or fewer.").
- **Placeholder text:** Use a short example or prompt (e.g., "Tell us about your experience…"). Do not rely on placeholder as a label replacement.
- **Counter messaging:** Counter is purely numeric — pair with a description that communicates the purpose of the limit.
- **Error messages:** Write in plain language; describe what went wrong and how to fix it (e.g., "Description must be at least 20 characters.").
- **Truncation:** Labels and descriptions are not truncated — keep them short. Textarea content scrolls natively.

## 8. Accessibility

**Keyboard navigation**
- Tab moves focus to the textarea; Shift+Tab moves focus away.
- All native text editing shortcuts apply.
- When `draggable={true}`, the resize handle is reachable with keyboard in some browsers [NEEDS CONFIRMATION per browser].

**Screen reader behavior**
- Label is associated with the textarea via `htmlFor`/`id`.
- When a description is shown, the description `<span>` has a stable `id` (via `useId`); the textarea's `aria-describedby` includes that `id`.
- When in error state, the `ElegantErrorMessage` has a stable `id`; `aria-describedby` includes it so the error is announced on focus.
- `aria-invalid="true"` is set when `showError` is true or when the value is over the character limit.
- `aria-disabled="true"` is set when `disabled` is true (alongside the native `disabled` attribute).

**Color and contrast**
- Body text on white exceeds WCAG AA.
- Counter text in muted state (`#666666`) at 12 px — borderline for WCAG AA; verify.
- Error counter text (`#dc2626`) on white meets WCAG AA.

**Motion**
- Border and shadow transition at 150 ms. No `prefers-reduced-motion` override.

**Touch / pointer**
- Default `rows={4}` provides sufficient vertical tap area. The resize handle is a native browser affordance.

**Known gaps**
- No `prefers-reduced-motion` support.
- Word counter has no max enforcement — display-only.
- Mixed controlled/uncontrolled pattern may cause unexpected behavior.

## 9. Design tokens

| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--primitive-font-size-sm` | `0.875rem` | Label and textarea text size |
| `--primitive-font-size-xs` | `0.75rem` | Description and counter text size |
| `--primitive-font-weight-medium` | `500` | Label font weight |
| `--primitive-font-weight-regular` | `400` | Textarea font weight |
| `--color-text-title` | `#1e1e1e` | Label color |
| `--color-text-body` | `#171717` | Textarea text color |
| `--color-text-muted` | `#666666` | Description, placeholder (via globals.css), and counter (default) |
| `--color-bg-main` | `var(--primitive-white)` = `#ffffff` | Textarea background (default) |
| `--color-interactive-disabled-bg` | `var(--primitive-gray-100)` → #f5f5f5 | Textarea background (disabled) |
| `--color-interactive-disabled-border` | `var(--primitive-gray-200)` → #e5e5e5 | Textarea border (disabled) |
| `--opacity-disabled` | `0.5` | Textarea opacity (disabled) |
| `--shadow-focus-ring` | `0 0 0 2px var(--primitive-gray-200)` = `0 0 0 2px #e5e5e5` | Focus ring |
| `--color-border-input` | `var(--primitive-gray-300)` = `#d4d4d4` | Default border color |
| `--color-border-input-focus` | `var(--primitive-gray-600)` = `#666666` | Focus border color |
| `--color-error-border` | `#dc2626` | Error and over-limit border; over-limit counter color |
| `--size-input-radius` | `var(--primitive-radius-md)` = `4px` | Textarea border radius |
| `--size-input-padding` | `var(--primitive-scale-2) var(--primitive-scale-3)` | Textarea padding (vertical / horizontal) |
| `--motion-interactive-color` | `color 150ms ease` | Border/shadow transition on focus (fontFamily now inherited from body) |
| `--primitive-scale-1` | `0.25rem` | Wrapper gap; negative top margin on counter row |

## 10. Responsive behavior
Component is `width: 100%` and fills its container. The `rows` prop sets a fixed default height; when `draggable={true}`, users can increase the height on desktop. No internal breakpoint logic. On mobile, avoid making fields very tall by default — prefer `rows={3}` or `rows={4}`.

## 11. Composition and usage patterns

**Character-limited bio field**
Set `counter="char"` and `maxChars={160}` with a description stating the limit. Pair with form-level validation to set `showError` and `error` when the user submits an empty field.

**Free-form message field**
Set `rows={6}`, `draggable={true}`, no `counter` — for open-ended message composition where length is not constrained.

**Word-count writing exercise**
Set `counter="word"` with a description like "Aim for 150–200 words." Since there is no `maxWords` enforcement, validation must happen at the form level.

`[STORYBOOK BLOCK: Simple/Forms/Textarea/Textarea]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| TextInput | When the value fits on a single line |
| Search | When the user is querying data rather than composing content |
| DateInput | When the user needs to enter a structured date |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Set `rows` to reflect the expected length of the answer — longer answers warrant more visible rows. | Use `rows={1}` as a single-line input substitute — use TextInput instead. |
| Pair `counter="char"` with `maxChars` so users see the remaining budget clearly. | Show a counter without a description explaining the limit's purpose. |
| Provide a clear error message that describes the validation rule (e.g., "Message must be at least 10 characters."). | Leave `error` at the default "Error message." — always supply a meaningful string. |
| Use `draggable={true}` when input length is highly variable and more space would help users. | Make all textareas draggable by default — it can disrupt fixed-height form layouts. |
| Always show the label unless the textarea's purpose is unmistakable from surrounding context. | Use placeholder as the only label — it disappears the moment the user starts typing. |
| Disable the textarea (`disabled={true}`) and explain why when the field is temporarily unavailable. | Use a disabled textarea as a read-only content display — prefer a paragraph or code block. |

## 14. Changelog

### 2026-04-27
- **Accessibility:** Added `aria-describedby` linking description and error text to the textarea via `useId`-generated stable IDs. Added `aria-invalid` (set on error or over-limit state) and `aria-disabled`. Migrated id generation to `useId`.
- **Disabled state:** Migrated disabled styles to semantic tokens — background uses `--color-interactive-disabled-bg`, border uses `--color-interactive-disabled-border`, opacity uses `var(--opacity-disabled)` (0.5, was 0.6).
- **Tokens:** Replaced primitive token references with semantic equivalents (`--color-border-input`, `--color-border-input-focus`, `--shadow-focus-ring`, `--size-input-radius`, `--size-input-padding`, `--color-bg-main`, `--motion-interactive-color`). Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.
