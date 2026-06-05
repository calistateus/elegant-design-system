---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantButton.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantButton.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 10 (Responsive behavior): No breakpoint-specific overrides exist in the component; behavior is inferred from context sizing.

**Recommended follow-ups:**
- Add a `Loading` story variant.
- Add stories for the `secondary` style and `menu` context variants.

---

# Button

## 1. Overview
A call-to-action element that triggers a user action, available in primary (filled) and secondary (ghost/text) styles with optional Lucide icon support and context-aware sizing.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Primary CTA on a page or section (e.g. "Get started", "Submit") | Multiple primary buttons side-by-side — use ButtonGroup instead |
| Secondary actions that require less visual weight than the primary (e.g. "Learn more") | Navigation between pages — use a link (`<a>`) element instead |
| Menu items inside navigation bars that need compact sizing via `context="menu"` | Destructive or high-risk actions without additional confirmation UI |
| Triggering modal dialogs, drawers, or overlays | Inline text actions within a paragraph — use a styled anchor instead |

## 3. Anatomy
1. **Container** — `<button>` element that holds all children; carries all visual styles and interaction handlers.
2. **Label** — Required text string rendered directly inside the button.
3. **Icon** (optional) — Lucide icon placed to the right of the label; 16px in `default` context, 12px in `menu` context, always `strokeWidth={1.5}`.

`[STORYBOOK BLOCK: Simple/Forms/ElegantButton/Button]`

## 4. Variants

