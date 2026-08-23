# Invest Broker Design System

Documentação estática do design system do Invest Broker, usando a linguagem visual CIIMO existente no repositório e a organização documental do projeto `imobiliaria-design-system` como referência estrutural.

## Arquitetura

- `app/` e `web/`: páginas-base existentes, preservadas como conteúdo.
- `src/navigation.js`: fonte única da navegação.
- `src/site-components/sidebar.js`: módulo que renderiza a sidebar em todas as páginas.
- `src/site-pages.js`: páginas documentais de entrada, cobertura e referências.
- `src/docs.css`: comportamento visual da documentação e sidebar colapsável.
- `src/docs.js`: persistência do estado do menu durante a sessão.
- `scripts/build-site.js`: gera o site estático em `dist/`.
- `.github/workflows/pages.yml`: publica `dist/` no GitHub Pages.

## Comandos

```bash
npm run build
npm run validate
```

A raiz publicada abre diretamente a documentação. O menu inicia recolhido e pode ser expandido sem duplicar a navegação em cada página-fonte.
