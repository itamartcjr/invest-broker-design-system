function assetPerformanceHeaderPage({ shellContent, section }) {
  const preview = `<div class="asset-performance-preview">
    <section class="asset-performance-preview__summary">
      <header>
        <span class="eyebrow">Resumo do ativo</span>
        <h3>Performance patrimonial</h3>
        <p>Diferença entre o valor atual do imóvel e o custo total projetado da operação.</p>
      </header>

      <div class="asset-performance-preview__group">
        <small class="asset-performance-preview__group-label">Pago até o momento</small>
        <div class="asset-performance-preview__metrics asset-performance-preview__metrics--4">
          <article class="asset-performance-preview__metric is-featured"><small>Base quitada</small><strong>R$ 272.500,00</strong><span>Sem INCC, taxas ou financiamento</span></article>
          <article class="asset-performance-preview__metric"><small>Percentual quitado</small><strong>49,65%</strong></article>
          <article class="asset-performance-preview__metric"><small>Pago ajustado</small><strong>R$ 402.800,00</strong><span>Com reajustes aplicados, sem financiamento</span></article>
          <article class="asset-performance-preview__metric"><small>Equivalente construtora</small><strong>R$ 485.750,59</strong><span>49,65% do preço atual da construtora</span></article>
        </div>
      </div>

      <div class="asset-performance-preview__group">
        <small class="asset-performance-preview__group-label">Preços totais</small>
        <div class="asset-performance-preview__metrics asset-performance-preview__metrics--3">
          <article class="asset-performance-preview__metric"><small>Preço contratado</small><strong>R$ 681.000,00</strong></article>
          <article class="asset-performance-preview__metric"><small>Custo total projetado</small><strong>R$ 811.300,00</strong></article>
          <article class="asset-performance-preview__metric"><small>Preço atual construtora</small><strong>R$ 978.375,00</strong></article>
        </div>
      </div>

      <div class="asset-performance-preview__group">
        <small class="asset-performance-preview__group-label">Metros quadrados</small>
        <div class="asset-performance-preview__metrics asset-performance-preview__metrics--2">
          <article class="asset-performance-preview__metric"><small>m² na compra</small><strong>R$ 8.700,65</strong></article>
          <article class="asset-performance-preview__metric"><small>m² atual</small><strong>R$ 12.500,00</strong></article>
        </div>
      </div>
    </section>

    <aside class="asset-performance-preview__side">
      <article class="asset-performance-preview__valuation">
        <h3>Gyro 02 - 2505 A</h3>
        <div>
          <small>Valorização</small>
          <strong>R$ 167.075,00</strong>
          <span>20,59%</span>
        </div>
        <footer><p>25/10/2023 até 31/05/2026</p><p>INCC acumulado 14,77</p></footer>
      </article>
      <article class="asset-performance-preview__paid">
        <strong>R$ 402.800,00</strong>
        <span>valor pago até agora com os ajustes já aplicados no cálculo</span>
      </article>
    </aside>
  </div>`;

  const html = shellContent({
    eyebrow: 'CIIMO / patterns / asset performance header',
    title: 'Resumo patrimonial antes do detalhe operacional.',
    description: 'Padrão usado no detalhe de compra/venda para concentrar posição financeira, valorização e progresso de pagamento em uma leitura executiva única.',
    index: ['01 — Anatomia', '02 — Significado', '03 — Responsividade', '04 — Uso'],
    sections: [
      section('01', 'Anatomia', 'Resumo amplo + pilha de destaque', 'No desktop, o bloco principal ocupa aproximadamente dois terços da largura e a coluna lateral concentra valorização e pago ajustado.', preview),
      section('02', 'Significado', 'Cada número tem uma função específica', 'Base quitada mostra o que foi pago sem correções. Percentual quitado mostra progresso. Pago ajustado incorpora reajustes. Equivalente construtora aplica o percentual quitado ao preço atual. A valorização compara preço atual com custo total projetado.', `<div class="grid grid-3"><div class="metric"><small>Base</small><strong>O que já foi quitado</strong><span>sem INCC, taxas ou financiamento</span></div><div class="metric"><small>Equivalente</small><strong>Progresso no preço atual</strong><span>percentual quitado × preço atual construtora</span></div><div class="metric"><small>Valorização</small><strong>Preço atual − custo projetado</strong><span>valor e percentual no card de destaque</span></div></div>`),
      section('03', 'Responsividade', 'Empilhar sem perder hierarquia', 'Abaixo do breakpoint do componente, a coluna lateral passa para baixo do resumo. Dentro do resumo, 4 → 2 → 1 métricas conforme a largura disponível. O card azul permanece antes do card de pago ajustado.', `<div class="responsive-triptych"><article><small>Desktop</small><strong>≈ 2/3 + 1/3</strong><span>summary + side stack</span></article><article><small>Tablet</small><strong>1 coluna</strong><span>summary primeiro, destaques depois</span></article><article><small>Mobile</small><strong>Métricas empilhadas</strong><span>sem reduzir texto até ficar ilegível</span></article></div>`),
      section('04', 'Uso', 'Usar somente quando há posição financeira do ativo', 'Este padrão pertence a detalhe de compra/venda ou posição individual. Não usar em cards de catálogo, dashboard geral ou tela de produto sem vínculo financeiro.', `<div class="grid grid-2"><article class="brand-do-card"><small>Usar</small><strong>Detalhe do ativo comprado</strong><p>Há custo projetado, pago, preço atual e valorização calculável.</p></article><article class="brand-dont-card"><small>Evitar</small><strong>Catálogo de imóveis</strong><p>Sem compra vinculada, o contexto financeiro do padrão não existe.</p></article></div>`),
    ],
  });

  return {
    route: 'patterns/asset-performance-header.html',
    page: { title: 'Asset Performance Header · CIIMO Design System', html },
  };
}

module.exports = { assetPerformanceHeaderPage };
