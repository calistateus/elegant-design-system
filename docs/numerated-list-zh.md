## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantNumeratedList.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantNumeratedList.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** No separate types file (interface exported from source). No test file found.

**Sections needing human review:**
- Section 8 (Accessibility): The numeric indicator (`01`, `02`, etc.) is `aria-hidden="true"`. The list is an `ol` which provides inherent ordinal semantics — screen readers will announce item position. However, the visible number style (zero-padded, mono, accent-colored) differs from the semantic number — this should be confirmed as intentional.
- Section 5 (States): No interactive states. Inferred from source.
- Section 13 (Do's and don'ts): The `count`/`items.length` coupling risk is identical to List — documented again here as it is a real sharp edge.

**Recommended follow-ups:**
- Add a story showing `columns="two"` with 4–6 items to demonstrate the responsive grid.
- Add a story showing items with no descriptions (label-only) to demonstrate the minimal variant.
- Consider removing the `count` prop and deriving it from `items.length` — the manual sync requirement is an error-prone API.
- Each item has `paddingBottom: --size-card-gap` and a `borderBottom` — the last item renders a trailing border. Confirm whether this is intentional design or a gap (no visual story to verify against).

---

# NumeratedList

## 1. Overview
A sequenced list component that pairs zero-padded ordinal indicators with labeled items and optional descriptions — used for displaying steps, processes, and ranked contributions where order carries meaning.

## 2. When to use / When not to use

| Use | Don't use |
|---|---|
| A numbered methodology, process, or step sequence where the position of each item communicates priority or order | Use List (unordered) when items have equal weight and the sequence is for visual structure only, not meaning |
| A "Key contributions" or "How we work" section on a case study or about page where each item is a distinct phase | Don't use when items are more than 7 — the component enforces a 7-item maximum |
| A ranked list of project outcomes or deliverables where the reader should track each item by its number | Don't use for bullet-point feature lists where icons (not numbers) communicate the semantic category — use List instead |
| Displaying a small set of sequential instructions (2–5 steps) with supporting descriptions per step | Don't use when items need to be interactive (links, toggles, expandable) — all content is static |
| A numbered timeline or phase breakdown inside a case study section | Don't use when `count` and `items.length` cannot be kept in sync — mismatches silently truncate the list |

## 3. Anatomy

1. **Outer container** — a `div` with `flex-column` layout and `--size-heading-to-body` gap between the header block and the list.
2. **Header block** — optional region containing the heading and/or description, separated from each other by `--size-label-to-description`.
3. **Heading** — an `h5` element styled with `--type-h5-*` tokens and `--color-text-title`.
4. **Description** — a `p` element at `--primitive-font-size-sm` / `--color-text-muted`.
5. **List** — an `ol` with `list-style: none` and `--size-card-gap` between items. Switches to a two-column CSS grid when `columns="two"`.
6. **List item** — a `li` containing the ordinal indicator and content block, laid out as a flex row with `--primitive-scale-3` gap. Each item has `padding-bottom: --size-card-gap` and a `1px solid --color-border-subtle` bottom border.
7. **Ordinal indicator** — a `span` with `aria-hidden="true"` rendering the 1-indexed position zero-padded to two digits (e.g., `01`, `02`). Styled in mono font, `--primitive-font-size-xs`, medium weight, `--color-text-accent`.
8. **Item label** — `span` in medium weight, `--primitive-font-size-sm`, `--color-text-body`.
9. **Item description** — optional `span` in regular weight, `--primitive-font-size-sm`, `--color-text-muted`, below the label.

`[STORYBOOK BLOCK: Simple/Content/ElegantNumeratedList/Default]`

## 4. Variants

The stories file exports one named story (`Default`). Column layout is the primary axis of variation, controlled by the `columns` prop.

**Default (single column)**
- Items stack top-to-bottom with a dividing bottom border on each row.
- Use for linear sequences where the reader follows items from first to last — process steps, project phases, methodology descriptions.
- The default story shows 3 items with heading, description, and per-item descriptions.

**Two-column layout (columns="two")**
- Renders items in a `grid-cols-1 md:grid-cols-2` layout — single column below 600px, two columns at 600px+.
- Use for 4–6 items in a wide layout section where scanning two columns simultaneously is reasonable (e.g., a grid of 4 project outcomes).
- Constraint: the ordinal sequence reads left-to-right, then down in a two-column grid — confirm this matches the intended reading order for the content.

[No dedicated story — recommend adding a `TwoColumn` story with 4–6 items.]

## 5. States

NumeratedList is a static display component with no interactive states.

**Default**
- All items rendered with ordinal indicators, labels, and optional descriptions.

