'use client';

import { useState } from 'react';
import { ExternalLink, BookOpen, Layers, Package } from 'lucide-react';

// Inline GitHub SVG mark (lucide-react v1 removed the Github icon)
function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// ── Config ────────────────────────────────────────────────────────────
// Set NEXT_PUBLIC_STORYBOOK_URL in .env.local for your hosted Storybook.
// Set NEXT_PUBLIC_GITHUB_URL for your repository URL.
const STORYBOOK_URL =
  process.env.NEXT_PUBLIC_STORYBOOK_URL ?? 'https://elegant-design-system-6jr9.vercel.app';
const STORYBOOK_IS_LOCAL = STORYBOOK_URL.includes('localhost');
const GITHUB_URL =
  process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/calistateus/elegant-design-system';

import { COMPONENTS, type Category, type ComponentDef } from './components-data';

const CATEGORIES: Category[] = [
  'All',
  'Forms',
  'Navigation',
  'Feedback',
  'Data',
  'Display',
];

const CATEGORY_COUNTS = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
  acc[cat] =
    cat === 'All'
      ? COMPONENTS.length
      : COMPONENTS.filter(c => c.category === cat).length;
  return acc;
}, {});

// ── Page ──────────────────────────────────────────────────────────────
export default function DesignSystemPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered =
    activeCategory === 'All'
      ? COMPONENTS
      : COMPONENTS.filter(c => c.category === activeCategory);

  return (
    <div style={{ background: 'var(--color-bg-main)', minHeight: '100vh' }}>

      {/* ── Nav ──────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--size-page-gutter)',
          height: '56px',
        }}
      >
        <a href="/design-system" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <Layers size={16} style={{ color: 'var(--color-text-title)' }} />
          <span style={{
            fontFamily: 'var(--primitive-font-serif)',
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-medium)',
            color: 'var(--color-text-title)',
            letterSpacing: '-0.02em',
          }}>
            Elegant Design System
          </span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {[
            { label: 'Components', href: '#components' },
            { label: 'Docs', href: '#docs' },
            { label: 'Storybook', href: STORYBOOK_URL, external: true },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              style={{
                fontFamily: 'var(--primitive-font-sans)',
                fontSize: 'var(--primitive-font-size-xs)',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--color-interactive-primary-bg)',
              color: 'var(--color-interactive-primary-fg)',
              fontFamily: 'var(--primitive-font-sans)',
              fontSize: 'var(--primitive-font-size-xs)',
              fontWeight: 'var(--primitive-font-weight-medium)',
              padding: '7px 14px',
              borderRadius: 'var(--primitive-radius-sm)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            <GitHubIcon size={13} />
            GitHub
          </a>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section style={{
        paddingTop: 'calc(56px + var(--size-section-gap))',
        paddingBottom: 'var(--size-section-gap)',
        paddingLeft: 'var(--size-page-gutter)',
        paddingRight: 'var(--size-page-gutter)',
        maxWidth: 'var(--size-max-width)',
        margin: '0 auto',
      }}>

        {/* Eyebrow badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--primitive-radius-full)',
          padding: '4px 14px 4px 10px',
          marginBottom: '28px',
        }}>
          <span style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--color-interactive-primary-bg)',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: 'var(--primitive-font-mono)',
            fontSize: 'var(--primitive-font-size-2xs)',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.04em',
          }}>
            Open source · Next.js 15 · React 19 · GSAP
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--primitive-font-serif)',
          fontSize: 'clamp(2.25rem, 5vw, var(--primitive-font-size-display))',
          fontWeight: 'var(--primitive-font-weight-medium)',
          color: 'var(--color-text-title)',
          letterSpacing: '-0.03em',
          lineHeight: 1.08,
          margin: '0 0 20px',
          maxWidth: '800px',
        }}>
          56 production-ready<br />design system components.
        </h1>

        {/* Subheading */}
        <p style={{
          fontFamily: 'var(--primitive-font-sans)',
          fontSize: 'var(--primitive-font-size-base)',
          color: 'var(--color-text-muted)',
          lineHeight: 1.65,
          margin: '0 0 12px',
          maxWidth: '560px',
          letterSpacing: '-0.01em',
        }}>
          A token-strict component library built in Next.js and React with TypeScript strict mode.
          Each component has Storybook stories, a live preview, and full zeroheight-style documentation.
        </p>
        <p style={{
          fontFamily: 'var(--primitive-font-sans)',
          fontSize: 'var(--primitive-font-size-sm)',
          color: 'var(--color-text-muted)',
          lineHeight: 1.6,
          margin: '0 0 40px',
          maxWidth: '560px',
          letterSpacing: '-0.01em',
        }}>
          <strong style={{ color: 'var(--color-text-body)', fontWeight: 'var(--primitive-font-weight-medium)' }}>Copy</strong> individual components into your project.{' '}
          <strong style={{ color: 'var(--color-text-body)', fontWeight: 'var(--primitive-font-weight-medium)' }}>Fork</strong> the repo and build your own system on top.{' '}
          <strong style={{ color: 'var(--color-text-body)', fontWeight: 'var(--primitive-font-weight-medium)' }}>Contribute</strong> a component, fix a bug, or improve the docs via pull request.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '72px' }}>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--color-interactive-primary-bg)',
              color: 'var(--color-interactive-primary-fg)',
              fontFamily: 'var(--primitive-font-sans)',
              fontSize: 'var(--primitive-font-size-sm)',
              fontWeight: 'var(--primitive-font-weight-medium)',
              padding: '12px 22px',
              borderRadius: 'var(--primitive-radius-sm)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            <GitHubIcon size={15} />
            View on GitHub
          </a>
          <a
            href={STORYBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              color: 'var(--color-text-body)',
              border: '1px solid var(--color-border-subtle)',
              fontFamily: 'var(--primitive-font-sans)',
              fontSize: 'var(--primitive-font-size-sm)',
              fontWeight: 'var(--primitive-font-weight-medium)',
              padding: '12px 22px',
              borderRadius: 'var(--primitive-radius-sm)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            <ExternalLink size={15} />
            Open Storybook
          </a>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1px solid var(--color-border-subtle)',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}>
          {(
            [
              { value: '56', label: 'Components' },
              { value: '5', label: 'Categories' },
              { value: '200+', label: 'Stories' },
              { value: 'Next.js 15', label: 'Framework' },
            ] as const
          ).map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '24px 20px',
                borderLeft: i > 0 ? '1px solid var(--color-border-subtle)' : 'none',
              }}
            >
              <div style={{
                fontFamily: 'var(--primitive-font-serif)',
                fontSize: 'var(--primitive-font-size-2xl)',
                fontWeight: 'var(--primitive-font-weight-medium)',
                color: 'var(--color-text-title)',
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                marginBottom: '4px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'var(--primitive-font-sans)',
                fontSize: 'var(--primitive-font-size-xs)',
                color: 'var(--color-text-muted)',
                letterSpacing: '-0.01em',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Component Browser ─────────────────────────────────────────── */}
      <section id="components" style={{
        padding: 'var(--size-section-gap) var(--size-page-gutter)',
        maxWidth: 'var(--size-max-width)',
        margin: '0 auto',
      }}>

        {/* Section header */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '28px',
        }}>
          <h2 style={{
            fontFamily: 'var(--primitive-font-serif)',
            fontSize: 'var(--primitive-font-size-2xl)',
            fontWeight: 'var(--primitive-font-weight-medium)',
            color: 'var(--color-text-title)',
            letterSpacing: '-0.02em',
            margin: 0,
          }}>
            Component library
          </h2>
          <span style={{
            fontFamily: 'var(--primitive-font-mono)',
            fontSize: 'var(--primitive-font-size-xs)',
            color: 'var(--color-text-muted)',
          }}>
            {filtered.length} component{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Category filters */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          overflowX: 'auto',
          paddingBottom: '2px',
        }}>
          {CATEGORIES.map(cat => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--primitive-font-sans)',
                  fontSize: 'var(--primitive-font-size-xs)',
                  fontWeight: active
                    ? 'var(--primitive-font-weight-medium)'
                    : 'var(--primitive-font-weight-regular)',
                  color: active
                    ? 'var(--color-interactive-primary-fg)'
                    : 'var(--color-text-muted)',
                  background: active
                    ? 'var(--color-interactive-primary-bg)'
                    : 'transparent',
                  border: active
                    ? '1px solid var(--color-interactive-primary-bg)'
                    : '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--primitive-radius-full)',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '-0.01em',
                  transition: 'all var(--primitive-duration-fast) var(--primitive-easing-default)',
                }}
              >
                {cat}
                <span style={{
                  fontFamily: 'var(--primitive-font-mono)',
                  fontSize: 'var(--primitive-font-size-2xs)',
                  opacity: 0.65,
                }}>
                  {CATEGORY_COUNTS[cat]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Storybook notice — only shown when no hosted URL is configured */}
        {STORYBOOK_IS_LOCAL && (
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '10px 14px',
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--primitive-radius-md)',
            marginBottom: '24px',
          }}>
            <span style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--color-text-muted)',
              flexShrink: 0,
              marginTop: '5px',
            }} />
            <span style={{
              fontFamily: 'var(--primitive-font-mono)',
              fontSize: 'var(--primitive-font-size-2xs)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
            }}>
              Live previews require Storybook running locally.{' '}
              Run <code style={{ background: 'var(--color-border-subtle)', padding: '1px 5px', borderRadius: '2px' }}>npm run storybook</code>,
              or set <code style={{ background: 'var(--color-border-subtle)', padding: '1px 5px', borderRadius: '2px' }}>NEXT_PUBLIC_STORYBOOK_URL</code> to your deployed instance.
            </span>
          </div>
        )}

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}>
          {filtered.map(component => (
            <ComponentCard key={component.storyId} component={component} />
          ))}
        </div>
      </section>

      {/* ── Documentation ─────────────────────────────────────────────── */}
      <section id="docs" style={{
        padding: 'var(--size-section-gap) var(--size-page-gutter)',
        maxWidth: 'var(--size-max-width)',
        margin: '0 auto',
        borderTop: '1px solid var(--color-border-subtle)',
      }}>
        <div style={{ marginBottom: '36px', maxWidth: '600px' }}>
          <h2 style={{
            fontFamily: 'var(--primitive-font-serif)',
            fontSize: 'var(--primitive-font-size-2xl)',
            fontWeight: 'var(--primitive-font-weight-medium)',
            color: 'var(--color-text-title)',
            letterSpacing: '-0.02em',
            margin: '0 0 10px',
          }}>
            Documentation
          </h2>
          <p style={{
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-sm)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
            margin: 0,
            letterSpacing: '-0.01em',
          }}>
            Every component page includes anatomy, variants, states, prop table, content guidelines, accessibility notes, design tokens, and do&apos;s and don&apos;ts.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '10px',
        }}>
          {COMPONENTS.map(component => (
            <DocCard key={component.docFile} component={component} />
          ))}
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--color-border-subtle)',
        padding: '28px var(--size-page-gutter)',
        maxWidth: 'var(--size-max-width)',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={13} style={{ color: 'var(--color-text-muted)' }} />
          <span style={{
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-xs)',
            color: 'var(--color-text-muted)',
            letterSpacing: '-0.01em',
          }}>
            Elegant Design System · Open source under MIT
          </span>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          {[
            { label: 'GitHub', href: GITHUB_URL, external: true },
            { label: 'Storybook', href: STORYBOOK_URL, external: true },
            { label: 'Back to portfolio', href: '/', external: false },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              style={{
                fontFamily: 'var(--primitive-font-sans)',
                fontSize: 'var(--primitive-font-size-xs)',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ── ComponentCard ──────────────────────────────────────────────────────
function ComponentCard({ component }: { component: ComponentDef }) {
  const [loaded, setLoaded] = useState(false);
  const iframeSrc = `${STORYBOOK_URL}/iframe.html?id=${component.storyId}&viewMode=story`;
  const storybookUrl = `${STORYBOOK_URL}/?path=/story/${component.storyId}`;

  return (
    <div
      style={{
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--primitive-radius-md)',
        overflow: 'hidden',
        background: 'var(--color-bg-main)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow var(--primitive-duration-base) var(--primitive-easing-default)',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(30,30,30,0.07)')}
      onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.boxShadow = 'none')}
    >
      {/* iframe area */}
      <div style={{
        height: '210px',
        background: 'var(--color-bg-surface)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {!loaded && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}>
            <Package size={22} style={{ color: 'var(--color-text-muted)', opacity: 0.3 }} />
            <span style={{
              fontFamily: 'var(--primitive-font-mono)',
              fontSize: 'var(--primitive-font-size-2xs)',
              color: 'var(--color-text-muted)',
              opacity: 0.6,
            }}>loading preview…</span>
          </div>
        )}
        <iframe
          src={iframeSrc}
          title={`${component.name} preview`}
          scrolling="no"
          onLoad={(e) => {
            setLoaded(true);
            try {
              const doc = (e.target as HTMLIFrameElement).contentDocument;
              if (doc?.body) doc.body.style.overflow = 'hidden';
            } catch {}
          }}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            pointerEvents: 'none',
            opacity: loaded ? 1 : 0,
            transition: 'opacity var(--primitive-duration-relaxed) var(--primitive-easing-default)',
          }}
        />
      </div>

      {/* Card body */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
          <h3 style={{
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-medium)',
            color: 'var(--color-text-title)',
            margin: 0,
            letterSpacing: '-0.01em',
          }}>
            {component.name}
          </h3>
          <span style={{
            fontFamily: 'var(--primitive-font-mono)',
            fontSize: 'var(--primitive-font-size-2xs)',
            color: 'var(--color-text-muted)',
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-subtle)',
            padding: '2px 8px',
            borderRadius: 'var(--primitive-radius-full)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            {component.category}
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--primitive-font-sans)',
          fontSize: 'var(--primitive-font-size-xs)',
          color: 'var(--color-text-muted)',
          margin: 0,
          lineHeight: 1.55,
          letterSpacing: '-0.01em',
        }}>
          {component.description}
        </p>

        <div style={{
          display: 'flex',
          gap: '14px',
          marginTop: 'auto',
          paddingTop: '10px',
          borderTop: '1px solid var(--color-border-subtle)',
        }}>
          <a
            href={storybookUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--primitive-font-sans)',
              fontSize: 'var(--primitive-font-size-xs)',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            <ExternalLink size={11} />
            Storybook
          </a>
          <a
            href={`/design-system/docs/${component.docFile.replace('.md', '')}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--primitive-font-sans)',
              fontSize: 'var(--primitive-font-size-xs)',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            <BookOpen size={11} />
            Docs
          </a>
        </div>
      </div>
    </div>
  );
}

// ── DocCard ────────────────────────────────────────────────────────────
function DocCard({ component }: { component: ComponentDef }) {
  return (
    <a
      href={`/design-system/docs/${component.docFile.replace('.md', '')}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        padding: '13px 15px',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--primitive-radius-md)',
        textDecoration: 'none',
        transition: 'border-color var(--primitive-duration-fast) var(--primitive-easing-default)',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-text-muted)')}
      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border-subtle)')}
    >
      <div>
        <div style={{
          fontFamily: 'var(--primitive-font-sans)',
          fontSize: 'var(--primitive-font-size-xs)',
          fontWeight: 'var(--primitive-font-weight-medium)',
          color: 'var(--color-text-title)',
          letterSpacing: '-0.01em',
          marginBottom: '2px',
        }}>
          {component.name}
        </div>
        <div style={{
          fontFamily: 'var(--primitive-font-mono)',
          fontSize: 'var(--primitive-font-size-2xs)',
          color: 'var(--color-text-muted)',
        }}>
          {component.category}
        </div>
      </div>
      <BookOpen size={13} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
    </a>
  );
}
