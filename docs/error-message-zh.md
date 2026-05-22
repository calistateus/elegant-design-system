## Reviewer notes

**Files read:**
- `src/components/simple/ElegantErrorMessage.tsx`
- `src/stories/ElegantErrorMessage.stories.tsx`
- `src/app/globals.css` (token values)

**Files missing:**
- No CSS/module style file (component uses inline styles)
- No test file — accessibility intent inferred from `role="alert"` in source
- No README
- No spec file at `specs/error-message-spec.md`

**Sections needing human review:**
- Only one story exported (`ElegantErrorMessage`) — no variant stories exist; Variants and States sections reflect what the component supports by prop, not dedicated story exports
- Responsive behavior: no breakpoint-specific logic found — marked as non-adapting
- Dark mode: no dark mode token overrides found in globals.css for `--color-error-text` [NEEDS CONFIRMATION]
- WCAG contrast for `#dc2626` on white: ~4.5:1 — borderline AA for normal text; verify on actual backgrounds used [NEEDS CONFIRMATION]

**Recommended follow-ups:**
- Add variant stories: inline (no icon), multi-line, field-level vs. form-level
- Add a test file covering screen reader announcement and prop defaults
- Replace primitive font tokens (`--primitive-font-size-xs`, `--primitive-font-weight-regular`, `--primitive-font-sans`, `--primitive-scale-1`) with semantic tokens
- Confirm dark mode behaviour
- `id` prop has been added; `aria-describedby` wiring is now handled automatically in TextInput, Textarea, Dropdown, and Picklist.

---

# Error Message

## 1. Overview

A compact inline alert that surfaces validation or system error copy below a form field or section, using an icon and coloured text to draw attention without interrupting layout.

---

## 2. When to use / When not to use

| Use | Don't use |
|---|---|
| Below a form input that has failed validation (e.g. "Email is required") | For success confirmation after form submission — use a Toast or success state instead |
| To surface a field-level API error returned after submit (e.g. "This email is already in use") | For page-level or system-wide errors — use a Banner or Alert component with more visual weight |
| Alongside a field that has transitioned to an error state, paired with `aria-describedby` on the input | As a standalone notification unrelated to a specific input — use a Toast or inline Alert instead |
| When the error copy is short (under ~120 characters) and fits in a single line or two | When you need to list multiple errors — consider an error summary list at the top of the form |
| When the error must be announced immediately to screen readers on state change | When the condition is a warning, not an error — use a Warning variant or a different colour token |

---

## 3. Anatomy

1. **Wrapper** (`div[role="alert"]`) — flex container that holds the icon and text side by side; announces its contents to screen readers automatically on mount or update.
2. **Icon** (`AlertCircle`, 12 × 12 px, strokeWidth 1.5) — visual affordance reinforcing the error state; flexShrink is disabled so it never collapses; offset 3 px from top to optically align with the first text baseline.
3. **Message text** (`span`) — the human-readable error copy rendered in xs body type at 1.5 line-height to accommodate wrapping.

`[STORYBOOK BLOCK: Simple/Forms/ElegantErrorMessage/ElegantErrorMessage]`

---

## 4. Variants

The component has a single visual variant. There are no named variant props.

**Default (icon + message)**
- Renders an `AlertCircle` icon alongside the error message string.
- This is the only supported form; the icon cannot be hidden via props.
- Use this variant for all inline field-level validation errors.
- Constraint: icon size is fixed at 12 px — do not attempt to scale by wrapping in a transform; add an `iconSize` prop if size flexibility is required.

`[STORYBOOK BLOCK: Simple/Forms/ElegantErrorMessage/ElegantErrorMessage]`

---

## 5. States

| State | Visual | Screen reader |
|---|---|---|
| **Visible** | `--color-error-text` icon + text | `role="alert"` announces on DOM insertion |
| **Absent** | Component unmounted | No announcement |

**Default / visible**
- Triggered when: the parent renders `<ErrorMessage>` with a `message` value.
- Visual change: icon and text appear in `--color-error-text`.
- Screen reader: `role="alert"` causes the message to be announced immediately by most screen readers when the element is inserted into the DOM or when its content changes.

