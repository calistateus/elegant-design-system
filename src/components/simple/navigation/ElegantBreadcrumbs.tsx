export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface ElegantBreadcrumbsProps {
  /** Number of items to render (2–5). Slices the items array. */
  count: 2 | 3 | 4 | 5;
  /** Breadcrumb items in order. Last rendered item is treated as the current page. */
  items: BreadcrumbItem[];
  /** Separator character between crumbs. Defaults to '/'. */
  separator?: string;
  className?: string;
}

export function ElegantBreadcrumbs({
  count,
  items,
  separator = '/',
  className = '',
}: ElegantBreadcrumbsProps) {
  const slots = items.slice(0, count);

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--primitive-scale-2)',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          fontSize: 'var(--primitive-font-size-sm)',
        }}
      >
        {slots.map((item, index) => {
          const isCurrent = index === slots.length - 1;

          return (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--primitive-scale-2)',
              }}
            >
              {index > 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    color: 'var(--color-text-muted)',
                    fontWeight: 'var(--primitive-font-weight-regular)',
                    userSelect: 'none',
                  }}
                >
                  {separator}
                </span>
              )}

              {isCurrent ? (
                <span
                  aria-current="page"
                  style={{
                    color: 'var(--color-text-title)',
                    fontWeight: 'var(--primitive-font-weight-medium)',
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  style={{
                    color: 'var(--color-text-muted)',
                    fontWeight: 'var(--primitive-font-weight-regular)',
                    textDecoration: 'none',
                    transition: 'var(--motion-interactive-color)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-body)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)';
                  }}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
