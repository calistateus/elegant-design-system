---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantChip.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantChip.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): dismiss button uses `opacity` (0.5 → 1) via `onMouseEnter`/`onMouseLeave` — documented as observed.
- Section 8 (Accessibility): `aria-label` on the dismiss button includes the full `label` prop (not `displayLabel`), so the screen reader reads the untruncated value — this is correct behavior and documented accordingly.
- Chip color tokens (`--color-chip-*`) alias the badge token layer exactly — documented with resolved values.

**Recommended follow-ups:**
- Add a story demonstrating truncation behavior (label > 40 chars or custom `maxChars`).
- Add a story for non-dismissible chips (no `onDismiss`).
- Confirm whether chips should ever be interactive beyond dismiss (e.g., clickable to open a filter panel) — no click handler on the chip container exists currently.
- `white` chip variant on light backgrounds has the same visibility issue as the Badge `white` variant — recommend flagging in usage guidelines.
- Consider a selected/active state if chips are used as toggleable filters.

---

# Chip

## 1. Overview
A compact, dismissible tag that represents a user-applied value — such as an active filter, a selected tag, or an entered keyword — and can be removed by the user via an inline dismiss button.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Displaying user-applied filters that can be individually removed | Non-interactive status labels — use Badge instead |
| Representing selected values from a multi-select input (e.g., a tag input field) | System-generated metadata the user cannot remove — use Badge |
| Surfacing active search parameters or active query filters inline | Long text labels — chips enforce a 40-character hard cap |
| Labeling items in a compact filterable list | Single-value selections where a dropdown or radio would be clearer |

## 3. Anatomy
1. **Container** — `inline-flex` pill shape with background, border, and padding; `maxWidth: 100%`.
2. **Label text** — xs-sized text with overflow ellipsis and `whiteSpace: nowrap`; truncated at `maxChars` (hard max 40).
3. **Dismiss button** (optional) — 10 px X icon button; rendered when `onDismiss` is provided; inherits text color at 50% opacity, full opacity on hover.

`[STORYBOOK BLOCK: Simple/ElegantChip/Neutral]`

## 4. Variants

**Neutral**
- Light gray background, gray text (`#666666`), gray border (`#f5f5f5`).
- Default. Use for general-purpose filter chips on light surfaces.

`[STORYBOOK BLOCK: Simple/ElegantChip/Neutral]`

**Black**
- Transparent background, near-black text (`#1e1e1e`), near-black border.
- Use on light surfaces when a monochrome, minimal aesthetic is preferred.

`[STORYBOOK BLOCK: Simple/ElegantChip/Black]`

**White**
- Transparent background, white text, white border.
- Use exclusively on dark or photographic backgrounds. Invisible on light surfaces.

`[STORYBOOK BLOCK: Simple/ElegantChip/White]`

## 5. States

**Default (with dismiss)**
- Label is visible; dismiss button is at 50% opacity.

**Dismiss button hover**
- Triggered by `onMouseEnter` on the dismiss button.
- Dismiss button opacity transitions from 0.5 to 1 over `--primitive-duration-fast` (150 ms).
- No change to the chip container.

**Dismiss button idle (after hover)**
- `onMouseLeave` returns opacity to 0.5 over 150 ms.

**Dismissed**
- Clicking the dismiss button calls `onDismiss`. The chip has no internal visibility state — the parent is responsible for removing it from the list.

**Non-dismissible**
- `onDismiss` is not provided — the dismiss button is not rendered. The chip is purely a static label.

**Truncated**
- When `label.length > effectiveMax` (defaults to 40 characters), the label is sliced at the effective max, trailing whitespace is trimmed, and a unicode ellipsis (`…`) is appended.
- The `aria-label` on the dismiss button always references the full untruncated `label`, not `displayLabel`.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | **Yes** | Display text. Truncated at `maxChars` (hard cap 40) with ellipsis. |
| `color` | `'neutral' \| 'black' \| 'white'` | `'neutral'` | No | Color scheme of the chip. |
| `maxChars` | `number` | `40` | No | Soft character limit for the label. Capped at the hard max of 40. |
| `onDismiss` | `() => void` | `undefined` | No | If provided, renders a dismiss button. Called when clicked. |

## 7. Content guidelines
- **Label:** Use short noun phrases or single keywords (e.g., "design-system", "React", "Last 30 days"). Write in lowercase for tags and filters; sentence case for named values.
- **Truncation:** Labels longer than `maxChars` (default 40, max 40) are cut with an ellipsis. Keep labels short enough to be meaningful without truncation — 20 characters or fewer is ideal in compact layouts.
- **Dismiss label:** The dismiss button always reads `"Remove {label}"` to screen readers via `aria-label`, using the full untruncated label value.

