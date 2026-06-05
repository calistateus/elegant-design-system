---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/feedback/ElegantLinearProgress.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantLinearProgress.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): No explicit disabled or error state is implemented. Flagged where applicable.
- Section 8 (Accessibility): `aria-valuenow` receives the fill percentage (0–100), not the raw `currentStep`. This may surprise consumers who expect step-based values. [NEEDS CONFIRMATION]
- Section 10 (Responsive behavior): Vertical placement uses `inline-flex` and a fixed track length token — confirm that `--size-progress-track-length` (8rem) is always sufficient.

**Recommended follow-ups:**
- No `prefers-reduced-motion` consideration — the fill width change is instant (no CSS transition applied to the fill bar). This is fine but should be documented as a deliberate choice.
- The `showButton` prop is only respected when `placement="bottom"`. This constraint should be surfaced prominently in docs and potentially enforced with a PropTypes/runtime warning.
- A "No label" story (bare track only) would be useful for Storybook.

---

# Linear Progress

## 1. Overview
A horizontal (or vertical) progress bar that communicates how far a user has advanced through a multi-step flow, expressed as a filled track proportional to step completion.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Wizards, onboarding flows, or checkout sequences where step count is known upfront | When progress is indeterminate — use a Spinner instead |
| Showing file upload or download progress where a percentage or step count is available | When a single binary action is in progress (e.g., a button submit) — a Spinner inline in the button is less distracting |
| As a compact reading-progress indicator in long-form content | When the number of steps exceeds ~10 — consider a Stepper component to show step labels at each position |

## 3. Anatomy
1. **Label row** — Optional area containing a heading (medium-weight body text) and/or step counter (monospace muted text, e.g., "3/5"). Rendered above or below the track depending on `placement`.
2. **Track** — The full-width background bar using `--color-progress-track`.
3. **Fill bar** — An absolutely positioned bar inside the track, width driven by `(currentStep / steps) * 100`, coloured with `--color-text-accent`.
4. **Action button** — Optional `ElegantButton` (primary, menu context, ArrowRight icon) rendered to the right of the label row. Only visible when `placement="bottom"` and `showButton=true`.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantLinearProgress/LabelTop]`

## 4. Variants

**Label Top**
- The label row sits above the progress track. This is the default layout and draws the user's attention to the step context before they see how much is complete.
- Use when the heading provides essential framing for the step (e.g., "Select transportation").
- The action button is not available in this placement.

**Label Bottom**
- The label row sits below the track, optionally accompanied by an action button aligned to the right.
- Use when the progress bar itself is the primary visual and the label is supplementary, or when you need to combine the label with a "Next" button in a single compact row.
- The action button (`showButton`, `buttonLabel`, `onButtonClick`) is only rendered in this placement.

**Vertical**
- The track runs vertically (fixed height via `--size-progress-track-length`) with the label and step counter displayed to its right.
- Use in sidebars or narrow column layouts where horizontal space is constrained.
- The action button is not available in this placement. Fill grows from top to bottom.

## 5. States
**In progress (default)**
- `currentStep` is between 1 and `steps − 1`.
- Fill bar width is `(currentStep / steps) * 100%`.
- No animation on the fill bar itself — width changes are instantaneous on re-render.

**Complete**
- `currentStep` equals `steps`.
- Fill bar covers 100% of the track.
- No visual distinction (e.g., colour change or checkmark) from the in-progress state. [NEEDS CONFIRMATION: intentional or gap?]

**Empty / Not started**
- `currentStep` is 0 or below.
- `currentStep` is clamped to 0; fill bar has 0% width (track is fully empty).

**Overflow clamped**
- `currentStep` values exceeding `steps` are clamped to `steps` — the fill bar never exceeds 100%.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `steps` | `number` | — | Yes | Total number of steps in the flow. |
| `currentStep` | `number` | — | Yes | Active step index (1-based). Clamped to [0, steps]. |
| `showStepCount` | `boolean` | `false` | No | Renders a monospace "current/total" counter (e.g., "3/5") in the label row. |
| `heading` | `string` | `undefined` | No | Heading text displayed in the label row. Omit to hide the heading. |
| `placement` | `'top' \| 'bottom' \| 'vertical'` | `'top'` | No | Where the label row sits relative to the track, or switches to vertical orientation. |
| `showButton` | `boolean` | `false` | No | Renders the action button. Only active when `placement="bottom"`. |
| `buttonLabel` | `string` | `'Next'` | No | Text label for the action button. |
| `onButtonClick` | `() => void` | `undefined` | No | Click handler for the action button. |

## 7. Content guidelines
- **Heading:** Use sentence case. Keep to a single short phrase that names the current section of the flow (e.g., "Select transportation", "Payment details"). Avoid ending with a period.
- **Step counter:** The counter is auto-generated from `currentStep` and `steps` — do not duplicate this information in the heading.
- **Button label:** The default "Next" is appropriate for most linear flows. Use "Continue", "Save", or a specific action verb when the step action is not simply moving forward.

## 8. Accessibility
- **Keyboard navigation:** The track itself is not focusable. The action button is keyboard-focusable and activates with Enter/Space.
- **Screen reader behavior:** The track (`<div role="progressbar">`) exposes `aria-valuenow` (fill percentage 0–100), `aria-valuemin={0}`, `aria-valuemax={100}`, and `aria-valuetext` (e.g., `"Step 3 of 5"`). Screen readers announce the `aria-valuetext` string rather than the raw percentage, giving users a meaningful progress description. The value is computed as `"Step {currentStep} of {steps}"` from the clamped step values.
- **Color and contrast:** The fill bar uses `--color-text-accent` (`#2e6f40`) on a `--color-progress-track` (`#e5e5e5`) track. The decorative nature of the bar means WCAG color contrast for non-text elements (3:1) applies — [NEEDS CONFIRMATION: verify ratio].
- **Motion:** No CSS transition is applied to the fill bar. Width changes are instantaneous, so `prefers-reduced-motion` is not a concern for this component.
- **Touch/pointer targets:** The progress bar itself is not interactive. The optional action button uses the standard Button sizing — the `default` context renders approximately 40px height, which is borderline for the 44px recommendation but consistent with the shared button component sizing.
- **Focus:** The progress bar (`role="progressbar"`) is not focusable. The optional action button (when rendered) uses the standard `ElegantButton` focus ring: `outline: 2px solid var(--color-interactive-primary-bg)`, `outline-offset: 3px` via `.elegant-btn:focus-visible`.
- **Known gaps:** No explicit `aria-label` on the `role="progressbar"` element; context is provided via `aria-valuetext` instead. Consider adding an `aria-label` or `aria-labelledby` for additional context if needed.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--size-progress-track-height` | `var(--primitive-scale-1)` → `0.25rem` | Height of the horizontal track; width of the vertical track |
| `--size-progress-track-length` | `var(--primitive-scale-32)` → `8rem` | Height of the vertical track |
| `--color-progress-track` | `var(--primitive-gray-200)` → `#e5e5e5` | Track background |
| `--color-text-accent` | `var(--primitive-green-500)` → `#2e6f40` | Fill bar background |
| `--color-text-body` | `var(--primitive-gray-900)` → `#171717` | Heading text color |
| `--color-text-muted` | `var(--primitive-gray-600)` → `#666666` | Step counter text color |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Heading typeface |
| `--primitive-font-mono` | `DM Mono, monospace` | Step counter typeface |
| `--primitive-font-size-sm` | `0.875rem` | Heading font size |
| `--primitive-font-size-xs` | `0.75rem` | Step counter font size |
| `--size-btn-radius` | `var(--primitive-radius-md)` → `4px` | Track border radius (fill and track share this) |
| `--size-heading-to-body` | `var(--primitive-scale-4)` → `1rem` | Gap between label row and track |
| `--size-label-to-description` | `var(--primitive-scale-1)` → `0.25rem` | Gap between heading and step counter |
| `--size-card-gap` | `var(--primitive-scale-4)` → `1rem` | Gap between vertical track and label column; gap in bottom button row |

