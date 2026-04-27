import type { Meta, StoryObj } from '@storybook/react';
import {
  Zap, ShieldCheck, Star, ArrowRight, Globe, Lock,
  Layers, Cpu, BarChart2, Sparkles, Rocket, Code2,
  Users, Settings, Database, CloudUpload, Search, Bell,
  PenLine, Palette, Link2, LayoutGrid, Eye, Lightbulb,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ElegantKpiCard } from '@/components/simple/data/ElegantKpiCard';

const iconOptions: Record<string, LucideIcon> = {
  Zap, ShieldCheck, Star, ArrowRight, Globe, Lock,
  Layers, Cpu, BarChart2, Sparkles, Rocket, Code2,
  Users, Settings, Database, CloudUpload, Search, Bell,
  PenLine, Palette, Link2, LayoutGrid, Eye, Lightbulb,
};

type Args = {
  label: string;
  value: string;
  delta: string;
  deltaDirection: 'up' | 'down' | 'neutral';
  period: string;
  showIcon: boolean;
  icon: LucideIcon;
};

const meta: Meta<Args> = {
  title: 'Simple/Data/ElegantKpiCard',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  render: ({ label, value, delta, deltaDirection, period, showIcon, icon }) => (
    <div style={{ maxWidth: 280 }}>
      <ElegantKpiCard
        label={label}
        value={value}
        delta={delta || undefined}
        deltaDirection={deltaDirection}
        period={period || undefined}
        icon={showIcon ? icon : undefined}
      />
    </div>
  ),
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    delta: { control: 'text' },
    deltaDirection: {
      options: ['up', 'down', 'neutral'],
      control: { type: 'select' },
    },
    period: { control: 'text' },
    showIcon: { control: 'boolean' },
    icon: {
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      control: { type: 'select' },
      if: { arg: 'showIcon', truthy: true },
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const KpiCard: Story = {
  args: {
    label: 'Monthly Revenue',
    value: '$24,500',
    delta: '+12.3%',
    deltaDirection: 'up',
    period: 'vs last month',
    showIcon: true,
    icon: BarChart2,
  },
};
