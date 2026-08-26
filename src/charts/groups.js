const chartGroups = [
  {
    key: 'time-series',
    number: '01',
    label: 'Séries temporais',
    title: 'Evolução, tendência e intervalo.',
    description: 'Oito padrões para acompanhar mudança no tempo sem misturar perguntas diferentes no mesmo gráfico.',
    types: ['line', 'spline', 'multiLine', 'area', 'areaLine', 'rangeAreaLine', 'sparkline', 'miniTrend'],
  },
  {
    key: 'bars-comparison',
    number: '02',
    label: 'Barras e comparação',
    title: 'Comparar, ordenar e cruzar grandezas.',
    description: 'Nove padrões para volume, ranking, composição por categoria e comparação entre referências.',
    types: ['bars', 'roundedBars', 'groupedBars', 'stackedBars', 'horizontalBars', 'roundedHorizontalBars', 'funnelBars', 'miniBars', 'mixed'],
  },
  {
    key: 'composition-progress',
    number: '03',
    label: 'Composição e progresso',
    title: 'Parte, todo e posição na jornada.',
    description: 'Cinco padrões para participação, distribuição e progresso sem depender de excesso de cores.',
    types: ['donut', 'radial', 'multiRing', 'pie', 'gauge'],
  },
  {
    key: 'distribution-intensity',
    number: '04',
    label: 'Distribuição e intensidade',
    title: 'Concentração, recorrência e intensidade.',
    description: 'Três padrões para enxergar onde sinais, eventos ou valores se concentram.',
    types: ['heatmap', 'contributionCalendar', 'stackedArea'],
  },
];

const chartTypeOrder = chartGroups.flatMap((group) => group.types);

module.exports = { chartGroups, chartTypeOrder };
