## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantWrapper.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:**
- Stories file — no `ElegantWrapper.stories.tsx` found anywhere in the project. All variant and composition guidance below is derived from the source file alone.
- No test file found.

**Sections needing human review:**
- Section 4 (Variants): No stories file exists. Variant guidance is inferred from the `surface` prop values and token maps in the source.
- Section 11 (Composition): No stories to reference. Patterns are derived from source-level reading.
- Section 5 (States): No interactive states visible in source. Confirmed as layout-only.

**Recommended follow-ups:**
- Create a `ElegantWrapper.stories.tsx` covering at minimum: `surface="none"`, `surface="surface"`, `surface="card"`, and a `PageCard` composition (centered, constrained, with a surface).
- The `--radius-md` token used in the `card` surface style does not match the component token name — the source uses `var(--radius-md)` but globals.css defines `--primitive-radius-md: 4px` and the semantic alias is `--size-card-radius: var(--primitive-radius-md)`. Flag for token alignment.
- Clarify whether `border` in the `card` surface uses `--color-border` (Tailwind alias) or `--color-border-subtle` — the source uses `var(--color-border)` which maps to `--color-border-subtle` in the Tailwind theme block.

---

# Wrapper

## 1. Overview
A surface-aware flex layout primitive that extends Container with background, border, and border-radius styling — used when a region needs visual separation from its surroundings, such as a card or panel.

## 2. When to use / When not to use

| Use | Don't use |
|---|---|
| A card-style content region with a background and border that groups related content visually | Use Container when no surface treatment is needed — Wrapper with `surface="none"` is functionally equivalent but adds conceptual overhead |
| A panel or sidebar region with a distinct background color that separates it from the page background | Don't use Wrapper as a page section shell — use Container with the appropriate semantic `as` element for landmark regions |
| A constrained, centered region (e.g., a sign-in card, a pricing tile) with padding and a visible card border | Don't use as a navigation or header landmark — it has no semantic nav/header meaning unless `as` is set explicitly |
| Grouping form fields or content blocks inside a bordered region on a form or modal | Don't use when the surface treatment should come from a higher-level component (e.g., Modal, Drawer) that already provides background and border |
| A `surface="surface"` band to create a subtle alternating section background without a border | Don't apply `surface="card"` inside another `surface="card"` — nested card borders create visual noise |

## 3. Anatomy

1. **Root element** — the rendered HTML element (defaults to `div`; configurable via `as`). Receives all layout and surface styles as inline CSS.
2. **Surface layer** — background color, border, and border-radius applied by the `surface` prop. `'none'` renders no surface. `'surface'` adds a background. `'card'` adds background, `1px` border, and `4px` radius.
3. **Flex track** — same as Container: `direction`, `align`, and `justify` control child positioning.
4. **Children slot** — direct children receive gap spacing from the `gap` prop.

`[STORYBOOK BLOCK: Simple/Layout/ElegantWrapper/CardSurface]`

## 4. Variants

No stories file exists. The following is derived from the `surface` prop values in the source.

**surface="none" (default)**
- Renders with no background, border, or radius — identical to Container in visual output.
- Use when Wrapper is chosen for its API consistency with other Wrapper instances in a layout, but no surface treatment is needed in this specific region.
- Not visually distinguishable from Container; prefer Container for clarity when no surface is intended.

**surface="surface"**
- Applies `background-color: var(--color-bg-surface)` (gray-50, `#fafafa`).
- No border or radius — creates a subtle tonal separation from the white page background.
- Use for alternating section backgrounds, sidebar regions, or secondary content areas where a border would be too heavy.

**surface="card"**
- Applies `background-color: var(--color-bg-surface)`, `border-radius: var(--radius-md)` (4px), and `border: 1px solid var(--color-border)`.
- Use for discrete, self-contained content blocks — pricing cards, profile tiles, feature panels.
- Constraint: do not nest `surface="card"` inside another `surface="card"` without adjusting padding — the double border creates unwanted visual weight.

## 5. States

