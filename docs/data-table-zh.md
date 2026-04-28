---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/data/ElegantDataTable.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantDataTable.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): Loading and error states are not implemented; inferred from toast usage and file-upload feedback behavior.
- Section 8 (Accessibility): The `<table>` lacks `aria-label` or `<caption>`. Sort button headers are `<th>` elements with `onClick` but no `role="button"` or `aria-sort` attributes — flagged.
- Section 10 (Responsive behavior): Horizontal scroll is implemented but no column-priority or stacking behavior exists for narrow viewports.

**Recommended follow-ups:**
- Add `aria-sort` to sortable column headers for screen reader compatibility.
- Add a `<caption>` or `aria-label` to the `<table>` element.
- Add keyboard support (Enter/Space) to sortable headers and selectable rows.
- Add stories for: zebra striping, column sort active, row select active, multi-select active, search with results, search with no results.
- Consider adding pagination for large datasets beyond the current row-cap approach.
- Consider whether empty rows (placeholder rows rendered by default) should be hidden from screen readers.

---

# Data Table

## 1. Overview
A feature-rich data table that accepts CSV or JSON uploads and supports optional column sorting, row search, single-row selection, and multi-row selection — designed for exploratory data display in dashboard and portfolio contexts.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Displaying structured tabular data with 2–15 columns and up to 50 rows | Showing a single metric — use a KPI Card instead |
| Allowing users to sort columns to find the highest or lowest values | Displaying hierarchical or tree-structured data |
| Enabling users to search and filter rows by keyword | Presenting time-series trends — use BarChart or HeatmapGrid instead |
| Letting users select one or multiple rows for downstream action | Very wide datasets where many columns must always be visible simultaneously — consider a dedicated data grid library |

## 3. Anatomy
1. **Toolbar** — horizontal flex row above the table containing an optional search input (left) and the Upload file button (right).
2. **Search input** — filters visible rows in real time; only appears when `tableSearch` is enabled.
3. **Upload button** — opens a native file picker accepting `.csv` and `.json` files; always visible.
4. **Table container** — horizontally scrollable wrapper with a subtle border and card radius.
5. **Header row** — sticky-style thead with column name labels; hosts sort icons when `columnSort` is enabled.
6. **Selection column** — leftmost column with a checkbox (multi-select) or radio (single-select); only appears when a selection mode is enabled.
7. **Sort icon** — `ChevronUp`, `ChevronDown`, or `ChevronsUpDown` icon appended to each sortable column header.
8. **Data rows** — tbody rows rendering cell text; empty cells show an em dash placeholder.
9. **Empty state** — a single full-width row with "No results found." shown when search returns no matches.
10. **Footer** — row count summary (left) and selection count summary (right, when selection is active).

`[STORYBOOK BLOCK: Simple/Data/Default]`

## 4. Variants

**Default**
- Plain table with no sorting, search, or selection features enabled.
- Use as the baseline display mode when the data is simple and no interaction is needed.
- Pre-seed with `initialData` for demos; the table is empty by default (all cells blank).

`[STORYBOOK BLOCK: Simple/Data/Default]`

**With zebra striping**
- Alternates even rows between `--color-bg-main` (white) and `--color-bg-surface` (gray-50).
- Use when the table has many columns and visual row separation aids scanning.
- Enable with `zebraStriping: true`. [NEEDS CONFIRMATION — no dedicated story]

**With column sort**
- Adds clickable sort icons to all column headers; cycles through asc → desc → unsorted.
- Empty rows always pin to the bottom during sort; non-empty rows sort by locale-aware string comparison.
- Enable with `columnSort: true`. [NEEDS CONFIRMATION — no dedicated story]

**With search**
- Renders an `ElegantSearch` input above the table that filters rows in real time.
- Non-matching rows (including empty rows) are hidden; the footer updates to show match count and query.
- Enable with `tableSearch: true`. [NEEDS CONFIRMATION — no dedicated story]

**With single-row selection**
- Adds a radio button column; clicking a row or its radio selects it (clicking again deselects).
- Selected row gets a subtle green tint background.
- Enable with `rowSelect: true`. [NEEDS CONFIRMATION — no dedicated story]

**With multi-row selection**
- Adds a checkbox column; clicking rows or their checkboxes toggles selection.
- The header checkbox cycles through unselected → indeterminate → all-selected states.
- Takes precedence over `rowSelect` if both are set.
- Enable with `rowMultiSelect: true`. [NEEDS CONFIRMATION — no dedicated story]

## 5. States

**Default (populated)**
- Table renders pre-seeded or uploaded data with all features at their default (off) configuration.
- Empty cells render as `—` in muted color.

**Empty cell rows**
- Rows where all cells are empty are always shown below populated rows; they are not selectable and do not respond to hover.
- Rationale: the table allocates a fixed grid (`rows × columns`) and shows placeholder structure.

