---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/feedback/ElegantStepper.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantStepper.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 8 (Accessibility): The Stepper renders no `role="list"` / `role="listitem"` or `aria-current="step"` — screen readers receive no semantic step structure. This is a significant accessibility gap. [NEEDS CONFIRMATION: intentional display-only component, or should ARIA be added?]
- Section 5 (States): The component is display-only — no click handlers on individual step indicators. [NEEDS CONFIRMATION: is a clickable/navigable stepper pattern planned?]
- Section 10 (Responsive): `hideCopyOnMobile` uses the Tailwind `md:flex` class (breakpoint `600px` in this system). Confirm that the Tailwind config alias is correctly applied.

**Recommended follow-ups:**
- Add `aria-current="step"` on the active step indicator and `role="list"`/`role="listitem"` on step wrappers for screen reader navigation.
- The arrows variant uses a hardcoded `rgba(255,255,255,0.7)` for description text on filled segments — this should be a design token.
- The arrows variant description font size is hardcoded to `0.625rem` (not a token) — consider aliasing to `--primitive-font-size-2xs`.
- No story demonstrates the `hideCopyOnMobile` pattern at narrow viewport — recommend a responsive story.

---

# Stepper

## 1. Overview
A visual navigation landmark that shows a user's position within a multi-step flow, with three distinct visual styles and support for both horizontal and vertical orientations.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Linear multi-step flows (onboarding, checkout, setup wizards) where users need orientation | When there is only one step or the flow is non-linear |
| When users benefit from seeing completed, active, and upcoming steps simultaneously | When step count exceeds ~8 — the bar becomes too dense; consider a Linear Progress bar instead |
| As a persistent header element that remains visible while the user works through a form | When steps are optional or can be skipped freely — a stepper implies a mandatory sequence |

## 3. Anatomy
1. **Step indicator** — Per-variant: a circle node (circle), a coloured bar section (tab), or a chevron-shaped segment (arrows).
2. **Step number** — Shown inside or above the indicator; zero-padded to 2 digits in tab and arrows variants. Hidden when `showStepNumber=false`.
3. **Connector** — A 1px line (circle variant) or shared edge (tab/arrows) linking adjacent step indicators.
4. **Step label** — Short text name for the step, rendered below the indicator (horizontal) or to its right (vertical). Hidden when `showLabel=false` or no `stepItems` are provided.
5. **Step description** — Smaller muted text below the label. Hidden when `showDescription=false` or not provided in `stepItems`.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantStepper/CircleHorizontal]`

## 4. Variants

**Circle**
- Each step is represented by a circular node with a number or check icon.
- Completed steps: filled accent background (`--color-text-accent`) with a white check icon.
- Active step: transparent background with a border (`--color-text-title`), number in title colour.
- Upcoming steps: filled track background (`--color-progress-track`), number in muted colour.
- Connectors between steps are 1px lines: accent colour for completed → next segment, track colour for upcoming.
- Use for most onboarding and checkout flows — the most legible and familiar pattern.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantStepper/CircleHorizontal]`

`[STORYBOOK BLOCK: Simple/Feedback/ElegantStepper/CircleVertical]`

**Tab**
- Each step is a rectangular tab with a coloured top (horizontal) or left (vertical) border — 3px solid.
- Completed: accent border + accent step number.
- Active: title-colour border + title-colour step number + medium-weight label.
- Upcoming: track-colour border + track-colour step number.
- No separate connector element — adjacent tabs share a 2px gap.
- Use when horizontal space is abundant and a clean, document-style progress bar is preferred (e.g., settings wizards, multi-page forms).

`[STORYBOOK BLOCK: Simple/Feedback/ElegantStepper/TabHorizontal]`

`[STORYBOOK BLOCK: Simple/Feedback/ElegantStepper/TabVertical]`

**Arrows**
- Each step is a chevron-shaped segment clipped with `clip-path: polygon(…)`.
- Completed: accent background with white/primary-fg text.
- Active: title background (`--color-text-title`, i.e., near-black) with white text.
- Upcoming: track background (`--color-progress-track`) with muted text.
- Segments overlap by `ARROW_SIZE` (10px) via negative margin to create the continuous arrow chain.
- Use for compact sequential flows where the directionality of the process should be visually emphasised (e.g., pipeline stages, CI/CD step trackers).

`[STORYBOOK BLOCK: Simple/Feedback/ElegantStepper/ArrowsHorizontal]`

`[STORYBOOK BLOCK: Simple/Feedback/ElegantStepper/ArrowsVertical]`

## 5. States

**Completed**
- All steps with index + 1 < `currentStep`.
- Circle: filled accent circle with check icon. Tab: accent border + step number. Arrows: accent background.
- Connector (circle variant): accent colour line connecting to the next step.

**Active**
- The step where index + 1 === `currentStep`.
- Circle: outlined circle with title-colour border. Tab: title-colour border + medium-weight label. Arrows: title-colour (`#1e1e1e`) background.
- Label text is rendered at medium weight to distinguish from surrounding steps.

