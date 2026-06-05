---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/data/ElegantHeatmapGrid.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantHeatmapGrid.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): No interactive states (hover, click, tooltip) exist; the grid is fully presentational.
- Section 8 (Accessibility): Cells are plain `<div>` elements with no ARIA roles, labels, or data values exposed to assistive technology. This is a known gap requiring confirmation of intent.
- Section 10 (Responsive behavior): `overflowX: auto` is present but no breakpoint-specific behavior is defined.

**Recommended follow-ups:**
- Add individual cell tooltip on hover showing the raw or normalised value.
- Add `aria-label` to each cell (e.g. "Mon Jan: high") or render an accessible data table alternative.
- Add a story demonstrating the `accent` color scale.
- Add a story demonstrating the `redgreen` color scale.
- Add a story demonstrating the `sm` and `lg` size variants.
- Add a story demonstrating custom `rowLabels` and `columnLabels`.
- Consider adding a `title` prop for the `<figure>`/`<figcaption>` pattern.

---

# Heatmap Grid

## 1. Overview
A two-dimensional grid of color-coded cells that visualises the relative intensity of numeric values across rows and columns, with optional axis labels, a color-scale legend, and three size variants.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Showing activity frequency across two categorical dimensions (e.g. day of week × month) | Showing precise values — use a DataTable or BarChart instead |
| Visualising contribution or engagement patterns over time (GitHub-style activity map) | Comparing absolute magnitudes between a small number of categories — use BarChart instead |
| Highlighting which cells in a matrix have high or low relative values | Showing a single metric summary — use a KPI Card instead |
| Providing a dense overview of a large dataset at a glance | Datasets where the exact numeric value is critical to the user's task |

## 3. Anatomy
1. **Outer container** — inline-flex column; wraps the scrollable grid and optional legend.
2. **Scrollable grid wrapper** — horizontally and vertically scrollable to accommodate large matrices.
3. **Column label row** — rotated labels rendered above the cell grid using `writing-mode: vertical-rl`; auto-applied for 7-row × 12-col datasets (Jan–Dec).
4. **Row label column** — right-aligned monospace labels to the left of each row; auto-applied for 7-row × 12-col datasets (Sun–Sat).
5. **Cell** — a square `<div>` with background color mapped to intensity level 0–4; size controlled by `--size-heatmap-cell` CSS variable.
6. **Legend** — a horizontal row of 5 cells (levels 0–4) flanked by "Less" and "More" labels; optional via `showLegend`.

`[STORYBOOK BLOCK: Simple/Data/ElegantHeatmapGrid/Default]`

## 4. Variants

**Default (green scale)**
- Five-step green gradient from empty (gray-200) through green-100 → green-300 → green-500 → green-800.
- Use for activity, contribution, or engagement maps where green signals positive activity.
- The demo data (7 × 12) auto-applies weekday and month labels.

**Accent scale**
- Five-step gradient mixing the system accent color (`--color-text-accent`, green-500) at 20 / 40 / 70 / 100% opacity against the main background.
- Use when the heatmap must align with the page's primary accent color rather than a semantic green.
- Set `colorScale: 'accent'`. [NEEDS CONFIRMATION — no dedicated story]

**Redgreen scale**
- Four non-zero levels: green-300 → amber-500 → red-500 → red-800 (zero remains gray-200).
- Use for divergent data where low values are good (green) and high values indicate problems (red), such as error rates or latency.
- Set `colorScale: 'redgreen'`. [NEEDS CONFIRMATION — no dedicated story]

**FromFile**
- A Storybook-only wrapper (`HeatmapFileLoader`) that accepts an uploaded `.csv` or `.json` file and parses it into the component's `data` prop.
- Not a prop variant of the component itself; it is a story-level composition for interactive demos.

## 5. States

**Default (populated)**
- Cells render with background colors mapped to normalised intensity levels 0–4.
- All zero values display as `--color-heatmap-empty` (gray-200).

