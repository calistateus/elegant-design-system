---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/feedback/ElegantCircularProgress.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantCircularProgress.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 4 (Variants): `labelPlacement="center"` with inside text is constrained to `size="lg"` only — this constraint is not enforced via TypeScript, only silently ignored at sm/md. [NEEDS CONFIRMATION: should this be a runtime warning?]
- Section 5 (States): No disabled or error state is implemented.
- Section 8 (Accessibility): The SVG has a dynamic `aria-label` — confirm the exact phrasing satisfies AT requirements across browsers.

**Recommended follow-ups:**
- Add stories for `labelPlacement="bottom"`, `labelPlacement="center"` (lg + percentage), and all three sizes to improve Storybook coverage.
- The `center` label placement is silently no-op at `sm` and `md` sizes — consider a console warning in development.
- No `prefers-reduced-motion` handling for the `stroke-dashoffset` transition on the fill arc.

---

# Circular Progress

## 1. Overview
A circular SVG progress indicator that communicates completion either as a percentage value or as a step position within a multi-step flow, optionally with value and label text placed inside or alongside the ring.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Showing profile completion, upload progress, or any scalar 0–100% value where a ring shape fits the layout | When progress is indeterminate — use a Spinner instead |
| Step-based flows where a compact circular node with a counter communicates position better than a bar | When you have 6+ steps — a Stepper component with connectors is easier to scan |
| Alongside a card or avatar where a circular shape echoes surrounding circular elements | When precise numeric accuracy is more important than shape — a Linear Progress bar reads left-to-right more naturally |

## 3. Anatomy
1. **SVG ring** — A `<svg role="progressbar">` with a fixed `100×100` viewBox. Contains two concentric `<circle>` elements: the track ring and the fill arc.
2. **Track ring** — Full 360° circle stroked with `--color-progress-track`, stroke width 8 user-units.
3. **Fill arc** — The same circle with `stroke-dashoffset` set proportionally to fill percentage. Stroke colour is `--color-text-accent`. Starts at the 12 o'clock position (rotated −90°). Animates offset changes over `--primitive-duration-relaxed` with power2-out easing.
4. **Inside numeric** — SVG `<text>` centred in the ring. Only rendered at `size="lg"` when `labelPlacement="center"` and `showValue` / `showStepCount` is true.
5. **Inside label** — Secondary SVG `<text>` below the numeric. Same constraints as inside numeric.
6. **Outside value** — A `<span>` rendered outside the SVG in monospace body font when `labelPlacement` is `'right'` or `'bottom'` and the numeric display is enabled.
7. **Outside label** — A `<span>` in sans-serif muted text, rendered alongside the outside value.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantCircularProgress/Percentage]`

## 4. Variants

**Percentage**
- Driven by a `value` prop (0–100). The fill arc and `aria-label` reflect the percentage.
- The numeric display shows `"72%"` style text.
- Use when progress maps directly to a percentage (file upload, profile completion, survey progress).
- Constraints: `value`, `showValue` are the relevant props; `steps` and `currentStep` are ignored.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantCircularProgress/Percentage]`

**Steps**
- Driven by `steps` (total) and `currentStep` (1-based). Fill = `(currentStep / steps) * 100%`.
- The numeric display shows `"3/7"` style text.
- Use when progress is step-indexed (onboarding, checkout) and a fraction counter is more meaningful than a percentage.
- Constraints: `steps`, `currentStep`, `showStepCount` are the relevant props; `value` and `showValue` are ignored.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantCircularProgress/Steps]`

**Label placements (both variants)**

- **`right`** (default) — The outside value and label are placed to the right of the ring in a row layout.
- **`bottom`** — The outside value and label are placed below the ring; text is centre-aligned.
- **`center`** — The value and label are rendered as SVG text inside the ring. Only functional at `size="lg"`; silently falls back to bare ring at `sm` / `md`.

## 5. States
**In progress (default)**
- Fill arc partially covers the track based on the current value.
- The `stroke-dashoffset` transition (350 ms, power2-out) animates when the value prop changes on re-render.

**Complete**
- `value=100` or `currentStep=steps`. Fill arc covers the entire track (360°).
- No special colour change or checkmark is applied to signal completion visually. [NEEDS CONFIRMATION: intentional?]

**Empty / Not started**
- `value=0` or `currentStep=0`. Fill arc has 0 length — only the track ring is visible.

**Overflow / underflow clamped**
- `value` is clamped to [0, 100]; `currentStep` is clamped to [0, steps]. No visual error state is shown.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'percentage' \| 'steps'` | — | Yes | Determines how fill is calculated and how numeric text is formatted. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Controls the rendered diameter of the SVG ring. |
| `value` | `number` | `0` | No (required for `percentage`) | Progress value 0–100. Used only in the `percentage` variant. |
| `showValue` | `boolean` | `false` | No | Renders the percentage number alongside or inside the ring. `percentage` variant only. |
| `steps` | `number` | — | No (required for `steps`) | Total number of steps. `steps` variant only. |
| `currentStep` | `number` | `0` | No (required for `steps`) | Current step (1-based). `steps` variant only. |
| `showStepCount` | `boolean` | `false` | No | Renders the "current/total" counter alongside or inside the ring. `steps` variant only. |
| `label` | `string` | `undefined` | No | Optional descriptive text placed outside (or inside at `lg` + `center`) the ring. |
| `labelPlacement` | `'right' \| 'bottom' \| 'center'` | `'right'` | No | Where to place outside content relative to the ring. `center` is only functional at `size="lg"`. |
| `className` | `string` | `''` | No | Additional CSS class names on the root element. |

