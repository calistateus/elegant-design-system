## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantCarousel.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantCarousel.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** No test file found. No separate types file (interface exported from source).

**Sections needing human review:**
- Section 8 (Accessibility): Dot pagination uses `role="tablist"` / `role="tab"` which is a non-standard ARIA pattern for a carousel. WCAG 2.1 SC 4.1.2 requires carousel controls to be operable by keyboard. Arrow buttons have `aria-label` — confirmed. Dot buttons have `aria-label="Go to slide N"` and `aria-selected` — these are correct tab semantics but unusual for a carousel. Flagged for review against ARIA Authoring Practices carousel pattern.
- Section 10 (Responsive behavior): `imageSize` prop controls width via Tailwind classes but this only applies to the `image` cardType. Other card types always use `w-full`. Noted as inferred.
- Section 5 (States): `prefers-reduced-motion` is not checked for the auto-slide or slide transition animation. This is a known gap.

**Recommended follow-ups:**
- Add `prefers-reduced-motion` support: disable auto-slide and replace `transform` transition with instant cut when reduced motion is preferred.
- Arrow buttons have a fixed size of `2.25rem` (36px) — below the 44×44px WCAG touch target recommendation. Flag for design review.
- Dot buttons are `0.5rem × 0.5rem` (8px) in inactive state — well below 44×44px touch target minimum. This is a known accessibility gap.
- Consider adding `aria-roledescription="carousel"` to the outer wrapper and `aria-roledescription="slide"` to each slide for better screen reader context (per ARIA carousel pattern).
- `autoSlide` pauses on no user gesture — should pause on hover/focus per WCAG 2.1 SC 2.2.2.

---

# Carousel

## 1. Overview
A paginated slide container that displays case study cards, icon cards, referral cards, or images in a scrollable sequence — used to surface collections of content in a constrained horizontal space.

## 2. When to use / When not to use

| Use | Don't use |
|---|---|
| Displaying 3–8 case studies, testimonials, or feature cards that would overflow a page section if stacked | Don't use when all items can comfortably fit in a single view without scrolling — show them in a grid instead |
| Presenting a portfolio image gallery with a consistent aspect ratio and optional captions | Don't use for critical content that users must not miss — carousels have low engagement rates; key content should be visible without interaction |
| Showing multiple testimonials/referrals in a compact single-slide view that users can browse sequentially | Don't use with `autoSlide: true` in contexts where users are reading — auto-advancing distracts from page content |
| Previewing 2 or 3 icon cards simultaneously with `slidesVisible={2}` in a wide layout section | Don't use for more than 8 slides — the component clamps `count` to 8 and placeholder data cycles |
| Allowing the user to upload and review image slides in a Storybook-based content authoring workflow | Don't use `slidesVisible` greater than the number of slides — no navigation will appear and the layout will have empty space |

## 3. Anatomy

1. **Outer wrapper** — a `div`. For `image` cardType, its width is controlled by `imageSize` Tailwind classes. For all other card types, it is `w-full`.
2. **Navigation row** — a flex row containing the left arrow button, the slide track, and the right arrow button. Only rendered when `slides.length > slidesVisible`.
3. **Left arrow button** — a circular icon button (`ChevronLeft`, 16px). Has `aria-label="Previous slide"`. Cycles to the last position when at the beginning.
4. **Slide track** — an `overflow: hidden` container. Contains the slide strip.
5. **Slide strip** — a flex row that translates horizontally via `transform: translateX` to reveal the current slide(s). Transition uses `--primitive-duration-relaxed` (350ms) and `--primitive-easing-power2-out`.
6. **Slide item** — each slide occupies `100 / slidesVisible` percent of the track width. Inner padding of `calc(--size-card-gap / 2)` on both sides creates gutters between slides (except at the edges).
7. **Right arrow button** — a circular icon button (`ChevronRight`, 16px). Has `aria-label="Next slide"`. Cycles to the first position when at the end.
8. **Dot pagination** — a flex row of dot buttons below the navigation row. Rendered only when `dotCount > 1`. Container has `role="tablist"` and `aria-label="Carousel navigation"`.
9. **Dot button** — each dot has `role="tab"`, `aria-selected`, and `aria-label="Go to slide N"`. Active dot is `1.25rem` wide; inactive dots are `0.5rem` wide. Color: active = `--color-text-body`; inactive = `--color-border-subtle`.

