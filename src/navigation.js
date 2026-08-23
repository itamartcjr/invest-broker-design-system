const navigation = [
  {
    key: 'brand',
    title: 'Marca',
    short: 'B',
    items: [
      { key: 'brand-essence', label: 'Essência', href: 'brand/index.html' },
      { key: 'brand-positioning', label: 'Posicionamento', href: 'brand/positioning.html' },
      { key: 'brand-personality', label: 'Personalidade e voz', href: 'brand/personality.html' },
      { key: 'brand-experience', label: 'Princípios de produto', href: 'brand/experience.html' },
      { key: 'brand-visual', label: 'Princípios visuais', href: 'brand/visual-principles.html' },
      { key: 'brand-identity', label: 'Identidade visual', href: 'brand/identity.html' },
      { key: 'brand-theme', label: 'Tema claro e escuro', href: 'brand/theme.html' },
    ],
  },
  {
    key: 'start',
    title: 'Documentação',
    short: 'D',
    items: [
      { key: 'home', label: 'Visão geral', href: 'index.html' },
      { key: 'coverage', label: 'Cobertura', href: 'getting-started/coverage.html' },
      { key: 'responsive', label: 'Responsividade', href: 'getting-started/responsive.html' },
      { key: 'icons', label: 'Ícones', href: 'getting-started/icons.html' },
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
  const fallbackGroup = navigation.find((group) => group.key === 'start') || navigation[0];
  return { group: fallbackGroup, item: fallbackGroup.items[0] };
}

module.exports = { navigation, itemForPath };
