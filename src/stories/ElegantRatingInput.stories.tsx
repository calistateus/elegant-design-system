import type { Meta, StoryObj } from '@storybook/react';
import { ElegantRatingInput } from '@/components/simple/forms/ElegantRatingInput';

type Args = {
  variant: 'thumbs' | 'stars' | 'heart';
  label: string;
  description: string;
  showDescription: boolean;
  disabled: boolean;
};

const meta: Meta<Args> = {
  title: 'Simple/Forms/ElegantRatingInput',
  render: ({ variant, label, description, showDescription, disabled }) => {
    if (variant === 'stars') {
      return (
        <ElegantRatingInput
          variant="stars"
          label={label}
          description={description}
          showDescription={showDescription}
          disabled={disabled}
          count={5}
        />
      );
    }
    if (variant === 'thumbs') {
      return (
        <ElegantRatingInput
          variant="thumbs"
          label={label}
          description={description}
          showDescription={showDescription}
          disabled={disabled}
        />
      );
    }
    return (
      <ElegantRatingInput
        variant="heart"
        label={label}
        description={description}
        showDescription={showDescription}
        disabled={disabled}
      />
    );
  },
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    variant: { table: { disable: true } },
    label: { control: 'text' },
    description: { control: 'text' },
    showDescription: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Thumbs: Story = {
  args: {
    variant: 'thumbs',
    label: 'Was this helpful?',
    description: 'Your feedback helps us improve.',
    showDescription: false,
    disabled: false,
  },
};

export const Stars: Story = {
  args: {
    variant: 'stars',
    label: 'Rate your experience',
    description: 'Tap a star to rate.',
    showDescription: false,
    disabled: false,
  },
};

export const Heart: Story = {
  args: {
    variant: 'heart',
    label: 'Like this?',
    description: 'Save it to your favorites.',
    showDescription: false,
    disabled: false,
  },
};
