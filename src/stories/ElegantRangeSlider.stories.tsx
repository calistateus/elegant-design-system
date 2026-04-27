import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ElegantRangeSlider } from '@/components/simple/ElegantRangeSlider';

type Args = {
  label: string;
  showLabel: boolean;
  description: string;
  showDescription: boolean;
  min: number;
  max: number;
  step: number;
  initialValue: number;
  disabled: boolean;
};

function SliderDemo(props: Args) {
  const [value, setValue] = useState(props.initialValue);
  return (
    <div style={{ width: 360 }}>
      <ElegantRangeSlider
        label={props.label}
        showLabel={props.showLabel}
        description={props.description}
        showDescription={props.showDescription}
        min={props.min}
        max={props.max}
        step={props.step}
        value={value}
        onChange={setValue}
        disabled={props.disabled}
      />
    </div>
  );
}

const meta: Meta<Args> = {
  title: 'Simple/Forms/ElegantRangeSlider',
  render: (args) => <SliderDemo {...args} />,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    description: { control: 'text' },
    showDescription: { control: 'boolean' },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    step: { control: { type: 'number' } },
    initialValue: { control: { type: 'number' } },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    label: 'Volume',
    showLabel: true,
    description: 'Drag the knob or type a value.',
    showDescription: true,
    min: 0,
    max: 100,
    step: 1,
    initialValue: 40,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    initialValue: 60,
    disabled: true,
  },
};

export const DecimalStep: Story = {
  args: {
    label: 'Opacity',
    showLabel: true,
    description: 'Set a value between 0 and 1.',
    showDescription: true,
    min: 0,
    max: 1,
    step: 0.1,
    initialValue: 0.5,
    disabled: false,
  },
};
