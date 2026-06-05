---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantTabs.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantTabs.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None.

**Sections needing human review:**
- Section 5 (States): Keyboard navigation is not fully implemented — the `tabIndex` trick (active=0, inactive=-1) is present, but arrow key movement between tabs is not wired up. This is a gap against the ARIA Tabs pattern. Flagged in Section 8.
- Section 4: Only one story exists with both `tabStyle` values toggled via a Storybook control; no separate named story per variant.

**Recommended follow-ups:**
- Add separate named stories for `underlined` and `contained` variants.
- Implement arrow-key navigation between tabs per the ARIA Tabs pattern (Left/Right arrow moves focus, Enter/Space selects).
- Add a story for 2-tab minimum edge case.
- Consider adding a `disabled` tab state.
- Content passed to tabs is plain string in the story — add a story showing rich `ReactNode` content.

---

# Tabs

## 1. Overview
A tab strip component that switches between two to five labeled content panels, available in an underlined or contained visual style.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Organizing parallel content sections that users compare or switch between frequently | Deep hierarchies — use Breadcrumbs or a sidebar nav instead |
| Settings panels, detail views, or dashboards with distinct but related sections | Sequential workflows where order matters — use a stepper instead |
| When all tab content can coexist in the DOM without performance concerns | When you need more than 5 tabs — consider a sidebar nav or overflow menu |
| Reducing vertical page length by collapsing sections into panels | When only one content section exists — a tab strip is redundant |

## 3. Anatomy
1. **Tab strip** — `<div role="tablist" aria-label="Tabs">` horizontal container with a bottom border; wraps all tab buttons.
2. **Tab button** — `<button role="tab" aria-selected>` for each slot; changes appearance based on `tabStyle` and active state.
3. **Active indicator** — for `underlined`: 2 px bottom border on the active tab. For `contained`: active tab background merges with content area background, erasing the strip border.
4. **Content panel** — `<div role="tabpanel" aria-labelledby={uid-tab-N}>` below the strip. `id` and `aria-labelledby` are generated via `useId` to link each panel to its tab button. Renders only the active tab's `content` node.
5. **Container** — outer `<div className={className}>` that wraps strip and content panel together.

`[STORYBOOK BLOCK: Simple/Content/ElegantTabs/Tabs]`

## 4. Variants

**Underlined**
- Visual style: tab buttons sit on a transparent background. Active tab shows a 2 px solid `--color-interactive-primary-bg` bottom border. Inactive tabs show no border.
- Strip has a 1 px `--color-border-subtle` bottom edge.
- Content panel below has no border — content flows freely.
- Communicates a lightweight, minimal feel appropriate for content-heavy pages.
- Choose when the interface should feel open and editorial rather than boxed.
- Constraint: the bottom border on the active tab uses `marginBottom: -1px` to overlap the strip's border — do not add additional bottom padding to the strip container.

**Contained**
- Visual style: inactive tabs sit on `--primitive-gray-100` with a full border. Active tab has `--color-bg-main` background and its bottom border disappears, visually connecting to the content panel.
- Content panel has a left, right, and bottom border with `--primitive-radius-md` rounded bottom corners, creating an enclosed box.
- Communicates a card-like, structured feel appropriate for form panels, settings, or dashboards.
- Choose when the tab+panel unit should read as a discrete container.
- Constraint: first tab gets `border-top-left-radius: --primitive-radius-sm`; last tab gets `border-top-right-radius: --primitive-radius-sm`.

## 5. States

| State | Inactive tab | Active tab — underlined | Active tab — contained |
|---|---|---|---|
| **Default** | `--color-text-muted`; regular weight; cursor pointer | `--color-text-title`; medium weight; 2px `--color-interactive-primary-bg` bottom border | `--color-text-title`; medium weight; `--color-bg-main` bg; bottom border erased |
| **Hover** | → `--color-text-body`; 150 ms ease | — | — |
| **Focus** | Browser default outline (no custom ring; known gap) | Browser default outline | Browser default outline |

**Default (inactive tab)**
- Color: `--color-text-muted`.
- Font weight: regular (400).
- Cursor: pointer.