## 10. Responsive behavior
The component has no built-in responsive breakpoints. In horizontal orientations, the track stretches to 100% of its container width — wrap it in a width-constrained container (e.g., `max-width: 400px` as shown in the stories). In vertical orientation, the track height is fixed at `--size-progress-track-length` (8rem) regardless of viewport.

Consumers should switch between `placement` values at different breakpoints themselves if needed (e.g., vertical on wide screens, top-label on narrow).

## 11. Composition and usage patterns
**Wizard header with step counter and next button**
Use `placement="bottom"`, `showStepCount=true`, `showButton=true` to create a self-contained progress + navigation row at the bottom of a wizard panel.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantLinearProgress/LabelBottom]`

**Sidebar progress indicator**
Use `placement="vertical"` in a sidebar column alongside step labels to give users a persistent orientation marker throughout a long flow.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantLinearProgress/Vertical]`

**Gotcha:** `showButton` is silently ignored when `placement` is not `"bottom"`. Always set `placement="bottom"` when using the action button.

## 12. Related components
| Component | When to use it instead |
|---|---|
| [Spinner](/design-system/docs/spinner-zh) | When progress is indeterminate and no step count is available |
| [Circular Progress](/design-system/docs/circular-progress-zh) | When a circular indicator better suits the layout (e.g., inline with a profile card) |
| [Stepper](/design-system/docs/stepper-zh) | When each step deserves a visible node, label, and connector — not just a filled bar |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Always provide both `steps` and `currentStep` — both are required for correct fill calculation. | Pass `currentStep` greater than `steps` — while it will be clamped, it signals a logic error in the parent. |
| Use `showStepCount` to give users a precise position anchor, especially in long flows (5+ steps). | Repeat step count information in the `heading` text (e.g., "Step 3 of 5 — Select transportation") — it duplicates what `showStepCount` already provides. |
| Use `placement="vertical"` in sidebars or narrow column layouts where horizontal space is scarce. | Use `placement="vertical"` in a full-width layout — the fixed-height track will look unanchored. |
| Constrain the component's container width (e.g., `max-width: 400px`) in horizontal orientations to keep the track readable. | Let the track stretch to full viewport width — at very wide sizes, incremental progress becomes visually imperceptible. |
| Set `buttonLabel` to a specific action verb when the button triggers something other than linear advancement. | Use `showButton=true` without providing an `onButtonClick` handler — the button will render but do nothing. |
| Render the Spinner inside the action button while its async operation resolves. | Remove the progress bar from the DOM during the async pause — it provides orientation context. |

## 14. Changelog

### 2026-04-27
- **Accessibility:** Added `aria-valuetext` to all `role="progressbar"` elements, announcing human-readable step progress (e.g., "Step 3 of 5") instead of a raw fill percentage. Applies to horizontal (label-top and label-bottom) and vertical track variants.
