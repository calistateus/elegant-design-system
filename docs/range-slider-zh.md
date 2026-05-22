---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantRangeSlider.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantRangeSlider.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5: The "out-of-range" stepper input error toast appears as a portal fixed to `document.body` — its behavior in SSR / test environments should be verified.
- Section 8: The knob uses `role="slider"` with correct ARIA attributes; `prefers-reduced-motion` is not explicitly checked.

**Recommended follow-ups:**
- Add a story for the no-label variant (showLabel: false).
- Add a story for the no-description variant.
- Consider adding `prefers-reduced-motion` support to suppress transitions.
- The stepper input's `aria-live="polite"` region works for screen readers on value change; confirm VoiceOver behavior.
- Consider `autocomplete="off"` on the stepper input to prevent autofill.

---

# Range Slider

## 1. Overview
A numeric range control combining a draggable track knob with a paired stepper input, letting users select a value within a bounded range via mouse drag, touch, keyboard, or direct numeric entry.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Adjusting a bounded numeric value where approximate selection is acceptable (volume, brightness, opacity) | Entering a precise numeric value where a stepper-only input is clearer |
| Filters with a continuous range (price, distance, date range) | Selecting from a discrete list of options — use Dropdown or Picklist |
| Settings controls where visual position conveys meaning | Ranges with very large step counts where exact value entry is more efficient |
| Embedded in forms alongside other field types | When min/max bounds are not known at render time |

## 3. Anatomy
1. **Label** — visible field name rendered as a `<span>`; also serves as the ARIA label for the knob.
2. **Stepper** — a trio of [−] button | value input | [+] button for precise keyboard-accessible numeric adjustment.
3. **Description** — optional supporting text below the header row.
4. **Track area** — the full-width interactive area; clicking anywhere on it snaps the knob to that position.
5. **Track** — a thin 4px line; filled portion shows `--color-interactive-primary-bg`.
6. **Fill** — the colored portion of the track from the start to the current knob position.
7. **Knob** — a circular 18px drag handle; keyboard-focusable with `role="slider"`.
8. **Min/max labels** — small numeric labels at either end of the track.
9. **Error toast** — a fixed-position portal toast that appears when the stepper input receives an out-of-range value.

`[STORYBOOK BLOCK: Simple/Forms/ElegantRangeSlider/Default]`

## 4. Variants
The component has no named visual variants. Behavior varies by the `step` prop:

**Integer step** (default, `step={1}`)
- Knob snaps to whole numbers.
- Stepper shows integer values.
`[STORYBOOK BLOCK: Simple/Forms/ElegantRangeSlider/Default]`

**Decimal step** (`step={0.1}`, etc.)
- Knob and stepper snap to the nearest step increment.
- Useful for opacity (0–1), percentage precision.
`[STORYBOOK BLOCK: Simple/Forms/ElegantRangeSlider/DecimalStep]`

## 5. States

**Default**
- Knob at initial value; track fill shows the proportion.
- Stepper displays the current numeric value.
- Min and max labels visible at track ends.

**Dragging**
- Cursor changes to `grabbing` on the knob; `pointer` on the track.
- Track fill and knob position update in real time (no transition while dragging).
- `mousemove` / `touchmove` events are captured globally to allow dragging outside the component.

**Focused (keyboard)**
- The knob receives a `box-shadow: 0 0 0 3px var(--primitive-gray-200), 0 1px 3px rgba(0,0,0,0.15)`.
- Arrow keys (Left/Right/Up/Down) adjust by one `step`.
- Page Up/Down adjust by 10% of the range.
- Home sets to `min`; End sets to `max`.

**Stepper editing**
- Clicking the stepper input clears the displayed value to allow fresh entry.
- On blur, the entered value is clamped to [min, max] and snapped to the nearest step.
- If the entered value was out of range, a toast notification appears for 4 seconds.

**Out-of-range error toast**
- Appears as a fixed portal at the top-center of the viewport.
- Message: "Out of range — corrected to {correctedValue}."
- Auto-dismisses after 4000ms or can be manually dismissed via X button.
- Uses `role="alert"` and `aria-live="assertive"`.

