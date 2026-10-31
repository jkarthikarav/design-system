import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectLinkCard } from '../components/ProjectLinkCard';

const meta = {
  title: 'Components/ProjectLinkCard',
  component: ProjectLinkCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'inverse', 'icon'],
    },
    title: {
      control: 'text',
    },
    eyebrow: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    logoSrc: {
      control: 'text',
      description: 'Path or URL for a circular PNG or SVG logo.',
    },
    logoAlt: {
      control: 'text',
    },
    iconSrc: { control: 'text', description: 'Path or URL for the manually supplied icon image. Used by the icon variant.' },
    iconAlt: { control: 'text' },
    iconSize: { control: 'select', options: ['16', '18', '20', '24', '32'] },
    buttonLabel: {
      control: 'text',
    },
    onExplore: {
      action: 'explore clicked',
    },
  },
} satisfies Meta<typeof ProjectLinkCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    variant: 'neutral',
    eyebrow: 'Fall 2024 · Product Design',
    title:
      'Research-Led Product Strategy for an AI-Powered Music Transcription Tool',
    description: '',
    buttonLabel: 'Explore Solution',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    eyebrow: 'Fall 2024 · Product Design',
    title:
      'Research-Led Product Strategy for an AI-Powered Music Transcription Tool',
    buttonLabel: 'Explore Solution',
  },
};

export const NeutralWithDescription: Story = {
  args: {
    variant: 'neutral',
    eyebrow: 'Fall 2024 · Product Design',
    title:
      'Research-Led Product Strategy for an AI-Powered Music Transcription Tool',
    description:
      'A research-driven approach to improving an AI-powered music transcription experience.',
    buttonLabel: 'Explore Solution',
  },
};

export const Inverse: Story = {
  args: {
    variant: 'inverse',
    eyebrow: 'Fall 2024 · Product Design',
    title:
      'Research-Led Product Strategy for an AI-Powered Music Transcription Tool',
    buttonLabel: 'Explore Solution',
  },
};

export const InverseWithDescription: Story = {
  args: {
    variant: 'inverse',
    eyebrow: 'Fall 2024 · Product Design',
    title: 'Research-Led Product Strategy',
    description:
      'A research-driven approach to improving an AI-powered music transcription experience.',
    buttonLabel: 'Explore Solution',
  },
};

export const WithLogo: Story = {
  args: {
    variant: 'neutral',
    title: 'AI Music Transcription',
    logoSrc: '/logos/music-project.svg',
    logoAlt: 'AI Music Transcription project logo',
    buttonLabel: 'Explore Solution',
  },
};

export const InverseWithLogo: Story = {
  args: {
    variant: 'inverse',
    title: 'AI Music Transcription',
    logoSrc: '/logos/music-project.svg',
    logoAlt: 'AI Music Transcription project logo',
    description:
      'Explore the research and design behind an AI-powered music tool.',
    buttonLabel: 'Explore Solution',
  },
};

export const WithoutButton: Story = {
args: {
title: 'Informational project',
eyebrow: 'DIGITAL EXPERIENCE',
description:
'A project card that presents information without a button or clickable behavior.',
showButton: false,
},
};

export const Icon: Story = {
  args: {
    variant: 'icon',
    iconSrc: '/icons/your-icon.svg',
    iconAlt: 'Project icon',
    iconSize: '24',
    title: 'Project title',
    description: 'A short description of the project and its value.',
    buttonLabel: 'Explore project',
  },
};
