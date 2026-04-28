---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantImage.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantImage.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 4 (Variants): Only one story (`Default`) exists. The size and ratio combinations are controlled via args, not separate named stories — flag for expanding.
- Section 5 (States): No loading, error, or interactive states are implemented.
- Section 10 (Responsive behavior): Width breakpoints are derived from the Tailwind class values; the Tailwind `md` breakpoint is overridden to 600px and `lg` to 1136px in this design system — documented accordingly.

**Recommended follow-ups:**
- Add named stories for each `size` and each `ratio` for easier Storybook navigation and zeroheight embedding
- Consider adding an `onError` fallback image or skeleton to handle broken `src` URLs
- Verify whether `className` escape-hatch prop should be documented as stable API or flagged as internal

---

# Image

## 1. Overview
Image is a responsive content image component that wraps a native `<img>` in a semantic `<figure>`, applying a standardised aspect ratio, border radius, and optional caption — solving the problem of inconsistent image sizing and missing caption semantics across content areas.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Full-bleed or contained content photos in articles or case studies | User identity photos — use Avatar instead |
| Images that require a visible descriptive caption | Decorative icons or illustrations that carry no content meaning |
| Photos that should scale relative to the reading column width | Profile or avatar images that need circular clipping |
| Images where a consistent aspect ratio must be enforced | Images inside interactive cards where the parent handles overflow and radius |

## 3. Anatomy
1. **Figure wrapper** — `<figure>` element providing semantic grouping of the image and caption; applies the responsive width class and column gap.
2. **Image** — `<img>` element with `object-fit: cover` when a ratio is set; `height: auto` and no forced ratio when `ratio="auto"`.
3. **Caption** — `<figcaption>` rendered conditionally when `caption` prop is provided; uses muted, xs-sized sans-serif text.

`[STORYBOOK BLOCK: Simple/Assets/ElegantImage/Default]`

## 4. Variants
The component has no discrete visual variants in the stories file — all variation is controlled through `size` and `ratio` props within the single Default story. The meaningful combinations are:

**Size — sm**
- Mobile: full width; tablet (≥600px): 50% width; desktop (≥1136px): 33% width
- Use for supporting or supplementary images in wide layouts

**Size — md** (default)
- Mobile: full width; tablet: 75%; desktop: 50%
- Use for standard body images

**Size — lg**
- Mobile: full width; desktop: 67%
- Use for prominent single-image layouts

**Size — full**
- Always 100% of the containing column
- Use for hero-style or full-bleed images

**Ratio — auto**
- No `aspect-ratio` or `object-fit` applied; image renders at its native proportions
- Use when source image dimensions are reliable and must be preserved

**Ratio — 1/1, 4/3, 3/2, 16/9, 21/9**
- Enforces the chosen aspect ratio with `object-fit: cover`
- Use to enforce consistency across a grid of images with varying source dimensions

`[STORYBOOK BLOCK: Simple/Assets/ElegantImage/Default]`

## 5. States
**Default (image loaded)**
- Standard rendered state; image visible with radius and optional caption

**No image / broken src** [NEEDS CONFIRMATION]
- No explicit error state. The browser renders its native broken-image treatment. The `--color-bg-surface` background color on the `<img>` provides a visible fallback color behind the broken image area.

**With caption**
- `<figcaption>` renders below the image with `--primitive-scale-2` (0.5rem) gap

**Without caption**
- `<figcaption>` is omitted entirely from the DOM

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `src` | `string` | — | Yes | URL of the image to display |
| `alt` | `string` | — | Yes | Descriptive alt text; required for accessibility |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | No | Responsive width preset controlling column span |
| `ratio` | `'auto' \| '1/1' \| '4/3' \| '3/2' \| '16/9' \| '21/9'` | `'auto'` | No | Aspect ratio to enforce with `object-fit: cover`; `'auto'` preserves native proportions |
| `caption` | `string` | — | No | Optional caption text displayed below the image in a `<figcaption>` |
| `className` | `string` | `''` | No | Additional CSS class names appended to the `<figure>` element |

