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
| `liveRegion` | `'polite' \| 'assertive'` | `'polite'` | Controls `aria-live` urgency. Use `'assertive'` for errors that demand immediate attention. |

## Variant map

| Variant | Border | Icon | Icon colour |
|---|---|---|---|
| `info` | `--color-info-border` | `Info` | `--color-text-muted` |
| `success` | `--color-text-accent` | `CheckCircle` | `--color-text-accent` |
| `error` | `--color-error-text` | `XCircle` | `--color-error-text` |

## Tokens used
- `--color-info-border` — info variant border
- `--color-text-accent` — success variant border and icon
- `--color-error-text` — error variant border and icon
- `--color-text-muted`, `--color-text-body` — text and icon colours
- `--color-bg-surface` — background
- `--size-notification-padding` — container padding
- `--size-notification-gap` — gap between icon, body, dismiss
- `--size-notification-radius` — border radius
- `--primitive-font-size-sm`
- `--primitive-font-weight-bold`, `--primitive-font-weight-regular`
- `--motion-interactive-color` — dismiss button hover transition

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
