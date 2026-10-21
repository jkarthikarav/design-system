import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from '../components/Section';
import { Grid } from '../components/Grid';
import { ProjectLinkCard } from '../components/ProjectLinkCard';

const meta = {
  title: 'UI Patterns/Portfolio Sections/Project Link Cards/Two Columns',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const projects = [
  {
    title: 'Research Facility Website',
    eyebrow: 'CONTENT STRATEGY',
    description:
      'Making complex research services easier to discover and access through a clearer digital experience.',
    logoAlt: 'Research Facility Website project logo',
  },
  {
    title: 'Design System',
    eyebrow: 'DESIGN / DEVELOPMENT',
    description:
      'Building reusable components and consistent interface patterns for accessible digital experiences.',
    logoAlt: 'Design System project logo',
  },
];

export const Beige: Story = {
  render: () => (
    <Section
      background="beige"
      eyebrow="SELECTED WORK"
      title="Featured projects"
      description="Explore projects shaped by research, content strategy, and thoughtful design."
      headerVariant="with-description"
      contentWidth="full"
    >
      <Grid columns={2} gap={4}>
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
      title="Featured projects"
      description="Explore projects shaped by research, content strategy, and thoughtful design."
      headerVariant="with-description"
      contentWidth="full"
    >
      <Grid columns={2} gap={4}>
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