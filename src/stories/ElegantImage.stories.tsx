import type { Meta, StoryObj } from '@storybook/react';
import { ElegantImage } from '../components/simple/assets/ElegantImage';

// ─── Flat args type ───────────────────────────────────────────

type Args = {
  src: string | string[];
  alt: string;
  size: 'sm' | 'md' | 'lg' | 'full';
  ratio: 'auto' | '1/1' | '4/3' | '3/2' | '16/9' | '21/9';
  caption: string;
  showCaption: boolean;
};

// ─── Meta ─────────────────────────────────────────────────────

const meta: Meta<Args> = {
  title: 'Simple/Assets/ElegantImage',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
    layout: 'padded',
  },
  render: ({ src, alt, size, ratio, caption, showCaption }) => {
    const resolved = Array.isArray(src) ? src[0] : src;
    return (
      <ElegantImage
        src={resolved ?? ''}
        alt={alt}
        size={size}
        ratio={ratio}
        caption={showCaption ? caption : undefined}
      />
    );
  },
  argTypes: {
    src: {
      control: { type: 'file', accept: '.png,.jpg,.jpeg,.webp,.gif,.svg' },
    },
    alt: { control: 'text' },
    size: {
      options: ['sm', 'md', 'lg', 'full'] satisfies Args['size'][],
      control: { type: 'select' },
    },
    ratio: {
      options: ['auto', '1/1', '4/3', '3/2', '16/9', '21/9'] satisfies Args['ratio'][],
      control: { type: 'select' },
    },
    caption: { control: 'text' },
    showCaption: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<Args>;

// ─── Stories ──────────────────────────────────────────────────

const DUMMY_SRC = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop';

export const Default: Story = {
  args: {
    src: DUMMY_SRC,
    alt: 'A descriptive alt text',
    size: "sm",
    ratio: "1/1",
    caption: 'An optional caption describing the image.',
    showCaption: true,
  },
};
