---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/data/ElegantKpiCard.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantKpiCard.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): No interactive states are implemented. KpiCard is presentational-only. If hover or click behavior is needed, wrap in a `<button>` or `<a>` at the parent level.
- Section 10 (Responsive behavior): Component sets `width: 100%` and the story caps it at `maxWidth: 280px`. True responsive grid behavior depends on parent layout, which is not defined in source.

**Recommended follow-ups:**
- Add hover/focus states if the card is intended to become interactive (e.g. clickable).
- Add a story variant without a delta to cover the minimal/no-delta case.
- Add a story with `deltaDirection: 'down'` to show a negative metric explicitly.
- Add a story with `deltaDirection: 'neutral'` to document the no-change state.
- Consider adding `aria-label` or a visually hidden `<h3>` for landmark-level accessibility in dashboard layouts.
- Document expected grid placement (e.g. "use in a 3- or 4-column grid").

---

# KPI Card

## 1. Overview
A compact metric display card that presents a single key performance indicator with its current value, an optional directional delta badge, and an optional supporting icon.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Surfacing a headline metric in a dashboard overview | Displaying tabular data with multiple related values — use DataTable instead |
| Showing period-over-period change (e.g. revenue vs last month) | Communicating progress toward a goal — use a progress bar component |
| Grouping 3–6 KPIs in a uniform row at the top of a report page | Displaying a trend over time — use BarChart or a line chart instead |
| Highlighting a single operational number (active users, error rate, uptime) | Rich descriptive content — use a Card or prose layout |

## 3. Anatomy
1. **Card container** — surface-colored panel with a subtle border and card-level padding and radius.
2. **Header row** — horizontal flex row containing the label (left) and optional icon (right).
3. **Label** — small, medium-weight muted text identifying the metric (e.g. "Monthly Revenue").
4. **Icon** — optional 16 px Lucide icon rendered in muted color; purely decorative (`aria-hidden`).
5. **Primary value** — large, bold title-colored text rendering the formatted metric (e.g. "$24,500").
6. **Delta pill** — optional badge combining a directional icon (10 px) and the change text; color-coded by direction. Carries `role="status"` with a descriptive `aria-label`.
7. **Period label** — optional muted xs-text appended beside the delta pill (e.g. "vs last month").

`[STORYBOOK BLOCK: Simple/Data/KpiCard]`

## 4. Variants

**KpiCard (default — positive delta)**
- Renders a green badge with a TrendingUp icon to signal an increase.
- Choose when the metric has improved relative to the comparison period.
- Requires `deltaDirection: 'up'` and a `delta` string.

**Negative delta**
- Renders a red badge with a TrendingDown icon to signal a decrease.
- Choose when the metric has declined; avoid using red for non-negative contexts.
- Requires `deltaDirection: 'down'` and a `delta` string. [NEEDS CONFIRMATION — no dedicated story; inferred from source `deltaStyles`]

**Neutral delta**
- Renders a neutral gray badge with a Minus icon to signal no meaningful change.
- Choose when the value is flat or the direction is ambiguous.
- Requires `deltaDirection: 'neutral'` (default) and a `delta` string. [NEEDS CONFIRMATION — no dedicated story]

**No delta**
- Omit the `delta` prop entirely; the delta row is not rendered.
- Choose for metrics where period comparison is not meaningful or not yet available. [NEEDS CONFIRMATION — no dedicated story]

## 5. States

**Default (presentational)**
- The card is a static display element with no interactive states defined in the current implementation.
- No hover, focus, active, or disabled states are applied.
- [NEEDS CONFIRMATION: if the card is intended to become clickable (e.g. drill-down), interactive states should be designed and implemented.]

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | Yes | Primary metric label rendered in the header row |
| `value` | `string` | — | Yes | Formatted metric value (e.g. `"$24,500"` or `"98.2%"`) |
| `delta` | `string` | `undefined` | No | Formatted change amount (e.g. `"+12.3%"`); omit to hide the delta row |
| `deltaDirection` | `'up' \| 'down' \| 'neutral'` | `'neutral'` | No | Controls the badge color scheme and directional icon |
| `period` | `string` | `undefined` | No | Comparison context shown beside the delta pill (e.g. `"vs last month"`) |
| `icon` | `LucideIcon` | `undefined` | No | Any Lucide icon component; rendered at 16 px in the header row |

## 7. Content guidelines
- **Label:** Keep labels short (2–4 words). Use sentence case. Avoid abbreviations that are not universally understood (e.g. prefer "Monthly revenue" over "MoM Rev.").
- **Value:** Pre-format the value before passing it in (e.g. `"$24,500"`, `"98.2%"`, `"1.2M"`). The component renders the string verbatim.
- **Delta:** Include a sign prefix to make direction explicit (e.g. `"+12.3%"` or `"−$400"`). The badge icon already communicates direction, but the text should reinforce it.
- **Period:** Use a concise relative reference (e.g. `"vs last month"`, `"vs Q3"`). Avoid absolute date ranges here; those belong in a chart or table.
- **Icon:** Use a thematically related icon (e.g. `BarChart2` for revenue, `Users` for headcount). Do not use icons as the sole indicator of metric meaning.

