import type { Meta, StoryObj } from '@storybook/react';
import { ElegantAvatarGroup } from '@/components/simple/assets/ElegantAvatarGroup';

const SAMPLE_AVATARS = [
  { src: 'https://i.pravatar.cc/150?img=1', alt: 'Alice' },
  { src: 'https://i.pravatar.cc/150?img=2', alt: 'Bob' },
  { src: 'https://i.pravatar.cc/150?img=3', alt: 'Carol' },
  { src: 'https://i.pravatar.cc/150?img=4', alt: 'Dan' },
  { src: 'https://i.pravatar.cc/150?img=5', alt: 'Eve' },
  { src: 'https://i.pravatar.cc/150?img=6', alt: 'Frank' },
];

const meta: Meta<typeof ElegantAvatarGroup> = {
  title: 'Simple/Assets/ElegantAvatarGroup',
  component: ElegantAvatarGroup,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
    layout: 'centered',
  },
  argTypes: {
    avatars: { table: { disable: true } },
    layout: {
      options: ['stacked', 'unstacked'],
      control: { type: 'radio' },
    },
    maxVisible: {
      control: { type: 'number', min: 1, max: 6 },
    },
    showOverflow: { control: 'boolean' },
    overflowCount: {
      control: { type: 'number', min: 0, max: 99 },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ElegantAvatarGroup>;

export const Default: Story = {
  args: {
    avatars: SAMPLE_AVATARS,
    maxVisible: 4,
    layout: 'stacked',
    showOverflow: true,
    size: 'md',
  },
};
