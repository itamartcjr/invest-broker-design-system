const { documentationPages: sourceLegacyPages } = require('./site-pages');
const { brandFrameworkPages } = require('./brand/framework-pages');
const { createDesignSystemPages } = require('./design-system-pages');
const { createExtraDesignSystemPages } = require('./design-system-extra-pages');
const { homePage } = require('./home-page');
const { designSystemOverviewPage } = require('./design-system-overview-page');
const { assetPerformanceHeaderPage } = require('./asset-performance-header-page');
const { chartPages } = require('./charts/pages');

const legacyPages = Object.fromEntries(
  Object.entries(sourceLegacyPages).filter(([route]) => !route.startsWith('brand/'))
);

function shellContent({ eyebrow, title, description, index = [], sections = [] }) {
  return `<main class="page docs-page">
<header class="page-head"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${description}</p></div><div class="page-index">${index.join('<br>')}</div></header>
${sections.join('\n')}
</main>`;
}

function section(number, label, title, description, body) {
  return `<section class="section"><div class="section-head"><div><span class="section-no">${number} / ${label}</span><h2>${title}</h2></div>${description ? `<p>${description}</p>` : ''}</div>${body}</section>`;
}

const designSystemPages = createDesignSystemPages({ shellContent, section });
const extraDesignSystemPages = createExtraDesignSystemPages({ shellContent, section });
const home = homePage({ shellContent, section });
const designSystemOverview = designSystemOverviewPage({ shellContent, section });
const assetPerformanceHeader = assetPerformanceHeaderPage({ shellContent, section });

const documentationPages = {
  ...legacyPages,
  ...brandFrameworkPages,
  ...designSystemPages,
  ...extraDesignSystemPages,
  ...chartPages,
  [assetPerformanceHeader.route]: assetPerformanceHeader.page,
  [home.route]: home.page,
  [designSystemOverview.route]: designSystemOverview.page,
};

module.exports = { documentationPages };
