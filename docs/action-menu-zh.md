---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantActionMenu.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantActionMenu.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None.

**Sections needing human review:**
- Section 5 (States): Loading and error states are not implemented — not applicable to this component type; noted accordingly.
- Section 8 (Accessibility): No `aria-label` on the main menu `<div role="menu">` — the ARIA spec recommends either `aria-label` or `aria-labelledby` on a menu role.

**Recommended follow-ups:**
- Add an `aria-label` to the main menu and sub-menu `role="menu"` elements.
- Add a story demonstrating the label-only trigger (no icon).
- Add a story demonstrating a sub-menu.
- Add a story demonstrating all danger variants.
- Consider adding a divider/separator between menu item groups.
- Add `role="menuitem"` check — it is already set, but verify AT announces it correctly with icons present.

---

# ActionMenu

## 1. Overview
A dropdown context menu triggered by a configurable button (icon-only, label-only, or icon+label) that reveals a list of up to seven action items, each optionally carrying an icon, a danger style, or a flyout sub-menu.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| A set of 2–7 contextual actions on a card, row, or object (edit, duplicate, delete, etc.) | A single action — use a button instead |
| When actions are secondary and should not clutter the primary UI | Primary actions that are always visible — surface them as buttons in the layout |
| Grouping destructive actions (delete, archive) with safe actions behind a single trigger | Navigation — use TopNav, BottomNav, or Tabs for navigation |
| Tight-space contexts (table rows, card footers) where full button labels would overflow | More than 7 items — consider grouping into sub-menus or a dedicated settings page |

## 3. Anatomy
1. **Wrapper** — `position: relative; display: inline-block` container that anchors the fixed-position menu.
2. **Trigger button** — `<button aria-haspopup="menu" aria-expanded>`. Renders as icon-only, label-only, or icon+label depending on props. Background fills gray (`--primitive-gray-100`) on hover and when open.
3. **Main menu** — `<div role="menu" aria-orientation="vertical">` rendered `position: fixed`, positioned by `computeMenuPosition()`. Contains action item buttons. Hidden when `open === false`.
4. **Action item button** — `<button role="menuitem">` with optional icon and optional `ChevronRight` sub-menu indicator. Danger variant renders in red.
5. **Sub-menu** — `<div role="menu">` rendered `position: fixed`, positioned relative to the hovered item. Opens on item hover or ArrowRight key. Hidden when no sub-menu item is open.
6. **Sub-menu item button** — `<button role="menuitem">` inside the sub-menu. Supports a `danger` flag.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantActionMenu/ActionMenu]`

## 4. Variants
Trigger configuration is the primary variant axis.

**Icon-only trigger (default)**
- Trigger renders a 16 px Lucide icon (`MoreVertical` by default) with square padding.
- Choose when space is very tight (table row, card corner) and context makes the "more actions" affordance clear.
- Constraint: the icon must convey the "more options" meaning — use `MoreVertical` or `MoreHorizontal` for standard contexts.

**Label-only trigger**
- Trigger renders a text label with wider horizontal padding.
- Choose when the action set is specific enough that a text label clarifies what actions are available (e.g. "Export" triggering export format options).

**Icon + label trigger**
- Trigger renders both icon and label.
- Choose for medium-density interfaces where a bit more context is welcome.

**Default item**
- Standard action item with optional icon. Hover background: `--primitive-gray-50`.

**Danger item**
- `variant: 'danger'` renders label in `--color-error-text` (#dc2626). Hover background: `--primitive-red-100`.
- Use for destructive actions (Delete, Remove, Revoke). Place last in the menu.

**Item with sub-menu**
- Setting `subItems` on an item renders a `ChevronRight` indicator. Hovering or pressing ArrowRight opens the flyout sub-menu.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantActionMenu/ActionMenu]`

## 5. States

