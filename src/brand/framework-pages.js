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
  if (!lines.length) return '';
  return `<div class="${className}">${lines.map((line) => `<div><i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i><span>${esc(line)}</span></div>`).join('')}</div>`;
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
  const adjacent = adjacentItems(entry);
  const decision = values(entry.decision);
  const examples = values(entry.examples);
  const dont = values(entry.dont);
  const questions = values(entry.questions);
  const pending = entry.status === 'pending';

  return `<main class="page docs-page brand-field-page">
    <header class="brand-field-hero">
      <div class="brand-field-hero__meta">
        <span class="eyebrow">CIIMO / Brand / ${esc(module.group)}</span>
        ${pending ? '<span class="brand-field-status brand-field-status--pending">A definir</span>' : ''}
      </div>
      <span class="brand-field-number">${esc(entry.number)} · ${esc(module.title)}</span>
      <h1>${esc(entry.title)}</h1>
      <p>${esc(entry.definition)}</p>
    </header>

    <section class="section brand-field-section">
      <div class="section-head"><div><span class="section-no">01</span><h2>${pending ? 'A definir' : 'Diretriz'}</h2></div>${pending ? '<p>Este ponto ainda não foi definido oficialmente para a CIIMO.</p>' : ''}</div>
      ${pending
        ? (questions.length
          ? `<div class="brand-question-grid">${questions.map((question) => `<article><strong>${esc(question)}</strong></article>`).join('')}</div>`
          : '<div class="alert">Ainda não definido oficialmente.</div>')
        : list(decision, 'brand-decision-list')}
    </section>

    ${examples.length ? `<section class="section brand-field-section">
      <div class="section-head"><div><span class="section-no">02</span><h2>Aplicações</h2></div></div>
      <div class="brand-application-grid">
        <article class="brand-application-card">${examples.map((line) => `<p>${esc(line)}</p>`).join('')}</article>
        ${dont.length ? `<article class="brand-application-card brand-application-card--dont"><small>Evitar</small>${dont.map((line) => `<p>${esc(line)}</p>`).join('')}</article>` : ''}
      </div>
    </section>` : dont.length ? `<section class="section brand-field-section">
      <div class="section-head"><div><span class="section-no">02</span><h2>Evitar</h2></div></div>
      <div class="brand-application-card brand-application-card--dont">${dont.map((line) => `<p>${esc(line)}</p>`).join('')}</div>
    </section>` : ''}

    <nav class="brand-page-nav" aria-label="Navegação entre itens da marca">
      ${adjacent.previous ? `<a href="../../${routeFor(adjacent.previous.module, adjacent.previous.entry)}"><small>Anterior</small><strong>${esc(adjacent.previous.entry.number)} · ${esc(adjacent.previous.entry.title)}</strong></a>` : '<span></span>'}
      ${adjacent.next ? `<a href="../../${routeFor(adjacent.next.module, adjacent.next.entry)}"><small>Próximo</small><strong>${esc(adjacent.next.entry.number)} · ${esc(adjacent.next.entry.title)}</strong></a>` : ''}
    </nav>
  </main>`;
}

function renderOverview() {
  return `<main class="page docs-page">
    <div class="brand-framework-overview">
      <header class="brand-framework-hero">
        <div>
          <span class="eyebrow">CIIMO / Brand Book</span>
          <h1>Imóveis acompanhados como investimento.</h1>
          <p>${esc(brandBook.executiveSummary)}</p>
        </div>
        <div class="brand-framework-source__rules">
          <div><small>Promessa</small><strong>${esc(brandBook.promise)}</strong></div>
          <div><small>Visão</small><strong>${esc(brandBook.vision)}</strong></div>
          <div><small>Posicionamento</small><strong>${esc(brandBook.positioning.primary)}</strong></div>
        </div>
      </header>

      <section class="section">
        <div class="section-head"><div><span class="section-no">01 / Essência</span><h2>${esc(brandBook.essence)}</h2></div><p>${esc(brandBook.purpose)}</p></div>
        <blockquote class="brand-framework-source__quote">“${esc(brandBook.promise)}”</blockquote>
      </section>

      <section class="section">
        <div class="section-head"><div><span class="section-no">02 / Posicionamento</span><h2>${esc(brandBook.positioning.primary)}</h2></div><p>${esc(brandBook.positioning.expanded)}</p></div>
        <div class="cluster">${brandBook.positioning.territory.map((item) => `<span class="chip">${esc(item)}</span>`).join('')}</div>
      </section>

      <section class="section">
        <div class="section-head"><div><span class="section-no">03 / Públicos</span><h2>Cliente, corretor e imobiliária.</h2></div></div>
        <div class="grid grid-3">${brandBook.audiences.map((audience) => `<article class="specimen"><h3>${esc(audience.title)}</h3><p>${esc(audience.text)}</p></article>`).join('')}</div>
      </section>

      <section class="section">
        <div class="section-head"><div><span class="section-no">04 / Personalidade</span><h2>${esc(brandBook.perceptionSummary)}</h2></div></div>
        <div class="brand-translation-grid">${brandBook.perception.map(([trait, qualifier]) => `<article><strong>${esc(trait)}</strong><p>${esc(qualifier)}</p></article>`).join('')}</div>
      </section>

      <section class="section">
        <div class="section-head"><div><span class="section-no">05 / Experiência</span><h2>${esc(brandBook.experienceSummary)}</h2></div></div>
        <div class="grid grid-3">${brandBook.pillars.map(([title, text]) => `<article class="specimen"><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div>
      </section>

      <section class="section">
        <div class="section-head"><div><span class="section-no">06 / Linguagem</span><h2>${brandBook.language.traits.map(esc).join(' · ')}</h2></div><p>${esc(brandBook.language.avoid)}</p></div>
        <div class="cluster">${brandBook.language.preferredTerms.map((term) => `<span class="chip">${esc(term)}</span>`).join('')}</div>
        <div class="brand-framework-list" style="margin-top:24px">${brandBook.summaryLines.map((line) => `<div><i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i><span>${esc(line)}</span></div>`).join('')}</div>
      </section>

      <section class="section">
        <div class="section-head"><div><span class="section-no">07 / Índice</span><h2>Conteúdo da marca.</h2></div></div>
        ${brandFramework.groups.map((group) => {
          const modules = brandFramework.modules.filter((module) => module.group === group);
          return `<div class="brand-book-index"><h3>${esc(group)}</h3><div class="brand-framework-modules">${modules.map((module) => `<article class="brand-module-card">
            <span class="brand-module-card__number">${esc(module.number)}</span>
            <h3>${esc(module.title)}</h3>
            <div class="brand-module-items">${module.items.map((entry) => `<a href="../${routeFor(module, entry)}"><span>${esc(entry.number)}</span><strong>${esc(entry.title)}</strong><i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i></a>`).join('')}</div>
          </article>`).join('')}</div></div>`;
        }).join('')}
      </section>
    </div>
  </main>`;
}

const brandFrameworkPages = {
  'brand/index.html': { title: 'Brand Book · CIIMO', html: renderOverview() },
};

for (const module of brandFramework.modules) {
  for (const entry of module.items) {
    brandFrameworkPages[routeFor(module, entry)] = {
      title: `${entry.number} · ${entry.title} · CIIMO Brand`,
      html: renderBrandItem(module, entry),
    };
  }
}

module.exports = { brandFrameworkPages };
