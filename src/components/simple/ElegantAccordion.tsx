'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  heading: string;
  description: string;
}

export interface ElegantAccordionProps {
  items: AccordionItem[];
  size?: 'default' | 'compact';
}

export function ElegantAccordion({ items, size = 'default' }: ElegantAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isCompact = size === 'compact';

  const triggerPaddingBlock = isCompact ? 'var(--primitive-scale-3)' : 'var(--size-card-padding)';
  const triggerPaddingInline = isCompact ? 'var(--primitive-scale-4)' : 'var(--size-card-padding)';
  const triggerGap = isCompact ? 'var(--primitive-scale-2)' : 'var(--size-card-gap)';
  const triggerFontSize = isCompact ? 'var(--primitive-font-size-sm)' : 'var(--primitive-font-size-base)';
  const bodyFontSize = isCompact ? 'var(--primitive-font-size-xs)' : 'var(--primitive-font-size-sm)';
  const chevronSize = isCompact ? 14 : 16;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--size-card-radius)',
        border: '1px solid var(--color-border-subtle)',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            style={{
              borderTop: index === 0 ? 'none' : '1px solid var(--primitive-gray-200)',
            }}
          >
            {/* Trigger row */}
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${index}`}
              id={`accordion-trigger-${index}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: triggerGap,
                paddingBlock: triggerPaddingBlock,
                paddingInline: triggerPaddingInline,
                fontFamily: 'var(--primitive-font-sans)',
                fontSize: triggerFontSize,
                fontWeight: 'var(--primitive-font-weight-medium)',
                color: 'var(--color-text-title)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                lineHeight: 1.4,
              }}
            >
              <span style={{ flex: 1 }}>{item.heading}</span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexShrink: 0,
                  color: 'var(--color-text-muted)',
                  transition: 'var(--motion-dropdown-chevron)',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <ChevronDown size={chevronSize} strokeWidth={1.5} />
              </span>
            </button>

            {/* Collapsible panel */}
            <div
              id={`accordion-panel-${index}`}
              role="region"
              aria-labelledby={`accordion-trigger-${index}`}
              style={{
                overflow: 'hidden',
                maxHeight: isOpen ? '600px' : '0',
                transition: `max-height var(--primitive-duration-relaxed) var(--primitive-easing-power2-out)`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  paddingTop: 0,
                  paddingInline: triggerPaddingInline,
                  paddingBottom: triggerPaddingBlock,
                  fontFamily: 'var(--primitive-font-sans)',
                  fontSize: bodyFontSize,
                  fontWeight: 'var(--primitive-font-weight-regular)',
                  color: 'var(--color-text-body)',
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
