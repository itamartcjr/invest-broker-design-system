function shellContent({ eyebrow, title, description, index = [], sections = [] }) {
  return `<main class="page docs-page">
<header class="page-head"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${description}</p></div><div class="page-index">${index.join('<br>')}</div></header>
${sections.join('\n')}
</main>`;
}

function section(number, label, title, description, body) {
  return `<section class="section"><div class="section-head"><div><span class="section-no">${number} / ${label}</span><h2>${title}</h2></div><p>${description}</p></div>${body}</section>`;
}

const home = shellContent({
  eyebrow: 'Invest Broker / design system',
  title: 'Documentação do produto.',
  description: 'A organização usa navegação lateral e cobertura de design system, enquanto a linguagem visual continua sendo a do CIIMO: escura, plana, densa e orientada a dados.',
  index: ['01 — Direção', '02 — Escopo', '03 — Domínio', '04 — Publicação'],
  sections: [
    section('01', 'Direção', 'Organização sem trocar a identidade', 'A referência externa define estrutura documental, cobertura e método. A identidade visual continua subordinada ao padrão CIIMO já usado nesta biblioteca.', `<div class="grid grid-3"><article class="specimen"><span class="variant-title">Visual</span><h3>CIIMO como fonte</h3><p>Fundo preto, superfícies planas, bordas discretas, radius amplos e verde ácido como destaque.</p></article><article class="specimen"><span class="variant-title">Estrutura</span><h3>Documentação modular</h3><p>Menu, grupos e links ficam em um único componente compartilhado, sem manutenção repetida página a página.</p></article><article class="specimen"><span class="variant-title">Navegação</span><h3>Sidebar persistente</h3><p>A troca de página atualiza somente o conteúdo principal. A sidebar não é remontada e preserva colapso e grupos durante a sessão.</p></article></div>`),
    section('02', 'Escopo', 'App e Web no mesmo catálogo', 'O design system mantém as duas superfícies existentes, mas passa a tratá-las como áreas de uma única documentação.', `<div class="grid grid-2"><article class="specimen"><span class="eyebrow">Aplicativo</span><h3>Produto e operação</h3><p>Fundamentos, entidades, dados, formulários, padrões e telas do ambiente operacional.</p><a class="btn primary" href="./app/index.html">Abrir App</a></article><article class="specimen"><span class="eyebrow">Web</span><h3>Site e conversão</h3><p>Fundamentos, dados, formulários, padrões e telas do ambiente web.</p><a class="btn primary" href="./web/index.html">Abrir Web</a></article></div>`),
    section('03', 'Domínio', 'Imóveis acompanhados como ativos', 'A documentação deve reforçar a leitura de carteira, valorização, histórico, benchmark e oportunidade — não apenas cadastro imobiliário.', `<div class="grid grid-4"><div class="metric"><small>Carteira</small><strong>Patrimônio</strong></div><div class="metric"><small>Desempenho</small><strong>Valorização</strong></div><div class="metric"><small>Mercado</small><strong>Comparáveis</strong></div><div class="metric"><small>Consultoria</small><strong>Contexto</strong></div></div>`),
    section('04', 'Publicação', 'Site estático gerado com Node', 'O conteúdo é compilado para dist e publicado no GitHub Pages por GitHub Actions, sem framework de runtime.', `<div class="specimen"><div class="specimen-label"><span>Build</span><code>npm run build</code></div><div class="cluster"><span class="chip active">Node 20</span><span class="chip">Static HTML</span><span class="chip">Persistent shell</span><span class="chip">GitHub Pages</span></div></div>`),
  ],
});

