---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantToggle.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantToggle.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): Disabled state is implemented via `disabled` prop — applies `opacity: var(--opacity-disabled)`, `cursor: not-allowed`, `tabIndex=-1`, and blocks click/keyboard interaction.
- Section 8 (Accessibility): The toggle renders a `<div>` with `role="switch"` rather than a native `<input type="checkbox">`; no visible focus ring is applied beyond the browser default.
- Section 10 (Responsive behavior): No breakpoint-specific behavior is defined; inferred from layout structure.

**Recommended follow-ups:**
- Add a `disabled` prop and visually distinct disabled state.
- Add a visible focus ring (`:focus-visible` style or inline `onFocus` handler) using `--shadow-focus-ring`. **Known gap:** No custom focus ring is currently implemented — the browser default applies.
- Add stories for the toggled-on state and a no-description variant.
- Consider whether the label/pill layout order (label left, pill right) matches the expected visual convention — most OS toggles place the pill left of the label.
- Add `prefers-reduced-motion` guard on the pill transition.

---

# Toggle

## 1. Overview
A binary on/off control rendered as a sliding pill, used to enable or disable a single setting immediately without requiring a form submission.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Enabling or disabling a single persistent setting (e.g. "Enable notifications") | Choosing between two mutually exclusive options from a larger set — use RadioGroup instead |
| Immediate-effect preferences that apply without a save action | Accepting terms or confirming an agreement — use Checkbox instead |
| Feature flags or opt-in controls in settings panels | Multi-value selection — use CheckboxGroup |
| Mobile-style on/off controls that users recognize as switches | Actions that require explicit confirmation before taking effect |

## 3. Anatomy
1. **Wrapper** — `<div>` with `role="switch"` and `tabIndex={0}`. Row-flex container; clicking anywhere on the wrapper toggles state.
2. **Text group** — Column-flex container holding the label and optional description.
3. **Label** — Required text identifying what the toggle controls. Rendered in medium weight at `--primitive-font-size-sm`.
4. **Description** (optional) — Supporting text in muted color at `--primitive-font-size-xs`.
5. **Pill track** — Rounded pill background; always `--color-interactive-primary-bg`. Thumb position (left vs right) indicates off vs on state. `aria-hidden="true"`.
6. **Thumb** — White circular indicator that slides within the pill track to indicate state.

`[STORYBOOK BLOCK: Simple/Forms/ElegantToggle/Default]`

## 4. Variants
The Toggle has a single visual form but two content configurations:

**With description**
- Shows the label and a supporting description below it.
- Use when the setting requires clarification or has non-obvious implications.
- Default story demonstrates this: "Enable notifications" + "You'll receive alerts for important updates."

**Without description**
- Shows label only; `description` prop set to `false`.
- Use for self-explanatory settings where additional text would add noise.

## 5. States

| State | Pill background | Thumb position | `aria-checked` |
|---|---|---|---|
| **Off** | `--color-interactive-primary-bg` | `left: 0.125rem` | `"false"` |
| **On** | `--color-interactive-primary-bg` | `left: 0.875rem` | `"true"` |
| **Focus** | Unchanged | Unchanged | — (browser default outline; no custom ring; known gap) |
| **Disabled** | Unchanged; wrapper opacity 0.5 | Unchanged | `aria-disabled="true"`; `tabIndex="-1"` |

**Off (default)**
- Pill background: `--color-interactive-primary-bg`.
- Thumb positioned at left: `left: 0.125rem`.
- `aria-checked="false"`.

`[STORYBOOK BLOCK: Simple/Forms/ElegantToggle/Default]`

**On (toggled)**
- Pill background: `--color-interactive-primary-bg`.
- Thumb positioned at right: `left: calc(2rem - 1rem - 0.125rem)` = `0.875rem`.
- `aria-checked="true"`.
- Transition: `background-color 200ms ease` on pill; `left 200ms ease` on thumb.

**Focus**
- `tabIndex={0}` makes the wrapper keyboard-focusable. Browser default focus outline applies. No custom `:focus-visible` ring is defined — the design system's `--shadow-focus-ring` token is available but not applied. This is a known gap.
- Activatable via `Space` or `Enter` key.

