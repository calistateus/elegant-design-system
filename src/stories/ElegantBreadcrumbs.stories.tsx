import type { Meta, StoryObj } from '@storybook/react';
import { ElegantBreadcrumbs } from '../components/simple/ElegantBreadcrumbs';

type StoryArgs = {
  count: 2 | 3 | 4 | 5;
  separator: string;
  item1Label: string;
  item1Href: string;
  item2Label: string;
  item2Href: string;
  item3Label: string;
  item3Href: string;
  item4Label: string;
  item4Href: string;
  item5Label: string;
  item5Href: string;
};

const meta: Meta<StoryArgs> = {
  title: 'Simple/Navigation/ElegantBreadcrumbs',
  tags: ['autodocs'],
  argTypes: {
    count:     { control: { type: 'select' }, options: [2, 3, 4, 5] },
    separator: { control: 'text' },
    item1Label: { name: 'label', control: 'text', table: { category: 'Item 1' } },
    item1Href:  { name: 'href',  control: 'text', table: { category: 'Item 1' } },
    item2Label: { name: 'label', control: 'text', table: { category: 'Item 2' } },
    item2Href:  { name: 'href',  control: 'text', table: { category: 'Item 2' } },
    item3Label: { name: 'label', control: 'text', table: { category: 'Item 3' } },
    item3Href:  { name: 'href',  control: 'text', table: { category: 'Item 3' } },
    item4Label: { name: 'label', control: 'text', table: { category: 'Item 4' } },
    item4Href:  { name: 'href',  control: 'text', table: { category: 'Item 4' } },
    item5Label: { name: 'label', control: 'text', table: { category: 'Item 5' } },
    item5Href:  { name: 'href',  control: 'text', table: { category: 'Item 5' } },
  },
  parameters: {
    backgrounds: { disable: true },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Breadcrumbs: Story = {
  args: {
    count: 3,
    separator: '/',
    item1Label: 'Home',
    item1Href: '/',
    item2Label: 'Work',
    item2Href: '/work',
    item3Label: 'Case Study',
    item3Href: '/work/case-study',
    item4Label: 'Details',
    item4Href: '/work/case-study/details',
    item5Label: 'Section',
    item5Href: '/work/case-study/details/section',
  },
  render: (args) => (
    <ElegantBreadcrumbs
      count={args.count}
      separator={args.separator}
      items={[
        { label: args.item1Label, href: args.item1Href },
        { label: args.item2Label, href: args.item2Href },
        { label: args.item3Label, href: args.item3Href },
        { label: args.item4Label, href: args.item4Href },
        { label: args.item5Label, href: args.item5Href },
      ]}
    />
  ),
};
