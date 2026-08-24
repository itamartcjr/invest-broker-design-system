const fs = require('node:fs');
const path = require('node:path');
const { navigation } = require('../src/navigation');
const { systemAuthority } = require('../src/system-authority');
const { brandFramework } = require('../src/brand/framework-data');
const { brandBook } = require('../src/brand/brand-book');

const dist = path.join(process.cwd(), 'dist');
const productGroups = new Set(['app', 'web']);
const documentationRoutes = new Set(
  navigation
    .filter((group) => !productGroups.has(group.key))
    .flatMap((group) => group.items.map((item) => item.href))
);
const htmlFiles = [...new Set(navigation.flatMap((group) => group.items.map((item) => item.href)))];
const required = [
  'index.html',
  'styles.css',
  'docs.css',
  'theme.css',
  'refinement.css',
  'color-semantics.css',
  'mobile.css',
  'shell-refinement.css',
  'brand-framework.css',
  'catalog.js',
  'docs.js',
  'brand-nav.js',
  '.nojekyll',
  'branding.html',
  'assets/brand/ciimo_cw.svg',
  'assets/brand/ciimo_cb.svg',
  'assets/brand/ii_v.svg',
  'assets/brand/ii_b.svg',
  ...htmlFiles,
];

function fail(message) {
  console.error(message);
  process.exit(1);
}

function read(relativePath) {
  return fs.readFileSync(path.join(dist, relativePath), 'utf8');
}

function mainClasses(html) {
  const match = html.match(/<main\s+class="([^"]+)"/i);
  return match ? match[1].split(/\s+/).filter(Boolean) : [];
}

if (systemAuthority.documentationReference.role !== 'documentation-framework-only') {
  fail('A referência externa não pode assumir autoridade visual sobre o CIIMO.');
}
if (!systemAuthority.referenceCanDefine.some((item) => item.includes('shell documental'))) {
  fail('O contrato precisa permitir que a referência oriente o shell documental.');
}
for (const forbidden of ['cores', 'tipografia', 'motion e easing do produto', 'aparência de componentes', 'comportamento responsivo do produto']) {
  if (!systemAuthority.referenceCannotDefine.includes(forbidden)) fail(`Contrato de autoridade visual incompleto: ${forbidden}`);
}
for (const step of ['Título', 'Descrição', 'Para que serve', 'Exemplo real', 'Todas as variações', 'Informações técnicas', 'Referências']) {
  if (!systemAuthority.pageAnatomy.includes(step)) fail(`Anatomia documental obrigatória ausente: ${step}`);
}

if (brandFramework.modules.length !== 20) fail(`Brand Framework deve possuir 20 módulos; encontrado: ${brandFramework.modules.length}`);
for (let number = 1; number <= 20; number += 1) {
  const expected = String(number).padStart(2, '0');
  if (!brandFramework.modules.some((module) => module.number === expected)) fail(`Módulo de Brand ausente: ${expected}`);
}
for (const requiredField of ['purpose', 'problem', 'proposition', 'perception', 'positioning', 'relationship', 'differentiationConnects', 'experience', 'pillars', 'promise', 'messages', 'language', 'summaryLines', 'executiveSummary', 'centralQuestion']) {
  if (brandBook[requiredField] == null) fail(`Documento de marca incompleto em brand-book.js: ${requiredField}`);
}
if (!brandBook.promise.includes('acompanhado como investimento')) fail('Promessa central da CIIMO não está preservada no brand-book.js.');

const missing = required.filter((entry) => !fs.existsSync(path.join(dist, entry)));
if (missing.length) fail(`Arquivos ausentes no build:\n${missing.map((entry) => `- ${entry}`).join('\n')}`);

const docsCss = read('docs.css');
for (const contract of ['cdn.hugeicons.com/font/hgi-stroke-rounded.css', '.docs-topbar {', '.docs-sidebar__search', '.docs-backdrop', '--docs-topbar: 64px']) {
  if (!docsCss.includes(contract)) fail(`Contrato do shell documental ausente em docs.css: ${contract}`);
}

