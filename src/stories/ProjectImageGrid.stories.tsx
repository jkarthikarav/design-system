import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectImageGrid } from '../components/ProjectImageGrid';

const meta = {
  title: 'Components/ProjectImageGrid',
  component: ProjectImageGrid,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    columns: {
      control: 'radio',
      options: [1, 2, 3],
    },
    gap: {
      control: 'radio',
      options: [1, 2, 3, 4, 5, 6],
    },
  },
} satisfies Meta<typeof ProjectImageGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleImages = [
  {
    id: 'discovery',
    src: 'https://placehold.co/900x600',
    alt: 'Placeholder for a research and discovery screen.',
    caption: 'Research and discovery',
  },
  {
    id: 'architecture',
    src: 'https://placehold.co/900x600',
    alt: 'Placeholder for an information architecture diagram.',
    caption: 'Information architecture',
  },
  {
    id: 'interface',
    src: 'https://placehold.co/900x600',
    alt: 'Placeholder for a final interface design.',
    caption: 'Final interface',
  },
];

export const TwoColumns: Story = {
  args: {
    images: sampleImages,
    columns: 2,
    gap: 3,
  },
};

export const ThreeColumns: Story = {
  args: {
    images: sampleImages,
    columns: 3,
    gap: 3,
  },
};

export const SingleColumn: Story = {
  args: {
    images: sampleImages,
    columns: 1,
    gap: 4,
  },
};

export const WithoutCaptions: Story = {
  args: {
    images: sampleImages.map((image) =>
      Object.fromEntries(
        Object.entries(image).filter(([key]) => key !== 'caption')
      ) as typeof image
    ),
    columns: 2,
    gap: 3,
  },
};
