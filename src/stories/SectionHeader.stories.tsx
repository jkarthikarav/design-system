import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from '../components/SectionHeader';

const meta = {
  title: 'Components/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [
        'with-description',
        'without-eyebrow',
        'title-only',
      ],
    },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithDescription: Story = {
  args: {
    variant: 'with-description',
    eyebrow: 'CONTENT DISCOVERY',
    title: 'Making information easier to discover',
    description:
      'A supporting description that introduces the section and gives readers context for the content below.',
  },
};

export const WithoutEyebrow: Story = {
  args: {
    variant: 'without-eyebrow',
    title: 'Selected projects',
    description:
      'A supporting description that introduces the projects featured in this section.',
  },
};

export const TitleOnly: Story = {
  args: {
    variant: 'title-only',
    title: 'More about my approach',
  },
};

export const LongContent: Story = {
  args: {
    variant: 'with-description',
    eyebrow: 'RESEARCH AND DESIGN',
    title: 'Creating clearer digital experiences for complex information',
    description:
      'This example tests longer heading and description content to make sure both columns remain readable and do not overflow.',
  },
};