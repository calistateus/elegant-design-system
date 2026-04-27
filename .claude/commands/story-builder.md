---
name: story-builder
description: Generates Storybook .stories.tsx files for design system components. Enforces prop control conventions for images, icons, and text. Use when building or updating a story file for any component in src/components/.
---

# Story Builder Skill

You are writing a Storybook `.stories.tsx` file for a design system component. Follow every rule below without exception.

## Required Reading

Before writing any story:

1. Read the component file (e.g. `src/components/simple/ComponentName.tsx`) to understand its actual props.
2. Read the component spec in `.claude/specs/` if one exists (files are named `Elegant[ComponentName]Spec.md`).
3. Read `context/ui-builder.md` for token and style rules.

## Prop Control Conventions

These are non-negotiable. Apply them based on the semantic type of the prop, regardless of its name.

### Images → File Upload
Any prop that accepts an image path or image source **must** use a file upload control. Never use `control: 'text'` for image paths.

```tsx
imagePath: {
  control: { type: 'file', accept: '.png,.jpg,.jpeg,.webp,.gif,.svg' },
},
```

If the component accepts the image via a nested data object, use a flat `Args` type in the story and map it in a `render` function — do not reach into nested objects with file controls.

### Icons → Instance Swap (Select + Mapping)
Any prop typed as `LucideIcon` or equivalent **must** use a select control mapped to Lucide icon components. Never pass a raw string.

```tsx
import {
  Zap, ShieldCheck, Star, ArrowRight, Globe, Lock,
  Layers, Cpu, BarChart2, Sparkles, Rocket, Code2,
  Users, Settings, Database, CloudUpload, Search, Bell,
  PenLine, Palette, Link2, LayoutGrid, Eye, Lightbulb,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconOptions: Record<string, LucideIcon> = {
  Zap, ShieldCheck, Star, ArrowRight, Globe, Lock,
  Layers, Cpu, BarChart2, Sparkles, Rocket, Code2,
  Users, Settings, Database, CloudUpload, Search, Bell,
  PenLine, Palette, Link2, LayoutGrid, Eye, Lightbulb,
};

// In argTypes:
icon: {
  options: Object.keys(iconOptions),
  mapping: iconOptions,
  control: { type: 'select' },
},
```

### Text → Text Input
Any prop that accepts a string displayed as UI copy (label, heading, description, quote, tag, etc.) **must** use `control: 'text'`.

```tsx
heading: { control: 'text' },
description: { control: 'text' },
```

## No Unnecessary Props

Only expose controls for props the user can meaningfully vary in the story. Apply this filter:

| Prop type | Rule |
|---|---|
| Fixed per variant (e.g. `style`, `context`, `variant`) | Set in `args`, hide with `table: { disable: true }` |
| Implementation details (`onClick`, `className`, `ref`) | Always hide with `table: { disable: true }` |
| Internal layout/wiring props | Always hide |
| User-editable content (text, icon, image, boolean flags) | Expose with the correct control above |

Do NOT create props that don't exist on the component. Do NOT add wrapper props, convenience aliases, or intermediate types unless you need a flat `Args` type for a `render` function (e.g. when a component takes a nested data object).

## Story Structure Rules

### Variants = spec only
Only create the variants explicitly listed in the component spec or user request. Do NOT add `AllVariants`, `Playground`, `Overview`, or any convenience story.

### No free-form color controls
Disable `backgroundColor`, `color`, and any visual token controls in `argTypes`. Add `backgrounds: { disable: true }` to `parameters`.

### Lock fixed props
Props fixed per variant must be set in `args` and hidden from controls via `argTypes`.

### Enum states → Select control
Any prop typed as a string union of visual states (e.g. `'unselected' | 'selected' | 'indeterminate'`, `'default' | 'active' | 'disabled'`) **must** use a select control with the union values as options. Do **not** split these into separate stories — expose the select so one story covers all states.

```tsx
checkboxState: {
  options: ['unselected', 'selected', 'indeterminate'],
  control: { type: 'select' },
},
```

### `string | false` props → text + boolean pair
Any prop typed as `string | false` must be split into two flat args: a text control for the content and a boolean toggle for visibility. Use a `render` function to map them back into the `string | false` shape the component expects.

```tsx
type Args = {
  description: string;
  showDescription: boolean;
  // ...other props
};

// In meta:
render: ({ description, showDescription, ...rest }) => (
  <Component description={showDescription ? description : false} {...rest} />
),

// In argTypes:
description: { control: 'text' },
showDescription: { control: 'boolean' },
```

