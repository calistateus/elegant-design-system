# ElegantButtonGroup

`src/components/simple/ElegantButtonGroup.tsx`

## Summary
Renders 2–5 `ElegantButton` instances in a horizontal flex row. Context (`menu` / `default`) applies uniformly to all slots — mixing is not supported.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `context` | `'menu' \| 'default'` | — | Sizing context passed to every button. Required. |
| `count` | `2 \| 3 \| 4 \| 5` | — | How many buttons to render. Slices `buttons` array. Required. |
| `buttons` | `ButtonSlot[]` | — | Array of button configs. Must supply at least `count` items. Required. |

### `ButtonSlot`

| Field | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | — | Button label. |
| `style` | `'primary' \| 'secondary'` | `'secondary'` | Visual style of this slot. |
| `showIcon` | `boolean` | — | Whether to render the `icon`. |
| `icon` | `LucideIcon` | — | Icon to show when `showIcon` is true. |
| `onClick` | `() => void` | — | Click handler. |

## Layout
- `display: inline-flex`, `align-items: center`, `flex-wrap: wrap`
- Gap: `--size-btn-px-sm` in `menu` context, `--size-btn-px` in `default`

## Usage example
```tsx
<ElegantButtonGroup
  context="default"
  count={2}
  buttons={[
    { text: 'Save', style: 'primary', onClick: handleSave },
    { text: 'Cancel', style: 'secondary', onClick: handleCancel },
  ]}
/>
```

## Notes
- `count` acts as a hard cap — only the first `count` items from `buttons` are rendered.
- All buttons in the group share the same `context`; per-slot overrides are not possible.
