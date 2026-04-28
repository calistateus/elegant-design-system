import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { ElegantSearch, type ElegantSearchProps } from '../components/simple/forms/ElegantSearch';

const SUGGESTIONS = [
  'Product design',
  'Product strategy',
  'UX research',
  'User interviews',
  'Interaction design',
  'Visual design',
  'Design systems',
  'Prototyping',
  'Accessibility',
  'Motion design',
];

function ElegantSearchDemo(args: ElegantSearchProps) {
  const [value, setValue] = useState('');
  return (
    <ElegantSearch
      {...args}
      value={value}
      onChange={setValue}
      suggestions={SUGGESTIONS}
    />
  );
}

const meta: Meta<typeof ElegantSearch> = {
  title: 'Simple/Forms/ElegantSearch',
  component: ElegantSearch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    description: { control: 'text' },
    showDescription: { control: 'boolean' },
    placeholder: { control: 'text' },
    showPlaceholder: { control: 'boolean' },
    autocomplete: { control: 'boolean' },
    // Hidden — wired in demo
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onSelect: { table: { disable: true } },
    suggestions: { table: { disable: true } },
    id: { table: { disable: true } },
  },
  args: {
    label: 'Label',
    showLabel: true,
    description: 'Supporting description text.',
    showDescription: true,
    placeholder: 'Search…',
    showPlaceholder: true,
    autocomplete: true,
  },
};

export default meta;
type Story = StoryObj<typeof ElegantSearch>;

export const ElegantSearchStory: Story = {
  name: 'ElegantSearch',
  render: (args) => <ElegantSearchDemo {...args} />,
};