**Disabled**
- Entire component renders at `opacity: var(--opacity-disabled)` (0.5).
- Stepper buttons and knob are not interactive (`cursor: not-allowed`).
- Stepper − button is also disabled when `current <= min`; + button when `current >= max`.

`[STORYBOOK BLOCK: Simple/Forms/ElegantRangeSlider/Disabled]`

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `number` | — | No | Controlled value. When provided, the component does not maintain internal state. |
| `onChange` | `(value: number) => void` | — | No | Called on every value change (drag, stepper click, keyboard, typed entry). |
| `min` | `number` | `0` | No | Minimum selectable value. |
| `max` | `number` | `100` | No | Maximum selectable value. |
| `step` | `number` | `1` | No | Increment between values. Supports decimals. |
| `label` | `string` | `'Label'` | No | Visible field label and ARIA label for the knob. |
| `showLabel` | `boolean` | `true` | No | When `false`, hides the entire header row (label + stepper). |
| `description` | `string` | `'Drag the knob or use the stepper.'` | No | Supporting text below the header row. |
| `showDescription` | `boolean` | `true` | No | When `false`, hides the description. |
| `disabled` | `boolean` | `false` | No | Disables all interaction and renders at reduced opacity. |
| `id` | `string` | — | No | HTML `id` for the label element; auto-generated if not provided. |

## 7. Content guidelines
- **Label**: Use a noun phrase describing the value being controlled ("Volume", "Opacity", "Price"). Sentence case.
- **Description**: One short instruction if the interaction is not self-evident ("Drag the knob or type a value."). Omit if the label alone is clear.
- **Min/max labels**: Automatically rendered from the `min` and `max` props — ensure the values are self-explanatory (e.g. "0" and "100", not raw data IDs).
- **Error toast**: Generated automatically ("Out of range — corrected to {n}."). No custom copy needed.

