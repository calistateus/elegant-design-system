# ElegantSearch

`src/components/simple/ElegantSearch.tsx`

## Summary
Search input with optional autocomplete dropdown. The `Search` icon is always left-anchored; a clear (`X`) button appears when the field has a value. Keyboard-navigable suggestion list when `autocomplete={true}`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Controlled value. |
| `onChange` | `(value: string) => void` | — | Value change handler. |
| `onSelect` | `(value: string) => void` | — | Called when a suggestion is selected. |
| `label` | `string` | `'Label'` | Label text. |
| `showLabel` | `boolean` | `true` | Whether to render the label. |
| `description` | `string` | `'Supporting description text.'` | Helper text. |
| `showDescription` | `boolean` | `true` | Whether to render the description. |
| `placeholder` | `string` | `'Search…'` | Placeholder text. |
| `showPlaceholder` | `boolean` | `true` | Whether to show the placeholder. |
| `autocomplete` | `boolean` | `false` | Enables the suggestion dropdown. |
| `suggestions` | `string[]` | `[]` | Suggestion options (filtered client-side by substring match). |
| `id` | `string` | auto (`useId`) | Explicit input id. |

## Autocomplete behaviour
- Dropdown opens on focus (if filtered suggestions exist) and on typing
- Case-insensitive substring matching — matched characters are wrapped in `<strong>`
- Keyboard: `↑`/`↓` to navigate, `Enter` to select, `Escape` to close
- Clicking outside the container closes the dropdown (`onBlur` delegate)
- Listbox closes on selection; input regains focus

## Input border states

| State | Border | Shadow |
|---|---|---|
| Default | `--primitive-gray-300` | none |
| Focused or open | `--primitive-gray-600` | `0 0 0 2px --primitive-gray-200` |
| Dropdown open | top-left + top-right only radii (bottom merges with list) | — |

## Tokens used
- `--primitive-gray-300`, `--primitive-gray-600`, `--primitive-gray-200`, `--primitive-gray-100` — borders/backgrounds
- `--primitive-white`
- `--primitive-radius-md`
- `--primitive-scale-2`, `--primitive-scale-3`, `--primitive-scale-8` — padding/icon offsets
- `--primitive-font-sans`, `--primitive-font-size-sm`, `--primitive-font-weight-regular`, `--primitive-font-weight-medium`
- `--color-text-title`, `--color-text-body`, `--color-text-muted`
- `--primitive-duration-fast`, `--primitive-duration-instant` — transitions

## ARIA
- `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls`, `aria-activedescendant` when `autocomplete=true`
- Listbox: `role="listbox"`; options: `role="option"`, `aria-selected`
- Clear button: `aria-label="Clear search"`, `tabIndex={-1}`

## Usage example
```tsx
<ElegantSearch
  label="Search projects"
  value={query}
  onChange={setQuery}
  onSelect={handleSelect}
  autocomplete
  suggestions={['Design Systems', 'Consumer Tools', 'AI Products']}
/>
```

## Notes
- Native browser search-cancel button is hidden via a scoped `<style>` tag.
- `autoComplete="off"` prevents browser autofill from conflicting with the custom dropdown.