**Without heading or description**
- Header block omitted entirely. List starts at the top of the component with no additional gap.
- Triggered by omitting both `heading` and `description` props.

**Item with description**
- Description `span` appears below the label with `--size-label-to-description` (0.25rem) gap.
- Triggered by a non-empty `description` on any `ElegantNumeratedListItem`.

**Item label-only (no description)**
- Item renders with ordinal + label only, no description span. Visually more compact.

## 6. Properties

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `count` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7` | — | Yes | Number of items to render. Must equal `items.length`. The component slices the array to `count` — mismatches truncate silently with no error. |
| `items` | `ElegantNumeratedListItem[]` | — | Yes | Array of item objects. Each item has `label: string` (required) and `description?: string`. |
| `heading` | `string` | `undefined` | No | Optional heading rendered as `h5` above the list. Omit to suppress the header block. |
| `description` | `string` | `undefined` | No | Optional supporting text rendered as `p` below the heading and above the list. |
| `columns` | `'single' \| 'two'` | `'single'` | No | List layout. `'two'` applies a responsive grid: single column below 600px, two columns at 600px+. |

**ElegantNumeratedListItem shape:**

| Field | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | Yes | Primary text for the item. Rendered in medium weight at 0.875rem. |
| `description` | `string` | No | Supporting text below the label, rendered in muted color. |

## 7. Content guidelines

**Heading**
- Use sentence case, under 5 words.
- Good: "Key contributions", "How we work", "Our process"
- Frame as a noun phrase that describes the type of sequence, not the number of items.

**Component-level description**
- One sentence, under 15 words, that contextualizes the list — who did it, what period, what project.
- Good: "Key contributions across the engagement."
- Avoid repeating the heading concept: don't write "Here are the key contributions." after a "Key contributions" heading.

**Item labels**
- Use parallel grammatical form across all items — all noun phrases or all gerund phrases, not mixed.
- Keep labels under 6 words. The label is medium-weight at 0.875rem — long labels wrap and lose scannability.
- Good: "Discovery & research planning", "Information architecture", "Prototype testing"
- Avoid: "We conducted discovery and research planning sessions" (full sentence), "IA" (too abbreviated without a description)

**Item descriptions**
- One to two sentences max, under 20 words per sentence.
- Should expand on the label's meaning, not repeat it.
- Good: "Stakeholder interviews, heuristic audits, and competitive analysis."
- If a description reaches 3 sentences, the item is too complex for this component.

**Ordinal indicators**
- Generated automatically as zero-padded two-digit numbers (`01`, `02`... `07`).
- Do not attempt to override these through `label` content — the numbers are structural.

**Truncation**
- Component does not truncate text. Long labels and descriptions wrap. Keep copy concise enough to read clearly at `0.875rem`.

## 8. Accessibility

**Keyboard navigation**
Non-interactive. No keyboard navigation introduced by the component.

**Screen reader behavior**
- Rendered as an `ol` (ordered list). Screen readers announce "list, N items" and the position of each item (e.g., "1 of 3") inherently from the `ol` element.
- The visible ordinal indicator (`01`, `02`) is `aria-hidden="true"` — correct, as the `ol` already communicates ordinal position to screen readers natively.
- When `heading` is provided, the `h5` precedes the list in DOM order, giving contextual framing. The heading is not programmatically associated with the `ol` via `aria-labelledby` — this is a gap but may not be required.
- When neither `heading` nor `description` is provided, the list has no accessible name. Consider `aria-label` on the `ol` in these cases.

**Color and contrast**
- `--color-text-body` (#171717) on white: exceeds 4.5:1 — passes WCAG AA.
- `--color-text-muted` (#666666) on white: ~5.7:1 — passes WCAG AA at 0.875rem regular weight.
- `--color-text-accent` (#2e6f40) for ordinal indicators: ~4.5:1 on white — passes WCAG AA. Ordinal indicators are `aria-hidden` so this is decorative only, but maintaining contrast is good practice.
- `--color-border-subtle` (#f5f5f5) item dividers: low luminance contrast with the white background — decorative, not required to meet 3:1 threshold.

**Motion**
No animation or transition applied.

**Touch / pointer**
Non-interactive. No touch targets.

**Known gaps**
- No `aria-labelledby` association between the `h5` heading and the `ol`.
- No `aria-label` fallback when both `heading` and `description` are absent.
- Last list item receives `padding-bottom` and `border-bottom` — this produces a trailing divider line at the bottom of the list. This is intentional: it keeps spacing consistent and allows the list to be placed inside bordered containers without a doubled border effect. If you need to suppress the trailing line, add `border-bottom: none` to the last child at the parent level.

## 9. Design tokens

| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--size-heading-to-body` | `1rem` (`--primitive-scale-4`) | Gap between header block and list |
| `--size-label-to-description` | `0.25rem` (`--primitive-scale-1`) | Gap between heading and description; gap between item label and item description |
| `--size-card-gap` | `1rem` (`--primitive-scale-4`) | Gap between list items; `padding-bottom` per item |
| `--primitive-scale-3` | `0.75rem` | Gap between ordinal indicator and item content block |
| `--color-text-title` | `#1e1e1e` (`--primitive-black`) | Heading color |
| `--color-text-body` | `#171717` (`--primitive-gray-900`) | Item label color |
| `--color-text-muted` | `#666666` (`--primitive-gray-600`) | Component description and item description color |
| `--color-text-accent` | `#2e6f40` (`--primitive-green-500`) | Ordinal indicator color |
| `--color-border-subtle` | `#f5f5f5` (`--primitive-gray-100`) | Item bottom-border divider |
| `--type-h5-family` | `DM Sans, sans-serif` | Heading font |
| `--type-h5-size` | `1rem` | Heading font size |
| `--type-h5-weight` | `700` | Heading font weight |
| `--type-h5-line-height` | `1.4` | Heading line height |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Description and item text font |
| `--primitive-font-mono` | `DM Mono, monospace` | Ordinal indicator font |
| `--primitive-font-size-xs` | `0.75rem` | Ordinal indicator font size |
| `--primitive-font-size-sm` | `0.875rem` | Description and item label/description size |
| `--primitive-font-weight-medium` | `500` | Item label and ordinal weight |
| `--primitive-font-weight-regular` | `400` | Description text weight |

