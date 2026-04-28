'use client';

import React, { CSSProperties } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type WrapperElement = 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer' | 'nav';

type Surface = 'none' | 'surface' | 'card';

type MaxWidth = 'page' | 'full';

type PaddingX = 'none' | 'gutter' | 'card';

type PaddingY = 'none' | 'gutter' | 'card' | 'stack' | 'section';

type Gap = 'none' | 'tag' | 'card' | 'stack' | 'section';

type Direction = 'column' | 'row' | 'row-wrap';

type Align = 'start' | 'center' | 'end' | 'stretch';

type Justify = 'start' | 'center' | 'end' | 'between' | 'around';

// ─── Token maps ──────────────────────────────────────────────────────────────

const SURFACE_MAP: Record<Surface, CSSProperties> = {
  none:    {},
  surface: { backgroundColor: 'var(--color-bg-surface)' },
  card:    { backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--size-card-radius)', border: '1px solid var(--color-border-subtle)' },
};

const PADDING_X_MAP: Record<PaddingX, string> = {
  none:   '0',
  gutter: 'var(--size-page-gutter)',
  card:   'var(--size-card-padding)',
};

const PADDING_Y_MAP: Record<PaddingY, string> = {
  none:    '0',
  gutter:  'var(--size-page-gutter)',
  card:    'var(--size-card-padding)',
  stack:   'var(--size-stack-gap)',
  section: 'var(--size-section-gap)',
};

const GAP_MAP: Record<Gap, string> = {
  none:    '0',
  tag:     'var(--size-tag-gap)',
  card:    'var(--size-card-gap)',
  stack:   'var(--size-stack-gap)',
  section: 'var(--size-section-gap)',
};

const ALIGN_MAP: Record<Align, CSSProperties['alignItems']> = {
  start:   'flex-start',
  center:  'center',
  end:     'flex-end',
  stretch: 'stretch',
};

const JUSTIFY_MAP: Record<Justify, CSSProperties['justifyContent']> = {
  start:   'flex-start',
  center:  'center',
  end:     'flex-end',
  between: 'space-between',
  around:  'space-around',
};

// ─── Component ────────────────────────────────────────────────────────────────

export interface ElegantWrapperProps {
  /** HTML element to render as. */
  as?: WrapperElement;
  /** Background and border treatment. 'card' adds border + radius. */
  surface?: Surface;
  /** Constrains horizontal width. 'page' uses system max-width (1280px). */
  maxWidth?: MaxWidth;
  /** Centers the wrapper horizontally using auto margins. */
  center?: boolean;
  /** Horizontal inner padding. */
  paddingX?: PaddingX;
  /** Vertical inner padding. */
  paddingY?: PaddingY;
  /** Gap between direct children. */
  gap?: Gap;
  /** Flex direction for children layout. */
  direction?: Direction;
  /** Align items along the cross axis. */
  align?: Align;
  /** Justify items along the main axis. */
  justify?: Justify;
  /** Fill the full width of the parent. */
  fullWidth?: boolean;
  /** Additional inline styles. */
  style?: CSSProperties;
  /** Additional class names. */
  className?: string;
  children?: React.ReactNode;
}

export function ElegantWrapper({
  as: Tag = 'div',
  surface = 'none',
  maxWidth,
  center = false,
  paddingX = 'none',
  paddingY = 'none',
  gap = 'none',
  direction = 'column',
  align = 'stretch',
  justify = 'start',
  fullWidth = false,
  style,
  className,
  children,
}: ElegantWrapperProps) {
  const flexDirection: CSSProperties['flexDirection'] =
    direction === 'row-wrap' ? 'row' : direction;

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection,
    flexWrap: direction === 'row-wrap' ? 'wrap' : 'nowrap',
    alignItems: ALIGN_MAP[align],
    justifyContent: JUSTIFY_MAP[justify],
    gap: GAP_MAP[gap],
    paddingInline: PADDING_X_MAP[paddingX],
    paddingBlock: PADDING_Y_MAP[paddingY],
    ...SURFACE_MAP[surface],
    ...(maxWidth === 'page' && { maxWidth: 'var(--size-max-width)' }),
    ...(maxWidth === 'full' && { maxWidth: '100%' }),
    ...(fullWidth && { width: '100%' }),
    ...(center && { marginInline: 'auto' }),
    ...style,
  };

  return (
    <Tag style={wrapperStyle} className={className}>
      {children}
    </Tag>
  );
}
