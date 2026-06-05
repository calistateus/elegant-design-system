---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantButtonGroup.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantButtonGroup.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): ButtonGroup itself has no interactive states; states are inherited entirely from individual Button children — flagged where inferred.
- Section 10 (Responsive behavior): `flexWrap: 'wrap'` is present but wrapping behavior at specific breakpoints is not tested in stories.

**Recommended follow-ups:**
- Add stories for `count` values of 2, 4, and 5 (only 3 is demonstrated).
- Add a story for `context="menu"` to document compact sizing.
- Consider enforcing the constraint that buttons array must have at least `count` items at the type level.
- Storybook render function uses a flat args pattern (button1Text, button2Text, etc.) — consider whether a JSON controls approach would be more maintainable.

---

# ButtonGroup

## 1. Overview
A layout container that renders 2–5 Button components side-by-side with consistent spacing, enforcing a shared context (default or menu) across all child buttons.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Presenting a primary CTA alongside 1–4 secondary actions (e.g. "Get started" + "Browse" + "Learn more") | A single button — use Button directly |
| Navigation bars or toolbars requiring multiple compact action buttons via `context="menu"` | More than 5 buttons — the `count` prop caps at 5; use a different pattern for larger sets |
| Aligning a group of buttons with uniform gap and wrapping behavior | Buttons that require individual spacing or alignment overrides |
| Page hero sections that need a primary + secondary button pairing | Buttons that navigate to external URLs — use anchor elements instead |

## 3. Anatomy
1. **Container** — `inline-flex` row with `flexWrap: 'wrap'` and context-aware gap. Holds all rendered button slots.
2. **Button slots** — 2–5 Button components rendered from the `buttons` array, sliced to `count`. Each slot inherits the group's `context`.
3. **Gap** — Horizontal spacing between buttons: `--size-btn-px` (1rem) in `default` context, `--size-btn-px-sm` (0.75rem) in `menu` context.

`[STORYBOOK BLOCK: Simple/Forms/ElegantButtonGroup/ButtonGroup]`

## 4. Variants

**Default context (count: 3)**
- Full-size padding and typography for all buttons.
- Gap between buttons: `--size-btn-px` → 1rem.
- Use for page-level CTAs (hero sections, section footers, form actions).
- The `buttons` array determines individual button styles (primary/secondary) and icons independently.

**Menu context**
- Compact padding and smaller font size for all buttons.
- Gap between buttons: `--size-btn-px-sm` → 0.75rem.
- Use inside navigation bars, toolbars, or any compact UI surface.
- All buttons in the group must share this context — mixing is not supported by the API.

## 5. States
ButtonGroup itself is a stateless layout wrapper. All interactive states are handled by the individual Button children.

**Default**
- Buttons render at rest with their configured styles.

**Hover (per button)**
- Each Button handles its own hover state independently (see Button documentation).

**Wrap**
- When the group's total width exceeds its container, `flexWrap: 'wrap'` causes buttons to reflow onto subsequent rows with the same gap applied.

## 6. Properties

### ElegantButtonGroup
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `context` | `'default' \| 'menu'` | — | Yes | Shared sizing context for all buttons. Controls padding, font size, and gap. |
| `count` | `2 \| 3 \| 4 \| 5` | — | Yes | Number of buttons to render. Slices the `buttons` array to this length. |
| `buttons` | `ButtonSlot[]` | — | Yes | Array of button configurations. Must contain at least `count` items. |

### ButtonSlot
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `text` | `string` | — | Yes | Button label text. |
| `style` | `'primary' \| 'secondary'` | `'secondary'` | No | Visual style of this button slot. Defaults to secondary if omitted. |
| `showIcon` | `boolean` | — | No | Whether to render the icon. If `false`, no icon is shown even if `icon` is provided. |
| `icon` | `LucideIcon` | — | No | Lucide icon component to render when `showIcon` is true. |
| `onClick` | `() => void` | — | No | Click handler for this button slot. |

## 7. Content guidelines
- Each button slot follows the same content rules as the standalone Button: use action verbs, keep labels concise.
- Across a group, labels should be parallel in structure (e.g. all verb phrases: "Get started", "Browse", "Learn more") to aid scannability.
- Icon usage: only enable `showIcon` when the icon reinforces the label's action. Not all buttons in a group need icons.
- Avoid labels that are identical within the same group — each must be distinguishable for screen readers.

