import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageCaption } from '../components/ImageCaption';

const meta = {
  title: 'Components/ImageCaption',
  component: ImageCaption,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    imageWidth: {
      control: 'radio',
      options: ['full', 'wide', 'narrow'],
    },
    aspectRatio: {
      control: 'radio',
      options: ['auto', 'landscape', 'square'],
    },
  },
} satisfies Meta<typeof ImageCaption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Landscape: Story = {
  args: {
    src: 'https://placehold.co/1200x675',
    alt: 'Placeholder landscape image representing a project interface.',
    caption: 'Figure 1. An overview of the project interface.',
    imageWidth: 'full',
    aspectRatio: 'landscape',
  },
};

export const Narrow: Story = {
  args: {
    src: 'https://placehold.co/800x800',
    alt: 'Placeholder square image representing a design detail.',
    caption: 'Figure 2. A detail from the design exploration.',
    imageWidth: 'narrow',
    aspectRatio: 'square',
  },
};

export const WithoutCaption: Story = {
  args: {
    src: 'https://placehold.co/1200x675',
    alt: 'Placeholder image representing a project outcome.',
    imageWidth: 'full',
    aspectRatio: 'auto',
  },
};