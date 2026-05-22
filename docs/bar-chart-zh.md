---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/data/ElegantBarChart.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantBarChart.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): No interactive hover or tooltip states are implemented; the chart is presentational.
- Section 8 (Accessibility): Bars are plain `<div>` elements with no ARIA roles or accessible data values.
- Section 10 (Responsive behavior): The component is `display: inline-flex` and does not adapt to viewport width; behavior on small screens is unconfirmed.

**Recommended follow-ups:**
- Add hover tooltip showing bar value and label.
- Add accessible text alternative (e.g. `<table>` fallback or `aria-label` per bar).
- Add dedicated stories for: `color: 'primary'`, `color: 'muted'`, `size: 'sm'`, `size: 'lg'`, `showValues: false`, `showAxis: false`, no title/description.
- Consider adding a horizontal bar variant for long labels.
- Consider adding a `maxValue` prop to pin the Y-axis across multiple chart instances for comparison.

---

# Bar Chart

## 1. Overview
A vertical bar chart component that renders a series of labeled bars with relative heights proportional to their values, with optional value labels, an axis line, and a title/description header.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Comparing relative magnitudes across a small set of categories (e.g. monthly revenue) | Showing change over time with trend continuity — consider a line chart |
| Displaying discrete categorical data where each bar stands alone | Displaying two-dimensional data — use HeatmapGrid instead |
| Providing a visual summary alongside a DataTable or KPI Card | Presenting a single metric — use a KPI Card instead |
| Embedding a compact chart in a portfolio case study or dashboard section | Datasets with many categories (10+) where bar width would become too narrow to read |

## 3. Anatomy
1. **Outer container** — inline-flex column with a 6 px gap between header, plot area, and label row.
2. **Header block** — optional; contains the title and/or description, separated by `--size-heading-to-body` from the plot area.
3. **Title** — medium-weight sans-serif text at base font size in title color.
4. **Description** — regular-weight xs-text in muted color, below the title.
5. **Plot area** — horizontal flex row of bar columns, sized by the `size` prop. `paddingTop` reserves space for value labels when `showValues` is enabled. A `borderBottom` axis line is drawn when `showAxis` is enabled.
6. **Bar column** — flex column that centers the bar and value label within a fixed-width slot.
7. **Value label** — monospace number above each bar; shown when `showValues` is enabled.
8. **Bar** — a `<div>` with height proportional to `value / max`; top corners are rounded; color is controlled by `color` prop.
9. **X-axis label row** — monospace category labels below the plot area, one per bar, truncated at 12 characters.

`[STORYBOOK BLOCK: Simple/Data/ElegantBarChart/Default]`

## 4. Variants

**Default (accent color)**
- Bars are filled with `--color-text-accent` (green-500).
- Use when the chart should align with the site's primary accent.
- Set `color: 'accent'` (the default).

`[STORYBOOK BLOCK: Simple/Data/ElegantBarChart/Default]`

**Primary color**
- Bars are filled with `--color-interactive-primary-bg` (black, `#1e1e1e`).
- Use when the chart should read as a strong primary data element, consistent with primary buttons.
- Set `color: 'primary'`. [NEEDS CONFIRMATION — no dedicated story]

**Muted color**
- Bars are filled with `--color-text-muted` (gray-600, `#666666`).
- Use for secondary or supporting charts where the data is supplementary rather than primary.
- Set `color: 'muted'`. [NEEDS CONFIRMATION — no dedicated story]

**FromFile**
- A Storybook-only wrapper (`BarChartFileLoader`) that accepts an uploaded `.csv` or `.json` file and parses it into the component's `data` prop.
- Not a component-level prop variant; it is a story-level composition for interactive demos.

`[STORYBOOK BLOCK: Simple/Data/ElegantBarChart/FromFile]`

## 5. States

**Default (populated)**
- Bars render with heights proportional to their values relative to the dataset maximum.
- The tallest bar always fills 100% of the plot area height.

**All-zero data**
- If all values are 0 (or all values are clamped to 0), `max` is set to 1 to prevent division by zero. All bars render at 0% height — the plot area appears empty except for the axis line and value labels (all showing `0`).

