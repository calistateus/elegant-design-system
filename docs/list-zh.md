## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantList.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantList.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** No separate types file (interface is exported from the source). No test file found.

**Sections needing human review:**
- Section 5 (States): Component has no interactive states. Confirmed from source — no hover, focus, or active handling. One inferred state (empty/no description) is noted.
- Section 8 (Accessibility): Icons are `aria-hidden="true"` which is correct. However, the `ul` has no `aria-label` — when the list is used without a heading, screen readers will announce "list, N items" with no context. Flagged as a gap.
- Section 13 (Do's and don'ts): The `count` vs `items.length` coupling is a known sharp edge — flagged.

**Recommended follow-ups:**
- Add a story showing the two-column layout (`columns="two"`) to demonstrate the responsive grid collapse at the `md` breakpoint.
- Add a story showing items with descriptions alongside items without, in the same list.
- Consider making `count` derived from `items.length` automatically — the current API requires them to stay in sync manually, which is error-prone.
- Add `aria-label` to the `ul` when no `heading` is provided.

---

# List

## 1. Overview
A flexible, icon-optional bullet list component that renders a heading, optional description, and up to seven labeled items — used for feature sets, benefit summaries, and "what you get" sections.

## 2. When to use / When not to use

| Use | Don't use |
|---|---|
| A "What you get" or "Key features" section on a marketing or case study page | Use NumeratedList when order matters and the sequence communicates meaning (steps, timelines, ranked items) |
| A set of benefits or capabilities paired with Lucide icons for visual reinforcement | Use plain HTML text when there are more than 7 items — the component enforces a 7-item maximum |
| A two-column feature grid on desktop that collapses gracefully to a single column on mobile (`columns="two"`) | Don't use when items need deeply nested sub-content — each item supports only a label and one optional description |
| Displaying a short list of permissions, inclusions, or checklist items with consistent icon treatment | Don't use when items are interactive (links, toggles) — this component renders static text only |
| Grouping a heading, descriptive paragraph, and related list items into a single cohesive content block | Don't use without verifying `count` matches `items.length` — mismatched values silently truncate the list |

## 3. Anatomy

1. **Outer container** — a `div` with `flex-column` layout and `--size-heading-to-body` gap between the header block and the list.
2. **Header block** — optional region containing the heading and/or description, separated from each other by `--size-label-to-description`.
3. **Heading** — an element rendered at the tag specified by `headingLevel` (default `h5`), always styled with `--type-h5-*` tokens and `--color-text-title`. Rendered only when `heading` prop is provided. Use `headingLevel` to place the heading correctly in the page outline without affecting its visual style.
4. **Description** — a `p` element in `--primitive-font-size-sm` / `--color-text-muted`. Rendered only when `description` prop is provided.
5. **List** — a `ul` with `list-style: none` and `--size-card-gap` between items. Switches to a two-column CSS grid when `columns="two"`.
6. **List item** — a `li` containing an optional icon and a content block, laid out as a flex row with `--primitive-scale-3` gap.
7. **Item icon** — optional Lucide icon, 16px, `strokeWidth={1.5}`, `aria-hidden="true"`, colored with `--color-text-accent`. Offset by 3px top margin to align with the first line of text.
8. **Item label** — `span` in medium weight, `--primitive-font-size-sm`, `--color-text-body`.
9. **Item description** — optional `span` in regular weight, `--primitive-font-size-sm`, `--color-text-muted`, below the label.

`[STORYBOOK BLOCK: Simple/Content/ElegantList/Default]`

## 4. Variants

The stories file exports one named story (`Default`). Column layout is the primary axis of variation and is controlled by the `columns` prop.

**Default (single column)**
- Renders items in a single stacked column.
- Items read sequentially — use when the list is narrow or the reading order matters.
- The default story shows a heading + three icon items with no descriptions.

**Two-column layout (columns="two")**
- Renders items in a `grid-cols-1 md:grid-cols-2` layout — single column below 600px, two columns at 600px and above.
- Use for 4–6 items on sections with adequate horizontal space (a full-width page section or a container wider than ~600px).
- Constraint: with an odd number of items, the last item spans a full grid row on its own — this is visually acceptable but should be reviewed for each use case.

[No dedicated story exists — recommend adding a `TwoColumn` story with 4–6 items.]

## 5. States

List is a static display component with no interactive states.

**Default**
- All items visible, icon optional per item, description optional per item.

**Without heading or description**
- The header block is omitted entirely. The list renders flush at the top of the component with no additional gap above it.
- Triggered by omitting both `heading` and `description` props.

**Item with description**
- Description `span` appears below the label with `--size-label-to-description` (0.25rem) gap.
- Triggered by providing a non-empty `description` string on any `ElegantListItem`.