**Hover (inactive tab)**
- Color transitions to `--color-text-body`.
- Transition: 150 ms ease on `color` and (for underlined) `border-color`.

**Active (selected tab)**
- Color: `--color-text-title`.
- Font weight: medium (500).
- Cursor: default.
- `aria-selected="true"` is set.
- Underlined: 2 px solid `--color-interactive-primary-bg` bottom border.
- Contained: background matches `--color-bg-main`; bottom border is erased.

**Focus**
- Active tab has `tabIndex={0}`; inactive tabs have `tabIndex={-1}`. Browser default focus outline appears on the focused `<button>`. No custom `:focus-visible` ring is implemented. Arrow key navigation between tabs is not implemented (only mouse click `onClick`). Users must Tab to the active tab button and then click to switch — this deviates from the ARIA `tablist` pattern which requires Left/Right arrow keys. Known gap.

`[STORYBOOK BLOCK: Simple/Content/ElegantTabs/Tabs]`

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `tabStyle` | `'underlined' \| 'contained'` | `'underlined'` | No | Visual style of the tab strip. |
| `count` | `2 \| 3 \| 4 \| 5` | — | Yes | Number of tabs to render; slices the `tabs` array to this length. |
| `tabs` | `ContentSlot[]` | — | Yes | Array of `{ label: string; content: ReactNode }` objects. Must supply at least `count` items. |
| `defaultActiveIndex` | `number` | `0` | No | Zero-based index of the tab that is active on first render. |
| `onTabChange` | `(index: number) => void` | — | No | Optional callback fired when the user selects a tab, receiving the zero-based index. |
| `className` | `string` | `''` | No | Additional class names applied to the outer container `<div>`. |

`ContentSlot` shape: `{ label: string; content: ReactNode }`.

## 7. Content guidelines
- **Tab labels:** Keep labels short (1–3 words). Use title case. Avoid truncation — labels have `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` so very long labels will be cut.
- **Tab content:** Any `ReactNode` is accepted. For the `contained` variant, the content panel provides `--size-card-padding` (1.5 rem) padding. For `underlined`, the same padding applies — avoid adding extra outer padding in the passed content.
- **Count consistency:** The `count` prop must match the number of meaningful content sections. Do not pass placeholder tabs with empty content.

