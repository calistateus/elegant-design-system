import type { Meta, StoryObj } from '@storybook/react';
import { ElegantContainer } from '../components/simple/ElegantContainer';

// ─── Placeholder child ────────────────────────────────────────────────────────

function Box({ label }: { label: string }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--size-card-radius)',
        padding: 'var(--size-card-padding)',
        color: 'var(--color-text-muted)',
        fontSize: 'var(--primitive-font-size-sm)',
        fontFamily: 'var(--primitive-font-mono)',
        minWidth: '80px',
        textAlign: 'center',
        flex: '0 0 auto',
      }}
    >
      {label}
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ElegantContainer> = {
  title: 'Simple/Layout/ElegantContainer',
  component: ElegantContainer,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'article', 'main', 'aside', 'header', 'footer', 'nav'],
    },
    maxWidth: {
      control: { type: 'select' },
      options: [undefined, 'page', 'full'],
    },
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
    center: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    // implementation props
    style: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ElegantContainer>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const VerticalStack: Story = {
  args: {
    direction: 'column',
    gap: 'card',
    paddingX: 'gutter',
    paddingY: 'card',
    align: 'stretch',
    justify: 'start',
    fullWidth: true,
  },
  render: (args) => (
    <ElegantContainer {...args}>
      <Box label="Item A" />
      <Box label="Item B" />
      <Box label="Item C" />
    </ElegantContainer>
  ),
};

export const HorizontalRow: Story = {
  args: {
    direction: 'row',
    gap: 'card',
    align: 'center',
    justify: 'start',
    paddingX: 'gutter',
    paddingY: 'card',
    fullWidth: true,
  },
  render: (args) => (
    <ElegantContainer {...args}>
      <Box label="Item A" />
      <Box label="Item B" />
      <Box label="Item C" />
    </ElegantContainer>
  ),
};

export const WrappingRow: Story = {
  args: {
    direction: 'row-wrap',
    gap: 'card',
    align: 'start',
    justify: 'start',
    paddingX: 'gutter',
    paddingY: 'card',
    fullWidth: true,
  },
  render: (args) => (
    <ElegantContainer {...args}>
      {['A', 'B', 'C', 'D', 'E', 'F'].map((l) => (
        <Box key={l} label={`Card ${l}`} />
      ))}
    </ElegantContainer>
  ),
};

export const PageSection: Story = {
  args: {
    as: 'section',
    maxWidth: 'page',
    center: true,
    direction: 'column',
    gap: 'stack',
    paddingX: 'gutter',
    paddingY: 'section',
    align: 'stretch',
    fullWidth: true,
  },
  render: (args) => (
    <ElegantContainer {...args}>
      <Box label="Hero" />
      <Box label="Content" />
      <Box label="CTA" />
    </ElegantContainer>
  ),
};
