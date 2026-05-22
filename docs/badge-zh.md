---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantBadge.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantBadge.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 4 (Variants): `white` and `black` color variants use `transparent` background — verify intended usage against both light and dark backgrounds, as no dark-mode token layer was found.
- Section 8 (Accessibility): the badge is a non-interactive `<span>`. No `role` is applied. Verify whether a `role="status"` or `aria-label` is needed in contexts where the badge communicates dynamic state.

**Recommended follow-ups:**
- Add individual stories for each of the 8 color variants (currently only one story with a `color` control).
- Add a story showing `showIcon: false` (label only).
- Confirm whether badges should ever be interactive (e.g., clickable filter chips) — if so, consider a separate interactive variant or route to the Chip component.
- Verify contrast ratios for all 8 color variants at xs font size.
- `white` variant (`color: white text, transparent bg, white border`) may be invisible on light backgrounds — document usage restriction.

---

# Badge

## 1. Overview
A compact, pill-shaped label used to communicate status, category, or metadata at a glance, typically appearing inline with content or in list rows.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Labeling the status of a record in a list or table (e.g., "Active", "Archived") | Interactive filtering or selection — use Chip instead |
| Indicating a category or tag on a card or list item | Communicating a count or quantity — use a numeric indicator |
| Surfacing metadata like environment, role, or version alongside a heading | Long text — badges truncate meaning when labels exceed 2–3 words |
| Drawing attention to a new item or a specific attribute of a record | Replacing visible text for critical information — badges are small and easily missed |

## 3. Anatomy
1. **Container** — `inline-flex` pill shape with background, border, and padding.
2. **Icon** (optional) — 10 px Lucide icon in the leading position; inherits the variant text color.
3. **Label** — xs-sized text; always present.

`[STORYBOOK BLOCK: Simple/ElegantBadge/Badge]`

## 4. Variants

**Neutral**
- Light gray background (`--color-badge-neutral-bg` = `#fafafa`), gray text (`#666666`), gray border (`#f5f5f5`).
- Default. Use for general-purpose labels with no semantic color meaning.

`[STORYBOOK BLOCK: Simple/ElegantBadge/Badge]`

**Red**
- Light red background (`--primitive-red-100`), dark red text (`--primitive-red-800`), matching border.
- Use for error states, destructive categories, or high-priority flags.

`[STORYBOOK BLOCK: Simple/ElegantBadge/Badge]`

**Green**
- Light green background (`--primitive-green-100`), dark green text (`--primitive-green-800`), matching border.
- Use for active, success, or healthy states.

`[STORYBOOK BLOCK: Simple/ElegantBadge/Badge]`

**Blue**
- Light blue background (`--primitive-blue-100`), dark blue text (`--primitive-blue-800`), matching border.
- Use for informational categories, "in progress" states, or link-adjacent labels.

`[STORYBOOK BLOCK: Simple/ElegantBadge/Badge]`

**Yellow**
- Light yellow background (`--primitive-yellow-100`), dark amber text (`--primitive-yellow-800`), matching border.
- Use for warning or caution states, or "pending" categories.

`[STORYBOOK BLOCK: Simple/ElegantBadge/Badge]`

**Purple**
- Light purple background (`--primitive-purple-100`), dark purple text (`--primitive-purple-800`), matching border.
- Use for premium tiers, special roles, or custom categories.

`[STORYBOOK BLOCK: Simple/ElegantBadge/Badge]`

**White**
- Transparent background, white text, white border.
- Use exclusively on dark or photographic backgrounds where the badge must appear in a light-on-dark style.
- Invisible on light backgrounds — use only in visually controlled contexts.

`[STORYBOOK BLOCK: Simple/ElegantBadge/Badge]`

**Black**
- Transparent background, black text (`#1e1e1e`), black border.
- Use on light backgrounds when a monochrome, high-contrast label is needed without the filled background.

`[STORYBOOK BLOCK: Simple/ElegantBadge/Badge]`

