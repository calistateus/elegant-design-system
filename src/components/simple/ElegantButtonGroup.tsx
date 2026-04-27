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
}

interface ElegantButtonGroupProps {
  /** 'menu' uses compact sizing; 'default' uses full sizing. Cannot mix. */
  context: ButtonGroupContext;
  /** How many buttons to render (2–5). Slices the buttons array. */
  count: 2 | 3 | 4 | 5;
  /** Button slot configs — must supply at least count items. */
  buttons: ButtonSlot[];
}

export function ElegantButtonGroup({
  context,
  count,
  buttons,
}: ElegantButtonGroupProps) {
  const slots = buttons.slice(0, count);

  return (
    <div
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
        />
      ))}
    </div>
  );
}
