---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantTooltip.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantTooltip.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): visibility is controlled by `useState` toggled on `onMouseEnter`/`onMouseLeave` — no keyboard (`onFocus`/`onBlur`) support exists. Flagged as accessibility gap.
- Section 8 (Accessibility): tooltip is not keyboard-accessible; `aria-hidden={!visible}` and `role="tooltip"` exist but the trigger element has no `aria-describedby` pointing to it. Both flagged.

**Recommended follow-ups:**
- Add `onFocus`/`onBlur` handlers to show/hide tooltip for keyboard users.
- Add `id` to the tooltip bubble and `aria-describedby` on the trigger wrapper to form a proper association.
- Add a story demonstrating overflow/clipping behavior when the tooltip is near the viewport edge.
- Consider adding a `delay` prop for hover debounce to prevent accidental trigger.
- `position` is hidden in story controls (`table: { disable: true }`) — each variant locks it. This is correct, but a composed story showing all four positions in one frame would be useful for documentation.

---

# Tooltip

## 1. Overview
A small floating label that reveals supplementary text on hover, providing context for UI elements without cluttering the interface.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Labeling icon-only buttons where no visible text describes the action | Content the user must read to complete a task — use visible text |
| Providing supplementary clarification for an abbreviated label or acronym | Long explanations (more than one short sentence) — use a popover or inline copy |
| Surfacing keyboard shortcut hints on toolbar items | Repeating text that is already visible on screen |
| Adding definitions to technical terms in dense interfaces | Touch-only contexts — tooltips are not accessible on touch without a dedicated interaction |

## 3. Anatomy
1. **Wrapper** — `inline-flex` relative container that wraps the trigger element and positions the bubble.
2. **Trigger** — any child node passed as `children`; typically a button, icon, or text element.
3. **Bubble** — absolutely positioned container with background, padding, and border radius.
4. **Label text** — xs-sized, single-line, `whiteSpace: nowrap`.
5. **Arrow** — 6×6 px rotated square pseudo-element in bubble background color, positioned at the edge nearest the trigger.

`[STORYBOOK BLOCK: Simple/Communications/ElegantTooltip/Top]`

## 4. Variants

**Top**
- Bubble appears centered above the trigger element.
- Arrow points downward from the bubble's bottom edge.
- Use as the default position when space above the element is available.

`[STORYBOOK BLOCK: Simple/Communications/ElegantTooltip/Top]`

**Bottom**
- Bubble appears centered below the trigger element.
- Arrow points upward from the bubble's top edge.
- Use when the element is near the top of the viewport and upward space is insufficient.

`[STORYBOOK BLOCK: Simple/Communications/ElegantTooltip/Bottom]`

**Left**
- Bubble appears centered to the left of the trigger element.
- Arrow points rightward from the bubble's right edge.
- Use for rightmost elements in a horizontal toolbar.

`[STORYBOOK BLOCK: Simple/Communications/ElegantTooltip/Left]`

**Right**
- Bubble appears centered to the right of the trigger element.
- Arrow points leftward from the bubble's left edge.
- Use for leftmost elements, or when left space is constrained.

`[STORYBOOK BLOCK: Simple/Communications/ElegantTooltip/Right]`

## 5. States

**Hidden (default)**
- Bubble has `opacity: 0` and `aria-hidden="true"`.
- Trigger is in its normal resting state.
- No transition is applied until hover begins.

**Visible**
- Triggered by `onMouseEnter` on the wrapper.
- Bubble transitions to `opacity: 1` over `--primitive-duration-fast` (150 ms).
- `aria-hidden` switches to `false`, making the bubble accessible to screen readers.

**Hidden again**
- Triggered by `onMouseLeave` on the wrapper.
- Opacity transitions back to 0 over 150 ms.
- `aria-hidden` returns to `true`.

> **Known gap:** The tooltip is triggered by both mouse hover (`onMouseEnter`/`onMouseLeave`) and keyboard focus (`onFocus`/`onBlur`). The tooltip itself is not focusable — it is purely visual output.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `content` | `string` | — | **Yes** | Text displayed inside the tooltip bubble. |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | No | Edge the tooltip appears on relative to the trigger. |
| `children` | `React.ReactNode` | — | **Yes** | The trigger element wrapped by the tooltip. |

## 7. Content guidelines
Tooltip content should be a single, concise phrase — ideally 2–5 words. Do not use punctuation at the end of single-phrase tooltips. For action labels, use the imperative form ("Copy link", "Delete row"). For definitions, write a short noun phrase. `whiteSpace: nowrap` is applied, so content will not wrap — keep it short enough to remain within the viewport width.

