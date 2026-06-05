---
## Reviewer notes

**Files read:**
- `/Users/calistamateuszczyk/personal website/src/components/simple/ElegantTopNav.tsx`
- `/Users/calistamateuszczyk/personal website/src/stories/ElegantTopNav.stories.tsx`
- `/Users/calistamateuszczyk/personal website/src/app/globals.css`

**Files missing:** None.

**Sections needing human review:**
- Section 5 (States): No active/current-page highlight on nav links — all links render identically regardless of the current URL.
- Section 8 (Accessibility): Mobile menu items do not have `role` attributes.

**Recommended follow-ups:**
- Add an `activeHref` prop to highlight the current page link.
- Add `aria-label` to the mobile menu items if they are `<button>` elements.
- Add a story for the mobile viewport showing the open drawer.
- Test CTA with `onClick` vs `href` — both paths exist but only `href` is used in the default story (CTA omits `href`).

---

# TopNav

## 1. Overview
A sticky top navigation bar with a logo, up to five horizontal links, and an optional CTA button, with a hamburger-triggered mobile drawer for viewports below 600 px.

## 2. When to use / When not to use
| Use | Don't use |
|---|---|
| Primary site navigation that must be reachable from any scroll position | Section-level navigation within a single page — use Tabs instead |
| Portfolio or personal sites with 1–5 top-level destinations | Apps with complex navigation hierarchies needing mega-menus or nested dropdowns |
| A layout where a CTA (e.g. "Get in touch") must always be visible | Pages where the nav would overlap critical above-the-fold content |
| Contexts requiring responsive desktop-to-mobile fallback | Bottom navigation contexts (mobile app-style) — use BottomNav instead |

## 3. Anatomy
1. **Nav wrapper** — `<nav>` sticky at `top: 0`, `z-index: 50`, full-width, with `--color-bg-main` background and bottom border.
1a. **Skip-to-content link** — first child of the `<nav>`. Visually hidden at `top: -100%`; jumps to `top: var(--size-btn-py-sm)` on `:focus`, revealing it to keyboard users. Links to `#main-content` so keyboard users can bypass navigation. Uses primary button styling. `z-index: 9999`.
2. **Top bar** — inner `<div>` capped at `--size-max-width`, 3 rem tall, flex row distributing logo and controls.
3. **Logo** — `<span>` rendering the `logo` prop string in medium weight title color.
4. **Desktop menu** — `.elegant-nav-desktop` flex container; visible only at ≥600 px. Contains nav links and optional CTA.
5. **Nav links** — `<a>` elements in muted color, transitioning to title on hover.
6. **CTA button/link** — optional element rendering as `<a>` (if `href` provided) or `<button>` (if `onClick` provided) in the primary interactive style (black background, white text).
7. **Hamburger button** — `.elegant-nav-hamburger`; visible only at <600 px. Toggles the mobile drawer. Shows `Menu` icon when closed, `X` when open.
8. **Mobile drawer** — `<div>` rendered conditionally below the top bar when `open === true`. Contains stacked nav links and an optional full-width CTA.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantTopNav/Default]`

## 4. Variants
The component has one story (`Default`). Configurable axes are `logo`, `count` (1–5 links), `showCTA`, and `ctaLabel`.

**With CTA**
- Appends a primary-styled button or link after the desktop nav links.
- On mobile, the CTA renders as a full-width button at the bottom of the drawer.
- Choose when a primary action (contact, hire, download) must always be a single click away.
- Constraint: CTA must have either `href` or `onClick` — passing neither renders a non-functional button.

**Without CTA**
- All horizontal space is used by nav links only.
- Choose for purely informational or browse-oriented navigation where no single primary action exists.

## 5. States

| State | Desktop nav link | Mobile drawer link | CTA button |
|---|---|---|---|
| **Default** | `--color-text-muted`; regular weight; `letter-spacing: -0.01em` | `--color-text-muted` | `--color-interactive-primary-bg` bg; `--color-interactive-primary-fg` text |
| **Hover** | → `--color-text-title`; 150 ms ease | → `--color-text-accent`; 150 ms ease | `--color-interactive-primary-hover-bg` bg; `--color-interactive-primary-bg` text; 150 ms ease |
| **Focus** | Browser default outline (no custom ring) | Browser default outline | Browser default outline |
| **Mobile drawer** | — | Rendered in drawer below top bar; click closes drawer and restores focus to hamburger | Hamburger → X icon; `aria-expanded="true"` |

**Default (nav links)**
- Color: `--color-text-muted`, regular weight, `letter-spacing: -0.01em`.
- No active/current-page state — all links look identical.

**Hover (desktop nav links)**
- Color transitions to `--color-text-title` over 150 ms ease.

**Hover (mobile drawer links)**
- Color transitions to `--color-text-accent` over 150 ms ease. Note: this differs from the desktop hover behavior.

**CTA default**
- Background: `--color-interactive-primary-bg`.
- Text: `--color-interactive-primary-fg`.
- Border: `1px solid --color-interactive-primary-bg`.

**CTA hover**
- Background: `--color-interactive-primary-hover-bg`.
- Text: `--color-interactive-primary-bg`.
- Transition: 150 ms ease on `background-color` and `color`.

**Mobile drawer open**
- Hamburger icon switches from `Menu` to `X`.
- `aria-expanded={true}` is set on the hamburger button.
- Drawer renders below the top bar with a top border.

**Mobile drawer closed**
- Drawer is removed from the DOM (`{open && ...}` conditional).
- `aria-expanded={false}` on the hamburger.

**Focus**
- No custom `:focus-visible` styling is applied to any nav element — browser default outlines apply on all focusable elements.
- The skip link is properly implemented: visually hidden until it receives keyboard focus, then revealed at the top of the nav. Focus is restored to the hamburger button when a mobile nav link is clicked.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantTopNav/Default]`

