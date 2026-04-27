import type { Meta, StoryObj } from '@storybook/react';
import { ElegantReferralCard } from '@/components/simple/ElegantReferralCard';

const meta: Meta<typeof ElegantReferralCard> = {
  title: 'Simple/Cards/ElegantReferralCard',
  component: ElegantReferralCard,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    quote: { control: 'text' },
    name: { control: 'text' },
    title: { control: 'text' },
    showAvatar: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ElegantReferralCard>;

export const Default: Story = {
  args: {
    quote: 'Working with this team transformed how we approach product design. Every decision was intentional, every detail considered.',
    name: 'Alex Rivera',
    title: 'VP of Product, Horizon Software',
    showAvatar: false,
  },
};
