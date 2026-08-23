(() => {
  const root = document.documentElement;
  const sidebar = document.querySelector('[data-docs-sidebar]');
  if (!sidebar) return;

  const sidebarStateKey = 'invest-broker-docs-sidebar';
  const toggle = sidebar.querySelector('[data-sidebar-toggle]');

  const applySidebarState = (state) => {
    const next = state === 'expanded' ? 'expanded' : 'collapsed';
    root.dataset.sidebar = next;
    sessionStorage.setItem(sidebarStateKey, next);
    if (toggle) {
      const expanded = next === 'expanded';
      toggle.setAttribute('aria-label', expanded ? 'Recolher menu' : 'Expandir menu');
      toggle.setAttribute('aria-expanded', String(expanded));
    }
  };

  applySidebarState(sessionStorage.getItem(sidebarStateKey) || root.dataset.sidebar || 'collapsed');

  toggle?.addEventListener('click', () => {
    applySidebarState(root.dataset.sidebar === 'expanded' ? 'collapsed' : 'expanded');
  });

  sidebar.querySelectorAll('a[href]').forEach((anchor) => {
    const resolved = new URL(anchor.getAttribute('href'), window.location.href);
    if (resolved.origin === window.location.origin) {
      anchor.setAttribute('href', resolved.href);
    }
  });

  sidebar.querySelectorAll('[data-nav-group]').forEach((group) => {
    const groupKey = `invest-broker-docs-group-${group.dataset.navGroup}`;
    group.open = sessionStorage.getItem(groupKey) === 'open';
    group.addEventListener('toggle', () => {
      sessionStorage.setItem(groupKey, group.open ? 'open' : 'closed');
    });
  });

  const homeLink = sidebar.querySelector('.brand');
  const siteRoot = homeLink
    ? new URL(homeLink.href).pathname.replace(/index\.html$/, '')
    : '/';

  const normalizedPath = (value) => {
    const url = value instanceof URL ? value : new URL(value, window.location.href);
    return url.pathname.endsWith('/') ? `${url.pathname}index.html` : url.pathname;
  };

  const updateActiveLink = (url) => {
    const currentPath = normalizedPath(url);
    sidebar.querySelectorAll('.docs-nav__link').forEach((link) => {
      const active = normalizedPath(link.href) === currentPath;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  const isInternalDocumentationUrl = (url) =>
    url.origin === window.location.origin &&
    url.pathname.startsWith(siteRoot) &&
    (url.pathname.endsWith('.html') || url.pathname === siteRoot);

  const loadPage = async (url, { push = true } = {}) => {
    try {
      const response = await fetch(url.href, {
        headers: { 'X-Requested-With': 'InvestBrokerDocs' },
      });
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
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch (error) {
      window.location.href = url.href;
    }
  };

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const anchor = event.target.closest('a[href]');
    if (!anchor || anchor.target && anchor.target !== '_self' || anchor.hasAttribute('download')) return;

    const url = new URL(anchor.href, window.location.href);
    if (!isInternalDocumentationUrl(url)) return;

    const currentPath = normalizedPath(window.location.href);
    const targetPath = normalizedPath(url);
    if (url.hash && currentPath === targetPath) return;

    event.preventDefault();
    loadPage(url);
  });

  window.addEventListener('popstate', () => {
    loadPage(new URL(window.location.href), { push: false });
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === '[' && !/input|textarea|select/i.test(document.activeElement?.tagName || '')) {
      applySidebarState(root.dataset.sidebar === 'expanded' ? 'collapsed' : 'expanded');
    }
  });

  updateActiveLink(new URL(window.location.href));
})();
