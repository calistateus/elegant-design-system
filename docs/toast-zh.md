---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantToast.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantToast.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): entrance/exit animation uses opacity + translateY via CSS transition (not GSAP). Exit is triggered by `setVisible(false)` then a 300 ms setTimeout before DOM removal. Documented as observed.
- Section 8 (Accessibility): `role="alert"` + `aria-live="assertive"` is used for all variants including `default` — this may be overly aggressive for non-error toasts. Flagged for review.
- Section 10 (Responsive): viewport switches from bottom-right (desktop) to top, full-width (≤767px) via injected `<style>` block. Breakpoint is 767px, not aligned to the design system's 600px breakpoint — flagged.

**Recommended follow-ups:**
- Stories for Default, Success, and Error exist but only show a trigger button — consider adding a static preview story that renders `ToastItem` directly for visual regression.
- Confirm whether `aria-live="polite"` is more appropriate for the `default` variant.
- The 767px breakpoint inside `ToastProvider` does not match the design system breakpoints (600px / 1136px / 1440px) — recommend aligning.
- No `prefers-reduced-motion` handling — add CSS to suppress the slide transition.
- Auto-dismiss timer (4000 ms) is not paused on hover/focus — consider adding this for users who need more time.

---

# Toast

## 1. Overview
A transient overlay notification that appears at the viewport edge, communicates a brief status message, and auto-dismisses after 4 seconds without requiring user action.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Confirming a completed background action (e.g., "Saved successfully") | Critical errors the user must act on — use an Alert or Modal instead |
| Surfacing a brief system-level notification | Messages longer than one sentence — toasts truncate and disappear too quickly |
| Non-blocking feedback that does not interrupt the current task | Confirmation of destructive actions — require explicit user acknowledgment |
| Reporting an error that does not prevent the user from continuing | Replacing inline form validation — keep errors adjacent to the triggering field |

## 3. Anatomy
1. **Viewport** — fixed-position container, bottom-right on desktop; top full-width on mobile. Stacks multiple toasts vertically.
2. **Toast item** — individual notification card with border, shadow, and icon/message/dismiss row.
3. **Icon** — 16 px Lucide icon (Info / CheckCircle / XCircle) color-coded to variant.
4. **Message** — sm-sized body text; single line in most cases.
5. **Dismiss button** — 14 px X icon; manually dismisses before auto-dismiss fires.

`[STORYBOOK BLOCK: Simple/Communications/ElegantToast/Default]`

## 4. Variants

**Default**
- Gray border (`--primitive-gray-200`), Info icon in body text color.
- Use for neutral informational feedback (e.g., clipboard copy, settings saved).
- No urgency implied.

`[STORYBOOK BLOCK: Simple/Communications/ElegantToast/Default]`

**Success**
- Green border (`--primitive-green-500`), CheckCircle icon in accent color.
- Use to confirm a completed action with a positive outcome.
- Keep the message concise and past-tense ("Saved successfully", "Uploaded").

`[STORYBOOK BLOCK: Simple/Communications/ElegantToast/Success]`

**Error**
- Red border (`--primitive-red-500`), XCircle icon in error text color.
- Use for non-blocking errors that do not prevent the user from continuing.
- If the error requires resolution, use an Alert or Modal rather than a Toast.

`[STORYBOOK BLOCK: Simple/Communications/ElegantToast/Error]`

## 5. States

**Entering**
- Triggered on mount via `requestAnimationFrame`.
- Opacity transitions from 0 to 1; transform transitions from `translateY(8px)` to `translateY(0)` on desktop, or `translateY(-8px)` to `translateY(0)` on mobile.
- Duration: `--primitive-duration-relaxed` (350 ms), easing: `--primitive-easing-power2-out`.

**Visible (resting)**
- Toast is fully opaque and in final position.
- Auto-dismiss timer is running (4000 ms).
- Dismiss button is in muted color.

**Dismiss button hover**
- Dismiss button color transitions from `--color-text-muted` to `--color-text-body` over 150 ms.
- No other visual change.

**Exiting**
- Triggered by auto-dismiss timer or manual dismiss button click.
- Opacity transitions to 0 (same 350 ms transition in reverse) via `setVisible(false)`.
- After 300 ms, the item is removed from the DOM (via `onDismiss` callback to parent).

**Stacked**
- Multiple toasts stack vertically with `--primitive-scale-2` (0.5rem) gap between items.
- New toasts append below existing ones on desktop.

## 6. Properties

### `toast()` function (from `useToast()`)
| Parameter | Type | Default | Required | Description |
|---|---|---|---|---|
| `message` | `string` | — | **Yes** | Text content displayed in the toast. |
| `variant` | `'default' \| 'success' \| 'error'` | `'default'` | No | Visual style of the toast. |

### `ToastProvider`
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `children` | `React.ReactNode` | — | **Yes** | App subtree that can fire toasts via `useToast()`. |

## 7. Content guidelines
Toast messages should be a single sentence, written in past tense for completed actions ("Saved", "Copied to clipboard") or present tense for errors ("Something went wrong"). Maximum practical length is approximately 60 characters before text wraps noticeably within the 240–360 px width range. Do not include links or interactive elements in the message string — the only interactive element is the dismiss button.

