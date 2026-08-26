const appChartPreset = {
  key: 'app',
  route: 'app/charts.html',
  title: 'Gráficos no App · CIIMO Design System',
  eyebrow: 'CIIMO / Design System / App',
  heading: 'Gráficos no App.',
  description: 'Visualizações compactas para patrimônio, valorização, pagamentos e oportunidade. O gráfico acelera a leitura do investimento sem transformar a tela em um painel pesado.',
  sections: [
    {
      key: 'evolution',
      number: '01',
      label: 'Patrimônio e evolução',
      title: 'Começar pela mudança no tempo.',
      description: 'Line, area e sparkline respondem quanto o ativo evoluiu e se o movimento é consistente.',
      cards: [
        { id: 'app-value', type: 'area', size: 'hero', eyebrow: 'Valorização', title: 'Valor atual vs. contratado', value: '+18,4%', meta: 'Desde a compra', label: 'Evolução do valor atual', legend: [['primary','Valor atual']] },
        { id: 'app-incc', type: 'multiLine', size: 'wide', eyebrow: 'Benchmark', title: 'Valorização x INCC', value: '+6,2 p.p.', meta: 'Diferença acumulada', label: 'Valorização comparada ao INCC', series: 2, legend: [['primary','Imóvel'],['secondary','INCC']] },
        { id: 'app-trend', type: 'sparkline', size: 'compact', eyebrow: 'Tendência', title: 'Preço/m²', value: 'R$ 12,4 mil', meta: '+3,1% no trimestre', label: 'Tendência do preço por metro quadrado', legend: [['primary','Preço/m²']] },
      ],
    },
    {
      key: 'cashflow',
      number: '02',
      label: 'Pagamentos e fluxo',
      title: 'Separar progresso de composição.',
      description: 'Percentual pago, desembolso mensal e composição do fluxo são perguntas diferentes e usam gráficos diferentes.',
      cards: [
        { id: 'app-paid', type: 'bars', size: 'standard', eyebrow: 'Pagamentos', title: 'Valor pago por mês', value: '42%', meta: 'Do valor contratado', label: 'Valor pago por mês', legend: [['primary','Pago']] },
        { id: 'app-flow', type: 'stackedBars', size: 'wide', eyebrow: 'Fluxo', title: 'Parcelas, reforços e chaves', value: 'R$ 812 mil', meta: 'Fluxo contratado', label: 'Fluxo de pagamentos', legend: [['primary','Parcelas'],['secondary','Reforços'],['gold','Chaves']] },
        { id: 'app-progress', type: 'radial', size: 'compact', eyebrow: 'Contrato', title: 'Progresso financeiro', value: '42%', meta: 'Pago', label: 'Progresso financeiro do contrato', chartProps: { value: 42 }, legend: [['primary','Pago']] },
      ],
    },
    {
      key: 'composition',
      number: '03',
      label: 'Composição',
      title: 'Mostrar participação sem excesso de cor.',
      description: 'Donut, pie e anéis concêntricos só entram quando a relação parte/todo é mais importante do que o valor absoluto.',
      cards: [
        { id: 'app-stage', type: 'donut', size: 'standard', eyebrow: 'Carteira', title: 'Composição por estágio', value: '64%', meta: 'Em construção', label: 'Composição da carteira por estágio', chartProps: { value: 64 }, legend: [['primary','Em construção'],['secondary','Pronto']] },
        { id: 'app-profile', type: 'multiRing', size: 'standard', eyebrow: 'Perfil', title: 'Distribuição da carteira', value: '3 perfis', meta: 'Tipologia, estágio e cidade', label: 'Distribuição da carteira por três dimensões', legend: [['primary','Tipologia'],['secondary','Estágio'],['gold','Cidade']] },
        { id: 'app-purpose', type: 'pie', size: 'standard', eyebrow: 'Uso', title: 'Objetivo dos ativos', value: '4 grupos', meta: 'Renda, revenda, moradia e diversificação', label: 'Objetivo dos ativos da carteira', legend: [['primary','Renda'],['secondary','Revenda'],['gold','Moradia'],['muted','Diversificação']] },
      ],
    },
    {
      key: 'territory',
      number: '04',
      label: 'Território e oportunidade',
      title: 'Ordenar e revelar concentração.',
      description: 'Ranking e heatmap funcionam melhor do que gráficos circulares quando o objetivo é encontrar prioridade territorial.',
      cards: [
        { id: 'app-neighborhoods', type: 'horizontalBars', size: 'wide', eyebrow: 'Território', title: 'Oportunidades por bairro', value: '92', meta: 'Índice relativo', label: 'Oportunidades por bairro', legend: [['primary','Maior oportunidade'],['secondary','Demais bairros']] },
        { id: 'app-heat', type: 'heatmap', size: 'standard', eyebrow: 'Intensidade', title: 'Movimento de mercado', value: '42 períodos', meta: 'Concentração de sinais', label: 'Intensidade de sinais de mercado por período', legend: [['primary','Alta'],['secondary','Média']] },
        { id: 'app-price-compare', type: 'groupedBars', size: 'wide', eyebrow: 'Comparação', title: 'Preço/m² x bairro', value: '+8,2%', meta: 'Acima da referência', label: 'Preço por metro quadrado do ativo comparado ao bairro', legend: [['primary','Ativo'],['muted','Bairro']] },
      ],
    },
  ],
  behavior: {
    title: 'Leitura em poucos gestos.',
    items: [
      ['1 pergunta', 'Cada gráfico responde uma pergunta principal.'],
      ['Até 3 séries', 'Se precisar de mais, filtre ou divida a visualização.'],
      ['Toque ≥ 44px', 'Seleção, tooltip e mudança de período precisam funcionar com o polegar.'],
      ['1 coluna no mobile', 'O gráfico nunca disputa largura com outro card no telefone.'],
    ],
  },
};

