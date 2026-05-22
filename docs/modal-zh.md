---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantModal.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantModal.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections reviewed against source (2026-04-27):**
- Section 8 (Accessibility): Updated — focus trap, Escape key, and focus restoration are now implemented.

**Remaining recommended follow-ups:**
- Add an entrance animation (fade + scale from center) for better perceived performance.
- Add a story showing the `container` slot with real content (e.g., a form or confirmation button row).
- Confirm whether multiple modals can be stacked — no stacking logic exists.

---

# Modal

## 1. Overview
A centered overlay dialog that interrupts the current flow to present a focused task, confirmation, or piece of information that requires the user's full attention.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Confirming a destructive or irreversible action (e.g., "Delete project") | Non-critical notices that don't need user acknowledgment — use Alert or Toast |
| Collecting a small, focused set of inputs as part of a flow | Complex multi-step forms — use a dedicated page or drawer instead |
| Displaying a required acknowledgment before proceeding | Displaying large amounts of content — use a page or Drawer Sheet |
| Presenting a contextual detail view that overlays the current page | Replacing navigation — modals should not be used to move between major sections |

## 3. Anatomy
1. **Backdrop** — full-viewport scrim (`--color-overlay-scrim`) that closes the modal on click.
2. **Panel** — centered white card, max-width 480 px, with border, rounded corners, and internal padding.
3. **Header row** — flex row containing the heading and optional close button.
4. **Heading** — h5-styled title; always present; linked to `aria-labelledby` on the dialog element.
5. **Close button** (optional) — 16 px X icon button; rendered only when `onClose` is provided.
6. **Description** (optional) — sm-sized muted paragraph below the header row.
7. **Container slot** (optional) — unstyled `<div>` accepting any child component for custom content.

`[STORYBOOK BLOCK: Simple/Communications/ElegantModal/HeadingOnly]`

## 4. Variants

**Heading only**
- Renders heading and optional close button; no description or container content.
- Use for minimal confirmation dialogs where the heading alone communicates the decision.
- Typically paired with action buttons placed in the `container` slot.

`[STORYBOOK BLOCK: Simple/Communications/ElegantModal/HeadingOnly]`

**With description**
- Adds a muted paragraph below the heading to elaborate on consequences or context.
- Use when the heading alone does not provide sufficient information for the user to make a decision (e.g., destructive confirmations).

`[STORYBOOK BLOCK: Simple/Communications/ElegantModal/WithDescription]`

## 5. States

**Closed**
- `open={false}` causes the component to return `null` — nothing is rendered; no DOM presence.

**Open**
- `open={true}` renders the backdrop and panel immediately with no entrance animation.
- Panel is visible at full opacity in its final centered position.
- Close button (if present) is in resting muted color.

**Close button hover**
- Dismiss button color transitions from `--color-text-muted` to `--color-text-body` over 150 ms.

> **Note:** No entrance or exit animation is implemented — the panel appears at full opacity immediately. An entrance animation (fade + scale) is a recommended follow-up.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `open` | `boolean` | — | **Yes** | Controls whether the modal renders. When `false`, nothing is mounted. |
| `heading` | `string` | — | **Yes** | H5-level heading text. Linked to the dialog via `aria-labelledby`. |
| `description` | `string` | `undefined` | No | Optional supporting paragraph rendered below the heading. |
| `container` | `React.ReactNode` | `undefined` | No | Optional slot for any custom content (e.g., form, button row). |
| `onClose` | `() => void` | `undefined` | No | If provided, renders a close button and calls this when the backdrop or button is clicked. |

## 7. Content guidelines
- **Heading:** Use sentence case, 3–6 words. Frame as an action or question ("Delete project", "Confirm changes"). Avoid vague labels ("Are you sure?").
- **Description:** One to two sentences. Describe consequences of the action, not the mechanics. ("This will permanently remove the project and all associated files. This action cannot be undone.")
- **Close button:** Screen readers read `aria-label="Close modal"`. Do not add visible close text.
- **Container content:** When placing action buttons in the `container` slot, lead with the primary action on the right and a cancel or secondary action on the left, following standard confirmation dialog conventions.

