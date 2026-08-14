/**
 * Roma & Buganza — estúdio de desenvolvimento
 * ---------------------------------------------------------------
 * TODO o conteúdo editável do site vive aqui: marca, sócios,
 * serviços, processo, números, FAQ e contatos.
 * Trocar conteúdo = editar este arquivo (zero texto hardcoded
 * nos componentes). O catálogo de projetos fica em `lib/projetos.ts`.
 *
 * Itens marcados PLACEHOLDER ainda precisam do dado real.
 */

export const brand = {
  nome: 'Roma & Buganza',
  sufixo: 'estúdio de desenvolvimento',
  nomeCurto: 'R&B',
  nomeCompleto: 'Roma & Buganza — estúdio de desenvolvimento',
  tagline: 'Software que sai do ar de ideia e entra no ar de verdade.',
  promessa:
    'Sites, landing pages e sistemas sob medida — construídos do primeiro rabisco ao deploy, por duas pessoas que assinam o que entregam.',
  descricao:
    'Estúdio de desenvolvimento web de Sorocaba/SP. Criamos landing pages de conversão, sites institucionais, sistemas com catálogo e painel administrativo, automações e produtos digitais do zero. Next.js, TypeScript, Prisma e modelagem 3D.',
  // PLACEHOLDER — troque pelo número real (só dígitos, com DDI 55).
  whatsapp: '5515991234567',
  email: 'contato@romabuganza.com.br', // PLACEHOLDER
  instagram: '@romabuganza', // PLACEHOLDER
  instagramUrl: 'https://www.instagram.com/', // PLACEHOLDER
  github: 'https://github.com/romavitordev',
  linkedin: 'https://www.linkedin.com/in/romavitordev',
  url: 'https://romabuganza.com.br', // PLACEHOLDER
  base: 'Sorocaba/SP — atendemos remoto no Brasil inteiro',
  fundacao: 2024,
}

