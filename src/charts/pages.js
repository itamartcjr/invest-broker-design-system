const { chartCatalog } = require('./catalog');
const { chartGroups, chartTypeOrder } = require('./groups');
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

  return `<article class="chart-card" data-chart-type="${esc(card.type)}">
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

function sectionBlock(group, preset) {
  const cards = group.types.map((type) => {
    const example = preset.examples[type];
    if (!example) throw new Error(`Exemplo ausente no preset ${preset.key}: ${type}`);
    return chartCard(example);
  });

  return `<section class="section chart-family-section" id="charts-${esc(group.key)}">
    <div class="section-head">
      <div><span class="section-no">${esc(group.number)} / ${esc(group.label)}</span><h2>${esc(group.title)}</h2></div>
      <p>${esc(group.description)}</p>
    </div>
    <div class="chart-grid-shell"><div class="chart-board">${cards.join('')}</div></div>
  </section>`;
}

function repertoire() {
  return `<div class="chart-repertoire">
    <div><small>Catálogo completo</small><strong>${chartTypeOrder.length}</strong><span>gráficos</span></div>
    <div class="chart-repertoire__grid"><strong>Grid</strong><span>4</span><i>→</i><span>3</span><i>→</i><span>2</span><i>→</i><span>1</span></div>
  </div>`;
}

function behaviorBlock(preset) {
  return `<section class="section chart-behavior-section">
    <div class="section-head"><div><span class="section-no">05 / Grid</span><h2>${esc(preset.behavior.title)}</h2></div><p>O renderer do gráfico é independente da composição. Cada card ocupa uma célula e precisa continuar legível em qualquer um dos quatro estados do grid.</p></div>
    <div class="chart-rules">${preset.behavior.items.map(([title, text]) => `<article><strong>${esc(title)}</strong><span>${esc(text)}</span></article>`).join('')}</div>
    <div class="chart-palette-rule"><span><i class="chart-dot chart-dot--primary"></i><strong>Accent</strong><small>série principal / ação</small></span><span><i class="chart-dot chart-dot--secondary"></i><strong>Azul</strong><small>comparação</small></span><span><i class="chart-dot chart-dot--gold"></i><strong>Dourado</strong><small>benchmark / referência</small></span><span><i class="chart-dot chart-dot--muted"></i><strong>Neutro</strong><small>base / contexto</small></span></div>
  </section>`;
}

function renderChartsPage(preset) {
  const missing = chartTypeOrder.filter((type) => !preset.examples[type]);
  if (missing.length) throw new Error(`Preset ${preset.key} incompleto: ${missing.join(', ')}`);

  return `<main class="page charts-page charts-page--${esc(preset.key)}">
    <header class="page-head"><div><span class="eyebrow">${esc(preset.eyebrow)}</span><h1>${esc(preset.heading)}</h1><p>${esc(preset.description)}</p>${repertoire()}</div><div class="page-index">01 — Séries temporais<br>02 — Barras e comparação<br>03 — Composição e progresso<br>04 — Distribuição e intensidade<br>05 — Grid</div></header>
    ${chartGroups.map((group) => sectionBlock(group, preset)).join('\n')}
    ${behaviorBlock(preset)}
  </main>`;
}

const chartPages = {
  [appChartPreset.route]: { title: appChartPreset.title, html: renderChartsPage(appChartPreset) },
  [webChartPreset.route]: { title: webChartPreset.title, html: renderChartsPage(webChartPreset) },
};

module.exports = { chartPages, renderChartsPage, chartCard };
