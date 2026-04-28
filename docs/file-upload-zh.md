---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantFileUpload.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantFileUpload.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): Drag-over state is implemented but not captured as a separate Storybook story — marked [NEEDS CONFIRMATION] for exact visual treatment.
- Section 8 (Accessibility): The dropzone uses `role="button"` and keyboard Enter/Space, but there is no `aria-label` update to reflect the current number of files selected; flagged as a known gap.

**Recommended follow-ups:**
- Add a story showing the error state (file type rejected or max files hit).
- Add a story showing the drag-over state (currently only visible at runtime).
- Add a story for the horizontal chip layout variant.
- Consider adding `aria-describedby` pointing at the file type hint text in the dropzone.
- Hard limit of 20 files is silently enforced — consider surfacing this to the user.

---

# File Upload

## 1. Overview
A file selection control that lets users attach one or more files either via a button click or a drag-and-drop dropzone, with inline validation for file type and file count.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Attaching documents, images, or other files to a form submission | Selecting a single avatar or profile photo — use a dedicated image cropper component |
| Scenarios where users may add multiple files incrementally | Uploading very large files where progress feedback is critical — this component does not show upload progress |
| Drag-and-drop heavy workflows (design tools, file managers) | When file type and count restrictions are not needed — a plain `<input type="file">` is simpler |
| Constrained environments where type filtering is required (e.g. only PDFs) | Inline rich-text editors where files should be embedded, not attached as chips |

## 3. Anatomy
1. **Label** — optional visible text label (`<p>`) above the control.
2. **Description** — optional supporting text below the label explaining constraints.
3. **Upload button** (button variant) — a small primary-style button with an Upload icon; clicking opens the native file picker.
4. **Chip strip** — a wrapping row of dismissible ElegantChip pills showing selected file names, one per file.
5. **Dropzone** (dropzone variant) — a dashed bordered rectangle; receives drag-and-drop or click-to-browse interactions.
6. **Dropzone icon** — a 24px Upload icon centered in the dropzone.
7. **Dropzone label** — "Click or drag files here" / "Drop to upload" instruction text.
8. **Type hint** — small text listing allowed extensions and the max file count (shown in dropzone when `allowedTypes` is set).
9. **Error message** — displayed below the control when a file type or count violation occurs.

`[STORYBOOK BLOCK: Simple/Forms/ElegantFileUpload/ButtonVariant]`

## 4. Variants

**Button variant** (`variant="button"`)
- A compact inline upload trigger; selected files appear as dismissible chips adjacent to the button.
- Two chip layout sub-options:
  - **Stacked** (default): header block above, then button + chips on the same row.
  - **Horizontal**: label left-aligned, button right-aligned, chips and error below.
- Use when the upload control sits inside a larger form and should not dominate the visual hierarchy.
- Constraint: chips wrap if many files are selected.
`[STORYBOOK BLOCK: Simple/Forms/ElegantFileUpload/ButtonVariant]`

**Dropzone variant** (`variant="dropzone"`)
- A full-width bordered rectangle that emphasizes drag-and-drop affordance.
- Selected files appear as chips below the dropzone.
- Use when file uploading is the primary action on the surface (dedicated upload views, import flows).
- Constraint: always stretches to 100% of its container width.
`[STORYBOOK BLOCK: Simple/Forms/ElegantFileUpload/DropzoneVariant]`

## 5. States

**Default / Empty**
- Button variant shows "Upload" button with no chips.
- Dropzone shows the Upload icon and "Click or drag files here" label.
- No error is shown.

**Files selected**
- Button label changes to "Upload more" once at least one file is present.
- Each selected file is shown as a dismissible ElegantChip with the file name.
- Clicking the X on a chip removes that file; `onFilesChange` is called with the updated list.

**Drag over** (dropzone variant only)
- Triggered when a dragged file hovers over the dropzone.
- Background color shifts from `--color-fileupload-dropzone-bg` to `--color-fileupload-dropzone-border` (subtle highlight).
- Border color shifts from `--color-fileupload-dropzone-border` to `--color-fileupload-dropzone-active-border` (black).
- Label text changes from "Click or drag files here" to "Drop to upload".
- [NEEDS CONFIRMATION] No dedicated story exists for this state.

**Error**
- Triggered when a file fails type validation or when the max file count is exceeded.
- An `ElegantErrorMessage` appears below the chip strip with the specific error text.
- Error is cleared when a file is successfully removed via chip dismissal.
- Only the first error per drop/selection is shown.

