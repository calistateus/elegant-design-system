'use client';

export interface BottomNavItem {
  label: string;
  href: string;
  external?: boolean;
}

interface ElegantBottomNavProps {
  items: BottomNavItem[];
}

export function ElegantBottomNav({ items }: ElegantBottomNavProps) {
  const itemStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--primitive-font-sans)',
    fontSize: 'var(--primitive-font-size-xs)',
    fontWeight: 'var(--primitive-font-weight-regular)',
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    textAlign: 'center',
    padding: 'var(--size-btn-py) var(--size-btn-px)',
    border: 'none',
    background: 'none',
    letterSpacing: '-0.01em',
    cursor: 'pointer',
    transition: 'color var(--primitive-duration-fast) var(--primitive-easing-default)',
  };

  return (
    <nav
      aria-label="Bottom navigation"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'var(--color-bg-main)',
        borderTop: '1px solid var(--color-border-subtle)',
        padding: 'var(--primitive-scale-3) var(--size-page-gutter)',
      }}
    >
      <div className="elegant-bnav-group">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="elegant-bnav-item"
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            style={itemStyle}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-title)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
          >
            {item.label}
          </a>
        ))}
      </div>

      <style>{`
        .elegant-bnav-group {
          display: flex;
          flex-direction: column;
          max-width: var(--size-max-width);
          margin: 0 auto;
        }

        /* Desktop: horizontal row */
        @media (min-width: 640px) {
          .elegant-bnav-group {
            flex-direction: row;
            gap: var(--primitive-scale-2);
            width: fit-content;
          }
        }
      `}</style>
    </nav>
  );
}
