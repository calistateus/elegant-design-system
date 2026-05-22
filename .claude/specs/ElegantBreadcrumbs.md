# ElegantBreadcrumbs

`src/components/simple/ElegantBreadcrumbs.tsx`

## Summary
Navigation trail of 2–5 labelled links. The last rendered item is treated as the current page (non-linked, `aria-current="page"`). Separator character is configurable.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `count` | `2 \| 3 \| 4 \| 5` | — | Number of crumbs to render. Slices `items`. Required. |
| `items` | `BreadcrumbItem[]` | — | Crumb configs in order (first = root). Required. |
| `separator` | `string` | `'/'` | Character rendered between crumbs. |
| `className` | `string` | `''` | Extra class on the `<nav>` element. |

### `BreadcrumbItem`
```ts
{ label: string; href: string }
```

## Structure
```
<nav aria-label="Breadcrumb">
  <ol>
    <li>[link]</li>
    <li>[separator] [link]</li>
    …
    <li>[separator] <span aria-current="page">current</span></li>
  </ol>
</nav>
```

## Styles

| Item | Colour | Weight |
|---|---|---|
| Ancestor links | `--color-text-muted` | regular |
| Ancestor link hover | `--color-text-body` | — |
| Current page | `--color-text-title` | medium |
| Separator | `--color-text-muted` | regular, `user-select: none` |

Link hover transition: `color --primitive-duration-fast --primitive-easing-default` (inline onMouseEnter/Leave).

## Tokens used
- `--primitive-font-sans`, `--primitive-font-size-sm`
- `--primitive-font-weight-regular`, `--primitive-font-weight-medium`
- `--color-text-muted`, `--color-text-body`, `--color-text-title`
- `--primitive-scale-2` — gap between crumbs and separators
- `--primitive-duration-fast`, `--primitive-easing-default`

## ARIA
- `<nav aria-label="Breadcrumb">`
- `<ol>` list (ordered — position matters)
- Current: `aria-current="page"` on the `<span>`
- Separator: `aria-hidden="true"`

## Usage example
```tsx
<ElegantBreadcrumbs
  count={3}
  items={[
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'Case Study', href: '/work/case-study' },
  ]}
/>
```

## Notes
- The `href` of the current (last) item is ignored — it renders as a `<span>`.
- `count` slices from the beginning; supply items in root-first order.
