const navigation = [
  {
    key: 'start',
    title: 'Documentação',
    short: 'D',
    items: [
      { key: 'home', label: 'Visão geral', href: 'index.html' },
      { key: 'coverage', label: 'Cobertura', href: 'getting-started/coverage.html' },
      { key: 'sources', label: 'Referências', href: 'getting-started/sources.html' },
    ],
  },
  {
    key: 'app',
    title: 'Aplicativo',
    short: 'A',
    items: [
      { key: 'app-foundations', label: 'Fundamentos', href: 'app/index.html' },
      { key: 'app-entities', label: 'Entidades', href: 'app/entities.html' },
      { key: 'app-data', label: 'Dados', href: 'app/data.html' },
      { key: 'app-forms', label: 'Formulários', href: 'app/forms.html' },
      { key: 'app-patterns', label: 'Padrões', href: 'app/patterns.html' },
      { key: 'app-screens', label: 'Telas', href: 'app/screens.html' },
    ],
  },
  {
    key: 'web',
    title: 'Web',
    short: 'W',
    items: [
      { key: 'web-foundations', label: 'Fundamentos', href: 'web/index.html' },
      { key: 'web-data', label: 'Dados', href: 'web/data.html' },
      { key: 'web-forms', label: 'Formulários', href: 'web/forms.html' },
      { key: 'web-patterns', label: 'Padrões', href: 'web/patterns.html' },
      { key: 'web-screens', label: 'Telas', href: 'web/screens.html' },
    ],
  },
];

function itemForPath(pathname) {
  const normalized = String(pathname || 'index.html').replace(/^\/+/, '');
  for (const group of navigation) {
    const item = group.items.find((entry) => entry.href === normalized);
    if (item) return { group, item };
  }
  return { group: navigation[0], item: navigation[0].items[0] };
}

module.exports = { navigation, itemForPath };
