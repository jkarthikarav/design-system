import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from '../components/Grid';
import { ProjectLinkCard } from '../components/ProjectLinkCard';
import { Typography } from '../components/Typography';

const meta = {
  title: 'Layouts/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3],
    },
    gap: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProjectCards: Story = {
  args: {
    columns: 3,
    gap: 4,
    children: (
      <>
        <ProjectLinkCard
          eyebrow="Product Design"
          title="AI-Powered Music Transcription"
        />
        <ProjectLinkCard
          eyebrow="Content Discovery"
          title="Research Facility Website"
        />
        <ProjectLinkCard
          eyebrow="Digital Experience"
          title="Accessible Digital Experiences"
        />
      </>
    ),
  },
};

export const GeneralContent: Story = {
  args: {
    columns: 3,
    gap: 4,
    children: (
      <>
        <div>
          <Typography variant="card-heading">Research</Typography>
          <Typography variant="description-medium">
            Understand user needs and opportunities.
          </Typography>
        </div>
        <div>
          <Typography variant="card-heading">Strategy</Typography>
          <Typography variant="description-medium">
            Turn insights into clear design directions.
          </Typography>
        </div>
        <div>
          <Typography variant="card-heading">Design</Typography>
          <Typography variant="description-medium">
            Create thoughtful, accessible experiences.
          </Typography>
        </div>
      </>
    ),
  },
};