const chartCatalog = {
  line: {
    label: 'Line',
    family: 'Série temporal',
    use: 'Evolução de uma variável ao longo do tempo.',
    maxSeries: 3,
  },
  area: {
    label: 'Area line',
    family: 'Série temporal',
    use: 'Evolução quando o volume ou a sensação de crescimento também importa.',
    maxSeries: 1,
  },
  multiLine: {
    label: 'Multi-line',
    family: 'Comparação',
    use: 'Comparar até três séries na mesma escala temporal.',
    maxSeries: 3,
  },
  sparkline: {
    label: 'Sparkline',
    family: 'Indicador',
    use: 'Mostrar tendência como apoio a um KPI, sem transformar o card em gráfico completo.',
    maxSeries: 1,
  },
  bars: {
    label: 'Vertical bar',
    family: 'Comparação',
    use: 'Comparar valores discretos entre períodos ou categorias.',
    maxSeries: 1,
  },
  groupedBars: {
    label: 'Grouped bar',
    family: 'Comparação',
    use: 'Comparar duas bases lado a lado por categoria.',
    maxSeries: 2,
  },
  stackedBars: {
    label: 'Stacked column',
    family: 'Composição',
    use: 'Mostrar total e composição por período quando as partes fazem sentido juntas.',
    maxSeries: 3,
  },
  stackedArea: {
    label: 'Stacked area',
    family: 'Intensidade',
    use: 'Mostrar como uma composição muda ao longo do tempo sem exigir leitura pontual de cada valor.',
    maxSeries: 3,
  },
  horizontalBars: {
    label: 'Horizontal ranking',
    family: 'Ranking',
    use: 'Ordenar categorias com nomes longos e facilitar comparação rápida.',
    maxSeries: 1,
  },
  donut: {
    label: 'Donut',
    family: 'Composição',
    use: 'Destacar uma participação principal dentro de um total pequeno.',
    maxSeries: 3,
  },
  radial: {
    label: 'Radial progress',
    family: 'Progresso',
    use: 'Mostrar um percentual único de conclusão ou participação.',
    maxSeries: 1,
  },
  multiRing: {
    label: 'Multi-ring',
    family: 'Composição',
    use: 'Comparar poucos percentuais relacionados quando compartilhar o mesmo centro ajuda a leitura.',
    maxSeries: 3,
  },
  pie: {
    label: 'Pie',
    family: 'Composição',
    use: 'Distribuir um total em poucas categorias claramente diferentes.',
    maxSeries: 4,
  },
  heatmap: {
    label: 'Heatmap',
    family: 'Intensidade',
    use: 'Revelar concentração e recorrência em muitos períodos compactos.',
    maxSeries: 1,
  },
  mixed: {
    label: 'Bar + line',
    family: 'Comparação',
    use: 'Cruzar volume e desempenho apenas quando as escalas e unidades estiverem explícitas.',
    maxSeries: 2,
  },
};

const chartFamilies = [
  'Série temporal',
  'Indicador',
  'Comparação',
  'Composição',
  'Ranking',
  'Progresso',
  'Intensidade',
];

module.exports = { chartCatalog, chartFamilies };
