function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function svgFrame(id, label, body, description = 'Visualização demonstrativa do padrão de gráficos CIIMO.', className = '') {
  return `<svg class="chart-svg ${className}" viewBox="0 0 360 180" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${esc(label)}</title><desc id="${id}-desc">${esc(description)}</desc>${body}</svg>`;
}

function grid() {
  return '<g class="chart-grid-lines"><path d="M28 28H346M28 70H346M28 112H346M28 154H346"/></g>';
}

function axis(labels = ['Jan', 'Abr', 'Jul', 'Out']) {
  const xs = [28, 128, 228, 326];
  return `<g class="chart-axis-labels">${labels.map((label, index) => `<text x="${xs[index] || 326}" y="174">${esc(label)}</text>`).join('')}</g>`;
}

const paths = {
  straight: 'M28 144 L78 118 L126 126 L176 98 L224 106 L274 78 L316 84 L346 56',
  spline: 'M28 144 C58 138 75 118 106 124 S151 96 184 105 S228 73 260 82 S310 49 346 56',
  secondary: 'M28 132 C61 127 84 134 111 112 S154 119 185 91 S229 104 260 76 S308 87 346 65',
  gold: 'M28 124 C69 118 86 104 116 110 S158 86 191 95 S234 68 265 72 S310 61 346 48',
};

function line({ id, label }) {
  return svgFrame(id, label, `${grid()}<path class="chart-line chart-line--primary" d="${paths.straight}"/>${axis()}`);
}

function spline({ id, label }) {
  return svgFrame(id, label, `${grid()}<path class="chart-line chart-line--primary" d="${paths.spline}"/>${axis()}`, 'Linha suavizada para leitura de tendência contínua.');
}

function multiLine({ id, label, series = 3 }) {
  const all = [['primary', paths.spline], ['secondary', paths.secondary], ['gold', paths.gold]];
  return svgFrame(id, label, `${grid()}${all.slice(0, Math.max(1, Math.min(3, series))).map(([tone, d]) => `<path class="chart-line chart-line--${tone}" d="${d}"/>`).join('')}${axis()}`);
}

function area({ id, label }) {
  return svgFrame(id, label, `${grid()}<path class="chart-area-fill" d="${paths.spline} L346 154 L28 154 Z"/><path class="chart-line chart-line--primary" d="${paths.spline}"/>${axis()}`);
}

function areaLine({ id, label }) {
  return svgFrame(id, label, `${grid()}<path class="chart-area-fill" d="${paths.spline} L346 154 L28 154 Z"/><path class="chart-line chart-line--primary" d="${paths.spline}"/><path class="chart-line chart-line--secondary" d="${paths.secondary}"/>${axis()}`, 'Área principal acompanhada por uma segunda linha de referência.');
}

function rangeAreaLine({ id, label }) {
  const band = 'M28 116 C70 102 96 112 132 92 S196 88 230 66 S294 58 346 46 L346 82 C300 88 276 96 244 100 S184 116 148 122 S78 136 28 146 Z';
  return svgFrame(id, label, `${grid()}<path class="chart-range-fill" d="${band}"/><path class="chart-line chart-line--primary" d="${paths.spline}"/>${axis()}`, 'Faixa de referência ou expectativa com uma linha observada.');
}

function sparkline({ id, label, tone = 'primary' }) {
  return svgFrame(id, label, `<path class="chart-sparkline chart-line--${tone}" d="M18 118 C54 126 68 96 96 104 S139 74 166 84 S207 55 236 71 S288 41 342 54"/><circle class="chart-point chart-point--${tone}" cx="342" cy="54" r="5"/>`, 'Sparkline de tendência sem eixos, usada como apoio a um indicador principal.', 'chart-svg--compact');
}