**Disabled**
- Triggered: when `disabled={true}`.
- Button variant: upload button receives `disabled` + `aria-disabled`, click and hover events are blocked; style uses `opacity: var(--opacity-disabled)` (0.5) and `cursor: not-allowed`. The hidden input also receives `disabled`.
- Dropzone variant: background shifts to `--color-interactive-disabled-bg` (#f5f5f5); border shifts to `--color-interactive-disabled-border` (#e5e5e5); `opacity: var(--opacity-disabled)`; `cursor: not-allowed`; `tabIndex: -1`; all drag and click events blocked. `aria-disabled="true"` set.

**Focus** (dropzone variant)
- The dropzone receives a `box-shadow: 0 0 0 2px var(--color-interactive-primary-bg)` focus ring on keyboard focus.
- Triggered by Tab navigation to the dropzone element.

`[STORYBOOK BLOCK: Simple/Forms/ElegantFileUpload/DropzoneVariant]`

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'button' \| 'dropzone'` | `'button'` | No | Controls the upload surface layout. |
| `maxFiles` | `number` | `5` | No | Maximum total number of files selectable. Hard-capped at 20 internally. |
| `allowedTypes` | `string[]` | `[]` | No | Allowed file extensions including the dot (e.g. `['.pdf', '.png']`). Empty array accepts all types. |
| `label` | `string` | — | No | Visible label text above the control. |
| `showLabel` | `boolean` | `true` | No | When `false`, hides the label even if `label` is provided. |
| `description` | `string` | — | No | Supporting text below the label. |
| `showDescription` | `boolean` | `true` | No | When `false`, hides the description. |
| `chipLayout` | `'stacked' \| 'horizontal'` | `'stacked'` | No | Button variant only — controls how the label, button, and chips are arranged. |
| `onFilesChange` | `(files: File[]) => void` | — | No | Called every time the file list changes (addition or removal). |
| `disabled` | `boolean` | `false` | No | Disables all upload interaction. Button variant: blocks clicks. Dropzone variant: blocks drag/click, applies greyed-out styling. |

## 7. Content guidelines
- **Label**: Use a noun phrase describing what files are expected ("Attachments", "Supporting documents", "Profile photo"). Avoid "Upload file here".
- **Description**: State the constraint clearly — format and count in one sentence ("Upload up to 3 PDF, PNG, or JPG files."). Do not repeat information already shown in the dropzone type hint.
- **Dropzone type hint**: Automatically generated from `allowedTypes` and `maxFiles` — do not override manually.
- **Error messages**: Generated by the component ("`.exe` is not allowed. Accepted: `.pdf`, `.png`"). No custom error prop — errors are constraint-driven.
- **Chip labels**: File names from the OS; no truncation is enforced beyond CSS overflow on chips at 140px max-width.

## 8. Accessibility
- **Keyboard navigation**: Button variant — the upload button is focusable and activates the file picker on Enter/Space. Dropzone — the `role="button"` div is `tabIndex={0}`; Enter and Space open the file picker. Individual chip X buttons are separately focusable via the ElegantChip component.
- **Screen reader behavior**: Dropzone has a static `aria-label="File upload drop zone. Click or drag files here."`. The hidden `<input type="file">` is `aria-hidden="true"` and excluded from tab order. Each chip's dismiss button should announce "Remove [filename]" via ElegantChip's own aria-label.
- **Color and contrast**: Error messages use `--color-error-text` (#dc2626) on white; this meets WCAG AA for normal text. The dropzone drag-over background shift is purely additive visual cue — no color-only state change.
- **Motion**: Border color and background transitions are 150ms ease; no motion preference check. [NEEDS CONFIRMATION] `prefers-reduced-motion` is not explicitly handled.
- **Touch/pointer**: The dropzone acts as a full-width tap target; min height is constrained by `--size-fileupload-dropzone-padding` (1.5rem per side). Touch events for drop (`touchmove`/`touchend`) are registered, but drag-and-drop is not universally supported on mobile browsers.
- **Known gaps**: The dropzone `aria-label` does not dynamically update to reflect how many files are currently selected or remaining capacity. No `aria-live` region announces newly added chips.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-fileupload-dropzone-bg` | `var(--color-bg-surface)` → `#fafafa` | Dropzone default background |
| `--color-fileupload-dropzone-border` | `var(--color-border-subtle)` → `#f5f5f5` | Dropzone default border + drag-over background |
| `--color-fileupload-dropzone-active-border` | `var(--color-interactive-primary-bg)` → `#1e1e1e` | Dropzone border on drag-over |
| `--color-fileupload-dropzone-text` | `var(--color-text-muted)` → `#666666` | Dropzone icon color and type hint text |
| `--size-fileupload-dropzone-radius` | `var(--size-card-radius)` → `4px` | Dropzone border radius |
| `--size-fileupload-dropzone-padding` | `var(--size-card-padding)` → `1.5rem` | Dropzone internal padding |
| `--size-fileupload-chip-gap` | `var(--size-tag-gap)` → `0.75rem` | Gap between chips |
| `--color-interactive-primary-bg` | `var(--primitive-black)` → `#1e1e1e` | Upload button background; dropzone focus ring |
| `--color-interactive-primary-fg` | `var(--primitive-white)` → `#ffffff` | Upload button text color |
| `--size-btn-px-sm` | `var(--primitive-scale-3)` → `0.75rem` | Upload button horizontal padding |
| `--size-btn-py-sm` | `var(--primitive-scale-1)` → `0.25rem` | Upload button vertical padding |
| `--size-btn-icon-gap-sm` | `var(--primitive-scale-1)` → `0.25rem` | Gap between icon and label in upload button |
| `--size-btn-radius` | `var(--primitive-radius-md)` → `4px` | Upload button border radius |
| `--primitive-font-size-sm` | `0.875rem` | Label font size |
| `--primitive-font-size-xs` | `0.75rem` | Description and dropzone hint font size; Upload button text |
| `--primitive-font-weight-medium` | `500` | Label weight |
| `--color-text-body` | `var(--primitive-gray-900)` → `#171717` | Label text color |
| `--color-text-muted` | `var(--primitive-gray-600)` → `#666666` | Description text color |
| `--size-form-group-gap` | `var(--primitive-scale-3)` → `0.75rem` | Gap between label block and control |
| `--size-label-to-description` | `var(--primitive-scale-1)` → `0.25rem` | Gap between label and description |
| `--color-error-text` | `var(--primitive-red-500)` → `#dc2626` | Error message text/icon color |
| `--color-interactive-disabled-bg` | `var(--primitive-gray-100)` → `#f5f5f5` | Dropzone background (disabled) |
| `--color-interactive-disabled-border` | `var(--primitive-gray-200)` → `#e5e5e5` | Dropzone border (disabled) |
| `--opacity-disabled` | `0.5` | Button and dropzone opacity (disabled) |

## 10. Responsive behavior
The button variant uses `display: inline-flex` in stacked mode and `display: flex; width: 100%` in horizontal mode. The dropzone variant always uses `width: 100%` and expands to fill its container. No built-in breakpoint overrides; the consumer controls container width. On narrow screens, chips in button stacked mode wrap to new lines.

## 11. Composition and usage patterns

**Form field usage (button, horizontal layout)**
Best for embedding inside `ElegantForm` alongside other fields. Place inside `ElegantField` and use `chipLayout="horizontal"` so the label and button sit on one row, chips appear below, matching the visual weight of adjacent text inputs.
`[STORYBOOK BLOCK: Simple/Forms/ElegantFileUpload/ButtonVariant]`

**Dedicated upload surface (dropzone)**
Use the dropzone variant when file upload is the primary or only action on the view (import flow, asset library). Combine with descriptive label and description text for full clarity.
`[STORYBOOK BLOCK: Simple/Forms/ElegantFileUpload/DropzoneVariant]`

**Filtered file types**
Pass `allowedTypes={['.pdf', '.docx']}` to restrict accepted files. The dropzone shows the allowed list automatically. The button variant does not show a type hint — add it via the `description` prop.

## 12. Related components
| Component | When to use it instead |
|---|---|
| ElegantChip | The chip strip uses ElegantChip internally. Use ElegantChip directly for non-file tag displays. |
| ElegantButton | Use when a custom upload trigger with different styling or icon is needed outside this component. |
| ElegantErrorMessage | Used internally by FileUpload. Use directly for validation errors on other custom inputs. |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Always provide a `label` and `description` to give users context about what files are expected. | Leave both `showLabel` and `showDescription` as `false` — the dropzone type hint alone is insufficient context for screen reader users. |
| Set `allowedTypes` explicitly in production forms to prevent invalid file submissions. | Rely on `allowedTypes` alone for security — validate file types server-side as well. |
| Use `chipLayout="horizontal"` when the file upload field appears among other labeled form fields. | Use `chipLayout="stacked"` in a horizontal form layout — the inline button + chips will misalign with adjacent fields. |
| Use the dropzone variant when the upload is the focal point of the page. | Use the dropzone variant inside a dense form alongside many other fields — it takes up too much vertical space. |
| Set `maxFiles` to match your backend's limit. | Leave `maxFiles` at its default of 5 if your endpoint supports fewer or more files. |
| Provide error recovery guidance in the description if users frequently upload wrong file types. | Show an error and leave no path to resolution — the chip X buttons and re-upload affordance are the recovery mechanism; make sure the description explains what is accepted. |

## 14. Changelog

### 2026-04-27
- **Disabled state:** Added `disabled` prop. Button variant: upload button receives `disabled` + `aria-disabled`; click/hover blocked; `opacity: var(--opacity-disabled)`. Dropzone variant: background uses `--color-interactive-disabled-bg`, border uses `--color-interactive-disabled-border`; `opacity: var(--opacity-disabled)`; `tabIndex: -1`; all drag/click/keyboard events blocked; `aria-disabled="true"`. Hidden input receives `disabled` in both variants.

**2026-04-27** — Add visually-hidden `aria-live="polite"` region that announces file count changes to screen readers
