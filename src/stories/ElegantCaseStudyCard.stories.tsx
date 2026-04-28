import type { Meta, StoryObj } from '@storybook/react';
import { ElegantCaseStudyCard } from '../components/simple/cards/ElegantCaseStudyCard';
import colorTokens from '../../.claude/specs/tokens/ElegantColorTokens.json';
import typography from '../../.claude/specs/tokens/ElegantTypographyTokens.json';
import sizing from '../../.claude/specs/tokens/ElegantSizingTokens.json';

type Args = {
  tag: string;
  title: string;
  description: string;
  outcome: string;
  imagePath: string | string[];
};

const meta: Meta<Args> = {
  title: 'Simple/Cards/ElegantCaseStudyCard',
  tags: ['autodocs'],
  render: ({ tag, title, description, outcome, imagePath }) => {
    const src = Array.isArray(imagePath) ? imagePath[0] : imagePath;
    return (
      <ElegantCaseStudyCard
        data={{
          id: 'template',
          tags: [tag],
          title,
          description,
          outcome,
          imagePath: src ?? '',
        }}
      />
    );
  },
  argTypes: {
    tag: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    outcome: { control: 'text' },
    imagePath: {
      control: { type: 'file', accept: '.png,.jpg,.jpeg,.webp,.gif,.svg' },
    },
  },
  parameters: {
    backgrounds: { disable: true },
    tokens: {
      colors: colorTokens,
      typography,
      sizing,
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    tag: 'Product Design',
    title: 'Redesigning the Core User Onboarding Flow',
    description:
      'Led a cross-functional team to redesign the onboarding experience, simplifying key steps and aligning the visual language across 30+ touchpoints.',
    outcome: '+42% completion rate improvement in post-launch tracking.',
    imagePath: '',
  },
};
