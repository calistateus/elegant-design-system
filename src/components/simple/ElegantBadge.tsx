import type { LucideIcon } from 'lucide-react';

type BadgeColor = 'neutral' | 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'white' | 'black';

interface ElegantBadgeProps {
  label: string;
  icon?: LucideIcon;
  color?: BadgeColor;
}

export function ElegantBadge({ label, icon: Icon, color = 'neutral' }: ElegantBadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--primitive-scale-1)',
        padding: 'var(--primitive-scale-1) var(--primitive-scale-2)',
        backgroundColor: `var(--color-badge-${color}-bg)`,
        border: `1px solid var(--color-badge-${color}-border)`,
        borderRadius: 'var(--size-badge-radius)',
        fontFamily: 'var(--primitive-font-sans)',
        fontSize: 'var(--primitive-font-size-xs)',
        fontWeight: 'var(--primitive-font-weight-regular)',
        color: `var(--color-badge-${color}-text)`,
        letterSpacing: '-0.01em',
        lineHeight: 1,
      }}
    >
      {Icon && <Icon size={10} strokeWidth={1.5} />}
      {label}
    </span>
  );
}
