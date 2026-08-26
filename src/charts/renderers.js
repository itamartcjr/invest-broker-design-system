function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function svgFrame(id, label, body, description = 'Visualização demonstrativa do padrão de gráficos CIIMO.') {
  return `<svg class="chart-svg" viewBox="0 0 360 180" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${esc(label)}</title><desc id="${id}-desc">${esc(description)}</desc>${body}</svg>`;
}

function grid() {
  return '<g class="chart-grid-lines"><path d="M28 28H346M28 70H346M28 112H346M28 154H346"/></g>';
}

function axis(labels = ['Jan', 'Abr', 'Jul', 'Out']) {
  const xs = [28, 130, 232, 326];
  return `<g class="chart-axis-labels">${labels.map((label, index) => `<text x="${xs[index] || 326}" y="174">${esc(label)}</text>`).join('')}</g>`;
}

function line({ id, label, area = false, series = 1 }) {
  const paths = [
    ['primary', 'M28 144 C58 138 75 118 106 124 S151 96 184 105 S228 73 260 82 S310 49 346 56'],
    ['secondary', 'M28 132 C61 127 84 134 111 112 S154 119 185 91 S229 104 260 76 S308 87 346 65'],
    ['gold', 'M28 124 C69 118 86 104 116 110 S158 86 191 95 S234 68 265 72 S310 61 346 48'],
  ];
  const areaPath = area ? '<path class="chart-area-fill" d="M28 144 C58 138 75 118 106 124 S151 96 184 105 S228 73 260 82 S310 49 346 56 L346 154 L28 154 Z"/>' : '';
  return svgFrame(id, label, `${grid()}${areaPath}${paths.slice(0, series).map(([tone, d]) => `<path class="chart-line chart-line--${tone}" d="${d}"/>`).join('')}${axis()}`);
}

function sparkline({ id, label, tone = 'primary' }) {
  return svgFrame(id, label, `<path class="chart-sparkline chart-line--${tone}" d="M18 118 C54 126 68 96 96 104 S139 74 166 84 S207 55 236 71 S288 41 342 54"/><circle class="chart-point chart-point--${tone}" cx="342" cy="54" r="5"/>`, 'Sparkline de tendência sem eixos, usada como apoio a um indicador principal.');
}

function bars({ id, label, grouped = false }) {
  const xs = [42, 88, 134, 180, 226, 272, 318];
  const heights = [58, 84, 70, 104, 92, 122, 110];
  const body = xs.map((x, index) => grouped
    ? `<rect class="chart-bar chart-bar--muted" x="${x - 11}" y="${154 - heights[index] * .7}" width="13" height="${heights[index] * .7}" rx="4"/><rect class="chart-bar chart-bar--primary" x="${x + 5}" y="${154 - heights[index]}" width="13" height="${heights[index]}" rx="4"/>`
    : `<rect class="chart-bar chart-bar--primary" x="${x - 6}" y="${154 - heights[index]}" width="20" height="${heights[index]}" rx="5"/>`).join('');
  return svgFrame(id, label, `${grid()}${body}${axis(['Jan', 'Mar', 'Mai', 'Jul'])}`);
}

function stackedBars({ id, label }) {
  const stacks = [[34,22,10],[48,18,18],[40,30,12],[54,26,22],[44,34,16],[58,20,28]];
  const body = stacks.map((values, index) => {
    const x = 46 + index * 50;
    const [a,b,c] = values;
    return `<rect class="chart-bar chart-bar--primary" x="${x}" y="${154-a}" width="26" height="${a}" rx="4"/><rect class="chart-bar chart-bar--secondary" x="${x}" y="${154-a-b}" width="26" height="${b}" rx="4"/><rect class="chart-bar chart-bar--gold" x="${x}" y="${154-a-b-c}" width="26" height="${c}" rx="4"/>`;
  }).join('');
  return svgFrame(id, label, `${grid()}${body}${axis(['Jan', 'Mar', 'Mai', 'Jun'])}`, 'Colunas empilhadas para composição de fluxo por período.');
}

function stackedArea({ id, label }) {
  return svgFrame(id, label, `${grid()}<path class="chart-area chart-area--muted" d="M28 128 C70 114 104 125 142 106 S212 111 250 88 S308 94 346 74 L346 154 L28 154 Z"/><path class="chart-area chart-area--secondary" d="M28 142 C67 133 105 141 141 120 S208 128 250 106 S307 109 346 92 L346 154 L28 154 Z"/><path class="chart-area chart-area--primary" d="M28 149 C70 144 103 147 142 135 S210 140 250 124 S309 128 346 112 L346 154 L28 154 Z"/>${axis()}`, 'Áreas empilhadas para intensidade ou composição ao longo do tempo.');
}

