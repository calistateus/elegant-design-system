# ElegantAccordion

`src/components/simple/ElegantAccordion.tsx`

## Summary
Single-open accordion. Renders a list of expandable items; only one panel can be open at a time. Clicking an open header collapses it.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `AccordionItem[]` | — | Array of accordion entries. Required. |

### `AccordionItem`
```ts
{ heading: string; description: string }
```

## Structure
```
[outer container — border + radius]
  └── [item × n]
        ├── [trigger button — heading + chevron]
        └── [panel — max-height animated]
              └── [<p> description]
```

Items are separated by `border-top: 1px solid --primitive-gray-200` (first item has no top border).

## Animation
Panel collapse/expand via CSS `max-height`:
- Open: `max-height: 600px`
- Closed: `max-height: 0`
- Transition: `--primitive-duration-relaxed --primitive-easing-power2-out`
- `overflow: hidden` prevents content from leaking during transition

## Chevron
- Rotates 180° when open
- Transition: `--motion-dropdown-chevron`
- Colour: `--color-text-muted`

## Tokens used
- `--color-bg-surface` — outer container background
- `--size-card-radius` — outer container border radius
- `--color-border-subtle` — outer container border
- `--primitive-gray-200` — item separator
- `--size-card-padding` — trigger and panel content padding
- `--size-card-gap` — trigger internal gap (heading ↔ chevron)
- `--primitive-font-sans`
- `--primitive-font-size-base`, `--primitive-font-size-sm`
- `--primitive-font-weight-medium`, `--primitive-font-weight-regular`
- `--color-text-title`, `--color-text-body`, `--color-text-muted`
- `--primitive-duration-relaxed`, `--primitive-easing-power2-out`
- `--motion-dropdown-chevron`

## ARIA
- Trigger: `aria-expanded`, `aria-controls="accordion-panel-{i}"`, `id="accordion-trigger-{i}"`
- Panel: `role="region"`, `aria-labelledby="accordion-trigger-{i}"`

## Usage example
```tsx
<ElegantAccordion
  items={[
    { heading: 'What is a design token?', description: 'A named value that stores a design decision…' },
    { heading: 'How do I update tokens?', description: 'Edit globals.css and the JSON files in specs/tokens/…' },
  ]}
/>
```

## Notes
- `max-height: 600px` is a fixed cap — content taller than 600 px will be clipped. Increase if needed.
- `overflow: hidden` on panels prevents animated content from overflowing during transition.
