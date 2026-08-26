function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function legend(items) {
  return `<div class="chart-legend">${items.map(([className, label]) => `<span><i class="chart-dot ${className}"></i>${esc(label)}</span>`).join('')}</div>`;
}

function lineChart({ id, label, secondary = false, secondaryTone = 'secondary', tertiary = false, area = false }) {
  return `<svg class="chart-svg" viewBox="0 0 360 180" role="img" aria-labelledby="${id}-title ${id}-desc">
    <title id="${id}-title">${esc(label)}</title>
    <desc id="${id}-desc">Série temporal demonstrativa para documentação do padrão de gráficos CIIMO.</desc>
    <g class="chart-grid-lines"><path d="M32 28H344M32 70H344M32 112H344M32 154H344"/></g>
    ${area ? '<path class="chart-area-fill" d="M32 144 C66 140 76 118 108 124 S154 96 186 106 S229 72 260 83 S309 50 344 56 L344 154 L32 154 Z"/>' : ''}
    <path class="chart-line chart-line--primary" d="M32 144 C66 140 76 118 108 124 S154 96 186 106 S229 72 260 83 S309 50 344 56"/>
    ${secondary ? `<path class="chart-line chart-line--${secondaryTone}" d="M32 132 C62 126 84 132 110 112 S153 118 184 92 S226 104 257 77 S306 88 344 66"/>` : ''}
    ${tertiary ? '<path class="chart-line chart-line--gold" d="M32 124 C70 118 85 105 116 110 S156 86 190 95 S233 68 264 72 S310 61 344 48"/>' : ''}
    <g class="chart-axis-labels"><text x="32" y="174">Jan</text><text x="130" y="174">Abr</text><text x="230" y="174">Jul</text><text x="326" y="174">Out</text></g>
  </svg>`;
}

function barChart({ id, label, grouped = false }) {
  const xs = [42, 88, 134, 180, 226, 272, 318];
  const heights = [58, 84, 70, 104, 92, 122, 110];
  return `<svg class="chart-svg" viewBox="0 0 360 180" role="img" aria-labelledby="${id}-title ${id}-desc">
    <title id="${id}-title">${esc(label)}</title>
    <desc id="${id}-desc">Barras demonstrativas para comparação de valores.</desc>
    <g class="chart-grid-lines"><path d="M28 30H346M28 74H346M28 118H346M28 154H346"/></g>
    ${xs.map((x, i) => grouped
      ? `<rect class="chart-bar chart-bar--muted" x="${x - 10}" y="${154 - heights[i] * .72}" width="14" height="${heights[i] * .72}" rx="4"/><rect class="chart-bar chart-bar--primary" x="${x + 7}" y="${154 - heights[i]}" width="14" height="${heights[i]}" rx="4"/>`
      : `<rect class="chart-bar chart-bar--primary" x="${x}" y="${154 - heights[i]}" width="22" height="${heights[i]}" rx="5"/>`).join('')}
    <g class="chart-axis-labels"><text x="38" y="174">Jan</text><text x="130" y="174">Mar</text><text x="222" y="174">Mai</text><text x="312" y="174">Jul</text></g>
  </svg>`;
}

function donutChart({ id, label, value = 64 }) {
  const rest = 100 - value;
  return `<div class="chart-donut-wrap"><svg class="chart-donut" viewBox="0 0 160 160" role="img" aria-labelledby="${id}-title ${id}-desc">
    <title id="${id}-title">${esc(label)}</title>
    <desc id="${id}-desc">Gráfico de composição com ${value}% na categoria principal.</desc>
    <circle class="chart-donut__track" cx="80" cy="80" r="56"/>
    <circle class="chart-donut__segment chart-donut__segment--primary" cx="80" cy="80" r="56" pathLength="100" stroke-dasharray="${value} ${rest}" stroke-dashoffset="25"/>
    <circle class="chart-donut__segment chart-donut__segment--secondary" cx="80" cy="80" r="56" pathLength="100" stroke-dasharray="18 82" stroke-dashoffset="${25 - value}"/>
  </svg><div class="chart-donut-value"><strong>${value}%</strong><span>principal</span></div></div>`;
}

