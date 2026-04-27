# ElegantWheelPicker

`src/components/simple/ElegantWheelPicker.tsx`

## Summary
iOS-style scroll wheel picker. Supports multiple columns (e.g. hours + minutes). Each column is an independently scrollable drum with scroll-snap. Optional label, description, and error state.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `WheelColumn[]` | — | One or more scroll drums. Required. |
| `label` | `string` | `'Select'` | Label above the picker. |
| `showLabel` | `boolean` | `true` | Whether to render the label. |
| `description` | `string` | `'Scroll to select a value.'` | Helper text. |
| `showDescription` | `boolean` | `true` | Whether to render the description. |
| `error` | `string` | `'Error message.'` | Error text. |
| `showError` | `boolean` | `false` | Whether to display the error. |
| `disabled` | `boolean` | `false` | Disables all columns. |
| `visibleCount` | `number` | `3` | Number of items visible (must be odd). Controls drum height. |
| `itemHeight` | `number` | `40` | Height of each row in px. |
| `columnWidth` | `number` | `72` | Width of each column drum in px. |

### `WheelColumn`
```ts
{
  items: string[];        // All options
  value: number;          // Selected index
  onChange: (index: number) => void;
  label?: string;         // Optional column header
}
```

## Drum mechanics
- `scrollSnapType: 'y mandatory'` on the drum scroll container
- Each item: `scrollSnapAlign: 'center'`
- `padding-top / padding-bottom: halfCount × itemHeight` so first/last items can centre
- Debounced `handleScroll` (120 ms) rounds `scrollTop / itemHeight` to the nearest index
- Keyboard: `↑`/`↓` arrows advance/retreat by 1 index
- External `value` change: smooth-scrolls to the new position

## Overlays
- Selection highlight: `background: --primitive-gray-100`, `border-top/bottom: 1px solid --primitive-gray-200`, `z-index: 1`
- Top fade: white gradient, `z-index: 3`
- Bottom fade: white gradient, `z-index: 3`
- Drum text: `z-index: 2` (renders between highlight and fade)

## Item opacity
- Selected (distance 0): opacity 1
- Adjacent (distance 1): opacity 0.5
- Further: opacity 0.25

## Tokens used
- `--primitive-gray-300`, `--primitive-gray-200`, `--primitive-gray-100` — borders and highlight
- `--color-error-border` — shell border when error
- `--primitive-white` — background and fade overlays
- `--primitive-radius-md` — shell border radius
- `--primitive-scale-1`, `--primitive-scale-2` — header padding
- `--primitive-font-sans`, `--primitive-font-size-sm`, `--primitive-font-size-xs`
- `--primitive-font-weight-medium`, `--primitive-font-weight-regular`
- `--color-text-title`, `--color-text-muted`, `--color-text-body`
- `--primitive-duration-base`, `--primitive-easing-default` — item opacity transition

## ARIA
- Drum: `role="listbox"`, `tabIndex`
- Items: `role="option"`, `aria-selected`

## Usage example
```tsx
const [hour, setHour] = useState(0);
const [minute, setMinute] = useState(0);

<ElegantWheelPicker
  label="Select time"
  columns={[
    { items: Array.from({ length: 12 }, (_, i) => String(i + 1)), value: hour, onChange: setHour, label: 'HH' },
    { items: Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')), value: minute, onChange: setMinute, label: 'MM' },
  ]}
/>
```