const shellCss = read('shell-refinement.css');
for (const contract of ['height: var(--docs-topbar)', '.docs-sidebar__top', '.docs-topbar']) {
  if (!shellCss.includes(contract)) fail(`Alinhamento do shell ausente em shell-refinement.css: ${contract}`);
}

const brandFrameworkCss = read('brand-framework.css');
for (const contract of ['.brand-field-page', '.brand-field-status--approved', '.brand-framework-modules', '.brand-translation-grid', '.brand-color-board', '.brand-reading-flow', '@media (max-width: 760px)']) {
  if (!brandFrameworkCss.includes(contract)) fail(`Contrato visual do Brand Framework ausente: ${contract}`);
}

const themeCss = read('theme.css');
for (const contract of ['html[data-theme="light"]', '--bg: #f4f1ea', '--accent: #d4fb00', '.theme-preview--dark', '.theme-preview--light']) {
  if (!themeCss.includes(contract)) fail(`Contrato de tema ausente em theme.css: ${contract}`);
}

const colorSemanticsCss = read('color-semantics.css');
for (const contract of ['--accent-content: #d4fb00', '--accent-content: #5b6c00', '--accent-focus: #5b6c00', '.docs-nav__link.active', '.input:focus', 'background: var(--accent)', 'color: var(--accent-text)']) {
  if (!colorSemanticsCss.includes(contract)) fail(`Contrato semântico de cor ausente: ${contract}`);
}

const mobileCss = read('mobile.css');
for (const contract of ['@media (max-width: 760px)', '.docs-topbar', '.docs-sidebar', 'transform: translateX(-102%)', '.docs-backdrop', 'height: 100dvh', 'grid-template-columns: 1fr', '.mini-side', 'display: none', 'overflow-x: auto', 'min-height: 44px']) {
  if (!mobileCss.includes(contract)) fail(`Contrato responsivo ausente em mobile.css: ${contract}`);
}

const docsJs = read('docs.js');
for (const contract of ["localStorage.setItem(themeStateKey, theme)", "matchMedia('(max-width: 760px)')", '[data-mobile-menu]', '[data-sidebar-close]', '[data-sidebar-backdrop]', '[data-nav-search]', '[data-topbar-title]', "event.key === 'Escape'"]) {
  if (!docsJs.includes(contract)) fail(`Comportamento do shell ausente em docs.js: ${contract}`);
}

for (const entry of htmlFiles) {
  const html = read(entry);
  for (const contract of ['data-docs-sidebar', 'data-docs-topbar', 'data-nav-search', 'data-mobile-menu', 'data-theme-toggle', 'data-sidebar="collapsed"', 'data-theme="dark"', 'ciimo-theme', 'docs.js', 'brand-nav.js', 'hgi-arrow-right-01', 'hgi-search-01', 'hgi-sun-03', 'hgi-moon-02']) {
    if (!html.includes(contract)) fail(`Shell incompleto em ${entry}: ${contract}`);
  }
  for (const stylesheet of ['theme.css', 'refinement.css', 'color-semantics.css', 'mobile.css', 'shell-refinement.css', 'brand-framework.css']) {
    if (!html.includes(stylesheet)) fail(`Folha ${stylesheet} não encontrada em ${entry}`);
  }
  for (const asset of ['ciimo_cw.svg', 'ciimo_cb.svg', 'ii_v.svg', 'ii_b.svg']) {
    if (!html.includes(asset)) fail(`Sidebar não usa o SVG oficial ${asset} em ${entry}`);
  }
  for (const group of navigation) {
    if (html.includes(`data-nav-group="${group.key}" open`)) fail(`Grupo de menu forçado pela página de destino em ${entry}`);
  }

  const classes = mainClasses(html);
  const hasDocsPage = classes.includes('page') && classes.includes('docs-page');
  if (documentationRoutes.has(entry) && !hasDocsPage) fail(`Página documental sem isolamento docs-page: ${entry}`);
  if (!documentationRoutes.has(entry) && hasDocsPage) fail(`App/Web não pode receber estilos de docs-page: ${entry}`);
  if (html.includes('page--fluid')) fail(`A variante page--fluid não deve existir: ${entry}`);
  if (/lorem ipsum/i.test(html)) fail(`Texto de exemplo não permitido em ${entry}: Lorem ipsum`);
}

