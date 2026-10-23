import { useEffect, useMemo, useState } from 'react';
import './BuilderApp.css';

import { canContain as schemaCanContain, canNest, type CompositionElementType } from './composition/schema';

type ElementType = CompositionElementType;

type NodeProps = Record<string, string | number>;
type BuilderNode = { id: string; type: ElementType; props: NodeProps; children: BuilderNode[] };
type Skeleton = { key: string; title: string; html: string };

const elementOptions: { value: ElementType; label: string; group: string }[] = [
  { value: 'section', label: 'Section', group: 'Structure' },
  { value: 'section-header', label: 'Section header', group: 'Structure' },
  { value: 'description-group', label: 'Description group', group: 'Content' },
  { value: 'typography', label: 'Typography / text', group: 'Content' },
  { value: 'grid', label: 'Grid', group: 'Structure' },
  { value: 'button', label: 'Button', group: 'Actions' },
  { value: 'tag', label: 'Tag', group: 'Content' },
  { value: 'project-link-card', label: 'Project link card', group: 'Cards' },
  { value: 'case-study-card', label: 'Case study card', group: 'Cards' },
  { value: 'structured-list', label: 'Structured list', group: 'Content' },
  { value: 'image-caption', label: 'Image with caption', group: 'Media' },
  { value: 'project-image-grid', label: 'Project image grid', group: 'Media' },
  { value: 'footer', label: 'Footer', group: 'Structure' },
];

const starterProps: Record<ElementType, NodeProps> = {
  section: { background: 'beige', width: 'wide' },
  'section-header': { eyebrow: 'SECTION EYEBROW', title: 'Section heading', description: 'A separate description belonging to the section header.', variant: 'with-description' },
  'description-group': { lead: 'A leading statement for this content group.', supporting: 'Supporting description for this group.\nA second independent supporting paragraph.', width: 'wide' },
  typography: { text: 'Write your text here.', variant: 'description-medium', align: 'left', width: 'full' },
  button: { label: 'Primary action', href: '#', variant: 'primary' },
  tag: { label: 'Category', variant: 'default' },
  grid: { columns: 2, gap: 3 },
  'project-link-card': { eyebrow: 'PROJECT TYPE', title: 'Project title', description: 'A short description of the project and its value.', actionLabel: 'Explore project', href: '#', variant: 'neutral' },
  'case-study-card': { eyebrow: 'CASE STUDY', title: 'Case study title', description: 'A concise summary of the work.', highlights: 'Research | Understand user needs\nDesign | Explore and test solutions\nDelivery | Ship the experience', date: '2026', role: 'Product design', variant: 'default', actionLabel: 'Explore', href: '#' },
  'structured-list': { items: 'Discover | Understand the offer\nExplore | Review the available options\nContinue | Take the next step', ordered: 'true' },
  'image-caption': { src: 'https://placehold.co/1200x800?text=Preview+image', alt: 'Describe the image', caption: 'Image caption', ratio: 'landscape', width: 'full' },
  'project-image-grid': { columns: 2, gap: 3 },
  footer: { leftText: 'Website developed by Karthik', rightText: 'Based in Ontario, Canada.', backToTopLabel: 'Back to top ↑' },
  skeleton: { title: 'Imported skeleton', rawHtml: '' },
};

const esc = (value: unknown) => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const val = (node: BuilderNode, key: string, fallback = '') => String(node.props[key] ?? fallback);
const nodeLabel = (node: BuilderNode) => elementOptions.find((item) => item.value === node.type)?.label ?? 'Skeleton HTML';
const canContain = (type: ElementType) => schemaCanContain(type);
const makeNode = (type: ElementType): BuilderNode => ({ id: `el-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`, type, props: { ...starterProps[type] }, children: [] });

