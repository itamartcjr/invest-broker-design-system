const { brandBook } = require('./brand/brand-book');

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createDesignSystemPages({ shellContent, section }) {
  const brandToUi = shellContent({
    eyebrow: 'CIIMO / foundations / marca para interface',
    title: 'A marca precisa ser percebida antes de ser explicada.',
    description: 'O Design System traduz a criação da marca em decisões visuais e comportamentais. A referência externa organiza a documentação; estes princípios vêm do documento CIIMO e do produto real.',
    index: ['01 — Percepção', '02 — Experiência', '03 — Conteúdo', '04 — Filtro'],
    sections: [
      section('01', 'Percepção', 'Cada atributo precisa produzir um comportamento observável', 'Os contrastes da marca não são adjetivos decorativos. Eles determinam como a interface lida com informação, densidade e orientação.', `<div class="brand-translation-grid">${brandBook.perception.map(([trait, limit]) => `<article><small>${esc(trait)}</small><strong>${esc(limit)}</strong><p>${trait === 'Inteligente' ? 'Mostrar contexto, comparação e metodologia sem esconder o dado.' : trait === 'Financeira' ? 'Priorizar patrimônio, desempenho e evolução com linguagem humana.' : trait === 'Consultiva' ? 'Adicionar leitura e próximo passo sem transformar a tela em relatório técnico.' : trait === 'Sofisticada' ? 'Reduzir ruído, bordas e peso tipográfico; usar espaço para criar hierarquia.' : 'Combinar repertório imobiliário com padrões contemporâneos de produto digital.'}</p></article>`).join('')}</div>`),
      section('02', 'Experiência', 'Carteira viva, não cadastro parado', brandBook.experienceSummary, `<div class="grid grid-3">${brandBook.experience.map((entry, index) => `<div class="metric"><small>${String(index + 1).padStart(2, '0')}</small><strong>${esc(entry)}</strong></div>`).join('')}</div>`),
      section('03', 'Conteúdo', 'O dado precisa dizer o que significa', 'A interface não deve apenas exibir números. Ela precisa ajudar o usuário a entender patrimônio, mudança, comparação e contexto.', `<div class="brand-reading-flow"><article><small>1</small><strong>Patrimônio</strong><span>Quanto tenho / quanto foi pago</span></article><i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i><article><small>2</small><strong>Evolução</strong><span>Como mudou no tempo</span></article><i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i><article><small>3</small><strong>Comparação</strong><span>Como se posiciona no mercado</span></article><i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i><article><small>4</small><strong>Orientação</strong><span>O que observar a seguir</span></article></div>`),
      section('04', 'Filtro', 'A pergunta que fecha qualquer revisão', 'Quando duas soluções forem possíveis, prevalece a que melhor materializa a promessa e a direção prática registrada para a CIIMO.', `<div class="brand-statement"><span class="eyebrow">CRITÉRIO CENTRAL</span><h2>“${esc(brandBook.centralQuestion)}”</h2></div>`),
    ],
  });

  const colors = shellContent({
    eyebrow: 'CIIMO / foundations / colors',
    title: 'Cor com função, não com volume.',
    description: 'O lime identifica a CIIMO, mas não precisa dominar toda a interface. Dark e Light usam tokens semânticos para preservar reconhecimento e legibilidade.',
    index: ['01 — Marca', '02 — Neutros', '03 — Semânticos', '04 — Regra'],
    sections: [
      section('01', 'Marca', 'CIIMO Lime', 'A cor de marca permanece #D4FB00. Ela é usada como marca, CTA principal, seleção preenchida e estado realmente importante.', `<div class="brand-color-board"><div style="--swatch:#D4FB00"><span></span><strong>accent</strong><code>#D4FB00</code><small>Marca · CTA · seleção</small></div><div style="--swatch:#5B6C00"><span></span><strong>accent-content / Light</strong><code>#5B6C00</code><small>Texto · ícone · foco</small></div></div>`),
      section('02', 'Neutros', 'O patrimônio precisa de um palco calmo', 'As superfícies reduzem ruído para que valores, comparação e orientação tenham prioridade.', `<div class="brand-color-board"><div style="--swatch:#000000"><span></span><strong>background.dark</strong><code>#000000</code></div><div style="--swatch:#0B0B0B"><span></span><strong>surface.dark</strong><code>#0B0B0B</code></div><div style="--swatch:#F4F1EA"><span></span><strong>background.light</strong><code>#F4F1EA</code></div><div style="--swatch:#FFFFFF"><span></span><strong>surface.light</strong><code>#FFFFFF</code></div></div>`),
      section('03', 'Semânticos', 'Cor auxiliar sempre carrega significado', 'Azul, dourado, success e danger não competem com a assinatura. Entram apenas quando existe informação, destaque financeiro, confirmação ou risco.', `<div class="brand-color-board"><div style="--swatch:#4DA3FF"><span></span><strong>blue</strong><code>#4DA3FF</code><small>Informação</small></div><div style="--swatch:#FFC452"><span></span><strong>gold</strong><code>#FFC452</code><small>Destaque financeiro</small></div><div style="--swatch:#5EE09B"><span></span><strong>success</strong><code>#5EE09B</code><small>Confirmação</small></div><div style="--swatch:#FF8B8B"><span></span><strong>danger</strong><code>#FF8B8B</code><small>Erro · risco</small></div></div>`),
      section('04', 'Regra', 'Marca ≠ cor de texto', 'No Light, #D4FB00 continua sendo a marca, mas texto e ícone verde usam #5B6C00 para manter contraste. A cor não deve ser escurecida globalmente só para resolver conteúdo.', `<div class="alert success">Lime para presença de marca. Accent-content para legibilidade. Neutros para dar respiro.</div>`),
    ],
  });

  const typography = shellContent({
    eyebrow: 'CIIMO / foundations / typography',
    title: 'Financeira sem ficar pesada.',
    description: 'A tipografia precisa carregar patrimônio, comparação e números importantes com segurança, mas a interface não pode parecer um painel que grita em todos os níveis.',
    index: ['01 — App', '02 — Web', '03 — Peso', '04 — Hierarquia'],
    sections: [
      section('01', 'App', 'Kanit é a família principal', 'A implementação atual importa Kanit de 100 a 900. A direção refinada trabalha principalmente com 400, 500, 600 e 700.', `<div class="type-brand-hero"><span>Aa</span><div><h3>Kanit</h3><p>100–900 · normal e itálico</p><strong>Patrimônio · Carteira · Mercado · Valorização</strong></div></div>`),
      section('02', 'Web', 'A superfície Web preserva sua implementação real', 'A documentação não força Kanit onde o produto web usa Inter/system-ui. A marca é consistente pela hierarquia e pela linguagem, não por apagar diferenças de plataforma.', `<div class="specimen"><span class="variant-title">Web</span><h3 style="font-family:Inter,system-ui,sans-serif">Inter / system-ui</h3><p>Use quando essa for a família comprovada na superfície web.</p></div>`),
      section('03', 'Peso', 'Menos 900, mais hierarquia', 'Sofisticação e clareza pedem menos peso simultâneo. O peso forte fica reservado ao que realmente precisa liderar.', `<div class="grid grid-4"><div class="metric"><small>Body</small><strong>400</strong></div><div class="metric"><small>Interface</small><strong>500</strong></div><div class="metric"><small>Título / label</small><strong>600</strong></div><div class="metric"><small>Dado importante</small><strong>700</strong></div></div>`),
      section('04', 'Hierarquia', 'O número precisa ser entendido antes de ser admirado', 'Títulos contextualizam. Métricas mostram valor. Labels organizam. Texto auxiliar explica. Nenhum deles deve disputar a mesma intensidade.', `<div class="specimen"><span class="meta-label">VALORIZAÇÃO ACUMULADA</span><div class="type-display">+18,4%</div><p>Desde a compra · comparação com o valor original</p></div>`),
    ],
  });

  const spacingLayout = shellContent({
    eyebrow: 'CIIMO / foundations / spacing & layout',
    title: 'Respiro é parte da inteligência.',
    description: 'A escala é curta porque o objetivo é previsibilidade. O layout usa espaço antes de adicionar borda, superfície ou cor.',
    index: ['01 — Escala', '02 — Ritmo', '03 — Shell', '04 — Mobile'],
    sections: [
      section('01', 'Escala', '6 · 10 · 16 · 24 · 32', 'Os cinco valores são a base documentada. Novos valores só entram quando houver necessidade recorrente comprovada.', `<div class="spacing-visual">${[6,10,16,24,32].map((v) => `<div><code>space.${v}</code><span style="width:${v * 4}px"></span><strong>${v}px</strong></div>`).join('')}</div>`),
      section('02', 'Ritmo', '24 para seção. 32 para macro.', '24px organiza conteúdo interno e 32px separa blocos macro. 64px só aparece como composição de dois espaços macro, não como novo degrau da escala.', `<div class="grid grid-2"><div class="metric"><small>section</small><strong>24 px</strong></div><div class="metric"><small>macro</small><strong>32 px</strong></div></div>`),
      section('03', 'Shell', 'Topbar e topo da sidebar usam a mesma geometria', 'O shell documental tem 64px no topo. Logo, breadcrumb e ações compartilham a mesma linha visual.', `<div class="shell-measure"><aside>CIIMO</aside><header>64 px · breadcrumb · GitHub · tema</header></div>`),
      section('04', 'Mobile', 'Mudar estrutura, não apenas reduzir', 'Até 760px a topbar permanece e a sidebar vira drawer. Grids viram uma coluna por padrão; tabela e fluxos largos rolam dentro do próprio componente.', `<div class="grid grid-4"><div class="metric"><small>Breakpoint</small><strong>760 px</strong></div><div class="metric"><small>Lateral</small><strong>16 px</strong></div><div class="metric"><small>Touch</small><strong>≥ 44 px</strong></div><div class="metric"><small>Drawer</small><strong>≤ 292 px</strong></div></div>`),
    ],
  });

  const motion = shellContent({
    eyebrow: 'CIIMO / foundations / motion',
    title: 'Movimento confirma estado.',
    description: 'A identidade atual não usa motion como espetáculo. O movimento serve para mostrar mudança de estado, abertura, foco e carregamento com discrição.',
    index: ['01 — Shell', '02 — Drawer', '03 — Loading', '04 — Produto'],
    sections: [
      section('01', 'Shell', '180ms ease é o padrão comprovado na documentação', 'Sidebar, rotação de chevron, backdrop e troca de tema usam transições curtas para manter resposta imediata.', `<div class="motion-demo"><button class="motion-demo__button">Hover / focus</button><div class="motion-demo__track"><i></i></div><code>180ms ease</code></div>`),
      section('02', 'Drawer', 'Translate e opacity trabalham juntos', 'No mobile, a sidebar entra por translateX; o backdrop aparece por opacity. A transição informa mudança de camada sem alterar a identidade do produto.', `<div class="motion-steps"><span>Fechado</span><i class="hgi-stroke hgi-arrow-right-01"></i><span>translateX</span><i class="hgi-stroke hgi-arrow-right-01"></i><span>Aberto</span></div>`),
      section('03', 'Loading', 'Skeleton mantém continuidade visual', 'O skeleton atual usa shimmer de 1.35s em loop. Ele existe para indicar atividade sem criar um spinner dominante.', `<div class="specimen"><div class="skeleton" style="height:18px;width:70%"></div><div class="skeleton" style="height:18px;width:45%;margin-top:10px"></div><p style="margin-top:16px"><code>animation: shimmer 1.35s infinite</code></p></div>`),
      section('04', 'Produto', 'Não promover o motion do shell a token do App sem auditoria', 'O documento estratégico não define curvas do produto. Antes de criar tokens globais de motion, é obrigatório auditar App e Web e agrupar somente valores recorrentes.', `<div class="alert">Status: motion do shell documentado; sistema completo de motion do produto ainda precisa de auditoria específica.</div>`),
    ],
  });

  const primitiveTokens = shellContent({
    eyebrow: 'CIIMO / tokens / primitive',
    title: 'Valores puros, sem significado de uso.',
    description: 'Primitive tokens registram os valores que existem antes de serem aplicados a uma intenção semântica.',
    index: ['01 — Color', '02 — Space', '03 — Radius', '04 — Motion'],
    sections: [
      section('01', 'Color', 'Valores-base', 'Não use o nome do papel aqui. Primitive descreve o valor.', `<div class="data-list"><div class="list-row"><strong>lime-500</strong><small>#D4FB00</small><small>Color</small><small>Primitive</small></div><div class="list-row"><strong>black-1000</strong><small>#000000</small><small>Color</small><small>Primitive</small></div><div class="list-row"><strong>ivory-100</strong><small>#F4F1EA</small><small>Color</small><small>Primitive</small></div></div>`),
      section('02', 'Space', 'Escala CIIMO', 'A escala documentada é reutilizada por layout e componentes.', `<div class="cluster"><span class="chip">space-6</span><span class="chip">space-10</span><span class="chip">space-16</span><span class="chip">space-24</span><span class="chip">space-32</span></div>`),
      section('03', 'Radius', 'Forma comprovada no sistema', 'Os raios existentes são 14, 16, 24 e pill.', `<div class="radius-token-row"><i style="border-radius:14px">14</i><i style="border-radius:16px">16</i><i style="border-radius:24px">24</i><i style="border-radius:999px">pill</i></div>`),
      section('04', 'Motion', 'Somente o que está comprovado', 'A documentação usa 180ms ease; o produto ainda precisa de auditoria para uma escala própria.', `<div class="metric"><small>docs.motion.base</small><strong>180ms ease</strong></div>`),
    ],
  });

  const semanticTokens = shellContent({
    eyebrow: 'CIIMO / tokens / semantic',
    title: 'O valor recebe intenção.',
    description: 'Semantic tokens conectam a linguagem CIIMO ao contexto de uso e permitem Light/Dark sem reescrever componente por componente.',
    index: ['01 — Background', '02 — Text', '03 — Accent', '04 — Feedback'],
    sections: [
      section('01', 'Background', 'Canvas e superfícies', 'Background e surface mudam com o tema; a intenção permanece.', `<div class="data-list"><div class="list-row"><strong>color.background.canvas</strong><small>--bg</small><small>Dark #000 / Light #F4F1EA</small><small>Semantic</small></div><div class="list-row"><strong>color.background.surface</strong><small>--surface</small><small>Dark #0B0B0B / Light #FFF</small><small>Semantic</small></div></div>`),
      section('02', 'Text', 'Leitura antes de decoração', 'Texto principal, muted e conteúdo de accent têm papéis distintos.', `<div class="data-list"><div class="list-row"><strong>color.text.primary</strong><small>--text</small><small>Conteúdo principal</small><small>Semantic</small></div><div class="list-row"><strong>color.text.secondary</strong><small>--muted</small><small>Apoio</small><small>Semantic</small></div></div>`),
      section('03', 'Accent', 'Marca e conteúdo separados', 'O mesmo lime não deve ser usado cegamente em qualquer contexto.', `<div class="data-list"><div class="list-row"><strong>color.brand.accent</strong><small>--accent</small><small>#D4FB00</small><small>Marca/ação</small></div><div class="list-row"><strong>color.content.accent</strong><small>--accent-content</small><small>Dark lime / Light #5B6C00</small><small>Conteúdo</small></div></div>`),
      section('04', 'Feedback', 'Cores auxiliares são semânticas', 'Success, danger, blue e gold só entram quando há significado correspondente.', `<div class="cluster"><span class="chip success">success</span><span class="chip danger">danger</span><span class="chip">info / blue</span><span class="chip">financial / gold</span></div>`),
    ],
  });

  const componentTokens = shellContent({
    eyebrow: 'CIIMO / tokens / component',
    title: 'Componente só ganha token quando precisa.',
    description: 'Component tokens existem quando um componente recorrente precisa traduzir semantic tokens para estado, tamanho ou comportamento próprio.',
    index: ['01 — Button', '02 — Field', '03 — Sidebar', '04 — Regra'],
    sections: [
      section('01', 'Button', 'Ação principal preserva a marca', 'Primary usa accent como fundo e accent-text como conteúdo. Secondary usa superfície/soft sem inventar outra cor de marca.', `<div class="data-list"><div class="list-row"><strong>button.primary.background</strong><small>var(--accent)</small><small>Primary</small><small>Component</small></div><div class="list-row"><strong>button.primary.content</strong><small>var(--accent-text)</small><small>Primary</small><small>Component</small></div></div>`),
      section('02', 'Field', 'Focus precisa ser perceptível e coerente', 'Input usa superfície neutra e o foco recebe accent-focus, especialmente no Light.', `<div class="data-list"><div class="list-row"><strong>field.background</strong><small>var(--surface)</small><small>Default</small><small>Component</small></div><div class="list-row"><strong>field.focus.border</strong><small>var(--accent-focus)</small><small>Focus</small><small>Component</small></div></div>`),
      section('03', 'Sidebar', 'O shell usa tokens de geometria próprios', 'A sidebar documental tem estados expanded/collapsed e topbar compartilhada. Esses valores pertencem ao shell, não ao produto inteiro.', `<div class="grid grid-3"><div class="metric"><small>sidebar.expanded</small><strong>248 px</strong></div><div class="metric"><small>sidebar.collapsed</small><strong>82 px</strong></div><div class="metric"><small>topbar.height</small><strong>64 px</strong></div></div>`),
      section('04', 'Regra', 'Não tokenizar ocorrência única', 'Se um valor aparece uma vez e não tem motivo de reutilização, ele não vira automaticamente component token.', `<div class="alert success">Recorrência + intenção + necessidade de variação = candidato a component token.</div>`),
    ],
  });

  const componentsOverview = shellContent({
    eyebrow: 'CIIMO / components / inventory',
    title: 'Componentes servem à leitura patrimonial.',
    description: 'O inventário não existe para preencher uma lista. Ele reúne componentes realmente usados no App, Web e documentação e mostra onde aprofundar anatomia, estados e comportamento.',
    index: ['01 — Ação', '02 — Entrada', '03 — Dados', '04 — Navegação'],
    sections: [
      section('01', 'Ação', 'Buttons, Icon Buttons, Chips e Tabs', 'Ações primárias usam o lime com disciplina; ações secundárias ficam neutras. Estados precisam ser demonstrados no contexto de produto.', `<div class="cluster"><button class="btn primary">Comparar carteira</button><button class="btn">Ver detalhes</button><button class="icon-btn" aria-label="Buscar"><i class="hgi-stroke hgi-search-01"></i></button><span class="chip active">Selecionado</span></div>`),
      section('02', 'Entrada', 'Inputs, Selects e Textareas', 'Formulários precisam ser simples, legíveis e com foco evidente. A biblioteca App/Web já documenta os campos reais.', `<div class="form-row two"><div class="field"><label>Empreendimento</label><input class="input" value="140 Wellness" readonly></div><div class="field"><label>Comparar com</label><select class="select"><option>Mesmo bairro</option></select></div></div>`),
      section('03', 'Dados', 'Cards, métricas, tabelas, timeline e skeleton', 'Dados são o coração da experiência. O componente precisa comunicar valor, evolução e contexto antes de adicionar decoração.', `<div class="grid grid-3"><div class="metric"><small>Valor atual</small><strong>R$ 524.000</strong></div><div class="metric"><small>Valorização</small><strong>+18,4%</strong></div><div class="metric"><small>Mercado</small><strong>Acima da referência</strong></div></div>`),
      section('04', 'Navegação', 'Sidebar, topbar, drawer e bottom navigation', 'Navegação muda estruturalmente no mobile e mantém alvos mínimos de 44px.', `<div class="alert">Para anatomia detalhada de componentes nativos e web, use as bibliotecas Aplicativo e Web no menu.</div>`),
    ],
  });

  const investmentPattern = shellContent({
    eyebrow: 'CIIMO / patterns / leitura de investimento',
    title: 'Patrimônio → evolução → comparação → orientação.',
    description: 'Este é o padrão central que traduz a promessa da marca para telas de carteira, ativo, benchmark, território e apresentação.',
    index: ['01 — Estrutura', '02 — Hierarquia', '03 — Público', '04 — Regra'],
    sections: [
      section('01', 'Estrutura', 'Quatro perguntas em sequência', 'Cada tela pode aprofundar etapas diferentes, mas a leitura nunca deve começar pela decoração ou pelo detalhe técnico.', `<div class="brand-reading-flow"><article><small>01</small><strong>Quanto vale?</strong><span>Patrimônio</span></article><article><small>02</small><strong>Como evoluiu?</strong><span>Desempenho</span></article><article><small>03</small><strong>Como se compara?</strong><span>Mercado</span></article><article><small>04</small><strong>O que observar?</strong><span>Orientação</span></article></div>`),
      section('02', 'Hierarquia', 'Visão executiva primeiro', 'A pessoa deve conseguir entender a situação antes de entrar em fluxo, composição ou metodologia.', `<div class="grid grid-2"><article class="specimen"><span class="variant-title">Primeiro</span><h3>Resumo e sinais</h3><p>Valor, evolução, posição e contexto.</p></article><article class="specimen"><span class="variant-title">Depois</span><h3>Detalhe auditável</h3><p>Histórico, comparáveis, composição, metodologia e fluxo.</p></article></div>`),
      section('03', 'Público', 'A mesma base, responsabilidades diferentes', 'Cliente lê patrimônio; corretor lê contexto e orientação; imobiliária lê operação consolidada.', `<div class="grid grid-3"><div class="metric"><small>Cliente</small><strong>Patrimônio e evolução</strong></div><div class="metric"><small>Corretor</small><strong>Contexto e orientação</strong></div><div class="metric"><small>Imobiliária</small><strong>Visão consolidada</strong></div></div>`),
      section('04', 'Regra', 'Sem base suficiente, não force conclusão', 'Comparações frágeis precisam ficar indisponíveis ou explicitamente qualificadas. A marca ganha confiança quando mostra limite, não quando preenche tudo.', `<div class="alert success">Dados orientam decisões; a interface deve mostrar fonte, contexto e insuficiência quando ela existir.</div>`),
    ],
  });

  const audienceExamples = shellContent({
    eyebrow: 'CIIMO / examples / audience modes',
    title: 'Uma marca, três leituras.',
    description: 'O produto real já demonstra como a promessa muda de foco sem mudar de voz para cliente, corretor e imobiliária.',
    index: ['01 — Cliente', '02 — Corretor', '03 — Imobiliária'],
    sections: [
      section('01', 'Cliente', 'Seu patrimônio imobiliário explicado de forma simples', 'A leitura prioriza valor atual, evolução, sinais e contexto de mercado.', `<article class="specimen"><span class="variant-title">Visão do cliente</span><h3>Seu patrimônio imobiliário explicado de forma simples</h3><p>Acompanhe valor atual, evolução, principais sinais e contexto de mercado em uma leitura clara.</p></article>`),
      section('02', 'Corretor', 'Leitura patrimonial para orientar a conversa', 'O papel muda de consulta individual para contexto consultivo, mantendo linguagem clara.', `<article class="specimen"><span class="variant-title">Modo apresentação</span><h3>Leitura patrimonial para orientar a conversa</h3><p>Uma visão limpa para explicar carteira, evolução, sinais e contexto sem entrar na operação técnica.</p></article>`),
      section('03', 'Imobiliária', 'Apresentação executiva da operação acompanhada', 'A leitura consolida patrimônio, composição e pontos de acompanhamento.', `<article class="specimen"><span class="variant-title">Visão consolidada</span><h3>Apresentação executiva da operação acompanhada</h3><p>Síntese visual para entender patrimônio, composição e principais pontos de acompanhamento.</p></article>`),
    ],
  });

  return {
    'foundations/brand-principles.html': { title: 'Marca para interface · CIIMO Design System', html: brandToUi },
    'foundations/colors.html': { title: 'Colors · CIIMO Design System', html: colors },
    'foundations/typography.html': { title: 'Typography · CIIMO Design System', html: typography },
    'foundations/spacing-layout.html': { title: 'Spacing & Layout · CIIMO Design System', html: spacingLayout },
    'foundations/motion.html': { title: 'Motion · CIIMO Design System', html: motion },
    'tokens/primitive.html': { title: 'Primitive Tokens · CIIMO Design System', html: primitiveTokens },
    'tokens/semantic.html': { title: 'Semantic Tokens · CIIMO Design System', html: semanticTokens },
    'tokens/component.html': { title: 'Component Tokens · CIIMO Design System', html: componentTokens },
    'components/index.html': { title: 'Components · CIIMO Design System', html: componentsOverview },
    'patterns/investment-reading.html': { title: 'Leitura de investimento · CIIMO Design System', html: investmentPattern },
    'examples/audience-modes.html': { title: 'Audience Modes · CIIMO Design System', html: audienceExamples },
  };
}

module.exports = { createDesignSystemPages };
