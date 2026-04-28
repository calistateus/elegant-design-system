---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantForm.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantForm.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): The `isDisabled` and `isResetting` context states are available via `useFormState` but no visual treatment for disabled form state is implemented in the Form wrapper itself — child components handle it individually. Marked [NEEDS CONFIRMATION].
- Section 10: No explicit responsive overrides were found in the source; assumed it stretches to parent width.

**Recommended follow-ups:**
- Add a story for the `disabled` form-level state showing all fields greyed out together.
- Add a story showing `isSubmitting` spinner / loading state from context.
- Add a story demonstrating `ElegantFieldset` usage (not present in any story).
- Consider testing `noValidate` + `checkValidity` behavior across browsers.
- `ElegantFieldset` component is not demonstrated in stories.

---

# Form

## 1. Overview
A composable form shell that provides shared state (dirty, disabled, submitting, resetting) to all child fields via React context, with built-in validity gating before calling `onSubmit`.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Multi-field data entry that requires submit/cancel actions | Single-field inline edits — use individual inputs directly |
| Forms where submission involves an async operation (API call) | Read-only data display — no interactive state needed |
| Structured forms with a header, sections, and footer | Quick confirmation prompts — use a modal with a button instead |
| Forms that need coordinated disabled/submitting state across many fields | Forms that are fully controlled by an external form library that already provides context |

## 3. Anatomy
1. **Form** — the root `<form>` element; provides the React context and handles submit/reset/change events.
2. **FormHeader** — optional header block with a title and description, separated from the body by a bottom border.
3. **FormSection** — a `<section>` that groups related fields with consistent vertical spacing; optionally displays a section title.
4. **Fieldset** — an HTML `<fieldset>` for grouping semantically related controls (e.g., address fields), with an optional `<legend>`.
5. **Field** — a lightweight flex-column wrapper that enforces consistent gap between label, input, and error message.
6. **FormFooter** — a right-aligned action row at the bottom of the form, intended for Cancel and Submit buttons.

`[STORYBOOK BLOCK: Simple/Forms/ElegantForm/Default]`

## 4. Variants
The Form component has no visual variants itself. Its sub-components (FormHeader, FormSection, Fieldset) control structure, not visual style. The story demonstrates a fully assembled form with configurable slot content.

**Default (assembled form)**
- Shows the canonical layout: header → section → footer.
- The section slot accepts 1–5 configurable fields.
- All form field types available in the design system (TextInput, Dropdown, Search, Checkbox, CheckboxGroup, Radio, RadioGroup, Toggle, DateInput) can be slotted in.
`[STORYBOOK BLOCK: Simple/Forms/ElegantForm/Default]`

## 5. States

**Default**
- `isDirty: false`, `isSubmitting: false`, `isResetting: false`.
- The form is valid and awaiting user input.
- All child fields are interactive.

**Dirty**
- Triggered on the first `onChange` event on any child field.
- `isDirty` becomes `true` in context; consumers can use `useFormState()` to read this.
- No visual change on the form itself — individual components decide how to react.

**Submitting**
- Triggered when `onSubmit` is called and the native validity check passes.
- `isSubmitting` becomes `true` in context for the duration of the async `onSubmit` handler.
- [NEEDS CONFIRMATION] Child components should read `isSubmitting` from context to show loading indicators. Currently no built-in visual change at the Form level.

**Disabled**
- Passed via the `disabled` prop to the root `<form>`.
- `isDisabled: true` is set in context.
- [NEEDS CONFIRMATION] Child components should individually honor `isDisabled` from context; the Form wrapper itself does not apply a CSS `disabled` state to the `<form>` element.

**Resetting**
- Triggered by a native `<button type="reset">` inside the form.
- `isResetting: true` for one animation frame, then reverts to `false`.
- `isDirty` is reset to `false`.

**Submitted (story demo only)**
- After a successful submit, the story replaces the form with a confirmation message.
- Behavior is consumer-defined; the component does not prescribe a post-submit state.

`[STORYBOOK BLOCK: Simple/Forms/ElegantForm/Default]`

