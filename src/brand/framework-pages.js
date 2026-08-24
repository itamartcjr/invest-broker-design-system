const { brandFramework } = require('./framework-data');
const { routeFor } = require('./framework-navigation');
const { brandBook } = require('./brand-book');

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function values(value) {
  if (value == null || value === '') return [];
  if (Array.isArray(value)) return value.flatMap(values);
  if (typeof value === 'object') {
    return Object.entries(value).flatMap(([key, entry]) => values(entry).map((line) => `${key}: ${line}`));
  }
  return [String(value)];
}

function list(value, className = 'brand-framework-list') {
  const lines = values(value);
  if (!lines.length) return '<p class="brand-framework-empty">Sem conteúdo adicional registrado.</p>';
  return `<div class="${className}">${lines.map((line) => `<div><i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i><span>${esc(line)}</span></div>`).join('')}</div>`;
}

function statusLabel(status) {
  if (status === 'approved') return ['Aprovado', 'approved'];
  if (status === 'derived') return ['Derivado', 'derived'];
  return ['Pendente', 'pending'];
}

function moduleForItem(target) {
  return brandFramework.modules.find((module) => module.items.includes(target));
}

function adjacentItems(target) {
  const all = brandFramework.modules.flatMap((module) => module.items.map((entry) => ({ module, entry })));
  const index = all.findIndex(({ entry }) => entry === target);
  return {
    previous: index > 0 ? all[index - 1] : null,
    next: index >= 0 && index < all.length - 1 ? all[index + 1] : null,
  };
}

function renderBrandItem(module, entry) {
  const [statusText, statusClass] = statusLabel(entry.status);
  const adjacent = adjacentItems(entry);
  const questions = values(entry.questions);
  const examples = values(entry.examples);
  const dont = values(entry.dont);
  const process = values(entry.process);
  const dependencies = values(entry.dependencies);
  const references = values(entry.references);

  return `<main class="page docs-page brand-field-page">
    <header class="brand-field-hero">
      <div class="brand-field-hero__meta">
        <span class="eyebrow">CIIMO / Brand Framework / ${esc(module.group)}</span>
        <span class="brand-field-status brand-field-status--${statusClass}">${statusText}</span>
      </div>
      <span class="brand-field-number">${esc(entry.number)} · ${esc(module.title)}</span>
      <h1>${esc(entry.title)}</h1>
      <p>${esc(entry.definition)}</p>
    </header>

    <section class="section brand-field-section">
      <div class="section-head"><div><span class="section-no">01 / Para que serve</span><h2>Decisão que esta página orienta.</h2></div><p>${esc(entry.purpose)}</p></div>
      ${questions.length ? `<div class="brand-question-grid">${questions.map((question) => `<article><small>Pergunta de construção</small><strong>${esc(question)}</strong></article>`).join('')}</div>` : ''}
    </section>

    <section class="section brand-field-section">
      <div class="section-head"><div><span class="section-no">02 / Evidência</span><h2>De onde esta decisão vem.</h2></div><p>Fato, decisão e pendência ficam separados para a documentação não transformar hipótese em regra de marca.</p></div>
      <div class="brand-evidence-panel">${list(entry.evidence)}</div>
    </section>

    <section class="section brand-field-section">
      <div class="section-head"><div><span class="section-no">03 / Decisão CIIMO</span><h2>O que está definido para esta marca.</h2></div><p>${entry.status === 'pending' ? 'O material atual não sustenta uma decisão final. A lacuna fica visível até existir evidência e aprovação.' : 'Esta é a resposta específica da CIIMO para este item; não é texto de exemplo do framework de referência.'}</p></div>
      <div class="brand-decision-panel brand-decision-panel--${statusClass}">${list(entry.decision, 'brand-decision-list')}</div>
    </section>

    ${examples.length || dont.length ? `<section class="section brand-field-section">
      <div class="section-head"><div><span class="section-no">04 / Aplicação</span><h2>Como reconhecer a decisão na prática.</h2></div><p>Exemplos usam linguagem, produto e assets reais da CIIMO. Contraexemplos existem apenas quando a fonte sustenta um limite claro.</p></div>
      <div class="brand-application-grid">
        ${examples.length ? `<article class="brand-application-card"><small>Fazer</small>${examples.map((line) => `<p>${esc(line)}</p>`).join('')}</article>` : ''}
        ${dont.length ? `<article class="brand-application-card brand-application-card--dont"><small>Não fazer</small>${dont.map((line) => `<p>${esc(line)}</p>`).join('')}</article>` : ''}
      </div>
    </section>` : ''}

    <section class="section brand-field-section">
      <div class="section-head"><div><span class="section-no">05 / Como executar</span><h2>Aplicar, revisar e evoluir.</h2></div><p>Quando a fonte já define a decisão, execução significa preservar intenção e rastreabilidade. Quando está pendente, significa coletar a evidência que falta antes de aprovar.</p></div>
      ${process.length ? list(process, 'brand-process-list') : list(['Usar esta decisão como critério ao criar conteúdo, produto ou documentação.', 'Comparar a aplicação com a promessa, a percepção desejada e a pergunta central da marca.', 'Atualizar a fonte de verdade e a documentação no mesmo change quando a decisão evoluir.'], 'brand-process-list')}
    </section>

    <section class="section brand-field-section brand-field-operations">
      <div class="section-head"><div><span class="section-no">06 / Governança</span><h2>Dependências e referências.</h2></div><p>Uma pessoa nova no projeto deve conseguir localizar a fonte e entender o estado da decisão sem depender do autor original.</p></div>
      <div class="brand-ops-grid">
        <article><small>Dependências</small>${list(dependencies.length ? dependencies : ['Documento de Tom, Visão e Posicionamento'])}</article>
        <article><small>Referências</small>${list(references)}</article>
        <article><small>Status</small><strong>${statusText}</strong><span>${entry.status === 'approved' ? 'Sustentado diretamente pela fonte oficial ou produto/asset real.' : entry.status === 'derived' ? 'Tradução documentada de uma decisão aprovada para uso prático.' : 'Precisa de evidência e aprovação antes de virar regra oficial.'}</span></article>
      </div>
    </section>

    <nav class="brand-page-nav" aria-label="Navegação entre itens da marca">
      ${adjacent.previous ? `<a href="../../${routeFor(adjacent.previous.module, adjacent.previous.entry)}"><small>Anterior</small><strong>${esc(adjacent.previous.entry.number)} · ${esc(adjacent.previous.entry.title)}</strong></a>` : '<span></span>'}
      ${adjacent.next ? `<a href="../../${routeFor(adjacent.next.module, adjacent.next.entry)}"><small>Próximo</small><strong>${esc(adjacent.next.entry.number)} · ${esc(adjacent.next.entry.title)}</strong></a>` : ''}
    </nav>
  </main>`;
}

