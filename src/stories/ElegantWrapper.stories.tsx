import type { Meta, StoryObj } from '@storybook/react';
import { ElegantWrapper } from '../components/simple/layout/ElegantWrapper';

const meta: Meta<typeof ElegantWrapper> = {
  title: 'Simple/Layout/ElegantWrapper',
  component: ElegantWrapper,
  tags: ['autodocs'],
  parameters: { backgrounds: { disable: true } },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'article', 'main', 'aside', 'header', 'footer', 'nav'],
    },
    surface: {
      control: { type: 'select' },
      options: ['none', 'surface', 'card'],
    },
    maxWidth: {
      control: { type: 'select' },
      options: [undefined, 'page', 'full'],
    },
    center: { control: 'boolean' },
    paddingX: {
      control: { type: 'select' },
      options: ['none', 'gutter', 'card'],
    },
    paddingY: {
      control: { type: 'select' },
      options: ['none', 'gutter', 'card', 'stack', 'section'],
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'tag', 'card', 'stack', 'section'],
    },
    direction: {
      control: { type: 'select' },
      options: ['column', 'row', 'row-wrap'],
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'between', 'around'],
    },
    fullWidth: { control: 'boolean' },
    style: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ElegantWrapper>;

const Placeholder = ({ label }: { label: string }) => (
  <div
    style={{
      padding: '1rem',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--size-card-radius)',
      fontSize: 'var(--primitive-font-size-sm)',
      color: 'var(--color-text-muted)',
      textAlign: 'center',
    }}
  >
    {label}
  </div>
);

export const SurfaceNone: Story = {
  args: {
    surface: 'none',
    paddingX: 'card',
    paddingY: 'card',
    gap: 'card',
    direction: 'column',
  },
  render: (args) => (
    <ElegantWrapper {...args}>
      <Placeholder label="Child A" />
      <Placeholder label="Child B" />
      <Placeholder label="Child C" />
    </ElegantWrapper>
  ),
};

export const SurfaceCard: Story = {
  args: {
    surface: 'card',
    paddingX: 'card',
    paddingY: 'card',
    gap: 'card',
    direction: 'column',
  },
  render: (args) => (
    <ElegantWrapper {...args}>
      <Placeholder label="Child A" />
      <Placeholder label="Child B" />
    </ElegantWrapper>
  ),
};

export const RowLayout: Story = {
  args: {
    surface: 'none',
    gap: 'card',
    direction: 'row',
    align: 'center',
  },
  render: (args) => (
    <ElegantWrapper {...args}>
      <Placeholder label="Left" />
      <Placeholder label="Middle" />
      <Placeholder label="Right" />
    </ElegantWrapper>
  ),
};

export const PageMaxWidth: Story = {
  args: {
    surface: 'none',
    maxWidth: 'page',
    center: true,
    paddingX: 'gutter',
    paddingY: 'gutter',
    gap: 'stack',
    direction: 'column',
  },
  render: (args) => (
    <ElegantWrapper {...args}>
      <Placeholder label="Section content" />
      <Placeholder label="Section content" />
    </ElegantWrapper>
  ),
};
