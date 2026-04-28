import type { Meta, StoryObj } from '@storybook/react';
import {
  Zap, ShieldCheck, Star, ArrowRight, Globe, Lock,
  Layers, Cpu, BarChart2, Sparkles, Rocket, Code2,
  Users, Settings, Database, CloudUpload, Search, Bell,
  PenLine, Palette, Link2, LayoutGrid, Eye, Lightbulb,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ElegantIconCard } from '@/components/simple/cards/ElegantIconCard';

const iconOptions: Record<string, LucideIcon> = {
  Zap, ShieldCheck, Star, ArrowRight, Globe, Lock,
  Layers, Cpu, BarChart2, Sparkles, Rocket, Code2,
  Users, Settings, Database, CloudUpload, Search, Bell,
  PenLine, Palette, Link2, LayoutGrid, Eye, Lightbulb,
};

const meta: Meta<typeof ElegantIconCard> = {
  title: 'Simple/Cards/ElegantIconCard',
  component: ElegantIconCard,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    icon: {
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      control: { type: 'select' },
    },
    heading: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ElegantIconCard>;

export const Default: Story = {
  args: {
    icon: Zap,
    heading: 'Fast by default',
    description: 'Optimised for performance at every layer of the stack.',
  },
};
