import type { Meta, StoryObj } from '@storybook/react';
import { ElegantLinearProgress } from '@/components/simple/feedback/ElegantLinearProgress';

type Args = {
  steps: number;
  currentStep: number;
  showStepCount: boolean;
  heading: string;
  showHeading: boolean;
  placement: 'top' | 'bottom' | 'vertical';
  showButton: boolean;
  buttonLabel: string;
};

const meta: Meta<Args> = {
  title: 'Simple/Feedback/ElegantLinearProgress',
  render: ({ heading, showHeading, ...rest }) => (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <ElegantLinearProgress
        heading={showHeading ? heading : undefined}
        {...rest}
      />
    </div>
  ),
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    steps: { control: { type: 'number', min: 1, max: 20 } },
    currentStep: { control: { type: 'number', min: 0, max: 20 } },
    showStepCount: { control: 'boolean' },
    heading: { control: 'text' },
    showHeading: { control: 'boolean' },
    placement: {
      options: ['top', 'bottom', 'vertical'],
      control: { type: 'select' },
    },
    showButton: { control: 'boolean' },
    buttonLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const LabelTop: Story = {
  args: {
    steps: 5,
    currentStep: 3,
    showStepCount: true,
    heading: 'Select transportation',
    showHeading: true,
    placement: 'top',
    showButton: false,
    buttonLabel: 'Next',
  },
};

export const LabelBottom: Story = {
  args: {
    steps: 5,
    currentStep: 3,
    showStepCount: true,
    heading: 'Select transportation',
    showHeading: true,
    placement: 'bottom',
    showButton: true,
    buttonLabel: 'Next',
  },
};

export const Vertical: Story = {
  args: {
    steps: 5,
    currentStep: 2,
    showStepCount: true,
    heading: 'Select transportation',
    showHeading: true,
    placement: 'vertical',
    showButton: false,
    buttonLabel: 'Next',
  },
};
