---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantSearch.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantSearch.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 4 (Variants): The `autocomplete={false}` mode accepts typed text but shows no suggestions and fires no `onSelect` — effectively a plain search field. Behavior needs product clarification on what happens after the user presses Enter.
- Section 5 (States): No explicit loading or empty-suggestions state is defined in the component.

**Recommended follow-ups:**
- Only one story exported. Add named stories for: autocomplete off, with value (clear button visible), keyboard-navigated suggestion, mobile viewport.
- The `onSelect` callback fires on suggestion selection but is not fired when the user presses Enter on free-form text — clarify intended behavior for free-form submission.
- Native browser search cancel button is hidden via an injected `<style>` block using `CSS.escape` — this is a pragmatic fix but worth noting for CSP environments.
- No `disabled` prop — add if needed for form contexts.
- No `error` / `showError` props — add if validation is needed.

---

# Search

## 1. Overview
A search field with an optional autocomplete suggestion list, used to filter or look up content by typing, with keyboard-navigable suggestions and a clear button.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Filtering a data set by typing with instant suggestions | Selecting from a fixed list without typing — use Dropdown |
| Site-wide or section-wide search with known suggestion data | Short text entry unrelated to searching — use TextInput |
| Typeahead UIs where partial matches should surface | Multi-field data entry — use dedicated form components |
| Any search field needing a clear/reset affordance | Date or time selection — use DateInput or DateTimePicker |

## 3. Anatomy
1. **Label** — `<label>` linked to the input via `htmlFor`.
2. **Description** — Supporting text below the label.
3. **Search icon** — Lucide `Search` icon (14 px) anchored to the left edge; always visible; `pointerEvents: none`.
4. **Input field** — `<input type="search">`. When `autocomplete={true}`, carries `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls`, and `aria-activedescendant`.
5. **Clear button** — An `X` icon button visible on the right when the field has a value. Clears the value and returns focus to the input. `aria-label="Clear search"`.
6. **Suggestion listbox** — `<ul role="listbox">` appearing below the input (attached border, no gap) when `autocomplete={true}` and filtered suggestions exist.
7. **Suggestion item** — Each `<li role="option">` with a mini search icon, bold-highlighted match text, and hover/active background.

`[STORYBOOK BLOCK: Simple/Forms/Search/Search]`

## 4. Variants

**With autocomplete (default)**
- `autocomplete={true}`: the input carries combobox ARIA, filtered suggestions appear as the user types, and keyboard navigation (Arrow keys, Enter, Escape) is fully handled.
- Use when the suggestion dataset is available client-side.
- Default in Storybook (`autocomplete: true`).

`[STORYBOOK BLOCK: Simple/Forms/Search/Search]`

**Without autocomplete**
- `autocomplete={false}`: renders a plain search field with left icon and clear button. No suggestions panel.
- Use for simple search bars where results are fetched server-side after explicit submission (e.g., pressing Enter), or when no suggestion data is available.
- `onSelect` will never fire in this mode.

`[STORYBOOK BLOCK: Simple/Forms/Search/Search]`

## 5. States

**Default (empty)**
- Triggered: on initial render with no value.
- Visually: left search icon, placeholder text, `1px solid var(--primitive-gray-300)` border, no clear button.
- Behavior: focusable.

**Focused (empty)**
- Triggered: field receives focus with no value.
- Visually: border becomes `var(--primitive-gray-600)`; focus ring `0 0 0 2px var(--primitive-gray-200)`. If `autocomplete={true}` and suggestions exist, the listbox opens immediately.
- Behavior: keyboard input begins filtering.

**With value (clear button visible)**
- Triggered: `value` is a non-empty string.
- Visually: clear button (`X` icon) appears on the right; input right padding adjusts to `var(--primitive-scale-8)`.
- Behavior: clicking the clear button calls `onChange('')`, closes the listbox, returns focus to the input.

**Suggestions open**
- Triggered: `autocomplete={true}`, field is focused, filtered suggestions exist.
- Visually: input border radius flattens on the bottom two corners; listbox appears below with a shared left/right border.
- Behavior: mouse hover highlights suggestions (sets `activeIndex`); keyboard ArrowDown/Up cycles through items; Enter selects; Escape closes.

**Suggestion active (keyboard)**
- Triggered: user presses ArrowDown or ArrowUp.
- Visually: the active item receives `background: var(--primitive-gray-100)`. `aria-activedescendant` on the input points to the active item's `id`.
- Behavior: Enter selects the active item, calls `onChange` and `onSelect`, closes the listbox.

**No results**
- Triggered: `autocomplete={true}`, input is focused, query is non-empty, and no suggestions match.
- Visually: listbox opens showing a single muted `<li>` with text `No results for "{value}"`. `aria-live="polite"` is set on the item so screen readers announce it without interrupting.
- Behavior: listbox closes on blur as usual.