**Upcoming**
- All steps with index + 1 > `currentStep`.
- Circle: track-coloured filled circle with muted number. Tab: track-colour border. Arrows: track-colour background.
- Label and description text are in `--color-text-muted`.

**No labels (icon-only)**
- When `stepItems` is empty or no `label`/`description` is provided, only the step indicator and (if `showStepNumber=true`) the step number are rendered.
- The layout collapses: no label row, connector aligns to the indicator centre.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantStepper/NoLabels]`

**Hide copy on mobile**
- When `hideCopyOnMobile=true`, the label and description are hidden on viewports narrower than `600px` (Tailwind `md` breakpoint in this system) via the `hidden md:flex` class.
- The step indicators and numbers remain visible at all sizes.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantStepper/HideCopyOnMobile]`

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `steps` | `number` | — | Yes | Total number of steps. Values are rounded and clamped to a minimum of 1. |
| `currentStep` | `number` | — | Yes | Active step (1-based). Clamped to [1, steps]. |
| `variant` | `'circle' \| 'tab' \| 'arrows'` | `'circle'` | No | Visual style of the stepper. |
| `stepItems` | `StepItem[]` | `[]` | No | Per-step label and description. Array length need not match `steps` — missing items default to `{}`. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | No | Layout direction of the step sequence. |
| `hideCopyOnMobile` | `boolean` | `undefined` | No | Hides labels and descriptions below the 600px breakpoint when `true`. |
| `showStepNumber` | `boolean` | `true` | No | Shows the step number inside or above each indicator. |
| `showLabel` | `boolean` | `true` | No | Shows the step label text from `stepItems`. |
| `showDescription` | `boolean` | `true` | No | Shows the step description text from `stepItems`. |

`StepItem` shape:
| Field | Type | Description |
|---|---|---|
| `label` | `string` (optional) | Short name for the step (e.g., "Payment"). |
| `description` | `string` (optional) | Supporting detail (e.g., "Card info"). |

## 7. Content guidelines
- **Step labels:** Use a single noun or noun phrase (e.g., "Account", "Plan", "Payment"). Keep to 1–2 words wherever possible; the tab and arrows variants use `white-space: nowrap`, so long labels will overflow at narrow widths.
- **Step descriptions:** Use a brief qualifying phrase (e.g., "Your details", "Card info"). Should add context, not restate the label.
- **Step numbers:** Auto-generated — do not include numbers in the label text.
- **Truncation:** No built-in truncation. Long text can overflow, particularly in the arrows variant. Test at the target container width.

## 8. Accessibility
- **Keyboard navigation:** The Stepper is purely presentational — there are no interactive elements and no keyboard navigation.
- **Screen reader behavior:** No `role="list"` or `role="listitem"` is applied to step containers. No `aria-current="step"` marks the active step. Screen readers will traverse the DOM sequentially but receive no semantic step structure. This is a **known gap** — recommend adding list semantics and `aria-current="step"` to the active indicator.
- **Color and contrast:** Active label text uses `--color-text-title` (`#1e1e1e`) on a white background — high contrast. Completed label uses `--color-text-body` (`#171717`). Upcoming uses `--color-text-muted` (`#666666`) — check contrast against background (~4.5:1 recommended for body text). The arrows variant uses white text on an accent green (`#2e6f40`) background for completed steps — [NEEDS CONFIRMATION: verify contrast ratio].
- **Motion (`prefers-reduced-motion`):** No animations are applied to the Stepper — state changes are instantaneous style swaps on re-render. No motion concerns.
- **Touch/pointer targets:** Individual step indicators (circle variant: `--primitive-scale-6` = 1.5rem = 24px) are below the 44×44px recommended touch target size. Since the component is display-only (non-interactive), this is acceptable; if click-to-navigate is added in future, target sizes must be increased.
- **Focus:** The Stepper is non-interactive — it contains no focusable elements and has no focus ring requirements.
- **Known gaps:** Missing `aria-current="step"`, list semantics, and accessible step count announcement.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-text-accent` | `var(--primitive-green-500)` → `#2e6f40` | Completed indicator fill (circle); completed border/number (tab); completed segment background (arrows); connector fill (circle) |
| `--color-text-title` | `var(--primitive-black)` → `#1e1e1e` | Active indicator border (circle); active border/number (tab); active segment background (arrows); active label colour |
| `--color-text-body` | `var(--primitive-gray-900)` → `#171717` | Completed label text colour |
| `--color-text-muted` | `var(--primitive-gray-600)` → `#666666` | Upcoming label and description text; upcoming step number (circle) |
| `--color-progress-track` | `var(--primitive-gray-200)` → `#e5e5e5` | Upcoming indicator fill (circle); upcoming border (tab); upcoming segment background (arrows); upcoming connector (circle) |
| `--color-interactive-primary-fg` | `var(--primitive-white)` → `#ffffff` | Check icon colour (circle completed); text colour on filled arrow segments |
| `--primitive-scale-6` | `1.5rem` | Circle indicator diameter |
| `--primitive-scale-1` | `0.25rem` | Vertical connector margin block (circle variant) |
| `--primitive-scale-3` | `0.75rem` | Gap between indicator and step copy (vertical circle) |
| `--primitive-scale-4` | `1rem` | Minimum connector width (horizontal circle); tab/arrows padding |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Label and description typeface |
| `--primitive-font-mono` | `DM Mono, monospace` | Step number typeface |
| `--primitive-font-size-sm` | `0.875rem` | Step label font size |
| `--primitive-font-size-xs` | `0.75rem` | Step description font size; tab/arrows step number |
| `--primitive-font-weight-medium` | `500` | Active step label font weight |
| `--primitive-font-weight-regular` | `400` | Inactive step label font weight |
| `--primitive-font-weight-bold` | `700` | Step number font weight (circle variant) |
| `--size-label-to-description` | `var(--primitive-scale-1)` → `0.25rem` | Gap between label and description text |

