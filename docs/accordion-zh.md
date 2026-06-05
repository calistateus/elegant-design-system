---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantAccordion.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantAccordion.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): The expand/collapse animation uses a `max-height` transition from 0 to 600px rather than an actual measured height — this can cause animation to feel snappy when content is shorter than 600px. Flagged.
- Section 8 (Accessibility): Only one item can be open at a time (exclusive open). This matches the WAI-ARIA Accordion pattern, but confirm with product whether multi-open should be supported.

**Recommended follow-ups:**
- Replace `max-height: 600px` animation with a measured height approach (e.g. ResizeObserver) for smoother collapse/expand.
- Add a `prefers-reduced-motion` check to disable the max-height transition.
- Add a story showing a single-item accordion.
- Consider allowing multi-open via an `allowMultiple` prop.
- The `key={index}` on items is fragile if items are reordered — recommend deriving a stable key from `heading`.

---

# Accordion

## 1. Overview
A vertically stacked list of collapsible panels — each showing a heading trigger and, when expanded, a body paragraph — allowing users to view one section at a time in a compact space.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| FAQ sections with 3–8 entries | Displaying content where users need to compare across multiple sections simultaneously |
| Settings categories where most users only need one section | Short lists with 2 or fewer items — just show both at once |
| Progressive disclosure of secondary information | Rich content panels (forms, tables, media) — the description is plain text only |
| Reducing scroll length on content-heavy pages | Primary navigation — use tabs or a sidebar instead |

## 3. Anatomy
1. **Container** — a single rounded, bordered surface that wraps all items.
2. **Item divider** — a 1px top border between items (not shown on the first item).
3. **Trigger** — a full-width button showing the item heading and a chevron icon; clicking toggles the panel.
4. **Heading** — the item title rendered in the trigger; font size and weight vary by `size`.
5. **Chevron** — a `ChevronDown` icon that rotates 180° when the panel is open.
6. **Panel** — the collapsible region (`role="region"`) that shows the description when open; height-animated via `max-height`.
7. **Description** — the body text rendered inside the panel.

`[STORYBOOK BLOCK: Simple/Content/ElegantAccordion/Default]`

## 4. Variants

**Default** (`size="default"`)
- Trigger padding: `var(--size-card-padding)` (1.5rem) on all sides.
- Heading font size: `var(--primitive-font-size-base)` (1rem).
- Body font size: `var(--primitive-font-size-sm)` (0.875rem).
- Chevron size: 16px.
- Use for standard content pages, FAQ sections, help center articles.

**Compact** (`size="compact"`)
- Trigger padding: `var(--primitive-scale-3)` (0.75rem) vertical, `var(--primitive-scale-4)` (1rem) horizontal.
- Heading font size: `var(--primitive-font-size-sm)` (0.875rem).
- Body font size: `var(--primitive-font-size-xs)` (0.75rem).
- Chevron size: 14px.
- Use for dense UI surfaces, sidebars, or embedded settings panels where vertical space is at a premium.

## 5. States

**All collapsed (default)**
- All chevrons point downward.
- All panels have `max-height: 0` and `overflow: hidden` — content is not visible.
- Headings are visible and interactive.

**One item expanded**
- The active item's chevron rotates 180°.
- The panel animates from `max-height: 0` to `max-height: 600px` over `--primitive-duration-relaxed` (350ms) using `--primitive-easing-power2-out`.
- Body text becomes visible with padding matching the trigger padding.
- Only one item can be open at a time — opening a new item collapses the previously open one.

**Trigger hover**
- No hover background or color change is implemented. The trigger inherits the browser default cursor affordance on transparent background. A hover state is a known gap — if interactive feedback is needed, it should be added at the component level.

**Trigger focus**
- Browser default focus ring applies. Each trigger is a native `<button>` — the global `.elegant-btn:focus-visible` rule is not applied here, so no custom focus ring is set. Known gap.

`[STORYBOOK BLOCK: Simple/Content/ElegantAccordion/Default]`

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `items` | `AccordionItem[]` | — | Yes | Array of `{ heading: string; description: string }` objects. 1–5 items supported in stories; no hard limit in the component. |
| `size` | `'default' \| 'compact'` | `'default'` | No | Controls trigger padding, font sizes, and chevron size. |

### AccordionItem shape
| Field | Type | Required | Description |
|---|---|---|---|
| `heading` | `string` | Yes | The trigger label for this panel. |
| `description` | `string` | Yes | The body text shown when the panel is expanded. |

## 7. Content guidelines
- **Heading**: Use a question or a short noun phrase that makes the content predictable ("What is your return policy?", "Data security"). Sentence case. Aim for under 60 characters to avoid wrapping on narrow viewports.
- **Description**: Full-sentence prose. For FAQs, write the answer directly. For settings, describe the option and its implications. Keep under 3 sentences to avoid overwhelming the compact space; for longer content, link out to a full detail page.
- No icons, rich media, or interactive elements should be placed in the description — the component renders plain text only.