const coverage = shellContent({
  eyebrow: 'Invest Broker / documentação / cobertura',
  title: 'Cobertura orientada a produto.',
  description: 'Cada área deve documentar anatomia, variantes, estados, comportamento, conteúdo, acessibilidade e teste antes de ser considerada completa.',
  index: ['01 — Fundamentos', '02 — Componentes', '03 — Domínio', '04 — Critério de pronto'],
  sections: [
    section('01', 'Fundamentos', 'Base visual e de comportamento', 'Cor, tipografia, spacing, radius, grid, motion, acessibilidade e comportamento responsivo seguem os tokens já documentados no CIIMO.', `<div class="cluster"><span class="chip">Color</span><span class="chip">Typography</span><span class="chip">Spacing</span><span class="chip">Radius</span><span class="chip">Grid</span><span class="chip">Motion</span><span class="chip">A11y</span></div><div class="grid grid-4" style="margin-top:24px"><div class="metric"><small>Spacing</small><strong>6 · 10 · 16 · 24 · 32</strong></div><div class="metric"><small>Sidebar desktop</small><strong>82 / 248 px</strong></div><div class="metric"><small>Page base</small><strong>styles.css</strong></div><div class="metric"><small>Docs shell</small><strong>docs-page</strong></div></div><p style="margin-top:16px">App e Web usam diretamente o layout original de <code>styles.css</code>. Somente as páginas geradas da documentação recebem <code>docs-page</code>: o shell documental remove o padding externo, o cabeçalho usa 32 px no eixo vertical e 24 px no horizontal, e cada seção interna usa 24 px. Nenhuma regra de <code>docs.css</code> pode sobrescrever globalmente <code>.page</code>, <code>.page-head</code>, <code>.section</code> ou a tipografia das bibliotecas.</p>`),
    section('02', 'Componentes', 'Documentar além do preview', 'Cada componente precisa mostrar como funciona, quando usar e como se comporta nos estados reais do produto.', `<div class="anatomy"><div><b>01 Overview</b><span>Objetivo</span></div><div><b>02 Anatomy</b><span>Partes</span></div><div><b>03 States</b><span>Estados</span></div><div><b>04 Behavior</b><span>Interação</span></div></div>`),
    section('03', 'Domínio', 'Investimento imobiliário como camada própria', 'Carteira, imóvel, empreendimento, fluxo, valorização, benchmark, lançamento e acompanhamento consultivo entram como peças específicas.', `<div class="grid grid-3"><div class="specimen"><h3>Carteira</h3><p>Resumo, composição, concentração e evolução.</p></div><div class="specimen"><h3>Ativo</h3><p>Unidade, preço, histórico e comparáveis.</p></div><div class="specimen"><h3>Consultoria</h3><p>Sinais, revisão, recomendação e memória.</p></div></div>`),
    section('04', 'Pronto', 'Contrato mínimo por página', 'Uma página só está pronta quando a regra de uso é tão clara quanto o exemplo visual.', `<div class="alert success">Overview · Anatomy · Variants · Sizes · States · Behavior · Content · Accessibility · Testing · Do / Don't</div>`),
  ],
});

const sourceLinks = [
  ['Type Scale', 'https://type-scale.com/'],
  ['Practical Typography', 'https://practicaltypography.com/'],
  ['Material responsive layout grid', 'https://m2.material.io/design/layout/responsive-layout-grid.html'],
  ['Primer Web Design System', 'https://primer.style/'],
  ['Stark', 'https://www.getstark.co/'],
  ['Figma Community', 'https://www.figma.com/community'],
];

const sources = shellContent({
  eyebrow: 'Invest Broker / documentação / referências',
  title: 'Referências de método, não de identidade.',
  description: 'As mesmas famílias de referência usadas no projeto de organização servem para tipografia, grids, componentes, acessibilidade e testes. O visual final continua sendo CIIMO.',
  index: ['01 — Tipografia', '02 — Grid', '03 — Componentes', '04 — Acessibilidade'],
  sections: [
    section('01', 'Fontes', 'Links rastreáveis', 'Referências externas são usadas para amplitude, disciplina e validação; não para copiar a aparência de outra biblioteca.', `<div class="data-list">${sourceLinks.map(([label, href]) => `<div class="list-row"><strong>${label}</strong><small>Referência externa</small><small>Documentação</small><small>Web</small><a class="btn" href="${href}" target="_blank" rel="noreferrer">Abrir</a></div>`).join('')}</div>`),
    section('02', 'Limite', 'Hierarquia de decisão', 'Quando houver conflito entre uma referência externa e a linguagem do produto, prevalece a linguagem visual do CIIMO/Invest Broker.', `<div class="grid grid-3"><div class="metric"><small>1</small><strong>CIIMO visual</strong></div><div class="metric"><small>2</small><strong>Produto Invest Broker</strong></div><div class="metric"><small>3</small><strong>Referência documental</strong></div></div>`),
  ],
});

const documentationPages = {
  'index.html': { title: 'Invest Broker Design System', html: home },
  'getting-started/coverage.html': { title: 'Cobertura · Invest Broker Design System', html: coverage },
  'getting-started/sources.html': { title: 'Referências · Invest Broker Design System', html: sources },
};

module.exports = { documentationPages };
