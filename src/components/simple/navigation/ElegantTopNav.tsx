'use client';

import { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavCTA {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface ElegantTopNavProps {
  logo?: string;
  items: NavItem[];
  cta?: NavCTA;
}

export function ElegantTopNav({ logo = 'Portfolio', items, cta }: ElegantTopNavProps) {
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const linkStyle: React.CSSProperties = {
    fontSize: 'var(--primitive-font-size-xs)',
    fontWeight: 'var(--primitive-font-weight-regular)',
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    letterSpacing: '-0.01em',
    transition: 'var(--motion-interactive-color)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  };

  const ctaStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 'var(--size-btn-py-sm) var(--size-btn-px-sm)',
    backgroundColor: 'var(--color-interactive-primary-bg)',
    color: 'var(--color-interactive-primary-fg)',
    borderRadius: 'var(--size-btn-radius)',
    border: '1px solid var(--color-interactive-primary-bg)',
    cursor: 'pointer',
    fontSize: 'var(--primitive-font-size-xs)',
    fontWeight: 'var(--primitive-font-weight-regular)',
    letterSpacing: '-0.01em',
    textDecoration: 'none',
    transition: 'background-color var(--primitive-duration-fast) var(--primitive-easing-default), color var(--primitive-duration-fast) var(--primitive-easing-default)',
    whiteSpace: 'nowrap',
  };

  const mobileMenuItemStyle: React.CSSProperties = {
    fontSize: 'var(--primitive-font-size-sm)',
    fontWeight: 'var(--primitive-font-weight-regular)',
    color: 'var(--color-text-body)',
    textDecoration: 'none',
    letterSpacing: '-0.01em',
    padding: 'var(--size-btn-py) 0',
    display: 'block',
    borderBottom: '1px solid var(--color-border-subtle)',
    transition: 'var(--motion-interactive-color)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
  };

  const ctaElement = cta ? (
    cta.href ? (
      <a
        href={cta.href}
        style={ctaStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-bg-main)';
          e.currentTarget.style.color = 'var(--color-interactive-primary-bg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-interactive-primary-bg)';
          e.currentTarget.style.color = 'var(--color-interactive-primary-fg)';
        }}
      >
        {cta.label}
      </a>
    ) : (
      <button
        onClick={cta.onClick}
        style={ctaStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-bg-main)';
          e.currentTarget.style.color = 'var(--color-interactive-primary-bg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-interactive-primary-bg)';
          e.currentTarget.style.color = 'var(--color-interactive-primary-fg)';
        }}
      >
        {cta.label}
      </button>
    )
  ) : null;

  return (
    <nav
      style={{
        backgroundColor: 'var(--color-bg-main)',
        borderBottom: '1px solid var(--color-border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        width: '100%',
      }}
    >
      {/* Skip link */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          zIndex: 9999,
          padding: 'var(--size-btn-py-sm) var(--size-btn-px-sm)',
          backgroundColor: 'var(--color-interactive-primary-bg)',
          color: 'var(--color-interactive-primary-fg)',
          fontSize: 'var(--primitive-font-size-sm)',
          fontWeight: 'var(--primitive-font-weight-medium)',
          borderRadius: 'var(--size-input-radius)',
          textDecoration: 'none',
        }}
        onFocus={(e) => {
          const el = e.currentTarget;
          el.style.left = 'var(--size-page-gutter)';
          el.style.top = 'var(--size-btn-py-sm)';
          el.style.width = 'auto';
          el.style.height = 'auto';
          el.style.overflow = 'visible';
        }}
        onBlur={(e) => {
          const el = e.currentTarget;
          el.style.left = '-9999px';
          el.style.top = 'auto';
          el.style.width = '1px';
          el.style.height = '1px';
          el.style.overflow = 'hidden';
        }}
      >
        Skip to content
      </a>

      {/* Top bar */}
      <div
        style={{
          padding: '0 var(--grid-normal-margin)',
          height: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Left slot ── */}
        {/* Desktop: logo | Mobile: hamburger */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo — desktop only */}
          <span
            className="elegant-nav-logo"
            style={{
              fontSize: 'var(--primitive-font-size-sm)',
              fontWeight: 'var(--primitive-font-weight-medium)',
              color: 'var(--color-text-title)',
              letterSpacing: '-0.02em',
            }}
          >
            {logo}
          </span>

          {/* Hamburger — mobile only */}
          <button
            ref={hamburgerRef}
            className="elegant-nav-hamburger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-body)',
              padding: 'var(--size-btn-py-sm)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>

        {/* ── Right slot ── */}
        {/* Desktop: links + CTA | Mobile: CTA only */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--size-btn-px)',
          }}
        >
          {/* Nav links — desktop only */}
          <div
            className="elegant-nav-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--size-btn-px)',
            }}
          >
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={linkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-title)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA — always visible */}
          {ctaElement}
        </div>
      </div>

      {/* Mobile drawer — links only (CTA is always in the header) */}
      {open && (
        <div
          style={{
            borderTop: '1px solid var(--color-border-subtle)',
            backgroundColor: 'var(--color-bg-main)',
            padding: '0 var(--grid-normal-margin) var(--size-card-padding)',
          }}
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                ...mobileMenuItemStyle,
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
              onClick={() => { setOpen(false); hamburgerRef.current?.focus(); }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-title)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-body)'; }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Responsive visibility — scoped to this component */}
      <style>{`
        @media (min-width: 600px) {
          .elegant-nav-logo    { display: inline !important; }
          .elegant-nav-hamburger { display: none !important; }
          .elegant-nav-links   { display: flex !important; }
        }
        @media (max-width: 599px) {
          .elegant-nav-logo    { display: none !important; }
          .elegant-nav-hamburger { display: flex !important; }
          .elegant-nav-links   { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
