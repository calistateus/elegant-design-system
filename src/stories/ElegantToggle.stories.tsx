import type { Meta, StoryObj } from '@storybook/react';
import { ElegantToggle } from '@/components/simple/forms/ElegantToggle';

type Args = {
  label: string;
  description: string;
  showDescription: boolean;
  toggled: boolean;
};

const meta: Meta<Args> = {
  title: 'Simple/Forms/ElegantToggle',
  render: ({ label, description, showDescription, toggled }) => (
    <ElegantToggle
      label={label}
      description={showDescription ? description : false}
      toggled={toggled}
    />
  ),
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    showDescription: { control: 'boolean' },
    toggled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    description: "You'll receive alerts for important updates.",
    showDescription: true,
    toggled: false,
  },
};

export const WithoutDescription: Story = {
  args: {
    label: 'Enable notifications',
    description: "You'll receive alerts for important updates.",
    showDescription: false,
    toggled: false,
  },
};
