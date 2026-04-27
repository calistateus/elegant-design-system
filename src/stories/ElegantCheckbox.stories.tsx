import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ElegantCheckbox } from '@/components/simple/ElegantCheckbox';
import type { CheckboxState } from '@/components/simple/ElegantCheckbox';

type Args = {
  label: string;
  description: string;
  showDescription: boolean;
  checkboxState: CheckboxState;
};

const meta: Meta<Args> = {
  title: 'Simple/Forms/ElegantCheckbox',
  render: ({ label, description, showDescription, checkboxState }) => {
    const [state, setState] = useState<CheckboxState>(checkboxState);
    return (
      <ElegantCheckbox
        label={label}
        description={showDescription ? description : false}
        checkboxState={state}
        onChange={setState}
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
    checkboxState: {
      options: ['unselected', 'selected', 'indeterminate'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    description: 'You agree to our terms of service and privacy policy.',
    showDescription: true,
    checkboxState: 'unselected',
  },
};
