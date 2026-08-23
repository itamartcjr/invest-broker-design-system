(() => {
  const root = document.documentElement;
  const key = 'invest-broker-docs-sidebar';
  const toggle = document.querySelector('[data-sidebar-toggle]');
  const current = sessionStorage.getItem(key) || 'collapsed';

  const apply = (state) => {
    root.dataset.sidebar = state;
    sessionStorage.setItem(key, state);
    if (toggle) {
      const expanded = state === 'expanded';
      toggle.setAttribute('aria-label', expanded ? 'Recolher menu' : 'Expandir menu');
      toggle.setAttribute('aria-expanded', String(expanded));
    }
  };

  apply(current);

  toggle?.addEventListener('click', () => {
    apply(root.dataset.sidebar === 'expanded' ? 'collapsed' : 'expanded');
  });

  document.querySelectorAll('[data-nav-group]').forEach((group) => {
    const groupKey = `invest-broker-docs-group-${group.dataset.navGroup}`;
    const saved = sessionStorage.getItem(groupKey);
    if (saved === 'open') group.open = true;
    if (saved === 'closed' && !group.querySelector('[aria-current="page"]')) group.open = false;
    group.addEventListener('toggle', () => sessionStorage.setItem(groupKey, group.open ? 'open' : 'closed'));
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === '[' && !/input|textarea|select/i.test(document.activeElement?.tagName || '')) {
      apply(root.dataset.sidebar === 'expanded' ? 'collapsed' : 'expanded');
    }
  });
})();
