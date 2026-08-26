function card(type, data) {
  return { type, ...data };
}

const appExamples = {
  line: card('line', { id:'app-line', eyebrow:'Patrimônio', title:'Evolução do patrimônio', value:'R$ 524 mil', meta:'+18,4% desde a compra', label:'Evolução do patrimônio do ativo', legend:[['primary','Valor atual']] }),
  spline: card('spline', { id:'app-spline', eyebrow:'Preço/m²', title:'Tendência do preço', value:'R$ 12,4 mil', meta:'+3,1% no trimestre', label:'Tendência suavizada do preço por metro quadrado', legend:[['primary','Preço/m²']] }),
  multiLine: card('multiLine', { id:'app-multiline', eyebrow:'Benchmark', title:'Imóvel x INCC x IPCA', value:'+6,2 p.p.', meta:'Acima do INCC', label:'Valorização do imóvel comparada aos índices', series:3, legend:[['primary','Imóvel'],['secondary','INCC'],['gold','IPCA']] }),
  area: card('area', { id:'app-area', eyebrow:'Valorização', title:'Valor atual', value:'+18,4%', meta:'Curva acumulada', label:'Evolução acumulada do valor atual', legend:[['primary','Valor atual']] }),
  areaLine: card('areaLine', { id:'app-area-line', eyebrow:'Aporte', title:'Valor x capital pago', value:'42%', meta:'Do contrato já pago', label:'Valor atual comparado ao capital pago', legend:[['primary','Valor atual'],['secondary','Capital pago']] }),
  rangeAreaLine: card('rangeAreaLine', { id:'app-range', eyebrow:'Mercado', title:'Faixa de preço do bairro', value:'+8,2%', meta:'Ativo acima da mediana', label:'Preço do ativo dentro da faixa observada no bairro', legend:[['primary','Ativo'],['muted','Faixa de mercado']] }),
  sparkline: card('sparkline', { id:'app-spark', eyebrow:'Indicador', title:'Valorização em 30 dias', value:'+1,8%', meta:'Tendência curta', label:'Tendência da valorização nos últimos trinta dias', legend:[['primary','30 dias']] }),
  miniTrend: card('miniTrend', { id:'app-mini-trend', eyebrow:'Liquidez', title:'Interesse recente', value:'74', meta:'Índice relativo', label:'Microtendência de interesse recente', legend:[['primary','Interesse']] }),

  bars: card('bars', { id:'app-bars', eyebrow:'Pagamentos', title:'Valor pago por mês', value:'R$ 18,6 mil', meta:'Média mensal', label:'Valor pago por mês', legend:[['primary','Pago']] }),
  roundedBars: card('roundedBars', { id:'app-rounded-bars', eyebrow:'Desempenho', title:'Valorização por trimestre', value:'+4,8%', meta:'Melhor trimestre', label:'Valorização por trimestre', legend:[['primary','Valorização']] }),
  groupedBars: card('groupedBars', { id:'app-grouped', eyebrow:'Comparação', title:'Ativo x bairro', value:'+8,2%', meta:'Acima da referência', label:'Preço por metro quadrado do ativo comparado ao bairro', legend:[['primary','Ativo'],['muted','Bairro']] }),
  stackedBars: card('stackedBars', { id:'app-stacked-bars', eyebrow:'Fluxo', title:'Parcelas, reforços e chaves', value:'R$ 812 mil', meta:'Fluxo contratado', label:'Composição mensal do fluxo contratado', legend:[['primary','Parcelas'],['secondary','Reforços'],['gold','Chaves']] }),
  horizontalBars: card('horizontalBars', { id:'app-horizontal', eyebrow:'Território', title:'Oportunidades por bairro', value:'92', meta:'Maior índice', label:'Oportunidades por bairro', legend:[['primary','Maior oportunidade'],['secondary','Demais bairros']] }),
  roundedHorizontalBars: card('roundedHorizontalBars', { id:'app-rounded-horizontal', eyebrow:'Ranking', title:'Empreendimentos em destaque', value:'5 ativos', meta:'Ordenados por desempenho', label:'Ranking de empreendimentos por desempenho', legend:[['primary','Líder'],['secondary','Demais']] }),
  funnelBars: card('funnelBars', { id:'app-funnel', eyebrow:'Jornada', title:'Etapas do contrato', value:'68%', meta:'Progresso geral', label:'Redução progressiva entre etapas do contrato', legend:[['primary','Etapa atual']] }),
  miniBars: card('miniBars', { id:'app-mini-bars', eyebrow:'Sinais', title:'Atividade semanal', value:'12 sinais', meta:'Últimas semanas', label:'Distribuição compacta de sinais por semana', legend:[['primary','Mais recente']] }),
  mixed: card('mixed', { id:'app-mixed', eyebrow:'Comparação', title:'Volume x valorização', value:'R$ 524 mil', meta:'+18,4% valorização', label:'Volume financeiro comparado à valorização', legend:[['primary','Valorização'],['muted','Volume']] }),

  donut: card('donut', { id:'app-donut', eyebrow:'Carteira', title:'Composição por estágio', value:'64%', meta:'Em construção', label:'Composição da carteira por estágio', chartProps:{ value:64 }, legend:[['primary','Em construção'],['secondary','Pronto']] }),
  radial: card('radial', { id:'app-radial', eyebrow:'Contrato', title:'Progresso financeiro', value:'42%', meta:'Pago', label:'Percentual pago do contrato', chartProps:{ value:42 }, legend:[['primary','Pago']] }),
  multiRing: card('multiRing', { id:'app-rings', eyebrow:'Perfil', title:'Distribuição da carteira', value:'3 leituras', meta:'Tipologia, estágio e cidade', label:'Distribuição da carteira em três dimensões', legend:[['primary','Tipologia'],['secondary','Estágio'],['gold','Cidade']] }),
  pie: card('pie', { id:'app-pie', eyebrow:'Objetivo', title:'Finalidade dos ativos', value:'4 grupos', meta:'Renda, revenda, moradia e diversificação', label:'Finalidade dos ativos da carteira', legend:[['primary','Renda'],['secondary','Revenda'],['gold','Moradia'],['muted','Diversificação']] }),
  gauge: card('gauge', { id:'app-gauge', eyebrow:'Preço', title:'Posição na faixa de mercado', value:'68%', meta:'Entre mínimo e máximo', label:'Posição do preço do ativo na faixa de mercado', chartProps:{ value:68 }, legend:[['primary','Posição atual']] }),

  heatmap: card('heatmap', { id:'app-heatmap', eyebrow:'Mercado', title:'Movimento por período', value:'42 células', meta:'Concentração de sinais', label:'Intensidade dos sinais de mercado por período', legend:[['primary','Alta'],['secondary','Média']] }),
  contributionCalendar: card('contributionCalendar', { id:'app-calendar', eyebrow:'Acompanhamento', title:'Atividade da carteira', value:'84 períodos', meta:'Recorrência de eventos', label:'Calendário de atividade da carteira', legend:[['primary','Alta atividade'],['secondary','Média']] }),
  stackedArea: card('stackedArea', { id:'app-stacked-area', eyebrow:'Intensidade', title:'Preço, liquidez e valorização', value:'3 sinais', meta:'Evolução combinada', label:'Intensidade combinada dos sinais de mercado', legend:[['primary','Valorização'],['secondary','Liquidez'],['muted','Preço']] }),
};

