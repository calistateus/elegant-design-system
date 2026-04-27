---
name: CardPack
description: Layout pattern that arranges Case Study, Icon, or Referral cards in a configurable grid.
---

# CardPack

A layout-only pattern that tiles existing card primitives into a responsive grid.

## Variants

| Prop | Values | Notes |
|---|---|---|
| `cardType` | `'case-study'` \| `'icon'` \| `'referral'` \| `'kpi'` | Selects which card primitive to render |
| `count` | `1`–`12` | Number of cards rendered. Sample data cycles from `content.ts` |
| `perRow` | `1`–`4` | Columns per row |
| `fillLastRow` | `boolean` (default `false`) | When `true`, leftover cards in the last row stretch to fill the row width. When `false`, leftover cards keep their original column width and the row ends with empty space |

## Layout math (fill mode)

Grid uses `repeat(perRow × leftover, 1fr)` columns when `fillLastRow` is `true` and `count % perRow !== 0`:

- Full-row cards span `leftover` columns each → `perRow × leftover` total per row.
- Last-row cards span `perRow` columns each → `leftover × perRow` total.

Both rows resolve to the same total column count, so the grid stays aligned.

When `fillLastRow` is `false` or `count` divides evenly into `perRow`, the grid uses the simpler `repeat(perRow, 1fr)`.

## Tokens

- Gap: `--size-card-gap`
- No internal padding — the pattern is a pure container.

## Data source

Pulls from `HOMEPAGE_CONTENT` in `src/data/content.ts`:
- `case-study` → `caseStudies`
- `icon` → `specialties.items` (icons resolved via Lucide name lookup)
- `referral` → `referrals.items`
- `kpi` → inline placeholder set inside `ElegantCardPack.tsx` (`PLACEHOLDER_KPIS`)

Items cycle when `count` exceeds the available array length.

## KPI overrides

Per-card overrides for `cardType: 'kpi'`:

| Field | Notes |
|---|---|
| `label` | Metric label, e.g. "Monthly Revenue" |
| `value` | Formatted value, e.g. "$24,500" |
| `delta` | Formatted change, e.g. "+12.3%" |
| `deltaDirection` | `'up'` \| `'down'` \| `'neutral'` — controls badge color and trend icon |
| `period` | Comparison context, e.g. "vs last month" |
| `icon` | Optional Lucide icon shown in the card header |
