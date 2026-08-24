const { brandNavigationItems, brandNavigationModules } = require('./brand/framework-navigation');

const navigation = [
  {
    key: 'start',
    title: 'Introdução',
    short: '00',
    items: [
      { key: 'home', label: 'Overview', href: 'index.html' },
      { key: 'how-to-use', label: 'Como usar', href: 'getting-started/how-to-use.html' },
      { key: 'coverage', label: 'Cobertura', href: 'getting-started/coverage.html' },
      { key: 'responsive', label: 'Responsividade', href: 'getting-started/responsive.html' },
      { key: 'sources', label: 'Referências', href: 'getting-started/sources.html' },
    ],
  },
  {
    key: 'brand',
    title: 'Brand',
    short: '01',
    items: brandNavigationItems,
    modules: brandNavigationModules,
  },
  {
    key: 'foundations',
    title: 'Foundations',
    short: '02',
    items: [
      { key: 'foundation-brand', label: 'Marca para interface', href: 'foundations/brand-principles.html' },
      { key: 'foundation-colors', label: 'Colors', href: 'foundations/colors.html' },
      { key: 'foundation-typography', label: 'Typography', href: 'foundations/typography.html' },
      { key: 'foundation-spacing', label: 'Spacing & Layout', href: 'foundations/spacing-layout.html' },
      { key: 'foundation-grid', label: 'Grid', href: 'foundations/grid.html' },
      { key: 'foundation-breakpoints', label: 'Breakpoints', href: 'foundations/breakpoints.html' },
      { key: 'foundation-radius', label: 'Radius', href: 'foundations/radius.html' },
      { key: 'foundation-borders', label: 'Borders', href: 'foundations/borders.html' },
      { key: 'foundation-elevation', label: 'Elevation', href: 'foundations/elevation.html' },
      { key: 'foundation-icons', label: 'Icons', href: 'getting-started/icons.html' },
      { key: 'foundation-theme', label: 'Light & Dark', href: 'brand/theme.html' },
      { key: 'foundation-motion', label: 'Motion', href: 'foundations/motion.html' },
    ],
  },
  {
    key: 'tokens',
    title: 'Tokens',
    short: '03',
    items: [
      { key: 'tokens-primitive', label: 'Primitive', href: 'tokens/primitive.html' },
      { key: 'tokens-semantic', label: 'Semantic', href: 'tokens/semantic.html' },
      { key: 'tokens-component', label: 'Component', href: 'tokens/component.html' },
    ],
  },
  {
    key: 'components',
    title: 'Components',
    short: '04',
    items: [
      { key: 'components-overview', label: 'Inventory', href: 'components/index.html' },
      { key: 'components-buttons', label: 'Buttons', href: 'components/buttons.html' },
      { key: 'components-fields', label: 'Fields', href: 'components/fields.html' },
      { key: 'components-data', label: 'Data Display', href: 'components/data-display.html' },
      { key: 'components-feedback', label: 'Feedback & Loading', href: 'components/feedback-loading.html' },
      { key: 'components-navigation', label: 'Navigation', href: 'components/navigation.html' },
    ],
  },
  {
    key: 'patterns',
    title: 'Patterns',
    short: '05',
    items: [
      { key: 'pattern-investment-reading', label: 'Leitura de investimento', href: 'patterns/investment-reading.html' },
      { key: 'pattern-filter-compare', label: 'Filter & Compare', href: 'patterns/filter-compare.html' },
      { key: 'pattern-continuity', label: 'Acompanhamento contínuo', href: 'patterns/continuity.html' },
    ],
  },
  {
    key: 'templates',
    title: 'Templates',
    short: '06',
    items: [
      { key: 'templates-overview', label: 'Product structures', href: 'templates/index.html' },
    ],
  },
  {
    key: 'examples',
    title: 'Examples',
    short: '07',
    items: [
      { key: 'example-audience-modes', label: 'Cliente · Corretor · Imobiliária', href: 'examples/audience-modes.html' },
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
