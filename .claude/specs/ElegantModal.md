# ElegantModal

`src/components/simple/ElegantModal.tsx`

## Summary
Overlay dialog. Rendered at the viewport level via `position: fixed`. Clicking the backdrop (or the close button) calls `onClose`. Accepts an optional `container` slot for any child component.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controls visibility. Required. |
| `heading` | `string` | — | H5 heading inside the panel. Required. |
| `description` | `string` | — | Optional supporting paragraph below the heading. |
| `container` | `React.ReactNode` | — | Optional slot for any child component (form, list, etc.). |
| `onClose` | `() => void` | — | Called when backdrop or close button is clicked. |

## Structure
```
[backdrop — full viewport]
  └── [panel — max 480px, centered]
        ├── [header row: heading + close button]
        ├── [description?]
        └── [container slot?]
```

## Tokens used
- `--color-overlay-scrim` — backdrop background
- `--color-bg-main` — panel background
- `--size-card-radius` — panel border radius
- `--size-card-padding` — panel padding
- `--color-border-subtle` — panel border
- `--size-heading-to-body` — gap between panel sections
- `--size-page-gutter` — backdrop padding (centering)
- `--primitive-scale-4` — header row gap
- `--type-h5-family`, `--type-h5-size`, `--type-h5-weight`, `--type-h5-line-height` — heading typography
- `--primitive-font-sans`, `--primitive-font-size-sm` — description
- `--color-text-title`, `--color-text-muted`
- `--primitive-duration-fast`, `--primitive-easing-default` — close button hover

## ARIA
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby="elegant-modal-heading"` on the backdrop div
- Close button: `aria-label="Close modal"`

## Close button
- Renders only when `onClose` is provided
- Icon: `X` 16 px, `strokeWidth={1.5}`
- Colour: `--color-text-muted` → `--color-text-body` on hover

## Usage example
```tsx
const [open, setOpen] = useState(false);

<ElegantModal
  open={open}
  heading="Confirm deletion"
  description="This action cannot be undone."
  onClose={() => setOpen(false)}
  container={
    <ElegantButtonGroup
      context="default"
      count={2}
      buttons={[
        { text: 'Delete', style: 'primary', onClick: handleDelete },
        { text: 'Cancel', style: 'secondary', onClick: () => setOpen(false) },
      ]}
    />
  }
/>
```

## Notes
- When `open` is `false`, returns `null` — no DOM node is mounted.
- **Focus trap is built in**: on open, focus moves to the panel; Tab and Shift+Tab cycle only through focusable elements inside the panel; focus returns to the previously focused element on close.
- **Escape key** calls `onClose` when provided.
- `onClick` propagation is stopped on the panel so clicks inside don't dismiss the modal.