**Sort — ascending**
- Triggered by first click on a column header when `columnSort` is enabled.
- Non-empty rows float to top, sorted A→Z / 0→9 by the clicked column. Empty rows pin below.
- The header shows a `ChevronUp` icon in body color on the active column.

**Sort — descending**
- Triggered by second click on the same column header.
- Order reverses; `ChevronDown` icon shown.

**Sort — cleared**
- Triggered by third click on the same column header; resets to original insertion order.
- `ChevronsUpDown` icon returns to muted color.

**Search — matches found**
- Visible rows limited to those where at least one cell contains the query string (case-insensitive).
- Footer shows `N rows matching "query"`.

**Search — no matches**
- All rows hidden; a single full-width cell shows "No results found." in muted text.

**Row selected (single)**
- Selected row background: `color-mix(in srgb, green-500 6%, bg-main)` (very faint green).
- Hover on selected row deepens to 10% green mix.
- Footer shows "1 selected".

**Row selected (multi)**
- Same green tint applied to all selected rows.
- Header checkbox shows indeterminate state when some (not all) visible rows are selected.
- Footer shows "N selected".

**File upload — success**
- Table re-populates with parsed data; sort, search, and selection state resets.
- If data exceeds `rows × columns` capacity, an error toast fires describing the truncation.

**File upload — error**
- Toast notification fires for: unsupported file type, empty CSV, malformed JSON, or parse failure.
- Table data is unchanged.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `rows` | `number` | `10` | No | Maximum data row count (not including the header row); also controls capacity for uploaded files |
| `columns` | `number` | `5` | No | Maximum column count; also controls capacity for uploaded files |
| `zebraStriping` | `boolean` | `false` | No | Alternates even-row background between white and gray-50 |
| `columnSort` | `boolean` | `false` | No | Enables ascending/descending sort on header click |
| `tableSearch` | `boolean` | `false` | No | Shows a search bar that filters visible rows by keyword |
| `rowSelect` | `boolean` | `false` | No | Enables single-row selection via radio button |
| `rowMultiSelect` | `boolean` | `false` | No | Enables multi-row selection via checkboxes; takes precedence over `rowSelect` |
| `initialData` | `{ headers: string[]; rows: string[][] }` | `undefined` | No | Pre-seeds the table; trimmed to `rows × columns` capacity |

## 7. Content guidelines
This component renders arbitrary user-provided or developer-provided data. There is no fixed copy. The following rules apply to the structural text the component itself produces:

- **Empty cell placeholder:** `—` (em dash). Do not change this without updating the `aria-label` strategy for screen readers.
- **Footer row count:** `"N row"` / `"N rows"` — correctly pluralised.
- **Footer search qualifier:** `matching "query"` — appended when a search query is active.
- **Footer selection:** `"N selected"` / `"1 selected"` / `"None selected"`.
- **Empty state:** `"No results found."` — used for search with no matches.
- **Upload button:** `"Upload file"` — keep this label; it is also the accessible name for the hidden file input trigger.
- **Toast error messages:** Descriptive — include the file's actual row/column count and the table's capacity limit.

