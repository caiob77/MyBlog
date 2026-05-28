export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  image: string;
  href?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "cafe-system",
    title: "Cafe System",
    description:
      "SaaS multi-tenant para operacao de cafes da manha, com pedidos, cardapio, cozinha, caixa, relatorios e agente local de impressao.",
    stack: ["Fastify", "Next.js", "PostgreSQL", "Prisma", "Turborepo"],
    image: "/images/projects/cafe-system.webp",
    repo: "https://github.com/caiob77/cafe-system",
  },
  {
    slug: "lifefit-frontend",
    title: "LifeFit Frontend",
    description:
      "Interface da plataforma Fit.ai, com onboarding por chat, treino do dia, estatisticas de consistencia e personal trainer com IA.",
    stack: ["Next.js", "React", "Tailwind", "better-auth", "AI SDK"],
    image: "/images/projects/lifefit-frontend.webp",
    repo: "https://github.com/caiob77/LifeFit-FrontEnd",
  },
  {
    slug: "lifefit-api",
    title: "LifeFit API",
    description:
      "Backend da Fit.ai com planos de treino, sessoes, estatisticas, autenticacao Google OAuth e chat com IA em streaming.",
    stack: ["Fastify", "TypeScript", "Prisma", "PostgreSQL", "Zod"],
    image: "/images/projects/lifefit.webp",
    repo: "https://github.com/caiob77/LifeFit-Api",
  },
  {
    slug: "juriai",
    title: "JuriAI",
    description:
      "Sistema juridico com IA para chat com RAG, analise de documentos, secretaria virtual via WhatsApp e integracao com Google Calendar.",
    stack: ["Django", "Python", "OpenAI", "LanceDB", "Docker"],
    image: "/images/projects/juriai.webp",
    repo: "https://github.com/caiob77/JuriAi",
  },
  {
    slug: "fintrack",
    title: "Fintrack",
    description:
      "Aplicacao financeira em React para controle de dados, tabelas, formularios, filtros e visualizacoes com foco em experiencia de dashboard.",
    stack: ["React", "Vite", "TanStack Query", "TanStack Table", "Recharts"],
    image: "/images/projects/fintrack.webp",
    repo: "https://github.com/caiob77/Fintrack",
  },
  {
    slug: "myblog",
    title: "MyBlog",
    description:
      "Blog pessoal anterior em Astro, com MDX, RSS, sitemap, busca Pagefind, syntax highlighting e customizacoes de layout.",
    stack: ["Astro", "MDX", "Svelte", "Tailwind", "Pagefind"],
    image: "/images/projects/myblog.webp",
    href: "https://my-blog-beta-ashy.vercel.app",
    repo: "https://github.com/caiob77/MyBlog",
  },
];
