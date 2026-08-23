import { siteUrl } from '@/lib/site-url'

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
  // 55 (Brasil) + 15 (Sorocaba) + o número. Formato que o wa.me exige.
  whatsapp: '5515991023998',
  email: 'contato@romabuganza.com.br', // PLACEHOLDER
  instagram: '@romabuganza', // PLACEHOLDER
  instagramUrl: 'https://www.instagram.com/', // PLACEHOLDER
  github: 'https://github.com/romavitordev',
  linkedin: 'https://www.linkedin.com/in/romavitordev',
  // Vem de NEXT_PUBLIC_SITE_URL, definida no deploy — trocar de
  // endereço (ou entrar num domínio próprio) não mexe em código.
  url: siteUrl(),
  base: 'Sorocaba/SP — atendemos remoto no Brasil inteiro',
  fundacao: 2024,
}

/**
 * Navegação principal. Cada item aponta para uma SEÇÃO da home (`secao`)
 * e para uma PÁGINA dedicada (`href`).
 *
 * O header usa `secao` quando você já está na home — aí ele rola em vez
 * de trocar de rota, que é bem mais suave. Fora da home, e no rodapé e
 * na navbar do mobile, vale o `href`.
 */
export const nav = [
  { secao: 'projetos', href: '/#projetos', label: 'Projetos' },
  { secao: 'servicos', href: '/#servicos', label: 'Serviços' },
  { secao: 'plano-mensal', href: '/#plano-mensal', label: 'Plano mensal' },
  { secao: 'socios', href: '/#socios', label: 'Estúdio' },
  { secao: 'contato', href: '/#contato', label: 'Contato' },
]

