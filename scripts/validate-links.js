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
  'brand/identity.html',
  'getting-started/coverage.html',
  'getting-started/icons.html',
  'getting-started/sources.html',
]);
const required = [
  'index.html', 'styles.css', 'docs.css', 'catalog.js', 'docs.js', '.nojekyll', 'branding.html',
  'assets/brand/ciimo-primary-dark.svg',
  'assets/brand/ciimo-primary-light.svg',
  'assets/brand/ciimo-symbol-lime.svg',
  'assets/brand/favicon.svg',
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

console.log(`Build válido: ${htmlFiles.length} páginas verificadas, incluindo Marca, App, Web e documentação.`);
