const fs = require('node:fs');
const path = require('node:path');
const { navigation } = require('../src/navigation');

const dist = path.join(process.cwd(), 'dist');
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

  if (!/<script src="(?:\.\.\/|\.\/)*docs\.js"><\/script>/.test(html)) {
    console.error(`Script persistente da sidebar não encontrado em ${entry}`);
    process.exit(1);
  }

  if (/data-nav-group="[^"]+"\s+open/.test(html)) {
    console.error(`Grupo de menu forçado pela página de destino em ${entry}`);
    process.exit(1);
  }
}

console.log(`Build válido: ${htmlFiles.length} páginas documentais verificadas.`);
