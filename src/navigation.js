const { brandNavigationItems, brandNavigationModules } = require('./brand/framework-navigation');

const foundationItems = [
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
  { key: 'foundation-responsive', label: 'Responsividade', href: 'getting-started/responsive.html' },
];

const tokenItems = [
  { key: 'tokens-primitive', label: 'Primitive', href: 'tokens/primitive.html' },
  { key: 'tokens-semantic', label: 'Semantic', href: 'tokens/semantic.html' },
  { key: 'tokens-component', label: 'Component', href: 'tokens/component.html' },
];

const componentItems = [
  { key: 'components-overview', label: 'Inventory', href: 'components/index.html' },
  { key: 'components-buttons', label: 'Buttons', href: 'components/buttons.html' },
  { key: 'components-fields', label: 'Fields', href: 'components/fields.html' },
  { key: 'components-data', label: 'Data Display', href: 'components/data-display.html' },
  { key: 'components-feedback', label: 'Feedback & Loading', href: 'components/feedback-loading.html' },
  { key: 'components-navigation', label: 'Navigation', href: 'components/navigation.html' },
];

const patternItems = [
  { key: 'pattern-investment-reading', label: 'Leitura de investimento', href: 'patterns/investment-reading.html' },
  { key: 'pattern-filter-compare', label: 'Filter & Compare', href: 'patterns/filter-compare.html' },
  { key: 'pattern-continuity', label: 'Acompanhamento contínuo', href: 'patterns/continuity.html' },
];

const templateItems = [
  { key: 'templates-overview', label: 'Product structures', href: 'templates/index.html' },
];

const exampleItems = [
  { key: 'example-audience-modes', label: 'Cliente · Corretor · Imobiliária', href: 'examples/audience-modes.html' },
];

const appItems = [
  { key: 'app-foundations', label: 'Fundamentos', href: 'app/index.html' },
  { key: 'app-entities', label: 'Entidades', href: 'app/entities.html' },
  { key: 'app-data', label: 'Dados', href: 'app/data.html' },
  { key: 'app-forms', label: 'Formulários', href: 'app/forms.html' },
  { key: 'app-patterns', label: 'Padrões', href: 'app/patterns.html' },
  { key: 'app-screens', label: 'Telas', href: 'app/screens.html' },
];

const webItems = [
  { key: 'web-foundations', label: 'Fundamentos', href: 'web/index.html' },
  { key: 'web-data', label: 'Dados', href: 'web/data.html' },
  { key: 'web-forms', label: 'Formulários', href: 'web/forms.html' },
  { key: 'web-patterns', label: 'Padrões', href: 'web/patterns.html' },
  { key: 'web-screens', label: 'Telas', href: 'web/screens.html' },
];

const designSystemItems = [
  { key: 'design-system-overview', label: 'Overview', href: 'design-system/index.html' },
  ...foundationItems,
  ...tokenItems,
  ...componentItems,
  ...patternItems,
  ...templateItems,
  ...exampleItems,
  ...appItems,
  ...webItems,
];

const designSystemModules = [
  { key: 'ds-foundations', number: '01', title: 'Foundations', group: 'Sistema', itemKeys: foundationItems.map((item) => item.key) },
  { key: 'ds-tokens', number: '02', title: 'Tokens', group: 'Sistema', itemKeys: tokenItems.map((item) => item.key) },
  { key: 'ds-components', number: '03', title: 'Components', group: 'Sistema', itemKeys: componentItems.map((item) => item.key) },
  { key: 'ds-patterns', number: '04', title: 'Patterns', group: 'Sistema', itemKeys: patternItems.map((item) => item.key) },
  { key: 'ds-templates', number: '05', title: 'Templates', group: 'Sistema', itemKeys: templateItems.map((item) => item.key) },
  { key: 'ds-examples', number: '06', title: 'Examples', group: 'Sistema', itemKeys: exampleItems.map((item) => item.key) },
  { key: 'ds-app', number: '07', title: 'App', group: 'Produto', itemKeys: appItems.map((item) => item.key) },
  { key: 'ds-web', number: '08', title: 'Web', group: 'Produto', itemKeys: webItems.map((item) => item.key) },
];

const navigation = [
  {
    key: 'start',
    title: 'CIIMO',
    short: '00',
    items: [
      { key: 'home', label: 'Início', href: 'index.html' },
    ],
  },
  {
    key: 'brand',
    title: 'Brand',
    short: 'B',
    items: brandNavigationItems,
    modules: brandNavigationModules,
  },
  {
    key: 'design-system',
    title: 'Design System',
    short: 'DS',
    items: designSystemItems,
    modules: designSystemModules,
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
