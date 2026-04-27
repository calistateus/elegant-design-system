import type { Meta, StoryObj } from '@storybook/react';
import { ElegantAvatar } from '@/components/simple/ElegantAvatar';

const meta: Meta<typeof ElegantAvatar> = {
  title: 'Simple/Assets/ElegantAvatar',
  component: ElegantAvatar,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
    layout: 'centered',
  },
  argTypes: {
    src: {
      control: { type: 'file', accept: '.png,.jpg,.jpeg,.webp,.gif' },
    },
    alt: { control: 'text' },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ElegantAvatar>;

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'Alice',
    size: 'md',
  },
};