Wrapper is a layout and surface primitive with no interactive states. It has no hover, focus, active, disabled, loading, or error states. All interactive behavior belongs to its children.

## 6. Properties

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `as` | `'div' \| 'section' \| 'article' \| 'main' \| 'aside' \| 'header' \| 'footer' \| 'nav'` | `'div'` | No | Controls the rendered HTML element. Use semantic elements when the region has landmark meaning. |
| `surface` | `'none' \| 'surface' \| 'card'` | `'none'` | No | Controls background and border treatment. `'card'` adds background, 1px border, and 4px border-radius. |
| `maxWidth` | `'page' \| 'full'` | `undefined` | No | `'page'` constrains to `--size-max-width` (1280px). `'full'` sets `max-width: 100%`. Omitting applies no constraint. |
| `center` | `boolean` | `false` | No | Centers the wrapper horizontally using `margin-inline: auto`. Most useful with `maxWidth` set. |
| `paddingX` | `'none' \| 'gutter' \| 'card'` | `'none'` | No | Horizontal inner padding. `'gutter'` = 1.5rem, `'card'` = 1.5rem (different semantic intent, same resolved value). |
| `paddingY` | `'none' \| 'gutter' \| 'card' \| 'stack' \| 'section'` | `'none'` | No | Vertical inner padding. Range: `'gutter'` (1.5rem) to `'section'` (6rem). |
| `gap` | `'none' \| 'tag' \| 'card' \| 'stack' \| 'section'` | `'none'` | No | Gap between direct children. Range: `'tag'` (0.75rem) to `'section'` (6rem). |
| `direction` | `'column' \| 'row' \| 'row-wrap'` | `'column'` | No | Flex direction. `'row-wrap'` applies `flex-direction: row` with `flex-wrap: wrap`. |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | No | Cross-axis alignment (`align-items`). |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around'` | `'start'` | No | Main-axis distribution (`justify-content`). |
| `fullWidth` | `boolean` | `false` | No | Sets `width: 100%` on the wrapper. |
| `style` | `CSSProperties` | — | No | Additional inline styles. Merged last, overrides any computed style. |
| `className` | `string` | — | No | Additional class names for Tailwind utilities not expressible through the prop API. |
| `children` | `React.ReactNode` | — | No | Content to render inside the wrapper. |

## 7. Content guidelines

This component contains no human-authored copy — it is a layout and surface primitive with no text rendering.

## 8. Accessibility

**Keyboard navigation**
Wrapper has no interactive elements. Tab order follows DOM order of children. No keyboard shortcuts are introduced.

**Screen reader behavior**
The rendered HTML element determines the ARIA landmark. Using `as="section"` requires a heading inside for the `region` landmark to have an accessible name. `as="aside"` creates a `complementary` landmark. Using the default `as="div"` introduces no landmark. The `surface` prop has no effect on ARIA semantics.