## 8. Accessibility
- **Keyboard navigation:** No keyboard interaction; card is presentational.
- **Screen reader behavior:** The delta pill carries `role="status"` and an `aria-label` that concatenates the delta value and period (e.g. `"Change: +12.3%, vs last month"`). The directional icon inside the badge is `aria-hidden`. The header icon is `aria-hidden`.
- **Color and contrast:** Delta badge colors (`--color-badge-green-text` = `#166534` on `#dcfce7`; `--color-badge-red-text` = `#991b1b` on `#fee2e2`) should meet WCAG AA at normal text sizes — [NEEDS CONFIRMATION with contrast audit tool].
- **Motion:** No animation; no `prefers-reduced-motion` concern.
- **Touch/pointer:** No tap targets; the card is not interactive.
- **Known gaps:** No landmark role or heading hierarchy is established on the card itself. In a dashboard with multiple KPI cards, consider wrapping the set in a `<section>` with an accessible label.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-bg-surface` | `#fafafa` (gray-50) | Card background |
| `--color-border-subtle` | `#f5f5f5` (gray-100) | Card border; table/row dividers |
| `--size-card-radius` | `4px` (radius-md) | Card corner radius |
| `--size-card-padding` | `1.5rem` (scale-6) | Card inner padding |
| `--color-text-muted` | `#666666` (gray-600) | Label text; icon color; period text |
| `--color-text-title` | `#1e1e1e` (black) | Primary value text |
| `--primitive-font-sans` | `DM Sans, sans-serif` | All text |
| `--primitive-font-size-sm` | `0.875rem` | Label font size |
| `--primitive-font-size-3xl` | `1.875rem` | Primary value font size |
| `--primitive-font-size-xs` | `0.75rem` | Delta and period font size |
| `--primitive-font-weight-medium` | `500` | Label and delta text weight |
| `--primitive-font-weight-bold` | `700` | Primary value weight |
| `--primitive-scale-4` | `1rem` | Gap between header row and value |
| `--primitive-scale-2` | `0.5rem` | Gap inside header row and delta row |
| `--primitive-scale-1` | `0.25rem` | Gap inside delta pill |
| `--size-badge-radius` | `999px` (radius-full) | Delta pill corner radius |
| `--color-badge-green-bg` | `#dcfce7` (green-100) | Delta pill background — up |
| `--color-badge-green-text` | `#166534` (green-800) | Delta pill text — up |
| `--color-badge-green-border` | `#dcfce7` (green-100) | Delta pill border — up |
| `--color-badge-red-bg` | `#fee2e2` (red-100) | Delta pill background — down |
| `--color-badge-red-text` | `#991b1b` (red-800) | Delta pill text — down |
| `--color-badge-red-border` | `#fee2e2` (red-100) | Delta pill border — down |
| `--color-badge-neutral-bg` | `#fafafa` (gray-50) | Delta pill background — neutral |
| `--color-badge-neutral-text` | `#666666` (gray-600) | Delta pill text — neutral |
| `--color-badge-neutral-border` | `#f5f5f5` (gray-100) | Delta pill border — neutral |

## 10. Responsive behavior
The component sets `width: 100%` and defers sizing to its parent container. The Storybook story caps the demo at `maxWidth: 280px`. In production, place the card inside a responsive grid (e.g. 1 column on mobile, 2–3 on tablet, 3–4 on desktop). The card has no internal breakpoints and reflows naturally as a flex-column.

## 11. Composition and usage patterns

**KPI row (dashboard header)**
Three to four KPI Cards placed in a uniform grid row at the top of a dashboard provide an at-a-glance summary before the user reaches detailed charts or tables below.

Gotcha: ensure all cards in a row have consistent prop presence (all with deltas, or none) to avoid visual rhythm breaks.

`[STORYBOOK BLOCK: Simple/Data/KpiCard]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [DataTable](/design-system/docs/data-table-zh) | When presenting multiple metrics with rows, columns, sorting, or filtering |
| [BarChart](/design-system/docs/bar-chart-zh) | When showing a metric trend across time periods rather than a single current value |
| [HeatmapGrid](/design-system/docs/heatmap-grid-zh) | When the metric varies across a two-dimensional matrix (e.g. activity by day and month) |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Pre-format the `value` string (include currency symbols, percent signs, and thousands separators) before passing it in. | Pass a raw number like `24500`; the component renders it verbatim with no formatting logic. |
| Use `deltaDirection: 'up'` only for genuinely positive changes in context (a lower error rate improving means `deltaDirection: 'up'` with a negative `delta` string is ambiguous — reconsider wording). | Rely on color alone to communicate delta direction — the icon and text reinforce it, but ensure the `aria-label` on the badge is accurate. |
| Keep the `label` concise enough to read in a single line at small sizes. | Use the `label` for multi-line descriptions; use a tooltip or separate annotation instead. |
| Pass a thematically relevant Lucide icon to reinforce the metric category visually. | Use the icon as the primary identifier of the metric — the `label` text is authoritative. |
| Pair the `delta` with a `period` to give the change number context. | Show a delta string without a period if the comparison window is ambiguous to the reader. |
| Group KPI Cards in a consistent grid with uniform gap tokens (`--size-card-gap`). | Mix cards with and without deltas in the same row — the uneven footer heights break visual alignment. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
