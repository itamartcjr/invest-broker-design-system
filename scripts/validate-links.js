const fs = require('node:fs');
const path = require('node:path');
const { navigation } = require('../src/navigation');

const dist = path.join(process.cwd(), 'dist');
const documentationRoutes = new Set([
  'index.html',
  'brand/index.html',
  'brand/positioning.html',
  'brand/personality.html',
  'brand/experience.html',
  'brand/visual-principles.html',
  'brand/identity.html',
  'brand/theme.html',
  'getting-started/coverage.html',
  'getting-started/responsive.html',
  'getting-started/icons.html',
  'getting-started/sources.html',
]);
const required = [
  'index.html', 'styles.css', 'docs.css', 'theme.css', 'refinement.css', 'color-semantics.css', 'mobile.css', 'catalog.js', 'docs.js', '.nojekyll', 'branding.html',
  'assets/brand/ciimo_cw.svg',
  'assets/brand/ciimo_cb.svg',
  'assets/brand/ii_v.svg',
  'assets/brand/ii_b.svg',
  ...navigation.flatMap((group) => group.items.map((item) => item.href)),
];

const missing = required.filter((entry) => !fs.existsSync(path.join(dist, entry)));
if (missing.length) {
  console.error('Arquivos ausentes no build:');
  missing.forEach((entry) => console.error(`- ${entry}`));
  process.exit(1);
}

const docsCss = fs.readFileSync(path.join(dist, 'docs.css'), 'utf8');
if (!docsCss.includes('cdn.hugeicons.com/font/hgi-stroke-rounded.css')) {
  console.error('Hugeicons Stroke Rounded não está carregado em docs.css.');
  process.exit(1);
}

const themeCss = fs.readFileSync(path.join(dist, 'theme.css'), 'utf8');
for (const contract of ['html[data-theme="light"]', '--bg: #f4f1ea', '--accent: #d4fb00', '.theme-preview--dark', '.theme-preview--light']) {
  if (!themeCss.includes(contract)) {
    console.error(`Contrato de tema ausente em theme.css: ${contract}`);
    process.exit(1);
  }
}

const colorSemanticsCss = fs.readFileSync(path.join(dist, 'color-semantics.css'), 'utf8');
for (const contract of [
  '--accent-content: #d4fb00',
  '--accent-content: #5b6c00',
  '--accent-focus: #5b6c00',
  '.docs-nav__link.active',
  '.input:focus',
  'background: var(--accent)',
  'color: var(--accent-text)',
]) {
  if (!colorSemanticsCss.includes(contract)) {
    console.error(`Contrato semântico de cor ausente: ${contract}`);
    process.exit(1);
  }
}

const refinementCss = fs.readFileSync(path.join(dist, 'refinement.css'), 'utf8');
for (const contract of [
  '--ui-weight: 500',
  '--ui-strong: 600',
  '--data-strong: 700',
  '.sidebar {',
  'background: var(--surface)',
  '.docs-nav__link.active',
  '.specimen,',
  'border-color: transparent',
  '.docs-page > .section',
  'padding: 32px 24px',
]) {
  if (!refinementCss.includes(contract)) {
    console.error(`Contrato de refinamento visual ausente: ${contract}`);
    process.exit(1);
  }
}

const mobileCss = fs.readFileSync(path.join(dist, 'mobile.css'), 'utf8');
for (const contract of [
  '@media (max-width: 760px)',
  'padding-top: 64px',
  'height: 100dvh',
  'grid-template-columns: 1fr',
  '.mini-side',
  'display: none',
  'overflow-x: auto',
  'min-height: 44px',
  '@media (max-width: 480px)',
]) {
  if (!mobileCss.includes(contract)) {
    console.error(`Contrato responsivo ausente em mobile.css: ${contract}`);
    process.exit(1);
  }
}

const docsJs = fs.readFileSync(path.join(dist, 'docs.js'), 'utf8');
if (!docsJs.includes("localStorage.setItem(themeStateKey, theme)")) {
  console.error('Preferência de tema não está persistindo em localStorage.');
  process.exit(1);
}
for (const contract of ["matchMedia('(max-width: 760px)')", "if (mobileMedia.matches) applySidebarState('collapsed')", "event.key === 'Escape'"]) {
  if (!docsJs.includes(contract)) {
    console.error(`Comportamento mobile da navegação ausente: ${contract}`);
    process.exit(1);
  }
}

