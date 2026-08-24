const { systemAuthority } = require('./system-authority');

function section(number, label, title, description, body) {
  return `<section class="section"><div class="section-head"><div><span class="section-no">${number} / ${label}</span><h2>${title}</h2></div><p>${description}</p></div>${body}</section>`;
}

const anatomy = systemAuthority.pageAnatomy
  .map((label, index) => `<div><b>${String(index + 1).padStart(2, '0')}</b><span>${label}</span></div>`)
  .join('');

const allowed = systemAuthority.referenceCanDefine
  .map((item) => `<div><i class="hgi-stroke hgi-tick-02" aria-hidden="true"></i><span>${item}</span></div>`)
  .join('');

const forbidden = systemAuthority.referenceCannotDefine
  .map((item) => `<div><i class="hgi-stroke hgi-cancel-01" aria-hidden="true"></i><span>${item}</span></div>`)
  .join('');

const howToUseHtml = `<main class="page docs-page">
<header class="page-head"><div><span class="eyebrow">CIIMO / introdução / como usar</span><h1>Estrutura de fora. Identidade daqui.</h1><p>O Brand e Design System é uma referência de método. O CIIMO atual é a autoridade para aparência, movimento, interação e linguagem. A documentação deve organizar o que existe sem importar uma nova estética.</p></div><div class="page-index">01 — Autoridade<br>02 — Referência<br>03 — Anatomia<br>04 — Evidência<br>05 — Fluxo</div></header>
${section('01', 'Autoridade', 'O CIIMO decide como tudo parece e se comporta', systemAuthority.authority.visualAndBehavior.rule, `<div class="grid grid-2"><article class="specimen"><span class="variant-title">Visual e comportamento</span><h3>Projeto atual</h3><p>Logo, cores, tipografia, radius, spacing, superfícies, motion, responsividade e estados vêm do código e dos assets CIIMO.</p><div class="cluster"><span class="chip">styles.css</span><span class="chip">theme.css</span><span class="chip">refinement.css</span><span class="chip">mobile.css</span><span class="chip">docs.js</span></div></article><article class="specimen"><span class="variant-title">Significado</span><h3>Estratégia da marca</h3><p>${systemAuthority.authority.brandMeaning.rule}</p><div class="cluster"><span class="chip">brand-book.js</span><span class="chip">SVGs oficiais</span></div></article></div>`)}
${section('02', 'Referência', 'Copiar a inteligência, não a estética', systemAuthority.documentationReference.statement, `<div class="grid grid-2"><article class="specimen"><span class="variant-title">Pode orientar</span><div class="icon-rule-list">${allowed}</div></article><article class="specimen"><span class="variant-title">Não pode orientar</span><div class="icon-rule-list">${forbidden}</div></article></div><div class="alert" style="margin-top:24px"><strong>Referência estrutural:</strong> <code>itamartcjr/brand-and-design-system</code>. Ela organiza a documentação, mas nunca substitui uma decisão CIIMO.</div>`)}
${section('03', 'Anatomia', 'Toda página segue uma ordem previsível', 'A profundidade documental vem da referência, adaptada ao formato solicitado para o CIIMO. O exemplo visual aparece cedo para que a página seja compreendida antes da leitura completa.', `<div class="anatomy">${anatomy}</div><div class="specimen" style="margin-top:24px"><span class="variant-title">Regra visual</span><h3>A documentação é uma prancha, não um artigo longo.</h3><p>Demonstrações, estados, comparações, medidas e exemplos reais têm prioridade sobre grandes blocos de texto.</p></div>`)}
${section('04', 'Evidência', 'Nada vira padrão porque a referência usa', systemAuthority.evidenceRule, `<div class="grid grid-4"><div class="metric"><small>1</small><strong>Encontrar</strong><span>onde a decisão existe</span></div><div class="metric"><small>2</small><strong>Extrair</strong><span>o padrão recorrente</span></div><div class="metric"><small>3</small><strong>Tokenizar</strong><span>quando fizer sentido</span></div><div class="metric"><small>4</small><strong>Documentar</strong><span>com exemplo real</span></div></div><div class="alert success" style="margin-top:24px">Se algo aparece uma única vez e não possui motivo de reutilização, não vira automaticamente token ou componente.</div>`)}
${section('05', 'Fluxo', 'Como evoluir o sistema', 'Uma alteração de design passa primeiro pelo produto e depois pela documentação. O design system não é uma camada paralela que inventa decisões.', `<div class="data-list"><div class="list-row"><strong>01 · Identificar</strong><small>Decisão visual ou comportamental no CIIMO</small><small>Produto</small><small>Fonte</small></div><div class="list-row"><strong>02 · Verificar</strong><small>Recorrência, necessidade e coerência com a marca</small><small>Sistema</small><small>Critério</small></div><div class="list-row"><strong>03 · Estruturar</strong><small>Primitive → Semantic → Component token, quando aplicável</small><small>Tokens</small><small>Implementação</small></div><div class="list-row"><strong>04 · Demonstrar</strong><small>Exemplo real, variações, estados e responsividade</small><small>Docs</small><small>Visual</small></div><div class="list-row"><strong>05 · Validar</strong><small>Desktop, tablet, mobile, Light/Dark e acessibilidade</small><small>QA</small><small>Consistência</small></div></div>`)}
</main>`;

const howToUsePage = {
  route: 'getting-started/how-to-use.html',
  page: {
    title: 'Como usar · CIIMO Design System',
    html: howToUseHtml,
  },
};

module.exports = { howToUsePage };
