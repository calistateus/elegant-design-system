---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantBottomNav.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantBottomNav.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None.

**Sections needing human review:**
- Section 5 (States): No active/current-page state is implemented in the component — all links render identically regardless of the current URL. Flagged.
- Section 8 (Accessibility): Touch target height is determined by `--size-btn-py` (0.5 rem / 8 px) padding plus the `xs` font — likely below 44 px.

**Recommended follow-ups:**
- Add an `activeHref` or `activePredicate` prop to highlight the current page link.
- Add focus-visible styles.
- Verify touch target size meets 44×44 px on mobile.
- Add a story demonstrating external link behavior (opens new tab).
- Consider an `icon` prop on each item for icon-labeled nav pattern.

---

# BottomNav

## 1. Overview
A fixed-position footer navigation bar that renders 2–4 text links at the bottom of the viewport, providing persistent access to key external or internal destinations from any scroll position.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Portfolio or personal sites that need persistent access to social links, email, or key pages | Applications with rich tab-bar navigation that also have icon affordances — use a native mobile tab bar pattern instead |
| Mobile layouts where a top nav would be out of reach | Pages where a sticky footer would overlap critical body content (e.g. forms near the bottom) |
| Supplemental navigation for 2–4 destinations that don't fit in the top nav | When you have more than 4 destinations — the horizontal layout on mobile becomes too cramped |
| Providing social/external links (LinkedIn, GitHub, etc.) in a persistent, unobtrusive way | When a top nav already covers all needed destinations |

## 3. Anatomy
1. **Nav wrapper** — `<nav aria-label="Bottom navigation">` fixed to `bottom: 0`, full-width, `z-index: 50`. Provides a Navigation landmark.
2. **Top border** — 1 px `--color-border-subtle` line separating the bar from page content.
3. **Inner group** — `.elegant-bnav-group` `<div>`; stacks items vertically on mobile, horizontally on desktop (≥640 px).
4. **Nav link** — `<a>` element; renders each `BottomNavItem`. External items open in a new tab with `rel="noopener noreferrer"`.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantBottomNav/Desktop]`

## 4. Variants
The component has no named style variants. The key variation axes are `count` (2–4 items) and `external` per item.

**2-item**
- Minimal footprint; useful for a single call-to-action pair (e.g. LinkedIn + Email).
- Horizontal on desktop; stacked on mobile — two tall rows on narrow screens.

**3-item**
- Common for portfolio sites: e.g. LinkedIn / GitHub / Email.

**4-item (default in story)**
- Maximum count; renders LinkedIn, Blog, GitHub, Email in the default story.
- On mobile, four stacked rows; verify the bar height doesn't cover bottom content.

**External link**
- Setting `external: true` on an item adds `target="_blank"` and `rel="noopener noreferrer"`.
- No visual indicator (e.g. external icon) is added.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantBottomNav/Desktop]`
`[STORYBOOK BLOCK: Simple/Navigation/ElegantBottomNav/Mobile]`

## 5. States

