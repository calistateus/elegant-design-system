import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ElegantRadio } from '@/components/simple/forms/ElegantRadio';
import type { RadioState } from '@/components/simple/forms/ElegantRadio';

type Args = {
  label: string;
  description: string;
  showDescription: boolean;
  radioState: RadioState;
};

const meta: Meta<Args> = {
  title: 'Simple/Forms/ElegantRadio',
  render: ({ label, description, showDescription, radioState }) => {
    const [state, setState] = useState<RadioState>(radioState);
    return (
      <ElegantRadio
        label={label}
        description={showDescription ? description : false}
        radioState={state}
        onClick={() => setState(state === 'selected' ? 'unselected' : 'selected')}
      />
    );
  },
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    showDescription: { control: 'boolean' },
    radioState: {
      options: ['unselected', 'selected'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    label: 'Receive email notifications',
    description: "We'll send you updates about your account and activity.",
    showDescription: true,
    radioState: 'unselected',
  },
};
