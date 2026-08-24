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
<aside class="sidebar docs-sidebar" data-docs-sidebar aria-label="Navegação do Design System">
  <div class="docs-sidebar__top">
    <a class="brand docs-sidebar__brand" href="${prefix}index.html" aria-label="CIIMO Design System">
      <img class="docs-sidebar__brand-full docs-sidebar__brand-full--dark" src="${prefix}assets/brand/ciimo_cw.svg" alt="CIIMO">
      <img class="docs-sidebar__brand-full docs-sidebar__brand-full--light" src="${prefix}assets/brand/ciimo_cb.svg" alt="CIIMO">
      <img class="docs-sidebar__brand-symbol docs-sidebar__brand-symbol--dark" src="${prefix}assets/brand/ii_v.svg" alt="" aria-hidden="true">
      <img class="docs-sidebar__brand-symbol docs-sidebar__brand-symbol--light" src="${prefix}assets/brand/ii_b.svg" alt="" aria-hidden="true">
    </a>
    <button class="docs-sidebar__close" type="button" data-sidebar-close aria-label="Fechar menu" title="Fechar menu">
      <i class="hgi-stroke hgi-cancel-01" aria-hidden="true"></i>
    </button>
    <button class="docs-sidebar__toggle" type="button" data-sidebar-toggle aria-label="Expandir menu" aria-expanded="false" title="Expandir ou recolher menu">
      <i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i>
    </button>
  </div>

  <div class="docs-sidebar__search">
    <label>
      <i class="hgi-stroke hgi-search-01" aria-hidden="true"></i>
      <input type="search" data-nav-search placeholder="Buscar páginas" aria-label="Buscar no Design System" autocomplete="off">
    </label>
  </div>

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
            return `<a class="docs-nav__link${active ? ' active' : ''}" href="${prefix}${item.href}" data-group-label="${escapeHtml(group.title)}" data-page-label="${escapeHtml(item.label)}"${active ? ' aria-current="page"' : ''}><span>${escapeHtml(item.label)}</span></a>`;
          }).join('')}
        </div>
      </details>`).join('')}
  </nav>

  <div class="side-foot docs-sidebar__foot">
    <a href="${prefix}getting-started/how-to-use.html">Como usar o sistema</a>
    <span>CIIMO · Node · GitHub Pages</span>
  </div>
</aside>`;
}

module.exports = { renderSidebar };
