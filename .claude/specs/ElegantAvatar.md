# ElegantAvatar

`src/components/simple/ElegantAvatar.tsx`

## Summary
Circular avatar element. Renders a cover-fit `<img>` when a `src` is provided; falls back to a dashed-border placeholder with an `ImagePlus` icon.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Image URL. When absent, shows the upload placeholder. |
| `alt` | `string` | `''` | Alt text for the `<img>`. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset: `sm` = 32 px, `md` = 40 px, `lg` = 48 px. |

## States

| State | Appearance |
|---|---|
| With image | Circular `<img>` with `object-fit: cover` |
| Placeholder | Dashed border (`--color-border-subtle`), `ImagePlus` icon at `--color-text-muted` |

## Tokens used
- `--primitive-scale-12` — default size (3 rem / 48 px)
- `--color-border-subtle` — dashed placeholder border
- `--color-bg-main` — background colour
- `--color-text-muted` — placeholder icon colour

## Usage example
```tsx
<ElegantAvatar src="/team/alex.jpg" alt="Alex Rivera" />
<ElegantAvatar size="var(--primitive-scale-10)" />
```

## Notes
- `flexShrink: 0` is set internally so the avatar never squishes inside flex parents.
- Used inside `ElegantReferralCard` for the `showAvatar` slot.
- Used inside `ElegantAvatarGroup` where the size is fixed by the group.

## Usage example
```tsx
<ElegantAvatar src="/team/alex.jpg" alt="Alex Rivera" size="md" />
<ElegantAvatar size="sm" />
```