**Item without icon**
- The icon column is omitted for that item. The label starts at the left edge.
- Items in the same list can mix icon and no-icon — layout is per-item.

## 6. Properties

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `count` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7` | — | Yes | Number of items to render. Must equal `items.length`. Values beyond the array length are ignored; values less than the array length truncate silently. |
| `items` | `ElegantListItem[]` | — | Yes | Array of item objects. Each item has `label: string` (required), `description?: string`, and `icon?: LucideIcon`. |
| `heading` | `string` | `undefined` | No | Optional heading rendered as `h5` above the list. Omit to hide the header entirely. |
| `description` | `string` | `undefined` | No | Optional supporting text rendered as a `p` below the heading and above the list. Only rendered when provided. |
| `columns` | `'single' \| 'two'` | `'single'` | No | Layout of the list. `'two'` uses a responsive CSS grid: single column below 600px, two columns at 600px+. |
| `headingLevel` | `'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h5'` | No | Semantic heading tag for the heading text. Visual style always uses h5 tokens regardless of this value. Use to fit the component into the correct heading hierarchy of the page. |

**ElegantListItem shape:**

| Field | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | Yes | Primary text for the item, rendered in medium weight. |
| `description` | `string` | No | Supporting text below the label, rendered in muted color. |
| `icon` | `LucideIcon` | No | Lucide icon component rendered before the label at 16px. |

## 7. Content guidelines

**Heading**
- Use sentence case. Keep headings under 5 words — the `h5` is small (1rem / bold) and loses impact with long strings.
- Good: "What you get", "Key features", "Included in every plan"
- Avoid: "Here is a full list of everything included in this pricing tier"

**Item labels**
- Keep labels under 6 words. They are rendered at `0.875rem` medium weight — dense copy is hard to scan.
- Use parallel grammatical structure across all items in a list (all nouns, all verb phrases, or all gerunds — not mixed).
- Good: "Full source code", "Commercial licence", "Lifetime updates"
- Avoid: "You get the full source code", "Commercial", "Updates for life (no expiry)"

**Item descriptions**
- Use descriptions sparingly — only when the label alone would be ambiguous.
- Keep descriptions under 15 words. They render at the same font size as the label (0.875rem) but in muted color; long descriptions create a heavy visual block.
- Good: "Includes all component variants and the token layer."

**Icon usage**
- Use icons consistently across a list — either all items have icons or no items have icons. Mixing icon and no-icon items in the same list creates uneven left alignment.
- Icons should reinforce the label's category (Check for inclusions, Globe for geographic scope, ShieldCheck for security), not decorate arbitrarily.
- The icon is `aria-hidden` — it must never be the only carrier of meaning.

**Truncation**
- The component does not truncate. Long labels wrap to multiple lines. Keep labels short enough to fit on one line in the narrowest expected viewport.

## 8. Accessibility

**Keyboard navigation**
List is non-interactive. No keyboard navigation is introduced by the component.

**Screen reader behavior**
- Rendered as a `ul` (unordered list). Screen readers announce "list, N items" on focus.
- When `heading` is provided, the `h5` precedes the list in DOM order, providing context. The `h5` is not programmatically associated with the `ul` via `aria-labelledby` — this is a gap [NEEDS CONFIRMATION on whether this is required by the design intent].
- When neither `heading` nor `description` is provided, the list has no accessible name. Consider adding `aria-label` to the `ul` in these cases.
- Item icons are `aria-hidden="true"` — correct, as they are decorative.
- The `li` elements contain only text spans; no ARIA roles are added beyond the native list semantics.

**Color and contrast**
- `--color-text-body` (#171717) on white background: exceeds 4.5:1 — passes WCAG AA.
- `--color-text-muted` (#666666) on white background: ~5.7:1 — passes WCAG AA at `0.875rem` with regular weight.
- `--color-text-accent` (#2e6f40) used for icons, which are `aria-hidden` — contrast is decorative only.
- `--color-text-title` (#1e1e1e) for heading: exceeds 4.5:1 — passes WCAG AA.

**Motion**
No animation or transition is applied.

**Touch / pointer**
Non-interactive. No touch targets.

**Known gaps**
- No `aria-labelledby` linking the `ul` to the heading element.
- No `aria-label` fallback on the `ul` when `heading` is absent.
- Use `headingLevel` to ensure the heading fits the semantic outline of the page (`h2` for a page section, `h3` inside a card, etc.).

## 9. Design tokens

| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--size-heading-to-body` | `1rem` (`--primitive-scale-4`) | Gap between header block and list |
| `--size-label-to-description` | `0.25rem` (`--primitive-scale-1`) | Gap between item label and item description; gap between heading and description |
| `--size-card-gap` | `1rem` (`--primitive-scale-4`) | Gap between list items |
| `--primitive-scale-3` | `0.75rem` | Gap between icon and item content block |
| `--color-text-title` | `#1e1e1e` (`--primitive-black`) | Heading color |
| `--color-text-body` | `#171717` (`--primitive-gray-900`) | Item label color |
| `--color-text-muted` | `#666666` (`--primitive-gray-600`) | Description text (both component-level and item-level) |
| `--color-text-accent` | `#2e6f40` (`--primitive-green-500`) | Item icon color |
| `--type-h5-family` | `DM Sans, sans-serif` | Heading font |
| `--type-h5-size` | `1rem` (`--primitive-font-size-base`) | Heading font size |
| `--type-h5-weight` | `700` (`--primitive-font-weight-bold`) | Heading font weight |
| `--type-h5-line-height` | `1.4` | Heading line height |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Description and item text font |
| `--primitive-font-size-sm` | `0.875rem` | Description and item text size |
| `--primitive-font-weight-medium` | `500` | Item label weight |
| `--primitive-font-weight-regular` | `400` | Description text weight |