**Negative values**
- Negative values are clamped to `0` via `Math.max(0, value)`. The chart does not render bars below the axis.

**No title / no description**
- When `title` is undefined or `showTitle` is false, and `description` is undefined or `showDescription` is false, the header block is not rendered at all.

**FromFile — error**
- If the file cannot be fetched or parsed, an error message renders in monospace red text instead of the chart.

**FromFile — no file selected**
- The component renders with the built-in demo data (7 months) while `fileData` is empty.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `data` | `BarChartDatum[]` | Demo data (7 months) | No | Array of `{ label: string; value: number }` pairs; negative values clamped to 0 |
| `color` | `'accent' \| 'primary' \| 'muted'` | `'accent'` | No | Bar fill color |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Controls bar width, gap, and plot area height |
| `showValues` | `boolean` | `true` | No | Shows a numeric value label above each bar |
| `showAxis` | `boolean` | `true` | No | Draws a 1 px horizontal baseline beneath the bars |
| `title` | `string` | `undefined` | No | Chart title rendered above the plot area |
| `showTitle` | `boolean` | `true` | No | Controls visibility of the title; has no effect if `title` is undefined |
| `description` | `string` | `undefined` | No | Supporting description rendered below the title |
| `showDescription` | `boolean` | `true` | No | Controls visibility of the description; has no effect if `description` is undefined |

**BarChartDatum type:**
| Field | Type | Description |
|---|---|---|
| `label` | `string` | Category label; truncated to 12 characters |
| `value` | `number` | Numeric value; negative values clamped to 0 |

## 7. Content guidelines
- **Title:** Use sentence case. Keep to one short phrase (e.g. "Monthly revenue"). The title is rendered at `--primitive-font-size-base` (1 rem); longer titles will wrap.
- **Description:** Use for unit clarification or data source context (e.g. "Bookings per month, in thousands."). Keep to one sentence. Rendered at `--primitive-font-size-xs` (0.75 rem).
- **Labels:** Each bar label is truncated at 12 characters. Use short, unambiguous category names (month abbreviations, short product names, etc.).
- **Values:** Integer values are shown as-is; non-integer values are formatted to one decimal place (`toFixed(1)`). The component does not add currency symbols or percent signs — pre-format values before passing them in. Suffix formatting is not supported at the component level; format the `value` prop itself (e.g. `"$42k"`) if a label is needed.

