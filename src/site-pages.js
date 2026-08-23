const { createBrandPages } = require('./brand/brand-pages');
const { brandBook } = require('./brand/brand-book');

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
  eyebrow: 'CIIMO / design system',
  title: 'Imóveis acompanhados como ativos.',
  description: brandBook.promise,
  index: ['01 — Marca', '02 — Produto', '03 — Sistema', '04 — Publicação'],
  sections: [
    section('01', 'Marca', 'A estratégia vem antes do componente', 'Essência, posicionamento, personalidade, linguagem e princípios de experiência orientam as decisões do sistema.', `<div class="grid grid-3"><article class="specimen"><span class="variant-title">Essência</span><h3>Carteira imobiliária acompanhável</h3><p>${brandBook.essence}</p><a class="btn primary" href="./brand/index.html">Abrir marca</a></article><article class="specimen"><span class="variant-title">Posicionamento</span><h3>${brandBook.positioning.primary}</h3><a class="btn" href="./brand/positioning.html">Ver posicionamento</a></article><article class="specimen"><span class="variant-title">Personalidade</span><h3>Inteligente, financeira, consultiva e sofisticada</h3><p>Sem ser complicada, fria ou distante.</p><a class="btn" href="./brand/personality.html">Ver personalidade</a></article></div>`),
    section('02', 'Produto', 'App e Web dentro de uma única biblioteca', 'As superfícies compartilham a marca, mas preservam diferenças reais de implementação, tipografia e contexto.', `<div class="grid grid-2"><article class="specimen"><span class="eyebrow">Aplicativo</span><h3>Patrimônio e operação</h3><p>Fundamentos, entidades, dados, formulários, padrões e telas do ambiente de acompanhamento e inteligência.</p><a class="btn primary" href="./app/index.html">Abrir App</a></article><article class="specimen"><span class="eyebrow">Web</span><h3>Aquisição, conta e cobrança</h3><p>Fundamentos, dados, formulários, padrões e telas do ambiente web, sem forçar os tokens do App onde o produto real é diferente.</p><a class="btn primary" href="./web/index.html">Abrir Web</a></article></div>`),
    section('03', 'Sistema', 'Documentação guiada pelo produto real', 'A organização segue uma biblioteca documental modular, mas identidade, componentes e comportamento devem ser comprováveis nos projetos CIIMO/Invest Broker.', `<div class="grid grid-4"><div class="metric"><small>Carteira</small><strong>Patrimônio</strong></div><div class="metric"><small>Desempenho</small><strong>Valorização</strong></div><div class="metric"><small>Mercado</small><strong>Comparáveis</strong></div><div class="metric"><small>Consultoria</small><strong>Contexto</strong></div></div>`),
    section('04', 'Publicação', 'Node gera o site publicado', 'A camada documental é definida em módulos JavaScript e compilada para dist. O GitHub Pages recebe apenas a saída do build.', `<div class="specimen"><div class="specimen-label"><span>Build</span><code>npm run build</code></div><div class="cluster"><span class="chip active">Node 20</span><span class="chip">Generated HTML</span><span class="chip">Persistent shell</span><span class="chip">GitHub Pages</span></div></div>`),
  ],
});