function miniTrend({ id, label }) {
  const points = [[18,126],[48,118],[78,122],[108,92],[138,101],[168,76],[198,84],[228,60],[258,69],[288,48],[318,55],[342,38]];
  return svgFrame(id, label, `<path class="chart-mini-baseline" d="M18 142H342"/><polyline class="chart-line chart-line--primary chart-line--thin" points="${points.map(([x,y]) => `${x},${y}`).join(' ')}"/>${points.filter((_, index) => index % 3 === 0).map(([x,y]) => `<circle class="chart-mini-point" cx="${x}" cy="${y}" r="3"/>`).join('')}`, 'Microtendência compacta para indicadores.', 'chart-svg--compact');
}

function verticalBars({ id, label, rounded = false, grouped = false }) {
  const xs = [42, 88, 134, 180, 226, 272, 318];
  const heights = [58, 84, 70, 104, 92, 122, 110];
  const radius = rounded ? 10 : 4;
  const body = xs.map((x, index) => grouped
    ? `<rect class="chart-bar chart-bar--muted" x="${x - 11}" y="${154 - heights[index] * .7}" width="13" height="${heights[index] * .7}" rx="${radius}"/><rect class="chart-bar chart-bar--primary" x="${x + 5}" y="${154 - heights[index]}" width="13" height="${heights[index]}" rx="${radius}"/>`
    : `<rect class="chart-bar chart-bar--primary" x="${x - 6}" y="${154 - heights[index]}" width="20" height="${heights[index]}" rx="${radius}"/>`).join('');
  return svgFrame(id, label, `${grid()}${body}${axis(['Jan', 'Mar', 'Mai', 'Jul'])}`);
}

function bars(props) { return verticalBars(props); }
function roundedBars(props) { return verticalBars({ ...props, rounded: true }); }
function groupedBars(props) { return verticalBars({ ...props, grouped: true }); }

function stackedBars({ id, label }) {
  const stacks = [[34,22,10],[48,18,18],[40,30,12],[54,26,22],[44,34,16],[58,20,28]];
  const body = stacks.map((values, index) => {
    const x = 46 + index * 50;
    const [a,b,c] = values;
    return `<rect class="chart-bar chart-bar--primary" x="${x}" y="${154-a}" width="26" height="${a}" rx="4"/><rect class="chart-bar chart-bar--secondary" x="${x}" y="${154-a-b}" width="26" height="${b}" rx="4"/><rect class="chart-bar chart-bar--gold" x="${x}" y="${154-a-b-c}" width="26" height="${c}" rx="4"/>`;
  }).join('');
  return svgFrame(id, label, `${grid()}${body}${axis(['Jan', 'Mar', 'Mai', 'Jun'])}`, 'Colunas empilhadas para composição de fluxo por período.');
}

function horizontalBars({ label, rounded = false }) {
  const items = [['Marista',92],['Bueno',78],['Jardim Goiás',66],['Setor Oeste',54],['Alto da Glória',43]];
  return `<div class="chart-horizontal ${rounded ? 'chart-horizontal--rounded' : ''}" role="img" aria-label="${esc(label)}">${items.map(([name,value], index) => `<div><span>${esc(name)}</span><i><b style="width:${value}%" class="${index === 0 ? 'is-primary' : ''}"></b></i><strong>${value}</strong></div>`).join('')}</div>`;
}

function roundedHorizontalBars(props) {
  return horizontalBars({ ...props, rounded: true });
}

function funnelBars({ id, label }) {
  const widths = [278,236,194,154,116];
  return svgFrame(id, label, `${widths.map((width, index) => `<rect class="chart-funnel-bar ${index === 0 ? 'chart-funnel-bar--primary' : ''}" x="${180 - width / 2}" y="${28 + index * 26}" width="${width}" height="18" rx="9"/><text class="chart-funnel-label" x="180" y="${41 + index * 26}">${100 - index * 17}%</text>`).join('')}`, 'Ranking em etapas com redução progressiva.');
}

