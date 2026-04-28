---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantPinInput.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantPinInput.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): There is no explicit "error" or "success" visual state in the source — no error prop exists. Flagged as a gap.
- Section 8 (Accessibility): `inputMode="numeric"` is set but the caret is hidden (`caretColor: transparent`) — this may confuse some users. Flagged.

**Recommended follow-ups:**
- Add an error state (invalid PIN, too many attempts) with a visible error message prop.
- Add a success / verified state.
- Restore visible caret or document the rationale for hiding it.
- Add a story demonstrating paste behavior.
- Consider `autocomplete="one-time-code"` on the inputs for SMS OTP autofill.

---

# Pin Input

## 1. Overview
A one-time-code / PIN entry control that renders individual digit cells, auto-advances focus on input, and fires an `onComplete` callback when all digits are filled.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| OTP / two-factor authentication code entry | General numeric inputs (quantity, price) — use a number input or RangeSlider |
| PIN confirmation at login | Passcodes longer than 6 digits — the component only supports 4 or 6 |
| Verification codes sent by email or authenticator app | Alphanumeric codes — the component strips non-digit characters |
| Any flow where a fixed-length numeric code must be entered | Free-form text entry — use TextInput |

## 3. Anatomy
1. **Heading** — rendered as `<h5>`; names the input group for screen readers and sighted users.
2. **Description** — optional supporting text explaining where the code was sent or what to do.
3. **Digit cells** — a row of 4 or 6 individual `<input type="text">` elements grouped in a `role="group"` div.
4. **Action link** — optional text button below the cells (e.g. "Resend code", "Use backup code instead").

`[STORYBOOK BLOCK: Simple/Forms/ElegantPinInput/4-digit]`

## 4. Variants

**4-digit** (`digits={4}`)
- Four equally sized cells; used for shorter PINs.
- Common use case: login PIN, short OTP.
- Each cell is 2.75rem wide × 3rem tall.
`[STORYBOOK BLOCK: Simple/Forms/ElegantPinInput/4-digit]`

**6-digit** (`digits={6}`)
- Six equally sized cells; used for longer verification codes.
- Common use case: TOTP authenticator codes, email verification.
- Same cell dimensions as the 4-digit variant.
`[STORYBOOK BLOCK: Simple/Forms/ElegantPinInput/6-digit]`

## 5. States

**Default / Empty**
- All cells are blank with a `--primitive-gray-300` border.
- No shadow or highlight.

**Focused cell**
- The active cell receives a `--primitive-gray-600` border and a `box-shadow: 0 0 0 2px var(--primitive-gray-200)` focus ring.
- Triggered by Tab, click, or auto-advance from the previous cell.
- `caretColor` is set to `transparent` — the cursor is hidden to keep the cell clean.

**Filled**
- A digit character is displayed in monospace (`--primitive-font-mono`) at `--primitive-font-size-xl`.
- No separate visual treatment for the filled state beyond the digit being visible.

