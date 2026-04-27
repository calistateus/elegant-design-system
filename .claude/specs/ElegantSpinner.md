# ElegantSpinner

`src/components/simple/ElegantSpinner.tsx`

## Summary
Animated loading indicator. Renders a circular CSS spinner via `border` and `animation`. Three sizes available.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls diameter and border width. |
| `className` | `string` | `''` | Extra class forwarded to the root `<span>`. |

## Size map

| Size | Dimension (token) | Border width |
|---|---|---|
| `sm` | `--primitive-scale-4` (1 rem) | 2 px |
| `md` | `--primitive-scale-6` (1.5 rem) | 2 px |
| `lg` | `--primitive-scale-10` (2.5 rem) | 3 px |

## Tokens used
- `--primitive-scale-4`, `--primitive-scale-6`, `--primitive-scale-10` — dimensions
- `--color-progress-track` — base ring colour
- `--color-text-body` — animated segment (top border)
- CSS animation: `spinner-rotate 700ms linear infinite` — must be defined in `globals.css`

## ARIA
- `role="status"`, `aria-label="Loading"`

## Usage example
```tsx
<ElegantSpinner />
<ElegantSpinner size="sm" />
<ElegantSpinner size="lg" />
```

## Notes
- `flexShrink: 0` prevents squishing inside flex parents.
- The `spinner-rotate` keyframe (`@keyframes spinner-rotate { to { transform: rotate(360deg); } }`) must exist in `globals.css`.
