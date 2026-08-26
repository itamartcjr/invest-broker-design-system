const fs = require('node:fs');
const path = require('node:path');
const { navigation } = require('../src/navigation');
const { systemAuthority } = require('../src/system-authority');
const { brandFramework } = require('../src/brand/framework-data');
const { brandBook } = require('../src/brand/brand-book');
const { chartCatalog } = require('../src/charts/catalog');
const { chartGroups, chartTypeOrder } = require('../src/charts/groups');
const { renderers } = require('../src/charts/renderers');
const { appChartPreset, webChartPreset } = require('../src/charts/presets');

const root = process.cwd();
const dist = path.join(root, 'dist');
const htmlFiles = [...new Set(navigation.flatMap((group) => group.items.map((item) => item.href)))];
const isProductRoute = (route) => route.startsWith('app/') || route.startsWith('web/');
const documentationRoutes = new Set(htmlFiles.filter((route) => !isProductRoute(route)));

function fail(message) {
  console.error(message);
  process.exit(1);
}

function exists(relativePath) {
  return fs.existsSync(path.join(dist, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(dist, relativePath), 'utf8');
}

function mainClasses(html) {
  const match = html.match(/<main\s+class="([^"]+)"/i);
  return match ? match[1].split(/\s+/).filter(Boolean) : [];
}

function chartTypesIn(html) {
  return [...html.matchAll(/data-chart-type="([^"]+)"/g)].map((match) => match[1]);
}

const required = [
  'index.html', 'design-system/index.html', 'brand/index.html',
  'styles.css', 'docs.css', 'theme.css', 'refinement.css', 'color-semantics.css', 'mobile.css',
  'shell-refinement.css', 'brand-framework.css', 'brand-nav-groups.css', 'design-system-boards.css', 'charts.css',
  'catalog.js', 'docs.js', 'brand-nav.js', '.nojekyll', 'branding.html',
  'assets/brand/ciimo_cw.svg', 'assets/brand/ciimo_cb.svg', 'assets/brand/ii_v.svg', 'assets/brand/ii_b.svg',
  ...htmlFiles,
];

const missing = required.filter((entry) => !exists(entry));
if (missing.length) fail(`Arquivos ausentes no build:\n${missing.map((entry) => `- ${entry}`).join('\n')}`);

if (systemAuthority.documentationReference.role !== 'documentation-framework-only') fail('A referência externa não pode assumir autoridade visual sobre o CIIMO.');
if (!systemAuthority.referenceCanDefine.some((item) => item.includes('shell documental'))) fail('O contrato precisa permitir que a referência oriente o shell documental.');
for (const forbidden of ['cores', 'tipografia', 'motion e easing do produto', 'aparência de componentes', 'comportamento responsivo do produto']) {
  if (!systemAuthority.referenceCannotDefine.includes(forbidden)) fail(`Contrato de autoridade visual incompleto: ${forbidden}`);
}
for (const step of ['Título', 'Conteúdo final da marca', 'Aplicações quando existirem', 'Pendências quando existirem']) {
  if (!systemAuthority.brandPageAnatomy.includes(step)) fail(`Anatomia editorial da Brand incompleta: ${step}`);
}

if (brandFramework.modules.length !== 20) fail(`Brand deve possuir 20 módulos; encontrado: ${brandFramework.modules.length}`);
for (let number = 1; number <= 20; number += 1) {
  const expected = String(number).padStart(2, '0');
  if (!brandFramework.modules.some((module) => module.number === expected)) fail(`Módulo de Brand ausente: ${expected}`);
}
for (const requiredField of ['purpose', 'problem', 'proposition', 'perception', 'positioning', 'relationship', 'differentiationConnects', 'experience', 'pillars', 'promise', 'messages', 'language', 'summaryLines', 'executiveSummary', 'centralQuestion']) {
  if (brandBook[requiredField] == null) fail(`Documento de marca incompleto em brand-book.js: ${requiredField}`);
}

const docsCss = read('docs.css');
for (const contract of ['cdn.hugeicons.com/font/hgi-stroke-rounded.css', '.docs-topbar {', '.docs-sidebar__search', '.docs-backdrop', '--docs-topbar: 64px']) {
  if (!docsCss.includes(contract)) fail(`Contrato do shell documental ausente em docs.css: ${contract}`);
}

const shellCss = read('shell-refinement.css');
for (const contract of ['height: var(--docs-topbar)', '.docs-sidebar__top', '.docs-topbar']) {
  if (!shellCss.includes(contract)) fail(`Alinhamento do shell ausente em shell-refinement.css: ${contract}`);
}

const brandFrameworkCss = read('brand-framework.css');
for (const contract of ['.brand-field-page', '.brand-framework-modules', '.brand-translation-grid', '@media (max-width: 760px)']) {
  if (!brandFrameworkCss.includes(contract)) fail(`Contrato visual da Brand ausente: ${contract}`);
}

