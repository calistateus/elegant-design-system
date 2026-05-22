# IconCard — Component Spec

## Location
`src/components/simple/IconCard.tsx`

## Purpose
Compact feature/capability card with a swappable icon, h5 heading, and body description.

## Props

| Prop          | Type          | Description                                        |
|---------------|---------------|----------------------------------------------------|
| `icon`        | `LucideIcon`  | Instance-swappable icon component (Lucide)         |
| `heading`     | `string`      | Card heading — rendered as `<h5>` (bold sans-serif) |
| `description` | `string`      | Body copy — rendered as `<p>` (body-small)         |

## Typography

| Element     | Token(s)                                                                   |
|-------------|----------------------------------------------------------------------------|
| `<h5>`      | `--type-h5-family`, `--type-h5-size`, `--type-h5-weight`, `--type-h5-line-height` |
| `<p>`       | `--primitive-font-sans`, `--primitive-font-size-sm`, weight regular, lh 1.5 |

### h5 token (new — added for this component)
```css
--type-h5-family: var(--primitive-font-sans);   /* DM Sans */
--type-h5-size:   var(--primitive-font-size-base); /* 1rem */
--type-h5-weight: var(--primitive-font-weight-bold); /* 700 */
--type-h5-line-height: 1.4;
```

## Colors
| Element   | Token                    |
|-----------|--------------------------|
| Icon      | `--color-text-accent`    |
| Heading   | `--color-text-title`     |
| Body      | `--color-text-body`      |
| Surface   | `--color-bg-surface`     |
| Border    | `--color-border-subtle`  |

## Spacing
| Role                | Token                    |
|---------------------|--------------------------|
| Card padding        | `--size-card-padding`    |
| Icon → text block   | `--size-heading-to-body` |
| Heading → body      | `--size-body-to-body`    |

## Variants (Storybook)
- `Default` — single story; icon is a `select` control mapped to `{ Zap, ShieldCheck, Star, ArrowRight, Globe, Lock }`
