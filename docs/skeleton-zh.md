---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/feedback/ElegantSkeleton.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantSkeleton.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): The shimmer animation runs unconditionally. There is no "loaded" or "idle" state — removal from the DOM is the only way to dismiss a skeleton. [NEEDS CONFIRMATION: is a `loading` prop or conditional render pattern expected?]
- Section 8 (Accessibility): `aria-busy="true"` is set on the wrapper span but there is no corresponding `aria-label` on single-block (non-multiline) skeletons in all branches — confirmed in source: single-block branch does have `aria-label="Loading…"`. Correct.
- Section 13: Last line of a multi-line text skeleton is auto-shortened to 70% width — this is a hardcoded behaviour, not configurable.

**Recommended follow-ups:**
- The last-line shortening (70%) is hardcoded. Consider exposing a `lastLineWidth` prop for flexibility.
- No story for `variant="circle"` combined with a text skeleton side-by-side (common avatar + name pattern) — a dedicated story would be useful.
- The `lines` prop is only meaningful for `variant="text"` — runtime behaviour when `lines > 1` on `rect` or `circle` is that `lines` is silently ignored. Consider a console warning.

---

# Skeleton

## 1. Overview
A shimmering placeholder that mirrors the shape of content still loading, preserving spatial layout and reducing perceived wait time while real data fetches.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| A content region (cards, lists, profile panels) is loading and you know its approximate shape | When content loads in under ~300 ms — a flash of skeleton before real content is more jarring than the load itself |
| An avatar, image, or card is fetching and you want to prevent layout shift | When progress is quantifiable — use a progress bar so users can gauge remaining time |
| A multi-paragraph text block is loading and you want to convey approximate line count | For entire page transitions — a full-page spinner or route-level loading state is simpler |

## 3. Anatomy
1. **Wrapper span** — An `aria-busy="true"` `aria-label="Loading…"` `<span>` that contains one or more skeleton blocks. Rendered as `display: block` for single blocks or `display: flex; flex-direction: column` for multiline text.
2. **Skeleton block** — An `aria-hidden="true"` `<span>` with a shimmer gradient animation. Shape is controlled by `borderRadius` derived from the active variant. The shimmer gradient moves from right to left over 1.6 s.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantSkeleton/Text]`

## 4. Variants

**Text**
- `borderRadius` uses `--size-skeleton-radius` (2px) — a subtle rounding that mimics a text line.
- Default height is `1em`, inheriting from the surrounding type scale.
- When `lines > 1`, multiple blocks are stacked with `--size-body-to-body` gap; the last line is automatically narrowed to 70% of the specified width to mimic the natural ragged end of a paragraph.
- Use for body copy, headings, labels, or any inline text content.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantSkeleton/Text]`

`[STORYBOOK BLOCK: Simple/Feedback/ElegantSkeleton/TextMultiline]`

**Circle**
- `borderRadius` is `50%` — produces a perfect circle.
- Default height is `3rem`. Width and height must be set to the same value for a true circle.
- Use for avatar placeholders, user icons, or any circular UI element.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantSkeleton/Circle]`

**Rect**
- `borderRadius` uses `--size-card-radius` (4px) — matches the standard card corner radius.
- Default height is `8rem`.
- Use for image thumbnails, card hero areas, chart placeholders, or any rectangular block content.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantSkeleton/Rect]`

