# ElegantCircularProgress

`src/components/simple/ElegantCircularProgress.tsx`

## Summary
SVG-based circular progress ring with two variants: `percentage` (0–100 value) and `steps` (currentStep / steps). The numeric display appears inside the circle for `lg`, and outside for `sm`/`md`. An optional text label is always placed outside, with configurable placement (top / right / bottom / left).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'percentage' \| 'steps'` | — | Required. Controls fill calculation and numeric display. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Outer diameter via semantic size token. |
| `value` | `number` | — | `percentage` variant only. Progress value 0–100. |
| `showValue` | `boolean` | `false` | `percentage` variant only. Show the `72%` text. |
| `steps` | `number` | — | `steps` variant only. Total step count. |
| `currentStep` | `number` | — | `steps` variant only. Current step (1-based, clamped). |
| `showStepCount` | `boolean` | `false` | `steps` variant only. Show `3/7` counter. |
| `label` | `string` | — | Optional description text placed outside the circle. |
| `labelPlacement` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | Where outside content sits relative to the circle. |
| `className` | `string` | `''` | Forwarded to the root element. |

## Size map

| Size | Token | Value |
|---|---|---|
| `sm` | `--size-circular-progress-sm` | 3 rem (48 px) |
| `md` | `--size-circular-progress-md` | 5 rem (80 px) |
| `lg` | `--size-circular-progress-lg` | 8 rem (128 px) |

## Numeric display placement

| Size | Where value text renders |
|---|---|
| `lg` | Inside the SVG via `<text>` element |
| `sm`, `md` | Outside the circle in the label area |

## Label placement layout

| `labelPlacement` | Flex direction | Order |
|---|---|---|
| `right` | `row` | circle → content |
| `left` | `row` | content → circle |
| `bottom` | `column` | circle → content |
| `top` | `column` | content → circle |

When there is no outside content (no value text + no label), the wrapper is omitted and only the bare `<svg>` renders.

## SVG geometry

- viewBox: `0 0 100 100`
- cx / cy: `50 50`; r: `44`; stroke-width: `8`
- Circumference: `2π × 44 ≈ 276.46`
- Offset: `circumference × (1 − fillPercent / 100)`
- Arc starts at 12 o'clock via `transform="rotate(-90 50 50)"`
- Inside label font sizes: sm=24, md=18, lg=13 (SVG user units)

## Fill calculation

- `percentage`: `clamp(value, 0, 100)`
- `steps`: `clamp(currentStep, 0, steps) / steps × 100`

## Tokens used

- `--size-circular-progress-sm/md/lg` — outer diameter
- `--color-progress-track` — track ring
- `--color-text-accent` — fill arc
- `--color-text-body` — numeric text (inside + outside)
- `--color-text-muted` — label description text
- `--primitive-font-mono` — numeric text family
- `--primitive-font-sans` — label text family
- `--primitive-font-size-base` — outside numeric font size
- `--primitive-font-size-sm` — label font size
- `--primitive-font-weight-medium` — numeric font weight
- `--primitive-duration-relaxed` — fill arc transition
- `--primitive-easing-power2-out` — fill arc easing
- `--size-card-gap` — gap between circle and outside content
- `--size-label-to-description` — gap between value and label text

## ARIA

Root `<svg>` carries `role="progressbar"`, `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={100}`, `aria-label` (auto-generated from variant).

## Stories

| Story | variant | Notable args |
|---|---|---|
| `Percentage` | `percentage` | value=72, showValue=true, label="Profile complete" |
| `Steps` | `steps` | steps=7, currentStep=3, showStepCount=true, label="Onboarding" |

## Usage

```tsx
// Percentage
<ElegantCircularProgress variant="percentage" value={72} showValue label="Profile complete" />

// Steps
<ElegantCircularProgress variant="steps" steps={7} currentStep={3} showStepCount label="Onboarding" labelPlacement="bottom" />

// Circle only — no label
<ElegantCircularProgress variant="percentage" value={50} size="sm" />
```
