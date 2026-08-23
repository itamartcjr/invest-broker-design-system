const fs = require('node:fs');
const path = require('node:path');
const { navigation } = require('../src/navigation');

const dist = path.join(process.cwd(), 'dist');
const documentationRoutes = new Set([
  'index.html',
  'getting-started/coverage.html',
  'getting-started/sources.html',
]);
const required = [
  'index.html', 'styles.css', 'docs.css', 'catalog.js', 'docs.js', '.nojekyll',
  ...navigation.flatMap((group) => group.items.map((item) => item.href)),
];

const missing = required.filter((entry) => !fs.existsSync(path.join(dist, entry)));
if (missing.length) {
  console.error('Arquivos ausentes no build:');
  missing.forEach((entry) => console.error(`- ${entry}`));
  process.exit(1);
}

const htmlFiles = required.filter((entry) => entry.endsWith('.html'));
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

  if (html.includes('data-nav-group="start" open') || html.includes('data-nav-group="app" open') || html.includes('data-nav-group="web" open')) {
    console.error(`Grupo de menu forçado pela página de destino em ${entry}`);
    process.exit(1);
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
    console.error(`A variante page--fluid não deve mais existir: ${entry}`);
    process.exit(1);
  }
}

console.log(`Build válido: ${htmlFiles.length} páginas documentais verificadas.`);
