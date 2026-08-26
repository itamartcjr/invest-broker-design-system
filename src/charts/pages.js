const { chartCatalog, chartFamilies } = require('./catalog');
const { esc, renderChart } = require('./renderers');
const { appChartPreset, webChartPreset } = require('./presets');

function legend(items = []) {
  if (!items.length) return '';
  return `<div class="chart-legend">${items.map(([tone, label]) => `<span><i class="chart-dot chart-dot--${esc(tone)}"></i>${esc(label)}</span>`).join('')}</div>`;
}

function chartCard(card) {
  const catalogItem = chartCatalog[card.type];
  if (!catalogItem) throw new Error(`Tipo de gráfico não catalogado: ${card.type}`);
  const chart = renderChart(card.type, {
    id: card.id,
    label: card.label,
    series: card.series,
    ...(card.chartProps || {}),
  });

  return `<article class="chart-card chart-card--${esc(card.size || 'standard')}" data-chart-type="${esc(card.type)}">
    <header class="chart-card__head">
      <div>
        <span class="chart-card__eyebrow">${esc(card.eyebrow)}</span>
        <h3>${esc(card.title)}</h3>
      </div>
      ${card.value ? `<strong class="chart-card__value">${esc(card.value)}</strong>` : ''}
    </header>
    <div class="chart-card__type"><span>${esc(catalogItem.label)}</span><small>${esc(catalogItem.family)}</small></div>
    ${card.meta ? `<p class="chart-card__meta">${esc(card.meta)}</p>` : ''}
    <div class="chart-card__plot">${chart}</div>
    ${legend(card.legend)}
  </article>`;
}

function sectionBlock(section) {
  return `<section class="section chart-family-section" id="charts-${esc(section.key)}">
    <div class="section-head">
      <div><span class="section-no">${esc(section.number)} / ${esc(section.label)}</span><h2>${esc(section.title)}</h2></div>
      <p>${esc(section.description)}</p>
    </div>
    <div class="chart-board chart-board--mosaic">${section.cards.map(chartCard).join('')}</div>
  </section>`;
}

function repertoire() {
  return `<div class="chart-repertoire">
    <div><small>Tipos documentados</small><strong>${Object.keys(chartCatalog).length}</strong></div>
    <div class="chart-repertoire__families">${chartFamilies.map((family) => `<span>${esc(family)}</span>`).join('')}</div>
  </div>`;
}

function behaviorBlock(preset) {
  return `<section class="section chart-behavior-section">
    <div class="section-head"><div><span class="section-no">${String(preset.sections.length + 1).padStart(2, '0')} / Comportamento</span><h2>${esc(preset.behavior.title)}</h2></div><p>As referências ampliam o repertório; a CIIMO mantém uma hierarquia cromática curta e previsível.</p></div>
    <div class="chart-rules">${preset.behavior.items.map(([title, text]) => `<article><strong>${esc(title)}</strong><span>${esc(text)}</span></article>`).join('')}</div>
    <div class="chart-palette-rule"><span><i class="chart-dot chart-dot--primary"></i><strong>Lime</strong><small>série principal / ação</small></span><span><i class="chart-dot chart-dot--secondary"></i><strong>Azul</strong><small>comparação</small></span><span><i class="chart-dot chart-dot--gold"></i><strong>Dourado</strong><small>benchmark / referência</small></span><span><i class="chart-dot chart-dot--muted"></i><strong>Neutro</strong><small>base / contexto</small></span></div>
  </section>`;
}

function renderChartsPage(preset) {
  const index = [...preset.sections.map((section) => `${section.number} — ${section.label}`), `${String(preset.sections.length + 1).padStart(2, '0')} — Comportamento`];
  return `<main class="page charts-page charts-page--${esc(preset.key)}">
    <header class="page-head"><div><span class="eyebrow">${esc(preset.eyebrow)}</span><h1>${esc(preset.heading)}</h1><p>${esc(preset.description)}</p>${repertoire()}</div><div class="page-index">${index.join('<br>')}</div></header>
    ${preset.sections.map(sectionBlock).join('\n')}
    ${behaviorBlock(preset)}
  </main>`;
}

const chartPages = {
  [appChartPreset.route]: { title: appChartPreset.title, html: renderChartsPage(appChartPreset) },
  [webChartPreset.route]: { title: webChartPreset.title, html: renderChartsPage(webChartPreset) },
};

module.exports = { chartPages, renderChartsPage };
