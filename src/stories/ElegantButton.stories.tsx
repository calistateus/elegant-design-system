import type { Meta, StoryObj } from '@storybook/react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Send,
} from 'lucide-react';
import { ElegantButton } from '../components/simple/ElegantButton';

const iconOptions = {
  none: undefined,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Send,
} as const;

const meta: Meta<typeof ElegantButton> = {
  title: 'Simple/Forms/ElegantButton',
  component: ElegantButton,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    style: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    context: {
      control: { type: 'select' },
      options: ['default', 'menu'],
    },
    icon: {
      control: { type: 'select' },
      options: Object.keys(iconOptions),
      mapping: iconOptions,
    },
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  parameters: {
    backgrounds: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof ElegantButton>;

export const Button: Story = {
  args: {
    text: 'Get started',
    style: 'primary',
    icon: ArrowRight,
    context: 'default',
  },
};