## 7. Content guidelines
- **Label:** Use a short noun phrase that names what is being measured (e.g., "Profile complete", "Onboarding", "Upload progress"). Avoid verbs and avoid repeating the numeric value in the label text.
- **Value display:** The numeric is auto-generated (`"72%"` or `"3/7"`) — do not duplicate it in the label.
- **Inside label at `center`:** Keep to 1–2 words as the available SVG space is small (font size 10 user-units).

## 8. Accessibility
- **Keyboard navigation:** The SVG is not focusable and has no keyboard interaction.
- **Screen reader behavior:** `<svg role="progressbar">` exposes `aria-valuenow` (rounded fill percentage, 0–100), `aria-valuemin={0}`, `aria-valuemax={100}`, and a dynamic `aria-label`. For the `percentage` variant this is `"{n}% complete"`; for `steps` it is `"Step {n} of {total}"`. The SVG text nodes (inside numeric/label) are inside the SVG and may be read by some AT — they are not marked `aria-hidden`.
- **Color and contrast:** The fill arc (`--color-text-accent`, `#2e6f40`) on the track (`--color-progress-track`, `#e5e5e5`) is decorative. Inside SVG text uses `--color-text-body` (`#171717`) — confirm contrast against the white SVG background [NEEDS CONFIRMATION].
- **Motion (`prefers-reduced-motion`):** The fill arc `stroke-dashoffset` transition (350 ms) has no `prefers-reduced-motion` override. Recommend suppressing the transition in the reduced-motion media query.
- **Touch/pointer targets:** Component is non-interactive. No tap target requirement.
- **Known gaps:** SVG `<text>` elements inside the ring are not marked `aria-hidden` — they may be read alongside the `aria-label`, producing duplicate announcements.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--size-circular-progress-sm` | `var(--primitive-scale-12)` → `3rem` | SVG width/height at `size="sm"` |
| `--size-circular-progress-md` | `var(--primitive-scale-20)` → `5rem` | SVG width/height at `size="md"` (default) |
| `--size-circular-progress-lg` | `var(--primitive-scale-32)` → `8rem` | SVG width/height at `size="lg"` |
| `--color-progress-track` | `var(--primitive-gray-200)` → `#e5e5e5` | Track ring stroke |
| `--color-text-accent` | `var(--primitive-green-500)` → `#2e6f40` | Fill arc stroke |
| `--color-text-body` | `var(--primitive-gray-900)` → `#171717` | Inside numeric text fill |
| `--color-text-muted` | `var(--primitive-gray-600)` → `#666666` | Outside label text; inside label text fill |
| `--primitive-font-mono` | `DM Mono, monospace` | Outside value text; inside numeric SVG text |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Outside label text; inside label SVG text |
| `--primitive-font-size-base` | `1rem` | Outside value font size |
| `--primitive-font-size-sm` | `0.875rem` | Outside label font size |
| `--primitive-font-weight-medium` | `500` | Outside value font weight; inside numeric SVG font weight |
| `--primitive-duration-relaxed` | `350ms` | Fill arc transition duration |
| `--primitive-easing-power2-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Fill arc transition easing |
| `--size-label-to-description` | `var(--primitive-scale-1)` → `0.25rem` | Gap between outside value and label |
| `--size-card-gap` | `var(--primitive-scale-4)` → `1rem` | Gap between SVG and outside content area |

## 10. Responsive behavior
The component has no built-in responsive breakpoints. Size is controlled via the `size` prop. The `center` label placement is limited to `size="lg"` — at smaller sizes it silently renders a bare ring with no label, so consumers should not use `labelPlacement="center"` on `sm` or `md` sizes. Consumers are responsible for swapping size or placement at different viewport widths.

## 11. Composition and usage patterns
**Profile completion card**
Render a `size="md"` ring with `variant="percentage"`, `showValue=true`, `label="Profile complete"`, and `labelPlacement="right"` alongside a user avatar and action links.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantCircularProgress/Percentage]`

**Compact onboarding step counter**
Use `variant="steps"`, `size="sm"`, `showStepCount=true`, and no label for a minimal inline step counter that fits within a nav bar or header strip.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantCircularProgress/Steps]`

**Gotcha:** At `size="lg"` with `labelPlacement="center"`, both the numeric and the label render inside the SVG. If `label` is long, it will overflow the ring boundaries — keep it to 1–2 short words.

## 12. Related components
| Component | When to use it instead |
|---|---|
| Spinner | When progress is indeterminate and no value is available |
| Linear Progress | When a horizontal bar communicates progress more naturally (e.g., within a wizard header or reading progress) |
| Stepper | When each step needs a visible connector, label, and description alongside its indicator |

## 13. Do's and don'ts
| Do | Don't |
|---|---|
| Always provide `variant` — it is required and determines all fill and display logic. | Provide both `value` (percentage variant prop) and `steps`/`currentStep` (steps variant props) simultaneously — only the props matching the active `variant` are used, but the mismatch is confusing. |
| Use `size="lg"` with `labelPlacement="center"` for standalone dashboard widgets where the ring is the hero element. | Use `labelPlacement="center"` at `size="sm"` or `size="md"` — the text is silently suppressed. |
| Use `showValue` / `showStepCount` to give users a precise numeric anchor alongside the visual ring. | Put the numeric value in the `label` prop (e.g., `label="72% complete"`) — it duplicates what `showValue` already provides. |
| Animate the `value` or `currentStep` prop change to take advantage of the built-in fill arc transition. | Expect the transition to play on initial mount — it only animates subsequent prop changes. |
| Use `labelPlacement="bottom"` when placing the ring above a block of descriptive text for vertical layouts. | Use `labelPlacement="right"` in very narrow containers — the row layout can force the label to wrap awkwardly. |
| Keep `label` text to a short noun phrase (2–4 words). | Use the label to repeat or paraphrase the numeric value. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