const webExamples = {
  line: card('line', { id:'web-line', eyebrow:'Patrimônio', title:'Evolução da carteira', value:'R$ 4,02 mi', meta:'+12,8% em 12 meses', label:'Evolução da carteira consolidada', legend:[['primary','Carteira']] }),
  spline: card('spline', { id:'web-spline', eyebrow:'Preço/m²', title:'Curva de mercado', value:'R$ 12,4 mil', meta:'Média consolidada', label:'Tendência suavizada do preço por metro quadrado', legend:[['primary','Preço/m²']] }),
  multiLine: card('multiLine', { id:'web-multiline', eyebrow:'Benchmark', title:'Carteira x INCC x IPCA', value:'+5,7 p.p.', meta:'Acima do INCC', label:'Carteira comparada aos principais índices', series:3, legend:[['primary','Carteira'],['secondary','INCC'],['gold','IPCA']] }),
  area: card('area', { id:'web-area', eyebrow:'Valorização', title:'Patrimônio acompanhado', value:'+14,2%', meta:'12 meses', label:'Evolução acumulada do patrimônio', legend:[['primary','Patrimônio']] }),
  areaLine: card('areaLine', { id:'web-area-line', eyebrow:'Capital', title:'Valor de mercado x pago', value:'R$ 1,8 mi', meta:'Capital já desembolsado', label:'Valor de mercado comparado ao capital desembolsado', legend:[['primary','Mercado'],['secondary','Pago']] }),
  rangeAreaLine: card('rangeAreaLine', { id:'web-range', eyebrow:'Referência', title:'Faixa por território', value:'R$ 11–14 mil', meta:'Preço/m² observado', label:'Carteira posicionada dentro da faixa territorial', legend:[['primary','Carteira'],['muted','Faixa territorial']] }),
  sparkline: card('sparkline', { id:'web-spark', eyebrow:'KPI', title:'Valorização média', value:'+14,2%', meta:'Tendência mensal', label:'Tendência curta da valorização média', legend:[['primary','Média']] }),
  miniTrend: card('miniTrend', { id:'web-mini-trend', eyebrow:'Liquidez', title:'Demanda recente', value:'81', meta:'Índice da carteira', label:'Microtendência da demanda recente', legend:[['primary','Demanda']] }),

  bars: card('bars', { id:'web-bars', eyebrow:'Empreendimentos', title:'Valorização por ativo', value:'+18,4%', meta:'Melhor resultado', label:'Valorização por empreendimento', legend:[['primary','Valorização']] }),
  roundedBars: card('roundedBars', { id:'web-rounded-bars', eyebrow:'Operação', title:'Entradas por mês', value:'R$ 620 mil', meta:'Melhor mês', label:'Entradas financeiras por mês', legend:[['primary','Entradas']] }),
  groupedBars: card('groupedBars', { id:'web-grouped', eyebrow:'Comparação', title:'Ativo x referência', value:'+8,2%', meta:'Diferença média', label:'Ativos comparados à referência territorial', legend:[['primary','Ativo'],['muted','Referência']] }),
  stackedBars: card('stackedBars', { id:'web-stacked-bars', eyebrow:'Fluxo', title:'Fluxo contratado por mês', value:'R$ 3,4 mi', meta:'Próximos 6 meses', label:'Composição do fluxo contratado por mês', legend:[['primary','Parcelas'],['secondary','Reforços'],['gold','Chaves']] }),
  horizontalBars: card('horizontalBars', { id:'web-horizontal', eyebrow:'Território', title:'Ranking por bairro', value:'92', meta:'Maior índice', label:'Ranking territorial de oportunidades', legend:[['primary','Líder'],['secondary','Demais']] }),
  roundedHorizontalBars: card('roundedHorizontalBars', { id:'web-rounded-horizontal', eyebrow:'Ranking', title:'Construtoras por desempenho', value:'5 grupos', meta:'Carteira consolidada', label:'Ranking de construtoras por desempenho', legend:[['primary','Líder'],['secondary','Demais']] }),
  funnelBars: card('funnelBars', { id:'web-funnel', eyebrow:'Pipeline', title:'Carteira por estágio', value:'68%', meta:'Ativos acompanhados', label:'Distribuição progressiva da carteira por estágio', legend:[['primary','Estágio atual']] }),
  miniBars: card('miniBars', { id:'web-mini-bars', eyebrow:'Operação', title:'Eventos recentes', value:'12 períodos', meta:'Atividade consolidada', label:'Distribuição compacta de eventos recentes', legend:[['primary','Mais recente']] }),
  mixed: card('mixed', { id:'web-mixed', eyebrow:'Operação', title:'Volume x valorização', value:'R$ 8,6 mi', meta:'Volume acompanhado', label:'Volume de carteira comparado à valorização', legend:[['primary','Valorização'],['muted','Volume']] }),

  donut: card('donut', { id:'web-donut', eyebrow:'Carteira', title:'Distribuição por cidade', value:'58%', meta:'Goiânia', label:'Distribuição da carteira por cidade', chartProps:{ value:58 }, legend:[['primary','Goiânia'],['secondary','Outras']] }),
  radial: card('radial', { id:'web-radial', eyebrow:'Contratos', title:'Carteira quitada', value:'37%', meta:'Dos contratos', label:'Percentual de contratos quitados', chartProps:{ value:37 }, legend:[['primary','Quitado']] }),
  multiRing: card('multiRing', { id:'web-rings', eyebrow:'Perfil', title:'Tipologia, estágio e praça', value:'3 anéis', meta:'Leitura simultânea', label:'Perfil consolidado da carteira', legend:[['primary','Tipologia'],['secondary','Estágio'],['gold','Praça']] }),
  pie: card('pie', { id:'web-pie', eyebrow:'Carteira', title:'Objetivo dos ativos', value:'4 grupos', meta:'Composição consolidada', label:'Distribuição dos ativos por objetivo', legend:[['primary','Renda'],['secondary','Revenda'],['gold','Moradia'],['muted','Diversificação']] }),
  gauge: card('gauge', { id:'web-gauge', eyebrow:'Mercado', title:'Posição média de preço', value:'62%', meta:'Dentro da faixa observada', label:'Posição média de preço da carteira', chartProps:{ value:62 }, legend:[['primary','Posição média']] }),

  heatmap: card('heatmap', { id:'web-heatmap', eyebrow:'Agenda', title:'Concentração de desembolso', value:'42 células', meta:'Carteira consolidada', label:'Concentração de desembolso por período', legend:[['primary','Alta'],['secondary','Média']] }),
  contributionCalendar: card('contributionCalendar', { id:'web-calendar', eyebrow:'Operação', title:'Atividade no ano', value:'84 períodos', meta:'Eventos da carteira', label:'Calendário de atividade operacional', legend:[['primary','Alta atividade'],['secondary','Média']] }),
  stackedArea: card('stackedArea', { id:'web-stacked-area', eyebrow:'Mercado', title:'Intensidade de oportunidades', value:'3 sinais', meta:'Preço, liquidez e valorização', label:'Intensidade de oportunidades ao longo do tempo', legend:[['primary','Valorização'],['secondary','Liquidez'],['muted','Preço']] }),
};

