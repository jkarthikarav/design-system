import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from '../components/Section';
import { Grid } from '../components/Grid';
import { ProjectLinkCard } from '../components/ProjectLinkCard';

const meta = {
  title: 'UI Patterns/Portfolio Sections/Project Link Cards/Three Columns',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const projects = [
  {
    title: 'Content Discovery',
    eyebrow: 'DIGITAL EXPERIENCE',
    description:
      'Helping people find relevant information through a clearer content structure.',
    logoAlt: 'Content Discovery project logo',
  },
  {
    title: 'Research Platform',
    eyebrow: 'UX RESEARCH',
    description:
      'Turning complex research resources into a more accessible digital experience.',
    logoAlt: 'Research Platform project logo',
  },
  {
    title: 'Design System',
    eyebrow: 'DESIGN / DEVELOPMENT',
    description:
      'Creating reusable interface patterns for consistent and scalable experiences.',
    logoAlt: 'Design System project logo',
  },
];

export const Beige: Story = {
  render: () => (
    <Section
      background="beige"
      eyebrow="SELECTED WORK"
      title="Projects and experiences"
      description="A selection of projects focused on clarity, usability, and accessible digital experiences."
      headerVariant="with-description"
      contentWidth="full"
    >
      <Grid columns={3} gap={4}>
        {projects.map((project) => (
          <ProjectLinkCard
            key={project.title}
            title={project.title}
            eyebrow={project.eyebrow}
            description={project.description}
            logoAlt={project.logoAlt}
            variant="neutral"
            showButton
          />
        ))}
      </Grid>
    </Section>
  ),
};

export const White: Story = {
  render: () => (
    <Section
      background="white"
      eyebrow="SELECTED WORK"
      title="Projects and experiences"
      description="A selection of projects focused on clarity, usability, and accessible digital experiences."
      headerVariant="with-description"
      contentWidth="full"
    >
      <Grid columns={3} gap={4}>
        {projects.map((project) => (
          <ProjectLinkCard
            key={project.title}
            title={project.title}
            eyebrow={project.eyebrow}
            description={project.description}
            logoAlt={project.logoAlt}
            variant="neutral"
            showButton
          />
        ))}
      </Grid>
    </Section>
  ),
};