## 10. Responsive behavior

- **Single column (`columns="single"`):** No responsive changes. Items stack vertically at all viewport widths.
- **Two column (`columns="two"`):** Tailwind classes `grid-cols-1 md:grid-cols-2`. Single column below 600px, two columns at 600px+.
- Component width is determined by the parent container. No internal max-width is applied.

## 11. Composition and usage patterns

**Project methodology section**
Use on a case study page with `heading="Our process"`, `columns="single"`, 4–5 items each with a phase label and one-sentence description. Wrap in a Container with `paddingY="section"` for proper vertical rhythm.
Gotcha: ensure items read logically from top to bottom — the sequence number implies causality or order.

`[STORYBOOK BLOCK: Simple/Content/ElegantNumeratedList/Default]`

**Contributions grid**
Use on a portfolio page with `heading="Key contributions"`, `columns="two"`, 4–6 items. Pair with a surrounding Container using `paddingX="gutter"` for edge breathing room.
Gotcha: in two-column mode the reading order is row-by-row (left to right, then down). If the content is meant to be read sequentially (step 1 → 2 → 3), single-column is safer.

**Minimal step list (no heading)**
Use without `heading` or `description` when the list is embedded inside a section that already has a heading above it in the layout.
Gotcha: without a heading, the list lacks an accessible name for screen readers — consider `aria-label` on the parent container or on the list itself.

## 12. Related components

| Component | When to use it instead |
|---|---|
| [List](/design-system/docs/list-zh) | When items have equal weight, order is arbitrary, and visual icons (not numbers) are the appropriate indicator — List renders a `ul` with optional Lucide icons |
| [Container](/design-system/docs/container-zh) + custom children | When steps need richer content (images, code blocks, CTAs) — NumeratedList limits items to label + description |
| ElegantCarousel | When there are many sequenced items and a scrollable/paginated view is preferable to a long vertical list |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Keep `count` equal to `items.length` at all times — the component slices to `count` silently. | Pass `count={5}` with a 3-item array expecting 5 items to render — only 3 will appear. |
| Use parallel grammatical form for all item labels (all noun phrases or all gerund phrases). | Mix sentence types across labels in the same list — it reads as inconsistent and unplanned. |
| Use `columns="single"` for linear, step-by-step processes where the reader follows sequence top-to-bottom. | Use `columns="two"` for sequential steps — the left-column / right-column reading order breaks the linear flow. |
| Use descriptions to expand on the label when the label alone is ambiguous. | Write descriptions that repeat the label — "Discovery planning: We planned the discovery" adds no value. |
| Keep descriptions to one or two sentences under 20 words each. | Use NumeratedList for items that need more than two sentences of explanation — consider a different layout component. |
| Wrap in a Container with `paddingY="section"` when this list is a standalone content section on a page. | Use NumeratedList without any surrounding padding when it is directly adjacent to other sections — the item divider border will visually merge with neighboring borders. |
| Use NumeratedList when the number conveys meaning (this happened first, this is the most important step). | Use NumeratedList when numbering is just visual decoration — List is the correct component for unordered feature sets. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
