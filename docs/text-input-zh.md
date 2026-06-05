---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantTextInput.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantTextInput.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): Hover state styling is not defined in the source — the component only applies focus styles via `onFocus`/`onBlur`; hover cursor changes via CSS `cursor: text`. Hover border change is not implemented.
- Section 10 (Responsive behavior): Component is `width: 100%` and inherits its container's width. No breakpoint-specific overrides exist in source.

**Recommended follow-ups:**
- Only one story exported (no per-variant stories for error, disabled, icon variants). Consider adding discrete named stories for each state/variant to enable Storybook block embeds.
- The `id` prop uses `Math.random()` as a fallback — this can cause SSR hydration mismatches. Consider migrating to React's `useId()`.
- No `required` or `aria-required` support — accessibility gap for required form fields.
- No `maxLength` prop exposed, though the underlying `<input>` supports it.

---

# TextInput

## 1. Overview
A single-line text input field with optional label, supporting description, trailing icon, and inline error messaging for use in forms.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Collecting short, free-form text (names, emails, URLs) | Multi-line content — use Textarea instead |
| Search queries without autocomplete | Autocomplete search — use Search instead |
| Form fields requiring validation feedback | Selecting from a fixed list — use Dropdown instead |
| Any labeled input that needs a description hint | Date or time entry — use DateInput or DateTimePicker instead |

## 3. Anatomy
1. **Label** — `<label>` element linked to the input via `htmlFor`; communicates the field's purpose.
2. **Description** — Supporting text rendered below the label; provides context or formatting hints.
3. **Input field** — The native `<input type="text">` element where the user types.
4. **Trailing icon** — A decorative icon (Search or ArrowRight) anchored to the right edge; `pointerEvents: none`.
5. **Error message** — An `ElegantErrorMessage` component rendered below the field when `showError` is `true` and `error` is non-empty.

`[STORYBOOK BLOCK: Simple/Forms/ElegantTextInput/TextInput]`

## 4. Variants

**Search icon**
- Renders the Lucide `Search` icon (14 px, stroke 1.5) at the trailing edge.
- Use when the field's purpose is to filter or look up items.
- Default variant (`icon="search"`).

**Arrow icon**
- Renders the Lucide `ArrowRight` icon (14 px, stroke 1.5) at the trailing edge.
- Use when the field triggers navigation or submission on commit (e.g., a URL bar or go-to field).
- Set `icon="arrow"`.

**No icon**
- Removes the trailing icon and adjusts horizontal padding symmetrically (`var(--primitive-scale-3)` on both sides).
- Use for plain text fields where an icon adds no semantic value.
- Set `showIcon={false}`.

## 5. States

| State | Border | Focus ring | Background |
|---|---|---|---|
| **Default** | `1px solid var(--primitive-gray-300)` | None | White |
| **Focus** | `var(--primitive-gray-600)` | `0 0 0 2px var(--primitive-gray-200)` | White |
| **Error** | `var(--color-error-border)` | Suppressed | White |
| **Disabled** | `var(--color-interactive-disabled-border)` | Suppressed | `var(--color-interactive-disabled-bg)`; opacity 0.5; cursor not-allowed |

**Default**
- Triggered: on initial render with no user interaction.
- Visually: `1px solid var(--primitive-gray-300)` border, white background, muted placeholder text.
- Behavior: accepts pointer and keyboard focus.

**Focus**
- Triggered: when the input receives keyboard or pointer focus.
- Visually: border changes to `var(--primitive-gray-600)`; a `0 0 0 2px var(--primitive-gray-200)` focus ring appears. Focus ring is suppressed when `showError` is true.
- Behavior: cursor blinks; screen readers announce the label.

**Error**
- Triggered: when `showError={true}` and `error` is a non-empty string.
- Visually: border changes to `var(--color-error-border)`; focus ring is not shown on focus; `ElegantErrorMessage` appears below.
- Behavior: `aria-invalid="true"` is set on the input. The error message element receives a stable `id` (via `useId`) and is linked to the input via `aria-describedby`.

**Disabled**
- Triggered: when `disabled={true}`.
- Visually: background becomes `var(--color-interactive-disabled-bg)`; border becomes `var(--color-interactive-disabled-border)`; opacity drops to `var(--opacity-disabled)` (0.5); cursor becomes `not-allowed`.
- Behavior: the native `<input disabled>` attribute prevents all interaction and removes the field from the tab order.