function updateInTree(nodes: BuilderNode[], id: string, updater: (node: BuilderNode) => BuilderNode): BuilderNode[] {
  return nodes.map((node) => node.id === id ? updater(node) : { ...node, children: updateInTree(node.children, id, updater) });
}
function addToTree(nodes: BuilderNode[], parentId: string | null, child: BuilderNode): BuilderNode[] {
  if (!parentId) return [...nodes, child];
  return nodes.map((node) => {
    if (node.id === parentId) {
      if (!canNest(node.type, child.type)) return node;
      return { ...node, children: [...node.children, child] };
    }
    return { ...node, children: addToTree(node.children, parentId, child) };
  });
}
function removeFromTree(nodes: BuilderNode[], id: string): BuilderNode[] {
  return nodes.filter((node) => node.id !== id).map((node) => ({ ...node, children: removeFromTree(node.children, id) }));
}
function findNode(nodes: BuilderNode[], id: string | null): BuilderNode | null {
  if (!id) return null;
  for (const node of nodes) {
    if (node.id === id) return node;
    const nested = findNode(node.children, id);
    if (nested) return nested;
  }
  return null;
}
function flatten(nodes: BuilderNode[], depth = 0): { node: BuilderNode; depth: number }[] {
  return nodes.flatMap((node) => [{ node, depth }, ...flatten(node.children, depth + 1)]);
}
function className(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
}
function typography(text: string, variant: string, align = 'left', width = 'full') {
  const allowedVariants = ['hero-heading', 'section-heading', 'card-heading', 'hero-subheading', 'section-subheading', 'description-large', 'description-medium', 'card-description', 'image-caption', 'eyebrow'];
  const safeVariant = allowedVariants.includes(variant) ? variant : 'description-medium';
  const tag = ['hero-heading', 'section-heading'].includes(safeVariant) ? (safeVariant === 'hero-heading' ? 'h1' : 'h2') : safeVariant === 'card-heading' ? 'h3' : 'p';
  return `<${tag} class="jakpot-typography jakpot-typography--${safeVariant} jakpot-typography--${className(align)} jakpot-typography--width-${className(width)}">${esc(text)}</${tag}>`;
}
function transformSkeleton(raw: string) {
  return raw.replace(/class="([^"]+)"/g, (_match, classes: string) =>
    'class="' + classes.split(/\s+/).map((name) => name.startsWith('jakpot-') ? name : 'jakpot-' + name).join(' ') + '"');
}
function renderNode(node: BuilderNode): string {
  const children = node.children.map(renderNode).join('\n');
  switch (node.type) {
    case 'section':
      return `<section class="jakpot-section jakpot-section--${esc(val(node, 'background', 'beige'))} jakpot-section--content-${esc(val(node, 'width', 'wide'))}"><div class="jakpot-section__inner"><div class="jakpot-section__content">${children || '<!-- Add child elements from the builder to populate this section. -->'}</div></div></section>`;
    case 'section-header': {
      const variant = val(node, 'variant', 'with-description');
      const eyebrow = variant === 'with-description' && val(node, 'eyebrow') ? typography(val(node, 'eyebrow'), 'eyebrow') : '';
      const description = variant !== 'title-only' && val(node, 'description') ? `<div class="jakpot-section-header__description">${typography(val(node, 'description'), 'description-medium')}</div>` : '';
      return `<header class="jakpot-section-header jakpot-section-header--${esc(variant)}"><div class="jakpot-section-header__main">${eyebrow}${typography(val(node, 'title', 'Section heading'), 'section-heading')}</div>${description}</header>`;
    }
    case 'description-group':
      return `<div class="jakpot-description-group jakpot-description-group--${esc(val(node, 'width', 'wide'))}">${typography(val(node, 'lead'), 'description-large')}<div class="jakpot-description-group__supporting">${val(node, 'supporting').split('\n').filter(Boolean).map((line) => typography(line, 'description-medium')).join('')}</div></div>`;
    case 'typography':
      return typography(val(node, 'text'), val(node, 'variant', 'description-medium'), val(node, 'align', 'left'), val(node, 'width', 'full'));
    case 'button':
      return `<a class="jakpot-button jakpot-button--${esc(val(node, 'variant', 'primary'))}" href="${esc(val(node, 'href', '#'))}">${esc(val(node, 'label', 'Action'))}</a>`;
    case 'tag':
      return `<span class="jakpot-tag jakpot-tag--${esc(val(node, 'variant', 'default'))}">${esc(val(node, 'label', 'Category'))}</span>`;
    case 'grid':
      return `<div class="jakpot-grid jakpot-grid--columns-${esc(val(node, 'columns', '2'))} jakpot-grid--gap-${esc(val(node, 'gap', '3'))}">${children || '<!-- Add child elements to this grid. -->'}</div>`;
    case 'project-link-card':
      return `<article class="jakpot-project-link-card jakpot-project-link-card--${esc(val(node, 'variant', 'neutral'))}"><div class="jakpot-project-link-card__top"><p class="jakpot-project-link-card__eyebrow">${esc(val(node, 'eyebrow'))}</p><h3 class="jakpot-typography jakpot-typography--card-heading jakpot-project-link-card__title">${esc(val(node, 'title'))}</h3><p class="jakpot-typography jakpot-typography--card-description jakpot-project-link-card__description">${esc(val(node, 'description'))}</p></div><div class="jakpot-project-link-card__action"><a class="jakpot-button jakpot-button--primary" href="${esc(val(node, 'href', '#'))}">${esc(val(node, 'actionLabel', 'Explore project'))}</a></div></article>`;
    case 'case-study-card': {
      const highlights = val(node, 'highlights').split('\n').filter(Boolean).map((line) => {
        const [heading, ...rest] = line.split('|');
        return `<div class="jakpot-case-study-card__highlight"><h4 class="jakpot-typography jakpot-typography--section-subheading">${esc(heading.trim())}</h4><p class="jakpot-typography jakpot-typography--description-medium">${esc(rest.join('|').trim())}</p></div>`;
      }).join('');
      const isOutcome = val(node, 'variant', 'default') === 'outcome';
      const action = isOutcome ? '' : `<a class="jakpot-button jakpot-button--primary jakpot-case-study-card__action" href="${esc(val(node, 'href', '#'))}">${esc(val(node, 'actionLabel', 'Explore'))}</a>`;
      const footer = isOutcome ? '' : `<footer class="jakpot-case-study-card__footer"><span class="jakpot-case-study-card__date">${esc(val(node, 'date'))}</span><span class="jakpot-case-study-card__role">${esc(val(node, 'role'))}</span></footer>`;
      return `<article class="jakpot-case-study-card jakpot-case-study-card--${esc(val(node, 'variant', 'default'))}"><div class="jakpot-case-study-card__top"><div class="jakpot-case-study-card__content"><p class="jakpot-typography jakpot-typography--eyebrow">${esc(val(node, 'eyebrow'))}</p><div class="jakpot-case-study-card__title-row"><h3 class="jakpot-typography jakpot-typography--card-heading">${esc(val(node, 'title'))}</h3></div><p class="jakpot-typography jakpot-typography--description-large">${esc(val(node, 'description'))}</p></div>${action}</div><div class="jakpot-case-study-card__highlights">${highlights}</div>${footer}</article>`;
    }
    case 'structured-list': {
      const items = val(node, 'items').split('\n').filter(Boolean).map((line, index) => {
        const [title, ...rest] = line.split('|');
        return `<li class="jakpot-structured-list__item"><div class="jakpot-structured-list__row"><span class="jakpot-structured-list__index">${String(index + 1).padStart(2, '0')}</span><span class="jakpot-structured-list__content"><span class="jakpot-structured-list__title">${esc(title.trim())}</span><span class="jakpot-structured-list__description">${esc(rest.join('|').trim())}</span></span></div></li>`;
      }).join('');
      const listTag = val(node, 'ordered', 'true') === 'true' ? 'ol' : 'ul';
      return `<${listTag} class="jakpot-structured-list">${items}</${listTag}>`;
    }
    case 'image-caption':
      return `<figure class="jakpot-image-caption jakpot-image-caption--${esc(val(node, 'width', 'full'))} jakpot-image-caption--${esc(val(node, 'ratio', 'landscape'))}"><img class="jakpot-image-caption__image" src="${esc(val(node, 'src'))}" alt="${esc(val(node, 'alt'))}" loading="lazy"><figcaption class="jakpot-image-caption__text">${esc(val(node, 'caption'))}</figcaption></figure>`;
    case 'project-image-grid':
      return `<div class="jakpot-project-image-grid"><div class="jakpot-grid jakpot-grid--columns-${esc(val(node, 'columns', '2'))} jakpot-grid--gap-${esc(val(node, 'gap', '3'))}">${children || '<!-- Add image-caption elements to this image grid. -->'}</div></div>`;
    case 'footer':
      return `<footer class="jakpot-footer"><p class="jakpot-footer__text">${esc(val(node, 'leftText', 'Website developed by Karthik'))}</p><p class="jakpot-footer__text">${esc(val(node, 'rightText', 'Based in Ontario, Canada.'))}</p><button type="button" class="jakpot-button jakpot-button--tertiary jakpot-footer__button">${esc(val(node, 'backToTopLabel', 'Back to top ↑'))}</button></footer>`;
    case 'skeleton':
      return transformSkeleton(val(node, 'rawHtml'));
    default:
      return children;
  }
}