**Auto-label (7 × 12 preset)**
- When the data matrix is exactly 7 rows × 12 or more columns and no custom labels are provided, weekday labels (Sun–Sat) and month labels (Jan–Dec) are applied automatically.
- This is a convenience heuristic; override with explicit `rowLabels` and `columnLabels` if needed.

**No data / all zeros**
- If all values are ≤ 0, the normalisation function returns intensity 0 for every cell — the entire grid renders in `--color-heatmap-empty` gray.

**FromFile — error**
- If the file cannot be fetched or parsed, an error message is shown in monospace red text instead of the grid.
- Shown for: network failure, invalid JSON, or unrecognised format.

**FromFile — no file selected**
- The component renders with the default demo data (`DEMO_DATA`) while `fileData` is empty.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `data` | `number[][]` | Demo data (7×12) | No | 2D matrix of raw numeric values; auto-normalised to intensity levels 0–4 |
| `columnLabels` | `string[]` | Auto (Jan–Dec if 7×12) | No | Column header strings; truncated to 10 chars each |
| `rowLabels` | `string[]` | Auto (Sun–Sat if 7×12) | No | Row header strings; truncated to 10 chars each |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Controls cell size, gap, and label font size |
| `colorScale` | `'green' \| 'accent' \| 'redgreen'` | `'green'` | No | Selects the five-step color ramp applied to intensity levels |
| `showLegend` | `boolean` | `true` | No | Shows or hides the "Less → More" legend row below the grid |

## 7. Content guidelines
No human-authored copy is required. The component renders axis labels and the legend automatically. The following rules apply to labels passed in:

- **rowLabels / columnLabels:** Each label is truncated to 10 characters. Keep labels short and unambiguous. Abbreviations are appropriate (e.g. "Mon", "Jan").
- **Legend labels:** "Less" and "More" are hard-coded in the component. They are not props.
- **Auto-labels:** The 7 × 12 weekday/month heuristic only fires when both `rowLabels` and `columnLabels` are absent and the data dimensions match. Provide explicit labels for any other shape.

## 8. Accessibility
- **Keyboard navigation:** No keyboard interaction; the grid is purely presentational.
- **Screen reader behavior:** Each cell is a plain `<div>` with no `role`, `aria-label`, or data value exposed. The grid is invisible to screen readers beyond its container element. [NEEDS CONFIRMATION — this is a known gap. A full accessible alternative would use a `<table>` with data values as text content or `aria-label` attributes.]
- **Color and contrast:** Color is the sole differentiator of intensity levels. The grid does not provide a text or pattern alternative for color-blind users. The `redgreen` scale in particular may be inaccessible to users with red-green color blindness. [NEEDS CONFIRMATION — recommend adding a pattern or label option.]
- **Motion:** No animation. No `prefers-reduced-motion` concern.
- **Touch/pointer:** Cells are not interactive; touch targets are not applicable.
- **Known gaps:** No accessible data representation; color as the only encoding; no tooltip on hover.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--size-heatmap-cell` | `10px` (default; overridden inline by `SIZE_CFG`) | Cell width and height |
| `--size-heatmap-gap` | `3px` (default; overridden inline by `SIZE_CFG`) | Gap between cells |
| `--size-heatmap-cell-radius` | `2px` (radius-sm) | Cell corner radius |
| `--color-heatmap-empty` | `#e5e5e5` (gray-200) | Intensity 0 (zero / no activity) |
| `--color-heatmap-low` | `#dcfce7` (green-100) | Intensity 1 — green scale |
| `--color-heatmap-medium` | `#6dbd84` (green-300) | Intensity 2 — green scale |
| `--color-heatmap-high` | `#2e6f40` (green-500) | Intensity 3 — green scale |
| `--color-heatmap-max` | `#166534` (green-800) | Intensity 4 — green scale |
| `--color-heatmap-accent-1` | `color-mix(green-500 20%, white)` | Intensity 1 — accent scale |
| `--color-heatmap-accent-2` | `color-mix(green-500 40%, white)` | Intensity 2 — accent scale |
| `--color-heatmap-accent-3` | `color-mix(green-500 70%, white)` | Intensity 3 — accent scale |
| `--color-heatmap-accent-4` | `#2e6f40` (green-500) | Intensity 4 — accent scale |
| `--color-heatmap-redgreen-1` | `#6dbd84` (green-300) | Intensity 1 — redgreen scale (low = good) |
| `--color-heatmap-redgreen-2` | `#f59e0b` (amber-500) | Intensity 2 — redgreen scale |
| `--color-heatmap-redgreen-3` | `#dc2626` (red-500) | Intensity 3 — redgreen scale |
| `--color-heatmap-redgreen-4` | `#991b1b` (red-800) | Intensity 4 — redgreen scale (high = bad) |
| `--primitive-font-mono` | `DM Mono, monospace` | Row and column label text; legend text |
| `--color-text-muted` | `#666666` | Label and legend text color |
| `--color-error-text` | `#dc2626` | FromFile error message color |

