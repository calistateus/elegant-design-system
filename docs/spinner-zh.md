---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/feedback/ElegantSpinner.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantSpinner.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): The spinner has no internal state changes beyond spinning — hover/focus/disabled states are not implemented in the component. Flagged as N/A.
- Section 8 (Accessibility): The `aria-label` is hardcoded to "Loading" — confirm this is sufficient or if a dynamic label prop should be added.
- Section 10 (Responsive behavior): No responsive logic exists in the component; inference noted below.

**Recommended follow-ups:**
- Add a story for each size variant (Small, Large) so they can be embedded as Storybook blocks.
- Consider adding an `aria-label` prop to allow context-specific screen reader announcements (e.g., "Saving changes" vs. "Loading").
- No `prefers-reduced-motion` handling exists in the keyframe — recommend adding a `@media (prefers-reduced-motion: reduce)` override.

---

# Spinner

## 1. Overview
A lightweight, indeterminate loading indicator that communicates an in-progress operation when no quantifiable progress value is available.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| A network request is in flight with no known completion percentage | When progress is quantifiable — use Linear Progress or Circular Progress instead |
| Replacing or overlaying a button label during form submission | When an entire page section is loading — use Skeleton to preserve layout |
| Inline within a table cell, list item, or label to indicate a row-level update | When the user must wait more than a few seconds — provide a progress bar so they can gauge remaining time |

## 3. Anatomy
1. **Spinner ring** — A circular element rendered as a `<span>` with `role="status"` and `aria-label="Loading"`. The full ring is the track; the gap at the top-right is the fill arc, created via a contrasting `borderTopColor`.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantSpinner/Default]`

## 4. Variants
The Spinner has no named semantic variants. Size is the only axis of variation (see Properties / States).

## 5. States
**Spinning (default)**
- Triggered immediately on render; there is no way to pause the animation declaratively.
- The ring rotates 360° over 700 ms at a constant linear rate via the `spinner-rotate` keyframe.
- No pointer, keyboard, or focus state is exposed — the element is decorative from an interaction standpoint but announced to screen readers via `role="status"`.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Controls the diameter and border width of the spinner ring. |
| `className` | `string` | `''` | No | Additional CSS class names forwarded to the wrapping `<span>`. |

## 7. Content guidelines
No human-authored copy is rendered inside this component. The only text surface is the hardcoded `aria-label="Loading"`, which is consumed exclusively by screen readers and should not be edited without coordinating with the accessibility label prop addition noted in the reviewer notes.

## 8. Accessibility
- **Keyboard navigation:** The spinner is not focusable and has no keyboard interaction.
- **Screen reader behavior:** `role="status"` causes most screen readers to announce "Loading" as a live region status message when the element is inserted into the DOM. The label is hardcoded; there is no prop to customise it. [NEEDS CONFIRMATION: verify announcement timing in NVDA/VoiceOver.]
- **Color and contrast:** The track uses `--color-progress-track` (`#e5e5e5`) and the active arc uses `--color-text-body` (`#171717`). Contrast is decorative in nature — the shape communicates state, not text.
- **Motion (`prefers-reduced-motion`):** No override is currently implemented. The `spinner-rotate` keyframe will play regardless of the user's motion preference. Recommend adding `@media (prefers-reduced-motion: reduce) { [role="status"] { animation: none; } }` or an equivalent in `globals.css`.
- **Touch/pointer targets:** The spinner is purely presentational and has no tap target requirement.
- **Known gaps:** Missing `prefers-reduced-motion` support; hardcoded `aria-label` cannot be contextualised by the consuming component.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--size-spinner-sm` | `var(--primitive-scale-4)` → `1rem` | Width and height at `size="sm"` |
| `--size-spinner-md` | `var(--primitive-scale-6)` → `1.5rem` | Width and height at `size="md"` (default) |
| `--size-spinner-lg` | `var(--primitive-scale-10)` → `2.5rem` | Width and height at `size="lg"` |
| `--color-progress-track` | `var(--primitive-gray-200)` → `#e5e5e5` | Full ring border color (track) |
| `--color-text-body` | `var(--primitive-gray-900)` → `#171717` | Top border color (active arc) |
| `--motion-spinner-duration` | `700ms` | Duration of one full rotation (applied via keyframe, referenced as token) |
| `--motion-spinner-easing` | `linear` | Easing of the rotation (applied via keyframe) |

## 10. Responsive behavior
The Spinner has no built-in responsive breakpoints. Its size is controlled entirely by the `size` prop. Consumers are responsible for swapping the `size` prop or adjusting the containing layout at different viewport widths.

## 11. Composition and usage patterns
**Inline button loading state**
Replace a button's label with a Spinner (`size="sm"`) during form submission to prevent double-submission and communicate action progress without layout shift.

**Gotcha:** Set `flexShrink: 0` on the Spinner (already applied internally) when placing it inside a flex container alongside text to prevent the ring from being squashed.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantSpinner/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| Linear Progress | When progress is step-based or percentage-based and can be displayed as a horizontal bar |
| Circular Progress | When progress is percentage-based and a circular indicator better fits the layout |
| Skeleton | When an entire content region (cards, paragraphs, avatars) is loading and you want to preserve spatial layout |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use `size="sm"` inside buttons and compact UI elements to match surrounding text scale. | Use `size="lg"` inline within body text — it will break vertical rhythm. |
| Pair the Spinner with an `aria-live` region or adjacent status text when the completion event needs to be announced. | Rely solely on `role="status"` for complex multi-step operations — screen readers may not re-announce if the element stays mounted. |
| Remove the Spinner from the DOM (conditional render) when loading is complete so screen readers receive the implicit "done" signal. | Hide the Spinner with `visibility: hidden` or `opacity: 0` while keeping it mounted — it will continue animating and consuming GPU resources. |
| Use `className` to add margin utilities when spacing the Spinner away from sibling elements. | Override `width`, `height`, `border`, or `animation` via `className` — use the `size` prop or extend the token map instead. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
