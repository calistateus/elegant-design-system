import type { Meta, StoryObj } from '@storybook/react';
import { ElegantTopNav } from '@/components/simple/navigation/ElegantTopNav';

type Args = {
  logo: string;
  count: 1 | 2 | 3 | 4 | 5;
  item1: string;
  item2: string;
  item3: string;
  item4: string;
  item5: string;
  ctaLabel: string;
  showCTA: boolean;
};

function renderNav({ logo, count, item1, item2, item3, item4, item5, ctaLabel, showCTA }: Args) {
  const allItems = [
    { label: item1, href: '#item-1' },
    { label: item2, href: '#item-2' },
    { label: item3, href: '#item-3' },
    { label: item4, href: '#item-4' },
    { label: item5, href: '#item-5' },
  ];
  return (
    <ElegantTopNav
      logo={logo}
      items={allItems.slice(0, count)}
      cta={showCTA ? { label: ctaLabel } : undefined}
    />
  );
}

const meta: Meta<Args> = {
  title: 'Simple/Navigation/ElegantTopNav',
  parameters: {
    backgrounds: { disable: true },
    layout: 'fullscreen',
  },
  argTypes: {
    logo: { control: 'text' },
    count: {
      options: [1, 2, 3, 4, 5],
      control: { type: 'select' },
    },
    item1: { control: 'text' },
    item2: { control: 'text' },
    item3: { control: 'text' },
    item4: { control: 'text' },
    item5: { control: 'text' },
    ctaLabel: { control: 'text' },
    showCTA: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    logo: 'Portfolio',
    count: 3,
    item1: 'Work',
    item2: 'About',
    item3: 'Contact',
    item4: 'Blog',
    item5: 'Press',
    ctaLabel: 'Get in touch',
    showCTA: true,
  },
  render: renderNav,
};
