---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantDivider.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:**
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantDivider.stories.tsx` — no stories file found.

**Sections needing human review:**
- All Storybook block placeholders in this document are provisional — no `title` field was available from a stories file. Paths follow the naming convention of other components in this system (`Simple/Layout/Divider`).
- Section 4 (Variants): The `label` prop creates a visually distinct layout but there is no separate named story confirming this variant's canonical name.

**Recommended follow-ups:**
- Create a stories file for Divider with at least three stories: Horizontal (plain), Horizontal with label, and Vertical.
- Confirm the Storybook title path (`Simple/Layout/Divider`) with the team.
- Consider adding an `as` prop or explicit `<hr>` vs `<div>` control so semantic element choice is intentional, not implicitly driven by the `label` prop.
- Verify vertical divider usage requires the parent to be a flex container — document this constraint more prominently.

---

# Divider

## 1. Overview
A thin 1 px line that visually separates sections or elements, available in horizontal (full-width or labeled) and vertical orientations.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Separating distinct content sections on a page | Replacing adequate whitespace — if spacing already creates sufficient visual separation, a divider adds noise |
| Splitting items in a vertical list or sidebar layout | Decorative styling — dividers should carry semantic meaning, not just visual weight |
| Adding a labeled section break (e.g. "or" in a form) | Between every item in a dense list — use subtle background alternation or spacing instead |
| Splitting columns or side-by-side panels vertically | As a page border or decorative frame — use borders on container elements instead |

## 3. Anatomy
**Horizontal (no label):**
1. **`<hr>` element** — semantically marks a thematic break; `border-top: 1px solid --color-border-subtle`; `width: 100%`; no margin.

**Horizontal (with label):**
1. **Wrapper `<div>`** — `display: flex; align-items: center; gap: --primitive-scale-4`. Carries `role="separator" aria-orientation="horizontal"`.
2. **Left line** — `<div style="flex: 1; height: 1px; background: --color-border-subtle">`.
3. **Label `<span>`** — centered text in muted xs font; `white-space: nowrap`.
4. **Right line** — mirror of the left line.

**Vertical:**
1. **`<div>`** — `width: 1px; align-self: stretch; background: --color-border-subtle; flex-shrink: 0`. Carries `role="separator" aria-orientation="vertical"`.

`[STORYBOOK BLOCK: Simple/Layout/ElegantDivider/Horizontal]`

## 4. Variants

**Horizontal — plain (default)**
- A full-width 1 px line rendered as a semantic `<hr>`.
- Communicates a thematic break between content sections.
- Choose for section-level separation in prose, card layouts, or between form groups.
- No extra margins added — parent layout controls spacing above and below.

**Horizontal — with label**
- A line-label-line layout rendered as a `<div role="separator">`.
- Communicates a named break (e.g. "or", "Today", "More options").
- Choose in forms where an alternative action exists (e.g. sign-in with email vs OAuth), or in feed-style layouts to mark a time boundary.
- Constraint: `label` must be short and `white-space: nowrap` — very long labels will break the flex layout.

**Vertical**
- A 1 px tall line that stretches to fill its flex container's cross axis.
- Communicates a column or panel boundary.
- Choose when splitting two adjacent elements in a horizontal flex container.
- Constraint: the parent element must be a flex container — `align-self: stretch` only works in flex or grid context.

## 5. States
This component is purely presentational and has no interactive states. It does not respond to hover, focus, active, disabled, or loading conditions.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | No | Controls the axis of the divider line. |
| `label` | `string` | — | No | When provided, renders a centered text label flanked by two horizontal lines. Only applies when `orientation="horizontal"`. |
| `className` | `string` | `''` | No | Additional class names applied to the root element for layout positioning. |

## 7. Content guidelines
This component carries no required human-authored copy. If the optional `label` prop is used:
- Keep label text extremely short: 1–3 words (e.g. "or", "continue with", "today").
- Use lowercase for connective labels ("or", "and"), title case for named section breaks ("Today", "Archived").
- Never place interactive elements or markup inside the label — it is a plain string.

## 8. Accessibility
- **Keyboard navigation:** The component is not interactive and receives no Tab focus.
- **Screen reader behavior:**
  - Horizontal plain: rendered as `<hr>` — screen readers may announce it as a "separator" or thematic break depending on the AT.
  - Horizontal with label: `<div role="separator" aria-orientation="horizontal">` — the label text between the lines is readable inline. The separator role may suppress announcement of the surrounding text depending on AT; [NEEDS CONFIRMATION].
  - Vertical: `<div role="separator" aria-orientation="vertical">`.
- **Color and contrast:** The divider color (`--color-border-subtle`, #f5f5f5 on #ffffff) is intentionally low-contrast — it is a decorative line and not required to meet WCAG text contrast thresholds. WCAG 1.4.11 (Non-text contrast) applies: the line at 1 px and very low contrast may not be perceivable by low-vision users. [NEEDS CONFIRMATION] — consider using `--primitive-gray-200` (#e5e5e5) for stronger visibility.
- **Motion:** No animation or transition is applied.
- **Touch/pointer:** Not interactive; no target requirements apply.
- **Known gaps:** Labeled divider `role="separator"` in a `<div>` may not be announced consistently across AT as a separator. The inner label text is not associated with the separator via ARIA.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-border-subtle` | `#f5f5f5` | Line color for all three variants |
| `--primitive-scale-4` | `1rem` | Gap between label and line segments (labeled variant) |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Label font family |
| `--primitive-font-size-xs` | `0.75rem` | Label font size |
| `--primitive-font-weight-regular` | `400` | Label font weight |
| `--color-text-muted` | `#666666` | Label text color |

