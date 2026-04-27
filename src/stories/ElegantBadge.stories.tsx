import type { Meta, StoryObj } from '@storybook/react';
import {
  ArrowLeftRight, Zap, ShieldCheck, Star, Globe, Lock,
  Layers, Cpu, BarChart2, Sparkles, Rocket, Code2,
  Users, Settings, Database, CloudUpload, Search, Bell,
  PenLine, Palette, Link2, LayoutGrid, Eye, Lightbulb,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ElegantBadge } from '@/components/simple/ElegantBadge';

const iconOptions: Record<string, LucideIcon | undefined> = {
  none: undefined,
  ArrowLeftRight,
  Zap, ShieldCheck, Star, Globe, Lock,
  Layers, Cpu, BarChart2, Sparkles, Rocket, Code2,
  Users, Settings, Database, CloudUpload, Search, Bell,
  PenLine, Palette, Link2, LayoutGrid, Eye, Lightbulb,
};

type Args = {
  label: string;
  showIcon: boolean;
  icon: LucideIcon | undefined;
  color: 'neutral' | 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'white' | 'black';
};

const meta: Meta<Args> = {
  title: 'Simple/ElegantBadge',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  render: ({ label, showIcon, icon, color }) => (
    <ElegantBadge label={label} icon={showIcon ? icon : undefined} color={color} />
  ),
  argTypes: {
    label: { control: 'text' },
    showIcon: { control: 'boolean' },
    icon: {
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      control: { type: 'select' },
    },
    color: {
      options: ['neutral', 'red', 'green', 'blue', 'yellow', 'purple', 'white', 'black'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Badge: Story = {
  args: {
    label: 'Badge',
    showIcon: true,
    icon: ArrowLeftRight,
    color: 'neutral',
  },
};