`[STORYBOOK BLOCK: Simple/Assets/ElegantCarousel/CaseStudyCards]`

## 4. Variants

**CaseStudyCards**
- Renders `ElegantCaseStudyCard` slides using placeholder case study data.
- Each slide shows a case study card with title, tags, description, outcome, and an image upload area.
- Use for portfolio sections where the viewer should browse multiple projects sequentially.
- Default: 3 slides, 1 visible at a time.

`[STORYBOOK BLOCK: Simple/Assets/ElegantCarousel/CaseStudyCards]`

**IconCards**
- Renders `ElegantIconCard` slides with title, description, and a Lucide icon.
- Default: 4 slides, 2 visible at a time — demonstrates the multi-slide layout.
- Use for feature/capability sections where scanning two items side-by-side is appropriate.
- Constraint: icon card content is driven by internal placeholder data (`PLACEHOLDER_SPECIALTIES`). Production usage would require extending the component to accept custom data.

`[STORYBOOK BLOCK: Simple/Assets/ElegantCarousel/IconCards]`

**ReferralCards**
- Renders `ElegantReferralCard` slides with a blockquote, name, and role.
- Default: 3 slides, 1 visible at a time.
- Use for testimonials sections.
- Constraint: referral data is internal placeholder. Production usage requires custom data injection.

`[STORYBOOK BLOCK: Simple/Assets/ElegantCarousel/ReferralCards]`

**Images**
- Renders `ImageSlide` components — either an upload prompt (dashed border, `ImagePlus` icon) or an `ElegantImage` once a file is uploaded.
- Controlled by `imageSize` (`sm`, `md`, `lg`, `full`) and `imageRatio` (`1/1`, `4/3`, `3/2`, `16/9`, `21/9`).
- Use for image galleries in a case study or portfolio section.
- Constraint: uploaded images are stored in local component state as data URLs — they do not persist across remounts.

`[STORYBOOK BLOCK: Simple/Assets/ElegantCarousel/Images]`

**AutoSlide**
- Same as CaseStudyCards but with `autoSlide: true` and `autoSlideInterval: 3000`.
- Demonstrates the auto-advance behavior.
- Use for ambient display contexts (e.g., an unattended presentation or a hero section). Avoid in reading-heavy layouts.
- The carousel does not pause on hover or focus — see Known gaps.

`[STORYBOOK BLOCK: Simple/Assets/ElegantCarousel/AutoSlide]`

## 5. States

**Default (idle)**
- Current slide(s) visible, arrows flanking the track, dots below.
- Arrow buttons at 85% opacity (`--motion-opacity-hover` at rest).

**Arrow button hovered**
- Opacity increases to 100%. Box shadow elevates from `0 1px 3px` to `0 2px 8px`. Transition: `--primitive-duration-fast` (150ms).

