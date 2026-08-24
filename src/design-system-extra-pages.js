function createExtraDesignSystemPages({ shellContent, section }) {
  const grid = shellContent({
    eyebrow: 'CIIMO / foundations / grid',
    title: 'Grid contextual, não uma malha inventada.',
    description: 'O CIIMO atual não possui evidência de um grid global fixo de 12 colunas. A implementação usa CSS Grid por contexto, largura de conteúdo controlada e reorganização responsiva. Esta página documenta o que existe.',
    index: ['01 — Desktop', '02 — Tablet', '03 — Mobile', '04 — Regra'],
    sections: [
      section('01', 'Desktop', 'Conteúdo amplo com tracks contextuais', 'A página base admite até 1600px e os componentes escolhem 2, 3, 4 ou mais tracks conforme o conteúdo. O grid serve à informação, não a uma contagem fixa.', `<div class="grid-viewport grid-viewport--desktop"><div class="grid-viewport__margin"></div><div class="grid-viewport__content">${Array.from({length:4},(_,i)=>`<i><span>${i+1}</span></i>`).join('')}</div><div class="grid-viewport__margin"></div></div><div class="grid-spec-row"><span><strong>Container</strong> <code>min(1600px, 100%)</code></span><span><strong>Tracks</strong> contextuais</span><span><strong>Gap</strong> 16 / 24 / 32 conforme hierarquia</span></div>`),
      section('02', 'Tablet', 'O componente reduz complexidade antes de apertar conteúdo', 'Breakpoints locais observados em componentes incluem 980px e 860px. Eles existem porque a composição específica precisa mudar; não são promovidos automaticamente a tokens globais.', `<div class="grid-viewport grid-viewport--tablet"><div class="grid-viewport__margin"></div><div class="grid-viewport__content">${Array.from({length:2},(_,i)=>`<i><span>${i+1}</span></i>`).join('')}</div><div class="grid-viewport__margin"></div></div><div class="alert">980 / 860 são thresholds observados em componentes reais. Use apenas quando a composição exigir; não trate como grid global sem auditoria.</div>`),
      section('03', 'Mobile', 'Uma coluna por padrão', 'Até 760px, a documentação e a maioria das composições viram uma coluna. Laterais usam 16px e elementos intrinsecamente largos mantêm overflow dentro do componente.', `<div class="grid-viewport grid-viewport--mobile"><div class="grid-viewport__margin"></div><div class="grid-viewport__content"><i><span>1</span></i></div><div class="grid-viewport__margin"></div></div><div class="grid-spec-row"><span><strong>Shell</strong> ≤ 760px</span><span><strong>Margem</strong> 16px</span><span><strong>Tracks</strong> 1 por padrão</span></div>`),
      section('04', 'Regra', 'Não confundir referência com decisão do produto', 'Se uma futura interface precisar de um grid global, ele deve ser extraído de telas recorrentes e testado em App/Web antes de virar foundation.', `<div class="alert success">Hoje: grid contextual documentado. Futuro: só tokenizar uma malha global quando houver evidência recorrente.</div>`),
    ],
  });

  const breakpoints = shellContent({
    eyebrow: 'CIIMO / foundations / breakpoints',
    title: 'Breakpoint existe quando o comportamento muda.',
    description: 'O sistema não cria uma coleção de números para preencher uma tabela. Cada threshold documentado precisa corresponder a uma mudança real de estrutura.',
    index: ['01 — Shell', '02 — Componentes', '03 — Comportamento'],
    sections: [
      section('01', 'Shell', '760px muda navegação e composição', 'Esse é o breakpoint estrutural do shell documental: topbar permanece, sidebar vira drawer e grids passam a uma coluna por padrão.', `<div class="breakpoint-line"><span>Desktop</span><i></i><strong>760px</strong><i></i><span>Mobile</span></div>`),
      section('02', 'Componentes', '680 / 860 / 980 são locais', 'O produto real possui componentes que reorganizam suas colunas em thresholds próprios. Isso é comportamento do componente, não necessariamente foundation global.', `<div class="grid grid-3"><div class="metric"><small>680px</small><strong>Comparação / seletores</strong></div><div class="metric"><small>860px</small><strong>Painéis de leitura</strong></div><div class="metric"><small>980px</small><strong>Agendas / cards</strong></div></div>`),
      section('03', 'Comportamento', 'Documentar a mudança junto do número', 'Um breakpoint sem before/after não ensina como usar. Cada componente deve mostrar o que empilha, some, vira drawer ou ganha overflow.', `<div class="responsive-triptych"><article><small>Desktop</small><strong>Sidebar + conteúdo</strong><span>grids contextuais</span></article><article><small>Intermediário</small><strong>Menos tracks</strong><span>composição se simplifica</span></article><article><small>Mobile</small><strong>Drawer + 1 coluna</strong><span>overflow apenas local</span></article></div>`),
    ],
  });

  const radius = shellContent({
    eyebrow: 'CIIMO / foundations / radius',
    title: 'Forma simples, cantos consistentes.',
    description: 'O sistema usa poucos raios. A direção mais sóbria reserva cantos maiores para frames realmente grandes e evita transformar tudo em pill.',
    index: ['01 — Escala', '02 — Uso', '03 — Limite'],
    sections: [
      section('01', 'Escala', '14 · 16 · 24 · pill', 'Os valores já existem no sistema e devem ser referenciados por intenção, não digitados aleatoriamente.', `<div class="radius-gallery"><div style="border-radius:14px"><strong>14px</strong><small>r-sm · campos / controles</small></div><div style="border-radius:16px"><strong>16px</strong><small>r-md · cards padrão</small></div><div style="border-radius:24px"><strong>24px</strong><small>r-lg · frames amplos</small></div><div style="border-radius:999px"><strong>pill</strong><small>chips / ações quando a forma pede</small></div></div>`),
      section('02', 'Uso', 'Radius acompanha a escala do objeto', 'Campos usam raio menor, cards médios usam 16px e frames como phone/previews podem usar 24px ou mais quando a própria forma do dispositivo exigir.', `<div class="grid grid-3"><div class="specimen" style="border-radius:14px"><small>Controle</small><h3>14px</h3></div><div class="specimen" style="border-radius:16px"><small>Card</small><h3>16px</h3></div><div class="specimen" style="border-radius:24px"><small>Frame</small><h3>24px</h3></div></div>`),
      section('03', 'Limite', 'Não usar radius para criar hierarquia sozinho', 'Mais arredondamento não significa mais importante. Hierarquia vem primeiro de espaço, tipografia e conteúdo.', `<div class="alert success">Escolha o menor radius que preserve a linguagem do objeto e a consistência do sistema.</div>`),
    ],
  });

  const borders = shellContent({
    eyebrow: 'CIIMO / foundations / borders',
    title: 'Borda só quando separa ou comunica estado.',
    description: 'A limpeza visual da CIIMO depende de não desenhar caixas em volta de tudo. Separadores, campos e frames estruturais usam borda; cards comuns não precisam dela por padrão.',
    index: ['01 — Separador', '02 — Campo', '03 — Frame', '04 — Não usar'],
    sections: [
      section('01', 'Separador', '1px semântico', 'Linhas sutis separam regiões quando o espaço sozinho não é suficiente.', `<div class="border-spec"><span>Conteúdo acima</span><i></i><span>Conteúdo abaixo</span><code>1px · var(--separator)</code></div>`),
      section('02', 'Campo', 'Borda também comunica interação', 'Inputs e selects mantêm limite perceptível; focus troca para accent-focus para indicar estado.', `<div class="grid grid-2"><input class="input" value="Valor padrão" readonly><input class="input border-focus-demo" value="Estado de foco" readonly></div>`),
      section('03', 'Frame', 'Previews precisam de limite estrutural', 'Phone, mini-shell e áreas de demonstração podem manter borda porque o contorno ajuda a distinguir o exemplo do restante da página.', `<div class="specimen"><div class="border-frame-demo">Frame de demonstração</div></div>`),
      section('04', 'Não usar', 'Card não recebe borda por hábito', 'Se superfície, espaço e agrupamento já comunicam a relação, adicionar borda só aumenta ruído.', `<div class="grid grid-2"><article class="brand-do-card"><small>Preferir</small><strong>Superfície + espaço</strong><p>A informação respira e a hierarquia permanece calma.</p></article><article class="brand-dont-card"><small>Evitar</small><strong>Borda em cada bloco</strong><p>Cria competição visual sem acrescentar significado.</p></article></div>`),
    ],
  });

  const elevation = shellContent({
    eyebrow: 'CIIMO / foundations / elevation',
    title: 'Profundidade sem sombra como regra.',
    description: 'A biblioteca nativa documentada não usa sombras. A hierarquia é construída por contraste de superfície, espaçamento, borda funcional e composição.',
    index: ['01 — Base', '02 — Hierarquia', '03 — Overlay'],
    sections: [
      section('01', 'Base', 'shadow = none', 'Não introduza box-shadow em cards apenas para aumentar presença. O próprio sistema força a biblioteca nativa a não usar sombra/text-shadow.', `<div class="elevation-stack"><article><small>Canvas</small><strong>background</strong></article><article><small>Surface</small><strong>surface</strong></article><article><small>Raised</small><strong>raised</strong></article></div>`),
      section('02', 'Hierarquia', 'Contraste e espaço substituem elevação', 'Quando um bloco precisa se destacar, use surface/raised e respiro antes de recorrer a efeitos.', `<div class="grid grid-3"><div class="metric"><small>1</small><strong>Espaço</strong></div><div class="metric"><small>2</small><strong>Superfície</strong></div><div class="metric"><small>3</small><strong>Borda funcional</strong></div></div>`),
      section('03', 'Overlay', 'Backdrop é camada, não card shadow', 'Drawer mobile usa backdrop para comunicar mudança de camada. Isso não cria um token de sombra para cards.', `<div class="overlay-demo"><aside>Drawer</aside><span>Backdrop 54%</span></div>`),
    ],
  });

  const buttons = shellContent({
    eyebrow: 'CIIMO / components / buttons',
    title: 'Ação clara, hierarquia curta.',
    description: 'Buttons devem tornar o próximo passo evidente sem transformar todas as ações em lime. A ação primária recebe a marca; ações secundárias permanecem neutras.',
    index: ['01 — Anatomy', '02 — Variants', '03 — States', '04 — Content'],
    sections: [
      section('01', 'Anatomy', 'Container + conteúdo + ícone opcional', 'Alvo mínimo de 44px e texto curto. Ícone apoia significado; não substitui label quando a ação não é óbvia.', `<div class="component-anatomy"><span>Container</span><button class="btn primary"><i class="hgi-stroke hgi-chart-line-data-01" aria-hidden="true"></i> Comparar carteira</button><span>Label</span></div>`),
      section('02', 'Variants', 'Primary, Secondary, Danger e Icon', 'São as variantes comprovadas na biblioteca atual. Não criar tertiary/ghost apenas para completar catálogo.', `<div class="cluster"><button class="btn primary">Acompanhar</button><button class="btn">Ver detalhes</button><button class="btn danger">Remover</button><button class="icon-btn" aria-label="Buscar"><i class="hgi-stroke hgi-search-01"></i></button></div>`),
      section('03', 'States', 'Default, Hover, Focus e Disabled', 'Estados precisam continuar legíveis nos dois temas. Disabled reduz intensidade sem parecer ação disponível.', `<div class="component-state-row"><button class="btn primary">Default</button><button class="btn primary state-hover">Hover</button><button class="btn primary state-focus">Focus</button><button class="btn primary" disabled>Disabled</button></div>`),
      section('04', 'Content', 'Use verbos ligados à decisão', 'A linguagem da marca favorece acompanhar, comparar, revisar, entender, explorar e analisar. Evite urgência artificial e promessas financeiras.', `<div class="grid grid-2"><article class="brand-do-card"><small>Fazer</small><strong>Comparar carteira</strong></article><article class="brand-dont-card"><small>Evitar</small><strong>Garanta sua valorização agora</strong></article></div>`),
    ],
  });

  const fields = shellContent({
    eyebrow: 'CIIMO / components / fields',
    title: 'Entrada de dados precisa ser previsível.',
    description: 'Input, Select e Textarea compartilham superfície, borda, radius e foco. O campo deve explicar o dado sem excesso de linguagem técnica.',
    index: ['01 — Anatomy', '02 — Types', '03 — States', '04 — Content'],
    sections: [
      section('01', 'Anatomy', 'Label → controle → ajuda/erro quando necessário', 'Label identifica o dado; placeholder não substitui nome do campo.', `<div class="field"><label>Empreendimento</label><input class="input" value="140 Wellness" readonly><small>Use o nome comercial cadastrado.</small></div>`),
      section('02', 'Types', 'Input, Select e Textarea', 'Documentar somente controles presentes na biblioteca.', `<div class="form-row"><div class="field"><label>Busca</label><input class="input" placeholder="Buscar empreendimento"></div><div class="field"><label>Território</label><select class="select"><option>Bairro</option></select></div><div class="field"><label>Observação</label><textarea class="textarea">Contexto consultivo</textarea></div></div>`),
      section('03', 'States', 'Default, Focus, Disabled e Error', 'Focus precisa ser evidente. Error deve explicar o que corrigir e não depender apenas de vermelho.', `<div class="form-row"><input class="input" value="Default" readonly><input class="input border-focus-demo" value="Focus" readonly><input class="input" value="Disabled" disabled></div>`),
      section('04', 'Content', 'Termo técnico precisa de contexto', 'A linguagem da marca manda evitar jargão imobiliário sem explicação.', `<div class="alert">Quando usar benchmark, valorização, INCC, comparável ou fluxo, explique o significado no ponto de uso quando ele não for óbvio.</div>`),
    ],
  });

  const dataComponents = shellContent({
    eyebrow: 'CIIMO / components / data display',
    title: 'Dados precisam contar uma história curta.',
    description: 'Metrics, cards, tables, timelines e comparáveis existem para responder patrimônio, evolução, posição e contexto.',
    index: ['01 — Metric', '02 — Card', '03 — Table', '04 — Comparação'],
    sections: [
      section('01', 'Metric', 'Um número + um significado', 'Evite KPI sem contexto. Label explica o que é e apoio explica período ou referência.', `<div class="grid grid-3"><div class="metric"><small>Valor atual</small><strong>R$ 524.000</strong><span>estimativa atual</span></div><div class="metric"><small>Valorização</small><strong>+18,4%</strong><span>desde a compra</span></div><div class="metric"><small>Pago</small><strong>42%</strong><span>do valor contratado</span></div></div>`),
      section('02', 'Card', 'Agrupar uma decisão, não tudo sobre o imóvel', 'Card deve conter um recorte coerente. Detalhe técnico pode ficar em página ou seção própria.', `<article class="card property-card"><div class="card-top"><div><span class="meta-label">ATIVO</span><h3>140 Wellness · 902</h3></div><span class="chip success">Acompanhando</span></div><p>43,24 m² · Marista</p><div class="card-footer"><strong>R$ 524.000</strong><span class="price-meter">+18,4%</span></div></article>`),
      section('03', 'Table', 'Tabela para comparação detalhada', 'Use quando alinhamento entre colunas realmente ajuda. No mobile a tabela rola dentro do componente.', `<div class="table-wrap"><table><thead><tr><th>Referência</th><th>Valor</th><th>m²</th><th>Diferença</th></tr></thead><tbody><tr><td><strong>Carteira</strong></td><td>R$ 524 mil</td><td>R$ 12,1 mil</td><td>+18,4%</td></tr><tr><td><strong>Bairro</strong></td><td>R$ 505 mil</td><td>R$ 11,7 mil</td><td>+3,8%</td></tr></tbody></table></div>`),
      section('04', 'Comparação', 'Sem base suficiente, indisponibilize', 'O produto real já usa disponibilidade de referência para evitar leitura frágil. Isso é comportamento de confiança da marca.', `<div class="grid grid-2"><button class="btn">Mesmo bairro · 12 carteiras</button><button class="btn" disabled>Mesma tipologia · base insuficiente</button></div>`),
    ],
  });

  const feedback = shellContent({
    eyebrow: 'CIIMO / components / feedback & loading',
    title: 'Feedback explica estado sem dramatizar.',
    description: 'Alert, empty state e skeleton devem manter o tom seguro e objetivo da marca. O componente informa o que aconteceu e, quando possível, o que fazer.',
    index: ['01 — Success', '02 — Error', '03 — Empty', '04 — Loading'],
    sections: [
      section('01', 'Success', 'Confirmar sem ocupar a tela', 'Success usa cor semântica e uma mensagem curta sobre o resultado.', `<div class="alert success">Comparação atualizada com os dados disponíveis.</div>`),
      section('02', 'Error', 'Explicar o problema', 'Evite mensagens vagas. Diga o que não foi possível e qual ação pode resolver.', `<div class="alert error">Não foi possível carregar os comparáveis. Tente novamente ou altere o conjunto de referência.</div>`),
      section('03', 'Empty', 'Ausência também precisa de contexto', 'Empty state não deve inventar oportunidade; explica por que não há dado e sugere próximo passo.', `<div class="empty"><div><h3>Sem comparáveis suficientes</h3><p>Amplie o território ou escolha outra referência para continuar a análise.</p></div></div>`),
      section('04', 'Loading', 'Skeleton preserva estrutura', 'O shimmer atual é discreto e mantém a forma aproximada do conteúdo.', `<div class="specimen"><div class="skeleton" style="width:65%"></div><div class="skeleton" style="width:100%;height:70px;margin-top:12px"></div></div>`),
    ],
  });

  const navigationComponent = shellContent({
    eyebrow: 'CIIMO / components / navigation',
    title: 'Orientação sem roubar atenção do patrimônio.',
    description: 'Sidebar, topbar, drawer e bottom navigation ajudam a trocar de contexto. A navegação deve ser persistente, previsível e adaptativa.',
    index: ['01 — Desktop', '02 — Topbar', '03 — Mobile', '04 — Estado'],
    sections: [
      section('01', 'Desktop', 'Sidebar expandida ou recolhida', 'O estado persiste durante navegação. Recolher não deve reconstruir o componente nem abrir grupos automaticamente.', `<div class="grid grid-2"><div class="nav-spec nav-spec--expanded"><strong>CIIMO</strong><span>00 Introdução</span><span>01 Brand</span><span>02 Foundations</span></div><div class="nav-spec nav-spec--collapsed"><strong>II</strong><span>00</span><span>01</span><span>02</span></div></div>`),
      section('02', 'Topbar', '64px compartilhados com o topo da sidebar', 'Breadcrumb, GitHub e tema ficam na barra superior. A mesma métrica mantém as linhas horizontais alinhadas.', `<div class="shell-measure"><aside>CIIMO</aside><header>Brand / Positioning · GitHub · tema</header></div>`),
      section('03', 'Mobile', 'Topbar + drawer', 'A sidebar sai do fluxo e abre sobre o conteúdo com backdrop. Seleção de rota, Esc, close e backdrop fecham o drawer.', `<div class="responsive-triptych"><article><small>Fechado</small><strong>Topbar</strong></article><article><small>Abrir</small><strong>Menu</strong></article><article><small>Aberto</small><strong>Drawer + backdrop</strong></article></div>`),
      section('04', 'Estado', 'Página ativa e grupos persistentes', 'A rota atual atualiza breadcrumb e link ativo sem remontar o shell. Busca pode abrir grupos temporariamente, mas não sobrescreve a preferência salva.', `<div class="alert success">Persistência é comportamento do componente, não detalhe visual.</div>`),
    ],
  });

  const filterPattern = shellContent({
    eyebrow: 'CIIMO / patterns / filter & compare',
    title: 'Filtrar para comparar melhor.',
    description: 'Filtros no CIIMO não existem para navegar um catálogo genérico; eles reduzem o universo até uma referência de mercado útil para decisão.',
    index: ['01 — Escopo', '02 — Comparável', '03 — Insuficiência', '04 — Mobile'],
    sections: [
      section('01', 'Escopo', 'Território e ativo definem o conjunto', 'Cidade, região, bairro, empreendimento, construtora, tipologia, metragem e características devem ser usados como critérios explícitos.', `<div class="cluster"><span class="chip active">Bairro</span><span class="chip">Empreendimento</span><span class="chip">Construtora</span><span class="chip">Tipologia</span><span class="chip">Metragem</span></div>`),
      section('02', 'Comparável', 'O usuário precisa entender o conjunto de referência', 'Uma comparação sem contexto parece precisa, mas pode ser enganosa. Mostre qual universo foi usado e quantos itens sustentam a leitura.', `<div class="metric"><small>Conjunto de referência</small><strong>Mesmo bairro · 12 carteiras</strong></div>`),
      section('03', 'Insuficiência', 'Desabilitar é melhor que inventar', 'O seletor real do produto deixa referências sem base suficiente indisponíveis para evitar leitura frágil.', `<button class="btn" disabled>Mesma tipologia · dados insuficientes</button>`),
      section('04', 'Mobile', 'Filtros empilham antes de apertar', 'Seletores em grid passam a uma coluna em telas menores, preservando 44px de alvo e labels legíveis.', `<div class="responsive-triptych"><article><small>Desktop</small><strong>2–3 colunas</strong></article><article><small>Tablet</small><strong>2 colunas</strong></article><article><small>Mobile</small><strong>1 coluna</strong></article></div>`),
    ],
  });

  const continuityPattern = shellContent({
    eyebrow: 'CIIMO / patterns / acompanhamento',
    title: 'A venda inicia uma rotina, não encerra uma relação.',
    description: 'A camada consultiva da CIIMO precisa transformar compra em acompanhamento recorrente, revisão de carteira e descoberta de novas oportunidades.',
    index: ['01 — Jornada', '02 — Rotina', '03 — Sinal', '04 — Oportunidade'],
    sections: [
      section('01', 'Jornada', 'Compra → carteira → acompanhamento', 'A hierarquia Cliente/Corretor/Imobiliária existe para manter contexto e continuidade.', `<div class="brand-reading-flow"><article><small>01</small><strong>Compra</strong></article><article><small>02</small><strong>Carteira</strong></article><article><small>03</small><strong>Revisão</strong></article><article><small>04</small><strong>Oportunidade</strong></article></div>`),
      section('02', 'Rotina', 'Mensal, trimestral, semestral ou por evento', 'O produto real já possui rotinas patrimoniais para organizar acompanhamento recorrente.', `<div class="cluster"><span class="chip">Mensal</span><span class="chip active">Trimestral</span><span class="chip">Semestral</span><span class="chip">Evento</span></div>`),
      section('03', 'Sinal', 'Contextualizar antes de recomendar', 'Uma variação, benchmark ou mudança de mercado vira sinal apenas quando há dado e contexto suficientes.', `<div class="alert">Sinal → evidência → contexto → orientação.</div>`),
      section('04', 'Oportunidade', 'Descoberta precisa continuar aderente à carteira', 'Novas oportunidades devem ser explicadas em relação ao perfil, patrimônio atual e movimentos de mercado, não apenas exibidas como vitrine.', `<div class="brand-statement"><span class="eyebrow">REGRA</span><h2>Oportunidade é consequência da leitura, não um anúncio inserido no meio da carteira.</h2></div>`),
    ],
  });

  const templates = shellContent({
    eyebrow: 'CIIMO / templates / product structures',
    title: 'Estruturas reais para novas telas.',
    description: 'Templates descrevem a ordem de leitura de telas recorrentes. Eles não congelam conteúdo; mostram como os fundamentos e patterns se combinam.',
    index: ['01 — Portfolio', '02 — Asset', '03 — Territory', '04 — Presentation'],
    sections: [
      section('01', 'Portfolio', 'Visão de carteira', 'Começa por patrimônio e sinais, depois composição, evolução, comparáveis e rotina.', `<div class="template-stack"><span>Overview patrimonial</span><span>KPIs e sinais</span><span>Composição / ativos</span><span>Evolução</span><span>Benchmark</span><span>Rotinas</span></div>`),
      section('02', 'Asset', 'Detalhe do imóvel como ativo', 'A unidade é apresentada por valor, histórico, fluxo e posição de mercado antes do detalhe operacional.', `<div class="template-stack"><span>Identidade do ativo</span><span>Valor atual / contratado</span><span>Valorização</span><span>Fluxo e pagamentos</span><span>Comparáveis</span><span>Contexto consultivo</span></div>`),
      section('03', 'Territory', 'Inteligência territorial', 'Cidade, região e bairro formam o contexto de mercado para comparar carteira e oportunidade.', `<div class="template-stack"><span>Território atual</span><span>Overview</span><span>Mapa / heat</span><span>Sinais</span><span>Comparação</span><span>Narrativa</span></div>`),
      section('04', 'Presentation', 'Modo de leitura por público', 'A mesma base de dados muda de densidade e enquadramento para cliente, corretor e imobiliária.', `<div class="grid grid-3"><div class="metric"><small>Cliente</small><strong>Simples e patrimonial</strong></div><div class="metric"><small>Corretor</small><strong>Consultivo</strong></div><div class="metric"><small>Imobiliária</small><strong>Executivo</strong></div></div>`),
    ],
  });

  return {
    'foundations/grid.html': { title: 'Grid · CIIMO Design System', html: grid },
    'foundations/breakpoints.html': { title: 'Breakpoints · CIIMO Design System', html: breakpoints },
    'foundations/radius.html': { title: 'Radius · CIIMO Design System', html: radius },
    'foundations/borders.html': { title: 'Borders · CIIMO Design System', html: borders },
    'foundations/elevation.html': { title: 'Elevation · CIIMO Design System', html: elevation },
    'components/buttons.html': { title: 'Buttons · CIIMO Design System', html: buttons },
    'components/fields.html': { title: 'Fields · CIIMO Design System', html: fields },
    'components/data-display.html': { title: 'Data Display · CIIMO Design System', html: dataComponents },
    'components/feedback-loading.html': { title: 'Feedback & Loading · CIIMO Design System', html: feedback },
    'components/navigation.html': { title: 'Navigation · CIIMO Design System', html: navigationComponent },
    'patterns/filter-compare.html': { title: 'Filter & Compare · CIIMO Design System', html: filterPattern },
    'patterns/continuity.html': { title: 'Acompanhamento contínuo · CIIMO Design System', html: continuityPattern },
    'templates/index.html': { title: 'Templates · CIIMO Design System', html: templates },
  };
}

module.exports = { createExtraDesignSystemPages };
