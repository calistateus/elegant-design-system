'use client';

import type { LucideIcon } from 'lucide-react';

type ButtonStyle = 'primary' | 'secondary';
type ButtonContext = 'menu' | 'default';

interface ElegantButtonProps {
  text: string;
  style?: ButtonStyle;
  icon?: LucideIcon;
  context?: ButtonContext;
  onClick?: () => void;
  className?: string;
}

export function ElegantButton({
  text,
  style = 'primary',
  icon,
  context = 'default',
  onClick,
  className = '',
}: ElegantButtonProps) {
  const isPrimary = style === 'primary';
  const isMenu = context === 'menu';
  const Icon = icon;

  const baseStyle: React.CSSProperties = isPrimary
    ? {
        display: 'inline-flex',
        alignItems: 'center',
        gap: isMenu ? 'var(--size-btn-icon-gap-sm)' : 'var(--size-btn-icon-gap)',
        padding: isMenu
          ? 'var(--size-btn-py-sm) var(--size-btn-px-sm)'
          : 'var(--size-btn-py) var(--size-btn-px)',
        backgroundColor: 'var(--color-interactive-primary-bg)',
        color: 'var(--color-interactive-primary-fg)',
        borderRadius: 'var(--size-btn-radius)',
        border: '1px solid var(--color-interactive-primary-bg)',
        cursor: 'pointer',
        fontFamily: 'var(--primitive-font-sans)',
        fontSize: isMenu ? 'var(--primitive-font-size-xs)' : 'var(--primitive-font-size-base)',
        fontWeight: isMenu ? 'var(--primitive-font-weight-regular)' : 'var(--primitive-font-weight-medium)',
        letterSpacing: '-0.01em',
        transition: 'background-color 150ms ease, color 150ms ease, transform 150ms ease',
        textDecoration: 'none',
      }
    : {
        display: 'inline-flex',
        alignItems: 'center',
        gap: isMenu ? 'var(--size-btn-icon-gap-sm)' : 'var(--size-btn-icon-gap)',
        padding: 0,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--primitive-font-sans)',
        fontSize: isMenu ? 'var(--primitive-font-size-xs)' : 'var(--primitive-font-size-base)',
        fontWeight: isMenu ? 'var(--primitive-font-weight-regular)' : 'var(--primitive-font-weight-medium)',
        letterSpacing: '-0.01em',
        color: isMenu ? 'var(--color-text-muted)' : 'var(--color-text-body)',
        transition: 'color 150ms ease, opacity 150ms ease, transform 150ms ease',
        textDecoration: 'none',
      };

  return (
    <button
      onClick={onClick}
      className={className}
      style={baseStyle}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        if (isPrimary) {
          el.style.backgroundColor = 'var(--primitive-white)';
          el.style.color = 'var(--color-interactive-primary-bg)';
          if (!isMenu) el.style.transform = 'scale(1.05)';
        } else {
          el.style.color = 'var(--color-interactive-primary-bg)';
          if (!isMenu) el.style.transform = 'scale(1.05)';
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        if (isPrimary) {
          el.style.backgroundColor = 'var(--color-interactive-primary-bg)';
          el.style.color = 'var(--color-interactive-primary-fg)';
          if (!isMenu) el.style.transform = 'scale(1)';
        } else {
          el.style.color = isMenu ? 'var(--color-text-muted)' : 'var(--color-text-body)';
          if (!isMenu) el.style.transform = 'scale(1)';
        }
      }}
    >
      {text}
      {Icon && <Icon size={isMenu ? 12 : 16} strokeWidth={1.5} />}
    </button>
  );
}
