---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantAvatar.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantAvatar.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None

**Sections needing human review:**
- Section 5 (States): No hover, focus, active, or disabled states are implemented. Avatar is a purely presentational component. Interactive behavior (e.g. uploading a photo) must be implemented by wrapping Avatar in a `<button>` at the parent level.
- Section 8 (Accessibility): no explicit `role` or ARIA label is applied to the outer div; behavior when used inside interactive elements needs verification
- Section 10 (Responsive behavior): no breakpoint-specific sizing changes are implemented

**Recommended follow-ups:**
- Add stories for each size variant (sm, lg) rather than relying solely on the controls panel
- Add an `InitialsAvatar` variant or fallback for when no image URL is available but a name string is present
- Verify color contrast of the muted icon placeholder against the surface background

---

# Avatar

## 1. Overview
Avatar displays a circular user photo — or a dashed placeholder icon when no image is available — as a compact, non-interactive identity marker.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Representing a person in a comment, attribution, or list item | Displaying product images or content thumbnails — use Image instead |
| Alongside a name in a user profile header | Filling decorative space with a generic icon — use an icon directly |
| Inside AvatarGroup to show a set of participants | When the image must be interactive (clickable, draggable) — wrap in a button and handle there |

## 3. Anatomy
1. **Container** — circular div that clips the image and enforces fixed dimensions; shows the placeholder state when `src` is absent.
2. **Photo** — `<img>` element with `object-fit: cover` ensuring the image fills the circle without distortion.
3. **Placeholder icon** — `ImagePlus` Lucide icon shown at muted color when no `src` is provided; size scales with the `size` prop.

`[STORYBOOK BLOCK: Simple/Assets/ElegantAvatar/Default]`

## 4. Variants
The component does not expose named visual variants beyond size. The two visual states are:

**With image (`src` provided)**
- Renders the photo filling the circular container edge-to-edge with `object-fit: cover`
- No border is applied
- Use when a real user photo is available

**Placeholder (no `src`)**
- Shows a dashed 2px border using `--color-border-subtle`
- Displays a muted `ImagePlus` icon at the center
- Use during loading states, for anonymous users, or in design/editing contexts where the image has not yet been uploaded

## 5. States
**Default**
- Static display; no interaction affordances
- Photo: circular clipped image; Placeholder: dashed ring + icon

**Loading / No image**
- No explicit loading state is implemented. If `src` is provided but still loading, the browser renders its native broken-image treatment until the image resolves. For a graceful loading experience, wrap Avatar in `ElegantSkeleton` at the parent level or add an `onError` handler to fall back to the placeholder.

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `src` | `string` | — | No | URL of the user photo; when absent the placeholder icon is shown |
| `alt` | `string` | `''` | No | Alt text for the avatar image; provide a meaningful description (e.g. person's name) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size preset controlling diameter: sm = 32px, md = 40px, lg = 48px |

## 7. Content guidelines
- **`alt`**: Use the person's display name (e.g. `alt="Alice"`) rather than a generic description such as "avatar". Leave empty only if the avatar is redundant alongside visible text bearing the same name.
- **`src`**: Prefer square or portrait-cropped source images so `object-fit: cover` centers on the face without cropping important detail.

## 8. Accessibility
- **Keyboard navigation**: The component is not interactive and is not focusable by default. If placed inside a button or link, keyboard focus and activation are inherited from the wrapper.
- **Screen reader behavior**: The `<img>` element surfaces its `alt` text to screen readers. When `alt=""` and no image is present, the placeholder icon carries `aria-hidden` implicitly (it is not set explicitly — [NEEDS CONFIRMATION] whether the Lucide `ImagePlus` icon needs `aria-hidden="true"` added).
- **Color and contrast**: The placeholder icon uses `--color-text-muted` (#666666) on `--color-bg-main` (#ffffff) — contrast ratio approximately 4.6:1, passing WCAG AA for non-text elements.
- **Motion**: No animations are triggered by this component.
- **Touch / pointer**: Not interactive; no minimum target size applies.
- **Known gaps**: No `role="img"` with an accessible label on the container div in placeholder mode; the icon is decorative but the "empty slot" affordance is not announced to screen readers.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-bg-main` | `#ffffff` | Container background color (placeholder state) |
| `--color-border-subtle` | `#f5f5f5` (`--primitive-gray-100`) | Dashed border in placeholder state |
| `--color-text-muted` | `#666666` (`--primitive-gray-600`) | Placeholder icon stroke color |
| `--primitive-scale-8` | `2rem` (32px) | Diameter when `size="sm"` |
| `--primitive-scale-10` | `2.5rem` (40px) | Diameter when `size="md"` |
| `--primitive-scale-12` | `3rem` (48px) | Diameter when `size="lg"` |

## 10. Responsive behavior
Avatar does not change size across breakpoints. The `size` prop is a fixed preset; responsive scaling must be handled by the parent component or layout if needed.

## 11. Composition and usage patterns
**User attribution row**
Place Avatar beside a name and role string to create a compact author or speaker attribution. Pass the person's name as `alt` text.

**Standalone placeholder in a form**
Use Avatar without `src` as an upload trigger target — the dashed ring and `ImagePlus` icon visually signal "tap to add a photo". Wrap in a `<button>` and invoke the file picker from the button's click handler.

`[STORYBOOK BLOCK: Simple/Assets/ElegantAvatar/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [AvatarGroup](/design-system/docs/avatar-group-zh) | When displaying 2 or more avatars together in stacked or side-by-side layout |
| [Image](/design-system/docs/image-zh) | When displaying content images (not user identity) with captions and aspect ratio control |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Provide a meaningful `alt` prop containing the person's name. | Leave `alt` empty when the avatar is the only indicator of who is shown. |
| Use the `size` preset that fits the surrounding type scale — `sm` beside caption text, `lg` in profile headers. | Stretch or clip the avatar container with custom `width`/`height` overrides that break the circle. |
| Use the placeholder state to signal an empty or unconfigured avatar slot. | Use a broken or missing image URL; handle image errors at the parent level. |
| Use `AvatarGroup` when displaying multiple avatars together. | Manually position overlapping Avatar instances — use AvatarGroup's stacking logic instead. |
| Keep source images square and face-centered so `object-fit: cover` crops predictably. | Use landscape or wide images expecting important detail to remain visible after the circular crop. |
| Wrap in a `<button>` with an accessible label when the avatar must be interactive. | Attach click handlers directly to the Avatar div — it has no interactive role or keyboard accessibility. |

## 14. Changelog

[Empty - key changes will be tracked from this point forward]