## 8. Accessibility
- **Keyboard navigation:** Each Button child is individually focusable. Tab order follows DOM order (left to right, then wrapped rows).
- **Screen reader behavior:** Each button is announced by its label text. No group-level ARIA role (e.g. `role="group"`) is applied to the container — [NEEDS CONFIRMATION whether this is required by design].
- **Color and contrast:** Inherits from individual Button tokens — see Button documentation.
- **Motion:** Hover transitions on individual buttons use `--primitive-duration-fast` (150ms). The global `@media (prefers-reduced-motion: reduce)` rule in `globals.css` collapses all CSS transitions to 0.01ms.
- **Touch/pointer targets:** Inherits Button touch target behavior. `default` context buttons render ~40px tall (slightly below the 44px WCAG 2.5.5 minimum). `menu` context buttons render ~26px tall — suitable for pointer-primary surfaces only. Do not use `context="menu"` on touch-primary surfaces.
- **Focus ring:** Each Button child uses the `.elegant-btn:focus-visible` global rule — `outline: 2px solid var(--color-interactive-primary-bg)`, `outline-offset: 3px`. Focus moves between buttons via Tab.
- **Known gaps:** No `role="group"` or `aria-label` on the container to group related buttons semantically for assistive technology.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--size-btn-px` | `var(--primitive-scale-4)` → 1rem | Gap between buttons in `default` context |
| `--size-btn-px-sm` | `var(--primitive-scale-3)` → 0.75rem | Gap between buttons in `menu` context |

All other visual tokens (colors, padding, radius, typography) are applied by the individual Button children — see Button documentation.

## 10. Responsive behavior
- The container is `inline-flex` with `flexWrap: 'wrap'`, so it wraps to multiple rows when the available width is insufficient.
- No breakpoint-specific gap or layout overrides exist in the component.
- For narrow viewports, the wrapping behavior allows graceful reflow without clipping, but the layout of wrapped rows is not explicitly controlled — verify on mobile.

## 11. Composition and usage patterns

**Primary + secondary CTA pair (count: 2)**
The most common pattern: one primary button for the main action and one secondary for an alternative. Ideal for hero sections and modal footers.

**Primary + two secondary (count: 3)**
The story default: "Get started" (primary, with ArrowRight icon) + "Browse" (secondary, with ExternalLink icon) + "Learn more" (secondary, no icon). Suitable for page heroes with multiple navigation paths.

**Menu toolbar (context: "menu")**
All buttons use compact sizing. Typically all secondary style. Use for navigation bars or filter bars where multiple quick actions coexist.

`[STORYBOOK BLOCK: Simple/Forms/ElegantButtonGroup/ButtonGroup]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [Button](/design-system/docs/button-zh) | When only a single call-to-action is needed — no layout wrapper required |
| Native `<nav>` + anchor links | When the button group is purely navigational, not triggering actions |
| [ActionMenu](/design-system/docs/action-menu-zh) / DropdownMenu | When 5+ options exist or options are conditional — a grouped button row becomes unwieldy |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Place exactly one primary-style button in the group to maintain visual hierarchy. | Use two or more primary-style buttons in the same group — they conflict for dominance. |
| Use `context="menu"` consistently for all buttons when embedding in navigation. | Mix `context="default"` and `context="menu"` in the same group — the API enforces a single context, and mixed sizing looks inconsistent. |
| Provide at least `count` items in the `buttons` array. | Provide fewer items than `count` — the component slices the array, so missing items produce empty slots silently. |
| Use `showIcon: false` to explicitly suppress icons on secondary buttons that don't benefit from them. | Pass an `icon` without setting `showIcon: true` — the icon will not render even if supplied. |
| Keep button labels parallel in grammatical form within the group ("Get started", "Browse", "Learn more"). | Mix noun labels and verb labels in the same group ("Settings", "Browse content") — inconsistency reduces scannability. |
| Rely on `flexWrap: 'wrap'` for narrow containers; design labels short enough to wrap gracefully. | Use very long labels (5+ words) in groups of 4–5 buttons — they will wrap awkwardly on mid-size viewports. |
| Test the group on mobile viewports to confirm wrapping behavior is acceptable. | Assume the group will remain single-row on all screen sizes — wrap behavior is automatic and uncontrolled. |
| Give each button a unique, descriptive label; screen readers announce each individually. | Use identical labels (e.g. two "View" buttons) in the same group — they are indistinguishable to assistive technology. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