**Dot — active**
- Width expands to `1.25rem`, color is `--color-text-body` (#171717).
- `aria-selected="true"`.

**Dot — inactive**
- Width is `0.5rem`, color is `--color-border-subtle` (#f5f5f5).
- `aria-selected="false"`.

**Auto-sliding**
- Triggered when `autoSlide: true`. Advances to the next slide every `autoSlideInterval` ms.
- Does not pause on hover or focus — this is a known accessibility gap (WCAG 2.1 SC 2.2.2).

**Image upload prompt (Images variant)**
- Shown when no image has been uploaded for a slide. Renders a dashed border placeholder with `ImagePlus` icon and "Upload image" label.
- Clicking the placeholder opens the OS file picker.

**Image uploaded (Images variant)**
- Renders `ElegantImage` with the selected file as a data URL.
- Clicking the image reopens the file picker to replace it.

**Single slide / no navigation**
- When `slides.length <= slidesVisible`, arrows are hidden and only one dot (or no dots) is shown.

## 6. Properties

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `cardType` | `'case-study' \| 'icon' \| 'referral' \| 'image'` | — | Yes | Determines which card component fills each slide. Controls available sub-props (`imageSize`, `imageRatio`, etc.). |
| `count` | `number` (2–8) | `4` | No | Number of slides to generate. Clamped to the range [2, 8]. Values are cycled from placeholder data when count exceeds the number of placeholder items. |
| `slidesVisible` | `1 \| 2 \| 3 \| 4` | `1` | No | Number of slides visible simultaneously. Each slide occupies `100 / slidesVisible` percent of the track width. |
| `autoSlide` | `boolean` | `false` | No | When `true`, the carousel advances automatically every `autoSlideInterval` ms. Does not pause on hover or focus. |
| `autoSlideInterval` | `number` | `4000` | No | Interval between auto-advances in milliseconds. Only relevant when `autoSlide` is `true`. Range in Storybook: 1000–8000ms. |
| `imageAlt` | `string` | `''` | No | Alt text applied to all image slides. Only used when `cardType="image"`. Required for accessibility when images contain meaningful content. |
| `imageCaption` | `string` | `''` | No | Caption shown below all image slides. Only used when `cardType="image"`. |
| `imageSize` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'full'` | No | Controls the width of the outer carousel wrapper for the image card type via Tailwind classes (`sm` = `md:w-1/2 lg:w-1/3`, `full` = `w-full`). Only applies when `cardType="image"`. |
| `imageRatio` | `'1/1' \| '4/3' \| '3/2' \| '16/9' \| '21/9'` | `'16/9'` | No | Aspect ratio of image slides. Only used when `cardType="image"`. `'auto'` is not allowed. |

## 7. Content guidelines

**Image alt text (`imageAlt`)**
- When images contain meaningful content (photographs of work, diagrams, screenshots), provide a descriptive alt text under 125 characters.
- If the image is purely decorative (abstract backgrounds, textures), pass `imageAlt=""` explicitly.
- One `imageAlt` applies to all slides — if slides show different subjects, this shared alt text is insufficient. [NEEDS CONFIRMATION on whether per-slide alt is supported or planned]

**Image caption (`imageCaption`)**
- One caption applies to all image slides. Use only when all images in the carousel share the same context (e.g., "User testing session, March 2025").
- Avoid captions that describe a specific single image when the carousel contains multiple different images.
- Keep captions under 15 words.

**Placeholder data (non-image card types)**
- `case-study`, `icon`, and `referral` card types use internal static placeholder data. In production, the component needs to be extended to accept real data via props. [NEEDS CONFIRMATION on whether this is a v1 limitation or a design intent]

## 8. Accessibility

**Keyboard navigation**
- Arrow buttons are focusable (`<button>`) and activatable with Enter and Space.
- Dot buttons are focusable and activatable with Enter and Space.
- There is no arrow-key navigation between slides — the ARIA carousel pattern recommends Left/Right arrow keys within the carousel region. This is a gap.
- Focus is not managed after advancing — focus remains on the clicked arrow button or dot.

**Screen reader behavior**
- Arrow buttons have `aria-label="Previous slide"` / `aria-label="Next slide"` — correctly describes the action.
- Dot pagination container has `role="tablist"` and `aria-label="Carousel navigation"`.
- Each dot has `role="tab"`, `aria-selected={active}`, and `aria-label="Go to slide N"`.
- Slide content (cards) has no `aria-roledescription="slide"` or wrapper `aria-roledescription="carousel"` — screen readers do not identify this region as a carousel. This deviates from the ARIA Authoring Practices carousel pattern.
- No `aria-live` region announces slide changes to screen readers during auto-advance.

**Color and contrast**
- Arrow button icons: `--color-text-body` (#171717) on `--color-bg-main` (#ffffff) — passes WCAG AA.
- Arrow button border: `--color-border-subtle` (#f5f5f5) on white — below 3:1 for UI element contrast. Decorative border, not informative.
- Active dot: `--color-text-body` (#171717) on white — passes 3:1 for UI elements.
- Inactive dot: `--color-border-subtle` (#f5f5f5) on white — fails 3:1 for UI elements. Inactive state is not distinguishable by color alone at low contrast [NEEDS CONFIRMATION whether this meets design intent].

**Motion**
- Slide transition: `transform` over `--primitive-duration-relaxed` (350ms) with `--primitive-easing-power2-out`. No `prefers-reduced-motion` check.
- Auto-slide: advances regardless of `prefers-reduced-motion`. Both are known gaps.

**Touch / pointer**
- Arrow buttons: `width: 2.25rem` (36px), `height: 2.25rem` (36px) — below the recommended 44×44px minimum touch target.
- Inactive dot buttons: `0.5rem × 0.5rem` (8px) — significantly below the 44×44px minimum. Known gap.
- Active dot: `1.25rem × 0.5rem` — still below minimum. Known gap.

**Known gaps**
1. `prefers-reduced-motion` not respected for slide transition or auto-slide.
2. `autoSlide` does not pause on hover or focus (violates WCAG 2.1 SC 2.2.2 if content is considered moving content).
3. Arrow button touch targets: 36px — below 44px minimum.
4. Dot button touch targets: 8px inactive — significantly below minimum.
5. No `aria-live` region for screen reader slide change announcements.
6. No `aria-roledescription` on the outer wrapper or individual slides.
7. No Left/Right arrow key navigation within the carousel.
8. Inactive dots fail 3:1 UI contrast ratio.

## 9. Design tokens

| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-bg-main` | `#ffffff` (`--primitive-white`) | Arrow button background |
| `--color-text-body` | `#171717` (`--primitive-gray-900`) | Arrow button icon; active dot background |
| `--color-border-subtle` | `#f5f5f5` (`--primitive-gray-100`) | Arrow button border; inactive dot background |
| `--color-bg-surface` | `#fafafa` (`--primitive-gray-50`) | Image slide upload placeholder background |
| `--color-text-muted` | `#666666` (`--primitive-gray-600`) | Image upload prompt text and icon |
| `--size-card-gap` | `1rem` (`--primitive-scale-4`) | Gap between arrow row and between slides; dot container top margin equivalent |
| `--size-tag-gap` | `0.75rem` (`--primitive-scale-3`) | Gap between dot pagination buttons |
| `--size-heading-to-body` | `1rem` (`--primitive-scale-4`) | Margin above dot pagination row |
| `--size-body-to-body` | `0.5rem` (`--primitive-scale-2`) | Gap in image upload placeholder layout |
| `--size-card-radius` | `4px` (`--primitive-radius-md`) | Image upload placeholder border-radius |
| `--primitive-radius-full` | `999px` | Arrow button border-radius; dot button border-radius |
| `--primitive-duration-fast` | `150ms` | Arrow button hover transition |
| `--primitive-duration-base` | `200ms` | Dot color and width transition |
| `--primitive-duration-relaxed` | `350ms` | Slide translation transition |
| `--primitive-easing-default` | `ease` | Arrow hover and dot transitions |
| `--primitive-easing-power2-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Slide translation easing |
| `--primitive-font-sans` | `DM Sans, sans-serif` | Image upload prompt font |
| `--primitive-font-size-xs` | `0.75rem` | Image upload prompt font size |

## 10. Responsive behavior

- **Non-image card types:** Always `w-full`. The carousel fills its parent container at all viewport widths. `slidesVisible` controls how many cards are shown at once, not breakpoints.
- **Image card type:** Width is set by the `imageSize` prop using Tailwind classes:
  - `sm` → `w-full md:w-1/2 lg:w-1/3` (full width below 600px, half above, third above 1136px)
  - `md` → `w-full md:w-3/4 lg:w-1/2`
  - `lg` → `w-full lg:w-2/3`
  - `full` → `w-full` at all breakpoints
- The `md` Tailwind breakpoint is 600px and `lg` is 1136px per the design system breakpoint overrides.
- Slide gutters are `calc(--size-card-gap / 2)` on each inner edge — these are fixed, not responsive.

## 11. Composition and usage patterns

**Single case study browser**
Use `cardType="case-study"`, `count={3}`, `slidesVisible={1}` in a full-width page section. Wrap in a Container with `paddingX="gutter"` and `paddingY="section"`.
Gotcha: case study data is placeholder — real data requires component extension.

`[STORYBOOK BLOCK: Simple/Assets/ElegantCarousel/CaseStudyCards]`

**Two-up feature showcase**
Use `cardType="icon"`, `count={4}`, `slidesVisible={2}`. Shows two icon cards at once with left/right arrows to advance through 4 total.
Gotcha: at narrow viewports, two visible slides create very narrow card widths — consider dropping to `slidesVisible={1}` below 600px via a responsive wrapper or a separate mobile instance. [NEEDS CONFIRMATION on whether responsive `slidesVisible` is planned]

`[STORYBOOK BLOCK: Simple/Assets/ElegantCarousel/IconCards]`

**Testimonials section**
Use `cardType="referral"`, `count={3}`, `slidesVisible={1}`. Pairs with a section heading in a Container above.
Gotcha: do not enable `autoSlide` for testimonials — users need time to read the quote.

`[STORYBOOK BLOCK: Simple/Assets/ElegantCarousel/ReferralCards]`

**Image gallery with upload**
Use `cardType="image"`, `imageRatio="16/9"`, `imageSize="full"`. Users click the placeholder to upload images directly in the browser.
Gotcha: uploaded images are stored as data URLs in component state. They are lost on remount. This is a Storybook/content-authoring pattern, not a production persistence pattern.

`[STORYBOOK BLOCK: Simple/Assets/ElegantCarousel/Images]`

## 12. Related components

| Component | When to use it instead |
|---|---|
| ElegantCaseStudyCard (standalone) | When you have a single case study to display — no carousel chrome needed, card can be placed directly in a grid or stack |
| Container with `direction="row-wrap"` | When all items should be visible simultaneously (e.g., 3 icon cards in a row) — no navigation needed, no hidden slides |
| ElegantList / ElegantNumeratedList | When content is textual and benefits from a scannable vertical or grid layout rather than sequential browsing |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Set `imageAlt` to a meaningful description when `cardType="image"` slides contain informative photographs or diagrams. | Leave `imageAlt` as the default empty string (`""`) for meaningful images — this makes the carousel inaccessible. |
| Use `autoSlide: false` (default) for any carousel on a page with substantial reading content. | Enable `autoSlide` without confirming the context is ambient (unattended display, hero loop) — auto-advancing disrupts reading focus. |
| Match `slidesVisible` to the available layout width — use `slidesVisible={1}` in narrow containers. | Set `slidesVisible={3}` in a container narrower than ~700px — each card will be too narrow to render content clearly. |
| Keep `count` between 3 and 6 for user-browsed carousels — more than 6 slides rarely get reached. | Set `count={8}` expecting 8 unique pieces of content — non-image card types cycle placeholder data; unique content requires component extension. |
| Wrap the carousel in a Container with `paddingX="gutter"` for proper edge spacing on full-width sections. | Place the carousel flush against the viewport edge without gutters — the arrow buttons will overlap the page border. |
| Use `cardType="referral"` with `slidesVisible={1}` for testimonials — one quote at a time is more impactful and easier to read. | Show testimonials with `slidesVisible={2}` — two quotes side-by-side compete for attention and reduce credibility. |
| Test the carousel on a touch device before publishing — dot tap targets are 8px and require precise tapping. | Ship `autoSlide: true` without confirming WCAG 2.1 SC 2.2.2 compliance — pausing on focus/hover is required for timed content. |
| Provide a visible heading section above the carousel to give it context (e.g., "Selected work", "What clients say"). | Use a carousel as the sole navigation for critical content — users who don't interact will only see the first slide. |

## 14. Changelog

**2026-04-27** — Increase arrow button size from 2.25rem to 2.75rem for WCAG touch target; add `prefers-reduced-motion` guard on slide transition