export const nav = [
  { href: '/projetos', label: 'Projetos' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/estudio', label: 'Estúdio' },
  { href: '/contato', label: 'Contato' },
]

/** Monta um link de WhatsApp com mensagem pré-preenchida. */
export function waLink(mensagem: string) {
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(mensagem)}`
}

export const waMensagens = {
  geral: 'Oi! Vim pelo site da Roma & Buganza e quero conversar sobre um projeto.',
  servico: (nome: string) =>
    `Oi! Vim pelo site da Roma & Buganza. Tenho interesse em ${nome} — pode me explicar como funciona?`,
  projeto: (nome: string) =>
    `Oi! Vi o case do ${nome} no site de vocês e quero algo parecido pro meu negócio.`,
  orcamento: (tipo: string, prazo: string, sobre: string) =>
    `Olá! Quero um orçamento.\n\n• Tipo: ${tipo}\n• Prazo desejado: ${prazo}\n• Sobre o projeto: ${sobre}`,
}

/* ------------------------------------------------------------------ */
/* Sócios                                                              */
/* ------------------------------------------------------------------ */

export type Socio = {
  id: string
  nome: string
  papel: string
  resumo: string
  bio: string
  faz: string[]
  links: { label: string; url: string }[]
  /** PLACEHOLDER — troque por uma foto real em /public. */
  foto?: string
}

export const socios: Socio[] = [
  {
    id: 'vitor',
    nome: 'Vitor Roma',
    papel: 'Desenvolvimento & produto',
    resumo: 'Escreve o código que vai pro ar.',
    bio:
      'Analista de Sistemas em formação (ADS/UNIP) e desenvolvedor web. Constrói do front ao banco: interfaces em Next.js e TypeScript, APIs, painéis administrativos com autenticação e 2FA, integrações de WhatsApp e automações em Python. Também é fotógrafo — o que explica por que os sites daqui saem enquadrados antes de saírem codados.',
    faz: [
      'Front-end (Next.js, React, TypeScript, Tailwind)',
      'Back-end e banco (Node, Prisma, PostgreSQL/Supabase, SQL Server)',
      'Painéis administrativos, autenticação e CRUD',
      'Automações e scraping em Python',
      'SEO técnico, performance e deploy',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/romavitordev' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/romavitordev' },
    ],
  },
  {
    id: 'marcelo',
    nome: 'Marcelo Buganza',
    papel: 'Negócio & 3D',
    resumo: 'Traduz mercado em produto — e produto em imagem.',
    bio:
      'Modelador 3D e a cabeça de mercado do estúdio. Entra antes do código: entende o negócio do cliente, onde está o dinheiro e o que precisa aparecer primeiro na tela. Depois entra de novo na parte visual, modelando produtos, ambientes e peças 3D para os sites e materiais de venda.',
    faz: [
      'Modelagem e visualização 3D de produtos e ambientes',
      'Diagnóstico de negócio e posicionamento',
      'Estratégia de oferta e funil de conversão',
      'Relacionamento com o cliente e acompanhamento',
    ],
    links: [
      // PLACEHOLDER — adicione os perfis do Marcelo quando tiver.
      { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Serviços                                                            */
/* ------------------------------------------------------------------ */

export type Servico = {
  id: string
  numero: string
  nome: string
  resumo: string
  descricao: string
  entrega: string[]
  prazo: string
  paraQuem: string
}

export const servicos: Servico[] = [
  {
    id: 'landing-page',
    numero: '01',
    nome: 'Landing pages de conversão',
    resumo: 'Uma página, um objetivo: fazer a pessoa agir.',
    descricao:
      'Página única, escrita e desenhada em torno de uma ação — pedir orçamento, chamar no WhatsApp, reservar, comprar. Sem menu que distrai, sem seção que não empurra. Tudo o que entra na página tem que justificar por que está ali.',
    entrega: [
      'Copy e estrutura de página feitas junto com você',
      'Design responsivo (mobile primeiro)',
      'Animações e transições sob medida',
      'SEO técnico, Open Graph e sitemap',
      'Formulário ou WhatsApp com mensagem pré-preenchida',
      'Deploy, domínio e certificado configurados',
    ],
    prazo: '1 a 2 semanas',
    paraQuem: 'Serviço local, infoproduto, lançamento, profissional liberal.',
  },
  {
    id: 'site-institucional',
    numero: '02',
    nome: 'Sites & experiências',
    resumo: 'O site que faz o cliente confiar antes de falar com você.',
    descricao:
      'Site de várias páginas com identidade própria — não template. Rotas para cardápio, catálogo, sobre, contato, o que o negócio pedir. Aqui a gente investe em movimento, tipografia e ritmo: o site tem que parecer caro porque o negócio é bom.',
    entrega: [
      'Arquitetura de rotas e conteúdo',
      'Design e identidade aplicados página a página',
      'Conteúdo centralizado — você edita um arquivo, o site inteiro muda',
      'Performance, acessibilidade e dados estruturados',
      'Painel simples de edição (opcional)',
    ],
    prazo: '2 a 4 semanas',
    paraQuem: 'Restaurantes, cafés, estúdios, escritórios, academias, clínicas.',
  },
  {
    id: 'sistemas',
    numero: '03',
    nome: 'Sistemas sob medida',
    resumo: 'Catálogo, CRUD, painel e login. O trabalho pesado.',
    descricao:
      'Quando o site precisa de banco de dados. Catálogo com filtros e busca, cadastro e edição de itens com upload de fotos e vídeo, área administrativa protegida com login e 2FA, captura e gestão de leads, chatbot, relatórios de acesso. É o que fizemos na Buganza Imóveis, ponta a ponta.',
    entrega: [
      'Modelagem de dados e API',
      'Painel administrativo com autenticação e 2FA',
      'CRUD completo com upload e otimização de mídia',
      'Filtros, busca, favoritos e páginas de detalhe',
      'Captura de leads e notificação por WhatsApp/e-mail',
      'Métricas de acesso e qualidade de anúncio',
    ],
    prazo: '4 a 8 semanas com catálogo e painel simples; 8 a 16 no sistema completo',
    paraQuem: 'Imobiliárias, catálogos de produto, marketplaces, operações internas.',
  },
  {
    id: 'produto',
    numero: '04',
    nome: 'Criação de startups',
    resumo: 'Da ideia solta ao produto que dá pra mostrar.',
    descricao:
      'Você tem a ideia; a gente transforma em escopo, em telas e em software rodando. Começa por um MVP honesto — o menor produto que já prova a tese — e cresce a partir do que os primeiros usuários responderem. Foi assim que nasceu o Fisgou.',
    entrega: [
      'Definição de escopo e recorte do MVP',
      'Protótipo navegável antes de escrever a regra de negócio',
      'Arquitetura pensada pra crescer (monorepo, design system)',
      'Feed, perfis, mensagens, notificações, moderação',
      'Acompanhamento por ciclos, com entrega toda semana',
    ],
    prazo: '3 a 6 meses, em ciclos',
    paraQuem: 'Fundadores, times pequenos, produtos internos.',
  },
  {
    id: 'automacao',
    numero: '05',
    nome: 'Automações & integrações',
    resumo: 'O que é repetitivo não devia ser feito por gente.',
    descricao:
      'Scripts e integrações que tiram trabalho manual da mesa: coleta de dados públicos, disparo de mensagens, planilhas que se preenchem sozinhas, sistemas que passam a conversar entre si.',
    entrega: [
      'Mapeamento do processo manual atual',
      'Script ou serviço em Python/Node',
      'Integração com WhatsApp, planilhas e APIs',
      'Agendamento, logs e tratamento de erro',
    ],
    prazo: '3 dias a 2 semanas',
    paraQuem: 'Comercial, atendimento, prospecção, operação.',
  },
  {
    id: '3d',
    numero: '06',
    nome: 'Modelagem & visualização 3D',
    resumo: 'O produto na tela antes de existir na prateleira.',
    descricao:
      'Modelagem 3D de produtos, peças e ambientes para render, catálogo, anúncio ou impressão. Feito pelo Marcelo e integrado ao site — a mesma peça vira imagem de hero, card de catálogo e material de venda.',
    entrega: [
      'Modelagem a partir de foto, desenho ou referência',
      'Render em alta para site, anúncio e impresso',
      'Variações de cor, material e ângulo',
      'Arquivos prontos para impressão 3D (opcional)',
    ],
    prazo: 'sob consulta',
    paraQuem: 'Indústria, e-commerce, arquitetura, produto físico.',
  },
]

/* ------------------------------------------------------------------ */
/* Processo                                                            */
/* ------------------------------------------------------------------ */

export const processo = [
  {
    numero: '01',
    titulo: 'Conversa',
    texto:
      'Meia hora, sem compromisso e sem proposta pronta na manga. A gente quer entender o negócio, quem compra e o que hoje está travando. Se não formos a melhor opção pra você, a gente fala.',
    duracao: '30 min',
  },
  {
    numero: '02',
    titulo: 'Escopo e proposta',
    texto:
      'Você recebe por escrito o que será feito, o que não será, o prazo e o preço — normalmente em três níveis de investimento, para escolher onde entrar. Nada de "a combinar" no meio do caminho.',
    duracao: '2 a 3 dias',
  },
  {
    numero: '03',
    titulo: 'Desenho',
    texto:
      'Estrutura, textos e telas antes de qualquer linha de código. Você aprova o que vai existir enquanto ainda é barato mudar de ideia.',
    duracao: '1 semana',
  },
  {
    numero: '04',
    titulo: 'Construção',
    texto:
      'Desenvolvimento com link de preview atualizado o tempo todo. Você acompanha crescendo, não recebe uma surpresa no fim.',
    duracao: 'o miolo do prazo',
  },
  {
    numero: '05',
    titulo: 'No ar',
    texto:
      'Deploy, domínio, certificado, SEO, analytics e uma passada final de performance e acessibilidade. Entregamos o repositório: o código é seu.',
    duracao: '1 a 2 dias',
  },
  {
    numero: '06',
    titulo: 'Depois',
    texto:
      '30 dias de ajuste incluso. Depois disso, manutenção mensal ou sob demanda — sem contrato amarrado.',
    duracao: 'contínuo',
  },
]

/* ------------------------------------------------------------------ */
/* Números & stack                                                     */
/* ------------------------------------------------------------------ */

export const numeros = [
  { valor: 12, sufixo: '+', label: 'projetos entregues' },
  { valor: 2, sufixo: '', label: 'sócios — sem intermediário' },
  { valor: 100, sufixo: '%', label: 'do código entregue a você' },
  { valor: 30, sufixo: ' dias', label: 'de ajuste incluso' },
]

export const stack = [
  { nome: 'Next.js', nota: 'App Router, SSR e static export' },
  { nome: 'TypeScript', nota: 'tipagem ponta a ponta' },
  { nome: 'React', nota: 'componentes reaproveitáveis' },
  { nome: 'Tailwind CSS', nota: 'design system em tokens' },
  { nome: 'Prisma', nota: 'modelagem e migrações' },
  { nome: 'PostgreSQL', nota: 'via Supabase ou dedicado' },
  { nome: 'Node.js', nota: 'APIs e serviços' },
  { nome: 'Python', nota: 'automação e coleta de dados' },
  { nome: 'GSAP + Lenis', nota: 'movimento e scroll' },
  { nome: 'Framer Motion', nota: 'transições de interface' },
  { nome: 'Vercel', nota: 'deploy e preview por branch' },
  { nome: 'Blender', nota: 'modelagem e render 3D' },
]

/* ------------------------------------------------------------------ */
/* Manifesto                                                           */
/* ------------------------------------------------------------------ */

export const manifesto = {
  titulo: 'Dois sócios, nenhuma camada no meio',
  texto:
    'Agência grande te vende um diretor de contas e te entrega um estagiário. Aqui quem atende é quem faz. O Vitor escreve o código; o Marcelo entende o mercado e modela o que precisa ser visto. Você fala com os dois, do orçamento ao deploy.',
  pontos: [
    {
      titulo: 'Orçamento sob medida',
      texto:
        'Não temos tabela fixa. O preço nasce do tamanho do projeto e do momento do seu negócio — um autônomo começando e uma empresa que já investe em anúncios não pagam o mesmo pelo mesmo trabalho.',
    },
    {
      titulo: 'Preço fechado, escopo escrito',
      texto:
        'Fechado o valor, ele não muda no meio. O que está e o que não está incluso sai por escrito na proposta. Se o escopo crescer, a gente conversa antes — nunca depois da fatura.',
    },
    {
      titulo: 'O código é seu',
      texto:
        'Repositório entregue no fim do projeto. Sem refém de plataforma, sem mensalidade obrigatória pra manter o site no ar.',
    },
    {
      titulo: 'Conteúdo que você edita',
      texto:
        'Textos, preços e imagens centralizados num arquivo só. Trocar o cardápio ou a tabela de preços não exige nos chamar.',
    },
    {
      titulo: 'Rápido de verdade',
      texto:
        'Performance e acessibilidade não são extra: entram no orçamento base. Site lento perde venda e some do Google.',
    },
    {
      titulo: 'Infra à parte, no seu nome',
      texto:
        'Domínio, hospedagem e banco ficam em contas suas, pagas direto ao fornecedor. Você enxerga cada centavo e não paga margem nossa em cima disso — muito projeto começa gastando só o domínio.',
    },
  ],
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faq = [
  {
    q: 'Quanto custa um site de vocês?',
    a: 'Não trabalhamos com tabela fixa, e isso é de propósito. O preço parte do tamanho do projeto — uma página de conversão e um sistema com painel e banco são trabalhos de ordens diferentes — e depois se ajusta ao momento do seu negócio. Quem está começando sozinho não paga o mesmo que uma empresa que já investe em anúncios e tem muito mais a ganhar com o resultado. Na prática: diga o que precisa e qual é a sua realidade, que a gente monta uma proposta que caiba. O valor sai por escrito antes de começar e não muda no meio do caminho.',
  },
  {
    q: 'Dá para começar pequeno e crescer depois?',
    a: 'Essa é a nossa recomendação na maioria dos casos. Começa por uma página que já traga contato, valida se o canal funciona pro seu negócio e só então investe em catálogo, painel ou sistema. Como o código é seu e a base é a mesma, a segunda etapa aproveita a primeira — você não paga duas vezes pelo mesmo alicerce.',
  },
  {
    q: 'Em quanto tempo fica pronto?',
    a: 'Landing page em 1 a 2 semanas. Site institucional de 2 a 4. Site com catálogo e painel simples, de 4 a 8 semanas. Sistema sob medida completo, de 8 a 16. Produto novo do zero roda por ciclos de 3 a 6 meses, com entrega toda semana.',
  },
  {
    q: 'Vocês fazem só o site ou também o texto e as imagens?',
    a: 'Fazemos o pacote. Estrutura e copy são parte do trabalho — não adianta site bonito com texto que não vende. Fotos e vídeos podem ser seus, de banco de imagens ou produzidos por nós (o Vitor é fotógrafo). Peças e produtos em 3D o Marcelo modela.',
  },
  {
    q: 'Preciso pagar mensalidade?',
    a: 'Para nós, não — manutenção mensal existe, mas é opcional, e o site continua no ar sem ela. O que sempre existe é o custo de infraestrutura, que você paga direto ao fornecedor, em contas suas: um site institucional roda dentro dos planos gratuitos e custa praticamente só o domínio (por volta de R$ 40 por ano). Sistema com banco, upload de fotos e chatbot é que passa a ter custo mensal de verdade, e a gente dimensiona isso com você antes de fechar.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'Metade na assinatura da proposta, metade na entrega. Projetos longos são divididos por etapas, cada uma com sua parcela — você paga acompanhando o que já está de pé, não confiando numa promessa. Se o prazo for apertado ou o caixa estiver curto, fale: parcelar é conversa normal aqui.',
  },
  {
    q: 'Consigo editar o conteúdo sozinho depois?',
    a: 'Sim. Todo conteúdo editável fica num arquivo só, comentado em português. Para quem prefere não mexer em código, entregamos um painel administrativo — foi o que fizemos na Buganza Imóveis.',
  },
  {
    q: 'Vocês atendem fora de Sorocaba?',
    a: 'Atendemos o Brasil inteiro, remoto. A maior parte dos projetos roda por WhatsApp e chamada de vídeo; reunião presencial é possível na região de Sorocaba/SP.',
  },
  {
    q: 'E se eu já tiver um site?',
    a: 'A gente avalia o que existe e diz honestamente se vale refazer ou melhorar. Migração de conteúdo, redirecionamentos e preservação do SEO já conquistado fazem parte do serviço.',
  },
  {
    q: 'Os projetos do catálogo são reais?',
    a: 'Os sistemas e sites de cliente são reais e estão no ar. Alguns cases — Sereno, Baltazar, TriAmici — são projetos conceituais de marcas fictícias, criados para demonstrar capacidade técnica e direção de arte. Cada card diz qual é qual, sem maquiagem.',
  },
]

/* ------------------------------------------------------------------ */
/* Contato                                                             */
/* ------------------------------------------------------------------ */

export const contato = {
  titulo: 'Conta o que você quer construir',
  texto:
    'Responder leva dois minutos. A gente volta no mesmo dia útil com uma primeira leitura do projeto — e, se fizer sentido, uma chamada de 30 minutos. Não temos tabela fixa: diga também qual é a sua realidade de orçamento, que a proposta sai desenhada para caber nela.',
  tipos: [
    'Landing page',
    'Site institucional',
    'Sistema com painel/catálogo',
    'Produto digital / startup',
    'Automação',
    'Modelagem 3D',
    'Ainda não sei',
  ],
  prazos: ['O quanto antes', 'Próximo mês', 'Em 2–3 meses', 'Só pesquisando'],
  sucesso: 'Recebido. A gente responde no seu WhatsApp em instantes.',
}

/* ------------------------------------------------------------------ */
/* Imagens (Unsplash — placeholders do conceito)                       */
/* ------------------------------------------------------------------ */

export const imagens = {
  og: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
  estudio: {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Dupla trabalhando lado a lado em frente a monitores',
  },
  processo: {
    src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=80',
    alt: 'Rabiscos de wireframe em papel sobre a mesa',
  },
}