**Disabled**
- All cells receive `backgroundColor: var(--color-interactive-disabled-bg)` (#f5f5f5); border becomes `var(--color-interactive-disabled-border)` (#e5e5e5); `opacity: var(--opacity-disabled)` (0.5); `cursor: not-allowed`. Focus ring is suppressed when disabled.
- The action link button is also `disabled`.
- User interaction is blocked.

**Complete**
- Triggered internally when all cells are non-empty.
- `onComplete(value)` is called with the full PIN string.
- No built-in visual state change — consumer handles post-completion behavior (e.g. spinner, navigation).

`[STORYBOOK BLOCK: Simple/Forms/ElegantPinInput/Disabled]`

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `heading` | `string` | — | Yes | Label for the PIN group, rendered as `<h5>`. Used as the `aria-label` for the `role="group"` container. |
| `description` | `string` | — | No | Supporting text below the heading. |
| `digits` | `4 \| 6` | `4` | No | Number of digit cells to render. |
| `actionLink` | `{ label: string; onClick: () => void }` | — | No | Optional text button below the cells (e.g. "Resend code"). |
| `onChange` | `(value: string) => void` | — | No | Called on every keystroke with the current partial or full value. |
| `onComplete` | `(value: string) => void` | — | No | Called once when all digits are filled. |
| `disabled` | `boolean` | `false` | No | Disables all inputs and the action link. |

## 7. Content guidelines
- **Heading**: Be specific — "Enter your PIN" or "Enter verification code", not "Code". Capitalize first word only.
- **Description**: Explain the source of the code ("We sent a 4-digit code to your email.") so users know where to look. Keep to one sentence.
- **Action link label**: Use an active verb phrase: "Resend code", "Use backup code instead", "Forgot PIN?". Do not use "Click here".
- **No error copy**: The component has no error prop. If implementing error states, follow the Error Message component guidelines for copy ("Incorrect PIN. Please try again.").

## 8. Accessibility
- **Keyboard navigation**: Tab moves between cells normally. Within the group: typing a digit auto-advances focus to the next cell. Backspace on an empty cell moves focus to the previous cell and clears it. ArrowLeft / ArrowRight move focus between cells without clearing values.
- **Screen reader behavior**: Each input has `aria-label="Digit N of M"` (e.g. "Digit 1 of 4"). The cell group has `aria-label` matching the `heading` prop via `role="group"`. The heading is rendered as a visible `<h5>` element.
- **Paste support**: Pasting a numeric string distributes digits across cells automatically, stripping non-digit characters. Focus lands on the last filled cell.
- **Color and contrast**: Focused cell border (#666666 on white) meets WCAG AA for UI components. Disabled state uses 60% opacity.
- **Motion**: Border and box-shadow transitions are 150ms ease. No `prefers-reduced-motion` check — [NEEDS CONFIRMATION].
- **Touch/pointer**: Each cell is 2.75rem × 3rem (44px × 48px) — meets 44×44px touch target requirement.
- **Known gaps**: `autocomplete="one-time-code"` is not set, so SMS OTP autofill (iOS Safari, Android Chrome) will not trigger. The caret is hidden (`caretColor: transparent`) which may confuse users who expect a visible cursor in the active cell.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--primitive-font-mono` | `DM Mono, monospace` | Digit cell font family |
| `--primitive-font-size-xl` | `1.25rem` | Digit display font size |
| `--primitive-font-size-sm` | `0.875rem` | Description font size |
| `--primitive-font-weight-medium` | `500` | Digit cell font weight |
| `--primitive-font-weight-regular` | `400` | Description font weight |
| `--type-h5-family` | `var(--primitive-font-sans)` | Heading font family |
| `--type-h5-size` | `var(--primitive-font-size-base)` → `1rem` | Heading font size |
| `--type-h5-weight` | `var(--primitive-font-weight-bold)` → `700` | Heading weight |
| `--type-h5-line-height` | `1.4` | Heading line height |
| `--type-action-link-family` | `var(--primitive-font-sans)` | Action link font family |
| `--type-action-link-size` | `var(--primitive-font-size-sm)` → `0.875rem` | Action link font size |
| `--type-action-link-weight` | `var(--primitive-font-weight-medium)` → `500` | Action link font weight |
| `--type-action-link-letter-spacing` | `-0.01em` | Action link letter spacing |
| `--color-text-title` | `var(--primitive-black)` → `#1e1e1e` | Heading color; digit text color |
| `--color-text-body` | `var(--primitive-gray-900)` → `#171717` | Digit cell value color |
| `--color-text-muted` | `var(--primitive-gray-600)` → `#666666` | Description color |
| `--color-text-accent` | `var(--primitive-green-500)` → `#2e6f40` | Action link color |
| `--color-interactive-disabled-bg` | `var(--primitive-gray-100)` → `#f5f5f5` | Cell background (disabled) |
| `--color-interactive-disabled-border` | `var(--primitive-gray-200)` → `#e5e5e5` | Cell border (disabled) |
| `--opacity-disabled` | `0.5` | Cell opacity (disabled) |
| `--shadow-focus-ring` | `0 0 0 2px var(--primitive-gray-200)` = `0 0 0 2px #e5e5e5` | Focused cell outer ring |
| `--color-border-input` | `var(--primitive-gray-300)` = `#d4d4d4` | Default cell border |
| `--color-border-input-focus` | `var(--primitive-gray-600)` = `#666666` | Focused cell border |
| `--size-input-radius` | `var(--primitive-radius-md)` = `4px` | Cell border radius |
| `--primitive-scale-1` | `0.25rem` | Gap between heading and description |
| `--primitive-scale-2` | `0.5rem` | Gap between digit cells |
| `--primitive-scale-4` | `1rem` | Vertical gap between sections |

## 10. Responsive behavior
The component renders in a fixed-width flex column. Cell widths are fixed (2.75rem each) with a 0.5rem gap. A 4-digit row is approximately 132px wide; a 6-digit row is approximately 194px wide. The Storybook decorator constrains the demo to 320px. There are no breakpoint overrides; the consumer controls positioning.

## 11. Composition and usage patterns

**Standard OTP entry (with resend)**
Heading + description explaining the code source + 4 or 6 digit cells + "Resend code" action link. Submit is triggered programmatically via `onComplete`.
`[STORYBOOK BLOCK: Simple/Forms/ElegantPinInput/4-digit]`

**Headless (no description, no action link)**
Use `NoActionLink` pattern when the context is already clear (e.g. a modal with a title explaining the OTP step). Omit description to reduce visual noise.
`[STORYBOOK BLOCK: Simple/Forms/ElegantPinInput/No action link]`

**6-digit authenticator code**
`digits={6}` with description pointing to the authenticator app and an action link to "Use backup code instead".
`[STORYBOOK BLOCK: Simple/Forms/ElegantPinInput/6-digit]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| TextInput | For alphanumeric codes or free-form text entry. |
| ElegantForm | To wrap the PinInput in a form context with a submit lifecycle. |
| ElegantButton | To provide an explicit "Verify" submit action alongside the PinInput (use `onComplete` to trigger it). |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Always provide a `heading` that describes what the code is for ("Enter your PIN", "Enter verification code"). | Leave the heading as a generic string like "Code" — screen readers announce it as the group label. |
| Include a description that tells the user where to find the code. | Show only the digit cells with no contextual text — users may not know what to enter. |
| Use `onComplete` to trigger validation or submission automatically when all digits are filled. | Require an extra "Verify" button press after all digits are entered unless there is a specific UX reason. |
| Provide an action link for code expiry recovery ("Resend code"). | Leave users with no recovery path if the code expires or doesn't arrive. |
| Use `digits={6}` for TOTP authenticator codes and `digits={4}` for shorter PINs. | Try to use this component for codes longer than 6 digits — it only supports 4 or 6. |
| Disable the component during async verification to prevent re-entry. | Leave cells editable while a verification request is in flight — it can cause race conditions. |

## 14. Changelog

### 2026-04-27
- **Disabled state:** Migrated disabled cell styles to semantic tokens — background uses `--color-interactive-disabled-bg`, border uses `--color-interactive-disabled-border`, opacity uses `var(--opacity-disabled)` (0.5, was 0.6). Focus ring is suppressed when disabled.
- **Tokens:** Replaced primitive token references with semantic equivalents (`--color-border-input`, `--color-border-input-focus`, `--shadow-focus-ring`, `--size-input-radius`). Removed redundant container `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.
