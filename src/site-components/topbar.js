const { itemForPath } = require('../navigation');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderTopbar({ currentPath = 'index.html' } = {}) {
  const { group, item } = itemForPath(currentPath);

  return `
<header class="docs-topbar" data-docs-topbar>
  <button class="docs-topbar__menu" type="button" data-mobile-menu aria-label="Abrir menu" aria-expanded="false" title="Abrir menu">
    <i class="hgi-stroke hgi-menu-01" aria-hidden="true"></i>
  </button>
  <div class="docs-topbar__crumb" aria-label="Localização atual">
    <span data-topbar-section>${escapeHtml(group.title)}</span>
    <span class="docs-topbar__separator" aria-hidden="true">/</span>
    <strong data-topbar-title>${escapeHtml(item.label)}</strong>
  </div>
  <div class="docs-topbar__space"></div>
  <a class="docs-topbar__github" href="https://github.com/itamartcjr/invest-broker-design-system" target="_blank" rel="noreferrer" aria-label="Abrir repositório no GitHub" title="GitHub">
    <i class="hgi-stroke hgi-github" aria-hidden="true"></i>
    <span>GitHub</span>
  </a>
  <button class="docs-sidebar__theme docs-topbar__theme" type="button" data-theme-toggle aria-label="Ativar tema claro" title="Ativar tema claro">
    <i class="hgi-stroke hgi-sun-03 theme-icon--sun" aria-hidden="true"></i>
    <i class="hgi-stroke hgi-moon-02 theme-icon--moon" aria-hidden="true"></i>
  </button>
</header>`;
}

module.exports = { renderTopbar };
