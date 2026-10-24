import '../src/index.css';
import '../src/stories/Configure.css';

import type { Preview } from '@storybook/react-vite';

type StoryCodeContext = {
  title?: string;
  args?: Record<string, unknown>;
};

function escapeHtml(value: unknown, fallback: string): string {
  if (typeof value !== 'string') return fallback;
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Storybook's Show code panel displays the generated React source first,
 * followed by its vanilla HTML equivalent. The HTML uses the same CSS
 * classes and token-backed utility classes as the React component.
 */
function addVanillaSource(source: string, context: StoryCodeContext): string {
  const title = context.title ?? '';
  const args = context.args ?? {};
  let html = '';

  if (title.endsWith('/Button')) {
    const variant = ['primary', 'secondary', 'tertiary'].includes(String(args.variant)) ? String(args.variant) : 'primary';
    html = '<button type="' + escapeHtml(args.type, 'button') + '" class="button button-' + variant + '"' + (args.disabled ? ' disabled' : '') + '>\n  ' + escapeHtml(args.children, 'Button label') + '\n</button>';
  } else if (title.endsWith('/SectionHeader')) {
    const variant = ['with-description', 'without-eyebrow', 'title-only'].includes(String(args.variant)) ? String(args.variant) : 'with-description';
    const eyebrow = variant === 'with-description' && args.eyebrow ? '\n    <p class="typography typography--eyebrow">' + escapeHtml(args.eyebrow, '') + '</p>' : '';
    const description = variant !== 'title-only' && args.description ? '\n  <div class="section-header__description"><p class="typography typography--description-medium">' + escapeHtml(args.description, '') + '</p></div>' : '';
    html = '<div class="section-header section-header--' + variant + '">\n  <div class="section-header__main">' + eyebrow + '\n    <h2 class="typography typography--section-heading">' + escapeHtml(args.title, 'Section title') + '</h2>\n  </div>' + description + '\n</div>';
  } else if (title.endsWith('/Section')) {
    const background = args.background === 'white' ? 'white' : 'beige';
    const width = ['full', 'wide', 'narrow'].includes(String(args.contentWidth)) ? String(args.contentWidth) : 'full';
    html = '<section class="section section--' + background + ' section--content-' + width + ' py-10 px-4">\n  <div class="section__inner gap-6">\n    <!-- SectionHeader and content go here -->\n    <div class="section__content"><!-- Content -->\n    </div>\n  </div>\n</section>';
  } else if (title.endsWith('/Grid')) {
    const columns = [1, 2, 3].includes(Number(args.columns)) ? Number(args.columns) : 3;
    const gap = [1, 2, 3, 4, 5, 6].includes(Number(args.gap)) ? Number(args.gap) : 4;
    html = '<div class="grid grid--columns-' + columns + ' grid--gap-' + gap + '">\n  <!-- Grid items -->\n</div>';
  } else if (title.endsWith('/DescriptionGroup')) {
    const width = args.width === 'narrow' ? 'narrow' : 'wide';
    html = '<div class="description-group description-group--' + width + '">\n  <p class="typography typography--description-large">Lead description</p>\n  <div class="description-group__supporting">\n    <p class="typography typography--description-medium">Supporting description</p>\n  </div>\n</div>';
  } else if (title.endsWith('/Tag')) {
    const variant = ['default', 'accent', 'inverse'].includes(String(args.variant)) ? String(args.variant) : 'default';
    html = '<span class="tag tag--' + variant + '">' + escapeHtml(args.children, 'Tag label') + '</span>';
  } else if (title.endsWith('/Typography')) {
    const variant = escapeHtml(args.variant, 'description-medium');
    html = '<p class="typography typography--' + variant + '">Your text content</p>';
  } else if (title.endsWith('/ImageCaption')) {
    const width = ['full', 'wide', 'narrow'].includes(String(args.imageWidth)) ? String(args.imageWidth) : 'full';
    const ratio = ['auto', 'landscape', 'square'].includes(String(args.aspectRatio)) ? String(args.aspectRatio) : 'auto';
    html = '<figure class="image-caption image-caption--' + width + ' image-caption--' + ratio + '">\n  <img class="image-caption__image" src="/path/to/image.jpg" alt="Describe the image">\n  <figcaption class="image-caption__text">Image caption</figcaption>\n</figure>';
  } else if (title.endsWith('/ProjectImageGrid')) {
    const columns = [1, 2, 3].includes(Number(args.columns)) ? Number(args.columns) : 2;
    const gap = [1, 2, 3, 4, 5, 6].includes(Number(args.gap)) ? Number(args.gap) : 3;
    html = '<div class="project-image-grid">\n  <div class="grid grid--columns-' + columns + ' grid--gap-' + gap + '">\n    <!-- Repeat figure.image-caption for each image -->\n  </div>\n</div>';
  } else if (title.endsWith('/ProjectLinkCard')) {
    const variant = args.variant === 'inverse' ? 'inverse' : 'neutral';
    const button = args.showButton === false ? '<!-- Optional action omitted -->' : '<div class="project-link-card__action"><button class="button button-primary" type="button">Explore project</button></div>';
    html = '<article class="project-link-card project-link-card--' + variant + '">\n  <div class="project-link-card__top">\n    <span class="project-link-card__eyebrow">PROJECT TYPE</span>\n    <h3 class="project-link-card__title">' + escapeHtml(args.title, 'Project title') + '</h3>\n    <p class="project-link-card__description">' + escapeHtml(args.description, 'Project description') + '</p>\n  </div>\n  ' + button + '\n</article>';
  } else if (title.endsWith('/CaseStudyCard')) {
    const variant = args.variant === 'outcome' ? 'outcome' : 'default';
    const action = variant === 'outcome' ? '' : '\\n      <button class="button button-primary" type="button">Explore →</button>';
    const footer = variant === 'outcome' ? '' : '\\n  <footer class="case-study-card__footer">Date and role</footer>';
    html = '<article class="case-study-card case-study-card--' + variant + '">\\n  <div class="case-study-card__top">\\n    <p class="typography typography--eyebrow">PROJECT CATEGORY</p>\\n    <div class="case-study-card__title-row">\\n      <h2 class="typography typography--card-heading">Case study title</h2>' + action + '\\n    </div>\\n    <p class="typography typography--description-large">Case study summary</p>\\n  </div>\\n  <div class="case-study-card__highlights"><!-- Three highlights --></div>' + footer + '\\n</article>';
  } else if (title.startsWith('Patterns/Sections') || title.startsWith('Patterns/Content Layouts') || title.startsWith('Patterns/Media Layouts') || title.startsWith('Patterns/Card Layouts')) {
    const heading = escapeHtml(args.title, 'Case study section heading');
    const patternTitle = title.split('/').pop() ?? '';
    if (patternTitle === 'Outcome Card Grid') {
      html = '<section class="section section--beige"><div class="section__inner"><header class="section-header section-header--title-only"><div class="section-header__main"><h2 class="typography typography--section-heading">Outcomes</h2></div></header><div class="section__content"><div class="grid grid--columns-3 grid--gap-4"><article class="case-study-card case-study-card--outcome"><div class="case-study-card__top"><p class="typography typography--eyebrow">OUTCOME 01</p><h2 class="typography typography--card-heading">Improved Information Discovery</h2><p class="typography typography--description-large">Important facilities and services are easier to identify and understand.</p></div><div class="case-study-card__highlights"><!-- Three highlights --></div></article><!-- Repeat outcome card for each outcome --></div></div></div></section>';
    } else if (patternTitle === 'Actions Then Media') {
      html = '<section class="section section--white"><div class="section__inner"><header class="section-header section-header--title-only"><div class="section-header__main"><h2 class="typography typography--section-heading">Explore the TNFC experience</h2></div></header><div class="section__content"><div class="description-group description-group--narrow"><p class="typography typography--description-large">Separate the explanation, actions, and supporting visuals into clear rows.</p></div><div class="grid grid--columns-2 grid--gap-3"><button class="button button-primary">Explore TNFC</button><button class="button button-secondary">View access information</button></div><div class="project-image-grid"><div class="grid grid--columns-2 grid--gap-3"><!-- Two figure.image-caption elements; no card backgrounds --></div></div></div></div></section>';
    } else if (patternTitle === 'Two Column Media Comparison') {
      html = '<section class="section section--beige"><div class="section__inner"><header class="section-header section-header--title-only"><div class="section-header__main"><h2 class="typography typography--section-heading">A before-and-after comparison</h2></div></header><div class="section__content"><div class="project-image-grid"><div class="grid grid--columns-2 grid--gap-3"><figure class="image-caption image-caption--full image-caption--auto"><img class="image-caption__image" src="/path/to/before.jpg" alt="Before"><figcaption class="image-caption__text">Before — Information was spread across separate pages.</figcaption></figure><figure class="image-caption image-caption--full image-caption--auto"><img class="image-caption__image" src="/path/to/after.jpg" alt="After"><figcaption class="image-caption__text">After — Related information is grouped into a clearer journey.</figcaption></figure></div></div></div></div></section>';
    } else if (patternTitle === 'Ordered Content List') {
      html = '<section class="section section--white"><div class="section__inner"><header class="section-header section-header--title-only"><div class="section-header__main"><h2 class="typography typography--section-heading">Information architecture</h2></div></header><div class="section__content"><ol class="structured-list"><!-- Ordered discover/access/next-step items --></ol></div></div></section>';
    } else {
      const background = patternTitle === 'Heading With Supporting Content' || patternTitle === 'Narrow Heading Wide Content' ? 'white' : 'beige';
      html = '<section class="section section--' + background + '"><div class="section__inner"><header class="section-header section-header--title-only"><div class="section-header__main"><h2 class="typography typography--section-heading">' + heading + '</h2></div></header><div class="section__content"><div class="description-group description-group--narrow"><p class="typography typography--description-large">Lead description</p><div class="description-group__supporting"><p class="typography typography--description-medium">Supporting context appears beneath the heading in the content row.</p></div></div></div></div></section>';
    }
  } else if (title.endsWith('/StructuredList')) {
    html = '<ol class="structured-list">\n  <li class="structured-list__item">\n    <div class="structured-list__row">\n      <span class="structured-list__index" aria-hidden="true">01</span>\n      <span class="structured-list__content">\n        <span class="structured-list__title">List item title</span>\n        <span class="structured-list__description">List item description</span>\n      </span>\n    </div>\n  </li>\n</ol>';
  } else if (title.includes('Portfolio Sections')) {
    html = '<section class="section section--beige py-10 px-4">\n  <div class="section__inner gap-6">\n    <header class="section-header section-header--with-description">\n      <div class="section-header__main">\n        <p class="typography typography--eyebrow">SECTION EYEBROW</p>\n        <h2 class="typography typography--section-heading">Section heading</h2>\n      </div>\n      <div class="section-header__description"><p class="typography typography--description-medium">Section introduction</p></div>\n    </header>\n    <div class="section__content"><!-- Compose components with grid, gap-*, width, and spacing utilities --></div>\n  </div>\n</section>';
  }

  if (!html) {
    html = '<!-- Vanilla HTML equivalent: use the same component classes and token utilities. -->\n<!-- Example: <div class="grid grid--columns-2 grid--gap-4">...</div> -->';
  }

  // Storybook may run the source transform more than once. Avoid appending
  // the same vanilla HTML example again when it is already present.
  if (source.includes(html)) return source;

  return source + '\n\n' + html;
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: {
        transform: (source, context) => addVanillaSource(source, context as StoryCodeContext),
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
