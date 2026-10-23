import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from '../components/Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    leftText: 'Website developed by Karthik',
    rightText: 'Based in Ontario, Canada.',
    backToTopLabel: 'Back to top ↑',
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