## 8. Accessibility
- **Role:** `role="dialog"` and `aria-modal="true"` are applied to the panel. `aria-labelledby="elegant-modal-heading"` links the dialog to its heading.
- **Focus management:** On open, focus moves to the first focusable element inside the panel (via `requestAnimationFrame` to ensure the panel is in the DOM). On close, focus is restored to the element that was focused before the modal opened (stored in a ref).
- **Focus trap:** While the modal is open, Tab and Shift+Tab cycle focus only within the panel's focusable elements. Focus cannot escape the dialog while it is open.
- **Keyboard navigation:** Pressing `Escape` calls `onClose` and closes the modal. Tab/Shift+Tab cycle through focusable elements within the panel. Close button activates with Enter/Space (native button behaviour).
- **Screen reader behavior:** On open, the dialog role and heading are announced. The description is read as part of the dialog's content. The close button has `aria-label="Close modal"`.
- **Backdrop click:** Clicking the backdrop calls `onClose` if provided.
- **Color and contrast:** Heading uses `--color-text-title` (black `#1e1e1e`) on white — passes WCAG AA. Description uses `--color-text-muted` (`#666666`) on white — verify at sm font size.
- **Motion:** No animation — no `prefers-reduced-motion` handling required.
- **Focus ring:** Elements inside the modal use their own component-level focus styles (browser default for buttons, `--shadow-focus-ring` for form inputs, etc.). No additional modal-level focus styling is applied.
- **Touch/pointer:** Close button renders at 16 px icon size with `padding: 0` — effective touch target is ~16px, well below the 44×44px WCAG 2.5.5 minimum. Known gap. Recommend wrapping in a larger hit area (e.g., `min-width: 44px; min-height: 44px`) for production use.
- **Known gaps:** Close button has insufficient touch target size (~16px). No entrance/exit animation.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-overlay-scrim` | `rgba(30, 30, 30, 0.4)` | Backdrop background |
| `--color-bg-main` | `var(--primitive-white)` → `#ffffff` | Panel background |
| `--color-border-subtle` | `var(--primitive-gray-100)` → `#f5f5f5` | Panel border |
| `--color-text-title` | `var(--primitive-black)` → `#1e1e1e` | Heading text color |
| `--color-text-muted` | `var(--primitive-gray-600)` → `#666666` | Description text; close button resting color |
| `--color-text-body` | `var(--primitive-gray-900)` → `#171717` | Close button hover color |
| `--type-h5-family` | `var(--primitive-font-sans)` → `DM Sans` | Heading font family |
| `--type-h5-size` | `var(--primitive-font-size-base)` → `1rem` | Heading font size |
| `--type-h5-weight` | `var(--primitive-font-weight-bold)` → `700` | Heading font weight |
| `--type-h5-line-height` | `1.4` | Heading line height |
| `--primitive-font-size-sm` | `0.875rem` | Description font size |
| `--primitive-font-weight-regular` | `400` | Description font weight |
| `--size-card-radius` | `var(--primitive-radius-md)` → `4px` | Panel border radius |
| `--size-card-padding` | `var(--primitive-scale-6)` → `1.5rem` | Panel internal padding |
| `--size-heading-to-body` | `var(--primitive-scale-4)` → `1rem` | Gap between header row, description, and container |
| `--size-page-gutter` | `var(--primitive-scale-6)` → `1.5rem` | Backdrop padding (prevents panel from touching viewport edge) |
| `--primitive-scale-4` | `1rem` | Gap between heading and close button |
| `--motion-interactive-color` | `color 150ms ease` | Close button hover color transition |
| `--z-index-nav` | `50` | Panel z-index (backdrop and panel both use `zIndex: 50`) |

## 10. Responsive behavior
The panel has `width: 100%` and `maxWidth: 480px`. On viewports narrower than 480 px, the panel fills the viewport width minus the `--size-page-gutter` (1.5rem) padding on each side applied by the backdrop. The panel remains centered vertically on all viewports. There is no bottom-sheet behavior at mobile sizes — for bottom-anchored behavior at mobile widths, use Drawer Sheet instead.

## 11. Composition and usage patterns

**Confirmation dialog with actions**
Place a button row in the `container` slot. The modal manages visibility; the parent manages open state.

```tsx
function DeleteConfirm() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Delete project</button>
      <Modal
        open={open}
        heading="Delete project"
        description="This will permanently remove the project and all associated files. This action cannot be undone."
        onClose={() => setOpen(false)}
        container={
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        }
      />
    </>
  );
}
```

**Heading-only modal**
For simple acknowledgment dialogs where the heading conveys the full message.

`[STORYBOOK BLOCK: Simple/Communications/ElegantModal/HeadingOnly]`

**Modal with description**
For destructive or high-consequence actions where consequences must be stated explicitly.

`[STORYBOOK BLOCK: Simple/Communications/ElegantModal/WithDescription]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [Drawer Sheet](/design-system/docs/drawer-sheet-zh) | When the supplementary content is larger, or when a side panel is more appropriate than a centered overlay |
| [Alert](/design-system/docs/alert-zh) | For non-blocking inline messages that do not require user acknowledgment |
| [Toast](/design-system/docs/toast-zh) | For transient, auto-dismissing feedback after an action completes |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Always provide a heading that clearly states what the modal is about. | Use vague headings like "Warning" or "Notice" — be specific about the action or state. |
| Add a description for destructive actions to state consequences explicitly. | Add a description for every modal — heading-only is appropriate for simple confirmations. |
| Place action buttons in the `container` slot to give the user a clear path forward. | Leave the modal with no actions — users must always have a way to close or proceed. |
| Use `onClose` so users can dismiss via the backdrop and close button. | Remove the close mechanism for non-critical modals — users expect to be able to dismiss. |
| Keep modal content focused on a single decision or task. | Place complex multi-step forms inside a modal — use a dedicated page or drawer. |
| Use the Drawer Sheet for larger content panels on mobile. | Put long scrollable content inside the modal — it is designed for compact, contained interactions. |

## 14. Changelog

### 2026-04-27
- **Accessibility:** Implemented full focus trap — on open, focus moves into the panel; Tab/Shift+Tab cycle within the dialog; Escape key closes the modal; focus is restored to the triggering element on close. This resolves all previously flagged WCAG 2.1 AA gaps for keyboard and screen reader users.
- **Tokens:** Replaced `--primitive-duration-fast` + `--primitive-easing-default` with `--motion-interactive-color` for the close button hover transition. Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.
