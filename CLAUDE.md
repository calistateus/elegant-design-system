# Elegant Design System

## Stack
Next.js App Router · Tailwind · GSAP · Lucide Icons · TypeScript strict (no `any`)

## Source of truth
- All copy/data → `src/data/content.ts` only
- All tokens → `src/app/globals.css` only
- Component specs → `specs/[component-name]-spec.md` (read before touching that component)
- Architecture decisions → `context/architecture.md` (read before touching >3 files)

## Modes
- **Simple** → `src/components/simple/` — follows TypeUI Elegant, token-strict
- **Creative** → `src/components/creative/` — experimental, still token-strict

## Do not read unless relevant
- `specs/*-spec.md` — only when building or editing that component
- `context/architecture.md` — only for structural changes
- `specs/tokens/` — only for styling work or syncing to global.css

## Commands
- New component → run `/design-create`
- Validate content sources → run `/content-sync`
