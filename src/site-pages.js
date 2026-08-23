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

const icons = shellContent({
  eyebrow: 'Invest Broker / documentação / ícones',
  title: 'Ícones.',
  description: 'Hugeicons é a biblioteca oficial de ícones do Invest Broker. A documentação usa o Icon Font gratuito no estilo Stroke Rounded para manter consistência entre navegação, ações e estados.',
  index: ['01 — Biblioteca', '02 — Escala', '03 — Interação', '04 — Implementação'],
  sections: [
    section('01', 'Biblioteca', 'Hugeicons / Stroke Rounded', 'Use um único sistema de ícones. Não misture caracteres Unicode, emojis ou desenhos avulsos quando houver equivalente na Hugeicons.', `<div class="grid grid-4"><div class="metric"><small>Biblioteca</small><strong>Hugeicons</strong></div><div class="metric"><small>Estilo</small><strong>Stroke Rounded</strong></div><div class="metric"><small>Cor</small><strong>currentColor</strong></div><div class="metric"><small>Entrega</small><strong>Icon Font CDN</strong></div></div><div class="icon-doc-grid" style="margin-top:24px"><div class="icon-sample"><i class="hgi-stroke hgi-home-01" aria-hidden="true"></i><code>home-01</code></div><div class="icon-sample"><i class="hgi-stroke hgi-search-01" aria-hidden="true"></i><code>search-01</code></div><div class="icon-sample"><i class="hgi-stroke hgi-user" aria-hidden="true"></i><code>user</code></div><div class="icon-sample"><i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i><code>arrow-right-01</code></div><div class="icon-sample"><i class="hgi-stroke hgi-arrow-down-01" aria-hidden="true"></i><code>arrow-down-01</code></div></div>`),
    section('02', 'Escala', 'Tamanho segue hierarquia, não decoração', 'O ícone deve acompanhar a densidade do controle e nunca ser usado para compensar texto ou espaço insuficiente.', `<div class="icon-size-row"><div class="icon-size-item"><i class="hgi-stroke hgi-search-01" style="font-size:16px" aria-hidden="true"></i><strong>16 px</strong><small>Metadado e UI densa</small></div><div class="icon-size-item"><i class="hgi-stroke hgi-search-01" style="font-size:20px" aria-hidden="true"></i><strong>20 px</strong><small>Padrão de interface</small></div><div class="icon-size-item"><i class="hgi-stroke hgi-search-01" style="font-size:24px" aria-hidden="true"></i><strong>24 px</strong><small>Ação enfatizada</small></div><div class="icon-size-item"><span class="icon-btn" aria-hidden="true"><i class="hgi-stroke hgi-search-01" style="font-size:20px"></i></span><strong>44 px</strong><small>Alvo mínimo de toque</small></div></div>`),
    section('03', 'Interação', 'Setas mantêm o mesmo ícone', 'Estados de expandir e recolher mudam por rotação. Não troque o ícone por caracteres diferentes entre estados.', `<div class="icon-rule-list"><div><strong>Sidebar principal</strong><span><code>arrow-right-01</code> em 18 px; aponta para a direita ao expandir e gira 180° quando o menu está aberto.</span></div><div><strong>Grupos do menu</strong><span><code>arrow-right-01</code> em 16 px; gira 90° quando o grupo está aberto.</span></div><div><strong>Cor</strong><span>Herda <code>currentColor</code> do controle. O estado visual vem do componente, não do ícone.</span></div><div><strong>Acessibilidade</strong><span>Ícones decorativos usam <code>aria-hidden="true"</code>. Botões somente com ícone precisam de <code>aria-label</code>.</span></div></div>`),
    section('04', 'Implementação', 'HTML estático e componentes', 'No site de documentação o Icon Font é carregado uma vez por docs.css. Em aplicações React/React Native, mantenha a mesma família visual usando o pacote Hugeicons correspondente à plataforma.', `<div class="grid grid-2"><article class="specimen"><span class="variant-title">HTML</span><h3>Ícone decorativo</h3><pre class="code-sample"><code>&lt;i class="hgi-stroke hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;</code></pre></article><article class="specimen"><span class="variant-title">Controle</span><h3>Botão somente com ícone</h3><pre class="code-sample"><code>&lt;button aria-label="Buscar"&gt;\n  &lt;i class="hgi-stroke hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;\n&lt;/button&gt;</code></pre></article></div><div class="alert success" style="margin-top:16px">Fonte oficial: Hugeicons. Para novos ícones, procure primeiro na biblioteca e mantenha Stroke Rounded antes de criar qualquer alternativa.</div>`),
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
  'getting-started/icons.html': { title: 'Ícones · Invest Broker Design System', html: icons },
  'getting-started/sources.html': { title: 'Referências · Invest Broker Design System', html: sources },
};

module.exports = { documentationPages };
