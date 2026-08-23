# CIIMO / Invest Broker Design System

Design system e documentação de produto da CIIMO, mantidos no repositório `invest-broker-design-system`.

A organização documental usa Node para montar a navegação, páginas de marca e documentação e gerar a saída publicada em `dist/`. A identidade não é herdada do projeto usado como referência de organização: ela vem da estratégia de marca, dos assets CIIMO e dos produtos reais.

## Fontes de verdade

A ordem de precedência é:

1. **Estratégia da marca** — essência, visão, posicionamento, percepção desejada, linguagem, promessa e princípios de experiência.
2. **Produtos reais** — `invest-broker-app`, `invest-broker-site` e demais superfícies CIIMO.
3. **Design system** — consolida tokens, padrões, componentes e documentação sem contradizer as duas fontes anteriores.
4. **Referências externas** — ajudam em cobertura, acessibilidade e método, mas não definem identidade.

Quando uma regra documentada mudar, implementação e documentação devem mudar juntas.

## Arquitetura atual

- `src/brand/brand-book.js`: estratégia da marca em dados estruturados.
- `src/brand/brand-pages.js`: páginas do brand book geradas pelo Node.
- `src/navigation.js`: fonte única da navegação Marca / Documentação / App / Web.
- `src/site-components/sidebar.js`: sidebar modular e persistente.
- `src/site-pages.js`: páginas documentais e composição das páginas de Marca.
- `src/docs.css`: estilos exclusivos do shell documental.
- `src/docs.js`: navegação sem remontar a sidebar e persistência de estado.
- `assets/brand/`: logotipos, símbolos e favicons oficiais.
- `scripts/build-site.js`: gera o site em `dist/` e copia os assets necessários.
- `scripts/dev-server.js`: servidor Node local para visualizar o build.
- `.github/workflows/pages.yml`: publica `dist/` no GitHub Pages.

As páginas históricas de App e Web continuam sendo adaptadas pelo build enquanto são migradas para o mesmo modelo data-driven das páginas de Marca e Documentação. Elas não definem o shell nem a navegação.

## Marca

A seção Marca possui cinco capítulos:

- Essência
- Posicionamento
- Personalidade e voz
- Princípios de produto
- Identidade visual

A promessa central registrada é:

> Seu imóvel deixa de ser apenas uma compra e passa a ser acompanhado como investimento.

## Comandos

```bash
npm run build
npm run validate
npm run dev
```

`npm run dev` gera `dist/` e sobe o servidor Node em `http://localhost:4173` por padrão.
