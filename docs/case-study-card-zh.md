---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantCaseStudyCard.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantCaseStudyCard.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): The hover animation is implemented via GSAP; motion scale values are pulled from `--motion-scale-hover` (1.05) in globals.css but GSAP applies them directly — confirm whether `prefers-reduced-motion` should disable this.
- Section 8 (Accessibility): The image slot is decorative (`aria-hidden="true"`) but the upload placeholder area (`onImageUpload`) has no `role="button"` or accessible label — needs a fix.
- Section 10 (Responsive behavior): No internal breakpoints; card is fully width-agnostic.

**Recommended follow-ups:**
- Add `prefers-reduced-motion` guard to the GSAP hover animation
- Add `role="button"` + `tabIndex={0}` + keyboard handler to the upload placeholder area
- Add stories: WithImage (imagePath provided), WithoutImage (imagePath empty), and WithUploadCallback
- Consider whether multiple tags per card need a visual separator (comma, pipe, bullet)

---

# CaseStudyCard

## 1. Overview
CaseStudyCard is a portfolio card that presents a case study with a featured image slot, category tags, title, description, and an outcome stat, communicating project impact in a structured, scannable format.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Showcasing individual portfolio projects in a grid or list | Displaying simple feature highlights with no image — use IconCard |
| Communicating a project's scope and measurable outcome | Displaying testimonials or quotes — use ReferralCard |
| Portfolio or work sections where image + narrative context is needed | When no outcome or result is available — the outcome line will be visually empty |
| Case study index pages linking to full project pages | When the card must be a navigable link — wrap in an `<a>` at the parent level; the card has no built-in link behavior |

## 3. Anatomy
1. **Card container** — `<article>` semantic element with surface background, card radius, subtle border, and hidden overflow.
2. **Image slot** — 16:9 aspect ratio area at the top of the card; renders either the cover image (div with background-image) or an upload placeholder.
3. **Image (filled state)** — a div with `background-image`, `background-size: cover`, `background-position: center`; `aria-hidden="true"` as it is decorative.
4. **Upload placeholder (empty state)** — a clickable area with a dashed border, `ImagePlus` icon, and "Upload image" label; appears when `data.imagePath` is empty and `onImageUpload` is provided.
5. **Content area** — padded div containing tags, title, description, and outcome; applies a subtle scale animation on hover via GSAP.
6. **Tags** — uppercase, tracked, muted-color label string(s) above the title.
7. **Title** — `<h4>` in serif (Lora), applying `--type-h4-family`, `--type-h4-size`, `--type-h4-weight`, `--type-h4-line-height`; the primary identifier.
8. **Description** — sans-serif body copy, sm size, body color.
9. **Outcome** — sans-serif body copy, sm size, accent color (green); the measurable result.

`[STORYBOOK BLOCK: Simple/Cards/ElegantCaseStudyCard/Default]`

## 4. Variants
No discrete named variants. The two states of the image slot function as the primary visual distinction:

**With image**
- Full-bleed 16:9 cover image at top of card
- On mouse enter: image scales to 1.05, content area scales to 1.02 (GSAP, duration 350ms, power2.out)
- On mouse leave: both return to scale 1 (power2.inOut)

**Without image (upload placeholder)**
- Dashed border placeholder with `ImagePlus` icon and "Upload image" label
- Rendered when `data.imagePath` is an empty string or falsy
- The upload trigger is only active when `onImageUpload` callback is provided; otherwise cursor remains default

## 5. States
**Default**
- Static card at rest; image (if present) and content at scale 1

**Hover**
- Triggered by `mouseenter` on the `<article>` element
- Image scales to 1.05 (GSAP `power2.out`, 350ms); content area scales to 1.02
- [NEEDS CONFIRMATION]: `prefers-reduced-motion` is not currently respected — recommend wrapping GSAP calls in a `window.matchMedia('(prefers-reduced-motion: reduce)')` check

**Mouse leave**
- Both image and content return to scale 1 (GSAP `power2.inOut`, 350ms)

**Upload placeholder (interactive)**
- Shown when `data.imagePath` is empty and `onImageUpload` is defined
- Cursor changes to `pointer`; clicking opens a hidden `<input type="file">`
- [NEEDS CONFIRMATION]: No keyboard access or ARIA role on the clickable div

**Upload placeholder (display-only)**
- Shown when `data.imagePath` is empty and `onImageUpload` is undefined
- Cursor is `default`; not interactive

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `data` | `CaseStudy` | — | Yes | Object containing all card content (see CaseStudy type below) |
| `onImageUpload` | `(file: File) => void` | — | No | Callback invoked when a user selects an image in upload-placeholder mode; when absent, placeholder is non-interactive |

**CaseStudy type:**
| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier for the case study |
| `tags` | `string[]` | Array of category/eyebrow label strings |
| `title` | `string` | Primary heading for the case study |
| `description` | `string` | Body copy describing the project scope |
| `outcome` | `string` | Measurable result; rendered in accent color |
| `imagePath` | `string` | URL of the cover image; empty string triggers placeholder |

## 7. Content guidelines
- **Tags**: 1–3 short category labels (e.g., "UX Design", "Product Strategy"). Use title case. Do not punctuate.
- **Title**: 5–10 words; sentence case; no trailing punctuation. The title is the most-read element — make it specific and outcome-oriented.
- **Description**: 2–4 sentences. Focus on the challenge and approach, not the solution in isolation. Avoid jargon.
- **Outcome**: One punchy sentence beginning with a metric or result (e.g., "+42% completion rate improvement…"). This is rendered in accent green — keep it positive and specific.
- **Image**: Use 16:9 source images or crops to avoid unexpected focal-point cropping. Minimum recommended resolution: 1200×675px.