## 8. Accessibility
- **Keyboard navigation**: Each trigger is a native `<button>` — Tab to focus, Enter or Space to expand/collapse.
- **Screen reader behavior**: Each trigger has `aria-expanded` (true/false) and `aria-controls` pointing to the panel `id`. Each panel has `role="region"` and `aria-labelledby` pointing to its trigger `id`. This matches the WAI-ARIA Accordion pattern.
- **Exclusive open behavior**: Only one panel is open at a time. This is the standard accordion pattern; confirm with product whether multi-open support is needed.
- **Color and contrast**: Heading text uses `--color-text-title` (#1e1e1e on #fafafa surface) — very high contrast. Description text uses `--color-text-body` (#171717) — high contrast.
- **Motion**: The expand/collapse uses a `max-height` transition over 350ms `cubic-bezier(0.22, 1, 0.36, 1)`. The chevron rotation uses `--motion-dropdown-chevron` (150ms ease). No `prefers-reduced-motion` check is implemented — users with motion sensitivity will see all transitions.
- **Touch/pointer**: `default` size triggers render at approximately 24 + 16 + 24 = 64px height — well above the 44px WCAG 2.5.5 minimum. `compact` size triggers render at approximately 12 + 20 + 12 = 44px — borderline adequate. Accordion panels are non-interactive display regions; only the trigger buttons require touch target consideration.
- **Known gaps**: No `prefers-reduced-motion` support. Each trigger is a native `<button>` — browser default focus outline applies. No custom `:focus-visible` ring is defined for accordion triggers (the global `.elegant-btn:focus-visible` rule does not apply here). `compact` size touch target is borderline at ~44px.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-bg-surface` | `var(--primitive-gray-50)` → `#fafafa` | Container background |
| `--color-border-subtle` | `var(--primitive-gray-100)` → `#f5f5f5` | Container outer border |
| `--size-card-radius` | `var(--primitive-radius-md)` → `4px` | Container border radius |
| `--color-border-default` | `var(--primitive-gray-200)` = `#e5e5e5` | Divider border between items |
| `--primitive-font-size-base` | `1rem` | Default trigger heading font size |
| `--primitive-font-size-sm` | `0.875rem` | Compact trigger heading; Default body font size |
| `--primitive-font-size-xs` | `0.75rem` | Compact body font size |
| `--primitive-font-weight-medium` | `500` | Trigger heading font weight |
| `--primitive-font-weight-regular` | `400` | Body description font weight |
| `--color-text-title` | `var(--primitive-black)` → `#1e1e1e` | Trigger heading color |
| `--color-text-body` | `var(--primitive-gray-900)` → `#171717` | Body description color |
| `--color-text-muted` | `var(--primitive-gray-600)` → `#666666` | Chevron icon color |
| `--size-card-padding` | `var(--primitive-scale-6)` → `1.5rem` | Default trigger padding |
| `--size-card-gap` | `var(--primitive-scale-4)` → `1rem` | Default trigger gap between heading and chevron |
| `--primitive-scale-3` | `0.75rem` | Compact trigger vertical padding |
| `--primitive-scale-4` | `1rem` | Compact trigger horizontal padding |
| `--primitive-scale-2` | `0.5rem` | Compact trigger gap |
| `--primitive-duration-relaxed` | `350ms` | Panel expand/collapse transition duration |
| `--primitive-easing-power2-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Panel expand/collapse easing |
| `--motion-dropdown-chevron` | `transform 150ms ease` | Chevron rotation transition |

## 10. Responsive behavior
The container uses `width: 100%` and fills its parent. There are no breakpoint-specific overrides. In narrow viewports, heading text wraps naturally (line-height 1.4). In very narrow containers (< 280px), the chevron may crowd the heading — ensure the parent provides at least 280px. The Storybook story does not constrain width.

## 11. Composition and usage patterns

**FAQ section**
The primary use case: 3–8 question/answer pairs. Use the default size. Write headings as questions ("What is your return policy?") and descriptions as direct answers.
`[STORYBOOK BLOCK: Simple/Content/ElegantAccordion/Default]`

**Dense settings panel**
Use compact size when the accordion appears in a sidebar, drawer, or settings panel alongside other components. Shorter headings and descriptions work best in compact size.
`[STORYBOOK BLOCK: Simple/Content/ElegantAccordion/Compact]`

**Progressive disclosure**
Place supplementary information (e.g. legal disclaimers, technical details) in accordion panels on a page where the primary content is shown above. Use a clear, non-question heading ("Technical specifications", "Legal information").

## 12. Related components
| Component | When to use it instead |
|---|---|
| [ElegantForm](/design-system/docs/form-zh) / ElegantFormSection | When the collapsed region needs to contain interactive form fields, not just text. |
| Tab navigation | When users need to switch between sections of equal importance and may want to compare content. |
| [ElegantPicklist](/design-system/docs/picklist-zh) | When the collapsed region is a selection list rather than informational content. |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Keep headings concise and predictive — users decide whether to expand based on the heading alone. | Use vague headings like "More information" — they give users no signal about the content inside. |
| Write descriptions as complete, self-contained answers. | Embed links, buttons, or other interactive elements in the description — the component only renders plain text. |
| Use the compact size in sidebars, drawers, or other density-constrained surfaces. | Use the compact size for primary page content where readability matters. |
| Limit items to 3–8 entries for optimal scannability. | Use the accordion for 2 or fewer items — just show both bodies expanded. |
| Provide stable, non-empty `heading` and `description` strings for all items. | Pass an empty `description` — the empty panel will still render with padding. |
| Test the expand/collapse animation on the target device to ensure 350ms feels appropriate for the content length. | Assume the `max-height: 600px` animation will look smooth for all content lengths — very short descriptions will appear to snap open faster than expected. |

## 14. Changelog

### 2026-04-27
- **Tokens:** Replaced `--primitive-gray-200` with `--color-border-default` for the item divider border. Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.
