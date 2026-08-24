# CIIMO / Invest Broker Design System

Design system, Brand Framework e documentação de produto da CIIMO.

O projeto usa Node para transformar fontes estruturadas de marca, fundamentos, componentes, patterns e exemplos reais em um site publicado em `dist/`. HTML gerado é saída de build; decisões de marca e documentação ficam em módulos JavaScript e assets oficiais.

## Regra de autoridade

O projeto `itamartcjr/brand-and-design-system` é uma **referência estrutural de documentação**. Ele orienta arquitetura da informação, organização em grupos/módulos/itens, anatomia das páginas, profundidade, governança e cobertura entre Foundations, Tokens, Components, Patterns, Templates e Examples.

Ele **não define a identidade visual do CIIMO**.

Para qualquer decisão sobre como algo deve parecer, se mover, falar ou se comportar, a fonte de verdade é o CIIMO atual e o material oficial da marca.

**Estrutura de fora. Identidade daqui.**

## Fontes de verdade

A precedência é:

1. **Estratégia oficial da marca** — `src/brand/brand-book.js`, derivada do documento “Invest Broker — Documento de Tom, Visão e Posicionamento”.
2. **Produto real** — App, Web e seus componentes, textos, estados e fluxos em uso.
3. **Assets oficiais** — `assets/brand/`, incluindo os SVGs-mestre CIIMO e II.
4. **Design System CIIMO** — consolida decisões comprovadas em foundations, tokens, components, patterns e templates.
5. **Brand & Design System de referência** — método e organização documental.
6. **Outras referências externas** — cobertura, acessibilidade e validação técnica.

Uma referência externa nunca pode substituir uma decisão CIIMO.

## Brand Framework

A Brand usa o mesmo modelo de cobertura do projeto de referência: **20 módulos em 5 grupos**.

### Foundation

01. Brand Core
02. Brand Strategy
03. Audience
04. Brand Personality

### Language & Narrative

05. Verbal Identity
06. Messaging System
07. Brand Storytelling

### Visual Identity

08. Visual Brand Identity
09. Typography
10. Photography Direction
11. Illustration
12. Iconography
13. Graphic Language
14. Layout Principles
15. Motion Identity

### Experience

16. Sonic Identity
17. Brand Experience
18. Brand in Action

### AI & Governance

19. AI Brand Guidelines
20. Brand Governance

Cada item registra:

1. definição;
2. para que serve;
3. perguntas de construção quando necessárias;
4. evidência;
5. decisão específica da CIIMO;
6. aplicação real / contraexemplo quando sustentado pela fonte;
7. como executar;
8. dependências;
9. referências;
10. status de governança.

Os status são:

- **Aprovado** — explicitamente sustentado pelo documento oficial, asset ou produto real;
- **Derivado** — tradução documentada de uma decisão aprovada para aplicação prática;
- **Pendente** — não definido oficialmente; exige evidência e aprovação antes de virar regra.

A documentação **não completa lacunas inventando respostas**. Missão formal, valores corporativos, fotografia, ilustração, identidade sonora, política formal de IA, brand measurement, clear space/tamanho mínimo e um sistema completo de motion do produto permanecem pendentes enquanto as fontes atuais não os definirem.

## Documento oficial incorporado

`src/brand/brand-book.js` estrutura o conteúdo integral usado na criação da marca:

- essência;
- propósito;
- visão;
- problema de mercado, comprador e negócio;
- proposta de valor;
- percepção desejada;
- posicionamento;
- território de marca;
- estrutura Cliente → Corretor → Imobiliária;
- diferenciação;
- experiência desejada;
- seis pilares;
- promessa central;
- mensagens para cliente, corretor e imobiliária;
- linguagem e vocabulário;
- frases de apresentação;
- resumo executivo;
- pergunta central de validação de produto e design.

A promessa central é:

> Seu imóvel deixa de ser apenas uma compra e passa a ser acompanhado como investimento.

O filtro central é:

> Isso faz o usuário sentir que está acompanhando um investimento imobiliário com clareza, confiança e visão de oportunidade?

## Brand → Design System

Decisões estratégicas só entram no Design System quando possuem consequência prática.

Exemplos:

- **Inteligente, mas fácil de entender** → dados com contexto, comparação e metodologia legível;
- **Financeira, sem ser fria** → patrimônio, desempenho e evolução com linguagem humana;
- **Consultiva, sem ser complicada** → contexto e orientação sem relatório técnico excessivo;
- **Sofisticada, sem parecer distante** → menos ruído, menos bordas, menos peso tipográfico e mais respiro;
- **Carteira viva, não cadastro parado** → leitura patrimônio → evolução → comparação → orientação;
- **Clareza e confiança** → referências sem base suficiente ficam indisponíveis em vez de gerar conclusão frágil.

## Organização do Design System

A navegação principal é:

- **00 Introdução**
- **01 Brand**
- **02 Foundations**
- **03 Tokens**
- **04 Components**
- **05 Patterns**
- **06 Templates**
- **07 Examples**
- **A Aplicativo**
- **W Web**

### Foundations

