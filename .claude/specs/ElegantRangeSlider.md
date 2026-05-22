# ElegantRangeSlider

`src/components/simple/ElegantRangeSlider.tsx`

## Summary
Drag-and-click range slider with a numeric stepper control. Supports both controlled and uncontrolled modes. Keyboard navigable. Shows a portal error toast when a typed stepper value is out of range.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | — | Controlled value. |
| `onChange` | `(value: number) => void` | — | Change handler. |
| `min` | `number` | `0` | Minimum value. |
| `max` | `number` | `100` | Maximum value. |
| `step` | `number` | `1` | Step increment. |
| `label` | `string` | `'Label'` | Label text. |
| `showLabel` | `boolean` | `true` | Whether to render the label and stepper. |
| `description` | `string` | `'Drag the knob or use the stepper.'` | Helper text. |
| `showDescription` | `boolean` | `true` | Whether to render the description. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `id` | `string` | auto (`useId`) | Explicit id. |

## Controlled vs uncontrolled
- **Controlled** (`value` provided): reads from prop.
- **Uncontrolled** (no `value`): internal `useState`, initialised to `clampAndStep(value ?? min)`.

## Stepper control
A `[−] value [+]` group rendered top-right when `showLabel=true`:
- Click and hold `−`/`+` repeats the step at 60 ms after a 400 ms initial delay
- Typing a value in the text field: commits on blur or Enter; shows error toast if out of range (value is clamped)
- Text input: `type="text"`, `inputMode="numeric"`, hides native spinners

## Track + knob
- Track: 4 px high, `--color-progress-track` background
- Fill: `--color-interactive-primary-bg`, `width: {percent}%`
- Knob: 18 × 18 px circle, white with `--primitive-gray-300` border
- Knob focus ring: `0 0 0 3px --primitive-gray-200`
- Clicking track snaps directly to click position
- Touch events supported (`touchmove`, `touchend`)

## Keyboard (on knob)
| Key | Action |
|---|---|
| `←` / `↓` | −1 step |
| `→` / `↑` | +1 step |
| `PageDown` / `PageUp` | ±10% of range |
| `Home` / `End` | min / max |

## Error toast
Rendered via `createPortal` to `document.body`. Slides down from top-center. Auto-dismisses after 4 000 ms. `role="alert"`, `aria-live="assertive"`.

## Tokens used
- `--color-progress-track` — track background
- `--color-interactive-primary-bg` — fill colour
- `--primitive-white`, `--primitive-gray-300`, `--primitive-gray-200` — knob
- `--primitive-radius-full` — track and fill border radius
- `--primitive-scale-1` through `--primitive-scale-3` — spacing
- `--primitive-font-sans`, `--primitive-font-size-sm`, `--primitive-font-size-xs`
- `--primitive-font-weight-medium`, `--primitive-font-weight-regular`
- `--color-text-title`, `--color-text-body`, `--color-text-muted`, `--color-error-text`
- `--primitive-duration-fast`, `--primitive-easing-default` — fill/knob animation
- `--primitive-red-500` — error toast border

## ARIA
- Knob: `role="slider"`, `aria-labelledby`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`, `aria-disabled`
- Stepper group: `role="group"`, `aria-label="{label} stepper"`

## Usage example
```tsx
<ElegantRangeSlider
  label="Budget"
  value={budget}
  onChange={setBudget}
  min={0}
  max={10000}
  step={100}
/>
```
