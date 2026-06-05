---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantBreadcrumbs.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantBreadcrumbs.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None.

**Sections needing human review:**
- Section 8 (Accessibility): No `aria-label` on individual links beyond the parent `<nav aria-label="Breadcrumb">`. Current page uses `aria-current="page"`.

**Confirmed facts:**
- Focus: Native `<a>` elements receive browser default focus ring. No custom `:focus-visible` styling. Current page `<span aria-current="page">` is correctly non-focusable. Known gap.

**Recommended follow-ups:**
- Add a story for the 2-item minimum and 5-item maximum to demonstrate the count constraint.
- Add a story demonstrating a custom separator (e.g. `>` or `chevron`).
- Consider adding `:focus-visible` styling directly in the component to meet WCAG 2.4.7.
- Verify truncation behavior when labels are very long strings.

---

# Breadcrumbs

## 1. Overview
A horizontal trail of navigational links that shows a user's current location within a site hierarchy and lets them navigate to any ancestor page.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Showing location in a multi-level hierarchy (3+ levels deep) | Top-level pages with no parent — breadcrumbs add no value with a single level |
| Case study or detail pages nested under a section | When the navigation structure is flat — use a top nav or tabs instead |
| Supplementing (not replacing) the primary navigation | On mobile where horizontal space is tight and the path is very long — consider truncating to 2 items or omitting |
| Giving users a quick path back multiple levels | When a user has arrived from search and the trail would be misleading |

## 3. Anatomy
1. **Nav wrapper** — `<nav aria-label="Breadcrumb">` containing the ordered list; provides landmark for screen readers.
2. **Ordered list** — `<ol>` laid out horizontally with flex; resets list styles.
3. **Ancestor link** — `<a>` element styled in muted color; navigates to that ancestor on click.
4. **Separator** — `aria-hidden` `<span>` between each item; defaults to `/`; visually splits crumbs without adding to the accessible name.
5. **Current page** — `<span aria-current="page">` styled in title color with medium weight; not a link.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantBreadcrumbs/Breadcrumbs]`

## 4. Variants
This component has a single configurable story (all items share the same visual style). The key variation axis is `count`.

**2-item (root + current)**
- Communicates the shallowest path: home and the current page only.
- Choose when depth is minimal and adding more items would be redundant.
- Minimum supported value — do not pass `count` below 2.

**3-item (default in story)**
- Most common usage: root → section → current page.
- Choose for typical content hierarchies (e.g. Home / Work / Case Study).

**4-item**
- Adds a second ancestor between section and current page.
- Choose when there is a meaningful intermediate grouping users may want to jump to.

**5-item (maximum)**
- Full depth trail.
- Constrained by the `count` prop maximum; do not exceed.

## 5. States

| State | Ancestor link | Current page item |
|---|---|---|
| **Default** | `--color-text-muted`, regular weight | `--color-text-title`, medium weight |
| **Hover** | Color → `--color-text-body`; 150 ms ease | No hover (non-interactive `<span>`) |
| **Focus** | Browser default focus ring (no custom ring; known gap) | Not focusable (`aria-current="page"` on `<span>`) |

**Default**
- Ancestor links render in `--color-text-muted`, regular weight.
- Current page renders in `--color-text-title`, medium weight.
- Separator renders in `--color-text-muted`.

**Hover (ancestor links)**
- Triggered when the pointer enters an ancestor `<a>` element.
- Color transitions from `--color-text-muted` to `--color-text-body` over 150 ms (`ease`).
- No change on the current page item (it is a `<span>`, not a link).

**Focus**
- Native `<a>` elements receive the browser's default focus ring. No custom `:focus-visible` styling is applied by the component. Current page is rendered as `<span aria-current="page">` — not focusable, which is correct (it is not a link). Known gap: recommend adding a consistent focus ring for anchor elements.

**Current page**
- Rendered as a `<span>`, not interactive; pointer events have no effect.
- `aria-current="page"` is applied for screen reader announcement.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantBreadcrumbs/Breadcrumbs]`

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `count` | `2 \| 3 \| 4 \| 5` | — | Yes | Number of items to render; slices the `items` array to this length. |
| `items` | `BreadcrumbItem[]` | — | Yes | Array of `{ label: string; href: string }` objects. Must supply at least `count` items. |
| `separator` | `string` | `'/'` | No | Character (or string) rendered between crumbs. Passes through as text. |
| `className` | `string` | `''` | No | Additional class names applied to the `<nav>` element for layout overrides. |

`BreadcrumbItem` shape: `{ label: string; href: string }`.

