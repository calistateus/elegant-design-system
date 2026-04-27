# ElegantCarousel

`src/components/simple/ElegantCarousel.tsx`

## Summary
Horizontal slide carousel with prev/next arrow buttons and dot pagination. Supports four card types, multi-slide views, and optional auto-advance.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `cardType` | `'case-study' \| 'icon' \| 'referral' \| 'image'` | — | Type of card to render in each slide. Required. |
| `count` | `number` | `4` | Number of slides to generate (2–8, clamped). |
| `slidesVisible` | `1 \| 2 \| 3 \| 4` | `1` | How many slides are visible at once. |
| `autoSlide` | `boolean` | `false` | Automatically advance slides. |
| `autoSlideInterval` | `number` | `4000` | Auto-advance interval in ms. |

## Card types
Each type uses the corresponding Elegant card component with built-in placeholder data:

| Type | Component | Data |
|---|---|---|
| `case-study` | `ElegantCaseStudyCard` | 3 placeholder studies (cycled) |
| `icon` | `ElegantIconCard` | 4 placeholder specialties (cycled) |
| `referral` | `ElegantReferralCard` | 3 placeholder referrals (cycled) |
| `image` | `<img>` | `imagePath` from case study placeholders |

## Slide layout
- `translateX(-(currentIndex × slideWidthPct)%)` — CSS transform on a flex row
- `slideWidthPct = 100 / slidesVisible` — each slide is `flex: 0 0 {pct}%`
- Gap between slides: `calc(--size-card-gap / 2)` on left/right of inner slides
- Transition: `transform --primitive-duration-relaxed --primitive-easing-power2-out`

## Navigation
- Arrows visible only when `slides.length > slidesVisible`
- `goPrev`/`goNext` wrap around (circular)
- `maxIndex = slides.length - slidesVisible`

## Arrow buttons
- 36 × 36 px, circular, `border: 1px solid --color-border-subtle`, `background: --color-bg-main`
- Hover: `opacity: 1`, `box-shadow: 0 2px 8px rgba(0,0,0,0.10)`

## Dot pagination
- Shown when `dotCount > 1` (`dotCount = maxIndex + 1`)
- Active dot: `width: 1.25rem`, `background: --color-text-body`
- Inactive dot: `width: 0.5rem`, `background: --color-border-subtle`
- Width transitions via `--primitive-duration-base --primitive-easing-power2-out`
- `role="tablist"`, `aria-label="Carousel navigation"`; dots: `role="tab"`, `aria-selected`, `aria-label="Go to slide {i+1}"`

## Auto-slide
- `setInterval(goNext, autoSlideInterval)` — resets on `maxIndex` change
- Only runs when `slides.length > slidesVisible`

## Tokens used
- `--size-card-gap` — arrow row gap and slide gaps
- `--color-border-subtle` — arrow border, inactive dot
- `--color-bg-main` — arrow background
- `--color-text-body` — active dot
- `--primitive-radius-full` — dot border radius
- `--primitive-duration-relaxed`, `--primitive-easing-power2-out` — slide transition
- `--primitive-duration-fast`, `--primitive-easing-default` — arrow hover
- `--primitive-duration-base`, `--primitive-easing-power2-out` — dot width transition
- `--size-heading-to-body` — margin-top of dot row

## Usage example
```tsx
<ElegantCarousel cardType="case-study" count={3} />
<ElegantCarousel cardType="referral" count={4} slidesVisible={2} autoSlide autoSlideInterval={5000} />
```

## Notes
- Placeholder data cycles — `count > source.length` repeats items.
- `count` is clamped to `[2, 8]`.
- `currentIndex` is clamped to `[0, maxIndex]` when `maxIndex` changes.
