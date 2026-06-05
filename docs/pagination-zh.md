---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantPagination.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantPagination.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None.

**Sections needing human review:**
- Section 5 (States): Focus styles rely on browser defaults — no `:focus-visible` styling in component. Flagged.
- Section 8 (Accessibility): No `aria-disabled` on the disabled prev/next buttons — only the native HTML `disabled` attribute is used.

**Recommended follow-ups:**
- Add dedicated stories for: first page (prev disabled), last page (next disabled), single-page (totalPages=1).
- Add stories showing `siblings=0` (minimal) and `siblings=3` (wide window) variants.
- Consider adding `aria-disabled` alongside the HTML `disabled` attribute for better AT compatibility.

---

# Pagination

## 1. Overview
A compact row of page-number buttons and prev/next arrow controls that lets users navigate through a paged dataset without triggering full page reloads.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Long lists or tables split across multiple pages | When all content fits in a single view — pagination adds unnecessary friction |
| Search results, blog post archives, or portfolio grids with discrete pages | For infinite-scroll feeds — use a "Load more" button instead |
| Any context where jumping to a specific page number is useful | When the total number of pages is unknown or dynamically growing |
| Replacing full-page reloads with client-side state updates | For step-by-step flows (wizards) — use a stepper component instead |

## 3. Anatomy
1. **Nav wrapper** — `<nav aria-label="Pagination">` provides a landmark; wraps all controls inline.
2. **Previous button** — `<button aria-label="Previous page">` with a `ChevronLeft` icon; disabled and dimmed when on page 1.
3. **Page buttons** — individual `<button>` elements, one per visible page number; active page has filled background and `aria-current="page"`.
4. **Ellipsis** — `aria-hidden` `<span>` showing `…` when page numbers are collapsed; not interactive.
5. **Next button** — `<button aria-label="Next page">` with a `ChevronRight` icon; disabled and dimmed when on the last page.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantPagination/Pagination]`

## 4. Variants
The component has a single visual design; behavior varies via `siblings` and the computed `currentPage` position.

**Flush-left window**
- Rendered when `currentPage` is near the start of the range.
- Page window sits at the left side of the number list; a trailing ellipsis appears before the last page.
- No leading ellipsis.

**Centered window**
- Rendered when `currentPage` is in the middle of the range.
- Leading and trailing ellipses both appear; page window centers around the active page.

**Flush-right window**
- Rendered when `currentPage` is near the end.
- Page window sits at the right; a leading ellipsis appears after page 1.
- No trailing ellipsis.

## 5. States

| State | Page button | Prev / Next button |
|---|---|---|
| **Default (inactive)** | No bg; `--color-text-body` text; cursor pointer | `--primitive-gray-300` icon; `1px solid --primitive-gray-200` border |
| **Active (current page)** | `--color-interactive-primary-bg` bg; `--color-interactive-primary-fg` text; medium weight; `aria-current="page"` | — |
| **Hover** | `--primitive-gray-200` border; `--color-text-title` text; 150 ms ease | `--primitive-gray-400` border; `--color-text-title` icon |
| **Disabled** | — | `disabled` attr; `--primitive-gray-300` icon; no hover effect |
| **Focus** | Browser default outline (no custom ring; known gap) | Browser default outline |

**Default (inactive page button)**
- Background: none; border: transparent.
- Color: `--color-text-body`.
- Cursor: pointer.

**Active (current page)**
- Background: `--color-interactive-primary-bg`.
- Text: `--color-interactive-primary-fg`.
- Border: `1px solid --primitive-black`.
- Font weight: medium (500).
- Cursor: default — the button is not re-clickable.
- `aria-current="page"` is set.

**Hover (inactive page button)**
- Border color changes to `--primitive-gray-200`; text color shifts to `--color-text-title`.
- 150 ms ease transition.

**Hover (prev/next button, enabled)**
- Border color changes to `--primitive-gray-400`; icon color shifts to `--color-text-title`.

**Disabled (prev/next at boundary)**
- HTML `disabled` attribute set; cursor: default.
- Icon color: `--primitive-gray-300`.
- Border: `1px solid --primitive-gray-200` (unchanged from enabled, but icon is dimmed).
- No hover effect applied.

**Focus**
- No explicit `:focus-visible` style set. Browser default outline applies. The `.elegant-btn:focus-visible` global rule is not applied to pagination buttons — no design-system-aligned focus ring is present. Known gap.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantPagination/Pagination]`

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `totalPages` | `number` | — | Yes | Total number of pages. Must be ≥ 1. |
| `currentPage` | `number` | — | Yes | The currently active page, 1-based. |
| `onPageChange` | `(page: number) => void` | — | Yes | Callback invoked when the user clicks a page or arrow button. |
| `siblings` | `number` | `1` | No | Number of page buttons shown on each side of the active page in the window. |
| `className` | `string` | `''` | No | Additional class names applied to the `<nav>` element. |

## 7. Content guidelines
This component contains no human-authored copy. All labels are generated from page numbers (`aria-label="Page N"`) and fixed string labels (`"Previous page"`, `"Next page"`). No content guidelines apply beyond ensuring `totalPages` and `currentPage` are accurate.

