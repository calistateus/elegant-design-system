# ElegantDivider

`src/components/simple/ElegantDivider.tsx`

## Summary
Visual separator between content sections. Renders a horizontal `<hr>` by default, a labelled divider with flanking lines when `label` is provided, or a vertical 1 px line when `orientation="vertical"`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction of the divider. |
| `label` | `string` | — | Optional text centred between two lines (horizontal only). |
| `className` | `string` | `''` | Extra class forwarded to the root element. |

## Variants

### Horizontal — plain
`<hr>` with `border-top: 1px solid --color-border-subtle`.

### Horizontal — labelled
Flex row: `[line] label [line]`. Gap of `--primitive-scale-4`. Label style: `xs`, regular weight, `--color-text-muted`.

### Vertical
1 px wide, `align-self: stretch` — fills the height of its flex parent.

## Tokens used
- `--color-border-subtle` — line colour
- `--primitive-scale-4` — gap between line and label
- `--primitive-font-sans`
- `--primitive-font-size-xs`
- `--primitive-font-weight-regular`
- `--color-text-muted`

## ARIA
- `role="separator"` on all variants
- `aria-orientation` reflects the `orientation` prop

## Usage example
```tsx
<ElegantDivider />
<ElegantDivider label="or" />
<ElegantDivider orientation="vertical" />
```

## Notes
- Vertical divider needs a flex parent to stretch correctly.
- Does not render a label in vertical mode — `label` prop is ignored.
