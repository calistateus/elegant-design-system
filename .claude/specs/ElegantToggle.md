# ElegantToggle

`src/components/simple/ElegantToggle.tsx`

## Summary
On/off toggle switch (pill + thumb). Supports both uncontrolled (internal state) and controlled (via `toggled` + `onToggle`) modes. Keyboard accessible — Space and Enter activate the toggle.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Label text. Required. |
| `description` | `string \| false` | — | Optional helper text below the label. |
| `toggled` | `boolean` | `false` | Controlled on/off state. |
| `onToggle` | `(value: boolean) => void` | — | When provided, switches to controlled mode. |
| `disabled` | `boolean` | `false` | Disables the toggle. Applies `opacity: var(--opacity-disabled)`, `cursor: not-allowed`, removes tab stop, and blocks click/keyboard interaction. |
| `ariaLabel` | `string` | `label` | Accessible name override. Defaults to the visible label text. |

## Controlled vs uncontrolled
- **Controlled** (`onToggle` provided): `isOn` reads from `toggled` prop.
- **Uncontrolled** (no `onToggle`): `isOn` reads from internal `useState`. `toggled` sets initial value only.

## Visual states

| State | Pill background | Thumb position |
|---|---|---|
| Off | `--color-interactive-primary-bg` | left: 0.125 rem |
| On | `--color-interactive-primary-bg` | left: `calc(2rem - 1rem - 0.125rem)` |

Thumb: 1 rem × 1 rem, white (`--color-interactive-primary-fg`), 0.2s ease transition.

## Layout
- Wrapper: row flex, `align-items: flex-start`, gap `--size-tag-gap`
- Text group (label + description) comes first; pill is on the right

## Tokens used
- `--color-interactive-primary-bg` — pill background (both on and off states; thumb position indicates state)
- `--color-interactive-primary-fg` — thumb colour
- `--size-tag-gap` — wrapper gap
- `--size-label-to-description` — gap between label and description
- `--primitive-font-sans`, `--primitive-font-size-sm`, `--primitive-font-size-xs`
- `--primitive-font-weight-medium`, `--primitive-font-weight-regular`
- `--color-text-title`, `--color-text-muted`

## ARIA
- `role="switch"`, `aria-checked={isOn}`, `tabIndex={0}` on the wrapper `<div>`
- Pill: `aria-hidden="true"`

## Keyboard
- `Space` or `Enter` → triggers toggle

## Usage example
```tsx
// Controlled
<ElegantToggle
  label="Receive notifications"
  description="Push alerts for key events."
  toggled={notify}
  onToggle={setNotify}
/>

// Uncontrolled
<ElegantToggle label="Dark mode" />
```