- Marca para interface
- Colors
- Typography
- Spacing & Layout
- Grid
- Breakpoints
- Radius
- Borders
- Elevation
- Icons
- Light & Dark
- Motion

O CIIMO não declara um grid global de 12 colunas só porque a referência usa um. O projeto atual usa **grids contextuais**; a documentação mostra Desktop/Tablet/Mobile e separa breakpoints globais de thresholds locais de componentes.

### Tokens

- Primitive
- Semantic
- Component

A separação impede que `#D4FB00`, por exemplo, vire ao mesmo tempo marca, texto, foco e estado sem intenção explícita. Em Light, `--accent-content: #5B6C00` resolve conteúdo legível sem alterar o lime oficial da marca.

### Components

O inventário só documenta peças existentes/relevantes, incluindo:

- Buttons / Icon Buttons
- Fields
- Cards / Metrics / Data Display
- Tables
- Feedback / Empty / Loading
- Navigation

As bibliotecas **Aplicativo** e **Web** preservam a evidência detalhada das implementações reais.

### Patterns

- leitura de investimento;
- filter & compare;
- acompanhamento contínuo.

O padrão central é:

**Patrimônio → evolução → comparação → orientação.**

### Templates

Estruturas documentadas a partir de fluxos reais:

- Portfolio Overview;
- Asset Detail;
- Territory Intelligence;
- Presentation Modes.

### Examples

A mesma marca é demonstrada em três leituras reais:

- Cliente;
- Corretor;
- Imobiliária.

## Identidade visual

Os arquivos-mestre ficam em `assets/brand/`:

- `ciimo_b.svg`
- `ciimo_cb.svg`
- `ciimo_cw.svg`
- `ciimo_v.svg`
- `ciimo_w.svg`
- `ii_b.svg`
- `ii_v.svg`
- `ii_w.svg`

A documentação nunca redesenha paths, aplica filtros para fabricar variantes ou transforma aliases em fonte oficial.

Principais decisões já comprovadas:

- CIIMO Lime `#D4FB00`;
- Dark canvas `#000000`;
- Light canvas `#F4F1EA`;
- App com Kanit;
- Web preserva Inter/system-ui onde essa é a implementação real;
- spacing `6 · 10 · 16 · 24 · 32`;
- `24px` para seção e `32px` para separação macro;
- radius `14 · 16 · 24 · pill`;
- Hugeicons como biblioteca de ícones;
- biblioteca nativa sem sombra como padrão estrutural;
- Light/Dark por tokens semânticos;
- mobile com topbar + drawer até `760px`;
- alvo mínimo de toque `44px`.

## Shell documental

O shell segue a arquitetura funcional do projeto de referência, com expressão CIIMO:

- logo oficial no canto superior esquerdo;
- topbar e topo da sidebar com `64px` e a mesma linha horizontal;
- busca na sidebar;
- navegação grupo → módulo → item para a Brand;
- breadcrumb dinâmico;
- GitHub e Light/Dark na topbar;
- sidebar recolhível no desktop;
- drawer + backdrop no mobile;
- navegação interna sem remontar o shell;
- persistência de tema, sidebar e módulos.

## Arquitetura do código

Principais fontes:

- `src/brand/brand-book.js` — documento estratégico estruturado;
- `src/brand/framework-data.js` — 20 módulos e decisões da Brand;
- `src/brand/framework-navigation.js` — rotas e hierarquia da Brand;
- `src/brand/framework-pages.js` — páginas da Brand;
- `src/design-system-pages.js` — tradução da marca para foundations/tokens/patterns;
- `src/design-system-extra-pages.js` — foundations, componentes e templates adicionais comprovados;
- `src/all-pages.js` — agregador de páginas Node;
- `src/navigation.js` — fonte única do menu;
- `src/site-components/sidebar.js` — sidebar compartilhada;
- `src/site-components/topbar.js` — topbar compartilhada;
- `src/docs.js` — navegação persistente e comportamento do shell;
- `src/brand-nav.js` — grupos/módulos/busca da Brand;
- `src/system-authority.js` — contrato de autoridade;
- `src/theme.css` / `src/color-semantics.css` — temas e papéis de cor;
- `src/refinement.css` — sobriedade, densidade e hierarquia;
- `src/mobile.css` — responsividade;
- `src/shell-refinement.css` — geometria do shell;
- `src/brand-framework.css` — apresentação da Brand;
- `src/design-system-boards.css` — pranchas visuais dos fundamentos/componentes;
- `scripts/build-site.js` — build Node;
- `scripts/validate-links.js` — contratos e cobertura;
- `.github/workflows/pages.yml` — build/validate/deploy no GitHub Pages.

As páginas históricas de App e Web ainda são adaptadas pelo build enquanto são migradas para dados/renderers Node. Elas funcionam como **evidência do produto**, não como autorização para criar padrões novos a partir de uma ocorrência isolada.

## Comandos

```bash
npm run build
npm run validate
npm run dev
```

`npm run dev` gera `dist/` e sobe o servidor Node em `http://localhost:4173` por padrão.
