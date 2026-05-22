# ElegantForm

`src/components/simple/ElegantForm.tsx`

## Summary
Form container system exported as five composable components: `ElegantForm`, `ElegantFormHeader`, `ElegantFormSection`, `ElegantFieldset`, and `ElegantField`. `ElegantFormFooter` provides the action-button row. A `useFormState` hook exposes form state to children via context.

---

## `ElegantForm`

Root form wrapper. Manages submission, reset, and dirty state via React context.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Form content. Required. |
| `onSubmit` | `(e: FormEvent) => void \| Promise<void>` | — | Submit handler. Required. |
| `disabled` | `boolean` | `false` | Passes `isDisabled` to context. |
| `className` | `string` | `''` | Extra class on the `<form>`. |
| `id` | `string` | — | Optional form id. |

### Context: `useFormState()`
Returns `{ isDirty, isDisabled, isResetting, isSubmitting }`.

### Behaviour
- `noValidate` on the `<form>` — uses `checkValidity()` before calling `onSubmit`
- Wraps `onSubmit` in try/finally to set `isSubmitting` correctly
- `handleReset` sets `isDirty: false`, briefly sets `isResetting: true` (one animation frame)
- `handleChange` sets `isDirty: true` on first change

---

## `ElegantFormHeader`

Bordered header section with a bold H2 title and optional description.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Required. |
| `description` | `string` | `''` | Helper text. |
| `showDescription` | `boolean` | `true` | Whether to render the description. |

Tokens: `--primitive-scale-6` padding, `--color-border-subtle` bottom border, `--size-heading-to-sub` gap.

---

## `ElegantFormSection`

Padded section with a bottom border. Optional bold H3 title.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Required. |
| `title` | `string` | `''` | Section heading. |
| `showTitle` | `boolean` | `false` | Whether to render the title. |

Tokens: `--primitive-scale-6` padding, `--color-border-subtle` bottom border, `--size-stack-gap` internal gap.

---

## `ElegantFieldset`

Bordered fieldset grouping for related fields.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Required. |
| `legend` | `string` | `''` | Fieldset legend text. |
| `showLegend` | `boolean` | `true` | Whether to render the legend. |

Tokens: `--color-border-subtle` border, `--primitive-radius-md`, `--primitive-scale-4` padding, `--size-form-group-gap` gap.

---

## `ElegantField`

Minimal flex column wrapper for a label + input + error trio.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Required. |
| `className` | `string` | `''` | Extra class. |

Tokens: `--size-form-group-gap` gap.

---

## `ElegantFormFooter`

Right-aligned action-button row at the bottom of the form.

### Props

| Prop | Type | Description |
|---|---|---|
| `children` | `React.ReactNode` | Required. Typically `ElegantButton` instances. |

Tokens: `--primitive-scale-6` padding, `--primitive-scale-3` gap.

---

## Usage example
```tsx
<ElegantForm onSubmit={handleSubmit}>
  <ElegantFormHeader title="Profile" description="Update your public information." />
  <ElegantFormSection>
    <ElegantField>
      <ElegantTextInput label="Name" value={name} onChange={setName} />
    </ElegantField>
    <ElegantField>
      <ElegantDropdown label="Country" options={countries} value={country} onChange={setCountry} />
    </ElegantField>
  </ElegantFormSection>
  <ElegantFormFooter>
    <ElegantButton text="Save" style="primary" />
  </ElegantFormFooter>
</ElegantForm>
```
