const { brandBook } = require('./brand-book');

const SOURCE = 'Invest Broker — Documento de Tom, Visão e Posicionamento';
const PRODUCT = 'invest-broker-app';
const DESIGN_SYSTEM = 'invest-broker-design-system';

const approved = (config) => ({ status: 'approved', ...config });
const derived = (config) => ({ status: 'derived', ...config });
const pending = (config) => ({
  status: 'pending',
  decision: 'Não definido no material oficial atual. Esta página existe para registrar a lacuna sem transformá-la em uma decisão inventada.',
  examples: [],
  ...config,
});

const item = (moduleNumber, itemNumber, slug, title, config) => ({
  key: `brand-${moduleNumber}-${String(itemNumber).padStart(2, '0')}-${slug}`,
  number: `${moduleNumber}.${String(itemNumber).padStart(2, '0')}`,
  route: `brand/${moduleNumber}-${slug.split('-')[0]}/${String(itemNumber).padStart(2, '0')}-${slug}.html`,
  slug,
  title,
  questions: [],
  evidence: [],
  examples: [],
  dont: [],
  process: [],
  dependencies: [],
  references: [SOURCE],
  ...config,
});

const modules = [
  {
    group: 'Foundation', number: '01', key: 'brand-core', title: 'Brand Core',
    description: 'O núcleo que deve permanecer verdadeiro mesmo quando produto, campanha ou canal mudam.',
    items: [
      item('01', 1, 'brand-essence', 'Essência da marca', approved({
        definition: 'A ideia central que explica o que a CIIMO é antes de qualquer funcionalidade específica.',
        purpose: 'Manter produto, comunicação e experiência centrados em acompanhamento patrimonial imobiliário com lógica de investimento.',
        evidence: [`${SOURCE} · seção 1 — Essência do projeto`],
        decision: brandBook.essence,
        examples: [brandBook.promise, 'Imóveis acompanhados como ativos. Decisões guiadas por dados.'],
        dont: ['Reduzir a CIIMO a CRM, catálogo, vitrine ou cadastro de venda.'],
        process: ['Verificar se a proposta comunica acompanhamento contínuo.', 'Conectar cada funcionalidade a patrimônio, mercado, comparação ou orientação.'],
      })),
      item('01', 2, 'purpose', 'Propósito', approved({
        definition: 'O impacto que justifica a existência da plataforma.',
        purpose: 'Orientar decisões que aproximem o mercado imobiliário da clareza já esperada em produtos financeiros.',
        evidence: [`${SOURCE} · seção 1 — proposta central`],
        decision: brandBook.purpose,
        examples: ['Acompanhar, entender e orientar decisões imobiliárias com clareza.'],
        dependencies: ['01.01 Essência da marca'],
      })),
      item('01', 3, 'mission', 'Missão', pending({
        definition: 'Declaração operacional de como a organização pretende cumprir seu propósito.',
        purpose: 'Transformar propósito em compromisso operacional verificável.',
        evidence: [`${SOURCE} não separa formalmente propósito e missão.`],
        questions: ['Qual compromisso operacional a CIIMO assume no presente?', 'Que resultado deve ser entregue continuamente a clientes, corretores e imobiliárias?'],
        process: ['Definir com liderança de produto e negócio.', 'Validar para não repetir propósito ou visão.', 'Aprovar antes de publicar como decisão de marca.'],
        dependencies: ['01.02 Propósito', '01.04 Visão'],
      })),
      item('01', 4, 'vision', 'Visão', approved({
        definition: 'O futuro que a marca quer construir para sua categoria.',
        purpose: 'Dar direção de longo prazo para produto, mercado e posicionamento.',
        evidence: [`${SOURCE} · seção 2 — Visão do produto`],
        decision: brandBook.vision,
        examples: ['Fazer com que acompanhar um imóvel pareça tão natural quanto abrir um app bancário ou uma corretora de investimentos.'],
        dependencies: ['01.01 Essência da marca'],
      })),
      item('01', 5, 'brand-promise', 'Promessa da marca', approved({
        definition: 'A transformação central que precisa permanecer reconhecível em toda comunicação.',
        purpose: 'Funcionar como compromisso simples e memorável para produto e comunicação.',
        evidence: [`${SOURCE} · seção 11 — Promessa central do produto`],
        decision: brandBook.promise,
        examples: [brandBook.promise],
        dont: ['Prometer rentabilidade garantida ou valorização futura como certeza.'],
        dependencies: ['01.01 Essência da marca', '01.02 Propósito'],
      })),
      item('01', 6, 'positioning', 'Posicionamento', approved({
        definition: 'A escolha de categoria e diferença que organiza como a CIIMO deve ser entendida no mercado.',
        purpose: 'Evitar que a plataforma seja percebida como CRM, portal imobiliário ou catálogo genérico.',
        evidence: [`${SOURCE} · seção 6 — Posicionamento`],
        decision: brandBook.positioning.primary,
        examples: [brandBook.positioning.expanded],
        dont: brandBook.difference,
        dependencies: ['01.01 Essência da marca', '01.05 Promessa da marca'],
      })),
      item('01', 7, 'value-proposition', 'Proposta de valor', approved({
        definition: 'A combinação concreta de benefícios entregues pela plataforma.',
        purpose: 'Explicar por que diferentes públicos têm motivo para usar e manter relacionamento com a CIIMO.',
        evidence: [`${SOURCE} · seção 4 — A grande proposta de valor`],
        decision: brandBook.proposition.map((entry) => `${entry.title}: ${entry.text}`),
        examples: ['Acompanhamento patrimonial', 'Orientação comercial e consultiva', 'Inteligência de mercado imobiliário'],
        dependencies: ['01.06 Posicionamento'],
      })),
      item('01', 8, 'differentiators', 'Diferenciais', approved({
        definition: 'O que a CIIMO conecta que soluções isoladas normalmente deixam separado.',
        purpose: 'Sustentar posicionamento com uma diferença observável na experiência e no produto.',
        evidence: [`${SOURCE} · seção 8 — O que torna o projeto diferente`],
        decision: brandBook.differentiationConnects,
        dont: brandBook.difference,
        dependencies: ['01.07 Proposta de valor'],
      })),
      item('01', 9, 'values', 'Valores', pending({
        definition: 'Princípios culturais que orientam escolhas e comportamentos da organização.',
        purpose: 'Dar critérios de comportamento interno e externo que não dependam de campanha.',
        evidence: [`${SOURCE} define percepção, linguagem e princípios de produto, mas não formaliza valores corporativos.`],
        questions: ['Quais comportamentos são inegociáveis para a CIIMO?', 'Que valores mudariam uma decisão difícil?'],
        process: ['Não converter automaticamente adjetivos de personalidade em valores.', 'Definir e validar com liderança.'],
      })),
      item('01', 10, 'brand-principles', 'Princípios da marca', derived({
        definition: 'Regras de decisão derivadas diretamente da estratégia e da direção prática de produto.',
        purpose: 'Converter o documento de marca em filtros aplicáveis no cotidiano.',
        evidence: [`${SOURCE} · seções 9 e 16`],
        decision: ['Clareza patrimonial antes de decoração.', 'Comparação precisa ser objetiva e contextualizada.', 'Acompanhamento deve parecer contínuo, não pontual.', 'Dados devem apoiar descoberta, análise e decisão.', 'A experiência precisa transmitir clareza, confiança e visão de oportunidade.'],
        examples: [brandBook.centralQuestion],
        dependencies: ['01.01 Essência da marca', '01.05 Promessa da marca'],
      })),
    ],
  },
  {
    group: 'Foundation', number: '02', key: 'brand-strategy', title: 'Brand Strategy',
    description: 'Escolhas competitivas, percepção desejada, território e arquitetura de relacionamento.',
    items: [
      item('02', 1, 'problem-context', 'Problema e contexto', approved({
        definition: 'O conjunto de fricções que explica por que a categoria precisa da CIIMO.',
        purpose: 'Manter produto e comunicação ligados a problemas reais de acompanhamento patrimonial.',
        evidence: [`${SOURCE} · seção 3 — O problema que o app resolve`],
        decision: brandBook.problem.market,
        examples: [...brandBook.problem.buyer, ...brandBook.problem.business],
      })),
      item('02', 2, 'desired-perception', 'Percepção desejada', approved({
        definition: 'Como a marca deve ser sentida e entendida na interação.',
        purpose: 'Traduzir posicionamento em critérios de conteúdo, produto e expressão visual.',
        evidence: [`${SOURCE} · seção 5 — Como o produto deve ser percebido`],
        decision: brandBook.perception.map(([a, b]) => `${a}, ${b}.`),
        examples: ['União entre um app de investimentos, um painel patrimonial e uma inteligência comercial imobiliária.'],
      })),
      item('02', 3, 'brand-territory', 'Território de marca', approved({
        definition: 'Os espaços conceituais onde a CIIMO deve construir reconhecimento.',
        purpose: 'Evitar expansão de linguagem para territórios que diluem patrimônio, investimento e inteligência.',
        evidence: [`${SOURCE} · seção 6 — Território de marca`],
        decision: brandBook.positioning.territory,
      })),
      item('02', 4, 'brand-pillars', 'Pilares de produto e marca', approved({
        definition: 'Capacidades recorrentes que materializam a estratégia.',
        purpose: 'Organizar roadmap, narrativa e arquitetura de informação por competências reconhecíveis.',
        evidence: [`${SOURCE} · seção 10 — Principais pilares do produto`],
        decision: brandBook.pillars.map(([title, text]) => `${title}: ${text}`),
      })),
      item('02', 5, 'brand-architecture', 'Arquitetura de relacionamento', approved({
        definition: 'A lógica de guarda-chuva entre cliente, corretor e imobiliária.',
        purpose: 'Definir quem vê qual carteira, em qual contexto e com qual responsabilidade.',
        evidence: [`${SOURCE} · seção 7 — Estrutura de relacionamento entre os usuários`],
        decision: brandBook.relationship.hierarchy,
        examples: brandBook.relationship.roles.map((role) => `${role.title}: ${role.text}`),
      })),
      item('02', 6, 'reasons-to-believe', 'Reasons to Believe', derived({
        definition: 'Evidências de produto que tornam posicionamento e promessa críveis.',
        purpose: 'Evitar comunicação aspiracional sem correspondência em funcionalidade real.',
        evidence: [`${SOURCE} · seções 4, 8, 9 e 10`, `${PRODUCT} · apresentação, benchmark, território, carteira e rotinas patrimoniais`],
        decision: ['Evolução de preço e valorização acumulada.', 'Histórico de pagamentos e contexto da compra.', 'Comparáveis por território e ativo.', 'Filtros por empreendimento, construtora, tipologia e metragem.', 'Visões específicas para cliente, corretor e imobiliária.', 'Rotinas de acompanhamento recorrente.'],
      })),
      item('02', 7, 'brand-measurement', 'Medição de marca', pending({
        definition: 'Sistema de métricas para acompanhar percepção, compreensão e consistência da marca.',
        purpose: 'Verificar se o posicionamento desejado está sendo reconhecido ao longo do tempo.',
        evidence: [`${SOURCE} não define baseline, metas ou cadência de brand measurement.`],
        questions: ['As pessoas entendem a CIIMO como acompanhamento patrimonial?', 'A promessa é compreendida?', 'Cliente, corretor e imobiliária reconhecem seu papel?'],
        process: ['Definir métricas, baseline, fonte, owner e cadência antes de aprovar.'],
      })),
    ],
  },
  {
    group: 'Foundation', number: '03', key: 'audience', title: 'Audience',
    description: 'Públicos, necessidades, dores e contexto de uso da CIIMO.',
    items: [
      item('03', 1, 'client', 'Cliente investidor / comprador', approved({
        definition: 'Pessoa que acompanha o próprio imóvel, patrimônio e oportunidades futuras.',
        purpose: 'Manter a experiência centrada em clareza, evolução e autonomia de leitura.',
        evidence: [`${SOURCE} · seções 2, 3, 7 e 12`],
        decision: brandBook.audiences[0].text,
        examples: brandBook.messages.client,
      })),
      item('03', 2, 'broker', 'Corretor', approved({
        definition: 'Profissional que acompanha clientes e atua como consultor de longo prazo.',
        purpose: 'Transformar a relação de venda em orientação contínua baseada em dados.',
        evidence: [`${SOURCE} · seções 2, 3, 7 e 12`],
        decision: brandBook.audiences[1].text,
        examples: brandBook.messages.broker,
      })),
      item('03', 3, 'company', 'Imobiliária', approved({
        definition: 'Organização que acompanha corretores, clientes e carteira consolidada sob sua estrutura.',
        purpose: 'Dar visão gerencial, comercial e estratégica da operação acompanhada.',
        evidence: [`${SOURCE} · seções 2, 3, 7 e 12`],
        decision: brandBook.audiences[2].text,
        examples: brandBook.messages.company,
      })),
      item('03', 4, 'needs-pain-points', 'Necessidades e dores', approved({
        definition: 'Problemas que precisam ser resolvidos para cada público perceber valor real.',
        purpose: 'Evitar features sem relação com acompanhamento patrimonial e continuidade.',
        evidence: [`${SOURCE} · seção 3 — O problema que o app resolve`],
        decision: { Cliente: brandBook.problem.buyer, Negócio: brandBook.problem.business },
      })),
    ],
  },
  {
    group: 'Foundation', number: '04', key: 'brand-personality', title: 'Brand Personality',
    description: 'Como a estratégia se transforma em comportamento observável.',
    items: [
      item('04', 1, 'personality-axes', 'Eixos de personalidade', approved({
        definition: 'Contrastes que evitam que um atributo positivo vire excesso.',
        purpose: 'Dar limites claros para voz, interface e atendimento.',
        evidence: [`${SOURCE} · seção 5 — Como o produto deve ser percebido`],
        decision: brandBook.perception.map(([a, b]) => `${a} — ${b}`),
      })),
      item('04', 2, 'behavior', 'Comportamento da marca', derived({
        definition: 'Como os eixos de personalidade devem aparecer nas decisões da experiência.',
        purpose: 'Tornar personalidade verificável, e não apenas uma lista de adjetivos.',
        evidence: [`${SOURCE} · seções 5, 9 e 13`],
        decision: ['Inteligente → explica dados e comparações sem esconder metodologia.', 'Financeira → prioriza patrimônio, desempenho e evolução; sem linguagem fria.', 'Consultiva → adiciona contexto e orientação; sem complicar.', 'Sofisticada → reduz ruído e mantém hierarquia; sem distanciamento.', 'Tecnológica e imobiliária → usa linguagem contemporânea sem apagar o contexto do ativo.'],
      })),
      item('04', 3, 'we-are-not', 'Somos / Não somos', approved({
        definition: 'Fronteiras simples para reconhecer quando uma solução está saindo da personalidade desejada.',
        purpose: 'Acelerar revisão de comunicação e experiência.',
        evidence: [`${SOURCE} · seções 5 e 8`],
        decision: ['Somos inteligentes; não complicados.', 'Somos financeiros; não frios.', 'Somos consultivos; não burocráticos.', 'Somos sofisticados; não distantes.', 'Somos imobiliários e tecnológicos; não um CRM genérico.'],
        dont: brandBook.difference,
      })),
    ],
  },
  {
    group: 'Language & Narrative', number: '05', key: 'verbal-identity', title: 'Verbal Identity',
    description: 'Voz, tom e regras de linguagem da CIIMO.',
    items: [
      item('05', 1, 'voice', 'Voice', approved({
        definition: 'A voz estável da CIIMO em qualquer canal.',
        purpose: 'Garantir que produto, marketing e atendimento soem como a mesma marca.',
        evidence: [`${SOURCE} · seção 13 — Linguagem da marca`],
        decision: brandBook.language.traits,
      })),
      item('05', 2, 'tone', 'Tone', derived({
        definition: 'A adaptação da voz à situação sem perder clareza, segurança e orientação.',
        purpose: 'Permitir variação de intensidade entre acompanhamento, risco, oportunidade e operação.',
        evidence: [`${SOURCE} · seções 5, 12 e 13`],
        decision: ['Patrimônio e performance: objetivo e preciso.', 'Oportunidade: consultivo e responsável, sem urgência artificial.', 'Erro ou risco: direto, calmo e explicativo.', 'Visão executiva: sintética, segura e comparável.'],
      })),
      item('05', 3, 'vocabulary', 'Vocabulário de marca', approved({
        definition: 'Termos que reforçam a percepção de patrimônio e investimento.',
        purpose: 'Construir consistência sem depender de slogans.',
        evidence: [`${SOURCE} · seção 13 — Linguagem da marca`],
        decision: brandBook.language.preferredTerms,
      })),
      item('05', 4, 'technical-language', 'Linguagem técnica', approved({
        definition: 'Regra para termos imobiliários e financeiros que podem gerar dúvida.',
        purpose: 'Preservar precisão sem transformar a interface em jargão.',
        evidence: [`${SOURCE} · seção 13 — Linguagem da marca`],
        decision: brandBook.language.avoid,
        examples: ['Explique benchmark, valorização, fluxo e comparável no contexto em que aparecem.'],
      })),
      item('05', 5, 'microcopy', 'CTA e microcopy', derived({
        definition: 'Textos curtos que orientam a próxima ação dentro do produto.',
        purpose: 'Fazer a interface agir como acompanhamento consultivo, não como dashboard impessoal.',
        evidence: [`${SOURCE} · seções 9, 12 e 13`, `${PRODUCT} · apresentação e seleção de benchmark`],
        decision: ['Prefira verbos de leitura e decisão: acompanhar, comparar, revisar, entender, explorar, analisar.', 'Explique indisponibilidade quando faltarem dados.', 'Evite CTA de urgência artificial e promessa de retorno.'],
        examples: ['Escolha como comparar a carteira', 'Acompanhe valor atual, evolução, principais sinais e contexto de mercado em uma leitura clara.'],
      })),
    ],
  },
  {
    group: 'Language & Narrative', number: '06', key: 'messaging-system', title: 'Messaging System',
    description: 'O que a marca precisa dizer em diferentes níveis e públicos.',
    items: [
      item('06', 1, 'master-message', 'Mensagem principal', approved({
        definition: 'A frase central que organiza as demais mensagens.',
        purpose: 'Manter reconhecimento da promessa em qualquer campanha ou tela.',
        evidence: [`${SOURCE} · seção 11`],
        decision: brandBook.promise,
      })),
      item('06', 2, 'client-messages', 'Mensagens para cliente', approved({ definition: 'Mensagens orientadas ao proprietário/investidor.', purpose: 'Priorizar patrimônio, evolução e descoberta.', evidence: [`${SOURCE} · seção 12`], decision: brandBook.messages.client })),
      item('06', 3, 'broker-messages', 'Mensagens para corretor', approved({ definition: 'Mensagens orientadas ao papel consultivo do corretor.', purpose: 'Reforçar carteira, contexto e continuidade.', evidence: [`${SOURCE} · seção 12`], decision: brandBook.messages.broker })),
      item('06', 4, 'company-messages', 'Mensagens para imobiliária', approved({ definition: 'Mensagens orientadas à visão consolidada e gestão.', purpose: 'Reforçar inteligência operacional e oportunidade.', evidence: [`${SOURCE} · seção 12`], decision: brandBook.messages.company })),
      item('06', 5, 'supporting-lines', 'Frases de apoio', approved({
        definition: 'Formulações aprovadas para apresentações, campanhas e contexto editorial.',
        purpose: 'Dar repertório sem criar um posicionamento paralelo.',
        evidence: [`${SOURCE} · seção 14 — Frases que resumem o projeto`],
        decision: brandBook.summaryLines,
      })),
    ],
  },
  {
    group: 'Language & Narrative', number: '07', key: 'brand-storytelling', title: 'Brand Storytelling',
    description: 'A narrativa que conecta problema, transformação e visão de futuro.',
    items: [
      item('07', 1, 'brand-story', 'História da marca', approved({
        definition: 'A narrativa que explica de onde parte a CIIMO e qual mudança propõe.',
        purpose: 'Dar contexto para apresentações institucionais e comerciais.',
        evidence: [`${SOURCE} · seções 3, 8 e 15`],
        decision: brandBook.executiveSummary,
      })),
      item('07', 2, 'transformation-arc', 'Arco de transformação', derived({
        definition: 'A mudança de estado que a experiência precisa tornar visível.',
        purpose: 'Organizar storytelling sem depender de slogans isolados.',
        evidence: [`${SOURCE} · seções 3, 8, 9 e 11`],
        decision: ['De compra pontual → ativo acompanhado.', 'De informação dispersa → leitura patrimonial clara.', 'De venda encerrada → relação consultiva contínua.', 'De catálogo → descoberta comparável de oportunidades.'],
      })),
      item('07', 3, 'executive-summary', 'Resumo executivo', approved({
        definition: 'Síntese institucional da proposta e do papel da plataforma.',
        purpose: 'Dar uma versão completa e consistente para apresentações executivas.',
        evidence: [`${SOURCE} · seção 15 — Resumo executivo`],
        decision: brandBook.executiveSummary,
      })),
    ],
  },
  {
    group: 'Visual Identity', number: '08', key: 'visual-brand-identity', title: 'Visual Brand Identity',
    description: 'Ativos oficiais e regras básicas de aplicação da identidade CIIMO.',
    items: [
      item('08', 1, 'logo-system', 'Sistema de logo', approved({
        definition: 'Família oficial de assinaturas e símbolos entregue para a CIIMO.',
        purpose: 'Evitar reconstrução, filtros ou versões improvisadas.',
        evidence: [`${DESIGN_SYSTEM} · assets/brand/ciimo_*.svg e ii_*.svg`],
        decision: ['Assinaturas: ciimo_b.svg, ciimo_cb.svg, ciimo_cw.svg, ciimo_v.svg, ciimo_w.svg.', 'Símbolos: ii_b.svg, ii_v.svg, ii_w.svg.'],
        examples: ['Dark: ciimo_cw.svg / ii_v.svg.', 'Light: ciimo_cb.svg / ii_b.svg.'],
      })),
      item('08', 2, 'logo-usage', 'Uso do logo', derived({
        definition: 'Critério de escolha entre assinatura completa e símbolo.',
        purpose: 'Preservar reconhecimento sem forçar a assinatura em espaços compactos.',
        evidence: [`${DESIGN_SYSTEM} · shell atual`],
        decision: ['Assinatura completa em sidebar aberta e áreas institucionais.', 'Símbolo em sidebar recolhida, favicon e espaços compactos.', 'Usar sempre o SVG oficial correspondente ao fundo.'],
        dont: ['Não aplicar invert/filter para fabricar outra versão.', 'Não redesenhar paths.', 'Não substituir por texto digitado.'],
      })),
      item('08', 3, 'clearspace-minimum-size', 'Área de proteção e tamanho mínimo', pending({
        definition: 'Medidas que protegem legibilidade e integridade do logo.',
        purpose: 'Evitar aplicações pequenas ou visualmente congestionadas.',
        evidence: ['Os SVGs oficiais existem, mas o material enviado não define clear space nem tamanho mínimo formal.'],
        questions: ['Qual unidade do símbolo define a área de proteção?', 'Qual altura mínima digital para assinatura e símbolo?'],
        process: ['Definir a partir do arquivo-mestre da marca.', 'Testar legibilidade em 1x e 2x.', 'Aprovar antes de registrar token.'],
      })),
      item('08', 4, 'brand-colors', 'Cores de marca', approved({
        definition: 'Paleta central reconhecida nos produtos CIIMO.',
        purpose: 'Manter reconhecimento e contraste sem espalhar o lime por toda a interface.',
        evidence: [`${DESIGN_SYSTEM} · styles.css, theme.css e color-semantics.css`, `${PRODUCT} · componentes e superfícies reais`],
        decision: ['CIIMO Lime #D4FB00.', 'Dark canvas #000000.', 'Ivory #F4F1EA.', 'Surface #0B0B0B / #111111.', 'Accent content Light #5B6C00 para conteúdo legível.'],
      })),
      item('08', 5, 'brand-applications', 'Aplicações da marca', derived({
        definition: 'Como a identidade aparece em documentação, produto e superfícies claras/escuras.',
        purpose: 'Mostrar consistência entre contextos sem exigir uma única superfície para tudo.',
        evidence: [`${DESIGN_SYSTEM} · Light/Dark, App e Web`],
        decision: ['Dark e Light usam assets próprios.', 'A cor de marca é preservada; legibilidade usa tokens semânticos.', 'App e Web podem ter superfícies próprias quando isso estiver comprovado no produto real.'],
      })),
    ],
  },
  {
    group: 'Visual Identity', number: '09', key: 'typography', title: 'Typography',
    description: 'Famílias e hierarquia tipográfica comprovadas nos produtos.',
    items: [
      item('09', 1, 'app-typography', 'Tipografia do App', approved({
        definition: 'Família principal usada na linguagem visual do aplicativo.',
        purpose: 'Manter continuidade entre interface, números e títulos.',
        evidence: [`${DESIGN_SYSTEM} · styles.css importa Kanit 100–900`],
        decision: ['Kanit como família principal.', 'Interface refinada prioriza pesos 400, 500, 600 e 700; 800/900 não são padrão.'],
      })),
      item('09', 2, 'web-typography', 'Tipografia Web', approved({
        definition: 'Família usada nas superfícies web documentadas do produto.',
        purpose: 'Preservar diferenças reais de implementação sem forçar o App sobre a Web.',
        evidence: ['Produto Web atual usa Inter/system-ui em suas superfícies documentadas.'],
        decision: ['Inter/system-ui na Web quando essa for a implementação real.', 'Não substituir automaticamente pela Kanit só para uniformizar documentação.'],
      })),
      item('09', 3, 'hierarchy', 'Hierarquia tipográfica', derived({
        definition: 'Uso de tamanho, peso e contraste para reduzir ruído e priorizar leitura de dados.',
        purpose: 'Materializar a personalidade sofisticada sem tornar a UI pesada.',
        evidence: [`${DESIGN_SYSTEM} · refinement.css`],
        decision: ['Body 400.', 'UI 500.', 'Títulos e labels 600.', 'Dados importantes 700.', 'Títulos usam escala responsiva e tracking negativo moderado.'],
      })),
    ],
  },
  {
    group: 'Visual Identity', number: '10', key: 'photography-direction', title: 'Photography Direction',
    description: 'Direção de fotografia para comunicação da marca.',
    items: [item('10', 1, 'photography-status', 'Direção fotográfica', pending({
      definition: 'Critérios de seleção, composição e tratamento de fotografia.',
      purpose: 'Garantir que campanhas e materiais visuais tenham uma linguagem coerente.',
      evidence: ['O documento estratégico e os assets enviados não definem direção fotográfica.'],
      questions: ['A marca usa pessoas, arquitetura, cidade ou detalhes de produto?', 'Qual tratamento de luz, cor e enquadramento é permitido?'],
      process: ['Não usar stock genérico como regra de marca.', 'Definir direção em projeto específico de imagem antes de publicar como padrão.'],
    }))],
  },
  {
    group: 'Visual Identity', number: '11', key: 'illustration', title: 'Illustration',
    description: 'Sistema de ilustração da marca.',
    items: [item('11', 1, 'illustration-status', 'Direção de ilustração', pending({
      definition: 'Regras para ilustrações funcionais, editoriais ou promocionais.',
      purpose: 'Evitar estilos desconectados se ilustração passar a ser usada.',
      evidence: ['Não há sistema de ilustração oficial no material atual.'],
      questions: ['A CIIMO precisa de ilustração ou a linguagem de dados é suficiente?', 'Qual papel a ilustração teria que fotografia e UI não resolvem?'],
      process: ['Manter como não definido até existir necessidade comprovada.'],
    }))],
  },
  {
    group: 'Visual Identity', number: '12', key: 'iconography', title: 'Iconography',
    description: 'Biblioteca e regras de ícones do produto.',
    items: [
      item('12', 1, 'hugeicons', 'Biblioteca Hugeicons', approved({
        definition: 'Conjunto oficial de ícones usado no sistema.',
        purpose: 'Evitar mistura de símbolos, emojis e caracteres improvisados.',
        evidence: [`${DESIGN_SYSTEM} · documentação de ícones`, `${PRODUCT} · @hugeicons/core-free-icons e @hugeicons/react`],
        decision: ['Hugeicons como biblioteca oficial.', 'Stroke Rounded na documentação web.'],
      })),
      item('12', 2, 'icon-scale', 'Escala e alinhamento', approved({
        definition: 'Tamanhos usados para adequar ícones à densidade da interface.',
        purpose: 'Manter legibilidade e alvo de interação consistentes.',
        evidence: [`${DESIGN_SYSTEM} · getting-started/icons.html`],
        decision: ['16px para metadata/UI densa.', '20px como padrão de interface.', '24px para ação enfatizada.', '44px como alvo mínimo de toque.'],
      })),
      item('12', 3, 'icon-usage', 'Regras de uso', approved({
        definition: 'Critérios para ícone decorativo, interativo e estados.',
        purpose: 'Preservar consistência visual e acessibilidade.',
        evidence: [`${DESIGN_SYSTEM} · sidebar/topbar`],
        decision: ['Ícone decorativo usa aria-hidden.', 'Botão só com ícone exige aria-label.', 'Estados de expandir/recolher usam rotação do mesmo ícone.'],
      })),
    ],
  },
  {
    group: 'Visual Identity', number: '13', key: 'graphic-language', title: 'Graphic Language',
    description: 'Sinais visuais que fazem a interface parecer CIIMO mesmo sem o logo.',
    items: [
      item('13', 1, 'financial-data-language', 'Linguagem financeira e de dados', derived({
        definition: 'Composição visual orientada a patrimônio, evolução e comparação.',
        purpose: 'Fazer a experiência parecer uma carteira viva, não um cadastro.',
        evidence: [`${SOURCE} · seção 9`, `${PRODUCT} · dashboards, benchmark, território e apresentação`],
        decision: ['Números importantes com hierarquia clara.', 'Comparações e benchmarks com contexto.', 'Indicadores simples e visuais.', 'Narrativas curtas explicando o significado do dado.'],
      })),
      item('13', 2, 'surfaces-contrast', 'Superfícies e contraste', derived({
        definition: 'Uso de canvas, superfície e separadores para criar hierarquia com pouco ruído.',
        purpose: 'Sustentar sofisticação e clareza sem depender de muitas caixas.',
        evidence: [`${DESIGN_SYSTEM} · refinement.css e theme.css`],
        decision: ['Dark e Light têm superfícies semânticas próprias.', 'Card não recebe borda por padrão.', 'Borda aparece quando precisa separar ou comunicar interação.', 'Sombras não são usadas como base da biblioteca nativa.'],
      })),
      item('13', 3, 'accent-discipline', 'Disciplina do verde', derived({
        definition: 'Uso controlado do CIIMO Lime para preservar força de marca.',
        purpose: 'Fazer o verde significar ação, seleção e estado relevante.',
        evidence: [`${DESIGN_SYSTEM} · color-semantics.css`],
        decision: ['#D4FB00 para marca, CTA e seleção preenchida.', '#5B6C00 no Light para conteúdo verde legível.', 'Não usar lime como decoração em todos os níveis.'],
      })),
    ],
  },
  {
    group: 'Visual Identity', number: '14', key: 'layout-principles', title: 'Layout Principles',
    description: 'Ritmo, respiro, densidade e responsividade da linguagem CIIMO.',
    items: [
      item('14', 1, 'spacing', 'Spacing', approved({
        definition: 'Escala curta de espaçamento usada pelo sistema.',
        purpose: 'Criar ritmo previsível e reduzir valores arbitrários.',
        evidence: [`${DESIGN_SYSTEM} · styles.css`],
        decision: ['6px, 10px, 16px, 24px e 32px.', '24px para conteúdo interno/seção.', '32px para separação macro.'],
      })),
      item('14', 2, 'breathing-room', 'Respiro e hierarquia', derived({
        definition: 'A regra de reduzir sinais simultâneos e deixar espaço organizar a leitura.',
        purpose: 'Materializar sofisticação sem peso visual.',
        evidence: [`${DESIGN_SYSTEM} · visual-principles e refinement.css`],
        decision: ['Espaço primeiro, tipografia depois, superfície quando agrupa, borda quando separa, cor quando precisa significar.'],
      })),
      item('14', 3, 'responsive', 'Responsividade', approved({
        definition: 'Mudança estrutural de layout entre desktop e mobile.',
        purpose: 'Evitar tratar mobile como desktop reduzido.',
        evidence: [`${DESIGN_SYSTEM} · mobile.css e página de Responsividade`],
        decision: ['Até 760px: topbar fixa e sidebar como drawer.', 'Grids viram uma coluna por padrão.', 'Tabelas mantêm overflow local.', 'Alvo mínimo de interação de 44px.'],
      })),
      item('14', 4, 'data-density', 'Densidade de dados', derived({
        definition: 'Como mostrar informação financeira sem transformar a tela em painel pesado.',
        purpose: 'Permitir leitura rápida do que está valorizando, estável ou merece atenção.',
        evidence: [`${SOURCE} · seção 9`, `${PRODUCT} · cards de carteira, benchmark e narrativas`],
        decision: ['Priorizar poucos indicadores por bloco.', 'Separar visão executiva de detalhe técnico.', 'Usar texto de contexto curto ao lado de métricas.', 'Evitar card dentro de card sem necessidade.'],
      })),
    ],
  },
  {
    group: 'Visual Identity', number: '15', key: 'motion-identity', title: 'Motion Identity',
    description: 'Movimento usado para orientar estado sem competir com o conteúdo.',
    items: [
      item('15', 1, 'shell-motion', 'Motion do shell', approved({
        definition: 'Transições documentadas no shell atual do Design System.',
        purpose: 'Manter sidebar, drawer e estados suaves sem adicionar espetáculo.',
        evidence: [`${DESIGN_SYSTEM} · docs.css, theme.css e mobile.css`],
        decision: ['180ms ease para sidebar, ícones, backdrop e mudanças de tema.', 'Rotação para expandir/recolher.', 'Drawer entra por translateX e backdrop por opacity.'],
      })),
      item('15', 2, 'loading-motion', 'Loading', approved({
        definition: 'Movimento usado para indicar carregamento sem bloquear leitura.',
        purpose: 'Comunicar atividade de sistema de forma discreta.',
        evidence: [`${DESIGN_SYSTEM} · skeleton em styles.css`],
        decision: ['Skeleton shimmer atual: 1.35s infinite.'],
      })),
      item('15', 3, 'product-motion', 'Motion do produto', pending({
        definition: 'Curvas, durações e padrões de movimento do App e Web em produção.',
        purpose: 'Documentar motion real sem copiar o shell da documentação para o produto.',
        evidence: ['O material estratégico não define motion e a auditoria atual não comprova um sistema completo de duração/easing do produto.'],
        process: ['Auditar transições e animações no App/Web.', 'Agrupar valores recorrentes.', 'Só então definir tokens de motion do produto.'],
      })),
    ],
  },
  {
    group: 'Experience', number: '16', key: 'sonic-identity', title: 'Sonic Identity',
    description: 'Estratégia sonora da marca.',
    items: [item('16', 1, 'sonic-status', 'Identidade sonora', pending({
      definition: 'Sons de marca, feedback e assinatura sonora.',
      purpose: 'Registrar se existe ou não um sistema sonoro e quando ele seria necessário.',
      evidence: ['Não há estratégia sonora no documento ou no sistema atual.'],
      process: ['Manter sem identidade sonora até existir caso de uso comprovado.', 'Não introduzir sons apenas para preencher o Brand Framework.'],
    }))],
  },
  {
    group: 'Experience', number: '17', key: 'brand-experience', title: 'Brand Experience',
    description: 'Como a estratégia deve ser percebida ao usar o produto.',
    items: [
      item('17', 1, 'experience-principles', 'Princípios de experiência', approved({
        definition: 'Resultados perceptivos que o produto precisa entregar continuamente.',
        purpose: 'Alinhar arquitetura de informação, componentes e conteúdo à promessa.',
        evidence: [`${SOURCE} · seção 9`],
        decision: brandBook.experience,
      })),
      item('17', 2, 'relationship-journey', 'Jornada de relacionamento', approved({
        definition: 'Continuidade entre compra, acompanhamento e novas oportunidades.',
        purpose: 'Impedir que a experiência termine quando a venda é concluída.',
        evidence: [`${SOURCE} · seção 7`],
        decision: ['Compra → acompanhamento do ativo → comparação de mercado → orientação → nova oportunidade.', brandBook.relationship.principle],
      })),
      item('17', 3, 'product-pillars', 'Pilares da experiência', approved({
        definition: 'Capacidades que estruturam a leitura patrimonial dentro da experiência.',
        purpose: 'Garantir que telas e fluxos possam ser explicados por um conjunto coerente de pilares.',
        evidence: [`${SOURCE} · seção 10`],
        decision: brandBook.pillars.map(([title, text]) => `${title}: ${text}`),
      })),
    ],
  },
  {
    group: 'Experience', number: '18', key: 'brand-in-action', title: 'Brand in Action',
    description: 'A marca aplicada a situações reais de cliente, corretor e imobiliária.',
    items: [
      item('18', 1, 'client-experience', 'Marca em ação — Cliente', approved({
        definition: 'Como a promessa se manifesta na visão do proprietário/investidor.',
        purpose: 'Dar uma leitura simples de valor atual, evolução e contexto.',
        evidence: [`${SOURCE} · seção 12`, `${PRODUCT} · presentation-engine.ts`],
        decision: brandBook.messages.client,
        examples: ['Seu patrimônio imobiliário explicado de forma simples.', 'Acompanhe valor atual, evolução, principais sinais e contexto de mercado em uma leitura clara.'],
      })),
      item('18', 2, 'broker-experience', 'Marca em ação — Corretor', approved({
        definition: 'Como a marca sustenta o papel consultivo do corretor.',
        purpose: 'Ajudar a orientar conversa e decisão com dados, não apenas percepção.',
        evidence: [`${SOURCE} · seção 12`, `${PRODUCT} · presentation-engine.ts`],
        decision: brandBook.messages.broker,
        examples: ['Leitura patrimonial para orientar a conversa.', 'Uma visão limpa para explicar carteira, evolução, sinais e contexto sem entrar na operação técnica.'],
      })),
      item('18', 3, 'company-experience', 'Marca em ação — Imobiliária', approved({
        definition: 'Como a marca aparece na visão executiva da operação acompanhada.',
        purpose: 'Sintetizar carteira, composição, gestão e oportunidade.',
        evidence: [`${SOURCE} · seção 12`, `${PRODUCT} · presentation-engine.ts`],
        decision: brandBook.messages.company,
        examples: ['Apresentação executiva da operação acompanhada.', 'Síntese visual para entender patrimônio, composição e principais pontos de acompanhamento.'],
      })),
      item('18', 4, 'decision-filter', 'Filtro de decisão', approved({
        definition: 'Pergunta que valida se uma experiência continua alinhada à marca.',
        purpose: 'Dar um critério simples para revisão de produto e design.',
        evidence: [`${SOURCE} · seção 16 — Direção prática para produto e design`],
        decision: brandBook.centralQuestion,
      })),
    ],
  },
  {
    group: 'AI & Governance', number: '19', key: 'ai-brand-guidelines', title: 'AI Brand Guidelines',
    description: 'Regras para uso futuro de IA sem preencher lacunas estratégicas por conta própria.',
    items: [item('19', 1, 'ai-status', 'Uso de IA na marca', pending({
      definition: 'Critérios de voz, precisão e aprovação quando conteúdo da CIIMO for produzido ou assistido por IA.',
      purpose: 'Impedir que modelos inventem estratégia, dados imobiliários ou promessas financeiras.',
      evidence: ['O documento oficial de marca não define uma política de IA.'],
      questions: ['Em quais fluxos a IA poderá gerar conteúdo?', 'Que dados exigem fonte e validação humana?', 'Quais mensagens precisam de aprovação?'],
      process: ['Usar apenas decisões já aprovadas como contexto.', 'Nunca usar IA para criar fato de mercado, valorização ou retorno.', 'Definir política formal antes de marcar como aprovado.'],
    }))],
  },
  {
    group: 'AI & Governance', number: '20', key: 'brand-governance', title: 'Brand Governance',
    description: 'Como manter o sistema vivo, rastreável e coerente.',
    items: [
      item('20', 1, 'source-hierarchy', 'Hierarquia de fontes', approved({
        definition: 'Precedência usada quando duas referências entram em conflito.',
        purpose: 'Impedir que referências externas substituam decisões CIIMO.',
        evidence: [`${DESIGN_SYSTEM} · system-authority.js`],
        decision: ['1. Estratégia da marca.', '2. Produto real.', '3. Design System.', '4. Referências externas.'],
      })),
      item('20', 2, 'asset-authority', 'Autoridade dos assets', approved({
        definition: 'Quais arquivos são considerados mestres para a identidade visual.',
        purpose: 'Evitar versões derivadas se tornarem fonte oficial.',
        evidence: [`${DESIGN_SYSTEM} · assets/brand`],
        decision: ['Arquivos-mestre: ciimo_b.svg, ciimo_cb.svg, ciimo_cw.svg, ciimo_v.svg, ciimo_w.svg, ii_b.svg, ii_v.svg e ii_w.svg.'],
      })),
      item('20', 3, 'change-rule', 'Regra de mudança', derived({
        definition: 'Processo mínimo para alterar uma decisão visual ou verbal documentada.',
        purpose: 'Manter implementação e documentação sincronizadas.',
        evidence: [`${DESIGN_SYSTEM} · contrato atual do projeto`],
        decision: ['Encontrar a evidência no produto ou na marca.', 'Verificar recorrência e necessidade.', 'Atualizar token/regra quando aplicável.', 'Atualizar implementação e documentação no mesmo change.', 'Validar Light/Dark, desktop/mobile e acessibilidade.'],
      })),
      item('20', 4, 'central-question', 'Pergunta central de governança', approved({
        definition: 'Critério final para validar coerência entre marca, produto e design.',
        purpose: 'Dar um filtro único quando houver dúvida de direção.',
        evidence: [`${SOURCE} · seção 16`],
        decision: brandBook.centralQuestion,
      })),
      item('20', 5, 'status-system', 'Status das decisões', derived({
        definition: 'Classificação que diferencia decisão oficial, tradução de design e lacuna.',
        purpose: 'Evitar que hipótese seja lida como regra aprovada.',
        evidence: ['Método de governança adotado para esta documentação.'],
        decision: ['Aprovado: explicitamente sustentado pela fonte oficial ou asset/produto real.', 'Derivado: tradução documentada de uma decisão aprovada para aplicação prática.', 'Pendente: não definido; exige evidência e aprovação antes de virar padrão.'],
      })),
    ],
  },
];

const brandFramework = {
  source: SOURCE,
  groups: ['Foundation', 'Language & Narrative', 'Visual Identity', 'Experience', 'AI & Governance'],
  modules,
};

const brandNavigationItems = [
  { key: 'brand-overview', label: 'Overview', href: 'brand/index.html' },
  ...modules.flatMap((module) => module.items.map((entry) => ({ key: entry.key, label: entry.title, href: entry.route }))),
];

const brandNavigationModules = modules.map((module) => ({
  key: module.key,
  number: module.number,
  title: module.title,
  group: module.group,
  itemKeys: module.items.map((entry) => entry.key),
}));

module.exports = { brandFramework, brandNavigationItems, brandNavigationModules };
