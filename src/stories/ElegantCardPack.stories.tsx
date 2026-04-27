import type { Meta, StoryObj } from '@storybook/react';
import {
  Zap, ShieldCheck, Star, Globe, Lock,
  Layers, Cpu, BarChart2, Sparkles, Rocket, Code2,
  Users, Settings, Database, CloudUpload, Search, Bell,
  PenLine, Palette, Link2, LayoutGrid, Eye, Lightbulb, Wrench,
  DollarSign, Activity,
  type LucideIcon,
} from 'lucide-react';
import { ElegantCardPack, type ElegantCardPackProps } from '@/components/simple/ElegantCardPack';

// ─── Icon palette ──────────────────────────────────────────────────────────────

const iconOptions: Record<string, LucideIcon> = {
  Zap, ShieldCheck, Star, Globe, Lock,
  Layers, Cpu, BarChart2, Sparkles, Rocket, Code2,
  Users, Settings, Database, CloudUpload, Search, Bell,
  PenLine, Palette, Link2, LayoutGrid, Eye, Lightbulb, Wrench,
  DollarSign, Activity,
};

// ─── Field definitions per card type ──────────────────────────────────────────

type FieldDef = {
  key: string;
  name: string;
  controlType: 'text' | 'select' | 'file';
  options?: string[];
  condition:
    | { arg: 'cardType'; eq?: string; neq?: string }
    | { arg: 'cardType'; eq: string[] };
};

const FIELD_DEFS: FieldDef[] = [
  // Case Study
  { key: 'tags',        name: 'Tags / Eyebrow', controlType: 'text',   condition: { arg: 'cardType', eq: 'case-study' } },
  { key: 'title',       name: 'Title',          controlType: 'text',   condition: { arg: 'cardType', eq: 'case-study' } },
  // Icon (placed before description so panel order is icon → heading → description)
  { key: 'heading',     name: 'Heading',        controlType: 'text',   condition: { arg: 'cardType', eq: 'icon' } },
  // Shared description (Case Study + Icon)
  { key: 'description', name: 'Description',    controlType: 'text',   condition: { arg: 'cardType', eq: ['case-study', 'icon'] } },
  { key: 'outcome',     name: 'Outcome',        controlType: 'text',   condition: { arg: 'cardType', eq: 'case-study' } },
  // Referral
  { key: 'quote',       name: 'Quote',          controlType: 'text',   condition: { arg: 'cardType', eq: 'referral' } },
  { key: 'name',        name: 'Name',           controlType: 'text',   condition: { arg: 'cardType', eq: 'referral' } },
  { key: 'role',        name: 'Role',           controlType: 'text',   condition: { arg: 'cardType', eq: 'referral' } },
  // KPI
  { key: 'label',          name: 'Label',           controlType: 'text',   condition: { arg: 'cardType', eq: 'kpi' } },
  { key: 'value',          name: 'Value',           controlType: 'text',   condition: { arg: 'cardType', eq: 'kpi' } },
  { key: 'delta',          name: 'Delta',           controlType: 'text',   condition: { arg: 'cardType', eq: 'kpi' } },
  { key: 'deltaDirection', name: 'Delta direction', controlType: 'select', options: ['up', 'down', 'neutral'], condition: { arg: 'cardType', eq: 'kpi' } },
  { key: 'period',         name: 'Period',          controlType: 'text',   condition: { arg: 'cardType', eq: 'kpi' } },
  // Shared icon (Icon + KPI)
  { key: 'icon',        name: 'Icon',           controlType: 'select', condition: { arg: 'cardType', eq: ['icon', 'kpi'] } },
  // Shared image (Case Study + Referral)
  { key: 'image',       name: 'Image',          controlType: 'file',   condition: { arg: 'cardType', eq: ['case-study', 'referral'] } },
];

// ─── Arg types ─────────────────────────────────────────────────────────────────

type CardIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type FieldKey =
  | 'tags' | 'title' | 'description' | 'outcome'
  | 'heading' | 'icon'
  | 'quote' | 'name' | 'role'
  | 'image'
  | 'label' | 'value' | 'delta' | 'deltaDirection' | 'period';