## 10. Responsive behavior
- **Horizontal (plain):** `width: 100%` — always fills its parent width regardless of breakpoint.
- **Horizontal (with label):** Flex layout fills parent width. Label is `white-space: nowrap` — on very narrow containers, long labels will squeeze the flanking lines to near zero. Keep labels short.
- **Vertical:** `align-self: stretch` — height matches the parent flex container's cross-axis. Width is always 1 px. No breakpoint adaptation needed; ensure the parent flex container exists at all breakpoints.

## 11. Composition and usage patterns

**Section break in a content page**
Place a plain horizontal Divider between major content sections. Control vertical spacing via the parent layout's gap or margin — the component adds no margin.

```tsx
<section>...</section>
<Divider />
<section>...</section>
```

**"Or" divider in a form**
Use the labeled variant with `label="or"` between a primary sign-in button and an OAuth option. This is the most common labeled divider pattern.

```tsx
<Button>Sign in with email</Button>
<Divider label="or" />
<Button>Continue with Google</Button>
```

**Column separator in a flex layout**
Place a vertical Divider between two sibling flex children to draw a 1 px column line.

```tsx
<div style={{ display: 'flex', alignItems: 'stretch' }}>
  <Panel>Left</Panel>
  <Divider orientation="vertical" />
  <Panel>Right</Panel>
</div>
```

`[STORYBOOK BLOCK: Simple/Layout/ElegantDivider/WithLabel]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [Tabs](/design-system/docs/tabs-zh) | When sections should be switchable panels rather than stacked separated sections |
| [Breadcrumbs](/design-system/docs/breadcrumbs-zh) | When the goal is wayfinding in a hierarchy, not visual separation |
| [ActionMenu](/design-system/docs/action-menu-zh) | When separating groups of actions within a dropdown — consider using a visual divider inside the menu list (not yet implemented as a component) |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Use the plain horizontal variant for section-level thematic breaks. | Add a divider between every list item — it creates visual noise; use spacing instead. |
| Ensure the parent of a vertical divider is a flex container with `align-items: stretch`. | Place a vertical divider in a block layout — `align-self: stretch` will have no effect and the element will collapse to 0 height. |
| Keep labeled divider text to 1–3 lowercase or title-case words. | Use a sentence or question as the label — it will be awkward to read flanked by lines. |
| Rely on the parent layout for vertical spacing around horizontal dividers. | Add `margin` via the `className` prop if it conflicts with the parent grid or stack gap. |
| Use Divider semantically — only where a meaningful content boundary exists. | Use Divider as a decorative flourish or border effect. |
| Test labeled dividers on narrow mobile viewports to confirm the label doesn't collapse the flanking lines. | Use very long labels (more than ~20 characters) in the labeled variant. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