**Hidden / absent**
- The component has no internal hidden state. Visibility is controlled entirely by the parent — conditionally rendering `<ErrorMessage>` or not.
- To hide: unmount the component rather than passing an empty string, as an empty `role="alert"` can still trigger screen reader announcements.

> **Note:** There is no loading, disabled, success, or focus state — this component is output-only and non-interactive.

---

## 6. Properties

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `message` | `string` | `'Something went wrong. Please try again.'` | No | The error copy rendered next to the icon. Controls what is announced to screen readers via `role="alert"`. Keep under ~120 characters to avoid excessive wrapping. |
| `id` | `string` | — | No | HTML `id` applied to the wrapper `<div>`. Pass the same value to the parent input's `aria-describedby` so screen readers announce the error when the input is focused. TextInput, Textarea, Dropdown, and Picklist generate and wire this automatically via `useId`. |

**Notes:**
- There is no `className` or `style` override prop — layout and colour cannot be customised without forking the component.

---

## 7. Content guidelines

**Message text**
- Write in sentence case. End with a period.
- Lead with what went wrong, then (if space allows) what to do: "Email is already in use. Try signing in instead."
- Avoid technical jargon ("422 Unprocessable Entity", "null reference"). Write for the person filling in the form.
- Do not start with "Error:" — the icon and colour already signal the state.
- Keep under 120 characters. At xs type size (12 px) and typical column widths, longer strings will wrap to 3+ lines and lose visual impact.
- Use active voice: "Enter a valid email address" not "A valid email address must be entered."
- The default fallback message (`'Something went wrong. Please try again.'`) is a last resort — always pass a context-specific string from the parent when the error source is known.

**Icon usage with text**
- The icon is always present and cannot be suppressed via props. Do not attempt to convey additional meaning through the icon (it is decorative — it has no `aria-label`).

---

## 8. Accessibility

**Keyboard navigation**
- Not applicable. The component is non-interactive and receives no focus.

**Screen reader behaviour**
- `role="alert"` is applied to the wrapper `div`. This maps to an ARIA live region with `aria-live="assertive"` and `aria-atomic="true"` in most implementations.
- On mount or content change, the full message string is announced immediately — the user does not need to navigate to it.
- The `AlertCircle` icon has no `aria-label` or `aria-hidden="true"`. Screen readers may announce the SVG as an unlabelled image. **Recommended fix:** add `aria-hidden="true"` to the icon span so only the text content is read.  [NEEDS CONFIRMATION — flag for accessibility review]
- There is no `aria-describedby` link between this component and its parent input. The parent input must implement this separately using an `id` on the error message wrapper.

**Colour and contrast**
- `--color-error-text` resolves to `#dc2626` (red-500). On a white (`#ffffff`) background the contrast ratio is approximately 4.5:1 — meets WCAG AA for normal text (4.5:1) at 12 px. Verify on off-white or tinted field backgrounds used in your forms. [NEEDS CONFIRMATION]
- Error state is not communicated by colour alone — the `AlertCircle` icon provides a secondary non-colour indicator.
- Dark mode: no `@media (prefers-color-scheme: dark)` override found for `--color-error-text`. Behaviour on dark backgrounds is unconfirmed. [NEEDS CONFIRMATION]

**Motion**
- The component has no animation. `prefers-reduced-motion` is not applicable.

**Touch / pointer**
- Not applicable. The component is non-interactive.

**Known gaps**
- Icon SVG is not `aria-hidden` — may be announced as an unlabelled image by some screen readers.
- No dark mode token override confirmed.

---

## 9. Design tokens

| Token | Value (from globals.css) | Where applied |
|---|---|---|
| `--color-error-text` | `var(--primitive-red-500)` → `#dc2626` | Icon colour + text colour |
| `--primitive-scale-1` | `0.25rem` (4 px) | Gap between icon and text |
| `--primitive-font-size-xs` | `0.75rem` (12 px) | Text font size |
| `--primitive-font-weight-regular` | `400` | Text font weight |

**Notes:**
- `fontFamily` is no longer set inline — inherited from `body` via `globals.css`.
- `--color-error-text` is a semantic token — correct usage.

