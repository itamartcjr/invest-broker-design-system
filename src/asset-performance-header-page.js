function assetPerformanceHeaderPage({ shellContent, section }) {
  const previewStyles = `<style>
    .asset-performance-preview{display:grid;grid-template-columns:minmax(0,1.92fr) minmax(330px,1fr);gap:16px;align-items:stretch}
    .asset-performance-preview__summary{display:grid;gap:20px;padding:20px;border:1px solid rgba(255,255,255,.1);border-radius:24px;background:radial-gradient(circle at 100% 0%,rgba(111,198,255,.12),transparent 28%),linear-gradient(145deg,#0c1213 0%,#0d1715 72%,#12201d 100%)}
    .asset-performance-preview__summary header{display:grid;gap:5px}.asset-performance-preview__summary h3{margin:0;color:#fff;font-size:1.35rem}.asset-performance-preview__summary p{max-width:650px;margin:0;font-size:.8rem;color:rgba(244,241,234,.7)}
    .asset-performance-preview__group{display:grid;gap:10px}.asset-performance-preview__group-label{color:rgba(244,241,234,.6);font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
    .asset-performance-preview__metrics{display:grid;gap:12px}.asset-performance-preview__metrics--4{grid-template-columns:1.15fr .78fr 1fr 1fr}.asset-performance-preview__metrics--3{grid-template-columns:repeat(3,minmax(0,1fr))}.asset-performance-preview__metrics--2{grid-template-columns:repeat(2,minmax(0,1fr))}
    .asset-performance-preview__metric{min-height:74px;display:grid;align-content:center;gap:6px;padding:13px 14px;border:1px solid rgba(255,255,255,.07);border-radius:18px;background:rgba(255,255,255,.04)}.asset-performance-preview__metric.is-featured{border-color:rgba(212,251,0,.28);background:linear-gradient(145deg,rgba(212,251,0,.1),rgba(255,255,255,.035))}
    .asset-performance-preview__metric small{color:rgba(244,241,234,.64);font-size:.66rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase}.asset-performance-preview__metric strong{color:#fff;font-size:1.02rem;line-height:1.1}.asset-performance-preview__metric span{color:rgba(244,241,234,.7);font-size:.72rem;line-height:1.3}
    .asset-performance-preview__side{display:grid;grid-template-rows:minmax(300px,1.72fr) minmax(176px,1fr);gap:16px}.asset-performance-preview__valuation,.asset-performance-preview__paid{border:1px solid rgba(255,255,255,.14);border-radius:24px;color:#fff}.asset-performance-preview__valuation{display:grid;align-content:space-between;gap:18px;padding:20px;background:radial-gradient(circle at 0% 100%,#7c948f 0%,#6688c7 52%,#547ce0 100%)}
    .asset-performance-preview__valuation h3{margin:0;font-size:2rem;line-height:1}.asset-performance-preview__valuation>div{display:grid;gap:7px}.asset-performance-preview__valuation small{font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.asset-performance-preview__valuation strong{font-size:2.55rem;line-height:.95;letter-spacing:-.045em}.asset-performance-preview__valuation span{width:max-content;padding:7px 11px;border-radius:999px;background:#7dffb5;color:#0f171f;font-size:.8rem;font-weight:900}.asset-performance-preview__valuation footer p{margin:0;color:rgba(255,255,255,.92);font-size:.88rem}
    .asset-performance-preview__paid{display:grid;align-content:center;gap:8px;padding:20px;background:#111}.asset-performance-preview__paid strong{font-size:2.3rem;line-height:1}.asset-performance-preview__paid span{color:rgba(255,255,255,.9);font-size:.88rem}
    @media(max-width:1100px){.asset-performance-preview{grid-template-columns:1fr}.asset-performance-preview__side{grid-template-columns:1fr 1fr;grid-template-rows:none}.asset-performance-preview__metrics--4{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:760px){.asset-performance-preview__metrics--4,.asset-performance-preview__metrics--3,.asset-performance-preview__metrics--2,.asset-performance-preview__side{grid-template-columns:1fr}.asset-performance-preview__valuation strong{font-size:2rem}.asset-performance-preview__paid strong{font-size:1.9rem}}
  </style>`;

  const preview = `${previewStyles}<div class="asset-performance-preview">
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
