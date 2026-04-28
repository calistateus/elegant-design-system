---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantAvatarGroup.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantAvatarGroup.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): No interactive states are implemented; section describes static rendering only
- Section 8 (Accessibility): The `aria-label` on the group container is inferred from source code — confirm wording is acceptable to the team
- Section 10 (Responsive behavior): No breakpoint-specific behavior is in the component; confirm whether it ever needs to reduce visible count on small screens

**Recommended follow-ups:**
- Add separate stories for `layout="unstacked"`, overflow visible, each size variant, and an all-placeholder (no `src`) group
- Consider whether overflow badge needs a tooltip listing the hidden members' names
- Verify whether the white separator ring (`--color-bg-main`) works correctly on dark backgrounds

---

# AvatarGroup

## 1. Overview
AvatarGroup renders a horizontal row of Avatar components with optional stacking overlap and an overflow count badge, solving the space problem of displaying many participants in a compact strip.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Showing a set of collaborators, participants, or team members at a glance | When identity is primary and each person needs a visible name — use a list with individual Avatar + name rows |
| Hinting that "N more people" are involved beyond the visible set | When only one person is involved — use Avatar directly |
| Comment threads, shared document headers, or assignee chips | When avatars must be individually clickable — wrap each Avatar in a button at the parent level |

## 3. Anatomy
1. **Group container** — `<div role="group">` with an `aria-label` summarising how many avatars are shown and how many are hidden.
2. **Avatar items** — each wrapped in a positioning div that applies `marginLeft` overlap and a white ring box-shadow in stacked mode.
3. **Overflow badge** — circular div matching the Avatar diameter, showing `+N` in muted text against the surface background; only renders when `showOverflow={true}` and the count is greater than zero.

`[STORYBOOK BLOCK: Simple/Assets/ElegantAvatarGroup/Default]`

## 4. Variants

**Stacked (`layout="stacked"`)** — default
- Avatars overlap each other by 10px (`-0.625rem` negative margin)
- A 2px white ring (`box-shadow: 0 0 0 2px var(--color-bg-main)`) separates each avatar visually
- `z-index` decrements left-to-right so the first avatar appears on top
- Use in tight horizontal spaces such as card headers or inline metadata rows

**Unstacked (`layout="unstacked"`)**
- Avatars sit side by side with `--primitive-scale-1` (0.25rem / 4px) gap
- No separator ring or z-index layering
- Use when avatars need more visual breathing room or the surface background varies

`[STORYBOOK BLOCK: Simple/Assets/ElegantAvatarGroup/Default]`

## 5. States
**Default**
- Static; no hover, focus, or active behavior on the group itself

**With overflow badge**
- Triggered when `showOverflow={true}` and the resolved `displayCount` is greater than zero
- Badge sits at the end of the row, styled as a circle matching the Avatar size
- Overflow count defaults to `avatars.length - maxVisible`; can be overridden via `overflowCount`

**All-placeholder**
- When all `avatars` items omit `src`, every Avatar renders in placeholder (dashed ring + icon) mode
- The group container and overflow badge are unaffected

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `avatars` | `AvatarItem[]` | — | Yes | Array of `{ src?: string; alt?: string }` objects to render |
| `maxVisible` | `number` | `4` | No | Maximum number of avatars to show before the overflow badge |
| `layout` | `'stacked' \| 'unstacked'` | `'stacked'` | No | Whether avatars overlap (stacked) or sit side by side (unstacked) |
| `showOverflow` | `boolean` | `false` | No | When true, renders the +N overflow badge after the visible avatars |
| `overflowCount` | `number` | auto | No | Explicit overflow count; defaults to `avatars.length - maxVisible` when absent |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size preset forwarded to every Avatar and the overflow badge |

## 7. Content guidelines
- **`avatars[].alt`**: Provide each person's name. Screen readers announce individual avatar alt text only when the `<img>` is encountered; the group label gives the count summary.
- **Overflow badge label**: Automatically set to `"${displayCount} more"` via `aria-label` — do not alter unless localization requires it.

