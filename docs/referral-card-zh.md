---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantReferralCard.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantReferralCard.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): No hover, focus, or active states — card is purely static
- Section 8 (Accessibility): The `<blockquote>` inside a `<figure>` / `<figcaption>` is an unusual nesting; screen reader behavior across assistive technologies should be confirmed
- Section 10 (Responsive behavior): Card is width-agnostic; confirm whether font sizes should scale at larger viewports

**Recommended follow-ups:**
- Add a story with `showAvatar={true}` and a real `avatarPath`
- Add a story showing 2-up layout via CardPack
- Confirm whether the decorative quotation mark (`"`) should carry an `aria-label` or remain `aria-hidden="true"` (it currently is aria-hidden)
- Verify whether `title` prop naming is intentional (it refers to a person's job title/role, not a document title — may be confused with the HTML `title` attribute)

---

# ReferralCard

## 1. Overview
ReferralCard displays a testimonial or referral quote with attribution (name, role, and optional avatar), solving the need for a visually consistent, typographically refined testimonial component across portfolio and marketing sections.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Displaying client or colleague testimonials in a referrals section | Showcasing project work with an image — use CaseStudyCard |
| Attribution quotes alongside written case study content | Pull-quotes within running body text — use a native blockquote with prose styles |
| Grid or side-by-side layouts of 2–4 testimonials via CardPack | When the quote source is unknown — always provide a name and role |
| Portfolio contact sections to add social proof | Data or metric summaries — use KpiCard |

## 3. Anatomy
1. **Figure container** — `<figure>` element providing semantic grouping of quote and attribution; applies card surface, radius, border, and padding.
2. **Decorative quotation mark** — large `"` character positioned absolutely at the top-left of the card; `aria-hidden="true"`, purely visual.
3. **Blockquote** — `<blockquote>` element wrapping the `<p>` quote text; uses `text-indent` to clear the decorative `"`.
4. **Quote text** — serif (Lora), italic, xl size, body color; the main readable content.
5. **Figcaption** — `<figcaption>` at the bottom of the card, pushed down with `marginTop: auto` for vertical alignment across cards of different heights.
6. **Avatar** — optional Avatar component (md size) rendered when `showAvatar={true}`; uses `avatarPath` as its `src`.
7. **Name** — bold sans-serif sm text, title color.
8. **Role / title** — regular sans-serif xs text, muted color.

`[STORYBOOK BLOCK: Simple/Cards/ElegantReferralCard/Default]`

## 4. Variants

**Without avatar (`showAvatar={false}`)** — default
- Attribution shows name and role in a vertical stack with no image
- Use when no real avatar photo is available or avatar adds no value

**With avatar (`showAvatar={true}`)**
- Renders an Avatar component at md size (40px) before the name/role stack
- When `avatarPath` is provided, displays the photo; otherwise shows the Avatar placeholder icon
- Use when the person's face adds credibility or recognition

`[STORYBOOK BLOCK: Simple/Cards/ElegantReferralCard/Default]`

## 5. States
**Default (only state)**
- Static card; no hover, focus, or active behavior is implemented
- The card renders identically at rest and in any pointer context

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `quote` | `string` | — | Yes | The testimonial text displayed in the blockquote; rendered in italic serif |
| `name` | `string` | — | Yes | Full name of the person giving the referral; displayed in bold |
| `title` | `string` | — | Yes | Job title and/or organisation of the person (e.g., "VP of Product, Horizon Software") |
| `showAvatar` | `boolean` | `false` | No | When true, renders the Avatar component before the name and title |
| `avatarPath` | `string` | — | No | URL of the person's photo; passed as `src` to Avatar; falls back to Avatar placeholder when absent |

## 7. Content guidelines
- **Quote**: Write in first person, present or past tense. 2–4 sentences is ideal for card layout. Do not include opening or closing quotation marks in the string — the decorative mark handles the visual affordance.
- **Name**: Full name only; no honorifics (Dr., Mr.) unless part of the person's professional identity.
- **Title**: "Job Title, Organisation" format (e.g., "Engineering Lead, Vertex Labs"). Keep to one line if possible — the card does not truncate.
- **Avatar**: Provide a photo where possible to increase credibility. Use a face-forward, square-cropped image for predictable circular clipping.

## 8. Accessibility
- **Keyboard navigation**: Not interactive; not focusable.
- **Screen reader behavior**: The `<figure>` / `<figcaption>` pairing associates the attribution with the quote for screen readers. The `<blockquote>` is read in browsing mode. The decorative `"` has `aria-hidden="true"`. The Avatar (when shown) renders an `<img>` with `alt=""` by default (no `alt` is passed from ReferralCard) — [NEEDS CONFIRMATION]: pass the person's name as `alt` text.
- **Color and contrast**: Quote text (#171717 on #fafafa): high contrast. Name (#1e1e1e on #fafafa): near-maximum contrast. Role (#666666 on #fafafa): approximately 4.5:1 — WCAG AA pass. Decorative quotation mark uses `--primitive-gray-300` (#d4d4d4) — decorative only, not a contrast concern.
- **Motion**: No animations.
- **Touch / pointer**: Not interactive; no minimum target size applies.
- **Known gaps**: When `showAvatar={true}`, the Avatar receives no `alt` text — the person's name should be passed as `alt` from ReferralCard. The `<figure>` / `<blockquote>` nesting is unusual and may behave inconsistently across screen reader + browser combinations.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-bg-surface` | `#fafafa` | Card background |
| `--size-card-radius` | `4px` (`--primitive-radius-md`) | Card border radius |
| `--color-border-subtle` | `#f5f5f5` | Card 1px border |
| `--size-card-padding` | `1.5rem` (`--primitive-scale-6`) | Card padding all sides |
| `--size-heading-to-body` | `1rem` (`--primitive-scale-4`) | Gap between blockquote and figcaption |
| `--primitive-font-mono` | `DM Mono, monospace` | Decorative `"` font family |
| `--primitive-font-size-display` | `4.5rem` | Decorative `"` font size |
| `--primitive-gray-300` | `#d4d4d4` | Decorative `"` color |
| `--size-heading-to-sub` | `0.75rem` (`--primitive-scale-3`) | Decorative `"` top offset; avatar-to-name gap |
| `--type-quote-family` | `Lora, serif` | Quote text font family |
| `--type-quote-size` | `1.25rem` (`--primitive-font-size-xl`) | Quote text font size |
| `--type-quote-weight` | `400` (`--primitive-font-weight-regular`) | Quote text font weight |
| `--type-quote-line-height` | `1.6` | Quote text line height |
| `--color-text-body` | `#171717` | Quote text color |
| `--primitive-scale-10` | `2.5rem` | Quote text indent (clears the decorative mark) |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Name and role font family |
| `--primitive-font-size-sm` | `0.875rem` | Name font size |
| `--primitive-font-weight-bold` | `700` | Name font weight |
| `--color-text-title` | `#1e1e1e` | Name text color |
| `--primitive-font-size-xs` | `0.75rem` | Role font size |
| `--primitive-font-weight-regular` | `400` | Role font weight |
| `--color-text-muted` | `#666666` | Role text color |

## 10. Responsive behavior
ReferralCard is width-agnostic and fills 100% of its parent container at all breakpoints. The `marginTop: auto` on `<figcaption>` ensures attribution is always bottom-aligned, which is especially important in multi-column layouts where card heights may differ based on quote length. Responsive column layout is handled by CardPack or the parent grid.

## 11. Composition and usage patterns
**Two-up testimonial row**
Use `CardPack` with `cardType="referral"`, `count={2}`, `perRow={2}`, `showAvatar={true}`, and real `overrides` for name, role, quote, and image per card.

**Single featured testimonial**
Render one ReferralCard at approximately half-column width as a social proof callout alongside body text. Use `showAvatar={true}` with a real photo.

**Referrals section (no avatars)**
Use three or four ReferralCards without avatars when photos are unavailable, in a 3-up grid via CardPack.

`[STORYBOOK BLOCK: Simple/Cards/ElegantReferralCard/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [CaseStudyCard](/design-system/docs/case-study-card-zh) | When the content is a project case study with an image, description, and outcome |
| [Avatar](/design-system/docs/avatar-zh) | When the person's photo needs to appear standalone outside a testimonial context |
| [CardPack](/design-system/docs/card-pack-zh) | When rendering multiple ReferralCards in a responsive grid layout |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Keep quotes to 2–4 sentences for balanced card heights in grid layouts. | Use single-sentence quotes — they leave excessive whitespace and feel under-substantiated. |
| Always provide both `name` and `title` — a quote without attribution lacks credibility. | Leave `title` empty even if the exact role is uncertain — use the organisation name alone if needed. |
| Provide `avatarPath` with a real face photo whenever `showAvatar={true}`. | Enable `showAvatar` without a real image — the Avatar placeholder icon in this context implies a missing photo rather than an anonymous speaker. |
| Use CardPack to align card heights across a row of ReferralCards with varying quote lengths. | Use fixed height on individual cards — content will clip or overflow. |
| Write quotes verbatim from the person; get approval before publishing. | Paraphrase or edit quotes — use the exact words as provided. |
| Use `DM Mono` for the decorative `"` as defined by the token — this is applied automatically. | Override the quotation mark character or font with inline styles. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