## 8. Accessibility
- **Keyboard navigation**: The card itself is not interactive. The upload placeholder (when `onImageUpload` is set) is not keyboard-accessible in the current implementation — [NEEDS CONFIRMATION] as a known gap.
- **Screen reader behavior**: The `<article>` element provides a landmark. The image div has `aria-hidden="true"`. Tags, `<h4>` title, and `<p>` elements are read in source order. The hidden file input has no accessible label.
- **Color and contrast**: Title (#1e1e1e on #fafafa): high contrast. Description (#171717 on #fafafa): high contrast. Outcome (#2e6f40 on #fafafa): approximately 4.6:1 — passes WCAG AA for normal text. Tag labels (#666666 on #fafafa): approximately 4.5:1 — passes AA.
- **Motion**: GSAP hover scale animations are not gated on `prefers-reduced-motion`. Users who have requested reduced motion will still see the scale effect — this is a known gap.
- **Touch / pointer**: The card is a display component. When `onImageUpload` is not provided, the image area is non-interactive and no touch target requirements apply to the card shell — the pointer cursor is purely decorative. When `onImageUpload` is provided, the upload placeholder occupies the full card width at a 16:9 aspect ratio — adequate in width; height depends on rendered card width (e.g., at 320px card width, the slot is 180px tall — well above 44px).
- **Known gaps**: Upload placeholder div needs `role="button"`, `tabIndex={0}`, and `onKeyDown` handler for keyboard accessibility.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-bg-surface` | `#fafafa` | Card background |
| `--size-card-radius` | `4px` | Card border radius |
| `--color-border-subtle` | `#f5f5f5` | Card border and placeholder dashed border |
| `--size-card-padding` | `1.5rem` | Content area padding |
| `--color-bg-main` | `#ffffff` | Upload placeholder background |
| `--color-text-muted` | `#666666` | Tag text, placeholder icon and label |
| `--size-tag-gap` | `0.75rem` (`--primitive-scale-3`) | Gap between tag items |
| `--size-heading-to-sub` | `0.75rem` | Margin below tags |
| `--primitive-font-serif` | `Lora, serif` | Title font family |
| `--primitive-font-size-2xl` | `1.5rem` | Title font size |
| `--primitive-font-weight-regular` | `400` | Title font weight |
| `--color-text-title` | `#1e1e1e` | Title text color |
| `--size-heading-to-body` | `1rem` | Margin below title |
| `--primitive-font-size-sm` | `0.875rem` | Description and outcome font size |
| `--color-text-body` | `#171717` | Description text color |
| `--size-body-to-body` | `0.5rem` | Margin below description |
| `--color-text-accent` | `#2e6f40` | Outcome text color |
| `--motion-case-study-easing-in` | `cubic-bezier(0.22, 1, 0.36, 1)` | GSAP hover-in easing (applied directly by GSAP) |
| `--motion-case-study-easing-out` | `cubic-bezier(0.45, 0, 0.55, 1)` | GSAP hover-out easing (applied directly by GSAP) |

## 10. Responsive behavior
CaseStudyCard is width-agnostic — it fills 100% of its parent container at all breakpoints. Responsive column layout is handled by CardPack or the parent grid. The 16:9 image slot maintains its ratio regardless of card width.

## 11. Composition and usage patterns
**Portfolio index grid via CardPack**
Use `CardPack` with `cardType="case-study"`, `count={3}`, `perRow={3}` and real `overrides` for each card's content.

**Single featured case study**
Render a single CaseStudyCard at full column width as a prominent section feature, using a high-resolution landscape image.

**Inline image upload (design/CMS context)**
Pass `onImageUpload` to enable in-place image replacement. Handle the returned `File` object to upload and update `data.imagePath`.

`[STORYBOOK BLOCK: Simple/Cards/ElegantCaseStudyCard/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [IconCard](/design-system/docs/icon-card-zh) | When no image or outcome is needed — just icon, heading, and description |
| [ReferralCard](/design-system/docs/referral-card-zh) | When the card content is a testimonial quote rather than a project description |
| [CardPack](/design-system/docs/card-pack-zh) | When rendering multiple CaseStudyCards in a responsive grid layout |

## 13. Do's and don'ts
| Do | Don't |
|---|---|
| Provide a real 16:9 image for every production card — the placeholder communicates an incomplete state. | Ship the empty placeholder state in production; it reads as broken or under construction. |
| Write outcomes as specific, quantified results ("+42% completion rate"). | Use vague outcome copy like "improved the experience" — the accent green draws attention and users expect substance. |
| Keep title under 10 words for scan-readability in grid layouts. | Use the title as a full sentence with a verb — keep it as a noun phrase describing the project. |
| List 1–3 specific tags that accurately reflect the discipline or domain. | Use more than 3 tags — they wrap and push the title down, creating visual imbalance. |
| Use `CardPack` for grids of CaseStudyCards to get equal-height rows automatically. | Manually place CaseStudyCards in a flex row without ensuring equal height — description lengths will vary. |
| Add a `prefers-reduced-motion` check around the GSAP hover animations before shipping to production. | Rely on GSAP's defaults for accessibility — the library does not automatically honor the system motion preference. |

## 14. Changelog

**2026-04-27** — Wrap GSAP scale animations in `prefers-reduced-motion` check — animations skipped when user has reduced motion enabled
