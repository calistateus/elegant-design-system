# ElegantAlert

`src/components/simple/ElegantAlert.tsx`

## Summary
Inline contextual alert banner. Three semantic variants (`info`, `success`, `error`). Supports an optional title, a dismiss button, and toggling the leading icon.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'info' \| 'success' \| 'error'` | `'info'` | Semantic colour variant. |
| `message` | `string` | — | Body text. Required. |
| `title` | `string` | — | Optional bold title above the message. |
| `onDismiss` | `() => void` | — | When provided, renders an `X` dismiss button. |
| `showIcon` | `boolean` | `true` | Whether to render the leading icon. |

## Variant map

| Variant | Border | Icon | Icon colour |
|---|---|---|---|
| `info` | `--primitive-gray-300` | `Info` | `--color-text-muted` |
| `success` | `--primitive-green-500` | `CheckCircle` | `--color-text-accent` |
| `error` | `--primitive-red-500` | `XCircle` | `--color-error-text` |

## Tokens used
- `--primitive-gray-300`, `--primitive-green-500`, `--primitive-red-500` — borders
- `--color-text-muted`, `--color-text-accent`, `--color-error-text` — icon colours
- `--color-bg-surface` — background
- `--primitive-radius-md`
- `--primitive-scale-3`, `--primitive-scale-4` — padding
- `--primitive-font-sans`
- `--primitive-font-size-sm`
- `--primitive-font-weight-bold`, `--primitive-font-weight-regular`
- `--color-text-body`, `--color-text-muted`

## ARIA
- `role="alert"` on the root element

## Dismiss button
- Renders only when `onDismiss` is provided
- Icon: `X` 14 px
- Colour: `--color-text-muted` → `--color-text-body` on hover
- Transition: `color --primitive-duration-fast`

## Usage example
```tsx
<ElegantAlert variant="success" message="Your changes have been saved." />
<ElegantAlert variant="error" title="Upload failed" message="Please check your file size." onDismiss={() => setShowAlert(false)} />
<ElegantAlert variant="info" message="Review period opens Friday." showIcon={false} />
```
