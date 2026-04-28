'use client';

import type { LucideIcon } from 'lucide-react';

export interface ElegantListItem {
  label: string;
  description?: string;
  /** Optional icon shown before this item's label. */
  icon?: LucideIcon;
}

export interface ElegantListProps {
  /** Number of list items to render (1–7). Must match the length of `items`. */
  count: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** Items to render — array length must equal `count`. */
  items: ElegantListItem[];
  /** Optional heading shown above the description and list. */
  heading?: string;
  /** Optional supporting description shown above the list. */
  description?: string;
  /** Single column or two-column grid (collapses to single on mobile). */
  columns?: 'single' | 'two';
  /**
   * Semantic heading level for the optional heading.
   * Visual styling (h5 tokens) is preserved regardless.
   * Set this to match the surrounding page hierarchy — e.g. if the list
   * sits inside an h2 section, use 'h3'. Defaults to 'h5'.
   */
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function ElegantList({
  count,
  items,
  heading,
  description,
  columns = 'single',
  headingLevel = 'h5',
}: ElegantListProps) {
  const HeadingTag = headingLevel;
  const visibleItems = items.slice(0, count);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size-heading-to-body)',
      }}
    >
      {(heading || description) && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--size-label-to-description)',
          }}
        >
          {heading && (
            // Semantic level set by headingLevel prop; visual styling always uses h5 tokens
            <HeadingTag
              style={{
                fontFamily: 'var(--type-h5-family)',
                fontSize: 'var(--type-h5-size)',
                fontWeight: 'var(--type-h5-weight)',
                lineHeight: 'var(--type-h5-line-height)',
                color: 'var(--color-text-title)',
                margin: 0,
              }}
            >
              {heading}
            </HeadingTag>
          )}

          {description && (
            <p
              style={{
                fontSize: 'var(--primitive-font-size-sm)',
                fontWeight: 'var(--primitive-font-weight-regular)',
                lineHeight: '1.5',
                color: 'var(--color-text-muted)',
                margin: 0,
              }}
            >
              {description}
            </p>
          )}
        </div>
      )}

      <ul
        className={
          columns === 'two'
            ? 'grid grid-cols-1 md:grid-cols-2'
            : 'flex flex-col'
        }
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: 'var(--size-card-gap)',
        }}
      >
        {visibleItems.map((item, i) => {
          const ItemIcon = item.icon;
          return (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--primitive-scale-3)',
            }}
          >
            {ItemIcon && (
              <ItemIcon
                size={16}
                strokeWidth={1.5}
                aria-hidden="true"
                style={{
                  color: 'var(--color-text-accent)',
                  flexShrink: 0,
                  marginTop: '0.1875rem',
                }}
              />
            )}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--size-label-to-description)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--primitive-font-size-sm)',
                  fontWeight: 'var(--primitive-font-weight-medium)',
                  lineHeight: '1.5',
                  color: 'var(--color-text-body)',
                }}
              >
                {item.label}
              </span>

              {item.description && (
                <span
                  style={{
                    fontSize: 'var(--primitive-font-size-sm)',
                    fontWeight: 'var(--primitive-font-weight-regular)',
                    lineHeight: '1.5',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {item.description}
                </span>
              )}
            </div>
          </li>
          );
        })}
      </ul>
    </div>
  );
}