const appChartPreset = {
  key: 'app',
  route: 'app/charts.html',
  title: 'Gráficos no App · CIIMO Design System',
  eyebrow: 'CIIMO / Design System / App',
  heading: 'Gráficos no App.',
  description: 'Os 25 padrões do catálogo em contexto de patrimônio, valorização, pagamentos e oportunidade. Todos cabem em uma célula do mesmo grid responsivo.',
  examples: appExamples,
  behavior: {
    title: 'Mesmo componente, quatro densidades de grade.',
    items: [
      ['4 colunas', 'Visão ampla com uma célula por gráfico.'],
      ['3 colunas', 'Redução intermediária sem mudar o renderer.'],
      ['2 colunas', 'Tablet e áreas menores preservam leitura.'],
      ['1 coluna', 'Mobile usa a largura inteira e mantém toque ≥ 44px.'],
    ],
  },
};

const webChartPreset = {
  key: 'web',
  route: 'web/charts.html',
  title: 'Gráficos no Web · CIIMO Design System',
  eyebrow: 'CIIMO / Design System / Web',
  heading: 'Gráficos no Web.',
  description: 'Os mesmos 25 padrões aplicados à carteira consolidada, empreendimentos, território e operação. O renderer não depende de card hero ou wide para funcionar.',
  examples: webExamples,
  behavior: {
    title: 'Grid previsível em qualquer largura.',
    items: [
      ['4 colunas', 'Desktop amplo exibe quatro gráficos por linha.'],
      ['3 colunas', 'Desktop menor reorganiza sem spans especiais.'],
      ['2 colunas', 'Tablet e janelas menores mantêm proporção.'],
      ['1 coluna', 'Mobile desmonta o grid sem criar scroll horizontal.'],
    ],
  },
};

module.exports = { appChartPreset, webChartPreset };