**Size configuration (inline overrides — not CSS variables):**

| Size | Cell | Gap | Font size |
|---|---|---|---|
| `sm` | 8 px | 2 px | 8 px |
| `md` | 10 px | 3 px | 9 px |
| `lg` | 14 px | 4 px | 10 px |

## 10. Responsive behavior
- The grid wrapper applies `overflowX: auto` and `overflowY: auto`, so large grids scroll within their container rather than breaking layout.
- The component renders as `display: inline-flex` and does not stretch to full width by default; place it in a containing element that controls width.
- No breakpoint-specific behavior is defined. Cell and gap sizes are controlled by the `size` prop, not by viewport width.
- For very dense grids (large matrices), use `size: 'sm'` to reduce the footprint on smaller screens.

## 11. Composition and usage patterns

**Activity calendar (7 × 12 auto-label)**
Pass a 7-row × 12-column matrix of activity counts. The component auto-applies Sun–Sat row labels and Jan–Dec column labels. Use `colorScale: 'green'` to match the GitHub contribution graph convention.

Gotcha: the auto-label heuristic fires only when both `rowLabels` and `columnLabels` are absent. If you pass even one of them, the other must be passed explicitly.

`[STORYBOOK BLOCK: Simple/Data/ElegantHeatmapGrid/Default]`

**Custom matrix with file upload (FromFile)**
In Storybook, use the `FromFile` story to let users upload their own `.csv` or `.json` file. The file loader wrapper parses labels and values from the file and passes them to the component. Override parsed labels using the comma-separated text inputs in the controls panel.

`[STORYBOOK BLOCK: Simple/Data/ElegantHeatmapGrid/FromFile]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [BarChart](/design-system/docs/bar-chart-zh) | When comparing magnitudes across a single categorical dimension with labeled values |
| [DataTable](/design-system/docs/data-table-zh) | When users need to read or interact with the precise values behind the heatmap |
| KPI Card | When you need to surface a single scalar metric rather than a matrix overview |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Pass raw numeric values and let the component normalise them — the normalisation ensures the color scale always spans the full range of the data. | Pre-normalise your data to 0–4 and pass those integers directly; the component re-normalises whatever you pass, so pre-normalised data produces flat or skewed output. |
| Use `colorScale: 'green'` for activity or engagement data where quantity is inherently positive. | Use `colorScale: 'redgreen'` for activity data — it implies that high values are bad. |
| Provide a `showLegend: true` (the default) so users can interpret the color scale without prior knowledge. | Hide the legend unless the color scale encoding is explained elsewhere in the UI. |
| Use `size: 'sm'` for large matrices (e.g. 20+ columns) to keep the grid compact. | Use `size: 'lg'` for large matrices; the grid will be very wide and require significant horizontal scrolling. |
| Keep row and column labels to 10 characters or fewer (they are truncated at that limit). | Pass full words or phrases as labels; they are truncated without an ellipsis indicator. |
| Pair the heatmap with a DataTable or tooltip to give users access to precise values when the encoding matters. | Use the `redgreen` scale when your audience may include users with red-green color blindness without providing an alternative encoding. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
