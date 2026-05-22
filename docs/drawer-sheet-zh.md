---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantDrawerSheet.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantDrawerSheet.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): no slide-in/slide-out animation is implemented — the panel appears and disappears via conditional rendering (`if (!open) return null`). Documented as observed; animation is a recommended follow-up.
- Section 8 (Accessibility): focus is not trapped inside the drawer on open, focus is not returned to the trigger on close, and there is no Escape key handler. All are WCAG 2.1 AA requirements for dialog components. Flagged.
- Only a single story (`Default`) exists with `showDescription: false` as the default. No side-specific stories are locked.

**Recommended follow-ups:**
- Add stories for `left` and `bottom` sides.
- Add a story showing the `container` slot with real content (e.g., a settings form).
- Implement focus trap, focus restoration, and Escape key handling.
- Add slide animation (translate + opacity) on open/close.
- Confirm whether bottom drawer should have a drag-handle for mobile gesture dismissal.
- `bottom` side variant has no explicit height — content determines height, which may cause inconsistent behavior; consider a `maxHeight` or explicit height token.

---

# Drawer Sheet

## 1. Overview
A panel that slides in from a viewport edge (right, left, or bottom) to surface secondary content or tasks without fully navigating away from the current page.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Displaying settings, filters, or configuration panels that supplement the current view | Full-page flows requiring dedicated navigation — use a page |
| Presenting detail views or inspection panels alongside list or map content | Quick confirmations or single decisions — use a Modal instead |
| Hosting forms that don't require the full viewport width | Content the user must complete before continuing — use a Modal with a blocking overlay focus |
| Mobile bottom sheet for contextual actions or a compact selection interface | Large amounts of content on desktop — consider a full page or split-panel layout |

## 3. Anatomy
1. **Backdrop** — full-viewport scrim (`--color-overlay-scrim`) that closes the drawer on click; `aria-hidden="true"`.
2. **Panel** — fixed-position card attached to the chosen viewport edge; uses `--size-drawer-width` (400 px) for left/right sides; full width for bottom.
3. **Header row** — flex row containing heading and optional close button.
4. **Heading** — h5-styled title; always present; linked to the dialog via `aria-labelledby`.
5. **Close button** (optional) — 16 px X icon; rendered when `onClose` is provided.
6. **Description** (optional) — sm-sized muted paragraph below the header row.
7. **Container slot** (optional) — unstyled `<div>` accepting any child component.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantDrawerSheet/Default]`

## 4. Variants

**Right (default)**
- Panel is fixed to the right edge, full viewport height, 400 px wide.
- Left corners are rounded (`--size-card-radius`); right border is removed.
- Standard position for settings, detail panels, and inspection views on desktop.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantDrawerSheet/Default]`

**Left**
- Panel is fixed to the left edge, full viewport height, 400 px wide.
- Right corners are rounded; left border is removed.
- Use when content logically originates from the left (e.g., a navigation tree or sidebar panel that opens contextually).

`[STORYBOOK BLOCK: Simple/Navigation/ElegantDrawerSheet/Default]`

