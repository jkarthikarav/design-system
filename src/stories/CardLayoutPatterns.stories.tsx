import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from '../components/Section';
import { Grid } from '../components/Grid';
import { ProjectLinkCard } from '../components/ProjectLinkCard';

const meta = {
  title: 'Patterns/Card Layouts',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const outcomes = [
  {
    eyebrow: 'OUTCOME 01',
    title: 'Clearer discovery',
    description: 'Key information is easier to find.',
  },
  {
    eyebrow: 'OUTCOME 02',
    title: 'Simpler access',
    description: 'Requirements follow a clearer sequence.',
  },
  {
    eyebrow: 'OUTCOME 03',
    title: 'Reusable patterns',
    description: 'Layouts can support future content.',
  },
];

export const OutcomeCardGrid: Story = {
  render: () => (
    <Section
      background="beige"
      headerVariant="title-only"
      title="Outcome card grid"
    >
      <Grid columns={3} gap={4}>
        {outcomes.map((outcome) => (
          <ProjectLinkCard
            key={outcome.eyebrow}
            {...outcome}
            showButton={false}
          />
        ))}
      </Grid>
    </Section>
  ),
};