type PerCardArgs = {
  [K in `card${CardIndex}_${FieldKey}`]: string | string[];
};

type StoryArgs = ElegantCardPackProps & PerCardArgs;

// ─── Programmatic argTypes + defaults ─────────────────────────────────────────

const SLOTS = Array.from({ length: 12 }, (_, i) => i + 1);

const perCardArgTypes = Object.fromEntries(
  SLOTS.flatMap((n) =>
    FIELD_DEFS.map(({ key, name, controlType, options, condition }) => {
      const control =
        controlType === 'select'
          ? {
              options: options ?? Object.keys(iconOptions),
              control: { type: 'select' },
            }
          : controlType === 'file'
          ? { control: { type: 'file', accept: '.png,.jpg,.jpeg,.webp,.gif,.svg' } }
          : { control: 'text' };

      return [
        `card${n}_${key}`,
        {
          name,
          ...control,
          if: condition,
          table: { category: `Card ${n}` },
        },
      ];
    }),
  ),
);

const perCardDefaults = Object.fromEntries(
  SLOTS.flatMap((n) =>
    FIELD_DEFS.map(({ key }) => {
      if (key === 'icon') return [`card${n}_${key}`, 'Sparkles'];
      if (key === 'deltaDirection') return [`card${n}_${key}`, ''];
      return [`card${n}_${key}`, ''];
    }),
  ),
);

// ─── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<StoryArgs> = {
  title: 'Simple/Cards/ElegantCardPack',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--size-page-gutter)' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    cardType: {
      control: { type: 'inline-radio' },
      options: ['case-study', 'icon', 'referral', 'kpi'],
      table: { category: 'Configuration' },
    },
    count: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      table: { category: 'Configuration' },
    },
    perRow: {
      control: { type: 'inline-radio' },
      options: [1, 2, 3, 4],
      table: { category: 'Configuration' },
    },
    fillLastRow: {
      control: 'boolean',
      table: { category: 'Configuration' },
    },
    showAvatar: {
      control: 'boolean',
      if: { arg: 'cardType', eq: 'referral' },
      table: { category: 'Configuration' },
    },
    overrides: { table: { disable: true } },
    ...perCardArgTypes,
  },
  render: (args) => {
    const overrides = SLOTS.map((n) => {
      const g = (key: string) => args[`card${n}_${key}` as keyof StoryArgs];
      const rawImage = g('image') as string[] | string | undefined;
      const image = Array.isArray(rawImage) ? rawImage[0] : rawImage;
      const iconName = g('icon') as string | undefined;
      const direction = (g('deltaDirection') as string) || undefined;
      return {
        tags:           (g('tags')        as string) || undefined,
        title:          (g('title')       as string) || undefined,
        description:    (g('description') as string) || undefined,
        outcome:        (g('outcome')     as string) || undefined,
        heading:        (g('heading')     as string) || undefined,
        icon:           iconName ? iconOptions[iconName] : undefined,
        quote:          (g('quote')       as string) || undefined,
        name:           (g('name')        as string) || undefined,
        role:           (g('role')        as string) || undefined,
        image:          image || undefined,
        label:          (g('label')       as string) || undefined,
        value:          (g('value')       as string) || undefined,
        delta:          (g('delta')       as string) || undefined,
        deltaDirection: (direction === 'up' || direction === 'down' || direction === 'neutral' ? direction : undefined) as 'neutral' | 'up' | 'down' | undefined,
        period:         (g('period')      as string) || undefined,
      };
    });

    return (
      <ElegantCardPack
        cardType={args.cardType}
        count={args.count}
        perRow={args.perRow}
        fillLastRow={args.fillLastRow}
        showAvatar={args.showAvatar}
        overrides={overrides}
      />
    );
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

// ─── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    cardType: 'icon',
    count: 4,
    perRow: 2,
    fillLastRow: false,
    showAvatar: false,
    ...perCardDefaults,
  },
};