const brandOverview = read('brand/index.html');
for (const rule of ['O documento inteiro virou sistema.', brandBook.promise, 'Brand Framework', 'Pendências visíveis']) {
  if (!brandOverview.includes(rule)) fail(`Overview da Brand incompleto: ${rule}`);
}

const brandRoutes = navigation.find((group) => group.key === 'brand')?.items || [];
if (brandRoutes.length < 40) fail(`Cobertura de Brand insuficiente: ${brandRoutes.length} páginas no menu.`);
for (const module of brandFramework.modules) {
  for (const entry of module.items) {
    const navItem = brandRoutes.find((item) => item.key === entry.key);
    if (!navItem) fail(`Item de Brand fora da navegação: ${entry.number} ${entry.title}`);
    const html = read(navItem.href);
    for (const contract of ['Para que serve', 'Evidência', 'Decisão CIIMO', 'Como executar', 'Governança']) {
      if (!html.includes(contract)) fail(`Página de Brand incompleta (${entry.number} ${entry.title}): ${contract}`);
    }
    if (entry.status === 'pending' && !html.includes('Pendente')) fail(`Pendência não está visível em ${entry.number} ${entry.title}`);
  }
}

const foundationBrand = read('foundations/brand-principles.html');
for (const rule of ['A marca precisa ser percebida antes de ser explicada.', 'Carteira viva, não cadastro parado', brandBook.centralQuestion]) {
  if (!foundationBrand.includes(rule)) fail(`Tradução Brand → Design System incompleta: ${rule}`);
}

const colorPage = read('foundations/colors.html');
for (const rule of ['#D4FB00', '#5B6C00', 'Marca ≠ cor de texto']) {
  if (!colorPage.includes(rule)) fail(`Foundation Colors incompleto: ${rule}`);
}

const motionPage = read('foundations/motion.html');
for (const rule of ['180ms ease', '1.35s infinite', 'Motion do produto']) {
  if (!motionPage.includes(rule)) fail(`Foundation Motion incompleto: ${rule}`);
}

const tokenPages = ['tokens/primitive.html', 'tokens/semantic.html', 'tokens/component.html'];
for (const route of tokenPages) {
  const html = read(route);
  if (!html.includes('CIIMO / tokens')) fail(`Página de tokens sem contexto CIIMO: ${route}`);
}

const appFoundations = read('app/index.html');
if (!appFoundations.includes('CIIMO / aplicativo')) fail('A identidade CIIMO foi removida ou substituída indevidamente no App.');

const themePage = read('brand/theme.html');
for (const rule of ['#000000', '#F4F1EA', '#D4FB00', '#5B6C00', 'accent-content', 'ciimo_cw.svg', 'ciimo_cb.svg', 'ii_v.svg', 'ii_b.svg', 'localStorage']) {
  if (!themePage.includes(rule)) fail(`Documentação de tema incompleta: ${rule}`);
}

const responsivePage = read('getting-started/responsive.html');
for (const rule of ['Mobile primeiro na composição.', 'Topbar fixa, sidebar como drawer', '64 px', '292 px', '16 px nas laterais', '≥ 44 px', '320 px', '760 px']) {
  if (!responsivePage.includes(rule)) fail(`Documentação responsiva incompleta: ${rule}`);
}

console.log(`Build válido: ${htmlFiles.length} páginas navegáveis, ${brandFramework.modules.length} módulos de Brand e ${brandRoutes.length - 1} itens de marca verificados com identidade CIIMO.`);
