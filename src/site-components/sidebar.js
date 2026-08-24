const { navigation, itemForPath } = require('../navigation');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderLink(item, group, prefix, currentItem, number = '') {
  const active = item.key === currentItem.key;
  return `<a class="docs-nav__link${active ? ' active' : ''}" href="${prefix}${item.href}" data-group-label="${escapeHtml(group.title)}" data-page-label="${escapeHtml(item.label)}"${active ? ' aria-current="page"' : ''}>${number ? `<span class="docs-nav__item-no">${escapeHtml(number)}</span>` : ''}<span>${escapeHtml(item.label)}</span></a>`;
}

function renderModule(module, group, prefix, currentItem) {
  const items = (module.itemKeys || []).map((key) => group.items.find((item) => item.key === key)).filter(Boolean);
  return `<details class="docs-nav__module" data-nav-module="${escapeHtml(module.key)}" data-module-group="${escapeHtml(module.group || '')}">
    <summary class="docs-nav__module-summary">
      <span class="docs-nav__module-no">${escapeHtml(module.number)}</span>
      <strong>${escapeHtml(module.title)}</strong>
      <i class="hgi-stroke hgi-arrow-right-01 docs-nav__module-chevron" aria-hidden="true"></i>
    </summary>
    <div class="docs-nav__module-links">
      ${items.map((item, index) => renderLink(item, group, prefix, currentItem, `${module.number}.${String(index + 1).padStart(2, '0')}`)).join('')}
    </div>
  </details>`;
}

function renderGroupContent(group, prefix, currentItem) {
  if (!Array.isArray(group.modules) || !group.modules.length) {
    return `<div class="docs-nav__links">${group.items.map((item) => renderLink(item, group, prefix, currentItem)).join('')}</div>`;
  }

  const moduleItemKeys = new Set(group.modules.flatMap((module) => module.itemKeys || []));
  const standalone = group.items.filter((item) => !moduleItemKeys.has(item.key));
  const moduleGroups = [];

  for (const module of group.modules) {
    const label = module.group || '';
    let bucket = moduleGroups.find((entry) => entry.label === label);
    if (!bucket) {
      bucket = { label, modules: [] };
      moduleGroups.push(bucket);
    }
    bucket.modules.push(module);
  }

  return `<div class="docs-nav__links docs-nav__links--structured">
    ${standalone.map((item) => renderLink(item, group, prefix, currentItem, '00')).join('')}
    ${moduleGroups.map((bucket) => `<div class="docs-nav__framework-group" data-framework-group="${escapeHtml(bucket.label)}">
      ${bucket.label ? `<span class="docs-nav__framework-label">${escapeHtml(bucket.label)}</span>` : ''}
      ${bucket.modules.map((module) => renderModule(module, group, prefix, currentItem)).join('')}
    </div>`).join('')}
  </div>`;
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
      <input type="search" data-nav-search placeholder="Buscar módulos e páginas" aria-label="Buscar no Design System" autocomplete="off">
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
        ${renderGroupContent(group, prefix, currentItem)}
      </details>`).join('')}
  </nav>

  <div class="side-foot docs-sidebar__foot">
    <a href="${prefix}getting-started/how-to-use.html">Como usar o sistema</a>
    <span>CIIMO · Node · GitHub Pages</span>
  </div>
</aside>`;
}

module.exports = { renderSidebar };
