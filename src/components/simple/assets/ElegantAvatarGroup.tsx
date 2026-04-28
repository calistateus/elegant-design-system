'use client';

import { ElegantAvatar } from '@/components/simple/assets/ElegantAvatar';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarItem {
  src?: string;
  alt?: string;
}

interface ElegantAvatarGroupProps {
  /** Array of avatar data to render */
  avatars: AvatarItem[];
  /** Maximum number of avatars to show before overflow — default 4 */
  maxVisible?: number;
  /** Stacked (overlapping) or unstacked (side-by-side) layout */
  layout?: 'stacked' | 'unstacked';
  /** Show the "+N more" overflow circle */
  showOverflow?: boolean;
  /** Explicit overflow count — defaults to avatars.length minus maxVisible */
  overflowCount?: number;
  /** Size preset passed to each avatar — sm (32px), md (40px), lg (48px) */
  size?: AvatarSize;
}

const DIMENSION: Record<AvatarSize, string> = {
  sm: 'var(--primitive-scale-8)',
  md: 'var(--primitive-scale-10)',
  lg: 'var(--primitive-scale-12)',
};

const OVERFLOW_FONT: Record<AvatarSize, string> = {
  sm: 'var(--primitive-font-size-xs)',
  md: 'var(--primitive-font-size-xs)',
  lg: 'var(--primitive-font-size-sm)',
};

const OVERLAP = '-0.625rem'; // 10px pull-in for stacked mode
const RING = '0 0 0 2px var(--color-bg-main)'; // white separator ring

export function ElegantAvatarGroup({
  avatars,
  maxVisible = 4,
  layout = 'stacked',
  showOverflow = false,
  overflowCount,
  size = 'md',
}: ElegantAvatarGroupProps) {
  const visible = avatars.slice(0, maxVisible);
  const autoOverflow = Math.max(0, avatars.length - maxVisible);
  const displayCount = overflowCount !== undefined ? overflowCount : autoOverflow;
  const isStacked = layout === 'stacked';
  const dim = DIMENSION[size];

  return (
    <div
      role="group"
      aria-label={`Avatar group, ${visible.length} shown${showOverflow && displayCount > 0 ? `, ${displayCount} more` : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: isStacked ? 0 : 'var(--primitive-scale-1)',
      }}
    >
      {visible.map((avatar, i) => (
        <div
          key={i}
          style={{
            marginLeft: isStacked && i > 0 ? OVERLAP : undefined,
            zIndex: isStacked ? visible.length - i : undefined,
            borderRadius: '50%',
            boxShadow: isStacked ? RING : undefined,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ElegantAvatar src={avatar.src} alt={avatar.alt} size={size} />
        </div>
      ))}

      {showOverflow && displayCount > 0 && (
        <div
          style={{
            marginLeft: isStacked ? OVERLAP : 0,
            zIndex: 0,
            width: dim,
            height: dim,
            minWidth: dim,
            minHeight: dim,
            borderRadius: '50%',
            boxShadow: isStacked ? RING : undefined,
            backgroundColor: 'var(--color-bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: OVERFLOW_FONT[size],
            fontWeight: 'var(--primitive-font-weight-medium)',
            color: 'var(--color-text-muted)',
            userSelect: 'none',
          }}
          aria-label={`${displayCount} more`}
        >
          +{displayCount}
        </div>
      )}
    </div>
  );
}