**Disabled**
- Triggered: when `disabled={true}`.
- Visually: wrapper opacity drops to `var(--opacity-disabled)` (0.5); cursor becomes `not-allowed`.
- Behavior: `onClick` and `onKeyDown` return early when disabled. `aria-disabled="true"` is set on the wrapper. `tabIndex` is set to `-1`, removing the toggle from the tab order.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | Yes | Text label identifying the setting the toggle controls. |
| `description` | `string \| false` | — | No | Optional supporting text rendered below the label. Pass `false` to hide. |
| `toggled` | `boolean` | `false` | No | Controlled state. When `onToggle` is provided, this value drives the visual state. When `onToggle` is omitted, the component manages state internally. |
| `onToggle` | `(value: boolean) => void` | — | No | Callback fired with the new boolean state on each toggle. Presence of this prop switches the component from uncontrolled to controlled mode. |
| `ariaLabel` | `string` | `label` | No | Override the accessible name announced by screen readers. Defaults to the visible label text. Use when the visible label is too brief to be meaningful without its surrounding context (e.g., "Enable" in a settings list where each row has a separate visible label). |
| `disabled` | `boolean` | `false` | No | Disables the toggle. Applies `opacity: var(--opacity-disabled)`, `cursor: not-allowed`, removes it from the tab order (`tabIndex: -1`), and blocks all click and keyboard interaction. |

## 7. Content guidelines
- **Label text:** Use clear, active noun phrases that describe the setting ("Enable notifications", "Show preview", "Allow analytics"). Avoid imperative verbs ("Turn on X") — the toggle itself implies the on/off action.
- **Description text:** Keep to one sentence. Explain the effect or any caveats (e.g. "Standard rates may apply."). Do not repeat information already in the label.
- **Truncation:** No truncation is implemented. Keep labels and descriptions short enough to fit within their container.

