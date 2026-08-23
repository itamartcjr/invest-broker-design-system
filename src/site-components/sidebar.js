const { navigation, itemForPath } = require('../navigation');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderSidebar({ currentPath = 'index.html', prefix = './' } = {}) {
  const { item: currentItem } = itemForPath(currentPath);

  return `
<aside class="sidebar docs-sidebar" data-docs-sidebar>
  <div class="docs-sidebar__top">
    <a class="brand" href="${prefix}index.html" aria-label="Invest Broker Design System">
      <span class="brand-mark" aria-hidden="true"><i></i><i></i></span>
      <span class="brand-word">IB</span>
    </a>
    <button class="docs-sidebar__toggle" type="button" data-sidebar-toggle aria-label="Expandir menu" aria-expanded="false" title="Expandir ou recolher menu">
      <i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i>
    </button>
  </div>
  <span class="library-tag docs-sidebar__library">Design system</span>
  <nav class="docs-nav" aria-label="Navegação da documentação">
    ${navigation.map((group) => `
      <details class="docs-nav__group" data-nav-group="${escapeHtml(group.key)}">
        <summary class="docs-nav__summary">
          <span class="nav-icon">${escapeHtml(group.short)}</span>
          <span class="nav-text">${escapeHtml(group.title)}</span>
          <i class="hgi-stroke hgi-arrow-right-01 docs-nav__chevron" aria-hidden="true"></i>
        </summary>
        <div class="docs-nav__links">
          ${group.items.map((item) => {
            const active = item.key === currentItem.key;
            return `<a class="docs-nav__link${active ? ' active' : ''}" href="${prefix}${item.href}"${active ? ' aria-current="page"' : ''}><span>${escapeHtml(item.label)}</span></a>`;
          }).join('')}
        </div>
      </details>`).join('')}
  </nav>
  <div class="side-foot docs-sidebar__foot">
    <a href="https://github.com/itamartcjr/invest-broker-design-system">GitHub</a>
    <span>Node · GitHub Pages</span>
  </div>
</aside>`;
}

module.exports = { renderSidebar };
