import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { ElegantDateTimePicker, type ElegantDateTimePickerProps } from '../components/simple/ElegantDateTimePicker';

function Demo(args: ElegantDateTimePickerProps) {
  const [value, setValue] = useState<Date | null>(null);
  return <ElegantDateTimePicker {...args} value={value} onChange={setValue} />;
}

const meta: Meta<typeof ElegantDateTimePicker> = {
  title: 'Simple/Forms/ElegantDateTimePicker',
  component: ElegantDateTimePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, paddingBottom: 360 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    // Text controls
    label:       { control: 'text' },
    description: { control: 'text' },
    error:       { control: 'text' },
    placeholder: { control: 'text' },
    // Boolean controls
    showLabel:       { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showError:       { control: 'boolean' },
    disabled:        { control: 'boolean' },
    // Hidden — Date objects aren't serializable as Storybook args
    value:    { table: { disable: true } },
    onChange: { table: { disable: true } },
    minDate:  { table: { disable: true } },
    maxDate:  { table: { disable: true } },
  },
  args: {
    label:           'Date',
    showLabel:       true,
    description:     'Select a date.',
    showDescription: true,
    placeholder:     'Pick a date…',
    error:           'Please select a valid date.',
    showError:       false,
    disabled:        false,
  },
};

export default meta;
type Story = StoryObj<typeof ElegantDateTimePicker>;

export const ElegantDateTimePickerStory: Story = {
  name: 'ElegantDateTimePicker',
  render: (args) => <Demo {...args} />,
};