for (const sourceFile of ['src/charts/catalog.js', 'src/charts/groups.js', 'src/charts/renderers.js', 'src/charts/presets.js', 'src/charts/pages.js']) {
  if (!fs.existsSync(path.join(root, sourceFile))) fail(`Arquitetura modular de gráficos incompleta: ${sourceFile}`);
}
if (fs.existsSync(path.join(root, 'src/chart-pages.js'))) fail('src/chart-pages.js não pode voltar: gráficos devem permanecer modulares em src/charts/.');

const catalogKeys = Object.keys(chartCatalog);
if (catalogKeys.length !== 25) fail(`Catálogo de gráficos deve possuir exatamente 25 tipos; encontrado: ${catalogKeys.length}.`);
if (chartGroups.length !== 4) fail(`Catálogo deve ser organizado em 4 famílias; encontrado: ${chartGroups.length}.`);
if (chartTypeOrder.length !== 25 || new Set(chartTypeOrder).size !== 25) fail('Os quatro grupos devem cobrir exatamente 25 tipos únicos.');
for (const type of chartTypeOrder) {
  if (!chartCatalog[type]) fail(`Tipo do grupo não existe no catálogo: ${type}`);
  if (typeof renderers[type] !== 'function') fail(`Renderer ausente para o tipo: ${type}`);
  if (!appChartPreset.examples[type]) fail(`Preset App sem exemplo para: ${type}`);
  if (!webChartPreset.examples[type]) fail(`Preset Web sem exemplo para: ${type}`);
}
if (Object.keys(appChartPreset.examples).length !== 25) fail('Preset App deve possuir exatamente 25 exemplos.');
if (Object.keys(webChartPreset.examples).length !== 25) fail('Preset Web deve possuir exatamente 25 exemplos.');

const chartsCss = read('charts.css');
for (const contract of [
  '.chart-grid-shell', 'container-name: chart-grid', 'grid-template-columns: repeat(4',
  'grid-template-columns: repeat(3', 'grid-template-columns: repeat(2', 'grid-template-columns: 1fr',
  '.chart-card', '.chart-svg', '.chart-donut', '.chart-gauge', '.chart-heatmap', '.chart-contribution',
  '@container chart-grid', '@media (max-width: 760px)', 'var(--accent)', 'var(--blue)', 'var(--gold)',
]) {
  if (!chartsCss.includes(contract)) fail(`Contrato de gráficos ausente em charts.css: ${contract}`);
}
if (/grid-column\s*:\s*span/i.test(chartsCss)) fail('Cards de gráfico não podem depender de span: todos devem caber em uma célula do grid.');

const docsJs = read('docs.js');
for (const contract of ["localStorage.setItem(themeStateKey, theme)", "matchMedia('(max-width: 760px)')", '[data-mobile-menu]', '[data-sidebar-close]', '[data-sidebar-backdrop]', '[data-nav-search]', '[data-topbar-title]', "event.key === 'Escape'"]) {
  if (!docsJs.includes(contract)) fail(`Comportamento do shell ausente em docs.js: ${contract}`);
}

for (const entry of htmlFiles) {
  const html = read(entry);
  for (const contract of ['data-docs-sidebar', 'data-docs-topbar', 'data-nav-search', 'data-mobile-menu', 'data-theme-toggle', 'data-sidebar="collapsed"', 'data-theme="dark"', 'ciimo-theme', 'docs.js', 'brand-nav.js', 'hgi-arrow-right-01', 'hgi-search-01']) {
    if (!html.includes(contract)) fail(`Shell incompleto em ${entry}: ${contract}`);
  }
  for (const stylesheet of ['theme.css', 'refinement.css', 'color-semantics.css', 'mobile.css', 'shell-refinement.css', 'brand-framework.css', 'brand-nav-groups.css', 'design-system-boards.css', 'charts.css']) {
    if (!html.includes(stylesheet)) fail(`Folha ${stylesheet} não encontrada em ${entry}`);
  }
  for (const asset of ['ciimo_cw.svg', 'ciimo_cb.svg', 'ii_v.svg', 'ii_b.svg']) {
    if (!html.includes(asset)) fail(`Sidebar não usa o SVG oficial ${asset} em ${entry}`);
  }

  const classes = mainClasses(html);
  const hasDocsPage = classes.includes('page') && classes.includes('docs-page');
  if (documentationRoutes.has(entry) && !hasDocsPage) fail(`Página documental sem isolamento docs-page: ${entry}`);
  if (isProductRoute(entry) && hasDocsPage) fail(`App/Web não pode receber estilos de docs-page: ${entry}`);
  if (/lorem ipsum/i.test(html)) fail(`Texto de exemplo não permitido em ${entry}: Lorem ipsum`);
}