function horizontalBars({ label }) {
  const items = [
    ['Marista', 92], ['Bueno', 78], ['Jardim Goiás', 66], ['Setor Oeste', 54], ['Alto da Glória', 43],
  ];
  return `<div class="chart-horizontal" role="img" aria-label="${esc(label)}">${items.map(([name, value], index) => `<div><span>${esc(name)}</span><i><b style="width:${value}%" class="${index === 0 ? 'is-primary' : ''}"></b></i><strong>${value}</strong></div>`).join('')}</div>`;
}

function stackedBars({ id, label }) {
  return `<svg class="chart-svg" viewBox="0 0 360 180" role="img" aria-labelledby="${id}-title ${id}-desc">
    <title id="${id}-title">${esc(label)}</title><desc id="${id}-desc">Fluxo mensal composto por parcelas, reforços e chaves.</desc>
    <g class="chart-grid-lines"><path d="M28 30H346M28 74H346M28 118H346M28 154H346"/></g>
    ${[48,96,144,192,240,288].map((x,i)=>{
      const a=[34,48,40,54,44,58][i], b=[22,18,30,26,34,20][i], c=[10,18,12,22,16,28][i];
      return `<rect class="chart-bar chart-bar--primary" x="${x}" y="${154-a}" width="26" height="${a}" rx="4"/><rect class="chart-bar chart-bar--secondary" x="${x}" y="${154-a-b}" width="26" height="${b}" rx="4"/><rect class="chart-bar chart-bar--gold" x="${x}" y="${154-a-b-c}" width="26" height="${c}" rx="4"/>`;
    }).join('')}
    <g class="chart-axis-labels"><text x="47" y="174">Jan</text><text x="143" y="174">Mar</text><text x="239" y="174">Mai</text><text x="287" y="174">Jun</text></g>
  </svg>`;
}

function heatmap({ label }) {
  const values = [1,2,0,1,3,2,1, 0,1,2,2,3,1,0, 1,3,3,2,1,0,1, 0,1,2,3,2,2,1, 1,2,1,0,3,2,1];
  return `<div class="chart-heatmap" role="img" aria-label="${esc(label)}">${values.map((value, i) => `<i class="level-${value}" title="Período ${i + 1}"></i>`).join('')}</div>`;
}

function chartCard({ eyebrow, title, value, meta, className = '', chart, legendHtml = '' }) {
  return `<article class="chart-card ${className}">
    <header class="chart-card__head"><div><span class="chart-card__eyebrow">${esc(eyebrow)}</span><h3>${esc(title)}</h3></div>${value ? `<strong class="chart-card__value">${esc(value)}</strong>` : ''}</header>
    ${meta ? `<p class="chart-card__meta">${esc(meta)}</p>` : ''}
    <div class="chart-card__plot">${chart}</div>
    ${legendHtml}
  </article>`;
}

function rules(platform) {
  const mobile = platform === 'App';
  return `<div class="chart-rules">
    <article><strong>1 pergunta</strong><span>Cada gráfico responde uma pergunta principal.</span></article>
    <article><strong>Até 3 séries</strong><span>Se precisar de mais, filtre, compare ou divida a visualização.</span></article>
    <article><strong>${mobile ? 'Toque ≥ 44px' : 'Hover + foco'}</strong><span>${mobile ? 'Tooltip e seleção precisam funcionar com o polegar.' : 'Tooltip nunca pode ser a única forma de acessar o valor.'}</span></article>
    <article><strong>Cor semântica</strong><span>Lime destaca a série principal; azul e dourado entram apenas como comparação.</span></article>
  </div>`;
}