## 8. Accessibility
- **Keyboard navigation:** All buttons are native `<button>` elements and receive Tab focus. Pressing Enter or Space activates the focused button.
- **Screen reader behavior:** `<nav aria-label="Pagination">` creates a Navigation landmark. Active page has `aria-current="page"`. Prev/next have `aria-label` strings. Ellipsis spans are `aria-hidden="true"`. Individual page buttons have `aria-label="Page N"`.
- **Disabled state:** The `disabled` HTML attribute is applied to prev/next at boundaries. Screen readers will announce buttons as dimmed/unavailable. The native `disabled` attribute also removes prev/next buttons from the tab order at their limits. Note: `aria-disabled` is not added — consider adding it if support for older AT is required.
- **Focus:** All buttons are native `<button>` elements — browser default focus outline applies. No custom `:focus-visible` ring is defined (the `.elegant-btn:focus-visible` global rule is not applied to pagination buttons). Disabled prev/next buttons properly use the native `disabled` attribute, which removes them from the tab order. Known gap: no custom focus ring aligned to the design system.
- **Color and contrast:** Active page (#ffffff on #1e1e1e) yields ~16:1. Inactive page numbers (#171717 on #ffffff) yield ~16:1. Disabled icons (#d4d4d4 on #ffffff) yield ~1.6:1 — intentionally low to communicate disabled state; not a WCAG failure for non-text elements.
- **Motion:** Hover transitions are 150 ms color changes only. No animation requiring `prefers-reduced-motion` guarding.
- **Touch/pointer:** All buttons are explicitly `width: var(--primitive-scale-8)` × `height: var(--primitive-scale-8)` = 32px × 32px — below the 44px WCAG 2.5.5 minimum. This is a known gap for touch-primary surfaces.
- **Known gaps:** No custom `:focus-visible` ring aligned to design system; no `aria-disabled`; touch targets 32px × 32px, below the 44px minimum.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--primitive-scale-8` | `2rem` | Width and height of all buttons |
| `--primitive-radius-md` | `4px` | Border radius of all buttons |
| `--primitive-gray-200` | `#e5e5e5` | Enabled nav button border; inactive page button hover border |
| `--primitive-gray-300` | `#d4d4d4` | Disabled nav button icon color |
| `--primitive-gray-400` | `#a3a3a3` | Nav button hover border color |
| `--primitive-black` | `#1e1e1e` | Active page button border |
| `--color-interactive-primary-bg` | `#1e1e1e` | Active page button background |
| `--color-interactive-primary-fg` | `#ffffff` | Active page button text |
| `--color-text-body` | `#171717` | Default page button text; enabled nav button icon |
| `--color-text-title` | `#1e1e1e` | Hover text color for buttons |
| `--color-text-muted` | `#666666` | Ellipsis color |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Font family |
| `--primitive-font-size-sm` | `0.875rem` | Font size for page numbers |
| `--primitive-font-weight-regular` | `400` | Inactive page number weight |
| `--primitive-font-weight-medium` | `500` | Active page number weight |
| `--primitive-scale-1` | `0.25rem` | Gap between all controls |
| `--primitive-scale-2` | `0.5rem` | Horizontal padding on page buttons |
| `--primitive-duration-fast` | `150ms` | Hover transition duration |
| `--primitive-easing-default` | `ease` | Hover transition easing |

## 10. Responsive behavior
The component is `display: inline-flex` and does not constrain its width. On narrow viewports, a large `totalPages` with many visible siblings can overflow its container. Strategies:
- Reduce `siblings` to `0` on mobile to show only the active page and its immediate neighbors.
- Wrap the component in an `overflow-x: auto` container as a fallback.
No built-in breakpoint adaptation is implemented.

## 11. Composition and usage patterns

**Controlled pagination with stateful parent**
The story wraps the component in a `useState` hook. The parent owns `currentPage`; the component calls `onPageChange` on every interaction. The parent must update state for the UI to reflect the new page.

```tsx
const [page, setPage] = useState(1);
<Pagination totalPages={20} currentPage={page} onPageChange={setPage} />
```

Appropriate for any list, table, or grid where content is loaded client-side. Gotcha: do not use this component for server-side pagination without connecting `onPageChange` to a router push.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantPagination/Pagination]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [Breadcrumbs](/design-system/docs/breadcrumbs-zh) | When users need to navigate the site hierarchy, not step through a sequence of pages |
| [Tabs](/design-system/docs/tabs-zh) | When content sections are always rendered and users switch views, not pages |
| [BottomNav](/design-system/docs/bottom-nav-zh) | When navigating between distinct app sections rather than paging through dataset items |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Keep the component controlled — always pass the current page from state and update it in `onPageChange`. | Use `currentPage` values outside the `1..totalPages` range — behavior is undefined. |
| Reduce `siblings` on mobile to keep the control compact. | Set `siblings` so high that all page numbers always show — it defeats the purpose of the ellipsis algorithm. |
| Pair Pagination with a visible results count (e.g. "Showing 21–30 of 87 results") above the list. | Use Pagination as the only indication of how many pages exist. |
| Scroll the list to the top when the page changes. | Let the viewport stay at the bottom of the previous page after navigation. |
| Disable or hide the component when `totalPages === 1`. | Show prev/next arrows that are both disabled simultaneously at `totalPages === 1`. |
| Keep `totalPages` accurate — recompute it when the underlying dataset length changes. | Use a hardcoded `totalPages` value that can get out of sync with real data. |

## 14. Changelog

**2026-04-27** — Replace `--primitive-black` with `--color-interactive-primary-bg` for active page border; replace `--primitive-gray-400` with `--color-border-input-focus` for prev/next hover
