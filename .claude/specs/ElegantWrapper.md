# ElegantWrapper

`src/components/simple/ElegantWrapper.tsx`

## Summary
Composition container for grouping any configuration of Elegant components. Provides surface treatment, token-based spacing, and flex layout. Use this as the outermost shell whenever two or more Elegant components need to share a common layout context, background, or padding.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `WrapperElement` | `'div'` | HTML element to render. Use semantic elements (`section`, `article`, etc.) where appropriate. |
| `surface` | `'none' \| 'surface' \| 'card'` | `'none'` | Background and border treatment. See Surface values below. |
| `maxWidth` | `'page' \| 'full'` | — | Constrains width. `'page'` = `--size-max-width` (1280px). |
| `center` | `boolean` | `false` | Centers horizontally with `margin-inline: auto`. |
| `paddingX` | `'none' \| 'gutter' \| 'card'` | `'none'` | Horizontal inner padding. |
| `paddingY` | `'none' \| 'gutter' \| 'card' \| 'stack' \| 'section'` | `'none'` | Vertical inner padding. |
| `gap` | `'none' \| 'tag' \| 'card' \| 'stack' \| 'section'` | `'none'` | Gap between direct children. |
| `direction` | `'column' \| 'row' \| 'row-wrap'` | `'column'` | Flex direction. `row-wrap` enables wrapping. |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Cross-axis alignment. |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around'` | `'start'` | Main-axis justification. |
| `fullWidth` | `boolean` | `false` | Sets `width: 100%`. |
| `style` | `CSSProperties` | — | Escape hatch for one-off inline styles. Only use tokens. |
| `className` | `string` | — | Additional class names. |
| `children` | `ReactNode` | — | Any Elegant components or HTML elements. |

### Surface values

| Value | Background | Border | Radius |
|---|---|---|---|
| `none` | transparent | — | — |
| `surface` | `--color-bg-surface` | — | — |
| `card` | `--color-bg-surface` | `1px solid --color-border` | `--radius-md` |

## Tokens used
- `--color-bg-surface`, `--color-border`, `--radius-md` — surface treatment
- `--size-page-gutter`, `--size-card-padding` — paddingX options
- `--size-page-gutter`, `--size-card-padding`, `--size-stack-gap`, `--size-section-gap` — paddingY options
- `--size-tag-gap`, `--size-card-gap`, `--size-stack-gap`, `--size-section-gap` — gap options
- `--size-max-width` — page-width constraint

## Usage examples

```tsx
// Page section with standard vertical rhythm
<ElegantWrapper as="section" paddingY="section" gap="stack">
  <ElegantDivider />
  <ElegantCardPack cardType="icon" count={4} perRow={2} />
</ElegantWrapper>

// Card surface grouping a form and its header
<ElegantWrapper surface="card" paddingX="card" paddingY="card" gap="stack">
  <ElegantTextInput label="Name" />
  <ElegantButton text="Submit" style="primary" />
</ElegantWrapper>

// Centered page column
<ElegantWrapper maxWidth="page" center paddingX="gutter" gap="section">
  <ElegantTopNav items={navItems} />
  <ElegantCardPack cardType="case-study" count={3} perRow={3} />
</ElegantWrapper>

// Horizontal row of badges
<ElegantWrapper direction="row-wrap" gap="tag" align="center">
  {tags.map(tag => <ElegantBadge key={tag} label={tag} />)}
</ElegantWrapper>
```

---

## Wrapper conventions

> This section grows as new composition patterns are established.

### What can go inside a wrapper

Any component from `src/components/simple/` can be a direct child. No component is excluded by convention. Mixed child types (cards, inputs, nav, feedback) are allowed when the wrapper's semantic element reflects the group's purpose.

### One wrapper per layout concern

Each wrapper should own exactly one layout concern: spacing, surface, or width constraint. Nest wrappers when more than one concern is needed — do not pile all props onto a single wrapper.

```tsx
// Correct — outer wrapper owns width+centering, inner owns surface+padding
<ElegantWrapper maxWidth="page" center>
  <ElegantWrapper surface="card" paddingX="card" paddingY="card" gap="stack">
    ...
  </ElegantWrapper>
</ElegantWrapper>

// Avoid — one wrapper doing too much
<ElegantWrapper maxWidth="page" center surface="card" paddingX="card" paddingY="card" gap="stack">
  ...
</ElegantWrapper>
```

### Semantic element selection

| Content | Recommended `as` |
|---|---|
| Top-level page region | `main` |
| Standalone content unit | `article` |
| Thematic grouping with heading | `section` |
| Supporting content | `aside` |
| Navigation links | `nav` |
| Grouping without semantic meaning | `div` (default) |

### Spacing scale guidance

| Use case | Recommended gap/paddingY |
|---|---|
| Tags or inline chips | `tag` |
| Cards in a grid row | `card` |
| Form fields or stacked content blocks | `stack` |
| Major page sections | `section` |

### Token-only styling

All `style` overrides must use CSS variable references — never raw values. If a needed token does not exist in `globals.css`, add it there first.

```tsx
// Correct
<ElegantWrapper style={{ borderRadius: 'var(--radius-full)' }}>

// Avoid
<ElegantWrapper style={{ borderRadius: '999px' }}>
```

### No layout logic in children

Children must not set their own `margin` to create separation from siblings. All inter-child spacing is the wrapper's responsibility via `gap`. Children may set their own `padding` for internal spacing only.