**Default**
- All links render in `--color-text-muted` (#666666).
- Font: `xs` (0.75 rem), regular weight, letter-spacing `-0.01em`.
- No active/current-page state is available — all links appear identical regardless of the current URL.

**Hover**
- Color transitions from `--color-text-muted` to `--color-text-title` (#1e1e1e) over 150 ms ease.
- No background change; no underline added.

**Focus**
- Native `<a>` elements receive browser default focus ring. No custom `:focus-visible` styling is applied. Known gap: no design-system-aligned focus ring.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantBottomNav/Desktop]`

## 6. Properties

**Component props (`ElegantBottomNavProps`):**
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `items` | `BottomNavItem[]` | — | Yes | Array of nav items to render. Slice to 2–4 items before passing. |

**`BottomNavItem` shape:**
| Field | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | Yes | Link text displayed in the nav bar. |
| `href` | `string` | — | Yes | Destination URL (relative or absolute). |
| `external` | `boolean` | `false` | No | When `true`, opens the link in a new tab with `rel="noopener noreferrer"`. |

Note: the `count` prop in the story is a Storybook-only control that slices the items array before passing it to the component. The actual component accepts any-length `items` array.

## 7. Content guidelines
- **Label text:** Keep labels to 1–2 words. Use the proper name of the destination (e.g. "LinkedIn", "GitHub") or a clear verb-noun pair (e.g. "Email me"). Avoid abbreviations that are not universally recognized.
- **External links:** No visual cue is rendered for external destinations. If the external-link convention is important for your audience, consider adding an icon to the label string (e.g. "GitHub ↗") until an icon prop is added.
- **Order:** Place the highest-priority destination first (leftmost on desktop). Social links typically go before internal links.

## 8. Accessibility
- **Keyboard navigation:** Links are native `<a>` elements and receive Tab focus in DOM order.
- **Screen reader behavior:** `<nav aria-label="Bottom navigation">` creates a Navigation landmark. Each link is read aloud by its label text. External links announce as regular links — screen readers do not automatically warn about new-tab behavior. Consider adding `(opens in new tab)` visually-hidden text for external items.
- **Color and contrast:** Default muted color (#666666 on #ffffff) ~5.74:1 — passes WCAG AA for small text. Title hover color (#1e1e1e on #ffffff) ~16:1.
- **Motion:** Hover is a 150 ms color transition. No animation requiring a `prefers-reduced-motion` guard.
- **Focus:** Native `<a>` elements receive browser default focus ring. No custom `:focus-visible` styling is applied. Known gap: no design-system-aligned focus ring.
- **Touch/pointer:** Links have `padding: var(--size-btn-py) var(--size-btn-px)` (8px × 16px) with `var(--primitive-font-size-xs)` (12px) text. Rendered height ≈ 8 + 17 + 8 = 33px — below the 44px WCAG 2.5.5 minimum. Known gap; consider increasing `padding-block` to `var(--primitive-scale-4)` (1rem) on touch breakpoints.
- **Known gaps:** No active/current-page state. No custom `:focus-visible` style. No external-link announcement. Touch target height ~33px, below the 44px minimum.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-bg-main` | `#ffffff` | Nav bar background |
| `--color-border-subtle` | `#f5f5f5` | Top border of the nav bar |
| `--color-text-muted` | `#666666` | Default link color |
| `--color-text-title` | `#1e1e1e` | Hover link color |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Font family |
| `--primitive-font-size-xs` | `0.75rem` | Link font size |
| `--primitive-font-weight-regular` | `400` | Link font weight |
| `--size-btn-py` | `0.5rem` | Vertical padding on each link |
| `--size-btn-px` | `1rem` | Horizontal padding on each link |
| `--primitive-scale-3` | `0.75rem` | Vertical padding on the nav wrapper |
| `--primitive-scale-2` | `0.5rem` | Gap between horizontal items (desktop) |
| `--size-page-gutter` | `1.5rem` | Horizontal padding on the nav wrapper |
| `--size-max-width` | `1280px` | Max width of the inner group |
| `--primitive-duration-fast` | `150ms` | Hover transition duration |
| `--primitive-easing-default` | `ease` | Hover transition easing |
| `--z-index-nav` | `50` | z-index of the fixed bar |

## 10. Responsive behavior
- **Mobile (< 640 px):** Items stack vertically (`flex-direction: column`) inside the bar. Bar height grows with each additional item. With 4 items, the bar can become quite tall and may obscure page content.
- **Desktop (≥ 640 px):** Items render in a horizontal row (`flex-direction: row`, `gap: --primitive-scale-2`). The group width collapses to `fit-content` and is left-aligned within `--size-max-width`.
- Breakpoint is implemented via scoped `<style>` inside the component using `min-width: 640px`.

## 11. Composition and usage patterns

**Social links footer**
Pass external LinkedIn, GitHub, and email items. Set `external: true` for LinkedIn and GitHub. Place BottomNav at the root layout level so it persists across all pages.

```tsx
<BottomNav items={[
  { label: 'LinkedIn', href: 'https://linkedin.com/in/…', external: true },
  { label: 'GitHub',   href: 'https://github.com/…',   external: true },
  { label: 'Email',    href: 'mailto:…@….com' },
]} />
```

**Paired with TopNav**
Use TopNav for primary section navigation and BottomNav for social/external links. Avoid duplicating the same destinations in both components — the two should serve complementary roles.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantBottomNav/Desktop]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| TopNav | When primary navigation belongs at the top of the page and should be reachable on both mobile and desktop |
| Breadcrumbs | When users need to navigate a hierarchical path, not a flat set of destinations |
| ActionMenu | When a list of actions should appear contextually on demand, not persistently |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Pass 2–4 items — keep the nav bar compact and scannable. | Pass more than 4 items — horizontal overflow on mobile and vertical stacking become unusable. |
| Mark social links and external URLs with `external: true`. | Silently open external links in the same tab — users lose their place. |
| Place BottomNav in the root layout so it renders on every page. | Conditionally show/hide BottomNav per page — it creates inconsistent chrome. |
| Use short, recognizable labels (platform names or single verbs). | Use generic labels like "Click here" or "Link 1". |
| Verify the bar doesn't obscure form submit buttons or bottom-anchored content on mobile. | Place BottomNav on pages with critical bottom-anchored UI without testing the overlap. |
| Add a visually-hidden "(opens in new tab)" suffix for screen reader users on external links. | Assume screen readers announce new-tab behavior — they do not by default. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
