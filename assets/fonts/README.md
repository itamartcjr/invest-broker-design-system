# CIIMO Typography

A familia tipografica oficial e **Kanit**, nos pesos 100 a 900, com estilos normal e italico.

O aplicativo carrega a familia pelo Google Fonts em `invest-broker-app/src/style.scss`. O design system replica essa origem por CSS para manter fidelidade sem duplicar arquivos de fonte no repositorio.

```css
@import url("https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

font-family: "Kanit", sans-serif;
```

Para distribuicao offline, baixe os arquivos diretamente da familia Kanit no Google Fonts e preserve os nomes e pesos originais. Nao substitua por uma familia visualmente semelhante.