const startGroup = navigation.find((group) => group.key === 'start');
const brandGroup = navigation.find((group) => group.key === 'brand');
const designGroup = navigation.find((group) => group.key === 'design-system');
if (!startGroup || !brandGroup || !designGroup) fail('Navegação deve separar CIIMO, Brand e Design System.');
if (navigation.some((group) => group.key === 'app' || group.key === 'web')) fail('App e Web devem existir dentro de Design System, não como grupos principais.');
for (const route of ['design-system/index.html', 'app/index.html', 'web/index.html', 'app/charts.html', 'web/charts.html']) {
  if (!designGroup.items.some((item) => item.href === route)) fail(`Página fora do Design System: ${route}`);
}

const home = read('index.html');
for (const rule of ['Abrir Brand', 'Abrir Design System', './brand/index.html', './design-system/index.html']) {
  if (!home.includes(rule)) fail(`Página inicial não separa Brand e Design System: ${rule}`);
}

const designOverview = read('design-system/index.html');
for (const rule of ['Design System', 'App e Web.', '../app/index.html', '../web/index.html']) {
  if (!designOverview.includes(rule)) fail(`Overview do Design System incompleto: ${rule}`);
}

const brandOverview = read('brand/index.html');
for (const rule of [brandBook.essence, brandBook.promise, brandBook.positioning.primary, 'Cliente, corretor e imobiliária.', 'Conteúdo da marca.']) {
  if (!brandOverview.includes(rule)) fail(`Brand Book incompleto: ${rule}`);
}

const brandMetaPhrases = [
  '01 / Para que serve', 'Decisão que esta página orienta', '02 / Evidência', 'De onde esta decisão vem',
  '03 / Decisão CIIMO', 'Esta é a resposta específica da CIIMO', 'não é texto de exemplo do framework de referência',
  '05 / Como executar', '06 / Governança', 'Pergunta de construção',
];
for (const phrase of brandMetaPhrases) {
  if (brandOverview.includes(phrase)) fail(`Texto de framework não permitido no Brand Book: ${phrase}`);
}

if (brandGroup.items.length < 70) fail(`Cobertura de Brand insuficiente: ${brandGroup.items.length} páginas.`);
for (const module of brandFramework.modules) {
  for (const entry of module.items) {
    const navItem = brandGroup.items.find((item) => item.key === entry.key);
    if (!navItem) fail(`Item de Brand fora da navegação: ${entry.number} ${entry.title}`);
    const html = read(navItem.href);
    if (!html.includes(entry.title)) fail(`Título da Brand ausente: ${entry.number} ${entry.title}`);
    for (const phrase of brandMetaPhrases) {
      if (html.includes(phrase)) fail(`Texto de framework não permitido na Brand (${entry.number} ${entry.title}): ${phrase}`);
    }
    if (entry.status === 'pending' && !html.includes('A definir')) fail(`Pendência não está clara em ${entry.number} ${entry.title}`);
    if (entry.status !== 'pending' && !html.includes('Diretriz')) fail(`Diretriz da marca ausente em ${entry.number} ${entry.title}`);
  }
}

for (const route of ['foundations/grid.html', 'foundations/breakpoints.html', 'foundations/radius.html', 'foundations/borders.html', 'foundations/elevation.html', 'components/buttons.html', 'components/fields.html', 'components/data-display.html', 'components/feedback-loading.html', 'components/navigation.html', 'patterns/investment-reading.html', 'patterns/filter-compare.html', 'patterns/continuity.html', 'templates/index.html', 'examples/audience-modes.html']) {
  if (!designGroup.items.some((item) => item.href === route)) fail(`Página do Design System fora da navegação: ${route}`);
}

for (const oldBrandRoute of ['brand/positioning.html', 'brand/personality.html', 'brand/experience.html', 'brand/identity.html']) {
  const html = read(oldBrandRoute);
  if (!html.includes('url=./index.html')) fail(`Rota antiga da Brand deve redirecionar para o Brand Book: ${oldBrandRoute}`);
}

for (const [route, heading] of [['app/charts.html', 'Gráficos no App.'], ['web/charts.html', 'Gráficos no Web.']]) {
  const html = read(route);
  const types = chartTypesIn(html);
  const uniqueTypes = new Set(types);
  if (!html.includes(heading)) fail(`Título de gráficos ausente em ${route}`);
  if (!html.includes('chart-grid-shell') || !html.includes('chart-board')) fail(`Grid modular ausente em ${route}`);
  if (types.length !== 25 || uniqueTypes.size !== 25) fail(`${route} deve renderizar exatamente os 25 tipos uma vez; encontrado: ${types.length}/${uniqueTypes.size}.`);
  for (const type of chartTypeOrder) {
    if (!uniqueTypes.has(type)) fail(`${route} não renderiza o tipo: ${type}`);
  }
  for (const contract of ['role="img"', 'chart-legend', 'Grid', '4', '3', '2', '1']) {
    if (!html.includes(contract)) fail(`Página de gráficos incompleta em ${route}: ${contract}`);
  }
}

console.log('Build válido: Brand editorial, Design System separado e catálogo de 25 gráficos em grid responsivo 4 → 3 → 2 → 1 verificado.');
