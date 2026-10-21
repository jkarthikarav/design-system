import type { Meta, StoryObj } from '@storybook/react-vite';
import { CaseStudyCard } from '../components/CaseStudyCard';

const meta = {
  title: 'Components/CaseStudyCard',
  component: CaseStudyCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onExplore: {
      action: 'explore clicked',
    },
    buttonLabel: {
      control: 'text',
    },
  },
} satisfies Meta<typeof CaseStudyCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    eyebrow: 'Content Discovery / Digital Experience',
    title: 'Making a Research Facility Easier to Discover and Access',
    description:
      'I integrated Toronto Nanofabrication Centre (TNFC) into ECE at U of T’s public-facing website, aligning its branding, navigation, and content with the department’s ecosystem.',
    highlights: [
      {
        heading: 'Improved Information Discovery',
        description:
          'Surfaced TNFC’s facilities on the homepage, making them easier to identify and navigate.',
      },
      {
        heading: 'Clearer Content Structure',
        description:
          'Organized information so visitors could find facility details and resources more easily.',
      },
      {
        heading: 'Consistent Digital Experience',
        description:
          'Aligned the facility’s content and presentation with the wider department website.',
      },
    ],
    date: '2024 – 2025',
    role: 'As Web Production Designer at ECE, University of Toronto',
    buttonLabel: 'Explore',
  },
};