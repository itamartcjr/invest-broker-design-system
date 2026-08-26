# CIIMO / Brand e Design System

Repositório de documentação da marca e do produto CIIMO.

## Estrutura

O site é dividido em duas áreas principais:

- **Brand** — conteúdo final da marca: essência, estratégia, públicos, personalidade, linguagem, identidade visual, experiência e governança.
- **Design System** — foundations, tokens, components, patterns, templates, examples e as bibliotecas específicas de **App** e **Web**.

A página inicial apenas direciona para essas duas áreas.

## Brand

A Brand usa o documento estratégico da CIIMO e os assets oficiais como fonte de verdade.

As páginas de Brand são editoriais. Elas mostram a decisão final da marca e suas aplicações. Não exibem instruções do framework como “Para que serve”, “Decisão CIIMO”, “Como executar” ou “Governança”. Quando um assunto ainda não foi definido oficialmente, a página mostra apenas **A definir** e os pontos que precisam ser resolvidos.

Fonte principal:

- `src/brand/brand-book.js`
- `src/brand/framework-data.js`
- `assets/brand/ciimo_*.svg`
- `assets/brand/ii_*.svg`

## Design System

O Design System traduz a identidade CIIMO e o produto real em regras de interface.

Estrutura:

1. Foundations
2. Tokens
3. Components
4. Patterns
5. Templates
6. Examples
7. App
8. Web

App e Web ficam dentro do Design System porque são superfícies do mesmo produto, embora preservem diferenças reais de implementação.

## Gráficos

O repertório de visualização é data-driven e compartilhado entre App e Web:

- `src/charts/catalog.js` — tipos disponíveis, família e regra de uso.
- `src/charts/renderers.js` — renderers SVG/CSS reutilizáveis.
- `src/charts/presets.js` — conteúdo e composição específicos de App e Web.
- `src/charts/pages.js` — monta as páginas a partir dos presets.
- `src/charts.css` — layout, responsividade e linguagem visual dos gráficos.

Para adicionar uma nova visualização, primeiro registre o tipo no catálogo e renderer. Depois use esse tipo em um preset. Não duplique SVG/HTML diretamente entre App e Web.

## Autoridade visual

O projeto `itamartcjr/brand-and-design-system` é referência de arquitetura e organização documental. Ele não define a identidade CIIMO.

Aparência e comportamento devem ser comprováveis em:

- `assets/brand/`
- `styles.css`
- `src/theme.css`
- `src/refinement.css`
- `src/color-semantics.css`
- `src/mobile.css`
- `src/docs.js`
- `app/*.html`
- `web/*.html`

## Arquitetura Node

- `src/brand/brand-book.js`: conteúdo estratégico da marca.
- `src/brand/framework-data.js`: módulos e decisões da Brand.
- `src/brand/framework-pages.js`: renderização editorial da Brand.
- `src/design-system-pages.js`: páginas principais do Design System.
- `src/design-system-extra-pages.js`: foundations, components, patterns e templates adicionais.
- `src/charts/`: catálogo, renderers, presets e páginas de visualização de dados.
- `src/home-page.js`: entrada Brand / Design System.
- `src/design-system-overview-page.js`: overview do Design System com App e Web.
- `src/navigation.js`: navegação centralizada.
- `src/all-pages.js`: catálogo completo de páginas geradas.
- `scripts/build-site.js`: gera `dist/`.
- `scripts/validate-links.js`: valida estrutura, navegação e contratos.

## Marca

Promessa central:

> Seu imóvel deixa de ser apenas uma compra e passa a ser acompanhado como investimento.

## Comandos

```bash
npm run build
npm run validate
npm run dev
```

`npm run dev` gera `dist/` e sobe o servidor Node local.