function appChartsPage() {
  return `<main class="page charts-page charts-page--app">
    <header class="page-head"><div><span class="eyebrow">CIIMO / Design System / App</span><h1>Gráficos no App.</h1><p>Visualizações compactas para patrimônio, valorização, fluxo e comparação. O gráfico deve acelerar a leitura do investimento sem transformar a tela em um painel pesado.</p></div><div class="page-index">01 — Galeria<br>02 — Regras<br>03 — Mobile</div></header>

    <section class="section">
      <div class="section-head"><div><span class="section-no">01 / Galeria</span><h2>Carteira viva em poucos gestos.</h2></div><p>As referências enviadas orientam a variedade de formatos; a paleta e a densidade permanecem CIIMO.</p></div>
      <div class="chart-board chart-board--app">
        ${chartCard({eyebrow:'Valorização', title:'Valor atual vs. contratado', value:'+18,4%', meta:'Desde a compra', className:'chart-card--wide', chart:lineChart({id:'app-value',label:'Valor atual versus valor contratado',secondary:true,area:true}), legendHtml:legend([['chart-dot--primary','Valor atual'],['chart-dot--secondary','Contratado']])})}
        ${chartCard({eyebrow:'Pagamentos', title:'Valor pago por mês', value:'42%', meta:'Do valor contratado', chart:barChart({id:'app-paid',label:'Valor pago por mês'}), legendHtml:legend([['chart-dot--primary','Pago']])})}
        ${chartCard({eyebrow:'Carteira', title:'Composição por estágio', value:'64%', meta:'Em construção', className:'chart-card--compact', chart:donutChart({id:'app-stage',label:'Composição da carteira por estágio',value:64}), legendHtml:legend([['chart-dot--primary','Em construção'],['chart-dot--secondary','Pronto']])})}
        ${chartCard({eyebrow:'Benchmark', title:'Valorização x INCC', value:'+6,2 p.p.', meta:'Diferença acumulada', className:'chart-card--wide', chart:lineChart({id:'app-incc',label:'Valorização comparada ao INCC',secondary:true,secondaryTone:'gold'}), legendHtml:legend([['chart-dot--primary','Imóvel'],['chart-dot--gold','INCC']])})}
        ${chartCard({eyebrow:'Fluxo', title:'Parcelas, reforços e chaves', value:'R$ 812 mil', meta:'Fluxo contratado', chart:stackedBars({id:'app-flow',label:'Fluxo de pagamentos'}), legendHtml:legend([['chart-dot--primary','Parcelas'],['chart-dot--secondary','Reforços'],['chart-dot--gold','Chaves']])})}
        ${chartCard({eyebrow:'Território', title:'Oportunidades por bairro', value:'92', meta:'Índice relativo', chart:horizontalBars({label:'Oportunidades por bairro'})})}
      </div>
    </section>

    <section class="section">
      <div class="section-head"><div><span class="section-no">02 / Regras</span><h2>Menos séries, mais leitura.</h2></div><p>O App prioriza leitura rápida e comparação direta. Detalhes adicionais entram por interação, não por excesso de elementos simultâneos.</p></div>
      ${rules('App')}
    </section>

    <section class="section">
      <div class="section-head"><div><span class="section-no">03 / Mobile</span><h2>O gráfico precisa caber na decisão.</h2></div><p>Cards ficam em uma coluna. Gráficos temporais preservam área mínima de leitura; quando houver muitos períodos, o próprio plot pode rolar horizontalmente sem estourar a página.</p></div>
      <div class="chart-mobile-spec"><div><small>Largura</small><strong>100%</strong><span>1 card por linha</span></div><div><small>Plot</small><strong>220–280px</strong><span>altura útil</span></div><div><small>Interação</small><strong>Tap</strong><span>seleção e tooltip</span></div><div><small>Legenda</small><strong>2–3 séries</strong><span>sempre visível</span></div></div>
    </section>
  </main>`;
}

