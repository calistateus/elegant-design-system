'use client';

export interface ElegantNumeratedListItem {
  label: string;
  description?: string;
}

export interface ElegantNumeratedListProps {
  /** Number of list items to render (1–7). Must match the length of `items`. */
  count: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** Items to render — array length must equal `count`. */
  items: ElegantNumeratedListItem[];
  /** Optional heading shown above the description and list. */
  heading?: string;
  /** Optional supporting description shown above the list. */
  description?: string;
  /** Single column or two-column grid (collapses to single on mobile). */
  columns?: 'single' | 'two';
}

export function ElegantNumeratedList({
  count,
  items,
  heading,
  description,
  columns = 'single',
}: ElegantNumeratedListProps) {
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
            <h5
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
            </h5>
          )}

          {description && (
            <p
              style={{
                fontFamily: 'var(--primitive-font-sans)',
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

      <ol
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
        {visibleItems.map((item, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--primitive-scale-3)',
              paddingBottom: 'var(--size-card-gap)',
              borderBottom: '1px solid var(--color-border-subtle)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontFamily: 'var(--primitive-font-mono)',
                fontSize: 'var(--primitive-font-size-xs)',
                fontWeight: 'var(--primitive-font-weight-medium)',
                lineHeight: '1.5',
                color: 'var(--color-text-accent)',
                flexShrink: 0,
                minWidth: '1rem',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--size-label-to-description)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--primitive-font-sans)',
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
                    fontFamily: 'var(--primitive-font-sans)',
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
        ))}
      </ol>
    </div>
  );
}