## 7. Content guidelines
- **`alt`**: Describe the content and context of the image, not its appearance. For decorative images with no content value, use `alt=""`. Never use "image of" or "photo of" as a prefix.
- **`caption`**: Write captions in sentence case. Keep to 1–2 short sentences. Captions supplement the image rather than repeating information already in surrounding body text.
- **Truncation**: Long captions are not truncated — no max-length is enforced. Keep captions concise to avoid visual imbalance.

## 8. Accessibility
- **Keyboard navigation**: Not interactive; not focusable.
- **Screen reader behavior**: The `<img>` `alt` attribute is the primary accessible description. The `<figure>` / `<figcaption>` semantic relationship is supported by modern screen readers — the figcaption is read after the image in browsing mode.
- **Color and contrast**: Caption uses `--color-text-muted` (#666666) on `--color-bg-main` (#ffffff) — approximately 4.6:1 (WCAG AA pass for normal text at this size).
- **Motion**: No animations.
- **Touch / pointer**: Not interactive.
- **Known gaps**: No `loading="lazy"` attribute; consider adding for performance on long pages.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--primitive-radius-md` | `4px` | Border radius on the `<img>` element |
| `--color-bg-surface` | `#fafafa` | Background color behind the image (visible during load or on broken src) |
| `--primitive-scale-2` | `0.5rem` | Gap between image and caption |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Caption font family |
| `--primitive-font-size-xs` | `0.75rem` | Caption font size |
| `--primitive-font-weight-regular` | `400` | Caption font weight |
| `--color-text-muted` | `#666666` | Caption text color |

## 10. Responsive behavior
Width adapts through Tailwind utility classes (breakpoints are design-system-overridden: `md` = 600px, `lg` = 1136px):

| Size | Mobile (<600px) | Tablet (≥600px) | Desktop (≥1136px) |
|---|---|---|---|
| `sm` | 100% | 50% | 33% |
| `md` | 100% | 75% | 50% |
| `lg` | 100% | 100% | 67% |
| `full` | 100% | 100% | 100% |

The image height adapts automatically (`height: auto`) unless a `ratio` is specified, in which case height is constrained by the aspect ratio regardless of breakpoint.

## 11. Composition and usage patterns
**Article body image**
Use `size="md"`, `ratio="16/9"`, and a descriptive caption for in-body images within case study or blog-style layouts.

**Full-width section image**
Use `size="full"`, `ratio="21/9"` for panoramic or hero-style images that should span the entire reading column.

**Image grid (managed by CardPack)**
Individual Image instances are not typically used in grids; CardPack handles layout. Use Image for single, contextual inline placements.

`[STORYBOOK BLOCK: Simple/Assets/ElegantImage/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| Avatar | User identity photos requiring circular clipping and size presets |
| CaseStudyCard | When the image is part of a card with title, description, and outcome — the card manages its own image slot |

## 13. Do's and don'ts
| Do | Don't |
|---|---|
| Always provide a meaningful `alt` attribute. | Use `alt=""` unless the image is genuinely decorative and all its content is conveyed elsewhere. |
| Specify a `ratio` whenever images come from user-generated content with unpredictable dimensions. | Use `ratio="auto"` for UGC images — the layout will shift unpredictably. |
| Use `size="full"` inside a layout grid column that already constrains the width. | Use `size="full"` directly inside body text without a column constraint — it will span the full viewport. |
| Keep captions to 1–2 concise sentences. | Duplicate body text verbatim in the caption. |
| Use `--primitive-radius-md` (4px) — this is applied automatically; do not override with inline styles. | Add custom `borderRadius` via `className` unless the component spec is being intentionally extended. |
| Choose `size="sm"` or `size="md"` for supplementary images alongside body text. | Use `size="lg"` or `size="full"` for small supporting illustrations — they will dominate the layout at larger breakpoints. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