function renderOverview() {
  const allItems = brandFramework.modules.flatMap((module) => module.items);
  const approvedCount = allItems.filter((entry) => entry.status === 'approved').length;
  const derivedCount = allItems.filter((entry) => entry.status === 'derived').length;
  const pendingCount = allItems.filter((entry) => entry.status === 'pending').length;

  return `<main class="page docs-page">
    <div class="brand-framework-overview">
      <header class="brand-framework-hero">
        <div>
          <span class="eyebrow">CIIMO / Brand Framework</span>
          <h1>Imóveis acompanhados como investimento.</h1>
          <p>${esc(brandBook.executiveSummary)}</p>
        </div>
        <div class="brand-framework-hero__meta">
          <div class="brand-framework-stat"><small>Módulos</small><strong>${String(brandFramework.modules.length).padStart(2, '0')}</strong></div>
          <div class="brand-framework-stat"><small>Decisões aprovadas</small><strong>${approvedCount}</strong></div>
          <div class="brand-framework-stat"><small>Derivações</small><strong>${derivedCount}</strong></div>
          <div class="brand-framework-stat"><small>Pendências visíveis</small><strong>${pendingCount}</strong></div>
        </div>
      </header>

      <section class="section">
        <div class="section-head"><div><span class="section-no">00 / Fonte central</span><h2>O documento inteiro virou sistema.</h2></div><p>Essência, visão, problema, proposta de valor, percepção, posicionamento, relacionamento, diferenciação, experiência, pilares, promessa, mensagens, linguagem, frases, resumo executivo e direção prática alimentam as páginas abaixo.</p></div>
        <div class="brand-framework-source">
          <blockquote class="brand-framework-source__quote">“${esc(brandBook.promise)}”</blockquote>
          <div class="brand-framework-source__rules">
            <div><small>Propósito</small><strong>${esc(brandBook.purpose)}</strong></div>
            <div><small>Visão</small><strong>${esc(brandBook.vision)}</strong></div>
            <div><small>Filtro central</small><strong>${esc(brandBook.centralQuestion)}</strong></div>
          </div>
        </div>
      </section>

      ${brandFramework.groups.map((group, groupIndex) => {
        const modules = brandFramework.modules.filter((module) => module.group === group);
        return `<section class="section">
          <div class="section-head"><div><span class="section-no">${String(groupIndex + 1).padStart(2, '0')} / ${esc(group)}</span><h2>${esc(group)}</h2></div><p>${group === 'Foundation' ? 'Núcleo, estratégia, público e personalidade.' : group === 'Language & Narrative' ? 'Voz, mensagens e narrativa.' : group === 'Visual Identity' ? 'Ativos, tipografia, iconografia, linguagem gráfica, layout e motion.' : group === 'Experience' ? 'Marca percebida em contato com pessoas e produto.' : 'Uso responsável, rastreabilidade e manutenção do sistema.'}</p></div>
          <div class="brand-framework-modules">${modules.map((module) => `<article class="brand-module-card">
            <span class="brand-module-card__number">${esc(module.number)}</span>
            <h3>${esc(module.title)}</h3>
            <p>${esc(module.description)}</p>
            <div class="brand-module-items">${module.items.map((entry) => `<a href="../${routeFor(module, entry)}"><span>${esc(entry.number)}</span><strong>${esc(entry.title)}</strong><em class="brand-mini-status brand-mini-status--${entry.status}">${statusLabel(entry.status)[0]}</em><i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i></a>`).join('')}</div>
          </article>`).join('')}</div>
        </section>`;
      }).join('')}
    </div>
  </main>`;
}

const brandFrameworkPages = {
  'brand/index.html': { title: 'Brand Framework · CIIMO Design System', html: renderOverview() },
};

for (const module of brandFramework.modules) {
  for (const entry of module.items) {
    brandFrameworkPages[routeFor(module, entry)] = {
      title: `${entry.number} · ${entry.title} · CIIMO Brand Framework`,
      html: renderBrandItem(module, entry),
    };
  }
}

module.exports = { brandFrameworkPages };
