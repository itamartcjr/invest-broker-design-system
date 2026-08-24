function homePage({ shellContent, section }) {
  return {
    route: 'index.html',
    page: {
      title: 'CIIMO · Brand e Design System',
      html: shellContent({
        eyebrow: 'CIIMO',
        title: 'Marca e produto em um só sistema.',
        description: 'A Brand define significado, posicionamento, linguagem e expressão. O Design System transforma essas decisões em foundations, tokens, componentes e padrões para App e Web.',
        index: ['01 — Brand', '02 — Design System'],
        sections: [
          section('01', 'Brand', 'A marca.', 'Essência, estratégia, públicos, personalidade, linguagem, identidade visual, experiência e governança.', `<div class="specimen"><h3>CIIMO Brand Book</h3><p>Seu imóvel deixa de ser apenas uma compra e passa a ser acompanhado como investimento.</p><a class="btn primary" href="./brand/index.html">Abrir Brand</a></div>`),
          section('02', 'Design System', 'O produto.', 'Foundations, tokens, componentes, patterns, templates, exemplos e as bibliotecas específicas de App e Web.', `<div class="specimen"><h3>CIIMO Design System</h3><p>Regras visuais e de comportamento aplicadas às superfícies reais do produto.</p><a class="btn primary" href="./design-system/index.html">Abrir Design System</a></div>`),
        ],
      }),
    },
  };
}

module.exports = { homePage };
