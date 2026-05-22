# ElegantLinearProgress

`src/components/simple/ElegantLinearProgress.tsx`

## Summary
Step-based progress bar. Supports horizontal (label top/bottom) and vertical orientations. The `bottom` placement can optionally render a primary `ElegantButton` alongside the label row.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `steps` | `number` | — | Total number of steps. Required. |
| `currentStep` | `number` | — | Active step (1-based, clamped to `0–steps`). Required. |
| `showStepCount` | `boolean` | `false` | Shows a `currentStep/steps` counter in mono font. |
| `heading` | `string` | — | Label above/beside the track. Omit to hide. |
| `placement` | `'top' \| 'bottom' \| 'vertical'` | `'top'` | Where the label row sits relative to the track. |
| `showButton` | `boolean` | `false` | Shows an action button (bottom placement only). |
| `buttonLabel` | `string` | `'Next'` | Label for the action button. |
| `onButtonClick` | `() => void` | — | Handler for the action button. |

## Placements

| Value | Layout |
|---|---|
| `top` | Label row → horizontal track |
| `bottom` | Horizontal track → label row (button on right when `showButton`) |
| `vertical` | Vertical track → label column (side by side) |

## Fill calculation
`fillPercent = (clamp(currentStep, 0, steps) / steps) * 100`

## Tokens used
- `--size-progress-track-height` — track thickness
- `--size-progress-track-length` — vertical track height
- `--size-btn-radius` — track border radius
- `--color-progress-track` — unfilled track background
- `--color-text-accent` — filled bar colour
- `--size-heading-to-body` — gap between label and track
- `--size-card-gap` — gap in vertical layout
- `--size-label-to-description` — gap between heading and step count
- `--primitive-font-sans`, `--primitive-font-mono`
- `--primitive-font-size-sm`, `--primitive-font-size-xs`
- `--primitive-font-weight-medium`
- `--color-text-body`, `--color-text-muted`

## ARIA
- Track `<div>` carries `role="progressbar"`, `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={100}`

## Usage example
```tsx
<ElegantLinearProgress steps={5} currentStep={3} heading="Profile setup" showStepCount />
<ElegantLinearProgress steps={5} currentStep={2} placement="bottom" showButton onButtonClick={goNext} />
<ElegantLinearProgress steps={4} currentStep={1} placement="vertical" heading="Step 1 of 4" />
```

## Notes
- `showButton` only has effect when `placement="bottom"`.
- The button uses `ElegantButton` with `style="primary"` and `context="menu"` with an `ArrowRight` icon.