## 6. Properties

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `string` | — | No | Controlled value of the input. |
| `onChange` | `(value: string) => void` | — | No | Called with the new string value on every keystroke. |
| `placeholder` | `string` | `'Placeholder…'` | No | Placeholder text shown when the field is empty. |
| `showPlaceholder` | `boolean` | `true` | No | When `false`, no placeholder attribute is set. |
| `label` | `string` | `'Label'` | No | Text content of the `<label>` element. |
| `showLabel` | `boolean` | `true` | No | When `false`, the label element is not rendered. |
| `description` | `string` | `'Supporting description text.'` | No | Supporting text rendered below the label. |
| `showDescription` | `boolean` | `true` | No | When `false`, the description element is not rendered. |
| `error` | `string` | `'Error message.'` | No | Error message text. Only displayed when `showError` is also `true`. |
| `showError` | `boolean` | `false` | No | When `true` and `error` is non-empty, shows the error state and message. |
| `icon` | `'search' \| 'arrow'` | `'search'` | No | Which trailing icon to render. |
| `showIcon` | `boolean` | `true` | No | When `false`, no icon is rendered and padding is symmetric. |
| `disabled` | `boolean` | `false` | No | Disables the input, applying reduced opacity and `not-allowed` cursor. |
| `id` | `string` | auto-generated | No | Overrides the auto-generated `id` used to associate label and input. |

## 7. Content guidelines
- **Label text:** Use a short noun or noun phrase (e.g., "Email address", "Full name"). Avoid punctuation at the end.
- **Description text:** One concise sentence explaining format or constraints (e.g., "Enter your work email address."). Do not repeat the label.
- **Placeholder text:** Use an example value or brief hint (e.g., "name@company.com"). Do not use the placeholder as a substitute for a label.
- **Error messages:** Write in plain language, describe the problem, and suggest a fix (e.g., "Email address is required." not "Invalid input.").
- **Icon usage:** Icons are decorative — do not rely on them to convey meaning not also communicated by label or placeholder.
- **Truncation:** The input itself handles overflow via native browser scrolling; labels and descriptions do not truncate — keep them concise.

## 8. Accessibility

**Keyboard navigation**
- Tab moves focus to the input; Shift+Tab moves focus away.
- All standard text editing shortcuts work (Home, End, Ctrl+A, etc.).

**Screen reader behavior**
- The `<label>` is associated with the input via `htmlFor`/`id` — screen readers announce the label on focus.
- When a description is shown, its `<span>` has a stable `id` (via `useId`); the input's `aria-describedby` includes that `id` so screen readers announce the description.
- When in error state, the `ElegantErrorMessage` element has a stable `id` (via `useId`); the input's `aria-describedby` includes that `id` so screen readers announce the error message.
- `aria-invalid="true"` is set on the input when `showError` is true.
- `aria-disabled="true"` is set on the input when `disabled` is true (in addition to the native `disabled` attribute).
- No `aria-required` support — add if used in required form contexts.

**Color and contrast**
- Body text (`var(--color-text-body)` = `#171717`) on white background exceeds WCAG AA.
- Muted text (`var(--color-text-muted)` = `#666666`) on white meets WCAG AA for large text; borderline for small text — verify at 14 px.
- Error red (`#dc2626`) on white meets WCAG AA for text contrast.
- Focus ring gray (`#e5e5e5`) is a low-contrast ring — may not be sufficient for users who rely on focus indicators; consider darkening.

**Motion**
- Border color and box-shadow transition at 150 ms (`ease`). No `prefers-reduced-motion` override is implemented — recommend adding one.

**Touch / pointer**
- The input's padding provides approximately 36 px minimum tap height at default font size; may fall short of the 44 px WCAG 2.5.5 recommendation depending on container.

**Known gaps**
- Missing `aria-required`.
- Focus ring contrast may be insufficient.
- No `prefers-reduced-motion` support.
- `Math.random()` id generation fallback replaced by `useId` — SSR hydration mismatch risk eliminated.

## 9. Design tokens

| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--primitive-font-size-sm` | `0.875rem` | Label and input text size |
| `--primitive-font-size-xs` | `0.75rem` | Description text size |
| `--primitive-font-weight-medium` | `500` | Label font weight |
| `--primitive-font-weight-regular` | `400` | Input font weight |
| `--color-text-title` | `var(--primitive-black)` = `#1e1e1e` | Label color |
| `--color-text-body` | `var(--primitive-gray-900)` = `#171717` | Input text color |
| `--color-text-muted` | `var(--primitive-gray-600)` = `#666666` | Description and icon color; placeholder via globals.css rule |
| `--color-bg-main` | `var(--primitive-white)` = `#ffffff` | Input background (default) |
| `--color-interactive-disabled-bg` | `var(--primitive-gray-100)` → #f5f5f5 | Input background (disabled) |
| `--color-interactive-disabled-border` | `var(--primitive-gray-200)` → #e5e5e5 | Input border (disabled) |
| `--opacity-disabled` | `0.5` | Input wrapper opacity (disabled) |
| `--shadow-focus-ring` | `0 0 0 2px var(--primitive-gray-200)` = `0 0 0 2px #e5e5e5` | Focus ring |
| `--color-border-input` | `var(--primitive-gray-300)` = `#d4d4d4` | Default border color |
| `--color-border-input-focus` | `var(--primitive-gray-600)` = `#666666` | Focus border color |
| `--color-error-border` | `var(--primitive-red-500)` = `#dc2626` | Error state border |
| `--size-input-radius` | `var(--primitive-radius-md)` = `4px` | Input border radius |
| `--size-input-padding` | `var(--primitive-scale-2) var(--primitive-scale-3)` | Input padding (vertical / horizontal) |
| `--motion-interactive-color` | `color 150ms ease` | (font-family now inherited from body) |
| `--primitive-scale-1` | `0.25rem` | Wrapper gap between elements |
| `--primitive-scale-8` | `2rem` | Input right padding when icon is shown; icon right position |

## 10. Responsive behavior
The component wrapper is `width: 100%` and expands to fill its container. No internal breakpoint logic exists — the input scales fluidly. The Storybook decorator constrains the demo to 320 px. In production, wrap the component in a layout column that defines a meaningful max-width (e.g., 480 px on desktop).

## 11. Composition and usage patterns

**Standalone form field**
The most common pattern: label + description + input, used inside a `<form>` with a submit button placed below. Ensure all three text props are filled.

**Error state on submit**
Set `showError={true}` after form validation to reveal inline error messaging. Pair with `aria-invalid` on the input and focus management to the first invalid field.

**No-label search bar (narrow)**
Set `showLabel={false}` and `showDescription={false}` with `icon="search"` for a compact, unlabeled search trigger. Ensure a surrounding `<form role="search">` or visible context provides semantic meaning.

`[STORYBOOK BLOCK: Simple/Forms/ElegantTextInput/TextInput]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [Textarea](/design-system/docs/textarea-zh) | When the user needs to enter more than one line of text |
| [Search](/design-system/docs/search-zh) | When typing should filter a list with autocomplete suggestions |
| [Dropdown](/design-system/docs/dropdown-zh) | When the user must select from a predefined set of options |
| [DateInput](/design-system/docs/date-input-zh) | When the field specifically captures a calendar date |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Always provide a visible label (`showLabel={true}`) for form fields that require explicit identification. | Use placeholder text as the only label — placeholders disappear on input and are inaccessible to many users. |
| Use the `description` prop to explain format or constraints before the user starts typing. | Put critical instructions only in the error message — users who fill the field correctly never see it. |
| Set `icon="search"` only on fields whose purpose is lookup or filtering. | Use `icon="arrow"` on a standard form text field — the arrow implies navigation or submission. |
| Set `disabled={true}` when a field is temporarily unavailable, and explain why nearby. | Use disabled fields as read-only displays — use a plain text element instead. |
| Keep error messages specific: describe what went wrong and how to fix it. | Write generic errors like "Invalid input" without context. |
| Use `showIcon={false}` for plain fields where the icon adds no contextual meaning. | Show an icon and then hide its meaning from screen reader users — icons are `pointerEvents: none` with no ARIA label. |

## 14. Changelog

### 2026-04-27
- **Accessibility:** Added `aria-describedby` linking description and error text to the input via `useId`-generated stable IDs. Added `aria-invalid` (set when `showError` is true) and `aria-disabled` (set when `disabled` is true). Migrated id generation to `useId`, eliminating SSR hydration mismatch risk.
- **Disabled state:** Migrated disabled styles to semantic tokens — background uses `--color-interactive-disabled-bg`, border uses `--color-interactive-disabled-border`, opacity uses `var(--opacity-disabled)` (0.5, was 0.6).
- **Tokens:** Replaced primitive token references with semantic equivalents (`--color-border-input`, `--color-border-input-focus`, `--shadow-focus-ring`, `--size-input-radius`, `--size-input-padding`, `--color-bg-main`, `--motion-interactive-color`). Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.