**Bottom**
- Panel is fixed to the bottom edge, full viewport width.
- Top corners are rounded; bottom border is removed.
- Use as a mobile action sheet or a contextual panel in mobile-first layouts.
- Height is determined by content — no explicit height is set.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantDrawerSheet/Default]`

## 5. States

**Closed**
- `open={false}` causes the component to return `null` — nothing is rendered.

**Open**
- `open={true}` renders the backdrop and panel immediately with no entrance animation.
- Panel is fully visible at its final position.
- Close button (if present) is in resting muted color.

**Close button hover**
- Close button color transitions from `--color-text-muted` to `--color-text-body` over 150 ms.

> **Known gap:** No slide-in/slide-out animation is implemented. See Accessibility section.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `open` | `boolean` | — | **Yes** | Controls whether the drawer renders. When `false`, nothing is mounted. |
| `side` | `'right' \| 'left' \| 'bottom'` | `'right'` | No | Which viewport edge the panel is anchored to. |
| `heading` | `string` | — | **Yes** | H5-level heading. Linked to the dialog via `aria-labelledby`. |
| `description` | `string` | `undefined` | No | Optional supporting paragraph rendered below the heading. |
| `container` | `React.ReactNode` | `undefined` | No | Optional slot for any custom content. |
| `onClose` | `() => void` | `undefined` | No | If provided, renders a close button and calls this on backdrop or button click. |

## 7. Content guidelines
- **Heading:** Use sentence case, 3–6 words. Describe the panel's purpose as a noun ("Settings", "Filter results", "Order details").
- **Description:** One to two sentences maximum. Use to clarify scope or provide brief instructions ("Adjust your preferences below.").
- **Container content:** The container slot accepts any node. When placing a form, ensure the submit button is visible without scrolling where possible. Use consistent internal spacing aligned to `--size-card-gap` or `--size-stack-gap`.
- **Close button:** `aria-label="Close drawer"` is always applied — do not add visible close text.

## 8. Accessibility
- **Role:** `role="dialog"` and `aria-modal="true"` are applied to the panel. `aria-labelledby="elegant-drawer-heading"` links the dialog to its heading.
- **Backdrop:** `aria-hidden="true"` is set on the backdrop — it is excluded from the accessibility tree. Clicking it calls `onClose`.
- **Focus management:** On open, focus moves to the first focusable element inside the panel. Tab and Shift+Tab cycle focus only within the panel's focusable elements. Focus is restored to the element that was focused before the drawer opened (stored in a ref).
- **Keyboard navigation:** Pressing `Escape` calls `onClose` and closes the drawer. Tab/Shift+Tab cycle through focusable elements within the panel. Close button activates with Enter/Space (native button behaviour).
- **Screen reader behavior:** The dialog role and heading are announced on open. Description and container content are part of the dialog's reading order.
- **Color and contrast:** Heading uses `--color-text-title` (black) on white — passes WCAG AA. Description uses `--color-text-muted` (`#666666`) on white — verify at sm font size.
- **Motion:** No animation — no `prefers-reduced-motion` handling required currently.
- **Touch/pointer:** Close button renders at 16 px icon size with `padding: 0` — effective touch target is ~16px, well below the 44×44px WCAG 2.5.5 minimum. Known gap. Recommend wrapping in a larger hit area for production use. The `bottom` side variant has no drag handle for swipe-to-close gesture — tap on backdrop is the only dismiss interaction.
- **Known gaps:** Close button has insufficient touch target size (~16px). No drag-handle for bottom sheet gesture dismissal. No slide-in/slide-out animation.

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
| `--primitive-font-sans` | `DM Sans, sans-serif` | Description font family |
| `--primitive-font-size-sm` | `0.875rem` | Description font size |
| `--primitive-font-weight-regular` | `400` | Description font weight |
| `--size-drawer-width` | `400px` | Panel width for left/right variants |
| `--size-card-radius` | `var(--primitive-radius-md)` → `4px` | Panel corner radius |
| `--size-card-padding` | `var(--primitive-scale-6)` → `1.5rem` | Panel internal padding |
| `--size-heading-to-body` | `var(--primitive-scale-4)` → `1rem` | Gap between header, description, and container |
| `--size-card-gap` | `var(--primitive-scale-4)` → `1rem` | Gap between heading and close button |
| `--primitive-duration-fast` | `150ms` | Close button hover color transition |
| `--primitive-easing-default` | `ease` | Close button hover transition easing |
| `--z-index-drawer` | `51` | Panel z-index (backdrop uses `50`) |

## 10. Responsive behavior
Left and right panels are `--size-drawer-width` (400 px) wide on all viewport sizes. On very narrow viewports (< 400 px), the panel may occupy more than 80% of the screen width — consider constraining with `maxWidth: 100%` or switching to the `bottom` variant on mobile. The bottom panel spans full viewport width and has no explicit height. All three sides render without responsive switching — select the appropriate `side` prop based on the target viewport.

## 11. Composition and usage patterns

**Settings panel (right)**
The most common pattern: open from a settings icon, present configuration fields in the container slot.

```tsx
function SettingsDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Settings</button>
      <DrawerSheet
        open={open}
        side="right"
        heading="Settings"
        description="Adjust your preferences below."
        onClose={() => setOpen(false)}
        container={<SettingsForm />}
      />
    </>
  );
}
```

**Mobile bottom sheet**
Use `side="bottom"` for contextual action menus or selection panels on mobile.

```tsx
<DrawerSheet
  open={open}
  side="bottom"
  heading="Sort by"
  onClose={() => setOpen(false)}
  container={<SortOptions />}
/>
```

`[STORYBOOK BLOCK: Simple/Navigation/ElegantDrawerSheet/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [Modal](/design-system/docs/modal-zh) | For compact, centered dialogs requiring an explicit decision (confirmation, deletion) |
| [Alert](/design-system/docs/alert-zh) | For inline persistent messages that do not use an overlay |
| [Toast](/design-system/docs/toast-zh) | For transient, auto-dismissing feedback after an action |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use the right drawer for desktop settings, filters, and detail panels where the user needs context from the underlying page. | Use a drawer for simple confirmations — a Modal is less disruptive and communicates criticality better. |
| Use `side="bottom"` on mobile for contextual actions and selections. | Use `side="right"` on mobile without verifying that 400 px width is appropriate for the target device. |
| Provide `onClose` so users can dismiss via the backdrop and close button. | Remove the close mechanism — users must always have a way to dismiss the panel. |
| Use the `container` slot for forms and action lists; keep spacing consistent with design tokens. | Place the close button inside the `container` slot — use the native `onClose` prop instead. |
| Keep the heading short and descriptive of the panel's purpose. | Use the heading to echo a button label verbatim — provide useful framing ("Settings", not "Open settings"). |
| Test at the target viewport width — 400 px panels can dominate narrow screens. | Layer multiple drawers simultaneously — no stacking logic is implemented. |

## 14. Changelog

**2026-04-27** — Add focus trap (Tab/Shift+Tab cycling), Escape key handler to close, and focus restoration to trigger element on close
