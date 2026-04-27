# ElegantButton

`src/components/simple/ElegantButton.tsx`

## Summary
A single clickable button. Supports two visual styles (`primary` / `secondary`) and two size contexts (`default` / `menu`). Optionally renders a Lucide icon to the right of the label.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | — | Button label. Required. |
| `style` | `'primary' \| 'secondary'` | `'primary'` | `primary` — filled pill. `secondary` — ghost/text-only. |
| `context` | `'default' \| 'menu'` | `'default'` | `menu` uses compact padding (`--size-btn-py-sm / --size-btn-px-sm`) and smaller text (`xs`). |
| `icon` | `LucideIcon` | — | Optional icon rendered after the label. 16 px in `default`, 12 px in `menu`. |
| `onClick` | `() => void` | — | Click handler. |
| `className` | `string` | `''` | Extra class passed to the `<button>` element. |

## Variants

### `primary` (default)
- Background: `--color-interactive-primary-bg`
- Text: `--color-interactive-primary-fg`
- Border: `1px solid --color-interactive-primary-bg`
- Hover: background → `--primitive-white`, text → `--color-interactive-primary-bg`, scale 1.05 (not in `menu` context)

### `secondary`
- No background or border
- Text: `--color-text-body` (`default`) or `--color-text-muted` (`menu`)
- Hover: text → `--color-interactive-primary-bg`, scale 1.05 (not in `menu` context)

## Tokens used
- `--size-btn-py`, `--size-btn-px` — default padding
- `--size-btn-py-sm`, `--size-btn-px-sm` — menu padding
- `--size-btn-icon-gap`, `--size-btn-icon-gap-sm` — gap between text and icon
- `--size-btn-radius` — border radius
- `--primitive-font-sans`
- `--primitive-font-size-base` / `--primitive-font-size-xs`
- `--primitive-font-weight-medium` / `--primitive-font-weight-regular`
- `--primitive-white`
- `--color-interactive-primary-bg`, `--color-interactive-primary-fg`
- `--color-text-body`, `--color-text-muted`

## Behaviour
- Transition: `background-color 150ms ease, color 150ms ease, transform 150ms ease`
- Scale-up hover only applies in `default` context

## Usage example
```tsx
<ElegantButton text="Get started" style="primary" icon={ArrowRight} />
<ElegantButton text="Learn more" style="secondary" />
<ElegantButton text="View" style="secondary" context="menu" icon={ExternalLink} />
```

## Notes
- Does not handle `disabled` state — add via `className` + CSS or wrap in a `<fieldset disabled>` inside a form.
- The `context` prop controls sizing only; style and context are independent.
