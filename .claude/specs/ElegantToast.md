# ElegantToast

`src/components/simple/ElegantToast.tsx`

## Summary
Context-based toast notification system. Composed of three exports: `ToastProvider`, `useToast`, and the internal `ToastItem`. Wrap your app (or page) in `ToastProvider`, then call `toast(message, variant)` from any child.

## Exports

### `ToastProvider`
Wraps children with the context and renders the fixed-position viewport.

| Prop | Type | Description |
|---|---|---|
| `children` | `React.ReactNode` | Required. |

### `useToast()`
Returns `{ toast }`. Throws if called outside `<ToastProvider>`.

| Return | Type | Description |
|---|---|---|
| `toast` | `(message: string, variant?: ToastVariant) => void` | Fires a new notification. |

### `ToastVariant`
`'default' \| 'success' \| 'error'`

## Variant map

| Variant | Border | Icon | Icon colour |
|---|---|---|---|
| `default` | `--primitive-gray-200` | `Info` | `--color-text-body` |
| `success` | `--primitive-green-500` | `CheckCircle` | `--color-text-accent` |
| `error` | `--primitive-red-500` | `XCircle` | `--color-error-text` |

## Behaviour
- Auto-dismiss after **4 000 ms**
- Slide-in animation: `translateY(8px) → 0` + opacity fade
- On mobile (≤767 px): viewport moves to top-right corner and slides down (`translateY(-8px) → 0`)
- Dismiss button: `X` icon, hover transitions colour from muted → body

## Tokens used
- `--primitive-gray-200`, `--primitive-green-500`, `--primitive-red-500` — borders
- `--color-text-body`, `--color-text-accent`, `--color-error-text` — icon colours
- `--color-bg-main` — toast background
- `--primitive-radius-md`
- `--primitive-scale-2`, `--primitive-scale-3`, `--primitive-scale-4`, `--primitive-scale-6` — spacing
- `--primitive-duration-relaxed`, `--primitive-easing-power2-out` — enter/exit animation
- `--primitive-duration-fast`, `--primitive-easing-default` — dismiss button hover

## ARIA
- `role="alert"`, `aria-live="assertive"` on each `ToastItem`
- `aria-label="Notifications"` on the viewport container

## Viewport position (CSS classes)
- `.toast-viewport` — `bottom: --primitive-scale-6; right: --primitive-scale-6`
- Mobile: `top: --primitive-scale-6; left + right: --primitive-scale-6`

## Usage example
```tsx
// Layout
<ToastProvider>
  <App />
</ToastProvider>

// Inside a component
const { toast } = useToast();
toast('Saved successfully.', 'success');
toast('Something went wrong.', 'error');
toast('Review period opens Friday.');
```

## Notes
- Multiple toasts stack vertically with `--primitive-scale-2` gap.
- Exit transition: opacity/transform over 300 ms after `setVisible(false)`.
- `pointer-events: none` on the viewport container when no toasts are visible.
