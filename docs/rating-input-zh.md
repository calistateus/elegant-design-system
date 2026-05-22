---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantRatingInput.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantRatingInput.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): There is no disabled visual treatment described in the source beyond `opacity: 0.4; pointerEvents: none` — confirm this is intentional and sufficient.
- Section 6: Stars `count` prop is only exposed in the component type (`StarsVariant`) but the stories fix it at 5. Confirm whether count is a design-system-controlled value or consumer-configurable.

**Recommended follow-ups:**
- Add a story showing `showDescription: true` for each variant.
- Add a disabled story for each variant (currently only `disabled` control in meta, no dedicated story).
- The Stars variant re-clicking the currently selected star deselects it (toggles to null) — this behavior should be documented in the product but is not in a story.
- Consider `aria-label` on the star group container for screen reader discovery.

---

# Rating Input

## 1. Overview
A lightweight feedback control that lets users express a rating or reaction via one of three interaction paradigms: thumbs up/down, a 1–5 star scale, or a heart (like/unlike) toggle.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Collecting quick user sentiment on content, features, or help articles | Collecting structured survey responses — use a RadioGroup with labelled options |
| Liking or saving content items (heart variant) | Selecting from a ranked list — use Dropdown or Picklist |
| Inline feedback prompts at the end of a page or task flow | Numeric rating inputs that require a text comment — pair with TextInput separately |
| Embedding a quick quality signal in a card or list item | Forms where the rating must be required/validated — this component has no error state |

## 3. Anatomy
1. **Label** — optional `<h5>` heading identifying the rating question.
2. **Description** — optional supporting text below the label (shown only when `showDescription={true}`).
3. **Rating controls** — the interactive element(s) determined by the `variant` prop:
   - **Thumbs**: two icon buttons (ThumbsUp / ThumbsDown).
   - **Stars**: a row of N star buttons.
   - **Heart**: a single heart toggle button.
4. **Icon button** (thumbs / heart) — a square button with a bordered, rounded container.

`[STORYBOOK BLOCK: Simple/Forms/ElegantRatingInput/Thumbs]`

## 4. Variants

**Thumbs** (`variant="thumbs"`)
- Two icon buttons: ThumbsUp and ThumbsDown.
- Selecting one deselects the other; re-clicking the active choice deselects both (value becomes `null`).
- Communicates binary helpful/not-helpful sentiment.
- Use for help articles, support responses, feature feedback.
- Value type: `'up' | 'down' | null`.
`[STORYBOOK BLOCK: Simple/Forms/ElegantRatingInput/Thumbs]`

**Stars** (`variant="stars"`)
- A row of 1–N star buttons (default N = 5).
- Hover highlights stars up to the hovered position. Click selects that star count; re-clicking the same star deselects (value becomes `null`).
- Communicates a scaled quality judgment.
- Use for product ratings, experience feedback, content quality.
- Value type: `number | null`.
`[STORYBOOK BLOCK: Simple/Forms/ElegantRatingInput/Stars]`

**Heart** (`variant="heart"`)
- A single heart toggle button.
- Clicking toggles between liked (`true`) and not liked (`false`).
- Communicates a save/favorite action alongside sentiment.
- Use for liking posts, saving items to favorites.
- Value type: `boolean`.
`[STORYBOOK BLOCK: Simple/Forms/ElegantRatingInput/Heart]`

## 5. States

**Default / Unselected**
- Thumbs: both buttons show unfilled icons with light border.
- Stars: all stars are outlined in gray (`--primitive-gray-500`).
- Heart: outlined heart in body color.

**Hovered**
- Thumbs/Heart icon button: border changes from `--primitive-gray-200` to `--primitive-gray-300`; background shifts to `--color-bg-surface`.
- Stars: all stars up to and including the hovered star fill with `--primitive-yellow-800`; unhovered stars go gray.

**Selected / Active**
- Thumbs: the active button shows a filled icon (`fill: var(--color-text-title)`) with a heavier stroke (2 vs 1.5) and `--primitive-gray-400` border.
- Stars: stars up to and including the selected position fill with `--primitive-yellow-800`.
- Heart: filled red heart (`fill: var(--primitive-red-300)`), red icon color, heavier stroke.

**Disabled**
- Container renders with `opacity: var(--opacity-disabled)` (0.5); `pointerEvents: none`.
- No visual indicator beyond reduced opacity.
- All buttons are non-interactive.

