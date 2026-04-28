## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantContainer.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantContainer.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** No separate types or test file found for this component.

**Sections needing human review:**
- Section 8 (Accessibility): Container renders a plain HTML element with no interactive role. Focus behavior is entirely determined by children — this is inferred, not stated in source.
- Section 10 (Responsive behavior): No breakpoint-specific logic exists in the component. The `row-wrap` direction uses CSS `flex-wrap: wrap` which responds to available space, but no explicit breakpoints are managed in the component. Noted as inferred.

**Recommended follow-ups:**
- Add a story demonstrating the `PageSection` pattern with real content (not placeholder boxes) to communicate semantic intent.
- No test file exists — recommend adding tests for `as` prop rendering the correct HTML element.
- Consider documenting the `maxWidth: 'full'` vs no `maxWidth` distinction more explicitly (currently no `maxWidth` means no max-width constraint at all, which is different from `full`).

---

# Container

## 1. Overview
A composable flex layout primitive that maps token-based spacing, gap, and alignment props to inline styles — eliminating one-off layout CSS across page sections and component groups.

## 2. When to use / When not to use

| Use | Don't use |
|---|---|
| Stacking a heading, body, and CTA vertically with system spacing between them | Use a `Card` or `Wrapper` (with `surface` prop) when the region needs a background color, border, or radius |
| Centering and constraining a page section to 1280px with consistent horizontal gutters | Don't use when you need a CSS Grid layout — Container is flex-only |
| Laying out a row of tags or chips that should wrap when the viewport narrows (`row-wrap`) | Don't use for a single isolated element with no children layout needs — apply spacing inline or via a parent |
| Wrapping a `<section>`, `<article>`, or `<nav>` to give it correct semantic HTML while controlling its inner layout | Don't use as a styled card surface — it has no background, border, or shadow |
| Creating a full-width band across the viewport that centers its content with `center + maxWidth: 'page'` | Don't nest multiple Containers when a single one with the right `direction` and `gap` would suffice |

## 3. Anatomy

1. **Root element** — the rendered HTML element (defaults to `div`; configurable via `as`). Receives all layout styles as inline CSS.
2. **Flex track** — the flex container itself, with `direction`, `align`, and `justify` controlling child positioning.
3. **Children slot** — direct children receive gap spacing from the `gap` prop; they are not wrapped individually.

`[STORYBOOK BLOCK: Simple/Layout/ElegantContainer/VerticalStack]`

## 4. Variants

The stories file exposes four named compositions rather than discrete visual variants. Each demonstrates a different layout use case.

**VerticalStack**
- Stacks children top-to-bottom with `card` gap and `gutter` horizontal padding.
- Use for content sections where items should read sequentially — feature lists, step sequences, article bodies.
- `align: 'stretch'` causes children to fill the container width; this is the correct default for full-width stacked layouts.

`[STORYBOOK BLOCK: Simple/Layout/ElegantContainer/VerticalStack]`

**HorizontalRow**
- Places children left-to-right in a single non-wrapping line, center-aligned on the cross axis.
- Use for toolbars, icon+label pairs, or horizontally distributed controls.
- Does not wrap — if overflow is a concern, use `WrappingRow` instead.

`[STORYBOOK BLOCK: Simple/Layout/ElegantContainer/HorizontalRow]`

**WrappingRow**
- Places children left-to-right and wraps to the next line when space runs out (`direction: 'row-wrap'`).
- Use for tag clouds, chip groups, card grids where items vary in width.
- `align: 'start'` keeps items top-aligned when they wrap to multiple lines.

`[STORYBOOK BLOCK: Simple/Layout/ElegantContainer/WrappingRow]`

**PageSection**
- Combines `as: 'section'`, `maxWidth: 'page'`, `center: true`, and `paddingY: 'section'` to produce a semantically correct, horizontally centered page band.
- Use this as the outermost layout shell for every major page section.
- The `section` element creates a landmark for screen readers; always include a heading inside it.

