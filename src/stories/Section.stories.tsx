import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from '../components/Section';
import { Typography } from '../components/Typography';
import { Grid } from '../components/Grid';
import { ProjectLinkCard } from '../components/ProjectLinkCard';

const meta = {
  title: 'Layouts/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    background: {
      control: 'inline-radio',
      options: ['beige', 'white'],
    },
    headerVariant: {
      control: 'inline-radio',
      options: [
        'with-description',
        'without-eyebrow',
        'title-only',
      ],
    },
    contentWidth: {
      control: 'inline-radio',
      options: ['full', 'wide', 'narrow'],
    },
  },
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Beige: Story = {
  args: {
    background: 'beige',
    headerVariant: 'with-description',
    eyebrow: 'CONTENT DISCOVERY',
    title: 'Making information easier to discover',
    description:
      'A section introduction that explains the purpose of the content below.',
    children: (
      <Typography variant="description-large">
        Every section can contain different content while sharing the same
        background, spacing, and content-width rules.
      </Typography>
    ),
  },
};

export const White: Story = {
  args: {
    background: 'white',
    headerVariant: 'without-eyebrow',
    title: 'Selected projects',
    description:
      'A simple introduction without an eyebrow.',
    children: (
      <Typography variant="description-large">
        The white variant provides visual rhythm between beige sections.
      </Typography>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    background: 'beige',
    headerVariant: 'title-only',
    title: 'More about my approach',
    children: (
      <Typography variant="description-medium">
        This section uses only a heading before its content.
      </Typography>
    ),
  },
};

export const TwoColumnCards: Story = {
  args: {
    background: 'white',
    headerVariant: 'with-description',
    eyebrow: 'SELECTED WORK',
    title: 'Projects and collaborations',
    description:
      'A two-column card layout inside a reusable section.',
    children: (
      <Grid columns={2} gap={4}>
        <ProjectLinkCard
          title="Research platform"
          eyebrow="DIGITAL EXPERIENCE"
          description="Making complex research information easier to navigate."
          showButton={false}
        />
        <ProjectLinkCard
          title="Content discovery"
          eyebrow="CONTENT STRATEGY"
          description="Improving how audiences find and understand information."
          showButton={false}
        />
      </Grid>
    ),
  },
};

export const NarrowContent: Story = {
  args: {
    background: 'beige',
    headerVariant: 'title-only',
    title: 'A focused description',
    contentWidth: 'narrow',
    children: (
      <Typography variant="description-large">
        This example constrains the content to a narrower measure. Use it for
        text-led sections where a shorter line length improves readability.
      </Typography>
    ),
  },
};