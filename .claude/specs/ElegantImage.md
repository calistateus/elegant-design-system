# ElegantImage

`src/components/simple/ElegantImage.tsx`

## Summary
Semantic image wrapper (`<figure>` + `<img>` + optional `<figcaption>`). Supports four width presets and six aspect ratios. When a ratio is set, `object-fit: cover` is applied.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Image URL. Required. |
| `alt` | `string` | — | Alt text. Required. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Max width of the figure. |
| `ratio` | `'auto' \| '1/1' \| '4/3' \| '3/2' \| '16/9' \| '21/9'` | `'auto'` | Aspect ratio applied via CSS `aspect-ratio`. |
| `caption` | `string` | — | Optional caption below the image. |
| `className` | `string` | `''` | Extra class on the `<figure>`. |

## Size map

| Value | Max width |
|---|---|
| `sm` | 320 px |
| `md` | 480 px |
| `lg` | 640 px |
| `full` | 100% |

## Ratio behaviour
- `ratio="auto"` — no `aspect-ratio` or `object-fit` set; image displays at its natural size.
- Any other value — `aspect-ratio` is set and `object-fit: cover` clips the image to fit.

## Tokens used
- `--primitive-radius-md` — image border radius
- `--color-bg-surface` — image background (visible during load)
- `--primitive-scale-2` — gap between image and caption
- `--primitive-font-sans`, `--primitive-font-size-xs`, `--primitive-font-weight-regular`
- `--color-text-muted` — caption colour

## Usage example
```tsx
<ElegantImage src="/work/case-study.jpg" alt="Dashboard redesign" size="lg" ratio="16/9" />
<ElegantImage src="/portrait.jpg" alt="Profile photo" size="sm" ratio="1/1" caption="London, 2024" />
```

## Notes
- `width: 100%` and `max-width: 100%` on the figure ensures responsiveness within any container.
- Caption inherits the figure's width.
