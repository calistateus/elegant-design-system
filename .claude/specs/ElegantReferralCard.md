# ElegantReferralCard

`src/components/simple/ElegantReferralCard.tsx`

## Summary
Testimonial/referral card with a decorative quotation mark, italic quote text, and attribution (name + title). Optional circular avatar slot.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `quote` | `string` | — | Testimonial text. Required. |
| `name` | `string` | — | Attributee's name. Required. |
| `title` | `string` | — | Attributee's role/organisation. Required. |
| `showAvatar` | `boolean` | `false` | Whether to render the `ElegantAvatar` slot. |
| `avatarPath` | `string` | — | Image URL for the avatar. Falls back to placeholder when absent. |

## Structure
```
<figure>
  [decorative " — absolute positioned]
  <blockquote>
    <p> quote text </p>
  </blockquote>
  <figcaption>
    [ElegantAvatar?]
    [name + title stack]
  </figcaption>
</figure>
```

## Decorative quote mark
- Absolutely positioned top-left
- Font: `--primitive-font-mono`, size `--primitive-font-size-display`, weight regular
- Colour: `--primitive-gray-300`
- `aria-hidden="true"`, `user-select: none`, `pointer-events: none`

## Quote typography
- Font: `--type-quote-family`, size `--type-quote-size`, weight `--type-quote-weight`
- Line height: `--type-quote-line-height`, font-style: italic
- Colour: `--color-text-body`
- `text-indent: --primitive-scale-10` (offsets the decorative mark)

## Attribution
- Name: `sm`, bold, `--color-text-title`
- Title: `xs`, regular, `--color-text-muted`
- Flexed row with `--size-heading-to-sub` gap
- `margin-top: auto` — pushes attribution to the card bottom (alignment across rows)

## Tokens used
- `--color-bg-surface`, `--color-border-subtle` — card container
- `--size-card-radius`, `--size-card-padding`, `--size-heading-to-body`, `--size-heading-to-sub`
- `--primitive-font-mono`, `--primitive-font-size-display`, `--primitive-gray-300`
- `--type-quote-family`, `--type-quote-size`, `--type-quote-weight`, `--type-quote-line-height`
- `--primitive-scale-10` — quote indent
- `--primitive-font-sans`, `--primitive-font-size-sm`, `--primitive-font-size-xs`
- `--primitive-font-weight-bold`, `--primitive-font-weight-regular`
- `--color-text-body`, `--color-text-title`, `--color-text-muted`

## Usage example
```tsx
<ElegantReferralCard
  quote="Reliable and genuinely collaborative. The quality raised the bar for everyone."
  name="Jordan Lee"
  title="Engineering Lead, Vertex Labs"
  showAvatar
  avatarPath="/team/jordan.jpg"
/>
```
