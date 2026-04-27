---
name: Button
description: Dual-style (primary/secondary) button with context-aware sizing and optional right arrow.
type: component
path: src/components/simple/Button.tsx
---

## Properties

| Prop        | Type                        | Default     | Description                          |
|-------------|-----------------------------|-------------|--------------------------------------|
| `text`      | `string`                    | —           | Button label                         |
| `style`     | `'primary' \| 'secondary'`  | `'primary'` | Visual style                         |
| `rightArrow`| `boolean`                   | `false`     | Appends ArrowRight Lucide icon        |
| `context`   | `'menu' \| 'main'`          | `'main'`    | Size context (menu = smaller)        |
| `onClick`   | `() => void`                | —           | Click handler                        |

## Style Rules

### Primary
- Background: `#111111` (primitive.black)
- Text: `#FFFFFF`
- Radius: `4px` (sizing.primitive.radius.md)
- Hover: opacity 0.85 + scale 1.05

### Secondary
- No background, no border, no padding — renders as inline text
- Text: `gray.900` (main context) / `gray.600` (menu context)
- Hover (main): text → `black` + opacity 0.85 + scale 1.05
- Hover (menu): text → `black` only, no scale/opacity

### Context Sizing

| Context | Font Size | Icon Size | Padding          |
|---------|-----------|-----------|------------------|
| `main`  | 1rem      | 16px      | 0.5rem 1rem      |
| `menu`  | 0.75rem   | 12px      | 0.25rem 0.75rem  |

## Token Sources
- Colors: `context/tokens/color-tokens.json`
- Typography: `context/tokens/typography-tokens.json`
- Sizing: `context/tokens/sizing-tokens.json`
