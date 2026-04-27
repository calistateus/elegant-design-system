---
name: layout-builder
description: Makeshift RAG for composing page layouts from this project's tokens and components. Surfaces the component index, asks what to use, then reads only the selected specs before generating.
---

# Layout Builder

You are a layout architect for this portfolio. Your job is to assemble a page section or full page using the project's token system and component library — without reading any component files or spec files until the user tells you which components to include.

## Step 1 — Understand the layout goal

Ask the user:

> "What section or page are you building? Describe the content, purpose, and any rough structure you have in mind (e.g. hero with CTA, case study grid, contact form section)."

Wait for their response before proceeding.

## Step 2 — Present the component index

Without reading any files, show the user the full list of available components from the Simple library:

```
Available components (Simple / TypeUI Elegant):

Layout & Structure
  ElegantDivider        — horizontal rule / section separator
  ElegantTabs           — tab strip
  ElegantTabsContainer  — tab strip + content panel wrapper
  ElegantPagination     — page number controls
  ElegantModal          — overlay dialog

Content & Display
  ElegantCardPack       — grid of cards with image, title, tags
  ElegantCaseStudyCard  — featured case study card with image + meta
  ElegantIconCard       — icon + heading + body card
  ElegantReferralCard   — testimonial / referral quote card
  ElegantCarousel       — horizontal scroll of items
  ElegantImage          — responsive image wrapper
  ElegantAvatar         — user avatar with optional label
  ElegantBadge          — small status / label chip
  ElegantAlert          — inline alert / banner

Navigation & Actions
  ElegantButton         — primary / secondary button with optional icon
  ElegantButtonGroup    — row of grouped buttons
  ElegantBreadcrumbs    — path breadcrumb trail
  ElegantDropdown       — select / dropdown menu
  ElegantSearch         — search input with icon

Forms & Inputs
  ElegantForm           — form wrapper with layout
  ElegantTextInput      — single-line text field
  ElegantDateInput      — date picker field
  ElegantCheckbox       — single checkbox
  ElegantCheckboxGroup  — labelled checkbox list
  ElegantRadio          — single radio button
  ElegantRadioGroup     — labelled radio list
  ElegantToggle         — on/off toggle switch
  ElegantRangeSlider    — min/max range input
  ElegantPicklist       — dual-pane item selector
  ElegantWheelPicker    — scroll-wheel value picker

Feedback & Status
  ElegantSpinner        — loading indicator
  ElegantLinearProgress — progress bar
  ElegantToast          — transient notification
  ElegantTooltip        — hover tooltip
  ElegantErrorMessage   — field-level error text
  ElegantAccordion      — expand / collapse panel
```

Then ask:

> "Which of these components do you want in the layout? List them by name (e.g. ElegantButton, ElegantCardPack). You can also say 'none' to build with raw token-based markup only."

Wait for their response.

## Step 3 — Read only the selected specs (RAG retrieval)

Once the user names their components, read **only** the spec files for those components. For each component named `ElegantFoo`, read:

- `.claude/specs/ElegantFoo.md` — always
- `.claude/specs/ElegantFooSpec.md` — only if it exists (check `ElegantButtonSpec.md`, `ElegantCardPackSpec.md`, `ElegantCaseStudyCardSpec.md`, `ElegantIconCardSpec.md`, `ElegantReferralCardSpec.md`, `ElegantTextInputSpec.md` — these are the ones that have extended specs)

Also always read:
- `src/app/globals.css` — live token source of truth

Do not read any component `.tsx` files unless the spec is missing critical prop information.

## Step 4 — Clarify before building

Before writing any code, confirm:

1. The **file path** where the layout should be written (e.g. `src/app/page.tsx`, `src/components/simple/HeroSection.tsx`)
2. Whether this is a **full page** (with `<main>` wrapper) or a **section component** (exported function, no page shell)
3. Any **content** to wire up from `src/data/content.ts` — ask if data should come from there or be hardcoded as placeholder text

## Step 5 — Generate the layout

Write the layout file following these rules:

### Token rules (non-negotiable)
- Use only semantic CSS variables: `--color-*`, `--size-*`
- Never reference `--primitive-*` directly in layout markup
- Use Tailwind utility classes where semantic tokens are exposed via `@theme` (e.g. `text-accent`, `bg-primary`, `rounded-card`)
- Never hardcode hex values, pixel sizes, or font stacks — use tokens or stop and ask what token to add

### Component import rules
- Import from `@/components/simple/ElegantFoo`
- Pass only props listed in the spec — no invented props
- For icon props, import the icon from `lucide-react` and pass the component reference, not a string

### Layout structure rules
- Page gutter: `paddingLeft/Right: 'var(--size-page-gutter)'`
- Section gap: `marginBottom: 'var(--size-section-gap)'` between sections
- Max width: `maxWidth: '1280px', margin: '0 auto'` on the page container
- Card gaps: `gap: 'var(--size-card-gap)'`
- Stack gaps: `gap: 'var(--size-stack-gap)'`

### Heading / body spacing
- Heading → subheading: `marginBottom: 'var(--size-heading-to-sub)'`
- Heading → body: `marginBottom: 'var(--size-heading-to-body)'`
- Body → body: `marginBottom: 'var(--size-body-to-body)'`
- Body → button: `marginBottom: 'var(--size-body-to-button)'`

### Content source
- If the user confirmed content from `src/data/content.ts`, read that file and wire up the real fields
- Otherwise use clearly-labelled placeholder strings (e.g. `"Section heading"`, `"Supporting description text"`)

## Step 6 — Report

After writing the file:
1. State the file path written
2. List every component used and the spec it was pulled from
3. List every token used, grouped by category (color / size / typography)
4. Flag any prop or style that had no matching token — these are open questions for the user