## 5. States
Badges are non-interactive static elements. There are no hover, focus, active, or disabled states. They have no internal state changes.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | **Yes** | Text content of the badge. |
| `icon` | `LucideIcon` | `undefined` | No | Optional Lucide icon component rendered at 10 px before the label. |
| `color` | `'neutral' \| 'red' \| 'green' \| 'blue' \| 'yellow' \| 'purple' \| 'white' \| 'black'` | `'neutral'` | No | Color scheme of the badge. |
| `ariaLabel` | `string` | — | No | Accessible label for icon-only badges (when `label` is omitted and `icon` is provided). Sets `aria-label` on the badge `<span>` so screen readers announce a meaningful name. Has no effect when `label` is present (the label text is the accessible name). |

## 7. Content guidelines
Badge labels should be 1–3 words maximum. Use sentence case. Prefer established vocabulary within your product (e.g., "Active", "Archived", "Beta", "Pro"). Avoid label text that requires context to understand — badges are read out of context in tables and lists. When `icon` is used with a `label`, the icon is decorative — always provide a `label` so the badge has an accessible text name. When using an icon-only badge (no `label`), provide `ariaLabel` so screen readers can announce the badge's meaning (e.g., `ariaLabel="New"` for a Sparkles icon badge).

## 8. Accessibility
- **Role:** No explicit ARIA role is applied. The badge renders as a `<span>`, which has no implicit ARIA semantics. In contexts where the badge communicates a dynamic status (e.g., "Active" toggled by a server update), consider adding `role="status"` and `aria-live="polite"` on a container.
- **Accessible name:** When both `label` and `icon` are present, the label text is the accessible name. When the badge is icon-only (no `label`), use the `ariaLabel` prop to provide an accessible name — without it the badge will be announced as an unlabelled image. When neither is provided, the badge is invisible to screen readers.
- **Keyboard navigation:** Badges are not interactive — they are not in the tab order.
- **Screen reader behavior:** The icon has `aria-hidden="true"` so it is not announced. When `label` is present, the label text is read. When icon-only, `aria-label` on the `<span>` provides the name.
- **Color and contrast:** All filled color variants use dark text on a light tinted background. Verify each combination passes WCAG AA at xs font size (0.75rem = 12px, requiring 4.5:1). The `white` variant on light backgrounds fails contrast — restrict usage accordingly.
- **Motion:** No animation — no `prefers-reduced-motion` handling required.
- **Touch/pointer:** Badges are non-interactive — no touch target requirements apply.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-badge-neutral-bg` | `var(--primitive-gray-50)` → `#fafafa` | Neutral background |
| `--color-badge-neutral-text` | `var(--primitive-gray-600)` → `#666666` | Neutral text and icon |
| `--color-badge-neutral-border` | `var(--primitive-gray-100)` → `#f5f5f5` | Neutral border |
| `--color-badge-red-bg` | `var(--primitive-red-100)` → `#fee2e2` | Red background |
| `--color-badge-red-text` | `var(--primitive-red-800)` → `#991b1b` | Red text and icon |
| `--color-badge-red-border` | `var(--primitive-red-100)` → `#fee2e2` | Red border |
| `--color-badge-green-bg` | `var(--primitive-green-100)` → `#dcfce7` | Green background |
| `--color-badge-green-text` | `var(--primitive-green-800)` → `#166534` | Green text and icon |
| `--color-badge-green-border` | `var(--primitive-green-100)` → `#dcfce7` | Green border |
| `--color-badge-blue-bg` | `var(--primitive-blue-100)` → `#dbeafe` | Blue background |
| `--color-badge-blue-text` | `var(--primitive-blue-800)` → `#1e40af` | Blue text and icon |
| `--color-badge-blue-border` | `var(--primitive-blue-100)` → `#dbeafe` | Blue border |
| `--color-badge-yellow-bg` | `var(--primitive-yellow-100)` → `#fef9c3` | Yellow background |
| `--color-badge-yellow-text` | `var(--primitive-yellow-800)` → `#854d0e` | Yellow text and icon |
| `--color-badge-yellow-border` | `var(--primitive-yellow-100)` → `#fef9c3` | Yellow border |
| `--color-badge-purple-bg` | `var(--primitive-purple-100)` → `#f3e8ff` | Purple background |
| `--color-badge-purple-text` | `var(--primitive-purple-800)` → `#6b21a8` | Purple text and icon |
| `--color-badge-purple-border` | `var(--primitive-purple-100)` → `#f3e8ff` | Purple border |
| `--color-badge-white-bg` | `transparent` | White background |
| `--color-badge-white-text` | `var(--primitive-white)` → `#ffffff` | White text and icon |
| `--color-badge-white-border` | `var(--primitive-white)` → `#ffffff` | White border |
| `--color-badge-black-bg` | `transparent` | Black background |
| `--color-badge-black-text` | `var(--primitive-black)` → `#1e1e1e` | Black text and icon |
| `--color-badge-black-border` | `var(--primitive-black)` → `#1e1e1e` | Black border |
| `--size-badge-radius` | `var(--primitive-radius-full)` → `999px` | Pill border radius |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Font family |
| `--primitive-font-size-xs` | `0.75rem` | Font size |
| `--primitive-font-weight-regular` | `400` | Font weight |
| `--primitive-scale-1` | `0.25rem` | Vertical padding; gap between icon and label |
| `--primitive-scale-2` | `0.5rem` | Horizontal padding |