## 10. Responsive behavior
- **`hideCopyOnMobile=true`** hides the label and description columns below `600px` (the `md` breakpoint in this system) using Tailwind's `hidden md:flex` class. Step indicators and numbers remain visible at all sizes, providing a compact indicator-only mode on mobile.
- Horizontal orientation with many steps and long labels can overflow its container on narrow viewports. Use `hideCopyOnMobile=true` or switch to vertical orientation on mobile.
- Vertical orientation uses `inline-flex` and `fit-content` width — it does not stretch to fill its container and is safe in sidebar layouts at any breakpoint.
- The arrows variant uses `width: 100%` in horizontal mode — all segments flex-grow equally. On very narrow viewports with many steps, arrow segments can become too narrow to render legibly.

## 11. Composition and usage patterns

**Horizontal circle stepper with full labels**
Standard usage for onboarding or checkout flows. Place above the active step's form content. Use 3–5 steps maximum for comfortable horizontal display.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantStepper/CircleHorizontal]`

**Vertical circle stepper in a sidebar**
Place in a fixed or sticky sidebar column. The vertical orientation stacks step indicators and connectors top-to-bottom, with labels and descriptions inline to the right. Works well for 4–6 step flows.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantStepper/CircleVertical]`

**Tab stepper for settings flows**
Use the tab variant when step labels are the primary orientation cue and a cleaner, less prominent indicator suits the UI (e.g., settings wizards, configuration panels).

`[STORYBOOK BLOCK: Simple/Feedback/ElegantStepper/TabHorizontal]`

**Arrows stepper for pipeline / process stages**
Use the arrows variant when the directionality and categorical state (not yet / active / done) of a process pipeline is the primary communication goal.

`[STORYBOOK BLOCK: Simple/Feedback/ElegantStepper/ArrowsHorizontal]`

**Gotchas:**
- `currentStep` is 1-based. Passing `currentStep=0` is clamped to `1` — there is no "not started" state.
- `stepItems` length need not match `steps`, but items beyond the `steps` count are ignored. Missing items default to an empty object (no label, no description).
- The arrows variant overlaps segments by 10px using negative margins — do not add a wrapper `overflow: hidden` or the chevron tips will be clipped.

## 12. Related components
| Component | When to use it instead |
|---|---|
| Linear Progress | When step count is high (6+) or step labels are not needed — a simpler filled bar is less cluttered |
| Circular Progress (steps variant) | When a compact single-circle step counter fits better than a full stepper row (e.g., in a narrow nav bar) |
| Tab navigation | When steps are non-linear and the user should be able to jump freely between sections |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use `hideCopyOnMobile=true` for horizontal steppers in responsive layouts so labels don't wrap or overflow on small screens. | Use the horizontal circle or tab variant without `hideCopyOnMobile` on narrow viewports — labels will overflow or wrap unpredictably. |
| Keep step labels to 1–2 words to prevent overflow in the tab and arrows variants (`white-space: nowrap`). | Use full sentences or multi-word phrases in step labels — they will overflow their clip-path boundaries in the arrows variant. |
| Use `variant="circle"` as the default — it is the most legible and accessible of the three variants. | Use `variant="arrows"` when 6 or more steps are needed — chevron segments become too narrow to read. |
| Provide `stepItems` with both `label` and `description` for flows where users benefit from knowing what each step involves before they reach it. | Omit all labels when using the tab or arrows variant — without labels the coloured borders or segments lose most of their meaning. |
| Use `orientation="vertical"` in sidebar or narrow column layouts to avoid horizontal overflow. | Use `orientation="vertical"` when only 2 steps are present — a simple two-item list or a progress bar is less heavy. |
| Use `showStepNumber=false` in the circle variant when the visual states (check / outlined / filled) are sufficient and numbers would add noise. | Use `showStepNumber=false` in the tab or arrows variant for flows with more than 4 steps — without numbers, distinguishing positions is harder. |
| Drive `currentStep` from application state (route param, wizard state machine) and let the Stepper be a pure display component. | Mutate `currentStep` inside the Stepper — it has no internal state and emits no navigation events. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
