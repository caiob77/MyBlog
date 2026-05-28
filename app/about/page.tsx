import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Chip } from "@/components/ui/Chip";
import { MotionDiv } from "@/components/MotionDiv";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sobre Caio Beniel Pereira de Sena, desenvolvedor full stack focado em arquitetura, backend escalável e IA aplicada.",
  alternates: { canonical: "/about" },
};

const STACK_HIGHLIGHTS = [
  { label: "Frontend", value: "React · Next.js · Tailwind" },
  { label: "Backend", value: "Node.js · FastAPI · Django" },
  { label: "Dados e IA", value: "PostgreSQL · MongoDB · OCR" },
];

const STACK = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Fastify",
  "Express",
  "Prisma ORM",
  "Docker",
  "Redis",
  "RabbitMQ",
  "WebSockets",
  "JWT",
  "Linux",
];

const GROUP_TAPAJOS_PROJECTS = [
  {
    company: "Grupo Tapajós",
    role: "CorpDocs",
    period: "2024 - 2025",
    body: "Sistema full stack de gestão documental inteligente com organização por setores, autenticação JWT, OCR com Tesseract, busca avançada e integração com IA generativa para análise, resumo e assistência conversacional sobre documentos corporativos.",
  },
  {
    company: "Grupo Tapajós",
    role: "S.I.T.H",
    period: "2024 - 2025",
    body: "Plataforma analítica para o time de compras, integrando dados de vendas e estoque para apoiar decisões sobre ruptura, dias de estoque, nível de serviço de fornecedores, excessos e insights priorizados por impacto.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden pb-32">
      <Hero />

      <Container>
        <MotionDiv className="grid border-y border-border py-10 md:grid-cols-3 md:py-14">
          {STACK_HIGHLIGHTS.map((item) => (
            <div
              key={item.label}
              className="border-b border-border py-7 md:border-b-0 md:border-r md:px-8 first:md:pl-0 last:border-b-0 last:md:border-r-0"
            >
              <p className="text-sm font-semibold text-text-sub">
                {item.label}
              </p>
              <p className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
                {item.value}
              </p>
            </div>
          ))}
        </MotionDiv>

        <MotionDiv
          as="section"
          className="grid gap-12 py-28 md:py-36 lg:grid-cols-[0.78fr_1.22fr]"
        >
          <div>
            <Eyebrow>Sobre mim</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              Caio Beniel Pereira de Sena
            </h2>
          </div>

          <div className="space-y-6 text-xl font-semibold leading-relaxed text-text md:text-2xl">
            <p>
              Sou desenvolvedor full stack com foco em arquitetura de sistemas,
              backend escalável e integração de Inteligência Artificial em
              aplicações modernas. Atualmente curso Análise e Desenvolvimento
              de Sistemas e atuo profissionalmente em equipe prestando serviços
              de consultoria, desenvolvendo soluções voltadas para automação,
              analytics, performance operacional, aplicações orientadas a dados
              e eventos.
            </p>
            <p className="text-text-muted">
              Minha principal especialidade está no ecossistema
              JavaScript/TypeScript e Python, trabalhando com tecnologias como
              Node.js, Fastify, Express, React, Next.js, PostgreSQL, MongoDB,
              Prisma ORM e Docker. Também tenho experiência com APIs RESTful,
              autenticação JWT, arquitetura multi-tenant, mensageria assíncrona
              e sistemas distribuídos.
            </p>
            <p className="text-text-muted">
              Tenho forte interesse em engenharia de software aplicada à tomada
              de decisão inteligente. Gosto de construir sistemas que vão além
              do CRUD tradicional, focando em performance, throughput,
              escalabilidade, observabilidade e análise de dados.
            </p>
          </div>
        </MotionDiv>

        <PhotoMosaic />

        <MotionDiv
          as="section"
          className="grid gap-12 py-28 md:py-36 lg:grid-cols-[0.72fr_1.28fr]"
        >
          <div>
            <span className="text-6xl font-black leading-none text-accent">
              +
            </span>
            <Eyebrow className="mt-3">Experiência</Eyebrow>
          </div>

          <div>
            {GROUP_TAPAJOS_PROJECTS.map((project) => (
              <article
                key={project.role}
                className="grid gap-5 border-b border-border py-10 first:pt-0 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="font-mono text-xs font-bold uppercase text-text-sub">
                    {project.company}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-bold leading-tight">
                    {project.role}
                  </h3>
                  <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-text-muted md:text-lg">
                    {project.body}
                  </p>
                </div>
                <div className="h-fit rounded-full bg-white/10 px-6 py-3 font-display text-lg font-bold text-text md:text-xl">
                  {project.period}
                </div>
              </article>
            ))}
          </div>
        </MotionDiv>

        <Journey />
      </Container>
    </main>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:190px_100%,100%_220px] opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,70,37,0.18),transparent_36%),linear-gradient(90deg,black_0%,rgba(0,0,0,0.88)_38%,rgba(0,0,0,0.28)_100%)]" />
      <HeroPhoto />

      <Container className="relative flex min-h-[92vh] items-end pb-16 md:pb-20">
        <MotionDiv as="header" className="max-w-4xl">
          <p className="font-mono text-xs font-bold uppercase text-text-sub">
            Caio Beniel Pereira de Sena
          </p>
          <div className="mt-4 flex items-start gap-3">
            <h1 className="font-display text-7xl font-bold leading-[0.88] md:text-8xl lg:text-9xl">
              Sobre
            </h1>
            <span className="text-6xl font-black leading-none text-accent md:text-7xl">
              +
            </span>
          </div>
          <p className="mt-5 max-w-xl text-lg font-semibold text-text-sub md:text-xl">
            Vamos nos conhecer melhor.
          </p>
        </MotionDiv>
      </Container>
    </section>
  );
}