`[STORYBOOK BLOCK: Simple/Layout/ElegantContainer/PageSection]`

## 5. States

Container is a layout-only component with no interactive states. It has no hover, focus, active, disabled, loading, or error states. All interactive behavior belongs to its children.

## 6. Properties

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `as` | `'div' \| 'section' \| 'article' \| 'main' \| 'aside' \| 'header' \| 'footer' \| 'nav'` | `'div'` | No | Controls the rendered HTML element. Use semantic elements (`section`, `article`, `nav`) when the region has landmark meaning. |
| `maxWidth` | `'page' \| 'full'` | `undefined` | No | `'page'` constrains to `var(--size-max-width)` (1280px). `'full'` sets `max-width: 100%`. Omitting this prop applies no max-width constraint. |
| `center` | `boolean` | `false` | No | Centers the container horizontally using `margin-inline: auto`. Only meaningful when `maxWidth` is set or the container is narrower than its parent. |
| `paddingX` | `'none' \| 'gutter' \| 'card'` | `'none'` | No | Horizontal inner padding. `'gutter'` uses `--size-page-gutter` (1.5rem); `'card'` uses `--size-card-padding` (1.5rem — same value, different semantic intent). |
| `paddingY` | `'none' \| 'gutter' \| 'card' \| 'stack' \| 'section'` | `'none'` | No | Vertical inner padding. Values map to progressively larger spacing tokens from `gutter` (1.5rem) to `section` (6rem). |
| `gap` | `'none' \| 'tag' \| 'card' \| 'stack' \| 'section'` | `'none'` | No | Gap between direct children. `'tag'` (0.75rem) → `'card'` (1rem) → `'stack'` (2rem) → `'section'` (6rem). |
| `direction` | `'column' \| 'row' \| 'row-wrap'` | `'column'` | No | Flex direction. `'row-wrap'` applies `flex-direction: row` with `flex-wrap: wrap`. |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | No | Cross-axis alignment (`align-items`). `'stretch'` fills children to the container's cross-axis size. |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around'` | `'start'` | No | Main-axis distribution (`justify-content`). |
| `fullWidth` | `boolean` | `false` | No | Sets `width: 100%` on the container. Use when the parent is not already full-width. |
| `style` | `CSSProperties` | — | No | Additional inline styles. Merged last, so can override any computed style. Use sparingly. |
| `className` | `string` | — | No | Additional class names. Intended for Tailwind utilities that cannot be expressed through the prop API. |
| `children` | `React.ReactNode` | — | No | Content to render inside the container. |

## 7. Content guidelines

This component contains no human-authored copy — it is a pure layout primitive with no text rendering.

## 8. Accessibility

**Keyboard navigation**
Container has no interactive elements. Tab order follows DOM order of children, which is determined by the `direction` prop (column = top-to-bottom, row = left-to-right). No keyboard shortcuts are introduced.

**Screen reader behavior**
The rendered HTML element determines the ARIA landmark. Using `as="section"` creates a `region` landmark (requires a heading inside to be announced correctly). `as="nav"` creates a `navigation` landmark. `as="main"` creates a `main` landmark. `as="div"` introduces no landmark. No ARIA attributes are added by the component itself.

**Color and contrast**
Container applies no color. All contrast responsibility lies with children.

**Motion**
Container applies no animation or transition.

**Touch / pointer**
Container itself is not interactive. Child touch target sizes are the responsibility of child components.

**Known gaps**
When `as="section"` is used without a heading inside (e.g., `PageSection` story using placeholder boxes), the `region` landmark is inaccessible to screen readers because it has no accessible name. Enforce a heading requirement at the design level for all `section`-typed containers.

## 9. Design tokens

| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--size-page-gutter` | `1.5rem` (`--primitive-scale-6`) | `paddingX: 'gutter'`, `paddingY: 'gutter'` |
| `--size-card-padding` | `1.5rem` (`--primitive-scale-6`) | `paddingX: 'card'`, `paddingY: 'card'` |
| `--size-stack-gap` | `2rem` (`--primitive-scale-8`) | `gap: 'stack'`, `paddingY: 'stack'` |
| `--size-section-gap` | `6rem` (`--primitive-scale-24`) | `gap: 'section'`, `paddingY: 'section'` |
| `--size-tag-gap` | `0.75rem` (`--primitive-scale-3`) | `gap: 'tag'` |
| `--size-card-gap` | `1rem` (`--primitive-scale-4`) | `gap: 'card'` |
| `--size-max-width` | `1280px` | `maxWidth: 'page'` |