## 10. Responsive behavior

- **Single column (`columns="single"`):** No responsive changes. Items stack vertically at all viewport widths.
- **Two column (`columns="two"`):** Uses Tailwind classes `grid-cols-1 md:grid-cols-2`. Collapses to a single column below 600px (the design system `md` breakpoint). Above 600px, items flow into two equal columns.
- The component width is determined entirely by its parent container — no internal max-width is applied.

## 11. Composition and usage patterns

**Feature inclusion checklist**
Use `heading="What you get"`, items with `icon: Check`, no descriptions, `columns="single"`. Appropriate for pricing pages, plan comparisons, and proposal summaries.
Gotcha: ensure all items use the same icon (e.g., all `Check`) for visual consistency — mixing icons creates uneven accent-color distribution.

`[STORYBOOK BLOCK: Simple/Content/ElegantList/Default]`

**Two-column capability grid**
Use `columns="two"`, 4–6 items, each with a descriptive icon and a short label + one-line description. Appropriate for "why us" or "how it works" sections with adequate horizontal space.
Gotcha: always wrap in a Container or layout with enough width — the two-column grid only activates at 600px+. In a narrow sidebar this stays single-column.

**Icon-free text list**
Use with no icons on any item for a clean, minimal list (e.g., a list of process steps where NumeratedList is not appropriate but a clean stacked layout is needed).
Gotcha: if this use case is common, NumeratedList is likely a better fit for ordered sequences.

## 12. Related components

| Component | When to use it instead |
|---|---|
| [NumeratedList](/design-system/docs/numerated-list-zh) | When the sequence number conveys meaning — steps in a process, ranked items, a numbered methodology — use NumeratedList which renders an `ol` with styled ordinal indicators |
| [Container](/design-system/docs/container-zh) + custom children | When items need richer content than label + description (images, CTAs, interactive elements) — List constrains items to text and an icon |
| ElegantIconCard in a [Carousel](/design-system/docs/carousel-zh) | When each feature needs significantly more content (long description, visual) and should be displayed in a scrollable/sliding format |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Keep `count` exactly equal to `items.length` — the component slices the array to `count`, so a mismatch silently drops items. | Pass `count={5}` with an `items` array of 3 — the rendered list will show 3 items regardless of `count`, with no error. |
| Use icons consistently — either all items or no items in a given list should have icons. | Mix icon and no-icon items in the same list — the uneven left edge looks like a broken layout. |
| Use `columns="two"` for 4–6 items in a wide layout section. | Use `columns="two"` for 2 or 3 items — odd numbers produce a lonely last item spanning the full row. |
| Keep item labels under 6 words in parallel grammatical form. | Write item labels as full sentences — at 0.875rem they create a wall of text that defeats the scannable intent of the component. |
| Use the `heading` prop to label the list when it appears standalone on a page. | Use the `heading` prop if a heading already exists immediately above the component in the layout — duplicate headings confuse the heading hierarchy. |
| Use item descriptions only for genuinely ambiguous labels that need a single clarifying sentence. | Write item descriptions longer than 15 words — the same font size as labels creates visual compression. |
| Choose icons from Lucide that reinforce the semantic category of the item (Check, ShieldCheck, Globe). | Use purely decorative icons (Star, Heart) that add no information — icons are accent-colored and attract attention. |

## 14. Changelog

### 2026-04-27
- **Accessibility:** Added `headingLevel` prop (`'h2'–'h6'`, default `'h5'`). The heading renders as the specified semantic element while keeping h5 visual tokens, allowing the component to fit into any page heading hierarchy.