`[STORYBOOK BLOCK: Simple/Forms/ElegantRatingInput/Stars]`

## 6. Properties

### Shared props (all variants)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'thumbs' \| 'stars' \| 'heart'` | — | Yes | Determines which rating control to render. |
| `label` | `string` | — | No | Optional heading above the control. |
| `description` | `string` | — | No | Optional supporting text below the label. |
| `showDescription` | `boolean` | `false` | No | When `true`, renders the description if provided. |
| `disabled` | `boolean` | `false` | No | Renders the entire component at `opacity: var(--opacity-disabled)` (0.5) with no pointer events. |

### Thumbs-specific props
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `'up' \| 'down' \| null` | — | No | Controlled value. |
| `onChange` | `(v: 'up' \| 'down' \| null) => void` | — | No | Called when the user clicks a thumb. |

### Stars-specific props
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `number \| null` | — | No | Controlled star rating (1 to `count`). |
| `onChange` | `(v: number \| null) => void` | — | No | Called when the user clicks a star. |
| `count` | `number` | `5` | No | Total number of star buttons to render. |

### Heart-specific props
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `boolean` | — | No | Controlled liked state. |
| `onChange` | `(v: boolean) => void` | — | No | Called when the user clicks the heart. |

## 7. Content guidelines
- **Label**: Phrase as a question or prompt: "Was this helpful?", "Rate your experience", "Like this?". Capitalize first word only.
- **Description** (when shown): One short sentence of context or encouragement ("Your feedback helps us improve.", "Tap a star to rate."). Default `showDescription` is `false`; only enable when the label alone is not self-explanatory.
- No error copy — the component has no error state.
- No placeholder text — rating controls are self-descriptive via icons.

