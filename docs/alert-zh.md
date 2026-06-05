---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantAlert.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantAlert.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections reviewed against source (2026-04-27):**
- Section 6 (Properties): Updated — `liveRegion` prop added.
- Section 8 (Accessibility): Updated — `aria-live` is now explicit and configurable.

**Remaining recommended follow-ups:**
- Add dedicated stories for each variant (success, error) with controls locked to that variant.
- Add a story showing `showIcon: false`.
- Add a story showing no dismiss button (persistent alert).
- Dismiss button touch target may be under 44×44px — confirm in production contexts.
- Consider adding `aria-describedby` linking message text to the alert role.

---

# Alert

## 1. Overview
An inline, persistent feedback banner that communicates informational, success, or error states directly within the page layout without interrupting user flow.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Surfacing a persistent page-level message that must remain visible (e.g., a billing warning) | Transient feedback after an action — use Toast instead |
| Communicating the outcome of a form submission inline, above the form | Full-page error states — use a dedicated error page or empty state |
| Providing contextual guidance tied to a specific UI region | Multiple simultaneous alerts — keep to one per context to avoid noise |
| Showing a recoverable error or a non-blocking notice inside a card or panel | Replacing inline field-level validation — keep those adjacent to the input |

## 3. Anatomy
1. **Container** — full-width flex row with a 1 px variant-colored border and surface background.
2. **Icon** (optional) — 16 px Lucide icon (Info / CheckCircle / XCircle) color-coded to variant; hidden when `showIcon` is false.
3. **Body** — flex column holding the title and message text.
4. **Title** (optional) — bold sm-sized label; omitted when `title` prop is not passed.
5. **Message** — regular-weight sm-sized muted text; always present.
6. **Dismiss button** (optional) — 14 px X icon button; rendered only when `onDismiss` is supplied.

`[STORYBOOK BLOCK: Simple/Communications/ElegantAlert/Default]`

## 4. Variants

**Info**
- Renders a neutral gray border (`--color-info-border`) and an Info icon in muted text color.
- Use for neutral guidance or contextual notes that carry no urgency.
- No constraint on usage frequency within a page, but prefer sparing use.

**Success**
- Renders a green border (`--color-text-accent`) and a CheckCircle icon in accent color.
- Use to confirm a completed action or a positive system state (e.g., "Verification complete").
- Should be paired with a specific outcome — avoid vague success messages.

**Error**
- Renders a red border (`--color-error-text`) and an XCircle icon in error text color.
- Use for actionable error states the user must resolve (e.g., "Payment failed").
- Pair with specific remediation instructions in the message body.

## 5. States

**Default**
- Alert is visible; dismiss button (if present) is in its resting muted color.
- Keyboard: dismiss button is naturally focusable.
- Screen reader: `role="alert"` announces content immediately on render.

**Hover (dismiss button)**
- Triggered by pointer entering the dismiss button.
- Dismiss button color transitions from `--color-text-muted` to `--color-text-body` over 150 ms.
- No change to the alert container itself.

