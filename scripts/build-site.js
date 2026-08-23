const fs = require('node:fs');
const path = require('node:path');
const { renderSidebar } = require('../src/site-components/sidebar');
const { documentationPages } = require('../src/site-pages');

const root = process.cwd();
const dist = path.join(root, 'dist');

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function write(file, content) { ensureDir(path.dirname(file)); fs.writeFileSync(file, content); }
function copy(source, target) { ensureDir(path.dirname(target)); fs.copyFileSync(source, target); }
function prefixFor(route) {
  const depth = route.split('/').length - 1;
  return depth > 0 ? '../'.repeat(depth) : './';
}
function replaceBrand(html) {
  return html.replace(/CIIMO/g, 'Invest Broker');
}
function transformExistingPage(html, route) {
  const prefix = prefixFor(route);
  let output = replaceBrand(html);
  output = output.replace(/<html([^>]*)>/, '<html$1 data-sidebar="collapsed">');
  output = output.replace(/<aside class="sidebar">[\s\S]*?<\/aside>/, renderSidebar({ currentPath: route, prefix }));
  output = output.replace(/<link rel="stylesheet" href="[^"]*styles\.css">/, `<link rel="stylesheet" href="${prefix}styles.css"><link rel="stylesheet" href="${prefix}docs.css">`);
  output = output.replace(/<script src="[^"]*catalog\.js"><\/script>/, `<script src="${prefix}catalog.js"></script><script src="${prefix}docs.js"></script>`);
  output = output.replace(/<title>[^<]*<\/title>/, (match) => match.replace('CIIMO', 'Invest Broker'));
  return output;
}
function renderDocumentationPage(route, page) {
  const prefix = prefixFor(route);
  return `<!doctype html><html lang="pt-BR" data-sidebar="collapsed"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${page.title}</title><meta name="description" content="Documentação do Invest Broker Design System"><link rel="stylesheet" href="${prefix}styles.css"><link rel="stylesheet" href="${prefix}docs.css"></head><body class="native"><div class="catalog">${renderSidebar({ currentPath: route, prefix })}${page.html}</div><script src="${prefix}catalog.js"></script><script src="${prefix}docs.js"></script></body></html>`;
}

ensureDir(dist);
copy(path.join(root, 'styles.css'), path.join(dist, 'styles.css'));
copy(path.join(root, 'catalog.js'), path.join(dist, 'catalog.js'));
copy(path.join(root, 'src', 'docs.css'), path.join(dist, 'docs.css'));
copy(path.join(root, 'src', 'docs.js'), path.join(dist, 'docs.js'));

for (const area of ['app', 'web']) {
  const sourceDir = path.join(root, area);
  for (const file of fs.readdirSync(sourceDir).filter((name) => name.endsWith('.html'))) {
    const route = `${area}/${file}`;
    const source = fs.readFileSync(path.join(sourceDir, file), 'utf8');
    write(path.join(dist, route), transformExistingPage(source, route));
  }
}

for (const [route, page] of Object.entries(documentationPages)) {
  write(path.join(dist, route), renderDocumentationPage(route, page));
}

write(path.join(dist, '.nojekyll'), '');