/** Monta um link de WhatsApp com mensagem pré-preenchida. */
export function waLink(mensagem: string) {
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(mensagem)}`
}

export const waMensagens = {
  geral: `Oi! Vim pelo site da ${brand.nome} e quero conversar sobre um projeto.`,
  servico: (nome: string) =>
    `Oi! Vim pelo site da ${brand.nome}. Tenho interesse em ${nome} — pode me explicar como funciona?`,
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
    papel: 'Desenvolvimento',
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
    papel: 'Desenvolvimento',
    resumo: 'Constrói o produto e enxerga onde ele vende.',
    bio:
      'Desenvolvedor do estúdio, mão a mão com o Vitor no código que vai pro ar. Soma a isso uma leitura afiada de mercado — entende o negócio do cliente e o que precisa aparecer primeiro na tela — e modela em 3D quando o projeto pede produto renderizado.',
    faz: [
      'Desenvolvimento web (Next.js, React, TypeScript)',
      'Back-end, banco e integrações',
      'Diagnóstico de negócio e posicionamento',
      'Modelagem e visualização 3D de produtos',
    ],
    /*
      Vazio de propósito, e não com um link genérico.
      Havia um `linkedin.com` aqui que caía na home do LinkedIn — link
      quebrado numa apresentação pessoal é pior que botão nenhum, porque
      quem clica interpreta como descuido.

      Os perfis do estúdio (não pessoais) entram aqui quando existirem;
      o card já lida com a lista vazia.
    */
    links: [],
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
      '30 dias de ajuste incluso. A partir daí entra o plano mensal: a gente continua cuidando do site enquanto você cuida do negócio.',
    duracao: 'contínuo',
  },
]

/* ------------------------------------------------------------------ */
/* Plano mensal (manutenção e gestão)                                  */
/* ------------------------------------------------------------------ */

export const manutencao = {
  kicker: 'Depois do lançamento',
  titulo: 'Site no ar é começo, não linha de chegada',
  texto:
    'A entrega é o dia em que o site passa a existir — e a partir dali ele precisa de alguém. Navegador atualiza, dependência fica desatualizada, o Google muda critério, aparece um bug que ninguém previu, e o seu negócio muda: entra serviço novo, muda preço, muda o time. O plano mensal é a gente continuar responsável por tudo isso.',
  argumento:
    'É opcional, e vai continuar sendo — o código é seu e o site não para se você não assinar. Mas quase todo cliente fica, e por um motivo prático: ninguém abre uma empresa para virar administrador de site. Sai mais barato manter do que consertar depois de seis meses largado.',

  inclui: [
    {
      titulo: 'Chamada mensal',
      texto:
        'Meia hora todo mês para olhar os números, ouvir o que mudou no negócio e decidir juntos o que ajustar no site. É aqui que a maioria das boas ideias aparece.',
    },
    {
      titulo: 'Atualizações de conteúdo',
      texto:
        'Preço novo, serviço novo, foto nova, texto que envelheceu. Você manda no WhatsApp, a gente publica — sem abrir código, sem esperar orçamento.',
    },
    {
      titulo: 'Correção de bugs',
      texto:
        'Apareceu erro, formulário parou, layout quebrou em algum aparelho: entra na fila com prioridade e sem custo extra.',
    },
    {
      titulo: 'Segurança e dependências',
      texto:
        'Framework, bibliotecas e certificados atualizados antes de virarem problema. Site parado é site que vai ficando vulnerável.',
    },
    {
      titulo: 'Monitoramento e backup',
      texto:
        'A gente sabe que o site caiu antes de você. Backup do banco e do conteúdo rodando, com restauração testada.',
    },
    {
      titulo: 'Domínio e hospedagem inclusos',
      texto:
        'Não vêm como custo à parte: estão dentro da mensalidade. Renovação de domínio, certificado, hospedagem e banco por nossa conta — inclusive escolher o fornecedor que faz sentido pro seu caso, da Vercel à Hostinger.',
    },
  ],

  /** Comparativo honesto — o que muda no dia a dia. */
  semPlano: [
    'Cada ajuste vira orçamento e entra na fila',
    'Você descobre que o site caiu pelo cliente que ligou',
    'Atualização de segurança só quando alguém lembra',
    'Domínio e hospedagem por sua conta, com a renovação na sua agenda',
    'Depois de um ano, o site parece um ano mais velho',
  ],
  comPlano: [
    'Ajuste pedido no WhatsApp, publicado sem orçamento novo',
    'A gente monitora e age antes de você perceber',
    'Dependências e certificados sempre em dia',
    'Domínio e hospedagem inclusos — uma conta só',
    'O site evolui junto com o negócio, mês a mês',
  ],

  /** Três níveis, pelo tamanho do que precisa ser cuidado. */
  niveis: [
    {
      nome: 'Essencial',
      para: 'Landing pages e sites institucionais',
      itens: ['Uptime e backup', 'Pequenas correções', 'Ajustes de conteúdo no mês', 'Chamada mensal'],
    },
    {
      nome: 'Catálogo',
      para: 'Sites com catálogo e painel',
      itens: ['Tudo do Essencial', 'Suporte a quem usa o painel', 'Atualizações de plataforma', 'Acompanhamento de métricas'],
    },
    {
      nome: 'Sistema',
      para: 'Sistemas sob medida e produtos',
      itens: ['Tudo do Catálogo', 'Monitoramento ativo', 'Rotina de segurança', 'Evoluções pequenas todo mês'],
    },
  ],

  nota: 'Domínio e hospedagem estão inclusos nos três níveis. O valor é fechado junto com o projeto, pelo mesmo critério do orçamento: tamanho do que precisa ser cuidado e porte do negócio. Já tem hospedagem contratada? A gente publica lá e tira a infra da conta. Sem fidelidade: cancele quando quiser, levando o código.',
}

/* ------------------------------------------------------------------ */
/* Números & stack                                                     */
/* ------------------------------------------------------------------ */

export const numeros = [
  { valor: 12, sufixo: '+', label: 'projetos entregues' },
  { valor: 2, sufixo: '', label: 'sócios — sem intermediário' },
  { valor: 100, sufixo: '%', label: 'do código entregue a você' },
  { valor: 30, sufixo: ' dias', label: 'de ajuste incluso' },
]

/**
 * Ferramentas agrupadas por camada. A home mostra a fita corrida
 * (`stackFlat`); /estudio mostra agrupado, que é onde o cliente técnico
 * vai procurar se a gente domina o que ele já usa.
 */
export const stack = [
  {
    grupo: 'Interface',
    itens: [
      { nome: 'Next.js', nota: 'App Router, SSR e static export' },
      { nome: 'React', nota: 'componentes reaproveitáveis' },
      { nome: 'TypeScript', nota: 'tipagem ponta a ponta' },
      { nome: 'Tailwind CSS', nota: 'design system em tokens' },
      { nome: 'GSAP + Lenis', nota: 'movimento e scroll suave' },
      { nome: 'Framer Motion', nota: 'transições de interface' },
      { nome: 'HTML + CSS + JS', nota: 'quando não vale um framework' },
    ],
  },
  {
    grupo: 'Servidor e dados',
    itens: [
      { nome: 'Node.js', nota: 'APIs e serviços' },
      { nome: 'Express', nota: 'back-end desacoplado' },
      { nome: 'Prisma', nota: 'modelagem e migrações' },
      { nome: 'PostgreSQL', nota: 'o padrão da casa' },
      { nome: 'SQL Server', nota: 'quando a empresa já roda nele' },
      { nome: 'MySQL', nota: 'comum em hospedagem compartilhada' },
      { nome: 'Zod', nota: 'validação compartilhada front/back' },
    ],
  },
  {
    grupo: 'Hospedagem e infra',
    itens: [
      { nome: 'Vercel', nota: 'deploy e preview por branch' },
      { nome: 'Hostinger', nota: 'hospedagem e e-mail próprio' },
      { nome: 'VPS Ubuntu', nota: 'controle total, sem lock-in' },
      { nome: 'Nginx + PM2', nota: 'proxy reverso e processos de pé' },
      { nome: 'Registro.br', nota: 'domínio .com.br' },
      { nome: 'Supabase', nota: 'banco, storage e auth' },
      { nome: 'Neon', nota: 'Postgres gerenciado' },
      { nome: 'Cloudflare', nota: 'DNS, cache e proteção' },
      { nome: 'GitHub Actions', nota: 'CI e deploy automático' },
    ],
  },
  {
    grupo: 'Integrações',
    itens: [
      { nome: 'WhatsApp', nota: 'conversão com mensagem pronta' },
      { nome: 'Resend', nota: 'e-mail transacional' },
      { nome: 'SMTP', nota: 'envio pelo servidor do cliente' },
      { nome: 'Google Maps', nota: 'localização e rotas' },
      { nome: 'Google Analytics', nota: 'medição de tráfego' },
      { nome: 'Meta Pixel', nota: 'remarketing e campanhas' },
      { nome: 'Mercado Pago', nota: 'checkout e assinatura' },
      { nome: 'OpenAI', nota: 'chatbot e recursos de IA' },
    ],
  },
  {
    grupo: 'Automação',
    itens: [
      { nome: 'Python', nota: 'automação e coleta de dados' },
      { nome: 'Selenium', nota: 'navegador controlado por script' },
      { nome: 'Pandas', nota: 'tratamento de planilhas e dados' },
      { nome: 'Cron / agendadores', nota: 'rotinas no horário certo' },
    ],
  },
  {
    grupo: 'Design e 3D',
    itens: [
      { nome: 'Blender', nota: 'modelagem e render 3D' },
      { nome: 'Figma', nota: 'protótipo antes do código' },
      { nome: 'Fotografia', nota: 'imagem própria, sem banco genérico' },
      { nome: 'Impressão 3D', nota: 'da peça digital ao objeto' },
    ],
  },
]

/** Lista corrida, para a fita da home. */
export const stackFlat = stack.flatMap((g) => g.itens)

/**
 * Recado importante junto da stack: a escolha de plataforma é do
 * cliente, não nossa. Muita gente já tem hospedagem contratada.
 */
export const stackNota =
  'Essa é a caixa de ferramentas, não uma imposição. Se você já tem hospedagem na Hostinger, domínio em outro registrador ou banco rodando em SQL Server, a gente trabalha em cima do que existe — e diz com franqueza quando trocar vale mais a pena do que manter.'

/* ------------------------------------------------------------------ */
/* Manifesto                                                           */
/* ------------------------------------------------------------------ */

export const manifesto = {
  titulo: 'Dois sócios, nenhuma camada no meio',
  texto:
    'Agência grande te vende um diretor de contas e te entrega um estagiário. Aqui quem atende é quem faz: dois desenvolvedores, os dois com a mão no código do seu projeto. Você fala com quem está construindo, do orçamento ao deploy.',
  /**
   * Cada ponto é um contraste contra a praxe do mercado — isso já estava
   * no texto ("não temos tabela fixa", "sem refém de plataforma", "não
   * são extra"). O campo `comum` só extrai esse lado para o design poder
   * mostrar os dois, em vez de esconder a retórica dentro do parágrafo.
   */
  pontos: [
    {
      comum: 'tabela de preços fixa',
      titulo: 'Orçamento sob medida',
      texto:
        'O preço nasce do tamanho do projeto e do momento do seu negócio — um autônomo começando e uma empresa que já investe em anúncios não pagam o mesmo pelo mesmo trabalho.',
    },
    {
      comum: 'valor que cresce no meio',
      titulo: 'Preço fechado, escopo escrito',
      texto:
        'Fechado o valor, ele não muda. O que está e o que não está incluso sai por escrito na proposta. Se o escopo crescer, a gente conversa antes — nunca depois da fatura.',
    },
    {
      comum: 'site refém da plataforma',
      titulo: 'O código é seu',
      texto:
        'Repositório entregue no fim do projeto. Sem fidelidade: se um dia quiser seguir sem a gente, leva tudo e o site continua no ar.',
    },
    {
      comum: 'chamar o fornecedor pra trocar um preço',
      titulo: 'Conteúdo que você edita',
      texto:
        'Textos, preços e imagens centralizados num arquivo só. Trocar o cardápio ou a tabela de preços não exige nos chamar.',
    },
    {
      comum: 'performance cobrada à parte',
      titulo: 'Rápido de verdade',
      texto:
        'Performance e acessibilidade entram no orçamento base. Site lento perde venda e some do Google.',
    },
    {
      comum: 'três boletos de fornecedores diferentes',
      titulo: 'Uma conta só, sem surpresa',
      texto:
        'No plano mensal, domínio e hospedagem entram inclusos. Você não descobre no susto que o domínio venceu — é uma mensalidade e o site fica no ar.',
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
    a: 'Obrigatório não é: o código é seu e você pode levar o site embora quando quiser. Mas recomendamos com convicção, e quase todo cliente fica — porque com o plano o site deixa de ser mais uma coisa na sua cabeça. Domínio e hospedagem entram inclusos, então é uma conta só, sem cobrança pingando de três fornecedores. A gente monitora, faz backup, mantém segurança e dependências em dia, corrige bug sem cobrar à parte, publica as atualizações que você pedir pelo WhatsApp e senta com você meia hora por mês para decidir o próximo passo. Sem o plano, cada ajuste vira orçamento novo, a renovação do domínio passa a ser sua responsabilidade, e site largado envelhece rápido. Sem fidelidade: cancele quando quiser.',
  },
  {
    q: 'O que exatamente entra no plano mensal?',
    a: 'Domínio e hospedagem inclusos, chamada mensal de meia hora, atualizações de conteúdo (preço, serviço, foto, texto), correção de bugs com prioridade e sem custo extra, atualização de segurança e dependências, monitoramento com aviso antes de você perceber que caiu, e backup com restauração testada. O nível do plano acompanha o tamanho do que precisa ser cuidado: um site institucional dá muito menos trabalho — e consome muito menos infraestrutura — que um sistema com banco, upload de fotos e chatbot.',
  },
  {
    q: 'Posso usar minha hospedagem atual?',
    a: 'Pode. Se você já tem plano na Hostinger, domínio em outro registrador ou servidor da empresa, a gente publica lá e trabalha com o que existe — nesse caso a infra sai do plano e você segue pagando direto ao seu fornecedor. Quando não há nada contratado, a escolha é nossa e entra incluso: Vercel, Hostinger ou VPS, conforme o projeto pedir. A gente explica o porquê da escolha em vez de simplesmente apontar um nome.',
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

/**
 * Só o cartão social sobrou aqui.
 *
 * `estudio` e `processo` foram removidos: as páginas que os usavam
 * viraram seções na consolidação, e as duas entradas ficaram declaradas
 * com ZERO usos — dado morto que o próximo a abrir o arquivo tentaria
 * entender.
 */
export const imagens = {
  og: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
}