function miniBars({ id, label }) {
  const heights = [32,52,44,76,58,92,70,104,84,118,94,126];
  return svgFrame(id, label, `<path class="chart-mini-baseline" d="M20 150H340"/>${heights.map((height, index) => `<rect class="chart-mini-bar ${index >= 9 ? 'chart-mini-bar--primary' : ''}" x="${24 + index * 26}" y="${150-height}" width="14" height="${height}" rx="7"/>`).join('')}`, 'Sequência compacta de barras para tendência de volume.', 'chart-svg--compact');
}

function mixed({ id, label }) {
  const xs = [50,98,146,194,242,290];
  const heights = [48,76,62,96,84,110];
  return svgFrame(id, label, `${grid()}${xs.map((x,index) => `<rect class="chart-bar chart-bar--muted" x="${x}" y="${154-heights[index]}" width="24" height="${heights[index]}" rx="4"/>`).join('')}<path class="chart-line chart-line--primary" d="M62 124 C99 113 112 108 146 99 S208 83 242 72 S290 65 302 51"/>${axis(['T1','T2','T3','T4'])}`, 'Combinação de colunas de volume com linha de desempenho.');
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

function gauge({ id, label, value = 68 }) {
  return `<div class="chart-gauge-wrap"><svg class="chart-gauge" viewBox="0 0 360 180" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${esc(label)}</title><desc id="${id}-desc">Indicador semicircular em ${value}% da escala.</desc><path class="chart-gauge__track" pathLength="100" d="M78 136 A102 102 0 0 1 282 136"/><path class="chart-gauge__value" pathLength="100" stroke-dasharray="${value} ${100-value}" d="M78 136 A102 102 0 0 1 282 136"/></svg><div class="chart-gauge__label"><strong>${value}%</strong><span>da faixa</span></div></div>`;
}

function heatmap({ label }) {
  const values = [1,2,0,1,3,2,1,0,1,2,2,3,1,0,1,3,3,2,1,0,1,0,1,2,3,2,2,1,1,2,1,0,3,2,1,2,3,1,2,0,1,3];
  return `<div class="chart-heatmap" role="img" aria-label="${esc(label)}">${values.map((value,index) => `<i class="level-${value}" title="Período ${index + 1}"></i>`).join('')}</div>`;
}

function contributionCalendar({ label }) {
  const values = Array.from({ length: 84 }, (_, index) => (index * 7 + Math.floor(index / 5) + index % 3) % 4);
  return `<div class="chart-contribution" role="img" aria-label="${esc(label)}">${values.map((value,index) => `<i class="level-${value}" title="Período ${index + 1}"></i>`).join('')}</div>`;
}

function stackedArea({ id, label }) {
  return svgFrame(id, label, `${grid()}<path class="chart-area chart-area--muted" d="M28 128 C70 114 104 125 142 106 S212 111 250 88 S308 94 346 74 L346 154 L28 154 Z"/><path class="chart-area chart-area--secondary" d="M28 142 C67 133 105 141 141 120 S208 128 250 106 S307 109 346 92 L346 154 L28 154 Z"/><path class="chart-area chart-area--primary" d="M28 149 C70 144 103 147 142 135 S210 140 250 124 S309 128 346 112 L346 154 L28 154 Z"/>${axis()}`, 'Áreas empilhadas para intensidade ou composição ao longo do tempo.');
}

const renderers = {
  line,
  spline,
  multiLine,
  area,
  areaLine,
  rangeAreaLine,
  sparkline,
  miniTrend,
  bars,
  roundedBars,
  groupedBars,
  stackedBars,
  horizontalBars,
  roundedHorizontalBars,
  funnelBars,
  miniBars,
  mixed,
  donut,
  radial,
  multiRing,
  pie,
  gauge,
  heatmap,
  contributionCalendar,
  stackedArea,
};

function renderChart(type, props) {
  const renderer = renderers[type];
  if (!renderer) throw new Error(`Chart renderer não encontrado: ${type}`);
  return renderer(props || {});
}

module.exports = { esc, renderChart, renderers };
