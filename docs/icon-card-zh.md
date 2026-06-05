---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantIconCard.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantIconCard.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): No hover, focus, or active states are implemented in the component — confirmed as a static display card
- Section 10 (Responsive behavior): No internal responsive behavior; width is determined entirely by the parent layout or CardPack
- Section 12 (Related components): CardPack is the intended container for groups of IconCards

**Recommended follow-ups:**
- Add stories showing 2-up and 3-up grids (or defer to CardPack stories)
- Clarify whether IconCard will ever be made interactive (clickable) — if so, add hover state and keyboard support
- Add a story for each icon category shown in the argTypes icon palette

---

# IconCard

## 1. Overview
IconCard is a static feature-highlight card that pairs a single Lucide icon with a bold heading and a short description, communicating one capability or benefit at a glance.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Listing product features, specialties, or capabilities in a 2–4 column grid | Displaying data or metrics — use KpiCard instead |
| Communicating abstract concepts with a supporting icon | When a call to action or link is needed — IconCard has no interactive affordance |
| Breaking a dense body section into scannable visual chunks | When more than a heading and two lines of copy are needed — use CaseStudyCard |
| Homepage or landing page feature grids | Navigation menus — icons + labels belong in nav components |

## 3. Anatomy
1. **Card container** — surface-colored div with 4px border radius, 1px subtle border, and card padding on all sides.
2. **Icon** — Lucide icon at 24px / 1.5 stroke, rendered in the accent color; decorative (`aria-hidden="true"`).
3. **Heading** — `<h5>` in bold DM Sans, title color; the primary label for the feature being described.
4. **Description** — `<p>` in regular DM Sans sm, body color; 1–2 sentence supporting explanation.

`[STORYBOOK BLOCK: Simple/Cards/ElegantIconCard/Default]`

## 4. Variants
No discrete variants are defined. All visual variation comes from swapping the `icon` prop. The card surface, spacing, and typography are fixed.

## 5. States
**Default (only state)**
- Static card; no hover, focus, active, or disabled behavior is implemented
- No interactive states (hover, focus, active, disabled) are implemented. IconCard is a purely presentational component. If interactive behavior is needed, wrap it in a `<button>` or `<a>` at the parent level.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `icon` | `LucideIcon` | — | Yes | Any Lucide icon component; rendered at 24px with 1.5 stroke weight in the accent color |
| `heading` | `string` | — | Yes | Short feature name displayed as an `<h5>` |
| `description` | `string` | — | Yes | Supporting sentence or two displayed as body text below the heading |

## 7. Content guidelines
- **Heading**: 2–5 words; sentence case; no trailing punctuation. Frame as a benefit or capability, not a product name (e.g., "Fast by default" not "Performance Features").
- **Description**: 1–2 sentences (ideally under 20 words each). Explain the value, not the mechanism. Avoid repeating the heading.
- **Icon**: Choose an icon whose meaning aligns with the heading. Avoid icons so generic they fit any card equally well (e.g., prefer `ShieldCheck` over a generic `Check` for security topics).

## 8. Accessibility
- **Keyboard navigation**: Not interactive; no focusable elements.
- **Screen reader behavior**: The icon has `aria-hidden="true"` — it is not announced. The `<h5>` and `<p>` are read in source order. Ensure the heading is semantically meaningful without the icon.
- **Color and contrast**: Heading uses `--color-text-title` (#1e1e1e) on `--color-bg-surface` (#fafafa) — near-maximum contrast, well above WCAG AA. Body text uses `--color-text-body` (#171717) — also strong contrast. Icon accent color `--color-text-accent` (#2e6f40) is decorative only (aria-hidden).
- **Motion**: No animations.
- **Touch / pointer**: Not interactive; no minimum target size applies.
- **Known gaps**: Heading level (`<h5>`) is fixed — if the card appears in a section that already has `<h2>` through `<h4>` headings, the hierarchy may be correct, but if the card is the first heading in a section, `<h5>` may be semantically incorrect. [NEEDS CONFIRMATION] on correct heading level for intended usage context.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-bg-surface` | `#fafafa` | Card background |
| `--color-border-subtle` | `#f5f5f5` | Card 1px border |
| `--size-card-radius` | `4px` (`--primitive-radius-md`) | Card border radius |
| `--size-card-padding` | `1.5rem` (`--primitive-scale-6`) | Card padding all sides |
| `--color-text-accent` | `#2e6f40` (`--primitive-green-500`) | Icon color |
| `--type-h5-family` | `DM Sans, sans-serif` | Heading font family |
| `--type-h5-size` | `1rem` (`--primitive-font-size-base`) | Heading font size |
| `--type-h5-weight` | `700` (`--primitive-font-weight-bold`) | Heading font weight |
| `--type-h5-line-height` | `1.4` | Heading line height |
| `--color-text-title` | `#1e1e1e` (`--primitive-black`) | Heading text color |
| `--size-heading-to-body` | `1rem` (`--primitive-scale-4`) | Gap between icon and text block; gap between heading and description group |
| `--size-body-to-body` | `0.5rem` (`--primitive-scale-2`) | Gap between heading and description |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Description font family |
| `--primitive-font-size-sm` | `0.875rem` | Description font size |
| `--primitive-font-weight-regular` | `400` | Description font weight |
| `--color-text-body` | `#171717` (`--primitive-gray-900`) | Description text color |

## 10. Responsive behavior
IconCard fills 100% of its parent's width at all breakpoints. Responsive grid layout (1-up on mobile, 2-up on tablet, 3–4-up on desktop) is managed by the parent container or CardPack — not by the card itself.

## 11. Composition and usage patterns
**Feature grid via CardPack**
The most common usage is through `CardPack` with `cardType="icon"`. Pass 2–4 cards with `perRow={2}` or `perRow={3}`. Individual IconCard instances can also be placed inside a manual CSS grid.

**Standalone feature callout**
A single IconCard can be placed in a sidebar or beside a block of body text as a highlighted capability statement.

`[STORYBOOK BLOCK: Simple/Cards/ElegantIconCard/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [CardPack](/design-system/docs/card-pack-zh) | When rendering multiple IconCards in a responsive grid layout |
| [CaseStudyCard](/design-system/docs/case-study-card-zh) | When the card needs an image, outcome stat, and extended description |
| KpiCard | When the card content is a metric value with trend direction |

## 13. Do's and don'ts
| Do | Don't |
|---|---|
| Keep headings to 2–5 words so they read at a glance in grid layouts. | Write paragraph-length headings — the `<h5>` is not designed for long strings. |
| Use icons that reinforce the heading meaning at a glance. | Use the same generic icon (e.g., `Star`) on multiple cards in the same grid — it destroys the visual distinction between cards. |
| Write descriptions in plain language; avoid jargon. | Exceed 2 short sentences — the card has no scroll; content overflow extends card height and breaks row alignment. |
| Use CardPack to handle equal-height rows across multiple IconCards. | Place IconCards in a manually set fixed-height container — long descriptions will clip. |
| Keep icon meaning consistent with heading meaning. | Use `aria-hidden="false"` on the icon without also adding a meaningful label — the icon is not designed to carry accessible information. |
| Use this card for evergreen feature statements that need no interaction. | Add an `onClick` handler directly to the card div without adding `role="button"`, `tabIndex={0}`, and keyboard event handling. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
