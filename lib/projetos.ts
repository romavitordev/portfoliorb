/**
 * Catálogo de projetos — o "produto" do estúdio.
 * ---------------------------------------------------------------
 * Cada item vira um card em /projetos e uma página de case em
 * /projetos/[slug]. Para adicionar um projeto novo, basta acrescentar
 * um objeto neste array — rota, sitemap e filtros se atualizam sozinhos.
 *
 * `natureza` é o compromisso de honestidade do catálogo:
 *   - 'cliente'  → projeto real, contratado, no ar
 *   - 'proprio'  → produto ou site do próprio estúdio
 *   - 'conceito' → marca fictícia ou site-proposta, feito para
 *                  demonstrar capacidade técnica e direção de arte
 *
 * IMAGENS: os `src` abaixo são placeholders temáticos do Unsplash.
 * Troque por capturas reais em /public/projetos/<slug>.webp quando tiver.
 */

export type Natureza = 'cliente' | 'proprio' | 'conceito'
export type Categoria = 'sistema' | 'site' | 'landing' | 'produto' | 'automacao'

export type Projeto = {
  slug: string
  nome: string
  cliente: string
  categoria: Categoria
  natureza: Natureza
  ano: number
  /** Frase de card — uma linha, sem ponto final. */
  resumo: string
  /** Parágrafo de abertura do case. */
  intro: string
  desafio: string
  solucao: string
  /** Números ou fatos verificáveis. Opcional. */
  resultados?: string[]
  destaques: { titulo: string; texto: string }[]
  stack: string[]
  papel: string[]
  repo?: string
  demo?: string
  imagem: string
  imagemAlt: string
  /** Aparece na home, na seção de destaques. */
  emDestaque: boolean
}

export const rotulosCategoria: Record<Categoria, string> = {
  sistema: 'Sistema',
  site: 'Site',
  landing: 'Landing page',
  produto: 'Produto',
  automacao: 'Automação',
}

export const rotulosNatureza: Record<Natureza, string> = {
  cliente: 'Cliente',
  proprio: 'Próprio',
  conceito: 'Conceito',
}