const coverage = shellContent({
  eyebrow: 'CIIMO / documentação / cobertura',
  title: 'Cobertura orientada a produto.',
  description: 'Cada área deve documentar anatomia, variantes, estados, comportamento, conteúdo, acessibilidade e teste antes de ser considerada completa.',
  index: ['01 — Fundamentos', '02 — Componentes', '03 — Domínio', '04 — Critério de pronto'],
  sections: [
    section('01', 'Fundamentos', 'Base visual e de comportamento', 'Cor, tipografia, spacing, radius, grid, motion, acessibilidade e comportamento responsivo seguem os tokens documentados para cada superfície.', `<div class="cluster"><span class="chip">Color</span><span class="chip">Typography</span><span class="chip">Spacing</span><span class="chip">Radius</span><span class="chip">Grid</span><span class="chip">Motion</span><span class="chip">A11y</span></div><div class="grid grid-4" style="margin-top:24px"><div class="metric"><small>Spacing App</small><strong>6 · 10 · 16 · 24 · 32</strong></div><div class="metric"><small>Sidebar docs</small><strong>82 / 248 px</strong></div><div class="metric"><small>Page base</small><strong>styles.css</strong></div><div class="metric"><small>Docs shell</small><strong>docs-page</strong></div></div><p style="margin-top:16px">App e Web usam o layout-base de <code>styles.css</code>. Somente páginas geradas da documentação e da marca recebem <code>docs-page</code>. Nenhuma regra de <code>docs.css</code> pode sobrescrever globalmente <code>.page</code>, <code>.page-head</code>, <code>.section</code> ou a tipografia das bibliotecas.</p>`),
    section('02', 'Componentes', 'Documentar além do preview', 'Cada componente precisa mostrar como funciona, quando usar e como se comporta nos estados reais do produto.', `<div class="anatomy"><div><b>01 Overview</b><span>Objetivo</span></div><div><b>02 Anatomy</b><span>Partes</span></div><div><b>03 States</b><span>Estados</span></div><div><b>04 Behavior</b><span>Interação</span></div></div>`),
    section('03', 'Domínio', 'Investimento imobiliário como camada própria', 'Carteira, imóvel, empreendimento, fluxo, valorização, benchmark, lançamento e acompanhamento consultivo entram como peças específicas.', `<div class="grid grid-3"><div class="specimen"><h3>Carteira</h3><p>Resumo, composição, concentração e evolução.</p></div><div class="specimen"><h3>Ativo</h3><p>Unidade, preço, histórico e comparáveis.</p></div><div class="specimen"><h3>Consultoria</h3><p>Sinais, revisão, recomendação e memória.</p></div></div>`),
    section('04', 'Pronto', 'Contrato mínimo por página', 'Uma página só está pronta quando a regra de uso é tão clara quanto o exemplo visual.', `<div class="alert success">Overview · Anatomy · Variants · Sizes · States · Behavior · Content · Accessibility · Testing · Do / Don't</div>`),
  ],
});

const icons = shellContent({
  eyebrow: 'CIIMO / documentação / ícones',
  title: 'Ícones.',
  description: 'Hugeicons é a biblioteca oficial de ícones do produto. A documentação usa o Icon Font gratuito no estilo Stroke Rounded para manter consistência entre navegação, ações e estados.',
  index: ['01 — Biblioteca', '02 — Escala', '03 — Interação', '04 — Implementação'],
  sections: [
    section('01', 'Biblioteca', 'Hugeicons / Stroke Rounded', 'Use um único sistema de ícones. Não misture caracteres Unicode, emojis ou desenhos avulsos quando houver equivalente na Hugeicons.', `<div class="grid grid-4"><div class="metric"><small>Biblioteca</small><strong>Hugeicons</strong></div><div class="metric"><small>Estilo</small><strong>Stroke Rounded</strong></div><div class="metric"><small>Cor</small><strong>currentColor</strong></div><div class="metric"><small>Entrega docs</small><strong>Icon Font CDN</strong></div></div><div class="icon-doc-grid" style="margin-top:24px"><div class="icon-sample"><i class="hgi-stroke hgi-home-01" aria-hidden="true"></i><code>home-01</code></div><div class="icon-sample"><i class="hgi-stroke hgi-search-01" aria-hidden="true"></i><code>search-01</code></div><div class="icon-sample"><i class="hgi-stroke hgi-user" aria-hidden="true"></i><code>user</code></div><div class="icon-sample"><i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i><code>arrow-right-01</code></div><div class="icon-sample"><i class="hgi-stroke hgi-arrow-down-01" aria-hidden="true"></i><code>arrow-down-01</code></div></div>`),
    section('02', 'Escala', 'Tamanho segue hierarquia, não decoração', 'O ícone deve acompanhar a densidade do controle e nunca ser usado para compensar texto ou espaço insuficiente.', `<div class="icon-size-row"><div class="icon-size-item"><i class="hgi-stroke hgi-search-01" style="font-size:16px" aria-hidden="true"></i><strong>16 px</strong><small>Metadado e UI densa</small></div><div class="icon-size-item"><i class="hgi-stroke hgi-search-01" style="font-size:20px" aria-hidden="true"></i><strong>20 px</strong><small>Padrão de interface</small></div><div class="icon-size-item"><i class="hgi-stroke hgi-search-01" style="font-size:24px" aria-hidden="true"></i><strong>24 px</strong><small>Ação enfatizada</small></div><div class="icon-size-item"><span class="icon-btn" aria-hidden="true"><i class="hgi-stroke hgi-search-01" style="font-size:20px"></i></span><strong>44 px</strong><small>Alvo mínimo de toque</small></div></div>`),
    section('03', 'Interação', 'Setas mantêm o mesmo ícone', 'Estados de expandir e recolher mudam por rotação. Não troque o ícone por caracteres diferentes entre estados.', `<div class="icon-rule-list"><div><strong>Sidebar principal</strong><span><code>arrow-right-01</code> em 18 px; aponta para a direita ao expandir e gira 180° quando o menu está aberto.</span></div><div><strong>Grupos do menu</strong><span><code>arrow-right-01</code> em 16 px; gira 90° quando o grupo está aberto.</span></div><div><strong>Cor</strong><span>Herda <code>currentColor</code> do controle.</span></div><div><strong>Acessibilidade</strong><span>Ícones decorativos usam <code>aria-hidden="true"</code>. Botões somente com ícone precisam de <code>aria-label</code>.</span></div></div>`),
    section('04', 'Implementação', 'HTML estático e componentes', 'No site de documentação o Icon Font é carregado uma vez por docs.css. Nas aplicações, mantenha a mesma família visual com o pacote Hugeicons correspondente.', `<div class="grid grid-2"><article class="specimen"><span class="variant-title">HTML</span><h3>Ícone decorativo</h3><pre class="code-sample"><code>&lt;i class="hgi-stroke hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;</code></pre></article><article class="specimen"><span class="variant-title">Controle</span><h3>Botão somente com ícone</h3><pre class="code-sample"><code>&lt;button aria-label="Buscar"&gt;\n  &lt;i class="hgi-stroke hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;\n&lt;/button&gt;</code></pre></article></div>`),
  ],
});

