# CIIMO / Invest Broker Design System

Design system e documentação de produto da CIIMO, mantidos no repositório `invest-broker-design-system`.

A organização documental usa Node para montar a navegação, páginas de marca e documentação e gerar a saída publicada em `dist/`.

## Regra de autoridade

O projeto `itamartcjr/brand-and-design-system` é uma **referência estrutural de documentação**. Ele pode orientar arquitetura da informação, hierarquia de páginas, profundidade, exemplos, governança e organização entre Foundations, Tokens, Components, Patterns, Templates e Examples.

Ele **não define a identidade visual do CIIMO**.

Para qualquer decisão sobre como algo deve parecer, se mover ou se comportar, a fonte de verdade é o CIIMO atual:

- `assets/brand/` para os assets oficiais;
- `styles.css` para a base visual existente;
- `src/theme.css` para Light/Dark;
- `src/refinement.css` para hierarquia e densidade atuais;
- `src/color-semantics.css` para papéis semânticos de cor;
- `src/mobile.css` para comportamento responsivo;
- `src/docs.js` e `catalog.js` para interação e navegação;
- `app/*.html` e `web/*.html` enquanto ainda forem as fontes históricas dos exemplos reais.

A estratégia registrada em `src/brand/brand-book.js` explica essência, posicionamento, personalidade, linguagem e promessa da marca. O código atual define a manifestação visual e comportamental concreta dessa identidade.

**Copiar a inteligência do sistema, não a estética.**

## Contrato documental

`src/system-authority.js` registra a separação entre autoridade CIIMO e referência externa. Toda página documental deve, quando aplicável, seguir esta ordem:

1. Título
2. Descrição
3. Para que serve
4. Exemplo real
5. Todas as variações
6. Informações técnicas
7. Referências

A página `Documentação → Como usar` demonstra esse contrato dentro do próprio Design System.

## Fontes de verdade

A ordem prática é:

1. **Projeto CIIMO atual + assets oficiais** — aparência, motion, estados, comportamento e responsividade.
2. **Estratégia da marca** — essência, visão, posicionamento, percepção desejada, linguagem e promessa.
3. **Design System CIIMO** — consolida tokens, padrões, componentes e documentação sem contradizer as fontes anteriores.
4. **Brand e Design System** — framework estrutural para documentação, nunca fonte estética.
5. **Outras referências externas** — ajudam em cobertura, acessibilidade e método.

Quando uma regra documentada mudar, implementação e documentação devem mudar juntas.

## Arquitetura atual

- `src/system-authority.js`: contrato de autoridade, precedência e anatomia documental.
- `src/brand/brand-book.js`: estratégia da marca em dados estruturados.
- `src/brand/brand-pages.js`: páginas do brand book geradas pelo Node.
- `src/navigation.js`: fonte única da navegação Marca / Documentação / App / Web.
- `src/site-components/sidebar.js`: sidebar modular e persistente.
- `src/site-pages.js`: páginas documentais e composição das páginas de Marca.
- `src/how-to-use-page.js`: documentação da metodologia e da precedência CIIMO.
- `src/docs.css`: estilos exclusivos do shell documental.
- `src/theme.css`: temas Light/Dark.
- `src/refinement.css`: refinamento visual e densidade.
- `src/color-semantics.css`: papéis de cor e contraste.
- `src/mobile.css`: comportamento responsivo.
- `src/docs.js`: navegação sem remontar a sidebar, persistência e comportamento mobile.
- `assets/brand/`: logotipos, símbolos e favicons oficiais.
- `scripts/build-site.js`: gera o site em `dist/` e copia os assets necessários.
- `scripts/dev-server.js`: servidor Node local para visualizar o build.
- `.github/workflows/pages.yml`: publica `dist/` no GitHub Pages.

As páginas históricas de App e Web continuam sendo adaptadas pelo build enquanto são migradas para o mesmo modelo data-driven das páginas de Marca e Documentação. Elas continuam valiosas como **evidência do produto**, mas não devem ser usadas para introduzir regras novas sem recorrência.

## Marca

A seção Marca documenta:

- Essência
- Posicionamento
- Personalidade e voz
- Princípios de produto
- Princípios visuais
- Identidade visual
- Tema claro e escuro

A promessa central registrada é:

> Seu imóvel deixa de ser apenas uma compra e passa a ser acompanhado como investimento.

## Comandos

```bash
npm run build
npm run validate
npm run dev
```

`npm run dev` gera `dist/` e sobe o servidor Node em `http://localhost:4173` por padrão.
