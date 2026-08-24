(() => {
  const root = document.documentElement;
  const themeStateKey = 'ciimo-theme';
  const mobileMedia = window.matchMedia('(max-width: 760px)');

  const readStoredTheme = () => {
    try { return localStorage.getItem(themeStateKey); } catch (error) { return null; }
  };
  const writeStoredTheme = (theme) => {
    try { localStorage.setItem(themeStateKey, theme); } catch (error) {}
  };
  const applyTheme = (state, { persist = true } = {}) => {
    const next = state === 'light' ? 'light' : 'dark';
    root.dataset.theme = next;
    if (persist) writeStoredTheme(next);
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const label = next === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro';
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.setAttribute('aria-pressed', String(next === 'light'));
    });
  };
  applyTheme(root.dataset.theme === 'light' ? 'light' : (readStoredTheme() === 'light' ? 'light' : 'dark'), { persist: false });

  const sidebar = document.querySelector('[data-docs-sidebar]');
  const topbar = document.querySelector('[data-docs-topbar]');
  if (!sidebar || !topbar) return;

  const sidebarStateKey = 'invest-broker-docs-sidebar';
  const desktopToggle = sidebar.querySelector('[data-sidebar-toggle]');
  const mobileMenu = topbar.querySelector('[data-mobile-menu]');
  const closeButton = sidebar.querySelector('[data-sidebar-close]');
  const backdrop = document.querySelector('[data-sidebar-backdrop]');
  const navSearch = sidebar.querySelector('[data-nav-search]');
  const topbarSection = topbar.querySelector('[data-topbar-section]');
  const topbarTitle = topbar.querySelector('[data-topbar-title]');

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => applyTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));
  });

  const readDesktopSidebarState = () => sessionStorage.getItem(sidebarStateKey) || 'collapsed';
  const applySidebarState = (state, { persistDesktop = !mobileMedia.matches } = {}) => {
    const next = state === 'expanded' ? 'expanded' : 'collapsed';
    root.dataset.sidebar = next;
    if (persistDesktop) sessionStorage.setItem(sidebarStateKey, next);
    const expanded = next === 'expanded';
    desktopToggle?.setAttribute('aria-label', expanded ? 'Recolher menu' : 'Expandir menu');
    desktopToggle?.setAttribute('aria-expanded', String(expanded));
    mobileMenu?.setAttribute('aria-expanded', String(mobileMedia.matches && expanded));
    backdrop?.setAttribute('aria-hidden', String(!(mobileMedia.matches && expanded)));
  };

  applySidebarState(mobileMedia.matches ? 'collapsed' : readDesktopSidebarState(), { persistDesktop: false });
  mobileMedia.addEventListener?.('change', (event) => {
    applySidebarState(event.matches ? 'collapsed' : readDesktopSidebarState(), { persistDesktop: false });
  });

  desktopToggle?.addEventListener('click', () => {
    applySidebarState(root.dataset.sidebar === 'expanded' ? 'collapsed' : 'expanded', { persistDesktop: true });
  });
  mobileMenu?.addEventListener('click', () => applySidebarState('expanded', { persistDesktop: false }));
  closeButton?.addEventListener('click', () => applySidebarState('collapsed', { persistDesktop: false }));
  backdrop?.addEventListener('click', () => applySidebarState('collapsed', { persistDesktop: false }));

  sidebar.querySelectorAll('a[href]').forEach((anchor) => {
    const resolved = new URL(anchor.getAttribute('href'), window.location.href);
    if (resolved.origin === window.location.origin) anchor.setAttribute('href', resolved.href);
  });

  const groups = [...sidebar.querySelectorAll('[data-nav-group]')];
  groups.forEach((group) => {
    const key = `invest-broker-docs-group-${group.dataset.navGroup}`;
    group.open = sessionStorage.getItem(key) === 'open';
    group.addEventListener('toggle', () => {
      if (!navSearch?.value.trim()) sessionStorage.setItem(key, group.open ? 'open' : 'closed');
    });
  });

  const restoreGroupState = () => {
    groups.forEach((group) => {
      const key = `invest-broker-docs-group-${group.dataset.navGroup}`;
      group.hidden = false;
      group.open = sessionStorage.getItem(key) === 'open';
      group.querySelectorAll('.docs-nav__link').forEach((link) => { link.hidden = false; });
    });
  };

  navSearch?.addEventListener('input', () => {
    const term = navSearch.value.trim().toLowerCase();
    if (!term) { restoreGroupState(); return; }
    groups.forEach((group) => {
      let matches = 0;
      group.querySelectorAll('.docs-nav__link').forEach((link) => {
        const haystack = `${link.dataset.groupLabel || ''} ${link.dataset.pageLabel || ''}`.toLowerCase();
        const visible = haystack.includes(term);
        link.hidden = !visible;
        if (visible) matches += 1;
      });
      group.hidden = matches === 0;
      group.open = matches > 0;
    });
  });

  const homeLink = sidebar.querySelector('.brand');
  const siteRoot = homeLink ? new URL(homeLink.href).pathname.replace(/index\.html$/, '') : '/';
  const normalizedPath = (value) => {
    const url = value instanceof URL ? value : new URL(value, window.location.href);
    return url.pathname.endsWith('/') ? `${url.pathname}index.html` : url.pathname;
  };

  const updateActiveLink = (url) => {
    const currentPath = normalizedPath(url);
    let activeLink = null;
    sidebar.querySelectorAll('.docs-nav__link').forEach((link) => {
      const active = normalizedPath(link.href) === currentPath;
      link.classList.toggle('active', active);
      if (active) {
        link.setAttribute('aria-current', 'page');
        activeLink = link;
      } else link.removeAttribute('aria-current');
    });
    if (activeLink) {
      if (topbarSection) topbarSection.textContent = activeLink.dataset.groupLabel || 'Design System';
      if (topbarTitle) topbarTitle.textContent = activeLink.dataset.pageLabel || document.title;
    }
  };

  const isInternalDocumentationUrl = (url) =>
    url.origin === window.location.origin && url.pathname.startsWith(siteRoot) && (url.pathname.endsWith('.html') || url.pathname === siteRoot);

  const loadPage = async (url, { push = true } = {}) => {
    try {
      const response = await fetch(url.href, { headers: { 'X-Requested-With': 'InvestBrokerDocs' } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      const nextDocument = new DOMParser().parseFromString(html, 'text/html');
      const nextMain = nextDocument.querySelector('main.page');
      const currentMain = document.querySelector('main.page');
      if (!nextMain || !currentMain) throw new Error('Document shell not found');
      if (push) history.pushState({ docs: true }, '', url.href);
      currentMain.replaceWith(nextMain);
      document.title = nextDocument.title || document.title;
      updateActiveLink(url);
      if (mobileMedia.matches) applySidebarState('collapsed', { persistDesktop: false });
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch (error) {
      window.location.href = url.href;
    }
  };

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest('a[href]');
    if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return;
    const url = new URL(anchor.href, window.location.href);
    if (!isInternalDocumentationUrl(url)) return;
    const currentPath = normalizedPath(window.location.href);
    const targetPath = normalizedPath(url);
    if (url.hash && currentPath === targetPath) return;
    event.preventDefault();
    loadPage(url);
  });

  window.addEventListener('popstate', () => loadPage(new URL(window.location.href), { push: false }));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && root.dataset.sidebar === 'expanded') {
      applySidebarState('collapsed', { persistDesktop: false });
      mobileMenu?.focus();
      return;
    }
    if (event.key === '[' && !mobileMedia.matches && !/input|textarea|select/i.test(document.activeElement?.tagName || '')) {
      applySidebarState(root.dataset.sidebar === 'expanded' ? 'collapsed' : 'expanded', { persistDesktop: true });
    }
  });

  updateActiveLink(new URL(window.location.href));
})();