**Disabled**
- Triggered: when `disabled={true}`.
- Visually: input background becomes `--color-interactive-disabled-bg` (#f5f5f5); border becomes `--color-interactive-disabled-border` (#e5e5e5); opacity drops to `var(--opacity-disabled)` (0.5); cursor becomes `not-allowed`.
- Behavior: input receives `disabled` and `aria-disabled="true"`. `onChange` is blocked. Focus ring is suppressed. The suggestion listbox cannot open.

**Blurred**
- Triggered: focus leaves the container (checked via `containerRef` in `onBlur`).
- Visually: border returns to `var(--primitive-gray-300)`; focus ring removed; listbox closes.

`[STORYBOOK BLOCK: Simple/Forms/Search/Search]`

## 6. Properties

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `string` | — | No | Controlled value of the search input. |
| `onChange` | `(value: string) => void` | — | No | Called on every keystroke and on clear. |
| `onSelect` | `(value: string) => void` | — | No | Called only when a suggestion is explicitly selected (click or Enter). Not called on free-form input. |
| `label` | `string` | `'Label'` | No | Label text. |
| `showLabel` | `boolean` | `true` | No | When `false`, label is not rendered. |
| `description` | `string` | `'Supporting description text.'` | No | Supporting description text. |
| `showDescription` | `boolean` | `true` | No | When `false`, description is not rendered. |
| `placeholder` | `string` | `'Search…'` | No | Placeholder text. |
| `showPlaceholder` | `boolean` | `true` | No | When `false`, no placeholder attribute is set. |
| `autocomplete` | `boolean` | `false` (stories default: `true`) | No | When `true`, enables suggestion panel and combobox ARIA. |
| `suggestions` | `string[]` | `[]` | No | Full list of suggestion strings. Filtered client-side against the current value. |
| `id` | `string` | auto-generated (`useId`) | No | Overrides the generated id. |
| `disabled` | `boolean` | `false` | No | Disables the search field. Applies greyed-out styling and blocks all input, focus, and listbox interaction. |

## 7. Content guidelines
- **Label text:** Describe what is being searched (e.g., "Search projects", "Find a team member"). Avoid generic "Search".
- **Description text:** Optional; use when the scope of the search might be unclear (e.g., "Search by name or email.").
- **Placeholder text:** Use the form "Search…" or a brief hint ("Search by skill…"). Keep short.
- **Suggestion labels:** Surface natural language strings as they exist in the dataset. The component bolds the matching substring automatically.
- **Clear button:** No text label — communicated solely by the `X` icon and `aria-label="Clear search"`. Do not rename.

## 8. Accessibility

**Keyboard navigation**
- Tab moves focus to the input; Shift+Tab moves away.
- ArrowDown opens the listbox (if closed) or moves the active index down.
- ArrowUp moves the active index up.
- Enter selects the currently active suggestion.
- Escape closes the listbox and clears `activeIndex`.
- Clear button has `tabIndex={-1}` — it is not reachable by Tab; clearing is only available via mouse. [NEEDS CONFIRMATION — gap for keyboard-only users. Recommend making the clear button tab-reachable or adding a keyboard shortcut.]

**Screen reader behavior**
- Input carries `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls={listboxId}` when `autocomplete={true}`.
- `aria-activedescendant` points to the active option's `id` during keyboard navigation.
- Listbox is `<ul role="listbox">`; items are `<li role="option" aria-selected={isActive}>`.
- The bold match highlighting is purely visual — screen readers read the full label text.
- Description is not linked via `aria-describedby` [gap].

**Color and contrast**
- Highlighted match text uses `font-weight: medium` (not color) to differentiate — meets contrast requirements.
- Active item background `#f5f5f5` on white is a very low visual change; rely on `aria-activedescendant` for screen readers.

**Motion**
- Border and shadow at 150 ms; border-radius transition 100 ms when listbox opens/closes. No `prefers-reduced-motion` override.

**Touch / pointer**
- Suggestion items: ~32 px height at default font size — below 44 px target [gap].
- Clear button is zero-padding, zero-border — very small tap target [gap; add padding].

**Known gaps**
- Clear button not reachable by keyboard Tab.
- No `prefers-reduced-motion` support.
- Description not linked via `aria-describedby`.
- No `error` prop.
- Suggestion item and clear button tap targets may be under 44 px.
- No-results message is `aria-live="polite"` only — assertive announcement not used to avoid disrupting screen reader flow.

## 9. Design tokens

| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--primitive-font-size-sm` | `0.875rem` | Input and suggestion text |
| `--primitive-font-size-xs` | `0.75rem` | Description text |
| `--primitive-font-weight-medium` | `500` | Label; matched text in suggestions |
| `--primitive-font-weight-regular` | `400` | Input and suggestion text |
| `--color-text-title` | `#1e1e1e` | Label color |
| `--color-text-body` | `#171717` | Input and suggestion text |
| `--color-text-muted` | `#666666` | Description, icons, placeholder (via globals.css) |
| `--color-bg-main` | `var(--primitive-white)` = `#ffffff` | Input and listbox background |
| `--primitive-gray-100` | `#f5f5f5` | Active suggestion background |
| `--shadow-focus-ring` | `0 0 0 2px var(--primitive-gray-200)` = `0 0 0 2px #e5e5e5` | Focus ring |
| `--color-border-input` | `var(--primitive-gray-300)` = `#d4d4d4` | Default border |
| `--color-border-input-focus` | `var(--primitive-gray-600)` = `#666666` | Focus border; open listbox border |
| `--size-input-radius` | `var(--primitive-radius-md)` = `4px` | Input border radius (when listbox closed); listbox bottom corners |
| `--size-input-padding` | `var(--primitive-scale-2) var(--primitive-scale-3)` | Input padding (vertical / horizontal) |
| `--size-menu-item-padding` | `var(--primitive-scale-2) var(--primitive-scale-3)` | Suggestion item padding |
| `--motion-interactive-color` | `color 150ms ease` | Border/shadow transitions (fontFamily now inherited from body) |
| `--primitive-scale-1` | `0.25rem` | Wrapper gap; listbox vertical padding |
| `--primitive-scale-8` | `2rem` | Input left padding (for search icon); right padding when value exists |
| `--shadow-popover` | `0 4px 12px rgba(0,0,0,0.08)` | Listbox shadow |
| `--color-interactive-disabled-bg` | `var(--primitive-gray-100)` → #f5f5f5 | Input background (disabled) |
| `--color-interactive-disabled-border` | `var(--primitive-gray-200)` → #e5e5e5 | Input border (disabled) |
| `--opacity-disabled` | `0.5` | Input opacity (disabled) |

## 10. Responsive behavior
Component is `width: 100%`. The suggestion listbox matches the input width. No breakpoint-specific adjustments. On narrow viewports the listbox scrolls vertically at `max-height: 240px`. On mobile, the keyboard opening may shift layout — ensure the parent page accommodates this.

## 11. Composition and usage patterns

**Site search with suggestions**
The primary pattern: `autocomplete={true}` with a curated `suggestions` array. Wire `onSelect` to navigate to or filter results. Wire `onChange` to update the query value.

**Server-side search (no suggestions)**
Set `autocomplete={false}` and place the Search inside a `<form>` that submits on Enter. The component handles the clear button locally; form submission is the caller's responsibility.

**Inline table filter**
Mount Search without a label (`showLabel={false}`) above a data table. Wire `onChange` to a filter function that re-renders visible rows. No `onSelect` needed.

`[STORYBOOK BLOCK: Simple/Forms/Search/Search]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| TextInput | When the field is for text entry, not search/filter |
| Dropdown | When the user must pick from a fixed list without typing |
| DateInput | When the "query" is specifically a date value |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Provide a `suggestions` array that matches the searchable data set when using `autocomplete={true}`. | Pass an empty `suggestions` array with `autocomplete={true}` — the listbox will never open, rendering autocomplete useless. |
| Use `onSelect` to capture when a user explicitly picks a suggestion, distinct from free typing. | Rely on `onChange` alone to know when the user has committed to a value — `onChange` fires on every keystroke. |
| Wire `onChange` to clear the `value` state when the clear button is clicked (the component calls `onChange('')`). | Make the search field uncontrolled — always manage `value` externally. |
| Keep suggestion strings short and consistent in casing — the bold-match highlight can look odd with inconsistent formatting. | Surface hundreds of suggestions at once — the listbox is scrollable at 240 px max height, but cognitive load increases rapidly. |
| Show a label even in compact layouts; hide it via `showLabel={false}` only if surrounding context makes the field's purpose completely unambiguous. | Omit both label and description in forms — screen readers and keyboard users depend on the label. |
| Use `autocomplete={false}` for server-side search where suggestions require a round-trip. | Use `autocomplete={true}` with stale or empty suggestion data — it signals filtering is available when it isn't. |

## 14. Changelog

### 2026-04-27
- **Accessibility:** Added no-results message in the suggestion listbox when `autocomplete={true}`, the query is non-empty, and no suggestions match. The message renders as `No results for "{value}"` with `aria-live="polite"` so screen readers announce it without interrupting ongoing announcements.
- **Disabled state:** Added `disabled` prop. Input receives `disabled` + `aria-disabled`; background uses `--color-interactive-disabled-bg`, border uses `--color-interactive-disabled-border`; opacity `var(--opacity-disabled)` (0.5); cursor `not-allowed`; all event handlers blocked; focus ring suppressed.
- **Tokens:** Replaced primitive token references with semantic equivalents (`--color-border-input`, `--color-border-input-focus`, `--shadow-focus-ring`, `--size-input-radius`, `--size-input-padding`, `--size-menu-item-padding`, `--color-bg-main`, `--motion-interactive-color`). Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.
