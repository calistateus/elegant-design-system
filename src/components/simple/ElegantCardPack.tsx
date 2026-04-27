'use client';

import { useId } from 'react';
import {
  Zap,
  Layers,
  Globe,
  ShieldCheck,
  Sparkles,
  Wrench,
  BarChart2,
  DollarSign,
  Users,
  Activity,
  type LucideIcon,
} from 'lucide-react';
import { ElegantCaseStudyCard } from './ElegantCaseStudyCard';
import { ElegantIconCard } from './ElegantIconCard';
import { ElegantReferralCard } from './ElegantReferralCard';
import { ElegantKpiCard } from './data/ElegantKpiCard';

// ─── Generic placeholder data ──────────────────────────────────────────────────

const PLACEHOLDER_CASE_STUDIES: import('./ElegantCaseStudyCard').CaseStudy[] = [
  {
    id: 'placeholder-1',
    tags: ['UX Design'],
    title: 'Redesigning the Core Onboarding Flow',
    description: 'Led a cross-functional team to redesign the onboarding experience, simplifying key steps and aligning the visual language across 30+ touchpoints.',
    outcome: '+42% completion rate improvement in post-launch tracking.',
    imagePath: '',
  },
  {
    id: 'placeholder-2',
    tags: ['Product Strategy'],
    title: 'Unifying a Fragmented Dashboard Experience',
    description: 'Audited three legacy dashboards and worked with engineering to consolidate them into a single, consistent interface with improved data hierarchy.',
    outcome: 'Reduced support tickets related to navigation by 28%.',
    imagePath: '',
  },
  {
    id: 'placeholder-3',
    tags: ['Design Systems'],
    title: 'Building a Token-Based Component Library',
    description: 'Defined the token architecture and component spec for a shared design system, enabling two product teams to ship faster with fewer inconsistencies.',
    outcome: 'Adopted by 4 teams within the first quarter of release.',
    imagePath: '',
  },
];

const PLACEHOLDER_SPECIALTIES = [
  {
    title: 'Fast by default',
    description: 'Optimised for performance at every layer — from token resolution to render time — so users never wait.',
    iconName: 'Zap',
  },
  {
    title: 'Built to scale',
    description: 'Architecture designed to grow with your team and your users, without accumulating structural debt.',
    iconName: 'Layers',
  },
  {
    title: 'Secure by design',
    description: 'Role-based access, encrypted at rest, and audited continuously so your data stays protected.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Works everywhere',
    description: 'Fully responsive across devices, viewports, and assistive technologies with no extra configuration.',
    iconName: 'Globe',
  },
];

const PLACEHOLDER_KPIS: {
  label: string;
  value: string;
  delta: string;
  deltaDirection: 'up' | 'down' | 'neutral';
  period: string;
  iconName: string;
}[] = [
  {
    label: 'Monthly Revenue',
    value: '$24,500',
    delta: '+12.3%',
    deltaDirection: 'up',
    period: 'vs last month',
    iconName: 'DollarSign',
  },
  {
    label: 'Active Users',
    value: '8,420',
    delta: '+4.1%',
    deltaDirection: 'up',
    period: 'vs last week',
    iconName: 'Users',
  },
  {
    label: 'Conversion Rate',
    value: '3.42%',
    delta: '−0.6%',
    deltaDirection: 'down',
    period: 'vs last month',
    iconName: 'Activity',
  },
  {
    label: 'Avg. Session',
    value: '4m 18s',
    delta: '0.0%',
    deltaDirection: 'neutral',
    period: 'vs last month',
    iconName: 'BarChart2',
  },
];

const PLACEHOLDER_REFERRALS = [
  {
    quote: 'Working with this team transformed how we approach product design. Every decision was intentional, every detail considered.',
    name: 'Alex Rivera',
    role: 'VP of Product, Horizon Software',
  },
  {
    quote: 'Reliable, thorough, and genuinely collaborative. The quality of output raised the bar for everyone on the project.',
    name: 'Jordan Lee',
    role: 'Engineering Lead, Vertex Labs',
  },
];

export type ElegantCardPackType = 'case-study' | 'icon' | 'referral' | 'kpi';
export type CardsPerRow = 1 | 2 | 3 | 4;

/** Per-card overrides — each field falls back to placeholder data when absent */
export interface CardOverride {
  // ── Case Study ──────────────────────────────────────────────────────────────
  /** Comma-separated tag string → split into tags array on render */
  tags?: string;
  title?: string;
  /** Shared with Icon card */
  description?: string;
  outcome?: string;
  /** imagePath for case-study; avatarPath for referral */
  image?: string;

  // ── Icon ────────────────────────────────────────────────────────────────────
  heading?: string;
  icon?: LucideIcon;

  // ── Referral ─────────────────────────────────────────────────────────────────
  quote?: string;
  name?: string;
  role?: string;

  // ── KPI ─────────────────────────────────────────────────────────────────────
  label?: string;
  value?: string;
  delta?: string;
  deltaDirection?: 'up' | 'down' | 'neutral';
  period?: string;
}