const sourceLinks = [
  ['Hugeicons', 'https://hugeicons.com/docs/icons-for-web/quick-start'],
  ['Type Scale', 'https://type-scale.com/'],
  ['Practical Typography', 'https://practicaltypography.com/'],
  ['Material responsive layout grid', 'https://m2.material.io/design/layout/responsive-layout-grid.html'],
  ['Primer Web Design System', 'https://primer.style/'],
  ['Stark', 'https://www.getstark.co/'],
  ['Figma Community', 'https://www.figma.com/community'],
];

const sources = shellContent({
  eyebrow: 'CIIMO / documentação / referências',
  title: 'Referências de método, não de identidade.',
  description: 'Fontes externas servem para tipografia, grids, componentes, acessibilidade e testes. Estratégia e identidade vêm da marca e dos produtos reais.',
  index: ['01 — Internas', '02 — Externas', '03 — Precedência'],
  sections: [
    section('01', 'Internas', 'Fontes que definem o produto', 'A estratégia de marca e os projetos reais têm precedência sobre referências externas.', `<div class="data-list"><div class="list-row"><strong>Documento de Tom, Visão e Posicionamento</strong><small>Estratégia de marca</small><small>Marca</small><small>Fonte interna</small></div><div class="list-row"><strong>invest-broker-app</strong><small>Produto real</small><small>App</small><small>Fonte interna</small></div><div class="list-row"><strong>invest-broker-site</strong><small>Produto real</small><small>Web</small><small>Fonte interna</small></div><div class="list-row"><strong>Assets CIIMO</strong><small>Logotipo e símbolos</small><small>Marca</small><small>Repositório</small></div></div>`),
    section('02', 'Externas', 'Links rastreáveis', 'Referências externas são usadas para amplitude, disciplina e validação; não para copiar a aparência de outra biblioteca.', `<div class="data-list">${sourceLinks.map(([label, href]) => `<div class="list-row"><strong>${label}</strong><small>Referência externa</small><small>Documentação</small><small>Web</small><a class="btn" href="${href}" target="_blank" rel="noreferrer">Abrir</a></div>`).join('')}</div>`),
    section('03', 'Precedência', 'Hierarquia de decisão', 'Quando houver conflito, prevalece primeiro a estratégia registrada, depois o produto real e só então referências documentais externas.', `<div class="grid grid-4"><div class="metric"><small>1</small><strong>Estratégia da marca</strong></div><div class="metric"><small>2</small><strong>Produto real</strong></div><div class="metric"><small>3</small><strong>Design system</strong></div><div class="metric"><small>4</small><strong>Referência externa</strong></div></div>`),
  ],
});

const brandPages = createBrandPages({ shellContent, section });

const documentationPages = {
  'index.html': { title: 'CIIMO Design System · Invest Broker', html: home },
  ...brandPages,
  'getting-started/coverage.html': { title: 'Cobertura · CIIMO Design System', html: coverage },
  'getting-started/icons.html': { title: 'Ícones · CIIMO Design System', html: icons },
  'getting-started/sources.html': { title: 'Referências · CIIMO Design System', html: sources },
};

module.exports = { documentationPages, shellContent, section };