## 8. Accessibility
- **Role:** Each toast item has `role="alert"` and `aria-live="assertive"`, which causes screen readers to interrupt and announce the message immediately on render. This is appropriate for errors but may be too aggressive for the `default` variant — confirm whether `aria-live="polite"` is preferred for non-error toasts. [NEEDS CONFIRMATION]
- **Keyboard navigation:** The dismiss button is a native `<button>` reachable by Tab. No focus trap is applied — the toast is non-modal.
- **Screen reader behavior:** The viewport container has `aria-label="Notifications"`. Each toast announces its full message on mount. The dismiss button has `aria-label="Dismiss"`.
- **Color and contrast:** Error text (`--color-error-text` = `#dc2626`) and success accent (`--color-text-accent` = `#2e6f40`) on white background — verify WCAG AA 4.5:1 at xs font size. [NEEDS CONFIRMATION]
- **Motion:** Entrance and exit animations use opacity and transform transitions at 350 ms. No `prefers-reduced-motion` media query is implemented — add `@media (prefers-reduced-motion: reduce)` to suppress transitions.
- **Focus ring:** No custom `:focus-visible` ring is applied to the dismiss button — browser default applies.
- **Touch/pointer:** Dismiss button renders at 14 px icon size with `padding: 0` — effective touch target is ~14px, below the 44×44px WCAG 2.5.5 minimum. Known gap. Wrap in a larger hit area for mobile production use.
- **Known gaps:** Auto-dismiss timer is not paused on hover or focus, which may be insufficient for users who need more time. Consider pausing the timer on `mouseenter` / `focus`.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-border-default` | `var(--primitive-gray-200)` = `#e5e5e5` | Default variant border color |
| `--color-text-accent` | `var(--primitive-green-500)` → `#2e6f40` | Success variant border color; success icon color |
| `--color-error-text` | `var(--primitive-red-500)` → `#dc2626` | Error variant border color; error icon color |
| `--color-text-body` | `var(--primitive-gray-900)` → `#171717` | Default icon color; body text; dismiss hover |
| `--color-text-muted` | `var(--primitive-gray-600)` → `#666666` | Dismiss button resting color |
| `--color-bg-main` | `var(--primitive-white)` → `#ffffff` | Toast item background |
| `--primitive-font-size-sm` | `0.875rem` | Message font size |
| `--primitive-scale-2` | `0.5rem` | Gap between stacked toasts |
| `--size-notification-padding` | `var(--primitive-scale-3) var(--primitive-scale-4)` | Toast item padding (vertical / horizontal) |
| `--size-notification-gap` | `var(--primitive-scale-3)` = `0.75rem` | Gap between icon/message/dismiss |
| `--primitive-scale-6` | `1.5rem` | Viewport offset from bottom/top and sides |
| `--size-notification-radius` | `var(--primitive-radius-md)` = `4px` | Toast item border radius |
| `--motion-interactive-color` | `color 150ms ease` | Dismiss button hover color transition |
| `--primitive-duration-relaxed` | `350ms` | Enter/exit opacity and transform transition |
| `--primitive-easing-power2-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Enter/exit easing |
| `--motion-toast-dismiss-ms` | `4000` | Auto-dismiss delay (referenced in tokens, used as 4000 ms literal in source) |
| `--z-index-toast` | `9999` | Viewport z-index |

## 10. Responsive behavior
- **Desktop (≥768px):** Viewport is fixed to the bottom-right corner, offset `--primitive-scale-6` (1.5rem) from the bottom and right edges. Toast slides up on enter (`translateY(8px)` → 0).
- **Mobile (≤767px):** Viewport moves to the top of the screen, spanning the full width between `--primitive-scale-6` left and right insets. Toast slides down on enter (`translateY(-8px)` → 0).
- Note: the 767px breakpoint is injected as a raw `<style>` tag inside `ToastProvider` and does not use the design system's defined breakpoints (600px / 1136px / 1440px). Alignment with the grid token layer is recommended.

## 11. Composition and usage patterns

**Provider setup**
Wrap the application root (or the highest relevant subtree) in `ToastProvider` once. All descendant components can then call `useToast()`.

```tsx
// _app.tsx or layout.tsx
<ToastProvider>
  <App />
</ToastProvider>
```

**Firing a toast from a child component**
```tsx
function SaveButton() {
  const { toast } = useToast();
  return (
    <button onClick={() => toast('Saved successfully.', 'success')}>
      Save
    </button>
  );
}
```

**Error toast after a failed request**
```tsx
try {
  await saveData();
  toast('Saved.', 'success');
} catch {
  toast('Something went wrong. Please try again.', 'error');
}
```

`[STORYBOOK BLOCK: Simple/Communications/ElegantToast/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| Alert | For persistent, inline messages that must stay visible until the condition resolves |
| Modal | When the user must explicitly acknowledge an error or confirm a destructive action |
| Badge | For compact, static status labels within lists or tables |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Write toast messages in past tense for completed actions ("Copied", "Saved successfully"). | Write action-directing messages in toasts — they auto-dismiss before the user can act. |
| Use `variant="error"` only for non-blocking errors; pair with an Alert or Modal for errors requiring resolution. | Show destructive confirmation toasts — always require explicit user acknowledgment for irreversible actions. |
| Keep messages under ~60 characters to fit within the 240–360 px toast width. | Put multi-sentence explanations in a toast; redirect to an alert, notification center, or modal. |
| Place `ToastProvider` once at the app root so any component can call `useToast()`. | Nest multiple `ToastProvider` instances — this creates separate, isolated toast stacks. |
| Let toasts auto-dismiss — they are designed as transient feedback. | Remove the dismiss button — users who need more time must be able to manually clear it. |
| Fire one toast per action outcome. | Stack many toasts simultaneously; more than 2–3 visible at once creates noise. |

## 14. Changelog

### 2026-04-27
- **Tokens:** Replaced primitive token references with semantic equivalents (`--color-border-default`, `--size-notification-padding`, `--size-notification-gap`, `--size-notification-radius`, `--motion-interactive-color`). Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.

**2026-04-27** — Fix `aria-live`: use `polite` for default/success variants, keep `assertive` for error only; increase dismiss button padding to 4px; align mobile breakpoint to 599px