function donut({ id, label, value = 64 }) {
  const rest = 100 - value;
  return `<div class="chart-donut-wrap"><svg class="chart-donut" viewBox="0 0 160 160" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${esc(label)}</title><desc id="${id}-desc">Composição com ${value}% na categoria principal.</desc><circle class="chart-donut__track" cx="80" cy="80" r="56"/><circle class="chart-donut__segment chart-donut__segment--primary" cx="80" cy="80" r="56" pathLength="100" stroke-dasharray="${value} ${rest}" stroke-dashoffset="25"/><circle class="chart-donut__segment chart-donut__segment--secondary" cx="80" cy="80" r="56" pathLength="100" stroke-dasharray="18 82" stroke-dashoffset="${25 - value}"/></svg><div class="chart-donut-value"><strong>${value}%</strong><span>principal</span></div></div>`;
}

function radial({ id, label, value = 73 }) {
  return `<div class="chart-donut-wrap"><svg class="chart-donut" viewBox="0 0 160 160" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${esc(label)}</title><desc id="${id}-desc">Progresso circular de ${value}%.</desc><circle class="chart-donut__track" cx="80" cy="80" r="56"/><circle class="chart-donut__segment chart-donut__segment--primary" cx="80" cy="80" r="56" pathLength="100" stroke-dasharray="${value} ${100-value}" stroke-dashoffset="25"/></svg><div class="chart-donut-value"><strong>${value}%</strong><span>concluído</span></div></div>`;
}

function multiRing({ id, label }) {
  const rings = [[56,78,'primary'],[43,62,'secondary'],[30,44,'gold']];
  return `<div class="chart-donut-wrap"><svg class="chart-donut chart-donut--multi" viewBox="0 0 160 160" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${esc(label)}</title><desc id="${id}-desc">Três anéis concêntricos para comparar participação relativa.</desc>${rings.map(([radius,value,tone]) => `<circle class="chart-donut__track" cx="80" cy="80" r="${radius}"/><circle class="chart-donut__segment chart-donut__segment--${tone}" cx="80" cy="80" r="${radius}" pathLength="100" stroke-dasharray="${value} ${100-value}" stroke-dashoffset="25"/>`).join('')}</svg><div class="chart-donut-value"><strong>3</strong><span>segmentos</span></div></div>`;
}

function pie({ id, label }) {
  return `<div class="chart-pie-wrap"><svg class="chart-pie" viewBox="0 0 42 42" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${esc(label)}</title><desc id="${id}-desc">Distribuição em quatro categorias.</desc><circle r="15.9" cx="21" cy="21" class="chart-pie-track"/><circle r="15.9" cx="21" cy="21" class="chart-pie-segment chart-pie-segment--primary" pathLength="100" stroke-dasharray="38 62" stroke-dashoffset="25"/><circle r="15.9" cx="21" cy="21" class="chart-pie-segment chart-pie-segment--secondary" pathLength="100" stroke-dasharray="27 73" stroke-dashoffset="-13"/><circle r="15.9" cx="21" cy="21" class="chart-pie-segment chart-pie-segment--gold" pathLength="100" stroke-dasharray="20 80" stroke-dashoffset="-40"/></svg></div>`;
}

function horizontalBars({ label }) {
  const items = [['Marista',92],['Bueno',78],['Jardim Goiás',66],['Setor Oeste',54],['Alto da Glória',43]];
  return `<div class="chart-horizontal" role="img" aria-label="${esc(label)}">${items.map(([name,value], index) => `<div><span>${esc(name)}</span><i><b style="width:${value}%" class="${index === 0 ? 'is-primary' : ''}"></b></i><strong>${value}</strong></div>`).join('')}</div>`;
}

function heatmap({ label }) {
  const values = [1,2,0,1,3,2,1,0,1,2,2,3,1,0,1,3,3,2,1,0,1,0,1,2,3,2,2,1,1,2,1,0,3,2,1,2,3,1,2,0,1,3];
  return `<div class="chart-heatmap" role="img" aria-label="${esc(label)}">${values.map((value,index) => `<i class="level-${value}" title="Período ${index + 1}"></i>`).join('')}</div>`;
}

function mixed({ id, label }) {
  const xs = [50,98,146,194,242,290];
  const heights = [48,76,62,96,84,110];
  return svgFrame(id, label, `${grid()}${xs.map((x,index) => `<rect class="chart-bar chart-bar--muted" x="${x}" y="${154-heights[index]}" width="24" height="${heights[index]}" rx="4"/>`).join('')}<path class="chart-line chart-line--primary" d="M62 124 C99 113 112 108 146 99 S208 83 242 72 S290 65 302 51"/>${axis(['T1','T2','T3','T4'])}`, 'Combinação de colunas de volume com linha de desempenho.');
}

const renderers = {
  line,
  area: (props) => line({ ...props, area: true }),
  multiLine: (props) => line({ ...props, series: props.series || 3 }),
  sparkline,
  bars,
  groupedBars: (props) => bars({ ...props, grouped: true }),
  stackedBars,
  stackedArea,
  donut,
  radial,
  multiRing,
  pie,
  horizontalBars,
  heatmap,
  mixed,
};

function renderChart(type, props) {
  const renderer = renderers[type];
  if (!renderer) throw new Error(`Chart renderer não encontrado: ${type}`);
  return renderer(props || {});
}

module.exports = { esc, renderChart, renderers };