## 8. Accessibility
- **Keyboard navigation**: Not interactive; no focusable elements inside the group.
- **Screen reader behavior**: The group container has `role="group"` and an `aria-label` such as "Avatar group, 4 shown, 2 more". Each visible Avatar image announces its `alt` text. The overflow badge has `aria-label="${displayCount} more"`. No individual Avatar needs additional ARIA when used inside AvatarGroup.
- **Color and contrast**: The overflow badge uses `--color-text-muted` (#666666) on `--color-bg-surface` (#fafafa) — approximately 4.5:1, passing WCAG AA for text.
- **Motion**: No animations.
- **Touch / pointer**: Not interactive; no minimum target size applies.
- **Known gaps**: Individual avatars inside the group are not focusable; if clicking a specific avatar is required (e.g. to view a profile), the interaction must be added by the parent.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--primitive-scale-8` | `2rem` (32px) | Avatar and badge diameter at `size="sm"` |
| `--primitive-scale-10` | `2.5rem` (40px) | Avatar and badge diameter at `size="md"` |
| `--primitive-scale-12` | `3rem` (48px) | Avatar and badge diameter at `size="lg"` |
| `--primitive-scale-1` | `0.25rem` (4px) | Gap between avatars in unstacked layout |
| `--color-bg-main` | `#ffffff` | Separator ring color in stacked layout |
| `--color-bg-surface` | `#fafafa` | Overflow badge background |
| `--color-text-muted` | `#666666` | Overflow badge `+N` text color |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Overflow badge font family |
| `--primitive-font-size-xs` | `0.75rem` | Overflow badge font size at sm/md |
| `--primitive-font-size-sm` | `0.875rem` | Overflow badge font size at lg |
| `--primitive-font-weight-medium` | `500` | Overflow badge font weight |

## 10. Responsive behavior
AvatarGroup does not adapt across breakpoints. The rendered layout and size remain fixed regardless of viewport width. If the group must collapse or reduce `maxVisible` at smaller viewports, control this via parent-level responsive logic passing different prop values.

## 11. Composition and usage patterns
**Participant strip in a card header**
Place AvatarGroup in a flex row beside a label like "3 contributors". Use `size="sm"`, `layout="stacked"`, `showOverflow={true}`, `maxVisible={3}` to keep the strip compact.

**Team member showcase**
Use `layout="unstacked"`, `size="lg"`, and `showOverflow={false}` with a small `maxVisible` to give each avatar more prominence in a feature section.

`[STORYBOOK BLOCK: Simple/Assets/ElegantAvatarGroup/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| Avatar | When displaying a single person's photo, not a collection |
| ReferralCard | When each person also needs a name, role, and quote displayed |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Provide `alt` text for every avatar item in the `avatars` array. | Pass an empty `alt=""` for all avatars — at least the visible ones should have accessible names. |
| Enable `showOverflow` whenever `avatars.length > maxVisible` so users know there are more people. | Set `overflowCount` to a value inconsistent with the actual hidden count without a clear reason. |
| Use stacked layout in dense UIs (tables, card metadata, comment threads). | Use stacked layout on dark or image backgrounds where the white ring separator disappears. |
| Keep `maxVisible` to 3–5 for readability; more than 5 overlapping avatars become hard to distinguish. | Set `maxVisible` higher than `avatars.length` — the overflow badge will not render and no information is lost, but it is a redundant config. |
| Match `size` to the surrounding type scale and use it consistently across all AvatarGroups in the same view. | Mix Avatar size presets by rendering AvatarGroup alongside standalone Avatar components of different sizes in the same row. |
| Use `layout="unstacked"` when the background color is not `--color-bg-main`, to avoid the invisible white ring. | Rely on the stacked separator ring to provide contrast on colored or photo backgrounds. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
