const fs = require('node:fs');
const path = require('node:path');
const { renderSidebar } = require('../src/site-components/sidebar');
const { renderTopbar } = require('../src/site-components/topbar');
const { documentationPages } = require('../src/all-pages');
const { themePage } = require('../src/theme-page');
const { visualPrinciplesPage } = require('../src/visual-principles-page');
const { responsivePage } = require('../src/responsive-page');
const { howToUsePage } = require('../src/how-to-use-page');

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
  return `<link rel="stylesheet" href="${prefix}styles.css"><link rel="stylesheet" href="${prefix}docs.css"><link rel="stylesheet" href="${prefix}theme.css"><link rel="stylesheet" href="${prefix}refinement.css"><link rel="stylesheet" href="${prefix}color-semantics.css"><link rel="stylesheet" href="${prefix}mobile.css"><link rel="stylesheet" href="${prefix}shell-refinement.css"><link rel="stylesheet" href="${prefix}brand-framework.css"><link rel="stylesheet" href="${prefix}brand-nav-groups.css"><link rel="stylesheet" href="${prefix}design-system-boards.css"><link rel="stylesheet" href="${prefix}charts.css">`;
}
function shellChrome(route, prefix) {
  return `${renderSidebar({ currentPath: route, prefix })}<div class="docs-backdrop" data-sidebar-backdrop aria-hidden="true"></div>${renderTopbar({ currentPath: route })}`;
}
function injectDocumentationScripts(html, prefix) {
  const scripts = `<script src="${prefix}catalog.js"></script><script src="${prefix}docs.js"></script><script src="${prefix}brand-nav.js"></script>`;
  return html
    .replace(/<script src="[^"]*catalog\.js"><\/script>/g, '')
    .replace(/<script src="[^"]*docs\.js"><\/script>/g, '')
    .replace(/<script src="[^"]*brand-nav\.js"><\/script>/g, '')
    .replace(/<\/body>/, `${scripts}</body>`);
}
function transformExistingPage(html, route) {
  const prefix = prefixFor(route);
  let output = html;
  output = output.replace(/<html([^>]*)>/, '<html$1 data-sidebar="collapsed" data-theme="dark">');
  output = output.replace(/<head>/, `<head>${themeBootScript()}`);
  output = output.replace(/<aside class="sidebar">[\s\S]*?<\/aside>/, shellChrome(route, prefix));
  output = output.replace(/<link rel="stylesheet" href="[^"]*styles\.css">/, `${styleLinks(prefix)}<link rel="icon" href="${prefix}assets/brand/favicon.svg">`);
  return injectDocumentationScripts(output, prefix);
}
function renderDocumentationPage(route, page) {
  const prefix = prefixFor(route);
  return `<!doctype html><html lang="pt-BR" data-sidebar="collapsed" data-theme="dark"><head>${themeBootScript()}<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>${page.title}</title><meta name="description" content="Documentação CIIMO"><link rel="icon" href="${prefix}assets/brand/favicon.svg">${styleLinks(prefix)}</head><body class="native"><div class="catalog">${shellChrome(route, prefix)}${page.html}</div><script src="${prefix}catalog.js"></script><script src="${prefix}docs.js"></script><script src="${prefix}brand-nav.js"></script></body></html>`;
}
function redirectDocument(target, title) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0; url=${target}"><title>${title}</title></head><body><p>Esta página mudou. <a href="${target}">Continuar</a>.</p></body></html>`;
}

ensureDir(dist);
copy(path.join(root, 'styles.css'), path.join(dist, 'styles.css'));
copy(path.join(root, 'catalog.js'), path.join(dist, 'catalog.js'));
for (const file of ['docs.css', 'theme.css', 'refinement.css', 'color-semantics.css', 'mobile.css', 'shell-refinement.css', 'brand-framework.css', 'brand-nav-groups.css', 'design-system-boards.css', 'charts.css', 'docs.js', 'brand-nav.js']) {
  copy(path.join(root, 'src', file), path.join(dist, file));
}
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
write(path.join(dist, responsivePage.route), renderDocumentationPage(responsivePage.route, responsivePage.page));
write(path.join(dist, howToUsePage.route), renderDocumentationPage(howToUsePage.route, howToUsePage.page));
write(path.join(dist, 'branding.html'), redirectDocument('./brand/index.html', 'CIIMO Brand'));
for (const oldBrandRoute of ['positioning.html', 'personality.html', 'experience.html', 'identity.html']) {
  write(path.join(dist, 'brand', oldBrandRoute), redirectDocument('./index.html', 'CIIMO Brand'));
}
write(path.join(dist, '.nojekyll'), '');
