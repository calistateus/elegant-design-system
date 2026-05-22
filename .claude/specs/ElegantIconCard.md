# ElegantIconCard

`src/components/simple/ElegantIconCard.tsx`

## Summary
Feature/benefit card with a Lucide icon, H5 heading, and body paragraph. Typically used in specialty/services grids.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `LucideIcon` | — | Lucide icon rendered at 24 px. Required. |
| `heading` | `string` | — | Card heading (H5). Required. |
| `description` | `string` | — | Supporting body text. Required. |

## Structure
```
[card container]
  ├── [Icon — 24px, accent colour]
  └── [text group]
        ├── [h5 heading]
        └── [p description]
```

## Tokens used
- `--color-bg-surface` — card background
- `--size-card-radius` — card border radius
- `--color-border-subtle` — card border
- `--size-card-padding` — card padding
- `--size-heading-to-body` — gap between icon and text group
- `--size-body-to-body` — gap between heading and description
- `--color-text-accent` — icon colour
- `--type-h5-family`, `--type-h5-size`, `--type-h5-weight`, `--type-h5-line-height` — heading
- `--primitive-font-sans`, `--primitive-font-size-sm`, `--primitive-font-weight-regular`
- `--color-text-title`, `--color-text-body`

## Icon
- Size: 24 px, `strokeWidth={1.5}`
- Colour: `--color-text-accent`
- `aria-hidden="true"`

## Usage example
```tsx
<ElegantIconCard
  icon={Layers}
  heading="Design Systems"
  description="Building scalable component libraries focused on adoption and token architecture."
/>
```

## Notes
- No interactive state — purely display.
- Used as a slide type in `ElegantCarousel` (type `'icon'`) and as a grid card type in `ElegantCardPack`.