function HeroPhoto() {
  return (
    <div
      aria-label="Foto placeholder de Caio Beniel"
      role="img"
      className="absolute inset-y-0 right-0 w-full md:w-[68%]"
    >
      <Image
        src="/images/about/caio-hero.webp"
        alt=""
        fill
        priority
        className="object-cover object-center md:object-right"
        sizes="(min-width: 768px) 68vw, 100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,black_0%,transparent_34%,rgba(0,0,0,0.2)_100%),linear-gradient(180deg,transparent_58%,black_100%)]" />
    </div>
  );
}

function PhotoMosaic() {
  return (
    <MotionDiv
      as="section"
      className="relative grid gap-8 py-24 md:py-32 lg:grid-cols-[1fr_1fr]"
    >
      <PhotoPlaceholder
        label="Foto principal"
        src="/images/about/caio-workspace-main.webp"
        className="min-h-[560px]"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
      <div className="grid gap-8">
        <PhotoPlaceholder
          label="Foto trabalhando"
          src="/images/about/caio-working.webp"
          className="min-h-[260px]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <PhotoPlaceholder
          label="Foto estudando"
          src="/images/about/caio-studying.webp"
          className="min-h-[260px]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
    </MotionDiv>
  );
}

type PhotoPlaceholderProps = {
  label: string;
  src: string;
  className?: string;
  sizes: string;
};

function PhotoPlaceholder({ label, src, className, sizes }: PhotoPlaceholderProps) {
  return (
    <div
      aria-label={label}
      role="img"
      className={`relative overflow-hidden rounded-[24px] border border-border bg-black ${className ?? ""}`}
    >
      <Image src={src} alt="" fill className="object-cover" sizes={sizes} />
      <div aria-hidden className="absolute inset-0 bg-black/10" />
    </div>
  );
}

function Journey() {
  return (
    <MotionDiv
      as="section"
      className="grid gap-12 py-28 md:py-36 lg:grid-cols-[0.72fr_1.28fr]"
    >
      <div>
        <Eyebrow>História por trás</Eyebrow>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
          Minha Jornada
        </h2>
        <Link
          href="/archive"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-7 py-3 font-display text-base font-bold text-text transition-all duration-200 [transition-timing-function:cubic-bezier(0.42,0,0.58,1)] hover:scale-[1.03] hover:border-accent/60 hover:text-accent"
        >
          Ver artigos
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <div className="space-y-7 text-lg font-medium leading-relaxed text-text-muted md:text-xl">
        <p>
          Comecei a programar em 2022, inicialmente por influência de um grande
          amigo que hoje é Software Engineer em uma multinacional, trabalhando
          em projetos para diversos países. Ter esse começo foi um grande
          privilégio, pois pude aprender muitas coisas com ele.
        </p>
        <p>
          Uma das lições mais valiosas que aprendi foi o{" "}
          <strong className="font-semibold text-text">“se vira”</strong>:
          apesar de ele saber muito mais que eu, nunca me deu as coisas de forma
          fácil. Ele me mostrava as possibilidades e eu tinha que me virar para
          entender como usar aquilo, por que usar e assim por diante. Isso me
          ensinou a não terceirizar meu aprendizado.
        </p>
        <p>
          Somado à minha grande curiosidade e à paixão que tenho por
          programação e por solucionar problemas, venho seguindo esse caminho de
          aprendizado e evolução constante.
        </p>
        <div className="flex flex-wrap gap-2 pt-3">
          {STACK.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
      </div>
    </MotionDiv>
  );
}
