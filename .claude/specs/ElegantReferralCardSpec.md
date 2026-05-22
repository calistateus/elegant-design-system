# ReferralCard — Component Spec

## Location
`src/components/simple/ReferralCard.tsx`

## Purpose
Testimonial card with a decorative quotation mark, serif quote text, and a small circular avatar with attribution.

## Props

| Prop         | Type      | Default | Description                                       |
|--------------|-----------|---------|---------------------------------------------------|
| `quote`      | `string`  | —       | Testimonial body — rendered as `<blockquote> > <p>` |
| `name`       | `string`  | —       | Referrer name — rendered as bold `<p>`            |
| `title`      | `string`  | —       | Referrer title/company — rendered as muted `<p>` |
| `showAvatar` | `boolean` | `false` | Shows a circular upload slot next to attribution  |

## Layout
```
[figure — relative]
  [span — absolute, decorative] large light-gray opening quotation mark
  [blockquote — relative] quote text (padded top to clear mark)
  [figcaption] attribution row
    [div — 48×48 circle, dashed border] upload slot (only when showAvatar=true)
      [ImagePlus icon]
    [div]
      [p] name
      [p] title
```

## Typography

| Element  | Token(s)                                                                      |
|----------|-------------------------------------------------------------------------------|
| Quote    | `--type-quote-family`, `--type-quote-size`, `--type-quote-weight`, `--type-quote-line-height`, `fontStyle: italic` |
| Name     | `--primitive-font-sans`, `--primitive-font-size-sm`, `--primitive-font-weight-bold` |
| Title    | `--primitive-font-sans`, `--primitive-font-size-xs`, `--primitive-font-weight-regular` |

### quote token (new — added for this component)
```css
--type-quote-family: var(--primitive-font-serif);   /* Lora */
--type-quote-size:   var(--primitive-font-size-xl);  /* 1.25rem */
--type-quote-weight: var(--primitive-font-weight-regular); /* 400 */
--type-quote-line-height: 1.6;
```

## Colors
| Element         | Token                    |
|-----------------|--------------------------|
| Quote text      | `--color-text-body`      |
| Name            | `--color-text-title`     |
| Title           | `--color-text-muted`     |
| Quotation mark  | `--primitive-gray-300`   |
| Surface         | `--color-bg-surface`     |
| Border          | `--color-border-subtle`  |

## Spacing
| Role              | Token                     |
|-------------------|---------------------------|
| Card padding      | `--size-card-padding`     |
| Quote → attribution | `--size-heading-to-body` |
| Avatar → text     | `--size-heading-to-sub`   |
| Avatar size       | `--primitive-scale-12` (3rem / 48px) |

## Storybook Variants
- `Default` — single story; `showAvatar` is a boolean control
