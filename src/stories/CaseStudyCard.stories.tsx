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
    variant: {
      control: 'inline-radio',
      options: ['default', 'outcome'],
      description:
        'Default includes the Explore button and footer. Outcome removes both for use in an Outcomes section.',
    },
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

const sharedArgs = {
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
  ] as [
    { heading: string; description: string },
    { heading: string; description: string },
    { heading: string; description: string },
  ],
  date: '2024 – 2025',
  role: 'As Web Production Designer at ECE, University of Toronto',
  buttonLabel: 'Explore',
};

export const Default: Story = {
  args: {
    ...sharedArgs,
    variant: 'default',
  },
};

export const Outcome: Story = {
  args: {
    ...sharedArgs,
    variant: 'outcome',
  },
  parameters: {
    docs: {
      description: {
        story:
          'An Outcomes-section card. It retains the card content and three highlights, but omits the Explore button and the date/role footer.',
      },
    },
  },
};