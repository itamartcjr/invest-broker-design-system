const { brandFramework } = require('./framework-data');

function routeFor(module, entry) {
  const itemNumber = String(entry.number).split('.')[1] || '01';
  return `brand/${module.number}-${module.key}/${itemNumber}-${entry.slug}.html`;
}

const brandNavigationItems = [
  { key: 'brand-overview', label: 'Overview', href: 'brand/index.html' },
  ...brandFramework.modules.flatMap((module) => module.items.map((entry) => ({
    key: entry.key,
    label: entry.title,
    href: routeFor(module, entry),
  }))),
];

const brandNavigationModules = brandFramework.modules.map((module) => ({
  key: module.key,
  number: module.number,
  title: module.title,
  group: module.group,
  itemKeys: module.items.map((entry) => entry.key),
}));

module.exports = { routeFor, brandNavigationItems, brandNavigationModules };