| State | Trigger | Action item | Sub-menu item |
|---|---|---|---|
| **Default** | Transparent bg, `1px solid --color-border-subtle` border | Transparent bg | Transparent bg |
| **Hover / Open** | `--color-interactive-hover-bg` bg; 150 ms ease | `--primitive-gray-50` bg (default); `--primitive-red-100` bg (danger); 100 ms ease | Same as action item |
| **Focus — trigger** | No visible ring (known accessibility gap) | — | — |
| **Focus — menu items** | — | Programmatic `.focus()`; keyboard-navigable via ArrowDown/Up/Home/End | Same as action items |

**Trigger — default**
- Background: transparent; border: `1px solid --color-border-subtle`.

**Trigger — hovered or open**
- Background: `--color-interactive-hover-bg`.
- Transition: `--motion-dropdown-trigger` (border-color + box-shadow, 150 ms ease).

**Main menu — closed**
- Removed from DOM entirely — not just hidden.

**Main menu — open**
- Renders `position: fixed` at computed coordinates. `visibility: hidden` until `menuPos` is calculated (prevents flash at 0,0).
- Box shadow: `0 4px 16px rgba(0,0,0,0.08)` (`--shadow-menu`).
- `minWidth: 180px`.

**Action item — default**
- Background: transparent.

**Action item — hovered**
- Background: `--primitive-gray-50` (default) or `--primitive-red-100` (danger).
- Transition: `--motion-dropdown-item` (background-color, 100 ms ease).

**Action item with sub-menu — hovered**
- Sub-menu opens after a 120 ms delay; `ChevronRight` icon is visible when sub-menu is open (indicated by `subOpen` state on the button).

**Sub-menu item — hovered**
- Same background rules as action items.

**Focus — trigger**
- The trigger button has `outline: 'none'` explicitly set via inline style — the browser default focus ring is suppressed and no custom ring replaces it. The trigger is keyboard-accessible (Enter/Space/ArrowDown opens the menu) but has no visible focus indicator. Known critical accessibility gap.

