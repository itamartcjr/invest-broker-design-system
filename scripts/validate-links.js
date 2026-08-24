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
  'brand-nav-groups.css',
  'design-system-boards.css',
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

function requireStrings(route, strings, label = route) {
  const html = read(route);
  for (const value of strings) {
    if (!html.includes(value)) fail(`${label} incompleto: ${value}`);
  }
  return html;
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

const expectedBrandGroups = ['Foundation', 'Language & Narrative', 'Visual Identity', 'Experience', 'AI & Governance'];
if (brandFramework.modules.length !== 20) fail(`Brand Framework deve possuir 20 módulos; encontrado: ${brandFramework.modules.length}`);
for (const group of expectedBrandGroups) {
  if (!brandFramework.groups.includes(group)) fail(`Grupo obrigatório da Brand ausente: ${group}`);
}
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

const brandNavGroupsCss = read('brand-nav-groups.css');
for (const contract of ['.docs-nav__framework-group', '.docs-nav__framework-label']) {
  if (!brandNavGroupsCss.includes(contract)) fail(`Hierarquia visual da Brand ausente: ${contract}`);
}

const brandFrameworkCss = read('brand-framework.css');
for (const contract of ['.brand-field-page', '.brand-field-status--approved', '.brand-framework-modules', '.brand-translation-grid', '.brand-color-board', '.brand-reading-flow', '@media (max-width: 760px)']) {
  if (!brandFrameworkCss.includes(contract)) fail(`Contrato visual do Brand Framework ausente: ${contract}`);
}

const boardsCss = read('design-system-boards.css');
for (const contract of ['.grid-viewport', '.breakpoint-line', '.radius-gallery', '.elevation-stack', '.component-anatomy', '.template-stack']) {
  if (!boardsCss.includes(contract)) fail(`Prancha visual do Design System ausente: ${contract}`);
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

const brandNavJs = read('brand-nav.js');
for (const contract of ['[data-framework-group]', 'dataset.moduleGroup', 'syncFrameworkGroups']) {
  if (!brandNavJs.includes(contract)) fail(`Busca/hierarquia da Brand incompleta em brand-nav.js: ${contract}`);
}

for (const entry of htmlFiles) {
  const html = read(entry);
  for (const contract of ['data-docs-sidebar', 'data-docs-topbar', 'data-nav-search', 'data-mobile-menu', 'data-theme-toggle', 'data-sidebar="collapsed"', 'data-theme="dark"', 'ciimo-theme', 'docs.js', 'brand-nav.js', 'hgi-arrow-right-01', 'hgi-search-01', 'hgi-sun-03', 'hgi-moon-02']) {
    if (!html.includes(contract)) fail(`Shell incompleto em ${entry}: ${contract}`);
  }
  for (const stylesheet of ['theme.css', 'refinement.css', 'color-semantics.css', 'mobile.css', 'shell-refinement.css', 'brand-framework.css', 'brand-nav-groups.css', 'design-system-boards.css']) {
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

const brandOverview = requireStrings('brand/index.html', ['O documento inteiro virou sistema.', brandBook.promise, 'Brand Framework', 'Pendências visíveis'], 'Overview da Brand');
for (const group of expectedBrandGroups) {
  if (!brandOverview.includes(group)) fail(`Grupo da Brand não aparece no Overview: ${group}`);
}

const brandGroup = navigation.find((group) => group.key === 'brand');
const brandRoutes = brandGroup?.items || [];
if (brandRoutes.length < 70) fail(`Cobertura de Brand insuficiente: ${brandRoutes.length} páginas no menu.`);
if ((brandGroup?.modules || []).length !== 20) fail('Sidebar da Brand precisa expor os 20 módulos do framework.');
for (const module of brandFramework.modules) {
  const navModule = brandGroup.modules.find((entry) => entry.key === module.key);
  if (!navModule || navModule.group !== module.group) fail(`Módulo/grupo da Brand não está sincronizado: ${module.number} ${module.title}`);
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

requireStrings('foundations/brand-principles.html', ['A marca precisa ser percebida antes de ser explicada.', 'Carteira viva, não cadastro parado', brandBook.centralQuestion], 'Tradução Brand → Design System');
requireStrings('foundations/colors.html', ['#D4FB00', '#5B6C00', 'Marca ≠ cor de texto'], 'Foundation Colors');
requireStrings('foundations/typography.html', ['Kanit', 'Inter / system-ui', '400', '500', '600', '700'], 'Foundation Typography');
requireStrings('foundations/spacing-layout.html', ['6 · 10 · 16 · 24 · 32', '24 para seção. 32 para macro.', '64 px'], 'Foundation Spacing & Layout');
requireStrings('foundations/grid.html', ['Grid contextual, não uma malha inventada.', 'min(1600px, 100%)', 'Uma coluna por padrão'], 'Foundation Grid');
requireStrings('foundations/breakpoints.html', ['760px', '680 / 860 / 980 são locais', 'Documentar a mudança junto do número'], 'Foundation Breakpoints');
requireStrings('foundations/radius.html', ['14 · 16 · 24 · pill', 'Não usar radius para criar hierarquia sozinho'], 'Foundation Radius');
requireStrings('foundations/borders.html', ['Borda só quando separa ou comunica estado.', 'Card não recebe borda por hábito'], 'Foundation Borders');
requireStrings('foundations/elevation.html', ['Profundidade sem sombra como regra.', 'shadow = none'], 'Foundation Elevation');
requireStrings('foundations/motion.html', ['180ms ease', '1.35s infinite', 'Motion do produto'], 'Foundation Motion');

for (const route of ['tokens/primitive.html', 'tokens/semantic.html', 'tokens/component.html']) {
  const html = read(route);
  if (!html.includes('CIIMO / tokens')) fail(`Página de tokens sem contexto CIIMO: ${route}`);
}

requireStrings('components/buttons.html', ['Ação clara, hierarquia curta.', 'Comparar carteira', 'Disabled'], 'Component Buttons');
requireStrings('components/fields.html', ['Entrada de dados precisa ser previsível.', 'Input, Select e Textarea', 'Termo técnico precisa de contexto'], 'Component Fields');
requireStrings('components/data-display.html', ['Dados precisam contar uma história curta.', 'Sem base suficiente, indisponibilize'], 'Component Data Display');
requireStrings('components/feedback-loading.html', ['Feedback explica estado sem dramatizar.', 'Sem comparáveis suficientes'], 'Component Feedback');
requireStrings('components/navigation.html', ['Orientação sem roubar atenção do patrimônio.', 'Topbar + drawer', '64px'], 'Component Navigation');
requireStrings('patterns/investment-reading.html', ['Patrimônio → evolução → comparação → orientação.', 'Sem base suficiente'], 'Pattern Leitura de investimento');
requireStrings('patterns/filter-compare.html', ['Filtrar para comparar melhor.', 'Desabilitar é melhor que inventar'], 'Pattern Filter & Compare');
requireStrings('patterns/continuity.html', ['A venda inicia uma rotina, não encerra uma relação.', 'Mensal, trimestral, semestral ou por evento'], 'Pattern Acompanhamento contínuo');
requireStrings('templates/index.html', ['Estruturas reais para novas telas.', 'Visão de carteira', 'Detalhe do imóvel como ativo', 'Inteligência territorial', 'Modo de leitura por público'], 'Templates');
requireStrings('examples/audience-modes.html', ['Uma marca, três leituras.', 'Seu patrimônio imobiliário explicado de forma simples', 'Leitura patrimonial para orientar a conversa', 'Apresentação executiva da operação acompanhada'], 'Examples');

const appFoundations = read('app/index.html');
if (!appFoundations.includes('CIIMO / aplicativo')) fail('A identidade CIIMO foi removida ou substituída indevidamente no App.');

requireStrings('brand/theme.html', ['#000000', '#F4F1EA', '#D4FB00', '#5B6C00', 'accent-content', 'ciimo_cw.svg', 'ciimo_cb.svg', 'ii_v.svg', 'ii_b.svg', 'localStorage'], 'Documentação de tema');
requireStrings('getting-started/responsive.html', ['Mobile primeiro na composição.', 'Topbar fixa, sidebar como drawer', '64 px', '292 px', '16 px nas laterais', '≥ 44 px', '320 px', '760 px'], 'Documentação responsiva');

console.log(`Build válido: ${htmlFiles.length} páginas navegáveis, ${brandFramework.modules.length} módulos e ${brandRoutes.length - 1} itens de Brand, Foundations, Tokens, Components, Patterns, Templates, Examples, App e Web verificados com identidade CIIMO.`);
