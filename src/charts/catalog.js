const chartCatalog = {
  line: { label: 'Line', family: 'Séries temporais', use: 'Evolução de uma variável ao longo do tempo.', maxSeries: 1 },
  spline: { label: 'Spline line', family: 'Séries temporais', use: 'Tendência contínua quando a leitura da trajetória importa mais do que pontos isolados.', maxSeries: 1 },
  multiLine: { label: 'Multi-line', family: 'Séries temporais', use: 'Comparar até três séries na mesma escala temporal.', maxSeries: 3 },
  area: { label: 'Area', family: 'Séries temporais', use: 'Evolução com ênfase visual no volume acumulado.', maxSeries: 1 },
  areaLine: { label: 'Area + line', family: 'Séries temporais', use: 'Destacar uma série principal e sua tendência na mesma leitura.', maxSeries: 2 },
  rangeAreaLine: { label: 'Range area + line', family: 'Séries temporais', use: 'Mostrar faixa de referência, intervalo ou expectativa junto da série observada.', maxSeries: 2 },
  sparkline: { label: 'Sparkline', family: 'Séries temporais', use: 'Tendência curta como apoio a um KPI.', maxSeries: 1 },
  miniTrend: { label: 'Mini trend', family: 'Séries temporais', use: 'Microtendência para cards densos sem eixos ou legenda complexa.', maxSeries: 1 },

  bars: { label: 'Vertical bar', family: 'Barras e comparação', use: 'Comparar valores discretos entre períodos ou categorias.', maxSeries: 1 },
  roundedBars: { label: 'Rounded vertical bar', family: 'Barras e comparação', use: 'Comparação discreta com desenho mais compacto e amigável.', maxSeries: 1 },
  groupedBars: { label: 'Grouped bar', family: 'Barras e comparação', use: 'Comparar duas bases lado a lado por categoria.', maxSeries: 2 },
  stackedBars: { label: 'Stacked column', family: 'Barras e comparação', use: 'Mostrar total e composição por período.', maxSeries: 3 },
  horizontalBars: { label: 'Horizontal bar', family: 'Barras e comparação', use: 'Comparar categorias com rótulos mais longos.', maxSeries: 1 },
  roundedHorizontalBars: { label: 'Rounded horizontal ranking', family: 'Barras e comparação', use: 'Ordenar categorias e destacar prioridade de forma compacta.', maxSeries: 1 },
  funnelBars: { label: 'Funnel ranking', family: 'Barras e comparação', use: 'Mostrar queda progressiva ou ranking em etapas ordenadas.', maxSeries: 1 },
  miniBars: { label: 'Mixed mini bars', family: 'Barras e comparação', use: 'Distribuição curta de volume em um card compacto.', maxSeries: 1 },
  mixed: { label: 'Bar + line', family: 'Barras e comparação', use: 'Cruzar volume e desempenho com escalas explicitadas.', maxSeries: 2 },

  donut: { label: 'Donut', family: 'Composição e progresso', use: 'Destacar participação principal dentro de um total pequeno.', maxSeries: 3 },
  radial: { label: 'Radial progress', family: 'Composição e progresso', use: 'Mostrar um percentual único de conclusão ou participação.', maxSeries: 1 },
  multiRing: { label: 'Multi-ring radial', family: 'Composição e progresso', use: 'Comparar poucos percentuais relacionados em anéis concêntricos.', maxSeries: 3 },
  pie: { label: 'Pie', family: 'Composição e progresso', use: 'Distribuir um total em poucas categorias claramente diferentes.', maxSeries: 4 },
  gauge: { label: 'Gauge / semi-donut', family: 'Composição e progresso', use: 'Mostrar posição atual dentro de uma escala limitada.', maxSeries: 1 },

  heatmap: { label: 'Heatmap matrix', family: 'Distribuição e intensidade', use: 'Revelar concentração entre períodos e categorias.', maxSeries: 1 },
  contributionCalendar: { label: 'Contribution calendar', family: 'Distribuição e intensidade', use: 'Mostrar frequência e intensidade ao longo de muitos dias ou períodos.', maxSeries: 1 },
  stackedArea: { label: 'Stacked area / intensity', family: 'Distribuição e intensidade', use: 'Mostrar como uma composição ou intensidade muda ao longo do tempo.', maxSeries: 3 },
};

module.exports = { chartCatalog };
