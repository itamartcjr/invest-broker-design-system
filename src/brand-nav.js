(() => {
  const sidebar = document.querySelector('[data-docs-sidebar]');
  if (!sidebar) return;

  const search = sidebar.querySelector('[data-nav-search]');
  const modules = [...sidebar.querySelectorAll('[data-nav-module]')];
  const frameworkGroups = [...sidebar.querySelectorAll('[data-framework-group]')];
  const groups = [...sidebar.querySelectorAll('[data-nav-group]')];

  const keyFor = (module) => `ciimo-docs-module-${module.dataset.navModule}`;
  const readState = (module) => sessionStorage.getItem(keyFor(module)) === 'open';

  modules.forEach((module) => {
    module.open = readState(module);
    module.addEventListener('toggle', () => {
      if (!search?.value.trim()) sessionStorage.setItem(keyFor(module), module.open ? 'open' : 'closed');
    });
  });

  const syncFrameworkGroups = () => {
    frameworkGroups.forEach((frameworkGroup) => {
      const visibleModule = [...frameworkGroup.querySelectorAll('[data-nav-module]')].some((module) => !module.hidden);
      frameworkGroup.hidden = !visibleModule;
    });
  };

  const syncModulesToSearch = () => {
    const term = search?.value.trim().toLowerCase() || '';

    modules.forEach((module) => {
      const links = [...module.querySelectorAll('.docs-nav__link')];
      if (!term) {
        module.hidden = false;
        module.open = readState(module);
        links.forEach((link) => { link.hidden = false; });
        return;
      }

      const moduleText = `${module.dataset.moduleGroup || ''} ${module.querySelector('.docs-nav__module-summary')?.textContent || ''}`.toLowerCase();
      const moduleMatch = moduleText.includes(term);
      if (moduleMatch) links.forEach((link) => { link.hidden = false; });
      const visibleLinks = links.filter((link) => !link.hidden);
      module.hidden = !moduleMatch && visibleLinks.length === 0;
      module.open = !module.hidden;
    });

    syncFrameworkGroups();

    if (term) {
      groups.forEach((group) => {
        const hasVisibleDirectLink = [...group.querySelectorAll(':scope > .docs-nav__links > .docs-nav__link')].some((link) => !link.hidden);
        const hasVisibleModule = [...group.querySelectorAll('[data-nav-module]')].some((module) => !module.hidden);
        if (hasVisibleDirectLink || hasVisibleModule) {
          group.hidden = false;
          group.open = true;
        }
      });
    } else {
      frameworkGroups.forEach((frameworkGroup) => { frameworkGroup.hidden = false; });
    }
  };

  search?.addEventListener('input', () => queueMicrotask(syncModulesToSearch));
})();