export interface ElegantCardPackProps {
  cardType: ElegantCardPackType;
  /** 1–12 */
  count: number;
  /** 1–4 */
  perRow: CardsPerRow;
  /** When true, leftover cards in the last row stretch to fill the row */
  fillLastRow?: boolean;
  /** Referral only — renders the circular avatar slot on each card */
  showAvatar?: boolean;
  /** Per-card content overrides (index 0 = card 1); falls back to placeholder data */
  overrides?: CardOverride[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Layers,
  Globe,
  ShieldCheck,
  Sparkles,
  Wrench,
  BarChart2,
  DollarSign,
  Users,
  Activity,
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function cycle<T>(source: readonly T[], count: number): T[] {
  if (source.length === 0) return [];
  return Array.from({ length: count }, (_, i) => source[i % source.length]);
}

export function ElegantCardPack({
  cardType,
  count,
  perRow,
  fillLastRow = false,
  showAvatar = false,
  overrides,
}: ElegantCardPackProps) {
  const rawId = useId();
  const uid = `cp-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;

  const safeCount = clamp(Math.floor(count), 1, 12);
  const safePerRow = clamp(Math.floor(perRow), 1, 4) as CardsPerRow;

  const leftover = safeCount % safePerRow;
  const shouldFill = fillLastRow && leftover !== 0;

  const desktopCols = shouldFill ? safePerRow * leftover : safePerRow;
  const fullRowSpan = shouldFill ? leftover : 1;
  const lastRowSpan = shouldFill ? safePerRow : 1;
  const fullRowCount = safeCount - leftover;

  const tabletCols = Math.min(2, safePerRow);

  return (
    <>
      <style>{`
        .${uid} {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: var(--size-card-gap);
          width: 100%;
        }
        .${uid} > * {
          display: flex;
          grid-column: span 1;
        }
        @media (min-width: 768px) {
          .${uid} {
            grid-template-columns: repeat(${tabletCols}, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .${uid} {
            grid-template-columns: repeat(${desktopCols}, minmax(0, 1fr));
          }
          .${uid} > * {
            grid-column: span ${fullRowSpan};
          }
          .${uid} > *:nth-child(n+${fullRowCount + 1}) {
            grid-column: span ${lastRowSpan};
          }
        }
      `}</style>
      <div className={uid}>
        {renderCards(cardType, safeCount, showAvatar, overrides).map((node, index) => (
          <div key={index}>{node}</div>
        ))}
      </div>
    </>
  );
}

function renderCards(
  cardType: ElegantCardPackType,
  count: number,
  showAvatar: boolean,
  overrides?: CardOverride[],
): React.ReactNode[] {
  switch (cardType) {
    case 'case-study': {
      const items = cycle(PLACEHOLDER_CASE_STUDIES, count);
      return items.map((item, i) => {
        const ov = overrides?.[i];
        return (
          <ElegantCaseStudyCard
            key={`${item.id}-${i}`}
            data={{
              ...item,
              ...(ov?.tags ? { tags: ov.tags.split(',').map((t) => t.trim()).filter(Boolean) } : {}),
              ...(ov?.title ? { title: ov.title } : {}),
              ...(ov?.description ? { description: ov.description } : {}),
              ...(ov?.outcome ? { outcome: ov.outcome } : {}),
              ...(ov?.image ? { imagePath: ov.image } : {}),
            }}
          />
        );
      });
    }
    case 'icon': {
      const items = cycle(PLACEHOLDER_SPECIALTIES, count);
      return items.map((item, i) => {
        const ov = overrides?.[i];
        const Icon = ov?.icon ?? ICON_MAP[item.iconName] ?? Sparkles;
        return (
          <ElegantIconCard
            key={`${item.title}-${i}`}
            icon={Icon}
            heading={ov?.heading ?? item.title}
            description={ov?.description ?? item.description}
          />
        );
      });
    }
    case 'referral': {
      const items = cycle(PLACEHOLDER_REFERRALS, count);
      return items.map((item, i) => {
        const ov = overrides?.[i];
        return (
          <ElegantReferralCard
            key={`${item.name}-${i}`}
            quote={ov?.quote ?? item.quote}
            name={ov?.name ?? item.name}
            title={ov?.role ?? item.role}
            showAvatar={showAvatar}
            avatarPath={ov?.image}
          />
        );
      });
    }
    case 'kpi': {
      const items = cycle(PLACEHOLDER_KPIS, count);
      return items.map((item, i) => {
        const ov = overrides?.[i];
        const Icon = ov?.icon ?? ICON_MAP[item.iconName];
        return (
          <ElegantKpiCard
            key={`${item.label}-${i}`}
            label={ov?.label ?? item.label}
            value={ov?.value ?? item.value}
            delta={ov?.delta ?? item.delta}
            deltaDirection={ov?.deltaDirection ?? item.deltaDirection}
            period={ov?.period ?? item.period}
            icon={Icon}
          />
        );
      });
    }
  }
}