const webChartPreset = {
  key: 'web',
  route: 'web/charts.html',
  title: 'Gráficos no Web · CIIMO Design System',
  eyebrow: 'CIIMO / Design System / Web',
  heading: 'Gráficos no Web.',
  description: 'Visualizações amplas para carteira, empreendimentos, território e operação. O Web pode combinar mais contexto na mesma tela sem perder a hierarquia CIIMO.',
  sections: [
    {
      key: 'overview',
      number: '01',
      label: 'Overview executivo',
      title: 'O mosaico começa por uma leitura dominante.',
      description: 'Um gráfico hero estabelece contexto; os cards menores respondem perguntas complementares.',
      cards: [
        { id: 'web-portfolio', type: 'area', size: 'hero', eyebrow: 'Patrimônio', title: 'Evolução da carteira', value: 'R$ 4,02 mi', meta: '+12,8% em 12 meses', label: 'Evolução do patrimônio acompanhado', legend: [['primary','Carteira']] },
        { id: 'web-kpi', type: 'sparkline', size: 'compact', eyebrow: 'Valorização', title: 'Média da carteira', value: '+14,2%', meta: '12 meses', label: 'Tendência da valorização média', legend: [['primary','Valorização']] },
        { id: 'web-city', type: 'donut', size: 'compact', eyebrow: 'Carteira', title: 'Distribuição por cidade', value: '58%', meta: 'Goiânia', label: 'Distribuição da carteira por cidade', chartProps: { value: 58 }, legend: [['primary','Goiânia'],['secondary','Outras']] },
        { id: 'web-progress', type: 'radial', size: 'compact', eyebrow: 'Fluxo', title: 'Carteira quitada', value: '37%', meta: 'Dos contratos', label: 'Percentual de contratos quitados', chartProps: { value: 37 }, legend: [['primary','Quitado']] },
      ],
    },
    {
      key: 'comparison',
      number: '02',
      label: 'Comparação',
      title: 'Usar a mesma escala quando a comparação é a pergunta.',
      description: 'Grouped bars e multi-line colocam as referências lado a lado sem transformar tudo em cor.',
      cards: [
        { id: 'web-enterprises', type: 'groupedBars', size: 'wide', eyebrow: 'Empreendimentos', title: 'Valorização comparada', value: '+18,4%', meta: 'Melhor desempenho', label: 'Valorização por empreendimento', legend: [['primary','Atual'],['muted','Base']] },
        { id: 'web-price', type: 'multiLine', size: 'wide', eyebrow: 'Preço/m²', title: 'Ativo x bairro x cidade', value: 'R$ 12,4 mil', meta: 'Valor do ativo', label: 'Preço por metro quadrado comparado', series: 3, legend: [['primary','Ativo'],['secondary','Bairro'],['gold','Cidade']] },
        { id: 'web-mixed', type: 'mixed', size: 'wide', eyebrow: 'Operação', title: 'Volume x valorização', value: 'R$ 8,6 mi', meta: 'Volume acompanhado', label: 'Volume de carteira comparado à valorização', legend: [['primary','Valorização'],['muted','Volume']] },
      ],
    },
    {
      key: 'flow',
      number: '03',
      label: 'Fluxo e intensidade',
      title: 'Mostrar onde o dinheiro e os sinais se concentram.',
      description: 'Stacked columns, stacked area e heatmap respondem composição e intensidade sem exigir uma tabela para cada leitura.',
      cards: [
        { id: 'web-flow', type: 'stackedBars', size: 'wide', eyebrow: 'Financeiro', title: 'Fluxo contratado por mês', value: 'R$ 3,4 mi', meta: 'Próximos 6 meses', label: 'Fluxo contratado por mês', legend: [['primary','Parcelas'],['secondary','Reforços'],['gold','Chaves']] },
        { id: 'web-intensity', type: 'stackedArea', size: 'hero', eyebrow: 'Mercado', title: 'Intensidade de oportunidades', value: '3 sinais', meta: 'Preço, liquidez e valorização', label: 'Intensidade de oportunidades ao longo do tempo', legend: [['primary','Valorização'],['secondary','Liquidez'],['muted','Preço']] },
        { id: 'web-heat', type: 'heatmap', size: 'standard', eyebrow: 'Agenda financeira', title: 'Concentração de desembolso', value: '42 períodos', meta: 'Carteira consolidada', label: 'Concentração de desembolso por período', legend: [['primary','Alta'],['secondary','Média']] },
      ],
    },
    {
      key: 'composition',
      number: '04',
      label: 'Composição e ranking',
      title: 'Composição explica; ranking prioriza.',
      description: 'Pie, multi-ring e barras horizontais são complementares e não devem responder a mesma pergunta.',
      cards: [
        { id: 'web-purpose', type: 'pie', size: 'standard', eyebrow: 'Carteira', title: 'Objetivo dos ativos', value: '4 grupos', meta: 'Composição consolidada', label: 'Distribuição dos ativos por objetivo', legend: [['primary','Renda'],['secondary','Revenda'],['gold','Moradia'],['muted','Diversificação']] },
        { id: 'web-profile', type: 'multiRing', size: 'standard', eyebrow: 'Perfil', title: 'Tipologia, estágio e praça', value: '3 anéis', meta: 'Leitura simultânea', label: 'Perfil consolidado da carteira', legend: [['primary','Tipologia'],['secondary','Estágio'],['gold','Praça']] },
        { id: 'web-ranking', type: 'horizontalBars', size: 'wide', eyebrow: 'Território', title: 'Ranking de oportunidade', value: '92', meta: 'Maior índice', label: 'Ranking territorial de oportunidades', legend: [['primary','Maior oportunidade'],['secondary','Demais territórios']] },
      ],
    },
  ],
  behavior: {
    title: 'Mais contexto, mesma sobriedade.',
    items: [
      ['12 colunas', 'Hero, wide, standard e compact seguem uma grade previsível.'],
      ['Até 3 séries', 'Comparação adicional vira filtro, tabela ou outro gráfico.'],
      ['Hover + foco', 'Tooltip complementa, mas não pode esconder o único acesso ao valor.'],
      ['1 coluna no mobile', 'O mosaico desmonta sem reduzir gráficos a miniaturas ilegíveis.'],
    ],
  },
};

module.exports = { appChartPreset, webChartPreset };
