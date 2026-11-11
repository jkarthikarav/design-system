import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/stories/Configure.mdx',
    '../src/stories/foundations/DesignPrinciples.mdx',
    '../src/stories/foundations/Tokens.mdx',
    '../src/stories/foundations/Accessibility.mdx',
    '../src/stories/foundations/JAKpotBuilder.mdx',
    '../src/stories/Button.stories.tsx',
    '../src/stories/CaseStudyCard.stories.tsx',
    '../src/stories/DescriptionGroup.stories.tsx',
    '../src/stories/Dropdown.stories.tsx',
    '../src/stories/Footer.stories.tsx',
    '../src/stories/Grid.stories.tsx',
    '../src/stories/Icon.stories.tsx',
    '../src/stories/ImageCaption.stories.tsx',
    '../src/stories/ProjectImageGrid.stories.tsx',
    '../src/stories/ProjectLinkCard.stories.tsx',
    '../src/stories/Section.stories.tsx',
    '../src/stories/SectionHeader.stories.tsx',
    '../src/stories/StructuredList.stories.tsx',
    '../src/stories/Tag.stories.tsx',
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