## 8. Accessibility
- **Role:** The chip container is a `<span>` with no ARIA role. It is a static element unless `onDismiss` is provided.
- **Dismiss button:** The dismiss button is a native `<button type="button">` with `aria-label="Remove {label}"` (full untruncated label). This provides full context for screen reader users.
- **Keyboard navigation:** When `onDismiss` is provided, the dismiss button is in the natural tab order. Pressing Enter or Space activates it.
- **Screen reader behavior:** The label text is read as inline content. The dismiss button is announced as "Remove [label]". Truncated display text does not affect the dismiss button's accessible name.
- **Color and contrast:** Neutral variant uses `#666666` text on `#fafafa` — verify WCAG AA at xs (12px) font size. `white` variant is not legible on light backgrounds — restrict usage. `black` variant uses `#1e1e1e` on transparent — verify against the surface it appears on.
- **Motion:** Dismiss button opacity transition is 150 ms. No `prefers-reduced-motion` override is implemented.
- **Touch/pointer:** Dismiss button renders at 10 px icon size with `padding: 0` — the tap target is smaller than the 44×44px minimum. This is a known gap on touch devices.
- **Known gaps:** No focus-visible ring on the chip container; dismiss button touch target is insufficient; no `prefers-reduced-motion` handling.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-chip-neutral-bg` | `var(--color-badge-neutral-bg)` → `#fafafa` | Neutral background |
| `--color-chip-neutral-text` | `var(--color-badge-neutral-text)` → `#666666` | Neutral text and dismiss icon |
| `--color-chip-neutral-border` | `var(--color-badge-neutral-border)` → `#f5f5f5` | Neutral border |
| `--color-chip-black-bg` | `var(--color-badge-black-bg)` → `transparent` | Black background |
| `--color-chip-black-text` | `var(--color-badge-black-text)` → `#1e1e1e` | Black text and dismiss icon |
| `--color-chip-black-border` | `var(--color-badge-black-border)` → `#1e1e1e` | Black border |
| `--color-chip-white-bg` | `var(--color-badge-white-bg)` → `transparent` | White background |
| `--color-chip-white-text` | `var(--color-badge-white-text)` → `#ffffff` | White text and dismiss icon |
| `--color-chip-white-border` | `var(--color-badge-white-border)` → `#ffffff` | White border |
| `--size-chip-radius` | `var(--primitive-radius-full)` → `999px` | Pill border radius |
| `--size-chip-px` | `var(--primitive-scale-2)` → `0.5rem` | Horizontal padding |
| `--size-chip-py` | `var(--primitive-scale-1)` → `0.25rem` | Vertical padding |
| `--size-chip-gap` | `var(--primitive-scale-1)` → `0.25rem` | Gap between label and dismiss button |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Font family |
| `--primitive-font-size-xs` | `0.75rem` | Font size |
| `--primitive-font-weight-regular` | `400` | Font weight |
| `--primitive-duration-fast` | `150ms` | Dismiss button opacity transition duration |
| `--primitive-easing-default` | `ease` | Dismiss button opacity transition easing |

## 10. Responsive behavior
Chips are `inline-flex` with `maxWidth: 100%`. In narrow containers, the label span applies `overflow: hidden` and `text-overflow: ellipsis` — however, truncation is driven by the `maxChars` prop (JS-side slice), not CSS overflow, so the chip may still be wider than its container if `maxChars` is large. Wrap chips in a flex row with `flex-wrap: wrap` and a gap for multi-chip layouts across breakpoints.

## 11. Composition and usage patterns

**Active filter row**
Render a set of chips for each active filter; remove from state when dismissed.

```tsx
const [filters, setFilters] = useState(['React', 'TypeScript', 'Open source']);

<div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
  {filters.map((f) => (
    <Chip
      key={f}
      label={f}
      color="neutral"
      onDismiss={() => setFilters((prev) => prev.filter((v) => v !== f))}
    />
  ))}
</div>
```

**Tag input result**
Render chips below a text input to represent entered tags.

```tsx
<Chip label="design-system" color="neutral" onDismiss={() => removeTag('design-system')} />
```

**Static chip (no dismiss)**
Use without `onDismiss` when a chip represents a fixed, non-removable attribute.

```tsx
<Chip label="Required" color="black" />
```

`[STORYBOOK BLOCK: Simple/ElegantChip/Neutral]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| Badge | For non-interactive, system-generated status or category labels |
| Alert | For inline persistent status messages with supporting text |
| Toast | For transient, auto-dismissing system notifications |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use chips for values the user has explicitly applied (filters, tags, selections). | Use chips for system-generated, non-removable metadata — use Badge instead. |
| Keep labels short — 20 characters or fewer is ideal; the 40-character hard cap is a safety net, not a target. | Rely on the hard cap as your label length budget — truncated text loses meaning. |
| Wrap chips in a flex row with `flex-wrap: wrap` for multi-chip layouts. | Place chips in a fixed-width container without wrapping — they will overflow. |
| Use `color="white"` only on dark or photographic surfaces. | Use `color="white"` on light surfaces — it is invisible. |
| Provide `onDismiss` whenever the user is expected to remove the chip. | Provide `onDismiss` for read-only chip displays — remove the dismiss affordance to reduce confusion. |
| Use the `aria-label="Remove {label}"` pattern that is built into the dismiss button — do not override it. | Remove the `onDismiss` callback if the dismiss button is visually present — this would create an inaccessible interactive element. |

## 14. Changelog

**2026-04-27** — Increase dismiss button padding from 0 to 4px to improve touch target size toward WCAG 2.5.5
