const systemAuthority = {
  project: 'CIIMO / Invest Broker Design System',
  currentRepository: 'itamartcjr/invest-broker-design-system',
  documentationReference: {
    repository: 'itamartcjr/brand-and-design-system',
    role: 'documentation-framework-only',
    statement: 'A referência orienta arquitetura, shell, hierarquia e profundidade. Conteúdo de marca, identidade, aparência e comportamento continuam vindo da CIIMO.',
  },
  authority: {
    visualAndBehavior: {
      label: 'Projeto CIIMO atual',
      rule: 'Tudo que define como o produto parece, se move e se comporta precisa ser comprovável no projeto CIIMO atual ou em seus assets oficiais.',
      sources: ['assets/brand/', 'styles.css', 'src/theme.css', 'src/refinement.css', 'src/color-semantics.css', 'src/mobile.css', 'src/docs.js', 'catalog.js', 'app/*.html', 'web/*.html'],
    },
    brandMeaning: {
      label: 'Estratégia CIIMO',
      rule: 'Essência, posicionamento, personalidade, linguagem e promessa vêm da criação oficial da marca.',
      sources: ['src/brand/brand-book.js', 'src/brand/framework-data.js', 'assets/brand/ciimo_*.svg', 'assets/brand/ii_*.svg'],
    },
    documentedSystem: {
      label: 'Design System CIIMO',
      rule: 'O Design System traduz a marca e o produto real em foundations, tokens, componentes, patterns, templates e exemplos.',
      sources: ['src/design-system-pages.js', 'src/design-system-extra-pages.js', 'src/theme-page.js', 'src/responsive-page.js'],
    },
    externalMethod: {
      label: 'Brand e Design System',
      rule: 'Pode influenciar arquitetura da informação, formato de página, profundidade, governança e shell. Não pode introduzir estética ou decisões de marca.',
      sources: ['itamartcjr/brand-and-design-system'],
    },
  },
  referenceCanDefine: [
    'arquitetura da informação',
    'hierarquia de navegação',
    'profundidade por assunto',
    'separação entre Brand e Design System',
    'forma de separar foundations, tokens, components, patterns, templates e examples',
    'shell documental: logo no canto superior esquerdo, topbar, sidebar, busca, breadcrumb, GitHub, tema e drawer mobile',
  ],
  referenceCannotDefine: [
    'cores',
    'tipografia',
    'spacing',
    'grid do produto',
    'border radius',
    'ícones',
    'sombras e elevação',
    'superfícies',
    'motion e easing do produto',
    'aparência de componentes',
    'comportamento responsivo do produto',
    'hover, focus, active, loading ou disabled do produto',
    'personalidade e linguagem da marca',
  ],
  brandPageAnatomy: ['Título', 'Conteúdo final da marca', 'Aplicações quando existirem', 'Pendências quando existirem'],
  designSystemPageAnatomy: ['Título', 'Descrição', 'Regra de uso', 'Exemplo real', 'Variações e estados quando existirem', 'Informações técnicas'],
  evidenceRule: 'Se uma decisão visual ou comportamental do produto não puder ser apontada no CIIMO atual, ela não deve ser promovida automaticamente a regra do sistema.',
  consistencyRule: 'Quando implementação e documentação divergirem, investigar a origem e preservar a identidade CIIMO.',
};

module.exports = { systemAuthority };
