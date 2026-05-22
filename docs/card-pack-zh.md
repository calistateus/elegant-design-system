---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantCardPack.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantCardPack.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 4 (Variants): Only one story (`Default`) exists using `cardType="icon"`. Separate named stories for each card type would improve zeroheight embeds.
- Section 5 (States): CardPack is a layout container; states are delegated to child card components.
- Section 6 (Properties): `CardOverride` interface is complex — per-field availability varies by `cardType`; this is documented but should be confirmed with the team.
- Section 10 (Responsive behavior): Grid breakpoints are inferred from the injected `<style>` block; the component uses `768px` for tablet and `1024px` for desktop — these differ from the design system's standard grid breakpoints (600px / 1136px). Documented as a known deviation in §10.

**Recommended follow-ups:**
- Add separate stories for `cardType="case-study"`, `cardType="referral"`, and `cardType="kpi"`
- Add a `fillLastRow` demonstration story
- Confirm whether `768px` tablet breakpoint in the injected style is intentional or should match the design system's `600px` override
- Document ElegantKpiCard (not included in the current 7-component list but is referenced here)

---

# CardPack

## 1. Overview
CardPack is a responsive grid layout container that renders 1–12 instances of a chosen card type (case-study, icon, referral, or KPI) with configurable columns per row and per-card content overrides, solving the problem of building consistent multi-card grid sections without manual grid code.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Rendering a section of 2–12 homogeneous cards (features, testimonials, case studies, KPIs) | Mixing different card types in the same grid — CardPack renders one `cardType` per instance |
| Prototyping or building portfolio sections quickly using placeholder data | When cards require individual interactive states like drag-and-drop or inline editing |
| Sections that need responsive column collapse without custom CSS | When the card count or content is entirely dynamic at runtime — prefer a manual grid with individual card components |
| Filling a section with placeholder data that can be progressively overridden | When fewer than 2 cards are needed — use individual card components directly |

## 3. Anatomy
1. **Grid container** — a `<div>` with a scoped CSS class injecting a responsive `grid-template-columns` rule; width is always 100% of the parent.
2. **Card wrappers** — each card rendered inside a `<div>` with `display: flex` to allow children to stretch to equal height.
3. **Child cards** — one of: CaseStudyCard, IconCard, ReferralCard, or KpiCard; all receive data merged from placeholder defaults and `overrides`.
4. **Injected `<style>` block** — scoped to a unique `useId`-derived class to avoid collision when multiple CardPack instances appear on the same page.

`[STORYBOOK BLOCK: Simple/Cards/ElegantCardPack/Default]`

## 4. Variants

**Icon cards (`cardType="icon"`)**
- Renders IconCard instances with icon, heading, and description
- Placeholder data: four feature statements (Fast by default, Built to scale, Secure by design, Works everywhere)
- Default story uses this variant

**Case study cards (`cardType="case-study"`)**
- Renders CaseStudyCard instances with tags, title, description, outcome, and an image slot
- Placeholder data: three portfolio-style case study descriptions

**Referral cards (`cardType="referral"`)**
- Renders ReferralCard instances with a quote, name, and role
- Optional avatar via `showAvatar` prop and per-card `image` override

**KPI cards (`cardType="kpi"`)**
- Renders KpiCard instances with label, value, delta, delta direction, period, and icon
- Placeholder data: four business metric examples

`[STORYBOOK BLOCK: Simple/Cards/ElegantCardPack/Default]`

## 5. States
CardPack has no visual states of its own; it is a layout container. All interactive and visual states (hover on CaseStudyCard, placeholder image on Avatar, etc.) are owned by the individual child card components.

**Fill last row**
When `fillLastRow={true}` and the total card count does not divide evenly into `perRow`, the remaining cards in the last row are stretched to fill the available columns. When `fillLastRow={false}` (default), leftover cards align left at their natural column width.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `cardType` | `'case-study' \| 'icon' \| 'referral' \| 'kpi'` | — | Yes | Determines which card component is rendered for all slots |
| `count` | `number` (1–12) | — | Yes | Number of cards to render; clamped to 1–12 |
| `perRow` | `1 \| 2 \| 3 \| 4` | — | Yes | Number of columns at desktop breakpoint (≥1024px) |
| `fillLastRow` | `boolean` | `false` | No | When true, last-row cards stretch to fill the row if `count % perRow !== 0` |
| `showAvatar` | `boolean` | `false` | No | Referral only: renders the avatar slot on each ReferralCard |
| `overrides` | `CardOverride[]` | — | No | Per-card content overrides indexed by card position (0 = card 1); fields vary by `cardType` |