export default function BuilderApp() {
  const [nodes, setNodes] = useState<BuilderNode[]>([makeNode('section')]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newType, setNewType] = useState<ElementType>('section-header');
  const [tab, setTab] = useState<'builder' | 'catalogue' | 'export'>('builder');
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [skeletons, setSkeletons] = useState<Skeleton[]>([]);
  const [visibleCount, setVisibleCount] = useState(100);
  const [stylesheetUrl, setStylesheetUrl] = useState(typeof window === 'undefined' ? '/jakpot.css' : new URL('jakpot.css', window.location.href).href);

  useEffect(() => {
    let active = true;
    Promise.all(Array.from({ length: 13 }, (_, i) =>
      fetch(new URL(`skeleton-parts/part-${String(i + 1).padStart(2, '0')}.html.txt`, window.location.href))
        .then((response) => { if (!response.ok) throw new Error('Skeleton source unavailable'); return response.text(); })
    )).then((parts) => {
      // Each source file is a complete HTML document. Parse each independently:
      // concatenating them first makes DOMParser discard all but one document body.
      const rows = parts.flatMap((part) => {
        const doc = new DOMParser().parseFromString(part, 'text/html');
        return Array.from(doc.querySelectorAll('.sk-entry')).map((entry) => ({
          key: entry.getAttribute('data-key') || '',
          title: entry.querySelector('.sk-entry__name')?.textContent?.trim() || '',
          html: entry.querySelector('.sk-entry__preview')?.innerHTML || '',
        }));
      });
      const uniqueRows = Array.from(new Map(rows.map((row) => [row.key, row])).values());
      if (active) setSkeletons(uniqueRows);
    }).catch(() => { if (active) setSkeletons([]); });
    return () => { active = false; };
  }, []);

  const selected = findNode(nodes, selectedId);
  const html = useMemo(() => nodes.map(renderNode).join('\n'), [nodes]);
  const exportHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="${esc(stylesheetUrl)}">
  <title>JAKpot component</title>
</head>
<body>
<main class="jakpot-root">
${html}
</main>
</body>
</html>`;
  const matches = skeletons.filter((item) => (item.title + ' ' + item.key).toLowerCase().includes(query.toLowerCase()));
  const addNode = (type: ElementType, parentId: string | null = null) => {
    const node = makeNode(type);
    setNodes((old) => addToTree(old, parentId, node));
    setSelectedId(node.id);
    setTab('builder');
  };
  const setProp = (key: string, value: string | number) => {
    if (!selected) return;
    setNodes((old) => updateInTree(old, selected.id, (node) => ({ ...node, props: { ...node.props, [key]: value } })));
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(exportHtml); setCopied(true); window.setTimeout(() => setCopied(false), 1400); }
    catch { setTab('export'); }
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([exportHtml], { type: 'text/html;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'jakpot-component.html'; link.click(); URL.revokeObjectURL(url);
  };
  const field = (label: string, key: string, options?: string[], kind: 'input' | 'textarea' = 'input') => {
    if (!selected) return null;
    const value = val(selected, key);
    return <label className="builder-field" key={key}><span>{label}</span>{options
      ? <select value={value} onChange={(event) => setProp(key, event.target.value)}>{options.map((option) => <option key={option} value={option}>{option.replace(/-/g, ' ')}</option>)}</select>
      : kind === 'textarea'
        ? <textarea rows={key === 'rawHtml' ? 12 : 4} value={value} onChange={(event) => setProp(key, event.target.value)} />
        : <input value={value} onChange={(event) => setProp(key, event.target.value)} />}</label>;
  };
  const flattened = flatten(nodes);

  return <div className="builder-app">
    <header className="builder-topbar">
      <a className="builder-brand" href="./"><img className="builder-logo" src="./JAKpot%20DS%20Logo.png" alt="" /><span>JAKpot<small>DESIGN SYSTEM</small></span></a>
      <nav className="builder-tabs">
        <button className={tab === 'builder' ? 'active' : ''} onClick={() => setTab('builder')}>Builder</button>
        <button className={tab === 'catalogue' ? 'active' : ''} onClick={() => setTab('catalogue')}>Skeletons <span>{skeletons.length || '1,316'}</span></button>
        <button className={tab === 'export' ? 'active' : ''} onClick={() => setTab('export')}>Export HTML</button>
      </nav>
      <a className="builder-storybook-link" href="https://jkarthikarav.github.io/design-system/" target="_blank" rel="noreferrer">Storybook ↗</a>
    </header>
    <main className="builder-main">
      <section className="builder-intro"><div><p className="builder-eyebrow">DESIGN SYSTEM WORKSPACE</p><h1>Build with JAKpot.</h1><p>Compose any supported design-system element, configure its own properties, and export semantic HTML using the shared stylesheet.</p></div><div className="builder-intro-note"><span className="builder-status-dot"></span> Live preview · Element-level controls · HTML export</div></section>

      {tab === 'catalogue' ? <section className="builder-catalogue">
        <div className="builder-section-heading"><div><p className="builder-eyebrow">SKELETON LIBRARY</p><h2>All reviewed skeletons</h2></div><p>{skeletons.length ? `${skeletons.length.toLocaleString()} loaded` : 'Loading catalogue…'}</p></div>
        <input className="builder-search" placeholder="Search by number, name, or component…" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(100); }} />
        <div className="builder-catalogue-grid">{matches.slice(0, visibleCount).map((item) => <article className="builder-catalogue-card" key={item.key}>
          <span className="builder-card-kicker">{item.key}</span><strong>{item.title}</strong><div className="builder-skeleton-preview jakpot-root" dangerouslySetInnerHTML={{ __html: transformSkeleton(item.html) }} />
          <div className="builder-skeleton-actions"><button className="builder-secondary-button" onClick={() => { const node = makeNode('skeleton'); node.props.title = item.title; node.props.rawHtml = item.html; setNodes((old) => addToTree(old, null, node)); setSelectedId(node.id); setTab('builder'); }}>Add skeleton to canvas</button></div>
        </article>)}</div>
        {skeletons.length === 0 && <p>Could not load the skeleton files. Check that all 13 files in public/skeleton-parts are deployed.</p>}
        {matches.length > visibleCount && <button className="builder-secondary-button" onClick={() => setVisibleCount((count) => count + 100)}>Show next 100 ({matches.length - visibleCount} remaining)</button>}
        {matches.length === 0 && skeletons.length > 0 && <p>No skeletons match that search.</p>}
      </section> : tab === 'export' ? <section className="builder-export">
        <div className="builder-section-heading"><div><p className="builder-eyebrow">READY TO USE</p><h2>Export semantic HTML</h2><p>The export contains your composed elements and references the shared stylesheet.</p></div></div>
        <label className="builder-field"><span>Live stylesheet URL</span><input value={stylesheetUrl} onChange={(event) => setStylesheetUrl(event.target.value)} /></label>
        <div className="builder-export-actions"><button className="builder-primary-button" onClick={copy}>{copied ? 'Copied ✓' : 'Copy full HTML'}</button><button className="builder-secondary-button" onClick={download}>Download HTML file</button><button className="builder-secondary-button" onClick={() => setTab('builder')}>Back to builder</button></div>
        <pre className="builder-code"><code>{exportHtml}</code></pre>
      </section> : <div className="builder-workspace">
        <aside className="builder-controls">
          <div className="builder-section-heading"><div><p className="builder-eyebrow">ELEMENT TREE</p><h2>Compose</h2></div><button className="builder-reset" onClick={() => { setNodes([]); setSelectedId(null); }}>Clear</button></div>
          <div className="builder-add-row"><label className="builder-field"><span>Element to add</span><select value={newType} onChange={(event) => setNewType(event.target.value as ElementType)}>{Object.entries(elementOptions.reduce<Record<string, typeof elementOptions>>((groups, item) => { (groups[item.group] ||= []).push(item); return groups; }, {})).map(([group, items]) => <optgroup key={group} label={group}>{items.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</optgroup>)}</select></label><button className="builder-primary-button" onClick={() => addNode(newType)}>Add element +</button></div>
          {selected && canContain(selected.type) && <button className="builder-secondary-button builder-add-child" onClick={() => addNode(newType, selected.id)}>Add child to selected {nodeLabel(selected).toLowerCase()} +</button>}
          <div className="builder-element-tree">{flattened.map(({ node, depth }) => <div className="builder-tree-row" key={node.id} style={{ paddingLeft: 10 + depth * 18 }}><button className={selectedId === node.id ? 'builder-tree-item selected' : 'builder-tree-item'} onClick={() => setSelectedId(node.id)}><span className="builder-tree-type">{nodeLabel(node)}</span><span className="builder-tree-name">{val(node, 'title') || val(node, 'label') || val(node, 'lead') || val(node, 'text') || val(node, 'eyebrow') || 'Untitled element'}</span></button><button className="builder-tree-remove" aria-label={`Remove ${nodeLabel(node)}`} onClick={() => { setNodes((old) => removeFromTree(old, node.id)); if (selectedId === node.id) setSelectedId(null); }}>×</button></div>)}</div>
          {selected ? <div className="builder-selected-controls">
            <div className="builder-section-heading"><div><p className="builder-eyebrow">SELECTED ELEMENT</p><h2>{nodeLabel(selected)}</h2></div><button className="builder-reset" onClick={() => setNodes((old) => updateInTree(old, selected.id, (node) => ({ ...node, props: { ...starterProps[node.type] } })))}>Reset</button></div>
            {selected.type === 'section' && <>{field('Background', 'background', ['beige', 'white'])}{field('Content width', 'width', ['full', 'wide', 'narrow'])}</>}
            {selected.type === 'section-header' && <>{field('Eyebrow', 'eyebrow')}{field('Heading', 'title')}{field('Header description', 'description', undefined, 'textarea')}{field('Header layout', 'variant', ['with-description', 'without-eyebrow', 'title-only'])}<p className="builder-field-note">This description belongs only to the SectionHeader. DescriptionGroup content is edited independently.</p></>}
            {selected.type === 'description-group' && <>{field('Leading text', 'lead', undefined, 'textarea')}{field('Supporting descriptions (one per line)', 'supporting', undefined, 'textarea')}{field('Content width', 'width', ['wide', 'narrow'])}</>}
            {selected.type === 'typography' && <>{field('Text', 'text', undefined, 'textarea')}{field('Typography style', 'variant', ['hero-heading', 'section-heading', 'card-heading', 'hero-subheading', 'section-subheading', 'description-large', 'description-medium', 'card-description', 'image-caption', 'eyebrow'])}{field('Alignment', 'align', ['left', 'center'])}{field('Text width', 'width', ['full', 'wide', 'narrow'])}</>}
            {selected.type === 'button' && <>{field('Label', 'label')}{field('Link URL', 'href')}{field('Style', 'variant', ['primary', 'secondary', 'tertiary'])}</>}
            {selected.type === 'tag' && <>{field('Label', 'label')}{field('Style', 'variant', ['default', 'accent', 'inverse'])}</>}
            {selected.type === 'grid' && <>{field('Columns', 'columns', ['1', '2', '3'])}{field('Gap', 'gap', ['1', '2', '3', '4', '5', '6'])}</>}
            {selected.type === 'project-link-card' && <>{field('Eyebrow', 'eyebrow')}{field('Title', 'title')}{field('Description', 'description', undefined, 'textarea')}{field('Action label', 'actionLabel')}{field('Link URL', 'href')}{field('Card style', 'variant', ['neutral', 'inverse'])}</>}
            {selected.type === 'case-study-card' && <>{field('Card variant', 'variant', ['default', 'outcome'])}{field('Eyebrow', 'eyebrow')}{field('Title', 'title')}{field('Description', 'description', undefined, 'textarea')}{field('Explore label', 'actionLabel')}{field('Explore URL', 'href')}{field('Highlights (Heading | description per line)', 'highlights', undefined, 'textarea')}{val(selected, 'variant', 'default') !== 'outcome' && <>{field('Date', 'date')}{field('Role', 'role')}</>}</>}
            {selected.type === 'structured-list' && <>{field('Items (Title | description per line)', 'items', undefined, 'textarea')}{field('Numbering', 'ordered', ['true', 'false'])}</>}
            {selected.type === 'image-caption' && <>{field('Image URL', 'src')}{field('Alt text', 'alt')}{field('Caption', 'caption')}{field('Aspect ratio', 'ratio', ['landscape', 'square', 'auto'])}{field('Image width', 'width', ['full', 'wide', 'narrow'])}</>}
            {selected.type === 'project-image-grid' && <>{field('Columns', 'columns', ['1', '2', '3'])}{field('Gap', 'gap', ['1', '2', '3', '4', '5', '6'])}<p className="builder-field-note">Select this grid and use “Add child” to add image-caption elements.</p></>}
            {selected.type === 'footer' && <>{field('First text', 'leftText')}{field('Second text', 'rightText')}{field('Button label', 'backToTopLabel')}</>}
            {selected.type === 'skeleton' && <>{field('Skeleton name', 'title')}{field('Skeleton HTML', 'rawHtml', undefined, 'textarea')}</>}
            {canContain(selected.type) && <p className="builder-field-note">Container selected. Choose an element above, then use “Add child” to nest it inside this container.</p>}
          </div> : <p className="builder-empty-selection">Select an element in the tree to see its controls. Add any element above to start composing.</p>}
          <div className="builder-control-footer"><button className="builder-primary-button" onClick={() => setTab('export')}>Review HTML export <span>→</span></button><p>Only the selected element's relevant controls are shown.</p></div>
        </aside>
        <section className="builder-preview-panel">
          <div className="builder-preview-heading"><div><p className="builder-eyebrow">LIVE CANVAS</p><h2>Composed elements</h2></div><span className="builder-preview-badge"><span></span> Updated live</span></div>
          <div className="builder-preview-canvas"><div className="builder-preview-content jakpot-root" dangerouslySetInnerHTML={{ __html: html || '<div class="builder-empty-canvas">Add an element to begin building.</div>' }} /></div>
          <div className="builder-preview-footer"><span>{flattened.length} element{flattened.length === 1 ? '' : 's'} on canvas</span><button onClick={copy}>{copied ? 'Copied HTML ✓' : 'Copy HTML'}</button></div>
        </section>
      </div>}
      <footer className="builder-footer"><span>JAKpot Design System</span><span>Build freely from elements, not predefined Storybook patterns.</span></footer>
    </main>
  </div>;
}
