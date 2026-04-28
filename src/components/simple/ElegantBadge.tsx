import type { LucideIcon } from 'lucide-react';

type BadgeColor = 'neutral' | 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'white' | 'black';

interface ElegantBadgeProps {
  /** Visible text label. Pass an empty string `""` for icon-only badges
   *  and provide `ariaLabel` instead. */
  label: string;
  icon?: LucideIcon;
  color?: BadgeColor;
  /**
   * Accessible name for icon-only badges (i.e. when `label` is "").
   * If omitted, the icon name is not announced — always set this for
   * icon-only variants.
   *
   * Tip: match the Lucide icon name in sentence case, e.g.
   *   icon={CheckCircle} ariaLabel="Check circle"
   */
  ariaLabel?: string;
}

export function ElegantBadge({ label, icon: Icon, color = 'neutral', ariaLabel }: ElegantBadgeProps) {
  const isIconOnly = !label && !!Icon;

  return (
    <span
      aria-label={isIconOnly ? (ariaLabel ?? undefined) : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--primitive-scale-1)',
        padding: 'var(--primitive-scale-1) var(--primitive-scale-2)',
        backgroundColor: `var(--color-badge-${color}-bg)`,
        border: `1px solid var(--color-badge-${color}-border)`,
        borderRadius: 'var(--size-badge-radius)',
        fontSize: 'var(--primitive-font-size-xs)',
        fontWeight: 'var(--primitive-font-weight-regular)',
        color: `var(--color-badge-${color}-text)`,
        letterSpacing: '-0.01em',
        lineHeight: 1,
      }}
    >
      {Icon && <Icon size={10} strokeWidth={1.5} aria-hidden="true" />}
      {label}
    </span>
  );
}
