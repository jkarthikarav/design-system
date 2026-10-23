import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const jakpotTheme = create({
  base: 'light',
  brandTitle: 'JAKpot',
  brandImage: 'JAKpot%20DS%20Logo.png',
  brandTarget: '_self',
});

addons.setConfig({
  theme: jakpotTheme,
});
