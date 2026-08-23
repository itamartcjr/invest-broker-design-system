const { brandBook } = require('./brand-book');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function list(items) {
  return `<div class="data-list">${items.map((item) => `<div class="list-row brand-list-row"><strong>${escapeHtml(item)}</strong></div>`).join('')}</div>`;
}

function traitGrid(items) {
  return `<div class="grid grid-3">${items.map(([title, qualifier]) => `<article class="specimen"><span class="variant-title">${escapeHtml(title)}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(qualifier)}</p></article>`).join('')}</div>`;
}

function messageGroup(label, items) {
  return `<article class="specimen"><span class="variant-title">${escapeHtml(label)}</span>${items.map((item) => `<p class="brand-quote">${escapeHtml(item)}</p>`).join('')}</article>`;
}

function createBrandPages({ shellContent, section }) {
  const strategy = shellContent({
    eyebrow: 'CIIMO / marca / essência',
    title: 'Imóveis acompanhados como ativos.',
    description: brandBook.essence,
    index: ['01 — Essência', '02 — Proposta', '03 — Diferença', '04 — Promessa'],
    sections: [
      section('01', 'Essência', 'Uma experiência financeira aplicada ao imóvel', 'A marca nasce para tornar o acompanhamento imobiliário tão natural quanto abrir um app bancário ou uma corretora de investimentos.', `<div class="grid grid-2"><article class="specimen"><span class="variant-title">Visão</span><h3>${escapeHtml(brandBook.vision)}</h3></article><article class="specimen brand-promise-card"><span class="variant-title">Promessa central</span><h2>${escapeHtml(brandBook.promise)}</h2></article></div>`),
      section('02', 'Proposta', 'Três frentes em um único ambiente', 'A proposta de valor combina patrimônio, orientação consultiva e inteligência de mercado.', `<div class="grid grid-3">${brandBook.proposition.map((item) => `<article class="specimen"><span class="variant-title">${escapeHtml(item.title)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join('')}</div>`),
      section('03', 'Diferença', 'Leitura estratégica, não cadastro parado', 'O diferencial não é apenas armazenar dados de uma venda, mas conectar compra, evolução do ativo, mercado e orientação.', `<div class="grid grid-2">${brandBook.difference.map((item) => `<div class="metric"><small>Não é</small><strong>${escapeHtml(item.replace(/^Não é somente /, '').replace(/\.$/, ''))}</strong></div>`).join('')}</div>`),
      section('04', 'Promessa', 'Critério que precisa aparecer em toda comunicação', 'A promessa central orienta produto, interface, conteúdo e apresentação.', `<div class="brand-statement"><span class="eyebrow">PROMESSA CENTRAL</span><h2>${escapeHtml(brandBook.promise)}</h2></div>`),
    ],
  });

  const positioning = shellContent({
    eyebrow: 'CIIMO / marca / posicionamento',
    title: 'Patrimônio, mercado e orientação.',
    description: brandBook.positioning.expanded,
    index: ['01 — Posicionamento', '02 — Território', '03 — Públicos', '04 — Relação'],
    sections: [
      section('01', 'Posicionamento', 'A frase que organiza a categoria', 'O posicionamento principal deve ser reconhecível na forma como a plataforma apresenta carteira, mercado e decisão.', `<div class="brand-statement"><span class="eyebrow">POSICIONAMENTO PRINCIPAL</span><h2>${escapeHtml(brandBook.positioning.primary)}</h2></div>`),
      section('02', 'Território', 'Onde a marca deve competir', 'A CIIMO ocupa a interseção entre investimento, patrimônio, inteligência imobiliária, carteira e assessoria consultiva.', `<div class="cluster">${brandBook.positioning.territory.map((item) => `<span class="chip active">${escapeHtml(item)}</span>`).join('')}</div>`),
      section('03', 'Públicos', 'Três níveis de leitura', 'Cada público enxerga a carteira e o mercado a partir do seu nível de responsabilidade.', `<div class="grid grid-3">${brandBook.audiences.map((item) => `<article class="specimen"><span class="variant-title">${escapeHtml(item.title)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join('')}</div>`),
      section('04', 'Relação', 'A venda vira acompanhamento', 'Cliente, corretor e imobiliária formam uma lógica de guarda-chuva que fortalece continuidade e orientação.', `<div class="anatomy"><div><b>Cliente</b><span>Própria carteira + mercado</span></div><div><b>Corretor</b><span>Clientes acompanhados + mercado</span></div><div><b>Imobiliária</b><span>Carteira consolidada + operação</span></div><div><b>Continuidade</b><span>Relacionamento após a venda</span></div></div>`),
    ],
  });

  const personality = shellContent({
    eyebrow: 'CIIMO / marca / personalidade e voz',
    title: 'Inteligente sem ser complicada.',
    description: 'A personalidade é definida pela percepção desejada e pela linguagem registrada para a marca. O sistema não adiciona arquétipos ou adjetivos que não estejam nessa base.',
    index: ['01 — Percepção', '02 — Linguagem', '03 — Vocabulário', '04 — Mensagens'],
    sections: [
      section('01', 'Percepção', 'Equilíbrios que definem a personalidade', 'O produto deve transmitir inteligência, finanças, consultoria e sofisticação sem perder clareza e proximidade.', traitGrid(brandBook.perception)),
      section('02', 'Linguagem', 'Clara, objetiva, moderna, consultiva e segura', brandBook.language.avoid, `<div class="cluster">${brandBook.language.traits.map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join('')}</div>`),
      section('03', 'Vocabulário', 'Palavras que constroem percepção de valor', 'Sempre que fizer sentido, a comunicação deve usar conceitos que aproximem o imóvel da lógica de patrimônio e investimento.', `<div class="cluster">${brandBook.language.preferredTerms.map((item) => `<span class="chip active">${escapeHtml(item)}</span>`).join('')}</div>`),
      section('04', 'Mensagens', 'A mesma marca, três perspectivas', 'A mensagem muda de acordo com a responsabilidade de cada público, sem alterar a promessa central.', `<div class="grid grid-3">${messageGroup('Cliente', brandBook.messages.client)}${messageGroup('Corretor', brandBook.messages.broker)}${messageGroup('Imobiliária', brandBook.messages.company)}</div>`),
    ],
  });

  const experience = shellContent({
    eyebrow: 'CIIMO / marca / princípios de produto',
    title: 'Uma carteira viva, não um cadastro parado.',
    description: 'A experiência deve remeter aos apps financeiros e de investimentos, priorizando leitura patrimonial, evolução, comparação e descoberta.',
    index: ['01 — Experiência', '02 — Pilares', '03 — Decisão', '04 — Regra'],
    sections: [
      section('01', 'Experiência', 'O que o usuário precisa sentir e conseguir ler', 'A interface deve favorecer descoberta, análise e decisão com sinais simples e visuais.', `<div class="grid grid-3">${brandBook.experience.map((item) => `<div class="metric"><small>Princípio</small><strong>${escapeHtml(item)}</strong></div>`).join('')}</div>`),
      section('02', 'Pilares', 'Seis capacidades centrais', 'Os pilares dão direção para arquitetura de informação, componentes, indicadores e futuras páginas do design system.', `<div class="grid grid-3">${brandBook.pillars.map(([title, text]) => `<article class="specimen"><span class="variant-title">${escapeHtml(title)}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join('')}</div>`),
      section('03', 'Decisão', 'Pergunta de validação para produto e design', 'Quando houver dúvida entre duas soluções, esta pergunta deve funcionar como filtro estratégico.', `<div class="brand-statement"><span class="eyebrow">PERGUNTA CENTRAL</span><h2>“${escapeHtml(brandBook.centralQuestion)}”</h2></div>`),
      section('04', 'Regra', 'Visual deve servir à leitura de investimento', 'Elementos decorativos, nomenclaturas e padrões que enfraqueçam clareza patrimonial ou comparação precisam ser revistos.', `<div class="alert success">Clareza · confiança · visão de oportunidade</div>`),
    ],
  });

  const identity = shellContent({
    eyebrow: 'CIIMO / marca / identidade visual',
    title: 'Sistema visual CIIMO.',
    description: 'Assinaturas, símbolo, paleta e tipografia já disponíveis no repositório são tratados como ativos oficiais do design system. A estratégia de marca orienta como eles são usados.',
    index: ['01 — Logo', '02 — Cores', '03 — Tipografia', '04 — Sistema'],
    sections: [
      section('01', 'Logo', 'Assinatura completa e símbolo compacto', 'A assinatura completa é preferencial. O símbolo compacto atende sidebar recolhida, favicon, avatar de produto e espaços restritos.', `<div class="logo-grid"><figure class="logo-stage dark"><img src="../assets/brand/ciimo-primary-dark.svg" alt="Logo CIIMO para fundo escuro"><figcaption>Principal / fundo escuro</figcaption></figure><figure class="logo-stage light"><img src="../assets/brand/ciimo-primary-light.svg" alt="Logo CIIMO para fundo claro"><figcaption>Principal / fundo claro</figcaption></figure><figure class="logo-stage dark compact"><img src="../assets/brand/ciimo-symbol-lime.svg" alt="Símbolo CIIMO verde"><figcaption>Símbolo / preferencial</figcaption></figure></div>`),
      section('02', 'Cores', 'Paleta funcional já usada no produto', 'O verde identifica marca, seleção e ação principal. Cores auxiliares carregam significado e não devem competir com a assinatura.', `<div class="brand-color-grid"><article class="brand-color lime"><strong>CIIMO Lime</strong><code>#D4FB00</code><span>Marca e ação principal</span></article><article class="brand-color black"><strong>Black</strong><code>#000000</code><span>Fundo do App</span></article><article class="brand-color ivory"><strong>Ivory</strong><code>#F4F1EA</code><span>Texto principal</span></article><article class="brand-color surface"><strong>Surface</strong><code>#111111</code><span>Superfícies do App</span></article><article class="brand-color success"><strong>Success</strong><code>#5EE09B</code><span>Confirmação</span></article><article class="brand-color blue"><strong>Blue</strong><code>#4DA3FF</code><span>Informação</span></article><article class="brand-color gold"><strong>Gold</strong><code>#FFC452</code><span>Destaque financeiro</span></article><article class="brand-color danger"><strong>Danger</strong><code>#FF8B8B</code><span>Erro e risco</span></article></div>`),
      section('03', 'Tipografia', 'Kanit no aplicativo', 'O App usa Kanit como família principal. Web e outras superfícies podem ter implementação própria documentada em seus fundamentos; a marca não deve apagar diferenças reais entre produtos.', `<div class="type-brand-hero"><span>Aa</span><div><h3>Kanit</h3><p>100–900 · normal e itálico</p><strong>Patrimônio · Carteira · Mercado · Valorização</strong></div></div>`),
      section('04', 'Sistema', 'Spacing e radius documentados', 'O App usa escala curta de espaçamento e raios amplos. Profundidade é construída por contraste, borda e espaço, não por sombra.', `<div class="grid grid-2"><div class="specimen"><div class="specimen-label"><span>Spacing</span><code>6 · 10 · 16 · 24 · 32</code></div><div class="brand-spacing"><i style="--w:6px"></i><i style="--w:10px"></i><i style="--w:16px"></i><i style="--w:24px"></i><i style="--w:32px"></i></div></div><div class="specimen"><div class="specimen-label"><span>Radius</span><code>14 · 16 · 24 · pill</code></div><div class="radius-demo"><i></i><i></i><i></i><i></i></div></div></div>`),
    ],
  });

  return {
    'brand/index.html': { title: 'Essência da marca · CIIMO Design System', html: strategy },
    'brand/positioning.html': { title: 'Posicionamento · CIIMO Design System', html: positioning },
    'brand/personality.html': { title: 'Personalidade e voz · CIIMO Design System', html: personality },
    'brand/experience.html': { title: 'Princípios de produto · CIIMO Design System', html: experience },
    'brand/identity.html': { title: 'Identidade visual · CIIMO Design System', html: identity },
  };
}

module.exports = { createBrandPages };