## 8. Accessibility
- **Keyboard navigation**: Each icon button (thumbs, heart) is a standard `<button>` — Tab to focus, Enter/Space to activate. Star buttons are individual `<button>` elements — Tab through each star or use Enter/Space. No arrow-key navigation between stars (each star is its own tab stop).
- **Screen reader behavior**: Each star button has `aria-label="Rate N out of M stars"` and `aria-pressed={selected === star}`. Thumbs buttons have `aria-label="Thumbs up"` / `"Thumbs down"` and `aria-pressed`. Heart button has dynamic `aria-label` ("Like" or "Unlike") and `aria-pressed`. The label `<h5>` is not programmatically associated with the controls via `aria-labelledby` — [NEEDS CONFIRMATION].
- **Color and contrast**: Star fill uses `--primitive-yellow-800` (#854d0e) — check contrast against white background for the outlined state (#8c8c8c on white meets AA). Heart fill uses `--primitive-red-300` (#f87171). Icon button borders are light (#e5e5e5) and may not meet WCAG AA for non-text contrast in some configurations.
- **Motion**: Icon button background and border color transition at `--primitive-duration-fast` (150ms) ease. Star color transitions at 150ms. No `prefers-reduced-motion` check.
- **Touch/pointer**: Thumbs and Heart variants: `IconButton` is `width: var(--primitive-scale-9)` × `height: var(--primitive-scale-9)` = 36px × 36px — below the 44px minimum. Stars variant: star buttons have `padding: 0` with a 22px icon — effective touch target ~22px. All three variants fall below the WCAG 2.5.5 recommendation. Known gap; consider increasing to `min-width: 44px, min-height: 44px` on touch breakpoints.
- **Focus**: All buttons are native `<button>` elements. Browser default focus ring applies. No custom `:focus-visible` ring is defined. Known gap.
- **Known gaps**: `aria-labelledby` is not used to connect the label `<h5>` to the button group. Star tab stops are numerous (5–6 consecutive). All three variants fall below the 44px touch target minimum. No custom focus ring on any rating control button.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--primitive-font-sans` | `DM Sans, sans-serif` | Container font family |
| `--type-h5-family` | `var(--primitive-font-sans)` | Label font family |
| `--type-h5-size` | `var(--primitive-font-size-base)` → `1rem` | Label font size |
| `--type-h5-weight` | `var(--primitive-font-weight-bold)` → `700` | Label font weight |
| `--type-h5-line-height` | `1.4` | Label line height |
| `--color-text-title` | `var(--primitive-black)` → `#1e1e1e` | Label color; thumb active fill color |
| `--color-text-muted` | `var(--primitive-gray-600)` → `#666666` | Description text color |
| `--size-heading-to-body` | `var(--primitive-scale-4)` → `1rem` | Gap between label group and controls |
| `--size-label-to-description` | `var(--primitive-scale-1)` → `0.25rem` | Gap between label and description |
| `--primitive-font-size-xs` | `0.75rem` | Description font size |
| `--primitive-scale-9` | `2.25rem` | Icon button width/height |
| `--primitive-radius-md` | `4px` | Icon button border radius |
| `--primitive-gray-200` | `#e5e5e5` | Icon button default border |
| `--primitive-gray-300` | `#d4d4d4` | Icon button hover border |
| `--primitive-gray-400` | `#a3a3a3` | Icon button active/pressed border |
| `--primitive-gray-500` | `#8c8c8c` | Unlit star color |
| `--color-bg-surface` | `var(--primitive-gray-50)` → `#fafafa` | Icon button hover background |
| `--primitive-yellow-800` | `#854d0e` | Star fill and lit color |
| `--primitive-red-300` | `#f87171` | Heart filled color |
| `--color-text-body` | `var(--primitive-gray-900)` → `#171717` | Heart unfilled icon color |
| `--primitive-scale-1` | `0.25rem` | Gap between stars |
| `--primitive-scale-2` | `0.5rem` | Gap between thumb buttons |
| `--primitive-duration-fast` | `150ms` | Icon button transition duration |
| `--primitive-easing-default` | `ease` | Icon button transition easing |
| `--opacity-disabled` | `0.5` | Component opacity when disabled |

## 10. Responsive behavior
The component uses `display: inline-flex; flex-direction: column` and wraps to its content. No width constraints or breakpoint overrides. The rating controls themselves are fixed-width based on their icon sizes and gaps. The consumer controls horizontal placement.

## 11. Composition and usage patterns

**End-of-page feedback prompt (thumbs)**
Place a "Was this helpful?" thumbs input at the bottom of documentation pages or support articles. Show `label` only; hide `description` unless the context needs elaboration.
`[STORYBOOK BLOCK: Simple/Forms/ElegantRatingInput/Thumbs]`

**Product card star rating**
Embed a stars input inside a product card. In read-only display contexts, use `disabled={true}` with a pre-set `value` to show average rating without allowing user interaction.
`[STORYBOOK BLOCK: Simple/Forms/ElegantRatingInput/Stars]`

**Save to favorites (heart)**
Use the heart variant in list items or gallery cards where a like/save action is needed. Pair with a screen-reader-only label if no visible label is shown.
`[STORYBOOK BLOCK: Simple/Forms/ElegantRatingInput/Heart]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [ElegantRadioGroup](/design-system/docs/radio-group-zh) | When users need to select one option from a set of labeled choices (e.g. "Poor / Fair / Good / Excellent"). |
| [ElegantPicklist](/design-system/docs/picklist-zh) | When users need to select multiple items from a list, not express a sentiment. |
| [ElegantButton](/design-system/docs/button-zh) | When the feedback action is a standalone CTA (e.g. "Submit review") rather than an inline widget. |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Always provide a `label` when the rating control appears standalone on a page — it gives screen readers and sighted users the necessary context. | Show a rating control with no label or description inside a dense layout where the purpose is not self-evident from surrounding content. |
| Use `showDescription={true}` only when the label alone doesn't explain how to interact. | Always show the description — it adds noise when the label is clear ("Like this?" needs no description). |
| Use the thumbs variant for binary helpful/not-helpful scenarios. | Use thumbs for nuanced quality feedback — the stars variant is more appropriate. |
| Use the heart variant for save/favorite actions where the state persists across sessions. | Use the heart variant for temporary session-level feedback — thumbs or stars are more appropriate. |
| Handle the deselection case in your `onChange` handler (thumbs returns `null`, stars returns `null`, heart toggles to `false`). | Assume the value will always be non-null after a user interaction. |
| Disable the component during async save operations to prevent multiple rapid submissions. | Leave the component interactive while a previous submission is in flight. |

## 14. Changelog

### 2026-04-27
- **Disabled state:** Migrated disabled opacity to semantic token — now uses `var(--opacity-disabled)` (0.5, was 0.4).
