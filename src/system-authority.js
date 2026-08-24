const systemAuthority = {
  project: 'CIIMO / Invest Broker Design System',
  currentRepository: 'itamartcjr/invest-broker-design-system',
  documentationReference: {
    repository: 'itamartcjr/brand-and-design-system',
    role: 'documentation-framework-only',
    statement: 'A referência ensina como organizar, aprofundar e apresentar a documentação. Ela também pode orientar o shell documental — sidebar, topbar, busca, breadcrumb e drawer — sem definir a estética ou o comportamento do produto CIIMO.',
  },
  authority: {
    visualAndBehavior: {
      label: 'Projeto CIIMO atual',
      rule: 'Tudo que define como o produto parece, se move e se comporta precisa ser comprovável no projeto CIIMO atual ou em seus assets oficiais.',
      sources: ['assets/brand/', 'styles.css', 'src/theme.css', 'src/refinement.css', 'src/color-semantics.css', 'src/mobile.css', 'src/docs.js', 'catalog.js', 'app/*.html', 'web/*.html'],
    },
    brandMeaning: {
      label: 'Estratégia CIIMO',
      rule: 'Essência, posicionamento, personalidade, linguagem e promessa explicam por que o sistema toma determinadas decisões.',
      sources: ['src/brand/brand-book.js', 'assets/brand/ciimo_*.svg', 'assets/brand/ii_*.svg'],
    },
    documentedSystem: {
      label: 'Design System CIIMO',
      rule: 'A documentação consolida decisões existentes em tokens, componentes, padrões e exemplos sem substituir a implementação por uma estética nova.',
      sources: ['src/site-pages.js', 'src/brand/brand-pages.js', 'src/theme-page.js', 'src/visual-principles-page.js', 'src/responsive-page.js'],
    },
    externalMethod: {
      label: 'Brand e Design System',
      rule: 'Pode influenciar arquitetura da informação, formato de página, profundidade, governança, shell documental e forma de demonstrar. Não pode introduzir estética CIIMO nem comportamento de produto.',
      sources: ['itamartcjr/brand-and-design-system'],
    },
  },
  referenceCanDefine: [
    'arquitetura da informação',
    'ordem das seções de documentação',
    'profundidade mínima por assunto',
    'forma de separar fundamentos, tokens, componentes, patterns e exemplos',
    'método para demonstrar exemplos, estados e comparações',
    'documentação técnica e governança',
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
  pageAnatomy: ['Título', 'Descrição', 'Para que serve', 'Exemplo real', 'Todas as variações', 'Informações técnicas', 'Referências'],
  evidenceRule: 'Se uma decisão visual ou comportamental do produto não puder ser apontada no CIIMO atual, ela não deve ser promovida automaticamente a regra do sistema. Primeiro deve ser validada no produto.',
  consistencyRule: 'Quando implementação e documentação divergirem, investigar a origem. Não copiar a estética da referência externa para resolver a divergência.',
};

module.exports = { systemAuthority };