## 8. Accessibility
- **Keyboard navigation:** No keyboard interaction; the chart is purely presentational.
- **Screen reader behavior:** Bars are plain `<div>` elements with no `role`, `aria-label`, or accessible data. The numeric value labels above bars are visible text, but they are not associated with the category labels below. A screen reader user cannot meaningfully interpret the chart. [NEEDS CONFIRMATION — recommend providing an accessible `<table>` as a hidden alternative, or `aria-label` on each bar.]
- **Color and contrast:** The `accent` color (#2e6f40 green-500) against the white background (`#ffffff`) should meet WCAG AA for non-text elements. The `muted` color (#666666) against white meets AA for large text. [NEEDS CONFIRMATION with a contrast audit tool.]
- **Motion:** No animation. No `prefers-reduced-motion` concern.
- **Touch/pointer:** Bars and labels are not interactive; touch targets are not applicable.
- **Known gaps:** No accessible data representation; no tooltip; no ARIA roles on bars.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-text-accent` | `#2e6f40` (green-500) | Bar fill — accent variant |
| `--color-interactive-primary-bg` | `#1e1e1e` (black) | Bar fill — primary variant |
| `--color-text-muted` | `#666666` (gray-600) | Bar fill — muted variant; x-axis labels; value labels |
| `--color-text-title` | `#1e1e1e` | Title text color |
| `--color-border-subtle` | `#f5f5f5` (gray-100) | Axis line color |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Title and description text |
| `--primitive-font-mono` | `DM Mono, monospace` | Value labels and x-axis category labels |
| `--primitive-font-size-base` | `1rem` | Title font size |
| `--primitive-font-size-xs` | `0.75rem` | Description font size |
| `--primitive-font-weight-medium` | `500` | Title font weight |
| `--primitive-font-weight-regular` | `400` | Description font weight |
| `--primitive-radius-sm` | `2px` | Top corners of each bar |
| `--size-heading-to-body` | `1rem` (scale-4) | Gap between header block and plot area |
| `--size-label-to-description` | `0.25rem` (scale-1) | Gap between title and description |
| `--color-text-body` | `#171717` (gray-900) | Value label color (when `showValues` is true) |
| `--color-error-text` | `#dc2626` (red-500) | FromFile error message color |

**Size configuration (inline values — not CSS variables):**

| Size | Bar width | Gap | Plot height | Font size |
|---|---|---|---|---|
| `sm` | 16 px | 6 px | 120 px | 10 px |
| `md` | 24 px | 8 px | 160 px | 11 px |
| `lg` | 32 px | 12 px | 220 px | 12 px |

## 10. Responsive behavior
- The component renders as `display: inline-flex` and does not stretch to fill its container. It is as wide as its bars require.
- No internal breakpoints are defined. The chart width grows linearly with the number of bars × (bar width + gap).
- For dense datasets on narrow viewports, the chart may overflow its container. Wrap in a horizontally scrollable container if needed.
- Use `size: 'sm'` for compact layouts and `size: 'lg'` for feature sections with more visual space.

## 11. Composition and usage patterns

**Dashboard chart with title and description**
Pair the chart with `title` and `description` to give it editorial context. Use `showValues: true` so the numeric values are readable without a hover tooltip.

`[STORYBOOK BLOCK: Simple/Data/ElegantBarChart/Default]`

**File-driven demo chart**
In Storybook or interactive portfolio pages, use the `FromFile` story to let viewers upload their own data. The file loader accepts CSV (two-column, optional header) or JSON (`[{label, value}]` or `{labels, values}`).

Gotcha: the `FromFile` wrapper uses `fetch()` on a blob URL. In production contexts (outside Storybook), you would need to replicate the file-parsing logic or integrate it into a custom upload handler.

`[STORYBOOK BLOCK: Simple/Data/ElegantBarChart/FromFile]`

**Minimal chart (no header, no axis)**
Set `showTitle: false`, `showDescription: false`, and `showAxis: false` for a stripped-down visual embedded inline within prose or a card body.

Gotcha: with no axis line and no title, the chart loses all textual context. Ensure the surrounding content provides sufficient labeling.

## 12. Related components
| Component | When to use it instead |
|---|---|
| KPI Card | When you need to highlight a single scalar metric with a delta indicator |
| [HeatmapGrid](/design-system/docs/heatmap-grid-zh) | When your data has a natural row × column structure and you want to show density across two dimensions |
| [DataTable](/design-system/docs/data-table-zh) | When users need to read or compare the exact values rather than relative proportions |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Pre-format the `label` strings to fit within 12 characters; the component truncates without showing an ellipsis. | Pass long category names (e.g. full month names like "September") — they are silently cut to "September " (10 chars before space, then cut at 12). |
| Use `showValues: true` (the default) when exact values matter to the reader, or when a tooltip is not available. | Rely on bar height alone to communicate precise values — relative visual comparison is the bar chart's strength, not exact readout. |
| Use `color: 'accent'` for primary data visualisation and `color: 'muted'` for supplementary or secondary charts. | Mix multiple `color` values across bar chart instances that are meant to represent the same data series — use consistent color encoding. |
| Provide a `title` and `description` when the chart stands alone or appears above the fold. | Use the `description` field for chart legends or footnotes with complex formatting; it renders as plain text. |
| Choose `size` based on available layout space — `sm` for sidebar or card contexts, `lg` for full-section feature charts. | Use `size: 'lg'` in compact card layouts where it will overflow. |
| Pass `showAxis: true` (the default) to ground the bars visually along a common baseline. | Turn off the axis line unless you have an explicit design rationale; it is important for perceptual accuracy. |
| Clamp or validate input values before passing them — the component silently clamps negatives to 0 with no user feedback. | Assume the chart will handle mixed positive/negative datasets gracefully; it does not render below-axis bars. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
