import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  managerHead: (head) => `${head}\n    <link rel="icon" type="image/x-icon" href="JAKpot%20DS%20Logo.ico" />`,
  viteFinal: async (config) => ({
    ...config,
    base: process.env.STORYBOOK_BASE_PATH || '/',
  }),
};

export default config;