---

## 10. Responsive behaviour

The component does not adapt across breakpoints. It is a single-line (or wrapping) inline element with no layout-responsive logic.

- No responsive props.
- Text wraps naturally when the container is narrow; no truncation occurs.
- No hover, focus, or pointer-specific behaviour — the component is display-only.
- Touch behaviour: not applicable (non-interactive).

---

## 11. Composition and usage patterns

**Pattern 1 — Field-level validation error**

Render `<ErrorMessage>` immediately below a `<TextInput>` or `<Select>` when that field fails validation. The input should transition to its error state visually (red border), and `ErrorMessage` provides the associated text.

```tsx
<TextInput
  id="email"
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
{hasError && (
  <ErrorMessage id="email-error" message="Enter a valid email address." />
)}
```

Note: TextInput, Textarea, Dropdown, and Picklist generate and wire the `id` automatically via `useId` — no manual `id` management is needed in those components.

`[STORYBOOK BLOCK: Simple/Forms/ElegantErrorMessage/ElegantErrorMessage]`

**Pattern 2 — Post-submit API error**

Show `<ErrorMessage>` below the submit button or at the bottom of the form section when the server returns a field-level error after submission. Pass the API error string directly as `message`.

Gotcha: ensure the element is mounted (not just toggled visible) so `role="alert"` fires the screen reader announcement. Hiding via CSS `display: none` or `visibility: hidden` will suppress the announcement.

**Pattern 3 — Controlled show/hide**

Conditionally render based on a boolean error state. Do not pass an empty `message=""` to suppress — unmount the component fully.

```tsx
{errorMessage && <ErrorMessage message={errorMessage} />}
```

---

## 12. Related components

| Component | When to use it instead |
|---|---|
| `Banner` / [`Alert`](/design-system/docs/alert-zh) | For page-level or section-level errors that are not tied to a single form field — they carry more visual weight and support actions like "Retry" or "Dismiss" |
| [`Toast`](/design-system/docs/toast-zh) | For transient system errors that appear after an async action (file upload failed, network error) and auto-dismiss after a few seconds |
| `HelperText` | For neutral or informational copy below a field that does not signal an error state — same position, different semantic colour and icon |

---

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Mount and unmount `<ErrorMessage>` conditionally so `role="alert"` fires the screen reader announcement each time an error appears. | Toggle CSS `display: none` or `opacity: 0` to hide it — the alert will not re-announce when it becomes visible again. |
| Pass a specific, context-aware message: "Password must be at least 8 characters." | Always fall back to the default "Something went wrong. Please try again." — it gives the user no actionable information. |
| Write error messages in sentence case ending with a period: "Enter a valid phone number." | Use title case or omit punctuation: "Invalid Phone Number" — it reads as a label, not an instruction. |
| Pass an `id` to `<ErrorMessage>` and the same value to the input's `aria-describedby` to connect them. In TextInput, Textarea, Dropdown, and Picklist this is handled automatically. | Leave the input and error message disconnected — screen reader users navigating by field will miss the error. |
| Keep message copy under 120 characters so it fits in one or two lines at 12 px. | Paste full API error stack traces or technical identifiers into `message` — sanitise and translate them before display. |
| Pair `<ErrorMessage>` with a visual error state on the input (red border, error icon on the field) so colour-blind users have redundant cues. | Rely on `<ErrorMessage>` text colour alone to communicate the error — the icon and the input's own error state are required companions. |
| Unmount `<ErrorMessage>` immediately when the user corrects the field — don't leave stale errors visible. | Show `<ErrorMessage>` before the user has interacted with the field (on initial render) — validate on blur or submit, not on mount. |

---

## 14. Changelog

### 2026-04-27
- **Accessibility:** Added `id` prop to the wrapper `<div>`. Parent inputs (TextInput, Textarea, Dropdown, Picklist) now generate a stable `id` via `useId` and pass it as both `id` on the ErrorMessage and in `aria-describedby` on the input, automatically wiring the screen reader association.
- **Tokens:** Removed redundant `fontFamily` (`--primitive-font-sans`) — inherited from `body`. See `globals.css` for full token definitions.