## 8. Accessibility
- **Keyboard navigation**: The knob (`role="slider"`) is fully keyboard operable. ArrowLeft/Down: −1 step. ArrowRight/Up: +1 step. PageUp: +10% of range. PageDown: −10% of range. Home: min. End: max. The stepper −/+ buttons respond to mouse and touch long-press with a 400ms delay then 60ms repeat.
- **Screen reader behavior**: Knob has `aria-labelledby` pointing at the label span, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and `aria-valuetext`. Stepper input has `aria-live="polite"` so value changes are announced. Stepper buttons have descriptive `aria-label` ("Decrease Volume", "Increase Volume"). Error toast has `role="alert"` and `aria-live="assertive"`.
- **Color and contrast**: Track fill uses `--color-interactive-primary-bg` (#1e1e1e) on `--color-progress-track` (#e5e5e5) — high contrast. Stepper and min/max labels use `--color-text-muted` (#666666) — meets WCAG AA for non-essential UI text.
- **Motion**: Track fill and knob transitions are 150ms ease when not dragging. Toast entrance/exit is 350ms cubic-bezier. No `prefers-reduced-motion` check — [NEEDS CONFIRMATION].
- **Touch/pointer**: Knob is 18px — below the 44px touch target recommendation. The track area has `touchAction: 'none'` to prevent scroll interference. Consider increasing knob size for mobile contexts.
- **Known gaps**: Knob is only 18px, potentially undersized for touch. No `prefers-reduced-motion` support.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-interactive-primary-bg` | `var(--primitive-black)` → `#1e1e1e` | Track fill color |
| `--color-progress-track` | `var(--primitive-gray-200)` → `#e5e5e5` | Track background color |
| `--primitive-white` | `#ffffff` | Knob background |
| `--primitive-gray-200` | `#e5e5e5` | Knob focus shadow outer ring |
| `--primitive-gray-300` | `#d4d4d4` | Knob border; stepper border; stepper dividers |
| `--primitive-radius-full` | `999px` | Track and fill border radius |
| `--primitive-radius-md` | `4px` | Stepper container border radius |
| `--primitive-font-sans` | `DM Sans, sans-serif` | All text elements |
| `--primitive-font-size-sm` | `0.875rem` | Label and stepper value font size |
| `--primitive-font-size-xs` | `0.75rem` | Description and min/max label font size |
| `--primitive-font-weight-medium` | `500` | Label weight |
| `--primitive-font-weight-regular` | `400` | Stepper value weight |
| `--color-text-title` | `var(--primitive-black)` → `#1e1e1e` | Label text color |
| `--color-text-body` | `var(--primitive-gray-900)` → `#171717` | Stepper value text color |
| `--color-text-muted` | `var(--primitive-gray-600)` → `#666666` | Description and min/max label color |
| `--primitive-duration-fast` | `150ms` | Track fill and knob position transition |
| `--primitive-easing-default` | `ease` | Track fill and knob transition easing |
| `--primitive-red-500` | `#dc2626` | Error toast border color |
| `--color-error-text` | `var(--primitive-red-500)` → `#dc2626` | Error toast icon color |
| `--color-bg-main` | `var(--primitive-white)` → `#ffffff` | Error toast background |
| `--primitive-scale-1` | `0.25rem` | Gap between label and description |
| `--primitive-scale-3` | `0.75rem` | Gap between track min/max labels and track area |
| `--opacity-disabled` | `0.5` | Component opacity when disabled |

## 10. Responsive behavior
The component uses `width: 100%` and fills its container. The track area uses `flex: 1` to take all available horizontal space between the min and max labels. The stepper has a fixed width (~7.5rem combined). No breakpoint overrides; the consumer sets the container width. The Storybook demo wraps it at 360px.

## 11. Composition and usage patterns

**Volume / brightness control**
`min={0}`, `max={100}`, `step={1}`, `label="Volume"`. Pair with description if users might not know the allowed range. Use in a settings form alongside other controls.
`[STORYBOOK BLOCK: Simple/Forms/ElegantRangeSlider/Default]`

**Opacity / ratio control**
`min={0}`, `max={1}`, `step={0.1}`, `label="Opacity"`. Description explains the unit ("Set a value between 0 and 1."). The stepper shows decimal values; the min/max labels show 0 and 1.
`[STORYBOOK BLOCK: Simple/Forms/ElegantRangeSlider/DecimalStep]`

**Disabled preset value**
Use `disabled={true}` to show a locked slider value in a read-only settings panel. Pair with a visible label explaining why it is locked.
`[STORYBOOK BLOCK: Simple/Forms/ElegantRangeSlider/Disabled]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [TextInput](/design-system/docs/text-input-zh) | For precise numeric entry without a bounded visual range, or for non-numeric values. |
| [ElegantPicklist](/design-system/docs/picklist-zh) / [Dropdown](/design-system/docs/dropdown-zh) | For selecting from a discrete set of options that do not map to a continuous scale. |
| [ElegantRatingInput](/design-system/docs/rating-input-zh) | For subjective rating (stars, thumbs) rather than a quantitative bounded value. |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Always provide a meaningful `label` that describes the value being controlled. | Leave the default label "Label" in production — it is not descriptive for screen readers. |
| Set `min`, `max`, and `step` to match the domain of the value (e.g. 0–1 with step 0.01 for fine opacity control). | Use a very small step (e.g. 0.001) with a large range — the knob becomes imprecise and the stepper is the only usable input method. |
| Use the description to set expectations when the range unit is not self-evident ("Drag to set opacity from 0 (transparent) to 1 (opaque)."). | Duplicate the min/max labels in the description — they are already shown flanking the track. |
| Use the controlled pattern (`value` + `onChange`) when the slider value needs to sync with external state. | Mix controlled and uncontrolled patterns — either always provide `value` or never do. |
| Handle the `onComplete` equivalent by reading `onChange` on every change; do not wait for blur. | Use the slider for selections that require explicit confirmation — the value is committed on every interaction. |
| Increase the visual touch area using container padding if the slider is used on touch-heavy surfaces. | Assume the 18px knob is sufficient as a touch target — it is below the 44px recommended minimum. |

## 14. Changelog

### 2026-04-27
- **Disabled state:** Migrated disabled opacity to semantic token — now uses `var(--opacity-disabled)` (0.5, unchanged value but now references the shared token).