const htmlFiles = [...new Set(navigation.flatMap((group) => group.items.map((item) => item.href)))];
for (const entry of htmlFiles) {
  const html = fs.readFileSync(path.join(dist, entry), 'utf8');

  if (!html.includes('data-docs-sidebar')) {
    console.error(`Sidebar modular não encontrada em ${entry}`);
    process.exit(1);
  }

  if (!html.includes('data-sidebar="collapsed"')) {
    console.error(`Estado inicial colapsado ausente em ${entry}`);
    process.exit(1);
  }

  if (!html.includes('data-theme="dark"')) {
    console.error(`Tema padrão dark ausente em ${entry}`);
    process.exit(1);
  }

  if (!html.includes('ciimo-theme')) {
    console.error(`Bootstrap de tema sem persistência em ${entry}`);
    process.exit(1);
  }

  for (const stylesheet of ['theme.css', 'refinement.css', 'color-semantics.css', 'mobile.css']) {
    if (!html.includes(stylesheet)) {
      console.error(`Folha ${stylesheet} não encontrada em ${entry}`);
      process.exit(1);
    }
  }

  if (!html.includes('data-theme-toggle')) {
    console.error(`Controle de tema não encontrado em ${entry}`);
    process.exit(1);
  }

  if (!html.includes('hgi-sun-03') || !html.includes('hgi-moon-02')) {
    console.error(`Controle Light/Dark não usa Hugeicons em ${entry}`);
    process.exit(1);
  }

  for (const asset of ['ciimo_cw.svg', 'ciimo_cb.svg', 'ii_v.svg', 'ii_b.svg']) {
    if (!html.includes(asset)) {
      console.error(`Sidebar não usa o SVG oficial ${asset} em ${entry}`);
      process.exit(1);
    }
  }

  if (!html.includes('docs.js')) {
    console.error(`Script persistente da sidebar não encontrado em ${entry}`);
    process.exit(1);
  }

  if (!html.includes('hgi-arrow-right-01')) {
    console.error(`Setas da sidebar não usam Hugeicons em ${entry}`);
    process.exit(1);
  }

  for (const group of navigation) {
    if (html.includes(`data-nav-group="${group.key}" open`)) {
      console.error(`Grupo de menu forçado pela página de destino em ${entry}`);
      process.exit(1);
    }
  }

  const hasDocsPage = html.includes('<main class="page docs-page">');
  if (documentationRoutes.has(entry) && !hasDocsPage) {
    console.error(`Página documental sem isolamento docs-page: ${entry}`);
    process.exit(1);
  }
  if (!documentationRoutes.has(entry) && hasDocsPage) {
    console.error(`App/Web não pode receber estilos de docs-page: ${entry}`);
    process.exit(1);
  }
  if (html.includes('page--fluid')) {
    console.error(`A variante page--fluid não deve existir: ${entry}`);
    process.exit(1);
  }
}

const appFoundations = fs.readFileSync(path.join(dist, 'app', 'index.html'), 'utf8');
if (!appFoundations.includes('CIIMO / aplicativo')) {
  console.error('A identidade CIIMO foi removida ou substituída indevidamente no App.');
  process.exit(1);
}

const brandEssence = fs.readFileSync(path.join(dist, 'brand', 'index.html'), 'utf8');
if (!brandEssence.includes('Seu imóvel deixa de ser apenas uma compra')) {
  console.error('Promessa central da marca não está presente na documentação.');
  process.exit(1);
}

const themePage = fs.readFileSync(path.join(dist, 'brand', 'theme.html'), 'utf8');
for (const rule of ['#000000', '#F4F1EA', '#D4FB00', '#5B6C00', 'accent-content', 'ciimo_cw.svg', 'ciimo_cb.svg', 'ii_v.svg', 'ii_b.svg', 'localStorage']) {
  if (!themePage.includes(rule)) {
    console.error(`Documentação de tema incompleta: ${rule}`);
    process.exit(1);
  }
}

const visualPrinciples = fs.readFileSync(path.join(dist, 'brand', 'visual-principles.html'), 'utf8');
for (const rule of ['Mais silêncio. Mais clareza.', '24 px', '32 px', '400', '500', '600', '700', 'Sem borda', 'Verde só quando importa']) {
  if (!visualPrinciples.includes(rule)) {
    console.error(`Documentação de princípios visuais incompleta: ${rule}`);
    process.exit(1);
  }
}

const responsivePage = fs.readFileSync(path.join(dist, 'getting-started', 'responsive.html'), 'utf8');
for (const rule of ['Mobile primeiro na composição.', '64 px', '100dvh', '16 px nas laterais', '≥ 44 px', '320 px', '760 px']) {
  if (!responsivePage.includes(rule)) {
    console.error(`Documentação responsiva incompleta: ${rule}`);
    process.exit(1);
  }
}

console.log(`Build válido: ${htmlFiles.length} páginas verificadas com Marca, responsividade, contraste Light, princípios visuais, Light/Dark, App, Web e documentação.`);
