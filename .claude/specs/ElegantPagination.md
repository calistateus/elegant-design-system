# ElegantPagination

`src/components/simple/ElegantPagination.tsx`

## Summary
Horizontal page navigation with prev/next arrow buttons, numbered page buttons, and ellipsis overflow for long ranges. Configurable sibling window.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `totalPages` | `number` | — | Total number of pages. Required. |
| `currentPage` | `number` | — | Active page (1-based). Required. |
| `onPageChange` | `(page: number) => void` | — | Called when a page button is clicked. Required. |
| `siblings` | `number` | `1` | Number of page buttons shown on each side of the current page. |
| `className` | `string` | `''` | Extra class on the `<nav>`. |

## Page range algorithm
- Flush-left when `currentPage ≤ windowSize + 1`
- Flush-right when `currentPage ≥ total - windowSize`
- Centred otherwise
- `windowSize = 2 × siblings + 1`
- Page 1 and `totalPages` always rendered; ellipsis fills gaps

## Button styles

### Prev / Next arrows
- 32 × 32 px, `border: 1px solid --primitive-gray-200`, `border-radius: --primitive-radius-md`
- Enabled: `--color-text-body`; disabled: `--primitive-gray-300`, `cursor: default`
- Hover (enabled): border → `--primitive-gray-400`, colour → `--color-text-title`

### Page number buttons
- `min-width: --primitive-scale-8`, `height: --primitive-scale-8`
- Active: `background: --color-interactive-primary-bg`, `color: --color-interactive-primary-fg`, `border: 1px solid --primitive-black`, medium weight, `cursor: default`
- Hover (inactive): border → `--primitive-gray-200`, colour → `--color-text-title`
- Inactive: transparent border, `--color-text-body`, regular weight

### Ellipsis
- Matching dimensions, `--color-text-muted`, `aria-hidden="true"`

## Tokens used
- `--primitive-gray-200`, `--primitive-gray-300`, `--primitive-gray-400`, `--primitive-black`
- `--primitive-radius-md`
- `--primitive-scale-1`, `--primitive-scale-2`, `--primitive-scale-8`
- `--primitive-font-sans`, `--primitive-font-size-sm`
- `--primitive-font-weight-medium`, `--primitive-font-weight-regular`
- `--color-text-body`, `--color-text-title`, `--color-text-muted`
- `--color-interactive-primary-bg`, `--color-interactive-primary-fg`
- `--primitive-duration-fast`, `--primitive-easing-default`

## ARIA
- `<nav aria-label="Pagination">`
- Prev: `aria-label="Previous page"`, `disabled`
- Next: `aria-label="Next page"`, `disabled`
- Page: `aria-label="Page {n}"`, `aria-current="page"` on active

## Usage example
```tsx
<ElegantPagination
  totalPages={10}
  currentPage={page}
  onPageChange={setPage}
  siblings={1}
/>
```
