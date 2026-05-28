import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MotionDiv } from "@/components/MotionDiv";
import { StaggerGrid } from "@/components/StaggerGrid";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projetos pessoais e experimentos de Caio Beniel — código aberto, benchmarks e estudos práticos.",
  alternates: { canonical: "/projects" },
};

const projectVisuals = [
  {
    frame: "from-[#242424] via-[#101010] to-black",
    accent: "from-accent to-[#ff8a66]",
    label: "BLOG",
  },
  {
    frame: "from-[#1d222b] via-[#101218] to-black",
    accent: "from-[#4f8cff] to-[#8bb6ff]",
    label: "API",
  },
  {
    frame: "from-[#23252a] via-[#0f1014] to-black",
    accent: "from-[#d4b36a] to-[#ff4625]",
    label: "LAB",
  },
];

export default function ProjectsPage() {
  return (
    <main className="relative overflow-hidden pb-32 pt-16 md:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      <Container className="relative z-10">
        <MotionDiv as="header" className="mb-12 md:mb-14">
          <Eyebrow>Projetos</Eyebrow>
          <div className="mt-3 flex items-start gap-5">
            <h1 className="font-display text-7xl font-bold leading-[0.9] md:text-8xl lg:text-9xl">
              Ventures
            </h1>
            <span className="mt-1 text-5xl font-black leading-none text-accent md:text-6xl">
              +
            </span>
          </div>
        </MotionDiv>

        <StaggerGrid className="space-y-5">
          {projects.map((project, index) => (
            <ProjectFeatureCard
              key={project.slug}
              project={project}
              visual={projectVisuals[index % projectVisuals.length]}
            />
          ))}
        </StaggerGrid>
      </Container>
    </main>
  );
}

type ProjectFeatureCardProps = {
  project: (typeof projects)[number];
  visual: (typeof projectVisuals)[number];
};

function ProjectFeatureCard({ project, visual }: ProjectFeatureCardProps) {
  const href = project.href ?? project.repo ?? "#";
  const external = href.startsWith("http");

  return (
    <article className="lumi-card group relative overflow-hidden rounded-[22px] border border-white/15 bg-black transition-all duration-200 [transition-timing-function:cubic-bezier(0.42,0,0.58,1)] hover:-translate-y-1 hover:scale-[1.01] hover:border-accent/40">
      <div className="grid min-h-[196px] md:grid-cols-[290px_1fr] lg:grid-cols-[330px_1fr]">
        <ProjectVisual project={project} visual={visual} />

        <div className="flex flex-col justify-center border-t border-white/10 p-7 md:border-l md:border-t-0 md:p-9">
          <h2 className="font-display text-2xl font-bold leading-tight text-text">
            {project.title}
          </h2>
          <p className="mt-3 max-w-3xl text-base font-medium leading-relaxed text-text-muted">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs font-semibold uppercase text-text-sub">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="mt-5 inline-flex w-fit items-center gap-2 font-display text-base font-bold text-text transition-colors group-hover:text-accent"
          >
            Saiba mais
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

type ProjectVisualProps = {
  project: (typeof projects)[number];
  visual: (typeof projectVisuals)[number];
};

function ProjectVisual({ project, visual }: ProjectVisualProps) {
  return (
    <div
      aria-label={`Imagem ilustrativa do projeto ${project.title}`}
      className={`relative min-h-[190px] overflow-hidden bg-gradient-to-br ${visual.frame}`}
      role="img"
    >
      <Image
        src={project.image}
        alt=""
        fill
        className="object-cover transition duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        sizes="(min-width: 1024px) 330px, (min-width: 768px) 290px, 100vw"
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute left-4 top-4 rounded bg-black/70 px-3 py-1.5 text-[10px] font-black uppercase text-white">
        {visual.label}
      </div>
    </div>
  );
}
