'use client';

import { ImagePlus } from 'lucide-react';

type AvatarSize = 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<AvatarSize, string> = {
  sm: 'var(--primitive-scale-8)',   // 2rem / 32px
  md: 'var(--primitive-scale-10)',  // 2.5rem / 40px
  lg: 'var(--primitive-scale-12)', // 3rem / 48px
};

const ICON_SIZE_MAP: Record<AvatarSize, number> = {
  sm: 12,
  md: 14,
  lg: 16,
};

interface ElegantAvatarProps {
  /** Image URL — renders a cover-fit photo when provided */
  src?: string;
  /** Alt text for the avatar image */
  alt?: string;
  /** Size preset — sm (32px), md (40px), lg (48px) */
  size?: AvatarSize;
}

export function ElegantAvatar({ src, alt = '', size = 'md' }: ElegantAvatarProps) {
  const dimension = SIZE_MAP[size];
  return (
    <div
      style={{
        width: dimension,
        height: dimension,
        minWidth: dimension,
        minHeight: dimension,
        borderRadius: '50%',
        border: src ? 'none' : '2px dashed var(--color-border-subtle)',
        backgroundColor: 'var(--color-bg-main)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <ImagePlus size={ICON_SIZE_MAP[size]} strokeWidth={1.5} color="var(--color-text-muted)" />
      )}
    </div>
  );
}