## 10. Responsive behavior

Container has no built-in breakpoint logic. `direction: 'row-wrap'` responds naturally to available width by wrapping children. The `paddingX` and `paddingY` tokens themselves are not responsive (they do not change across breakpoints). If breakpoint-aware padding is needed, use Tailwind utilities via the `className` prop alongside the page gutter tokens defined in `globals.css`.

## 11. Composition and usage patterns

**Page section shell**
Combine `as="section"`, `maxWidth="page"`, `center`, `paddingX="gutter"`, `paddingY="section"` for every top-level content band. This ensures consistent horizontal margins and vertical rhythm across pages.
Gotcha: add a heading as the first child — without it, the `section` landmark has no accessible name.

`[STORYBOOK BLOCK: Simple/Layout/ElegantContainer/PageSection]`

**Tag/chip group**
Use `direction="row-wrap"`, `gap="tag"`, `align="start"` to group tags, chips, or badges that should wrap gracefully.
Gotcha: do not use `align="stretch"` on `row-wrap` — it forces all items in a row to equal height, which looks wrong for inline chips of variable width.

`[STORYBOOK BLOCK: Simple/Layout/ElegantContainer/WrappingRow]`

**Centered toolbar row**
Use `direction="row"`, `gap="card"`, `align="center"`, `justify="between"` to create a horizontally spaced row of controls (e.g., a filter bar).
Gotcha: `fullWidth` must be `true` for `justify="between"` to distribute space across the full parent width.

`[STORYBOOK BLOCK: Simple/Layout/ElegantContainer/HorizontalRow]`

## 12. Related components

| Component | When to use it instead |
|---|---|
| Wrapper | When the region needs a background color (`surface`), border, or border-radius — Container has no surface styling |
| Tailwind layout utilities (`layout-compact`, `layout-normal`) | When you need a responsive CSS Grid layout across columns — Container is flex-only |
| ElegantList / ElegantNumeratedList | When the children are semantically a list of items (features, steps) — those components provide correct `ul`/`ol` semantics and built-in item spacing |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use `as="section"` with a heading inside for every major page region. | Use `as="section"` without a heading — the landmark becomes inaccessible. |
| Use `gap` to space children instead of adding margin to individual child components. | Mix Container `gap` with child `margin-top` — double-spacing breaks the rhythm. |
| Use `maxWidth="page"` + `center` for full-bleed sections that need constrained content. | Use `fullWidth` and `maxWidth="page"` together expecting the container to shrink — `fullWidth` sets `width: 100%`, which has no effect on `max-width` capping. |
| Use `direction="row-wrap"` + `gap="tag"` for chip and tag groups. | Use `direction="row"` for chip groups that could overflow — it won't wrap and content will be clipped. |
| Use `paddingY="section"` for top-level page bands to maintain consistent vertical rhythm. | Use `paddingY="section"` on a nested inner container — the large spacing token (6rem) is designed for page-level separation, not intra-section gaps. |
| Use semantic `as` values (`main`, `nav`, `header`, `footer`) to provide ARIA landmarks. | Nest a `<main>` inside another `<main>` — only one `main` landmark is valid per page. |
| Use `justify="between"` with `fullWidth` to distribute controls across a toolbar row. | Use `justify="between"` without `fullWidth` — spacing distributes across a potentially narrow intrinsic width. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
