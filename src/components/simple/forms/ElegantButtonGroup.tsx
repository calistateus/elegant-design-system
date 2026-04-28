'use client';

import type { LucideIcon } from 'lucide-react';
import { ElegantButton } from './ElegantButton';

export type ButtonGroupContext = 'menu' | 'default';

export interface ButtonSlot {
  text: string;
  style?: 'primary' | 'secondary';
  showIcon?: boolean;
  icon?: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

interface ElegantButtonGroupProps {
  /** 'menu' uses compact sizing; 'default' uses full sizing. Cannot mix. */
  context: ButtonGroupContext;
  /** How many buttons to render (2–5). Slices the buttons array. */
  count: 2 | 3 | 4 | 5;
  /** Button slot configs — must supply at least count items. */
  buttons: ButtonSlot[];
  /** Accessible label for the group (e.g. "Primary actions"). */
  ariaLabel?: string;
}

export function ElegantButtonGroup({
  context,
  count,
  buttons,
  ariaLabel,
}: ElegantButtonGroupProps) {
  const slots = buttons.slice(0, count);

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: context === 'menu'
          ? 'var(--size-btn-px-sm)'
          : 'var(--size-btn-px)',
        flexWrap: 'wrap',
      }}
    >
      {slots.map((slot, i) => (
        <ElegantButton
          key={i}
          text={slot.text}
          style={slot.style ?? 'secondary'}
          icon={slot.showIcon ? slot.icon : undefined}
          context={context}
          onClick={slot.onClick}
          disabled={slot.disabled}
          ariaLabel={slot.ariaLabel}
        />
      ))}
    </div>
  );
}
