# ElegantBadge

`src/components/simple/ElegantBadge.tsx`

## Summary
Inline label chip used for tags, statuses, and categories. Eight semantic colour variants. Optionally renders a Lucide icon before the label text.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Badge text. Required. |
| `icon` | `LucideIcon` | — | Optional 10 px icon rendered before the label. |
| `color` | `BadgeColor` | `'neutral'` | Colour variant. |
| `ariaLabel` | `string` | — | Accessible name for icon-only badges (when `label` is `""`). Always set this when `label` is empty so the icon name is announced by screen readers. |

### `BadgeColor` values
`'neutral' \| 'red' \| 'green' \| 'blue' \| 'yellow' \| 'purple' \| 'white' \| 'black'`

## Token mapping

Each colour maps to three semantic tokens:

| Slot | Token pattern |
|---|---|
| Background | `--color-badge-{color}-bg` |
| Border | `--color-badge-{color}-border` |
| Text | `--color-badge-{color}-text` |

Additional tokens:
- `--primitive-scale-1` — icon gap and vertical padding
- `--primitive-scale-2` — horizontal padding
- `--size-badge-radius` — border radius
- `--primitive-font-size-xs`
- `--primitive-font-weight-regular`

## Usage example
```tsx
<ElegantBadge label="Design Systems" />
<ElegantBadge label="In Progress" color="yellow" />
<ElegantBadge label="Shipped" color="green" icon={CheckCircle} />
<ElegantBadge label="Deprecated" color="red" />
```

## Notes
- No interactive state — badge is display-only.
- Icon is always 10 px with `strokeWidth={1.5}`.
- Suitable for inline use inside card headers, tables, and tag lists.