## 10. Responsive behavior
Badges are `inline-flex` and adapt to their content width. They do not have a maximum width or truncation — keep labels short. In table cells or constrained containers, long labels will push content; cap at 3 words to prevent layout issues across breakpoints.

## 11. Composition and usage patterns

**Status badge in a table row**
Render a badge in a table cell to communicate record status without requiring an icon column.

```tsx
<td>
  <Badge label="Active" color="green" />
</td>
```

**Category badge on a card**
Place a badge beneath a card heading to surface the category or type.

```tsx
<Card>
  <Badge label="Beta" color="blue" icon={Sparkles} />
  <h3>New feature</h3>
</Card>
```

**Multiple badges**
Render a row of badges for multi-value attributes (e.g., tags). Use neutral color for non-semantic tags; use semantic colors only when color carries meaning.

```tsx
<div style={{ display: 'flex', gap: '0.25rem' }}>
  <Badge label="React" color="blue" />
  <Badge label="TypeScript" color="neutral" />
  <Badge label="Open source" color="green" />
</div>
```

`[STORYBOOK BLOCK: Simple/ElegantBadge/Badge]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [Chip](/design-system/docs/chip-zh) | When the label is dismissible or represents a user-applied filter |
| [Alert](/design-system/docs/alert-zh) | For larger, more prominent inline status messages with an action path |
| [Toast](/design-system/docs/toast-zh) | For transient, system-generated status notifications |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use semantic colors consistently across the product — green always means active/success, red always means error/destructive. | Use multiple different color variants for the same semantic meaning — this erodes the color system's signal value. |
| Keep badge labels to 1–3 words maximum. | Use sentence-length labels in a badge — use a description or tooltip instead. |
| Use the `white` variant only on dark or photographic backgrounds. | Use the `white` variant on light surfaces — the text and border will be invisible. |
| Use the `icon` prop to reinforce the label meaning with a recognizable visual symbol. | Use an icon without a label — the 10 px icon size is too small to be meaningful on its own. |
| Use `neutral` when a badge is for purely categorical labeling with no semantic color meaning. | Default to a colored variant unless the color consistently maps to a status across the product. |
| Confirm all color/background combinations pass WCAG AA contrast before shipping. | Add new color values outside the token system — extend `globals.css` if a new semantic color is needed. |

## 14. Changelog

### 2026-04-27
- **Accessibility:** Added `ariaLabel` prop for icon-only badges. When `label` is omitted and `icon` is provided, `aria-label={ariaLabel}` is set on the badge `<span>` and the icon receives `aria-hidden="true"`, ensuring screen readers can announce the badge's meaning.