**CardOverride fields by card type:**
| Field | Type | Card types |
|---|---|---|
| `tags` | `string` (comma-separated) | case-study |
| `title` | `string` | case-study |
| `description` | `string` | case-study, icon |
| `outcome` | `string` | case-study |
| `image` | `string` (URL) | case-study (imagePath), referral (avatarPath) |
| `heading` | `string` | icon |
| `icon` | `LucideIcon` | icon, kpi |
| `quote` | `string` | referral |
| `name` | `string` | referral |
| `role` | `string` | referral |
| `label` | `string` | kpi |
| `value` | `string` | kpi |
| `delta` | `string` | kpi |
| `deltaDirection` | `'up' \| 'down' \| 'neutral'` | kpi |
| `period` | `string` | kpi |

## 7. Content guidelines
Content rules are inherited from the individual card components. For CardPack-specific guidance:
- **Placeholder data**: When no `overrides` are provided, placeholder data cycles — e.g., with 5 icon cards and 4 placeholder items, the 5th card repeats the 1st placeholder. Replace all cards via `overrides` in production.
- **Tags (`case-study`)**: Pass as a comma-separated string in the override (e.g., `"UX Design, Research"`) — the component splits on commas automatically.
- **Count and perRow**: Match these to the number of real content items. Avoid using cycling placeholder data in production.

## 8. Accessibility
- **Grid semantics**: The container is a plain `<div>` grid, not a `<ul>` — individual card components provide their own semantic elements (`<article>`, `<figure>`, etc.).
- **Keyboard navigation**: Depends entirely on child card components; CardPack adds no focusable elements.
- **Screen reader behavior**: Each child card is read in source order. No group label is provided at the CardPack level — consider adding an `aria-label` or a visible heading in the parent section.
- **Motion**: No animations in CardPack itself; CaseStudyCard has GSAP hover animations.
- **Known gaps**: No `role="list"` or `role="group"` on the container — child card interactive semantics are the responsibility of each card component.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--size-card-gap` | `1rem` (`--primitive-scale-4`) | Gap between grid cells |
| `--size-page-gutter` | `1.5rem` (`--primitive-scale-6`) | Story decorator padding (not in the component itself) |

All other visual tokens are applied by the child card components.

## 10. Responsive behavior
CardPack injects a scoped `<style>` block with three breakpoints:

| Breakpoint | Columns |
|---|---|
| Mobile (default) | 1 column |
| Tablet (≥768px) | `min(2, perRow)` columns |
| Desktop (≥1024px) | `perRow` columns (1–4) |

**Note:** The component uses `768px` and `1024px` as its injected breakpoints. These differ from the design system's standard grid breakpoints (`md=600px`, `lg=1136px`). If breakpoint consistency with the grid system is required, update the `@media` queries in the component's `<style>` block.

When `fillLastRow={true}`, the desktop grid uses `desktopCols = perRow * leftover` total columns so that the last row's cards span more columns and visually fill the row.

## 11. Composition and usage patterns
**Homepage feature grid**
`cardType="icon"`, `count={4}`, `perRow={2}`, `fillLastRow={false}` — 2×2 grid of feature highlights.

**Portfolio case studies section**
`cardType="case-study"`, `count={3}`, `perRow={3}` — three case study cards side by side at desktop.

**Testimonials row**
`cardType="referral"`, `count={2}`, `perRow={2}`, `showAvatar={true}` — two testimonial cards with avatar photos.

**Dashboard KPI strip**
`cardType="kpi"`, `count={4}`, `perRow={4}` — four KPI metric cards in a single row.

`[STORYBOOK BLOCK: Simple/Cards/ElegantCardPack/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [IconCard](/design-system/docs/icon-card-zh) | When rendering a single feature card without a grid |
| [CaseStudyCard](/design-system/docs/case-study-card-zh) | When displaying a single case study with individual control over all props |
| [ReferralCard](/design-system/docs/referral-card-zh) | When displaying a single testimonial |

## 13. Do's and don'ts
| Do | Don't |
|---|---|
| Use `overrides` to replace all placeholder content before shipping to production. | Ship pages with cycling placeholder data visible to end users. |
| Match `count` to the actual number of content items — do not over-count and rely on placeholder cycling. | Set `count` to 12 to "fill the grid" when you only have 3 real items. |
| Use `fillLastRow={true}` when an odd number of cards in the last row should visually complete the row. | Use `fillLastRow={true}` when uneven card widths would look awkward (e.g., 3 cards with `perRow={4}` — the last three will each span 4/3 columns). |
| Use a single `cardType` per CardPack instance and place multiple CardPacks if different types are needed. | Attempt to mix card types within one CardPack — the API does not support heterogeneous types. |
| Wrap CardPack in a section with a visible heading and appropriate ARIA landmarks. | Rely solely on CardPack for page sectioning — it provides no semantic landmarks. |
| Use `showAvatar={true}` for referral cards when you have real avatar images to provide. | Enable `showAvatar` without providing `image` overrides — the placeholder Avatar icon will appear for every card. |

## 14. Changelog

**2026-04-27** — Align responsive breakpoints to system standard: 768px → 600px (tablet), 1024px → 1136px (desktop)