## 6. Properties

### Form
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `children` | `React.ReactNode` | — | Yes | Form content: FormHeader, FormSection(s), FormFooter, etc. |
| `onSubmit` | `(e: React.FormEvent<HTMLFormElement>) => void \| Promise<void>` | — | Yes | Called after native validity check passes. Async handlers are awaited before `isSubmitting` is reset. |
| `disabled` | `boolean` | `false` | No | Passes `isDisabled: true` into context for all children. |
| `className` | `string` | `''` | No | Additional CSS class on the `<form>` element. |
| `id` | `string` | — | No | HTML `id` on the `<form>` element. |

### FormHeader
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `title` | `string` | — | Yes | Main heading rendered as `<h2>`. |
| `description` | `string` | `''` | No | Supporting paragraph rendered below the title. |
| `showDescription` | `boolean` | `true` | No | When `false`, the description is hidden even if provided. |

### FormSection
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `children` | `React.ReactNode` | — | Yes | Section content (Fields, Fieldsets, etc.). |
| `title` | `string` | `''` | No | Section sub-heading rendered as `<h3>`. |
| `showTitle` | `boolean` | `false` | No | When `true`, renders the section title. |

### Fieldset
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `children` | `React.ReactNode` | — | Yes | Grouped form controls. |
| `legend` | `string` | `''` | No | `<legend>` text for the fieldset. |
| `showLegend` | `boolean` | `true` | No | When `false`, the legend is hidden even if provided. |

### Field
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `children` | `React.ReactNode` | — | Yes | A single form control and its associated label/error. |
| `className` | `string` | `''` | No | Additional CSS class on the wrapper div. |

### FormFooter
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `children` | `React.ReactNode` | — | Yes | Action buttons (typically Cancel + Submit). |

## 7. Content guidelines
- **FormHeader title**: Use sentence case, be specific ("Contact us", not "Form"). Maximum 60 characters recommended.
- **FormHeader description**: One to two sentences explaining the form's purpose or next steps. Keep under 100 characters.
- **FormSection title**: Label the group of fields ("Your details", "Payment method"). Only show when sections serve different logical purposes.
- **Fieldset legend**: Mirror the label of the group; avoid redundancy with enclosing section title.
- **FormFooter buttons**: The primary action (Submit) goes on the right; secondary action (Cancel) goes to its left. Button labels should be action verbs ("Save", "Submit", "Continue"), not "OK".

## 8. Accessibility
- **Keyboard navigation**: The `<form>` uses the native tab order of its children. Submit is triggered via `Enter` on the focused field or by clicking the submit button. Reset is triggered by a `type="reset"` button.
- **Screen reader behavior**: The `<form>` element is announced as a form landmark. `noValidate` is set, so browser-native validation popups are suppressed; the component calls `reportValidity()` to surface field errors programmatically before `onSubmit` fires.
- **ARIA roles**: No ARIA roles are added to the Form shell itself. Fieldset uses the native `<fieldset>` / `<legend>` pair, which screen readers announce as a group.
- **Color and contrast**: The form shell uses no color on its own; all contrast requirements are delegated to child field components.
- **Motion**: No animations on the form shell itself.
- **Touch/pointer**: No specific touch targets in the shell; individual components handle their own targets.
- **Focus**: The form shell (`<form>`) is not focusable. Individual form controls inside manage their own focus states. Submit behavior is handled by the native `<form>` element — pressing Enter in a text input submits the form if a submit button is present.
- **Known gaps**: `isSubmitting` and `isDisabled` context states are not automatically applied to child components — each child must call `useFormState()` independently.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--primitive-font-sans` | `DM Sans, sans-serif` | Form element `fontFamily` |
| `--primitive-scale-6` | `1.5rem` | FormHeader and FormSection padding |
| `--color-border-subtle` | `var(--primitive-gray-100)` → `#f5f5f5` | Bottom border on FormHeader and FormSection |
| `--size-heading-to-sub` | `var(--primitive-scale-3)` → `0.75rem` | Gap between title and description in FormHeader |
| `--size-stack-gap` | `var(--primitive-scale-8)` → `2rem` | Vertical gap between fields in FormSection |
| `--size-form-group-gap` | `var(--primitive-scale-3)` → `0.75rem` | Vertical gap between items in Fieldset and Field |
| `--primitive-font-size-lg` | `1.125rem` | FormHeader title font size |
| `--primitive-font-size-base` | `1rem` | FormSection title font size |
| `--primitive-font-size-sm` | `0.875rem` | FormSection and Fieldset legend font size |
| `--primitive-font-weight-bold` | `700` | FormHeader and FormSection title weight |
| `--primitive-font-weight-medium` | `500` | Fieldset legend weight |
| `--color-text-title` | `var(--primitive-black)` → `#1e1e1e` | Title and section heading color |
| `--color-text-muted` | `var(--primitive-gray-600)` → `#666666` | Description text color |
| `--primitive-radius-md` | `4px` | Fieldset border radius |
| `--primitive-scale-4` | `1rem` | Fieldset padding |
| `--primitive-scale-1` | `0.25rem` | Fieldset legend horizontal padding |
| `--primitive-scale-3` | `0.75rem` | FormFooter gap between buttons |

