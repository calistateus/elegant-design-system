# ElegantCaseStudyCard

`src/components/simple/ElegantCaseStudyCard.tsx`

## Summary
Work/portfolio card with a 16:9 image slot, tag row, serif H3 title, body description, and accent-coloured outcome line. Image zooms on hover via GSAP.

## Props

| Prop | Type | Description |
|---|---|---|
| `data` | `CaseStudy` | Card data object. Required. |

### `CaseStudy`
```ts
interface CaseStudy {
  id: string;
  tags: string[];   // Rendered as uppercase xs labels
  title: string;    // Serif H3
  description: string;
  outcome: string;  // Accent-coloured footer line
  imagePath: string; // Empty string → upload placeholder
}
```

## Structure
```
<article>
  [image slot — 16:9, overflow hidden]
  [content area — padding: --size-card-padding]
    [tags row]
    [h3 title]
    [description]
    [outcome]
</article>
```

## Image states

| State | Appearance |
|---|---|
| `imagePath` set | `background-image` div, `background-size: cover` |
| `imagePath` empty | Dashed border placeholder with `ImagePlus` icon + "Upload image" label |

GSAP hover: `scale(1.05)` on enter, `scale(1)` on leave, `duration: 0.35`, `ease: 'power2.out'` / `'power2.inOut'`.

## Typography

| Element | Font | Size | Weight | Colour |
|---|---|---|---|---|
| Tags | sans | xs | regular | muted, uppercase, letter-spacing 0.1em |
| Title (h3) | serif | 2xl | regular | title, letter-spacing −0.02em |
| Description | sans | sm | regular | body |
| Outcome | sans | sm | regular | accent |

## Tokens used
- `--color-bg-surface`, `--color-border-subtle` — card container
- `--size-card-radius`, `--size-card-padding`
- `--size-tag-gap` — tags row gap
- `--size-heading-to-sub` — tag row bottom margin
- `--size-heading-to-body` — title bottom margin
- `--size-body-to-body` — description bottom margin
- `--primitive-font-serif`, `--primitive-font-sans`
- `--primitive-font-size-xs`, `--primitive-font-size-sm`, `--primitive-font-size-2xl`
- `--primitive-font-weight-regular`
- `--color-text-muted`, `--color-text-title`, `--color-text-body`, `--color-text-accent`
- `--color-bg-main` — placeholder background

## Usage example
```tsx
<ElegantCaseStudyCard
  data={{
    id: 'cs-1',
    tags: ['UX Design', 'Research'],
    title: 'Redesigning the Core Onboarding Flow',
    description: 'Led a cross-functional team to simplify key steps...',
    outcome: '+42% completion rate in post-launch tracking.',
    imagePath: '/work/onboarding.jpg',
  }}
/>
```

## Notes
- `imagePath` is rendered as a CSS `background-image` — not an `<img>` — so it has no `alt` text by default (`aria-hidden="true"` on the div).
- GSAP animation only fires when `imagePath` is non-empty.
