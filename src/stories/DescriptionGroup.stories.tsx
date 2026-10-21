import type { Meta, StoryObj } from '@storybook/react-vite';
import { DescriptionGroup } from '../components/DescriptionGroup';

const meta = {
  title: 'Components/DescriptionGroup',
  component: DescriptionGroup,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    width: {
      control: 'radio',
      options: ['wide', 'narrow'],
    },
  },
} satisfies Meta<typeof DescriptionGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Wide: Story = {
  args: {
    width: 'wide',
    lead:
      'Making complex information easier to understand starts with understanding what people need and how they look for it.',
    descriptions: [
      'Research and content analysis helped identify the information people needed most and the barriers that made it difficult to find.',
      'The resulting experience prioritised clarity, accessible content, and a consistent structure across the user journey.',
    ],
  },
};

export const Narrow: Story = {
  args: {
    width: 'narrow',
    lead:
      'A focused introduction can establish the purpose of a section without overwhelming the reader.',
    descriptions: [
      'Supporting paragraphs provide additional context while preserving a comfortable reading width.',
      'This narrower layout is useful when the surrounding section contains substantial whitespace.',
    ],
  },
};

export const LeadOnly: Story = {
  args: {
    width: 'wide',
    lead:
      'Sometimes a single, well-written paragraph is enough to communicate the main idea.',
    descriptions: [],
  },
};