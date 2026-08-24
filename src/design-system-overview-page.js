function designSystemOverviewPage({ shellContent, section }) {
  return {
    route: 'design-system/index.html',
    page: {
      title: 'Design System · CIIMO',
      html: shellContent({
        eyebrow: 'CIIMO / Design System',
        title: 'Regras para construir o produto CIIMO.',
        description: 'Foundations, tokens, componentes, patterns e estruturas que traduzem a identidade CIIMO para as superfícies do produto.',
        index: ['01 — Sistema', '02 — Componentes', '03 — Produto'],
        sections: [
          section('01', 'Sistema', 'Foundations e tokens.', 'Cor, tipografia, spacing, grid, breakpoints, radius, borders, elevation, ícones, temas, motion e tokens semânticos.', `<div class="grid grid-2"><article class="specimen"><h3>Foundations</h3><p>Decisões visuais e comportamentais que sustentam todas as superfícies.</p><a class="btn" href="../foundations/brand-principles.html">Abrir Foundations</a></article><article class="specimen"><h3>Tokens</h3><p>Primitive, Semantic e Component tokens organizam valores e intenção.</p><a class="btn" href="../tokens/primitive.html">Abrir Tokens</a></article></div>`),
          section('02', 'Componentes', 'Components, Patterns e Templates.', 'A biblioteca documenta somente peças e comportamentos comprovados no produto.', `<div class="grid grid-3"><article class="specimen"><h3>Components</h3><p>Buttons, fields, data display, feedback e navigation.</p><a class="btn" href="../components/index.html">Abrir Components</a></article><article class="specimen"><h3>Patterns</h3><p>Leitura de investimento, comparação e acompanhamento contínuo.</p><a class="btn" href="../patterns/investment-reading.html">Abrir Patterns</a></article><article class="specimen"><h3>Templates</h3><p>Estruturas recorrentes para carteira, ativo e inteligência territorial.</p><a class="btn" href="../templates/index.html">Abrir Templates</a></article></div>`),
          section('03', 'Produto', 'App e Web.', 'As duas superfícies pertencem ao mesmo Design System, mas preservam diferenças reais de implementação e contexto.', `<div class="grid grid-2"><article class="specimen"><span class="eyebrow">App</span><h3>Patrimônio, carteira e inteligência.</h3><p>Fundamentos, entidades, dados, formulários, padrões e telas do aplicativo.</p><a class="btn primary" href="../app/index.html">Abrir App</a></article><article class="specimen"><span class="eyebrow">Web</span><h3>Aquisição, conta e operação web.</h3><p>Fundamentos, dados, formulários, padrões e telas da superfície web.</p><a class="btn primary" href="../web/index.html">Abrir Web</a></article></div>`),
        ],
      }),
    },
  };
}

module.exports = { designSystemOverviewPage };