## 10. Responsive behavior
The Form shell (`<form>`) uses `display: flex; flex-direction: column` with no width constraints — it stretches to fill its container. The Storybook decorator wraps it at 480px. There are no built-in breakpoint overrides; the consumer is responsible for setting the form width.

## 11. Composition and usage patterns

**Basic two-field contact form**
The most common pattern: a FormHeader (title + description), a single FormSection with two or three Fields, and a FormFooter with Cancel + Submit.
- Use `ElegantField` for each input to enforce consistent label-to-input gap.
- Submit button should be `style="primary"`; Cancel should be `style="secondary"`.
`[STORYBOOK BLOCK: Simple/Forms/ElegantForm/Default]`

**Multi-section form**
For longer forms (onboarding, settings), repeat `ElegantFormSection` elements. Each section is separated by a bottom border. Only show `showTitle` when sections serve genuinely different purposes.

**Fieldset grouping**
Wrap tightly related controls (e.g., radio options for payment method) in an `ElegantFieldset` with a legend. This gives screen readers a named group without adding a visual section heading.

**Reading context in child components**
```tsx
import { useFormState } from './ElegantForm';

function MyInput() {
  const { isSubmitting, isDisabled } = useFormState();
  return <input disabled={isDisabled || isSubmitting} />;
}
```

## 12. Related components
| Component | When to use it instead |
|---|---|
| Individual field components (TextInput, Dropdown, etc.) | For single-field inline edits that don't need a form shell or submit lifecycle. |
| Modal / Drawer | When the form needs to appear in an overlay rather than inline on the page. |
| ElegantButton | Use directly (not wrapped in FormFooter) when you need an action outside a form context. |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Always wrap each field in `ElegantField` to ensure consistent vertical spacing. | Place raw inputs directly inside `ElegantFormSection` — the gap token on `ElegantField` is what creates the design-system rhythm. |
| Use `ElegantFormHeader` to explain the purpose of the form before the user starts filling it in. | Leave the header description empty just to use the title — only add a description if it adds meaningful context. |
| Keep `ElegantFormFooter` to the right-aligned Cancel + Submit pattern. | Stack more than two actions in the footer or add tertiary links — it creates ambiguity about the primary action. |
| Use `ElegantFieldset` with a legend when grouping semantically related fields (radio buttons, address sub-fields). | Use `ElegantFieldset` purely for visual grouping — it carries accessibility semantics and should only be used where the grouped controls form a logical unit. |
| Make the `onSubmit` handler `async` and `await` the API call so `isSubmitting` remains `true` for the correct duration. | Set `isSubmitting` manually outside the component — the Form manages this state internally. |
| Use sentence-case labels and action verbs on buttons ("Save changes", not "OK"). | Use vague footer labels like "Confirm" when a more specific verb ("Submit", "Book", "Apply") is available. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