**Dismissed**
- Triggered by clicking the dismiss button, which calls `onDismiss`.
- The component has no internal visibility state — the parent is responsible for unmounting it.
- After unmounting, the element is removed from the accessibility tree.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'info' \| 'success' \| 'error'` | `'info'` | No | Controls border color and icon. |
| `title` | `string` | `undefined` | No | Bold label rendered above the message. Omit to show message only. |
| `message` | `string` | — | **Yes** | Main text content of the alert. |
| `onDismiss` | `() => void` | `undefined` | No | If provided, renders a dismiss button and calls this callback on click. |
| `showIcon` | `boolean` | `true` | No | Whether to render the leading variant icon. |
| `liveRegion` | `'polite' \| 'assertive'` | `'polite'` | No | Controls `aria-live` urgency. Use `'assertive'` for error alerts that demand immediate attention (e.g., a failed payment). Use `'polite'` (default) for informational and success alerts that should not interrupt an ongoing screen reader announcement. Note: `role="alert"` alone would always be assertive — this prop gives engineers explicit control. |

## 7. Content guidelines
- **Title:** Use sentence case, 3–6 words maximum. State the condition, not the action ("Heads up", "Action required", "Upload failed").
- **Message:** One to two sentences. Be specific about what happened and — for errors — what to do next. Avoid "Error occurred" with no further context.
- **Dismiss label:** The dismiss button always reads "Dismiss" to screen readers via `aria-label`. Do not override this via the API.
- **Icon:** Icons are purely decorative (`aria-hidden="true"`) and reinforce the variant meaning visually. Do not rely on color alone — the icon provides a second signal.

## 8. Accessibility
- **Role:** `role="alert"` and `aria-live={liveRegion}` are both set on the container. `aria-live` defaults to `'polite'` — content is announced after the current screen reader sentence finishes. Pass `liveRegion="assertive"` for urgent errors that must interrupt immediately.
- **Keyboard navigation:** The dismiss button is a native `<button>` and receives focus in tab order. No custom keydown handling — Enter and Space activate it natively.
- **Screen reader behavior:** Icon has `aria-hidden="true"`. Dismiss button has `aria-label="Dismiss"`. The title and message are read as inline text within the alert region.
- **Color and contrast:** Muted text (`--color-text-muted` = `#666666`) on surface background (`#fafafa`) — verify WCAG AA 4.5:1 ratio at small text sizes. [NEEDS CONFIRMATION]
- **Motion:** The dismiss button color transition is 150 ms. No `prefers-reduced-motion` override is implemented — consider suppressing the transition for users who prefer reduced motion.
- **Focus ring:** No custom `:focus-visible` ring is applied to the dismiss button — browser default applies.
- **Touch/pointer:** Dismiss button renders at 14 px icon size with `padding: 0` — effective touch target is ~14px, below the 44×44px WCAG 2.5.5 minimum. Known gap. Wrap in a larger hit area for production use.
- **Known gaps:** Dismiss button has insufficient touch target size (~14px). Consider wrapping in a larger hit area for production use.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-info-border` | `var(--primitive-gray-200)` = `#e5e5e5` | Info variant border color |
| `--color-text-accent` | `var(--primitive-green-500)` → `#2e6f40` | Success variant border color; success icon color |
| `--color-error-text` | `var(--primitive-red-500)` → `#dc2626` | Error variant border color; error icon color |
| `--color-text-muted` | `var(--primitive-gray-600)` → `#666666` | Info icon color; message text; dismiss button |
| `--color-text-body` | `var(--primitive-gray-900)` → `#171717` | Title text; dismiss button hover color |
| `--color-bg-surface` | `var(--primitive-gray-50)` → `#fafafa` | Container background |
| `--primitive-font-size-sm` | `0.875rem` | Title and message font size |
| `--primitive-font-weight-bold` | `700` | Title font weight |
| `--primitive-font-weight-regular` | `400` | Message font weight |
| `--size-notification-padding` | `var(--primitive-scale-3) var(--primitive-scale-4)` | Vertical / horizontal container padding |
| `--size-notification-gap` | `var(--primitive-scale-3)` = `0.75rem` | Gap between icon/body/dismiss |
| `--size-notification-radius` | `var(--primitive-radius-md)` = `4px` | Container border radius |
| `--primitive-scale-1` | `0.25rem` | Margin below title when title is present |
| `--primitive-duration-fast` | `150ms` | Dismiss button color transition duration |
| `--primitive-easing-default` | `ease` | Dismiss button color transition easing |

## 10. Responsive behavior
The Alert has no internal breakpoint logic. It is a full-width block element and adapts to its container. Ensure the container constrains width appropriately — the alert will stretch to fill its parent on any viewport size.

## 11. Composition and usage patterns

**Dismissible alert with title**
The most common pattern: a variant, title, message, and dismiss callback. The parent manages a boolean visibility flag and unmounts the alert on dismiss.

```tsx
const [show, setShow] = useState(true);
{show && (
  <Alert
    variant="error"
    title="Payment failed"
    message="Your card was declined. Please update your payment details."
    onDismiss={() => setShow(false)}
  />
)}
```

**Persistent alert (no dismiss)**
Omit `onDismiss` for alerts that must stay visible until the underlying condition resolves (e.g., an unverified email banner).

```tsx
<Alert
  variant="info"
  message="Please verify your email address to unlock all features."
/>
```

`[STORYBOOK BLOCK: Simple/Communications/ElegantAlert/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [Toast](/design-system/docs/toast-zh) | For transient feedback triggered by user actions (auto-dismisses after 4 s, positioned as an overlay) |
| [Modal](/design-system/docs/modal-zh) | When the user must acknowledge an error or confirm a destructive action before proceeding |
| [Badge](/design-system/docs/badge-zh) | For compact, non-interactive status labels within a list or table cell |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use `variant="error"` for states the user must resolve, paired with a clear remediation message. | Use `variant="error"` for informational notes — reserve red for genuine failures. |
| Keep the title to 3–6 words in sentence case. | Use the title to restate the message — it should add a category label, not repeat content. |
| Pass `onDismiss` only when the user can meaningfully dismiss the alert (i.e., it's non-critical). | Make critical error alerts dismissible without a resolution path — the user should fix the error, not hide it. |
| Let the container determine width; alerts adapt naturally. | Set a fixed pixel width on the alert — it should respect its layout context. |
| Keep messages to one or two sentences; link to a help article if more detail is needed. | Write paragraph-length alert messages — move that content to a modal or expanded panel. |
| Use `showIcon={false}` in dense UI contexts where icon space is constrained. | Disable the icon without ensuring the variant is still communicated through border color and text. |

## 14. Changelog

### 2026-04-27
- **Accessibility:** Added `liveRegion` prop (`'polite' | 'assertive'`, default `'polite'`). Previously `role="alert"` alone implied assertive for all variants. Engineers can now pass `liveRegion="assertive"` for urgent errors and use the default `'polite'` for informational and success alerts so they don't interrupt ongoing screen reader announcements.
- **Tokens:** Replaced primitive token references with semantic equivalents (`--color-border-default`, `--size-notification-padding`, `--size-notification-gap`, `--size-notification-radius`). Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.
