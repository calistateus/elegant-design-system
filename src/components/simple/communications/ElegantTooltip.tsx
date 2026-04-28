'use client';

import { useId, useState } from 'react';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface ElegantTooltipProps {
  content: string;
  position?: TooltipPosition;
  children: React.ReactNode;
}

const GAP = 'calc(var(--primitive-scale-2) + 3px)';

const tooltipPositionStyles: Record<TooltipPosition, React.CSSProperties> = {
  top: {
    bottom: `calc(100% + ${GAP})`,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  bottom: {
    top: `calc(100% + ${GAP})`,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  left: {
    right: `calc(100% + ${GAP})`,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  right: {
    left: `calc(100% + ${GAP})`,
    top: '50%',
    transform: 'translateY(-50%)',
  },
};

const arrowPositionStyles: Record<TooltipPosition, React.CSSProperties> = {
  top: {
    bottom: -3,
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
  },
  bottom: {
    top: -3,
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
  },
  left: {
    right: -3,
    top: '50%',
    transform: 'translateY(-50%) rotate(45deg)',
  },
  right: {
    left: -3,
    top: '50%',
    transform: 'translateY(-50%) rotate(45deg)',
  },
};

export function ElegantTooltip({
  content,
  position = 'top',
  children,
}: ElegantTooltipProps) {
  const [visible, setVisible] = useState(false);
  const uid = useId();
  const tooltipId = `tooltip-${uid}`;

  const bubbleStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: 'var(--color-interactive-primary-bg)',
    color: 'var(--color-interactive-primary-fg)',
    fontSize: 'var(--primitive-font-size-xs)',
    fontWeight: 'var(--primitive-font-weight-regular)',
    lineHeight: 1.4,
    padding: 'var(--primitive-scale-2) var(--primitive-scale-3)',
    borderRadius: 'var(--size-btn-radius)',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    opacity: visible ? 1 : 0,
    transition: `opacity var(--primitive-duration-fast) var(--primitive-easing-default)`,
    zIndex: 100,
    ...tooltipPositionStyles[position],
  };

  const arrowStyle: React.CSSProperties = {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: 'var(--color-interactive-primary-bg)',
    ...arrowPositionStyles[position],
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      aria-describedby={visible ? tooltipId : undefined}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      <div id={tooltipId} role="tooltip" aria-hidden={!visible} style={bubbleStyle}>
        {content}
        <span style={arrowStyle} />
      </div>
    </div>
  );
}