## 8. Accessibility
- **Keyboard navigation:** The wrapper has `tabIndex={0}` and responds to `Space` and `Enter` to toggle state. Tab moves focus to/from the wrapper.
- **Screen reader behavior:** `role="switch"`, `aria-checked` (true/false), and `aria-label` are set on the wrapper. The `aria-label` defaults to the visible `label` text; pass `ariaLabel` to override it. Screen readers announce the accessible name and switch state. The pill and thumb are `aria-hidden="true"`.
- **ARIA roles:** `role="switch"` is the correct ARIA role for a binary on/off control per ARIA 1.1.
- **Color and contrast:** Off state: #d4d4d4 pill. The pill color alone does not convey state — the thumb position provides the spatial cue. Ensure sufficient contrast between the pill and the page background. On state: #1e1e1e pill with white thumb — high contrast.
- **Motion:** The pill and thumb transitions are 200ms ease. No `prefers-reduced-motion` guard is applied — users who prefer reduced motion will still see the animation. [NEEDS CONFIRMATION — recommend guarding].
- **Focus:** `tabIndex={0}` makes the wrapper keyboard-focusable. Browser default focus outline applies. No custom `:focus-visible` ring is defined for this component — the design system's `--shadow-focus-ring` token is available but not applied. This is a known gap.
- **Touch/pointer targets:** The entire wrapper row (pill + label + description) is the click/tap target via `onClick` on the outer `<div>`. Actual rendered height depends on label content; with a single-line label the total height is typically ~20px label + 0.25rem gap = roughly 24px — below the 44px WCAG 2.5.5 minimum. Using a description line increases target height but does not guarantee 44px. This is a known gap for touch-primary surfaces.
- **Known gaps:** No custom `:focus-visible` ring (browser default only; `--shadow-focus-ring` available but not applied). Touch target height below 44px on single-line labels. No `prefers-reduced-motion` guard.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-interactive-primary-bg` | `var(--primitive-black)` → #1e1e1e | Pill background when toggled on |
| `--color-interactive-primary-fg` | `var(--primitive-white)` → #ffffff | Thumb color |
| `--color-interactive-primary-bg` | `var(--primitive-black)` → #1e1e1e | Pill background (both on and off; thumb position indicates state) |
| `--color-text-title` | `var(--primitive-black)` → #1e1e1e | Label text color |
| `--color-text-muted` | `var(--primitive-gray-600)` → #666666 | Description text color |
| `--size-tag-gap` | `var(--primitive-scale-3)` → 0.75rem | Gap between text group and pill |
| `--size-label-to-description` | `var(--primitive-scale-1)` → 0.25rem | Gap between label and description |
| `--primitive-font-size-sm` | 0.875rem | Label font size |
| `--primitive-font-size-xs` | 0.75rem | Description font size |
| `--primitive-font-weight-medium` | 500 | Label font weight |
| `--primitive-font-weight-regular` | 400 | Description font weight |
| `--shadow-thumb` | `0 1px 2px rgba(0,0,0,0.15)` | Drop shadow on pill thumb |
| `--opacity-disabled` | `0.5` | Wrapper opacity when disabled |

## 10. Responsive behavior
The Toggle component has no breakpoint-specific overrides. The wrapper is a flex row that occupies the width of its parent. On narrow viewports, longer description text will wrap within the text group column. The pill is fixed-size (2rem × 1.25rem) and will not reflow.

## 11. Composition and usage patterns

**Settings list**
Stack multiple Toggle components vertically inside a settings panel. Each toggle is independently controlled. Use a container with consistent vertical gap (e.g. `--size-form-group-gap` → 0.75rem) between toggles.

**Controlled mode (with onToggle)**
Pass both `toggled` and `onToggle` to manage state in the parent. Useful when toggling a feature flag that triggers a side effect (API call, localStorage write).

**Uncontrolled mode (without onToggle)**
Omit `onToggle` to let the component manage its own state internally. Suitable for purely visual demos or when the toggle state does not need to be read by a parent.

`[STORYBOOK BLOCK: Simple/Forms/ElegantToggle/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [Checkbox](/design-system/docs/checkbox-zh) | When confirming an agreement or selecting an item from a list that requires explicit acknowledgement |
| [RadioGroup](/design-system/docs/radio-group-zh) | When choosing one option from a mutually exclusive set of 2+ options |
| [CheckboxGroup](/design-system/docs/checkbox-group-zh) | When enabling multiple independent options from a labeled group |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use toggle for settings that take effect immediately without a save action. | Use toggle as a substitute for a form checkbox where the user must explicitly submit the change. |
| Write labels as noun phrases describing what the setting controls ("Enable notifications"). | Write labels as questions ("Receive notifications?") — screen readers announce the switch state separately. |
| Use the description to explain non-obvious consequences or caveats. | Repeat the label content in the description — it adds noise without value. |
| Use controlled mode (`onToggle` + `toggled`) when the state drives other UI or data. | Read `toggled` in the parent while in uncontrolled mode (no `onToggle`) — internal state won't be reflected. |
| Stack multiple toggles in a settings list with consistent gap between them. | Place toggles inline within body text or tables — use the dedicated settings panel pattern. |
| Confirm the accessible label accurately describes the controlled setting in isolation (screen readers may announce "Enable notifications, switch, off" without surrounding context). | Use vague labels ("Option A", "Feature") that have no meaning without visual context. |
| Test toggling via keyboard (Space/Enter) to verify the state change is announced by screen readers. | Assume the browser default focus outline is sufficient — a custom focus ring aligned to the design system is recommended. |
| Consider adding a `prefers-reduced-motion` guard before shipping to production. | Remove the transition entirely — it provides essential spatial feedback for the thumb movement. |

## 14. Changelog

### 2026-04-27
- **Accessibility:** Added `ariaLabel` prop to allow overriding the accessible name announced by screen readers. Defaults to the visible label text.
- **Disabled state:** Added `disabled` prop. Wrapper receives `opacity: var(--opacity-disabled)` (0.5) and `cursor: not-allowed`; `tabIndex` set to `-1`; `aria-disabled="true"` set; all click and keyboard handlers blocked.
- **Tokens:** Replaced `--primitive-gray-300` with `--color-border-default` for the pill off-state background. Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.
