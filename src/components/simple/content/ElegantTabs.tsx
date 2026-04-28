'use client';

import { ReactNode, useState, useId } from 'react';

export type TabsStyle = 'underlined' | 'contained';

export interface ContentSlot {
  label: string;
  content: ReactNode;
}

interface ElegantTabsProps {
  /** Visual style of the tab strip. */
  tabStyle?: TabsStyle;
  /** Number of tabs to render (2–5). Slices the tabs array. */
  count: 2 | 3 | 4 | 5;
  /** Tab slot configs — must supply at least count items. */
  tabs: ContentSlot[];
  /** Zero-based index of the initially active tab. */
  defaultActiveIndex?: number;
  /** Called when the user selects a tab. */
  onTabChange?: (index: number) => void;
  className?: string;
}

export function ElegantTabs({
  tabStyle = 'underlined',
  count,
  tabs,
  defaultActiveIndex = 0,
  onTabChange,
  className = '',
}: ElegantTabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const uid = useId();

  const slots = tabs.slice(0, count);
  const isUnderlined = tabStyle === 'underlined';

  function handleSelect(index: number) {
    setActiveIndex(index);
    onTabChange?.(index);
  }

  // ── Tab button styles ──────────────────────────────────────

  function getTabStyle(index: number, total: number): React.CSSProperties {
    const isActive = index === activeIndex;
    const isHovered = index === hoveredIndex;
    const isFirst = index === 0;
    const isLast = index === total - 1;

    if (isUnderlined) {
      return {
        flex: 1,
        minWidth: 0,
        padding: 'var(--primitive-scale-2) var(--primitive-scale-3)',
        background: 'none',
        border: 'none',
        borderBottom: isActive
          ? '2px solid var(--color-interactive-primary-bg)'
          : '2px solid transparent',
        marginBottom: '-1px',
        color: isActive
          ? 'var(--color-text-title)'
          : isHovered
            ? 'var(--color-text-body)'
            : 'var(--color-text-muted)',
        cursor: 'pointer',
        fontSize: 'var(--primitive-font-size-sm)',
        fontWeight: (isActive
          ? 'var(--primitive-font-weight-medium)'
          : 'var(--primitive-font-weight-regular)') as React.CSSProperties['fontWeight'],
        transition:
          'color var(--primitive-duration-fast) var(--primitive-easing-default), border-color var(--primitive-duration-fast) var(--primitive-easing-default)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        textAlign: 'center',
      };
    }

    // contained — active tab drops into the content area; inactive tabs sit above the separator
    return {
      flex: 1,
      minWidth: 0,
      padding: 'var(--primitive-scale-2) var(--primitive-scale-3)',
      backgroundColor: isActive ? 'var(--color-bg-main)' : 'var(--primitive-gray-100)',
      border: '1px solid var(--color-border-subtle)',
      // Active tab erases the strip's bottom border to connect with the content area
      borderBottom: isActive ? '1px solid var(--color-bg-main)' : '1px solid var(--color-border-subtle)',
      marginBottom: isActive ? '-1px' : '0',
      borderTopLeftRadius: isFirst ? 'var(--primitive-radius-sm)' : 0,
      borderTopRightRadius: isLast ? 'var(--primitive-radius-sm)' : 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      color: isActive
        ? 'var(--color-text-title)'
        : isHovered
          ? 'var(--color-text-body)'
          : 'var(--color-text-muted)',
      cursor: 'pointer',
      fontSize: 'var(--primitive-font-size-sm)',
      fontWeight: (isActive
        ? 'var(--primitive-font-weight-medium)'
        : 'var(--primitive-font-weight-regular)') as React.CSSProperties['fontWeight'],
      transition: 'var(--motion-interactive-color)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      textAlign: 'center',
    };
  }

  // ── Tab strip ──────────────────────────────────────────────

  const stripStyle: React.CSSProperties = isUnderlined
    ? {
        display: 'flex',
        borderBottom: '1px solid var(--color-border-subtle)',
      }
    : {
        display: 'flex',
        padding: 'var(--primitive-scale-2) 0 0',
        borderBottom: '1px solid var(--color-border-subtle)',
      };

  const strip = (
    <div role="tablist" style={stripStyle} aria-label="Tabs">
      {slots.map((slot, index) => (
        <button
          key={index}
          id={`${uid}-tab-${index}`}
          role="tab"
          aria-selected={index === activeIndex}
          aria-controls={`${uid}-panel-${index}`}
          tabIndex={index === activeIndex ? 0 : -1}
          style={getTabStyle(index, slots.length)}
          onClick={() => handleSelect(index)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {slot.label}
        </button>
      ))}
    </div>
  );

  // ── Content panel ──────────────────────────────────────────

  const contentStyle: React.CSSProperties = {
    padding: 'var(--size-card-padding)',
    fontSize: 'var(--primitive-font-size-sm)',
    color: 'var(--color-text-body)',
    lineHeight: 1.6,
  };

  const activeContent = slots[activeIndex]?.content ?? null;

  // ── Layout ─────────────────────────────────────────────────

  if (isUnderlined) {
    return (
      <div className={className}>
        {strip}
        <div
          id={`${uid}-panel-${activeIndex}`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${activeIndex}`}
          style={contentStyle}
        >
          {activeContent}
        </div>
      </div>
    );
  }

  // Contained: tabs sit freely above; only the content panel has a border
  return (
    <div className={className}>
      {strip}
      <div
        id={`${uid}-panel-${activeIndex}`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${activeIndex}`}
        style={{
          ...contentStyle,
          borderLeft: '1px solid var(--color-border-subtle)',
          borderRight: '1px solid var(--color-border-subtle)',
          borderBottom: '1px solid var(--color-border-subtle)',
          borderBottomLeftRadius: 'var(--size-input-radius)',
          borderBottomRightRadius: 'var(--size-input-radius)',
          backgroundColor: 'var(--color-bg-main)',
        }}
      >
        {activeContent}
      </div>
    </div>
  );
}
