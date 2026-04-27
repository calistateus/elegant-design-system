import type { Meta, StoryObj } from '@storybook/react';
import { ElegantBottomNav } from '@/components/simple/ElegantBottomNav';

type Args = {
  count: 2 | 3 | 4;

  item1Label: string;
  item1Href: string;
  item1External: boolean;

  item2Label: string;
  item2Href: string;
  item2External: boolean;

  item3Label: string;
  item3Href: string;
  item3External: boolean;

  item4Label: string;
  item4Href: string;
  item4External: boolean;
};

const allItems = (args: Args) => [
  { label: args.item1Label, href: args.item1Href, external: args.item1External },
  { label: args.item2Label, href: args.item2Href, external: args.item2External },
  { label: args.item3Label, href: args.item3Href, external: args.item3External },
  { label: args.item4Label, href: args.item4Href, external: args.item4External },
];

const meta: Meta<Args> = {
  title: 'Simple/Navigation/ElegantBottomNav',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
    layout: 'fullscreen',
  },
  argTypes: {
    count: { control: { type: 'select' }, options: [2, 3, 4] },

    item1Label:    { name: 'label',    control: 'text',    table: { category: 'Item 1' } },
    item1Href:     { name: 'href',     control: 'text',    table: { category: 'Item 1' } },
    item1External: { name: 'external', control: 'boolean', table: { category: 'Item 1' } },

    item2Label:    { name: 'label',    control: 'text',    table: { category: 'Item 2' } },
    item2Href:     { name: 'href',     control: 'text',    table: { category: 'Item 2' } },
    item2External: { name: 'external', control: 'boolean', table: { category: 'Item 2' } },

    item3Label:    { name: 'label',    control: 'text',    table: { category: 'Item 3' } },
    item3Href:     { name: 'href',     control: 'text',    table: { category: 'Item 3' } },
    item3External: { name: 'external', control: 'boolean', table: { category: 'Item 3' } },

    item4Label:    { name: 'label',    control: 'text',    table: { category: 'Item 4' } },
    item4Href:     { name: 'href',     control: 'text',    table: { category: 'Item 4' } },
    item4External: { name: 'external', control: 'boolean', table: { category: 'Item 4' } },
  },
  render: (args) => (
    <ElegantBottomNav items={allItems(args).slice(0, args.count)} />
  ),
};

export default meta;
type Story = StoryObj<Args>;

const defaultArgs: Args = {
  count: 4,
  item1Label: 'LinkedIn', item1Href: '#', item1External: true,
  item2Label: 'Blog',     item2Href: '#', item2External: false,
  item3Label: 'GitHub',   item3Href: '#', item3External: true,
  item4Label: 'Email',    item4Href: '#', item4External: false,
};

export const Desktop: Story = {
  args: defaultArgs,
};

export const Mobile: Story = {
  args: defaultArgs,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
