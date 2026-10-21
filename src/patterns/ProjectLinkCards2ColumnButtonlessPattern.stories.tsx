import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from '../components/Section';
import { Grid } from '../components/Grid';
import { ProjectLinkCard } from '../components/ProjectLinkCard';

const meta = {
  title: 'UI Patterns/Portfolio Sections/Project Link Cards/Buttonless Two Columns',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const projects = [
  {
    title: 'Content Strategy',
    eyebrow: 'RESEARCH / STRATEGY',
    description:
      'Organizing complex information around user needs to make important resources easier to discover and understand.',
    logoAlt: 'Content Strategy project logo',
  },
  {
    title: 'Accessible Experiences',
    eyebrow: 'UX / ACCESSIBILITY',
    description:
      'Designing clear, inclusive digital experiences that support people across different devices and abilities.',
    logoAlt: 'Accessible Experiences project logo',
  },
];

export const Beige: Story = {
  render: () => (
    <Section
      background="beige"
      eyebrow="AREAS OF FOCUS"
      title="Designing better digital experiences"
      description="Selected areas of work across research, strategy, and design."
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
            showButton={false}
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
      eyebrow="AREAS OF FOCUS"
      title="Designing better digital experiences"
      description="Selected areas of work across research, strategy, and design."
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
            showButton={false}
          />
        ))}
      </Grid>
    </Section>
  ),
};