## 5. States
**Loading (default / only state)**
- The shimmer gradient (`--color-skeleton-base` → `--color-skeleton-highlight` → `--color-skeleton-base`) animates over `backgroundPosition` at 1.6 s ease-in-out infinitely (`skeleton-shimmer` keyframe).
- There is no "loaded" state. Remove the Skeleton component from the DOM (conditional render) when real content is ready.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'text' \| 'circle' \| 'rect'` | `'text'` | No | Controls the border radius and default height of the skeleton block. |
| `width` | `string \| number` | `'100%'` | No | CSS width value. Numbers are interpreted as pixels. |
| `height` | `string \| number` | Per-variant default (text: `1em`, rect: `8rem`, circle: `3rem`) | No | CSS height value. Numbers are interpreted as pixels. |
| `lines` | `number` | `1` | No | Number of stacked text-line blocks. Only used when `variant="text"`. |

## 7. Content guidelines
No human-authored copy is rendered in this component. The only text surface is the hardcoded `aria-label="Loading…"` on the wrapper span, which is screen-reader-only. The ellipsis in "Loading…" is intentional and standard.

## 8. Accessibility
- **Keyboard navigation:** Skeleton blocks are not focusable and have no keyboard interaction.
- **Screen reader behavior:** The wrapper `<span>` has `aria-busy="true"` and `aria-label="Loading…"`, causing screen readers to announce "Loading" when the element appears. Individual skeleton blocks are marked `aria-hidden="true"` so the shimmer shapes are not traversed by AT. When content is ready and the Skeleton is replaced by real content, AT will naturally move to the real content.
- **Color and contrast:** The shimmer uses `--color-skeleton-base` (`#e5e5e5`) and `--color-skeleton-highlight` (`#f5f5f5`). Both are decorative — no text is present, so WCAG text contrast requirements do not apply. The visual distinction is sufficient for sighted users in light mode. [NEEDS CONFIRMATION: dark mode is not defined in the current token set.]
- **Motion (`prefers-reduced-motion`):** The `skeleton-shimmer` keyframe has no `prefers-reduced-motion` override. Users who prefer reduced motion will still see the animated shimmer. Recommend adding a `@media (prefers-reduced-motion: reduce)` rule to stop the animation.
- **Touch/pointer targets:** Non-interactive; no tap target requirement.
- **Known gaps:** No `prefers-reduced-motion` support. Dark mode tokens not defined.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-skeleton-base` | `var(--primitive-gray-200)` → `#e5e5e5` | Shimmer gradient base colour (25% and 75% stops) |
| `--color-skeleton-highlight` | `var(--primitive-gray-100)` → `#f5f5f5` | Shimmer gradient highlight colour (50% stop) |
| `--size-skeleton-radius` | `var(--primitive-radius-sm)` → `2px` | Border radius for `variant="text"` |
| `--size-card-radius` | `var(--primitive-radius-md)` → `4px` | Border radius for `variant="rect"` |
| `--size-body-to-body` | `var(--primitive-scale-2)` → `0.5rem` | Gap between stacked text lines (`lines > 1`) |
| `--motion-skeleton-duration` | `1.6s` | Duration of one shimmer cycle (referenced as token; applied via keyframe) |
| `--motion-skeleton-easing` | `ease-in-out` | Easing of the shimmer animation (referenced as token; applied via keyframe) |

## 10. Responsive behavior
The Skeleton has no built-in responsive breakpoints. `width="100%"` (the default) causes the block to fill its containing column, making it naturally responsive. For fixed-size shapes (circle, fixed-width rect), the consumer must manage sizing via the `width` and `height` props. The `lines` prop layout is always vertical — no horizontal reflow occurs.

## 11. Composition and usage patterns
**Card layout skeleton**
Compose a circle (avatar), two text lines (name + subtitle), a rect (hero image), and a 3-line text block (body) inside a card shell to mirror a real content card during load.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantSkeleton/CardLayout]`

When building a card skeleton:
1. Match the `width` and `height` of each Skeleton block to the rendered dimensions of the real content it replaces.
2. Use the same `gap` token (`--size-card-gap`) inside the skeleton as in the real card so the layout is identical.
3. Replace the entire skeleton with real content at once (not piece by piece) to avoid a jarring partial-reveal.

**Gotcha:** `lines > 1` on `variant="rect"` or `variant="circle"` is silently ignored — only one block is rendered. Pass `lines` only for `variant="text"`.

## 12. Related components
| Component | When to use it instead |
|---|---|
| [Spinner](/design-system/docs/spinner-zh) | When content shape is unknown or when a small inline loading indicator is sufficient |
| [Linear Progress](/design-system/docs/linear-progress-zh) | When file upload or step-based progress is quantifiable and you want the user to see how much remains |
| [Circular Progress](/design-system/docs/circular-progress-zh) | When a compact percentage indicator is more appropriate than a full skeleton |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Size each Skeleton block to closely match the real content it replaces — height, width, and corner radius all contribute to the believability of the placeholder. | Use a single full-width rect as a skeleton for complex multi-element layouts — it gives users no spatial preview of the incoming content. |
| Use `variant="circle"` with explicit equal `width` and `height` values (e.g., `width="2.5rem" height="2.5rem"`) for avatar placeholders. | Set `width` and `height` to different values for `variant="circle"` — you'll get an ellipse instead of a circle. |
| Conditionally render Skeleton components (`{isLoading && <ElegantSkeleton />}`) and replace them with real content when data arrives. | Keep Skeleton in the DOM and toggle visibility — the shimmer animation will continue consuming GPU resources. |
| Use `lines={3}` or more for paragraph body text placeholders to convey approximate text density. | Use `lines` with `variant="rect"` or `variant="circle"` — it has no effect. |
| Mirror the exact gap values used in the real layout (e.g., `--size-card-gap`) when composing multiple Skeleton blocks inside a container. | Mix Skeleton placeholders with real content in the same container — reveal the real content only once all data is ready. |
| Add `aria-busy` to the parent container of multiple skeletons to give screen readers a single "loading" region to track. | Rely solely on the inner `aria-busy` for complex multi-card loading — the AT may not associate individual skeletons with their eventual replacements. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
