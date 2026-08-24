const { documentationPages: legacyPages } = require('./site-pages');
const { brandFrameworkPages } = require('./brand/framework-pages');
const { createDesignSystemPages } = require('./design-system-pages');

function shellContent({ eyebrow, title, description, index = [], sections = [] }) {
  return `<main class="page docs-page">
<header class="page-head"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${description}</p></div><div class="page-index">${index.join('<br>')}</div></header>
${sections.join('\n')}
</main>`;
}

function section(number, label, title, description, body) {
  return `<section class="section"><div class="section-head"><div><span class="section-no">${number} / ${label}</span><h2>${title}</h2></div><p>${description}</p></div>${body}</section>`;
}

const designSystemPages = createDesignSystemPages({ shellContent, section });

const documentationPages = {
  ...legacyPages,
  ...brandFrameworkPages,
  ...designSystemPages,
};

module.exports = { documentationPages };