export const projetos: Projeto[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: 'marcelo-imoveis',
    nome: 'Marcelo Imóveis',
    cliente: 'Marcelo Imóveis — Sorocaba/SP · CRECI 118400',
    categoria: 'sistema',
    natureza: 'cliente',
    ano: 2026,
    resumo: 'Catálogo imobiliário com painel administrativo, 2FA e chatbot',
    intro:
      'O projeto mais completo do estúdio: um catálogo imobiliário de ponta a ponta, com área pública de busca, painel de corretor protegido e conversão inteira via WhatsApp.',
    desafio:
      'Uma imobiliária precisa publicar imóveis rápido, sem depender de desenvolvedor, e sem vazar informação interna. O corretor cadastra fotos pelo celular, na rua. E cada visita perdida por página lenta é dinheiro na mesa.',
    solucao:
      'Next.js 14 com App Router: rotas públicas estáticas e revalidadas para velocidade, e um painel administrativo separado com login em cookie httpOnly e segundo fator por TOTP. As fotos vão para o Supabase Storage, comprimidas no navegador antes do upload. Toda conversão desemboca no WhatsApp com mensagem já preenchida com o código do imóvel.',
    resultados: [
      'Preço interno do corretor jamais é serializado na rota pública — a API usa um DTO com allowlist explícita',
      'Upload comprimido no cliente: fotos de celular entram no catálogo em segundos, mesmo em 4G',
      'Painel mede acesso por imóvel e pontua a qualidade de cada anúncio',
    ],
    destaques: [
      {
        titulo: 'Painel com 2FA',
        texto:
          'Login em JWT (jose) dentro de cookie httpOnly com validade de 8h, mais segundo fator TOTP compatível com qualquer app autenticador. Rate limit nas rotas sensíveis.',
      },
      {
        titulo: 'CRUD completo de imóveis',
        texto:
          'Cadastro, edição, duplicação, ordenação de fotos, vídeo do YouTube, comodidades e limites de mídia. Slug e código gerados automaticamente.',
      },
      {
        titulo: 'Chatbot que aprende',
        texto:
          'Responde sobre o imóvel, sobre a região e sobre a imobiliária. As perguntas sem resposta viram fila de aprendizado no painel.',
      },
      {
        titulo: 'Leads e métricas',
        texto:
          'Cada contato é registrado com origem, e o painel mostra o tráfego por imóvel — o corretor vê o que está sendo procurado de verdade.',
      },
      {
        titulo: 'Busca e favoritos',
        texto:
          'Filtros por tipo, bairro, faixa de preço e quartos, lista de favoritos no navegador e sugestão de imóveis semelhantes na página de detalhe.',
      },
    ],
    stack: ['Next.js 14', 'TypeScript', 'Prisma', 'PostgreSQL (Neon)', 'Supabase Storage', 'Tailwind CSS', 'Vitest'],
    papel: ['Arquitetura', 'Back-end e banco', 'Front-end', 'Painel administrativo', 'Deploy'],
    repo: 'https://github.com/romavitordev/buganza_imoveis',
    demo: 'https://romavitordev.github.io/layout_buganza/',
    imagem: '/projetos/marcelo-imoveis.webp',
    imagemAlt:
      'Tela inicial do site Marcelo Imóveis, com skyline noturno ilustrado e a chamada "Seu Imóvel, Sem Complicação"',
    emDestaque: true,
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'fisgou',
    nome: 'Fisgou',
    cliente: 'Produto do estúdio',
    categoria: 'produto',
    natureza: 'proprio',
    ano: 2026,
    resumo: 'Rede social e ecossistema da pesca esportiva, do zero ao MVP',
    intro:
      'Um produto inteiro criado do zero: a plataforma que quer ser para o pescador o que o LinkedIn é para o profissional. Feed, perfis, pesqueiros, lojas, mensagens, moderação.',
    desafio:
      'A pesca esportiva move um mercado grande e espalhado — pescadores, pesqueiros, lojas, criadores de conteúdo — sem nenhum lugar comum. Construir uma rede social inteira é caro; construir a errada é mais caro ainda.',
    solucao:
      'Recortamos um MVP em torno da jornada real de uma pescaria (antes, durante e depois) e montamos um monorepo pnpm com Next.js 14. Primeiro a versão navegável com dados mockados, para validar telas e fluxo sem custo de back-end; depois as APIs por cima da mesma casca.',
    destaques: [
      {
        titulo: 'Feed e publicações',
        texto:
          'Posts com foto, curtida, comentário com curtida própria, enquetes, stories e verificação de captura pela comunidade.',
      },
      {
        titulo: 'Perfis e social',
        texto:
          'Handle público, seguir/deixar de seguir, salvos, curtidas, arquivados, notificações e preferências por usuário.',
      },
      {
        titulo: 'Pesqueiros e lojas',
        texto:
          'Diretórios com página própria, check-in em pesqueiro e vitrine de lojas parceiras — as duas pontas que monetizam.',
      },
      {
        titulo: 'Mensagens diretas',
        texto: 'Conversas com contador de não lidas, marcação de leitura e histórico paginado.',
      },
      {
        titulo: 'Moderação',
        texto: 'Fila de revisão e painel próprio — porque conteúdo aberto sem moderação não sobrevive ao primeiro mês.',
      },
    ],
    stack: ['Next.js 14', 'TypeScript', 'Monorepo pnpm', 'Tailwind CSS', 'API Routes', 'Upload de mídia'],
    papel: ['Definição de produto', 'Arquitetura do monorepo', 'Front-end', 'API', 'Design system'],
    repo: 'https://github.com/romavitordev/fisgou',
    demo: 'https://romavitordev.github.io/fisgou_layout/',
    imagem: '/projetos/fisgou.webp',
    imagemAlt:
      'Tela inicial do Fisgou, com a chamada sobre registrar fisgadas e os cartões de feed, coleção, capturas e mapa',
    emDestaque: true,
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'tri-amici',
    nome: 'Tri Amici Photography Academy',
    cliente: 'Tri Amici — Sorocaba/SP',
    categoria: 'site',
    natureza: 'cliente',
    ano: 2026,
    resumo: 'Site institucional de academia de fotografia, com API e VPS própria',
    intro:
      'Site institucional de uma academia de fotografia, com front separado do back e infraestrutura rodando em servidor próprio — não em plataforma gerenciada.',
    desafio:
      'Uma escola de fotografia vende pelo olho: o site precisa ser bonito o bastante para provar que ali se ensina imagem. Ao mesmo tempo, precisa capturar matrículas e disparar e-mail de forma confiável.',
    solucao:
      'Front-end em Next.js 14 com GSAP, Lenis e Swiper para a parte visual, e um back-end Express em TypeScript com validação por Zod e envio transacional via Resend. Banco PostgreSQL e publicação em VPS Ubuntu com Nginx e PM2.',
    destaques: [
      {
        titulo: 'Monorepo front + back',
        texto: 'Workspaces npm separando `frontend` e `backend`, cada um com seu ciclo de deploy.',
      },
      {
        titulo: 'Formulários validados de ponta a ponta',
        texto: 'Schemas Zod compartilhados: o que o formulário aceita é exatamente o que a API aceita.',
      },
      {
        titulo: 'Infra em VPS',
        texto:
          'Ubuntu 24, Nginx como proxy reverso e PM2 mantendo o processo de pé — controle total, sem lock-in de plataforma.',
      },
      {
        titulo: 'Galeria em movimento',
        texto: 'Carrosséis Swiper e reveals GSAP sincronizados com scroll suave do Lenis.',
      },
    ],
    stack: ['Next.js 14', 'TypeScript', 'Express', 'Zod', 'PostgreSQL', 'Resend', 'Nginx', 'PM2'],
    papel: ['Front-end', 'API', 'Banco', 'Infraestrutura e deploy'],
    repo: 'https://github.com/romavitordev/TriAmici',
    demo: 'https://romavitordev.github.io/layout_triamici/',
    imagem: '/projetos/tri-amici.webp',
    imagemAlt:
      'Tela inicial da Tri Amici Photography Academy, com uma câmera em close e a chamada "Fotografia que muda"',
    emDestaque: true,
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'rafael-pedroso-advocacia',
    nome: 'Rafael Pedroso Advocacia',
    cliente: 'Peça conceitual — advocacia',
    categoria: 'landing',
    natureza: 'conceito',
    ano: 2026,
    resumo: 'Landing page jurídica com triagem de leads, LGPD e painel protegido',
    intro:
      'Não é só um site de advogado: é uma ferramenta de captação com triagem, conformidade de dados e um back-end que garante que nenhum contato se perca.',
    desafio:
      'Advocacia lida com dado sensível. O site precisa transmitir autoridade, respeitar a LGPD antes de coletar qualquer informação e ainda assim converter — sem parecer landing page de infoproduto.',
    solucao:
      'Landing de alta conversão com avisos de sigilo e LGPD antes do formulário, API em Node/Express fazendo triagem por área do direito e modalidade de atendimento, e persistência em SQL Server. Se a API cair, o formulário desvia o contato direto para o WhatsApp.',
    resultados: [
      'Rate limit e honeypot barram spam sem CAPTCHA no caminho do cliente',
      'Consentimento explícito gravado junto de cada contato',
      'Schema JSON-LD de serviço jurídico — o Google entende o que a página é',
    ],
    destaques: [
      {
        titulo: 'Triagem inteligente',
        texto:
          'O formulário coleta área do direito e modalidade de atendimento, então o advogado chega na consulta já preparado.',
      },
      {
        titulo: 'Conformidade LGPD',
        texto: 'Política de privacidade, termos de uso e aviso de sigilo integrados ao fluxo, não escondidos no rodapé.',
      },
      {
        titulo: 'Fallback de contato',
        texto: 'Falha de servidor não vira lead perdido: o visitante é redirecionado ao WhatsApp automaticamente.',
      },
      {
        titulo: 'Painel por chave de API',
        texto: 'Rotas administrativas protegidas para consultar agendamentos e contatos com segurança.',
      },
      {
        titulo: 'Tema claro/escuro',
        texto: 'Transição cinematográfica entre temas, com preferência preservada.',
      },
    ],
    stack: ['HTML/CSS/JS', 'Node.js', 'Express', 'SQL Server', 'SMTP', 'JSON-LD'],
    papel: ['Copy e estrutura', 'Front-end', 'API', 'Banco', 'SEO técnico'],
    repo: 'https://github.com/romavitordev/portfolioadv_rafael',
    demo: 'https://romavitordev.github.io/portfolioadv_rafael/',
    imagem: '/projetos/rafael-pedroso-advocacia.webp',
    imagemAlt:
      'Tela inicial do site de Rafael Pedroso Advocacia, com o nome em destaque e botões de agendamento',
    emDestaque: false,
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'baltazar-burger',
    nome: 'Baltazar Burger',
    cliente: 'Baltazar Burger — Sorocaba/SP',
    categoria: 'site',
    natureza: 'conceito',
    ano: 2026,
    resumo: 'Site-experiência para hamburgueria artesanal, com fogo em movimento',
    intro:
      'Proposta de site-experiência para uma hamburgueria de brasa: escuro, quente e cinematográfico, com o cardápio inteiro editável num arquivo só.',
    desafio:
      'Hamburgueria boa costuma ter site ruim — cardápio em imagem, link de delivery perdido e zero personalidade. O desafio era fazer o site ter a mesma temperatura que a comida.',
    solucao:
      'Next.js 14 com um sistema de movimento próprio: preloader, cortina de transição entre rotas, fagulhas subindo, halos de brasa e grão de filme sobre tudo. Preços e cardápio centralizados em `lib/site.ts`, com dados estruturados de restaurante gerados automaticamente a partir deles.',
    destaques: [
      {
        titulo: 'Sistema de movimento',
        texto:
          'Tokens de duração e easing num arquivo único (`lib/design.ts`), consumidos por Framer Motion, GSAP e CSS — o site inteiro anima no mesmo ritmo.',
      },
      {
        titulo: 'Cardápio como dado',
        texto:
          'O cardápio é um array TypeScript. Ele alimenta a página, os destaques da home e o JSON-LD de `Menu` do Google ao mesmo tempo.',
      },
      {
        titulo: 'Status em tempo real',
        texto: 'O site sabe se a loja está aberta agora e muda a chamada principal de acordo.',
      },
      {
        titulo: 'Acessibilidade sem abrir mão do efeito',
        texto:
          'Todo o movimento pesado é desligado em `prefers-reduced-motion`, e o contraste dos textos foi corrigido para AA.',
      },
    ],
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Lenis', 'Framer Motion'],
    papel: ['Direção de arte', 'Copy', 'Front-end', 'Sistema de design'],
    repo: 'https://github.com/romavitordev/baltazarburger_lndpage',
    demo: 'https://romavitordev.github.io/layout_baltazar/',
    imagem: '/projetos/baltazar-burger.webp',
    imagemAlt:
      'Tela inicial da Baltazar Grilled Burger, com o nome em caixa alta sobre fundo de brasa',
    emDestaque: true,
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'sereno-cafe',
    nome: 'Sereno — café & torrefação',
    cliente: 'Marca fictícia — projeto conceitual',
    categoria: 'site',
    natureza: 'conceito',
    ano: 2026,
    resumo: 'Site-experiência de microtorrefação, com hero em vídeo e scroll narrativo',
    intro:
      'Um exercício de direção de arte: marca inventada do zero — nome, tom de voz, cardápio, grãos, assinatura — para mostrar até onde vai um site quando ninguém segura a mão.',
    desafio:
      'Provar que o estúdio consegue criar não só o site, mas a marca inteira em volta dele: naming, copy, cardápio, storytelling de produto e identidade visual.',
    solucao:
      'Hero em vídeo controlado por scroll, seção pinada narrando a jornada do grão (fazenda → torra → xícara), som ambiente opcional e um clube de assinatura completo. Todo o conteúdo — inclusive a história de cada bebida — vive num único arquivo comentado.',
    destaques: [
      {
        titulo: 'Marca criada do zero',
        texto: 'Nome, tagline, tom de voz, cardápio com história por item, três grãos com ficha completa e clube de assinatura.',
      },
      {
        titulo: 'Jornada do grão',
        texto: 'Seção pinada com GSAP ScrollTrigger: três atos que avançam conforme você rola.',
      },
      {
        titulo: 'Hero em vídeo por scroll',
        texto: 'O vídeo avança de acordo com a posição da página, não com o tempo — e cai para imagem em conexões lentas.',
      },
      {
        titulo: 'Reserva por WhatsApp',
        texto: 'Modal de reserva que monta a mensagem pronta com nome, data, horário e número de pessoas.',
      },
    ],
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Lenis', 'Framer Motion', 'OGL'],
    papel: ['Naming e identidade', 'Copy', 'Direção de arte', 'Front-end'],
    repo: 'https://github.com/romavitordev/serenocafe_lndpage',
    demo: 'https://romavitordev.github.io/layout_serenocafe/',
    imagem: '/projetos/sereno-cafe.webp',
    imagemAlt:
      'Tela inicial do Sereno café & torrefação, com xícara fotografada e a frase "O instante antes do dia começar"',
    emDestaque: true,
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'roma-fotografias',
    nome: 'Roma Fotografias',
    cliente: 'Vitor Roma — fotografia',
    categoria: 'site',
    natureza: 'proprio',
    ano: 2026,
    resumo: 'Portfólio fotográfico com galerias por tema, em HTML puro e ultrarrápido',
    intro:
      'O portfólio fotográfico do Vitor. Sem framework, sem build: HTML, CSS e JavaScript puros — porque um site de imagem só precisa carregar rápido e sair da frente.',
    desafio:
      'Galerias com muita imagem pesada costumam ser lentas. E portfólio de fotógrafo não pode ter interface competindo com a foto.',
    solucao:
      'Estrutura estática com uma página por tema (retratos, arquitetura, natureza, automotivo), carregamento sob demanda das imagens e uma interface que praticamente desaparece. Sitemap e robots configurados na mão.',
    destaques: [
      { titulo: 'Zero dependência', texto: 'HTML, CSS e JS puros. Carrega em qualquer conexão e nunca quebra por update de pacote.' },
      { titulo: 'Galerias por tema', texto: 'Quatro coleções com capa própria: retratos, arquitetura, natureza e automotivo.' },
      { titulo: 'SEO na mão', texto: 'Sitemap, robots.txt e metadados escritos manualmente, sem plugin.' },
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
    papel: ['Fotografia', 'Design', 'Front-end'],
    repo: 'https://github.com/romavitordev/romafotografias',
    demo: 'https://romavitordev.github.io/romafotografias/',
    imagem: '/projetos/roma-fotografias.webp',
    imagemAlt:
      'Tela inicial do site Vitor Roma Fotografias, com foto autoral em tela cheia',
    emDestaque: false,
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'motor-de-reservas',
    nome: 'Leads — Motor de Reservas',
    cliente: 'Produto do estúdio',
    categoria: 'sistema',
    natureza: 'proprio',
    ano: 2026,
    resumo: 'SaaS que acha empresas sem presença digital e as reserva com exclusividade',
    intro:
      'Um SaaS que varre empresas brasileiras com presença digital falha — sem site, sem WhatsApp, nota baixa, perfil incompleto — e entrega cada uma como lead exclusivo para quem vende esses serviços. Não vende lista: vende o direito de manter N empresas reservadas só para você.',
    desafio:
      'Lista de leads é commodity: a mesma empresa é vendida para dez pessoas e ninguém fecha. O produto só tem valor se a exclusividade for real — e exclusividade real é problema de banco de dados, não de promessa comercial. Duas pessoas pedindo a mesma empresa no mesmo instante não podem levar as duas.',
    solucao:
      'Um motor de alocação com seis regras — piso de disponibilidade, teto de concentração, cooldown, cláusula de uso, transação e paridade — que decide quem fica com o quê. A reserva acontece dentro de uma transação: ou é sua, ou não existe. Um job periódico expira o que não foi trabalhado, senão a trava anti-acaparamento existiria só no papel.',
    destaques: [
      {
        titulo: 'Exclusividade que é transação, não promessa',
        texto:
          'A alocação roda dentro de uma transação de banco. Se duas requisições disputam a mesma empresa, uma ganha e a outra recebe negativa — nunca as duas.',
      },
      {
        titulo: '108 testes, com uma suíte só de segurança',
        texto:
          'Oito arquivos cobrindo regra de negócio, migração, limite de taxa e admin. A suíte de segurança prova que ataques específicos falham, em vez de afirmar que o sistema é seguro.',
      },
      {
        titulo: 'Limite de taxa que sobrevive a vários processos',
        texto:
          'Em produção o contador vive no Redis. Sem ele, o limite valeria por processo — com quatro workers, o teto real viraria quatro vezes o configurado. A aplicação avisa no boot quando está nesse modo.',
      },
      {
        titulo: 'Schema versionado, nunca improvisado',
        texto:
          'As tabelas vêm de migrações Alembic, e não de um create_all. É o que permite mudar o banco em produção sem perder dado nem adivinhar em que estado ele está.',
      },
    ],
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'Redis', 'React', 'TypeScript'],
    papel: ['Produto', 'Back-end', 'Front-end', 'Banco de dados'],
    repo: 'https://github.com/romavitordev/local-business-scraper',
    demo: 'https://romavitordev.github.io/local_bnss_layout/',
    imagem: '/projetos/motor-de-reservas.webp',
    imagemAlt:
      'Tela inicial do Leads, com a chamada "Empresas sem site, reservadas só para você"',
    emDestaque: false,
  },
]

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function projetoPorSlug(slug: string) {
  return projetos.find((p) => p.slug === slug)
}

export const projetosDestaque = projetos.filter((p) => p.emDestaque)

/** Categorias presentes no catálogo, na ordem em que devem aparecer no filtro. */
export const categoriasDisponiveis = (['sistema', 'produto', 'site', 'landing', 'automacao'] as Categoria[]).filter(
  (c) => projetos.some((p) => p.categoria === c),
)

/** Próximo/anterior do catálogo, para navegar entre cases sem voltar à lista. */
export function vizinhos(slug: string) {
  const i = projetos.findIndex((p) => p.slug === slug)
  if (i < 0) return { anterior: undefined, proximo: undefined }
  return {
    anterior: i > 0 ? projetos[i - 1] : projetos[projetos.length - 1],
    proximo: i < projetos.length - 1 ? projetos[i + 1] : projetos[0],
  }
}