### Boolean flags
Use `control: 'boolean'` for any `boolean` prop the user can toggle.

```tsx
showAvatar: { control: 'boolean' },
```

## File Template

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '@/components/simple/ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Simple/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    // text props
    heading: { control: 'text' },
    // icon props
    icon: {
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      control: { type: 'select' },
    },
    // image props
    imagePath: {
      control: { type: 'file', accept: '.png,.jpg,.jpeg,.webp,.gif,.svg' },
    },
    // fixed per variant — hidden
    variant: { table: { disable: true } },
    // implementation props — always hidden
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    heading: 'Example heading',
  },
};
```

## When Component Takes Nested Data Objects

If the component prop is a single data object (e.g. `data: { title, imagePath, tags }`), create a flat `Args` type and use a `render` function to map args into the data shape:

```tsx
type Args = {
  title: string;
  imagePath: string | string[];
  tag: string;
};

const meta: Meta<Args> = {
  title: 'Simple/ComponentName',
  render: ({ title, imagePath, tag }) => {
    const src = Array.isArray(imagePath) ? imagePath[0] : imagePath;
    return <ComponentName data={{ id: 'preview', title, imagePath: src ?? '', tags: [tag] }} />;
  },
  argTypes: {
    title: { control: 'text' },
    tag: { control: 'text' },
    imagePath: {
      control: { type: 'file', accept: '.png,.jpg,.jpeg,.webp,.gif,.svg' },
    },
  },
  parameters: { backgrounds: { disable: true } },
};
```

## Conditional Slot Controls (Repeating Items)

When a component accepts a variable-length array of items (e.g. menu items, list rows, tab slots), expose each slot as an individually gated group — never use a count range to hide/show controls.

**Rule: Storybook's `if` condition only supports `truthy`, `exists`, `eq`, `neq`. Never use `gt`, `gte`, `lt`, or `lte` — they are not in the `ConditionalTest` type and are silently ignored, causing all controls to always show.**

### Pattern: `showN` boolean gates

Add individual `show` boolean args for slots 2–N (slot 1 always visible). Gate every control in that slot on its `showN` arg. Filter the rendered array by `show` in the `render` function.

```tsx
type Args = {
  // slot visibility (slot 1 is always on — no toggle needed)
  item2Show: boolean;
  item3Show: boolean;
  // ...

  // slot content
  item1Label: string; item1Danger: boolean;
  item2Label: string; item2Danger: boolean;
  // ...
};

// In meta:
render: (a) => {
  const slots = [
    { show: true,        label: a.item1Label, danger: a.item1Danger },
    { show: a.item2Show, label: a.item2Label, danger: a.item2Danger },
    // ...
  ];
  const items = slots.filter(s => s.show).map(s => ({ ... }));
  return <Component items={items} />;
},

// In argTypes:
item2Show:  { name: 'Item 2', control: 'boolean', table: { category: 'Items' } },
item3Show:  { name: 'Item 3', control: 'boolean', table: { category: 'Items' } },

item1Label: { name: 'Label', control: 'text', table: { category: 'Item 1' } },
item2Label: { name: 'Label', control: 'text', table: { category: 'Item 2' }, if: { arg: 'item2Show', truthy: true } },
item3Label: { name: 'Label', control: 'text', table: { category: 'Item 3' }, if: { arg: 'item3Show', truthy: true } },

// In args (default: first 3–4 slots on, rest off):
item2Show: true,
item3Show: true,
item4Show: false,
```

### Nested conditional controls (e.g. sub-menus per slot)

Gate sub-menu controls on the parent slot's own boolean (e.g. `itemNHasSub`), not on the slot-visibility arg. This ensures sub controls only appear when both the slot is visible AND the feature is toggled on — Storybook evaluates only the single `if` condition per control, so rely on the most specific gate.

```tsx
item2HasSub:   { name: 'Sub-menu', control: 'boolean', table: { category: 'Item 2' }, if: { arg: 'item2Show',   truthy: true } },
item2Sub1Label:{ name: 'Sub 1',    control: 'text',    table: { category: 'Item 2 — Sub' }, if: { arg: 'item2HasSub', truthy: true } },
```

## Output

1. Write the story to `src/stories/[ComponentName].stories.tsx`.
2. Report the file path and list of exported story names.
3. If Storybook is not running, start it with `npm run storybook`.
