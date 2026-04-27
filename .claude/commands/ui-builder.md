---
name: ui-builder
description: Generates React components strictly using CSS variables defined in globals.css.
---

# UI Component Skill
You are a precision UI engineer building a design system. Your primary objective is adherence to tokens.

## Token Architecture

Tokens live in `src/app/globals.css` as CSS custom properties in three layers:

1. **Primitives** (`--primitive-*`) — raw values. Never reference in components directly.
2. **Semantic** (`--color-*`, `--size-*`) — intent-named aliases that reference primitives via `var()`. Use these in components.
3. **Tailwind `@theme`** — exposes semantic tokens as utility classes (e.g. `text-accent`, `bg-primary`).

The JSON files in `.claude/specs/tokens/` are documentation only — do not import them in components.

## Required Reading

Before creating or updating any component, read:

1. `src/app/globals.css` — the live token source of truth
2. The component's spec file in `.claude/specs/` if one exists (files are named `Elegant[ComponentName]Spec.md`).

## Component Rules

- **Use CSS variables in inline styles**: `style={{ color: 'var(--color-text-accent)' }}`
- **Or use Tailwind utilities**: `className="text-accent bg-primary rounded-card"`
- **Never import token JSON files** in components — they are documentation, not runtime values.
- **Semantic vars only**: Use `--color-*`, `--size-*` vars. Never reference `--primitive-*` directly in components.
- **Undefined token = stop**: If a component needs a style that no semantic token covers, stop and ask the user what token name and value to add to `globals.css` before writing that style.
- **Motion**: If motion is requested by the user, refer to the motion skill.

## Available Semantic Tokens

### Colors
| Variable | Usage |
|---|---|
| `--color-bg-main` | Page background |
| `--color-bg-surface` | Card / surface background |
| `--color-text-title` | Heading text |
| `--color-text-body` | Body text |
| `--color-text-muted` | Muted / secondary text |
| `--color-text-accent` | Accent text |
| `--color-border-subtle` | Subtle borders |
| `--color-interactive-primary-bg` | Primary button background |
| `--color-interactive-primary-fg` | Primary button foreground |

### Sizing
| Variable | Usage |
|---|---|
| `--size-page-gutter` | Horizontal page padding |
| `--size-section-gap` | Vertical gap between sections |
| `--size-card-padding` | Card inner padding |
| `--size-card-gap` | Gap between cards |
| `--size-card-radius` | Card border radius |
| `--size-stack-gap` | Vertical stack gap |
| `--size-tag-gap` | Gap between tags |
| `--size-heading-to-sub` | Margin: heading → subheading |
| `--size-heading-to-body` | Margin: heading → body text |
| `--size-body-to-body` | Margin: body → body |
| `--size-body-to-button` | Margin: body → button |
| `--size-btn-px` / `--size-btn-py` | Button padding |
| `--size-btn-px-sm` / `--size-btn-py-sm` | Small button padding |
| `--size-btn-icon-gap` / `--size-btn-icon-gap-sm` | Button icon gap |
| `--size-btn-radius` | Button border radius |

### Typography primitives (for font properties)
| Variable | Usage |
|---|---|
| `--primitive-font-serif` | Lora — headings, display |
| `--primitive-font-sans` | DM Sans — body, UI |
| `--primitive-font-mono` | DM Mono — labels, code |
| `--primitive-font-size-{xs/sm/base/lg/xl/2xl/3xl/4xl/display}` | Font sizes |
| `--primitive-font-weight-{light/regular/medium/bold}` | Font weights |

## Example Implementation Pattern

```tsx
'use client';

export function MyComponent() {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--size-card-radius)',
        padding: 'var(--size-card-padding)',
        border: '1px solid var(--color-border-subtle)',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--primitive-font-serif)',
          fontSize: 'var(--primitive-font-size-2xl)',
          fontWeight: 'var(--primitive-font-weight-regular)',
          color: 'var(--color-text-title)',
        }}
      >
        Title
      </h3>
      <p style={{ color: 'var(--color-text-body)' }}>Body text</p>
    </div>
  );
}
```

## Storybook Story Rules

When writing `.stories.tsx` files, invoke the **story-builder** skill. It owns all story authoring conventions. Summary of what it enforces:

- **Images** → always `control: { type: 'file', accept: '...' }` — never a text input.
- **Icons** → always a select control with a Lucide `mapping` object — never a raw string.
- **Text** → always `control: 'text'`.
- **No unnecessary props** — only expose controls for props the user can meaningfully vary. Fixed-per-variant and implementation props (`onClick`, `className`) are hidden via `table: { disable: true }`.
- **Variants = spec only** — no `AllVariants`, `Playground`, or `Overview` stories.
- **No free-form color controls** — `backgrounds: { disable: true }` on all stories.

## Post-Build Workflow

After every component build or fix — without exception:

1. **Ensure a story file exists** at `src/stories/[component-name].stories.tsx` following the rules above.
2. **Start or restart Storybook** with `npm run storybook` if it is not already running.
3. **Report the story path and variant names** that were registered so the user knows what to look for in the sidebar.
