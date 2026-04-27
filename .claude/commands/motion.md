---
name: motion
description: GSAP motion patterns for Simple-mode components. Covers hover scale, GPU compositing, and animation values.
---

# Motion Skill

All animation in Simple-mode components uses **GSAP**. No CSS transitions. No Framer Motion.

## General Rules

- Attach mouse events to the outermost interactive element (e.g. `<article>`, `<div role="button">`), not to individual children.
- Keep `duration` at `0.35` and use `power2.out` on enter, `power2.inOut` on leave.
- Never animate layout properties (`width`, `height`, `padding`, `margin`). Only animate `transform` properties (`scale`, `x`, `y`, `rotation`) and `opacity`.
- Always add `willChange: 'transform'` and `backfaceVisibility: 'hidden'` to any element that will be animated, to promote it to a GPU compositor layer and prevent subpixel text wiggle.

## Card Hover Scale Pattern

Used on: `ElegantCaseStudyCard`

The card has two independently animated regions:

| Region | Element | Scale on hover | Notes |
|---|---|---|---|
| Image | inner `<div>` inside an `overflow: hidden` wrapper | `1.05` | Only animate when `imagePath` is set |
| Content block | the padding `<div>` containing all text | `1.02` | Always animate |

### Implementation

```tsx
'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';

export function ExampleCard() {
  const imageRef   = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(imageRef.current,   { scale: 1.05, duration: 0.35, ease: 'power2.out' });
    gsap.to(contentRef.current, { scale: 1.02, duration: 0.35, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current,   { scale: 1, duration: 0.35, ease: 'power2.inOut' });
    gsap.to(contentRef.current, { scale: 1, duration: 0.35, ease: 'power2.inOut' });
  };

  return (
    <article onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

      {/* Image: overflow wrapper clips the scale */}
      <div style={{ overflow: 'hidden' }}>
        <div
          ref={imageRef}
          style={{ width: '100%', height: '100%', transformOrigin: 'center center' }}
        />
      </div>

      {/* Content block: GPU-promoted to prevent text wiggle */}
      <div
        ref={contentRef}
        style={{
          padding: 'var(--size-card-padding)',
          transformOrigin: 'center center',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* tags, title, description, outcome */}
      </div>

    </article>
  );
}
```

### Why `willChange` + `backfaceVisibility`

Without these, the browser re-rasterizes text on every animation frame, causing a visible subpixel wiggle in paragraphs. Together they force the element onto its own compositor layer so only the transform matrix is updated — text is rasterized once at scale 1 and composited at the new scale each frame.

## Animation Values Reference

| Property | Enter | Leave |
|---|---|---|
| `duration` | `0.35` | `0.35` |
| `ease` | `power2.out` | `power2.inOut` |
| Image scale | `1.05` | `1` |
| Content block scale | `1.02` | `1` |

## Adding Motion to a New Component

1. Import `useRef` and `gsap`.
2. Create a `ref` for each animated element.
3. Add `handleMouseEnter` / `handleMouseLeave` on the root element.
4. Inside each handler, call `gsap.to(ref.current, { ... })`.
5. Add `willChange: 'transform'` and `backfaceVisibility: 'hidden'` to every element whose `ref` will be passed to `gsap.to`.
6. Wrap image regions in an `overflow: hidden` div so the scale is clipped by the card boundary.
