const fs = require('node:fs');
const path = require('node:path');
const { renderSidebar } = require('../src/site-components/sidebar');
const { documentationPages } = require('../src/site-pages');
const { themePage } = require('../src/theme-page');
const { visualPrinciplesPage } = require('../src/visual-principles-page');

const root = process.cwd();
const dist = path.join(root, 'dist');

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function write(file, content) { ensureDir(path.dirname(file)); fs.writeFileSync(file, content); }
function copy(source, target) { ensureDir(path.dirname(target)); fs.copyFileSync(source, target); }
function copyDir(source, target) {
  if (!fs.existsSync(source)) return;
  ensureDir(target);
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else copy(from, to);
  }
}
function prefixFor(route) {
  const depth = route.split('/').length - 1;
  return depth > 0 ? '../'.repeat(depth) : './';
}
function themeBootScript() {
  return `<script>(function(){try{var t=localStorage.getItem('ciimo-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}})();</script>`;
}
function styleLinks(prefix) {
  return `<link rel="stylesheet" href="${prefix}styles.css"><link rel="stylesheet" href="${prefix}docs.css"><link rel="stylesheet" href="${prefix}theme.css"><link rel="stylesheet" href="${prefix}refinement.css">`;
}
function injectDocumentationScripts(html, prefix) {
  const scripts = `<script src="${prefix}catalog.js"></script><script src="${prefix}docs.js"></script>`;
  return html
    .replace(/<script src="[^"]*catalog\.js"><\/script>/g, '')
    .replace(/<script src="[^"]*docs\.js"><\/script>/g, '')
    .replace(/<\/body>/, `${scripts}</body>`);
}
function transformExistingPage(html, route) {
  const prefix = prefixFor(route);
  let output = html;
  output = output.replace(/<html([^>]*)>/, '<html$1 data-sidebar="collapsed" data-theme="dark">');
  output = output.replace(/<head>/, `<head>${themeBootScript()}`);
  output = output.replace(/<aside class="sidebar">[\s\S]*?<\/aside>/, renderSidebar({ currentPath: route, prefix }));
  output = output.replace(/<link rel="stylesheet" href="[^"]*styles\.css">/, `${styleLinks(prefix)}<link rel="icon" href="${prefix}assets/brand/favicon.svg">`);
  return injectDocumentationScripts(output, prefix);
}
function renderDocumentationPage(route, page) {
  const prefix = prefixFor(route);
  return `<!doctype html><html lang="pt-BR" data-sidebar="collapsed" data-theme="dark"><head>${themeBootScript()}<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${page.title}</title><meta name="description" content="Documentação do CIIMO Design System"><link rel="icon" href="${prefix}assets/brand/favicon.svg">${styleLinks(prefix)}</head><body class="native"><div class="catalog">${renderSidebar({ currentPath: route, prefix })}${page.html}</div><script src="${prefix}catalog.js"></script><script src="${prefix}docs.js"></script></body></html>`;
}
function redirectDocument(target, title) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0; url=${target}"><title>${title}</title></head><body><p>Esta página mudou. <a href="${target}">Continuar</a>.</p></body></html>`;
}

ensureDir(dist);
copy(path.join(root, 'styles.css'), path.join(dist, 'styles.css'));
copy(path.join(root, 'catalog.js'), path.join(dist, 'catalog.js'));
copy(path.join(root, 'src', 'docs.css'), path.join(dist, 'docs.css'));
copy(path.join(root, 'src', 'theme.css'), path.join(dist, 'theme.css'));
copy(path.join(root, 'src', 'refinement.css'), path.join(dist, 'refinement.css'));
copy(path.join(root, 'src', 'docs.js'), path.join(dist, 'docs.js'));
copyDir(path.join(root, 'assets', 'brand'), path.join(dist, 'assets', 'brand'));

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

write(path.join(dist, themePage.route), renderDocumentationPage(themePage.route, themePage.page));
write(path.join(dist, visualPrinciplesPage.route), renderDocumentationPage(visualPrinciplesPage.route, visualPrinciplesPage.page));
write(path.join(dist, 'branding.html'), redirectDocument('./brand/identity.html', 'Identidade visual · CIIMO Design System'));
write(path.join(dist, '.nojekyll'), '');