## 8. Accessibility
- **Keyboard navigation:** Header sort is click-only; no Enter/Space keyboard trigger is implemented. Row selection is click-only. Known gap — recommend adding `onKeyDown` handlers and `tabIndex={0}` to interactive headers and rows.
- **Screen reader behavior:** All `<th>` elements carry `scope="col"`, correctly associating header cells with their data columns. The `<table>` element has no `<caption>` or `aria-label` — a known gap. Sortable column headers have no `aria-sort` attribute — a known gap. The selection checkbox/radio components (ElegantCheckbox, ElegantRadio) carry their own accessibility semantics. The file upload input is visually hidden but present in the DOM.
- **Color and contrast:** Selected row uses a green color-mix tint; the tint alone is not a sufficient selection indicator for low-vision users — the radio/checkbox provides a secondary indicator.
- **Motion:** Row background transitions use `--primitive-duration-instant` (100ms); no `prefers-reduced-motion` guard is applied. Known gap — consider wrapping transition in a media query.
- **Touch/pointer:** The upload button meets 44 px height at the rendered padding. Row tap targets at `--primitive-scale-3` vertical padding (12 px) — effective row height is approximately 12 + 20 + 12 = 44 px, which is borderline; actual tappability depends on the rendered font size and line height. Known gap on mobile.
- **Known gaps:** No `aria-sort` on sortable headers. No `<caption>` or `aria-label` on the `<table>`. No keyboard handling for sort headers or row selection (Enter/Space on header `<th>` elements). No `prefers-reduced-motion` guard on row transitions.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--primitive-font-sans` | `DM Sans, sans-serif` | All table text |
| `--primitive-font-size-sm` | `0.875rem` | Table cell and header font size |
| `--primitive-font-size-xs` | `0.75rem` | Footer text |
| `--primitive-font-weight-medium` | `500` | Column header font weight |
| `--color-text-title` | `#1e1e1e` | Column header text color |
| `--color-text-body` | `#171717` | Populated cell text color |
| `--color-text-muted` | `#666666` | Empty cell placeholder, footer, empty state, sort icon (inactive) |
| `--color-bg-surface` | `#fafafa` | Header row background; zebra even-row background |
| `--color-bg-main` | `#ffffff` | Default row background |
| `--color-border-subtle` | `#f5f5f5` | Table outer border, row dividers, selection column separator |
| `--size-card-radius` | `4px` | Table container corner radius |
| `--primitive-scale-3` | `0.75rem` | Cell vertical padding |
| `--primitive-scale-4` | `1rem` | Cell horizontal padding |
| `--primitive-scale-8` | `2rem` | Empty-state cell padding |
| `--primitive-scale-2` | `0.5rem` | Toolbar gap; upload button padding inline |
| `--primitive-gray-100` | `#f5f5f5` | Column header hover background |
| `--primitive-green-500` | `#2e6f40` | Selected row background tint base |
| `--color-interactive-primary-bg` | `#1e1e1e` | Upload button background |
| `--color-interactive-primary-fg` | `#ffffff` | Upload button text/icon color |
| `--size-btn-radius` | `4px` | Upload button border radius |
| `--size-btn-py-sm` | `0.25rem` | Upload button vertical padding |
| `--size-btn-px-sm` | `0.75rem` | Upload button horizontal padding |
| `--motion-btn-primary` | `opacity 150ms ease, transform 150ms ease` | Upload button hover transition |
| `--primitive-duration-instant` | `100ms` | Row hover background transition |

## 10. Responsive behavior
- The table container uses `overflowX: auto` so wide tables scroll horizontally on narrow viewports rather than wrapping.
- The toolbar uses `flexWrap: wrap` so the search input and upload button stack vertically on narrow containers.
- The search input has a `flex: 1 1 240px` base with a `maxWidth: 320px` cap.
- No column hiding, priority columns, or row-stacking behavior is implemented. On very narrow viewports, horizontal scrolling is the only affordance.
- The component itself sets `width: 100%`; it fills whatever container it is placed in.

## 11. Composition and usage patterns

**Pre-seeded demo table**
Pass `initialData` with headers and rows to show real content without requiring the user to upload a file. Useful for portfolio case studies where a static dataset tells the story.

Gotcha: `initialData` is consumed only on mount. If `rows` or `columns` props change, the component remounts (the story uses a `key` prop to force this). In production, manage this with a controlled `key` if you need to resize the grid.

`[STORYBOOK BLOCK: Simple/Data/Default]`

**Interactive data explorer**
Enable `tableSearch`, `columnSort`, and `rowMultiSelect` together to give users a lightweight data exploration experience without a backend. Pair with the Upload file button for file-driven demos.

Gotcha: `rowMultiSelect` takes precedence over `rowSelect` — do not enable both simultaneously.

## 12. Related components
| Component | When to use it instead |
|---|---|
| KPI Card | When you need to highlight a single metric rather than a full dataset |
| HeatmapGrid | When the data has a natural two-dimensional structure (rows × columns of intensity values) |
| BarChart | When the primary goal is visualising relative magnitude across categories rather than reading individual values |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Provide `initialData` for any story or demo that needs to show populated content immediately. | Rely on the user to upload a file as the only way to see data in a Storybook preview. |
| Set `rows` and `columns` to match the expected data shape before passing `initialData` to avoid silent truncation. | Pass `initialData` with more rows or columns than the `rows`/`columns` props allow without handling the truncation toast expectation. |
| Enable `tableSearch` when the dataset has more than 5–6 rows and users need to locate specific entries. | Enable `tableSearch` on a table with 3 or fewer rows — the overhead adds no value. |
| Use `rowMultiSelect` when users need to act on a selection (e.g. export, delete, compare). | Enable `rowSelect` and `rowMultiSelect` simultaneously — `rowMultiSelect` silently takes precedence. |
| Enable `zebraStriping` for tables with 6+ columns to help users track rows across the width. | Enable `zebraStriping` for tables with 2–3 columns — the added contrast is visual noise. |
| Keep column headers short (1–2 words) so they fit without wrapping at the `whiteSpace: nowrap` setting. | Use long sentence-style column headers; they will overflow without wrapping. |
| Validate that uploaded file data makes sense in context — the component parses and displays any conforming file. | Assume the table validates business logic in the data (it does not). |

## 14. Changelog

### 2026-04-27
- **Accessibility:** Added `scope="col"` to all `<th>` elements (selection column and all data column headers). Screen readers can now correctly associate header cells with their data columns.
