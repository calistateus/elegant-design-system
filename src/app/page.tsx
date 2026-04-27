'use client';

import { Layers, Wrench, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';
import { HOMEPAGE_CONTENT } from '@/data/content';
import { ElegantTopNav } from '@/components/simple/ElegantTopNav';
import { ElegantBottomNav } from '@/components/simple/ElegantBottomNav';
import { ElegantBadge } from '@/components/simple/ElegantBadge';
import { ElegantCardPack } from '@/components/simple/ElegantCardPack';
import { ElegantButton } from '@/components/simple/ElegantButton';
import { ElegantImage } from '@/components/simple/ElegantImage';

const ICON_MAP: Record<string, LucideIcon> = { Layers, Wrench, ShieldCheck, Sparkles };

export default function ElegantHomepage() {
  const { hero, caseStudies, specialties, referrals, playground, navigation } = HOMEPAGE_CONTENT;

  const topNavItems = navigation.top.map((label) => ({
    label,
    href: `#${label.toLowerCase()}`,
  }));

  const bottomNavItems = navigation.bottom.map((label) => ({
    label,
    href: `#${label.toLowerCase()}`,
    external: false,
  }));

  return (
    <main
      style={{
        backgroundColor: 'var(--color-bg-main)',
        paddingBottom: 'var(--size-section-gap)',
      }}
    >
      {/* ── Top Nav ── */}
      <ElegantTopNav items={topNavItems} />

      <div
        style={{
          maxWidth: 'var(--size-max-width)',
          margin: '0 auto',
          paddingLeft: 'var(--size-page-gutter)',
          paddingRight: 'var(--size-page-gutter)',
        }}
      >
        {/* ── Hero ── */}
        <section
          style={{
            paddingTop: 'var(--size-section-gap)',
            marginBottom: 'var(--size-section-gap)',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--primitive-font-serif)',
              fontSize: 'var(--primitive-font-size-4xl)',
              fontWeight: 'var(--primitive-font-weight-regular)',
              color: 'var(--color-text-title)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: 'var(--size-heading-to-body)',
            }}
          >
            {hero.headline}
          </h1>
          <p
            style={{
              fontFamily: 'var(--primitive-font-sans)',
              fontSize: 'var(--primitive-font-size-base)',
              fontWeight: 'var(--primitive-font-weight-regular)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
              marginBottom: 'var(--size-body-to-body)',
            }}
          >
            {hero.subheading}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--size-tag-gap)',
            }}
          >
            {hero.tags.map((tag) => (
              <ElegantBadge key={tag} label={tag} />
            ))}
          </div>
          <div style={{ marginTop: 'var(--size-heading-to-body)' }}>
            <ElegantImage
              src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop"
              alt="Dummy placeholder image"
              size="lg"
              ratio="16/9"
              caption="Placeholder image — replace with real asset"
            />
          </div>
        </section>

        {/* ── Case Studies ── */}
        <section style={{ marginBottom: 'var(--size-section-gap)' }}>
          <ElegantCardPack
            cardType="case-study"
            count={3}
            perRow={3}
            overrides={caseStudies.map((cs) => ({
              title: cs.title,
              tags: cs.tags.join(', '),
              description: cs.description,
              outcome: cs.outcome,
              image: cs.imagePath,
            }))}
          />
        </section>

        {/* ── Specialties ── */}
        <section style={{ marginBottom: 'var(--size-section-gap)' }}>
          <h2
            style={{
              fontFamily: 'var(--primitive-font-serif)',
              fontSize: 'var(--primitive-font-size-2xl)',
              fontWeight: 'var(--primitive-font-weight-regular)',
              color: 'var(--color-text-title)',
              letterSpacing: '-0.02em',
              marginBottom: 'var(--size-heading-to-body)',
            }}
          >
            {specialties.headline}
          </h2>
          <ElegantCardPack
            cardType="icon"
            count={4}
            perRow={2}
            overrides={specialties.items.map((item) => ({
              heading: item.title,
              description: item.description,
              icon: ICON_MAP[item.iconName],
            }))}
          />
        </section>

        {/* ── Referrals ── */}
        <section style={{ marginBottom: 'var(--size-section-gap)' }}>
          <h2
            style={{
              fontFamily: 'var(--primitive-font-serif)',
              fontSize: 'var(--primitive-font-size-2xl)',
              fontWeight: 'var(--primitive-font-weight-regular)',
              color: 'var(--color-text-title)',
              letterSpacing: '-0.02em',
              marginBottom: 'var(--size-heading-to-body)',
            }}
          >
            {referrals.headline}
          </h2>
          <ElegantCardPack
            cardType="referral"
            count={2}
            perRow={2}
            overrides={referrals.items.map((item) => ({
              quote: item.quote,
              name: item.name,
              role: item.role,
            }))}
          />
        </section>

        {/* ── Playground ── */}
        <section style={{ marginBottom: 'var(--size-section-gap)' }}>
          <h2
            style={{
              fontFamily: 'var(--primitive-font-serif)',
              fontSize: 'var(--primitive-font-size-2xl)',
              fontWeight: 'var(--primitive-font-weight-regular)',
              color: 'var(--color-text-title)',
              letterSpacing: '-0.02em',
              marginBottom: 'var(--size-heading-to-sub)',
            }}
          >
            {playground.headline}
          </h2>
          <p
            style={{
              fontFamily: 'var(--primitive-font-sans)',
              fontSize: 'var(--primitive-font-size-base)',
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--size-heading-to-body)',
            }}
          >
            {playground.subheading}
          </p>
          <ul
            className="pl-4"
            style={{
              listStyle: 'disc',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--size-body-to-body)',
              marginBottom: 'var(--size-body-to-button)',
            }}
          >
            {playground.links.map((link) => (
              <li
                key={link}
                style={{
                  fontFamily: 'var(--primitive-font-sans)',
                  fontSize: 'var(--primitive-font-size-base)',
                  color: 'var(--color-text-body)',
                }}
              >
                {link}
              </li>
            ))}
          </ul>
          <ElegantButton text={playground.buttonText} style="primary" />
        </section>
      </div>

      {/* ── Bottom Nav ── */}
      <ElegantBottomNav items={bottomNavItems} />
    </main>
  );
}
