const { brandBook } = require('./brand-book');

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function moduleCard(number, title, description, items) {
  return `<article class="brand-module-card">
    <span class="brand-module-card__number">${number}</span>
    <h3>${esc(title)}</h3>
    <p>${esc(description)}</p>
    <div class="brand-module-items">
      ${items.map((item, index) => `<a href="${item.href}"><span>${number}.${String(index + 1).padStart(2, '0')}</span><strong>${esc(item.label)}</strong><i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i></a>`).join('')}
    </div>
  </article>`;
}

const brandOverviewHtml = `<main class="page docs-page">
<div class="brand-framework-overview">
  <header class="brand-framework-hero">
    <div>
      <span class="eyebrow">CIIMO / Brand Framework</span>
      <h1>Imóveis acompanhados como investimento.</h1>
      <p>${esc(brandBook.essence)}</p>
    </div>
    <div class="brand-framework-hero__meta" aria-label="Resumo da marca">
      <div class="brand-framework-stat"><small>Módulos</small><strong>02</strong></div>
      <div class="brand-framework-stat"><small>Capítulos</small><strong>06</strong></div>
      <div class="brand-framework-stat"><small>Promessa</small><strong>01 fonte central</strong></div>
      <div class="brand-framework-stat"><small>Status</small><strong>Living system</strong></div>
    </div>
  </header>

  <section class="section">
    <div class="section-head"><div><span class="section-no">00 / Overview</span><h2>A marca organizada como sistema.</h2></div><p>Assim como no projeto de referência, a Marca começa por um overview e se divide em módulos claros. Cada capítulo aprofunda uma decisão sem misturar estratégia, expressão visual e implementação.</p></div>
    <div class="brand-framework-modules">
      ${moduleCard('01', 'Estratégia da marca', 'Define o que a CIIMO significa, como se posiciona, como deve ser percebida e que experiência precisa entregar.', [
        { label: 'Posicionamento', href: './positioning.html' },
        { label: 'Personalidade e voz', href: './personality.html' },
        { label: 'Princípios de produto', href: './experience.html' },
      ])}
      ${moduleCard('02', 'Identidade e expressão', 'Transforma a estratégia em direção visual: sobriedade, uso da marca, temas, contraste e regras de interface.', [
        { label: 'Princípios visuais', href: './visual-principles.html' },
        { label: 'Identidade visual', href: './identity.html' },
        { label: 'Tema claro e escuro', href: './theme.html' },
      ])}
    </div>
  </section>

  <section class="section">
    <div class="section-head"><div><span class="section-no">01 / Essência</span><h2>O ponto de partida continua sendo a promessa.</h2></div><p>O framework organiza a marca, mas não substitui o conteúdo estratégico já definido. A essência e a promessa orientam produto, linguagem, visual e decisão.</p></div>
    <div class="brand-framework-source">
      <blockquote class="brand-framework-source__quote">“${esc(brandBook.promise)}”</blockquote>
      <div class="brand-framework-source__rules">
        <div><small>Visão</small><strong>${esc(brandBook.vision)}</strong></div>
        <div><small>Posicionamento</small><strong>${esc(brandBook.positioning.primary)}</strong></div>
        <div><small>Critério central</small><strong>${esc(brandBook.centralQuestion)}</strong></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-head"><div><span class="section-no">02 / Precedência</span><h2>Uma fonte de verdade para cada decisão.</h2></div><p>A estrutura vem do framework de referência; a identidade continua vindo da CIIMO. Essa separação evita que organização documental seja confundida com estética.</p></div>
    <div class="grid grid-4">
      <div class="metric"><small>1</small><strong>Estratégia da marca</strong></div>
      <div class="metric"><small>2</small><strong>Produto real</strong></div>
      <div class="metric"><small>3</small><strong>Design System</strong></div>
      <div class="metric"><small>4</small><strong>Referências externas</strong></div>
    </div>
  </section>
</div>
</main>`;

const brandOverviewPage = {
  route: 'brand/index.html',
  page: {
    title: 'Brand Framework · CIIMO Design System',
    html: brandOverviewHtml,
  },
};

module.exports = { brandOverviewPage };