## 7. Content guidelines
- **Label text:** Use the page's exact title or a shortened version. Avoid generic labels like "Page 3". Keep labels under ~20 characters to prevent wrapping.
- **Href:** Must be a valid relative or absolute URL. The last item's `href` is never rendered as a link but the value is still consumed from the array.
- **Separator:** Default `/` works for most cases. If the brand uses a chevron (`›`) or arrow, pass it as the `separator` prop — keep it a single character.
- **Truncation:** Labels do not auto-truncate. If a label is very long it will push other items off-screen. Shorten labels in content data instead.

## 8. Accessibility
- **Keyboard navigation:** Ancestor links are native `<a>` elements and receive Tab focus in source order. No custom keyboard handling is required.
- **Screen reader behavior:** `<nav aria-label="Breadcrumb">` creates a Navigation landmark. The last item carries `aria-current="page"` so readers announce it as the current page. Separators are `aria-hidden="true"` and are not read aloud.
- **Color and contrast:** Muted ancestors (#666666 on #ffffff) yield approximately 5.74:1 — passes WCAG AA for normal text. Title color (#1e1e1e on #ffffff) yields approximately 16:1.
- **Motion:** Color transition on hover uses `--primitive-duration-fast` (150 ms) with `ease` easing. No animation that would violate `prefers-reduced-motion` — plain color change is not considered motion under WCAG 2.3.3. No `prefers-reduced-motion` guard is required.
- **Touch/pointer:** Breadcrumb links have no explicit padding. Touch target height is approximately 14px text × 1.4 line-height = ~20px — below the 44px WCAG 2.5.5 minimum. This is a known gap for touch-primary surfaces. Avoid using breadcrumbs as standalone navigation on mobile without increasing tap target size. Separator spans are `aria-hidden` and non-interactive.
- **Known gaps:** No custom `:focus-visible` style is applied by the component; browsers show their default outline only. Touch target height (~20px) is below the 44px WCAG 2.5.5 minimum on touch-primary surfaces.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-text-muted` | `#666666` | Ancestor link color, separator color |
| `--color-text-body` | `#171717` | Ancestor link hover color |
| `--color-text-title` | `#1e1e1e` | Current page label color |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Font family for all text |
| `--primitive-font-size-sm` | `0.875rem` | Font size for all crumb items |
| `--primitive-font-weight-regular` | `400` | Weight for ancestor links and separator |
| `--primitive-font-weight-medium` | `500` | Weight for the current page label |
| `--primitive-scale-2` | `0.5rem` | Gap between items and within each list item |
| `--primitive-duration-fast` | `150ms` | Hover color transition duration |
| `--primitive-easing-default` | `ease` | Hover color transition easing |

## 10. Responsive behavior
The component uses `display: flex` with `gap` and no wrapping constraints. On very narrow viewports, long label strings or many items can overflow horizontally. No explicit breakpoint adaptation is built in — implement truncation in the `label` strings or reduce `count` at smaller breakpoints via the parent layout.

## 11. Composition and usage patterns

**Page header breadcrumb**
Place the Breadcrumbs component directly above the page `<h1>` to orient users before reading the title. Most appropriate for content pages, case studies, or blog posts nested two or more levels deep.

**Breadcrumbs in a sticky top bar**
Do not place inside `ElegantTopNav` — the nav bar uses a fixed 3 rem height with no space for a second row. Render Breadcrumbs as the first element in the page content area, below the nav, instead.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantBreadcrumbs/Breadcrumbs]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [Tabs](/design-system/docs/tabs-zh) | When the user is switching between sibling views at the same level, not navigating a hierarchy |
| [Pagination](/design-system/docs/pagination-zh) | When the user is moving forward/backward through sequential pages, not traversing a tree |
| [TopNav](/design-system/docs/top-nav-zh) | When the user needs to jump between top-level sections, not retrace their current path |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Keep the current page label identical to the `<h1>` on that page. | Use breadcrumbs as the only navigation on a page — they supplement the primary nav. |
| Use `count` to match the actual depth of the page in the hierarchy. | Pass more items in the `items` array than `count` — extra items are silently sliced and discarded. |
| Use the default `/` separator for standard hierarchies. | Use long multi-character strings as separators — they consume space and can confuse screen readers. |
| Place Breadcrumbs above the page heading in the document flow. | Place Breadcrumbs at the bottom of the page — users expect them at the top. |
| Shorten labels to their common short form (e.g. "Work" not "My Portfolio of Work"). | Allow labels to exceed ~20 characters without testing for overflow. |
| Ensure ancestor `href` values are real, navigable URLs. | Use `#` as a placeholder `href` in production — it breaks keyboard navigation expectations. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
