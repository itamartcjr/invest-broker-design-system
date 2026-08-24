(() => {
  const sidebar = document.querySelector('[data-docs-sidebar]');
  if (!sidebar) return;

  const search = sidebar.querySelector('[data-nav-search]');
  const modules = [...sidebar.querySelectorAll('[data-nav-module]')];
  const groups = [...sidebar.querySelectorAll('[data-nav-group]')];

  const keyFor = (module) => `ciimo-docs-module-${module.dataset.navModule}`;
  const readState = (module) => sessionStorage.getItem(keyFor(module)) === 'open';

  modules.forEach((module) => {
    module.open = readState(module);
    module.addEventListener('toggle', () => {
      if (!search?.value.trim()) sessionStorage.setItem(keyFor(module), module.open ? 'open' : 'closed');
    });
  });

  const syncModulesToSearch = () => {
    const term = search?.value.trim().toLowerCase() || '';

    modules.forEach((module) => {
      const links = [...module.querySelectorAll('.docs-nav__link')];
      if (!term) {
        module.hidden = false;
        module.open = readState(module);
        return;
      }

      const moduleText = module.querySelector('.docs-nav__module-summary')?.textContent?.toLowerCase() || '';
      const moduleMatch = moduleText.includes(term);
      if (moduleMatch) links.forEach((link) => { link.hidden = false; });
      const visibleLinks = links.filter((link) => !link.hidden);
      module.hidden = !moduleMatch && visibleLinks.length === 0;
      module.open = !module.hidden;
    });

    if (term) {
      groups.forEach((group) => {
        const hasVisibleDirectLink = [...group.querySelectorAll(':scope > .docs-nav__links > .docs-nav__link')].some((link) => !link.hidden);
        const hasVisibleModule = [...group.querySelectorAll('[data-nav-module]')].some((module) => !module.hidden);
        if (hasVisibleDirectLink || hasVisibleModule) {
          group.hidden = false;
          group.open = true;
        }
      });
    }
  };

  search?.addEventListener('input', () => queueMicrotask(syncModulesToSearch));
})();