function webChartsPage() {
  return `<main class="page charts-page charts-page--web">
    <header class="page-head"><div><span class="eyebrow">CIIMO / Design System / Web</span><h1>Gráficos no Web.</h1><p>Visualizações mais amplas para comparação de carteira, empreendimentos e território. O Web pode combinar mais contexto na mesma tela, mantendo a mesma hierarquia visual do CIIMO.</p></div><div class="page-index">01 — Dashboard<br>02 — Regras<br>03 — Responsividade</div></header>

    <section class="section">
      <div class="section-head"><div><span class="section-no">01 / Dashboard</span><h2>Comparar sem poluir.</h2></div><p>A composição em mosaico vem das referências, mas o conteúdo é imobiliário e a paleta é controlada.</p></div>
      <div class="chart-board chart-board--web">
        ${chartCard({eyebrow:'Patrimônio', title:'Evolução da carteira', value:'R$ 4,02 mi', meta:'+12,8% em 12 meses', className:'chart-card--hero', chart:lineChart({id:'web-portfolio',label:'Evolução do patrimônio acompanhado',area:true}), legendHtml:legend([['chart-dot--primary','Carteira']])})}
        ${chartCard({eyebrow:'Empreendimentos', title:'Valorização comparada', value:'+18,4%', meta:'Melhor desempenho', chart:barChart({id:'web-enterprises',label:'Valorização por empreendimento',grouped:true}), legendHtml:legend([['chart-dot--primary','Atual'],['chart-dot--muted','Base']])})}
        ${chartCard({eyebrow:'Carteira', title:'Distribuição por cidade', value:'58%', meta:'Goiânia', className:'chart-card--compact', chart:donutChart({id:'web-city',label:'Distribuição da carteira por cidade',value:58}), legendHtml:legend([['chart-dot--primary','Goiânia'],['chart-dot--secondary','Outras']])})}
        ${chartCard({eyebrow:'Preço / m²', title:'Imóvel x bairro x cidade', value:'R$ 12,4 mil', meta:'Preço/m² do ativo', className:'chart-card--wide', chart:lineChart({id:'web-sqm',label:'Preço por metro quadrado comparado',secondary:true,tertiary:true}), legendHtml:legend([['chart-dot--primary','Ativo'],['chart-dot--secondary','Bairro'],['chart-dot--gold','Cidade']])})}
        ${chartCard({eyebrow:'Fluxo', title:'Ritmo de pagamentos', value:'R$ 812 mil', meta:'Contratado até chaves', chart:stackedBars({id:'web-flow',label:'Ritmo de pagamentos'}), legendHtml:legend([['chart-dot--primary','Mensal'],['chart-dot--secondary','Reforço'],['chart-dot--gold','Chaves']])})}
        ${chartCard({eyebrow:'Território', title:'Ranking de bairros', value:'92', meta:'Maior índice', chart:horizontalBars({label:'Ranking de bairros'})})}
        ${chartCard({eyebrow:'Calendário', title:'Concentração do fluxo', value:'35 períodos', meta:'Parcelas e reforços', className:'chart-card--wide', chart:heatmap({label:'Mapa de concentração do fluxo de pagamentos'}), legendHtml:legend([['chart-dot--muted','Baixa'],['chart-dot--secondary','Média'],['chart-dot--primary','Alta']])})}
      </div>
    </section>

    <section class="section">
      <div class="section-head"><div><span class="section-no">02 / Regras</span><h2>Dashboard não é coleção de gráficos.</h2></div><p>Organize por pergunta de negócio: patrimônio, evolução, comparação, composição, fluxo e território. Se duas visualizações respondem a mesma pergunta, mantenha apenas a mais clara.</p></div>
      ${rules('Web')}
    </section>

    <section class="section">
      <div class="section-head"><div><span class="section-no">03 / Responsividade</span><h2>O mosaico se desmonta com ordem.</h2></div><p>Em larguras menores, cards largos deixam de ocupar múltiplas colunas antes de reduzir tipografia ou comprimir o plot. Tabela e séries extensas podem rolar dentro do card.</p></div>
      <div class="chart-mobile-spec"><div><small>Desktop</small><strong>2–3 tracks</strong><span>conforme conteúdo</span></div><div><small>Tablet</small><strong>2 tracks</strong><span>hero ocupa largura</span></div><div><small>Mobile</small><strong>1 track</strong><span>sem overflow da página</span></div><div><small>Tooltip</small><strong>Hover + foco</strong><span>valor também acessível</span></div></div>
    </section>
  </main>`;
}

const chartPages = {
  'app/charts.html': { title: 'Gráficos · App · CIIMO Design System', html: appChartsPage() },
  'web/charts.html': { title: 'Gráficos · Web · CIIMO Design System', html: webChartsPage() },
};

module.exports = { chartPages };