## 8. Accessibility
- **Role:** `role="tooltip"` is applied to the bubble. The trigger wrapper has an `aria-describedby` attribute pointing to the tooltip's ID (assigned via `useId`), formally establishing the association for assistive technologies.
- **Visibility attribute:** `aria-hidden={!visible}` toggles the bubble in and out of the accessibility tree on hover and focus. When hidden, screen readers will not announce the content.
- **Focus:** The tooltip is triggered by both mouse hover and keyboard focus (`onFocus`). Focus on the wrapped trigger element shows the tooltip; `onBlur` hides it. The tooltip itself is not focusable — it is purely visual/pointer output.
- **Color and contrast:** Bubble uses `--color-interactive-primary-fg` (white) on `--color-interactive-primary-bg` (black `#1e1e1e`) — this passes WCAG AA contrast for small text.
- **Motion:** Opacity fades over 150 ms. No `prefers-reduced-motion` override is present — consider setting `transition: none` for users who prefer reduced motion.
- **Touch/pointer:** No touch event handlers are implemented. Tooltips do not appear on touch devices. Do not use tooltips for essential information in touch-primary contexts.
- **Known gaps:** No touch support — touch devices receive no tooltip feedback.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-interactive-primary-bg` | `var(--primitive-black)` → `#1e1e1e` | Bubble background; arrow background |
| `--color-interactive-primary-fg` | `var(--primitive-white)` → `#ffffff` | Bubble text color |
| `--primitive-font-size-xs` | `0.75rem` | Bubble font size |
| `--primitive-font-weight-regular` | `400` | Bubble font weight |
| `--size-notification-padding` | `var(--primitive-scale-2) var(--primitive-scale-3)` | Bubble padding (vertical / horizontal) |
| `--size-btn-radius` | `var(--primitive-radius-md)` → `4px` | Bubble border radius |
| `--motion-interactive-color` | `color 150ms ease` | Opacity transition on show/hide (fontFamily now inherited from body) |

## 10. Responsive behavior
The tooltip has no breakpoint-specific logic. It is positioned absolutely relative to its wrapper using calculated offsets. On narrow viewports, bubbles positioned `top` or `bottom` may overflow the viewport horizontally if the content string is wide, because `whiteSpace: nowrap` prevents wrapping. Similarly, `left`- or `right`-positioned tooltips may clip. No auto-flip logic is implemented — choose position manually based on where the trigger lives in the layout.

## 11. Composition and usage patterns

**Icon button with tooltip**
The most common pattern: wrap an icon-only button with a tooltip to provide a visible label on hover.

```tsx
<Tooltip content="Copy link" position="top">
  <button aria-label="Copy link">
    <Link2 size={16} />
  </button>
</Tooltip>
```

**Abbreviation definition**
Wrap abbreviated text with a tooltip to provide the full form.

```tsx
<Tooltip content="Largest Contentful Paint" position="bottom">
  <abbr>LCP</abbr>
</Tooltip>
```

`[STORYBOOK BLOCK: Simple/Communications/ElegantTooltip/Top]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| Modal | When the supplementary content is long, interactive, or requires user action |
| Badge | For persistent, always-visible status labels that do not require hover |
| Alert | For inline persistent messages that do not depend on hover interaction |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use tooltips for icon-only controls where a visible label is not practical. | Use tooltips for content the user must read to complete a task — make that content always visible. |
| Keep tooltip content to 2–5 words, in sentence case with no trailing punctuation for single phrases. | Put sentences or multiple clauses in a tooltip — the bubble is not sized for wrapping text. |
| Choose `position` based on available space in the layout (e.g., `bottom` for elements near the top edge). | Rely on the tooltip to auto-flip — no flip logic exists; test placement at the target viewport size. |
| Pair the tooltip trigger with an `aria-label` on the button itself so keyboard users receive the same information. | Use tooltips as the sole label for interactive elements — keyboard and touch users cannot access them. |
| Use the dark (primary) color scheme as designed — it provides sufficient contrast against most backgrounds. | Override the bubble color without verifying the new contrast ratio against the background. |
| Use `position="top"` as the default unless a specific layout constraint requires another direction. | Render a tooltip on a purely decorative element — tooltips imply the trigger has interactive or semantic meaning. |

## 14. Changelog

### 2026-04-27
- **Tokens:** Replaced `--primitive-scale-2/3` with `--size-notification-padding`; replaced `--primitive-duration-fast` + `--primitive-easing-default` with `--motion-interactive-color`. Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.

**2026-04-27** — Add keyboard focus support (`onFocus`/`onBlur`); add `useId`-based `id` to bubble and `aria-describedby` on wrapper for screen reader association
