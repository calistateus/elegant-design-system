# ElegantTooltip

`src/components/simple/ElegantTooltip.tsx`

## Summary
Hover-triggered tooltip that wraps any child element. Content appears in a styled bubble with a directional arrow. Visibility is controlled by mouse enter/leave on the wrapper.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `string` | — | Tooltip text. Required. |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Side of the trigger the bubble appears on. |
| `children` | `React.ReactNode` | — | The element that triggers the tooltip. Required. |

## Positioning
Gap between trigger and bubble: `calc(--primitive-scale-2 + 3px)`.

| Position | Bubble anchor | Transform |
|---|---|---|
| `top` | `bottom: 100% + gap, left: 50%` | `translateX(-50%)` |
| `bottom` | `top: 100% + gap, left: 50%` | `translateX(-50%)` |
| `left` | `right: 100% + gap, top: 50%` | `translateY(-50%)` |
| `right` | `left: 100% + gap, top: 50%` | `translateY(-50%)` |

The 6 × 6 px arrow is a rotated square (`rotate(45deg)`) absolutely positioned at the bubble's near edge.

## Tokens used
- `--color-interactive-primary-bg` — bubble background and arrow fill
- `--color-interactive-primary-fg` — bubble text
- `--primitive-font-sans`
- `--primitive-font-size-xs`
- `--primitive-font-weight-regular`
- `--size-btn-radius` — bubble border radius
- `--primitive-scale-2`, `--primitive-scale-3` — bubble padding
- `--primitive-duration-fast`, `--primitive-easing-default` — fade transition

## ARIA
- `role="tooltip"` on the bubble; `aria-hidden={!visible}`

## Usage example
```tsx
<ElegantTooltip content="Copy to clipboard" position="top">
  <button>Copy</button>
</ElegantTooltip>

<ElegantTooltip content="Opens in a new tab" position="right">
  <a href="/docs">Docs</a>
</ElegantTooltip>
```

## Notes
- Tooltip is `pointer-events: none` — it cannot be hovered directly.
- Long strings are rendered `white-space: nowrap`; wrap content in a span if you need multi-line.
- `z-index: 100` — sits above most content but below modals (`z-index: 50` overlay).