**Focus — menu items**
- Menu items use `tabIndex={-1}` and are focused programmatically via `.focus()` calls. ArrowDown/Up navigates between items; Home/End jumps to first/last; Escape closes the menu and returns focus to the trigger; ArrowRight opens a sub-menu; ArrowLeft/Escape closes the sub-menu. Focus is restored to the trigger when an item is selected or the menu closes via Escape.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantActionMenu/ActionMenu]`

## 6. Properties

**`ActionMenuProps` (union type — at least one of `icon` or `label` must be provided):**
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `icon` | `true` | — | Conditional | When `true`, renders a Lucide icon in the trigger. Required if `label` is not provided. |
| `label` | `string` | — | Conditional | Text label in the trigger. Required if `icon` is not `true`. |
| `items` | `ActionMenuItem[]` | — | Yes | Array of menu item configurations. |
| `triggerIconName` | `string` | `'MoreVertical'` | No | Lucide icon name for the trigger when `icon: true`. Falls back to `MoreVertical` if not found. |

**`ActionMenuItem` shape:**
| Field | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | Yes | Text label for the menu item. |
| `onSelect` | `() => void` | — | Yes | Callback when the item is clicked or activated via keyboard. Not called on items with `subItems`. |
| `icon` | `boolean` | — | No | When `true` and `iconName` is set, renders a 14 px Lucide icon before the label. |
| `iconName` | `string` | — | No | Lucide icon name (e.g. `"Pencil"`, `"Trash2"`). Only used when `icon: true`. |
| `variant` | `'default' \| 'danger'` | `'default'` | No | `'danger'` renders label in red with a red hover background. |
| `subItems` | `SubMenuItem[]` | — | No | When provided, the item opens a flyout sub-menu on hover or ArrowRight. `onSelect` is not called on the parent item. |

**`SubMenuItem` shape:**
| Field | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | Yes | Text label for the sub-menu item. |
| `danger` | `boolean` | `false` | No | When `true`, renders in red with red hover background. |
| `onSelect` | `() => void` | — | Yes | Callback when the sub-item is activated. |

## 7. Content guidelines
- **Item labels:** Use verb phrases (Edit, Duplicate, Archive, Delete). Avoid nouns alone. Keep under ~20 characters.
- **Danger items:** Place destructive items last in the list. Use direct language (Delete, not Remove permanently or Are you sure?).
- **Icon selection:** Icons should be immediately recognizable for the action (Pencil for edit, Trash2 for delete, Copy for duplicate). Do not use decorative icons that add no meaning.
- **Sub-menu labels:** Keep sub-menu item labels distinct from their parent. If the parent says "Export", sub-items might say "As PDF", "As CSV" — not just "PDF".
- **Trigger label:** If using a label trigger, it should describe the category of actions, not a specific action (e.g. "Options" not "Edit").

## 8. Accessibility
- **Keyboard navigation — trigger:** Enter, Space, and ArrowDown open the menu and focus the first item. ArrowUp opens the menu and focuses the last item. These match the ARIA disclosure button / menu button pattern.
- **Keyboard navigation — main menu:** ArrowDown/ArrowUp move focus between items. Home focuses the first item, End the last. Escape closes the menu and returns focus to the trigger. ArrowRight opens a sub-menu on items that have one.
- **Keyboard navigation — sub-menu:** ArrowDown/ArrowUp navigate sub-items. Home/End jump to ends. Escape or ArrowLeft closes the sub-menu and returns focus to the parent item.
- **Screen reader behavior:** Trigger has `aria-haspopup="menu"` and `aria-expanded`. Items with sub-menus have `aria-haspopup="menu"` and `aria-expanded`. All buttons carry `role="menuitem"`. The menu container has `role="menu"` and `aria-orientation="vertical"`. Known gap: no `aria-label` on the menu `<div>` itself — AT may not announce the menu name.
- **Focus (trigger):** The trigger button has `outline: 'none'` explicitly set via inline style — the browser default focus ring is suppressed and no custom ring replaces it. The trigger is keyboard-accessible (Enter/Space/ArrowDown opens the menu) but has no visible focus indicator. Known critical accessibility gap.
- **Focus (menu items):** Menu items use `tabIndex={-1}` and are focused programmatically via `.focus()` calls. ArrowDown/Up navigates between items; Home/End jumps to first/last; Escape closes and returns focus to the trigger; ArrowRight opens a sub-menu; ArrowLeft/Escape closes the sub-menu. Focus is restored to the trigger when an item is selected or the menu closes via Escape.
- **Color and contrast:** Default item text (#171717 on #ffffff) ~16:1. Danger item (#dc2626 on #ffffff) ~5.9:1 — passes WCAG AA. Danger item (#dc2626 on #fee2e2) ~3.8:1 — passes WCAG AA for large text; borderline for small text.
- **Motion:** Item hover transitions are 100 ms (`--motion-dropdown-item`). Trigger hover is 150 ms. No animation requiring `prefers-reduced-motion` guard.
- **Touch/pointer:** Icon-only trigger renders at ~32px (8px padding + 16px icon + 8px padding) — below the 44px WCAG 2.5.5 minimum. Menu items render at ~36px height via `.elegant-menu-item` padding (`var(--size-menu-item-padding)` = 0.5rem × 0.75rem) — also below 44px. Both are known gaps.
- **Known gaps:** No `aria-label` on menu element. Trigger focus ring completely suppressed via `outline: 'none'` — critical gap. Touch targets: trigger ~32px and menu items ~36px, both below the 44px minimum.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-bg-main` | `#ffffff` | Menu and sub-menu background |
| `--primitive-gray-50` | `#fafafa` | Default item hover background |
| `--primitive-gray-100` | `#f5f5f5` | Trigger hover/open background |
| `--color-border-default` | `var(--primitive-gray-200)` = `#e5e5e5` | Menu border color |
| `--primitive-red-100` | `#fee2e2` | Danger item hover background |
| `--color-error-text` | `#dc2626` | Danger item text color |
| `--color-text-body` | `#171717` | Default item text |
| `--color-text-muted` | `#666666` | Sub-menu chevron icon color |
| `--color-border-subtle` | `#f5f5f5` | Trigger border |
| `--primitive-font-size-sm` | `0.875rem` | Trigger and item label font size |
| `--primitive-font-weight-medium` | `500` | Trigger label weight |
| `--primitive-font-weight-regular` | `400` | Menu item label weight |
| `--primitive-scale-1` | `0.25rem` | Menu vertical padding (top/bottom) |
| `--size-menu-item-padding` | `var(--primitive-scale-2) var(--primitive-scale-3)` | Menu item padding (vertical / horizontal) |
| `--size-btn-py` | `0.5rem` | Trigger vertical padding |
| `--size-btn-px` | `1rem` | Trigger horizontal padding (labeled trigger) |
| `--size-btn-icon-gap` | `0.5rem` | Gap between icon and label in trigger and items |
| `--size-btn-radius` | `4px` | Trigger border radius |
| `--size-card-radius` | `4px` | Menu border radius |
| `--shadow-menu` | `0 4px 16px rgba(0,0,0,0.08)` | Menu box shadow |
| `--motion-dropdown-trigger` | `border-color 150ms ease, box-shadow 150ms ease` | Trigger hover transition |
| `--motion-dropdown-item` | `background-color 100ms ease` | Item hover transition |

