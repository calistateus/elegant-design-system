# ElegantTabs

`src/components/simple/ElegantTabs.tsx`

## Summary
Self-contained tab component — manages both the tab strip and the associated content panel.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tabStyle` | `'underlined' \| 'contained'` | `'underlined'` | Visual style. |
| `count` | `2 \| 3 \| 4 \| 5` | — | Number of tabs. Slices `tabs`. Required. |
| `tabs` | `ContentSlot[]` | — | Tab + content configs. Required. |
| `defaultActiveIndex` | `number` | `0` | Initially active tab (zero-based). |
| `onTabChange` | `(index: number) => void` | — | Called when a tab is selected. |
| `className` | `string` | `''` | Extra class on the outer wrapper. |

### `ContentSlot`
```ts
{ label: string; content: ReactNode }
```

## Styles

### `underlined`
- Strip: `border-bottom: 1px solid --color-border-subtle`
- Content area: `padding: --size-card-padding` (no border)

### `contained`
- Strip: row of bordered tabs above the content panel
- Active tab: erases its bottom border (`border-bottom: 1px solid --color-bg-main`) and `margin-bottom: -1px` to visually connect to the panel
- First/last tab: `border-top-left-radius: --primitive-radius-sm` / `border-top-right-radius`
- Content panel: left + right + bottom border `--color-border-subtle`, `border-bottom-radius: --primitive-radius-md`, white background

## Tab styles
- Active: `--color-text-title`, medium weight
- Hovered: `--color-text-body`
- Inactive: `--color-text-muted`
- Truncate with ellipsis

## Content area tokens
- `--size-card-padding` — padding
- `--primitive-font-sans`, `--primitive-font-size-sm`
- `--color-text-body`, line-height 1.6

## ARIA
- Strip: `role="tablist"`, `aria-label="Tabs"`
- Tabs: `role="tab"`, `aria-selected`, `tabIndex`

## Usage example
```tsx
<ElegantTabs
  count={3}
  tabs={[
    { label: 'Overview', content: <OverviewSection /> },
    { label: 'Details', content: <DetailsSection /> },
    { label: 'History', content: <HistorySection /> },
  ]}
  tabStyle="contained"
/>
```