**Color and contrast**
`surface="surface"` applies `--color-bg-surface` (#fafafa) as a background. Any text rendered on this surface must maintain at least 4.5:1 contrast against the surface background. `--color-text-body` (#171717 on #fafafa) meets WCAG AA. `--color-text-muted` (#666666 on #fafafa) should be verified at the specific font size used [NEEDS CONFIRMATION].

**Motion**
Wrapper applies no animation or transition.

**Touch / pointer**
Wrapper itself is not interactive. Child touch target sizes are the responsibility of child components.

**Known gaps**
The `surface="card"` border uses `var(--color-border)` which is a Tailwind alias. The underlying value resolves to `--color-border-subtle` (#f5f5f5), which is very low contrast against the `--color-bg-surface` (#fafafa) background. The 1px border at this color difference may be invisible for users with low contrast sensitivity. Consider using a stronger border token for `surface="card"`. [NEEDS CONFIRMATION — verify rendered contrast]

## 9. Design tokens

| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-bg-surface` | `#fafafa` (`--primitive-gray-50`) | `surface="surface"` and `surface="card"` background |
| `--color-border` | Alias for `--color-border-subtle` → `#f5f5f5` (`--primitive-gray-100`) | `surface="card"` border |
| `--radius-md` | Alias for `--primitive-radius-md` → `4px` | `surface="card"` border-radius |
| `--size-page-gutter` | `1.5rem` | `paddingX: 'gutter'`, `paddingY: 'gutter'` |
| `--size-card-padding` | `1.5rem` | `paddingX: 'card'`, `paddingY: 'card'` |
| `--size-stack-gap` | `2rem` | `gap: 'stack'`, `paddingY: 'stack'` |
| `--size-section-gap` | `6rem` | `gap: 'section'`, `paddingY: 'section'` |
| `--size-tag-gap` | `0.75rem` | `gap: 'tag'` |
| `--size-card-gap` | `1rem` | `gap: 'card'` |
| `--size-max-width` | `1280px` | `maxWidth: 'page'` |

## 10. Responsive behavior

Wrapper has no built-in breakpoint logic. `direction: 'row-wrap'` responds to available width by wrapping children. Padding and gap tokens do not change across breakpoints. For breakpoint-aware layouts, use Tailwind utilities via `className`.

## 11. Composition and usage patterns

**Centered card region**
Combine `surface="card"`, `maxWidth="page"`, `center`, `paddingX="card"`, `paddingY="card"`, `gap="stack"`, `direction="column"` for a constrained, padded card panel centered on the page (e.g., sign-in form, confirmation card).
Gotcha: ensure a heading is included if `as="section"` is used.

**Tonal background section**
Use `surface="surface"`, `paddingY="section"`, `paddingX="gutter"`, `fullWidth` to create an off-white background band across the full viewport — typically an alternating section on a marketing page.
Gotcha: do not use `surface="card"` here — the border and radius look wrong on a full-bleed band.

**Sidebar panel**
Use `as="aside"`, `surface="surface"`, `paddingX="card"`, `paddingY="card"`, `gap="stack"`, `direction="column"` to create a semantically correct, visually separated sidebar.
Gotcha: `as="aside"` creates a `complementary` landmark — it should contain content related to but distinct from the main content.

## 12. Related components

| Component | When to use it instead |
|---|---|
| [Container](/design-system/docs/container-zh) | When no background, border, or border-radius is needed — Container is identical in layout capability without the surface overhead |
| [ElegantCaseStudyCard](/design-system/docs/case-study-card-zh) / ElegantIconCard / ElegantReferralCard | When the card content has a specific, designed shape — those components manage their own surface and internal layout |
| [Modal](/design-system/docs/modal-zh) / [Drawer](/design-system/docs/drawer-sheet-zh) | When the surface needs to float above the page with an overlay and focus trap |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use `surface="card"` for discrete, self-contained content tiles (feature cards, pricing panels). | Use `surface="card"` for full-bleed page sections — the border and radius clip to the section edge awkwardly. |
| Use `surface="surface"` for alternating section backgrounds to create visual rhythm without heavy borders. | Use `surface="surface"` and `surface="card"` adjacent to each other without padding — the background colors are identical; the card won't visually separate from the section background. |
| Include `paddingX="card"` and `paddingY="card"` whenever `surface="card"` is used — a card with no inner padding looks broken. | Skip padding on a `surface="card"` wrapper and rely on child spacing to fill the gap — children won't clear the border edge. |
| Use `as="article"` when the wrapped content is independently redistributable (a blog post card, a case study summary). | Use `as="main"` inside another wrapper — only one `main` landmark is valid per page. |
| Use `center` with `maxWidth="page"` to constrain card panels on wide viewports. | Use `center` without `maxWidth` set — it has no visual effect when the container is already full-width. |
| Match the `gap` token to the type of children inside — `gap="tag"` for chips, `gap="card"` for small blocks, `gap="stack"` for major sections. | Use `gap="section"` (6rem) inside a card surface — it's designed for page-level vertical rhythm, not intra-card spacing. |

## 14. Changelog

**2026-04-27** — Replace invalid `--radius-md` with `--size-card-radius` and `--color-border` with `--color-border-subtle` in card surface variant
