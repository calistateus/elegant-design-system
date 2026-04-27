# Design System Changelog

## Stage 1 — Token Layer Reconciliation (2026-04-27)

### Summary
Established `specs/tokens/*.json` as the single source of truth for all CSS custom properties. Added a build script that generates the consolidated `:root` block in `globals.css` from the JSON files. Promoted all 75 orphaned CSS vars into JSON. Added new semantic tokens for shadows, z-index, typography scale, motion states, and sizing.

---

### New files

| File | Purpose |
|---|---|
| `scripts/build-tokens.mjs` | Node ES module. Reads all token JSON files and regenerates the `:root` block in `globals.css`. Idempotent — running twice produces no diff. Wired to `prebuild` in `package.json`. |
| `src/lib/motion-constants.ts` | JS-side mirror of motion tokens for GSAP and `setTimeout` consumers that cannot read CSS custom properties at runtime. |
| `specs/tokens/shadow.json` | New token file — 5 shadow tokens: `focus-ring`, `popover`, `card`, `menu`, `thumb`. |
| `specs/tokens/z-index.json` | New token file — 4 z-index tokens: `nav` (50), `drawer` (51), `overlay` (100), `toast` (9999). |
| `design-system/CHANGELOG.md` | This file. |

---

### Token JSON changes

#### `specs/tokens/color.json`
- **New primitives:** `--primitive-green-300` (#6dbd84), `--primitive-amber-500` (#f59e0b)
- **Promoted 41 orphaned semantic vars** into new sections:
  - `background`: `--color-bg-main`, `--color-bg-surface`
  - `text`: `--color-text-title`, `--color-text-body`, `--color-text-muted`, `--color-text-accent`
  - `border`: `--color-border-subtle`
  - `progress`: `--color-progress-track`
  - `interactive`: `--color-interactive-primary-bg`, `--color-interactive-primary-fg`
  - `heatmap`: 5 scale vars + 4 accent (color-mix) + 4 redgreen = 13 vars
  - `error`: `--color-error-text`, `--color-error-border`
  - `badge`: 24 vars (8 colors × 3 roles) + `--size-badge-radius`
  - `chip`: 9 vars (3 colors × 3 roles)
  - `fileupload`: 4 color vars
  - `skeleton`: `--color-skeleton-base`, `--color-skeleton-highlight`
  - `overlay`: `--color-overlay-scrim` — **value corrected** from `rgba(17,17,17,0.4)` to `rgba(30,30,30,0.4)` to match `--primitive-black` (#1e1e1e)

#### `specs/tokens/spacing.json`
- **New primitives:** `--primitive-scale-9` (2.25rem), `--primitive-scale-20` (5rem)
- **Promoted orphaned sizing vars** into new sections:
  - `grid`: 8 base mobile-first vars (responsive overrides stay in `@media` blocks, not generated)
  - `chip`: `--size-chip-radius/px/py/gap`
  - `heatmap`: `--size-heatmap-cell/gap/cell-radius`
  - `skeleton`: `--size-skeleton-radius`
  - `fileupload`: 3 sizing vars
  - `spinner`: `--size-spinner-sm/md/lg`
  - `progress`: `--size-progress-track-height/length`
  - `circular-progress`: `--size-circular-progress-sm/md/lg`
- **Added to existing sections:** `drawer-width`, `btn-radius`, `card-radius`
- **New sections:**
  - `border`: `--size-border-default` (1px), `--size-border-thick` (2px)
  - `icon`: `--size-icon-xs/sm/md/lg` + `--size-icon-stroke` (1.5)

#### `specs/tokens/typography.json`
- **New primitive:** `--primitive-font-size-2xs` (0.625rem / 10px) — for ElegantStepper micro-labels
- **New semantic sections:**
  - `line-height`: 6 tokens (none=1, heading=1.25, heading-tight=1.3, tight=1.4, base=1.5, relaxed=1.6)
  - `tracking`: 3 tokens (tight=−0.01em, display=−0.02em, wide=0.1em)

#### `specs/tokens/motion.json`
- **New semantic tokens:**
  - `input.focus` → `--motion-input-focus`
  - `interactive.color` → `--motion-interactive-color`
  - `state-values`: `--motion-opacity-hover` (0.85), `--motion-scale-hover` (1.05), `--motion-scale-rest` (1)
  - `toast.dismiss-ms` → `--motion-toast-dismiss-ms` (4000)
  - `spinner`: `--motion-spinner-duration` (700ms), `--motion-spinner-easing` (linear)
  - `skeleton`: `--motion-skeleton-duration` (1.6s), `--motion-skeleton-easing` (ease-in-out)

#### `specs/tokens/shadow.json` _(new file)_
- `--shadow-focus-ring`: `0 0 0 2px var(--primitive-gray-200)`
- `--shadow-popover`: `0 4px 12px rgba(0,0,0,0.08)`
- `--shadow-card`: `0 2px 8px rgba(0,0,0,0.08)`
- `--shadow-menu`: `0 4px 16px rgba(0,0,0,0.08)`
- `--shadow-thumb`: `0 1px 2px rgba(0,0,0,0.15)`

#### `specs/tokens/z-index.json` _(new file)_
- `--z-index-nav`: 50
- `--z-index-drawer`: 51
- `--z-index-overlay`: 100
- `--z-index-toast`: 9999

---

### `globals.css` changes
- Two scattered `:root` blocks replaced by a **single consolidated `:root` block** wrapped in `/* BEGIN GENERATED TOKENS */` / `/* END GENERATED TOKENS */` markers.
- All responsive `@media` grid overrides, `@theme inline`, keyframes, utilities, and base styles are preserved verbatim outside the generated block.
- `--color-overlay-scrim` corrected to `rgba(30, 30, 30, 0.4)`.
- **30 new CSS custom properties** added from the new token files.

---

### Surgical component edits (5 total)

| Component | Change |
|---|---|
| `ElegantDataTable.tsx` | Row selection background: `rgba(46,111,64,0.06/0.10)` → `color-mix(in srgb, var(--primitive-green-500) 6/10%, var(--color-bg-main))` |
| `ElegantCheckbox.tsx` | Added comment above `borderRadius: '1px'` in indeterminate indicator explaining why it intentionally deviates from `--primitive-radius-sm` |
| `ElegantAvatarGroup.tsx` | Replaced `lineHeight: 0` with `display: 'flex'` + `alignItems: 'center'` on avatar wrapper |
| `ElegantTopNav.tsx` | Replaced `lineHeight: 0` with `alignItems: 'center'` + `justifyContent: 'center'` on hamburger button; corrected breakpoints 640px/639px → 600px/599px to match design system grid |
| `ElegantChip.tsx` | `<X strokeWidth={2.5}>` → `strokeWidth={1.5}` to match `--size-icon-stroke` system default |

---

### Verification
- All 203 original CSS custom properties confirmed present in regenerated `globals.css` (zero missing).
- Build script confirmed idempotent (second run outputs "no changes").
- No component files modified outside the 5 approved surgical exceptions.