## 8. Accessibility
- **Keyboard navigation:** The ARIA Tabs pattern requires Left/Right arrow keys to move focus between tabs and Enter/Space to select. This component implements `tabIndex` management (0 for active, -1 for inactive) but arrow key navigation between tabs is not implemented — only mouse click `onClick` is wired. Users must Tab to the active tab button and then click to switch, which deviates from the ARIA `tablist` pattern. Known gap — implement arrow key handler before shipping.
- **Screen reader behavior:** Tab buttons carry `role="tab"`, `aria-selected`, `id={uid-tab-N}`, and `aria-controls={uid-panel-N}`. The tab strip has `role="tablist"` and `aria-label="Tabs"`. The content panel carries `role="tabpanel"` and `aria-labelledby={uid-tab-N}`, linking it to its controlling tab button. Inactive panels are not in the DOM, which is acceptable per the ARIA Tabs pattern.
- **Color and contrast:** Active tab title color (#1e1e1e on #ffffff) ~16:1. Muted inactive color (#666666 on #ffffff) ~5.74:1 — passes WCAG AA.
- **Motion:** Hover transitions are 150 ms color-only changes. No animated panel transition — content switches instantly. No `prefers-reduced-motion` guard needed for current implementation.
- **Touch/pointer:** Tab buttons have `padding: var(--primitive-scale-2) var(--primitive-scale-3)` (8px × 12px). Rendered height ≈ 8 + (14px font × 1.4 line-height) + 8 = ~36px — below the 44px WCAG 2.5.5 minimum. Known gap for touch-primary surfaces.
- **Known gaps:** Arrow key navigation between tabs is not implemented (recommended: Left/Right arrow moves focus between tab buttons). No custom `:focus-visible` style applied by the component. Touch target height (~36px) is below the 44px WCAG 2.5.5 minimum.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-interactive-primary-bg` | `#1e1e1e` | Active tab underline (underlined variant) |
| `--color-bg-main` | `#ffffff` | Active tab background (contained); content panel background |
| `--primitive-gray-100` | `#f5f5f5` | Inactive tab background (contained variant) |
| `--color-border-subtle` | `#f5f5f5` | Strip bottom border; contained tab/panel borders |
| `--color-text-title` | `#1e1e1e` | Active tab label color |
| `--color-text-body` | `#171717` | Hovered tab label color |
| `--color-text-muted` | `#666666` | Inactive tab label color |
| `--primitive-font-size-sm` | `0.875rem` | Tab label and content font size |
| `--primitive-font-weight-regular` | `400` | Inactive tab label weight |
| `--primitive-font-weight-medium` | `500` | Active tab label weight |
| `--size-input-padding` | `var(--primitive-scale-2) var(--primitive-scale-3)` | Tab button padding (vertical / horizontal) |
| `--primitive-radius-sm` | `2px` | Top corner radius on first/last tab (contained) |
| `--size-input-radius` | `var(--primitive-radius-md)` = `4px` | Bottom corners of content panel (contained) |
| `--size-card-padding` | `1.5rem` | Content panel padding |
| `--motion-interactive-color` | `color 150ms ease` | Hover color transition on tabs |

## 10. Responsive behavior
Tab labels use `flex: 1` so they share available width equally. Long labels truncate with ellipsis rather than wrapping. On narrow viewports (below ~360 px), 5 tabs may become illegible due to truncation. Strategies:
- Reduce `count` at narrow breakpoints.
- Use shorter label strings.
- Consider an alternative navigation pattern (dropdown or bottom nav) on mobile.
No built-in breakpoint adaptation is implemented.

## 11. Composition and usage patterns

**Contained tabs for settings panels**
Use `tabStyle="contained"` when the tab group is a self-contained UI region (e.g. a settings form). The bordered content panel visually scopes the content and reduces visual noise from surrounding page elements.

**Underlined tabs for editorial content**
Use `tabStyle="underlined"` on content pages where the tabs organize reading sections (Overview, Details, Archive). The lighter visual weight keeps the page open.

**Tabs with rich content**
The `content` slot accepts any `ReactNode`. Pass full components (cards, forms, lists) rather than plain strings in production. The story uses strings for brevity.

`[STORYBOOK BLOCK: Simple/Content/ElegantTabs/Tabs]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [Breadcrumbs](/design-system/docs/breadcrumbs-zh) | When the user navigates between pages in a hierarchy, not views within a single page |
| [BottomNav](/design-system/docs/bottom-nav-zh) | When switching between top-level app sections that each have distinct URLs |
| [ActionMenu](/design-system/docs/action-menu-zh) | When choosing from a list of actions, not switching between content panels |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use `tabStyle="contained"` for structured UI panels and `tabStyle="underlined"` for editorial sections. | Mix tab styles within the same page — pick one and apply it consistently. |
| Keep tab labels to 1–3 words. | Use full sentences as tab labels — they will truncate and may be unreadable. |
| Supply at least `count` items in the `tabs` array. | Pass fewer items than `count` — the missing tab will render with no label or content. |
| Use `defaultActiveIndex` to pre-select a meaningful starting tab (e.g. the most important section). | Default to a tab with empty or placeholder content. |
| Pass real content to every tab slot before shipping. | Ship with empty content panels — users who navigate to an empty tab will think the feature is broken. |
| Implement arrow-key navigation before production use. | Rely on Tab key alone for accessibility — the ARIA Tabs pattern requires arrow keys between tab buttons. |

## 14. Changelog

### 2026-04-27
- **Accessibility:** Added `role="tabpanel"` and `aria-labelledby` to the content panel, and `id`/`aria-controls` to tab buttons, using `useId` for stable unique IDs. This properly links each panel to its controlling tab button for screen readers.
- **Tokens:** Replaced `--primitive-duration-fast` + `--primitive-easing-default` with `--motion-interactive-color`; `--primitive-radius-md` with `--size-input-radius`; tab button padding consolidated to `--size-input-padding`. Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.
