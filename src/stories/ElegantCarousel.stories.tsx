import type { Meta, StoryObj } from '@storybook/react';
import { ElegantCarousel, type ElegantCarouselProps } from '@/components/simple/ElegantCarousel';

const meta: Meta<ElegantCarouselProps> = {
  title: 'Simple/Assets/ElegantCarousel',
  component: ElegantCarousel,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--size-page-gutter)', maxWidth: '860px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    cardType: {
      control: { type: 'inline-radio' },
      options: ['case-study', 'icon', 'referral', 'image'],
    },
    count: {
      control: { type: 'range', min: 2, max: 8, step: 1 },
    },
    slidesVisible: {
      control: { type: 'inline-radio' },
      options: [1, 2, 3, 4],
    },
    autoSlide: { control: 'boolean' },
    autoSlideInterval: {
      control: { type: 'range', min: 1000, max: 8000, step: 500 },
      if: { arg: 'autoSlide', eq: true },
    },
    imageSize: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Display size of the image',
      if: { arg: 'cardType', eq: 'image' },
    },
    imageRatio: {
      control: { type: 'inline-radio' },
      options: ['1/1', '4/3', '3/2', '16/9', '21/9'],
      description: 'Aspect ratio applied to all image slides',
      if: { arg: 'cardType', eq: 'image' },
    },
    imageAlt: {
      control: 'text',
      description: 'Alt text for all image slides',
      if: { arg: 'cardType', eq: 'image' },
    },
    imageCaption: {
      control: 'text',
      description: 'Caption shown below all image slides',
      if: { arg: 'cardType', eq: 'image' },
    },
  },
};

export default meta;
type Story = StoryObj<ElegantCarouselProps>;

export const CaseStudyCards: Story = {
  args: {
    cardType: 'case-study',
    count: 3,
    slidesVisible: 1,
    autoSlide: false,
    autoSlideInterval: 4000,
  },
};

export const IconCards: Story = {
  args: {
    cardType: 'icon',
    count: 4,
    slidesVisible: 2,
    autoSlide: false,
    autoSlideInterval: 4000,
  },
};

export const ReferralCards: Story = {
  args: {
    cardType: 'referral',
    count: 3,
    slidesVisible: 1,
    autoSlide: false,
    autoSlideInterval: 4000,
  },
};

export const Images: Story = {
  args: {
    cardType: 'image',
    count: 3,
    slidesVisible: 1,
    autoSlide: false,
    autoSlideInterval: 4000,
    imageSize: 'full',
    imageRatio: '16/9',
    imageAlt: '',
    imageCaption: '',
  },
};

export const AutoSlide: Story = {
  args: {
    cardType: 'case-study',
    count: 3,
    slidesVisible: 1,
    autoSlide: true,
    autoSlideInterval: 3000,
  },
};