## 6. Properties
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `logo` | `string` | `'Portfolio'` | No | Text string rendered as the brand identifier in the top-left. |
| `items` | `NavItem[]` | — | Yes | Array of `{ label: string; href: string }` nav link objects. Up to 5 items. |
| `cta` | `NavCTA` | — | No | Optional CTA config: `{ label: string; onClick?: () => void; href?: string }`. |

`NavItem` shape: `{ label: string; href: string }`.
`NavCTA` shape: `{ label: string; onClick?: () => void; href?: string }`. Either `onClick` or `href` must be provided.

## 7. Content guidelines
- **Logo:** Use the portfolio owner's name, initials, or brand word mark (1–20 characters). Avoid long phrases.
- **Nav link labels:** 1–2 words, title case. Use section names (Work, About, Contact) not descriptors (See My Work, Learn About Me).
- **CTA label:** A clear imperative (Get in touch, Hire me, Download CV). Keep under 20 characters.
- **Item count:** 1–5 items. On desktop, more than 5 items may cause the CTA to overflow; the `count` Storybook control demonstrates 1–5 only.

## 8. Accessibility
- **Keyboard navigation:** A skip-to-content link is the first focusable element in the nav — keyboard users can press Tab once, then Enter to jump past navigation to `#main-content`. All desktop links and the CTA are native `<a>` or `<button>` elements and receive Tab focus in DOM order. The hamburger button is a `<button>` with `aria-label="Open menu"` / `"Close menu"` and `aria-expanded` toggle.
- **Screen reader behavior:** The hamburger button announces its expanded state via `aria-expanded`. Desktop nav links are plain anchors without a role (they are inside a `<nav>` landmark, which is sufficient). Mobile drawer links are `<a>` elements — readable in order. No `aria-controls` linking the hamburger to the drawer.
- **Focus:** No custom `:focus-visible` styling is applied to any nav element — browser default outlines apply. The skip link is properly implemented: visually hidden until it receives keyboard focus, then revealed at the top of the nav. Focus is restored to the hamburger button when a mobile nav link is clicked (`hamburgerRef.current?.focus()` is called on mobile link click).
- **Color and contrast:** Muted links (#666666 on #ffffff) ~5.74:1. Title hover (#1e1e1e on #ffffff) ~16:1. CTA (white on black) ~16:1. Accent hover in mobile drawer (#2e6f40 on #ffffff) ~5.4:1 — verify AA compliance.
- **Motion:** All transitions are 150 ms color/background changes. No animation requiring `prefers-reduced-motion` guard.
- **Touch/pointer (desktop):** Desktop nav links have `padding: 0` — they rely on the 48px nav bar height for vertical affordance. Desktop CTA renders at ~26px height (4px + 18px + 4px). The desktop layout appears only at ≥600px where pointer input is primary.
- **Touch/pointer (mobile):** Hamburger button: `padding: var(--size-btn-py-sm)` = 4px each side + 20px icon = ~28px — below the 44px WCAG 2.5.5 minimum. Mobile menu links: `padding: var(--size-btn-py) 0` = 8px vertical + ~20px text = ~36px — below 44px. Both are known gaps for mobile touch targets.
- **Known gaps:** No active link state. No custom `:focus-visible` styles. Hamburger touch target ~28px and mobile menu links ~36px, both below the 44px minimum.

## 9. Design tokens
| Token | Value (from globals.css) | Where it's applied |
|---|---|---|
| `--color-bg-main` | `#ffffff` | Nav bar and mobile drawer background |
| `--color-border-subtle` | `#f5f5f5` | Bottom border of top bar; mobile drawer top/item borders |
| `--color-text-title` | `#1e1e1e` | Logo color; desktop hover color |
| `--color-text-muted` | `#666666` | Nav link default color |
| `--color-text-body` | `#171717` | Mobile drawer link default color; hamburger icon |
| `--color-text-accent` | `#2e6f40` | Mobile drawer link hover color |
| `--color-interactive-primary-bg` | `#1e1e1e` | CTA background; CTA hover text |
| `--color-interactive-primary-fg` | `#ffffff` | CTA text; CTA hover background |
| `--color-bg-main` | `var(--primitive-white)` = `#ffffff` | CTA hover background |
| `--primitive-font-size-xs` | `0.75rem` | Desktop nav link and CTA font size |
| `--primitive-font-size-sm` | `0.875rem` | Logo and mobile menu item font size |
| `--primitive-font-weight-regular` | `400` | Nav link weight |
| `--primitive-font-weight-medium` | `500` | Logo weight; CTA weight |
| `--size-btn-px` | `1rem` | Desktop menu gap between links |
| `--size-btn-py` | `0.5rem` | Mobile link vertical padding |
| `--size-btn-py-sm` | `0.25rem` | CTA vertical padding (small); hamburger padding |
| `--size-btn-px-sm` | `0.75rem` | CTA horizontal padding (small) |
| `--size-btn-radius` | `4px` | CTA border radius |
| `--size-max-width` | `1280px` | Max width of the top bar inner container |
| `--size-page-gutter` | `1.5rem` | Horizontal padding of top bar and mobile drawer |
| `--size-card-padding` | `1.5rem` | Bottom padding of mobile drawer |
| `--motion-interactive-color` | `color 150ms ease` | All hover color transitions |
| `--z-index-nav` | `50` | Sticky z-index of the nav element |

## 10. Responsive behavior
- **Desktop (≥ 600 px):** `.elegant-nav-desktop` is `display: flex`, hamburger is `display: none`. All links and CTA visible inline.
- **Mobile (< 600 px):** Desktop menu is `display: none`, hamburger is `display: flex`. Nav links and CTA are accessible only via the drawer.
- Breakpoint is implemented via scoped `<style>` in the component at `min-width: 600px` / `max-width: 599px`.
- The mobile drawer stacks links vertically with a bottom border per item. CTA renders full-width with `justify-content: center`.

## 11. Composition and usage patterns

**Portfolio top nav with CTA**
The default story pattern: logo left, 3 links, one CTA on the right. The most common portfolio use case.

**Nav without CTA**
Pass `cta={undefined}` (omit the prop). All horizontal space is devoted to nav links. Appropriate for low-pressure browse contexts (blog archives, case study reading).

**CTA as href vs onClick**
If the CTA leads to a contact page, pass `href="/contact"` — this renders a proper `<a>` element and benefits from browser link behavior (right-click, open in new tab). If the CTA triggers a modal or form drawer, pass `onClick` instead.

`[STORYBOOK BLOCK: Simple/Navigation/ElegantTopNav/Default]`

## 12. Related components
| Component | When to use it instead |
|---|---|
| [BottomNav](/design-system/docs/bottom-nav-zh) | When navigation should persist at the bottom of the screen — typically for social/external links on portfolio sites |
| [Tabs](/design-system/docs/tabs-zh) | When switching between sibling content panels on a single page, not sections of the site |
| [Breadcrumbs](/design-system/docs/breadcrumbs-zh) | When users need to retrace a path through a deep hierarchy, not jump between top-level sections |

## 13. Do's and don'ts

| Do | Don't |
|---|---|
| Mount TopNav at the root layout level so it appears on every page. | Render TopNav inside a page component — it will lose its sticky behavior relative to the viewport. |
| Use `href` for the CTA when it leads to a page. | Use `onClick` for the CTA if it's just navigating to a URL — this breaks right-click and middle-click behaviors. |
| Keep `logo` short (name, initials, or 1–2 word brand). | Use a full sentence or a tagline as the logo — it competes with nav links for space. |
| Limit `items` to 3–4 links for comfortable desktop reading. | Pass 5 items plus a CTA on a 320 px-wide screen — test the layout before shipping. |
| Implement focus return to the hamburger when a mobile drawer link is clicked. | Leave keyboard users without a focused element after the drawer closes. |
| Add an active link indicator before shipping to production. | Leave all links visually identical — users need to know where they are. |

## 14. Changelog

### 2026-04-27
- **Accessibility:** Added skip-to-content link as the first focusable element in the nav. The link is visually hidden until focused, at which point it appears as a visible button linking to `#main-content`, allowing keyboard-only users to bypass navigation.
- **Tokens:** Replaced `--primitive-white` with `--color-bg-main` for the CTA hover background; replaced `--primitive-duration-fast` + `--primitive-easing-default` with `--motion-interactive-color`. Removed redundant `fontFamily` — inherited from `body`. See `globals.css` for full token definitions.

**2026-04-27** — Fix mobile drawer link hover from `--color-text-accent` to `--color-text-title` for consistency; add hamburger ref and restore focus to it when drawer closes
