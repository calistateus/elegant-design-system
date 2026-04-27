# ElegantCardPack

`src/components/simple/ElegantCardPack.tsx`

## Summary
Responsive grid of 1–12 cards. Three card types: `case-study`, `icon`, `referral`. Per-row count is configurable (1–4), with optional last-row stretch. Each card slot can be overridden or falls back to built-in placeholder data.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `cardType` | `'case-study' \| 'icon' \| 'referral'` | — | Card component to render. Required. |
| `count` | `number` | — | Number of cards (1–12, clamped). Required. |
| `perRow` | `1 \| 2 \| 3 \| 4` | — | Cards per row on desktop (≥1024 px). Required. |
| `fillLastRow` | `boolean` | `false` | When true, leftover cards in the final row stretch to fill it. |
| `showAvatar` | `boolean` | `false` | `referral` type only — shows the avatar slot on each card. |
| `overrides` | `CardOverride[]` | — | Per-card content overrides indexed by position. Falls back to placeholder. |

### `CardOverride`
All fields optional. Merges over placeholder data at the matching index.

| Field | Used by | Description |
|---|---|---|
| `tags` | case-study | Comma-separated tag string → split into array |
| `title` | case-study | Card title |
| `description` | case-study, icon | Body text |
| `outcome` | case-study | Outcome line |
| `image` | case-study (imagePath), referral (avatarPath) | Image URL |
| `heading` | icon | Card heading |
| `icon` | icon | Lucide icon component |
| `quote` | referral | Quote text |
| `name` | referral | Attributee name |
| `role` | referral | Attributee role |

## Grid behaviour
- Mobile (< 768 px): 1 column
- Tablet (768–1023 px): `min(2, perRow)` columns
- Desktop (≥1024 px): `perRow` columns

When `fillLastRow` is true and there are leftover cards: `desktopCols = perRow × leftover` with each full-row card spanning `leftover` columns and each leftover card spanning `perRow` columns.

## Tokens used
- `--size-card-gap` — grid gap
- (Card-specific tokens via `ElegantCaseStudyCard`, `ElegantIconCard`, `ElegantReferralCard`)

## Usage example
```tsx
// 3-up icon grid, content from placeholder data
<ElegantCardPack cardType="icon" count={3} perRow={3} />

// 2-up case study grid with overrides
<ElegantCardPack
  cardType="case-study"
  count={2}
  perRow={2}
  overrides={[
    { title: 'My Project', tags: 'UX, Research', outcome: '+30% retention' },
    { title: 'Another Project', tags: 'Systems' },
  ]}
/>

// Referral row with avatars
<ElegantCardPack cardType="referral" count={3} perRow={3} showAvatar />
```

## Notes
- `count` is clamped to `[1, 12]`; `perRow` to `[1, 4]`.
- Placeholder data cycles — if `count > placeholders.length`, items repeat.
- Each card is wrapped in a `<div>` for grid layout; the card component itself controls its own styling.