**Primary**
- Filled background using `--color-interactive-primary-bg` (#1e1e1e) with white foreground text.
- Communicates the highest-priority action on the surface.
- On hover: background swaps to `--primitive-white`, text color swaps to `--color-interactive-primary-bg`; scale increases to 1.05 (suppressed in `menu` context).
- Use for the single most important action per view or section.
- Only one primary button should appear per visual hierarchy level.

**Secondary**
- No background or border; text-only appearance.
- In `default` context: text is `--color-text-body` (#171717). On hover: text shifts to `--color-interactive-primary-bg`.
- In `menu` context: text is `--color-text-muted` (#666666). On hover: text shifts to `--color-interactive-primary-bg`.
- Use for supporting or supplementary actions that should not compete with the primary CTA.

## 5. States

| State | Primary | Secondary — `default` context | Secondary — `menu` context |
|---|---|---|---|
| **Default** | `--color-interactive-primary-bg` background, `--color-interactive-primary-fg` text | Transparent bg, `--color-text-body` text | Transparent bg, `--color-text-muted` text |
| **Hover** | `--color-interactive-primary-hover-bg` bg, `--color-interactive-primary-bg` text; scale 1.05 | `--color-interactive-primary-bg` text; scale 1.05 | `--color-interactive-primary-bg` text; no scale |
| **Focus** | 2px `--color-interactive-primary-bg` outline, 3px offset, 4px radius (keyboard only) | Same as primary | Same as primary |
| **Disabled** | opacity 0.5, `cursor: not-allowed`, hover blocked | opacity 0.5, `cursor: not-allowed`, hover blocked | opacity 0.5, `cursor: not-allowed`, hover blocked |

**Default**
- Primary: filled black background, white text.
- Secondary (`default` context): transparent, body-color text.
- Secondary (`menu` context): transparent, muted-color text.

**Hover**
- Triggered by `onMouseEnter`; reversed by `onMouseLeave`.
- Primary: background becomes white, text becomes `--color-interactive-primary-bg`; scale 1.05 (not in `menu` context).
- Secondary: text becomes `--color-interactive-primary-bg`; scale 1.05 (not in `menu` context).
- Transition: 150ms ease on `background-color`, `color`, and `transform`.

**Focus**
- Implemented via the global `.elegant-btn:focus-visible` rule in `globals.css`.
- Visual: `outline: 2px solid var(--color-interactive-primary-bg)`, `outline-offset: 3px`, `border-radius: var(--size-btn-radius)`.
- Only appears on keyboard navigation (`:focus-visible`), suppressed on mouse click.
- Disabled buttons: focus is blocked by the native `disabled` attribute; no ring appears.

**Disabled**
- Triggered: when `disabled={true}`.
- Visually: opacity drops to `var(--opacity-disabled)` (0.5); cursor becomes `not-allowed`. Hover effects are blocked.
- Behavior: the native `<button disabled>` attribute prevents all interaction. `aria-disabled` is also set.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `text` | `string` | — | Yes | Button label text displayed inside the button. |
| `style` | `'primary' \| 'secondary'` | `'primary'` | No | Visual style: filled (primary) or ghost/text (secondary). |
| `context` | `'default' \| 'menu'` | `'default'` | No | Sizing context: `default` uses full padding and font size; `menu` uses compact sizing suitable for navigation bars. |
| `icon` | `LucideIcon` | — | No | Optional Lucide icon component rendered to the right of the label. |
| `onClick` | `() => void` | — | No | Click handler function. |
| `className` | `string` | `''` | No | Additional CSS class names passed to the `<button>` element. |
| `disabled` | `boolean` | `false` | No | Disables the button. Applies `opacity: var(--opacity-disabled)`, `cursor: not-allowed`, and the native `disabled` attribute to block all interaction. |

## 7. Content guidelines
- **Label text:** Use action verbs ("Get started", "Browse", "Send message"). Keep labels concise — ideally 1–3 words for primary, up to 4–5 words for secondary.
- **Icon usage:** Icons should reinforce the action direction (e.g. ArrowRight for navigation, ExternalLink for external links, Send for submission). Do not use icons decoratively without semantic meaning.
- **Truncation:** No truncation behavior is built in. Avoid labels that may overflow their container.

## 8. Accessibility
- **Keyboard navigation:** The native `<button>` element is focusable and activatable via `Enter` and `Space` by default.
- **Screen reader behavior:** The accessible name defaults to the `text` prop. An `ariaLabel` prop is also available to override the announced name for icon-heavy or context-dependent scenarios.
- **ARIA roles:** Uses the implicit `button` role from the HTML element.
- **Color and contrast:** Primary style: white text on #1e1e1e background — passes WCAG AA and AAA. Secondary style: #171717 text on transparent (white) background — passes WCAG AA and AAA. Hover state inverts primary to black-on-white — passes.
- **Motion:** Hover transitions use 150ms ease via `--primitive-duration-fast`. The global `@media (prefers-reduced-motion: reduce)` rule in `globals.css` collapses all CSS transitions to 0.01ms — motion is fully suppressed for users with that preference enabled.
- **Touch/pointer targets:** `default` context — `padding: var(--size-btn-py) var(--size-btn-px)` (0.5rem × 1rem = 8px × 16px). At 1rem font size with 1.5 line height the rendered height is approximately 8 + 24 + 8 = 40px. This is slightly below the 44px WCAG 2.5.5 minimum; consider adding `min-height: 44px` on touch breakpoints. `menu` context — `padding: var(--size-btn-py-sm) var(--size-btn-px-sm)` (0.25rem × 0.75rem = 4px × 12px). Rendered height approximately 4 + 18 + 4 = 26px — below the 44px minimum. Use `menu` context only in pointer-primary surfaces such as desktop nav bars.
- **Focus ring:** Implemented. `outline: 2px solid var(--color-interactive-primary-bg)`, `outline-offset: 3px`, applied via `.elegant-btn:focus-visible` in `globals.css`.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-interactive-primary-bg` | `var(--primitive-black)` → #1e1e1e | Primary background; secondary hover text color |
| `--color-interactive-primary-fg` | `var(--primitive-white)` → #ffffff | Primary text color; icon stroke |
| `--color-text-body` | `var(--primitive-gray-900)` → #171717 | Secondary `default` context text |
| `--color-text-muted` | `var(--primitive-gray-600)` → #666666 | Secondary `menu` context text |
| `--primitive-white` | #ffffff | Primary hover background |
| `--size-btn-px` | `var(--primitive-scale-4)` → 1rem | Horizontal padding, `default` context |
| `--size-btn-py` | `var(--primitive-scale-2)` → 0.5rem | Vertical padding, `default` context |
| `--size-btn-px-sm` | `var(--primitive-scale-3)` → 0.75rem | Horizontal padding, `menu` context |
| `--size-btn-py-sm` | `var(--primitive-scale-1)` → 0.25rem | Vertical padding, `menu` context |
| `--size-btn-icon-gap` | `var(--primitive-scale-2)` → 0.5rem | Gap between label and icon, `default` context |
| `--size-btn-icon-gap-sm` | `var(--primitive-scale-1)` → 0.25rem | Gap between label and icon, `menu` context |
| `--size-btn-radius` | `var(--primitive-radius-md)` → 4px | Border radius |
| `--primitive-font-sans` | DM Sans, sans-serif | Font family |
| `--primitive-font-size-base` | 1rem | Font size, `default` context |
| `--primitive-font-size-xs` | 0.75rem | Font size, `menu` context |
| `--primitive-font-weight-medium` | 500 | Font weight, `default` context |
| `--primitive-font-weight-regular` | 400 | Font weight, `menu` context |
| `--opacity-disabled` | `0.5` | Button opacity when disabled |

## 10. Responsive behavior
The Button component itself has no breakpoint-specific overrides. Sizing is controlled entirely by the `context` prop:
- `context="default"` — full-size padding and typography, suitable for page-level CTAs.
- `context="menu"` — compact padding and smaller font size, suitable for navigation and toolbar contexts.

`flexWrap: 'wrap'` is applied at the ButtonGroup level, not on individual buttons.

## 11. Composition and usage patterns

**Standalone primary CTA**
Place a single primary button at the end of a hero or section introduction. Pair with an optional icon to reinforce directionality.

**Primary + secondary pairing**
Use a primary button for the main action and a secondary button alongside it for the alternative (e.g. "Get started" + "Learn more"). Use ButtonGroup to manage layout and spacing consistently.

**Menu context buttons**
In navigation bars or compact toolbars, pass `context="menu"` to reduce padding and font size. All buttons in a group must share the same context — mixing is not supported.

`[STORYBOOK BLOCK: Simple/Forms/ElegantButton/Button]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [ButtonGroup](/design-system/docs/button-group-zh) | When rendering 2–5 buttons side-by-side with consistent spacing and shared context |
| Native `<a>` | When the action is navigation to a URL rather than a client-side interaction |
| [ElegantErrorMessage](/design-system/docs/error-message-zh) | Not a replacement — use alongside a button when form submission produces an error |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use a single primary button per section to establish clear visual hierarchy. | Place two primary buttons next to each other — they compete for attention. |
| Use `context="menu"` when embedding buttons inside navigation bars or toolbars. | Mix `context="default"` and `context="menu"` buttons in the same ButtonGroup. |
| Keep label text short and action-oriented ("Get started", "Send message"). | Use passive or noun-only labels ("Info", "Here", "Click") that lack clarity. |
| Use an icon that semantically matches the action direction (ArrowRight for forward navigation, ExternalLink for opening a new tab). | Add an icon purely for decoration without reinforcing the label's meaning. |
| Rely on the secondary style for supporting or lower-priority actions. | Use secondary buttons as the sole CTA on a page — they lack sufficient visual weight. |
| Ensure accessible label text is fully descriptive on its own (screen readers announce it without surrounding context). | Use icon-only buttons without an `aria-label` — the current API does not support it; add label text. |
| Place the button at the end of the content flow it relates to. | Float buttons away from their related content group without visual anchoring. |
| Test hover states on touch devices to ensure the default (non-hover) state is the readable resting state. | Rely on hover color alone to convey primary/secondary distinction on mobile. |

## 14. Changelog

### 2026-04-27
- **Disabled state:** Added `disabled` prop. Button receives native `disabled` attribute + `aria-disabled`; opacity uses `var(--opacity-disabled)` (0.5, was 0.4 for primary / not implemented for secondary); cursor `not-allowed`; hover effects blocked.