## 10. Responsive behavior
The menu is rendered `position: fixed` and uses `computeMenuPosition()` to stay within viewport bounds. It:
- Right-aligns to the trigger by default; flips to left-align if it would clip the left edge.
- Opens below the trigger by default; opens above if there is insufficient space below.
- Recomputes position on scroll and resize via event listeners while open.

Sub-menus open to the right of the main menu; flip left if there is insufficient viewport space on the right.

No explicit breakpoint behavior — the component adapts dynamically to available space. On mobile, the fixed-position menu may appear over page content — ensure the trigger is far enough from the viewport edges to allow the menu to open.

## 11. Composition and usage patterns

**Card action menu (icon trigger)**
Place an icon-only trigger in the top-right corner of a card. Pass Edit, Duplicate, and Delete as items (Delete with `variant: "danger"`). The menu will open below the trigger on most cards.

**Table row context menu**
Place an icon trigger in the last column of a data row. Ensure the containing table has `overflow: visible` so the fixed-position menu is not clipped.

**Sub-menu for grouped actions**
Use `subItems` to group related options under a parent label (e.g. "Export" > "As PDF" / "As CSV"). Avoid nesting sub-menus more than one level deep.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantActionMenu/ActionMenu]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [Tabs](/design-system/docs/tabs-zh) | When switching between content views, not triggering actions |
| [TopNav](/design-system/docs/top-nav-zh) | When providing top-level site navigation, not contextual actions |
| [Breadcrumbs](/design-system/docs/breadcrumbs-zh) | When the user needs to navigate a hierarchy, not act on an item |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Place destructive actions (Delete, Revoke) last in the menu with `variant: "danger"`. | Mix danger and safe actions without visual separation — users may click destructive items accidentally. |
| Use icon-only triggers in tight-space contexts (table rows, card corners). | Use an ambiguous icon for the trigger — stick to `MoreVertical` or `MoreHorizontal` for "more actions". |
| Call `onSelect` handlers that provide user feedback (toast, confirmation dialog) for destructive actions. | Execute irreversible actions (delete, revoke) without a confirmation step. |
| Keep menus to 4–6 items; use sub-menus for secondary groupings. | Exceed 7 items — a long dropdown becomes harder to scan and select from. |
| Pass a real `iconName` that exists in Lucide when `icon: true`. | Pass `icon: true` without `iconName` — the icon slot will render nothing but the gap will still appear. |
| Verify the menu opens within viewport bounds by testing near screen edges. | Assume the flip algorithm handles all edge cases — test on mobile where the viewport is narrow. |

## 14. Changelog

### 2026-04-27
- **Tokens:** Replaced `--primitive-gray-200` with `--color-border-default` for the menu border; consolidated menu item padding to `--size-menu-item-padding`. Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.

**2026-04-27** — Replace `--primitive-gray-50` with `--color-bg-surface` for menu item hover; replace `--primitive-gray-100` with `--color-interactive-hover-bg` for trigger hover
